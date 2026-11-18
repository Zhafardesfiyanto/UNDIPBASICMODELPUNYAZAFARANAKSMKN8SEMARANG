export interface FloatingIslandData {
  id: string
  roomId: string
  name: string
  badge: string
  subtitle: string
  description: string
  position: [number, number, number] // Position in 3D map space
  mapCoords: { x: number; y: number } // Percentage on tactical map (0-100%)
  themeColor: string
  accentColor: string
  icon: string
}

export const FLOATING_ISLANDS: FloatingIslandData[] = [
  {
    id: 'island-classic',
    roomId: 'classic',
    name: 'Pulau Sejarah & Rektor Undip',
    badge: 'Zona 1 · Warisan',
    subtitle: 'Galeri Klasik Tokoh & Mr. Imam Bardjo',
    description:
      'Lorong klasik berarsitektur neo-klasik yang memajang potret tokoh-tokoh penting dan Rektor Pertama Undip, Mr. Imam Bardjo (1957–1961).',
    position: [0, 0, 5],
    mapCoords: { x: 26, y: 74 },
    themeColor: '#d4af37',
    accentColor: '#f59e0b',
    icon: '🏛️',
  },
  {
    id: 'island-modern',
    roomId: 'modern',
    name: 'Pulau Paviliun Kotak Putih',
    badge: 'Zona 2 · Modern',
    subtitle: 'Ruang Kubus Putih Minimalis Inovasi',
    description:
      'Ruangan pameran arsitektur modern berbentuk kotak putih minimalis dengan lantai marmer mengkilap, lampu tanam LED, dan stan monumen Undip 3D.',
    position: [6.5, 1.2, 1.5],
    mapCoords: { x: 49, y: 48 },
    themeColor: '#38bdf8',
    accentColor: '#0284c7',
    icon: '🏢',
  },
  {
    id: 'island-maritime',
    roomId: 'maritime',
    name: 'Pulau Riset Maritim & Kelautan',
    badge: 'Zona 3 · Bahari',
    subtitle: 'Pusat Keunggulan Sains Bahari Nusantara',
    description:
      'Eksplorasi inovasi maritim tropis Undip, armada robot bawah air (AUV), pelestarian terumbu karang, dan bioteknologi kelautan.',
    position: [4.2, -0.8, -5.5],
    mapCoords: { x: 80, y: 76 },
    themeColor: '#06b6d4',
    accentColor: '#0891b2',
    icon: '🌊',
  },
  {
    id: 'island-diponegoro',
    roomId: 'diponegoro',
    name: 'Pulau Pusaka Budaya Diponegoro',
    badge: 'Zona 4 · Budaya',
    subtitle: 'Nilai Patriotisme & Kebudayaan Jawa',
    description:
      'Museum pusaka perjuangan Pangeran Diponegoro, naskah kuno Babad Diponegoro (UNESCO Memory of the World), dan artefak seni Jawa Tengah.',
    position: [-4.2, 0.9, -5.5],
    mapCoords: { x: 25, y: 24 },
    themeColor: '#ec4899',
    accentColor: '#db2777',
    icon: '🗡️',
  },
  {
    id: 'island-green',
    roomId: 'green',
    name: 'Pulau Smart Green Eco-Campus',
    badge: 'Zona 5 · Ekologi',
    subtitle: 'Kampus Berkelanjutan & Energi Terbarukan',
    description:
      'Kawasan kampus hijau Tembalang Undip, pembangkit panel surya cerdas, konservasi air dan hutan kampus berkelas dunia (UI GreenMetric).',
    position: [-6.5, -1.0, 1.5],
    mapCoords: { x: 77, y: 22 },
    themeColor: '#10b981',
    accentColor: '#059669',
    icon: '🌱',
  },
]
