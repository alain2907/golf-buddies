'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useEvents } from '@/hooks/useEvents'
import { useAuth } from '@/hooks/useAuth'

export default function EventsListPage() {
  const router = useRouter()
  const { events } = useEvents()
  const { user } = useAuth()

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
            📅 Tous les flights
          </h1>
          <p style={{ color: '#6b7280' }}>
            Découvrez toutes les parties de golf disponibles
          </p>
        </div>
      </div>

      {/* Events List */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '24px'
        }}>
          {events && events.length > 0 ? (
            events.map((event) => (
              <div
                key={event.id}
                onClick={() => router.push(`/events/${event.id}`)}
                style={{
                  background: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  padding: '24px',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 8px 12px rgba(0,0,0,0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '4px' }}>{event.title}</h3>
                    <p style={{ color: '#6b7280', fontSize: '14px' }}>
                      📍 {event.courseName} • {event.location?.city || 'Ville non précisée'}
                    </p>
                  </div>
                  <div style={{
                    background: event.currentPlayers.length >= event.maxPlayers ? '#fef2f2' : '#dcfce7',
                    color: event.currentPlayers.length >= event.maxPlayers ? '#991b1b' : '#166534',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    {event.currentPlayers.length}/{event.maxPlayers}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>
                    📅 {new Date(event.date).toLocaleDateString('fr-FR')}
                  </span>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>
                    ⏰ {event.time}
                  </span>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>
                    🏌️ {event.requirements?.experienceLevel === 'all' ? 'Tous niveaux' : event.requirements?.experienceLevel}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: '#4A7C2E',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}>
                      {event.organizerName?.charAt(0).toUpperCase() || '?'}
                    </div>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>
                      {event.organizerName}
                    </span>
                  </div>

                  {event.currentPlayers.length < event.maxPlayers && (
                    <button style={{
                      background: '#4A7C2E',
                      color: 'white',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}>
                      Voir
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div style={{
              gridColumn: '1 / -1',
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              padding: '48px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>⛳</div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '8px'
              }}>
                Aucun flight disponible
              </h3>
              <p style={{ color: '#6b7280', marginBottom: '24px' }}>
                Soyez le premier à proposer un parcours !
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
                Proposer un parcours
              </button>
            </div>
          )}
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
          <div style={{
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