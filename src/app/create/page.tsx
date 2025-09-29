'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useEvents } from '@/hooks/useEvents'

export default function CreateEventPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { createEvent } = useEvents()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    city: '',
    title: '',
    course: '',
    date: '',
    time: '',
    maxPlayers: 4,
    description: '',
    level: '',
    cartRequired: false
  })

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
      const eventData = {
        title: formData.title,
        description: formData.description || '',
        type: 'casual_round' as const,
        courseId: '', // We'll use courseName for now
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
        updatedAt: new Date()
      }

      const eventId = await createEvent(eventData)

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
            <span style={{ fontSize: '36px' }}>⚽</span>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', margin: 0 }}>
              Créer un événement
            </h1>
          </div>
          <p style={{ color: '#6b7280', fontSize: '16px', margin: 0 }}>
            Organisez votre prochaine partie de golf
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
                Titre de l&apos;événement
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="ex: Partie amicale au Golf de Saint-Cloud"
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
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>
                <span style={{ fontSize: '16px' }}>📍</span>
                Golf
              </label>
              <input
                type="text"
                value={formData.course}
                onChange={(e) => setFormData({...formData, course: e.target.value})}
                placeholder="Nom du golf ou adresse"
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

            {/* Date & Time */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
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
                  Heure
                </label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
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
            </div>

            {/* Players */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>
                <span style={{ fontSize: '16px' }}>👥</span>
                Nombre maximum de joueurs
              </label>
              <select
                value={formData.maxPlayers}
                onChange={(e) => setFormData({...formData, maxPlayers: parseInt(e.target.value)})}
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
                <option value={2}>2 joueurs</option>
                <option value={3}>3 joueurs</option>
                <option value={4}>4 joueurs</option>
              </select>
            </div>

            {/* Level */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Niveau souhaité
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
                required
              >
                <option value="">Sélectionner un niveau</option>
                <option value="beginner">Débutant (HCP &gt; 30)</option>
                <option value="intermediate">Intermédiaire (HCP 15-30)</option>
                <option value="advanced">Confirmé (HCP 5-15)</option>
                <option value="expert">Expert (HCP &lt; 5)</option>
                <option value="all">Tous niveaux</option>
              </select>
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

      {/* Barre de navigation en bas */}
      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'white',
        borderTop: '1px solid #e5e7eb',
        padding: '12px 0',
        zIndex: 50
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          maxWidth: '480px',
          margin: '0 auto'
        }}>
          {/* Home */}
          <div
            onClick={() => router.push('/dashboard')}
            style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer',
            color: '#6b7280'
          }}>
            <span style={{ fontSize: '24px' }}>🏠</span>
            <span style={{ fontSize: '12px', fontWeight: '500' }}>Home</span>
          </div>

          {/* Search */}
          <div
            onClick={() => router.push('/search')}
            style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer',
            color: '#6b7280'
          }}>
            <span style={{ fontSize: '24px' }}>🔍</span>
            <span style={{ fontSize: '12px', fontWeight: '500' }}>Search</span>
          </div>

          {/* Events */}
          <div
            onClick={() => router.push('/events')}
            style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer',
            color: '#4facfe'
          }}>
            <span style={{ fontSize: '24px' }}>📅</span>
            <span style={{ fontSize: '12px', fontWeight: '500' }}>Events</span>
          </div>

          {/* Profile */}
          <div
            onClick={() => router.push('/profile')}
            style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer',
            color: '#6b7280'
          }}>
            <span style={{ fontSize: '24px' }}>👤</span>
            <span style={{ fontSize: '12px', fontWeight: '500' }}>Profile</span>
          </div>
        </div>
      </nav>
    </div>
  )
}