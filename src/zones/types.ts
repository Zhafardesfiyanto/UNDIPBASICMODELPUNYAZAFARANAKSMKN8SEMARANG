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
  // --- ZONA 3: THE HERITAGE OF UNDIP ---
  {
    id: 'zona-3',
    code: 'ZONA 3',
    number: 3,
    title: 'The Heritage of Undip',
    subtitle: 'Artefak Akademik, Memorabilia & Arsip Sejarah',
    themeColor: '#b45309', // Deep Amber / Heritage Bronze
    accentColor: '#d4af37', // Gold
    summary:
      'Ruang pusaka agung yang menyimpan koleksi artefak akademik kuno, tongkat pedel prosesi senat, memorabilia para rektor perintis, dokumen bersejarah peresmian nama Diponegoro oleh Ir. Soekarno, dan rekaman arsip audiovisual.',
    curationPoints: [
      'Artefak akademik kuno: Tongkat Pedel Senat Undip (1962) & Regalia Kehormatan',
      'Memorabilia tokoh: Mr. Imam Bardjo, Prof. Soedarto, Prof. Muladi, Prof. Eko Budihardjo',
      'Foto sejarah: Kunjungan kenegaraan Presiden Ir. Soekarno di Pleburan (9 Januari 1960)',
      'Dokumen penting: Akta notaris pendirian 1956 & naskah pidato peresmian Diponegoro',
      'Koleksi audiovisual: Rekaman suara pidato pendirian dan rekaman mars Diponegoro asli',
    ],
    exhibits: [
      // --- WEST WALL (ARTEFAK & MEMORABILIA TOKOH) ---
      {
        id: 'z3-tongkat-pedel',
        title: 'Tongkat Pedel Upacara Senat Undip',
        subtitle: 'Pusaka Senat Kayu Jati Berukir Lambang Keris Diponegoro (1962)',
        year: '1962',
        category: 'Artefak Akademik',
        description:
          'Tongkat upacara senat yang selalu dibawa oleh Pedel memimpin barisan prosesi guru besar dalam setiap sidang senat terbuka wisuda dan upacara kenegaraan universitas. Menggabungkan ukiran kepala elang emas dan bilah keris Diponegoro.',
        plaqueSummary:
          'Tongkat pusaka prosesi senat guru besar Undip berbahan kayu jati berukir garuda dan keris Diponegoro bertatahkan emas murni.',
        modelType: 'portrait',
        position: [-9.6, 2.5, -10],
        rotationY: Math.PI / 2,
        podiumPosition: [-8.2, 0, -10],
        podiumRotationY: Math.PI / 2,
      },
      {
        id: 'z3-memorabilia-imam-bardjo',
        title: 'Memorabilia Mr. Imam Bardjo',
        subtitle: 'Mesin Ketik Perintis & Naskah Pembentukan Universitas (1957)',
        year: '1957',
        category: 'Memorabilia Tokoh',
        description:
          'Koleksi memorabilia pribadi Rektor Pertama Mr. Imam Bardjo berupa mesin ketik mekanik kuno yang digunakan mengetik berkas perizinan universitas serta buku catatan kerja era perintisan kampus Pleburan.',
        plaqueSummary:
          'Mesin ketik mekanik bersejarah dan buku catatan kerja pribadi Mr. Imam Bardjo saksi perintisan awal kelahiran universitas tahun 1957.',
        modelType: 'portrait',
        position: [-9.6, 2.5, -5],
        rotationY: Math.PI / 2,
        podiumPosition: [-8.2, 0, -5],
        podiumRotationY: Math.PI / 2,
      },
      {
        id: 'z3-memorabilia-soedarto',
        title: 'Memorabilia Prof. Mr. Soedarto, S.H.',
        subtitle: 'Toga Kehormatan Guru Besar Hukum & Naskah Rancangan KUHP',
        year: '1965',
        category: 'Memorabilia Tokoh',
        description:
          'Jubah toga beludru hitam bersulam emas milik Prof. Soedarto yang dikenakan selama 16 tahun memimpin Undip, didampingi naskah ketikan asli perumusan pembaharuan hukum pidana nasional.',
        plaqueSummary:
          'Toga guru besar bersejarah dan naskah hukum monumental karya Prof. Soedarto, peletak fondasi relokasi kampus ke Tembalang.',
        modelType: 'portrait',
        position: [-9.6, 2.5, 0],
        rotationY: Math.PI / 2,
        podiumPosition: [-8.2, 0, 0],
        podiumRotationY: Math.PI / 2,
      },
      {
        id: 'z3-memorabilia-muladi',
        title: 'Memorabilia Prof. Dr. Muladi, S.H.',
        subtitle: 'Palu Sidang Senat Akademik & Catatan Negarawan (1994)',
        year: '1994',
        category: 'Memorabilia Tokoh',
        description:
          'Palu sidang kayu jati bersaput kuningan yang digunakan Prof. Muladi dalam sidang-sidang senat bersejarah, serta arsip pidato reformasi perguruan tinggi menjelang era milenium.',
        plaqueSummary:
          'Palu sidang senat bersejarah dan kumpulan naskah pemikiran Prof. Muladi dalam memperjuangkan otonomi kampus dan reformasi hukum.',
        modelType: 'portrait',
        position: [-9.6, 2.5, 5],
        rotationY: Math.PI / 2,
        podiumPosition: [-8.2, 0, 5],
        podiumRotationY: Math.PI / 2,
      },
      {
        id: 'z3-memorabilia-eko',
        title: 'Memorabilia Prof. Ir. Eko Budihardjo',
        subtitle: 'Kacamata Ikonik, Sketsa Arsitektur & Kumpulan Puisi Budaya (1998)',
        year: '1998',
        category: 'Memorabilia Tokoh',
        description:
          'Kacamata bulat khas, pena gambar arsitektur, dan buku puisi tulisan tangan karya rektor sastrawan legendaris Prof. Eko Budihardjo yang menggaungkan kesadaran ruang hijau humanis di kampus.',
        plaqueSummary:
          'Kacamata ikonik, pena sketsa, dan antologi puisi karya Prof. Eko Budihardjo, sang budayawan pembaharu arsitektur lingkungan.',
        modelType: 'portrait',
        position: [-9.6, 2.5, 10],
        rotationY: Math.PI / 2,
        podiumPosition: [-8.2, 0, 10],
        podiumRotationY: Math.PI / 2,
      },

      // --- EAST WALL (FOTO SEJARAH, DOKUMEN & AUDIOVISUAL) ---
      {
        id: 'z3-foto-kunjungan-soekarno',
        title: 'Kunjungan Presiden Ir. Soekarno (1960)',
        subtitle: 'Peresmian Nama Universitas Diponegoro di Kampus Pleburan',
        year: '9 Januari 1960',
        category: 'Foto Sejarah',
        description:
          'Foto arsip autentik hitam putih saat Presiden Ir. Soekarno berpidato di hadapan ribuan civitas akademika di Pleburan dan secara resmi menyematkan nama Universitas Diponegoro.',
        plaqueSummary:
          'Dokumentasi bersejarah pidato Presiden Ir. Soekarno meresmikan nama Universitas Diponegoro pada upacara Dies Natalis ke-3 tahun 1960.',
        modelType: 'portrait',
        position: [9.6, 2.5, -10],
        rotationY: -Math.PI / 2,
        podiumPosition: [8.2, 0, -10],
        podiumRotationY: -Math.PI / 2,
      },
      {
        id: 'z3-arsip-akta-1956',
        title: 'Akta Notaris Yayasan Universitas (1956)',
        subtitle: 'Dokumen Hukum Otentik Pendirian Universitas Semarang',
        year: '1956',
        category: 'Dokumen Penting',
        description:
          'Naskah legal otentik akta pendirian yayasan oleh notaris perintis Semarang yang menjadi payung hukum resmi pembukaan perkuliahan pertama universitas.',
        plaqueSummary:
          'Salinan akta notaris resmi tahun 1956 yang melegalkan berdirinya yayasan dan fakultas perintis di Semarang.',
        modelType: 'portrait',
        position: [9.6, 2.5, -5],
        rotationY: -Math.PI / 2,
        podiumPosition: [8.2, 0, -5],
        podiumRotationY: -Math.PI / 2,
      },
      {
        id: 'z3-naskah-peresmian',
        title: 'Naskah Pidato Peresmian Diponegoro',
        subtitle: 'Amanat Presiden Soekarno tentang Jiwa Kepahlawanan Diponegoro',
        year: '1960',
        category: 'Dokumen Penting',
        description:
          'Transkrip lengkap amanat Bung Karno yang menyerukan agar universitas ini menjadi banteng ilmu pengetahuan dan mengobarkan semangat juang Pangeran Diponegoro pantang menyerah.',
        plaqueSummary:
          'Amanat kenegaraan tertulis Presiden Ir. Soekarno yang menobatkan nama Diponegoro sebagai lambang keteladanan dan patriotisme universitas.',
        modelType: 'portrait',
        position: [9.6, 2.5, 0],
        rotationY: -Math.PI / 2,
        podiumPosition: [8.2, 0, 0],
        podiumRotationY: -Math.PI / 2,
      },
      {
        id: 'z3-foto-dies-pertama',
        title: 'Foto Dokumentasi Dies Natalis Pertama (1958)',
        subtitle: 'Peringatan Hari Lahir Perdana di Gedung Kesenian Sobokartti',
        year: '1958',
        category: 'Foto Sejarah',
        description:
          'Foto langka barisan wisudawan pertama dan dewan dosen dengan pakaian sipil resmi berfoto bersama di pelataran bersejarah kota Semarang.',
        plaqueSummary:
          'Arsip foto wisuda perdana dan peringatan Dies Natalis I Undip tahun 1958 bersama para tokoh perintis Jawa Tengah.',
        modelType: 'portrait',
        position: [9.6, 2.5, 5],
        rotationY: -Math.PI / 2,
        podiumPosition: [8.2, 0, 5],
        podiumRotationY: -Math.PI / 2,
      },
      {
        id: 'z3-arsip-audiovisual',
        title: 'Koleksi Audio Bersejarah & Himne Undip',
        subtitle: 'Pita Rekaman Pidato Asli & Partitur Himne Diponegoro (1962)',
        year: '1962',
        category: 'Koleksi Audiovisual',
        description:
          'Pita kaset gulung magnetik berisi rekaman audio pidato Bung Karno serta partitur not balok asli gubahan Himne Universitas Diponegoro karya komponis nasional.',
        plaqueSummary:
          'Pita rekaman suara autentik pidato Bung Karno 1960 dan partitur naskah asli Himne serta Mars Universitas Diponegoro.',
        modelType: 'portrait',
        position: [9.6, 2.5, 10],
        rotationY: -Math.PI / 2,
        podiumPosition: [8.2, 0, 10],
        podiumRotationY: -Math.PI / 2,
      },

      // --- NORTH WALL (PRASASTI HERITAGE) ---
      {
        id: 'z3-prasasti-heritage',
        title: 'Prasasti Pusaka Agung & Memorabilia Universitas Diponegoro',
        subtitle: 'Khazanah Benda Bersejarah, Regalia Kepemimpinan, dan Dokumen Abadi',
        year: '1957–1998',
        category: 'Dokumen Penting',
        description:
          'Prasasti kehormatan yang mengabadikan benda pusaka dan naskah otentik yang melandasi marwah luhur berdirinya Universitas Diponegoro sebagai benteng kebudayaan dan kecendekiaan bangsa.',
        plaqueSummary:
          'Piagam Khazanah Pusaka Undip: Menghormati jasa para perintis dan mengabadikan regalia kepemimpinan universitas sepanjang masa.',
        modelType: 'plaque',
        position: [0, 2.8, -15.5],
        rotationY: 0,
        podiumPosition: [0, 0, -13.5],
        podiumRotationY: 0,
      },

      // --- CENTERPIECE EXHIBIT ---
      {
        id: 'z3-meja-regalia',
        title: 'Meja Pusaka Regalia & Tongkat Pedel Senat Emas',
        subtitle: 'Koleksi Benda Upacara Kehormatan Tertinggi Universitas Diponegoro',
        year: '1962',
        category: 'Artefak Akademik',
        description:
          'Showcase kristal berlapis emas berisi Tongkat Pedel Senat berukir burung garuda dan keris Diponegoro, kalung medali rantai rasi kepemimpinan rektorat, dan cap segel kuno universitas.',
        plaqueSummary:
          'Meja Pusaka Regalia: Tongkat Pedel Senat bertatahkan emas, kalung medali kepemimpinan universitas, dan segel resmi Rektorat Undip.',
        modelType: 'stand',
        position: [0, 0, 0],
        podiumPosition: [0, 0, 2.5],
        podiumRotationY: 0,
      },

      // --- SIDE GALLERY VITRINES ---
      {
        id: 'z3-vitrine-konstitusi',
        title: 'Vitrine Naskah Statuta Akademik Kuno (1961)',
        subtitle: 'Buku Konstitusi Tata Kelola Universitas Pertama',
        year: '1961',
        category: 'Artefak Akademik',
        description:
          'Kitab statuta pertama yang merinci kewenangan rektor, kurikulum, dan tata tertib kehidupan kampus yang disahkan menteri PTIP.',
        modelType: 'vitrine',
        position: [-4.2, 0, -3.5],
        rotationY: Math.PI / 2,
        podiumPosition: [-4.2, 0, -2.1],
        podiumRotationY: 0,
      },
      {
        id: 'z3-vitrine-medali',
        title: 'Vitrine Medali Diponegoro Kencana (1960)',
        subtitle: 'Lencana Emas Kehormatan Penghargaan Jasa Akademik',
        year: '1960',
        category: 'Artefak Akademik',
        description:
          'Medali emas kehormatan tertinggi yang disematkan kepada para pendiri dan tokoh pembangun Universitas Diponegoro.',
        modelType: 'vitrine',
        position: [4.2, 0, -3.5],
        rotationY: -Math.PI / 2,
        podiumPosition: [4.2, 0, -2.1],
        podiumRotationY: 0,
      },
    ],
  },

  // --- ZONA 4: UNDIP TODAY ---
  {
    id: 'zona-4',
    code: 'ZONA 4',
    number: 4,
    title: 'Undip Today',
    subtitle: 'Kampus Modern, Riset Maritim & Prestasi Internasional',
    themeColor: '#0284c7', // Sapphire Blue
    accentColor: '#38bdf8', // Neon Cyan
    summary:
      'Wajah modern Universitas Diponegoro hari ini: kampus riset terkemuka berstatus PTN-BH mandiri, laboratorium kelautan terpadu, RSND akreditasi paripurna, perpustakaan digital cerdas, dan peringkat 1 nasional penyerapan lulusan kerja.',
    curationPoints: [
      'Kampus modern: Ikon Gedung Rektorat Widya Puraya, SA MWA, dan Smart ICT Center',
      'Laboratorium unggulan & Stasiun Riset Kelautan Tropis Teluk Awur Jepara',
      'Rumah Sakit Nasional Diponegoro (RSND) bertaraf internasional',
      'Perpustakaan pusat digital cerdas & Institutional Repository terbuka',
      'Prestasi global: Top 500 World Class University & #1 Graduate Employability QS Ranking',
    ],
    exhibits: [
      // --- WEST WALL (KAMPUS MODERN & RISET MARITIM) ---
      {
        id: 'z4-widya-puraya',
        title: 'Ikon Rektorat Gedung Widya Puraya',
        subtitle: 'Arsitektur Joglo Modern Berkelanjutan di Poros Tembalang',
        year: '2024',
        category: 'Kampus Modern',
        description:
          'Gedung Widya Puraya dengan arsitektur atap joglo bertingkat tiga yang megah dan berbalut kaca hemat energi menjadi simbol kepemimpinan akademik dan pusat koordinasi layanan terpadu universitas.',
        plaqueSummary:
          'Simbol kecemerlangan dan marwah institusi. Gedung Rektorat Widya Puraya menaungi pusat komando layanan akademik terpadu berbasis digital.',
        modelType: 'portrait',
        position: [-9.6, 2.5, -10],
        rotationY: Math.PI / 2,
        podiumPosition: [-8.2, 0, -10],
        podiumRotationY: Math.PI / 2,
      },
      {
        id: 'z4-lab-terpadu',
        title: 'Laboratorium Riset Terpadu Undip',
        subtitle: 'Fasilitas Instrumentasi Sains Mutakhir & Sentra Analisis Nano',
        year: '2023',
        category: 'Laboratorium & Riset',
        description:
          'Gedung Laboratorium Terpadu menampung instrumen spektrometri massa, mikroskop elektron SEM/TEM, dan rekayasa biomaterial untuk melayani penelitian dosen, mahasiswa, serta mitra industri global.',
        plaqueSummary:
          'Sentra riset berstandar internasional yang menopang ribuan publikasi ilmiah bereputasi Scopus Q1 di bidang sains murni dan rekayasa.',
        modelType: 'portrait',
        position: [-9.6, 2.5, -5],
        rotationY: Math.PI / 2,
        podiumPosition: [-8.2, 0, -5],
        podiumRotationY: Math.PI / 2,
      },
      {
        id: 'z4-stasiun-jepara',
        title: 'Stasiun Riset Kelautan Teluk Awur Jepara',
        subtitle: 'Laboratorium Alam Konservasi Terumbu Karang & Oseanografi Tropis',
        year: '2024',
        category: 'Laboratorium & Riset',
        description:
          'Stasiun riset pantai seluas 20 hektar di Jepara yang dilengkapi fasilitas pembenihan laut (hatchery), dermaga kapal riset, dan laboratorium bioteknologi mikroalga pesisir utara Jawa.',
        plaqueSummary:
          'Episentrum riset oseanografi dan konservasi pesisir tropis Indonesia dengan sarana kapal riset bahari Diponegoro.',
        modelType: 'portrait',
        position: [-9.6, 2.5, 0],
        rotationY: Math.PI / 2,
        podiumPosition: [-8.2, 0, 0],
        podiumRotationY: Math.PI / 2,
      },
      {
        id: 'z4-rsnd',
        title: 'Rumah Sakit Nasional Diponegoro (RSND)',
        subtitle: 'Pusat Layanan Kesehatan Rujukan & Riset Kedokteran Tropis',
        year: '2014–Sekarang',
        category: 'Layanan Kesehatan',
        description:
          'RSND merupakan rumah sakit perguruan tinggi negeri berakreditasi Paripurna dengan fasilitas rawat inap modern, pusat rehabilitasi medik, laboratorium kateterisasi jantung, dan penanganan penyakit infeksi tropis.',
        plaqueSummary:
          'Pusat layanan kesehatan modern terintegrasi pendidikan klinis dokter spesialis dan pengabdian medis bagi masyarakat Jawa Tengah.',
        modelType: 'portrait',
        position: [-9.6, 2.5, 5],
        rotationY: Math.PI / 2,
        podiumPosition: [-8.2, 0, 5],
        podiumRotationY: Math.PI / 2,
      },
      {
        id: 'z4-ict-center',
        title: 'Gedung Smart ICT Center & Komputasi',
        subtitle: 'Tulang Punggung Infrastruktur Digital & Supercomputing Kampus',
        year: '2022',
        category: 'Kampus Modern',
        description:
          'Gedung Information and Communication Technology (ICT) mengelola jaringan internet fiber optik terpusat, server cloud mandiri, keamanan siber, dan sistem SSO layanan civitas akademika.',
        plaqueSummary:
          'Pusat kendali komputasi cerdas, server repository data terintegrasi, dan jaringan digital kampus masa kini.',
        modelType: 'portrait',
        position: [-9.6, 2.5, 10],
        rotationY: Math.PI / 2,
        podiumPosition: [-8.2, 0, 10],
        podiumRotationY: Math.PI / 2,
      },

      // --- EAST WALL (PERPUSTAKAAN, PRESTASI GLOBAL & KEMANDIRIAN) ---
      {
        id: 'z4-perpustakaan-pusat',
        title: 'UPT Perpustakaan & Undip Repository',
        subtitle: 'Akses Pengetahuan Terbuka, E-Journal Dunia & Ruang Belajar Cerdas',
        year: '2024',
        category: 'Perpustakaan & Pengetahuan',
        description:
          'Gedung perpustakaan pusat 5 lantai menyediakan ratusan ribu koleksi cetak, akses jutaan jurnal ilmiah internasional Scopus/ScienceDirect, bilik riset multimedia, dan repositori karya ilmiah terbuka.',
        plaqueSummary:
          'Jantung peradaban ilmu pengetahuan kampus dengan fasilitas e-library interaktif, koleksi langka, dan repositori publikasi terbuka.',
        modelType: 'portrait',
        position: [9.6, 2.5, -10],
        rotationY: -Math.PI / 2,
        podiumPosition: [8.2, 0, -10],
        podiumRotationY: -Math.PI / 2,
      },
      {
        id: 'z4-qs-employability',
        title: 'Peringkat 1 Nasional QS Graduate Employability',
        subtitle: 'Universitas dengan Lulusan Tercepat Bekerja di Indonesia',
        year: '2021–2024',
        category: 'Prestasi Internasional',
        description:
          'Pencapaian prestisius di tingkat internasional: QS menempatkan Undip di peringkat #1 di Indonesia untuk indikator kecepatan alumni mendapatkan pekerjaan profesional berkualitas.',
        plaqueSummary:
          'Bukti kualitas unggul lulusan Undip yang paling diminati dunia industri, perusahaan multinasional, dan lembaga pemerintahan.',
        modelType: 'portrait',
        position: [9.6, 2.5, -5],
        rotationY: -Math.PI / 2,
        podiumPosition: [8.2, 0, -5],
        podiumRotationY: -Math.PI / 2,
      },
      {
        id: 'z4-wcu-ranking',
        title: 'Top 500 World Class University (QS WCU)',
        subtitle: 'Pengakuan Reputasi Akademik Global & Jejaring Riset Internasional',
        year: '2023–2024',
        category: 'Prestasi Internasional',
        description:
          'Lompatan peringkat universitas kelas dunia dalam pemeringkatan QS World University Rankings dan Times Higher Education (THE), mengukuhkan posisi Undip di kancah persaingan sains global.',
        plaqueSummary:
          'Pengakuan bergengsi reputasi internasional: masuk jajaran universitas elit dunia dengan ribuan mahasiswa asing dan riset kolaborasi 5 benua.',
        modelType: 'portrait',
        position: [9.6, 2.5, 0],
        rotationY: -Math.PI / 2,
        podiumPosition: [8.2, 0, 0],
        podiumRotationY: -Math.PI / 2,
      },
      {
        id: 'z4-transformasi-ptnbh',
        title: 'Kemandirian Tata Kelola PTN-BH',
        subtitle: 'Perguruan Tinggi Negeri Berbadan Hukum Mandiri & Akuntabel',
        year: '2015–Sekarang',
        category: 'Transformasi Kampus',
        description:
          'Status PTN-BH memberikan otonomi akademik, pengelolaan dana abadi, serta akselerasi pembukaan program studi bertaraf internasional yang fleksibel menjawab kebutuhan zaman.',
        plaqueSummary:
          'Tonggak kemandirian institusi dalam pengelolaan aset, riset terapan, dan kemitraan strategis global demi kemajuan bangsa.',
        modelType: 'portrait',
        position: [9.6, 2.5, 5],
        rotationY: -Math.PI / 2,
        podiumPosition: [8.2, 0, 5],
        podiumRotationY: -Math.PI / 2,
      },
      {
        id: 'z4-greenmetric',
        title: 'Kampus Hijau Dunia (UI GreenMetric)',
        subtitle: 'Pengelolaan Energi Bersih, Hutan Kota, dan Konservasi Waduk Edukasi',
        year: '2020–2024',
        category: 'Prestasi Internasional',
        description:
          'Komitmen terhadap kelestarian bumi diwujudkan lewat tata kelola kampus hijau berstandar UI GreenMetric World University Rankings: panel surya terbarukan, pengelolaan zero waste, dan danau resapan air.',
        plaqueSummary:
          'Peringkat teratas kampus lestari ramah lingkungan dengan ruang terbuka hijau asri, jembatan Sikatak, dan ekosistem kampus berkelanjutan.',
        modelType: 'portrait',
        position: [9.6, 2.5, 10],
        rotationY: -Math.PI / 2,
        podiumPosition: [8.2, 0, 10],
        podiumRotationY: -Math.PI / 2,
      },

      // --- NORTH WALL (PRASASTI UNDIP TODAY) ---
      {
        id: 'z4-prasasti-modern',
        title: 'Prasasti Capaian Undip Menuju World Class University',
        subtitle: 'Rekam Jejak Keunggulan Riset Maritim, Inovasi PTN-BH, dan Reputasi Global',
        year: '2015–Sekarang',
        category: 'Prestasi Internasional',
        description:
          'Piagam agung yang mendokumentasikan pencapaian gemilang Universitas Diponegoro di era modern sebagai pusat riset maritim terkemuka, penghasil lulusan berdaya saing global, dan pelopor kampus lestari.',
        plaqueSummary:
          'Piagam Keunggulan Undip Modern: Reputasi global World Class University, riset maritim terintegrasi, dan dedikasi bagi kemakmuran nusantara.',
        modelType: 'plaque',
        position: [0, 2.8, -15.5],
        rotationY: 0,
        podiumPosition: [0, 0, -13.5],
        podiumRotationY: 0,
      },

      // --- CENTERPIECE EXHIBIT ---
      {
        id: 'z4-monumen-globe-wcu',
        title: 'Monumen Widya Puraya & Globe Prestasi Dunia (Top 500 WCU)',
        subtitle: 'Simbol Keunggulan Global, Reputasi Internasional & PTN-BH Mandiri',
        year: '2024',
        category: 'Prestasi Internasional',
        description:
          'Monumen modern menampilkan Gedung Widya Puraya beratap joglo modern dengan cincin orbital emas bercahaya yang berputar, melambangkan capaian Undip menembus Top 500 World Class University.',
        plaqueSummary:
          'Monumen Widya Puraya & Globe Prestasi Dunia: Representasi kemajuan kampus modern, riset maritim terkemuka, dan prestasi ranking #1 nasional QS Employability.',
        modelType: 'stand',
        position: [0, 0, 0],
        podiumPosition: [0, 0, 2.5],
        podiumRotationY: 0,
      },

      // --- SIDE GALLERY VITRINES ---
      {
        id: 'z4-vitrine-trophy-abet',
        title: 'Vitrine Trophy Akreditasi Internasional ABET & ASIIN',
        subtitle: 'Standar Akreditasi Rekayasa Sains Jerman & Amerika Serikat',
        year: '2023',
        category: 'Prestasi Internasional',
        description:
          'Piala plakat kristal akreditasi internasional ABET (USA) dan ASIIN (Jerman) yang disematkan kepada program studi unggulan Fakultas Teknik dan Sains Undip.',
        modelType: 'vitrine',
        position: [-4.2, 0, -3.5],
        rotationY: Math.PI / 2,
        podiumPosition: [-4.2, 0, -2.1],
        podiumRotationY: 0,
      },
      {
        id: 'z4-vitrine-arsip-digital',
        title: 'Vitrine Terminal E-Repository & Digital Twin',
        subtitle: 'Sistem Informasi Kearsipan & Pengetahuan Terbuka Berbasis Cloud',
        year: '2024',
        category: 'Kampus Modern',
        description:
          'Model terminal cerdas penyimpan repositori digital universitas yang menaungi lebih dari 100.000 karya ilmiah dan dokumen historis terdigitalisasi.',
        modelType: 'vitrine',
        position: [4.2, 0, -3.5],
        rotationY: -Math.PI / 2,
        podiumPosition: [4.2, 0, -2.1],
        podiumRotationY: 0,
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
