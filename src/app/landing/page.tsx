'use client'
import Link from 'next/link'
import { Calendar, Users, Trophy, MapPin, Clock, Target, TrendingUp, Zap, Menu, X } from 'lucide-react'
import { useState } from 'react'
import styles from './landing.module.css'
import SiteFooter from '@/components/SiteFooter'

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className={styles.container}>
      {/* Header moderne avec gradient */}
      <div className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.navbar}>
            <div className={styles.logo}>
              <h1 className={styles.logoTitle}>
                <span className={styles.logoEmoji}>🏌️‍♂️</span>
                Golf Buddies
              </h1>
              <p className={styles.logoSubtitle}>
                Découvrez l'app qui révolutionne le golf ⛳
              </p>
            </div>

            {/* Desktop Navigation */}
            <div className={styles.navButtons}>
              <Link href="/login" className={styles.loginButton}>
                Connexion
              </Link>
              <Link href="/search" className={styles.eventsButton}>
                Voir les events
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={styles.mobileMenuButton}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className={`${styles.mobileNav} ${mobileMenuOpen ? styles.open : ''}`}>
            <Link
              href="/login"
              className={styles.mobileNavButton}
              onClick={() => setMobileMenuOpen(false)}
            >
              Connexion
            </Link>
            <Link
              href="/search"
              className={styles.mobileEventsButton}
              onClick={() => setMobileMenuOpen(false)}
            >
              Voir les events
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Card */}
      <div className={styles.heroSection}>
        <div className={styles.heroCard}>
          <div className={styles.heroIcon}>
            <Trophy style={{ width: '64px', height: '64px', margin: '0 auto', marginBottom: '16px' }} />
          </div>
          <h1 className={styles.heroTitle}>
            Golf Buddies
          </h1>
          <p className={styles.heroSubtitle}>
            Trouvez votre partenaire de golf parfait et ne jouez plus jamais seul
          </p>
          <div className={styles.heroButtons}>
            <Link href="/login" className={styles.heroLoginButton}>
              Commencer gratuitement
            </Link>
            <Link href="/search" className={styles.heroEventsButton}>
              Parcourir les events
            </Link>
          </div>
        </div>
      </div>


      {/* Features Grid */}
      <div className={styles.featuresSection}>
        <div className={styles.featuresHeader}>
          <h2 className={styles.featuresTitle}>
            Les fonctionnalités de Golf Buddies
          </h2>
          <p className={styles.featuresSubtitle}>
            Trouvez des partenaires de golf et organisez vos parties facilement
          </p>
        </div>

        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon} style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' }}>
              <Users style={{ width: '32px', height: '32px' }} />
            </div>
            <h3 className={styles.featureTitle}>Trouvez des partenaires</h3>
            <p className={styles.featureDescription}>Connectez-vous avec d&apos;autres golfeurs et organisez des parties ensemble</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon} style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
              <Calendar style={{ width: '32px', height: '32px' }} />
            </div>
            <h3 className={styles.featureTitle}>Créez des événements</h3>
            <p className={styles.featureDescription}>Organisez vos parties de golf et invitez d&apos;autres joueurs à vous rejoindre</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon} style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' }}>
              <Zap style={{ width: '32px', height: '32px' }} />
            </div>
            <h3 className={styles.featureTitle}>Chat de groupe</h3>
            <p className={styles.featureDescription}>Communiquez avec les participants de vos événements via la messagerie intégrée</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className={styles.ctaSection}>
        <div className={styles.ctaCard}>
          <h2 className={styles.ctaTitle}>
            Prêt à transformer votre expérience golf ?
          </h2>
          <p className={styles.ctaSubtitle}>
            Trouvez facilement des partenaires pour vos prochaines parties de golf
          </p>
          <Link href="/login" className={styles.ctaButton}>
            Commencez à jouer aujourd'hui - C'est gratuit !
          </Link>
          <p className={styles.ctaNote}>
            Aucune carte de crédit requise • Plan gratuit à vie disponible
          </p>
        </div>
      </div>

      {/* Footer avec informations légales */}
      <SiteFooter />
    </div>
  )
}