import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

interface DiponegoroMonumentProps {
  position?: [number, number, number]
  onSelect?: () => void
}

/**
 * Monumen Pangeran Diponegoro Menunggang Kuda
 * Menggunakan cut-out transparent 3D beresolusi tinggi murni dari foto referensi:
 * - Kuda jingkrak hitam legam, Pangeran Diponegoro berkeris dan berserban putih.
 * - Tanpa bentuk-bentuk silinder/robot yang merusak estetika.
 * - Berdiri di atas pedestal marmer hitam megah dengan Logo Undip transparan dan lampu sorot museum.
 */
export function DiponegoroMonument({
  position = [0, 0, 0],
  onSelect,
}: DiponegoroMonumentProps) {
  const [statueTexture, setStatueTexture] = useState<THREE.Texture | null>(null)
  const [logoTexture, setLogoTexture] = useState<THREE.Texture | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const monumentRef = useRef<THREE.Group>(null)

  useEffect(() => {
    const loader = new THREE.TextureLoader()

    loader.load('/brand/patung_diponegoro.png', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace
      tex.generateMipmaps = true
      tex.minFilter = THREE.LinearMipmapLinearFilter
      setStatueTexture(tex)
    })

    loader.load('/brand/logo_undip.png', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace
      setLogoTexture(tex)
    })
  }, [])

  return (
    <group
      ref={monumentRef}
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
          1. TIERED BLACK MARBLE & GOLD PEDESTAL PLINTH
          ========================================================= */}
      {/* Base Step 1 (Bottom Tier) */}
      <mesh position={[0, 0.18, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.2, 0.36, 4.2]} />
        <meshStandardMaterial color="#081020" roughness={0.3} metalness={0.2} />
      </mesh>
      {/* Gold Trim 1 */}
      <mesh position={[0, 0.37, 0]}>
        <boxGeometry args={[4.24, 0.04, 4.24]} />
        <meshStandardMaterial color="#d4af37" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Base Step 2 (Middle Tier) */}
      <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.6, 0.55, 3.6]} />
        <meshStandardMaterial color="#0b162c" roughness={0.25} metalness={0.2} />
      </mesh>
      {/* Gold Trim 2 */}
      <mesh position={[0, 0.94, 0]}>
        <boxGeometry args={[3.64, 0.04, 3.64]} />
        <meshStandardMaterial color="#d4af37" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Main Pedestal Block (Deep Royal Navy Obsidian Marble — Never turns brown) */}
      <mesh position={[0, 1.35, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.0, 0.8, 3.0]} />
        <meshStandardMaterial
          color="#070e1c"
          roughness={0.18}
          metalness={0.25}
          emissive={isHovered ? '#0e2348' : '#000000'}
          emissiveIntensity={isHovered ? 0.3 : 0}
        />
      </mesh>
      {/* Gold Top Rim */}
      <mesh position={[0, 1.77, 0]}>
        <boxGeometry args={[3.15, 0.06, 3.15]} />
        <meshStandardMaterial color="#d4af37" metalness={0.88} roughness={0.2} />
      </mesh>

      {/* =========================================================
          2. LOGO UNDIP (HIGH CONTRAST GILDED NAVY EMBLEM MEDALLION)
          Framed on an official Undip Navy & 24k Gold backing plaque
          so it NEVER blends into the pedestal or background.
          ========================================================= */}
      {/* Front Face Emblem Plaque */}
      <group position={[0, 1.35, 1.51]}>
        {/* Navy Shield Background */}
        <mesh position={[0, 0, 0.005]}>
          <boxGeometry args={[0.82, 1.02, 0.012]} />
          <meshStandardMaterial color="#0b1730" roughness={0.3} metalness={0.35} />
        </mesh>
        {/* Polished Gold Beveled Trim */}
        <mesh position={[0, 0, 0.003]}>
          <boxGeometry args={[0.86, 1.06, 0.008]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.18} />
        </mesh>
        {/* Logo Undip with crisp white text & gold crest */}
        {logoTexture && (
          <mesh position={[0, 0, 0.016]}>
            <planeGeometry args={[0.74, 0.94]} />
            <meshBasicMaterial map={logoTexture} transparent alphaTest={0.05} />
          </mesh>
        )}
      </group>

      {/* Back Face Emblem Plaque */}
      <group position={[0, 1.35, -1.51]} rotation={[0, Math.PI, 0]}>
        {/* Navy Shield Background */}
        <mesh position={[0, 0, 0.005]}>
          <boxGeometry args={[0.82, 1.02, 0.012]} />
          <meshStandardMaterial color="#0b1730" roughness={0.3} metalness={0.35} />
        </mesh>
        {/* Polished Gold Beveled Trim */}
        <mesh position={[0, 0, 0.003]}>
          <boxGeometry args={[0.86, 1.06, 0.008]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.18} />
        </mesh>
        {/* Logo Undip */}
        {logoTexture && (
          <mesh position={[0, 0, 0.016]}>
            <planeGeometry args={[0.74, 0.94]} />
            <meshBasicMaterial map={logoTexture} transparent alphaTest={0.05} />
          </mesh>
        )}
      </group>

      {/* Brass Plaque on Front Step */}
      <group position={[0, 0.65, 1.82]}>
        <mesh castShadow>
          <boxGeometry args={[2.6, 0.34, 0.02]} />
          <meshStandardMaterial color="#c59b27" metalness={0.85} roughness={0.25} />
        </mesh>
        <mesh position={[0, 0, 0.014]}>
          <boxGeometry args={[2.5, 0.26, 0.01]} />
          <meshStandardMaterial color="#0f2347" roughness={0.4} />
        </mesh>
      </group>

      {/* =========================================================
          3. STATUE: PANGERAN DIPONEGORO MENUNGGANG KUDA
          High-res silhouette with true transparency, resting on pedestal.
          Floor shadow completely eliminated.
          ========================================================= */}
      {statueTexture && (
        <group position={[0, 3.4, 0]}>
          {/* Main Front-Facing Plane (Seen when entering the gallery) */}
          <mesh position={[0, 0, 0]}>
            <planeGeometry args={[2.25, 3.2]} />
            <meshStandardMaterial
              map={statueTexture}
              transparent
              alphaTest={0.12}
              side={THREE.DoubleSide}
              roughness={0.4}
            />
          </mesh>

          {/* Perpendicular Side-Facing Plane (Seen from side galleries) */}
          <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[2.25, 3.2]} />
            <meshStandardMaterial
              map={statueTexture}
              transparent
              alphaTest={0.12}
              side={THREE.DoubleSide}
              roughness={0.4}
            />
          </mesh>
        </group>
      )}

      {/* =========================================================
          4. MUSEUM SPOTLIGHTS ILLUMINATING THE STATUE
          ========================================================= */}
      <spotLight
        position={[0, 5.8, 3.2]}
        target-position={[0, 3.2, 0]}
        intensity={3.8}
        angle={0.55}
        penumbra={0.3}
        color="#fffcf5"
        castShadow
      />
      <spotLight
        position={[0, 5.8, -3.2]}
        target-position={[0, 3.2, 0]}
        intensity={2.8}
        angle={0.55}
        penumbra={0.3}
        color="#fffcf5"
        castShadow
      />
      {/* Neutral Crisp Museum Plinth Daylight (Replaced warm yellow with neutral white) */}
      <pointLight position={[0, 2.8, 0]} color="#fffcf5" intensity={0.9} distance={6} />
    </group>
  )
}
