import { MUSEUM_ZONES, type MuseumZone } from './types'

interface FloorPlanModalProps {
  isOpen: boolean
  onClose: () => void
  currentZoneId: string
  onSelectZone: (zoneId: string) => void
}

export function FloorPlanModal({
  isOpen,
  onClose,
  currentZoneId,
  onSelectZone,
}: FloorPlanModalProps) {
  if (!isOpen) return null

  return (
    <div className="curation-modal-backdrop" onClick={onClose}>
      <div className="curation-modal-window" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <header className="curation-modal-head">
          <div>
            <span className="curation-modal-badge">ARSITEKTUR & TATA RUANG RESMI</span>
            <h2 className="curation-modal-title">Denah Kurasi 5 Zona Museum Virtual Undip</h2>
            <p className="curation-modal-sub">
              Sesuai Panduan Kurasi Museum: Navy Blue, Gold, Ivory & Heritage Brown
            </p>
          </div>
          <button
            type="button"
            className="curation-modal-close"
            onClick={onClose}
            aria-label="Tutup Denah"
          >
            ✕
          </button>
        </header>

        {/* 5 Zones Grid Layout */}
        <div className="curation-zones-grid">
          {MUSEUM_ZONES.map((zone: MuseumZone) => {
            const isCurrent = zone.id === currentZoneId
            return (
              <div
                key={zone.id}
                className={`curation-zone-card ${isCurrent ? 'is-current' : ''}`}
                style={{
                  borderLeftColor: zone.themeColor,
                }}
                onClick={() => {
                  onSelectZone(zone.id)
                  onClose()
                }}
              >
                <div className="card-top-row">
                  <span
                    className="card-code-tag"
                    style={{ backgroundColor: `${zone.themeColor}22`, color: zone.themeColor }}
                  >
                    {zone.code}
                  </span>
                  {isCurrent && <span className="card-current-badge">● Anda Di Sini</span>}
                </div>

                <h3 className="card-zone-title">{zone.title}</h3>
                <p className="card-zone-subtitle">{zone.subtitle}</p>
                <p className="card-zone-summary">{zone.summary}</p>

                <div className="card-curation-list">
                  <span className="curation-list-label">Fokus Pameran:</span>
                  <ul>
                    {zone.curationPoints.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  className="card-enter-btn"
                  style={{
                    backgroundColor: isCurrent ? '#334155' : zone.themeColor,
                    color: isCurrent ? '#94a3b8' : '#0f172a',
                  }}
                  disabled={isCurrent}
                >
                  {isCurrent ? 'Sedang Dikunjungi' : 'Masuk ke Ruangan Ini ➔'}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
