'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, MapPin, Star, Phone, Globe, Navigation } from 'lucide-react'

const mockCourses = [
  {
    id: 1,
    name: 'Golf de Saint-Cloud',
    location: 'Saint-Cloud, 92',
    rating: 4.5,
    reviews: 142,
    holes: 18,
    par: 72,
    distance: '2.5 km',
    image: '/api/placeholder/400/200',
    phone: '01 47 01 01 85',
    website: 'golf-saint-cloud.com',
    price: '75€',
    description: 'Un parcours technique au cœur de la région parisienne avec vue sur Paris.'
  },
  {
    id: 2,
    name: 'Golf de Morfontaine',
    location: 'Morfontaine, 60',
    rating: 4.8,
    reviews: 89,
    holes: 18,
    par: 71,
    distance: '45 km',
    image: '/api/placeholder/400/200',
    phone: '03 44 54 64 40',
    website: 'golf-morfontaine.com',
    price: '120€',
    description: 'L&apos;un des plus beaux parcours de France, classé dans le top 10 européen.'
  },
  {
    id: 3,
    name: 'Golf de Fontainebleau',
    location: 'Fontainebleau, 77',
    rating: 4.3,
    reviews: 76,
    holes: 18,
    par: 72,
    distance: '35 km',
    image: '/api/placeholder/400/200',
    phone: '01 64 22 22 95',
    website: 'golf-fontainebleau.com',
    price: '65€',
    description: 'Parcours au cœur de la forêt de Fontainebleau, technique et boisé.'
  }
]

export default function CoursesPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')

  const filteredCourses = mockCourses.filter(course =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
            🏌️ Golfs à proximité
          </h1>
          <p style={{ color: '#6b7280' }}>
            Découvrez les meilleurs golfs de votre région
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {/* Search & Filters */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          padding: '24px',
          marginBottom: '24px'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '16px',
            alignItems: 'center'
          }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <Search style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9ca3af',
                width: '20px',
                height: '20px'
              }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un golf..."
                style={{
                  width: '100%',
                  paddingLeft: '40px',
                  paddingRight: '16px',
                  paddingTop: '12px',
                  paddingBottom: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
              />
            </div>

            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              style={{
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '16px'
              }}
            >
              <option value="all">Tous les golfs</option>
              <option value="nearby">À proximité</option>
              <option value="premium">Premium</option>
              <option value="public">Public</option>
            </select>
          </div>
        </div>

        {/* Course Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '24px'
        }}>
          {filteredCourses.map(course => (
            <div key={course.id} style={{
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              transition: 'box-shadow 0.2s'
            }}>
              {/* Course Image */}
              <div style={{
                height: '192px',
                background: 'linear-gradient(135deg, #4A7C2E 0%, #6B9F3F 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ fontSize: '64px' }}>🏌️</span>
              </div>

              <div style={{ padding: '24px' }}>
                {/* Course Header */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '8px'
                }}>
                  <h3 style={{ fontWeight: '600', fontSize: '18px', color: '#111827' }}>{course.name}</h3>
                  <div style={{ color: '#4A7C2E', fontWeight: 'bold' }}>{course.price}</div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#6b7280',
                  marginBottom: '8px'
                }}>
                  <MapPin style={{ width: '16px', height: '16px', marginRight: '4px' }} />
                  <span style={{ fontSize: '14px' }}>{course.location}</span>
                  <span style={{ margin: '0 8px' }}>•</span>
                  <Navigation style={{ width: '16px', height: '16px', marginRight: '4px' }} />
                  <span style={{ fontSize: '14px' }}>{course.distance}</span>
                </div>

                {/* Rating */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '12px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        style={{
                          width: '16px',
                          height: '16px',
                          color: i < Math.floor(course.rating) ? '#fbbf24' : '#d1d5db',
                          fill: i < Math.floor(course.rating) ? '#fbbf24' : 'none'
                        }}
                      />
                    ))}
                  </div>
                  <span style={{
                    marginLeft: '8px',
                    fontSize: '14px',
                    color: '#6b7280'
                  }}>
                    {course.rating} ({course.reviews} avis)
                  </span>
                </div>

                {/* Course Info */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '14px',
                  color: '#6b7280',
                  marginBottom: '12px'
                }}>
                  <span>{course.holes} trous</span>
                  <span>Par {course.par}</span>
                </div>

                {/* Description */}
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  marginBottom: '16px'
                }}>{course.description}</p>

                {/* Contact */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '14px',
                  color: '#9ca3af',
                  marginBottom: '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Phone style={{ width: '16px', height: '16px', marginRight: '4px' }} />
                    <span>{course.phone}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Globe style={{ width: '16px', height: '16px', marginRight: '4px' }} />
                    <span>{course.website}</span>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={{
                    flex: 1,
                    background: 'linear-gradient(135deg, #4A7C2E 0%, #6B9F3F 100%)',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontWeight: '500',
                    border: 'none',
                    cursor: 'pointer'
                  }}>
                    Réserver
                  </button>
                  <button style={{
                    background: '#f3f4f6',
                    color: '#374151',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontWeight: '500',
                    border: 'none',
                    cursor: 'pointer'
                  }}>
                    Infos
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <div style={{
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            padding: '48px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔍</div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '8px'
            }}>
              Aucun golf trouvé
            </h3>
            <p style={{ color: '#6b7280' }}>
              Essayez de modifier vos critères de recherche.
            </p>
          </div>
        )}

        {/* Add Course CTA */}
        <div style={{
          marginTop: '32px',
          background: 'rgba(74, 124, 46, 0.1)',
          borderRadius: '12px',
          padding: '24px',
          textAlign: 'center'
        }}>
          <h3 style={{
            fontWeight: '600',
            color: '#4A7C2E',
            marginBottom: '8px'
          }}>
            Votre golf n&apos;est pas listé ?
          </h3>
          <p style={{
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Aidez-nous à enrichir notre base de données en ajoutant votre golf préféré.
          </p>
          <button style={{
            background: 'linear-gradient(135deg, #4A7C2E 0%, #6B9F3F 100%)',
            color: 'white',
            border: 'none',
            padding: '8px 24px',
            borderRadius: '8px',
            fontWeight: '500',
            cursor: 'pointer'
          }}>
            Ajouter un golf
          </button>
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
            color: '#6b7280'
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