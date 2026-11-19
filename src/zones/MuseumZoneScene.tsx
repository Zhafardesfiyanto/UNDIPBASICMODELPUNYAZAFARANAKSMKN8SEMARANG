import { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { MUSEUM_ZONES, type ExhibitItem } from './types'
import { MuseumRoomEnvironment } from './MuseumRoomEnvironment'
import { MuseumExhibitsRenderer } from './MuseumExhibitsRenderer'
import { DiponegoroMonument } from './DiponegoroMonument'
import { TembalangCampusMaket } from './TembalangCampusMaket'
import { HeritageTreasuryCenterpiece } from './HeritageTreasuryCenterpiece'
import { ModernWorldClassCenterpiece } from './ModernWorldClassCenterpiece'
import { DiponegoroViewer } from './DiponegoroViewer'
import { ModernControls } from '../modern/ModernControls'
import { ExhibitDetailPanel } from './ExhibitDetailPanel'
import './museum.css'

interface MuseumZoneSceneProps {
  currentZoneId: string
  onSwitchZone: (zoneId: string) => void
}

const ZONE_LABELS: Record<string, string> = {
  'zona-1': 'Origin of Undip',
  'zona-2': 'Growth of Knowledge',
  'zona-3': 'Heritage of Undip',
  'zona-4': 'Undip Today',
  'zona-5': 'Undip Future',
}

export function MuseumZoneScene({ currentZoneId, onSwitchZone }: MuseumZoneSceneProps) {
  const [selectedExhibit, setSelectedExhibit] = useState<ExhibitItem | null>(null)
  const [isPointerLocked, setIsPointerLocked] = useState(false)
  const [showDiponegoroViewer, setShowDiponegoroViewer] = useState(false)

  const activeZone =
    MUSEUM_ZONES.find((z) => z.id === currentZoneId) ?? MUSEUM_ZONES[0]

  // Track pointer lock state for crosshair visibility and UI fade
  useEffect(() => {
    const handleLockChange = () => {
      setIsPointerLocked(document.pointerLockElement !== null)
    }
    document.addEventListener('pointerlockchange', handleLockChange)
    return () => document.removeEventListener('pointerlockchange', handleLockChange)
  }, [])

  return (
    <div className="museum-zone-root">
      {/* Top Banner (Auto-fades when looking around in first-person mode so it never obstructs view) */}
      <header className={`museum-top-header ${isPointerLocked ? 'pointer-locked-hidden' : ''}`}>
        <div className="museum-branding">
          <img
            src="/brand/logo_undip.png"
            alt="Logo Universitas Diponegoro"
            style={{ width: '40px', height: '40px', objectFit: 'contain' }}
          />
          <div>
            <h1 className="museum-zone-main-title">{activeZone.title}</h1>
            <p className="museum-zone-sub-title">{activeZone.subtitle}</p>
          </div>
        </div>

        {/* Clean Zone Navigator Pills (No numbers per user request) */}
        <nav className="museum-quick-nav">
          {MUSEUM_ZONES.map((z) => (
            <button
              key={z.id}
              type="button"
              className={`nav-pill ${z.id === currentZoneId ? 'active' : ''}`}
              onClick={() => onSwitchZone(z.id)}
            >
              {ZONE_LABELS[z.id] ?? z.title.replace('The ', '')}
            </button>
          ))}
        </nav>
      </header>

      {/* ✦ CROSSHAIR — center reticle, only visible when cursor is locked */}
      {isPointerLocked && !selectedExhibit && (
        <div className="museum-crosshair" aria-hidden="true">
          <span className="ch-h" />
          <span className="ch-v" />
          <span className="ch-dot" />
        </div>
      )}

      {/* Full 3D Realistic Museum Canvas */}
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        onPointerMissed={() => setSelectedExhibit(null)}
      >
        <color attach="background" args={['#0e1424']} />
        <PerspectiveCamera makeDefault position={[0, 1.6, 12]} fov={60} near={0.1} far={120} />

        {/* Ambient Museum Lighting */}
        <ambientLight color="#fff8ef" intensity={0.9} />
        {/* Soft Natural Key Light */}
        <directionalLight
          position={[3, 8, 4]}
          intensity={1.2}
          color="#fef3c7"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <directionalLight position={[-4, 6, -3]} intensity={0.5} color="#e2e8f0" />

        <Suspense fallback={null}>
          {/* Realistic Museum Interior: Walls, Floor, Wainscoting, Spotlights (Zone-specific styling) */}
          <MuseumRoomEnvironment zone={activeZone} onNavigateZone={onSwitchZone} />

          {/* 3D Centerpiece: Zona 1 — Monumen Pangeran Diponegoro */}
          {currentZoneId === 'zona-1' && (
            <DiponegoroMonument
              position={[0, 0, 0]}
              onSelect={() => {
                setShowDiponegoroViewer(true)
                setSelectedExhibit({
                  id: 'z1-monumen-diponegoro',
                  title: 'Monumen Pangeran Diponegoro Menunggang Kuda',
                  subtitle: 'Simbol Keteladanan, Keberanian, dan Jiwa Patriotik Universitas Diponegoro',
                  category: 'Identitas Utama Universitas',
                  year: '1960–Sekarang',
                  description:
                    'Patung Pangeran Diponegoro yang gagah menunggangi kuda hitam legam yang sedang berjingkrak dengan keris terhunus ke depan melambangkan tekad bulat pantang menyerah dalam menegakkan kebenaran. Pangeran Diponegoro adalah Pahlawan Nasional Indonesia pemimpin Perang Jawa (1825–1830) yang namanya diabadikan oleh Presiden Ir. Soekarno sebagai nama Universitas Diponegoro pada tanggal 9 Januari 1960.',
                  imagePath: '/brand/patung_diponegoro.png',
                  modelType: 'stand',
                  position: [0, 0, 0],
                })
              }}
            />
          )}

          {/* 3D Centerpiece: Zona 2 — Maket Kampus Terpadu Tembalang */}
          {currentZoneId === 'zona-2' && (
            <TembalangCampusMaket
              position={[0, 0, 0]}
              onSelect={() => {
                setSelectedExhibit({
                  id: 'z2-maket-tembalang',
                  title: 'Maket Masterplan Kampus Terpadu Tembalang (180 Ha)',
                  subtitle: 'Pusat Keunggulan Sains, Rektorat Widya Puraya & Kampus Hijau Lestari',
                  category: 'Transformasi Kampus',
                  year: '1985–Sekarang',
                  description:
                    'Maket 3D interaktif kawasan kampus terpadu Tembalang seluas 180 hektar di perbukitan selatan Semarang. Menampilkan gedung rektorat Widya Puraya beratap joglo modern bertingkat, danau resapan air, komplek 11 fakultas modern, gedung laboratorium riset, serta infrastruktur kampus hijau berstandar UI GreenMetric.',
                  modelType: 'stand',
                  position: [0, 0, 0],
                })
              }}
            />
          )}

          {/* 3D Centerpiece: Zona 3 — Meja Pusaka Regalia & Tongkat Pedel Senat Undip */}
          {currentZoneId === 'zona-3' && (
            <HeritageTreasuryCenterpiece
              position={[0, 0, 0]}
              onSelect={() => {
                setSelectedExhibit({
                  id: 'z3-meja-regalia',
                  title: 'Meja Pusaka Regalia & Tongkat Pedel Senat Emas',
                  subtitle: 'Koleksi Benda Upacara Kehormatan Tertinggi Universitas Diponegoro',
                  category: 'Artefak Akademik',
                  year: '1962',
                  description:
                    'Showcase kristal berlapis emas berisi Tongkat Pedel Senat bertatahkan burung garuda dan keris Diponegoro emas, kalung medali rantai rasi kepemimpinan rektorat pada bantal beludru merah, dan cap segel resmi Rektorat Universitas Diponegoro.',
                  modelType: 'stand',
                  position: [0, 0, 0],
                })
              }}
            />
          )}

          {/* 3D Centerpiece: Zona 4 — Monumen Widya Puraya & Globe Prestasi Dunia Top 500 WCU */}
          {currentZoneId === 'zona-4' && (
            <ModernWorldClassCenterpiece
              position={[0, 0, 0]}
              onSelect={() => {
                setSelectedExhibit({
                  id: 'z4-monumen-globe-wcu',
                  title: 'Monumen Widya Puraya & Globe Prestasi Dunia (Top 500 WCU)',
                  subtitle: 'Simbol Keunggulan Global, Reputasi Internasional & PTN-BH Mandiri',
                  category: 'Prestasi Internasional',
                  year: '2024',
                  description:
                    'Monumen modern futuristik yang menampilkan Gedung Widya Puraya dengan cincin orbit emas berputar dan pencahayaan LED biru, melambangkan capaian Undip menembus jajaran Top 500 universitas terbaik dunia dalam QS World University Rankings.',
                  modelType: 'stand',
                  position: [0, 0, 0],
                })
              }}
            />
          )}

          {/* Curation Exhibits: Portraits, Plaques, Vitrines, and 3D Reading Podiums */}
          <MuseumExhibitsRenderer
            exhibits={activeZone.exhibits}
            onSelectExhibit={(item) => setSelectedExhibit(item)}
            selectedId={selectedExhibit?.id ?? null}
          />
        </Suspense>

        {/* Smooth First Person WASD + Mouse Look */}
        <ModernControls />
      </Canvas>

      {/* Sketchfab 3D Viewer Overlay — Pangeran Diponegoro */}
      <DiponegoroViewer
        isOpen={showDiponegoroViewer}
        onClose={() => setShowDiponegoroViewer(false)}
      />

      {/* Exhibit Detail Panel Modal */}
      <ExhibitDetailPanel
        exhibit={selectedExhibit}
        onClose={() => {
          setSelectedExhibit(null)
          setShowDiponegoroViewer(false)
        }}
      />
    </div>
  )
}
