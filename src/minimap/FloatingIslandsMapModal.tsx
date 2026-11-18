import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { FLOATING_ISLANDS, type FloatingIslandData } from './types'
import { FloatingIslandMesh } from './FloatingIslandMesh'

interface FloatingIslandsMapModalProps {
  isOpen: boolean
  onClose: () => void
  currentRoom: string
  onSelectRoom: (roomId: string) => void
}

export function FloatingIslandsMapModal({
  isOpen,
  onClose,
  currentRoom,
  onSelectRoom,
}: FloatingIslandsMapModalProps) {
  const [viewMode, setViewMode] = useState<'tactical' | '3d'>('tactical')
  const [hoveredIsland, setHoveredIsland] = useState<FloatingIslandData | null>(null)
  const [selectedForPreview, setSelectedForPreview] = useState<FloatingIslandData | null>(null)

  if (!isOpen) return null

  const activeIsland =
    selectedForPreview ??
    hoveredIsland ??
    FLOATING_ISLANDS.find((i) => i.roomId === currentRoom) ??
    FLOATING_ISLANDS[0]

  const handleIslandClick = (island: FloatingIslandData) => {
    setSelectedForPreview(island)
    setTimeout(() => {
      onSelectRoom(island.roomId)
      onClose()
    }, 280)
  }

  return (
    <div className="island-modal-backdrop">
      {/* Header Bar */}
      <header className="island-modal-header">
        <div className="island-modal-brand">
          <div className="island-modal-compass">🗺️</div>
          <div>
            <h2 className="island-modal-title">Peta Kepulauan Museum Undip (5 Pulau Melayang)</h2>
            <p className="island-modal-sub">
              Arahkan kursor ke pulau untuk memperbesar detail, lalu klik untuk berpindah zona
            </p>
          </div>
        </div>

        {/* View Mode Toggle: Tactical Archipelago vs 3D Orbit */}
        <div className="island-modal-controls">
          <div className="view-mode-toggle">
            <button
              type="button"
              className={`toggle-btn ${viewMode === 'tactical' ? 'active' : ''}`}
              onClick={() => setViewMode('tactical')}
            >
              🗺️ Peta Taktis Kepulauan
            </button>
            <button
              type="button"
              className={`toggle-btn ${viewMode === '3d' ? 'active' : ''}`}
              onClick={() => setViewMode('3d')}
            >
              🪐 Peta 3D Orbit
            </button>
          </div>

          <button
            type="button"
            className="island-modal-close"
            onClick={onClose}
            aria-label="Tutup Peta"
          >
            ✕
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="island-map-container">
        {viewMode === 'tactical' ? (
          /* Large Tactical Archipelago Map (Seperti Foto yang Dikirim Pengguna) */
          <div className="tactical-expanded-view">
            <div className="tactical-board">
              <img
                src="/map/island_map.jpg"
                alt="Peta Kepulauan Museum Undip"
                className="tactical-board-img"
              />

              {/* 5 Interactive Islands on Tactical Board */}
              {FLOATING_ISLANDS.map((island) => {
                const isCurrent = island.roomId === currentRoom
                const isHovered = activeIsland.id === island.id

                return (
                  <div
                    key={island.id}
                    className={`board-island-node ${isHovered ? 'is-hovered' : ''} ${
                      isCurrent ? 'is-current' : ''
                    }`}
                    style={{
                      left: `${island.mapCoords.x}%`,
                      top: `${island.mapCoords.y}%`,
                    }}
                    onMouseEnter={() => setHoveredIsland(island)}
                    onClick={() => handleIslandClick(island)}
                  >
                    {/* Glowing animated halo */}
                    <div
                      className="board-node-halo"
                      style={{
                        backgroundColor: island.themeColor,
                        boxShadow: `0 0 28px ${island.themeColor}`,
                      }}
                    />

                    {/* Island Badge / Avatar */}
                    <div
                      className="board-node-avatar"
                      style={{
                        borderColor: isCurrent ? '#f59e0b' : island.themeColor,
                        backgroundColor: '#0f172a',
                      }}
                    >
                      <span className="board-node-icon">{island.icon}</span>
                    </div>

                    {/* Floating Island Title Tag */}
                    <div
                      className="board-node-label"
                      style={{
                        borderColor: island.themeColor,
                      }}
                    >
                      <span className="board-node-name">{island.name}</span>
                      {isCurrent && <span className="board-node-cur-tag">Sedang Di Sini</span>}
                    </div>

                    {/* Ripple animation for current island */}
                    {isCurrent && <div className="board-node-ripple" />}
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          /* 3D Orbit Floating Archipelago Canvas */
          <div className="island-canvas-wrapper">
            <Canvas
              shadows
              dpr={[1, 2]}
              gl={{ antialias: true, powerPreference: 'high-performance' }}
            >
              <color attach="background" args={['#090d16']} />
              <fog attach="fog" args={['#090d16', 15, 45]} />
              <PerspectiveCamera makeDefault position={[0, 9, 15]} fov={50} />

              <ambientLight intensity={1.1} color="#e0f2fe" />
              <directionalLight
                position={[10, 20, 10]}
                intensity={1.8}
                color="#ffffff"
                castShadow
              />
              <pointLight position={[0, -5, 0]} intensity={1.5} color="#38bdf8" />

              <points>
                <sphereGeometry args={[25, 48, 48]} />
                <pointsMaterial size={0.06} color="#7dd3fc" transparent opacity={0.6} />
              </points>

              <Suspense fallback={null}>
                {FLOATING_ISLANDS.map((island, idx) => (
                  <FloatingIslandMesh
                    key={island.id}
                    island={island}
                    isCurrent={currentRoom === island.roomId}
                    isHovered={activeIsland.id === island.id}
                    onSelect={handleIslandClick}
                    onHover={(isl) => setHoveredIsland(isl)}
                    phaseOffset={idx * 1.3}
                  />
                ))}
              </Suspense>

              <OrbitControls
                enablePan={false}
                maxPolarAngle={Math.PI / 2 - 0.05}
                minDistance={8}
                maxDistance={24}
                autoRotate
                autoRotateSpeed={0.5}
              />
            </Canvas>
          </div>
        )}
      </div>

      {/* Island Detailed Information Card (Bottom-Left) */}
      <aside className="island-info-panel">
        <div
          className="island-info-badge"
          style={{ borderColor: activeIsland.themeColor, color: activeIsland.themeColor }}
        >
          <span>{activeIsland.icon}</span> {activeIsland.badge}
        </div>
        <h3 className="island-info-title">{activeIsland.name}</h3>
        <p className="island-info-subtitle">{activeIsland.subtitle}</p>
        <p className="island-info-desc">{activeIsland.description}</p>

        <div className="island-info-actions">
          {currentRoom === activeIsland.roomId ? (
            <span className="island-status-current">✓ Anda sedang berada di pulau ini</span>
          ) : (
            <button
              type="button"
              className="island-enter-btn"
              style={{
                backgroundColor: activeIsland.themeColor,
                boxShadow: `0 8px 24px ${activeIsland.themeColor}55`,
              }}
              onClick={() => handleIslandClick(activeIsland)}
            >
              Masuk ke Pulau Ini ➔
            </button>
          )}
        </div>
      </aside>

      {/* Island Quick List Navigator (Bottom-Right) */}
      <div className="island-nav-list">
        {FLOATING_ISLANDS.map((island) => {
          const isSelected = activeIsland.id === island.id
          const isCurrent = currentRoom === island.roomId
          return (
            <button
              key={island.id}
              type="button"
              className={`island-nav-item ${isSelected ? 'active' : ''}`}
              onMouseEnter={() => setHoveredIsland(island)}
              onClick={() => handleIslandClick(island)}
            >
              <span className="island-nav-icon">{island.icon}</span>
              <div className="island-nav-text">
                <span className="island-nav-name">{island.name}</span>
                {isCurrent && <span className="island-nav-tag">Sedang aktif</span>}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
