'use client'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Footer from '@/components/Footer'

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
              Profil Golfeur
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
          <div style={{ fontSize: '16px', color: '#666', marginBottom: '8px' }}>
            {email}
          </div>
          <div style={{ fontSize: '16px', color: '#4A7C2E', fontWeight: 'bold' }}>
            Index: 18 • Golf de Saint-Cloud
          </div>
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
            🏌️ Mes Statistiques Golf
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px' }}>
            <div style={{ textAlign: 'center', padding: '16px', background: '#f8f9fa', borderRadius: '8px' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#4A7C2E', marginBottom: '4px' }}>
                23
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>Parties via l'app</div>
            </div>

            <div style={{ textAlign: 'center', padding: '16px', background: '#f8f9fa', borderRadius: '8px' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#4A7C2E', marginBottom: '4px' }}>
                87
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>Score moyen</div>
            </div>

            <div style={{ textAlign: 'center', padding: '16px', background: '#f8f9fa', borderRadius: '8px' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#4A7C2E', marginBottom: '4px' }}>
                79
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>Meilleur score</div>
            </div>

            <div style={{ textAlign: 'center', padding: '16px', background: '#f8f9fa', borderRadius: '8px' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#4A7C2E', marginBottom: '4px' }}>
                12
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>Parcours visités</div>
            </div>

            <div style={{ textAlign: 'center', padding: '16px', background: '#f8f9fa', borderRadius: '8px' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#4A7C2E', marginBottom: '4px' }}>
                18.2
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>Index actuel</div>
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
            ⚙️ Mes Préférences Golf
          </h3>

          <div style={{ display: 'grid', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #eee' }}>
              <span style={{ fontWeight: '500' }}>Club d'attache</span>
              <span style={{ color: '#666' }}>Golf de Saint-Cloud</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #eee' }}>
              <span style={{ fontWeight: '500' }}>Tee time préféré</span>
              <span style={{ color: '#666' }}>Matin (8h-11h)</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #eee' }}>
              <span style={{ fontWeight: '500' }}>Marche/Voiturette</span>
              <span style={{ color: '#666' }}>Marche préférée</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #eee' }}>
              <span style={{ fontWeight: '500' }}>Format préféré</span>
              <span style={{ color: '#666' }}>18 trous</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #eee' }}>
              <span style={{ fontWeight: '500' }}>Niveau recherché</span>
              <span style={{ color: '#666' }}>Index 15-25</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
              <span style={{ fontWeight: '500' }}>Notifications</span>
              <span style={{ color: '#666' }}>Activées</span>
            </div>
          </div>
        </div>

        {/* Badges & Achievements */}
        <div style={{
          background: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          marginBottom: '24px'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>
            🏆 Badges & Achievements
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            <div style={{
              padding: '12px',
              background: '#dcfce7',
              border: '1px solid #4A7C2E',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '24px', marginBottom: '4px' }}>🏌️</div>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#4A7C2E' }}>Premier Flight</div>
              <div style={{ fontSize: '12px', color: '#666' }}>Première partie organisée</div>
            </div>

            <div style={{
              padding: '12px',
              background: '#fef3c7',
              border: '1px solid #f59e0b',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '24px', marginBottom: '4px' }}>🌍</div>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#f59e0b' }}>Explorateur</div>
              <div style={{ fontSize: '12px', color: '#666' }}>10+ parcours visités</div>
            </div>

            <div style={{
              padding: '12px',
              background: '#f3f4f6',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              textAlign: 'center',
              opacity: 0.6
            }}>
              <div style={{ fontSize: '24px', marginBottom: '4px' }}>🎯</div>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#666' }}>Eagle</div>
              <div style={{ fontSize: '12px', color: '#666' }}>Réaliser un eagle</div>
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
              🏌️ Modifier mon profil golfeur
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
              🏅 Mettre à jour mon index
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
              📧 Notifications de flights
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
              🔒 Changer mot de passe
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}