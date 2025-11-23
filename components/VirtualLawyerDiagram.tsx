'use client';

import { useMemo, useState } from 'react';
import styles from './VirtualLawyerDiagram.module.css';

type Node = {
  id: string;
  title: string;
  stage: string;
  summary: string;
  rights: string[];
  nextSteps: string[];
  next: string[];
};

const nodes: Node[] = [
  {
    id: 'initial-contact',
    title: 'Kontak Pertama dengan Polisi',
    stage: 'Sebelum Tindakan',
    summary: 'Petugas datang atau memanggil Anda untuk klarifikasi awal.',
    rights: [
      'Minta petugas memperlihatkan identitas dan surat tugas.',
      'Anda berhak menolak memberikan pernyataan sebelum ada penasihat hukum.',
      'Catat waktu, lokasi, dan saksi yang melihat kejadian.'
    ],
    nextSteps: [
      'Jika ada ancaman penyitaan atau penangkapan, minta dasar hukum tertulis.',
      'Hubungi pendamping hukum dan beri tahu keluarga.',
      'Siapkan dokumen pribadi dan kontak darurat.'
    ],
    next: ['digital-search', 'arrest']
  },
  {
    id: 'digital-search',
    title: 'Penyitaan/Penggeledahan Elektronik',
    stage: 'Sebelum Tindakan',
    summary: 'Perangkat digital atau akun Anda diminta/diambil petugas.',
    rights: [
      'Harus ada surat izin penggeledahan/penyitaan dari pengadilan kecuali keadaan mendesak.',
      'Anda berhak didampingi penasihat hukum saat membuka perangkat.',
      'Minta daftar salinan data yang disalin atau diambil.'
    ],
    nextSteps: [
      'Cek dan foto surat perintah serta inventaris barang.',
      'Catat siapa saja yang menyentuh perangkat dan kapan.',
      'Ajukan keberatan tertulis bila pengambilan tidak sesuai prosedur.'
    ],
    next: ['arrest', 'legal-aid']
  },
  {
    id: 'arrest',
    title: 'Penangkapan',
    stage: 'Tindakan Lapangan',
    summary: 'Anda dibawa oleh petugas untuk pemeriksaan awal.',
    rights: [
      'Surat perintah penangkapan wajib diberikan kecuali tertangkap tangan.',
      'Satu kali komunikasi dengan keluarga/penasihat hukum harus difasilitasi.',
      'Tidak boleh diperiksa tanpa pendamping hukum dan tanpa protokol kesehatan.'
    ],
    nextSteps: [
      'Minta salinan BAP Penangkapan dan catat kronologi.',
      'Segera hubungi penasihat hukum atau LBH terdekat.',
      'Ajukan praperadilan bila prosedur tidak sah.'
    ],
    next: ['detention', 'legal-aid']
  },
  {
    id: 'detention',
    title: 'Penahanan & Pemeriksaan Awal',
    stage: 'Tindakan Lapangan',
    summary: 'Anda ditahan untuk pemeriksaan lebih lanjut.',
    rights: [
      'Kuasa hukum berhak hadir dalam setiap pemeriksaan dan membaca BAP.',
      'Penahanan wajib disertai surat perintah dan batas waktu jelas.',
      'Hak kesehatan: akses dokter dan obat yang dibutuhkan.'
    ],
    nextSteps: [
      'Pastikan ada berita acara penahanan dan salinannya.',
      'Pantau batas waktu penahanan (1x24 jam untuk penangkapan, dst).',
      'Jika ada kekerasan, minta visum dan laporkan ke Propam/Komnas HAM.'
    ],
    next: ['restorative', 'bail']
  },
  {
    id: 'legal-aid',
    title: 'Pendampingan Hukum',
    stage: 'Pendampingan & Pembelaan',
    summary: 'Mengaktifkan akses bantuan hukum sejak awal.',
    rights: [
      'Berhak didampingi penasihat hukum pilihan Anda atau disediakan negara.',
      'Konsultasi hukum harus dapat dilakukan secara privat.',
      'Pendamping boleh memeriksa berkas dan menghadiri pemeriksaan.'
    ],
    nextSteps: [
      'Hubungi organisasi bantuan hukum setempat atau POSBAKUM di pengadilan.',
      'Tanda tangani surat kuasa dengan jelas dan simpan salinannya.',
      'Minta pendamping hadir sebelum pemeriksaan dimulai.'
    ],
    next: ['detention', 'restorative']
  },
  {
    id: 'restorative',
    title: 'Restorative Justice/Diversi',
    stage: 'Pendampingan & Pembelaan',
    summary: 'Upaya penyelesaian di luar pengadilan jika syarat terpenuhi.',
    rights: [
      'Korban dan pelaku harus setuju, tanpa paksaan.',
      'Perkara tertentu (misal ancaman pidana rendah) dapat dihentikan lewat kesepakatan.',
      'Pendamping hukum wajib menjelaskan konsekuensi kesepakatan.'
    ],
    nextSteps: [
      'Periksa apakah kerugian dapat dipulihkan dan korban setuju.',
      'Ajukan permohonan diversi/RESTORATIVE ke penyidik atau jaksa.',
      'Pastikan berita acara kesepakatan ditandatangani semua pihak.'
    ],
    next: ['court-prep']
  },
  {
    id: 'bail',
    title: 'Penangguhan/Penjaminan',
    stage: 'Pendampingan & Pembelaan',
    summary: 'Meminta penangguhan penahanan dengan jaminan atau syarat tertentu.',
    rights: [
      'Hak mengajukan penangguhan/penjaminan setiap saat selama penahanan.',
      'Syarat wajib lapor/larangan keluar rumah harus proporsional.',
      'Keputusan penolakan harus tertulis.'
    ],
    nextSteps: [
      'Ajukan surat permohonan ke penyidik/penuntut dengan alasan jelas.',
      'Siapkan penjamin yang dapat hadir dan identitasnya.',
      'Dokumentasikan alasan penolakan untuk dasar upaya hukum.'
    ],
    next: ['court-prep']
  },
  {
    id: 'court-prep',
    title: 'Persiapan Sidang',
    stage: 'Setelah Penyidikan',
    summary: 'Berkas dilimpahkan ke penuntut/ pengadilan, siapkan pembelaan.',
    rights: [
      'Berhak menolak BAP jika dibuat tanpa pendamping atau di bawah tekanan.',
      'Berhak mengajukan saksi/ahli yang meringankan.',
      'Wajib menerima salinan dakwaan dan jadwal sidang.'
    ],
    nextSteps: [
      'Review dakwaan bersama penasihat hukum.',
      'Susun bukti tandingan (dokumen, ahli digital, saksi a de charge).',
      'Pastikan permohonan praperadilan atau eksepsi diajukan tepat waktu.'
    ],
    next: []
  }
];

