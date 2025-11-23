'use client';

import { useState } from 'react';
import styles from './ComparatorTable.module.css';

type Topic = {
  id: string;
  title: string;
  before: string;
  after: string;
  reference: string;
};

const topics: Topic[] = [
  {
    id: 'restorative-justice',
    title: 'Keadilan Restoratif',
    before:
      'Lebih banyak bergantung pada diskresi aparat dan perdamaian informal; jalur di luar pengadilan sering tidak jelas.',
    after:
      'Pasal 74-75 mengatur penyelesaian di luar pengadilan pada tahap penyelidikan, penyidikan, atau penuntutan dengan syarat pelaku pertama kali, sudah memulihkan kerugian, dan ada kesepakatan damai.',
    reference: 'Pasal 74-75',
  },
  {
    id: 'electronic-evidence',
    title: 'Bukti Elektronik',
    before:
      'Kerap bergantung pada UU ITE dan yurisprudensi; penerimaan di persidangan tidak selalu konsisten.',
    after:
      'Pasal 228 menegaskan bukti elektronik sebagai alat bukti sah mencakup informasi, dokumen, dan sistem elektronik terkait tindak pidana.',
    reference: 'Pasal 228',
  },
  {
    id: 'legal-counsel',
    title: 'Pendampingan Advokat',
    before:
      'KUHAP lama memprioritaskan bantuan hukum pada ancaman pidana tertentu sehingga pendampingan sering terlambat.',
    after:
      'Pasal 32-33 mewajibkan penyidik memberitahu hak didampingi Advokat sebelum pemeriksaan dan mengizinkan Advokat hadir serta menolak pertanyaan menjerat.',
    reference: 'Pasal 32-33',
  },
  {
    id: 'search-seizure',
    title: 'Penggeledahan & Penyitaan',
    before:
      'Izin tertulis sering diabaikan di lapangan dan dokumentasi terbatas, sehingga pemilik sulit mengawasi proses.',
    after:
      'Pasal 43-47 mensyaratkan penyidik menunjukkan identitas dan surat izin ketua pengadilan serta membuat berita acara yang ditandatangani pihak terkait.',
    reference: 'Pasal 43-47',
  },
  {
    id: 'appeal-cassation',
    title: 'Banding & Kasasi',
    before:
      'Batas waktu dan pemberitahuan sering tidak seragam; pencatatan permohonan kerap terlambat.',
    after:
      'Pasal 269-270 memberi tenggat 7 hari untuk permohonan banding, sedangkan Pasal 283-284 memberi 14 hari untuk kasasi dan mewajibkan panitera memberi tahu pihak lain.',
    reference: 'Pasal 269-270, 283-284',
  },
  {
    id: 'victim-restitution',
    title: 'Restitusi Korban',
    before:
      'Hak restitusi jarang dijalankan dan sumber pembiayaan tidak pasti, membuat korban mengandalkan gugatan perdata terpisah.',
    after:
      'Pasal 168-169 membentuk dana abadi dan Pasal 172 menegaskan korban berhak restitusi atas kerugian, penderitaan, serta biaya medis atau psikologis.',
    reference: 'Pasal 168-169, 172',
  },
];

export function ComparatorTable() {
  const [view, setView] = useState<'before' | 'after'>('before');

  return (
    <section className={styles.wrapper} aria-labelledby="comparator-title">
      <header className={styles.heading}>
        <h1 id="comparator-title">Perbandingan RUU KUHAP vs KUHAP Lama</h1>
        <p className={styles.lead}>
          Geser untuk melihat ringkasan perubahan utama berdasarkan RKUHAP. Setiap topik menampilkan konteks sebelum dan apa
          yang diatur sekarang.
        </p>
        <div className={styles.toggle} role="group" aria-label="Pilih versi perbandingan">
          <button
            type="button"
            className={view === 'before' ? styles.active : ''}
            aria-pressed={view === 'before'}
            aria-controls="comparison-list"
            onClick={() => setView('before')}
          >
            KUHAP Lama
          </button>
          <button
            type="button"
            className={view === 'after' ? styles.active : ''}
            aria-pressed={view === 'after'}
            aria-controls="comparison-list"
            onClick={() => setView('after')}
          >
            RUU KUHAP
          </button>
          <span
            className={styles.slider}
            aria-hidden
            style={{ transform: view === 'before' ? 'translateX(0%)' : 'translateX(100%)' }}
          />
        </div>
      </header>

      <div id="comparison-list" className={styles.grid} role="list" aria-live="polite">
        {topics.map((topic) => (
          <article key={topic.id} className={styles.card} role="listitem" tabIndex={0} aria-label={topic.title}>
            <div className={styles.cardHeader}>
              <h2>{topic.title}</h2>
              <p className={styles.reference}>RKUHAP {topic.reference}</p>
            </div>
            <p className={styles.status} aria-label={view === 'before' ? 'Sebelum' : 'Setelah'}>
              {view === 'before' ? 'Sebelum' : 'Setelah RKUHAP'}
            </p>
            <p className={styles.body}>{view === 'before' ? topic.before : topic.after}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
