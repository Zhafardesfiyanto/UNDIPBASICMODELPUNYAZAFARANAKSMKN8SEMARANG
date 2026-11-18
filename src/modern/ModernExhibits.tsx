import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { ModernExhibit } from './types'

export const MODERN_EXHIBITS: ModernExhibit[] = [
  {
    id: 'undip-monument',
    title: 'Monumen Lambang Universitas Diponegoro',
    category: 'Masterpiece 3D Pavilion',
    year: '2026',
    summary: 'Ikon kehormatan dan semangat kepahlawanan Pangeran Diponegoro yang menaungi seluruh civitas akademika.',
    description:
      'Universitas Diponegoro dinamai untuk mengenang Pangeran Diponegoro, pahlawan nasional Indonesia pejuang kemerdekaan. Semangat patriotisme, integritas, dan dedikasi ilmiah menjadi landasan utama visi Undip sebagai World Class University yang unggul dan berkelanjutan.',
    position: [0, 0, 0],
    color: '#0284c7',
  },
  {
    id: 'undip-maritime-robotics',
    title: 'Robotika & Inovasi Maritim Tropis',
    category: 'Riset & Rekayasa Teknologi',
    year: '2024–2026',
    summary: 'Pengembangan teknologi wahana bawah air tak berawak (AUV) dan pemantauan ekosistem laut.',
    description:
      'Tim riset mahasiswa dan dosen Fakultas Teknik serta Fakultas Perikanan & Ilmu Kelautan Undip mengembangkan armada Autonomous Underwater Vehicle (AUV) dan sensor pintar untuk eksplorasi maritim nusantara, memetakan keanekaragaman hayati laut dan monitoring kelestarian terumbu karang.',
    position: [4.5, 0, -3.2],
    color: '#10b981',
  },
  {
    id: 'undip-green-campus',
    title: 'Smart Green Campus & Energi Bersih',
    category: 'Keberlanjutan Lingkungan',
    year: '2025',
    summary: 'Kawasan kampus hijau Tembalang yang menerapkan panel surya, hutan kampus, dan pengelolaan air sirkular.',
    description:
      'Kampus Undip Tembalang secara konsisten meraih peringkat top nasional dalam UI GreenMetric World University Rankings. Mengintegrasikan pembangkit listrik tenaga surya (PLTS), sistem pengolahan limbah mandiri, dan waduk konservasi alam seluas 1 hektar.',
    position: [-4.5, 0, -3.2],
    color: '#f59e0b',
  },
  {
    id: 'undip-medical-innovation',
    title: 'Inovasi Kedokteran & Bioteknologi Tropis',
    category: 'Kesehatan & Sains',
    year: '2025',
    summary: 'Rumah Sakit Nasional Diponegoro (RSND) dan pusat riset vaksin serta terapi sel punca.',
    description:
      'RSND dan Fakultas Kedokteran Undip menjadi pusat rujukan biomedis dan riset penyakit tropis di Jawa Tengah, mengembangkan nanomedisin herbal lokal dan sistem telemedisin terintegrasi untuk masyarakat.',
    position: [0, 0, -6.2],
    color: '#ec4899',
  },
]

interface ModernExhibitsProps {
  onSelectExhibit: (exhibit: ModernExhibit) => void
  selectedId: string | null
}

