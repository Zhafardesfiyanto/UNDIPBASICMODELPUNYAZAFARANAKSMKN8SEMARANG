import type { ExhibitItem } from './types'

interface ExhibitDetailPanelProps {
  exhibit: ExhibitItem | null
  onClose: () => void
}

export function ExhibitDetailPanel({ exhibit, onClose }: ExhibitDetailPanelProps) {
  if (!exhibit) return null

  return (
    <div className="museum-detail-scrim" onClick={onClose}>
      <aside className="museum-detail-panel" onClick={(e) => e.stopPropagation()}>
        <header className="museum-detail-head">
          <div className="museum-detail-badge-group">
            <span className="museum-detail-category">{exhibit.category}</span>
            {exhibit.year && <span className="museum-detail-year">{exhibit.year}</span>}
          </div>
          <button
            type="button"
            className="museum-detail-close"
            onClick={onClose}
            aria-label="Tutup Informasi"
          >
            ×
          </button>
        </header>

        <div className="museum-detail-body">
          <h2 className="museum-detail-title">{exhibit.title}</h2>
          <p className="museum-detail-subtitle">{exhibit.subtitle}</p>

          {exhibit.imagePath && (
            <div className="museum-detail-image-box">
              <img
                src={exhibit.imagePath}
                alt={exhibit.title}
                className="museum-detail-img"
              />
            </div>
          )}

          <div className="museum-detail-text">
            <h4 className="museum-detail-heading">Narasi & Sejarah Koleksi</h4>
            <p className="museum-detail-desc">{exhibit.description}</p>
          </div>
        </div>

        <footer className="museum-detail-foot">
          <button type="button" className="museum-detail-btn" onClick={onClose}>
            Lanjutkan Menjelajahi Museum
          </button>
        </footer>
      </aside>
    </div>
  )
}
