import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface ModernControlsProps {
  onPositionChange?: (pos: { x: number; z: number }) => void
}

const FORWARD_KEYS = new Set(['KeyW', 'ArrowUp'])
const BACKWARD_KEYS = new Set(['KeyS', 'ArrowDown'])
const STRAFE_LEFT_KEYS = new Set(['KeyA', 'ArrowLeft'])
const STRAFE_RIGHT_KEYS = new Set(['KeyD', 'ArrowRight'])
const ALL_KEYS = new Set([
  'KeyW',
  'ArrowUp',
  'KeyS',
  'ArrowDown',
  'KeyA',
  'ArrowLeft',
  'KeyD',
  'ArrowRight',
])

const BOUND_X = 8.6
const BOUND_Z = 15.2
const WALK_SPEED = 3.8
const LOOK_SENSITIVITY = 0.0022
const DRAG_SENSITIVITY = 0.005
const DRAG_THRESHOLD = 6
const PITCH_LIMIT = 0.65

export function ModernControls({ onPositionChange }: ModernControlsProps) {
  const { camera, gl } = useThree()
  const keys = useRef(new Set<string>())
  const yaw = useRef(0)
  const pitch = useRef(0)
  const pos = useRef(new THREE.Vector3(0, 1.6, 12)) // Starts near entrance, looking down the grand hall
  const drag = useRef<{ id: number; x: number; y: number } | null>(null)
  const isDragging = useRef(false)

  // Keyboard events
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (ALL_KEYS.has(e.code)) {
        e.preventDefault()
        keys.current.add(e.code)
      }
    }
    const onKeyUp = (e: KeyboardEvent) => {
      keys.current.delete(e.code)
    }
    window.addEventListener('keydown', onKeyDown, { passive: false })
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  // Pointer look
  useEffect(() => {
    const el = gl.domElement

    const onPointerDown = (e: PointerEvent) => {
      isDragging.current = false
      if (e.button !== 0) return
      drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY }
      if (e.pointerType !== 'mouse') el.setPointerCapture?.(e.pointerId)
    }

    const onPointerMove = (e: PointerEvent) => {
      const locked = document.pointerLockElement === el
      if (locked) {
        yaw.current -= e.movementX * LOOK_SENSITIVITY
        pitch.current = Math.max(-PITCH_LIMIT, Math.min(PITCH_LIMIT, pitch.current - e.movementY * LOOK_SENSITIVITY))
        return
      }

      const active = drag.current
      if (!active || active.id !== e.pointerId) return
      const dx = e.clientX - active.x
      const dy = e.clientY - active.y
      if (Math.abs(dx) + Math.abs(dy) > DRAG_THRESHOLD) isDragging.current = true
      yaw.current -= dx * DRAG_SENSITIVITY
      pitch.current = Math.max(-PITCH_LIMIT, Math.min(PITCH_LIMIT, pitch.current - dy * DRAG_SENSITIVITY))
      active.x = e.clientX
      active.y = e.clientY
    }

    const onPointerUp = (e: PointerEvent) => {
      if (drag.current?.id === e.pointerId) {
        drag.current = null
        if (e.pointerType !== 'mouse') el.releasePointerCapture?.(e.pointerId)
      }
    }

    const onClick = () => {
      if (document.pointerLockElement === el) return
      if (!window.matchMedia('(pointer: fine)').matches) return
      try {
        const res = el.requestPointerLock() as unknown as Promise<void> | undefined
        if (res && typeof res.catch === 'function') res.catch(() => {})
      } catch {
        // Fallback to drag-look
      }
    }

    el.addEventListener('pointerdown', onPointerDown)
    el.addEventListener('pointermove', onPointerMove)
    el.addEventListener('pointerup', onPointerUp)
    el.addEventListener('pointercancel', onPointerUp)
    el.addEventListener('click', onClick)
    return () => {
      el.removeEventListener('pointerdown', onPointerDown)
      el.removeEventListener('pointermove', onPointerMove)
      el.removeEventListener('pointerup', onPointerUp)
      el.removeEventListener('pointercancel', onPointerUp)
      el.removeEventListener('click', onClick)
    }
  }, [gl])

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05)

    let moveForward = 0
    if (Array.from(keys.current).some((c) => FORWARD_KEYS.has(c))) moveForward += 1
    if (Array.from(keys.current).some((c) => BACKWARD_KEYS.has(c))) moveForward -= 1

    let moveStrafe = 0
    if (Array.from(keys.current).some((c) => STRAFE_RIGHT_KEYS.has(c))) moveStrafe += 1
    if (Array.from(keys.current).some((c) => STRAFE_LEFT_KEYS.has(c))) moveStrafe -= 1

    if (moveForward !== 0 || moveStrafe !== 0) {
      // Vector relative to camera horizontal view
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

      pos.current.x = Math.max(-BOUND_X, Math.min(BOUND_X, pos.current.x + vx * WALK_SPEED * dt))
      pos.current.z = Math.max(-BOUND_Z, Math.min(BOUND_Z, pos.current.z + vz * WALK_SPEED * dt))
      onPositionChange?.({ x: pos.current.x, z: pos.current.z })
    }

    camera.position.copy(pos.current)
    camera.rotation.set(pitch.current, yaw.current, 0, 'YXZ')
  })

  return null
}
