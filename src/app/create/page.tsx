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
    setTimeout(() => setCurrentStep(2), 300)
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

      router.push(`/events/${eventId}`)

    } catch (error: any) {
      console.error('Error creating event:', error)
      alert('Erreur lors de la création de l\'événement: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '12px', textAlign: 'center', color: '#111827' }}>
              📍 Quel parcours de golf ?
            </h2>
            <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '32px', fontSize: '15px' }}>
              Recherchez et sélectionnez votre golf
            </p>
            <div ref={dropdownRef} style={{ position: 'relative' }}>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setShowCourseDropdown(true)
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
                  transition: 'all 0.2s'
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
                top: '50%',
                transform: 'translateY(-50%)',
                width: '22px',
                height: '22px',
                color: '#9ca3af'
              }} />

              {showCourseDropdown && filteredCourses.length > 0 && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '16px',
                  marginTop: '8px',
                  maxHeight: '400px',
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
          </div>
        )

      case 2:
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
                  setTimeout(() => setCurrentStep(3), 300)
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

      case 3:
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
                    setTimeout(() => setCurrentStep(4), 300)
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

      case 4:
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
                    setTimeout(() => setCurrentStep(5), 300)
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

      case 5:
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
                    setTimeout(() => setCurrentStep(6), 300)
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

      case 6:
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
              <div>
                <div style={{ color: '#6b7280', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>Joueurs</div>
                <div style={{ fontSize: '17px', fontWeight: '600', color: '#111827' }}>{formData.maxPlayers} personnes</div>
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
            {[1, 2, 3, 4, 5, 6].map(step => (
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
    </div>
  )
}
