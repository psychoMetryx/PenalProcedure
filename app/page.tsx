import Link from 'next/link';
import type { Route } from 'next';
import { Hero } from '../components/Hero';
import { SearchSection } from '../components/SearchSection';

const quickLinks = [
  {
    title: 'Jalur Perkara',
    description: 'Lihat setiap tahap proses pidana, hak, dan apa yang harus Anda lakukan.',
    href: '/jalur-perkara'
  },
  {
    title: 'Hak Korban',
    description: 'Restitusi, perlindungan, dan hak untuk mendapatkan informasi perkara.',
    href: '/know-your-rights#victim'
  },
  {
    title: 'Hak Tersangka',
    description: 'Pendampingan hukum, praperadilan, dan batasan pemeriksaan aparat.',
    href: '/know-your-rights#suspect'
  },
  {
    title: 'Cek Pasal 75/77',
    description: 'Jawab kuis singkat untuk melihat kelayakan praperadilan dan ganti kerugian.',
    href: '/pasal-75-77'
  },
  {
    title: 'Kalkulator Keadilan Restoratif',
    description: 'Cek syarat Pasal 75: pelaku pertama kali, bukan tindak pidana dikecualikan, dan restitusi korban.',
    href: '/restorative-justice'
  },
  {
    title: 'Hak Saksi & Rentan',
    description: 'Perlindungan saksi, juru bahasa, akomodasi disabilitas, dan kelompok rentan.',
    href: '/know-your-rights#witness'
  },
  {
    title: 'Pembanding RUU KUHAP',
    description: 'Bandingkan aturan lama dengan draf baru untuk topik penting.',
    href: '/comparator'
  },
  {
    title: 'Diagram Virtual Lawyer',
    description: 'Navigasi visual hak dan langkah utama tanpa perlu chat.',
    href: '/virtual-lawyer'
  },
  {
    title: 'Court Bag Evidence Checker',
    description: 'Seret bukti seperti CCTV, rumor, atau chat untuk melihat peluang diterima.',
    href: '/evidence-checker'
  },
  {
    title: 'Generator Surat Hukum',
    description: 'Isi form untuk membuat surat permohonan bantuan hukum, penangguhan, atau pra-peradilan.',
    href: '/document-generator'
  }
] as const satisfies Array<{
  title: string;
  description: string;
  href: Route;
}>;

export default function HomePage() {
  return (
    <>
      <Hero />
      <SearchSection />
      <section>
        <h2>Mulai dari kebutuhan Anda</h2>
        <div className="cardGrid">
          {quickLinks.map((link) => (
            <div key={link.href} className="card">
              <h3>{link.title}</h3>
              <p>{link.description}</p>
              <Link href={link.href}>Buka panduan →</Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
