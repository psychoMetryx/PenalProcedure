import styles from './Timeline.module.css';

type Step = {
  title: string;
  summary: string;
  rights: string[];
  tip?: string;
};

const steps: Step[] = [
  {
    title: 'Laporan / Pengaduan',
    summary: 'Cara melapor ke polisi atau Kejaksaan dan memastikan laporan dicatat.',
    rights: [
      'Minta Tanda Bukti Lapor (STBL) dan nomor kontak petugas.',
      'Boleh didampingi pengacara atau pendamping korban.',
      'Berhak menambahkan bukti tambahan yang relevan.'
    ],
    tip: 'Simpan kronologi tertulis dan foto bukti sejak awal.'
  },
  {
    title: 'Penyidikan',
    summary: 'Tahap pemeriksaan saksi, tersangka, dan pengumpulan bukti.',
    rights: [
      'Tersangka berhak didampingi penasihat hukum sejak penyidikan.',
      'Penangkapan/penahanan harus dengan surat perintah sah.',
      'Anda dapat menolak tanda tangan BAP yang tidak sesuai.'
    ],
    tip: 'Gunakan hak diam (right to remain silent) sampai pengacara hadir.'
  },
  {
    title: 'Penuntutan',
    summary: 'Jaksa menilai berkas perkara, dapat menghentikan atau lanjut ke pengadilan.',
    rights: [
      'Korban dapat mengajukan restitusi dan perlindungan.',
      'Praperadilan jika penangkapan/penahanan dianggap tidak sah.',
      'Negosiasi Keadilan Restoratif bila syarat terpenuhi.'
    ],
    tip: 'Pastikan kontak Anda ada di berkas untuk update perkara.'
  },
  {
    title: 'Persidangan',
    summary: 'Agenda sidang, pembuktian, saksi ahli, pledoi, dan tuntutan.',
    rights: [
      'Sidang terbuka, kecuali kasus tertentu (anak/keasusilan).',
      'Berhak menghadirkan saksi meringankan dan bukti elektronik.',
      'Hak atas juru bahasa bagi penyandang disabilitas atau bahasa daerah.'
    ],
    tip: 'Catat jadwal sidang dan minta salinan resume sidang dari penasihat hukum.'
  },
  {
    title: 'Putusan',
    summary: 'Hakim memutus bebas, lepas, atau pidana. Ada catatan rehabilitasi/pendampingan.',
    rights: [
      'Berhak menerima salinan putusan lengkap.',
      'Dapat mengajukan banding, kasasi, atau grasi sesuai batas waktu.',
      'Korban dapat melanjutkan restitusi jika belum dipenuhi.'
    ],
    tip: 'Perhatikan tenggat pengajuan upaya hukum (banding/kasasi).'
  },
  {
    title: 'Eksekusi & Pemulihan',
    summary: 'Pelaksanaan pidana, pembinaan, dan pemulihan hak korban.',
    rights: [
      'Permohonan penangguhan atau pengalihan penahanan bila memenuhi syarat.',
      'Program reintegrasi sosial dan pemasyarakatan.',
      'Korban mendapat pendampingan dan monitoring restitusi.'
    ],
    tip: 'Hubungi Balai Pemasyarakatan (BAPAS) untuk rencana reintegrasi.'
  }
];

export function Timeline() {
  return (
    <section className={styles.container}>
      <h1>Jalur Perkara Pidana</h1>
      <p className={styles.lead}>
        Ikuti alur proses pidana dari laporan hingga eksekusi. Klik tiap tahap untuk melihat hak dan tindakan penting.
      </p>
      <div className={styles.timeline}>
        {steps.map((step, index) => (
          <article key={step.title} className={styles.step}>
            <div className={styles.stepHeader}>
              <span className={styles.badge}>{index + 1}</span>
              <div>
                <h2>{step.title}</h2>
                <p>{step.summary}</p>
              </div>
            </div>
            <ul>
              {step.rights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {step.tip && <p className={styles.tip}>Tip: {step.tip}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}
