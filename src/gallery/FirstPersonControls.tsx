import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import type { FirstPersonControlsProps } from './types'
import {
  DRAG_SENSITIVITY,
  DRAG_THRESHOLD,
  EYE_HEIGHT,
  LOOK_SENSITIVITY,
  MOVE_MAX_X,
  MOVE_MAX_Z,
  MOVE_MIN_X,
  MOVE_MIN_Z,
  PITCH_LIMIT,
  START_Z,
  WALK_SPEED,
} from './layout'

const FORWARD_KEYS = new Set(['KeyW', 'ArrowUp'])
const BACKWARD_KEYS = new Set(['KeyS', 'ArrowDown'])
const STRAFE_LEFT_KEYS = new Set(['KeyA', 'ArrowLeft'])
const STRAFE_RIGHT_KEYS = new Set(['KeyD', 'ArrowRight'])
const ALL_MOVE_KEYS = new Set([
  'KeyW',
  'ArrowUp',
  'KeyS',
  'ArrowDown',
  'KeyA',
  'ArrowLeft',
  'KeyD',
  'ArrowRight',
])

/**
 * Constrained first-person controls (renders no DOM of its own):
 * - Desktop: click empty space to lock the mouse, move the mouse to look,
 *   WASD or arrows to walk in the camera facing direction, ESC to release.
 * - Touch: drag anywhere on the scene to look around.
 * Movement is clamped to the corridor; pitch is clamped to a comfortable range.
 */
export function FirstPersonControls({
  resetSignal,
  moveInputRef,
  hoveredRef,
  panelOpenRef,
  draggedRef,
}: FirstPersonControlsProps) {
  const { camera, gl } = useThree()
  const keys = useRef(new Set<string>())
  const yaw = useRef(0)
  const pitch = useRef(0)
  const x = useRef(0)
  const z = useRef(START_Z)
  const drag = useRef<{ id: number; x: number; y: number } | null>(null)

  // Keyboard
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (ALL_MOVE_KEYS.has(event.code)) {
        event.preventDefault()
        keys.current.add(event.code)
      }
    }
    const onKeyUp = (event: KeyboardEvent) => {
      keys.current.delete(event.code)
    }
    window.addEventListener('keydown', onKeyDown, { passive: false })
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  // Pointer look (pointer lock on desktop, drag on touch/edge cases)
  useEffect(() => {
    const element = gl.domElement

    const onPointerDown = (event: PointerEvent) => {
      draggedRef.current = false
      if (event.button !== 0) return
      drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY }
      if (event.pointerType !== 'mouse') {
        element.setPointerCapture?.(event.pointerId)
      }
    }

    const onPointerMove = (event: PointerEvent) => {
      const locked = document.pointerLockElement === element
      if (locked) {
        yaw.current -= event.movementX * LOOK_SENSITIVITY
        pitch.current = THREEClamp(pitch.current - event.movementY * LOOK_SENSITIVITY)
        return
      }
      const active = drag.current
      if (!active || active.id !== event.pointerId) return
      const dx = event.clientX - active.x
      const dy = event.clientY - active.y
      if (Math.abs(dx) + Math.abs(dy) > DRAG_THRESHOLD) draggedRef.current = true
      yaw.current -= dx * DRAG_SENSITIVITY
      pitch.current = THREEClamp(pitch.current - dy * DRAG_SENSITIVITY)
      active.x = event.clientX
      active.y = event.clientY
    }

    const onPointerUp = (event: PointerEvent) => {
      if (drag.current?.id === event.pointerId) {
        drag.current = null
        if (event.pointerType !== 'mouse') {
          element.releasePointerCapture?.(event.pointerId)
        }
      }
    }

    const onClick = () => {
      // Only lock when clicking empty space (not a portrait) and no panel is open.
      if (panelOpenRef.current || hoveredRef.current) return
      if (document.pointerLockElement === element) return
      if (!window.matchMedia('(pointer: fine)').matches) return
      try {
        const result = element.requestPointerLock() as unknown as Promise<void> | undefined
        if (result && typeof result.catch === 'function') result.catch(() => {})
      } catch {
        // Pointer lock may be unavailable; drag-look still works.
      }
    }

    element.addEventListener('pointerdown', onPointerDown)
    element.addEventListener('pointermove', onPointerMove)
    element.addEventListener('pointerup', onPointerUp)
    element.addEventListener('pointercancel', onPointerUp)
    element.addEventListener('click', onClick)
    return () => {
      element.removeEventListener('pointerdown', onPointerDown)
      element.removeEventListener('pointermove', onPointerMove)
      element.removeEventListener('pointerup', onPointerUp)
      element.removeEventListener('pointercancel', onPointerUp)
      element.removeEventListener('click', onClick)
    }
  }, [camera, gl, panelOpenRef, hoveredRef, draggedRef])

  // Reset view
  useEffect(() => {
    if (resetSignal === 0) return
    yaw.current = 0
    pitch.current = 0
    x.current = 0
    z.current = START_Z
    keys.current.clear()
    moveInputRef.current = 0
    drag.current = null
    if (document.pointerLockElement) document.exitPointerLock()
  }, [resetSignal, moveInputRef])

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05)

    let moveForward = 0
    if (Array.from(keys.current).some((code) => FORWARD_KEYS.has(code))) moveForward += 1
    if (Array.from(keys.current).some((code) => BACKWARD_KEYS.has(code))) moveForward -= 1
    moveForward += moveInputRef.current

    let moveStrafe = 0
    if (Array.from(keys.current).some((code) => STRAFE_RIGHT_KEYS.has(code))) moveStrafe += 1
    if (Array.from(keys.current).some((code) => STRAFE_LEFT_KEYS.has(code))) moveStrafe -= 1

    moveForward = Math.max(-1, Math.min(1, moveForward))
    moveStrafe = Math.max(-1, Math.min(1, moveStrafe))

    if (moveForward !== 0 || moveStrafe !== 0) {
      // Horizontal heading vectors
      // At yaw = 0, camera faces -Z.
      const forwardX = -Math.sin(yaw.current)
      const forwardZ = -Math.cos(yaw.current)
      const rightX = Math.cos(yaw.current)
      const rightZ = -Math.sin(yaw.current)

      let vx = moveForward * forwardX + moveStrafe * rightX
      let vz = moveForward * forwardZ + moveStrafe * rightZ

      const mag = Math.hypot(vx, vz)
      if (mag > 1) {
        vx /= mag
        vz /= mag
      }

      x.current = Math.max(MOVE_MIN_X, Math.min(MOVE_MAX_X, x.current + vx * WALK_SPEED * dt))
      z.current = Math.max(MOVE_MIN_Z, Math.min(MOVE_MAX_Z, z.current + vz * WALK_SPEED * dt))
    }

    camera.position.set(x.current, EYE_HEIGHT, z.current)
    // 'YXZ' order keeps yaw/pitch intuitive for first-person look.
    camera.rotation.set(pitch.current, yaw.current, 0, 'YXZ')
  })

  return null
}

function THREEClamp(value: number): number {
  return Math.max(-PITCH_LIMIT, Math.min(PITCH_LIMIT, value))
}
