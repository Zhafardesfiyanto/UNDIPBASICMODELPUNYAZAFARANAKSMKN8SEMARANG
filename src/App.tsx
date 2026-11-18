import { useCallback, useState } from 'react'
import { MuseumZoneScene } from './zones/MuseumZoneScene'
import { RoomTransition } from './components/RoomTransition'

/**
 * Museum Virtual Undip — Aplikasi Web 3D Resmi.
 * Struktur 5 Zona Kurasi:
 * 1. Zona 1 — The Origin of Undip (Sejarah Pendirian & Mr. Imam Bardjo)
 * 2. Zona 2 — The Growth of Knowledge (Fakultas & Transformasi Kampus)
 * 3. Zona 3 — The Heritage of Undip (Artefak Akademik & Memorabilia)
 * 4. Zona 4 — Undip Today (Kampus Modern & Prestasi Internasional)
 * 5. Zona 5 — Undip Future (Digital Campus, AI & Sustainability)
 */
function App() {
  const [currentZoneId, setCurrentZoneId] = useState('zona-1')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [targetZoneId, setTargetZoneId] = useState<string | null>(null)

  const handleSwitchZone = useCallback(
    (zoneId: string) => {
      if (isTransitioning || zoneId === currentZoneId) return

      setIsTransitioning(true)
      setTargetZoneId(zoneId)

      // Smooth zone transition
      setTimeout(() => {
        setCurrentZoneId(zoneId)
        setTimeout(() => {
          setIsTransitioning(false)
          setTargetZoneId(null)
        }, 300)
      }, 400)
    },
    [currentZoneId, isTransitioning],
  )

  return (
    <>
      {/* 3D Realistic Museum Environment with Curated Zones */}
      <MuseumZoneScene
        currentZoneId={currentZoneId}
        onSwitchZone={handleSwitchZone}
      />

      {/* Transition Overlay */}
      <RoomTransition
        isTransitioning={isTransitioning}
        targetRoom={targetZoneId}
      />
    </>
  )
}

export default App
