import { useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ModernWorldClassCenterpieceProps {
  position?: [number, number, number]
  onSelect?: () => void
}

/**
 * Centerpiece for Zona 4 (Undip Today).
 * Futuristic Monumen Widya Puraya & Globe Prestasi Dunia (Top 500 WCU).
 * Features rotating cyan orbital rings, high-tech glass plinth, and glowing LED base.
 */
export function ModernWorldClassCenterpiece({
  position = [0, 0, 0],
  onSelect,
}: ModernWorldClassCenterpieceProps) {
  const [logoTexture, setLogoTexture] = useState<THREE.Texture | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const orbit1Ref = useRef<THREE.Group>(null)
  const orbit2Ref = useRef<THREE.Group>(null)

  useMemo(() => {
    const loader = new THREE.TextureLoader()
    loader.load('/brand/logo_undip.png', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace
      setLogoTexture(tex)
    })
  }, [])

  useFrame((_, delta) => {
    if (orbit1Ref.current) {
      orbit1Ref.current.rotation.y += delta * 0.6
      orbit1Ref.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.15 + 0.3
    }
    if (orbit2Ref.current) {
      orbit2Ref.current.rotation.y -= delta * 0.45
      orbit2Ref.current.rotation.z = Math.cos(Date.now() * 0.001) * 0.15 - 0.25
    }
  })

  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation()
        onSelect?.()
      }}
      onPointerOver={(e) => {
        e.stopPropagation()
        setIsHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        setIsHovered(false)
        document.body.style.cursor = ''
      }}
    >
      {/* =========================================================
          1. HIGH-TECH SLEEK PEDESTAL (GLOSS OBSIDIAN & CYAN LED)
          ========================================================= */}
      {/* Base Plinth Disc */}
      <mesh position={[0, 0.12, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.2, 2.3, 0.24, 32]} />
        <meshStandardMaterial color="#0b1320" roughness={0.2} metalness={0.7} />
      </mesh>

      {/* Glowing Cyan LED Base Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.245, 0]}>
        <ringGeometry args={[2.0, 2.15, 32]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>

      {/* Main Column Body */}
      <mesh position={[0, 0.76, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.7, 1.9, 0.8, 32]} />
        <meshStandardMaterial
          color="#0f172a"
          roughness={0.15}
          metalness={0.8}
          emissive={isHovered ? '#0284c7' : '#04172e'}
          emissiveIntensity={isHovered ? 0.6 : 0.2}
        />
      </mesh>

      {/* Pedestal Top Lip with Cyan Trim */}
      <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.85, 1.7, 0.08, 32]} />
        <meshStandardMaterial color="#38bdf8" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Front Emblem Display Plaque */}
      <group position={[0, 0.76, 1.82]}>
        <mesh position={[0, 0, 0.005]}>
          <boxGeometry args={[0.7, 0.85, 0.01]} />
          <meshStandardMaterial color="#0f172a" roughness={0.2} />
        </mesh>
        {logoTexture && (
          <mesh position={[0, 0, 0.015]}>
            <planeGeometry args={[0.55, 0.7]} />
            <meshBasicMaterial map={logoTexture} transparent alphaTest={0.05} />
          </mesh>
        )}
      </group>

      {/* =========================================================
          2. MINIATURE 3D GEDUNG REKTORAT WIDYA PURAYA MODERN
          ========================================================= */}
      <group position={[0, 1.28, 0]}>
        {/* Foundation Platform */}
        <mesh position={[0, 0.04, 0]} receiveShadow>
          <cylinderGeometry args={[1.4, 1.45, 0.08, 32]} />
          <meshStandardMaterial color="#1e293b" roughness={0.4} />
        </mesh>

        {/* Glass Entrance Center */}
        <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 0.24, 0.8]} />
          <meshStandardMaterial color="#0284c7" roughness={0.1} metalness={0.85} />
        </mesh>

        {/* Tier 1 Joglo Modern Cantilever Roof */}
        <mesh position={[0, 0.38, 0]} castShadow>
          <coneGeometry args={[0.75, 0.16, 4]} />
          <meshStandardMaterial color="#0f2347" roughness={0.3} metalness={0.5} />
        </mesh>

        {/* Tier 2 Middle Joglo Roof */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <coneGeometry args={[0.54, 0.14, 4]} />
          <meshStandardMaterial color="#1e3a8a" roughness={0.3} metalness={0.5} />
        </mesh>

        {/* Tier 3 Crown Apex Roof with Golden Spire */}
        <mesh position={[0, 0.62, 0]} castShadow>
          <coneGeometry args={[0.34, 0.14, 4]} />
          <meshStandardMaterial color="#2563eb" roughness={0.2} metalness={0.6} />
        </mesh>
        <mesh position={[0, 0.74, 0]}>
          <cylinderGeometry args={[0.01, 0.025, 0.18, 12]} />
          <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.1} />
        </mesh>
      </group>

      {/* =========================================================
          3. ROTATING ORBITAL GLOBE RINGS (TOP 500 WCU PRESTASI)
          ========================================================= */}
      {/* Outer Orbit 1 */}
      <group ref={orbit1Ref} position={[0, 1.7, 0]}>
        <mesh>
          <torusGeometry args={[1.25, 0.02, 16, 64]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        {/* Satellite nodes on orbit */}
        <mesh position={[1.25, 0, 0]}>
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* Inner Orbit 2 */}
      <group ref={orbit2Ref} position={[0, 1.7, 0]}>
        <mesh>
          <torusGeometry args={[1.05, 0.018, 16, 64]} />
          <meshStandardMaterial
            color="#d4af37"
            emissive="#d4af37"
            emissiveIntensity={0.6}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        <mesh position={[-1.05, 0, 0]}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshBasicMaterial color="#fef08a" />
        </mesh>
      </group>

      {/* =========================================================
          4. MODERN CYLINDER SHOWCASE
          ========================================================= */}
      <group position={[0, 1.82, 0]}>
        <mesh>
          <cylinderGeometry args={[1.5, 1.5, 1.15, 32, 1, true]} />
          <meshStandardMaterial
            color="#e0f2fe"
            transparent
            opacity={0.12}
            roughness={0.05}
            metalness={0.1}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
        <mesh position={[0, 0.58, 0]}>
          <cylinderGeometry args={[1.52, 1.52, 0.02, 32]} />
          <meshStandardMaterial color="#38bdf8" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* =========================================================
          5. CRISP DAYLIGHT & CYAN SPOTLIGHTS
          ========================================================= */}
      <spotLight
        position={[0, 5.8, 2.4]}
        target-position={[0, 1.6, 0]}
        intensity={4.5}
        angle={0.6}
        penumbra={0.35}
        color="#f0f9ff"
        castShadow
      />
      <spotLight
        position={[0, 5.8, -2.4]}
        target-position={[0, 1.6, 0]}
        intensity={3.5}
        angle={0.6}
        penumbra={0.35}
        color="#bae6fd"
        castShadow
      />
      <pointLight position={[0, 1.7, 0]} color="#38bdf8" intensity={1.8} distance={5} />
    </group>
  )
}
