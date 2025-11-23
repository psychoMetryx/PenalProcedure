import { Suspense, type ReactNode } from 'react';
import { getStages } from '../cms/contentService';
import type { Stage, StageRight } from '../cms/types';
import styles from './Timeline.module.css';

type StageWithRights = Stage & { rights?: StageRight[] };

type TimelineStateProps = {
  children: ReactNode;
};

type TimelineFallbackProps = {
  hasError?: boolean;
};

type StageRightsListProps = {
  rights?: StageRight[];
};

function TimelineFrame({ children }: TimelineStateProps) {
  return (
    <section className={styles.container}>
      <h1>Jalur Perkara Pidana</h1>
      <p className={styles.lead}>
        Ikuti alur proses pidana dari laporan hingga eksekusi. Klik tiap tahap untuk melihat hak dan tindakan penting.
      </p>
      <div className={styles.timeline}>{children}</div>
    </section>
  );
}

function StageRightsList({ rights }: StageRightsListProps) {
  if (!rights?.length) {
    return <li className={styles.tip}>Data hak belum tersedia untuk tahap ini.</li>;
  }

  return rights.map((right, index) => {
    const description = right.description ?? right.title;
    const key = `${right.title ?? right.description ?? 'right'}-${index}`;

    return (
      <li key={key}>
        {right.title ? <strong>{right.title}</strong> : null}
        {right.title && description ? ': ' : null}
        {description}
      </li>
    );
  });
}

function TimelineSkeleton() {
  return (
    <TimelineFrame>
      {Array.from({ length: 6 }).map((_, index) => (
        <article key={index} className={styles.step}>
          <div className={styles.stepHeader}>
            <span className={styles.badge}>{index + 1}</span>
            <div>
              <div style={{ width: '7.5rem', height: '1.1rem', borderRadius: '6px', background: 'var(--color-surface-muted)' }} />
              <div style={{ width: '14rem', height: '0.9rem', borderRadius: '6px', background: 'var(--color-surface-muted)', marginTop: '0.5rem' }} />
            </div>
          </div>
          <ul>
            {Array.from({ length: 3 }).map((__, itemIndex) => (
              <li key={itemIndex}>
                <div
                  style={{
                    width: '100%',
                    height: '0.85rem',
                    borderRadius: '6px',
                    background: 'var(--color-surface-muted)'
                  }}
                />
              </li>
            ))}
          </ul>
        </article>
      ))}
    </TimelineFrame>
  );
}

function TimelineFallbackState({ hasError }: TimelineFallbackProps) {
  return (
    <TimelineFrame>
      <article className={styles.step}>
        <div className={styles.stepHeader}>
          <span className={styles.badge}>!</span>
          <div>
            <h2>Gagal memuat jalur perkara</h2>
            <p>{hasError ? 'Tidak dapat mengambil data dari CMS. Coba muat ulang halaman.' : 'Belum ada data tahap yang tersedia.'}</p>
          </div>
        </div>
      </article>
    </TimelineFrame>
  );
}

async function TimelineContent() {
  let stages: StageWithRights[] = [];
  let encounteredError = false;

  try {
    stages = await getStages();
  } catch (error) {
    encounteredError = true;
  }

  if (!stages?.length) {
    return <TimelineFallbackState hasError={encounteredError} />;
  }

  return (
    <TimelineFrame>
      {stages.map((stage, index) => {
        const summary = stage.summary ?? 'Ringkasan belum tersedia.';

        return (
          <article key={stage._id ?? stage.slug?.current ?? stage.title ?? index} className={styles.step} id={stage.slug?.current ?? stage.title}>
            <div className={styles.stepHeader}>
              <span className={styles.badge}>{index + 1}</span>
              <div>
                <h2>{stage.title}</h2>
                <p>{summary}</p>
              </div>
            </div>
            <ul>
              <StageRightsList rights={stage.rights} />
            </ul>
            {stage.tip ? <p className={styles.tip}>Tip: {stage.tip}</p> : null}
          </article>
        );
      })}
    </TimelineFrame>
  );
}

export function Timeline() {
  return (
    <Suspense fallback={<TimelineSkeleton />}>
      <TimelineContent />
    </Suspense>
  );
}
