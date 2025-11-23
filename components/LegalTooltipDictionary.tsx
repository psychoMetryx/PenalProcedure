'use client';

import { useState } from 'react';
import styles from './LegalTooltipDictionary.module.css';

type Term = {
  id: string;
  term: string;
  definition: string;
  tone: 'info' | 'success' | 'danger';
};

const terms: Term[] = [
  {
    id: 'praperadilan',
    term: 'Praperadilan',
    definition:
      'Upaya hukum untuk menguji sah atau tidaknya penangkapan, penahanan, penggeledahan, atau penghentian penyidikan.',
    tone: 'danger'
  },
  {
    id: 'bap',
    term: 'Berita Acara Pemeriksaan (BAP)',
    definition:
      'Catatan resmi hasil pemeriksaan. Anda berhak membaca ulang, merevisi jika ada tekanan, dan menolak menandatangani bila isinya tidak sesuai.',
    tone: 'info'
  },
  {
    id: 'diversi',
    term: 'Diversi/Restorative Justice',
    definition:
      'Penyelesaian perkara di luar pengadilan melalui kesepakatan korban-pelaku dengan pendamping hukum dan pengawasan penegak hukum.',
    tone: 'success'
  },
  {
    id: 'penangguhan',
    term: 'Penangguhan Penahanan',
    definition:
      'Permohonan agar penahanan dialihkan dengan syarat tertentu (jaminan, wajib lapor) untuk melindungi hak kesehatan dan keluarga.',
    tone: 'success'
  },
  {
    id: 'penggeledahan',
    term: 'Penggeledahan & Penyitaan Digital',
    definition:
      'Tindakan mengambil atau menyalin data/perangkat. Umumnya butuh izin pengadilan, berita acara, dan pendampingan penasihat hukum.',
    tone: 'danger'
  }
];

export function LegalTooltipDictionary() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section className={styles.wrapper} aria-labelledby="kamus-hukum-heading">
      <div className={styles.header}>
        <div>
          <p className="badge" data-tone="info">
            Kamus Tooltip
          </p>
          <h2 id="kamus-hukum-heading">Arti Singkat Istilah Hukum</h2>
          <p className={styles.lead}>
            Sorot, fokus, atau ketuk istilah untuk melihat definisi ringkas tanpa jargon. Tooltip menjaga kontras tinggi dan
            fokus yang jelas agar mudah dibaca.
          </p>
        </div>
      </div>

      <div className={styles.tooltipGrid} role="list">
        {terms.map((term) => {
          const tooltipId = `${term.id}-tooltip`;
          const isActive = activeId === term.id;

          return (
            <div className={styles.termCard} key={term.id} role="listitem">
              <button
                type="button"
                className={styles.termButton}
                aria-describedby={tooltipId}
                aria-expanded={isActive}
                data-tone={term.tone}
                onFocus={() => setActiveId(term.id)}
                onBlur={() => setActiveId(null)}
                onMouseEnter={() => setActiveId(term.id)}
                onMouseLeave={() => setActiveId(null)}
                onClick={() => setActiveId(isActive ? null : term.id)}
              >
                {term.term}
              </button>
              <span
                role="tooltip"
                id={tooltipId}
                className={`${styles.tooltip} ${isActive ? styles.visible : ''}`}
                data-tone={term.tone}
              >
                {term.definition}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
