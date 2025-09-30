'use client'

import { useState, useEffect } from 'react'
import { MessageModerationService } from '@/lib/messageModeration'
import { EventMessage } from '@/types/message'
import { GolfEvent } from '@/types/index'
import { useAuth } from '@/hooks/useAuth'
import { Send, Flag, Trash2, Eye, EyeOff, X } from 'lucide-react'
import toast from 'react-hot-toast'

interface MessageSectionProps {
  event: GolfEvent
}

export function MessageSection({ event }: MessageSectionProps) {
  const { user } = useAuth()
  const [messages, setMessages] = useState<EventMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [newMessage, setNewMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [showReportModal, setShowReportModal] = useState<string | null>(null)
  const [reportReason, setReportReason] = useState<'spam' | 'inappropriate' | 'offensive' | 'other'>('inappropriate')
  const [reportDescription, setReportDescription] = useState('')

  const isOrganizer = user?.uid === event.organizerId
  const isParticipant = event.currentPlayers?.includes(user?.uid || '')
  const canSendMessage = isOrganizer || isParticipant

  useEffect(() => {
    if (!event.id) return

    setLoading(true)
    const unsubscribe = MessageModerationService.subscribeToEventMessages(event.id, (msgs) => {
      // Pour l'organisateur, montrer TOUS les messages (même masqués)
      // Pour les autres, filtrer les messages masqués
      const filteredMessages = isOrganizer
        ? msgs // Montrer tous les messages pour l'organisateur
        : msgs.filter(msg => msg.status === 'visible') // Montrer seulement visibles pour les autres

      setMessages(filteredMessages)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [event.id, isOrganizer])

  const handleSendMessage = async () => {
    if (!user || !newMessage.trim() || !canSendMessage) return

    setSending(true)
    try {
      await MessageModerationService.createMessage(
        {
          eventId: event.id,
          content: newMessage.trim()
        },
        user.uid,
        user
      )
      setNewMessage('')
      toast.success('Message envoyé !')
    } catch (error) {
      console.error('Error sending message:', error)
      toast.error('Erreur lors de l\'envoi du message')
    } finally {
      setSending(false)
    }
  }

  const handleDeleteMessage = async (messageId: string) => {
    if (!user) return

    if (confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
      try {
        await MessageModerationService.deleteMessage(messageId, user.uid)
        toast.success('Message supprimé')
      } catch (error) {
        console.error('Error deleting message:', error)
        toast.error('Erreur lors de la suppression du message')
      }
    }
  }

  const handleModerateMessage = async (messageId: string, action: 'hide' | 'show') => {
    if (!user || !isOrganizer) return

    try {
      await MessageModerationService.moderateMessage(messageId, action, user.uid)
      toast.success(action === 'hide' ? 'Message masqué' : 'Message affiché')
    } catch (error) {
      console.error('Error moderating message:', error)
      toast.error('Erreur lors de la modération du message')
    }
  }

  const handleReportMessage = async (messageId: string) => {
    if (!user) return

    try {
      await MessageModerationService.reportMessage(
        messageId,
        user.uid,
        user.displayName || user.email || 'Utilisateur',
        reportReason,
        reportDescription || undefined
      )
      setShowReportModal(null)
      setReportReason('inappropriate')
      setReportDescription('')

      // Essayer d'envoyer un email à l'équipe de modération
      sendReportEmail(messageId)

      toast.success('Message signalé. Merci de votre vigilance.')
    } catch (error) {
      if (error instanceof Error && error.message.includes('déjà signalé')) {
        toast.error('Vous avez déjà signalé ce message')
      } else {
        toast.error('Erreur lors du signalement du message')
      }
      console.error('Error reporting message:', error)
    }
  }

  const sendReportEmail = (messageId: string) => {
    const reportedMessage = messages.find(msg => msg.id === messageId)
    if (!reportedMessage) return

    const subject = `Signalement message Golf Buddies - ${reportReason}`
    const body = `
Bonjour,

Un message a été signalé dans Golf Buddies.

Événement : ${event.title} (ID: ${event.id})
Message signalé par : ${user?.displayName || user?.email || 'Utilisateur'}
Auteur du message : ${reportedMessage.userName}
Raison : ${reportReason}
Description : ${reportDescription || 'Aucune description fournie'}

Contenu du message :
"${reportedMessage.content}"

Date du message : ${formatDate(reportedMessage.createdAt)}

Merci de prendre les mesures appropriées.

Cordialement
    `.trim()

    const mailtoLink = `mailto:contact@golfbuddies.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    // Essayer d'ouvrir le client mail
    try {
      const link = document.createElement('a')
      link.href = mailtoLink
      link.click()
    } catch {
      console.log('Impossible d\'ouvrir le client mail')
    }
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div style={{
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        padding: '24px',
        marginTop: '24px'
      }}>
        <div style={{ textAlign: 'center', color: '#6b7280' }}>
          Chargement des messages...
        </div>
      </div>
    )
  }

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      padding: '24px',
      marginTop: '24px'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '700',
            color: '#111827',
            margin: 0
          }}>
            💬 Discussion
          </h3>
          {messages.length > 0 && (
            <span style={{
              background: '#3b82f6',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: '600'
            }}>
              {messages.length}
            </span>
          )}
        </div>
        {!canSendMessage && (
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginTop: '8px',
            margin: '8px 0 0 0'
          }}>
            Seuls les participants peuvent envoyer des messages
          </p>
        )}
      </div>

      {/* Messages List */}
      {messages.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '32px 0',
          color: '#6b7280'
        }}>
          {canSendMessage
            ? 'Soyez le premier à envoyer un message !'
            : 'Aucun message pour le moment'
          }
        </div>
      ) : (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          maxHeight: '400px',
          overflowY: 'auto',
          marginBottom: '16px'
        }}>
          {messages.map((message) => (
            <div
              key={message.id}
              style={{
                padding: '16px',
                borderRadius: '12px',
                background: message.status === 'hidden'
                  ? '#fef2f2'
                  : message.userId === user?.uid
                  ? '#dbeafe'
                  : '#f9fafb',
                border: message.status === 'hidden' ? '2px solid #fecaca' : 'none',
                opacity: message.status === 'hidden' ? 0.7 : 1,
                marginLeft: message.userId === user?.uid ? '32px' : '0',
                marginRight: message.userId !== user?.uid ? '32px' : '0'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#111827'
                  }}>
                    {message.userName}
                  </div>
                  {message.isOrganizer && (
                    <span style={{
                      background: '#10b981',
                      color: 'white',
                      padding: '2px 6px',
                      borderRadius: '6px',
                      fontSize: '10px',
                      fontWeight: '600'
                    }}>
                      Organisateur
                    </span>
                  )}
                  {message.status === 'hidden' && isOrganizer && (
                    <span style={{
                      background: '#f59e0b',
                      color: 'white',
                      padding: '2px 6px',
                      borderRadius: '6px',
                      fontSize: '10px',
                      fontWeight: '600'
                    }}>
                      Masqué
                    </span>
                  )}
                  {message.status === 'reported' && isOrganizer && (
                    <span style={{
                      background: '#ef4444',
                      color: 'white',
                      padding: '2px 6px',
                      borderRadius: '6px',
                      fontSize: '10px',
                      fontWeight: '600'
                    }}>
                      Signalé ({message.reports?.length})
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>
                  {formatDate(message.createdAt)}
                </div>
              </div>

              <p style={{
                color: '#374151',
                marginBottom: '8px',
                margin: '0 0 8px 0'
              }}>
                {message.content}
              </p>

              {/* Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {/* Report button - visible to all except author */}
                {user && message.userId !== user.uid && (
                  <button
                    onClick={() => setShowReportModal(message.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '12px',
                      color: '#6b7280',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#ef4444'
                      e.currentTarget.style.background = '#fef2f2'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#6b7280'
                      e.currentTarget.style.background = 'transparent'
                    }}
                  >
                    <Flag style={{ width: '12px', height: '12px' }} />
                    Signaler
                  </button>
                )}

                {/* Delete button - for author */}
                {user && message.userId === user.uid && (
                  <button
                    onClick={() => handleDeleteMessage(message.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '12px',
                      color: '#ef4444',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#fef2f2'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent'
                    }}
                  >
                    <Trash2 style={{ width: '12px', height: '12px' }} />
                    Supprimer
                  </button>
                )}

                {/* Moderation buttons - for organizer */}
                {isOrganizer && message.userId !== user?.uid && (
                  <>
                    {message.status === 'visible' ? (
                      <button
                        onClick={() => handleModerateMessage(message.id, 'hide')}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '12px',
                          color: '#f59e0b',
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '4px 8px',
                          borderRadius: '6px',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#fef3c7'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent'
                        }}
                      >
                        <EyeOff style={{ width: '12px', height: '12px' }} />
                        Masquer
                      </button>
                    ) : (
                      <button
                        onClick={() => handleModerateMessage(message.id, 'show')}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '12px',
                          color: '#10b981',
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '4px 8px',
                          borderRadius: '6px',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#d1fae5'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent'
                        }}
                      >
                        <Eye style={{ width: '12px', height: '12px' }} />
                        Afficher
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteMessage(message.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '12px',
                        color: '#ef4444',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#fef2f2'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent'
                      }}
                    >
                      <X style={{ width: '12px', height: '12px' }} />
                      Supprimer
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* New Message Form */}
      {canSendMessage && user && (
        <div style={{
          borderTop: '1px solid #e5e7eb',
          paddingTop: '16px'
        }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
              placeholder="Écrivez votre message..."
              style={{
                flex: 1,
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                transition: 'all 0.2s'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#3b82f6'
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#d1d5db'
                e.currentTarget.style.boxShadow = 'none'
              }}
              disabled={sending}
            />
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || sending}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                background: !newMessage.trim() || sending ? '#9ca3af' : 'linear-gradient(135deg, #4A7C2E 0%, #6B9F3F 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: !newMessage.trim() || sending ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                if (!sending && newMessage.trim()) {
                  e.currentTarget.style.transform = 'translateY(-1px)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(74, 124, 46, 0.3)'
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <Send style={{ width: '16px', height: '16px' }} />
              {sending ? 'Envoi...' : 'Envoyer'}
            </button>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            width: '100%',
            maxWidth: '500px',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
            margin: '16px'
          }}>
            <div style={{
              padding: '24px',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#111827',
                margin: 0
              }}>
                Signaler ce message
              </h3>
            </div>
            <div style={{ padding: '24px' }}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Raison du signalement
                </label>
                <select
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value as 'spam' | 'inappropriate' | 'offensive' | 'other')}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                >
                  <option value="spam">Spam</option>
                  <option value="inappropriate">Contenu inapproprié</option>
                  <option value="offensive">Contenu offensant</option>
                  <option value="other">Autre</option>
                </select>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Description (optionnel)
                </label>
                <textarea
                  value={reportDescription}
                  onChange={(e) => setReportDescription(e.target.value)}
                  placeholder="Donnez plus de détails si nécessaire..."
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    resize: 'vertical',
                    minHeight: '80px'
                  }}
                />
              </div>

              <div style={{
                fontSize: '12px',
                color: '#6b7280',
                background: '#eff6ff',
                padding: '12px',
                borderRadius: '8px',
                marginBottom: '20px'
              }}>
                <p style={{ fontWeight: '600', marginBottom: '4px', margin: '0 0 4px 0' }}>
                  📧 Envoi automatique d'un email
                </p>
                <p style={{ margin: 0 }}>
                  Votre client email s'ouvrira avec un message pré-rempli pour l'équipe Golf Buddies
                </p>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '12px'
              }}>
                <button
                  onClick={() => {
                    setShowReportModal(null)
                    setReportReason('inappropriate')
                    setReportDescription('')
                  }}
                  style={{
                    padding: '10px 20px',
                    border: '1px solid #d1d5db',
                    background: 'white',
                    color: '#374151',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f9fafb'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'white'
                  }}
                >
                  Annuler
                </button>
                <button
                  onClick={() => handleReportMessage(showReportModal)}
                  style={{
                    padding: '10px 20px',
                    border: 'none',
                    background: '#ef4444',
                    color: 'white',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#dc2626'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#ef4444'
                  }}
                >
                  Signaler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}