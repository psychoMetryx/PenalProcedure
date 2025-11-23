'use client';

import Link from 'next/link';
import type { CSSProperties } from 'react';
import { useMemo, useState } from 'react';

type Answer = 'yes' | 'no' | 'unsure';

type QuizState = {
  firstOffense: Answer;
  excludedOffense: Answer;
  victimCompensated: Answer;
  victimForgives: Answer;
};

const initialState: QuizState = {
  firstOffense: 'unsure',
  excludedOffense: 'unsure',
  victimCompensated: 'unsure',
  victimForgives: 'unsure'
};

const baseBorder = '#e2e8f0';

const optionStyle: CSSProperties = {
  border: `1px solid ${baseBorder}`,
  borderRadius: '0.75rem',
  padding: '0.75rem 0.9rem',
  background: '#fff',
  cursor: 'pointer',
  width: '100%',
  textAlign: 'left'
};

export default function RestorativeJusticeQuizPage() {
  const [answers, setAnswers] = useState<QuizState>(initialState);

  const evaluation = useMemo(() => {
    if (answers.excludedOffense === 'yes') {
      return {
        status: 'not-eligible',
        summary:
          'Kasus yang termasuk terorisme, korupsi, atau keamanan negara tidak bisa memakai skema Keadilan Restoratif (Pasal 75).'
      } as const;
    }

    if (
      answers.firstOffense === 'yes' &&
      answers.victimCompensated === 'yes' &&
      answers.victimForgives === 'yes'
    ) {
      return {
        status: 'eligible',
        summary: 'Syarat utama terpenuhi. Anda kemungkinan bisa mengajukan Keadilan Restoratif.'
      } as const;
    }

    if (
      answers.firstOffense === 'no' ||
      answers.victimCompensated === 'no' ||
      answers.victimForgives === 'no'
    ) {
      return {
        status: 'needs-work',
        summary:
          'Ada syarat yang belum terpenuhi (bukan pelaku pertama kali atau belum ada ganti kerugian/perdamaian). Perlu konsultasi sebelum melanjutkan.'
      } as const;
    }

    return {
      status: 'uncertain',
      summary: 'Lengkapi jawaban untuk melihat apakah Anda dapat mengajukan Keadilan Restoratif.'
    } as const;
  }, [answers]);

  const handleAnswer = (key: keyof QuizState, value: Answer) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const statusTone: Record<QuizState[keyof QuizState] | 'not-eligible' | 'eligible' | 'needs-work' | 'uncertain', string> = {
    yes: '#0ea5e9',
    no: '#ef4444',
    unsure: '#0ea5e9',
    'not-eligible': '#ef4444',
    eligible: '#0ea5e9',
    'needs-work': '#ea580c',
    uncertain: '#475569'
  };

  const statusBg: Record<typeof evaluation.status, string> = {
    'not-eligible': '#fef2f2',
    eligible: '#ecfeff',
    'needs-work': '#fff7ed',
    uncertain: '#f8fafc'
  };

  return (
    <div>
      <p className="badge">Kalkulator Keadilan Restoratif</p>
      <h1>Apakah Anda dapat memakai Keadilan Restoratif? (Pasal 75)</h1>
      <p style={{ color: '#475569', maxWidth: '860px', marginTop: '0.4rem' }}>
        Jawab beberapa pertanyaan inti dari Pasal 75 KUHAP: apakah Anda pelaku pertama kali, apakah perkaranya termasuk pengecualian
        seperti terorisme/korupsi, dan apakah kerugian korban sudah dipulihkan. Hasil ini bukan nasihat hukum, tetapi panduan awal
        untuk mengajukan permohonan.
      </p>

      <section style={{ marginTop: '1.5rem' }}>
        <h2>Pertanyaan utama</h2>
        <div className="cardGrid">
          <div className="card">
            <p className="badge">Riwayat</p>
            <h3>Apakah ini pertama kali Anda berhadapan dengan pidana?</h3>
            <div style={{ display: 'grid', gap: '0.5rem', marginTop: '0.75rem' }}>
              <button
                type="button"
                style={{ ...optionStyle, borderColor: answers.firstOffense === 'yes' ? '#0ea5e9' : baseBorder }}
                onClick={() => handleAnswer('firstOffense', 'yes')}
              >
                Ya, ini pelanggaran pertama (bukan residivis)
              </button>
              <button
                type="button"
                style={{ ...optionStyle, borderColor: answers.firstOffense === 'no' ? '#ef4444' : baseBorder }}
                onClick={() => handleAnswer('firstOffense', 'no')}
              >
                Tidak, pernah dihukum sebelumnya
              </button>
              <button
                type="button"
                style={{ ...optionStyle, borderColor: answers.firstOffense === 'unsure' ? '#0ea5e9' : baseBorder }}
                onClick={() => handleAnswer('firstOffense', 'unsure')}
              >
                Tidak yakin / menunggu data
              </button>
            </div>
          </div>

          <div className="card">
            <p className="badge">Pengecualian</p>
            <h3>Apakah perkaranya termasuk terorisme, korupsi, atau mengancam keamanan negara?</h3>
            <div style={{ display: 'grid', gap: '0.5rem', marginTop: '0.75rem' }}>
              <button
                type="button"
                style={{ ...optionStyle, borderColor: answers.excludedOffense === 'yes' ? '#ef4444' : baseBorder }}
                onClick={() => handleAnswer('excludedOffense', 'yes')}
              >
                Ya, termasuk salah satu pengecualian
              </button>
              <button
                type="button"
                style={{ ...optionStyle, borderColor: answers.excludedOffense === 'no' ? '#0ea5e9' : baseBorder }}
                onClick={() => handleAnswer('excludedOffense', 'no')}
              >
                Tidak, bukan tindak pidana yang dikecualikan
              </button>
              <button
                type="button"
                style={{ ...optionStyle, borderColor: answers.excludedOffense === 'unsure' ? '#0ea5e9' : baseBorder }}
                onClick={() => handleAnswer('excludedOffense', 'unsure')}
              >
                Tidak yakin / perlu cek pasal sangkaan
              </button>
            </div>
          </div>

          <div className="card">
            <p className="badge">Pemulihan</p>
            <h3>Apakah kerugian korban sudah diganti atau diperbaiki?</h3>
            <div style={{ display: 'grid', gap: '0.5rem', marginTop: '0.75rem' }}>
              <button
                type="button"
                style={{ ...optionStyle, borderColor: answers.victimCompensated === 'yes' ? '#0ea5e9' : baseBorder }}
                onClick={() => handleAnswer('victimCompensated', 'yes')}
              >
                Ya, restitusi/perbaikan kerusakan sudah dilakukan
              </button>
              <button
                type="button"
                style={{ ...optionStyle, borderColor: answers.victimCompensated === 'no' ? '#ef4444' : baseBorder }}
                onClick={() => handleAnswer('victimCompensated', 'no')}
              >
                Belum ada ganti kerugian
              </button>
              <button
                type="button"
                style={{ ...optionStyle, borderColor: answers.victimCompensated === 'unsure' ? '#0ea5e9' : baseBorder }}
                onClick={() => handleAnswer('victimCompensated', 'unsure')}
              >
                Masih dihitung / menunggu kesepakatan
              </button>
            </div>
          </div>

          <div className="card">
            <p className="badge">Persetujuan Korban</p>
            <h3>Apakah korban setuju berdamai dan memaafkan?</h3>
            <div style={{ display: 'grid', gap: '0.5rem', marginTop: '0.75rem' }}>
              <button
                type="button"
                style={{ ...optionStyle, borderColor: answers.victimForgives === 'yes' ? '#0ea5e9' : baseBorder }}
                onClick={() => handleAnswer('victimForgives', 'yes')}
              >
                Ya, ada surat pernyataan damai/maaf
              </button>
              <button
                type="button"
                style={{ ...optionStyle, borderColor: answers.victimForgives === 'no' ? '#ef4444' : baseBorder }}
                onClick={() => handleAnswer('victimForgives', 'no')}
              >
                Tidak / korban menolak
              </button>
              <button
                type="button"
                style={{ ...optionStyle, borderColor: answers.victimForgives === 'unsure' ? '#0ea5e9' : baseBorder }}
                onClick={() => handleAnswer('victimForgives', 'unsure')}
              >
                Belum ada jawaban dari korban
              </button>
            </div>
          </div>
        </div>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Hasil singkat</h2>
        <div
          className="card"
          style={{
            borderColor: statusTone[evaluation.status],
            background: statusBg[evaluation.status]
          }}
        >
          <p style={{ margin: 0, color: '#0f172a', fontWeight: 700 }}>{evaluation.summary}</p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.65rem' }}>
            <span
              style={{
                border: `1px solid ${statusTone[evaluation.status]}`,
                color: statusTone[evaluation.status],
                background: '#fff',
                padding: '0.4rem 0.75rem',
                borderRadius: '999px',
                fontWeight: 600
              }}
            >
              Status: {evaluation.status === 'eligible'
                ? 'Layak diajukan'
                : evaluation.status === 'not-eligible'
                  ? 'Tidak bisa memakai Pasal 75'
                  : evaluation.status === 'needs-work'
                    ? 'Perlu perbaikan syarat'
                    : 'Lengkapi jawaban'}
            </span>
            <button
              type="button"
              onClick={() => setAnswers(initialState)}
              style={{
                border: '1px solid #e2e8f0',
                background: '#fff',
                borderRadius: '0.75rem',
                padding: '0.45rem 0.85rem',
                cursor: 'pointer'
              }}
            >
              Reset jawaban
            </button>
            <Link href="/pasal-75-77" style={{ color: '#0ea5e9', fontWeight: 600 }}>
              Butuh cek praperadilan (Pasal 75/77)? →
            </Link>
          </div>
        </div>
      </section>

      <section style={{ marginTop: '1.5rem' }}>
        <h2>Langkah berikutnya jika ingin mengajukan</h2>
        <div className="cardGrid">
          <div className="card">
            <h3>Dimana mengajukan?</h3>
            <p style={{ color: '#475569' }}>
              Ajukan permohonan ke penyidik di tahap <Link href="/jalur-perkara#penyidikan">Penyidikan</Link> atau ke jaksa di
              tahap <Link href="/jalur-perkara#penuntutan">Penuntutan</Link>. Mintakan bukti penerimaan berkas permohonan.
            </p>
          </div>
          <div className="card">
            <h3>Dokumen yang disiapkan</h3>
            <ul style={{ paddingLeft: '1.1rem', color: '#475569', lineHeight: 1.6 }}>
              <li>Surat permohonan Keadilan Restoratif (ditandatangani Anda/penasihat hukum).</li>
              <li>Identitas pelaku & korban (KTP) serta kronologi singkat.</li>
              <li>Bukti ganti kerugian (transfer, kwitansi, perbaikan) dan bukti maaf/peace agreement.</li>
              <li>Data kontak korban/saksi untuk verifikasi.</li>
            </ul>
          </div>
          <div className="card">
            <h3>Jika syarat belum lengkap</h3>
            <p style={{ color: '#475569' }}>
              Prioritaskan mencapai kesepakatan dengan korban dan lengkapi restitusi. Jika ditolak karena pengecualian atau prosedur
              dilanggar, pertimbangkan hak praperadilan dan ganti kerugian di{' '}
              <Link href="/pasal-75-77">Pasal 75/77 Check</Link>.
            </p>
          </div>
          <div className="card">
            <h3>Bantuan hukum</h3>
            <p style={{ color: '#475569' }}>
              Konsultasikan dengan LBH atau penasihat hukum lokal untuk memastikan dokumen sesuai dan untuk pendampingan negosiasi
              dengan korban atau jaksa/penyidik.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
