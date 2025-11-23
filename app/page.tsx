import Link from 'next/link';
import { Hero } from '../components/Hero';

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
    title: 'Hak Saksi & Rentan',
    description: 'Perlindungan saksi, juru bahasa, akomodasi disabilitas, dan kelompok rentan.',
    href: '/know-your-rights#witness'
  },
  {
    title: 'Pembanding RUU KUHAP',
    description: 'Bandingkan aturan lama dengan draf baru untuk topik penting.',
    href: '/comparator'
  }
];

export default function HomePage() {
  return (
    <>
      <Hero />
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
