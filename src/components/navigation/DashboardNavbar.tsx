'use client'
import { Trophy } from 'lucide-react'

export default function DashboardNavbar() {
  return (
    <nav style={{
      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      padding: '24px 48px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Left: Logo and Welcome */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '4px'
          }}>
            <Trophy style={{ width: '32px', height: '32px', color: 'white' }} />
            <h1 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: 'white',
              margin: 0
            }}>
              Golf Buddies
            </h1>
          </div>
          <p style={{
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '14px',
            marginLeft: '44px',
            margin: 0
          }}>
            Bonjour Utilisateur
          </p>
        </div>

        {/* Right: Create Event Button */}
        <button className="btn-secondary">
          Proposez une dispo
        </button>
      </div>
    </nav>
  )
}