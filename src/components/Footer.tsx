'use client'
import { useRouter, usePathname } from 'next/navigation'

export default function Footer() {
  const router = useRouter()
  const pathname = usePathname()

  // Déterminer quelle section est active
  const isHome = pathname === '/dashboard'
  const isSearch = pathname === '/search'
  const isEvents = pathname === '/events' || pathname.startsWith('/events/') || pathname === '/create' || pathname === '/how-to-create'
  const isProfile = pathname === '/profile'

  return (
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
            color: isHome ? '#4facfe' : '#6b7280'
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
            color: isSearch ? '#4facfe' : '#6b7280'
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
            color: isEvents ? '#4facfe' : '#6b7280'
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
            color: isProfile ? '#4facfe' : '#6b7280'
          }}>
          <span style={{ fontSize: '24px' }}>👤</span>
          <span style={{ fontSize: '12px', fontWeight: '500' }}>Profile</span>
        </div>
      </div>
    </nav>
  )
}