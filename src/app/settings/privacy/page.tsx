'use client';

import { useRouter } from 'next/navigation';

export default function PrivacyPolicy() {
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
            onClick={() => router.back()}
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
            <span style={{ fontSize: '24px' }}>🔒</span>
            <h1 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'white',
              margin: 0
            }}>
              Politique de Confidentialité
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
              Dernière mise à jour : 30/09/2025
            </p>

            <p style={{ marginBottom: '24px' }}>
              Cette politique de confidentialité décrit comment CORBERA 10 SAS collecte, utilise et protège vos données personnelles lorsque vous utilisez Golf Buddies.
            </p>

            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a', marginTop: '32px', marginBottom: '16px' }}>1. Responsable du traitement</h2>
            <div style={{
              background: 'rgba(45, 80, 22, 0.1)',
              padding: '20px',
              borderRadius: '12px',
              marginBottom: '24px',
              border: '1px solid rgba(45, 80, 22, 0.2)'
            }}>
              <p style={{ fontWeight: '600', marginBottom: '8px' }}>CORBERA 10 SAS</p>
              <p style={{ marginBottom: '4px' }}>71 rue Jean de Bernardy, 13001 Marseille</p>
              <p style={{ marginBottom: '4px' }}>RCS Marseille : 529 138 919</p>
              <p>Email : contact@smaaks.fr</p>
            </div>

            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a', marginTop: '32px', marginBottom: '16px' }}>2. Données collectées</h2>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginTop: '16px', marginBottom: '8px' }}>2.1 Données d'inscription</h3>
            <ul style={{ paddingLeft: '24px', marginBottom: '16px', lineHeight: '1.8' }}>
              <li style={{ marginBottom: '8px' }}>Nom et prénom</li>
              <li style={{ marginBottom: '8px' }}>Adresse email</li>
              <li style={{ marginBottom: '8px' }}>Date de naissance</li>
              <li style={{ marginBottom: '8px' }}>Niveau de golf et handicap</li>
            </ul>

            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginTop: '16px', marginBottom: '8px' }}>2.2 Données d'utilisation</h3>
            <ul style={{ paddingLeft: '24px', marginBottom: '24px', lineHeight: '1.8' }}>
              <li style={{ marginBottom: '8px' }}>Parties de golf créées et participations</li>
              <li style={{ marginBottom: '8px' }}>Messages échangés sur la plateforme</li>
              <li style={{ marginBottom: '8px' }}>Statistiques de jeu et préférences</li>
              <li style={{ marginBottom: '8px' }}>Données de géolocalisation (avec consentement)</li>
            </ul>

            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a', marginTop: '32px', marginBottom: '16px' }}>3. Finalités du traitement</h2>
            <p style={{ marginBottom: '16px' }}>Vos données sont utilisées pour :</p>
            <ul style={{ paddingLeft: '24px', marginBottom: '24px', lineHeight: '1.8' }}>
              <li style={{ marginBottom: '8px' }}>Créer et gérer votre compte utilisateur</li>
              <li style={{ marginBottom: '8px' }}>Faciliter la mise en relation entre golfeurs</li>
              <li style={{ marginBottom: '8px' }}>Organiser et gérer les parties de golf</li>
              <li style={{ marginBottom: '8px' }}>Améliorer nos services et fonctionnalités</li>
              <li style={{ marginBottom: '8px' }}>Assurer la sécurité de la plateforme</li>
            </ul>

            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a', marginTop: '32px', marginBottom: '16px' }}>4. Vos droits</h2>
            <p style={{ marginBottom: '16px' }}>Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul style={{ paddingLeft: '24px', marginBottom: '24px', lineHeight: '1.8' }}>
              <li style={{ marginBottom: '8px' }}><strong>Droit d'accès :</strong> obtenir une copie de vos données</li>
              <li style={{ marginBottom: '8px' }}><strong>Droit de rectification :</strong> corriger vos données inexactes</li>
              <li style={{ marginBottom: '8px' }}><strong>Droit à l'effacement :</strong> supprimer vos données</li>
              <li style={{ marginBottom: '8px' }}><strong>Droit à la portabilité :</strong> récupérer vos données</li>
              <li style={{ marginBottom: '8px' }}><strong>Droit d'opposition :</strong> vous opposer au traitement</li>
            </ul>

            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a', marginTop: '32px', marginBottom: '16px' }}>5. Conservation des données</h2>
            <p style={{ marginBottom: '24px' }}>
              Vos données sont conservées pendant la durée nécessaire aux finalités du traitement et conformément aux obligations légales. En cas de suppression de compte, vos données sont effacées sous 30 jours.
            </p>

            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a', marginTop: '32px', marginBottom: '16px' }}>6. Contact</h2>
            <div style={{
              background: 'rgba(45, 80, 22, 0.1)',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid rgba(45, 80, 22, 0.2)'
            }}>
              <p style={{ marginBottom: '8px' }}>Pour exercer vos droits ou pour toute question :</p>
              <p style={{ marginBottom: '4px' }}><strong>Email :</strong> contact@smaaks.fr</p>
              <p><strong>Courrier :</strong> CORBERA 10 SAS - 71 rue Jean de Bernardy, 13001 Marseille</p>
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
            onClick={() => router.back()}
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