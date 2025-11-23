const cards = [
  {
    id: 'suspect',
    title: 'Hak Tersangka',
    points: [
      'Didampingi penasihat hukum sejak penyidikan dan berhak menolak pemeriksaan tanpa pendamping.',
      'Hak untuk diam dan tidak dipaksa memberi keterangan yang memberatkan diri sendiri.',
      'Praperadilan untuk menggugat penangkapan, penahanan, atau penghentian penyidikan.',
      'Akses keluarga dan komunikasi untuk memberi kabar penahanan.'
    ]
  },
  {
    id: 'victim',
    title: 'Hak Korban',
    points: [
      'Memperoleh perlindungan, kerahasiaan identitas, dan pendampingan psikologis.',
      'Mengajukan restitusi/kompensasi dan memantau pemenuhannya.',
      'Menerima perkembangan perkara dan salinan putusan.',
      'Mendorong keadilan restoratif jika sesuai syarat.'
    ]
  },
  {
    id: 'witness',
    title: 'Hak Saksi & Pelapor',
    points: [
      'Perlindungan identitas dan keamanan, termasuk relokasi jika perlu.',
      'Biaya transport dan akomodasi ketika dipanggil hadir.',
      'Tidak dapat digugat pidana/perdata atas kesaksian yang benar.',
      'Dapat memberikan keterangan jarak jauh bila ada intimidasi.'
    ]
  }
];

const vulnerable = [
  {
    title: 'Penyandang Disabilitas',
    detail: 'Berhak juru bahasa isyarat, pendamping khusus, dan akomodasi layak selama pemeriksaan dan persidangan.'
  },
  {
    title: 'Perempuan & Anak',
    detail: 'Pemeriksaan ramah korban, ruang terpisah, serta petugas yang terlatih untuk kekerasan berbasis gender.'
  },
  {
    title: 'Lansia & Orang Sakit',
    detail: 'Hak atas pemeriksaan kesehatan berkala dan opsi penangguhan/penalihan penahanan demi kesehatan.'
  }
];

export default function KnowYourRightsPage() {
  return (
    <div>
      <h1>Know Your Rights</h1>
      <p style={{ color: '#475569', maxWidth: '780px', margin: '0.5rem 0 1.25rem' }}>
        Ringkasan hak-hak utama untuk tiap peran. Gunakan sebagai referensi cepat ketika berhadapan dengan aparat penegak hukum.
      </p>

      <section id="emergency" style={{ marginTop: '1.5rem' }}>
        <p className="badge">Darurat</p>
        <h2>Checklist Darurat (5 langkah cepat)</h2>
        <ol style={{ marginLeft: '1.2rem', lineHeight: 1.5 }}>
          <li>Tanyakan surat perintah (tangkap/geledah/sita) dan baca isinya.</li>
          <li>Hubungi keluarga/pengacara; Anda berhak atas setidaknya satu panggilan.</li>
          <li>Catat nama, pangkat, dan instansi petugas.</li>
          <li>Tolak menandatangani dokumen yang tidak sesuai isi pemeriksaan.</li>
          <li>Dokumentasikan kejadian (foto/video) bila aman dan diperbolehkan.</li>
        </ol>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Hak Inti per Peran</h2>
        <div className="cardGrid">
          {cards.map((card) => (
            <div id={card.id} key={card.id} className="card">
              <h3>{card.title}</h3>
              <ul style={{ paddingLeft: '1.15rem', lineHeight: 1.5 }}>
                {card.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2 id="vulnerable">Kelompok Rentan</h2>
        <p style={{ color: '#475569', maxWidth: '760px' }}>
          Kelompok dengan kebutuhan khusus berhak atas perlakuan dan fasilitas berbeda untuk menjamin proses yang adil.
        </p>
        <div className="cardGrid">
          {vulnerable.map((item) => (
            <div key={item.title} className="card">
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
