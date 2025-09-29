'use client'
import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Search, MapPin, Star, Phone, Globe, ChevronRight } from 'lucide-react'
import Footer from '@/components/Footer'
import { golfCourses, getUniqueRegions, type GolfCourse } from '@/data/golf-courses'

export default function CoursesPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('all')
  const [selectedHoles, setSelectedHoles] = useState('all')
  const regions = getUniqueRegions()

  const filteredCourses = useMemo(() => {
    return golfCourses.filter(course => {
      const matchesSearch = searchTerm === '' ||
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.city.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesRegion = selectedRegion === 'all' || course.region === selectedRegion
      const matchesHoles = selectedHoles === 'all' ||
        (selectedHoles === '18' && course.holes === 18) ||
        (selectedHoles === '27' && course.holes === 27) ||
        (selectedHoles === '36' && course.holes === 36)

      return matchesSearch && matchesRegion && matchesHoles
    })
  }, [searchTerm, selectedRegion, selectedHoles])

  const handleCourseClick = (course: GolfCourse) => {
    // Pour l'instant, on redirige vers create avec le nom du golf pré-rempli
    router.push(`/create?course=${encodeURIComponent(course.name)}&city=${encodeURIComponent(course.city)}`)
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
            <MapPin style={{ width: '32px', height: '32px' }} />
            Parcours de Golf
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '16px' }}>
            Découvrez {golfCourses.length} parcours prestigieux à travers la France
          </p>

          {/* Barre de recherche */}
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
              placeholder="Rechercher un parcours ou une ville..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: '16px',
                padding: '4px'
              }}
            />
          </div>

          {/* Filtres */}
          <div style={{
            marginTop: '16px',
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap'
          }}>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '14px',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="all" style={{ background: '#2D5016' }}>Toutes les régions</option>
              {regions.map(region => (
                <option key={region} value={region} style={{ background: '#2D5016' }}>
                  {region}
                </option>
              ))}
            </select>

            <select
              value={selectedHoles}
              onChange={(e) => setSelectedHoles(e.target.value)}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '14px',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="all" style={{ background: '#2D5016' }}>Tous les parcours</option>
              <option value="18" style={{ background: '#2D5016' }}>18 trous</option>
              <option value="27" style={{ background: '#2D5016' }}>27 trous</option>
              <option value="36" style={{ background: '#2D5016' }}>36 trous</option>
            </select>

            <div style={{
              color: 'white',
              fontSize: '14px',
              padding: '8px 12px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '8px'
            }}>
              {filteredCourses.length} parcours trouvés
            </div>
          </div>
        </div>
      </div>

      {/* Liste des parcours */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
          gap: '20px'
        }}>
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              onClick={() => handleCourseClick(course)}
              style={{
                background: 'white',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                cursor: 'pointer',
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
              {/* En-tête avec gradient */}
              <div style={{
                background: 'linear-gradient(135deg, #4A7C2E 0%, #6B9F3F 100%)',
                padding: '16px 20px',
                color: 'white'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '4px' }}>
                      {course.name}
                    </h3>
                    <div style={{ fontSize: '14px', opacity: 0.9 }}>
                      <MapPin style={{ width: '14px', height: '14px', display: 'inline', marginRight: '4px' }} />
                      {course.city}, {course.region}
                    </div>
                  </div>
                  {course.rating && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      background: 'rgba(255, 255, 255, 0.2)',
                      padding: '4px 8px',
                      borderRadius: '8px'
                    }}>
                      <Star style={{ width: '14px', height: '14px', fill: 'white' }} />
                      <span style={{ fontSize: '14px', fontWeight: '600' }}>{course.rating}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Corps de la carte */}
              <div style={{ padding: '20px' }}>
                {/* Informations techniques */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '12px',
                  marginBottom: '16px',
                  paddingBottom: '16px',
                  borderBottom: '1px solid #e5e7eb'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '20px', fontWeight: '600', color: '#2D5016' }}>
                      {course.holes}
                    </div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>Trous</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '20px', fontWeight: '600', color: '#2D5016' }}>
                      Par {course.par}
                    </div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>Par</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '20px', fontWeight: '600', color: '#2D5016' }}>
                      {course.distance}m
                    </div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>Distance</div>
                  </div>
                </div>

                {/* Description */}
                {course.description && (
                  <p style={{
                    fontSize: '14px',
                    color: '#4b5563',
                    lineHeight: '1.5',
                    marginBottom: '16px'
                  }}>
                    {course.description}
                  </p>
                )}

                {/* Facilities */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px',
                  marginBottom: '16px'
                }}>
                  {course.facilities.slice(0, 4).map((facility, index) => (
                    <span
                      key={index}
                      style={{
                        fontSize: '12px',
                        padding: '4px 8px',
                        background: '#E8F5E9',
                        color: '#2D5016',
                        borderRadius: '6px'
                      }}
                    >
                      {facility}
                    </span>
                  ))}
                  {course.facilities.length > 4 && (
                    <span style={{
                      fontSize: '12px',
                      padding: '4px 8px',
                      color: '#6b7280'
                    }}>
                      +{course.facilities.length - 4} autres
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  marginTop: '16px'
                }}>
                  {course.phone && (
                    <a
                      href={`tel:${course.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        padding: '8px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '14px',
                        color: '#4b5563',
                        textDecoration: 'none',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#f3f4f6'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent'
                      }}
                    >
                      <Phone style={{ width: '14px', height: '14px' }} />
                      Appeler
                    </a>
                  )}
                  {course.website && (
                    <a
                      href={course.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        padding: '8px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '14px',
                        color: '#4b5563',
                        textDecoration: 'none',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#f3f4f6'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent'
                      }}
                    >
                      <Globe style={{ width: '14px', height: '14px' }} />
                      Site web
                    </a>
                  )}
                  <button
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      padding: '8px',
                      background: '#4A7C2E',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    Créer partie
                    <ChevronRight style={{ width: '14px', height: '14px' }} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <MapPin style={{
              width: '64px',
              height: '64px',
              color: '#9ca3af',
              margin: '0 auto',
              marginBottom: '16px'
            }} />
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>
              Aucun parcours trouvé
            </h3>
            <p style={{ color: '#6b7280' }}>
              Essayez de modifier vos critères de recherche
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}