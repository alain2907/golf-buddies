'use client'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { User } from '@/types'
import { useAuth } from '@/hooks/useAuth'
import { useFriends } from '@/hooks/useFriends'
import Footer from '@/components/Footer'
import { MapPin, Calendar, Award, TrendingUp, ChevronLeft } from 'lucide-react'

export default function PublicProfilePage() {
  const params = useParams()
  const router = useRouter()
  const userId = params.userId as string
  const { user: currentUser } = useAuth()
  const { friends, sendFriendRequest, getFriendshipStatus } = useFriends()
  const [profileUser, setProfileUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [friendshipStatus, setFriendshipStatus] = useState<'none' | 'pending_sent' | 'pending_received' | 'friends'>('none')

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', userId))
        if (userDoc.exists()) {
          setProfileUser({
            uid: userDoc.id,
            ...userDoc.data(),
            createdAt: userDoc.data().createdAt?.toDate() || new Date(),
            lastActive: userDoc.data().lastActive?.toDate()
          } as User)

          if (currentUser) {
            const status = await getFriendshipStatus(userId)
            setFriendshipStatus(status)
          }
        }
      } catch (error) {
        console.error('Error loading profile:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [userId, currentUser, getFriendshipStatus])

  const handleFriendRequest = async () => {
    if (!currentUser) {
      router.push('/login')
      return
    }

    try {
      await sendFriendRequest(userId)
      setFriendshipStatus('pending_sent')
    } catch (error: any) {
      alert(error.message)
    }
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f3f4f6' }}>
        <div style={{
          padding: '24px',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #4A7C2E',
            borderTop: '4px solid transparent',
            borderRadius: '50%',
            margin: '0 auto 16px',
            animation: 'spin 1s linear infinite'
          }} />
          <p style={{ color: '#6b7280' }}>Chargement du profil...</p>
        </div>
      </div>
    )
  }

  if (!profileUser) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f3f4f6' }}>
        <div style={{
          padding: '48px',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          textAlign: 'center',
          maxWidth: '400px'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>😞</div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px', color: '#111827' }}>
            Profil introuvable
          </h1>
          <p style={{ color: '#6b7280', marginBottom: '24px' }}>
            Ce profil n'existe pas ou a été supprimé.
          </p>
          <button
            onClick={() => router.back()}
            style={{
              background: 'linear-gradient(135deg, #4A7C2E 0%, #6B9F3F 100%)',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Retour
          </button>
        </div>
      </div>
    )
  }

  const isOwnProfile = currentUser?.uid === userId
  const isFriend = friendshipStatus === 'friends'

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', paddingBottom: '80px' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #2D5016 0%, #4A7C2E 50%, #6B9F3F 100%)',
        padding: '32px 24px',
        color: 'white'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <button
            onClick={() => router.back()}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              marginBottom: '24px'
            }}
          >
            <ChevronLeft style={{ width: '16px', height: '16px' }} />
            Retour
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            {profileUser.photoURL ? (
              <img
                src={profileUser.photoURL}
                alt={profileUser.displayName}
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  border: '4px solid white',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }}
              />
            ) : (
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#4A7C2E',
                border: '4px solid white',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
              }}>
                {profileUser.displayName.charAt(0).toUpperCase()}
              </div>
            )}

            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>
                {profileUser.displayName}
              </h1>
              {profileUser.homeClub && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', opacity: 0.9 }}>
                  <MapPin style={{ width: '16px', height: '16px' }} />
                  {profileUser.homeClub}
                </div>
              )}
              {profileUser.handicap !== undefined && (
                <div style={{
                  display: 'inline-block',
                  marginTop: '8px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Index: {profileUser.handicap}
                </div>
              )}
            </div>

            {!isOwnProfile && currentUser && (
              <div>
                {friendshipStatus === 'none' && (
                  <button
                    onClick={handleFriendRequest}
                    style={{
                      background: 'white',
                      color: '#4A7C2E',
                      border: 'none',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                  >
                    + Ajouter en ami
                  </button>
                )}
                {friendshipStatus === 'pending_sent' && (
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}>
                    ⏳ Demande envoyée
                  </div>
                )}
                {friendshipStatus === 'friends' && (
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    ✓ Amis
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {/* Bio */}
          {profileUser.bio && (
            <div style={{
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              padding: '24px',
              gridColumn: '1 / -1'
            }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', color: '#111827' }}>
                À propos
              </h2>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>{profileUser.bio}</p>
            </div>
          )}

          {/* Statistiques */}
          {profileUser.stats && (
            <div style={{
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              padding: '24px'
            }}>
              <h2 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                marginBottom: '16px',
                color: '#111827',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <TrendingUp style={{ width: '20px', height: '20px', color: '#4A7C2E' }} />
                Statistiques
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Parties jouées</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2D5016' }}>
                    {profileUser.stats.roundsPlayed}
                  </div>
                </div>

                {profileUser.stats.averageScore > 0 && (
                  <div>
                    <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Score moyen</div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2D5016' }}>
                      {profileUser.stats.averageScore}
                    </div>
                  </div>
                )}

                {profileUser.stats.bestScore > 0 && (
                  <div>
                    <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Meilleur score</div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2D5016' }}>
                      {profileUser.stats.bestScore}
                    </div>
                  </div>
                )}

                <div>
                  <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Parcours visités</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2D5016' }}>
                    {profileUser.stats.coursesVisited?.length || 0}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Préférences de jeu */}
          <div style={{
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            padding: '24px'
          }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              marginBottom: '16px',
              color: '#111827'
            }}>
              Préférences de jeu
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Style de jeu</div>
                <div style={{ fontSize: '16px', fontWeight: '500' }}>
                  {profileUser.preferences.playStyle === 'competitive' ? '🏆 Compétitif' :
                   profileUser.preferences.playStyle === 'casual' ? '😊 Décontracté' : '🎯 Entraînement'}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Horaire préféré</div>
                <div style={{ fontSize: '16px', fontWeight: '500' }}>
                  {profileUser.preferences.preferredTeeTime === 'morning' ? '🌅 Matin' :
                   profileUser.preferences.preferredTeeTime === 'afternoon' ? '☀️ Après-midi' : '🌆 Soirée'}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Transport</div>
                <div style={{ fontSize: '16px', fontWeight: '500' }}>
                  {profileUser.preferences.walkingOrCart === 'walking' ? '🚶 À pied' :
                   profileUser.preferences.walkingOrCart === 'cart' ? '🚗 Voiturette' : '🚶/🚗 Les deux'}
                </div>
              </div>
            </div>
          </div>

          {/* Badges */}
          {profileUser.badges && profileUser.badges.length > 0 && (
            <div style={{
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              padding: '24px',
              gridColumn: '1 / -1'
            }}>
              <h2 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                marginBottom: '16px',
                color: '#111827',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Award style={{ width: '20px', height: '20px', color: '#4A7C2E' }} />
                Badges ({profileUser.badges.filter(b => b.earned).length})
              </h2>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                gap: '16px'
              }}>
                {profileUser.badges.filter(b => b.earned).map((badge) => (
                  <div
                    key={badge.id}
                    style={{
                      background: '#E8F5E9',
                      border: '2px solid #C1E6C3',
                      borderRadius: '12px',
                      padding: '16px',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>{badge.icon}</div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#2D5016' }}>
                      {badge.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Membre depuis */}
          <div style={{
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            padding: '24px',
            gridColumn: '1 / -1'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#6b7280',
              fontSize: '14px'
            }}>
              <Calendar style={{ width: '16px', height: '16px' }} />
              Membre depuis {new Date(profileUser.createdAt).toLocaleDateString('fr-FR', {
                month: 'long',
                year: 'numeric'
              })}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
