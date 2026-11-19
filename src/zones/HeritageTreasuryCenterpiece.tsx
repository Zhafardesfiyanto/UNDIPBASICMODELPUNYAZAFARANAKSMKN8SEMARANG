import { useMemo, useState } from 'react'
import * as THREE from 'three'

interface HeritageTreasuryCenterpieceProps {
  position?: [number, number, number]
  onSelect?: () => void
}

/**
 * Centerpiece for Zona 3 (The Heritage of Undip).
 * Grand Treasury Display: Tongkat Pedel Senat Undip & Regalia Kehormatan.
 * Antique mahogany & gold showcase with red velvet cushion and glass cabinet.
 */
export function HeritageTreasuryCenterpiece({
  position = [0, 0, 0],
  onSelect,
}: HeritageTreasuryCenterpieceProps) {
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
          1. ANTIQUE MAHOGANY & BRONZE PEDESTAL
          ========================================================= */}
      {/* Tier 1 Base Plinth */}
      <mesh position={[0, 0.16, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.2, 0.32, 3.4]} />
        <meshStandardMaterial color="#1a0f07" roughness={0.35} metalness={0.25} />
      </mesh>
      <mesh position={[0, 0.33, 0]}>
        <boxGeometry args={[4.26, 0.04, 3.46]} />
        <meshStandardMaterial color="#c59b27" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Main Pedestal Body — Rich Dark Mahogany */}
      <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.8, 0.9, 3.0]} />
        <meshStandardMaterial
          color="#29140a"
          roughness={0.3}
          metalness={0.2}
          emissive={isHovered ? '#b45309' : '#000000'}
          emissiveIntensity={isHovered ? 0.35 : 0}
        />
      </mesh>

      {/* Top Gold Molding Lip */}
      <mesh position={[0, 1.28, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.0, 0.08, 3.2]} />
        <meshStandardMaterial color="#d4af37" metalness={0.88} roughness={0.2} />
      </mesh>

      {/* Gilded Front Crest */}
      <group position={[0, 0.8, 1.51]}>
        <mesh position={[0, 0, 0.005]}>
          <boxGeometry args={[0.82, 1.02, 0.01]} />
          <meshStandardMaterial color="#1a0f07" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.012]}>
          <boxGeometry args={[0.86, 1.06, 0.005]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
        </mesh>
        {logoTexture && (
          <mesh position={[0, 0, 0.02]}>
            <planeGeometry args={[0.72, 0.9]} />
            <meshBasicMaterial map={logoTexture} transparent alphaTest={0.05} />
          </mesh>
        )}
      </group>

      {/* =========================================================
          2. ROYAL CRIMSON VELVET DISPLAY BED
          ========================================================= */}
      <mesh position={[0, 1.34, 0]} receiveShadow>
        <boxGeometry args={[3.6, 0.06, 2.8]} />
        <meshStandardMaterial color="#661118" roughness={0.92} />
      </mesh>

      {/* Gilded Velvet Trim */}
      {[-1.76, 1.76].map((tx) => (
        <mesh key={`trim-x-${tx}`} position={[tx, 1.375, 0]}>
          <boxGeometry args={[0.04, 0.02, 2.8]} />
          <meshStandardMaterial color="#d4af37" metalness={0.85} roughness={0.2} />
        </mesh>
      ))}

      {/* =========================================================
          3. PUSAKA REGALIA: TONGKAT PEDEL SENAT UNDIP (1962)
          ========================================================= */}
      <group position={[0, 1.52, -0.2]}>
        {/* Support Brass Yokes */}
        {[-0.9, 0.9].map((sx) => (
          <group key={`yoke-${sx}`} position={[sx, 0, 0]}>
            <mesh position={[0, -0.06, 0]} castShadow>
              <cylinderGeometry args={[0.02, 0.035, 0.16, 16]} />
              <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0.02, 0]}>
              <torusGeometry args={[0.035, 0.012, 12, 16, Math.PI]} />
              <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
            </mesh>
          </group>
        ))}

        {/* Tongkat Pedel Shaft (Polished Carved Jati Wood) */}
        <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0.02, 0]} castShadow>
          <cylinderGeometry args={[0.032, 0.036, 2.5, 24]} />
          <meshStandardMaterial color="#3d2110" roughness={0.4} />
        </mesh>

        {/* Gold Rings along Shaft */}
        {[-0.6, -0.2, 0.2, 0.6].map((gx) => (
          <mesh key={`ring-${gx}`} rotation={[0, 0, Math.PI / 2]} position={[gx, 0.02, 0]}>
            <cylinderGeometry args={[0.039, 0.039, 0.05, 24]} />
            <meshStandardMaterial color="#d4af37" metalness={0.92} roughness={0.18} />
          </mesh>
        ))}

        {/* Head of Pedel Mace (Garuda & Keris Diponegoro Emblem) */}
        <group position={[1.35, 0.02, 0]}>
          <mesh rotation={[0, 0, -Math.PI / 2]} castShadow>
            <coneGeometry args={[0.08, 0.22, 16]} />
            <meshStandardMaterial color="#d4af37" metalness={0.92} roughness={0.18} />
          </mesh>
          <mesh position={[0.14, 0, 0]} castShadow>
            <sphereGeometry args={[0.065, 16, 16]} />
            <meshStandardMaterial color="#ffd700" metalness={0.95} roughness={0.15} />
          </mesh>
          {/* Flame / Keris Crown Finial */}
          <mesh position={[0.24, 0, 0]} rotation={[0, 0, -Math.PI / 2]} castShadow>
            <coneGeometry args={[0.045, 0.16, 8]} />
            <meshStandardMaterial color="#fef08a" metalness={0.95} roughness={0.15} />
          </mesh>
        </group>

        {/* Bottom Finial */}
        <mesh position={[-1.3, 0.02, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <coneGeometry args={[0.04, 0.12, 16]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* =========================================================
          4. KALUNG MEDALI REKTORAT DI ATAS BANTAL BELUDRU
          ========================================================= */}
      <group position={[0, 1.4, 0.6]}>
        {/* Velvet Presentation Cushion */}
        <mesh position={[0, 0.02, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.9, 0.06, 0.7]} />
          <meshStandardMaterial color="#4c0519" roughness={0.88} />
        </mesh>
        {/* Gold Tassels at Corners */}
        {[-0.43, 0.43].map((cx) =>
          [-0.33, 0.33].map((cz) => (
            <mesh key={`tassel-${cx}-${cz}`} position={[cx, 0.015, cz]}>
              <sphereGeometry args={[0.025, 8, 8]} />
              <meshStandardMaterial color="#d4af37" metalness={0.85} roughness={0.25} />
            </mesh>
          )),
        )}

        {/* Presidential Leadership Chain Necklace */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.06, 0]}>
          <torusGeometry args={[0.22, 0.018, 12, 32]} />
          <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.15} />
        </mesh>

        {/* Medallion Pendant */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.065, 0.2]}>
          <cylinderGeometry args={[0.075, 0.075, 0.015, 24]} />
          <meshStandardMaterial color="#ffd700" metalness={0.95} roughness={0.15} />
        </mesh>
      </group>

      {/* =========================================================
          5. CRYSTAL GLASS SHOWCASE COVER
          ========================================================= */}
      <group position={[0, 1.88, 0]}>
        <mesh>
          <boxGeometry args={[3.6, 1.0, 2.8]} />
          <meshStandardMaterial
            color="#fffbeb"
            transparent
            opacity={0.14}
            roughness={0.05}
            metalness={0.2}
            depthWrite={false}
          />
        </mesh>
        {/* Brass Pillars on Glass Frame */}
        {[-1.8, 1.8].map((cx) =>
          [-1.4, 1.4].map((cz) => (
            <mesh key={`p-corner-${cx}-${cz}`} position={[cx, 0, cz]}>
              <boxGeometry args={[0.03, 1.0, 0.03]} />
              <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
            </mesh>
          )),
        )}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[3.64, 0.02, 2.84]} />
          <meshStandardMaterial color="#d4af37" metalness={0.85} roughness={0.2} />
        </mesh>
      </group>

      {/* =========================================================
          6. WARM TREASURY SPOTLIGHTS
          ========================================================= */}
      <spotLight
        position={[0, 5.8, 2.4]}
        target-position={[0, 1.5, 0]}
        intensity={4.8}
        angle={0.55}
        penumbra={0.35}
        color="#fff4e0"
        castShadow
      />
      <spotLight
        position={[0, 5.8, -2.4]}
        target-position={[0, 1.5, 0]}
        intensity={3.2}
        angle={0.55}
        penumbra={0.35}
        color="#fed7aa"
        castShadow
      />
      <pointLight position={[0, 2.2, 0]} color="#fef08a" intensity={1.5} distance={5} />
    </group>
  )
}
