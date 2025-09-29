'use client'
import { useParams, useRouter } from 'next/navigation'
import { useEvent } from '@/hooks/useEvents'
import { useAuth } from '@/hooks/useAuth'
import { useState } from 'react'
import Footer from '@/components/Footer'

export default function EventPage() {
  const params = useParams()
  const router = useRouter()
  const eventId = params.eventId as string
  const { event, loading, error } = useEvent(eventId)
  const { user } = useAuth()
  const [joinLoading, setJoinLoading] = useState(false)

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f3f4f6'
      }}>
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
            margin: '0 auto 16px'
          }} className="animate-spin" />
          <p style={{ color: '#6b7280' }}>Chargement de l&apos;événement...</p>
        </div>
      </div>
    )
  }

  if (error || !event) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f3f4f6'
      }}>
        <div style={{
          padding: '24px',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          textAlign: 'center',
          maxWidth: '400px'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>😞</div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px', color: '#111827' }}>
            Événement introuvable
          </h1>
          <p style={{ color: '#6b7280', marginBottom: '24px' }}>
            Cet événement n&apos;existe pas ou a été supprimé.
          </p>
          <button
            onClick={() => window.history.back()}
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

  const isOrganizer = user?.uid === event.organizerId
  const hasJoined = user ? event.currentPlayers.includes(user.uid) : false
  const isFull = event.currentPlayers.length >= event.maxPlayers
  const eventDate = new Date(event.date)

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', paddingBottom: '80px' }}>
      {/* Header */}
      <div style={{
        background: 'white',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        borderBottom: '1px solid #e5e7eb',
        padding: '24px',
        marginBottom: '32px'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <button
            onClick={() => window.history.back()}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'none',
              border: 'none',
              color: '#6b7280',
              cursor: 'pointer',
              fontSize: '16px',
              marginBottom: '16px',
              padding: '8px 12px',
              borderRadius: '8px',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#f3f4f6'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
          >
            ← Retour
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
            <span style={{ fontSize: '36px' }}>⚽</span>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', margin: 0 }}>
              {event.title}
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#6b7280' }}>
            <span>📍 {event.location.city}</span>
            <span>📅 {eventDate.toLocaleDateString('fr-FR')}</span>
            <span>⏰ {event.time}</span>
            <span>👥 {event.currentPlayers.length}/{event.maxPlayers}</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
          {/* Main Content */}
          <div>
            {/* Event Details */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              padding: '32px',
              marginBottom: '24px'
            }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', color: '#111827' }}>
                Détails de l&apos;événement
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginBottom: '24px' }}>
                <div>
                  <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>📍 Parcours</div>
                  <div style={{ fontSize: '16px', fontWeight: '500' }}>{event.courseName}</div>
                </div>
                <div>
                  <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>📅 Date & Heure</div>
                  <div style={{ fontSize: '16px', fontWeight: '500' }}>
                    {eventDate.toLocaleDateString('fr-FR')} à {event.time}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>🏆 Niveau</div>
                  <div style={{ fontSize: '16px', fontWeight: '500' }}>
                    {event.requirements.experienceLevel === 'all' ? 'Tous niveaux' :
                     event.requirements.experienceLevel === 'beginner' ? 'Débutant' :
                     event.requirements.experienceLevel === 'intermediate' ? 'Intermédiaire' : 'Confirmé'}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>🚗 Transport</div>
                  <div style={{ fontSize: '16px', fontWeight: '500' }}>
                    {event.cartIncluded ? 'Voiturette incluse' : 'À pied autorisé'}
                  </div>
                </div>
              </div>

              {event.description && (
                <div>
                  <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>💬 Description</div>
                  <div style={{ fontSize: '16px', lineHeight: '1.5' }}>{event.description}</div>
                </div>
              )}
            </div>

            {/* Organizer */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              padding: '24px'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#111827' }}>
                Organisateur
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {event.organizerPhoto ? (
                  <img
                    src={event.organizerPhoto}
                    alt={event.organizerName}
                    style={{ width: '48px', height: '48px', borderRadius: '50%' }}
                  />
                ) : (
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: '#4A7C2E',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '18px',
                    fontWeight: 'bold'
                  }}>
                    {event.organizerName.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <div style={{ fontSize: '16px', fontWeight: '500' }}>{event.organizerName}</div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>Organisateur</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Join/Leave Button */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              padding: '24px',
              marginBottom: '24px'
            }}>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Participants</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: isFull ? '#ef4444' : '#4A7C2E' }}>
                  {event.currentPlayers.length}/{event.maxPlayers}
                </div>
              </div>

              {user && !isOrganizer && (
                <button
                  disabled={joinLoading || (!hasJoined && isFull)}
                  style={{
                    width: '100%',
                    background: hasJoined
                      ? '#ef4444'
                      : (isFull ? '#9ca3af' : 'linear-gradient(135deg, #4A7C2E 0%, #6B9F3F 100%)'),
                    color: 'white',
                    border: 'none',
                    padding: '16px',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '500',
                    cursor: (joinLoading || (!hasJoined && isFull)) ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {joinLoading ? 'Chargement...' :
                   hasJoined ? 'Se désinscrire' :
                   isFull ? 'Complet' : 'Rejoindre'}
                </button>
              )}

              {isOrganizer && (
                <div style={{
                  background: '#dbeafe',
                  border: '1px solid #93c5fd',
                  borderRadius: '8px',
                  padding: '12px',
                  textAlign: 'center'
                }}>
                  <span style={{ color: '#1e40af', fontSize: '14px', fontWeight: '500' }}>
                    🎯 Vous êtes l&apos;organisateur
                  </span>
                </div>
              )}

              {!user && (
                <div style={{
                  background: '#fef3c7',
                  border: '1px solid #fbbf24',
                  borderRadius: '8px',
                  padding: '12px',
                  textAlign: 'center'
                }}>
                  <span style={{ color: '#92400e', fontSize: '14px' }}>
                    Connectez-vous pour rejoindre
                  </span>
                </div>
              )}
            </div>

            {/* Event Status */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              padding: '24px'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#111827' }}>
                Statut
              </h3>
              <div style={{
                background: event.status === 'upcoming' ? '#dcfce7' : '#f3f4f6',
                color: event.status === 'upcoming' ? '#166534' : '#374151',
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                textAlign: 'center'
              }}>
                {event.status === 'upcoming' ? '🟢 À venir' :
                 event.status === 'in_progress' ? '🟡 En cours' :
                 event.status === 'completed' ? '✅ Terminé' : '❌ Annulé'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}