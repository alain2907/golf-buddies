'use client'
import Link from 'next/link'
import { Calendar, Users, Trophy, MapPin, Clock, Target, TrendingUp, Zap, Menu, X } from 'lucide-react'
import { useState } from 'react'
import styles from './landing.module.css'

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
          <p className={styles.heroNote}>
            Rejoignez plus de 10 000 golfeurs qui utilisent déjà Golf Buddies
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsSection}>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>10,000+</div>
            <div className={styles.statLabel}>Golfeurs actifs</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>5,000+</div>
            <div className={styles.statLabel}>Parties jouées</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>500+</div>
            <div className={styles.statLabel}>Parcours de golf</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>4.9★</div>
            <div className={styles.statLabel}>Note utilisateurs</div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className={styles.featuresSection}>
        <div className={styles.featuresHeader}>
          <h2 className={styles.featuresTitle}>
            Tout ce dont vous avez besoin pour améliorer votre jeu
          </h2>
          <p className={styles.featuresSubtitle}>
            De la recherche de partenaires au suivi de vos progrès, nous nous occupons de tout
          </p>
        </div>

        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon} style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' }}>
              <Users style={{ width: '32px', height: '32px' }} />
            </div>
            <h3 className={styles.featureTitle}>Matching intelligent</h3>
            <p className={styles.featureDescription}>Notre algorithme vous associe avec des golfeurs de votre niveau pour la partie parfaite</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon} style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
              <Calendar style={{ width: '32px', height: '32px' }} />
            </div>
            <h3 className={styles.featureTitle}>Planification facile</h3>
            <p className={styles.featureDescription}>Réservez des créneaux, organisez des parties et gérez votre calendrier golf sans effort</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon} style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}>
              <Trophy style={{ width: '32px', height: '32px' }} />
            </div>
            <h3 className={styles.featureTitle}>Tournois</h3>
            <p className={styles.featureDescription}>Rejoignez des tournois locaux, affrontez vos amis et gagnez des prix</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon} style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' }}>
              <MapPin style={{ width: '32px', height: '32px' }} />
            </div>
            <h3 className={styles.featureTitle}>Découverte de parcours</h3>
            <p className={styles.featureDescription}>Explorez de nouveaux parcours, lisez les avis et trouvez des perles cachées près de chez vous</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon} style={{ background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' }}>
              <TrendingUp style={{ width: '32px', height: '32px' }} />
            </div>
            <h3 className={styles.featureTitle}>Suivi des progrès</h3>
            <p className={styles.featureDescription}>Surveillez votre handicap, vos statistiques et votre amélioration au fil du temps</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon} style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' }}>
              <Zap style={{ width: '32px', height: '32px' }} />
            </div>
            <h3 className={styles.featureTitle}>Chat instantané</h3>
            <p className={styles.featureDescription}>Communiquez avec vos partenaires de jeu en temps réel</p>
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
            Rejoignez des milliers de golfeurs qui n'ont plus jamais à jouer seuls
          </p>
          <Link href="/login" className={styles.ctaButton}>
            Commencez à jouer aujourd'hui - C'est gratuit !
          </Link>
          <p className={styles.ctaNote}>
            Aucune carte de crédit requise • Plan gratuit à vie disponible
          </p>
        </div>
      </div>
    </div>
  )
}