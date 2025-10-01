'use client';

import { useRouter } from 'next/navigation';

export default function ChildSafetyPolicy() {
  const router = useRouter();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f5f5 0%, #e8f5e9 100%)',
      paddingBottom: '80px'
    }}>
      {/* Header avec style dashboard */}
      <div style={{
        background: 'linear-gradient(135deg, #2D5016 0%, #4A7C2E 100%)',
        paddingTop: '20px',
        paddingBottom: '20px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <button
            onClick={() => router.push('/settings')}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '12px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s',
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
          >
            ← Retour
          </button>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{ fontSize: '24px' }}>🛡️</span>
            <h1 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'white',
              margin: 0
            }}>
              Normes de Sécurité et Protection des Mineurs
            </h1>
          </div>
        </div>
      </div>

      {/* Contenu avec carte style dashboard */}
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '32px 20px'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{
            lineHeight: '1.8',
            color: '#333',
            fontSize: '16px'
          }}>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>
              Dernière mise à jour : 01/01/2025
            </p>

            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a', marginTop: '32px', marginBottom: '16px' }}>1. Restriction d&apos;âge</h2>
            <div style={{
              background: 'rgba(45, 80, 22, 0.1)',
              padding: '20px',
              borderRadius: '12px',
              marginBottom: '24px',
              border: '1px solid rgba(45, 80, 22, 0.2)'
            }}>
              <p style={{ fontWeight: '600', marginBottom: '8px' }}>Application réservée aux adultes</p>
              <p>Golf Buddies est une application strictement réservée aux personnes âgées de 18 ans et plus. L&apos;inscription requiert la confirmation de l&apos;âge légal.</p>
            </div>

            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a', marginTop: '32px', marginBottom: '16px' }}>2. Politique de tolérance zéro</h2>
            <p style={{ marginBottom: '16px' }}>Golf Buddies applique une politique de tolérance zéro concernant :</p>
            <ul style={{ paddingLeft: '24px', marginBottom: '24px', lineHeight: '1.8' }}>
              <li style={{ marginBottom: '8px' }}>Tout contenu inapproprié impliquant des mineurs</li>
              <li style={{ marginBottom: '8px' }}>L&apos;exploitation d&apos;enfants sous toutes ses formes</li>
              <li style={{ marginBottom: '8px' }}>Les abus sexuels sur mineurs</li>
              <li style={{ marginBottom: '8px' }}>Le partage de contenu illégal</li>
              <li style={{ marginBottom: '8px' }}>Tout comportement inapproprié ou harcelant</li>
            </ul>

            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a', marginTop: '32px', marginBottom: '16px' }}>3. Modération et contrôle</h2>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginTop: '16px', marginBottom: '8px' }}>3.1 Vérification des comptes</h3>
            <ul style={{ paddingLeft: '24px', marginBottom: '16px', lineHeight: '1.8' }}>
              <li style={{ marginBottom: '8px' }}>Vérification de l&apos;âge à l&apos;inscription</li>
              <li style={{ marginBottom: '8px' }}>Authentification par email obligatoire</li>
              <li style={{ marginBottom: '8px' }}>Surveillance des activités suspectes</li>
            </ul>

            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginTop: '16px', marginBottom: '8px' }}>3.2 Modération des contenus</h3>
            <ul style={{ paddingLeft: '24px', marginBottom: '24px', lineHeight: '1.8' }}>
              <li style={{ marginBottom: '8px' }}>Filtrage automatique des messages inappropriés</li>
              <li style={{ marginBottom: '8px' }}>Révision manuelle des signalements</li>
              <li style={{ marginBottom: '8px' }}>Suppression immédiate de tout contenu illégal</li>
            </ul>

            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a', marginTop: '32px', marginBottom: '16px' }}>4. Système de signalement</h2>
            <div style={{
              background: 'rgba(239, 68, 68, 0.1)',
              padding: '20px',
              borderRadius: '12px',
              marginBottom: '24px',
              border: '1px solid rgba(239, 68, 68, 0.2)'
            }}>
              <p style={{ marginBottom: '12px', fontWeight: '600' }}>Comment signaler un contenu ou utilisateur :</p>
              <ul style={{ paddingLeft: '24px', margin: 0, lineHeight: '1.8' }}>
                <li style={{ marginBottom: '8px' }}>Utilisez le bouton de signalement sur chaque profil</li>
                <li style={{ marginBottom: '8px' }}>Bloquez immédiatement tout utilisateur suspect</li>
                <li style={{ marginBottom: '8px' }}>Contactez-nous : contact@smaaks.fr</li>
                <li>Les signalements sont traités sous 24h maximum</li>
              </ul>
            </div>

            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a', marginTop: '32px', marginBottom: '16px' }}>5. Sanctions</h2>
            <p style={{ marginBottom: '16px' }}>Tout manquement aux normes de sécurité entraîne :</p>
            <ul style={{ paddingLeft: '24px', marginBottom: '24px', lineHeight: '1.8' }}>
              <li style={{ marginBottom: '8px' }}>Suspension immédiate du compte</li>
              <li style={{ marginBottom: '8px' }}>Bannissement définitif de la plateforme</li>
              <li style={{ marginBottom: '8px' }}>Signalement aux autorités compétentes</li>
              <li style={{ marginBottom: '8px' }}>Conservation des preuves pour enquête</li>
            </ul>

            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a', marginTop: '32px', marginBottom: '16px' }}>6. Coopération avec les autorités</h2>
            <p style={{ marginBottom: '24px' }}>
              Golf Buddies coopère pleinement avec les autorités judiciaires et policières pour tout signalement concernant la protection des mineurs. Nous transmettons immédiatement toute information pertinente aux services compétents.
            </p>

            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a', marginTop: '32px', marginBottom: '16px' }}>7. Engagement</h2>
            <p style={{ marginBottom: '24px' }}>
              CORBERA 10 SAS, éditeur de Golf Buddies, s&apos;engage à maintenir un environnement sûr pour tous les utilisateurs et à respecter les plus hautes normes de protection des mineurs conformément aux lois françaises et européennes.
            </p>

            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a', marginTop: '32px', marginBottom: '16px' }}>8. Contact</h2>
            <div style={{
              background: 'rgba(45, 80, 22, 0.1)',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid rgba(45, 80, 22, 0.2)'
            }}>
              <p style={{ marginBottom: '8px' }}>Pour toute question ou signalement urgent :</p>
              <p style={{ marginBottom: '4px' }}><strong>Email :</strong> contact@smaaks.fr</p>
              <p style={{ marginBottom: '4px' }}><strong>Réponse garantie :</strong> sous 24h</p>
              <p><strong>Urgence :</strong> Contactez immédiatement les autorités au 17 (France)</p>
            </div>
          </div>
        </div>

        {/* Bouton de retour */}
        <div style={{
          marginTop: '32px',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <button
            onClick={() => router.push('/settings')}
            style={{
              background: 'linear-gradient(135deg, #2D5016 0%, #4A7C2E 100%)',
              color: 'white',
              border: 'none',
              padding: '16px 32px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 4px 12px rgba(45, 80, 22, 0.3)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            ← Retour
          </button>
        </div>
      </div>
    </div>
  );
}
