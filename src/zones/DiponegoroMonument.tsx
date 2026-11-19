import { useEffect, useState } from 'react'
import { Billboard } from '@react-three/drei'
import * as THREE from 'three'

interface DiponegoroMonumentProps {
  position?: [number, number, number]
  onSelect?: () => void
}

export function DiponegoroMonument({
  position = [0, 0, 0],
  onSelect,
}: DiponegoroMonumentProps) {
  const [logoTexture, setLogoTexture] = useState<THREE.Texture | null>(null)
  const [statueTexture, setStatueTexture] = useState<THREE.Texture | null>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const loader = new THREE.TextureLoader()

    loader.load('/brand/logo_undip.png', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace
      setLogoTexture(tex)
    })

    // Patung Diponegoro PNG — single upright billboard (no cross-planes)
    loader.load('/brand/patung_diponegoro.png', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace
      tex.generateMipmaps = true
      tex.minFilter = THREE.LinearMipmapLinearFilter
      setStatueTexture(tex)
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
          1. TIERED BLACK MARBLE & GOLD PEDESTAL PLINTH
          ========================================================= */}
      {/* Base Step 1 (Bottom Tier) */}
      <mesh position={[0, 0.18, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.2, 0.36, 4.2]} />
        <meshStandardMaterial color="#081020" roughness={0.3} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.37, 0]}>
        <boxGeometry args={[4.24, 0.04, 4.24]} />
        <meshStandardMaterial color="#d4af37" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Base Step 2 */}
      <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.6, 0.55, 3.6]} />
        <meshStandardMaterial color="#0b162c" roughness={0.25} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.94, 0]}>
        <boxGeometry args={[3.64, 0.04, 3.64]} />
        <meshStandardMaterial color="#d4af37" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Main Pedestal Block */}
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
      <mesh position={[0, 1.77, 0]}>
        <boxGeometry args={[3.15, 0.06, 3.15]} />
        <meshStandardMaterial color="#d4af37" metalness={0.88} roughness={0.2} />
      </mesh>

      {/* =========================================================
          2. LOGO UNDIP MEDALLION — Gilded Navy Plaque
          ========================================================= */}
      {/* Front Face */}
      <group position={[0, 1.35, 1.51]}>
        <mesh position={[0, 0, 0.003]}>
          <boxGeometry args={[0.86, 1.06, 0.008]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.18} />
        </mesh>
        <mesh position={[0, 0, 0.011]}>
          <boxGeometry args={[0.80, 1.00, 0.008]} />
          <meshStandardMaterial color="#0b1730" roughness={0.3} metalness={0.35} />
        </mesh>
        {logoTexture && (
          <mesh position={[0, 0, 0.018]}>
            <planeGeometry args={[0.74, 0.94]} />
            <meshBasicMaterial map={logoTexture} transparent alphaTest={0.05} />
          </mesh>
        )}
      </group>

      {/* Back Face */}
      <group position={[0, 1.35, -1.51]} rotation={[0, Math.PI, 0]}>
        <mesh position={[0, 0, 0.003]}>
          <boxGeometry args={[0.86, 1.06, 0.008]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.18} />
        </mesh>
        <mesh position={[0, 0, 0.011]}>
          <boxGeometry args={[0.80, 1.00, 0.008]} />
          <meshStandardMaterial color="#0b1730" roughness={0.3} metalness={0.35} />
        </mesh>
        {logoTexture && (
          <mesh position={[0, 0, 0.018]}>
            <planeGeometry args={[0.74, 0.94]} />
            <meshBasicMaterial map={logoTexture} transparent alphaTest={0.05} />
          </mesh>
        )}
      </group>

      {/* Brass Name Plaque on Front Step */}
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
          3. PATUNG DIPONEGORO — Single upright billboard PNG
          Satu plane tegak lurus menghadap depan, tidak ada cross-planes.
          Sketchfab iframe dibuka via onSelect() overlay di atas canvas.
          ========================================================= */}
      {statueTexture && (
        // Billboard = selalu menghadap kamera dari sudut manapun
        // position Y = 1.8 (atas pedestal) + 1.6 (setengah tinggi) = 3.4
        <Billboard position={[0, 3.4, 0]} follow={true} lockX={false} lockY={true} lockZ={false}>
          <mesh>
            <planeGeometry args={[2.8, 3.6]} />
            <meshBasicMaterial
              map={statueTexture}
              transparent
              alphaTest={0.08}
              depthWrite={false}
            />
          </mesh>
        </Billboard>
      )}

      {/* =========================================================
          4. SPOTLIGHTS
          ========================================================= */}
      <spotLight
        position={[0, 5.8, 3.0]}
        target-position={[0, 3.0, 0]}
        intensity={4.5}
        angle={0.5}
        penumbra={0.35}
        color="#fffcf5"
        castShadow
      />
      <spotLight
        position={[0, 5.8, -3.0]}
        target-position={[0, 3.0, 0]}
        intensity={3.0}
        angle={0.5}
        penumbra={0.35}
        color="#fffcf5"
        castShadow
      />
      <pointLight position={[0, 3.2, 0]} color="#fffcf5" intensity={1.0} distance={7} />
    </group>
  )
}
