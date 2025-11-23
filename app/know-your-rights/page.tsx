import { LegalTooltipDictionary } from '../../components/LegalTooltipDictionary';

const cards = [
  {
    id: 'suspect',
    title: 'Hak Tersangka',
    points: [
      {
        text: 'Didampingi penasihat hukum sejak penyidikan dan berhak menolak pemeriksaan tanpa pendamping.',
        basis: 'Pasal 134 huruf b-c'
      },
      {
        text: 'Hak untuk diam dan tidak dipaksa memberi keterangan yang memberatkan diri sendiri.',
        basis: 'Pasal 134 huruf f'
      },
      {
        text: 'Praperadilan untuk menggugat penangkapan, penahanan, atau penghentian penyidikan.',
        basis: 'Pasal 149 ayat (1)'
      },
      {
        text: 'Akses keluarga dan komunikasi untuk memberi kabar penahanan.',
        basis: 'Pasal 134 huruf m-n'
      }
    ]
  },
  {
    id: 'victim',
    title: 'Hak Korban',
    points: [
      {
        text: 'Memperoleh perlindungan, kerahasiaan identitas, dan pendampingan psikologis.',
        basis: 'Pasal 136 huruf i-j, o'
      },
      {
        text: 'Mengajukan restitusi/kompensasi dan memantau pemenuhannya.',
        basis: 'Pasal 136 huruf l, u'
      },
      {
        text: 'Menerima perkembangan perkara, putusan pengadilan, dan informasi pembebasan.',
        basis: 'Pasal 136 huruf f-h'
      },
      {
        text: 'Mendorong keadilan restoratif/mediasi penal jika sesuai syarat.',
        basis: 'Pasal 136 huruf m'
      }
    ]
  },
  {
    id: 'witness',
    title: 'Hak Saksi & Pelapor',
    points: [
      {
        text: 'Perlindungan identitas, keamanan pribadi/keluarga, dan dukungan keamanan.',
        basis: 'Pasal 135 huruf g-h, j'
      },
      {
        text: 'Biaya transport dan akomodasi ketika dipanggil hadir.',
        basis: 'Pasal 135 huruf i, k'
      },
      {
        text: 'Tidak dapat digugat pidana/perdata atas kesaksian yang benar.',
        basis: 'Pasal 135 huruf a'
      },
      {
        text: 'Memberi keterangan tanpa tekanan dan boleh menolak pertanyaan yang menjerat/memberatkan diri sendiri.',
        basis: 'Pasal 135 huruf c, e, f'
      }
    ]
  }
];

const vulnerable = [
  {
    title: 'Penyandang Disabilitas',
    detail:
      'Pelayanan, sarana, dan akomodasi yang sesuai ragam disabilitas di setiap tingkat pemeriksaan, termasuk juru bahasa isyarat dan pendamping khusus.',
    basis: 'Pasal 137 ayat (1)'
  },
  {
    title: 'Perempuan & Anak',
    detail:
      'Bebas dari sikap/pernyataan merendahkan atau mengintimidasi, mendapat pendamping, dan pemeriksaan yang mempertimbangkan situasi serta trauma (termasuk keterangan jarak jauh).',
    basis: 'Pasal 138 ayat (2) huruf a-d'
  },
  {
    title: 'Lansia & Orang Sakit',
    detail:
      'Sarana khusus sesuai kondisi fisik/psikis, pelayanan kesehatan lanjut usia, dan pertimbangan untuk tidak dijatuhi penjara bagi yang berusia di atas 75 tahun.',
    basis: 'Pasal 139 ayat (2) huruf a-c'
  }
];

export default function KnowYourRightsPage() {
  return (
    <div>
      <h1>Know Your Rights</h1>
      <p style={{ color: 'var(--color-text-subtle)', maxWidth: '780px', margin: '0.5rem 0 1.25rem' }}>
        Ringkasan hak-hak utama untuk tiap peran. Gunakan sebagai referensi cepat ketika berhadapan dengan aparat penegak hukum.
      </p>

      <section id="emergency" style={{ marginTop: '1.5rem' }}>
        <p className="badge" data-tone="danger">
          Darurat
        </p>
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
                {card.points.map(({ text, basis }) => (
                  <li key={text}>
                    <div>{text}</div>
                    <div style={{ color: 'var(--color-text-subtle)', fontSize: '0.9em' }}>
                      Basis hukum: RKUHAP {basis}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2 id="vulnerable">Kelompok Rentan</h2>
        <p style={{ color: 'var(--color-text-subtle)', maxWidth: '760px' }}>
          Kelompok dengan kebutuhan khusus berhak atas perlakuan dan fasilitas berbeda untuk menjamin proses yang adil.
        </p>
        <div className="cardGrid">
          {vulnerable.map((item) => (
            <div key={item.title} className="card">
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
              <p style={{ color: 'var(--color-text-subtle)', fontSize: '0.9em', marginTop: '0.35rem' }}>
                Basis hukum: RKUHAP {item.basis}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <LegalTooltipDictionary />
      </section>
    </div>
  );
}
