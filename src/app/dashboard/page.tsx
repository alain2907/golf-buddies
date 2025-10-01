'use client'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Footer from '@/components/Footer'
import { useEvents } from '@/hooks/useEvents'
import { Calendar, MapPin, Users, Clock, TrendingUp, Award, Star, ChevronRight } from 'lucide-react'

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)
  const { user, loading } = useAuth()
  const { events } = useEvents()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !loading && !user) {
      router.push('/')
    }
  }, [user, loading, router, mounted])

  if (!mounted || loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loading-spinner"></div>
      </div>
    )
  }

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Golfeur'

  // Filtrer les événements du jour et à venir
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const myEvents = events?.filter(event =>
    event.currentPlayers?.includes(user?.uid || '') || event.organizerId === user?.uid
  ) || []

  const upcomingEvents = myEvents.filter(event => {
    const eventDate = new Date(event.date)
    return eventDate >= today
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const todayEvents = events?.filter(event => {
    const eventDate = new Date(event.date)
    eventDate.setHours(0, 0, 0, 0)
    return eventDate.getTime() === today.getTime() &&
           event.currentPlayers.length < event.maxPlayers &&
           !event.currentPlayers.includes(user?.uid || '')
  }) || []


  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', paddingBottom: '80px' }}>
      {/* Header moderne avec gradient */}
      <div style={{
        background: 'linear-gradient(135deg, #2D5016 0%, #4A7C2E 50%, #6B9F3F 100%)',
        padding: '32px 24px',
        borderRadius: '0 0 24px 24px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h1 style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <span style={{ fontSize: '32px' }}>🏌️‍♂️</span>
                Golf Buddies
              </h1>
              <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '16px' }}>
                Bonjour {displayName} 👋
              </p>
            </div>
            <button
              onClick={() => router.push('/create')}
              style={{
                background: 'white',
                color: '#2D5016',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '12px',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <span style={{ fontSize: '18px' }}>⛳</span>
              Proposer un parcours
            </button>
          </div>

          {/* Stats rapides */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px',
            marginTop: '20px'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              padding: '12px',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>{upcomingEvents.length}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.8)' }}>Parties prévues</div>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              padding: '12px',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>{todayEvents.length}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.8)' }}>Disponibles aujourd&apos;hui</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        {/* Prochaines parties */}
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Calendar style={{ width: '24px', height: '24px', color: '#4A7C2E' }} />
            Mes prochaines parties
          </h2>

          {upcomingEvents.length > 0 ? (
            <div style={{ display: 'grid', gap: '12px' }}>
              {upcomingEvents.slice(0, 3).map((event) => (
                <div
                  key={event.id}
                  onClick={() => router.push(`/events/${event.id}`)}
                  style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '20px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    border: '2px solid transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#4A7C2E'
                    e.currentTarget.style.transform = 'translateX(4px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'transparent'
                    e.currentTarget.style.transform = 'translateX(0)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
                        {event.title}
                      </h3>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '14px', color: '#6b7280' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <MapPin style={{ width: '14px', height: '14px' }} />
                          {event.courseName}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Calendar style={{ width: '14px', height: '14px' }} />
                          {new Date(event.date).toLocaleDateString('fr-FR')}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Clock style={{ width: '14px', height: '14px' }} />
                          {event.time}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Users style={{ width: '14px', height: '14px' }} />
                          {event.currentPlayers.length}/{event.maxPlayers}
                        </span>
                      </div>
                    </div>
                    <ChevronRight style={{ width: '20px', height: '20px', color: '#4A7C2E' }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '40px',
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}>
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>⛳</div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
                Aucune partie prévue
              </h3>
              <p style={{ color: '#6b7280', marginBottom: '20px' }}>
                Créez votre première partie ou rejoignez un flight existant
              </p>
              <button
                onClick={() => router.push('/search')}
                style={{
                  background: 'linear-gradient(135deg, #4A7C2E 0%, #6B9F3F 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Explorer les parties
              </button>
            </div>
          )}
        </section>

        {/* Parties ouvertes aujourd'hui */}
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp style={{ width: '24px', height: '24px', color: '#4A7C2E' }} />
              Parties ouvertes aujourd&apos;hui
            </span>
            <button
              onClick={() => router.push('/events')}
              style={{
                background: 'none',
                border: 'none',
                color: '#4A7C2E',
                fontSize: '14px',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Voir toutes
            </button>
          </h2>

          {todayEvents.length > 0 ? (
            <div style={{ display: 'grid', gap: '12px' }}>
              {todayEvents.slice(0, 3).map((event) => (
                <div
                  key={event.id}
                  onClick={() => router.push(`/events/${event.id}`)}
                  style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '20px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
                        {event.title}
                      </h3>
                      <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: '#6b7280' }}>
                        <span>📍 {event.courseName}</span>
                        <span>⏰ {event.time}</span>
                        <span>👥 {event.currentPlayers.length}/{event.maxPlayers}</span>
                      </div>
                      <div style={{ marginTop: '8px', fontSize: '13px', color: '#9ca3af' }}>
                        Organisé par {event.organizerName}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/events/${event.id}`)
                      }}
                      style={{
                        background: '#4A7C2E',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      Rejoindre
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '24px',
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}>
              <p style={{ color: '#6b7280' }}>
                Aucune partie ouverte pour aujourd&apos;hui. Créez-en une !
              </p>
            </div>
          )}
        </section>

        {/* Actions rapides */}
        <section>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Award style={{ width: '24px', height: '24px', color: '#4A7C2E' }} />
            Actions rapides
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '12px'
          }}>
            <div
              onClick={() => router.push('/create')}
              style={{
                background: 'linear-gradient(135deg, #4A7C2E 0%, #6B9F3F 100%)',
                color: 'white',
                borderRadius: '12px',
                padding: '20px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>⛳</div>
              <div style={{ fontWeight: '600' }}>Créer partie</div>
            </div>

            <div
              onClick={() => router.push('/search')}
              style={{
                background: 'white',
                borderRadius: '12px',
                padding: '20px',
                textAlign: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>🔍</div>
              <div style={{ fontWeight: '600' }}>Chercher flight</div>
            </div>

            <div
              onClick={() => router.push('/courses')}
              style={{
                background: 'white',
                borderRadius: '12px',
                padding: '20px',
                textAlign: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>📍</div>
              <div style={{ fontWeight: '600' }}>Parcours</div>
            </div>

            <div
              onClick={() => router.push('/profile')}
              style={{
                background: 'white',
                borderRadius: '12px',
                padding: '20px',
                textAlign: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>👤</div>
              <div style={{ fontWeight: '600' }}>Mon profil</div>
            </div>
            <div
              onClick={() => router.push('/friends')}
              style={{
                background: 'white',
                borderRadius: '12px',
                padding: '20px',
                textAlign: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>👥</div>
              <div style={{ fontWeight: '600' }}>Mes amis</div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}