import Link from 'next/link';
import styles from './FloatingEmergency.module.css';

export function FloatingEmergency() {
  return (
    <Link
      href="/know-your-rights#emergency"
      className={styles.fab}
      aria-label="Buka checklist darurat untuk situasi penangkapan atau penggeledahan"
    >
      🚨 Checklist Darurat
    </Link>
  );
}
