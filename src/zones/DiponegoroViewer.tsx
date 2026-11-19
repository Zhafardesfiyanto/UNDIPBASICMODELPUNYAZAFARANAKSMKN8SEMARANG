interface DiponegoroViewerProps {
  isOpen: boolean
  onClose: () => void
}

export function DiponegoroViewer({ isOpen, onClose }: DiponegoroViewerProps) {
  if (!isOpen) return null

  return (
    <div
      className="diponegoro-viewer-scrim"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Model 3D Pangeran Diponegoro"
    >
      <div
        className="diponegoro-viewer-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="diponegoro-viewer-header">
          <div className="diponegoro-viewer-title-block">
            <span className="diponegoro-viewer-label">MODEL 3D INTERAKTIF</span>
            <h2 className="diponegoro-viewer-title">Pangeran Diponegoro</h2>
            <p className="diponegoro-viewer-subtitle">Pahlawan Nasional — Perang Jawa 1825–1830</p>
          </div>
          <button
            className="diponegoro-viewer-close"
            onClick={onClose}
            aria-label="Tutup"
          >
            ✕
          </button>
        </div>

        {/* Sketchfab iframe */}
        <div className="diponegoro-viewer-iframe-wrap">
          <iframe
            title="Pangeran Diponegoro 3D Model"
            src="https://sketchfab.com/models/020a8658ae66413c98315e5b9f67a907/embed?autospin=0&autostart=1&ui_theme=dark&ui_infos=0&ui_watermark=0"
            width="100%"
            height="100%"
            allow="autoplay; fullscreen; xr-spatial-tracking"
            allowFullScreen
            style={{ border: 0 }}
          />
        </div>

        {/* Footer hint */}
        <p className="diponegoro-viewer-hint">
          🖱 Klik &amp; geser untuk memutar model • Scroll untuk zoom • Klik latar untuk menutup
        </p>
      </div>
    </div>
  )
}
