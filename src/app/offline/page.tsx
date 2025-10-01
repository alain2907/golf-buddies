'use client'

export default function OfflinePage() {
  const handleRetry = () => {
    if (typeof window !== 'undefined') {
      window.location.reload()
    }
  }

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
      background: 'linear-gradient(135deg, #2D5016 0%, #4A7C2E 100%)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      padding: '20px',
      textAlign: 'center'
    }}>
      <div style={{ maxWidth: '500px', width: '100%' }}>
        <div style={{
          width: '150px',
          height: '150px',
          margin: '0 auto 30px',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
          background: 'white',
          padding: '10px'
        }}>
          <img
            src="/logo-golf.png"
            alt="Golf Buddies"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
          />
        </div>

        <div style={{
          width: '60px',
          height: '60px',
          margin: '0 auto 20px',
          opacity: 0.9
        }}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 10.15 4.63 8.44 5.68 7.08L16.92 18.32C15.56 19.37 13.85 20 12 20ZM18.32 16.92L7.08 5.68C8.44 4.63 10.15 4 12 4C16.42 4 20 7.58 20 12C20 13.85 19.37 15.56 18.32 16.92Z" fill="white"/>
          </svg>
        </div>

        <h1 style={{
          fontSize: 'clamp(2em, 5vw, 2.5em)',
          marginBottom: '20px',
          fontWeight: '700'
        }}>
          Vous êtes hors ligne
        </h1>

        <p style={{
          fontSize: '1.1em',
          lineHeight: '1.6',
          opacity: 0.95,
          marginBottom: '15px'
        }}>
          Golf Buddies nécessite une connexion Internet pour fonctionner.
        </p>
        <p style={{
          fontSize: '1.1em',
          lineHeight: '1.6',
          opacity: 0.95,
          marginBottom: '15px'
        }}>
          Vérifiez votre connexion et réessayez.
        </p>

        <div style={{
          background: 'rgba(255, 255, 255, 0.15)',
          borderRadius: '12px',
          padding: '20px',
          marginTop: '30px',
          backdropFilter: 'blur(10px)'
        }}>
          <h3 style={{
            fontSize: '1.2em',
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            <span>💡</span>
            En attendant...
          </h3>
          <ul style={{
            textAlign: 'left',
            listStyle: 'none',
            padding: 0,
            margin: 0
          }}>
            <li style={{
              padding: '8px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span>⛳</span>
              Préparez votre sac de golf pour la prochaine partie
            </li>
            <li style={{
              padding: '8px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span>⛳</span>
              Visualisez vos coups pour améliorer votre swing
            </li>
            <li style={{
              padding: '8px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span>⛳</span>
              Planifiez votre prochain parcours de rêve
            </li>
            <li style={{
              padding: '8px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span>⛳</span>
              Réviser les règles du golf
            </li>
          </ul>
        </div>

        <button
          onClick={handleRetry}
          style={{
            background: 'white',
            color: '#2D5016',
            border: 'none',
            padding: '15px 30px',
            borderRadius: '50px',
            fontSize: '1.1em',
            fontWeight: '600',
            marginTop: '30px',
            cursor: 'pointer',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)'
          }}
        >
          Réessayer
        </button>
      </div>
    </div>
  )
}
