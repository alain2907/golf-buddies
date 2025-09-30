'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { collection, query, where, orderBy, onSnapshot, updateDoc, doc, arrayRemove } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { GolfEvent } from '@/types'
import { useRouter } from 'next/navigation'
import Footer from '@/components/Footer'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import toast from 'react-hot-toast'

export default function MyFlightsPage() {
  const { user, loading: authLoading } = useAuth()
  const [upcomingFlights, setUpcomingFlights] = useState<GolfEvent[]>([])
  const [pastFlights, setPastFlights] = useState<GolfEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [showPastFlights, setShowPastFlights] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!user || authLoading) return

    setLoading(true)

    // Écouter tous les événements où l'utilisateur est inscrit
    const q = query(
      collection(db, 'events'),
      where('currentPlayers', 'array-contains', user.uid),
      orderBy('date', 'desc')
    )

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const events = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          date: doc.data().date?.toDate() || new Date()
        })) as GolfEvent[]

        const now = new Date()
        const upcoming = events.filter(e => new Date(e.date) >= now && e.status !== 'cancelled')
        const past = events.filter(e => new Date(e.date) < now || e.status === 'completed')

        setUpcomingFlights(upcoming.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()))
        setPastFlights(past)
        setLoading(false)
      },
      (error) => {
        console.error('Error loading flights:', error)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [user, authLoading])

  const handleLeaveEvent = async (event: GolfEvent) => {
    if (!user) return

    if (confirm(`Êtes-vous sûr de vouloir quitter "${event.title}" ?`)) {
      try {
        await updateDoc(doc(db, 'events', event.id), {
          currentPlayers: arrayRemove(user.uid)
        })
        toast.success('Vous avez quitté la partie')
      } catch (error) {
        console.error('Error leaving event:', error)
        toast.error('Erreur lors de la désinscription')
      }
    }
  }

  const getStatusBadge = (event: GolfEvent) => {
    const isFull = event.currentPlayers.length >= event.maxPlayers
    const daysUntil = Math.ceil((new Date(event.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

    if (isFull) {
      return <span style={{
        padding: '4px 12px',
        background: '#dcfce7',
        color: '#16a34a',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: 'bold'
      }}>Flight complet</span>
    }

    if (daysUntil <= 1) {
      return <span style={{
        padding: '4px 12px',
        background: '#fef3c7',
        color: '#f59e0b',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: 'bold'
      }}>Demain</span>
    }

    if (daysUntil <= 3) {
      return <span style={{
        padding: '4px 12px',
        background: '#dbeafe',
        color: '#2563eb',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: 'bold'
      }}>Dans {daysUntil} jours</span>
    }

    return <span style={{
      padding: '4px 12px',
      background: '#f3f4f6',
      color: '#6b7280',
      borderRadius: '20px',
      fontSize: '12px'
    }}>{event.currentPlayers.length}/{event.maxPlayers} joueurs</span>
  }

  if (authLoading || loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LoadingSpinner />
      </div>
    )
  }

  if (!user) {
    return (
      <div style={{ minHeight: '100vh', padding: '20px' }}>
        <div style={{ maxWidth: '600px', margin: '100px auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>Connexion requise</h1>
          <p style={{ marginBottom: '24px' }}>Connectez-vous pour voir vos flights</p>
          <button
            onClick={() => router.push('/login')}
            style={{
              background: '#4A7C2E',
              color: 'white',
              padding: '12px 32px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Se connecter
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '80px' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #4A7C2E 0%, #6B9F3F 100%)',
        padding: '40px 20px 60px',
        color: 'white'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '12px' }}>
            🏌️ Mes Flights
          </h1>
          <p style={{ fontSize: '18px', opacity: 0.9 }}>
            Gérez vos parties et notifications
          </p>

          {/* Stats rapides */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '16px',
            marginTop: '32px'
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.2)',
              padding: '16px',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{upcomingFlights.length}</div>
              <div style={{ fontSize: '14px' }}>Parties à venir</div>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.2)',
              padding: '16px',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{pastFlights.length}</div>
              <div style={{ fontSize: '14px' }}>Parties jouées</div>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.2)',
              padding: '16px',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '28px', fontWeight: 'bold' }}>
                {upcomingFlights.filter(e => e.currentPlayers.length >= e.maxPlayers).length}
              </div>
              <div style={{ fontSize: '14px' }}>Flights complets</div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div style={{ maxWidth: '800px', margin: '-30px auto 0', padding: '0 20px' }}>

        {/* Prochains flights */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            ⏰ Prochains Flights
            {upcomingFlights.length > 0 && (
              <span style={{
                background: '#ef4444',
                color: 'white',
                borderRadius: '50%',
                padding: '2px 8px',
                fontSize: '14px'
              }}>{upcomingFlights.length}</span>
            )}
          </h2>

          {upcomingFlights.length === 0 ? (
            <div style={{
              background: 'white',
              padding: '40px',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏌️</div>
              <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>
                Aucune partie prévue
              </h3>
              <p style={{ color: '#666', marginBottom: '24px' }}>
                Rejoignez une partie pour commencer à jouer !
              </p>
              <button
                onClick={() => router.push('/search')}
                style={{
                  background: '#4A7C2E',
                  color: 'white',
                  padding: '12px 32px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '16px',
                  cursor: 'pointer'
                }}
              >
                Rechercher des parties
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '16px' }}>
              {upcomingFlights.map(flight => (
                <div key={flight.id} style={{
                  background: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
                onClick={(e) => {
                  // Ne pas naviguer si on clique sur un bouton
                  if ((e.target as HTMLElement).tagName !== 'BUTTON') {
                    router.push(`/events/${flight.id}`)
                  }
                }}>
                  {/* Header de la carte */}
                  <div style={{
                    padding: '20px',
                    borderBottom: '1px solid #f3f4f6'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'start',
                      marginBottom: '12px'
                    }}>
                      <div>
                        <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '4px' }}>
                          {flight.title}
                        </h3>
                        <p style={{ color: '#666', fontSize: '14px' }}>
                          📍 {flight.courseName}
                        </p>
                      </div>
                      {getStatusBadge(flight)}
                    </div>

                    <div style={{
                      display: 'flex',
                      gap: '20px',
                      fontSize: '14px',
                      color: '#4b5563'
                    }}>
                      <span>📅 {format(new Date(flight.date), 'EEEE d MMMM', { locale: fr })}</span>
                      <span>🕐 {flight.time}</span>
                      <span>👥 {flight.currentPlayers.length}/{flight.maxPlayers} joueurs</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{
                    padding: '16px 20px',
                    background: '#f9fafb',
                    display: 'flex',
                    gap: '12px',
                    justifyContent: 'flex-end'
                  }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/events/${flight.id}`)
                      }}
                      style={{
                        padding: '8px 16px',
                        background: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        fontSize: '14px',
                        cursor: 'pointer'
                      }}
                    >
                      💬 Voir détails
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleLeaveEvent(flight)
                      }}
                      style={{
                        padding: '8px 16px',
                        background: '#fee2e2',
                        color: '#dc2626',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '14px',
                        cursor: 'pointer'
                      }}
                    >
                      ❌ Quitter
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Historique */}
        <section>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span>📚 Historique</span>
            <button
              onClick={() => setShowPastFlights(!showPastFlights)}
              style={{
                background: 'none',
                border: 'none',
                color: '#4A7C2E',
                fontSize: '14px',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              {showPastFlights ? 'Masquer' : `Voir (${pastFlights.length})`}
            </button>
          </h2>

          {showPastFlights && (
            <div style={{ display: 'grid', gap: '12px' }}>
              {pastFlights.map(flight => (
                <div key={flight.id} style={{
                  background: 'white',
                  padding: '16px 20px',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <h4 style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                      {flight.title}
                    </h4>
                    <p style={{ fontSize: '14px', color: '#666' }}>
                      {flight.courseName} • {format(new Date(flight.date), 'd MMMM yyyy', { locale: fr })}
                    </p>
                  </div>
                  <button
                    onClick={() => router.push(`/events/${flight.id}`)}
                    style={{
                      padding: '6px 12px',
                      background: '#f3f4f6',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      cursor: 'pointer'
                    }}
                  >
                    Voir
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Bouton recherche floating */}
        <button
          onClick={() => router.push('/search')}
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '20px',
            background: '#4A7C2E',
            color: 'white',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ➕
        </button>
      </div>

      <Footer />
    </div>
  )
}