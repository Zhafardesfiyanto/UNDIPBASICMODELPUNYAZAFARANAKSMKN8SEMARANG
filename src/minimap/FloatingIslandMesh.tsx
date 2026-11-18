import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { FloatingIslandData } from './types'

interface FloatingIslandMeshProps {
  island: FloatingIslandData
  isCurrent: boolean
  onSelect: (island: FloatingIslandData) => void
  onHover: (island: FloatingIslandData | null) => void
  isHovered: boolean
  phaseOffset?: number
}

export function FloatingIslandMesh({
  island,
  isCurrent,
  onSelect,
  onHover,
  isHovered,
  phaseOffset = 0,
}: FloatingIslandMeshProps) {
  const groupRef = useRef<THREE.Group>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  const crystalRef = useRef<THREE.Mesh>(null)
  const currentScale = useRef(1)

  useFrame((state, delta) => {
    if (!groupRef.current) return

    // Floating bobbing motion
    const t = state.clock.elapsedTime * 1.4 + phaseOffset
    groupRef.current.position.y = island.position[1] + Math.sin(t) * 0.25

    // Hover scale up animation ("kalo cursor di arahin dan dipencet otomatis membesar")
    const targetScale = isHovered ? 1.3 : isCurrent ? 1.12 : 1.0
    currentScale.current = THREE.MathUtils.damp(currentScale.current, targetScale, 10, delta)
    groupRef.current.scale.set(currentScale.current, currentScale.current, currentScale.current)

    // Gentle island rotation
    groupRef.current.rotation.y += delta * (isHovered ? 0.6 : 0.2)

    // Rotating beacon crystal
    if (crystalRef.current) {
      crystalRef.current.rotation.y += delta * 1.8
      crystalRef.current.rotation.x = Math.sin(t * 1.8) * 0.25
    }

    // Pulsing ring
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.5
      const s = 1 + Math.sin(t * 2) * 0.08
      ringRef.current.scale.set(s, s, s)
    }
  })

  return (
    <group
      ref={groupRef}
      position={[island.position[0], island.position[1], island.position[2]]}
      onClick={(e) => {
        e.stopPropagation()
        onSelect(island)
      }}
      onPointerOver={(e) => {
        e.stopPropagation()
        document.body.style.cursor = 'pointer'
        onHover(island)
      }}
      onPointerOut={() => {
        document.body.style.cursor = ''
        onHover(null)
      }}
    >
      {/* 1. Upper Island Surface (Grass / Terrace) */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.9, 1.6, 0.45, 16]} />
        <meshStandardMaterial
          color={island.id === 'island-modern' ? '#ffffff' : '#22c55e'}
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>

      {/* 2. Underside Inverted Rocky Cone (Floating Earth) */}
      <mesh position={[0, -1.2, 0]} rotation={[Math.PI, 0, 0]} castShadow>
        <coneGeometry args={[1.65, 2.1, 16]} />
        <meshStandardMaterial color="#473220" roughness={0.9} />
      </mesh>

      {/* Rock crumbs / small floating boulders under the island */}
      {[-0.6, 0.6].map((ox, i) => (
        <mesh key={i} position={[ox, -2.5 - i * 0.3, (i % 2 === 0 ? 0.4 : -0.4)]}>
          <dodecahedronGeometry args={[0.22, 0]} />
          <meshStandardMaterial color="#382517" roughness={0.9} />
        </mesh>
      ))}

      {/* 3. Thematic Landmark on Top */}
      {island.id === 'island-classic' && (
        <group position={[0, 0.25, 0]}>
          {/* Classical Temple Pillars */}
          {[-0.6, 0.6].map((px) =>
            [-0.6, 0.6].map((pz) => (
              <mesh key={`${px}-${pz}`} position={[px, 0.6, pz]} castShadow>
                <cylinderGeometry args={[0.1, 0.12, 1.2, 12]} />
                <meshStandardMaterial color="#efe6d5" roughness={0.4} />
              </mesh>
            )),
          )}
          {/* Gilded Pediment / Roof */}
          <mesh position={[0, 1.45, 0]} castShadow>
            <coneGeometry args={[1.0, 0.6, 4]} />
            <meshStandardMaterial color="#d4af37" metalness={0.7} roughness={0.3} />
          </mesh>
        </group>
      )}

      {island.id === 'island-modern' && (
        <group position={[0, 0.25, 0]}>
          {/* Modern White Cube Building */}
          <mesh position={[0, 0.7, 0]} castShadow>
            <boxGeometry args={[1.3, 1.3, 1.3]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.15} metalness={0.1} />
          </mesh>
          {/* Glass skylight */}
          <mesh position={[0, 1.4, 0]}>
            <boxGeometry args={[0.9, 0.1, 0.9]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#38bdf8"
              emissiveIntensity={1.2}
              roughness={0.1}
            />
          </mesh>
        </group>
      )}

      {island.id === 'island-maritime' && (
        <group position={[0, 0.25, 0]}>
          {/* Maritime Ocean Spire / Beacon */}
          <mesh position={[0, 0.9, 0]} castShadow>
            <cylinderGeometry args={[0.2, 0.45, 1.7, 16]} />
            <meshStandardMaterial color="#0284c7" metalness={0.5} roughness={0.3} />
          </mesh>
          {/* Rotating radar / ring */}
          <mesh position={[0, 1.6, 0]} rotation={[Math.PI / 4, 0, 0]}>
            <torusGeometry args={[0.45, 0.05, 12, 32]} />
            <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={1.5} />
          </mesh>
        </group>
      )}

      {island.id === 'island-diponegoro' && (
        <group position={[0, 0.25, 0]}>
          {/* Cultural Monument / Keraton Pavilion */}
          <mesh position={[0, 0.7, 0]} castShadow>
            <cylinderGeometry args={[0.7, 0.85, 0.6, 8]} />
            <meshStandardMaterial color="#831843" roughness={0.5} />
          </mesh>
          <mesh position={[0, 1.25, 0]} castShadow>
            <coneGeometry args={[0.95, 0.7, 8]} />
            <meshStandardMaterial color="#ec4899" metalness={0.6} roughness={0.3} />
          </mesh>
        </group>
      )}

      {island.id === 'island-green' && (
        <group position={[0, 0.25, 0]}>
          {/* Eco Tree / Solar Tower */}
          <mesh position={[0, 0.8, 0]} castShadow>
            <dodecahedronGeometry args={[0.7, 1]} />
            <meshStandardMaterial color="#10b981" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.14, 0.18, 0.7, 12]} />
            <meshStandardMaterial color="#5c3a21" roughness={0.9} />
          </mesh>
        </group>
      )}

      {/* 4. Glowing Aura Ring (Highlights when hovered or current) */}
      <mesh ref={ringRef} position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.05, 2.25, 32]} />
        <meshBasicMaterial
          color={island.themeColor}
          side={THREE.DoubleSide}
          transparent
          opacity={isHovered ? 0.95 : isCurrent ? 0.75 : 0.35}
        />
      </mesh>

      {/* 5. Floating Beacon Diamond / Crystal */}
      <mesh ref={crystalRef} position={[0, 2.5, 0]}>
        <octahedronGeometry args={[0.32, 0]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={island.themeColor}
          emissiveIntensity={isHovered ? 3.0 : 1.6}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* PointLight illuminating the island */}
      <pointLight
        position={[0, 2.2, 0]}
        color={island.themeColor}
        intensity={isHovered ? 4.0 : 1.8}
        distance={6}
      />
    </group>
  )
}
