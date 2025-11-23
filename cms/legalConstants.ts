import { EvidenceItem } from './types';

export const RKUHAP_REFERENCE_URL = '/rkuhap.txt';

export const evidenceItems: EvidenceItem[] = [
  {
    id: 'rumor',
    title: 'Rumor dari teman',
    type: 'Kesaksian tidak langsung',
    accepted: false,
    basis:
      'Pasal 224 ayat (4) RKUHAP menegaskan pendapat atau rekaan belaka bukan keterangan saksi yang sah.',
    detail:
      'Pengadilan hanya menerima keterangan saksi yang melihat, mendengar, dan mengalami sendiri peristiwa pidana.',
    pasal: 'Pasal 224 ayat (4) RKUHAP',
    citationUrl: `${RKUHAP_REFERENCE_URL}#pasal-224`
  },
  {
    id: 'cctv',
    title: 'Rekaman CCTV',
    type: 'Bukti elektronik',
    accepted: true,
    basis: 'Pasal 222 ayat (1) huruf f jo. Pasal 228 RKUHAP mengakui rekaman sebagai bukti elektronik yang sah.',
    detail: 'Rekaman kamera yang menunjukkan kejadian langsung bisa menguatkan kronologi dan identitas pelaku.',
    pasal: 'Pasal 222 huruf f & Pasal 228 RKUHAP',
    citationUrl: `${RKUHAP_REFERENCE_URL}#pasal-228`
  },
  {
    id: 'whatsapp',
    title: 'Chat WhatsApp',
    type: 'Dokumen elektronik',
    accepted: true,
    basis: 'Pasal 228 RKUHAP memasukkan dokumen elektronik sebagai alat bukti sepanjang autentikasinya terjaga.',
    detail: 'Percakapan digital yang utuh (dengan metadata) dapat menunjukkan niat, perintah, atau ancaman.',
    pasal: 'Pasal 228 RKUHAP',
    citationUrl: `${RKUHAP_REFERENCE_URL}#pasal-228`
  },
  {
    id: 'screenshot',
    title: 'Screenshot tidak utuh',
    type: 'Dokumen elektronik',
    accepted: false,
    basis: 'Pasal 222 ayat (3) RKUHAP mewajibkan autentikasi dan perolehan yang sah untuk setiap alat bukti.',
    detail: 'Bukti elektronik wajib menunjukkan konteks lengkap dan rantai keaslian untuk diterima pengadilan.',
    pasal: 'Pasal 222 ayat (3) RKUHAP',
    citationUrl: `${RKUHAP_REFERENCE_URL}#pasal-222`
  },
  {
    id: 'surat',
    title: 'Surat keterangan resmi',
    type: 'Surat/akta',
    accepted: true,
    basis: 'Pasal 225 RKUHAP mengatur surat resmi yang dibuat pejabat berwenang sebagai alat bukti surat.',
    detail: 'Surat keterangan, visum et repertum, atau berita acara penyitaan termasuk alat bukti surat.',
    pasal: 'Pasal 225 RKUHAP',
    citationUrl: `${RKUHAP_REFERENCE_URL}#pasal-225`
  },
  {
    id: 'rekaman-telepon',
    title: 'Rekaman telepon pribadi',
    type: 'Bukti elektronik',
    accepted: false,
    basis:
      'Pasal 222 ayat (3) RKUHAP menolak alat bukti yang tidak sah atau tidak autentik; rekaman tanpa izin rentan dinyatakan cacat.',
    detail: 'Pengumpulan alat bukti elektronik tetap harus memperhatikan legalitas penyadapan dalam RKUHAP.',
    pasal: 'Pasal 222 ayat (3) RKUHAP',
    citationUrl: `${RKUHAP_REFERENCE_URL}#pasal-222`
  }
];

export const ensureEvidenceHasCitation = (items: EvidenceItem[]): EvidenceItem[] =>
  items.filter((item) => Boolean(item.pasal?.trim()) && Boolean(item.citationUrl?.trim()));
