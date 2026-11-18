import { useState } from 'react'
import { FLOATING_ISLANDS, type FloatingIslandData } from './types'

interface MinimapWidgetProps {
  currentRoom: string
  onOpenMap: () => void
  onDirectTravel?: (roomId: string) => void
}

export function MinimapWidget({ currentRoom, onOpenMap, onDirectTravel }: MinimapWidgetProps) {
  const [hoveredPin, setHoveredPin] = useState<FloatingIslandData | null>(null)
  const [isWidgetHovered, setIsWidgetHovered] = useState(false)

  const currentIsland =
    FLOATING_ISLANDS.find((i) => i.roomId === currentRoom) ?? FLOATING_ISLANDS[0]

  return (
    <div
      className={`tactical-minimap ${isWidgetHovered ? 'is-hovered' : ''}`}
      onMouseEnter={() => setIsWidgetHovered(true)}
      onMouseLeave={() => {
        setIsWidgetHovered(false)
        setHoveredPin(null)
      }}
      onClick={onOpenMap}
      title="Klik untuk memperbesar Peta 5 Pulau Melayang"
      role="button"
      tabIndex={0}
      aria-label="Peta Taktis 5 Pulau Melayang Undip"
    >
      {/* Outer Tactical Bezel Frame */}
      <div className="tactical-frame">
        {/* Corner metallic brackets */}
        <div className="corner-bracket top-left" />
        <div className="corner-bracket top-right" />
        <div className="corner-bracket bottom-left" />
        <div className="corner-bracket bottom-right" />

        {/* Map Canvas / Terrain Image from photo */}
        <div className="tactical-terrain">
          <img
            src="/map/island_map.jpg"
            alt="Peta Kepulauan Museum Undip"
            className="tactical-image"
          />

          {/* 5 Interactive Island Beacon Pins */}
          {FLOATING_ISLANDS.map((island) => {
            const isCurrent = island.roomId === currentRoom
            const isHovered = hoveredPin?.id === island.id

            return (
              <div
                key={island.id}
                className={`island-pin ${isCurrent ? 'current' : ''} ${isHovered ? 'hovered' : ''}`}
                style={{
                  left: `${island.mapCoords.x}%`,
                  top: `${island.mapCoords.y}%`,
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  if (onDirectTravel) {
                    onDirectTravel(island.roomId)
                  } else {
                    onOpenMap()
                  }
                }}
                onMouseEnter={(e) => {
                  e.stopPropagation()
                  setHoveredPin(island)
                }}
                onMouseLeave={(e) => {
                  e.stopPropagation()
                  setHoveredPin(null)
                }}
              >
                {/* Glowing beacon aura */}
                <div
                  className="pin-glow"
                  style={{
                    backgroundColor: island.themeColor,
                    boxShadow: `0 0 14px ${island.themeColor}`,
                  }}
                />

                {/* Pin core / icon */}
                <div
                  className="pin-core"
                  style={{
                    borderColor: isCurrent ? '#fbbf24' : island.themeColor,
                    backgroundColor: isCurrent ? '#d97706' : '#0f172a',
                  }}
                >
                  <span className="pin-icon">{island.icon}</span>
                </div>

                {/* Pulse ring for current player location */}
                {isCurrent && <div className="pin-pulse-wave" />}

                {/* Tooltip on pin hover */}
                {isHovered && (
                  <div className="pin-tooltip">
                    <span className="tooltip-badge">{island.badge}</span>
                    <span className="tooltip-name">{island.name}</span>
                    <span className="tooltip-action">
                      {isCurrent ? '● Sedang Di Sini' : 'Klik untuk Masuk'}
                    </span>
                  </div>
                )}
              </div>
            )
          })}

          {/* Compass / Radar scanning line */}
          <div className="tactical-scan-line" />
        </div>

        {/* Bottom Status bar */}
        <div className="tactical-footer">
          <div className="tactical-indicator">
            <span className="live-dot" />
            <span className="tactical-loc-text">
              {currentIsland.icon} {currentIsland.name}
            </span>
          </div>
          <span className="tactical-expand-hint">🔍 Klik perbesar</span>
        </div>
      </div>
    </div>
  )
}
