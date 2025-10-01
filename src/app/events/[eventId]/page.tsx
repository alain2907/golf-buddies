'use client'
import { useParams, useRouter } from 'next/navigation'
import { useEvent } from '@/hooks/useEvents'
import { useAuth } from '@/hooks/useAuth'
import { useJoinRequests, useUserJoinRequest } from '@/hooks/useJoinRequests'
import { useState } from 'react'
import Footer from '@/components/Footer'
import { MessageSection } from '@/components/MessageSection'

export default function EventPage() {
  const params = useParams()
  const router = useRouter()
  const eventId = params.eventId as string
  const { event, loading, error } = useEvent(eventId)
  const { user } = useAuth()
  const { requests, acceptRequest, rejectRequest } = useJoinRequests(eventId)
  const { request: userRequest } = useUserJoinRequest(eventId, user?.uid)
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

  const handleJoinEvent = async () => {
    if (!user) {
      router.push('/login')
      return
    }

    setJoinLoading(true)
    try {
      const { joinEvent, leaveEvent } = await import('@/lib/firestore')
      const { addDoc, collection, serverTimestamp } = await import('firebase/firestore')
      const { db } = await import('@/lib/firebase')

      if (hasJoined) {
        await leaveEvent(eventId, user.uid)
      } else {
        // Créer la demande
        await joinEvent(eventId, user.uid, user.displayName, user.photoURL, user.handicap)

        // Envoyer une notification à l'organisateur
        await addDoc(collection(db, 'notifications'), {
          userId: event.organizerId,
          type: 'join_request',
          title: 'Nouvelle demande de participation',
          message: `${user.displayName} souhaite rejoindre "${event.title}"`,
          eventId: eventId,
          data: {
            requesterId: user.uid,
            requesterName: user.displayName,
            requesterPhoto: user.photoURL
          },
          read: false,
          createdAt: serverTimestamp()
        })

        alert('Votre demande a été envoyée à l\'organisateur !')
      }
    } catch (error: any) {
      alert('Erreur: ' + error.message)
    } finally {
      setJoinLoading(false)
    }
  }

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

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '36px' }}>⚽</span>
            <h1 style={{ fontSize: 'clamp(20px, 5vw, 32px)', fontWeight: 'bold', color: '#111827', margin: 0 }}>
              {event.title}
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#6b7280', flexWrap: 'wrap', fontSize: 'clamp(12px, 3vw, 14px)' }}>
            <span>📍 {event.location.city}</span>
            <span>📅 {eventDate.toLocaleDateString('fr-FR')}</span>
            <span>⏰ {event.time}</span>
            <span>👥 {event.currentPlayers.length}/{event.maxPlayers}</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '24px' }}>
          {/* Main Content */}
          <div>
            {/* Event Details */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              padding: 'clamp(16px, 4vw, 32px)',
              marginBottom: '24px'
            }}>
              <h2 style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 'bold', marginBottom: '24px', color: '#111827' }}>
                Détails de l&apos;événement
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px', marginBottom: '24px' }}>
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
            <div
              onClick={() => router.push(`/profile/${event.organizerId}`)}
              style={{
                background: 'white',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                padding: 'clamp(16px, 4vw, 24px)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)'
              }}
            >
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
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '16px', fontWeight: '500' }}>{event.organizerName}</div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>Organisateur</div>
                </div>
                <div style={{ color: '#9ca3af' }}>→</div>
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
                <>
                  {userRequest ? (
                    <div style={{
                      background: '#FEF3C7',
                      border: '1px solid #F59E0B',
                      borderRadius: '8px',
                      padding: '16px',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '24px', marginBottom: '8px' }}>⏳</div>
                      <div style={{ fontSize: '14px', color: '#92400E', fontWeight: '500' }}>
                        Demande en attente
                      </div>
                      <div style={{ fontSize: '12px', color: '#92400E', marginTop: '4px' }}>
                        L'organisateur doit valider votre participation
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={handleJoinEvent}
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
                </>
              )}

              {isOrganizer && (
                <>
                  <div style={{
                    background: '#dbeafe',
                    border: '1px solid #93c5fd',
                    borderRadius: '8px',
                    padding: '12px',
                    textAlign: 'center',
                    marginBottom: '12px'
                  }}>
                    <span style={{ color: '#1e40af', fontSize: '14px', fontWeight: '500' }}>
                      🎯 Vous êtes l&apos;organisateur
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
                    <button
                      onClick={() => router.push(`/events/${event.id}/edit`)}
                      style={{
                        width: '100%',
                        background: 'white',
                        border: '2px solid #4A7C2E',
                        color: '#4A7C2E',
                        padding: '12px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#E8F5E9'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'white'
                      }}
                    >
                      ✏️ Modifier l&apos;événement
                    </button>

                    <button
                      onClick={async () => {
                        if (window.confirm('Êtes-vous sûr de vouloir supprimer cet événement ? Cette action est irréversible.')) {
                          try {
                            const { deleteEvent } = await import('@/lib/firestore')
                            await deleteEvent(event.id)
                            alert('Événement supprimé avec succès')
                            router.push('/dashboard')
                          } catch (error) {
                            alert('Erreur lors de la suppression')
                          }
                        }
                      }}
                      style={{
                        width: '100%',
                        background: 'white',
                        border: '2px solid #ef4444',
                        color: '#ef4444',
                        padding: '12px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#fee2e2'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'white'
                      }}
                    >
                      🗑️ Supprimer l&apos;événement
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Demandes en attente (organisateur uniquement) */}
            {isOrganizer && requests.length > 0 && (
              <div style={{
                background: 'white',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                padding: '24px',
                marginBottom: '24px'
              }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#111827' }}>
                  Demandes en attente ({requests.length})
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {requests.map(request => (
                    <div
                      key={request.id}
                      style={{
                        background: '#f9fafb',
                        borderRadius: '8px',
                        padding: '16px',
                        border: '1px solid #e5e7eb'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                        {request.userPhoto ? (
                          <img
                            src={request.userPhoto}
                            alt={request.userName}
                            style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                          />
                        ) : (
                          <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: '#4A7C2E',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '16px',
                            fontWeight: 'bold'
                          }}>
                            {request.userName.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '16px', fontWeight: '500' }}>{request.userName}</div>
                          {request.userHandicap && (
                            <div style={{ fontSize: '12px', color: '#6b7280' }}>Index: {request.userHandicap}</div>
                          )}
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={async () => {
                            try {
                              await acceptRequest(request.id, eventId, request.userId, request.userName, event.title)
                              alert(`${request.userName} a été ajouté à l'événement`)
                            } catch (error) {
                              alert('Erreur lors de l\'acceptation')
                            }
                          }}
                          style={{
                            flex: 1,
                            background: '#4A7C2E',
                            color: 'white',
                            border: 'none',
                            padding: '8px',
                            borderRadius: '6px',
                            fontSize: '14px',
                            fontWeight: '500',
                            cursor: 'pointer'
                          }}
                        >
                          ✅ Accepter
                        </button>
                        <button
                          onClick={async () => {
                            if (window.confirm(`Refuser la demande de ${request.userName} ?`)) {
                              try {
                                await rejectRequest(request.id, request.userId, event.title)
                                alert('Demande refusée')
                              } catch (error) {
                                alert('Erreur lors du refus')
                              }
                            }
                          }}
                          style={{
                            flex: 1,
                            background: '#ef4444',
                            color: 'white',
                            border: 'none',
                            padding: '8px',
                            borderRadius: '6px',
                            fontSize: '14px',
                            fontWeight: '500',
                            cursor: 'pointer'
                          }}
                        >
                          ❌ Refuser
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
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

        {/* Section Messagerie avec Modération */}
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 16px' }}>
          <MessageSection event={event} />
        </div>
      </div>

      <Footer />
    </div>
  )
}