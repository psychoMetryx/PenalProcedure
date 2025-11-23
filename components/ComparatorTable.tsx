import styles from './ComparatorTable.module.css';

type Row = {
  topic: string;
  old: string;
  draft: string;
  impact: string;
};

const rows: Row[] = [
  {
    topic: 'Restorative Justice',
    old: 'Belum eksplisit, hanya diskresi dan perdamaian terbatas.',
    draft: 'Diatur jelas dengan syarat pelaku kooperatif, korban setuju, dan bukan kejahatan berat.',
    impact: 'Peluang penyelesaian damai lebih luas untuk perkara ringan dan mengutamakan pemulihan.'
  },
  {
    topic: 'Bukti Elektronik',
    old: 'Pengaturan masih terbatas pada UU ITE dan yurisprudensi.',
    draft: 'Bukti elektronik menjadi alat bukti utama, dengan prosedur penyitaan digital.',
    impact: 'Pesan, email, atau rekaman digital lebih mudah diterima di persidangan.'
  },
  {
    topic: 'Pendampingan Hukum',
    old: 'Wajib untuk ancaman 5 tahun ke atas, sering terlambat di tahap awal.',
    draft: 'Hak pendampingan sejak penyidikan untuk seluruh tersangka.',
    impact: 'Mengurangi risiko salah prosedur dan memaksa aparat transparan sejak awal.'
  },
  {
    topic: 'Hak Korban & Restitusi',
    old: 'Restitusi jarang disebut dan tidak ada mekanisme jelas.',
    draft: 'Korban berhak restitusi dan perlindungan sepanjang proses.',
    impact: 'Pemulihan korban menjadi indikator utama keberhasilan perkara.'
  }
];

export function ComparatorTable() {
  return (
    <section className={styles.wrapper}>
      <h1>Perbandingan RUU KUHAP vs KUHAP Lama</h1>
      <p className={styles.lead}>
        Gambaran cepat perubahan penting dalam RUU KUHAP dibanding aturan sebelumnya. Gunakan untuk memahami dampak bagi peran Anda.
      </p>
      <div className={styles.table}>
        <div className={`${styles.row} ${styles.header}`}>
          <span>Topik</span>
          <span>Kuhap Lama</span>
          <span>RUU KUHAP</span>
          <span>Dampak ke Pengguna</span>
        </div>
        {rows.map((row) => (
          <div className={styles.row} key={row.topic}>
            <span className={styles.topic}>{row.topic}</span>
            <span>{row.old}</span>
            <span>{row.draft}</span>
            <span>{row.impact}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
