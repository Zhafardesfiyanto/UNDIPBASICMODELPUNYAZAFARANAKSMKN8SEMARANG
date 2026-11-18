import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { ModernEnvironment } from './ModernEnvironment'
import { ModernLighting } from './ModernLighting'
import { ModernExhibits } from './ModernExhibits'
import { ModernControls } from './ModernControls'
import { PressurePlate } from '../gallery/PressurePlate'
import { FLOATING_ISLANDS } from '../minimap/types'
import type { ModernExhibit } from './types'
import './modern.css'

interface ModernGallerySceneProps {
  onSwitchRoom: (room: string) => void
  roomId?: string
}

export function ModernGalleryScene({ onSwitchRoom, roomId = 'modern' }: ModernGallerySceneProps) {
  const [selectedExhibit, setSelectedExhibit] = useState<ModernExhibit | null>(null)

  const islandData = FLOATING_ISLANDS.find((i) => i.roomId === roomId) ?? FLOATING_ISLANDS[1]

  return (
    <div className="modern-root">
      {/* Top HUD */}
      <header className="modern-header">
        <div className="modern-badge">
          <span className="modern-dot" style={{ backgroundColor: islandData.themeColor, boxShadow: `0 0 10px ${islandData.themeColor}` }} />
          <span className="modern-title">
            {islandData.icon} {islandData.name} ({islandData.subtitle})
          </span>
        </div>
      </header>

      {/* 3D Scene */}
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        onPointerMissed={() => setSelectedExhibit(null)}
      >
        <color attach="background" args={['#ffffff']} />
        <PerspectiveCamera makeDefault position={[0, 1.6, 6]} fov={60} near={0.1} far={60} />

        <Suspense fallback={null}>
          <ModernLighting />
          <ModernEnvironment />
          <ModernExhibits
            onSelectExhibit={(ex) => setSelectedExhibit(ex)}
            selectedId={selectedExhibit?.id ?? null}
          />

          {/* Return Pressure Plate with Golden Vertical Light Beam */}
          <PressurePlate
            position={[0, 0, 7.0]}
            onStepOn={() => onSwitchRoom('classic')}
            beamColor={islandData.themeColor}
            accentColor={islandData.accentColor}
            label="KEMBALI KE RUANG KLASIK"
            height={5.8}
            activationRadius={1.2}
          />
        </Suspense>

        <ModernControls />
      </Canvas>

      {/* Desktop Hints */}
      <div className="modern-hints" aria-hidden="true">
        <span>
          <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> jalan
        </span>
        <span>mouse / drag arahkan pandangan</span>
        <span>klik stan untuk detail</span>
        <span>buka minimap untuk pilih 5 pulau</span>
      </div>

      {/* Exhibit Detail Modal */}
      {selectedExhibit && (
        <div className="modern-modal-overlay" onClick={() => setSelectedExhibit(null)}>
          <div className="modern-modal-card" onClick={(e) => e.stopPropagation()}>
            <span className="modern-modal-category">{selectedExhibit.category}</span>
            <h2 className="modern-modal-title">{selectedExhibit.title}</h2>
            <p className="modern-modal-summary">{selectedExhibit.summary}</p>
            <p className="modern-modal-desc">{selectedExhibit.description}</p>
            <button
              type="button"
              className="modern-modal-close-btn"
              onClick={() => setSelectedExhibit(null)}
            >
              Tutup & Lanjutkan Eksplorasi
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
