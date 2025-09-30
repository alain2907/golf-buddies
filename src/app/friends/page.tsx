'use client'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useFriends } from '@/hooks/useFriends'
import Footer from '@/components/Footer'
import { Users, Search, UserPlus, Check, X, UserMinus, Clock, Send } from 'lucide-react'

export default function FriendsPage() {
  const { user } = useAuth()
  const {
    friends,
    friendRequests,
    sentRequests,
    loading,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    removeFriend,
    cancelFriendRequest,
    searchUsers,
    getFriendshipStatus
  } = useFriends()

  const [activeTab, setActiveTab] = useState<'friends' | 'requests' | 'search'>('friends')
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [searchLoading, setSearchLoading] = useState(false)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const handleSearch = async () => {
    if (!searchTerm.trim()) return

    setSearchLoading(true)
    try {
      const results = await searchUsers(searchTerm)

      // Ajouter le statut d'amitié pour chaque résultat
      const resultsWithStatus = await Promise.all(
        results.map(async (user) => {
          const status = await getFriendshipStatus(user.uid)
          return { ...user, friendshipStatus: status }
        })
      )

      setSearchResults(resultsWithStatus)
    } catch (error) {
      console.error('Erreur lors de la recherche:', error)
    } finally {
      setSearchLoading(false)
    }
  }

  const handleSendRequest = async (targetUserId: string) => {
    setActionLoading(targetUserId)
    try {
      await sendFriendRequest(targetUserId)
      // Rafraîchir les résultats de recherche
      await handleSearch()
    } catch (error: any) {
      alert(error.message)
    } finally {
      setActionLoading(null)
    }
  }

  const handleAcceptRequest = async (requestId: string) => {
    setActionLoading(requestId)
    try {
      await acceptFriendRequest(requestId)
    } catch (error: any) {
      alert(error.message)
    } finally {
      setActionLoading(null)
    }
  }

  const handleRejectRequest = async (requestId: string) => {
    setActionLoading(requestId)
    try {
      await rejectFriendRequest(requestId)
    } catch (error: any) {
      alert(error.message)
    } finally {
      setActionLoading(null)
    }
  }

  const handleRemoveFriend = async (friendId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet ami ?')) return

    setActionLoading(friendId)
    try {
      await removeFriend(friendId)
    } catch (error: any) {
      alert(error.message)
    } finally {
      setActionLoading(null)
    }
  }

  const handleCancelRequest = async (requestId: string) => {
    setActionLoading(requestId)
    try {
      await cancelFriendRequest(requestId)
    } catch (error: any) {
      alert(error.message)
    } finally {
      setActionLoading(null)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Connexion requise</h1>
          <p>Vous devez être connecté pour accéder à vos amis.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f9fafb', paddingBottom: '80px' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #2D5016 0%, #4A7C2E 50%, #6B9F3F 100%)',
        padding: '32px 24px',
        borderRadius: '0 0 24px 24px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <Users style={{ width: '32px', height: '32px' }} />
            Mes Amis
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '16px' }}>
            Gérez vos amis et trouvez de nouveaux partenaires de golf
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Tabs */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
            {[
              { key: 'friends', label: `Amis (${friends.length})`, icon: Users },
              { key: 'requests', label: `Demandes (${friendRequests.length})`, icon: Clock },
              { key: 'search', label: 'Rechercher', icon: Search }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as any)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '12px',
                  border: 'none',
                  background: activeTab === key ? 'linear-gradient(135deg, #2D5016 0%, #4A7C2E 100%)' : '#f3f4f6',
                  color: activeTab === key ? 'white' : '#6b7280',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s'
                }}
              >
                <Icon style={{ width: '18px', height: '18px' }} />
                {label}
              </button>
            ))}
          </div>

          {/* Contenu des onglets */}
          {activeTab === 'friends' && (
            <div>
              {loading ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <div className="loading-spinner"></div>
                </div>
              ) : friends.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <Users style={{ width: '48px', height: '48px', color: '#9ca3af', margin: '0 auto 16px' }} />
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                    Aucun ami pour le moment
                  </h3>
                  <p style={{ color: '#6b7280' }}>
                    Utilisez l'onglet "Rechercher" pour trouver et ajouter des amis
                  </p>
                </div>
              ) : (
                <div style={{ display: 'grid', gap: '16px' }}>
                  {friends.map((friend) => (
                    <div
                      key={friend.uid}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        padding: '16px',
                        background: '#f9fafb',
                        borderRadius: '12px',
                        border: '1px solid #e5e7eb'
                      }}
                    >
                      <div
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '50%',
                          background: friend.photoURL
                            ? `url(${friend.photoURL})`
                            : 'linear-gradient(135deg, #2D5016 0%, #4A7C2E 100%)',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: '18px'
                        }}
                      >
                        {!friend.photoURL && friend.displayName.charAt(0).toUpperCase()}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px', color: '#111827' }}>
                          {friend.displayName}
                        </h3>
                        <p style={{ color: '#6b7280', fontSize: '14px' }}>
                          {friend.handicap ? `Handicap: ${friend.handicap}` : 'Handicap non renseigné'}
                        </p>
                        {friend.homeClub && (
                          <p style={{ color: '#6b7280', fontSize: '14px' }}>
                            Club: {friend.homeClub}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => handleRemoveFriend(friend.uid)}
                        disabled={actionLoading === friend.uid}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '8px',
                          border: '1px solid #ef4444',
                          background: 'white',
                          color: '#ef4444',
                          fontWeight: '500',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          opacity: actionLoading === friend.uid ? 0.5 : 1
                        }}
                      >
                        <UserMinus style={{ width: '16px', height: '16px' }} />
                        Supprimer
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'requests' && (
            <div>
              {friendRequests.length === 0 && sentRequests.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <Clock style={{ width: '48px', height: '48px', color: '#9ca3af', margin: '0 auto 16px' }} />
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                    Aucune demande d'ami
                  </h3>
                  <p style={{ color: '#6b7280' }}>
                    Les demandes d'amis reçues et envoyées apparaîtront ici
                  </p>
                </div>
              ) : (
                <div style={{ display: 'grid', gap: '24px' }}>
                  {/* Demandes reçues */}
                  {friendRequests.length > 0 && (
                    <div>
                      <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>
                        Demandes reçues ({friendRequests.length})
                      </h3>
                      <div style={{ display: 'grid', gap: '12px' }}>
                        {friendRequests.map((request) => (
                          <div
                            key={request.id}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '16px',
                              padding: '16px',
                              background: '#f0f9ff',
                              borderRadius: '12px',
                              border: '1px solid #bae6fd'
                            }}
                          >
                            <div
                              style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                background: request.fromUserPhoto
                                  ? `url(${request.fromUserPhoto})`
                                  : 'linear-gradient(135deg, #2D5016 0%, #4A7C2E 100%)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '18px'
                              }}
                            >
                              {!request.fromUserPhoto && request.fromUserName.charAt(0).toUpperCase()}
                            </div>
                            <div style={{ flex: 1 }}>
                              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px', color: '#111827' }}>
                                {request.fromUserName}
                              </h3>
                              <p style={{ color: '#6b7280', fontSize: '14px' }}>
                                Demande envoyée le {request.createdAt.toLocaleDateString()}
                              </p>
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button
                                onClick={() => handleAcceptRequest(request.id)}
                                disabled={actionLoading === request.id}
                                style={{
                                  padding: '8px 16px',
                                  borderRadius: '8px',
                                  border: 'none',
                                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                  color: 'white',
                                  fontWeight: '500',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  opacity: actionLoading === request.id ? 0.5 : 1
                                }}
                              >
                                <Check style={{ width: '16px', height: '16px' }} />
                                Accepter
                              </button>
                              <button
                                onClick={() => handleRejectRequest(request.id)}
                                disabled={actionLoading === request.id}
                                style={{
                                  padding: '8px 16px',
                                  borderRadius: '8px',
                                  border: '1px solid #ef4444',
                                  background: 'white',
                                  color: '#ef4444',
                                  fontWeight: '500',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  opacity: actionLoading === request.id ? 0.5 : 1
                                }}
                              >
                                <X style={{ width: '16px', height: '16px' }} />
                                Refuser
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Demandes envoyées */}
                  {sentRequests.length > 0 && (
                    <div>
                      <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>
                        Demandes envoyées ({sentRequests.length})
                      </h3>
                      <div style={{ display: 'grid', gap: '12px' }}>
                        {sentRequests.map((request) => (
                          <div
                            key={request.id}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '16px',
                              padding: '16px',
                              background: '#fef3c7',
                              borderRadius: '12px',
                              border: '1px solid #fde68a'
                            }}
                          >
                            <div
                              style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                background: request.toUserPhoto
                                  ? `url(${request.toUserPhoto})`
                                  : 'linear-gradient(135deg, #2D5016 0%, #4A7C2E 100%)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '18px'
                              }}
                            >
                              {!request.toUserPhoto && request.toUserName.charAt(0).toUpperCase()}
                            </div>
                            <div style={{ flex: 1 }}>
                              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px', color: '#111827' }}>
                                {request.toUserName}
                              </h3>
                              <p style={{ color: '#6b7280', fontSize: '14px' }}>
                                En attente depuis le {request.createdAt.toLocaleDateString()}
                              </p>
                            </div>
                            <button
                              onClick={() => handleCancelRequest(request.id)}
                              disabled={actionLoading === request.id}
                              style={{
                                padding: '8px 16px',
                                borderRadius: '8px',
                                border: '1px solid #ef4444',
                                background: 'white',
                                color: '#ef4444',
                                fontWeight: '500',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                opacity: actionLoading === request.id ? 0.5 : 1
                              }}
                            >
                              <X style={{ width: '16px', height: '16px' }} />
                              Annuler
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'search' && (
            <div>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                <input
                  type="text"
                  placeholder="Rechercher des golfeurs par nom..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '1px solid #d1d5db',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                />
                <button
                  onClick={handleSearch}
                  disabled={searchLoading || !searchTerm.trim()}
                  style={{
                    padding: '12px 24px',
                    borderRadius: '12px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #2D5016 0%, #4A7C2E 100%)',
                    color: 'white',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    opacity: (searchLoading || !searchTerm.trim()) ? 0.5 : 1
                  }}
                >
                  <Search style={{ width: '18px', height: '18px' }} />
                  Rechercher
                </button>
              </div>

              {searchLoading ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <div className="loading-spinner"></div>
                </div>
              ) : searchResults.length === 0 && searchTerm ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <Search style={{ width: '48px', height: '48px', color: '#9ca3af', margin: '0 auto 16px' }} />
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                    Aucun résultat
                  </h3>
                  <p style={{ color: '#6b7280' }}>
                    Aucun golfeur trouvé pour "{searchTerm}"
                  </p>
                </div>
              ) : (
                <div style={{ display: 'grid', gap: '16px' }}>
                  {searchResults.map((result) => (
                    <div
                      key={result.uid}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        padding: '16px',
                        background: '#f9fafb',
                        borderRadius: '12px',
                        border: '1px solid #e5e7eb'
                      }}
                    >
                      <div
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '50%',
                          background: result.photoURL
                            ? `url(${result.photoURL})`
                            : 'linear-gradient(135deg, #2D5016 0%, #4A7C2E 100%)',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: '18px'
                        }}
                      >
                        {!result.photoURL && result.displayName.charAt(0).toUpperCase()}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px', color: '#111827' }}>
                          {result.displayName}
                        </h3>
                        <p style={{ color: '#6b7280', fontSize: '14px' }}>
                          {result.handicap ? `Handicap: ${result.handicap}` : 'Handicap non renseigné'}
                        </p>
                        {result.homeClub && (
                          <p style={{ color: '#6b7280', fontSize: '14px' }}>
                            Club: {result.homeClub}
                          </p>
                        )}
                      </div>
                      {result.friendshipStatus === 'none' && (
                        <button
                          onClick={() => handleSendRequest(result.uid)}
                          disabled={actionLoading === result.uid}
                          style={{
                            padding: '8px 16px',
                            borderRadius: '8px',
                            border: 'none',
                            background: 'linear-gradient(135deg, #2D5016 0%, #4A7C2E 100%)',
                            color: 'white',
                            fontWeight: '500',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            opacity: actionLoading === result.uid ? 0.5 : 1
                          }}
                        >
                          <UserPlus style={{ width: '16px', height: '16px' }} />
                          Ajouter
                        </button>
                      )}
                      {result.friendshipStatus === 'pending_sent' && (
                        <div style={{
                          padding: '8px 16px',
                          borderRadius: '8px',
                          background: '#fef3c7',
                          color: '#92400e',
                          fontWeight: '500',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          <Send style={{ width: '16px', height: '16px' }} />
                          Demande envoyée
                        </div>
                      )}
                      {result.friendshipStatus === 'pending_received' && (
                        <div style={{
                          padding: '8px 16px',
                          borderRadius: '8px',
                          background: '#dbeafe',
                          color: '#1d4ed8',
                          fontWeight: '500',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          <Clock style={{ width: '16px', height: '16px' }} />
                          Demande reçue
                        </div>
                      )}
                      {result.friendshipStatus === 'friends' && (
                        <div style={{
                          padding: '8px 16px',
                          borderRadius: '8px',
                          background: '#dcfce7',
                          color: '#166534',
                          fontWeight: '500',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          <Check style={{ width: '16px', height: '16px' }} />
                          Ami
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}