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
                Golf Buddies
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
            Proposez une dispo
          </button>
        </div>
      </nav>

      {/* Contenu principal */}
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Comment ça marche */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            ⚡ Comment ça marche ?
          </h2>

          {/* Actions principales */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            <div
              onClick={() => router.push('/how-to-create')}
              style={{ padding: '16px', background: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', textAlign: 'center', cursor: 'pointer' }}
            >
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>👤</div>
              <div style={{ fontWeight: 'bold' }}>CRÉE</div>
            </div>
            <div
              onClick={() => router.push('/create')}
              style={{ padding: '16px', background: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', textAlign: 'center', cursor: 'pointer' }}
            >
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>📍</div>
              <div style={{ fontWeight: 'bold' }}>PUBLIE</div>
            </div>
            <div
              onClick={() => router.push('/search')}
              style={{ padding: '16px', background: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', textAlign: 'center', cursor: 'pointer' }}
            >
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>🔍</div>
              <div style={{ fontWeight: 'bold' }}>CHERCHE</div>
            </div>
            <div
              onClick={() => router.push('/search')}
              style={{ padding: '16px', background: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', textAlign: 'center', cursor: 'pointer' }}
            >
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>💬</div>
              <div style={{ fontWeight: 'bold' }}>ORGANISE</div>
            </div>
          </div>
        </div>

        {/* Créer un événement */}
        <div style={{ marginBottom: '32px' }}>
          <button
            onClick={() => router.push('/create')}
            style={{
            background: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
            color: 'white',
            padding: '24px',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            border: 'none',
            width: '100%',
            fontSize: 'inherit',
            fontFamily: 'inherit'
          }}>
            <span style={{ fontSize: '32px' }}>⚽</span>
            <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Créer un événement</span>
          </button>
        </div>

        {/* Suggestions */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🎯 Suggestions pour toi
          </h3>
          <div style={{
            background: 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎯</div>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Aucune suggestion disponible</div>
            <div style={{ color: '#666', fontSize: '14px' }}>
              Créez plus d&apos;événements pour améliorer nos recommandations
            </div>
          </div>
        </div>

        {/* Disponibilités d'aujourd'hui */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🏃‍♂️ Disponibilités d&apos;aujourd&apos;hui
          </h3>
          <div style={{
            background: 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔥</div>
            <div style={{ fontWeight: 'bold', fontSize: '18px' }}>0 dispos aujourd&apos;hui</div>
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