export function VirtualLawyerDiagram() {
  const [selectedId, setSelectedId] = useState<string>('initial-contact');
  const selectedNode = nodes.find((node) => node.id === selectedId) ?? nodes[0];
  const recommendedTargets = useMemo(() => new Set(selectedNode.next), [selectedNode.next]);

  const stages = useMemo(
    () => ['Sebelum Tindakan', 'Tindakan Lapangan', 'Pendampingan & Pembelaan', 'Setelah Penyidikan'],
    []
  );

  const nodesByStage = useMemo(() => {
    const grouped: Record<string, Node[]> = {};
    stages.forEach((stage) => {
      grouped[stage] = nodes.filter((node) => node.stage === stage);
    });
    return grouped;
  }, [stages]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <p className={styles.kicker}>Virtual Lawyer</p>
          <h1>Diagram Hak & Langkah Cepat</h1>
          <p className={styles.lead}>
            Klik node untuk melihat hak utama, dokumen yang perlu disiapkan, dan ke mana langkah
            berikutnya harus diarahkan. Semua elemen dapat diakses dengan keyboard (Tab dan Enter).
          </p>
          <p className={styles.keyHint} id="diagram-instructions">
            Pintasan: gunakan Tab/Shift+Tab untuk berpindah node, Enter/Spasi untuk memilih, dan lihat
            panel kanan untuk langkah berikutnya.
          </p>
        </div>
        <div className={styles.legend} aria-label="Legenda diagram">
          <div className={styles.legendItem}>
            <span className={styles.legendDot} />
            <span>Node dapat diklik untuk detail</span>
          </div>
          <div className={styles.legendItem}>
            <span className={`${styles.legendDot} ${styles.next}`} />
            <span>Chip menunjukkan alur berikutnya</span>
          </div>
        </div>
      </div>

      <div className={styles.diagram} role="list" aria-label="Diagram jalur Virtual Lawyer">
        {stages.map((stage) => (
          <div key={stage} className={styles.stageColumn} aria-label={`Tahap ${stage}`}>
            <div className={styles.stageHeader}>{stage}</div>
            <div className={styles.columnNodes}>
              {nodesByStage[stage].map((node) => {
                const nodeHintId = `${node.id}-hint`;
                const isRecommended = recommendedTargets.has(node.id);
                const recommendedLabel = isRecommended
                  ? 'Langkah ini direkomendasikan dari pilihan Anda.'
                  : '';

                return (
                  <button
                    key={node.id}
                    role="listitem"
                    className={`${styles.node} ${selectedId === node.id ? styles.active : ''} ${
                      isRecommended ? styles.recommended : ''
                    }`}
                    type="button"
                    onClick={() => setSelectedId(node.id)}
                    onKeyDown={(evt) => {
                      if (evt.key === 'Enter' || evt.key === ' ') {
                        evt.preventDefault();
                        setSelectedId(node.id);
                      }
                    }}
                    aria-pressed={selectedId === node.id}
                    aria-current={selectedId === node.id}
                    aria-describedby={`${nodeHintId} diagram-instructions`}
                    aria-controls="vl-detail-panel"
                    aria-keyshortcuts="Enter Space"
                    aria-label={`${node.title}. ${node.summary} ${recommendedLabel}`.trim()}
                  >
                    <div className={styles.nodeTitle}>{node.title}</div>
                    <p className={styles.nodeSummary}>{node.summary}</p>
                    <div className={styles.nextChips} aria-label="Alur berikutnya">
                      {node.next.length === 0 ? (
                        <span className={styles.endChip}>Akhir alur</span>
                      ) : (
                        node.next.map((target) => {
                          const targetNode = nodes.find((n) => n.id === target);
                          return (
                            <span key={target} className={styles.nextChip}>
                              → {targetNode?.title ?? 'Langkah berikutnya'}
                            </span>
                          );
                        })
                      )}
                    </div>
                    <span className={styles.tooltip} role="tooltip" id={nodeHintId}>
                      {node.rights[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <aside className={styles.detailPanel} id="vl-detail-panel" aria-live="polite">
        <p className={styles.kicker}>Detail Node</p>
        <h2>{selectedNode.title}</h2>
        <p className={styles.detailLead}>{selectedNode.summary}</p>

        <div className={styles.detailSection}>
          <h3>Hak yang harus dijaga</h3>
          <ul>
            {selectedNode.rights.map((right) => (
              <li key={right}>{right}</li>
            ))}
          </ul>
        </div>

        <div className={styles.detailSection}>
          <h3>Langkah praktis berikutnya</h3>
          <ol>
            {selectedNode.nextSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>

        {selectedNode.next.length > 0 && (
          <div className={styles.detailSection}>
            <h3>Rute yang direkomendasikan</h3>
            <div className={styles.nextChips}>
              {selectedNode.next.map((target) => {
                const targetNode = nodes.find((n) => n.id === target);
                return (
                  <span key={target} className={styles.nextChip}>
                    → {targetNode?.title ?? 'Langkah berikutnya'}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        <p className={styles.accessibilityNote}>
          Node dengan garis pinggir ungu adalah rekomendasi langkah berikutnya dari pilihan Anda.
        </p>
        <div className={styles.srOnly} role="status" aria-live="polite">
          Node aktif: {selectedNode.title}. Rute lanjutan:{' '}
          {selectedNode.next
            .map((target) => nodes.find((n) => n.id === target)?.title ?? 'Langkah berikutnya')
            .join(', ') || 'Tidak ada langkah lanjutan.'}
        </div>
      </aside>
    </div>
  );
}
