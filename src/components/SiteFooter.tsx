'use client';

import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer style={{
      backgroundColor: '#000000',
      color: '#d1d5db',
      padding: '40px 20px',
      marginTop: '40px',
      width: '100%'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '40px'
      }}>
        {/* Colonne 1 - Golf Buddies */}
        <div>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#ffffff',
            marginBottom: '16px'
          }}>
            Golf Buddies
          </h3>
          <p style={{
            fontSize: '14px',
            lineHeight: '1.6',
            color: '#d1d5db'
          }}>
            La plateforme qui connecte les passionnés de golf pour créer
            des rencontres sportives et partager des moments inoubliables.
          </p>
        </div>

        {/* Colonne 2 - Plateforme */}
        <div>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#ffffff',
            marginBottom: '16px'
          }}>
            Plateforme
          </h3>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0
          }}>
            {[
              { href: '/search', text: 'Découvrir des événements' },
              { href: '/dashboard', text: 'Mon tableau de bord' },
              { href: '/profile', text: 'Mon profil' },
              { href: '/help', text: 'Centre d\'aide' }
            ].map((link, index) => (
              <li key={index} style={{ marginBottom: '8px' }}>
                <Link
                  href={link.href}
                  style={{
                    fontSize: '14px',
                    color: '#d1d5db',
                    textDecoration: 'none',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#ffffff'}
                  onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#d1d5db'}
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Colonne 3 - Légal */}
        <div>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#ffffff',
            marginBottom: '16px'
          }}>
            Légal
          </h3>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0
          }}>
            {[
              { href: '/settings/terms', text: 'Conditions générales' },
              { href: '/settings/privacy', text: 'Politique de confidentialité' },
              { href: '/settings/cookies', text: 'Politique des cookies' },
              { href: '/settings/legal', text: 'Mentions légales' }
            ].map((link, index) => (
              <li key={index} style={{ marginBottom: '8px' }}>
                <Link
                  href={link.href}
                  style={{
                    fontSize: '14px',
                    color: '#d1d5db',
                    textDecoration: 'none',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#ffffff'}
                  onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#d1d5db'}
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bas du footer */}
      <div style={{
        marginTop: '32px',
        paddingTop: '16px',
        borderTop: '1px solid #374151',
        textAlign: 'center',
        fontSize: '12px',
        color: '#9ca3af'
      }}>
        © 2025 Golf Buddies. Tous droits réservés. | contact@golfbuddies.fr
      </div>
    </footer>
  );
}