'use client'
import { useAuth } from '@/hooks/useAuth'
import NotificationCenter from './NotificationCenter'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LogOut, User, Settings, Menu, X } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import styles from './Navigation.module.css'

export default function Navigation() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)

  // Fermer le menu utilisateur au clic extérieur
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Ne pas afficher la navigation sur certaines pages
  if (!user) return null

  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/dashboard" className={styles.logo}>
          <span className={styles.logoIcon}>🏌️</span>
          <span className={styles.logoText}>Golf Buddies</span>
        </Link>

        {/* Desktop Navigation */}
        <div className={styles.desktopNav}>
          <ul className={styles.navLinks}>
            <li><Link href="/dashboard" className={styles.navLink}>Accueil</Link></li>
            <li><Link href="/search" className={styles.navLink}>Rechercher</Link></li>
            <li><Link href="/create" className={styles.signupButton}>Créer une partie</Link></li>
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={styles.mobileMenuButton}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* User Actions */}
        <div className={styles.userSection}>
          <NotificationCenter />

          <div ref={userMenuRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className={styles.userButton}
            >
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'User'}
                  className={styles.userAvatar}
                />
              ) : (
                <div className={styles.userAvatarPlaceholder}>
                  {user?.displayName?.[0] || user?.email?.[0] || 'U'}
                </div>
              )}
              <div className={styles.userInfo}>
                <span className={styles.userName}>
                  {user?.displayName || user?.email}
                </span>
              </div>
            </button>

            {/* Dropdown menu utilisateur */}
            {showUserMenu && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '8px',
                width: '200px',
                background: 'white',
                borderRadius: '8px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                border: '1px solid #e5e7eb',
                overflow: 'hidden',
                zIndex: 1000
              }}>
                <Link
                  href="/profile"
                  onClick={() => setShowUserMenu(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    textDecoration: 'none',
                    color: '#374151',
                    fontSize: '14px',
                    transition: 'background 0.2s',
                    borderBottom: '1px solid #f3f4f6'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f9fafb'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  <User style={{ width: '16px', height: '16px' }} />
                  Mon profil
                </Link>
                <button
                  onClick={handleLogout}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    border: 'none',
                    background: 'transparent',
                    color: '#ef4444',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#fef2f2'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  <LogOut style={{ width: '16px', height: '16px' }} />
                  Se déconnecter
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`${styles.mobileNav} ${mobileMenuOpen ? styles.open : ''}`}>
          <div className={styles.mobileNavLinks}>
            <Link
              href="/dashboard"
              className={styles.navLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link
              href="/search"
              className={styles.navLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              Rechercher
            </Link>
            <Link
              href="/create"
              className={styles.signupButton}
              onClick={() => setMobileMenuOpen(false)}
            >
              Créer une partie
            </Link>
          </div>

          <div className={styles.mobileUserSection}>
            <div className={styles.mobileUserInfo}>
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'User'}
                  className={styles.userAvatar}
                />
              ) : (
                <div className={styles.userAvatarPlaceholder}>
                  {user?.displayName?.[0] || user?.email?.[0] || 'U'}
                </div>
              )}
              <span className={styles.userName}>
                {user?.displayName || user?.email}
              </span>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false)
                router.push('/profile')
              }}
              className={styles.mobileNotificationButton}
            >
              <User size={16} />
              Mon profil
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false)
                handleLogout()
              }}
              className={styles.mobileNotificationButton}
              style={{ color: '#ef4444' }}
            >
              <LogOut size={16} />
              Se déconnecter
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}