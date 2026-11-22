import DiponegoroModel from './components/DiponegoroModel'

export default function App() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '24px 20px 48px',
        background: 'radial-gradient(ellipse at top, #0f2347 0%, #070c16 80%)',
        boxSizing: 'border-box',
      }}
    >
      {/* Header with Official Logo Undip */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '18px',
          marginBottom: '20px',
          maxWidth: '1100px',
          width: '100%',
        }}
      >
        <img
          src="/brand/logo_undip.png"
          alt="Logo Universitas Diponegoro"
          style={{ width: '56px', height: '56px', objectFit: 'contain' }}
        />
        <div>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              color: '#d4af37',
              textTransform: 'uppercase',
            }}
          >
            UNIVERSITAS DIPONEGORO
          </span>
          <h1
            style={{
              margin: '2px 0 0',
              fontSize: '28px',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '0.02em',
            }}
          >
            Patung Pangeran Diponegoro 3D
          </h1>
          <p
            style={{
              margin: '4px 0 0',
              fontSize: '14px',
              color: '#94a3b8',
            }}
          >
            Simbol Keteladanan, Keberanian, dan Marwah Universitas Diponegoro
          </p>
        </div>
      </header>

      {/* Main 3D Model Display */}
      <main
        style={{
          width: '100%',
          maxWidth: '1100px',
          height: '68vh',
          minHeight: '520px',
          marginBottom: '24px',
        }}
      >
        <DiponegoroModel />
      </main>

      {/* Information Card & Controls */}
      <section
        style={{
          width: '100%',
          maxWidth: '1100px',
          backgroundColor: 'rgba(15, 25, 45, 0.75)',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          borderRadius: '14px',
          padding: '22px 28px',
          boxSizing: 'border-box',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 12px 36px rgba(0, 0, 0, 0.4)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <span style={{ fontSize: '18px' }}>⚔️</span>
          <h2 style={{ margin: 0, fontSize: '18px', color: '#d4af37', fontWeight: 700 }}>
            Tentang Patung Pangeran Diponegoro
          </h2>
        </div>
        <p style={{ margin: '0 0 14px', fontSize: '14px', lineHeight: '1.65', color: '#e2e8f0' }}>
          Patung Pangeran Diponegoro yang gagah menunggangi kuda hitam berjingkrak dengan keris terhunus ke depan melambangkan tekad bulat pantang menyerah dalam menegakkan kebenaran dan keadilan. Pangeran Diponegoro adalah Pahlawan Nasional Indonesia pemimpin Perang Jawa (1825–1830) yang namanya diabadikan oleh Presiden Ir. Soekarno sebagai nama Universitas Diponegoro pada tanggal 9 Januari 1960.
        </p>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '13px',
            color: '#94a3b8',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '12px',
          }}
        >
          <span>🖱️ <strong>Klik &amp; geser:</strong> Putar 360°</span>
          <span>🔍 <strong>Scroll:</strong> Zoom in / out</span>
          <span>⛶ <strong>Tombol kanan bawah:</strong> Mode Layar Penuh (Fullscreen)</span>
        </div>
      </section>
    </div>
  )
}
