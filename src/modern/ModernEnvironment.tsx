import { useMemo } from 'react'
import * as THREE from 'three'

const ROOM_SIZE = 18
const ROOM_HEIGHT = 6

/**
 * Creates high-detail procedural white polished marble / epoxy floor texture
 */
function createModernFloorTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 1024
  const ctx = canvas.getContext('2d')
  if (ctx) {
    // Base white-grey marble
    ctx.fillStyle = '#f8fafc'
    ctx.fillRect(0, 0, 1024, 1024)

    // Subtle marble grain
    ctx.fillStyle = 'rgba(226, 232, 240, 0.4)'
    for (let i = 0; i < 40; i++) {
      ctx.beginPath()
      const x = Math.random() * 1024
      const y = Math.random() * 1024
      ctx.arc(x, y, 40 + Math.random() * 80, 0, Math.PI * 2)
      ctx.fill()
    }

    // Large format modern tile grid lines (2x2 tiles)
    ctx.strokeStyle = '#e2e8f0'
    ctx.lineWidth = 3
    const tiles = 4
    const step = 1024 / tiles
    for (let i = 0; i <= tiles; i++) {
      // Horizontal seams
      ctx.beginPath()
      ctx.moveTo(0, i * step)
      ctx.lineTo(1024, i * step)
      ctx.stroke()

      // Vertical seams
      ctx.beginPath()
      ctx.moveTo(i * step, 0)
      ctx.lineTo(i * step, 1024)
      ctx.stroke()
    }
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(3, 3)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

/**
 * Procedural wall title plaque for the modern pavilion
 */
function createModernPlaqueTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 256
  const ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.fillStyle = '#0f172a'
    ctx.fillRect(0, 0, 1024, 256)

    ctx.strokeStyle = '#38bdf8'
    ctx.lineWidth = 4
    ctx.strokeRect(10, 10, 1004, 236)

    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font = 'bold 44px "Segoe UI", Montserrat, sans-serif'
    ctx.fillStyle = '#f8fafc'
    ctx.fillText('UNIVERSITAS DIPONEGORO', 512, 85)

    ctx.font = '300 28px "Segoe UI", sans-serif'
    ctx.fillStyle = '#38bdf8'
    ctx.fillText('PAVILIUN RISET, TEKNOLOGI & INOVASI MODERN', 512, 165)
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

export function ModernEnvironment() {
  const floorTexture = useMemo(() => createModernFloorTexture(), [])
  const titleTexture = useMemo(() => createModernPlaqueTexture(), [])

  const half = ROOM_SIZE / 2

  return (
    <group>
      {/* 1. Polished White Marble Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[ROOM_SIZE, ROOM_SIZE]} />
        <meshStandardMaterial
          map={floorTexture}
          roughness={0.18}
          metalness={0.1}
          color="#ffffff"
        />
      </mesh>

      {/* 2. Pure White Modern Walls (Cube shape) */}
      {/* North Wall (-Z) */}
      <mesh position={[0, ROOM_HEIGHT / 2, -half]} receiveShadow>
        <planeGeometry args={[ROOM_SIZE, ROOM_HEIGHT]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.85} />
      </mesh>

      {/* South Wall (+Z) */}
      <mesh position={[0, ROOM_HEIGHT / 2, half]} rotation={[0, Math.PI, 0]} receiveShadow>
        <planeGeometry args={[ROOM_SIZE, ROOM_HEIGHT]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.85} />
      </mesh>

      {/* West Wall (-X) */}
      <mesh position={[-half, ROOM_HEIGHT / 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[ROOM_SIZE, ROOM_HEIGHT]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.85} />
      </mesh>

      {/* East Wall (+X) */}
      <mesh position={[half, ROOM_HEIGHT / 2, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[ROOM_SIZE, ROOM_HEIGHT]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.85} />
      </mesh>

      {/* 3. Modern Architectural Ceiling */}
      <mesh position={[0, ROOM_HEIGHT, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[ROOM_SIZE, ROOM_SIZE]} />
        <meshStandardMaterial color="#ffffff" roughness={0.9} />
      </mesh>

      {/* Recessed Modern LED Light Panels on Ceiling */}
      {[-4, 4].map((x) =>
        [-4, 4].map((z) => (
          <group key={`${x}-${z}`} position={[x, ROOM_HEIGHT - 0.05, z]}>
            <mesh>
              <boxGeometry args={[3.2, 0.08, 3.2]} />
              <meshStandardMaterial
                color="#ffffff"
                emissive="#ffffff"
                emissiveIntensity={1.8}
                roughness={0.2}
              />
            </mesh>
            {/* Direct downlight for bright contemporary museum feel */}
            <pointLight position={[0, -0.6, 0]} intensity={1.8} distance={9} color="#f8fafc" />
          </group>
        )),
      )}

      {/* Center Linear LED Skylight Cross */}
      <mesh position={[0, ROOM_HEIGHT - 0.04, 0]}>
        <boxGeometry args={[0.5, 0.06, 12]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={1.2}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[0, ROOM_HEIGHT - 0.04, 0]}>
        <boxGeometry args={[12, 0.06, 0.5]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={1.2}
          roughness={0.3}
        />
      </mesh>

      {/* Minimalist Black Recessed Baseboard Trim around the entire perimeter */}
      {[-half, half].map((pos, i) => (
        <group key={`base-z-${i}`}>
          <mesh position={[0, 0.04, pos]}>
            <boxGeometry args={[ROOM_SIZE, 0.08, 0.04]} />
            <meshStandardMaterial color="#0f172a" roughness={0.5} />
          </mesh>
          <mesh position={[pos, 0.04, 0]}>
            <boxGeometry args={[0.04, 0.08, ROOM_SIZE]} />
            <meshStandardMaterial color="#0f172a" roughness={0.5} />
          </mesh>
        </group>
      ))}

      {/* Modern Main Feature Plaque on the North Wall */}
      <group position={[0, 4.2, -half + 0.06]}>
        <mesh>
          <boxGeometry args={[6.8, 1.8, 0.08]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.7} />
        </mesh>
        <mesh position={[0, 0, 0.05]}>
          <planeGeometry args={[6.6, 1.6]} />
          <meshBasicMaterial map={titleTexture} />
        </mesh>
      </group>

      {/* 4 Slim Minimalist Architectural Pillars */}
      {[-5.5, 5.5].map((x) =>
        [-5.5, 5.5].map((z) => (
          <group key={`pillar-${x}-${z}`} position={[x, ROOM_HEIGHT / 2, z]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[0.65, ROOM_HEIGHT, 0.65]} />
              <meshStandardMaterial color="#f1f5f9" roughness={0.4} metalness={0.1} />
            </mesh>
            {/* Pillar glowing accent line */}
            <mesh position={[0, 0, 0.33]}>
              <boxGeometry args={[0.1, ROOM_HEIGHT - 1.2, 0.02]} />
              <meshStandardMaterial
                color="#0284c7"
                emissive="#38bdf8"
                emissiveIntensity={0.8}
                roughness={0.5}
              />
            </mesh>
          </group>
        )),
      )}

      {/* Modern Minimalist Gallery Benches */}
      {[-4.5, 4.5].map((x) => (
        <group key={`bench-${x}`} position={[x, 0.25, 0]}>
          {/* Bench seat */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.2, 0.12, 3.2]} />
            <meshStandardMaterial color="#334155" roughness={0.6} />
          </mesh>
          {/* Metallic legs */}
          {[-1.2, 1.2].map((bz) => (
            <mesh key={bz} position={[0, -0.13, bz]}>
              <boxGeometry args={[1.0, 0.24, 0.08]} />
              <meshStandardMaterial color="#94a3b8" metalness={0.85} roughness={0.2} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  )
}
