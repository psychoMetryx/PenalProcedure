'use client';

import { useEffect, useMemo, useState } from 'react';
import styles from './page.module.css';

type TemplateField = {
  name: string;
  label: string;
  placeholder?: string;
  helper?: string;
};

type CmsSnippets = {
  header: string;
  legalBasis: string;
  closing: string;
  footer: string;
};

type TemplateDefinition = {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  fields: TemplateField[];
  compose: (data: Record<string, string>, snippets: CmsSnippets) => string;
};

const defaultSnippets: CmsSnippets = {
  header: 'Kepada Yth. Aparat Penegak Hukum terkait, berdasarkan ketentuan RKUHAP.',
  legalBasis:
    'Mengacu pada RKUHAP: hak pendampingan hukum (mis. Pasal 54-56), hak mengajukan penangguhan penahanan (Pasal 69-74), dan hak praperadilan atas tindakan sewenang-wenang (Pasal 95-97).',
  closing:
    'Demikian permohonan ini disampaikan. Mohon tindak lanjut cepat sesuai prinsip due process of law dan kepastian hukum.',
  footer:
    'Lampirkan identitas, surat kuasa, serta bukti pendukung sesuai kebutuhan. Teks ini dapat diperbarui cepat lewat CMS (mis. Strapi/Sanity).'
};

