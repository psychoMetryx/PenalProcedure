'use client';

import { useEffect, useMemo, useState } from 'react';
import { loadEvidenceItems } from '../../cms/evidence';
import { ensureEvidenceHasCitation } from '../../cms/legalConstants';
import { EvidenceItem } from '../../cms/types';
import styles from './EvidenceChecker.module.css';

type DropRecord = EvidenceItem & { timestamp: number };

export default function EvidenceCheckerPage() {
  const [items, setItems] = useState<EvidenceItem[]>([]);
  const [dragging, setDragging] = useState(false);
  const [bag, setBag] = useState<DropRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvidenceItems()
      .then((loaded) => setItems(loaded))
      .finally(() => setLoading(false));
  }, []);

  const validatedItems = useMemo(() => ensureEvidenceHasCitation(items), [items]);

  const latest = useMemo(() => {
    if (!bag.length) return null;
    return bag[bag.length - 1];
  }, [bag]);

  const addItemToBag = (item: EvidenceItem) => {
    if (!item.pasal || !item.citationUrl) return;
    setBag((prev) => [...prev, { ...item, timestamp: Date.now() }]);
    setDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const id = event.dataTransfer.getData('text/plain');
    const item = validatedItems.find((entry) => entry.id === id);
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
            {loading && <p className={styles.helperText}>Memuat dasar pasal dari RKUHAP...</p>}
            {!loading && !validatedItems.length && (
              <p className={styles.helperText}>Data evidence belum tersedia karena tidak ada kutipan pasal yang valid.</p>
            )}
            {validatedItems.map((item) => (
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
                <div className={styles.pasalRow}>
                  <span className={styles.pasalTag}>{item.pasal}</span>
                  <a className={styles.citationLink} href={item.citationUrl} target="_blank" rel="noreferrer">
                    Buka teks RKUHAP
                  </a>
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
                <div className={styles.pasalRow}>
                  <span className={styles.pasalTag}>{latest.pasal}</span>
                  <a className={styles.citationLink} href={latest.citationUrl} target="_blank" rel="noreferrer">
                    Lihat teks pasal
                  </a>
                </div>
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
                          <div className={styles.logMeta}>
                            <span className={styles.pasalTag}>{entry.pasal}</span>
                            <a
                              className={styles.citationLink}
                              href={entry.citationUrl}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Tautan RKUHAP
                            </a>
                          </div>
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
