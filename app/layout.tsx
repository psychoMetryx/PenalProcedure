import type { Metadata } from 'next';
import './globals.css';
import { NavBar } from '../components/NavBar';
import { FloatingEmergency } from '../components/FloatingEmergency';

export const metadata: Metadata = {
  title: 'PahamKUHAP',
  description: 'Panduan jalur perkara pidana, hak-hak warga, dan perbandingan RUU KUHAP.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <NavBar />
        <main className="container">{children}</main>
        <FloatingEmergency />
      </body>
    </html>
  );
}