const templates: TemplateDefinition[] = [
  {
    id: 'bantuan-hukum',
    title: 'Permohonan Bantuan Hukum',
    summary:
      'Meminta pendampingan penasihat hukum sejak tahap penyidikan untuk menjamin hak tersangka/terdakwa.',
    tags: ['Hak atas penasihat hukum', 'RKUHAP', 'Pasal 54-56'],
    fields: [
      { name: 'pemohon', label: 'Nama Pemohon', placeholder: 'Nama lengkap pengirim permohonan' },
      { name: 'peran', label: 'Peran', placeholder: 'Keluarga tersangka / korban / pendamping' },
      { name: 'nomorPerkara', label: 'Nomor Laporan/Perkara', placeholder: 'LP/xx/2024' },
      { name: 'instansi', label: 'Instansi Tujuan', placeholder: 'Polres/Kejari/Pengadilan Negeri' },
      { name: 'lokasi', label: 'Lokasi Penahanan/Pemeriksaan', placeholder: 'Rutan/Polsek, kota' },
      {
        name: 'kronologi',
        label: 'Ringkasan Kronologi',
        placeholder: 'Ditangkap pada..., tanpa/ dengan surat perintah...'
      },
      {
        name: 'permintaan',
        label: 'Permintaan Spesifik',
        placeholder: 'Meminta akses penasihat hukum, salinan BAP, jadwal pemeriksaan, dll.'
      },
      { name: 'kontak', label: 'Kontak Pemohon', placeholder: 'No. HP/Email untuk klarifikasi' }
    ],
    compose: (data, snippets) => {
      return [
        snippets.header,
        '',
        `Perihal: ${'Permohonan Bantuan Hukum'} (${data.nomorPerkara || '-'})`,
        '',
        `Yang bertanda tangan di bawah ini, ${data.pemohon || '[Nama Pemohon]'} (${data.peran || 'peran pemohon'}), mengajukan pendampingan hukum bagi pihak terkait dengan perkara ${data.nomorPerkara || '...'}.`,
        '',
        `Dasar hukum: ${snippets.legalBasis}. Hak atas penasihat hukum harus dipenuhi sejak tahap penyidikan sesuai ketentuan RKUHAP dan prinsip fair trial.`,
        '',
        `Ringkasan kronologi: ${data.kronologi || '-'}.`,
        `Permintaan spesifik: ${data.permintaan || '-'}.`,
        `Lokasi pemeriksaan/penahanan: ${data.lokasi || '-'}.`,
        '',
        snippets.closing,
        '',
        `Kontak pemohon: ${data.kontak || '-'}.`,
        snippets.footer
      ].join('\n');
    }
  },
  {
    id: 'penangguhan-penahanan',
    title: 'Permohonan Penangguhan Penahanan',
    summary: 'Meminta penangguhan dengan jaminan keluarga/penjamin dan rencana kepatuhan.',
    tags: ['Penangguhan', 'RKUHAP', 'Jaminan'],
    fields: [
      { name: 'pemohon', label: 'Nama Pemohon', placeholder: 'Nama keluarga/penasihat hukum' },
      { name: 'namaTahanan', label: 'Nama Tahanan', placeholder: 'Nama lengkap yang ditahan' },
      { name: 'nomorSurat', label: 'Nomor Surat Penahanan', placeholder: 'SP.Han/xx/2024' },
      { name: 'alasan', label: 'Alasan Hukum', placeholder: 'Misal: sakit, kooperatif, kebutuhan keluarga' },
      { name: 'penjamin', label: 'Penjamin', placeholder: 'Nama dan hubungan penjamin' },
      {
        name: 'jaminan',
        label: 'Bentuk Jaminan',
        placeholder: 'Surat pernyataan, jaminan uang/barang, atau jaminan sosial'
      },
      {
        name: 'pengawasan',
        label: 'Rencana Kepatuhan/Pengawasan',
        placeholder: 'Siap hadir setiap panggilan, melapor mingguan, tidak melarikan diri.'
      },
      { name: 'kontak', label: 'Kontak Pemohon', placeholder: 'No. HP/Email' }
    ],
    compose: (data, snippets) => {
      return [
        snippets.header,
        '',
        `Perihal: ${'Permohonan Penangguhan Penahanan'} (${data.nomorSurat || '-'})`,
        '',
        `Saya ${data.pemohon || '[Nama Pemohon]'} mengajukan penangguhan penahanan atas nama ${data.namaTahanan || '[Nama Tahanan]'} berdasarkan hak yang diatur RKUHAP Pasal 69-74.`,
        '',
        `Alasan hukum dan keadaan: ${data.alasan || '-'}.`,
        `Penjamin: ${data.penjamin || '-'}.`,
        `Bentuk jaminan: ${data.jaminan || '-'}.`,
        `Rencana kepatuhan/pengawasan: ${data.pengawasan || '-'}.`,
        '',
        `Kami menyatakan siap memenuhi seluruh kewajiban hadir, tidak menghilangkan barang bukti, serta tunduk pada pengawasan penyidik/penuntut/majelis hakim.`,
        '',
        snippets.closing,
        '',
        `Kontak pemohon: ${data.kontak || '-'}.`,
        snippets.footer
      ].join('\n');
    }
  },
  {
    id: 'pra-peradilan',
    title: 'Draf Permohonan Pra-Peradilan',
    summary: 'Memprotes penangkapan/penahanan/penggeledahan yang dianggap tidak sah dan meminta pemeriksaan hakim.',
    tags: ['Pra-Peradilan', 'Due process', 'RKUHAP'],
    fields: [
      { name: 'pemohon', label: 'Nama Pemohon', placeholder: 'Nama penggugat/pemohon' },
      { name: 'kedudukan', label: 'Kedudukan Hukum', placeholder: 'Keluarga tersangka / kuasa hukum' },
      {
        name: 'objek',
        label: 'Objek yang Disengketakan',
        placeholder: 'Penangkapan/penahanan/penggeledahan/penyitaan tanpa prosedur'
      },
      {
        name: 'timeline',
        label: 'Urutan Kejadian',
        placeholder: 'Tanggal penangkapan, tanpa surat perintah, akses kuasa hukum ditolak, dsb.'
      },
      {
        name: 'bukti',
        label: 'Daftar Bukti',
        placeholder: 'Surat penahanan, foto, rekaman, saksi yang dihadirkan'
      },
      {
        name: 'tuntutan',
        label: 'Permintaan Putusan/Penetapan',
        placeholder: 'Menyatakan penangkapan tidak sah, memerintahkan pembebasan, rehabilitasi nama baik.'
      },
      { name: 'kontak', label: 'Kontak Pemohon', placeholder: 'No. HP/Email' }
    ],
    compose: (data, snippets) => {
      return [
        snippets.header,
        '',
        'Perihal: Permohonan Pra-Peradilan',
        '',
        `Saya ${data.pemohon || '[Nama Pemohon]'} selaku ${data.kedudukan || '[Kedudukan Hukum]'} mengajukan pra-peradilan atas ${data.objek || '[Objek Sengketa]'} berdasarkan hak dalam RKUHAP Pasal 95-97.`,
        '',
        `Uraian kejadian: ${data.timeline || '-'}.`,
        `Bukti yang diajukan: ${data.bukti || '-'}.`,
        `Permintaan putusan/penetapan hakim: ${data.tuntutan || '-'}.`,
        '',
        `Argumentasi hukum: ${snippets.legalBasis}. Tindakan yang disengketakan tidak memenuhi asas legalitas, proporsionalitas, dan hak untuk segera diperiksa oleh hakim.`,
        '',
        snippets.closing,
        '',
        `Kontak pemohon: ${data.kontak || '-'}.`,
        snippets.footer
      ].join('\n');
    }
  }
];

function buildInitialData(template: TemplateDefinition) {
  return template.fields.reduce<Record<string, string>>((acc, field) => {
    acc[field.name] = '';
    return acc;
  }, {});
}

