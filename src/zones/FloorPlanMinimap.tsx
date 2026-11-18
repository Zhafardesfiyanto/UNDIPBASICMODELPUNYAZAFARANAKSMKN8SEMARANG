import { useState } from 'react'
import { MUSEUM_ZONES, type MuseumZone } from './types'

interface FloorPlanMinimapProps {
  currentZoneId: string
  onSelectZone: (zoneId: string) => void
  onOpenExpandedPlan: () => void
}

export function FloorPlanMinimap({
  currentZoneId,
  onSelectZone,
  onOpenExpandedPlan,
}: FloorPlanMinimapProps) {
  const [hoveredZone, setHoveredZone] = useState<MuseumZone | null>(null)
  const [isMapHovered, setIsMapHovered] = useState(false)

  const activeZone =
    MUSEUM_ZONES.find((z) => z.id === currentZoneId) ?? MUSEUM_ZONES[0]

  return (
    <div
      className={`museum-floorplan-widget ${isMapHovered ? 'is-hovered' : ''}`}
      onMouseEnter={() => setIsMapHovered(true)}
      onMouseLeave={() => {
        setIsMapHovered(false)
        setHoveredZone(null)
      }}
      title="Denah Resmi Museum Virtual Undip (Klik untuk Memperbesar)"
    >
      {/* Blueprint Header */}
      <div className="floorplan-header">
        <span className="floorplan-title">DENAH MUSEUM VIRTUAL UNDIP</span>
        <button
          type="button"
          className="floorplan-expand-btn"
          onClick={onOpenExpandedPlan}
          title="Buka Denah Kurasi Lengkap"
        >
          🔍 Perbesar
        </button>
      </div>

      {/* 2D Architectural Floor Plan Graphic */}
      <div className="floorplan-svg-container">
        <svg
          viewBox="0 0 240 180"
          className="floorplan-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Blueprint Grid */}
          <rect width="240" height="180" fill="#0b172a" rx="6" />
          <defs>
            <pattern id="grid" width="12" height="12" patternUnits="userSpaceOnUse">
              <path d="M 12 0 L 0 0 0 12" fill="none" stroke="rgba(56, 189, 248, 0.08)" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="240" height="180" fill="url(#grid)" />

          {/* Hallway Connectors between Rooms */}
          <line x1="70" y1="50" x2="120" y2="50" stroke="#d4af37" strokeWidth="3" strokeDasharray="2,2" />
          <line x1="120" y1="50" x2="170" y2="50" stroke="#d4af37" strokeWidth="3" strokeDasharray="2,2" />
          <line x1="120" y1="50" x2="120" y2="120" stroke="#d4af37" strokeWidth="3" strokeDasharray="2,2" />
          <line x1="70" y1="120" x2="170" y2="120" stroke="#d4af37" strokeWidth="3" strokeDasharray="2,2" />

          {/* 5 Museum Room Wings */}
          {/* Zona 1: The Origin of Undip (Kiri Bawah / Entrance Hall) */}
          <g
            className={`room-node ${currentZoneId === 'zona-1' ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation()
              onSelectZone('zona-1')
            }}
            onMouseEnter={() => setHoveredZone(MUSEUM_ZONES[0])}
          >
            <rect x="20" y="95" width="60" height="55" rx="4" />
            <text x="50" y="122" textAnchor="middle" className="room-code">ZONA 1</text>
            <text x="50" y="136" textAnchor="middle" className="room-label">Origin</text>
          </g>

          {/* Zona 2: The Growth of Knowledge (Kiri Atas) */}
          <g
            className={`room-node ${currentZoneId === 'zona-2' ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation()
              onSelectZone('zona-2')
            }}
            onMouseEnter={() => setHoveredZone(MUSEUM_ZONES[1])}
          >
            <rect x="20" y="25" width="60" height="55" rx="4" />
            <text x="50" y="52" textAnchor="middle" className="room-code">ZONA 2</text>
            <text x="50" y="66" textAnchor="middle" className="room-label">Growth</text>
          </g>

          {/* Zona 3: The Heritage of Undip (Tengah Atas / Grand Hall) */}
          <g
            className={`room-node ${currentZoneId === 'zona-3' ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation()
              onSelectZone('zona-3')
            }}
            onMouseEnter={() => setHoveredZone(MUSEUM_ZONES[2])}
          >
            <rect x="90" y="20" width="60" height="65" rx="4" />
            <text x="120" y="52" textAnchor="middle" className="room-code">ZONA 3</text>
            <text x="120" y="66" textAnchor="middle" className="room-label">Heritage</text>
          </g>

          {/* Zona 4: Undip Today (Kanan Atas) */}
          <g
            className={`room-node ${currentZoneId === 'zona-4' ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation()
              onSelectZone('zona-4')
            }}
            onMouseEnter={() => setHoveredZone(MUSEUM_ZONES[3])}
          >
            <rect x="160" y="25" width="60" height="55" rx="4" />
            <text x="190" y="52" textAnchor="middle" className="room-code">ZONA 4</text>
            <text x="190" y="66" textAnchor="middle" className="room-label">Today</text>
          </g>

          {/* Zona 5: Undip Future (Kanan Bawah) */}
          <g
            className={`room-node ${currentZoneId === 'zona-5' ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation()
              onSelectZone('zona-5')
            }}
            onMouseEnter={() => setHoveredZone(MUSEUM_ZONES[4])}
          >
            <rect x="160" y="95" width="60" height="55" rx="4" />
            <text x="190" y="122" textAnchor="middle" className="room-code">ZONA 5</text>
            <text x="190" y="136" textAnchor="middle" className="room-label">Future</text>
          </g>

          {/* You Are Here Pin indicator */}
          <circle
            cx={
              currentZoneId === 'zona-1'
                ? 50
                : currentZoneId === 'zona-2'
                ? 50
                : currentZoneId === 'zona-3'
                ? 120
                : currentZoneId === 'zona-4'
                ? 190
                : 190
            }
            cy={
              currentZoneId === 'zona-1'
                ? 105
                : currentZoneId === 'zona-2'
                ? 35
                : currentZoneId === 'zona-3'
                ? 30
                : currentZoneId === 'zona-4'
                ? 35
                : 105
            }
            r="4.5"
            fill="#d4af37"
            stroke="#ffffff"
            strokeWidth="1.5"
            className="pin-pulse-dot"
          />
        </svg>
      </div>

      {/* Footer Info of Currently Active / Hovered Zone */}
      <div className="floorplan-footer">
        <span className="footer-zone-code">
          {hoveredZone?.code ?? activeZone.code}:
        </span>
        <span className="footer-zone-title">
          {hoveredZone?.title ?? activeZone.title}
        </span>
      </div>
    </div>
  )
}
