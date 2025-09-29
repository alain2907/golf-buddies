'use client'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ProfilePage() {
  const [mounted, setMounted] = useState(false)
  const { user, loading, logout } = useAuth()
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

  // For testing, show profile even without user
  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Utilisateur Test'
  const email = user?.email || 'test@example.com'

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

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
          <div>
            <h1 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: 'white',
              margin: 0
            }}>
              Mon Profil
            </h1>
          </div>
          <button
            onClick={handleLogout}
            style={{
              background: 'white',
              color: '#4facfe',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Déconnecter
          </button>
        </div>
      </nav>

      {/* Contenu principal */}
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Photo de profil et informations principales */}
        <div style={{
          background: 'white',
          padding: '32px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          marginBottom: '24px',
          textAlign: 'center'
        }}>
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            margin: '0 auto 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '40px',
            color: 'white'
          }}>
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
              />
            ) : (
              '👤'
            )}
          </div>

          <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>
            {displayName}
          </h2>
          <p style={{ fontSize: '16px', color: '#666', marginBottom: '0' }}>
            {email}
          </p>
        </div>

        {/* Statistiques de golf */}
        <div style={{
          background: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          marginBottom: '24px'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>
            📊 Mes Statistiques
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
            <div style={{ textAlign: 'center', padding: '16px', background: '#f8f9fa', borderRadius: '8px' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#4facfe', marginBottom: '4px' }}>
                {user?.stats?.roundsPlayed || 0}
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>Parties jouées</div>
            </div>

            <div style={{ textAlign: 'center', padding: '16px', background: '#f8f9fa', borderRadius: '8px' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#4facfe', marginBottom: '4px' }}>
                {user?.stats?.averageScore || 'N/A'}
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>Score moyen</div>
            </div>

            <div style={{ textAlign: 'center', padding: '16px', background: '#f8f9fa', borderRadius: '8px' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#4facfe', marginBottom: '4px' }}>
                {user?.stats?.bestScore || 'N/A'}
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>Meilleur score</div>
            </div>
          </div>
        </div>

        {/* Préférences */}
        <div style={{
          background: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          marginBottom: '24px'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>
            ⚙️ Mes Préférences
          </h3>

          <div style={{ display: 'grid', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #eee' }}>
              <span style={{ fontWeight: '500' }}>Style de jeu</span>
              <span style={{ color: '#666', textTransform: 'capitalize' }}>
                {user?.preferences?.playStyle || 'Casual'}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #eee' }}>
              <span style={{ fontWeight: '500' }}>Heure préférée</span>
              <span style={{ color: '#666', textTransform: 'capitalize' }}>
                {user?.preferences?.preferredTeeTime || 'Matin'}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #eee' }}>
              <span style={{ fontWeight: '500' }}>Marche ou voiturette</span>
              <span style={{ color: '#666', textTransform: 'capitalize' }}>
                {user?.preferences?.walkingOrCart || 'Les deux'}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
              <span style={{ fontWeight: '500' }}>Notifications</span>
              <span style={{ color: '#666' }}>
                {user?.preferences?.notifications ? 'Activées' : 'Désactivées'}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{
          background: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          marginBottom: '24px'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>
            🔧 Actions
          </h3>

          <div style={{ display: 'grid', gap: '12px' }}>
            <button style={{
              background: '#f8f9fa',
              border: '1px solid #e9ecef',
              padding: '16px',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#e9ecef'}
            onMouseOut={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#f8f9fa'}
            >
              ✏️ Modifier mon profil
            </button>

            <button style={{
              background: '#f8f9fa',
              border: '1px solid #e9ecef',
              padding: '16px',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#e9ecef'}
            onMouseOut={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#f8f9fa'}
            >
              🔒 Changer mon mot de passe
            </button>

            <button style={{
              background: '#f8f9fa',
              border: '1px solid #e9ecef',
              padding: '16px',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#e9ecef'}
            onMouseOut={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#f8f9fa'}
            >
              📧 Paramètres de notification
            </button>
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
          <div
            onClick={() => router.push('/dashboard')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
              color: '#6b7280'
            }}
          >
            <span style={{ fontSize: '24px' }}>🏠</span>
            <span style={{ fontSize: '12px', fontWeight: '500' }}>Home</span>
          </div>

          {/* Search */}
          <div
            onClick={() => router.push('/search')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
              color: '#6b7280'
            }}
          >
            <span style={{ fontSize: '24px' }}>🔍</span>
            <span style={{ fontSize: '12px', fontWeight: '500' }}>Search</span>
          </div>

          {/* Events */}
          <div
            onClick={() => router.push('/events')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
              color: '#6b7280'
            }}
          >
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
            color: '#4facfe'
          }}>
            <span style={{ fontSize: '24px' }}>👤</span>
            <span style={{ fontSize: '12px', fontWeight: '500' }}>Profile</span>
          </div>
        </div>
      </nav>
    </div>
  )
}