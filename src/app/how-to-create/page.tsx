'use client'
import { useRouter } from 'next/navigation'

export default function HowToCreatePage() {
  const router = useRouter()

  const steps = [
    {
      number: '1',
      emoji: '👤',
      title: 'Crée ton profil',
      description: 'Ajoute tes informations golfiques : handicap, parcours préféré, disponibilités',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      number: '2',
      emoji: '📅',
      title: 'Choisis la date et l\'heure',
      description: 'Sélectionne quand tu veux jouer, du lever au coucher du soleil',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      number: '3',
      emoji: '📍',
      title: 'Sélectionne le parcours',
      description: 'Choisis parmi les golfs de ta région ou propose un nouveau parcours',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      number: '4',
      emoji: '👥',
      title: 'Définis le nombre de joueurs',
      description: 'Indique combien de partenaires tu recherches (1 à 3 joueurs)',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
    {
      number: '5',
      emoji: '💬',
      title: 'Ajoute des détails',
      description: 'Précise ton niveau, le rythme de jeu souhaité, si tu as une voiturette',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    {
      number: '6',
      emoji: '🚀',
      title: 'Publie ton annonce',
      description: 'Un clic et ton annonce est visible par tous les golfeurs de la communauté !',
      gradient: 'linear-gradient(135deg, #ff6b6b, #ee5a52)'
    }
  ]

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', paddingBottom: '80px' }}>
      {/* Header */}
      <div style={{
        background: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '24px',
        marginBottom: '32px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <button
            onClick={() => router.back()}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'none',
              border: 'none',
              color: '#6b7280',
              cursor: 'pointer',
              fontSize: '16px',
              marginBottom: '16px',
              padding: '8px 12px',
              borderRadius: '8px',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#f3f4f6'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
          >
            ← Retour
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
            <span style={{ fontSize: '48px' }}>🚀</span>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', margin: 0 }}>
              Crée ta première annonce sportive !
            </h1>
          </div>

          <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '20px' }}>
            Suis ces 6 étapes simples pour publier ton événement et trouver des partenaires de jeu.
          </p>

          <div style={{
            background: '#dbeafe',
            border: '1px solid #93c5fd',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ fontSize: '20px' }}>💡</span>
            <p style={{ margin: 0, color: '#1e40af' }}>
              <span style={{ fontWeight: '600' }}>Astuce :</span> Plus tu donnes de détails, plus tu attires les bons joueurs !
            </p>
          </div>
        </div>
      </div>

      {/* Steps Grid */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '24px',
          marginBottom: '48px'
        }}>
          {steps.map((step) => (
            <div
              key={step.number}
              style={{
                background: 'white',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)'
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)'
              }}
            >
              {/* Card Header */}
              <div style={{
                background: step.gradient,
                padding: '24px',
                color: 'white'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '36px', fontWeight: 'bold', opacity: 0.9 }}>
                    {step.number}
                  </span>
                  <span style={{ fontSize: '36px' }}>
                    {step.emoji}
                  </span>
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>
                  {step.title}
                </h3>
              </div>

              {/* Card Body */}
              <div style={{ padding: '24px' }}>
                <p style={{ color: '#6b7280', lineHeight: '1.6', margin: 0 }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          padding: '48px',
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '16px', color: '#111827' }}>
            Prêt à trouver tes partenaires de golf ?
          </h2>
          <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '32px' }}>
            Rejoins des milliers de golfeurs qui utilisent Golf Buddies pour ne plus jamais jouer seul !
          </p>

          <button
            onClick={() => router.push('/create')}
            style={{
              background: 'linear-gradient(135deg, #4A7C2E 0%, #6B9F3F 100%)',
              color: 'white',
              border: 'none',
              padding: '16px 32px',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)'
              e.currentTarget.style.boxShadow = '0 8px 12px rgba(0,0,0,0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)'
            }}
          >
            <span style={{ fontSize: '20px' }}>✨</span>
            Créer mon événement maintenant
          </button>

          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            marginTop: '48px',
            paddingTop: '32px',
            borderTop: '1px solid #e5e7eb'
          }}>
            <div>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#4A7C2E', marginBottom: '4px' }}>500+</div>
              <div style={{ color: '#6b7280', fontSize: '14px' }}>Parties créées</div>
            </div>
            <div>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#4A7C2E', marginBottom: '4px' }}>1200+</div>
              <div style={{ color: '#6b7280', fontSize: '14px' }}>Golfeurs actifs</div>
            </div>
            <div>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#4A7C2E', marginBottom: '4px' }}>98%</div>
              <div style={{ color: '#6b7280', fontSize: '14px' }}>Satisfaction</div>
            </div>
          </div>
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