import { useMemo, useState } from 'react'
import * as THREE from 'three'

interface TembalangCampusMaketProps {
  position?: [number, number, number]
  onSelect?: () => void
}

/**
 * 3D Architectural Scale Model (Maket) of Undip Tembalang Integrated Campus.
 * Centerpiece of Zona 2: The Growth of Knowledge.
 */
export function TembalangCampusMaket({
  position = [0, 0, 0],
  onSelect,
}: TembalangCampusMaketProps) {
  const [logoTexture, setLogoTexture] = useState<THREE.Texture | null>(null)
  const [isHovered, setIsHovered] = useState(false)

  useMemo(() => {
    const loader = new THREE.TextureLoader()
    loader.load('/brand/logo_undip.png', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace
      setLogoTexture(tex)
    })
  }, [])

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
          1. TIERED PEDESTAL PLINTH (ROYAL NAVY & GOLD)
          ========================================================= */}
      {/* Base Step 1 */}
      <mesh position={[0, 0.16, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.4, 0.32, 4.4]} />
        <meshStandardMaterial color="#081020" roughness={0.3} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.33, 0]}>
        <boxGeometry args={[4.44, 0.03, 4.44]} />
        <meshStandardMaterial color="#d4af37" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Main Pedestal Body */}
      <mesh position={[0, 0.82, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.8, 0.96, 3.8]} />
        <meshStandardMaterial
          color="#0b162c"
          roughness={0.25}
          metalness={0.3}
          emissive={isHovered ? '#0284c7' : '#000000'}
          emissiveIntensity={isHovered ? 0.25 : 0}
        />
      </mesh>

      {/* Pedestal Top Table Lip */}
      <mesh position={[0, 1.32, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.0, 0.08, 4.0]} />
        <meshStandardMaterial color="#d4af37" metalness={0.88} roughness={0.2} />
      </mesh>

      {/* Undip Gilded Crest on Front Pedestal Face */}
      <group position={[0, 0.82, 1.91]}>
        <mesh position={[0, 0, 0.005]}>
          <boxGeometry args={[0.8, 1.0, 0.01]} />
          <meshStandardMaterial color="#0b1730" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.012]}>
          <boxGeometry args={[0.84, 1.04, 0.005]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
        </mesh>
        {logoTexture && (
          <mesh position={[0, 0, 0.02]}>
            <planeGeometry args={[0.7, 0.88]} />
            <meshBasicMaterial map={logoTexture} transparent alphaTest={0.05} />
          </mesh>
        )}
      </group>

      {/* Undip Crest on Back Pedestal Face */}
      <group position={[0, 0.82, -1.91]} rotation={[0, Math.PI, 0]}>
        <mesh position={[0, 0, 0.005]}>
          <boxGeometry args={[0.8, 1.0, 0.01]} />
          <meshStandardMaterial color="#0b1730" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.012]}>
          <boxGeometry args={[0.84, 1.04, 0.005]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
        </mesh>
        {logoTexture && (
          <mesh position={[0, 0, 0.02]}>
            <planeGeometry args={[0.7, 0.88]} />
            <meshBasicMaterial map={logoTexture} transparent alphaTest={0.05} />
          </mesh>
        )}
      </group>

      {/* Brass Title Plaque */}
      <group position={[0, 0.35, 2.22]}>
        <mesh>
          <boxGeometry args={[2.8, 0.28, 0.02]} />
          <meshStandardMaterial color="#d4af37" metalness={0.85} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0.012]}>
          <boxGeometry args={[2.7, 0.22, 0.01]} />
          <meshStandardMaterial color="#0f2347" roughness={0.4} />
        </mesh>
      </group>

      {/* =========================================================
          2. MINIATURE 3D CAMPUS TERRAIN & MASTERPLAN
          ========================================================= */}
      <group position={[0, 1.36, 0]}>
        {/* Base Green Contour Terrain */}
        <mesh position={[0, 0.03, 0]} receiveShadow>
          <boxGeometry args={[3.7, 0.06, 3.7]} />
          <meshStandardMaterial color="#2d5a27" roughness={0.8} />
        </mesh>

        {/* Terraced Hill Slopes (Tembalang Topography) */}
        <mesh position={[0, 0.07, -0.2]} receiveShadow>
          <boxGeometry args={[3.2, 0.04, 2.8]} />
          <meshStandardMaterial color="#386b31" roughness={0.85} />
        </mesh>
        <mesh position={[0, 0.1, -0.4]} receiveShadow>
          <boxGeometry args={[2.4, 0.04, 2.0]} />
          <meshStandardMaterial color="#427d39" roughness={0.85} />
        </mesh>

        {/* Ring Road (Jalan Lingkar Kampus Tembalang - Dark Asphalt) */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.105, 0]}>
          <ringGeometry args={[1.25, 1.45, 32]} />
          <meshStandardMaterial color="#334155" roughness={0.7} />
        </mesh>
        {/* Secondary access roads */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.104, 0.8]}>
          <planeGeometry args={[0.2, 1.6]} />
          <meshStandardMaterial color="#334155" roughness={0.7} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.104, -1.0]}>
          <planeGeometry args={[0.2, 1.2]} />
          <meshStandardMaterial color="#334155" roughness={0.7} />
        </mesh>

        {/* Waduk Resapan / Danau Tembalang (Glistening Blue Water) */}
        <group position={[0.9, 0.07, 0.8]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.55, 24]} />
            <meshStandardMaterial
              color="#0284c7"
              roughness={0.1}
              metalness={0.65}
              emissive="#0369a1"
              emissiveIntensity={0.2}
            />
          </mesh>
          {/* Stone Shoreline */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
            <ringGeometry args={[0.55, 0.62, 24]} />
            <meshStandardMaterial color="#78716c" roughness={0.9} />
          </mesh>
        </group>

        {/* =========================================================
            3. MINIATURE ICON: GEDUNG REKTORAT WIDYA PURAYA
            ========================================================= */}
        <group position={[0, 0.12, -0.4]}>
          {/* Main Hall Base */}
          <mesh position={[0, 0.12, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.7, 0.24, 0.7]} />
            <meshStandardMaterial color="#e2e8f0" roughness={0.4} />
          </mesh>
          {/* Glass Entrance Facade */}
          <mesh position={[0, 0.1, 0.355]}>
            <planeGeometry args={[0.4, 0.16]} />
            <meshStandardMaterial color="#0284c7" metalness={0.8} roughness={0.1} />
          </mesh>

          {/* Tier 1 Joglo Roof */}
          <mesh position={[0, 0.28, 0]} castShadow>
            <coneGeometry args={[0.55, 0.14, 4]} />
            <meshStandardMaterial color="#854d0e" roughness={0.6} />
          </mesh>
          {/* Tier 2 Middle Roof */}
          <mesh position={[0, 0.38, 0]} castShadow>
            <coneGeometry args={[0.42, 0.12, 4]} />
            <meshStandardMaterial color="#78350f" roughness={0.6} />
          </mesh>
          {/* Tier 3 Crown Apex Roof with Golden Finial */}
          <mesh position={[0, 0.48, 0]} castShadow>
            <coneGeometry args={[0.26, 0.12, 4]} />
            <meshStandardMaterial color="#92400e" roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.56, 0]}>
            <sphereGeometry args={[0.04, 12, 12]} />
            <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>

        {/* =========================================================
            4. MINIATURE FACULTY CLUSTERS (FH, FEB, FT, FK, FPIK, etc.)
            ========================================================= */}
        {/* Cluster Barat: Fakultas Teknik & FSM */}
        <group position={[-0.95, 0.12, -0.3]}>
          <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.5, 0.16, 0.35]} />
            <meshStandardMaterial color="#f1f5f9" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.18, 0]} castShadow>
            <boxGeometry args={[0.54, 0.04, 0.38]} />
            <meshStandardMaterial color="#0f766e" roughness={0.5} />
          </mesh>
          {/* Lab Tower */}
          <mesh position={[-0.15, 0.22, 0.1]} castShadow>
            <boxGeometry args={[0.18, 0.26, 0.18]} />
            <meshStandardMaterial color="#cbd5e1" roughness={0.3} metalness={0.2} />
          </mesh>
        </group>

        {/* Cluster Timur: FEB & Fakultas Hukum */}
        <group position={[0.95, 0.12, -0.3]}>
          <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.52, 0.16, 0.35]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.18, 0]} castShadow>
            <boxGeometry args={[0.56, 0.04, 0.38]} />
            <meshStandardMaterial color="#b45309" roughness={0.5} />
          </mesh>
        </group>

        {/* Cluster Selatan: FPIK & Pusat Riset Kelautan */}
        <group position={[-0.8, 0.1, 0.7]}>
          <mesh position={[0, 0.07, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.45, 0.14, 0.3]} />
            <meshStandardMaterial color="#f1f5f9" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.15, 0]} castShadow>
            <boxGeometry args={[0.48, 0.03, 0.33]} />
            <meshStandardMaterial color="#0284c7" roughness={0.5} />
          </mesh>
        </group>

        {/* Gedung Prof. Soedarto / Auditorium */}
        <group position={[0, 0.1, 0.35]}>
          <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.24, 0.28, 0.14, 16]} />
            <meshStandardMaterial color="#e2e8f0" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.16, 0]} castShadow>
            <cylinderGeometry args={[0.02, 0.32, 0.06, 16]} />
            <meshStandardMaterial color="#d4af37" metalness={0.7} roughness={0.3} />
          </mesh>
        </group>

        {/* =========================================================
            5. GREEN CAMPUS TREES & FOLIAGE
            ========================================================= */}
        {[
          [-0.4, 0.1, 0.1],
          [0.4, 0.1, 0.1],
          [-0.5, 0.1, -0.9],
          [0.5, 0.1, -0.9],
          [-1.2, 0.08, 0.2],
          [1.2, 0.08, 0.2],
          [0.3, 0.08, 0.9],
          [1.3, 0.07, 0.9],
          [-1.1, 0.08, -0.8],
          [1.1, 0.08, -0.8],
        ].map((tPos, idx) => (
          <group key={`maket-tree-${idx}`} position={[tPos[0], tPos[1], tPos[2]]}>
            <mesh position={[0, 0.04, 0]}>
              <cylinderGeometry args={[0.015, 0.02, 0.08, 8]} />
              <meshStandardMaterial color="#57361a" roughness={0.9} />
            </mesh>
            <mesh position={[0, 0.11, 0]} castShadow>
              <sphereGeometry args={[0.05 + (idx % 3) * 0.01, 8, 8]} />
              <meshStandardMaterial color={idx % 2 === 0 ? '#15803d' : '#166534'} roughness={0.8} />
            </mesh>
          </group>
        ))}

        {/* =========================================================
            6. PROTECTIVE ACRYLIC / GLASS SHOWCASE COVER
            ========================================================= */}
        <group position={[0, 0.55, 0]}>
          <mesh>
            <boxGeometry args={[3.6, 1.05, 3.6]} />
            <meshStandardMaterial
              color="#f8fafc"
              transparent
              opacity={0.12}
              roughness={0.05}
              metalness={0.1}
              depthWrite={false}
            />
          </mesh>
          {/* Subtle Brass Corner Rails */}
          {[-1.8, 1.8].map((cx) =>
            [-1.8, 1.8].map((cz) => (
              <mesh key={`corner-${cx}-${cz}`} position={[cx, 0, cz]}>
                <boxGeometry args={[0.025, 1.05, 0.025]} />
                <meshStandardMaterial color="#d4af37" metalness={0.85} roughness={0.2} />
              </mesh>
            )),
          )}
          {/* Top Thin Brass Rim */}
          <mesh position={[0, 0.53, 0]}>
            <boxGeometry args={[3.64, 0.02, 3.64]} />
            <meshStandardMaterial color="#d4af37" metalness={0.85} roughness={0.2} />
          </mesh>
        </group>
      </group>

      {/* =========================================================
          7. DEDICATED SPOTLIGHTS FOR THE CENTERPIECE MAKET
          ========================================================= */}
      <spotLight
        position={[0, 5.8, 2.5]}
        target-position={[0, 1.6, 0]}
        intensity={4.2}
        angle={0.6}
        penumbra={0.4}
        color="#f0f9ff"
        castShadow
      />
      <spotLight
        position={[0, 5.8, -2.5]}
        target-position={[0, 1.6, 0]}
        intensity={3.0}
        angle={0.6}
        penumbra={0.4}
        color="#e0f2fe"
        castShadow
      />
      <pointLight position={[0, 2.8, 0]} color="#38bdf8" intensity={0.8} distance={6} />
    </group>
  )
}
