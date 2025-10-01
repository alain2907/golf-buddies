'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { UserBlockingService } from '@/lib/userBlocking'
import { User } from '@/types'
import { ChevronLeft, ShieldOff, UserX } from 'lucide-react'
import toast from 'react-hot-toast'

export default function BlockedUsersPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [blockedUsers, setBlockedUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }

    loadBlockedUsers()
  }, [user])

  const loadBlockedUsers = async () => {
    if (!user) return

    try {
      setLoading(true)
      const users = await UserBlockingService.getBlockedUsers(user.uid)
      setBlockedUsers(users)
    } catch (error) {
      console.error('Error loading blocked users:', error)
      toast.error('Erreur lors du chargement')
    } finally {
      setLoading(false)
    }
  }

  const handleUnblock = async (userId: string) => {
    if (!user) return

    try {
      await UserBlockingService.unblockUser(user.uid, userId)
      setBlockedUsers(blockedUsers.filter(u => u.uid !== userId))
      toast.success('Utilisateur débloqué')
    } catch (error) {
      toast.error('Erreur lors du déblocage')
    }
  }

  if (!user) return null

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f5f5 0%, #e8f5e9 100%)',
      paddingBottom: '80px'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #2D5016 0%, #4A7C2E 100%)',
        paddingTop: '20px',
        paddingBottom: '20px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <button
            onClick={() => router.push('/settings')}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '12px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
          >
            <ChevronLeft style={{ width: '16px', height: '16px' }} />
            Retour
          </button>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{ fontSize: '24px' }}>🚫</span>
            <h1 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'white',
              margin: 0
            }}>
              Utilisateurs bloqués
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '32px 20px'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '32px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          {loading ? (
            <div style={{
              textAlign: 'center',
              padding: '40px 0',
              color: '#6b7280'
            }}>
              Chargement...
            </div>
          ) : blockedUsers.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px'
            }}>
              <UserX style={{
                width: '64px',
                height: '64px',
                color: '#d1d5db',
                margin: '0 auto 16px'
              }} />
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Aucun utilisateur bloqué
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                margin: 0
              }}>
                Vous n'avez bloqué aucun utilisateur pour le moment
              </p>
            </div>
          ) : (
            <>
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                marginBottom: '24px'
              }}>
                Les utilisateurs bloqués ne peuvent pas rejoindre vos événements et vous ne voyez pas leurs messages.
              </p>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                {blockedUsers.map((blockedUser) => (
                  <div
                    key={blockedUser.uid}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '16px',
                      background: '#f9fafb',
                      borderRadius: '12px',
                      border: '1px solid #e5e7eb',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      flex: 1
                    }}>
                      {blockedUser.photoURL ? (
                        <img
                          src={blockedUser.photoURL}
                          alt={blockedUser.displayName}
                          style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            objectFit: 'cover'
                          }}
                        />
                      ) : (
                        <div style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '50%',
                          background: '#4A7C2E',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '20px',
                          fontWeight: 'bold'
                        }}>
                          {blockedUser.displayName.charAt(0).toUpperCase()}
                        </div>
                      )}

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          fontSize: '16px',
                          fontWeight: '600',
                          color: '#111827',
                          marginBottom: '4px'
                        }}>
                          {blockedUser.displayName}
                        </div>
                        {blockedUser.homeClub && (
                          <div style={{
                            fontSize: '14px',
                            color: '#6b7280'
                          }}>
                            {blockedUser.homeClub}
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleUnblock(blockedUser.uid)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 16px',
                        background: 'white',
                        color: '#4A7C2E',
                        border: '1px solid #4A7C2E',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#4A7C2E'
                        e.currentTarget.style.color = 'white'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'white'
                        e.currentTarget.style.color = '#4A7C2E'
                      }}
                    >
                      <ShieldOff style={{ width: '16px', height: '16px' }} />
                      Débloquer
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
