'use client'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Temporarily disable redirect for testing
    // if (mounted && !loading && !user) {
    //   router.push('/')
    // }
  }, [user, loading, router, mounted])

  // Ne rien rendre côté serveur ou pendant le chargement
  if (!mounted) {
    return null
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>Loading...</div>
      </div>
    )
  }

  // For testing, show dashboard even without user
  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Utilisateur Test'

  return (
    <div style={{ minHeight: '100vh', padding: '16px', paddingBottom: '80px' }}>
      {/* Navbar */}
      <nav style={{
        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        padding: '24px 48px',
        marginBottom: '20px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '4px'
            }}>
              <span style={{ fontSize: '32px' }}>🏌️</span>
              <h1 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: 'white',
                margin: 0
              }}>
                Sport Connect Golf
              </h1>
            </div>
            <p style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '14px',
              marginLeft: '44px',
              margin: 0
            }}>
              Bonjour {displayName}
            </p>
          </div>
          <button
            onClick={() => router.push('/create')}
            style={{
            background: 'white',
            color: '#4facfe',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            Proposer un parcours
          </button>
        </div>
      </nav>

      {/* Contenu principal */}
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Prochaines parties */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🏌️ Mes prochaines parties
          </h2>
          <div style={{
            background: 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>⛳</div>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Aucune partie prévue</div>
            <div style={{ color: '#666', fontSize: '14px', marginBottom: '16px' }}>
              Créez votre première partie ou rejoignez un flight existant
            </div>
            <button
              onClick={() => router.push('/create')}
              style={{
                background: 'linear-gradient(135deg, #4A7C2E 0%, #6B9F3F 100%)',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Proposer un parcours
            </button>
          </div>
        </div>

        {/* Actions rapides */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            ⚡ Actions rapides
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
            <div
              onClick={() => router.push('/create')}
              style={{ padding: '16px', background: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', textAlign: 'center', cursor: 'pointer' }}
            >
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>🏌️</div>
              <div style={{ fontWeight: 'bold', fontSize: '14px' }}>Créer partie</div>
            </div>
            <div
              onClick={() => router.push('/search')}
              style={{ padding: '16px', background: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', textAlign: 'center', cursor: 'pointer' }}
            >
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>🔍</div>
              <div style={{ fontWeight: 'bold', fontSize: '14px' }}>Rejoindre flight</div>
            </div>
            <div
              onClick={() => router.push('/courses')}
              style={{ padding: '16px', background: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', textAlign: 'center', cursor: 'pointer' }}
            >
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>📍</div>
              <div style={{ fontWeight: 'bold', fontSize: '14px' }}>Parcours proches</div>
            </div>
          </div>
        </div>


        {/* Golfeurs autour de toi */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            👥 Golfeurs autour de toi
          </h3>
          <div style={{
            background: 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            {/* Exemple de golfeur suggéré */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', padding: '12px', background: '#f8f9fa', borderRadius: '8px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: '#4A7C2E',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                marginRight: '12px'
              }}>M</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '500' }}>Marc D.</div>
                <div style={{ fontSize: '14px', color: '#666' }}>Index 18 • Golf de Saint-Cloud</div>
              </div>
              <div style={{ fontSize: '12px', color: '#4A7C2E', fontWeight: 'bold' }}>2.3 km</div>
            </div>

            <div style={{ textAlign: 'center', color: '#666', fontSize: '14px' }}>
              Complétez votre profil pour voir plus de golfeurs compatibles
            </div>
          </div>
        </div>

        {/* Parties ouvertes aujourd'hui */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🏌️ Parties ouvertes aujourd&apos;hui
          </h3>
          <div style={{
            background: 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            {/* Exemple de partie ouverte */}
            <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                <div>
                  <div style={{ fontWeight: 'bold' }}>Golf de Fontainebleau</div>
                  <div style={{ fontSize: '14px', color: '#666' }}>18 trous • Départ 14h30</div>
                </div>
                <div style={{ fontSize: '12px', background: '#dcfce7', color: '#166534', padding: '4px 8px', borderRadius: '4px' }}>
                  2/4 joueurs
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: '14px', color: '#666' }}>Organisé par Thomas L. (Index 12)</div>
                <button style={{
                  background: '#4A7C2E',
                  color: 'white',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}>Rejoindre</button>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <button
                onClick={() => router.push('/search')}
                style={{
                  background: 'none',
                  border: '1px solid #4A7C2E',
                  color: '#4A7C2E',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Voir toutes les parties
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Barre de navigation en bas */}
      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'white',
        borderTop: '1px solid #e5e7eb',
        padding: '12px 0',
        zIndex: 50
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          maxWidth: '480px',
          margin: '0 auto'
        }}>
          {/* Home */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer',
            color: '#4facfe'
          }}>
            <span style={{ fontSize: '24px' }}>🏠</span>
            <span style={{ fontSize: '12px', fontWeight: '500' }}>Home</span>
          </div>

          {/* Search */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer',
            color: '#6b7280'
          }}>
            <span style={{ fontSize: '24px' }}>🔍</span>
            <span style={{ fontSize: '12px', fontWeight: '500' }}>Search</span>
          </div>

          {/* Events */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer',
            color: '#6b7280'
          }}>
            <span style={{ fontSize: '24px' }}>📅</span>
            <span style={{ fontSize: '12px', fontWeight: '500' }}>Events</span>
          </div>

          {/* Profile */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer',
            color: '#6b7280'
          }}>
            <span style={{ fontSize: '24px' }}>👤</span>
            <span style={{ fontSize: '12px', fontWeight: '500' }}>Profile</span>
          </div>
        </div>
      </nav>
    </div>
  )
}