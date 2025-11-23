'use client';

import { useMemo, useState } from 'react';
import styles from './EvidenceChecker.module.css';

type EvidenceItem = {
  id: string;
  title: string;
  type: string;
  accepted: boolean;
  basis: string;
  detail: string;
};

type DropRecord = EvidenceItem & { timestamp: number };

const evidenceItems: EvidenceItem[] = [
  {
    id: 'rumor',
    title: 'Rumor dari teman',
    type: 'Testimoni tidak langsung',
    accepted: false,
    basis: 'Kesaksian harus berdasarkan pengalaman langsung, rumor dikategorikan sebagai hearsay.',
    detail: 'Pengadilan hanya menerima keterangan saksi yang melihat, mendengar, dan mengalami sendiri peristiwa pidana.'
  },
  {
    id: 'cctv',
    title: 'Rekaman CCTV',
    type: 'Bukti elektronik',
    accepted: true,
    basis: 'Pasal elektronik RKUHAP menegaskan rekaman sebagai dokumen sah setara surat.',
    detail: 'Rekaman kamera yang menunjukkan kejadian langsung bisa menguatkan kronologi dan identitas pelaku.'
  },
  {
    id: 'whatsapp',
    title: 'Chat WhatsApp',
    type: 'Dokumen elektronik',
    accepted: true,
    basis: 'RKUHAP memasukkan dokumen elektronik sebagai alat bukti yang dapat dipertanggungjawabkan.',
    detail: 'Percakapan digital yang utuh (dengan metadata) dapat menunjukkan niat, perintah, atau ancaman.'
  },
  {
    id: 'screenshot',
    title: 'Screenshot tidak utuh',
    type: 'Dokumen elektronik',
    accepted: false,
    basis: 'Tangkapan layar parsial sulit diverifikasi keasliannya dan rawan manipulasi.',
    detail: 'Bukti elektronik wajib menunjukkan konteks lengkap dan rantai keaslian untuk diterima pengadilan.'
  },
  {
    id: 'surat',
    title: 'Surat keterangan resmi',
    type: 'Surat/akta',
    accepted: true,
    basis: 'Dokumen resmi yang ditandatangani pejabat berwenang memenuhi kategori surat dalam RKUHAP.',
    detail: 'Surat keterangan, visum et repertum, atau berita acara penyitaan termasuk alat bukti surat.'
  },
  {
    id: 'rekaman-telepon',
    title: 'Rekaman telepon pribadi',
    type: 'Bukti elektronik',
    accepted: false,
    basis: 'Rekaman tanpa persetujuan dan tanpa penetapan hakim berisiko melanggar privasi dan dikesampingkan.',
    detail: 'Pengumpulan alat bukti elektronik tetap harus memperhatikan legalitas penyadapan dalam RKUHAP.'
  }
];

