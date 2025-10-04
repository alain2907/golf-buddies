'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useEvents } from '@/hooks/useEvents'
import { useNotifications } from '@/hooks/useNotifications'
import { useCourses } from '@/hooks/useCourses'
import { processEventCompatibility } from '@/services/compatibilityService'
import Footer from '@/components/Footer'
import { Search, ChevronLeft } from 'lucide-react'

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
  const [currentStep, setCurrentStep] = useState(1)
  const [showShareModal, setShowShareModal] = useState(false)
  const [createdEventId, setCreatedEventId] = useState<string | null>(null)

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

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCourseDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filteredCourses = courses.filter(course => {
    const matchesSearch = searchTerm === '' ||
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.city.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  }).sort((a, b) => {
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
    setTimeout(() => setCurrentStep(4), 300)
  }

  const handleSubmit = async () => {
    if (!user) {
      alert('Vous devez être connecté pour créer un événement')
      return
    }

    setLoading(true)

    try {
      const eventDateTime = new Date(`${formData.date}T${formData.time}`)

      const eventData: any = {
        title: formData.title || `Partie golf - ${formData.course}`,
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
        gameFormat: formData.gameFormat,
        playStyle: formData.playStyle,
        challenges: formData.challenges,
        inviteMode: formData.inviteMode as 'community' | 'friends'
      }

      if (formData.handicapIndex) {
        eventData.handicapIndex = parseFloat(formData.handicapIndex)
      }

      const eventId = await createEvent(eventData)

      try {
        await scheduleEventReminders(
          user.uid,
          eventId,
          formData.title || `Partie golf - ${formData.course}`,
          eventDateTime
        )
      } catch (error) {
        console.error('Error scheduling reminders:', error)
      }

      try {
        const createdEvent = { ...eventData, id: eventId, inviteMode: formData.inviteMode as 'community' | 'friends' }
        await processEventCompatibility(createdEvent)
      } catch (error) {
        console.error('Error processing compatibility:', error)
      }

      // Afficher le modal de partage au lieu de rediriger immédiatement
      setCreatedEventId(eventId)
      setShowShareModal(true)

    } catch (error: any) {
      console.error('Error creating event:', error)
      alert('Erreur lors de la création de l\'événement: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      // Étape 1: Ville
      case 1:
        return (
          <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '12px', textAlign: 'center', color: '#111827' }}>
              🏙️ Dans quelle ville ?
            </h2>
            <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '32px', fontSize: '15px' }}>
              Cela nous aide à filtrer les golfs proches
            </p>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({...formData, city: e.target.value})}
              placeholder="ex: Paris, Lyon, Marseille..."
              autoFocus
              style={{
                width: '100%',
                padding: '18px 20px',
                border: '2px solid #e5e7eb',
                borderRadius: '16px',
                fontSize: '17px',
                outline: 'none',
                transition: 'all 0.2s',
                marginBottom: '16px'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#4A7C2E'
                e.target.style.boxShadow = '0 0 0 3px rgba(74, 124, 46, 0.1)'
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = 'none'
              }}
            />
            <button
              type="button"
              onClick={() => formData.city && setCurrentStep(2)}
              disabled={!formData.city}
              style={{
                padding: '18px',
                background: formData.city ? 'linear-gradient(135deg, #4A7C2E 0%, #6B9F3F 100%)' : '#e5e7eb',
                color: formData.city ? 'white' : '#9ca3af',
                border: 'none',
                borderRadius: '16px',
                fontSize: '17px',
                fontWeight: '600',
                cursor: formData.city ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s'
              }}
            >
              Continuer
            </button>
          </div>
        )

      // Étape 2: Nom de l'événement
      case 2:
        return (
          <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '12px', textAlign: 'center', color: '#111827' }}>
              📝 Nom de votre partie
            </h2>
            <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '32px', fontSize: '15px' }}>
              Un titre accrocheur pour attirer des joueurs
            </p>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="ex: Partie amicale 18 trous"
              autoFocus
              style={{
                width: '100%',
                padding: '18px 20px',
                border: '2px solid #e5e7eb',
                borderRadius: '16px',
                fontSize: '17px',
                outline: 'none',
                transition: 'all 0.2s',
                marginBottom: '16px'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#4A7C2E'
                e.target.style.boxShadow = '0 0 0 3px rgba(74, 124, 46, 0.1)'
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = 'none'
              }}
            />
            <button
              type="button"
              onClick={() => formData.title && setCurrentStep(3)}
              disabled={!formData.title}
              style={{
                padding: '18px',
                background: formData.title ? 'linear-gradient(135deg, #4A7C2E 0%, #6B9F3F 100%)' : '#e5e7eb',
                color: formData.title ? 'white' : '#9ca3af',
                border: 'none',
                borderRadius: '16px',
                fontSize: '17px',
                fontWeight: '600',
                cursor: formData.title ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s'
              }}
            >
              Continuer
            </button>
          </div>
        )

      // Étape 3: Parcours
      case 3:
        return (
          <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '12px', textAlign: 'center', color: '#111827' }}>
              📍 Quel parcours de golf ?
            </h2>
            <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '32px', fontSize: '15px' }}>
              Recherchez dans la liste ou saisissez le nom
            </p>
            <div ref={dropdownRef} style={{ position: 'relative' }}>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setShowCourseDropdown(true)
                  // Mise à jour du nom du parcours même si pas dans la liste
                  setFormData({...formData, course: e.target.value})
                }}
                placeholder="Rechercher un golf..."
                autoFocus
                style={{
                  width: '100%',
                  padding: '18px 20px',
                  paddingLeft: '52px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '16px',
                  fontSize: '17px',
                  outline: 'none',
                  transition: 'all 0.2s',
                  marginBottom: '16px'
                }}
                onFocus={(e) => {
                  setShowCourseDropdown(true)
                  e.target.style.borderColor = '#4A7C2E'
                  e.target.style.boxShadow = '0 0 0 3px rgba(74, 124, 46, 0.1)'
                }}
                onBlur={(e) => {
                  e.target.style.boxShadow = 'none'
                }}
              />
              <Search style={{
                position: 'absolute',
                left: '18px',
                top: '18px',
                width: '22px',
                height: '22px',
                color: '#9ca3af'
              }} />

              {showCourseDropdown && filteredCourses.length > 0 && (
                <div style={{
                  position: 'absolute',
                  top: '60px',
                  left: 0,
                  right: 0,
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '16px',
                  marginTop: '8px',
                  maxHeight: '300px',
                  overflowY: 'auto',
                  zIndex: 10,
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                }}>
                  {filteredCourses.map(course => (
                    <div
                      key={course.id}
                      onClick={() => handleCourseSelect(course)}
                      style={{
                        padding: '18px 20px',
                        cursor: 'pointer',
                        borderBottom: '1px solid #f3f4f6',
                        transition: 'background 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                    >
                      <div style={{ fontWeight: '600', fontSize: '16px', marginBottom: '4px', color: '#111827' }}>{course.name}</div>
                      <div style={{ fontSize: '14px', color: '#6b7280' }}>
                        {course.city} • {course.region} • {course.holes} trous
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bouton pour continuer avec un golf non listé */}
            {searchTerm && filteredCourses.length === 0 && (
              <div style={{
                background: '#fef3c7',
                border: '1px solid #f59e0b',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '16px'
              }}>
                <p style={{ fontSize: '14px', color: '#92400e', margin: 0, marginBottom: '12px' }}>
                  Golf non trouvé dans notre liste. Vous pouvez continuer avec "{searchTerm}"
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      course: searchTerm,
                      courseId: '',
                      city: formData.city
                    })
                    setShowCourseDropdown(false)
                    setTimeout(() => setCurrentStep(4), 300)
                  }}
                  style={{
                    padding: '12px 20px',
                    background: '#f59e0b',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '15px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    width: '100%'
                  }}
                >
                  Continuer avec ce golf
                </button>
              </div>
            )}
          </div>
        )

      // Étape 4: Date
      case 4:
        return (
          <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '8px', textAlign: 'center', color: '#111827' }}>
              📅 Quelle date ?
            </h2>
            <p style={{ color: '#6b7280', textAlign: 'center', marginBottom: '32px', fontSize: '15px' }}>
              {formData.course}
            </p>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => {
                setFormData({...formData, date: e.target.value})
                if (e.target.value) {
                  setTimeout(() => setCurrentStep(5), 300)
                }
              }}
              min={new Date().toISOString().split('T')[0]}
              autoFocus
              style={{
                width: '100%',
                padding: '18px 20px',
                border: '2px solid #e5e7eb',
                borderRadius: '16px',
                fontSize: '17px',
                outline: 'none',
                transition: 'all 0.2s'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#4A7C2E'
                e.target.style.boxShadow = '0 0 0 3px rgba(74, 124, 46, 0.1)'
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = 'none'
              }}
            />
          </div>
        )

      // Étape 5: Heure
      case 5:
        return (
          <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '32px', textAlign: 'center', color: '#111827' }}>
              ⏰ Quelle heure ?
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px',
              maxHeight: '450px',
              overflowY: 'auto',
              padding: '4px'
            }}>
              {[
                '07:00', '07:30', '08:00', '08:30', '09:00', '09:30',
                '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
                '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
                '16:00', '16:30', '17:00', '17:30'
              ].map(time => (
                <button
                  key={time}
                  type="button"
                  onClick={() => {
                    setFormData({...formData, time})
                    setTimeout(() => setCurrentStep(6), 300)
                  }}
                  style={{
                    padding: '18px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '17px',
                    fontWeight: '500',
                    background: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    color: '#111827'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#4A7C2E'
                    e.currentTarget.style.background = '#E8F5E9'
                    e.currentTarget.style.transform = 'scale(1.02)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb'
                    e.currentTarget.style.background = 'white'
                    e.currentTarget.style.transform = 'scale(1)'
                  }}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )

      // Étape 6: Format de jeu
      case 6:
        return (
          <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '32px', textAlign: 'center', color: '#111827' }}>
              🏌️ Format de jeu ?
            </h2>
            <div style={{ display: 'grid', gap: '14px' }}>
              {[
                { value: '9_holes', label: '9 trous', icon: '⛳', desc: 'Partie rapide' },
                { value: '18_holes', label: '18 trous', icon: '⛳⛳', desc: 'Partie complète' },
                { value: 'competition_friendly', label: 'Compétition amicale', icon: '🏆', desc: 'Avec classement' },
                { value: 'practice_training', label: 'Entraînement', icon: '🎯', desc: 'Practice & jeu' }
              ].map(format => (
                <button
                  key={format.value}
                  type="button"
                  onClick={() => {
                    setFormData({...formData, gameFormat: format.value})
                    setTimeout(() => setCurrentStep(7), 300)
                  }}
                  style={{
                    padding: '20px 24px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '17px',
                    fontWeight: '500',
                    background: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    color: '#111827'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#4A7C2E'
                    e.currentTarget.style.background = '#E8F5E9'
                    e.currentTarget.style.transform = 'translateX(4px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb'
                    e.currentTarget.style.background = 'white'
                    e.currentTarget.style.transform = 'translateX(0)'
                  }}
                >
                  <span style={{ fontSize: '28px' }}>{format.icon}</span>
                  <div style={{ flex: 1, textAlign: 'left' }}>
                    <div style={{ fontWeight: '600', marginBottom: '2px' }}>{format.label}</div>
                    <div style={{ fontSize: '13px', color: '#6b7280' }}>{format.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )

      // Étape 7: Nombre de joueurs
      case 7:
        return (
          <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '32px', textAlign: 'center', color: '#111827' }}>
              👥 Combien de joueurs ?
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {[2, 3, 4].map(num => (
                <button
                  key={num}
                  type="button"
                  onClick={() => {
                    setFormData({...formData, maxPlayers: num})
                    setTimeout(() => setCurrentStep(8), 300)
                  }}
                  style={{
                    padding: '40px 20px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '16px',
                    fontSize: '32px',
                    fontWeight: '700',
                    background: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    color: '#111827'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#4A7C2E'
                    e.currentTarget.style.background = '#E8F5E9'
                    e.currentTarget.style.transform = 'scale(1.05)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb'
                    e.currentTarget.style.background = 'white'
                    e.currentTarget.style.transform = 'scale(1)'
                  }}
                >
                  {num}
                </button>
              ))}
            </div>
            <p style={{ textAlign: 'center', color: '#6b7280', marginTop: '20px', fontSize: '14px' }}>
              Vous êtes inclus dans ce nombre
            </p>
          </div>
        )

      // Étape 8: Niveau recherché
      case 8:
        return (
          <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '32px', textAlign: 'center', color: '#111827' }}>
              🎯 Quel niveau recherchez-vous ?
            </h2>
            <div style={{ display: 'grid', gap: '14px' }}>
              {[
                { value: '', label: 'Tous niveaux', icon: '🌟', desc: 'Ouvert à tous' },
                { value: 'beginner', label: 'Débutant', icon: '🌱', desc: 'Première année' },
                { value: 'intermediate', label: 'Intermédiaire', icon: '⚡', desc: 'Quelques années' },
                { value: 'advanced', label: 'Confirmé', icon: '🏆', desc: 'Joueur régulier' }
              ].map(level => (
                <button
                  key={level.value}
                  type="button"
                  onClick={() => {
                    setFormData({...formData, level: level.value})
                    setTimeout(() => setCurrentStep(9), 300)
                  }}
                  style={{
                    padding: '20px 24px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '17px',
                    fontWeight: '500',
                    background: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    color: '#111827'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#4A7C2E'
                    e.currentTarget.style.background = '#E8F5E9'
                    e.currentTarget.style.transform = 'translateX(4px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb'
                    e.currentTarget.style.background = 'white'
                    e.currentTarget.style.transform = 'translateX(0)'
                  }}
                >
                  <span style={{ fontSize: '28px' }}>{level.icon}</span>
                  <div style={{ flex: 1, textAlign: 'left' }}>
                    <div style={{ fontWeight: '600', marginBottom: '2px' }}>{level.label}</div>
                    <div style={{ fontSize: '13px', color: '#6b7280' }}>{level.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )

      // Étape 9: Index (optionnel)
      case 9:
        return (
          <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '12px', textAlign: 'center', color: '#111827' }}>
              🏆 Votre index ?
            </h2>
            <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '32px', fontSize: '15px' }}>
              Optionnel - Vous pouvez passer cette étape
            </p>
            <input
              type="number"
              min="0"
              max="54"
              step="0.1"
              value={formData.handicapIndex}
              onChange={(e) => setFormData({...formData, handicapIndex: e.target.value})}
              placeholder="ex: 18.5"
              autoFocus
              style={{
                width: '100%',
                padding: '18px 20px',
                border: '2px solid #e5e7eb',
                borderRadius: '16px',
                fontSize: '17px',
                outline: 'none',
                transition: 'all 0.2s',
                marginBottom: '16px'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#4A7C2E'
                e.target.style.boxShadow = '0 0 0 3px rgba(74, 124, 46, 0.1)'
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = 'none'
              }}
            />
            <button
              type="button"
              onClick={() => setCurrentStep(10)}
              style={{
                padding: '18px',
                background: 'linear-gradient(135deg, #4A7C2E 0%, #6B9F3F 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '16px',
                fontSize: '17px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {formData.handicapIndex ? 'Continuer' : 'Passer cette étape'}
            </button>
          </div>
        )

      // Étape 10: Pour qui ?
      case 10:
        return (
          <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '32px', textAlign: 'center', color: '#111827' }}>
              👥 Qui peut rejoindre ?
            </h2>
            <div style={{ display: 'grid', gap: '14px' }}>
              {[
                {
                  value: 'community',
                  label: 'Ouvert à tous',
                  icon: '🌟',
                  desc: 'Visible dans la recherche publique'
                },
                {
                  value: 'friends',
                  label: 'Mes amis uniquement',
                  icon: '🔒',
                  desc: 'Invitation privée'
                }
              ].map(mode => (
                <button
                  key={mode.value}
                  type="button"
                  onClick={() => {
                    setFormData({...formData, inviteMode: mode.value})
                    setTimeout(() => setCurrentStep(11), 300)
                  }}
                  style={{
                    padding: '20px 24px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '17px',
                    fontWeight: '500',
                    background: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    color: '#111827'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#4A7C2E'
                    e.currentTarget.style.background = '#E8F5E9'
                    e.currentTarget.style.transform = 'translateX(4px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb'
                    e.currentTarget.style.background = 'white'
                    e.currentTarget.style.transform = 'translateX(0)'
                  }}
                >
                  <span style={{ fontSize: '28px' }}>{mode.icon}</span>
                  <div style={{ flex: 1, textAlign: 'left' }}>
                    <div style={{ fontWeight: '600', marginBottom: '2px' }}>{mode.label}</div>
                    <div style={{ fontSize: '13px', color: '#6b7280' }}>{mode.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )

      // Étape 11: Récapitulatif
      case 11:
        return (
          <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '32px', textAlign: 'center', color: '#111827' }}>
              ✨ Récapitulatif
            </h2>
            <div style={{
              background: '#f9fafb',
              borderRadius: '16px',
              padding: '28px',
              marginBottom: '28px',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ marginBottom: '20px' }}>
                <div style={{ color: '#6b7280', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>Titre</div>
                <div style={{ fontSize: '17px', fontWeight: '600', color: '#111827' }}>{formData.title}</div>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <div style={{ color: '#6b7280', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>Parcours</div>
                <div style={{ fontSize: '17px', fontWeight: '600', color: '#111827' }}>{formData.course}</div>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <div style={{ color: '#6b7280', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>Date et heure</div>
                <div style={{ fontSize: '17px', fontWeight: '600', color: '#111827' }}>
                  {new Date(formData.date).toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long'
                  })} à {formData.time}
                </div>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <div style={{ color: '#6b7280', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>Format</div>
                <div style={{ fontSize: '17px', fontWeight: '600', color: '#111827' }}>
                  {formData.gameFormat === '18_holes' ? '18 trous' :
                   formData.gameFormat === '9_holes' ? '9 trous' :
                   formData.gameFormat === 'competition_friendly' ? 'Compétition amicale' :
                   'Entraînement'}
                </div>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <div style={{ color: '#6b7280', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>Joueurs</div>
                <div style={{ fontSize: '17px', fontWeight: '600', color: '#111827' }}>{formData.maxPlayers} personnes</div>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <div style={{ color: '#6b7280', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>Niveau</div>
                <div style={{ fontSize: '17px', fontWeight: '600', color: '#111827' }}>
                  {formData.level === 'beginner' ? 'Débutant' :
                   formData.level === 'intermediate' ? 'Intermédiaire' :
                   formData.level === 'advanced' ? 'Confirmé' :
                   'Tous niveaux'}
                </div>
              </div>
              {formData.handicapIndex && (
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ color: '#6b7280', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>Index</div>
                  <div style={{ fontSize: '17px', fontWeight: '600', color: '#111827' }}>{formData.handicapIndex}</div>
                </div>
              )}
              <div>
                <div style={{ color: '#6b7280', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>Visibilité</div>
                <div style={{ fontSize: '17px', fontWeight: '600', color: '#111827' }}>
                  {formData.inviteMode === 'community' ? 'Ouvert à tous' : 'Mes amis uniquement'}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              style={{
                padding: '18px',
                background: loading ? '#9ca3af' : 'linear-gradient(135deg, #4A7C2E 0%, #6B9F3F 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '16px',
                fontSize: '18px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                boxShadow: loading ? 'none' : '0 4px 12px rgba(74, 124, 46, 0.3)'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(74, 124, 46, 0.4)'
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(74, 124, 46, 0.3)'
                }
              }}
            >
              {loading ? 'Création en cours...' : '🎉 Créer ma disponibilité'}
            </button>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', paddingBottom: '80px' }}>
      {/* Header avec progression */}
      <div style={{
        background: 'white',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        borderBottom: '1px solid #e5e7eb',
        padding: '16px 20px',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          {currentStep > 1 && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              style={{
                background: 'none',
                border: 'none',
                color: '#4A7C2E',
                fontSize: '15px',
                fontWeight: '500',
                cursor: 'pointer',
                padding: '8px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                marginBottom: '14px'
              }}
            >
              <ChevronLeft size={20} />
              Retour
            </button>
          )}
          <div style={{
            display: 'flex',
            gap: '6px',
            marginTop: '4px'
          }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(step => (
              <div
                key={step}
                style={{
                  flex: 1,
                  height: '3px',
                  borderRadius: '2px',
                  background: step <= currentStep ? '#4A7C2E' : '#e5e7eb',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 24px' }}>
        {renderStep()}
      </div>

      <Footer />

      {/* Modal de partage */}
      {showShareModal && createdEventId && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '24px',
            maxWidth: '500px',
            width: '100%',
            padding: '32px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            animation: 'slideUp 0.3s ease'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #4A7C2E 0%, #6B9F3F 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                fontSize: '32px'
              }}>
                ✓
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px', color: '#111827' }}>
                Partie créée !
              </h2>
              <p style={{ color: '#6b7280', fontSize: '15px' }}>
                Invitez vos amis à rejoindre la partie
              </p>
            </div>

            <div style={{ marginBottom: '24px' }}>
              {(() => {
                const eventUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/events/${createdEventId}`
                const appStoreUrl = 'https://play.google.com/store/apps/details?id=com.golf.buddies'
                const shareText = `🏌️ Rejoins ma partie de golf "${formData.title || 'Partie golf'}" au ${formData.course} le ${formData.date} à ${formData.time} !\n\nVoir la partie : ${eventUrl}\n\nTélécharge Golf Buddies : ${appStoreUrl}`
                const encodedText = encodeURIComponent(shareText)

                return (
                  <>
                    <div style={{ marginBottom: '12px' }}>
                      <button
                        onClick={() => {
                          window.open(`https://wa.me/?text=${encodedText}`, '_blank')
                        }}
                        style={{
                          width: '100%',
                          padding: '16px',
                          background: '#25D366',
                          color: 'white',
                          border: 'none',
                          borderRadius: '12px',
                          fontSize: '16px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '12px',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                        Partager sur WhatsApp
                      </button>
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                      <button
                        onClick={() => {
                          window.location.href = `sms:?&body=${encodedText}`
                        }}
                        style={{
                          width: '100%',
                          padding: '16px',
                          background: '#007AFF',
                          color: 'white',
                          border: 'none',
                          borderRadius: '12px',
                          fontSize: '16px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '12px',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                        </svg>
                        Partager par SMS
                      </button>
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                      <button
                        onClick={() => {
                          window.location.href = `mailto:?subject=${encodeURIComponent(`🏌️ Partie de golf - ${formData.title || 'Golf Buddies'}`)}&body=${encodedText}`
                        }}
                        style={{
                          width: '100%',
                          padding: '16px',
                          background: '#EA4335',
                          color: 'white',
                          border: 'none',
                          borderRadius: '12px',
                          fontSize: '16px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '12px',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                        </svg>
                        Partager par Email
                      </button>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(eventUrl)
                          alert('Lien copié !')
                        }}
                        style={{
                          width: '100%',
                          padding: '16px',
                          background: '#f3f4f6',
                          color: '#374151',
                          border: 'none',
                          borderRadius: '12px',
                          fontSize: '16px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '12px',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#e5e7eb'}
                        onMouseLeave={(e) => e.currentTarget.style.background = '#f3f4f6'}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                        </svg>
                        Copier le lien
                      </button>
                    </div>
                  </>
                )
              })()}
            </div>

            <button
              onClick={() => {
                setShowShareModal(false)
                router.push(`/events/${createdEventId}`)
              }}
              style={{
                width: '100%',
                padding: '16px',
                background: '#4A7C2E',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              Voir ma partie
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
