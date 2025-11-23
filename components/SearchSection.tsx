'use client';

import Link from 'next/link';
import { FormEvent, useMemo, useState } from 'react';
import styles from './SearchSection.module.css';

type ContentType = 'stage' | 'right' | 'glossary' | 'template';

type SearchHit = {
  objectID: string;
  contentType: ContentType;
  title?: string;
  term?: string;
  summary?: string;
  description?: string;
  definition?: string;
  body?: string;
  audience?: 'suspect' | 'victim' | 'witness' | 'general';
  slug?: { current?: string };
};

type SearchResponse = {
  hits: SearchHit[];
  error?: string;
};

const typeLabels: Record<ContentType, string> = {
  stage: 'Tahap Perkara',
  right: 'Hak',
  glossary: 'Kamus',
  template: 'Template'
};

const destinationLabels: Record<ContentType, string> = {
  stage: 'Jalur Perkara',
  right: 'Know Your Rights',
  glossary: 'Kamus Hukum',
  template: 'Generator Surat'
};

function buildDestination(hit: SearchHit) {
  if (hit.contentType === 'stage') {
    const anchor = hit.slug?.current || hit.objectID;
    const normalizedAnchor = anchor ? encodeURIComponent(anchor) : '';
    return {
      href: normalizedAnchor ? `/jalur-perkara#${normalizedAnchor}` : '/jalur-perkara',
      label: destinationLabels.stage
    };
  }

  if (hit.contentType === 'right') {
    const anchor = hit.audience ? `#${hit.audience}` : '';
    return { href: `/know-your-rights${anchor}`, label: destinationLabels.right };
  }

  if (hit.contentType === 'glossary') {
    return { href: '/know-your-rights#kamus-hukum-heading', label: destinationLabels.glossary };
  }

  return { href: '/document-generator', label: destinationLabels.template };
}

function trimText(text?: string, limit = 210) {
  if (!text) return '';
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (normalized.length <= limit) return normalized;
  return `${normalized.slice(0, limit).trimEnd()}…`;
}

function buildDescription(hit: SearchHit) {
  if (hit.contentType === 'glossary') {
    return trimText(hit.definition);
  }

  if (hit.contentType === 'template') {
    return trimText(hit.description || hit.body);
  }

  if (hit.contentType === 'right') {
    return trimText(hit.description);
  }

  return trimText(hit.summary || hit.description);
}

export function SearchSection() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchHit[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedQuery = query.trim();
    setHasSearched(true);

    if (!trimmedQuery) {
      setResults([]);
      return;
    }

    setStatus('loading');
    setErrorMessage(null);

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: trimmedQuery })
      });

      const data: SearchResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Gagal memuat hasil pencarian.');
      }

      setResults(data.hits || []);
      setStatus('idle');
    } catch (error) {
      console.error(error);
      setStatus('error');
      setErrorMessage('Tidak dapat memuat hasil. Coba lagi atau periksa koneksi Anda.');
    }
  };

  const statusMessage = useMemo(() => {
    if (status === 'loading') return 'Mencari di indeks Algolia…';
    if (status === 'error') return errorMessage || 'Terjadi kesalahan saat memproses pencarian.';
    if (!hasSearched) return 'Cari tahapan perkara, hak, istilah hukum, atau template surat.';
    if (hasSearched && results.length === 0) return 'Tidak ada hasil untuk kata kunci tersebut.';
    return null;
  }, [errorMessage, hasSearched, results.length, status]);

  return (
    <section className={styles.wrapper} aria-labelledby="search-heading">
      <div className={`card ${styles.searchCard}`}>
        <div className={styles.header}>
          <div>
            <p className="badge" data-tone="info">
              Pencarian Cepat
            </p>
            <h2 id="search-heading">Temukan jalur perkara, hak, atau template</h2>
            <p className={styles.lead}>
              Gunakan satu kolom pencarian untuk menjelajah tahapan jalur perkara, hak korban/tersangka/saksi, istilah kamus, dan template surat yang sudah terindeks.
            </p>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSearch} role="search" aria-label="Cari konten hukum">
          <label className={styles.label} htmlFor="site-search">
            Kata kunci
          </label>
          <div className={styles.controls}>
            <input
              id="site-search"
              type="search"
              name="search"
              placeholder="Contoh: praperadilan penangkapan atau hak korban"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-required="false"
              aria-label="Cari jalur perkara, hak, atau template"
            />
            <button type="submit" disabled={status === 'loading'} aria-label="Cari di indeks Algolia">
              {status === 'loading' ? 'Mencari…' : 'Cari'}
            </button>
          </div>
        </form>

        {statusMessage && (
          <div
            className={styles.status}
            role={status === 'error' ? 'alert' : 'status'}
            aria-live="polite"
          >
            {statusMessage}
          </div>
        )}

        {results.length > 0 && (
          <ul className={styles.resultsGrid} aria-live="polite">
            {results.map((hit) => {
              const destination = buildDestination(hit);
              const title = (hit.contentType === 'glossary' ? hit.term : hit.title) ?? 'Tanpa judul';
              const description = buildDescription(hit);

              return (
                <li key={hit.objectID} className={`card ${styles.resultCard}`}>
                  <div className={styles.resultMeta}>
                    <span className={styles.typeBadge}>{typeLabels[hit.contentType]}</span>
                    <span className={styles.destination}>{destination.label}</span>
                  </div>
                  <h3 className={styles.resultTitle}>
                    <Link href={destination.href} className={styles.resultLink} aria-label={`Buka ${title} di ${destination.label}`}>
                      {title}
                    </Link>
                  </h3>
                  {description && <p className={styles.description}>{description}</p>}
                  <div className={styles.resultFooter}>
                    <span className={styles.audience}>
                      {hit.contentType === 'right' && hit.audience ? `Fokus: ${hit.audience}` : null}
                    </span>
                    <Link href={destination.href} className={styles.cta} aria-label={`Pergi ke ${destination.label} untuk ${title}`}>
                      Lihat detail →
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
