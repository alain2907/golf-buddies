'use client';

import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer
      className="w-full mt-10"
      style={{
        backgroundColor: '#000000',
        color: '#d1d5db',
        padding: '2.5rem 1.5rem'
      }}
    >
      <div
        className="mx-auto grid gap-10"
        style={{
          maxWidth: '72rem',
          gridTemplateColumns: 'repeat(1, minmax(0, 1fr))'
        }}
      >
        {/* Colonne 1 */}
        <div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#ffffff', marginBottom: '1rem' }}>
            Golf Buddies
          </h3>
          <p style={{ fontSize: '0.875rem', lineHeight: '1.5' }}>
            La plateforme qui connecte les passionnés de golf pour créer
            des rencontres sportives et partager des moments inoubliables.
          </p>
        </div>

        {/* Colonne 2 */}
        <div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#ffffff', marginBottom: '1rem' }}>
            Plateforme
          </h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <Link href="/search" style={{ fontSize: '0.875rem', color: '#d1d5db', textDecoration: 'none' }}>
                Découvrir des événements
              </Link>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <Link href="/dashboard" style={{ fontSize: '0.875rem', color: '#d1d5db', textDecoration: 'none' }}>
                Mon tableau de bord
              </Link>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <Link href="/profile" style={{ fontSize: '0.875rem', color: '#d1d5db', textDecoration: 'none' }}>
                Mon profil
              </Link>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <Link href="/help" style={{ fontSize: '0.875rem', color: '#d1d5db', textDecoration: 'none' }}>
                Centre d'aide
              </Link>
            </li>
          </ul>
        </div>

        {/* Colonne 3 */}
        <div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#ffffff', marginBottom: '1rem' }}>
            Légal
          </h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <Link href="/settings/terms" style={{ fontSize: '0.875rem', color: '#d1d5db', textDecoration: 'none' }}>
                Conditions générales
              </Link>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <Link href="/settings/privacy" style={{ fontSize: '0.875rem', color: '#d1d5db', textDecoration: 'none' }}>
                Politique de confidentialité
              </Link>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <Link href="/settings/cookies" style={{ fontSize: '0.875rem', color: '#d1d5db', textDecoration: 'none' }}>
                Politique des cookies
              </Link>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <Link href="/settings/legal" style={{ fontSize: '0.875rem', color: '#d1d5db', textDecoration: 'none' }}>
                Mentions légales
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bas du footer */}
      <div
        style={{
          marginTop: '2rem',
          paddingTop: '1rem',
          borderTop: '1px solid #374151',
          textAlign: 'center',
          fontSize: '0.75rem',
          color: '#9ca3af'
        }}
      >
        © 2025 Golf Buddies. Tous droits réservés. | contact@golfbuddies.fr
      </div>

      {/* CSS responsive inline */}
      <style jsx>{`
        @media (min-width: 640px) {
          .footer-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (min-width: 1024px) {
          .footer-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
      `}</style>
    </footer>
  );
}