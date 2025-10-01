'use client';

import { useRouter } from 'next/navigation';

export default function TermsOfService() {
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
            <span style={{ fontSize: '24px' }}>📜</span>
            <h1 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'white',
              margin: 0
            }}>
              Conditions Générales d'Utilisation
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

            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a', marginTop: '32px', marginBottom: '16px' }}>1. Objet</h2>
            <p style={{ marginBottom: '16px' }}>
              Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet de définir les modalités et conditions d'utilisation de l'application Golf Buddies, éditée par CORBERA 10 SAS.
            </p>
            <p style={{ marginBottom: '24px' }}>
              L'utilisation de l'application implique l'acceptation pleine et entière des présentes CGU.
            </p>

            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a', marginTop: '32px', marginBottom: '16px' }}>2. Éditeur</h2>
            <div style={{
              background: 'rgba(45, 80, 22, 0.1)',
              padding: '20px',
              borderRadius: '12px',
              marginBottom: '24px',
              border: '1px solid rgba(45, 80, 22, 0.2)'
            }}>
              <p style={{ fontWeight: '600', marginBottom: '8px' }}>CORBERA 10 SAS</p>
              <p style={{ marginBottom: '4px' }}>Capital social : 1 000 €</p>
              <p style={{ marginBottom: '4px' }}>Siège social : 71 rue Jean de Bernardy, 13001 Marseille</p>
              <p style={{ marginBottom: '4px' }}>RCS Marseille : 529 138 919</p>
              <p style={{ marginBottom: '4px' }}>N° TVA intracommunautaire : FR53529138919</p>
              <p>Email : contact@smaaks.fr</p>
            </div>

            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a', marginTop: '32px', marginBottom: '16px' }}>3. Définitions</h2>
            <ul style={{ paddingLeft: '24px', marginBottom: '24px', lineHeight: '1.8' }}>
              <li style={{ marginBottom: '8px' }}><strong>Plateforme :</strong> l'application Golf Buddies</li>
              <li style={{ marginBottom: '8px' }}><strong>Utilisateur :</strong> toute personne physique inscrite sur la Plateforme</li>
              <li style={{ marginBottom: '8px' }}><strong>Partie de golf :</strong> événement golfique créé par un Utilisateur</li>
              <li style={{ marginBottom: '8px' }}><strong>Organisateur :</strong> Utilisateur créant une partie de golf</li>
              <li style={{ marginBottom: '8px' }}><strong>Participant :</strong> Utilisateur s'inscrivant à une partie de golf</li>
            </ul>

            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a', marginTop: '32px', marginBottom: '16px' }}>4. Inscription et Compte Utilisateur</h2>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginTop: '16px', marginBottom: '8px' }}>4.1 Conditions d'inscription</h3>
            <p style={{ marginBottom: '16px' }}>
              L'inscription est gratuite et réservée aux personnes physiques âgées d'au moins 13 ans. Les mineurs doivent obtenir l'autorisation de leurs représentants légaux.
            </p>

            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginTop: '16px', marginBottom: '8px' }}>4.2 Informations du compte</h3>
            <p style={{ marginBottom: '16px' }}>
              L'Utilisateur s'engage à fournir des informations exactes et à les maintenir à jour. Il est responsable de la confidentialité de ses identifiants de connexion.
            </p>

            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginTop: '16px', marginBottom: '8px' }}>4.3 Suppression du compte</h3>
            <p style={{ marginBottom: '24px' }}>
              L'Utilisateur peut supprimer son compte à tout moment. CORBERA 10 SAS se réserve le droit de suspendre ou supprimer tout compte en cas de violation des présentes CGU.
            </p>

            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a', marginTop: '32px', marginBottom: '16px' }}>5. Utilisation de la Plateforme</h2>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginTop: '16px', marginBottom: '8px' }}>5.1 Création de parties de golf</h3>
            <p style={{ marginBottom: '16px' }}>
              Les Organisateurs s'engagent à :
            </p>
            <ul style={{ paddingLeft: '24px', marginBottom: '16px', lineHeight: '1.8' }}>
              <li style={{ marginBottom: '8px' }}>Fournir des informations exactes et complètes sur la partie</li>
              <li style={{ marginBottom: '8px' }}>Respecter le parcours et les horaires annoncés</li>
              <li style={{ marginBottom: '8px' }}>Ne pas créer de parties à caractère commercial sans autorisation</li>
              <li style={{ marginBottom: '8px' }}>Assurer la sécurité des Participants dans la mesure du possible</li>
            </ul>

            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginTop: '16px', marginBottom: '8px' }}>5.2 Participation aux parties</h3>
            <p style={{ marginBottom: '16px' }}>
              Les Participants s'engagent à :
            </p>
            <ul style={{ paddingLeft: '24px', marginBottom: '16px', lineHeight: '1.8' }}>
              <li style={{ marginBottom: '8px' }}>Respecter les horaires et le lieu de rendez-vous</li>
              <li style={{ marginBottom: '8px' }}>Prévenir en cas d'empêchement</li>
              <li style={{ marginBottom: '8px' }}>Adopter un comportement sportif et respectueux</li>
              <li style={{ marginBottom: '8px' }}>Vérifier leur niveau de golf et handicap</li>
            </ul>

            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a', marginTop: '32px', marginBottom: '16px' }}>6. Responsabilités</h2>
            <p style={{ marginBottom: '16px' }}>
              CORBERA 10 SAS met à disposition une plateforme de mise en relation entre golfeurs. La société n'organise pas les parties et n'est pas responsable des dommages survenus lors des parties de golf.
            </p>
            <p style={{ marginBottom: '24px' }}>
              Chaque Utilisateur est responsable de ses actions et s'engage à souscrire une assurance responsabilité civile.
            </p>

            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a', marginTop: '32px', marginBottom: '16px' }}>7. Contact</h2>
            <div style={{
              background: 'rgba(45, 80, 22, 0.1)',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid rgba(45, 80, 22, 0.2)'
            }}>
              <p style={{ marginBottom: '8px' }}>Pour toute question concernant ces CGU :</p>
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