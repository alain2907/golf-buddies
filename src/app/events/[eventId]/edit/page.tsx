'use client'
import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useEvent } from '@/hooks/useEvents'
import Footer from '@/components/Footer'
import { golfCourses } from '@/data/golf-courses'
import { Search } from 'lucide-react'
import { updateEvent } from '@/lib/firestore'
import toast from 'react-hot-toast'

export default function EditEventPage() {
  const params = useParams()
  const router = useRouter()
  const eventId = params.eventId as string
  const { user } = useAuth()
  const { event, loading: eventLoading } = useEvent(eventId)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [showCourseDropdown, setShowCourseDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const [formData, setFormData] = useState({
    city: '',
    title: '',
    course: '',
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
  })

  // Charger les données de l'événement
  useEffect(() => {
    if (event) {
      const eventDate = new Date(event.date)
      const dateStr = eventDate.toISOString().split('T')[0]
      const eventAny = event as any

      setFormData({
        city: event.location.city || '',
        title: event.title,
        course: event.courseName,
        courseId: event.courseId || '',
        date: dateStr,
        time: event.time,
        maxPlayers: event.maxPlayers,
        description: event.description || '',
        level: event.requirements?.experienceLevel || '',
        handicapIndex: eventAny.handicapIndex?.toString() || '',
        cartRequired: event.cartIncluded || false,
        gameFormat: eventAny.gameFormat || '18_holes',
        gameType: 'friendly',
        playStyle: eventAny.playStyle || 'stroke_play',
        challenges: eventAny.challenges || [],
        inviteMode: eventAny.inviteMode || 'community',
      })
    }
  }, [event])

  // Vérifier que l'utilisateur est l'organisateur
  useEffect(() => {
    if (!eventLoading && event && user && event.organizerId !== user.uid) {
      toast.error('Vous n\'êtes pas autorisé à modifier cet événement')
      router.push(`/events/${eventId}`)
    }
  }, [event, user, eventLoading, router, eventId])

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

  const filteredCourses = golfCourses.filter(course => {
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
    setSearchTerm('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user || !event) {
      toast.error('Erreur lors de la modification')
      return
    }

    setLoading(true)

    try {
      const eventDateTime = new Date(`${formData.date}T${formData.time}`)

      const eventData: any = {
        title: formData.title,
        description: formData.description || '',
        courseName: formData.course,
        courseId: formData.courseId || '',
        date: eventDateTime,
        time: formData.time,
        maxPlayers: formData.maxPlayers,
        requirements: {
          experienceLevel: (formData.level as 'beginner' | 'intermediate' | 'advanced' | 'all') || 'all'
        },
        cartIncluded: formData.cartRequired,
        walkingAllowed: !formData.cartRequired,
        location: {
          address: formData.course,
          city: formData.city,
          country: 'France'
        },
        updatedAt: new Date(),
        gameFormat: formData.gameFormat,
        playStyle: formData.playStyle,
        challenges: formData.challenges,
        inviteMode: formData.inviteMode as 'community' | 'friends'
      }

      if (formData.handicapIndex) {
        eventData.handicapIndex = parseFloat(formData.handicapIndex)
      }

      await updateEvent(eventId, eventData)

      toast.success('Événement modifié avec succès !')
      router.push(`/events/${eventId}`)
    } catch (error) {
      console.error('Error updating event:', error)
      toast.error('Erreur lors de la modification de l\'événement')
    } finally {
      setLoading(false)
    }
  }

  if (eventLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loading-spinner"></div>
      </div>
    )
  }

  if (!event || event.organizerId !== user?.uid) {
    return null
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f3f4f6', paddingBottom: '80px' }}>
      <div style={{
        background: 'linear-gradient(135deg, #2D5016 0%, #4A7C2E 50%, #6B9F3F 100%)',
        color: 'white',
        padding: '40px 20px',
        marginBottom: '32px'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>
            ✏️ Modifier l&apos;événement
          </h1>
          <p style={{ fontSize: '16px', opacity: 0.9 }}>
            Modifiez les informations de votre partie de golf
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
        <form onSubmit={handleSubmit} style={{
          background: 'white',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          {/* Titre */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#111827' }}>
              Titre de la partie *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '16px'
              }}
              placeholder="Ex: Partie amicale au Golf National"
            />
          </div>

          {/* Parcours */}
          <div style={{ marginBottom: '24px', position: 'relative' }} ref={dropdownRef}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#111827' }}>
              Parcours de golf *
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={searchTerm || formData.course}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setShowCourseDropdown(true)
                }}
                onFocus={() => setShowCourseDropdown(true)}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 44px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  fontSize: '16px'
                }}
                placeholder="Rechercher un parcours..."
              />
              <Search style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '20px',
                height: '20px',
                color: '#6b7280'
              }} />
            </div>

            {showCourseDropdown && filteredCourses.length > 0 && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                marginTop: '4px',
                background: 'white',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                maxHeight: '300px',
                overflowY: 'auto',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                zIndex: 10
              }}>
                {filteredCourses.slice(0, 10).map((course) => (
                  <div
                    key={course.id}
                    onClick={() => handleCourseSelect(course)}
                    style={{
                      padding: '12px 16px',
                      cursor: 'pointer',
                      borderBottom: '1px solid #f3f4f6'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                  >
                    <div style={{ fontWeight: '600', marginBottom: '2px' }}>{course.name}</div>
                    <div style={{ fontSize: '13px', color: '#6b7280' }}>{course.city}, {course.region}</div>
                  </div>
                ))}
              </div>
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
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#111827' }}>
                Date *
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  fontSize: '16px'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#111827' }}>
                Heure du tee time *
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  fontSize: '16px'
                }}
              />
            </div>
          </div>

          {/* Type de jeu */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '12px', fontWeight: '600', color: '#111827' }}>
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
                    marginBottom: '4px'
                  }}>
                    {type.label}
                  </span>
                  <span style={{ fontSize: '11px', color: '#6b7280' }}>{type.desc}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Nombre de joueurs */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '12px', fontWeight: '600', color: '#111827' }}>
              Nombre de joueurs recherchés *
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
          </div>

          {/* Niveau et Index */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '24px'
          }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#111827' }}>
                Niveau requis
              </label>
              <select
                value={formData.level}
                onChange={(e) => setFormData({...formData, level: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  fontSize: '16px'
                }}
              >
                <option value="">Tous niveaux</option>
                <option value="beginner">Débutant</option>
                <option value="intermediate">Intermédiaire</option>
                <option value="advanced">Confirmé</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#111827' }}>
                Index de handicap (optionnel)
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.handicapIndex}
                onChange={(e) => setFormData({...formData, handicapIndex: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  fontSize: '16px'
                }}
                placeholder="Ex: 18.5"
              />
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#111827' }}>
              Description (optionnel)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={4}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '16px',
                resize: 'vertical'
              }}
              placeholder="Ajoutez des détails sur la partie..."
            />
          </div>

          {/* Mode d'invitation */}
          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', marginBottom: '12px', fontWeight: '600', color: '#111827' }}>
              Qui peut voir cette partie ?
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
          </div>

          {/* Boutons */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={() => router.push(`/events/${eventId}`)}
              style={{
                padding: '14px 28px',
                borderRadius: '8px',
                border: '2px solid #d1d5db',
                background: 'white',
                color: '#374151',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '14px 28px',
                borderRadius: '8px',
                border: 'none',
                background: loading ? '#9ca3af' : 'linear-gradient(135deg, #4A7C2E 0%, #6B9F3F 100%)',
                color: 'white',
                fontSize: '16px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {loading ? 'Modification...' : 'Enregistrer les modifications'}
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  )
}
