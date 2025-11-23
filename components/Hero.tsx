import Link from 'next/link';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.textArea}>
        <p className={styles.label}>Butuh arah hukum yang jelas?</p>
        <h1>Dealing with the Law? Start Here.</h1>
        <p className={styles.lead}>
          PahamKUHAP merangkum jalur perkara pidana Indonesia dalam bahasa yang sederhana,
          dengan panduan hak bagi korban, tersangka, saksi, dan kelompok rentan.
        </p>
        <div className={styles.ctas}>
          <Link href="/know-your-rights#victim" className={styles.victim}>
            Saya Korban
          </Link>
          <Link href="/know-your-rights#suspect" className={styles.suspect}>
            Saya Tersangka
          </Link>
          <Link href="/know-your-rights#witness" className={styles.witness}>
            Saya Saksi
          </Link>
        </div>
        <div className={styles.secondaryLinks}>
          <Link href="/jalur-perkara">Lihat Jalur Perkara</Link>
          <Link href="/comparator">Bandingkan RUU vs KUHAP Lama</Link>
        </div>
      </div>
      <div className={styles.heroCard}>
        <p className={styles.cardTitle}>Checklist Mendesak</p>
        <ul>
          <li>Pastikan pendamping hukum hadir sebelum BAP.</li>
          <li>Catat nama dan satuan petugas.</li>
          <li>Minta salinan surat penangkapan/penggeledahan.</li>
          <li>Hubungi keluarga: Anda berhak atas 1 panggilan.</li>
        </ul>
        <Link href="/know-your-rights#emergency" className={styles.cardAction}>
          Lihat panduan lengkap →
        </Link>
      </div>
    </section>
  );
}
