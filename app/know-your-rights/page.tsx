import { Suspense, type ReactNode } from 'react';
import { getRights } from '../../cms/contentService';
import type { Right } from '../../cms/types';
import { LegalTooltipDictionary } from '../../components/LegalTooltipDictionary';

type RightsGroupKey = 'suspect' | 'victim' | 'witness' | 'vulnerable';

type RightsGridProps = {
  rights: Right[];
  title: string;
  id: string;
};

type VulnerableGridProps = {
  rights: Right[];
};

type RightsFallbackProps = {
  hasError?: boolean;
};

type SkeletonCardProps = {
  count?: number;
};

type RightsLayoutProps = {
  children: ReactNode;
};

const AUDIENCE_LABELS: Record<Extract<RightsGroupKey, 'suspect' | 'victim' | 'witness'>, string> = {
  suspect: 'Hak Tersangka',
  victim: 'Hak Korban',
  witness: 'Hak Saksi & Pelapor'
};

function RightsLayout({ children }: RightsLayoutProps) {
  return (
    <div>
      <h1>Know Your Rights</h1>
      <p style={{ color: 'var(--color-text-subtle)', maxWidth: '780px', margin: '0.5rem 0 1.25rem' }}>
        Ringkasan hak-hak utama untuk tiap peran. Gunakan sebagai referensi cepat ketika berhadapan dengan aparat penegak hukum.
      </p>

      <section id="emergency" style={{ marginTop: '1.5rem' }}>
        <p className="badge" data-tone="danger">
          Darurat
        </p>
        <h2>Checklist Darurat (5 langkah cepat)</h2>
        <ol style={{ marginLeft: '1.2rem', lineHeight: 1.5 }}>
          <li>Tanyakan surat perintah (tangkap/geledah/sita) dan baca isinya.</li>
          <li>Hubungi keluarga/pengacara; Anda berhak atas setidaknya satu panggilan.</li>
          <li>Catat nama, pangkat, dan instansi petugas.</li>
          <li>Tolak menandatangani dokumen yang tidak sesuai isi pemeriksaan.</li>
          <li>Dokumentasikan kejadian (foto/video) bila aman dan diperbolehkan.</li>
        </ol>
      </section>

      {children}

      <section style={{ marginTop: '2rem' }}>
        <LegalTooltipDictionary />
      </section>
    </div>
  );
}