export default function DocumentGeneratorPage() {
  const [selectedTemplateId, setSelectedTemplateId] = useState(templates[0].id);
  const [formData, setFormData] = useState<Record<string, string>>(buildInitialData(templates[0]));
  const [cmsSnippets, setCmsSnippets] = useState<CmsSnippets>(defaultSnippets);
  const [preview, setPreview] = useState('');

  const selectedTemplate = useMemo(
    () => templates.find((t) => t.id === selectedTemplateId) || templates[0],
    [selectedTemplateId]
  );

  useEffect(() => {
    setFormData(buildInitialData(selectedTemplate));
    setPreview('');
  }, [selectedTemplate]);

  const handleFieldChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSnippetChange = (name: keyof CmsSnippets, value: string) => {
    setCmsSnippets((prev) => ({ ...prev, [name]: value }));
  };

  const generatePreview = () => {
    setPreview(selectedTemplate.compose(formData, cmsSnippets));
  };

  const exportDoc = () => {
    if (!preview) return;
    const html = `<html><head><meta charset="utf-8" /></head><body><pre>${preview}</pre></body></html>`;
    const blob = new Blob([html], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedTemplate.id}.doc`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportPdf = () => {
    if (!preview) return;
    const printWindow = window.open('', '_blank', 'width=900,height=700');
    if (!printWindow) return;
    printWindow.document.write(
      `<html><head><title>${selectedTemplate.title}</title></head><body><pre>${preview}</pre><script>window.print();</script></body></html>`
    );
    printWindow.document.close();
  };

  return (
    <div>
      <section className={styles.pageHeader}>
        <div>
          <p className={styles.badge}>Document Generator · RKUHAP</p>
          <h1>Template Surat Hukum yang Dipersonalisasi</h1>
          <p className={styles.helperText}>
            Isi data faktual, tambahkan snippet dari CMS, lalu ekspor ke PDF (via print dialog) atau Doc. Fokus pada tiga surat
            mendesak: permohonan bantuan hukum, penangguhan penahanan, dan pra-peradilan.
          </p>
          <div className={styles.templateSelector}>
            {templates.map((template) => (
              <button
                key={template.id}
                className={`${styles.templateButton} ${selectedTemplate.id === template.id ? styles.active : ''}`}
                onClick={() => setSelectedTemplateId(template.id)}
                type="button"
              >
                <div>{template.title}</div>
                <div className={styles.tagList}>
                  {template.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className={styles.lead}>
          <p className={styles.legend}>Mengapa ini penting?</p>
          <p>
            RKUHAP menegaskan hak untuk didampingi penasihat hukum, hak memohon penangguhan penahanan, dan hak menggugat
            tindakan sewenang-wenang lewat pra-peradilan. Template ini membantu warga dan pendamping hukum menyiapkan dokumen
            yang runtut dan siap dilampirkan.
          </p>
        </div>
      </section>

      <section className={styles.layoutGrid}>
        <div className={styles.card}>
          <h2>{selectedTemplate.title}</h2>
          <p className={styles.helperText}>{selectedTemplate.summary}</p>
          <div className={styles.tagList}>
            {selectedTemplate.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>

          <div style={{ marginTop: '1rem', display: 'grid', gap: '0.75rem' }}>
            {selectedTemplate.fields.map((field) => (
              <div key={field.name} className={styles.field}>
                <label htmlFor={field.name}>{field.label}</label>
                <input
                  id={field.name}
                  type="text"
                  placeholder={field.placeholder}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleFieldChange(field.name, e.target.value)}
                />
                {field.helper && <small>{field.helper}</small>}
              </div>
            ))}
          </div>

          <div className={styles.buttonRow}>
            <button className={styles.primaryButton} type="button" onClick={generatePreview}>
              Buat Pratinjau
            </button>
            <button className={styles.secondaryButton} type="button" onClick={exportPdf} disabled={!preview}>
              Ekspor PDF
            </button>
            <button className={styles.secondaryButton} type="button" onClick={exportDoc} disabled={!preview}>
              Ekspor Doc
            </button>
          </div>
          <p className={styles.helperText}>
            Tekan tombol Ekspor PDF lalu pilih opsi Simpan sebagai PDF pada dialog cetak browser. File Doc dibuat dengan format
            teks yang mudah diedit.
          </p>
        </div>

        <div className={styles.card}>
          <h2>Snippet CMS (Dapat Diubah Cepat)</h2>
          <p className={styles.helperText}>
            Simulasikan update konten dari CMS: ubah dasar hukum, salam pembuka, atau catatan lampiran tanpa menyentuh kode.
            Setiap perubahan otomatis dipakai saat Anda membuat pratinjau.
          </p>
          <div className={styles.cmsGrid}>
            <div className={styles.field}>
              <label htmlFor="header">Pembuka/Salam</label>
              <textarea
                id="header"
                value={cmsSnippets.header}
                onChange={(e) => handleSnippetChange('header', e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="legalBasis">Dasar Hukum RKUHAP</label>
              <textarea
                id="legalBasis"
                value={cmsSnippets.legalBasis}
                onChange={(e) => handleSnippetChange('legalBasis', e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="closing">Penutup</label>
              <textarea
                id="closing"
                value={cmsSnippets.closing}
                onChange={(e) => handleSnippetChange('closing', e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="footer">Catatan Lampiran</label>
              <textarea
                id="footer"
                value={cmsSnippets.footer}
                onChange={(e) => handleSnippetChange('footer', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
            <h2>Pratinjau Surat</h2>
            <span className={styles.badge}>Siap Ekspor</span>
          </div>
          <div className={styles.preview}>{preview || 'Isi data lalu klik “Buat Pratinjau” untuk melihat teks siap unduh.'}</div>
        </div>
      </section>
    </div>
  );
}
