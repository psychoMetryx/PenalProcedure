'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Route } from 'next';
import styles from './NavBar.module.css';

const links = [
  { href: '/', label: 'Beranda' },
  { href: '/jalur-perkara', label: 'Jalur Perkara' },
  { href: '/know-your-rights', label: 'Kenali Hak Anda' },
  { href: '/pasal-75-77', label: 'Cek Pasal 75/77' },
  { href: '/virtual-lawyer', label: 'Virtual Lawyer' },
  { href: '/evidence-checker', label: 'Evidence Checker' },
  { href: '/document-generator', label: 'Generator Surat' },
  { href: '/comparator', label: 'RUU vs KUHAP Lama' }
] as const satisfies Array<{ href: Route; label: string }>;

export function NavBar() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.brand}>PahamKUHAP</div>
      <nav className={styles.nav}>
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link key={link.href} href={link.href} className={active ? styles.active : ''}>
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
