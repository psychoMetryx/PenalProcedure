'use client';

import Link from 'next/link';
import type { CSSProperties } from 'react';
import { useMemo, useState } from 'react';

type Answer = 'yes' | 'no' | 'unsure';
type Duration = 'under24' | 'over24' | 'unknown';

type QuestionnaireState = {
  warrant: Answer;
  detentionLimit: Duration;
  caseStopped: Answer;
  harm: Answer;
  counselDenied: Answer;
};

const initialState: QuestionnaireState = {
  warrant: 'unsure',
  detentionLimit: 'unknown',
  caseStopped: 'no',
  harm: 'no',
  counselDenied: 'no'
};

const optionStyle: CSSProperties = {
  border: '1px solid #e2e8f0',
  borderRadius: '0.75rem',
  padding: '0.75rem 0.9rem',
  background: '#fff',
  cursor: 'pointer',
  width: '100%',
  textAlign: 'left'
};

export default function Pasal7577CheckPage() {
  const baseBorder = optionStyle.border ?? '#e2e8f0';
  const [answers, setAnswers] = useState<QuestionnaireState>(initialState);

  const findings = useMemo(() => {
    const notes: string[] = [];
    if (answers.warrant === 'no') {
      notes.push('Tindakan tanpa surat perintah atau tidak diperlihatkan (indikasi pelanggaran Pasal 149 RKUHAP).');
    }
    if (answers.detentionLimit === 'over24') {
      notes.push('Penangkapan/penahanan melewati batas waktu 1x24 jam tanpa penetapan hakim (dapat dipersoalkan di praperadilan).');
    }
    if (answers.caseStopped === 'yes') {
      notes.push('Perkara dihentikan tanpa dasar jelas (penghentian penyidikan/penuntutan) → dapat dimohonkan praperadilan Pasal 149-153.');
    }
    if (answers.counselDenied === 'yes') {
      notes.push('Akses penasihat hukum ditolak/dibatasi, melanggar hak tersangka/terdakwa dalam RKUHAP.');
    }
    if (answers.harm === 'yes') {
      notes.push('Ada kerugian materiil/immateriil akibat tindakan tidak sah → dasar ganti kerugian & rehabilitasi (Pasal 149-153 RKUHAP dan ketentuan kompensasi).');
    }
    return notes;
  }, [answers]);

  const eligibleForPretrial = useMemo(
    () =>
      findings.some(
        (note) =>
          note.toLowerCase().includes('pasal 149') ||
          note.toLowerCase().includes('pasal 153') ||
          note.toLowerCase().includes('praperadilan') ||
          note.includes('batas waktu')
      ),
    [findings]
  );

  const eligibleForCompensation = useMemo(
    () => answers.harm === 'yes' || answers.detentionLimit === 'over24',
    [answers.harm, answers.detentionLimit]
  );

  const statusChip = (label: string, active: boolean, tone: 'pass' | 'warn') => (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.35rem',
        padding: '0.35rem 0.65rem',
        borderRadius: '999px',
        fontWeight: 700,
        background: active ? (tone === 'pass' ? '#ecfeff' : '#fff7ed') : '#f1f5f9',
        color: active ? (tone === 'pass' ? '#0ea5e9' : '#ea580c') : '#64748b',
        border: `1px solid ${active ? (tone === 'pass' ? '#bae6fd' : '#fed7aa') : '#e2e8f0'}`
      }}
    >
      <span aria-hidden>{tone === 'pass' ? '✔️' : '⚠️'}</span>
      {label}
    </span>
  );

  const handleAnswer = (key: keyof QuestionnaireState, value: Answer | Duration) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div>
      <p className="badge">RKUHAP Check</p>
      <h1>Cek Cepat: Praperadilan & Ganti Kerugian (RKUHAP)</h1>
      <p style={{ color: '#475569', maxWidth: '820px', marginTop: '0.4rem' }}>
        Jawab beberapa pertanyaan singkat untuk melihat apakah Anda dapat menggunakan Pasal 149-153 RKUHAP tentang praperadilan,
        ganti kerugian, dan rehabilitasi. Hasil bukan nasihat hukum, tetapi membantu menyiapkan langkah awal.
      </p>
      <div style={{ marginTop: '0.75rem' }}>
        <Link href="/restorative-justice" style={{ color: '#0ea5e9', fontWeight: 600 }}>
          Butuh cek Keadilan Restoratif (Pasal 74-75 RKUHAP)? Buka kalkulator cepat →
        </Link>
      </div>

      <div className="card" style={{ marginTop: '1rem' }}>
        <p className="badge">Pasal 74-75 RKUHAP</p>
        <h2>Keadilan Restoratif</h2>
        <p style={{ color: '#475569', marginBottom: 0 }}>
          Pasal 74-75 RKUHAP mengatur penyelesaian perkara dengan pendekatan keadilan restoratif sebelum penuntutan. Proses ini
          berbeda dari praperadilan/kompensasi sehingga jika fokus Anda adalah pemulihan melalui mediasi, gunakan kalkulator di
          tautan di atas agar tidak tercampur dengan permohonan Pasal 149-153.
        </p>
      </div>

      <section style={{ marginTop: '1.5rem' }}>
        <h2>Pertanyaan utama</h2>
        <div className="cardGrid">
          <div className="card">
            <p className="badge">Surat Perintah</p>
            <h3>Apakah ada surat perintah saat tindakan dilakukan?</h3>
            <div style={{ display: 'grid', gap: '0.5rem', marginTop: '0.75rem' }}>
              <button
                type="button"
                style={{
                  ...optionStyle,
                  borderColor: answers.warrant === 'yes' ? '#0ea5e9' : baseBorder
                }}
                onClick={() => handleAnswer('warrant', 'yes')}
              >
                Ada dan ditunjukkan
              </button>
              <button
                type="button"
                style={{
                  ...optionStyle,
                  borderColor: answers.warrant === 'no' ? '#ef4444' : baseBorder
                }}
                onClick={() => handleAnswer('warrant', 'no')}
              >
                Tidak ada / tidak ditunjukkan
              </button>
              <button
                type="button"
                style={{
                  ...optionStyle,
                  borderColor: answers.warrant === 'unsure' ? '#0ea5e9' : baseBorder
                }}
                onClick={() => handleAnswer('warrant', 'unsure')}
              >
                Tidak yakin / belum sempat melihat
              </button>
            </div>
          </div>

          <div className="card">
            <p className="badge">Batas Waktu</p>
            <h3>Berapa lama Anda ditahan sejak ditangkap?</h3>
            <div style={{ display: 'grid', gap: '0.5rem', marginTop: '0.75rem' }}>
              <button
                type="button"
                style={{
                  ...optionStyle,
                  borderColor: answers.detentionLimit === 'under24' ? '#0ea5e9' : baseBorder
                }}
                onClick={() => handleAnswer('detentionLimit', 'under24')}
              >
                Kurang dari 1x24 jam
              </button>
              <button
                type="button"
                style={{
                  ...optionStyle,
                  borderColor: answers.detentionLimit === 'over24' ? '#ef4444' : baseBorder
                }}
                onClick={() => handleAnswer('detentionLimit', 'over24')}
              >
                Melebihi 1x24 jam tanpa penetapan hakim
              </button>
              <button
                type="button"
                style={{
                  ...optionStyle,
                  borderColor: answers.detentionLimit === 'unknown' ? '#0ea5e9' : baseBorder
                }}
                onClick={() => handleAnswer('detentionLimit', 'unknown')}
              >
                Tidak tahu / belum menerima dokumen penahanan
              </button>
            </div>
          </div>

          <div className="card">
            <p className="badge">Status Perkara</p>
            <h3>Apakah perkara dihentikan tanpa alasan jelas?</h3>
            <div style={{ display: 'grid', gap: '0.5rem', marginTop: '0.75rem' }}>
              <button
                type="button"
                style={{
                  ...optionStyle,
                  borderColor: answers.caseStopped === 'yes' ? '#ef4444' : baseBorder
                }}
                onClick={() => handleAnswer('caseStopped', 'yes')}
              >
                Ya, ada penghentian penyidikan/penuntutan yang tidak jelas
              </button>
              <button
                type="button"
                style={{
                  ...optionStyle,
                  borderColor: answers.caseStopped === 'no' ? '#0ea5e9' : baseBorder
                }}
                onClick={() => handleAnswer('caseStopped', 'no')}
              >
                Tidak / perkara masih berjalan
              </button>
            </div>
          </div>

          <div className="card">
            <p className="badge">Hak Pendampingan</p>
            <h3>Apakah akses penasihat hukum pernah ditolak?</h3>
            <div style={{ display: 'grid', gap: '0.5rem', marginTop: '0.75rem' }}>
              <button
                type="button"
                style={{
                  ...optionStyle,
                  borderColor: answers.counselDenied === 'yes' ? '#ef4444' : baseBorder
                }}
                onClick={() => handleAnswer('counselDenied', 'yes')}
              >
                Ya, ditolak/dibatasi
              </button>
              <button
                type="button"
                style={{
                  ...optionStyle,
                  borderColor: answers.counselDenied === 'no' ? '#0ea5e9' : baseBorder
                }}
                onClick={() => handleAnswer('counselDenied', 'no')}
              >
                Tidak, pendamping hukum diperbolehkan
              </button>
            </div>
          </div>

          <div className="card">
            <p className="badge">Kerugian</p>
            <h3>Apakah ada kerugian materiil/immateriil akibat tindakan tersebut?</h3>
            <div style={{ display: 'grid', gap: '0.5rem', marginTop: '0.75rem' }}>
              <button
                type="button"
                style={{
                  ...optionStyle,
                  borderColor: answers.harm === 'yes' ? '#ef4444' : baseBorder
                }}
                onClick={() => handleAnswer('harm', 'yes')}
              >
                Ya, ada kerugian yang bisa dihitung atau dibuktikan
              </button>
              <button
                type="button"
                style={{
                  ...optionStyle,
                  borderColor: answers.harm === 'no' ? '#0ea5e9' : baseBorder
                }}
                onClick={() => handleAnswer('harm', 'no')}
              >
                Tidak / belum jelas
              </button>
            </div>
          </div>
        </div>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Hasil kelayakan</h2>
        <div className="card" style={{ display: 'grid', gap: '0.5rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {statusChip('Praperadilan (Pasal 149-153 RKUHAP)', eligibleForPretrial, 'warn')}
            {statusChip('Ganti kerugian & rehabilitasi (kompensasi RKUHAP)', eligibleForCompensation, 'warn')}
          </div>
          {findings.length > 0 ? (
            <ul style={{ margin: 0, paddingLeft: '1.1rem', lineHeight: 1.6 }}>
              {findings.map((finding) => (
                <li key={finding}>{finding}</li>
              ))}
            </ul>
          ) : (
            <p style={{ color: '#475569' }}>
              Jawaban Anda belum menunjukkan pelanggaran prosedural yang jelas. Simpan dokumen dan pantau batas waktu setiap tahap,
              atau konsultasikan dengan penasihat hukum untuk analisis lebih mendalam.
            </p>
          )}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
            <Link href="/templates/pasal-77-praperadilan-template.txt" target="_blank" style={{ color: '#0ea5e9' }}>
              Buka template permohonan praperadilan (sesuaikan ke Pasal 149-153 RKUHAP) →
            </Link>
            <Link href="/templates/pasal-75-ganti-kerugian-template.txt" target="_blank" style={{ color: '#0ea5e9' }}>
              Buka template ganti kerugian & rehabilitasi (sesuaikan ke RKUHAP) →
            </Link>
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
          </div>
        </div>
      </section>

      <section style={{ marginTop: '1.5rem' }}>
        <h2>Langkah berikutnya</h2>
        <div className="cardGrid">
          <div className="card">
            <h3>Siapkan bukti & kronologi</h3>
            <p style={{ color: '#475569' }}>
              Kumpulkan surat perintah, berita acara, identitas petugas, dan bukti kerugian. Bukti ini diperlukan untuk permohonan
              praperadilan atau kompensasi sesuai RKUHAP.
            </p>
          </div>
          <div className="card">
            <h3>Ajukan ke Pengadilan Negeri</h3>
            <p style={{ color: '#475569' }}>
              Daftarkan permohonan secara tertulis di PN wilayah tindakan dilakukan. Sertakan salinan bukti dan daftar saksi.
            </p>
          </div>
          <div className="card">
            <h3>Ikuti tahapan waktu</h3>
            <p style={{ color: '#475569' }}>
              Pantau batas waktu di tahapan <Link href="/jalur-perkara#penyidikan">Penyidikan</Link> dan{' '}
              <Link href="/jalur-perkara#penuntutan">Penuntutan</Link> agar permohonan diajukan sebelum berkas dilimpahkan ke
              pengadilan.
            </p>
          </div>
          <div className="card">
            <h3>Konsultasi bantuan hukum</h3>
            <p style={{ color: '#475569' }}>
              Hubungi LBH atau penasihat hukum untuk memfinalkan permohonan, terutama jika ada kerugian yang perlu dihitung atau
              risiko balasan dari pihak berwenang.
            </p>
          </div>
        </div>
      </section>

      <section style={{ marginTop: '1.5rem' }}>
        <h2>Tahap terkait di garis waktu</h2>
        <ul style={{ paddingLeft: '1.1rem', lineHeight: 1.7 }}>
          <li>
            <Link href="/jalur-perkara#penyidikan">Penyidikan</Link>: cek batas waktu penangkapan/penahanan dan keabsahan
            penggeledahan/penyitaan.
          </li>
          <li>
            <Link href="/jalur-perkara#penuntutan">Penuntutan</Link>: minta status berkas dan pertimbangkan praperadilan jika
            dihentikan tanpa alasan jelas.
          </li>
          <li>
            <Link href="/jalur-perkara#persidangan">Persidangan</Link>: pastikan keberatan dan keberlanjutan bantuan hukum
            tercatat.
          </li>
        </ul>
      </section>
    </div>
  );
}
