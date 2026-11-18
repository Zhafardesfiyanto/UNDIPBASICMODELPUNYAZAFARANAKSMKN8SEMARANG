import { MUSEUM_ZONES } from '../zones/types'

interface RoomTransitionProps {
  isTransitioning: boolean
  targetRoom: string | null
}

export function RoomTransition({ isTransitioning, targetRoom }: RoomTransitionProps) {
  if (!isTransitioning || !targetRoom) return null

  const targetZone = MUSEUM_ZONES.find((z) => z.id === targetRoom)

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(11, 23, 42, 0.96)',
        color: '#f8fafc',
        transition: 'opacity 0.35s ease',
        pointerEvents: 'all',
        fontFamily: "'Segoe UI', system-ui, sans-serif",
      }}
    >
      <div
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          border: '4px solid rgba(212, 175, 55, 0.25)',
          borderTopColor: '#d4af37',
          animation: 'spin 0.8s linear infinite',
          marginBottom: '20px',
        }}
      />

      <span
        style={{
          fontSize: '12px',
          fontWeight: 700,
          color: '#d4af37',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          marginBottom: '6px',
        }}
      >
        {targetZone?.code ?? 'MUSEUM VIRTUAL UNDIP'}
      </span>

      <h2 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 6px', letterSpacing: '0.4px', color: '#ffffff' }}>
        {targetZone?.title ?? 'Memasuki Galeri Museum...'}
      </h2>

      <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>
        {targetZone?.subtitle ?? 'Memuat Artefak & Sejarah Undip'}
      </p>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
