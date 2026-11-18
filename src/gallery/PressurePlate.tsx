import { useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface PressurePlateProps {
  position: [number, number, number]
  onStepOn: () => void
  beamColor?: string
  accentColor?: string
  label?: string
  height?: number
  activationRadius?: number
}

/**
 * Interactive gaming-style Pressure Plate with a vertical pillar of light.
 * Detects when the player's camera position walks onto it and triggers the transition.
 */
export function PressurePlate({
  position,
  onStepOn,
  beamColor = '#38bdf8', // Neon cyan/sky blue
  accentColor = '#0284c7',
  label = 'KE RUANG MODERN',
  height = 4.4,
  activationRadius = 1.25,
}: PressurePlateProps) {
  const plateRef = useRef<THREE.Group>(null)
  const padRef = useRef<THREE.Mesh>(null)
  const ringsRef = useRef<THREE.Group>(null)
  const crystalRef = useRef<THREE.Mesh>(null)
  const [isStepped, setIsStepped] = useState(false)
  const triggeredRef = useRef(false)

  // Floating label texture
  const labelTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 128
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.fillStyle = 'rgba(10, 25, 45, 0.85)'
      ctx.roundRect ? ctx.roundRect(10, 10, 492, 108, 16) : ctx.rect(10, 10, 492, 108)
      ctx.fill()
      ctx.lineWidth = 4
      ctx.strokeStyle = beamColor
      ctx.stroke()

      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.font = 'bold 30px "Segoe UI", Arial, sans-serif'
      ctx.fillStyle = '#ffffff'
      ctx.fillText(label, 256, 50)

      ctx.font = 'italic 20px "Segoe UI", Arial, sans-serif'
      ctx.fillStyle = beamColor
      ctx.fillText('▼ Injak untuk Masuk ▼', 256, 90)
    }
    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    return texture
  }, [label, beamColor])

  useFrame((state, delta) => {
    const cam = state.camera
    const dist = Math.hypot(cam.position.x - position[0], cam.position.z - position[2])

    // Stepped-on detection
    const steppedNow = dist <= activationRadius
    if (steppedNow !== isStepped) {
      setIsStepped(steppedNow)
    }

    if (steppedNow && !triggeredRef.current) {
      triggeredRef.current = true
      onStepOn()
    } else if (!steppedNow) {
      triggeredRef.current = false
    }

    // Plate mechanical press animation
    if (padRef.current) {
      const targetY = steppedNow ? -0.025 : 0.03
      padRef.current.position.y = THREE.MathUtils.damp(padRef.current.position.y, targetY, 12, delta)
    }

    // Light rings upward animation
    if (ringsRef.current) {
      ringsRef.current.children.forEach((child, i) => {
        child.position.y = ((state.clock.elapsedTime * 1.2 + i * 1.1) % height)
        const scale = 1 - (child.position.y / height) * 0.4
        child.scale.set(scale, scale, scale)
      })
    }

    // Rotating crystal marker
    if (crystalRef.current) {
      crystalRef.current.rotation.y += delta * 1.5
      crystalRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 2) * 0.2
      crystalRef.current.position.y = 2.4 + Math.sin(state.clock.elapsedTime * 2.5) * 0.15
    }
  })

  return (
    <group ref={plateRef} position={position}>
      {/* Outer base ring (dark metallic housing) */}
      <mesh position={[0, 0.02, 0]} receiveShadow>
        <cylinderGeometry args={[1.35, 1.45, 0.04, 32]} />
        <meshStandardMaterial color="#1e293b" metalness={0.85} roughness={0.3} />
      </mesh>

      {/* Glowing boundary rim */}
      <mesh position={[0, 0.045, 0]}>
        <torusGeometry args={[1.25, 0.04, 16, 48]} />
        <meshStandardMaterial
          color={beamColor}
          emissive={beamColor}
          emissiveIntensity={isStepped ? 3.0 : 1.5}
        />
      </mesh>

      {/* Inner Pressure Pad (moves down when stepped) */}
      <mesh ref={padRef} position={[0, 0.03, 0]} receiveShadow>
        <cylinderGeometry args={[1.15, 1.15, 0.04, 32]} />
        <meshStandardMaterial
          color={isStepped ? '#0369a1' : '#0f172a'}
          metalness={0.7}
          roughness={0.25}
          emissive={isStepped ? beamColor : accentColor}
          emissiveIntensity={isStepped ? 1.2 : 0.3}
        />
      </mesh>

      {/* Center glowing circular rune / core */}
      <mesh position={[0, 0.055, 0]}>
        <circleGeometry args={[0.55, 32]} />
        <meshStandardMaterial
          color={beamColor}
          emissive={beamColor}
          emissiveIntensity={isStepped ? 4 : 2}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* VERTICAL LIGHT PILLAR (Cahaya yang berdiri seperti penunjuk) */}
      {/* Outer soft glow beam */}
      <mesh position={[0, height / 2, 0]}>
        <cylinderGeometry args={[0.85, 1.05, height, 32, 1, true]} />
        <meshBasicMaterial
          color={beamColor}
          transparent
          opacity={isStepped ? 0.45 : 0.22}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Inner core bright laser beam */}
      <mesh position={[0, height / 2, 0]}>
        <cylinderGeometry args={[0.22, 0.28, height, 24, 1, true]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={isStepped ? 0.8 : 0.55}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Ascending energy rings */}
      <group ref={ringsRef}>
        {[0, 1, 2, 3].map((idx) => (
          <mesh key={idx} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.4, 0.5, 32]} />
            <meshBasicMaterial
              color={beamColor}
              transparent
              opacity={0.65}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>

      {/* Floating rotating crystal beacon */}
      <mesh ref={crystalRef} position={[0, 2.4, 0]}>
        <octahedronGeometry args={[0.28, 0]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={beamColor}
          emissiveIntensity={2.5}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Floating Holographic Guide Signboard */}
      <mesh position={[0, 3.2, 0]} rotation={[0, 0, 0]}>
        <planeGeometry args={[1.8, 0.45]} />
        <meshBasicMaterial map={labelTexture} transparent side={THREE.DoubleSide} />
      </mesh>

      {/* Emitted local point light illuminating the corridor */}
      <pointLight
        position={[0, 1.2, 0]}
        color={beamColor}
        intensity={isStepped ? 5.0 : 2.5}
        distance={7}
      />
    </group>
  )
}