export default function EvidenceCheckerPage() {
  const [dragging, setDragging] = useState(false);
  const [bag, setBag] = useState<DropRecord[]>([]);

  const latest = useMemo(() => {
    if (!bag.length) return null;
    return bag[bag.length - 1];
  }, [bag]);

  const addItemToBag = (item: EvidenceItem) => {
    setBag((prev) => [...prev, { ...item, timestamp: Date.now() }]);
    setDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const id = event.dataTransfer.getData('text/plain');
    const item = evidenceItems.find((entry) => entry.id === id);
    if (!item) return;

    addItemToBag(item);
  };

  const handleReset = () => {
    setBag([]);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <p className="badge">Evidence Checker</p>
        <h1>Masukkan ke Court Bag: diterima atau ditolak?</h1>
        <p>
          Seret item bukti ke area <strong>Court Bag</strong> untuk melihat apakah ia cenderung diterima atau ditolak dalam
          persidangan. Setiap hasil disertai basis hukum singkat dari RKUHAP agar Anda memahami standar alat bukti elektronik,
          surat, dan kesaksian.
        </p>
      </div>

      <div className={styles.layout}>
        <div>
          <h2>Drag atau klik evidence yang Anda punya</h2>
          <div className={styles.itemsList}>
            {evidenceItems.map((item) => (
              <div
                key={item.id}
                draggable
                role="button"
                tabIndex={0}
                className={styles.draggableCard}
                onDragStart={(e) => {
                  e.dataTransfer.setData('text/plain', item.id);
                  setDragging(true);
                }}
                onDragEnd={() => setDragging(false)}
                onClick={() => addItemToBag(item)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    addItemToBag(item);
                  }
                }}
              >
                <div className={styles.metaRow}>
                  <span className={styles.evidenceType}>{item.type}</span>
                  <span aria-hidden>•</span>
                  <span>{item.accepted ? 'Cenderung diterima' : 'Berpotensi ditolak'}</span>
                </div>
                <h3>{item.title}</h3>
                <p style={{ color: '#475569', marginTop: '0.35rem' }}>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.dropZoneWrapper}>
          <div
            className={`${styles.dropZone} ${dragging ? styles.dragging : ''}`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <h2 style={{ margin: 0 }}>Court Bag</h2>
              <span className="badge">Drop di sini</span>
            </div>
            <p className={styles.dropHint}>
              Lepaskan atau klik kartu bukti apa pun untuk melihat status penerimaan dan dasar pasal. Tarik lebih dari satu
              item untuk membandingkan.
            </p>

            {latest ? (
              <div className={styles.resultCard}>
                <div
                  className={`${styles.statusBadge} ${latest.accepted ? styles.statusAccept : styles.statusReject}`}
                  role="status"
                >
                  {latest.accepted ? '✔️ Diterima (RKUHAP)' : '✖️ Ditolak (RKUHAP)'}
                </div>
                <h3 style={{ marginTop: '0.35rem' }}>{latest.title}</h3>
                <p className={styles.basis}>{latest.accepted ? 'Alasan diterima' : 'Alasan ditolak'}</p>
                <p className={styles.basisDetail}>{latest.basis}</p>
                <p style={{ color: '#475569', marginTop: '0.3rem' }}>{latest.detail}</p>
              </div>
            ) : (
              <div className={styles.resultCard}>
                <p style={{ color: '#475569' }}>
                  Court Bag masih kosong. Seret satu item untuk melihat contoh penerimaan atau penolakan berdasarkan standar alat
                  bukti RKUHAP.
                </p>
              </div>
            )}

            {bag.length > 0 && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.2rem' }}>
                  <h3 style={{ margin: 0 }}>Riwayat dalam Court Bag</h3>
                  <button type="button" className={styles.resetBtn} onClick={handleReset}>
                    Reset bag
                  </button>
                </div>
                <div className={styles.logList}>
                  {bag
                    .slice()
                    .reverse()
                    .map((entry) => (
                      <div key={entry.timestamp} className={styles.logItem}>
                        <div className={styles.logTexts}>
                          <span style={{ fontWeight: 700 }}>{entry.title}</span>
                          <span style={{ color: '#475569' }}>{entry.basis}</span>
                        </div>
                        <span
                          className={`${styles.statusBadge} ${entry.accepted ? styles.statusAccept : styles.statusReject}`}
                        >
                          {entry.accepted ? 'Diterima' : 'Ditolak'}
                        </span>
                      </div>
                    ))}
                </div>
              </>
            )}
          </div>

          <div className={styles.legalList}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h3>Dasar singkat dari RKUHAP</h3>
              <span className={styles.sourceTag}>RKUHAP</span>
            </div>
            <div className={styles.legalPoint}>
              <strong>Bukti elektronik</strong>
              <span>
                Rekaman CCTV, chat, email, dan log digital diperlakukan sebagai dokumen elektronik yang sah sepanjang keaslian
                dan rantai bukti dijaga.
              </span>
            </div>
            <div className={styles.legalPoint}>
              <strong>Kesaksian langsung</strong>
              <span>
                Keterangan saksi harus berasal dari pengalaman pribadi; cerita berantai atau rumor dikategorikan hearsay dan
                mudah disingkirkan.
              </span>
            </div>
            <div className={styles.legalPoint}>
              <strong>Surat/akta resmi</strong>
              <span>
                Dokumen yang dibuat pejabat berwenang (berita acara, visum, atau surat keterangan) memenuhi syarat alat bukti
                surat selama disusun sesuai prosedur.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
