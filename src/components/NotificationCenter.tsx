'use client'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Bell, X, Check, CheckCheck, Trash2 } from 'lucide-react'
import { useNotifications } from '@/hooks/useNotifications'
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'

interface NotificationCenterProps {
  className?: string
}

export default function NotificationCenter({ className = '' }: NotificationCenterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    deleteNotification
  } = useNotifications()

  // Fermer au clic extérieur
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'join_request':
        return '👋'
      case 'join_request_accepted':
        return '✅'
      case 'join_request_rejected':
        return '❌'
      case 'new_compatible_event':
        return '🎯'
      case 'event_reminder_24h':
        return '📅'
      case 'event_reminder_1h':
        return '⏰'
      case 'flight_complete':
        return '✅'
      case 'player_joined':
        return '👥'
      case 'player_left':
        return '👋'
      case 'event_cancelled':
        return '❌'
      case 'event_updated':
        return '📝'
      default:
        return '🔔'
    }
  }

  const handleNotificationClick = async (notificationId: string, read: boolean, eventId?: string) => {
    if (!read) {
      await markAsRead(notificationId)
    }

    // Naviguer vers l'événement si disponible
    if (eventId) {
      setIsOpen(false)
      router.push(`/events/${eventId}`)
    }
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Bouton notification */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'relative',
          padding: '8px',
          borderRadius: '8px',
          border: 'none',
          background: 'white',
          cursor: 'pointer',
          transition: 'background 0.2s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#f3f4f6'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'white'
        }}
      >
        <Bell style={{ width: '20px', height: '20px', color: '#6b7280' }} />
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '2px',
            right: '2px',
            background: '#ef4444',
            color: 'white',
            borderRadius: '10px',
            width: '20px',
            height: '20px',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '600'
          }}>
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown notifications */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          marginTop: '8px',
          width: '380px',
          maxHeight: '500px',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
          border: '1px solid #e5e7eb',
          zIndex: 1000,
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#111827',
              margin: 0
            }}>
              Notifications
            </h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  style={{
                    padding: '4px 8px',
                    border: 'none',
                    background: '#4A7C2E',
                    color: 'white',
                    borderRadius: '6px',
                    fontSize: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <CheckCheck style={{ width: '12px', height: '12px' }} />
                  Tout lire
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  padding: '4px',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  borderRadius: '4px'
                }}
              >
                <X style={{ width: '16px', height: '16px', color: '#6b7280' }} />
              </button>
            </div>
          </div>

          {/* Liste des notifications */}
          <div style={{
            maxHeight: '400px',
            overflowY: 'auto'
          }}>
            {loading ? (
              <div style={{
                padding: '40px 20px',
                textAlign: 'center',
                color: '#6b7280'
              }}>
                Chargement des notifications...
              </div>
            ) : notifications.length === 0 ? (
              <div style={{
                padding: '40px 20px',
                textAlign: 'center',
                color: '#6b7280'
              }}>
                <Bell style={{ width: '48px', height: '48px', margin: '0 auto 16px', opacity: 0.3 }} />
                <p style={{ margin: 0, fontSize: '14px' }}>
                  Aucune notification pour le moment
                </p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification.id, notification.read, notification.eventId)}
                  style={{
                    padding: '16px 20px',
                    borderBottom: '1px solid #f3f4f6',
                    cursor: notification.eventId ? 'pointer' : 'default',
                    background: notification.read ? 'white' : '#f0f9ff',
                    transition: 'background 0.2s',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = notification.read ? '#f9fafb' : '#e0f2fe'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = notification.read ? 'white' : '#f0f9ff'
                  }}
                >
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{
                      fontSize: '20px',
                      flexShrink: 0,
                      marginTop: '2px'
                    }}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#111827',
                        marginBottom: '4px'
                      }}>
                        {notification.title}
                      </div>
                      <div style={{
                        fontSize: '13px',
                        color: '#6b7280',
                        lineHeight: '1.4',
                        marginBottom: '8px'
                      }}>
                        {notification.message}
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: '#9ca3af'
                      }}>
                        {formatDistanceToNow(notification.createdAt, { addSuffix: true, locale: fr })}
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {!notification.read && (
                        <div style={{
                          width: '8px',
                          height: '8px',
                          background: '#3b82f6',
                          borderRadius: '50%'
                        }} />
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteNotification(notification.id)
                        }}
                        style={{
                          padding: '4px',
                          border: 'none',
                          background: 'transparent',
                          cursor: 'pointer',
                          borderRadius: '4px',
                          opacity: 0.5
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.opacity = '1'
                          e.currentTarget.style.background = '#fee2e2'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.opacity = '0.5'
                          e.currentTarget.style.background = 'transparent'
                        }}
                      >
                        <Trash2 style={{ width: '12px', height: '12px', color: '#ef4444' }} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}