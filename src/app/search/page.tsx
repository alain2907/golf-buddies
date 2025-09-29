'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, MapPin, Calendar, Users, Clock } from 'lucide-react'
import Footer from '@/components/Footer'

export default function SearchPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilters, setSelectedFilters] = useState({
    date: '',
    time: '',
    location: '',
    players: ''
  })

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
            🔍 Rejoindre un flight
          </h1>
          <p style={{ color: '#6b7280' }}>
            Trouvez des golfeurs pour votre prochaine partie
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {/* Search Bar */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          padding: '24px',
          marginBottom: '24px'
        }}>
          <div style={{ position: 'relative', marginBottom: '16px' }}>
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
              placeholder="Rechercher par golf, ville, joueur..."
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

          {/* Filters */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px'
          }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '4px'
              }}>
                <Calendar style={{ display: 'inline', width: '16px', height: '16px', marginRight: '4px' }} />
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
                  fontSize: '16px'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '4px'
              }}>
                <Clock style={{ display: 'inline', width: '16px', height: '16px', marginRight: '4px' }} />
                Heure
              </label>
              <select
                value={selectedFilters.time}
                onChange={(e) => setSelectedFilters({...selectedFilters, time: e.target.value})}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
              >
                <option value="">Toute heure</option>
                <option value="morning">Matin (6h-12h)</option>
                <option value="afternoon">Après-midi (12h-18h)</option>
                <option value="evening">Soir (18h-21h)</option>
              </select>
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '4px'
              }}>
                <MapPin style={{ display: 'inline', width: '16px', height: '16px', marginRight: '4px' }} />
                Lieu
              </label>
              <input
                type="text"
                value={selectedFilters.location}
                onChange={(e) => setSelectedFilters({...selectedFilters, location: e.target.value})}
                placeholder="Ville ou golf"
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '4px'
              }}>
                <Users style={{ display: 'inline', width: '16px', height: '16px', marginRight: '4px' }} />
                Joueurs
              </label>
              <select
                value={selectedFilters.players}
                onChange={(e) => setSelectedFilters({...selectedFilters, players: e.target.value})}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
              >
                <option value="">Peu importe</option>
                <option value="2">2 joueurs</option>
                <option value="3">3 joueurs</option>
                <option value="4">4 joueurs</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '24px'
        }}>
          {/* No results message */}
          <div style={{
            gridColumn: '1 / -1',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            padding: '48px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎯</div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '8px'
            }}>
              Aucune partie trouvée
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '24px' }}>
              Il n&apos;y a pas encore de parties disponibles qui correspondent à vos critères.
            </p>
            <button
              onClick={() => router.push('/create')}
              style={{
                background: 'linear-gradient(135deg, #4A7C2E 0%, #6B9F3F 100%)',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Créer une nouvelle partie
            </button>
          </div>

          {/* Example of what results would look like */}
          <div style={{
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            padding: '24px',
            borderLeft: '4px solid #4A7C2E',
            opacity: 0.5
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '16px'
            }}>
              <div>
                <h3 style={{ fontWeight: '600', fontSize: '18px' }}>Golf de Saint-Cloud</h3>
                <p style={{
                  color: '#6b7280',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <MapPin style={{ width: '16px', height: '16px', marginRight: '4px' }} />
                  Saint-Cloud, 92
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>Demain</div>
                <div style={{ fontWeight: '500' }}>14:30</div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Users style={{ width: '16px', height: '16px', marginRight: '4px', color: '#9ca3af' }} />
                <span style={{ fontSize: '14px', color: '#6b7280' }}>2/4 joueurs</span>
              </div>
              <div style={{ color: '#4A7C2E', fontWeight: '500' }}>75€</div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: '#4A7C2E',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '14px',
                fontWeight: '500',
                marginRight: '8px'
              }}>
                J
              </div>
              <div>
                <div style={{ fontWeight: '500', fontSize: '14px' }}>Jean Dupont</div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>Handicap 15</div>
              </div>
            </div>

            <button style={{
              width: '100%',
              background: '#4A7C2E',
              color: 'white',
              padding: '8px',
              borderRadius: '8px',
              fontWeight: '500',
              border: 'none',
              opacity: 0.5,
              cursor: 'not-allowed'
            }}>
              Rejoindre (Exemple)
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}