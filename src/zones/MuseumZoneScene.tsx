import { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { MUSEUM_ZONES, type ExhibitItem } from './types'
import { MuseumRoomEnvironment } from './MuseumRoomEnvironment'
import { MuseumExhibitsRenderer } from './MuseumExhibitsRenderer'
import { DiponegoroMonument } from './DiponegoroMonument'
import { DiponegoroViewer } from './DiponegoroViewer'
import { ModernControls } from '../modern/ModernControls'
import { ExhibitDetailPanel } from './ExhibitDetailPanel'
import './museum.css'

interface MuseumZoneSceneProps {
  currentZoneId: string
  onSwitchZone: (zoneId: string) => void
}

export function MuseumZoneScene({ currentZoneId, onSwitchZone }: MuseumZoneSceneProps) {
  const [selectedExhibit, setSelectedExhibit] = useState<ExhibitItem | null>(null)
  const [isPointerLocked, setIsPointerLocked] = useState(false)
  const [showDiponegoroViewer, setShowDiponegoroViewer] = useState(false)

  const activeZone =
    MUSEUM_ZONES.find((z) => z.id === currentZoneId) ?? MUSEUM_ZONES[0]

  // Track pointer lock state for crosshair visibility
  useEffect(() => {
    const handleLockChange = () => {
      setIsPointerLocked(document.pointerLockElement !== null)
    }
    document.addEventListener('pointerlockchange', handleLockChange)
    return () => document.removeEventListener('pointerlockchange', handleLockChange)
  }, [])

  return (
    <div className="museum-zone-root">
      {/* Top Banner (Navy & Gold Branding with Official 2D Undip Logo) */}
      <header className="museum-top-header">
        <div className="museum-branding">
          <img
            src="/brand/logo_undip.png"
            alt="Logo Universitas Diponegoro"
            style={{ width: '42px', height: '42px', objectFit: 'contain' }}
          />
          <div>
            <div className="museum-zone-code-tag">{activeZone.code}</div>
            <h1 className="museum-zone-main-title">{activeZone.title}</h1>
            <p className="museum-zone-sub-title">{activeZone.subtitle}</p>
          </div>
        </div>

        {/* Quick Zone Navigator Dropdown / Pills */}
        <nav className="museum-quick-nav">
          {MUSEUM_ZONES.map((z) => (
            <button
              key={z.id}
              type="button"
              className={`nav-pill ${z.id === currentZoneId ? 'active' : ''}`}
              onClick={() => onSwitchZone(z.id)}
            >
              {z.number}. {z.title.replace('The ', '')}
            </button>
          ))}
        </nav>
      </header>

      {/* ✦ CROSSHAIR — hanya tampil saat pointer lock aktif (klik kiri untuk lock) */}
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
          {/* Realistic Museum Interior: Walls, Parquet, Wainscoting, Spotlights (No Obstruction) */}
          <MuseumRoomEnvironment zone={activeZone} onNavigateZone={onSwitchZone} />

          {/* 3D Monument: Pangeran Diponegoro on Rearing Horse (Centerpiece of Zone 1) */}
          {currentZoneId === 'zona-1' && (
            <DiponegoroMonument
              position={[0, 0, 0]}
              onSelect={() => {
                setShowDiponegoroViewer(true)
                // Also set exhibit for info panel
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

          {/* Curation Exhibits: Portraits, Plaques, Vitrines, and 3D Podium Stands */}
          <MuseumExhibitsRenderer
            exhibits={activeZone.exhibits}
            onSelectExhibit={(item) => setSelectedExhibit(item)}
            selectedId={selectedExhibit?.id ?? null}
          />
        </Suspense>

        {/* Smooth First Person WASD + Mouse Look */}
        <ModernControls />
      </Canvas>

      {/* Bottom Desktop Navigation Hints */}
      <div className="museum-hints-bar" aria-hidden="true">
        <span>
          <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> jalan
        </span>
        <span>klik kiri untuk melihat (crosshair muncul)</span>
        <span>klik patung / lukisan / podium untuk membaca info</span>
        <span>gunakan navigasi zona di atas untuk jelajah ruangan</span>
      </div>

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