function RightsCardSkeleton({ count = 3 }: SkeletonCardProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="card">
          <div style={{ width: '8rem', height: '1rem', background: 'var(--color-surface-muted)', borderRadius: 8 }} />
          <ul style={{ paddingLeft: '1.15rem', lineHeight: 1.5, marginTop: '0.75rem' }}>
            {Array.from({ length: 3 }).map((__, itemIndex) => (
              <li key={itemIndex}>
                <div style={{ width: '100%', height: '0.85rem', background: 'var(--color-surface-muted)', borderRadius: 8 }} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}

function RightsSkeleton() {
  return (
    <>
      <section style={{ marginTop: '2rem' }}>
        <h2>Hak Inti per Peran</h2>
        <div className="cardGrid">
          <RightsCardSkeleton />
        </div>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2 id="vulnerable">Kelompok Rentan</h2>
        <p style={{ color: 'var(--color-text-subtle)', maxWidth: '760px' }}>
          Kelompok dengan kebutuhan khusus berhak atas perlakuan dan fasilitas berbeda untuk menjamin proses yang adil.
        </p>
        <div className="cardGrid">
          <RightsCardSkeleton count={2} />
        </div>
      </section>
    </>
  );
}

function RightsFallback({ hasError }: RightsFallbackProps) {
  return (
    <section style={{ marginTop: '2rem' }}>
      <div className="card">
        <h2>Gagal memuat hak</h2>
        <p style={{ color: 'var(--color-text-subtle)', marginTop: '0.5rem' }}>
          {hasError
            ? 'Terjadi kendala saat mengambil data dari CMS. Silakan coba muat ulang nanti.'
            : 'Hak belum tersedia saat ini.'}
        </p>
      </div>
    </section>
  );
}

function RightsGrid({ rights, title, id }: RightsGridProps) {
  return (
    <div id={id} className="card">
      <h3>{title}</h3>
      {rights.length ? (
        <ul style={{ paddingLeft: '1.15rem', lineHeight: 1.5 }}>
          {rights.map((right) => {
            const key = right._id ?? right.slug?.current ?? right.title;
            const basis = right.sources?.length ? right.sources.join(', ') : null;

            return (
              <li key={key}>
                <div>{right.description ?? right.title}</div>
                {basis ? (
                  <div style={{ color: 'var(--color-text-subtle)', fontSize: '0.9em' }}>
                    Basis hukum: RKUHAP {basis}
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      ) : (
        <p style={{ color: 'var(--color-text-subtle)' }}>Belum ada data hak yang tersedia.</p>
      )}
    </div>
  );
}

function VulnerableGroupCards({ rights }: VulnerableGridProps) {
  if (!rights.length) {
    return (
      <div className="card">
        <h3>Belum ada data kelompok rentan</h3>
        <p style={{ color: 'var(--color-text-subtle)', marginTop: '0.35rem' }}>
          Hak untuk kelompok rentan belum tersedia. Silakan cek kembali beberapa saat lagi.
        </p>
      </div>
    );
  }

  return (
    <>
      {rights.map((right) => {
        const key = right._id ?? right.slug?.current ?? right.title;
        const basis = right.sources?.length ? right.sources.join(', ') : null;

        return (
          <div key={key} className="card">
            <h3>{right.title}</h3>
            <p>{right.description}</p>
            {basis ? (
              <p style={{ color: 'var(--color-text-subtle)', fontSize: '0.9em', marginTop: '0.35rem' }}>
                Basis hukum: RKUHAP {basis}
              </p>
            ) : null}
          </div>
        );
      })}
    </>
  );
}

function groupRightsByAudience(rights: Right[]) {
  return rights.reduce(
    (acc, right) => {
      if (right.audience === 'vulnerable' || right.audience === 'general') {
        acc.vulnerable.push(right);
        return acc;
      }

      if (acc[right.audience]) {
        acc[right.audience].push(right);
      }

      return acc;
    },
    { suspect: [] as Right[], victim: [] as Right[], witness: [] as Right[], vulnerable: [] as Right[] }
  );
}

async function RightsContent() {
  let rights: Right[] = [];
  let encounteredError = false;

  try {
    rights = await getRights();
  } catch (error) {
    encounteredError = true;
  }

  const groupedRights = groupRightsByAudience(rights ?? []);
  const hasAnyRights = Object.values(groupedRights).some((group) => group.length > 0);

  if (!hasAnyRights) {
    return <RightsFallback hasError={encounteredError} />;
  }

  return (
    <>
      <section style={{ marginTop: '2rem' }}>
        <h2>Hak Inti per Peran</h2>
        <div className="cardGrid">
          {(Object.keys(AUDIENCE_LABELS) as Array<keyof typeof AUDIENCE_LABELS>).map((audienceKey) => (
            <RightsGrid
              key={audienceKey}
              id={audienceKey}
              title={AUDIENCE_LABELS[audienceKey]}
              rights={groupedRights[audienceKey]}
            />
          ))}
        </div>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2 id="vulnerable">Kelompok Rentan</h2>
        <p style={{ color: 'var(--color-text-subtle)', maxWidth: '760px' }}>
          Kelompok dengan kebutuhan khusus berhak atas perlakuan dan fasilitas berbeda untuk menjamin proses yang adil.
        </p>
        <div className="cardGrid">
          <VulnerableGroupCards rights={groupedRights.vulnerable} />
        </div>
      </section>
    </>
  );
}

export default function KnowYourRightsPage() {
  return (
    <RightsLayout>
      <Suspense fallback={<RightsSkeleton />}>
        <RightsContent />
      </Suspense>
    </RightsLayout>
  );
}
