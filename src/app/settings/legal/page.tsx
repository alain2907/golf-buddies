'use client';

import { useRouter } from 'next/navigation';

export default function LegalNotices() {
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
            <span style={{ fontSize: '24px' }}>⚖️</span>
            <h1 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'white',
              margin: 0
            }}>
              Mentions Légales
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
              Conformément aux dispositions de l'article 6 de la loi n°2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, nous vous informons de l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi.
            </p>

            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a', marginTop: '32px', marginBottom: '16px' }}>1. Éditeur du site</h2>
            <div style={{
              background: 'rgba(45, 80, 22, 0.1)',
              padding: '20px',
              borderRadius: '12px',
              marginBottom: '24px',
              border: '1px solid rgba(45, 80, 22, 0.2)'
            }}>
              <p style={{ fontWeight: '600', marginBottom: '8px' }}>CORBERA 10 SAS</p>
              <p style={{ marginBottom: '4px' }}>Société par actions simplifiée</p>
              <p style={{ marginBottom: '4px' }}>Capital social : 1 000 €</p>
              <p style={{ marginBottom: '4px' }}>Siège social : 71 rue Jean de Bernardy, 13001 Marseille, France</p>
              <p style={{ marginBottom: '4px' }}>RCS Marseille : 529 138 919</p>
              <p style={{ marginBottom: '4px' }}>N° TVA intracommunautaire : FR53529138919</p>
              <p style={{ marginBottom: '4px' }}>Email : contact@smaaks.fr</p>
              <p>Directeur de la publication : Représentant légal de CORBERA 10 SAS</p>
            </div>

            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a', marginTop: '32px', marginBottom: '16px' }}>2. Hébergement</h2>
            <div style={{
              background: 'rgba(45, 80, 22, 0.1)',
              padding: '20px',
              borderRadius: '12px',
              marginBottom: '24px',
              border: '1px solid rgba(45, 80, 22, 0.2)'
            }}>
              <p style={{ fontWeight: '600', marginBottom: '8px' }}>Vercel Inc.</p>
              <p style={{ marginBottom: '4px' }}>340 S Lemon Ave #4133</p>
              <p style={{ marginBottom: '4px' }}>Walnut, CA 91789, United States</p>
              <p>Site web : <a href="https://vercel.com" style={{ color: '#2D5016' }}>vercel.com</a></p>
            </div>

            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a', marginTop: '32px', marginBottom: '16px' }}>3. Propriété intellectuelle</h2>
            <p style={{ marginBottom: '16px' }}>
              L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
            </p>
            <p style={{ marginBottom: '24px' }}>
              La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
            </p>

            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a', marginTop: '32px', marginBottom: '16px' }}>4. Limitation de responsabilité</h2>
            <p style={{ marginBottom: '16px' }}>
              Les informations contenues sur ce site sont aussi précises que possible et le site remis à jour à différentes périodes de l'année. Cependant, des erreurs ou omissions peuvent survenir.
            </p>
            <p style={{ marginBottom: '24px' }}>
              L'utilisateur devra donc s'assurer de l'exactitude des informations auprès de CORBERA 10 SAS et signaler toute modification du site qu'il jugerait utile.
            </p>

            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a', marginTop: '32px', marginBottom: '16px' }}>5. Liens hypertextes</h2>
            <p style={{ marginBottom: '16px' }}>
              Les liens hypertextes mis en place dans le cadre du présent site web en direction d'autres ressources présentes sur le réseau Internet ne sauraient engager la responsabilité de CORBERA 10 SAS.
            </p>
            <p style={{ marginBottom: '24px' }}>
              Tout site public ou privé est susceptible de placer un lien en direction de ce site sans autorisation expresse, à l'exception des sites diffusant des informations à caractère polémique, pornographique, xénophobe ou pouvant porter atteinte à la sensibilité du plus grand nombre.
            </p>

            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a', marginTop: '32px', marginBottom: '16px' }}>6. Services fournis</h2>
            <p style={{ marginBottom: '16px' }}>
              Golf Buddies est une plateforme de mise en relation entre golfeurs pour l'organisation de parties de golf. Le service est fourni tel quel, sans garantie de disponibilité permanente.
            </p>
            <p style={{ marginBottom: '24px' }}>
              CORBERA 10 SAS se réserve le droit d'interrompre, de suspendre momentanément ou de modifier sans préavis l'accès à tout ou partie du site pour des raisons de maintenance ou pour tout autre motif jugé nécessaire.
            </p>

            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a', marginTop: '32px', marginBottom: '16px' }}>7. Droit applicable</h2>
            <p style={{ marginBottom: '24px' }}>
              Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux français seront seuls compétents.
            </p>

            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a', marginTop: '32px', marginBottom: '16px' }}>8. Contact</h2>
            <div style={{
              background: 'rgba(45, 80, 22, 0.1)',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid rgba(45, 80, 22, 0.2)'
            }}>
              <p style={{ marginBottom: '8px' }}>Pour toute question concernant ces mentions légales :</p>
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