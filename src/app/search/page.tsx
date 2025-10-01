'use client'
import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useEvents } from '@/hooks/useEvents'
import { useEventsWithFriends } from '@/hooks/useEventsWithFriends'
import { Search, MapPin, Calendar, Users, Clock, Target, Filter, ChevronRight, Star } from 'lucide-react'
import Footer from '@/components/Footer'
import { golfCourses } from '@/data/golf-courses'

export default function SearchPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { events: allEvents, joinEvent } = useEvents()
  const { events: friendFilteredEvents } = useEventsWithFriends()

  // Utiliser les événements filtrés par amis si l'utilisateur est connecté
  const events = user ? friendFilteredEvents : allEvents
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilters, setSelectedFilters] = useState({
    date: '',
    course: '',
    gameFormat: '',
    level: '',
    handicapRange: ''
  })

  // Filtrer les événements disponibles
  const availableEvents = useMemo(() => {
    if (!events) return []

    return events.filter(event => {
      // Uniquement les événements futurs avec places disponibles
      const eventDate = new Date(event.date)
      const now = new Date()
      const hasAvailableSpots = event.currentPlayers.length < event.maxPlayers
      const isFuture = eventDate > now
      const isNotOrganizer = event.organizerId !== user?.uid
      const isNotAlreadyJoined = !event.currentPlayers.includes(user?.uid || '')

      if (!hasAvailableSpots || !isFuture || !isNotOrganizer || !isNotAlreadyJoined) {
        return false
      }

      // Filtres de recherche
      const matchesSearch = searchQuery === '' ||
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.organizerName.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesDate = selectedFilters.date === '' ||
        eventDate.toDateString() === new Date(selectedFilters.date).toDateString()

      const matchesCourse = selectedFilters.course === '' ||
        event.courseName.toLowerCase().includes(selectedFilters.course.toLowerCase())

      const matchesFormat = selectedFilters.gameFormat === '' ||
        event.format === selectedFilters.gameFormat

      const matchesLevel = selectedFilters.level === '' ||
        event.requirements?.experienceLevel === selectedFilters.level ||
        event.requirements?.experienceLevel === 'all'

      return matchesSearch && matchesDate && matchesCourse && matchesFormat && matchesLevel
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [events, searchQuery, selectedFilters, user])

  const handleJoinEvent = async (eventId: string) => {
    if (!user) {
      router.push('/login')
      return
    }

    try {
      await joinEvent(eventId, user.uid, user.displayName, user.photoURL, user.handicap)
      router.push(`/events/${eventId}`)
    } catch (error: any) {
      alert('Erreur lors de la demande de participation: ' + error.message)
    }
  }

  const getGameFormatLabel = (format: string) => {
    const formats: Record<string, string> = {
      '9_holes': '9 trous',
      '18_holes': '18 trous',
      'competition_friendly': 'Compétition amicale',
      'practice_training': 'Entraînement practice'
    }
    return formats[format] || format
  }

  const getLevelLabel = (level: string) => {
    const levels: Record<string, string> = {
      'beginner': 'Débutant',
      'intermediate': 'Intermédiaire',
      'advanced': 'Confirmé',
      'all': 'Tous niveaux'
    }
    return levels[level] || level
  }

  const formatEventDate = (date: Date) => {
    const now = new Date()
    const eventDate = new Date(date)
    const diffTime = eventDate.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Aujourd'hui"
    if (diffDays === 1) return "Demain"
    if (diffDays <= 7) return `Dans ${diffDays} jours`

    return eventDate.toLocaleDateString('fr-FR', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', paddingBottom: '80px' }}>
      {/* Header avec gradient */}
      <div style={{
        background: 'linear-gradient(135deg, #2D5016 0%, #4A7C2E 50%, #6B9F3F 100%)',
        padding: '32px 24px',
        borderRadius: '0 0 24px 24px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <Target style={{ width: '32px', height: '32px' }} />
            Recherche de partenaires
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '16px' }}>
            Trouvez le flight parfait et rejoignez des golfeurs près de chez vous
          </p>

          {/* Barre de recherche dans le header */}
          <div style={{
            marginTop: '20px',
            background: 'white',
            borderRadius: '12px',
            padding: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <Search style={{ width: '20px', height: '20px', color: '#9ca3af' }} />
            <input
              type="text"
              placeholder="Rechercher par golf, organisateur, ville..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: '16px',
                padding: '4px'
              }}
            />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        {/* Filtres avancés */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          padding: '24px',
          marginBottom: '24px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '16px'
          }}>
            <Filter style={{ width: '20px', height: '20px', color: '#4A7C2E' }} />
            <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>
              Filtres de recherche
            </h3>
            <div style={{
              background: '#E8F5E9',
              color: '#2D5016',
              padding: '2px 8px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: '500'
            }}>
              {availableEvents.length} flight{availableEvents.length > 1 ? 's' : ''} trouvé{availableEvents.length > 1 ? 's' : ''}
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px'
          }}>
            {/* Date */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>
                <Calendar style={{ width: '16px', height: '16px', display: 'inline', marginRight: '4px' }} />
                Date
              </label>
              <input
                type="date"
                value={selectedFilters.date}
                onChange={(e) => setSelectedFilters({...selectedFilters, date: e.target.value})}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>

            {/* Parcours */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>
                <MapPin style={{ width: '16px', height: '16px', display: 'inline', marginRight: '4px' }} />
                Parcours
              </label>
              <input
                type="text"
                value={selectedFilters.course}
                onChange={(e) => setSelectedFilters({...selectedFilters, course: e.target.value})}
                placeholder="Nom du golf ou ville"
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>

            {/* Type de partie */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>
                🏌️ Type de partie
              </label>
              <select
                value={selectedFilters.gameFormat}
                onChange={(e) => setSelectedFilters({...selectedFilters, gameFormat: e.target.value})}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              >
                <option value="">Tous types</option>
                <option value="9_holes">9 trous</option>
                <option value="18_holes">18 trous</option>
                <option value="competition_friendly">Compétition amicale</option>
                <option value="practice_training">Entraînement</option>
              </select>
            </div>

            {/* Niveau */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>
                <Target style={{ width: '16px', height: '16px', display: 'inline', marginRight: '4px' }} />
                Niveau
              </label>
              <select
                value={selectedFilters.level}
                onChange={(e) => setSelectedFilters({...selectedFilters, level: e.target.value})}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              >
                <option value="">Tous niveaux</option>
                <option value="beginner">Débutant</option>
                <option value="intermediate">Intermédiaire</option>
                <option value="advanced">Confirmé</option>
              </select>
            </div>
          </div>
        </div>

        {/* Résultats */}
        {availableEvents.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 400px), 1fr))',
            gap: '20px'
          }}>
            {availableEvents.map((event) => (
              <div
                key={event.id}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  transition: 'all 0.2s',
                  border: '2px solid transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#4A7C2E'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'transparent'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)'
                }}
              >
                {/* Header de la carte */}
                <div style={{
                  background: 'linear-gradient(135deg, #4A7C2E 0%, #6B9F3F 100%)',
                  padding: '16px 20px',
                  color: 'white'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>
                        {event.title}
                      </h3>
                      <div style={{ fontSize: '14px', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin style={{ width: '14px', height: '14px' }} />
                        {event.courseName}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '12px', opacity: 0.8 }}>
                        {formatEventDate(new Date(event.date))}
                      </div>
                      <div style={{ fontSize: '16px', fontWeight: '600' }}>
                        {event.time}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Corps de la carte */}
                <div style={{ padding: '20px' }}>
                  {/* Informations du jeu */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '12px',
                    marginBottom: '16px',
                    paddingBottom: '16px',
                    borderBottom: '1px solid #e5e7eb'
                  }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '18px', fontWeight: '600', color: '#2D5016' }}>
                        {event.currentPlayers.length}/{event.maxPlayers}
                      </div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>Joueurs</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '18px', fontWeight: '600', color: '#2D5016' }}>
                        {getGameFormatLabel(event.format || '18_holes')}
                      </div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>Format</div>
                    </div>
                  </div>

                  {/* Organisateur */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '16px'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #4A7C2E 0%, #6B9F3F 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '16px'
                    }}>
                      {event.organizerName?.charAt(0) || 'G'}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '500', fontSize: '14px' }}>
                        {event.organizerName || 'Organisateur'}
                      </div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>
                        {event.requirements?.experienceLevel ? getLevelLabel(event.requirements.experienceLevel) : 'Niveau non spécifié'}
                      </div>
                    </div>
                  </div>

                  {/* Places disponibles */}
                  <div style={{
                    background: '#E8F5E9',
                    border: '1px solid #C1E6C3',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    marginBottom: '16px',
                    fontSize: '14px',
                    color: '#2D5016',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px'
                  }}>
                    <Users style={{ width: '16px', height: '16px' }} />
                    {event.maxPlayers - event.currentPlayers.length} place{event.maxPlayers - event.currentPlayers.length > 1 ? 's' : ''} disponible{event.maxPlayers - event.currentPlayers.length > 1 ? 's' : ''}
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => router.push(`/events/${event.id}`)}
                      style={{
                        flex: 1,
                        background: 'white',
                        border: '1px solid #d1d5db',
                        padding: '10px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px'
                      }}
                    >
                      Voir détails
                      <ChevronRight style={{ width: '14px', height: '14px' }} />
                    </button>
                    <button
                      onClick={() => handleJoinEvent(event.id)}
                      style={{
                        flex: 2,
                        background: '#4A7C2E',
                        color: 'white',
                        border: 'none',
                        padding: '10px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px'
                      }}
                    >
                      🚀 Rejoindre ce flight
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            padding: '48px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🚀</div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '600',
              marginBottom: '12px',
              color: '#2D5016'
            }}>
              Aucun flight trouvé pour vos critères
            </h3>
            <p style={{
              color: '#6b7280',
              marginBottom: '24px',
              fontSize: '16px',
              lineHeight: '1.5'
            }}>
              👉 Créez votre propre disponibilité et invitez d'autres golfeurs à vous rejoindre !
              <br />
              <span style={{ fontSize: '14px', fontStyle: 'italic' }}>
                🏆 Soyez le premier organisateur et débloquez le badge "Premier Flight"
              </span>
            </p>

            {/* Suggestions personnalisées selon les filtres */}
            {(selectedFilters.date || selectedFilters.course || selectedFilters.level !== '' || selectedFilters.gameFormat !== '') && (
              <div style={{
                background: '#FEF3C7',
                border: '1px solid #F59E0B',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '24px',
                fontSize: '14px',
                color: '#92400E'
              }}>
                💡 <strong>Suggestion :</strong> Aucun flight le{' '}
                {selectedFilters.date && new Date(selectedFilters.date).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'numeric'
                })}{' '}
                {selectedFilters.course && `à ${selectedFilters.course}`}{' '}
                {selectedFilters.level && `pour le niveau "${getLevelLabel(selectedFilters.level)}"`}.
                <br />
                <strong>Lancez le vôtre pour être le premier à jouer !</strong>
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => router.push('/create')}
                style={{
                  background: 'linear-gradient(135deg, #4A7C2E 0%, #6B9F3F 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '14px 28px',
                  borderRadius: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '16px',
                  boxShadow: '0 4px 12px rgba(74, 124, 46, 0.3)',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(74, 124, 46, 0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(74, 124, 46, 0.3)'
                }}
              >
                ⛳ Créer ma disponibilité
              </button>

              {(searchQuery || Object.values(selectedFilters).some(filter => filter !== '')) && (
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedFilters({
                      date: '',
                      course: '',
                      gameFormat: '',
                      level: '',
                      handicapRange: ''
                    })
                  }}
                  style={{
                    background: 'white',
                    border: '2px solid #d1d5db',
                    padding: '12px 24px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#6b7280',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#4A7C2E'
                    e.currentTarget.style.color = '#4A7C2E'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#d1d5db'
                    e.currentTarget.style.color = '#6b7280'
                  }}
                >
                  🔄 Effacer les filtres
                </button>
              )}
            </div>

            {/* Motivation supplémentaire */}
            <div style={{
              marginTop: '32px',
              padding: '20px',
              background: 'linear-gradient(135deg, #E8F5E9 0%, #F1F8E9 100%)',
              borderRadius: '12px',
              border: '1px solid #C1E6C3'
            }}>
              <div style={{ fontSize: '20px', marginBottom: '8px' }}>🌟</div>
              <p style={{
                fontSize: '14px',
                color: '#2D5016',
                margin: 0,
                fontWeight: '500'
              }}>
                <strong>Astuce :</strong> Les organisateurs de flights ont 3x plus de chances de jouer régulièrement !
              </p>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}