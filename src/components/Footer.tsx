'use client'

import { useRouter, usePathname } from 'next/navigation'
import styles from './Footer.module.css'

export default function Footer() {
  const router = useRouter()
  const pathname = usePathname()

  // Déterminer quelle section est active
  const isHome = pathname === '/dashboard'
  const isSearch = pathname === '/search'
  const isEvents = pathname === '/events' || pathname.startsWith('/events/') || pathname === '/create' || pathname === '/how-to-create'
  const isProfile = pathname === '/profile'

  return (
    <nav className={styles.footer}>
      <div className={styles.menu}>
        {/* Home */}
        <div
          className={`${styles.item} ${isHome ? styles.active : ''}`}
          onClick={() => router.push('/dashboard')}
        >
          <span className={styles.icon}>🏠</span>
          <span className={styles.label}>Home</span>
        </div>

        {/* Search */}
        <div
          className={`${styles.item} ${isSearch ? styles.active : ''}`}
          onClick={() => router.push('/search')}
        >
          <span className={styles.icon}>🔍</span>
          <span className={styles.label}>Search</span>
        </div>

        {/* Events */}
        <div
          className={`${styles.item} ${isEvents ? styles.active : ''}`}
          onClick={() => router.push('/events')}
        >
          <span className={styles.icon}>📅</span>
          <span className={styles.label}>Events</span>
        </div>

        {/* Profile */}
        <div
          className={`${styles.item} ${isProfile ? styles.active : ''}`}
          onClick={() => router.push('/profile')}
        >
          <span className={styles.icon}>👤</span>
          <span className={styles.label}>Profile</span>
        </div>
      </div>
    </nav>
  )
}