'use client'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Footer from '@/components/Footer'
import { evaluateUserBadges, getEarnedBadges } from '@/lib/badges'
import ProfileEditModal from '@/components/ProfileEditModal'

export default function ProfilePage() {
  const [mounted, setMounted] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const { user, loading, logout, resetPassword } = useAuth()
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

  // Dynamic user data
  const handicap = user?.handicap || 18
  const homeClub = user?.homeClub || 'Golf de Saint-Cloud'
  const stats = user?.stats || {
    roundsPlayed: 0,
    averageScore: 0,
    bestScore: 0,
    coursesVisited: []
  }

  // Calculate badges
  const userBadges = user ? evaluateUserBadges(user) : []
  const earnedBadges = userBadges.filter(badge => badge.earned)
  const availableBadges = userBadges.filter(badge => !badge.earned)

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
            Index: {handicap} • {homeClub}
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
                {stats.roundsPlayed}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>Parties via l'app</div>
            </div>

            <div style={{ textAlign: 'center', padding: '16px', background: '#f8f9fa', borderRadius: '8px' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#4A7C2E', marginBottom: '4px' }}>
                {stats.averageScore || '--'}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>Score moyen</div>
            </div>

            <div style={{ textAlign: 'center', padding: '16px', background: '#f8f9fa', borderRadius: '8px' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#4A7C2E', marginBottom: '4px' }}>
                {stats.bestScore || '--'}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>Meilleur score</div>
            </div>

            <div style={{ textAlign: 'center', padding: '16px', background: '#f8f9fa', borderRadius: '8px' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#4A7C2E', marginBottom: '4px' }}>
                {stats.coursesVisited.length}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>Parcours visités</div>
            </div>

            <div style={{ textAlign: 'center', padding: '16px', background: '#f8f9fa', borderRadius: '8px' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#4A7C2E', marginBottom: '4px' }}>
                {handicap}
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
              <span style={{ color: '#666' }}>{homeClub}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #eee' }}>
              <span style={{ fontWeight: '500' }}>Tee time préféré</span>
              <span style={{ color: '#666' }}>{user?.preferences?.preferredTeeTime === 'morning' ? 'Matin (8h-11h)' : user?.preferences?.preferredTeeTime === 'afternoon' ? 'Après-midi (12h-16h)' : 'Soirée (16h-19h)'}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #eee' }}>
              <span style={{ fontWeight: '500' }}>Marche/Voiturette</span>
              <span style={{ color: '#666' }}>{user?.preferences?.walkingOrCart === 'walking' ? 'Marche préférée' : user?.preferences?.walkingOrCart === 'cart' ? 'Voiturette préférée' : 'Les deux'}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #eee' }}>
              <span style={{ fontWeight: '500' }}>Style de jeu</span>
              <span style={{ color: '#666' }}>{user?.preferences?.playStyle === 'competitive' ? 'Compétitif' : user?.preferences?.playStyle === 'casual' ? 'Décontracté' : 'Entraînement'}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #eee' }}>
              <span style={{ fontWeight: '500' }}>Index personnel</span>
              <span style={{ color: '#666' }}>{handicap}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
              <span style={{ fontWeight: '500' }}>Notifications</span>
              <span style={{ color: '#666' }}>{user?.preferences?.notifications ? 'Activées' : 'Désactivées'}</span>
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
            {/* Show earned badges first */}
            {earnedBadges.map(badge => (
              <div key={badge.id} style={{
                padding: '12px',
                background: badge.category === 'participation' ? '#dcfce7' :
                           badge.category === 'achievement' ? '#fef3c7' :
                           badge.category === 'skill' ? '#dbeafe' : '#f3e8ff',
                border: `1px solid ${badge.category === 'participation' ? '#4A7C2E' :
                                   badge.category === 'achievement' ? '#f59e0b' :
                                   badge.category === 'skill' ? '#2563eb' : '#7c3aed'}`,
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '24px', marginBottom: '4px' }}>{badge.icon}</div>
                <div style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: badge.category === 'participation' ? '#4A7C2E' :
                        badge.category === 'achievement' ? '#f59e0b' :
                        badge.category === 'skill' ? '#2563eb' : '#7c3aed'
                }}>{badge.name}</div>
                <div style={{ fontSize: '12px', color: '#666' }}>{badge.description}</div>
              </div>
            ))}

            {/* Show some unearned badges */}
            {availableBadges.slice(0, 3).map(badge => (
              <div key={badge.id} style={{
                padding: '12px',
                background: '#f3f4f6',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                textAlign: 'center',
                opacity: 0.6
              }}>
                <div style={{ fontSize: '24px', marginBottom: '4px' }}>{badge.icon}</div>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#666' }}>{badge.name}</div>
                <div style={{ fontSize: '12px', color: '#666' }}>{badge.description}</div>
              </div>
            ))}

            {/* Show message if no badges */}
            {earnedBadges.length === 0 && (
              <div style={{
                padding: '20px',
                background: '#f3f4f6',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                textAlign: 'center',
                gridColumn: '1 / -1'
              }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>🏆</div>
                <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#666', marginBottom: '4px' }}>Aucun badge pour le moment</div>
                <div style={{ fontSize: '14px', color: '#666' }}>Jouez des parties pour débloquer vos premiers badges !</div>
              </div>
            )}
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
            <button
              onClick={() => setIsEditModalOpen(true)}
              style={{
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

            <button
              onClick={() => setIsEditModalOpen(true)}
              style={{
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

            <button
              onClick={() => router.push('/flights')}
              style={{
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
              🏌️ Mes Flights
            </button>

            <button
              onClick={async () => {
                const email = user?.email
                if (email) {
                  try {
                    await resetPassword(email)
                  } catch (error) {
                    console.error('Reset password error:', error)
                  }
                } else {
                  alert('Email non trouvé')
                }
              }}
              style={{
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

      {/* Profile Edit Modal */}
      {user && (
        <ProfileEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          user={user}
        />
      )}
    </div>
  )
}