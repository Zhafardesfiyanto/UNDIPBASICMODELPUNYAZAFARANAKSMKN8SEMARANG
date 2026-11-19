export interface ExhibitItem {
  id: string
  title: string
  subtitle: string
  year?: string
  category: string
  description: string
  plaqueSummary?: string // Short 3-line summary displayed on the 3D podium stand plinth
  imagePath?: string
  modelType: 'portrait' | 'vitrine' | 'plaque' | 'stand'
  position: [number, number, number]
  rotationY?: number
  podiumPosition?: [number, number, number]
  podiumRotationY?: number
}

export interface MuseumZone {
  id: string
  code: string
  number: number
  title: string
  subtitle: string
  themeColor: string
  accentColor: string
  summary: string
  curationPoints: string[]
  exhibits: ExhibitItem[]
}

export const MUSEUM_ZONES: MuseumZone[] = [
  {
    id: 'zona-1',
    code: 'ZONA 1',
    number: 1,
    title: 'The Origin of Undip & Sejarah Rektor',
    subtitle: 'Kelahiran Universitas (1957) & Deretan Para Rektor (1957–Sekarang)',
    themeColor: '#d4af37', // Gold
    accentColor: '#0f2347', // Navy
    summary:
      'Galeri megah sejarah berdirinya Universitas Diponegoro (1957–1960) dan deretan lengkap para Rektor yang telah memimpin serta membangun Undip dari awal hingga masa kini, lengkap dengan foto potret dan podium stand kurasi biografi.',
    curationPoints: [
      'Sejarah pendirian Universitas Semarang (9 Januari 1957)',
      'Peresmian nama Universitas Diponegoro oleh Ir. Soekarno (1960)',
      'Galeri 10 Rektor Universitas Diponegoro lengkap dengan podium biografi',
      'Arsip foto kampus pertama di Pleburan',
      'Memorabilia jubah kehormatan dan medali kepemimpinan universitas',
    ],
    exhibits: [
      // --- WEST WALL (REKTOR 1 s.d. 5: 1957 - 1998) ---
      {
        id: 'z1-imam-bardjo',
        title: 'Mr. Imam Bardjo',
        subtitle: 'Rektor Pertama Universitas Diponegoro (1957–1961)',
        year: '1957–1961',
        category: 'Rektor Universitas Diponegoro',
        description:
          'Mr. Imam Bardjo adalah tokoh kunci dan Rektor Pertama yang meletakkan dasar kelembagaan universitas ketika didirikan pertama kali sebagai Universitas Semarang pada tahun 1957. Dedikasi dan kepemimpinan beliau diabadikan sebagai nama jalan protokol kampus dan auditorium utama Undip.',
        plaqueSummary:
          'Rektor Pertama Undip. Meletakkan fondasi kelembagaan universitas dari Universitas Semarang (1957) hingga peresmian nama Universitas Diponegoro oleh Presiden Ir. Soekarno pada tahun 1960.',
        imagePath: '/portraits/imam-bardjo.jpg',
        modelType: 'portrait',
        position: [-9.6, 2.5, -10],
        rotationY: Math.PI / 2,
        podiumPosition: [-8.2, 0, -10],
        podiumRotationY: Math.PI / 2,
      },
      {
        id: 'z1-prof-soedarto',
        title: 'Prof. Mr. Soedarto, S.H.',
        subtitle: 'Rektor ke-2 Undip (Periode 1961–1977)',
        year: '1961–1977',
        category: 'Rektor Universitas Diponegoro',
        description:
          'Prof. Mr. Soedarto, S.H. memimpin Undip selama 16 tahun penuh prestasi. Beliau merupakan Guru Besar Hukum Pidana terkemuka Indonesia yang merintis perluasan kampus terpadu ke Tembalang. Nama beliau diabadikan sebagai Gedung Prof. Soedarto.',
        plaqueSummary:
          'Guru Besar Hukum Pidana nasional. Memimpin Undip selama 16 tahun, meletakkan visi jangka panjang relokasi kampus terpadu ke Tembalang serta pendirian berbagai fakultas perintis.',
        modelType: 'portrait',
        position: [-9.6, 2.5, -5],
        rotationY: Math.PI / 2,
        podiumPosition: [-8.2, 0, -5],
        podiumRotationY: Math.PI / 2,
      },
      {
        id: 'z1-prof-suroyo',
        title: 'Prof. dr. A. Suroyo',
        subtitle: 'Rektor ke-3 Undip (Periode 1977–1986)',
        year: '1977–1986',
        category: 'Rektor Universitas Diponegoro',
        description:
          'Prof. dr. A. Suroyo memimpin era akselerasi pembangunan infrastruktur fisik kampus Tembalang serta penguatan riset sains kelautan dan kedokteran tropis.',
        plaqueSummary:
          'Dokter pejuang dan akademisi. Mengakselerasi pembangunan fisik kampus Tembalang serta merintis pemantapan Pola Ilmiah Pokok (PIP) berbasis pengembangan wilayah pesisir.',
        modelType: 'portrait',
        position: [-9.6, 2.5, 0],
        rotationY: Math.PI / 2,
        podiumPosition: [-8.2, 0, 0],
        podiumRotationY: Math.PI / 2,
      },
      {
        id: 'z1-prof-moeljono',
        title: 'Prof. Dr. dr. H. Moeljono S. Trastotenojo, Sp.A(K)',
        subtitle: 'Rektor ke-4 Undip (Periode 1986–1994)',
        year: '1986–1994',
        category: 'Rektor Universitas Diponegoro',
        description:
          'Prof. Moeljono adalah dokter spesialis anak terkemuka. Pada masa kepemimpinan beliau, Fakultas Perikanan dan Ilmu Kelautan (FPIK) diresmikan, mempertegas Undip sebagai pusat rujukan riset bahari tropis.',
        plaqueSummary:
          'Pakar kesehatan anak terkemuka. Meresmikan Fakultas Perikanan dan Ilmu Kelautan (FPIK) dan memperluas kemitraan akademik dengan berbagai universitas terkemuka dunia.',
        modelType: 'portrait',
        position: [-9.6, 2.5, 5],
        rotationY: Math.PI / 2,
        podiumPosition: [-8.2, 0, 5],
        podiumRotationY: Math.PI / 2,
      },
      {
        id: 'z1-prof-muladi',
        title: 'Prof. Dr. Ir. Muladi, S.H.',
        subtitle: 'Rektor ke-5 Undip (1994–1998) & Menteri Kehakiman RI',
        year: '1994–1998',
        category: 'Rektor Universitas Diponegoro',
        description:
          'Prof. Muladi adalah negarawan dan pakar hukum pidana terkemuka Indonesia. Beliau memperkokoh reputasi nasional Undip, memodernisasi manajemen perguruan tinggi, dan menjunjung tinggi kebebasan mimbar akademik.',
        plaqueSummary:
          'Tokoh hukum nasional dan negarawan. Membawa modernisasi tata kelola birokrasi kampus dan memperkokoh reputasi keunggulan Undip di tingkat nasional dan Asia Tenggara.',
        modelType: 'portrait',
        position: [-9.6, 2.5, 10],
        rotationY: Math.PI / 2,
        podiumPosition: [-8.2, 0, 10],
        podiumRotationY: Math.PI / 2,
      },

      // --- EAST WALL (REKTOR 6 s.d. 10: 1998 - SEKARANG) ---
      {
        id: 'z1-prof-eko',
        title: 'Prof. Ir. Eko Budihardjo, M.Sc.',
        subtitle: 'Rektor ke-6 Undip (1998–2006) & Budayawan',
        year: '1998–2006',
        category: 'Rektor Universitas Diponegoro',
        description:
          'Prof. Eko Budihardjo adalah arsitek, penyair, dan budayawan legendaris. Beliau menanamkan nilai-nilai humaniora, arsitektur hijau, serta suasana kampus yang santun, asri, dan berjiwa kebudayaan.',
        plaqueSummary:
          'Guru Besar Arsitektur dan budayawan legendaris. Menanamkan nilai humaniora, kepekaan seni, dan keberlanjutan arsitektur kampus berkarakter kepahlawanan.',
        modelType: 'portrait',
        position: [9.6, 2.5, -10],
        rotationY: -Math.PI / 2,
        podiumPosition: [8.2, 0, -10],
        podiumRotationY: -Math.PI / 2,
      },
      {
        id: 'z1-prof-susilo',
        title: 'Prof. dr. Susilo Wibowo, MS.Med, Sp.And(K)',
        subtitle: 'Rektor ke-7 Undip (Periode 2006–2010)',
        year: '2006–2010',
        category: 'Rektor Universitas Diponegoro',
        description:
          'Prof. Susilo Wibowo memprakarsai berdirinya Rumah Sakit Nasional Diponegoro (RSND) dan mendorong akreditasi A institusi serta peningkatan jurnal ilmiah bereputasi internasional.',
        plaqueSummary:
          'Pelopor pembangunan Rumah Sakit Nasional Diponegoro (RSND). Mengakselerasi akreditasi A program studi dan memperkuat publikasi riset bereputasi global.',
        modelType: 'portrait',
        position: [9.6, 2.5, -5],
        rotationY: -Math.PI / 2,
        podiumPosition: [8.2, 0, -5],
        podiumRotationY: -Math.PI / 2,
      },
      {
        id: 'z1-prof-sudharto',
        title: 'Prof. Dr. Ir. Sudharto P. Hadi, MES',
        subtitle: 'Rektor ke-8 Undip (Periode 2010–2015)',
        year: '2010–2015',
        category: 'Rektor Universitas Diponegoro',
        description:
          'Prof. Sudharto P. Hadi adalah pakar manajemen lingkungan. Beliau mengantarkan Undip bertransformasi resmi menjadi PTN-BH (Badan Hukum) serta memelopori predikat top Green Campus nasional.',
        plaqueSummary:
          'Pakar manajemen lingkungan hidup. Mengantarkan status kemandirian Undip menjadi PTN-BH dan mewujudkan kampus hijau Tembalang berstandar UI GreenMetric.',
        modelType: 'portrait',
        position: [9.6, 2.5, 0],
        rotationY: -Math.PI / 2,
        podiumPosition: [8.2, 0, 0],
        podiumRotationY: -Math.PI / 2,
      },
      {
        id: 'z1-prof-yos',
        title: 'Prof. Dr. Yos Johan Utama, S.H., M.Hum.',
        subtitle: 'Rektor ke-9 Undip (Periode 2015–2024)',
        year: '2015–2024',
        category: 'Rektor Universitas Diponegoro',
        description:
          'Prof. Yos Johan Utama memimpin lompatan besar Undip menembus jajaran World Class University, juara 1 nasional lulusan tercepat mendapatkan pekerjaan (QS Employability), dan digitalisasi kampus.',
        plaqueSummary:
          'Membawa Undip meraih ranking 1 nasional lulusan tercepat terserap kerja (QS Employability Rankings), penguatan riset unggulan, dan fasilitas kampus modern.',
        modelType: 'portrait',
        position: [9.6, 2.5, 5],
        rotationY: -Math.PI / 2,
        podiumPosition: [8.2, 0, 5],
        podiumRotationY: -Math.PI / 2,
      },
      {
        id: 'z1-prof-suharnomo',
        title: 'Prof. Dr. Suharnomo, S.E., M.Si.',
        subtitle: 'Rektor ke-10 Undip (2024–Sekarang) — Rektor Saat Ini',
        year: '2024–Sekarang',
        category: 'Rektor Universitas Diponegoro',
        description:
          'Prof. Suharnomo memimpin Undip saat ini dengan tagline "Undip Bermartabat, Undip Bermanfaat", berfokus pada riset solutif yang menyentuh masyarakat, hilirisasi industri, serta integrasi kecerdasan buatan.',
        plaqueSummary:
          'Rektor Universitas Diponegoro saat ini. Mengusung visi "Undip Bermartabat, Undip Bermanfaat" dengan akselerasi riset berdampak, kesejahteraan civitas, dan jejaring industri global.',
        modelType: 'portrait',
        position: [9.6, 2.5, 10],
        rotationY: -Math.PI / 2,
        podiumPosition: [8.2, 0, 10],
        podiumRotationY: -Math.PI / 2,
      },

      // --- NORTH WALL (PRASASTI SEJARAH PENDIRIAN) ---
      {
        id: 'z1-prasasti-pendirian',
        title: 'Prasasti Sejarah Pendirian & Peresmian Nama Diponegoro',
        subtitle: 'Dari Universitas Semarang (1957) ke Universitas Diponegoro (1960)',
        year: '9 Januari 1957 – 9 Januari 1960',
        category: 'Dokumen & Keputusan Pendirian',
        description:
          'Pada tanggal 9 Januari 1957 dibuka secara resmi Universitas Semarang. Kemudian pada tanggal 9 Januari 1960, Presiden Republik Indonesia Ir. Soekarno secara langsung meresmikan pergantian nama menjadi Universitas Diponegoro sebagai penghargaan atas keteladanan Pangeran Diponegoro.',
        plaqueSummary:
          'Piagam Sejarah Pendirian Universitas Diponegoro oleh para tokoh perintis dan peresmian nama Diponegoro oleh Presiden Ir. Soekarno pada tahun 1960.',
        modelType: 'plaque',
        position: [0, 2.8, -15.5],
        rotationY: 0,
        podiumPosition: [0, 0, -13.5],
        podiumRotationY: 0,
      },

      // --- SIDE GALLERY VITRINES (SIDES OF ROOM TO KEEP CENTER AISLE OPEN) ---
      {
        id: 'z1-vitrine-jubah',
        title: 'Vitrine Jubah Kehormatan & Kalung Medali Rektorat',
        subtitle: 'Koleksi Regalia Kepemimpinan Universitas',
        year: '1957',
        category: 'Artefak Akademik',
        description:
          'Jubah toga beludru hitam berkerah satin emas serta kalung medali lambang Universitas Diponegoro yang disematkan kepada setiap Rektor Undip pada upacara pelantikan dan wisuda.',
        modelType: 'vitrine',
        position: [-4.2, 0, -3.5],
        rotationY: Math.PI / 2,
        podiumPosition: [-4.2, 0, -2.1],
        podiumRotationY: 0,
      },
      {
        id: 'z1-vitrine-arsip-akta',
        title: 'Vitrine Akta Notaris Pendirian Yayasan (1956)',
        subtitle: 'Arsip Dokumen Otentik Pembentukan Universitas',
        year: '1956',
        category: 'Arsip Pendirian',
        description:
          'Salinan akta notaris pembentukan Yayasan Universitas Semarang yang diprakarsai oleh para tokoh masyarakat Jawa Tengah sebagai cikal bakal kelahiran Universitas Diponegoro.',
        modelType: 'vitrine',
        position: [4.2, 0, -3.5],
        rotationY: -Math.PI / 2,
        podiumPosition: [4.2, 0, -2.1],
        podiumRotationY: 0,
      },
    ],
  },

  // --- ZONA 2: THE GROWTH OF KNOWLEDGE ---
  {
    id: 'zona-2',
    code: 'ZONA 2',
    number: 2,
    title: 'The Growth of Knowledge',
    subtitle: 'Perkembangan Fakultas & Transformasi Kampus',
    themeColor: '#38bdf8', // Cyan / Sky Blue
    accentColor: '#0f2347', // Navy
    summary:
      'Menampilkan lompatan besar perkembangan 11 fakultas, sekolah vokasi, pemekaran disiplin ilmu, serta migrasi bersejarah dari kampus kota Pleburan menuju kampus hijau terpadu Tembalang seluas 180 hektar.',
    curationPoints: [
      'Perkembangan fakultas (Hukum, FEB, Teknik, Kedokteran, FPIK, FPP, FSM, FIB, FISIP, FKM, Psikologi, Sekolah Vokasi)',
      'Transformasi kampus dari Pleburan menuju kawasan kampus terpadu Tembalang',
      'Pola Ilmiah Pokok (PIP) berbasis pengembangan wilayah pesisir dan kelautan tropis',
      'Prestasi akademik, hilirisasi riset, dan pengabdian bagi kemandirian bangsa',
    ],
    exhibits: [
      // --- WEST WALL (PERKEMBANGAN FAKULTAS) ---
      {
        id: 'z2-fakultas-perintis',
        title: 'Fakultas Perintis: Hukum & FEB',
        subtitle: 'Dua Pilar Pertama Pendidikan Tinggi Semarang (1957)',
        year: '1957',
        category: 'Perkembangan Fakultas',
        description:
          'Fakultas Hukum dan Fakultas Ekonomi dan Bisnis (FEB) merupakan dua fakultas perdana yang membuka gerbang perkuliahan ketika universitas pertama kali didirikan pada tahun 1957. Menghasilkan tokoh hukum, hakim agung, menteri, dan ekonom perintis pembangunan nasional.',
        plaqueSummary:
          'Dua fakultas pertama Universitas Semarang (1957). Meletakkan dasar keilmuan hukum berintegritas dan manajemen ekonomi yang mengakar kuat di Indonesia.',
        modelType: 'portrait',
        position: [-9.6, 2.5, -10],
        rotationY: Math.PI / 2,
        podiumPosition: [-8.2, 0, -10],
        podiumRotationY: Math.PI / 2,
      },
      {
        id: 'z2-fakultas-teknik-kedokteran',
        title: 'Fakultas Teknik & Fakultas Kedokteran',
        subtitle: 'Tonggak Sains Rekayasa & Pusat Layanan Kesehatan (1958–1961)',
        year: '1958–1961',
        category: 'Perkembangan Fakultas',
        description:
          'Fakultas Teknik didirikan tahun 1958 dan Fakultas Kedokteran diresmikan tahun 1961. Fakultas Teknik melahirkan ribuan insinyur handal pembangun infrastruktur nasional, sementara Kedokteran Undip menjadi rujukan unggul ilmu kedokteran tropis dan spesialisasi klinis terkemuka.',
        plaqueSummary:
          'Pusat keunggulan sains rekayasa dan teknologi terapan serta kedokteran tropis terkemuka dengan jejaring rumah sakit pendidikan bertaraf nasional dan internasional.',
        modelType: 'portrait',
        position: [-9.6, 2.5, -5],
        rotationY: Math.PI / 2,
        podiumPosition: [-8.2, 0, -5],
        podiumRotationY: Math.PI / 2,
      },
      {
        id: 'z2-fakultas-fpik',
        title: 'Fakultas Perikanan & Ilmu Kelautan (FPIK)',
        subtitle: 'Ikon Keunggulan Riset Bahari & Pesisir Tropis Indonesia',
        year: '1968 / 1994',
        category: 'Perkembangan Fakultas',
        description:
          'Berawal dari Jurusan Perikanan tahun 1968 hingga menjadi fakultas mandiri tahun 1994, FPIK mempertegas reputasi Undip sebagai kampus maritim terkemuka dengan stasiun riset kelautan Teluk Awur Jepara dan armada kapal riset bahari.',
        plaqueSummary:
          'Pelopor dan rujukan nasional riset kelautan tropis, konservasi terumbu karang, oseanografi, dan budidaya perikanan modern yang menopang ketahanan maritim bangsa.',
        modelType: 'portrait',
        position: [-9.6, 2.5, 0],
        rotationY: Math.PI / 2,
        podiumPosition: [-8.2, 0, 0],
        podiumRotationY: Math.PI / 2,
      },
      {
        id: 'z2-fakultas-fpp-fsm',
        title: 'FPP & FSM: Agroindustri & Sains Murni',
        subtitle: 'Inovasi Peternakan, Pertanian, Matematika & Ilmu Pengetahuan Alam',
        year: '1964 / 1988',
        category: 'Perkembangan Fakultas',
        description:
          'Fakultas Peternakan dan Pertanian (FPP) memelopori teknologi pakan ternak dan ketahanan pangan hayati, sedangkan Fakultas Sains dan Matematika (FSM) menjadi episentrum riset kimia, fisika nuklir terapan, bioteknologi, dan informatika.',
        plaqueSummary:
          'Pengembang teknologi pangan ternak hayati dan sains dasar analitik tinggi yang memacu kemandirian pangan serta penemuan material sains terbarukan.',
        modelType: 'portrait',
        position: [-9.6, 2.5, 5],
        rotationY: Math.PI / 2,
        podiumPosition: [-8.2, 0, 5],
        podiumRotationY: Math.PI / 2,
      },
      {
        id: 'z2-fakultas-humaniora-vokasi',
        title: 'Humaniora, Sosial, Kesehatan & Vokasi',
        subtitle: 'FIB, FISIP, FKM, Psikologi & Sekolah Vokasi Undip',
        year: '1965–2016',
        category: 'Perkembangan Fakultas',
        description:
          'Pemekaran fakultas rumpun sosial humaniora dan kesehatan masyarakat memperkuat karakter Undip yang berjiwa kebudayaan, adaptif sosial, serta tangguh dalam vokasi terapan berstandar sertifikasi industri global.',
        plaqueSummary:
          'Rumpun humaniora, ilmu sosial politik, kesehatan masyarakat, psikologi, dan pendidikan vokasi terapan yang mencetak profesional siap kerja beretika luhur.',
        modelType: 'portrait',
        position: [-9.6, 2.5, 10],
        rotationY: Math.PI / 2,
        podiumPosition: [-8.2, 0, 10],
        podiumRotationY: Math.PI / 2,
      },

      // --- EAST WALL (TRANSFORMASI KAMPUS, RISET & PRESTASI) ---
      {
        id: 'z2-kampus-pleburan',
        title: 'Kampus Bersejarah Pleburan',
        subtitle: 'Pusat Memori, Perjuangan, dan Kelahiran Universitas di Jantung Kota',
        year: '1957–1985',
        category: 'Transformasi Kampus',
        description:
          'Kawasan Pleburan di pusat kota Semarang menjadi saksi awal perintisan kampus dengan gedung cagar budaya, ruang perkuliahan bersejarah, dan perpustakaan legendaris. Kini kawasan ini bertransformasi menjadi kampus program pascasarjana dan riset perkotaan.',
        plaqueSummary:
          'Pusat memori sejarah kelahiran Undip di pusat kota Semarang. Saksi perjuangan para rektor perintis dan mahasiswa lintas generasi emas pertama.',
        modelType: 'portrait',
        position: [9.6, 2.5, -10],
        rotationY: -Math.PI / 2,
        podiumPosition: [8.2, 0, -10],
        podiumRotationY: -Math.PI / 2,
      },
      {
        id: 'z2-relokasi-tembalang',
        title: 'Pembangunan Kampus Hijau Tembalang',
        subtitle: 'Masterplan Kota Mandiri Akademik 180 Hektar Ramah Lingkungan',
        year: '1985–Sekarang',
        category: 'Transformasi Kampus',
        description:
          'Diprakarsai sejak era Prof. Soedarto dan direalisasikan pada dekade 1980-an, relokasi kampus ke perbukitan Tembalang menghadirkan tata ruang kampus terpadu dengan arboretum hijau, waduk resapan air, dan gedung fakultas modern berkelanjutan.',
        plaqueSummary:
          'Kawasan kampus terpadu seluas 180 hektar di Tembalang berstandar UI GreenMetric dengan ruang terbuka hijau lestari, waduk edukasi, dan fasilitas terintegrasi.',
        modelType: 'portrait',
        position: [9.6, 2.5, -5],
        rotationY: -Math.PI / 2,
        podiumPosition: [8.2, 0, -5],
        podiumRotationY: -Math.PI / 2,
      },
      {
        id: 'z2-pola-ilmiah-pokok',
        title: 'Pola Ilmiah Pokok (PIP) Wilayah Pesisir',
        subtitle: 'Pengembangan Wilayah Pantai (Coastal Region Eco-Development)',
        year: '1974–Sekarang',
        category: 'Pendidikan & Penelitian',
        description:
          'Pola Ilmiah Pokok (PIP) Undip berfokus pada "Pengembangan Wilayah Pesisir dan Kelautan Tropis" (Coastal Region Eco-Development), memadukan aspek ketahanan pangan bahari, mitigasi rob & abrasi pesisir utara Jawa, serta pemberdayaan nelayan.',
        plaqueSummary:
          'Arah jati diri ilmiah unggulan Undip: riset terintegrasi sains kelautan, konservasi mangrove, teknologi desalinasi, dan sosial ekonomi masyarakat pesisir nusantara.',
        modelType: 'portrait',
        position: [9.6, 2.5, 0],
        rotationY: -Math.PI / 2,
        podiumPosition: [8.2, 0, 0],
        podiumRotationY: -Math.PI / 2,
      },
      {
        id: 'z2-prestasi-akademik',
        title: 'Prestasi Akademik & Ranking Dunia',
        subtitle: 'Peringkat 1 Nasional Lulusan Cepat Bekerja & World Class University',
        year: '2015–2024',
        category: 'Prestasi Akademik',
        description:
          'Undip secara konsisten menempati ranking #1 di Indonesia versi QS Graduate Employability Rankings untuk indikator kecepatan lulusan terserap pasar kerja, serta masuk jajaran Top 500 universitas terbaik dunia dalam pemeringkatan QS WCU.',
        plaqueSummary:
          'Pencapaian bergengsi: Juara 1 nasional lulusan tercepat mendapatkan kerja berkualitas, akreditasi internasional ABET/ASIIN/FIBAA, dan peningkatan sitasi riset global.',
        modelType: 'portrait',
        position: [9.6, 2.5, 5],
        rotationY: -Math.PI / 2,
        podiumPosition: [8.2, 0, 5],
        podiumRotationY: -Math.PI / 2,
      },
      {
        id: 'z2-kontribusi-masyarakat',
        title: 'Hilirisasi Riset & Pengabdian Masyarakat',
        subtitle: 'Teknologi Tepat Guna, Kapal Surya Nelayan, dan RSND Undip',
        year: '2010–Sekarang',
        category: 'Prestasi Akademik',
        description:
          'Kiprah nyata civitas akademika Undip diwujudkan melalui Rumah Sakit Nasional Diponegoro (RSND), inovasi kapal nelayan ramah lingkungan bertenaga surya, desalinasi air bersih pesisir, dan program KKN tematik pencegahan stunting di berbagai pelosok nusantara.',
        plaqueSummary:
          'Dedikasi "Undip Bermartabat, Undip Bermanfaat" lewat hilirisasi paten sains, fasilitas RSND berakreditasi paripurna, dan pengabdian bagi kesejahteraan rakyat.',
        modelType: 'portrait',
        position: [9.6, 2.5, 10],
        rotationY: -Math.PI / 2,
        podiumPosition: [8.2, 0, 10],
        podiumRotationY: -Math.PI / 2,
      },

      // --- NORTH WALL (PRASASTI SEJARAH FAKULTAS & TRANSFORMASI) ---
      {
        id: 'z2-prasasti-transformasi',
        title: 'Piagam Genealogi Fakultas & Transformasi Kampus',
        subtitle: 'Peta Jalan Keunggulan Akademik dan Perluasan Kampus Hijau Terpadu Tembalang',
        year: '1957–Sekarang',
        category: 'Dokumen & Keputusan Pendirian',
        description:
          'Prasasti monumental yang merangkum pohon silsilah berdirinya seluruh fakultas dan sekolah di lingkungan Universitas Diponegoro beserta kronik pemindahan kampus dari Pleburan menuju Tembalang demi melayani puluhan ribu mahasiswa dari seluruh penjuru dunia.',
        plaqueSummary:
          'Piagam Genealogi Keilmuan Undip: Kronik perjalanan pendirian 11 fakultas, sekolah pascasarjana, sekolah vokasi, dan masterplan kampus lestari Tembalang.',
        modelType: 'plaque',
        position: [0, 2.8, -15.5],
        rotationY: 0,
        podiumPosition: [0, 0, -13.5],
        podiumRotationY: 0,
      },

      // --- CENTERPIECE EXHIBIT (PODIUM IN FRONT OF THE 3D MAKET) ---
      {
        id: 'z2-maket-tembalang',
        title: 'Maket Masterplan Kampus Tembalang',
        subtitle: 'Kota Mandiri Akademik 180 Hektar Ramah Lingkungan',
        year: '1985–Sekarang',
        category: 'Transformasi Kampus',
        description:
          'Maket 3D kawasan kampus terpadu Tembalang seluas 180 hektar di perbukitan selatan Semarang. Menampilkan gedung rektorat Widya Puraya beratap joglo modern bertingkat, danau resapan air, komplek 11 fakultas modern, gedung laboratorium riset, serta infrastruktur kampus hijau lestari berstandar UI GreenMetric.',
        plaqueSummary:
          'Maket 3D Masterplan Kampus Terpadu Tembalang (180 Ha): Gedung rektorat Widya Puraya, danau resapan, 11 fakultas, dan ruang terbuka hijau lestari berstandar UI GreenMetric.',
        modelType: 'stand',
        position: [0, 0, 0],
        podiumPosition: [0, 0, 2.5],
        podiumRotationY: 0,
      },

      // --- SIDE GALLERY VITRINES (SIDES OF ROOM TO KEEP CENTER AISLE OPEN) ---
      {
        id: 'z2-vitrine-pip',
        title: 'Vitrine Naskah Pola Ilmiah Pokok (PIP) 1974',
        subtitle: 'Koleksi Dokumen Arah Strategis Keilmuan Bahari Tropis',
        year: '1974',
        category: 'Artefak Akademik',
        description:
          'Buku pedoman cetakan pertama Pola Ilmiah Pokok (PIP) pengembangan wilayah pantai yang dirumuskan oleh senat guru besar Undip tahun 1974 sebagai identitas pembeda dengan universitas lain di Indonesia.',
        modelType: 'vitrine',
        position: [-4.2, 0, -3.5],
        rotationY: Math.PI / 2,
        podiumPosition: [-4.2, 0, -2.1],
        podiumRotationY: 0,
      },
      {
        id: 'z2-vitrine-blueprint-tembalang',
        title: 'Vitrine Cetak Biru (Blueprint) Masterplan Tembalang 1985',
        subtitle: 'Dokumen Arsitektur Rancang Bangun Kawasan Kampus 180 Ha',
        year: '1985',
        category: 'Arsip Pendirian',
        description:
          'Lembaran blueprint gambar kerja arsitektur kawasan kampus terpadu Tembalang rancangan para arsitek Fakultas Teknik Undip bersama para pakar tata kota nasional era Presiden Soeharto.',
        modelType: 'vitrine',
        position: [4.2, 0, -3.5],
        rotationY: -Math.PI / 2,
        podiumPosition: [4.2, 0, -2.1],
        podiumRotationY: 0,
      },
    ],
  },
  {
    id: 'zona-3',
    code: 'ZONA 3',
    number: 3,
    title: 'The Heritage of Undip',
    subtitle: 'Artefak Akademik, Memorabilia & Arsip Sejarah',
    themeColor: '#b45309',
    accentColor: '#d4af37',
    summary:
      'Koleksi benda pusaka, manuskrip bersejarah, memorabilia para rektor terkemuka, dan rekaman arsip audiovisual.',
    curationPoints: [
      'Artefak akademik kuno & tongkat pedel universitas',
      'Memorabilia tokoh dan karya rektor legendaris',
      'Foto sejarah pameran dan Dies Natalis pertama',
      'Dokumen penting & naskah pidato bersejarah',
    ],
    exhibits: [
      {
        id: 'z3-tongkat-pedel',
        title: 'Tongkat Pedel Upacara Senat Undip',
        subtitle: 'Kayu jati berukir dengan kepala elang dan lambang keris Diponegoro',
        year: '1962',
        category: 'Artefak Akademik',
        description:
          'Tongkat upacara senat yang selalu dibawa oleh Pedel memimpin barisan prosesi guru besar dalam setiap sidang senat terbuka wisuda dan upacara kenegaraan universitas.',
        plaqueSummary:
          'Tongkat pusaka prosesi senat guru besar Undip berukirkan keris dan garuda Diponegoro.',
        modelType: 'vitrine',
        position: [0, 0, 0],
        podiumPosition: [0, 0, -2],
      },
    ],
  },
  {
    id: 'zona-4',
    code: 'ZONA 4',
    number: 4,
    title: 'Undip Today',
    subtitle: 'Kampus Modern, Riset Maritim & Prestasi Internasional',
    themeColor: '#0284c7',
    accentColor: '#f8fafc',
    summary:
      'Wajah Universitas Diponegoro hari ini: kampus riset terkemuka berstatus PTN-BH, Rumah Sakit Nasional Diponegoro (RSND), perpustakaan digital modern, dan reputasi global.',
    curationPoints: [
      'Kampus modern dan sarana pembelajaran digital',
      'Laboratorium unggulan & pusat riset kelautan tropis',
      'Perpustakaan pusat dan repository pengetahuan terbuka',
      'Prestasi ranking internasional (QS World University Rankings)',
    ],
    exhibits: [
      {
        id: 'z4-widya-puraya',
        title: 'Ikon Rektorat Gedung Widya Puraya',
        subtitle: 'Simbol kecemerlangan ilmu dan marwah institusi',
        year: '2024',
        category: 'Kampus Modern',
        description:
          'Gedung Widya Puraya dengan arsitektur joglo modern menjulang di poros utama Tembalang, menaungi pusat layanan akademik terpadu dan kearsipan universitas.',
        plaqueSummary:
          'Ikon arsitektur rektorat Widya Puraya dan pusat komando layanan akademik terpadu Undip.',
        modelType: 'plaque',
        position: [0, 2.8, -15.5],
        podiumPosition: [0, 0, -13.5],
      },
    ],
  },
  {
    id: 'zona-5',
    code: 'ZONA 5',
    number: 5,
    title: 'Undip Future',
    subtitle: 'Kampus Digital, AI & Keberlanjutan Masa Depan',
    themeColor: '#10b981',
    accentColor: '#38bdf8',
    summary:
      'Visi masa depan Undip sebagai Smart University berkelas dunia: pemanfaatan Artificial Intelligence, digital twin kampus, energi hijau mandiri, dan inovasi berkelanjutan.',
    curationPoints: [
      'Kampus digital & infrastruktur komputasi cerdas',
      'Penerapan Artificial Intelligence & Robotic Automation',
      'Smart University & ekosistem pembelajaran cerdas',
      'World Class University dengan dampak keberlanjutan global',
    ],
    exhibits: [
      {
        id: 'z5-smart-campus-ai',
        title: 'Inisiatif Undip Smart University & AI',
        subtitle: 'Transformasi kecerdasan buatan dalam kurikulum dan tata kelola universitas',
        year: '2026+',
        category: 'Artificial Intelligence',
        description:
          'Pemanfaatan model AI generatif untuk personalisasi pembelajaran mahasiswa, robot asisten perpustakaan, dan otomatisasi analitik riset lintas disiplin.',
        plaqueSummary:
          'Peta jalan transformasi Smart University, AI generative kampus, dan ekosistem digital twin.',
        modelType: 'plaque',
        position: [0, 2.8, -15.5],
        podiumPosition: [0, 0, -13.5],
      },
    ],
  },
]
