import { useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface PressurePlateProps {
  position: [number, number, number]
  onStepOn: () => void
  beamColor?: string
  accentColor?: string
  label?: string
  sublabel?: string
  height?: number
  activationRadius?: number
}

/**
 * Interactive gaming-style Pressure Plate with a vertical pillar of light.
 * Detects when the player walks onto it and triggers the room transition.
 */
export function PressurePlate({
  position,
  onStepOn,
  beamColor = '#38bdf8', // Neon cyan/sky blue
  accentColor = '#0284c7',
  label = 'KE RUANGAN SELANJUTNYA',
  sublabel = 'Injak untuk Masuk',
  height = 4.4,
  activationRadius = 1.25,
}: PressurePlateProps) {
  const padRef = useRef<THREE.Mesh>(null)
  const ringsRef = useRef<THREE.Group>(null)
  const crystalRef = useRef<THREE.Mesh>(null)
  const [isStepped, setIsStepped] = useState(false)
  const triggeredRef = useRef(false)

  // Floating label texture
  const labelTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 130
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.fillStyle = 'rgba(10, 25, 45, 0.88)'
      ctx.beginPath()
      ctx.roundRect ? ctx.roundRect(10, 10, 492, 110, 16) : ctx.rect(10, 10, 492, 110)
      ctx.fill()
      ctx.lineWidth = 4
      ctx.strokeStyle = beamColor
      ctx.stroke()

      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.font = 'bold 28px "Segoe UI", Arial, sans-serif'
      ctx.fillStyle = '#ffffff'
      ctx.fillText(label, 256, 48)

      ctx.font = 'italic bold 20px "Segoe UI", Arial, sans-serif'
      ctx.fillStyle = beamColor
      ctx.fillText(`▼ ${sublabel} ▼`, 256, 88)
    }
    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    return texture
  }, [label, sublabel, beamColor])

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
        child.position.y = (state.clock.elapsedTime * 1.2 + i * 1.1) % height
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
    <group position={position}>
      {/* 1. Base Plate Outer Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <ringGeometry args={[1.05, 1.45, 32]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Outer Metallic Trim */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
        <ringGeometry args={[1.4, 1.48, 32]} />
        <meshStandardMaterial color={accentColor} metalness={0.9} roughness={0.2} />
      </mesh>

      {/* 2. Interactive Inner Stepping Pad */}
      <mesh ref={padRef} position={[0, 0.03, 0]} receiveShadow>
        <cylinderGeometry args={[1.0, 1.05, 0.06, 32]} />
        <meshStandardMaterial
          color={isStepped ? '#0284c7' : '#1e293b'}
          metalness={0.7}
          roughness={0.2}
          emissive={beamColor}
          emissiveIntensity={isStepped ? 0.9 : 0.25}
        />
      </mesh>

      {/* 3. Glowing Neon Center Decal */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.045, 0]}>
        <ringGeometry args={[0.3, 0.75, 24]} />
        <meshBasicMaterial color={beamColor} transparent opacity={0.85} />
      </mesh>

      {/* 4. Vertical Pillar of Light (Beacon Beam) */}
      <mesh position={[0, height / 2, 0]}>
        <cylinderGeometry args={[0.35, 0.85, height, 24, 1, true]} />
        <meshBasicMaterial
          color={beamColor}
          transparent
          opacity={isStepped ? 0.55 : 0.28}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Inner Core Bright Beam */}
      <mesh position={[0, height / 2, 0]}>
        <cylinderGeometry args={[0.08, 0.2, height, 16, 1, true]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={isStepped ? 0.8 : 0.45}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* 5. Ascending Light Rings */}
      <group ref={ringsRef}>
        {[0, 1, 2, 3].map((idx) => (
          <mesh key={idx} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
            <ringGeometry args={[0.7, 0.85, 24]} />
            <meshBasicMaterial
              color={beamColor}
              transparent
              opacity={0.6}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        ))}
      </group>

      {/* 6. Floating Rotating Crystal */}
      <mesh ref={crystalRef} position={[0, 2.4, 0]}>
        <octahedronGeometry args={[0.26, 0]} />
        <meshStandardMaterial
          color={beamColor}
          emissive={beamColor}
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* 7. Floating 3D Hologram Sign */}
      <mesh position={[0, 2.9, 0]}>
        <planeGeometry args={[2.0, 0.52]} />
        <meshBasicMaterial map={labelTexture} transparent side={THREE.DoubleSide} depthWrite={false} />
      </mesh>

      {/* 8. Ambient Ground Light */}
      <pointLight position={[0, 0.8, 0]} color={beamColor} intensity={2.5} distance={5} />
    </group>
  )
}
