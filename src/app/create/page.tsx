'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useEvents } from '@/hooks/useEvents'
import { useNotifications } from '@/hooks/useNotifications'
import { useCourses } from '@/hooks/useCourses'
import { processEventCompatibility } from '@/services/compatibilityService'
import Footer from '@/components/Footer'
import { Search } from 'lucide-react'

export default function CreateEventPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuth()
  const { createEvent } = useEvents()
  const { scheduleEventReminders } = useNotifications()
  const { courses, loading: coursesLoading } = useCourses()
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [showCourseDropdown, setShowCourseDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Fermer le dropdown au clic extérieur
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCourseDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  const [formData, setFormData] = useState({
    city: searchParams.get('city') || '',
    title: '',
    course: searchParams.get('course') || '',
    courseId: '',
    date: '',
    time: '',
    maxPlayers: 4,
    description: '',
    level: '',
    handicapIndex: '',
    cartRequired: false,
    gameFormat: '18_holes',
    gameType: 'friendly',
    playStyle: 'stroke_play',
    challenges: [] as string[],
    inviteMode: 'community',
    teeTime: ''
  })

  // Filtrer les golfs selon la recherche et la proximité
  const filteredCourses = courses.filter(course => {
    const matchesSearch = searchTerm === '' ||
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.city.toLowerCase().includes(searchTerm.toLowerCase())


    return matchesSearch
  }).sort((a, b) => {
    // Tri par proximité avec la ville renseignée
    if (formData.city) {
      const aCityMatch = a.city.toLowerCase().includes(formData.city.toLowerCase()) ||
                        a.region.toLowerCase().includes(formData.city.toLowerCase())
      const bCityMatch = b.city.toLowerCase().includes(formData.city.toLowerCase()) ||
                        b.region.toLowerCase().includes(formData.city.toLowerCase())

      if (aCityMatch && !bCityMatch) return -1
      if (!aCityMatch && bCityMatch) return 1
    }
    return a.name.localeCompare(b.name)
  })

  const handleCourseSelect = (course: any) => {
    setFormData({
      ...formData,
      course: course.name,
      courseId: course.id,
      city: course.city
    })
    setShowCourseDropdown(false)
    setSearchTerm(course.name)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      alert('Vous devez être connecté pour créer un événement')
      return
    }

    setLoading(true)

    try {
      // Combine date and time into a Date object
      const eventDateTime = new Date(`${formData.date}T${formData.time}`)

      // Create the event data matching GolfEvent interface
      const eventData: any = {
        title: formData.title,
        description: formData.description || '',
        type: 'casual_round' as const,
        courseId: formData.courseId || '',
        courseName: formData.course,
        date: eventDateTime,
        time: formData.time,
        maxPlayers: formData.maxPlayers,
        currentPlayers: [user.uid],
        organizerId: user.uid,
        organizerName: user.displayName || user.email,
        organizerPhoto: user.photoURL || '',
        requirements: {
          experienceLevel: (formData.level as 'beginner' | 'intermediate' | 'advanced' | 'all') || 'all'
        },
        format: 'casual' as const,
        cartIncluded: formData.cartRequired,
        walkingAllowed: !formData.cartRequired,
        location: {
          address: formData.course,
          city: formData.city,
          country: 'France'
        },
        status: 'upcoming' as const,
        createdAt: new Date(),
        updatedAt: new Date(),
        // Nouveaux champs ajoutés
        gameFormat: formData.gameFormat,
        playStyle: formData.playStyle,
        challenges: formData.challenges,
        inviteMode: formData.inviteMode as 'community' | 'friends'
      }

      // Ajouter handicapIndex seulement s'il est défini
      if (formData.handicapIndex) {
        eventData.handicapIndex = parseFloat(formData.handicapIndex)
      }

      const eventId = await createEvent(eventData)

      // Programmer les rappels automatiques pour l'organisateur
      try {
        await scheduleEventReminders(
          user.uid,
          eventId,
          formData.title,
          eventDateTime
        )
      } catch (error) {
        console.error('Error scheduling reminders:', error)
        // Ne pas bloquer la création de l'événement si les rappels échouent
      }

      // Détecter et notifier les événements compatibles
      try {
        const createdEvent = { ...eventData, id: eventId, inviteMode: formData.inviteMode as 'community' | 'friends' }
        await processEventCompatibility(createdEvent)
      } catch (error) {
        console.error('Error processing compatibility:', error)
        // Ne pas bloquer la création de l'événement si la détection échoue
      }

      // Redirect to the created event
      router.push(`/events/${eventId}`)

    } catch (error: any) {
      console.error('Error creating event:', error)
      alert('Erreur lors de la création de l\'événement: ' + error.message)
    } finally {
      setLoading(false)
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
            <span style={{ fontSize: '36px' }}>🏌️</span>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', margin: 0 }}>
              Créer une disponibilité golf
            </h1>
          </div>
          <p style={{ color: '#6b7280', fontSize: '16px', margin: 0 }}>
            Proposez votre créneau et trouvez vos partenaires de jeu
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          padding: '48px'
        }}>
          <form onSubmit={handleSubmit}>
            {/* City */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>
                <span style={{ fontSize: '16px', marginRight: '4px' }}>🏙️</span>
                Ville
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                placeholder="ex: Paris, Lyon, Marseille..."
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#4A7C2E'
                  e.target.style.boxShadow = '0 0 0 2px rgba(74, 124, 46, 0.2)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db'
                  e.target.style.boxShadow = 'none'
                }}
                required
              />
            </div>

            {/* Event Title */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>
                <span style={{ fontSize: '16px', marginRight: '4px' }}>📝</span>
                Titre de votre disponibilité
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="ex: Recherche partenaires pour 18 trous"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#4A7C2E'
                  e.target.style.boxShadow = '0 0 0 2px rgba(74, 124, 46, 0.2)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db'
                  e.target.style.boxShadow = 'none'
                }}
                required
              />
            </div>

            {/* Golf Course */}
            <div style={{ marginBottom: '24px', position: 'relative' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>
                <span style={{ fontSize: '16px', marginRight: '4px' }}>📍</span>
                Golf
              </label>
              <div ref={dropdownRef} style={{ position: 'relative' }}>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setShowCourseDropdown(true)
                  }}
                  onFocus={() => setShowCourseDropdown(true)}
                  placeholder="Rechercher un golf ou saisir un nom..."
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    paddingLeft: '40px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                  required
                />
                <Search style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '20px',
                  height: '20px',
                  color: '#9ca3af'
                }} />

                {/* Dropdown des golfs */}
                {showCourseDropdown && filteredCourses.length > 0 && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    background: 'white',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    marginTop: '4px',
                    maxHeight: '400px',
                    overflowY: 'auto',
                    zIndex: 10,
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }}>
                    {filteredCourses.map(course => (
                      <div
                        key={course.id}
                        onClick={() => handleCourseSelect(course)}
                        style={{
                          padding: '12px 16px',
                          cursor: 'pointer',
                          borderBottom: '1px solid #f3f4f6',
                          transition: 'background 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#f3f4f6'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                      >
                        <div style={{ fontWeight: '500' }}>{course.name}</div>
                        <div style={{ fontSize: '12px', color: '#6b7280' }}>
                          {course.city} • {course.region} • {course.holes} trous
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {formData.courseId && (
                <p style={{ fontSize: '12px', color: '#4A7C2E', marginTop: '4px' }}>
                  ✅ Golf sélectionné dans notre base de données
                </p>
              )}
            </div>


            {/* Date & Time */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  <span style={{ fontSize: '16px' }}>📅</span>
                  Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.2s, box-shadow 0.2s'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#4A7C2E'
                    e.target.style.boxShadow = '0 0 0 2px rgba(74, 124, 46, 0.2)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db'
                    e.target.style.boxShadow = 'none'
                  }}
                  required
                />
              </div>

              <div>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  <span style={{ fontSize: '16px' }}>⏰</span>
                  Tee Time
                </label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none',
                    backgroundColor: 'white',
                    transition: 'border-color 0.2s, box-shadow 0.2s'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#4A7C2E'
                    e.target.style.boxShadow = '0 0 0 2px rgba(74, 124, 46, 0.2)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db'
                    e.target.style.boxShadow = 'none'
                  }}
                  required
                >
                  <option value="">Choisir un créneau</option>
                  <option value="07:00">07:00 - Départ matinal</option>
                  <option value="07:30">07:30</option>
                  <option value="08:00">08:00</option>
                  <option value="08:30">08:30</option>
                  <option value="09:00">09:00</option>
                  <option value="09:30">09:30</option>
                  <option value="10:00">10:00</option>
                  <option value="10:30">10:30</option>
                  <option value="11:00">11:00</option>
                  <option value="11:30">11:30</option>
                  <option value="12:00">12:00</option>
                  <option value="12:30">12:30</option>
                  <option value="13:00">13:00</option>
                  <option value="13:30">13:30</option>
                  <option value="14:00">14:00</option>
                  <option value="14:30">14:30</option>
                  <option value="15:00">15:00</option>
                  <option value="15:30">15:30</option>
                  <option value="16:00">16:00</option>
                  <option value="16:30">16:30</option>
                  <option value="17:00">17:00</option>
                  <option value="17:30">17:30</option>
                  <option value="18:00">18:00 - Dernier départ</option>
                </select>
              </div>
            </div>

            {/* Format de jeu */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>
                <span style={{ fontSize: '16px', marginRight: '4px' }}>🏌️</span>
                Format de jeu
              </label>
              <select
                value={formData.gameFormat}
                onChange={(e) => setFormData({...formData, gameFormat: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  backgroundColor: 'white',
                  transition: 'border-color 0.2s, box-shadow 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#4A7C2E'
                  e.target.style.boxShadow = '0 0 0 2px rgba(74, 124, 46, 0.2)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db'
                  e.target.style.boxShadow = 'none'
                }}
                required
              >
                <option value="9_holes">9 trous</option>
                <option value="18_holes">18 trous</option>
                <option value="competition_friendly">Compétition amicale</option>
                <option value="practice_training">Entraînement practice</option>
              </select>
            </div>

            {/* Type de jeu */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>
                <span style={{ fontSize: '16px', marginRight: '4px' }}>🎯</span>
                Type de jeu
              </label>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: '12px'
              }}>
                {[
                  { value: 'stroke_play', label: 'Stroke Play', desc: 'Compter tous les coups' },
                  { value: 'match_play', label: 'Match Play', desc: 'Trou par trou' },
                  { value: 'friendly', label: 'Partie amicale', desc: 'Décontracté' }
                ].map(type => (
                  <label
                    key={type.value}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: '16px 12px',
                      border: formData.playStyle === type.value ? '2px solid #4A7C2E' : '1px solid #d1d5db',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      backgroundColor: formData.playStyle === type.value ? '#E8F5E9' : 'white'
                    }}
                  >
                    <input
                      type="radio"
                      name="playStyle"
                      value={type.value}
                      checked={formData.playStyle === type.value}
                      onChange={() => setFormData({...formData, playStyle: type.value})}
                      style={{ display: 'none' }}
                    />
                    <span style={{
                      fontWeight: formData.playStyle === type.value ? '600' : '500',
                      color: formData.playStyle === type.value ? '#2D5016' : '#374151',
                      fontSize: '14px',
                      textAlign: 'center',
                      marginBottom: '4px'
                    }}>
                      {type.label}
                    </span>
                    <span style={{
                      fontSize: '12px',
                      color: '#6b7280',
                      textAlign: 'center'
                    }}>
                      {type.desc}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Nombre de joueurs */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>
                <span style={{ fontSize: '16px', marginRight: '4px' }}>👥</span>
                Nombre de joueurs recherchés
              </label>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
                gap: '12px'
              }}>
                {[2, 3, 4].map(num => (
                  <label
                    key={num}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '12px',
                      border: formData.maxPlayers === num ? '2px solid #4A7C2E' : '1px solid #d1d5db',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      backgroundColor: formData.maxPlayers === num ? '#E8F5E9' : 'white',
                      fontSize: '14px'
                    }}
                  >
                    <input
                      type="radio"
                      name="maxPlayers"
                      value={num}
                      checked={formData.maxPlayers === num}
                      onChange={() => setFormData({...formData, maxPlayers: num})}
                      style={{ display: 'none' }}
                    />
                    <span style={{
                      fontWeight: formData.maxPlayers === num ? '600' : '400',
                      color: formData.maxPlayers === num ? '#2D5016' : '#374151',
                      whiteSpace: 'nowrap'
                    }}>
                      {num} joueurs
                    </span>
                  </label>
                ))}
              </div>
              <p style={{
                fontSize: '12px',
                color: '#6b7280',
                marginTop: '8px',
                textAlign: 'center'
              }}>
                Vous êtes inclus dans ce nombre total
              </p>
            </div>

            {/* Niveau et Index */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  <span style={{ fontSize: '16px', marginRight: '4px' }}>🎯</span>
                  Niveau (optionnel)
                </label>
                <select
                  value={formData.level}
                  onChange={(e) => setFormData({...formData, level: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none',
                    backgroundColor: 'white',
                    transition: 'border-color 0.2s, box-shadow 0.2s'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#4A7C2E'
                    e.target.style.boxShadow = '0 0 0 2px rgba(74, 124, 46, 0.2)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db'
                    e.target.style.boxShadow = 'none'
                  }}
                >
                  <option value="">Tous niveaux</option>
                  <option value="beginner">Débutant</option>
                  <option value="intermediate">Intermédiaire</option>
                  <option value="advanced">Confirmé</option>
                </select>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  <span style={{ fontSize: '16px', marginRight: '4px' }}>🏆</span>
                  Index (optionnel)
                </label>
                <input
                  type="number"
                  min="0"
                  max="54"
                  step="0.1"
                  value={formData.handicapIndex}
                  onChange={(e) => setFormData({...formData, handicapIndex: e.target.value})}
                  placeholder="ex: 18.5"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.2s, box-shadow 0.2s'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#4A7C2E'
                    e.target.style.boxShadow = '0 0 0 2px rgba(74, 124, 46, 0.2)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>
            </div>

            <div style={{
              background: '#E8F5E9',
              border: '1px solid #C1E6C3',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '24px'
            }}>
              <p style={{
                fontSize: '14px',
                color: '#2D5016',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>💡</span>
                <span>
                  <strong>Astuce :</strong> Indiquer votre niveau et index aide à trouver des partenaires compatibles pour une meilleure expérience de jeu.
                </span>
              </p>
            </div>

            {/* Cart */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <input
                type="checkbox"
                id="cartRequired"
                checked={formData.cartRequired}
                onChange={(e) => setFormData({...formData, cartRequired: e.target.checked})}
                style={{
                  width: '16px',
                  height: '16px',
                  accentColor: '#4A7C2E'
                }}
              />
              <label htmlFor="cartRequired" style={{
                marginLeft: '8px',
                fontSize: '14px',
                color: '#374151'
              }}>
                Voiturette obligatoire
              </label>
            </div>

            {/* Challenges et règles optionnels */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>
                <span style={{ fontSize: '16px', marginRight: '4px' }}>🏆</span>
                Challenges et règles spéciales (optionnel)
              </label>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px',
                marginBottom: '12px'
              }}>
                {[
                  { value: 'longest_drive', label: '🚀 Concours de drive', desc: 'Plus long drive' },
                  { value: 'closest_pin', label: '🎯 Proche du drapeau', desc: 'Approche la plus proche' },
                  { value: 'putting_contest', label: '⛳ Concours de putting', desc: 'Meilleur putteur' },
                  { value: 'scramble', label: '🤝 Scramble', desc: 'Jeu en équipe' },
                  { value: 'skins_game', label: '💰 Skins Game', desc: 'Chaque trou un prix' },
                  { value: 'nassau', label: '🏌️ Nassau', desc: '3 paris en 1' }
                ].map(challenge => (
                  <label
                    key={challenge.value}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '12px',
                      border: formData.challenges.includes(challenge.value) ? '2px solid #4A7C2E' : '1px solid #d1d5db',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      backgroundColor: formData.challenges.includes(challenge.value) ? '#E8F5E9' : 'white'
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={formData.challenges.includes(challenge.value)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({...formData, challenges: [...formData.challenges, challenge.value]})
                        } else {
                          setFormData({...formData, challenges: formData.challenges.filter(c => c !== challenge.value)})
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontWeight: formData.challenges.includes(challenge.value) ? '600' : '500',
                        color: formData.challenges.includes(challenge.value) ? '#2D5016' : '#374151',
                        fontSize: '14px',
                        marginBottom: '2px'
                      }}>
                        {challenge.label}
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: '#6b7280'
                      }}>
                        {challenge.desc}
                      </div>
                    </div>
                    {formData.challenges.includes(challenge.value) && (
                      <span style={{ color: '#4A7C2E', fontSize: '16px' }}>✓</span>
                    )}
                  </label>
                ))}
              </div>
              {formData.challenges.length > 0 && (
                <div style={{
                  background: '#FEF3C7',
                  border: '1px solid #F59E0B',
                  borderRadius: '8px',
                  padding: '12px',
                  marginTop: '12px'
                }}>
                  <p style={{
                    fontSize: '14px',
                    color: '#92400E',
                    margin: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span>⚡</span>
                    <span>
                      Challenges sélectionnés : {formData.challenges.length}. N'oubliez pas de préciser les détails dans la description !
                    </span>
                  </p>
                </div>
              )}
            </div>

            {/* Mode d'invitation */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>
                <span style={{ fontSize: '16px', marginRight: '4px' }}>👥</span>
                Qui peut rejoindre votre partie ?
              </label>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '12px'
              }}>
                {[
                  {
                    value: 'friends',
                    label: 'Mes amis uniquement',
                    desc: 'Invitation privée',
                    icon: '🔒'
                  },
                  {
                    value: 'community',
                    label: 'Ouvert à tous',
                    desc: 'Visible par tous',
                    icon: '🌟'
                  }
                ].map(mode => (
                  <label
                    key={mode.value}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '16px 12px',
                      border: formData.inviteMode === mode.value ? '2px solid #4A7C2E' : '1px solid #d1d5db',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      backgroundColor: formData.inviteMode === mode.value ? '#E8F5E9' : 'white'
                    }}
                  >
                    <input
                      type="radio"
                      name="inviteMode"
                      value={mode.value}
                      checked={formData.inviteMode === mode.value}
                      onChange={() => setFormData({...formData, inviteMode: mode.value})}
                      style={{ display: 'none' }}
                    />
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '6px'
                    }}>
                      <span style={{ fontSize: '18px' }}>{mode.icon}</span>
                      <span style={{
                        fontWeight: formData.inviteMode === mode.value ? '600' : '500',
                        color: formData.inviteMode === mode.value ? '#2D5016' : '#374151',
                        fontSize: '14px'
                      }}>
                        {mode.label}
                      </span>
                    </div>
                    <span style={{
                      fontSize: '11px',
                      color: '#6b7280',
                      textAlign: 'left'
                    }}>
                      {mode.desc}
                    </span>
                  </label>
                ))}
              </div>

              {formData.inviteMode === 'friends' && (
                <div style={{
                  background: '#EBF8FF',
                  border: '1px solid #3B82F6',
                  borderRadius: '8px',
                  padding: '12px',
                  marginTop: '12px'
                }}>
                  <p style={{
                    fontSize: '14px',
                    color: '#1E40AF',
                    margin: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span>📧</span>
                    <span>
                      Vous pourrez inviter vos amis par email ou via l'application après la création de l'événement.
                    </span>
                  </p>
                </div>
              )}

              {formData.inviteMode === 'community' && (
                <div style={{
                  background: '#F0FDF4',
                  border: '1px solid #22C55E',
                  borderRadius: '8px',
                  padding: '12px',
                  marginTop: '12px'
                }}>
                  <p style={{
                    fontSize: '14px',
                    color: '#15803D',
                    margin: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span>🌟</span>
                    <span>
                      Votre partie sera visible dans la recherche publique. Parfait pour rencontrer de nouveaux partenaires !
                    </span>
                  </p>
                </div>
              )}
            </div>

            {/* Description */}
            <div style={{ marginBottom: '32px' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>
                <span style={{ fontSize: '16px' }}>💬</span>
                Description (optionnel)
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Ajoutez des détails sur votre partie..."
                rows={4}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                  transition: 'border-color 0.2s, box-shadow 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#4A7C2E'
                  e.target.style.boxShadow = '0 0 0 2px rgba(74, 124, 46, 0.2)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>

            {/* Submit Button */}
            <div style={{ display: 'flex', gap: '16px' }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  flex: 1,
                  background: loading
                    ? '#9ca3af'
                    : 'linear-gradient(135deg, #4A7C2E 0%, #6B9F3F 100%)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '500',
                  padding: '16px 24px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.transform = 'translateY(-1px)'
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(74, 124, 46, 0.3)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }
                }}
              >
                {loading && (
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid white',
                    borderTop: '2px solid transparent',
                    borderRadius: '50%'
                  }} className="animate-spin" />
                )}
                {loading ? 'Création en cours...' : 'Créer l\'événement'}
              </button>
              <button
                type="button"
                style={{
                  background: '#f3f4f6',
                  color: '#374151',
                  border: 'none',
                  fontWeight: '500',
                  padding: '16px 24px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#e5e7eb'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f3f4f6'
                }}
              >
                Annuler
              </button>
            </div>
          </form>
        </div>

        {/* Tips */}
        <div style={{
          marginTop: '32px',
          background: '#dbeafe',
          borderRadius: '12px',
          padding: '24px'
        }}>
          <h3 style={{
            fontWeight: '600',
            color: '#1e3a8a',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ fontSize: '20px' }}>💡</span>
            Conseils pour une partie réussie
          </h3>
          <ul style={{
            fontSize: '14px',
            color: '#1e40af',
            listStyle: 'none',
            padding: 0,
            margin: 0
          }}>
            <li style={{ marginBottom: '8px' }}>• Soyez précis sur l&apos;heure et le lieu de rendez-vous</li>
            <li style={{ marginBottom: '8px' }}>• Mentionnez si la réservation est déjà faite ou à faire</li>
            <li style={{ marginBottom: '8px' }}>• Précisez le niveau de jeu pour éviter les mauvaises surprises</li>
            <li style={{ marginBottom: '8px' }}>• N&apos;hésitez pas à ajouter vos coordonnées dans la description</li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  )
}