export function ModernExhibits({ onSelectExhibit, selectedId }: ModernExhibitsProps) {
  const centerOrbRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (centerOrbRef.current) {
      centerOrbRef.current.rotation.y += delta * 0.8
      centerOrbRef.current.rotation.x = Math.sin(centerOrbRef.current.rotation.y * 0.5) * 0.15
    }
  })

  return (
    <group>
      {/* 1. Center Pedestal (Grand Monument Showcase) */}
      <group position={[0, 0, 0]}>
        {/* Tiered White Pedestal */}
        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.5, 1.7, 0.9, 32]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.2} metalness={0.15} />
        </mesh>
        {/* Glow rim */}
        <mesh position={[0, 0.91, 0]}>
          <ringGeometry args={[1.35, 1.48, 32]} />
          <meshBasicMaterial color="#38bdf8" side={THREE.DoubleSide} />
        </mesh>

        {/* Glass Vitrine Showcase Cube */}
        <mesh position={[0, 1.9, 0]}>
          <boxGeometry args={[2.2, 1.9, 2.2]} />
          <meshPhysicalMaterial
            color="#ffffff"
            transparent
            opacity={0.18}
            roughness={0.05}
            transmission={0.9}
            thickness={0.5}
            ior={1.5}
          />
        </mesh>

        {/* Glass Case Chrome Frame */}
        <mesh position={[0, 1.9, 0]}>
          <boxGeometry args={[2.22, 1.92, 2.22]} />
          <meshStandardMaterial
            color="#94a3b8"
            wireframe
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>

        {/* 3D Rotating Golden Diponegoro Crest Emblem inside */}
        <group ref={centerOrbRef} position={[0, 1.9, 0]}>
          {/* Central Gold Star/Medallion */}
          <mesh castShadow>
            <dodecahedronGeometry args={[0.55, 0]} />
            <meshStandardMaterial
              color="#fbbf24"
              emissive="#b45309"
              emissiveIntensity={0.6}
              metalness={0.9}
              roughness={0.18}
            />
          </mesh>
          {/* Orbital Rings */}
          <mesh rotation={[Math.PI / 4, 0, 0]}>
            <torusGeometry args={[0.78, 0.03, 16, 48]} />
            <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={1.2} />
          </mesh>
          <mesh rotation={[-Math.PI / 4, 0, 0]}>
            <torusGeometry args={[0.92, 0.03, 16, 48]} />
            <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>

        {/* Interactive Click Trigger */}
        <mesh
          position={[0, 1.4, 0]}
          onClick={(e) => {
            e.stopPropagation()
            onSelectExhibit(MODERN_EXHIBITS[0])
          }}
          onPointerOver={() => {
            document.body.style.cursor = 'pointer'
          }}
          onPointerOut={() => {
            document.body.style.cursor = ''
          }}
        >
          <cylinderGeometry args={[1.5, 1.5, 2.2, 16]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      </group>

      {/* 2. Side Pedestals */}
      {MODERN_EXHIBITS.slice(1).map((exhibit) => {
        const isSel = selectedId === exhibit.id
        return (
          <group
            key={exhibit.id}
            position={exhibit.position}
            onClick={(e) => {
              e.stopPropagation()
              onSelectExhibit(exhibit)
            }}
            onPointerOver={() => {
              document.body.style.cursor = 'pointer'
            }}
            onPointerOut={() => {
              document.body.style.cursor = ''
            }}
          >
            {/* White Minimalist Pedestal Plinth */}
            <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.2, 1.0, 1.2]} />
              <meshStandardMaterial
                color="#ffffff"
                roughness={0.25}
                emissive={isSel ? exhibit.color : '#000000'}
                emissiveIntensity={isSel ? 0.3 : 0}
              />
            </mesh>

            {/* Glowing Accent Ring on plinth top */}
            <mesh position={[0, 1.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.45, 0.52, 32]} />
              <meshBasicMaterial color={exhibit.color ?? '#38bdf8'} side={THREE.DoubleSide} />
            </mesh>

            {/* 3D Floating Geometric Model on Pedestal */}
            <mesh position={[0, 1.45, 0]} castShadow>
              <icosahedronGeometry args={[0.32, 0]} />
              <meshStandardMaterial
                color={exhibit.color ?? '#38bdf8'}
                roughness={0.2}
                metalness={0.7}
                emissive={exhibit.color ?? '#38bdf8'}
                emissiveIntensity={0.5}
              />
            </mesh>

            {/* Placard / Title Label on Front Face of Pedestal */}
            <mesh position={[0, 0.65, 0.61]}>
              <planeGeometry args={[1.0, 0.35]} />
              <meshStandardMaterial color="#0f172a" roughness={0.5} />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}
