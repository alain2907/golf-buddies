'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CookiesPolicy() {
  const router = useRouter();
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: true,
    marketing: false,
    functional: true
  });

  const handleSave = () => {
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    alert('Préférences sauvegardées !');
  };

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
            <span style={{ fontSize: '24px' }}>🍪</span>
            <h1 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'white',
              margin: 0
            }}>
              Politique des Cookies
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
              Cette politique explique comment Golf Buddies utilise les cookies et technologies similaires pour améliorer votre expérience sur notre plateforme.
            </p>

            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a', marginTop: '32px', marginBottom: '16px' }}>1. Qu'est-ce qu'un cookie ?</h2>
            <p style={{ marginBottom: '24px' }}>
              Un cookie est un petit fichier texte stocké sur votre appareil lors de votre visite sur notre site. Les cookies nous aident à vous reconnaître, retenir vos préférences et améliorer votre expérience utilisateur.
            </p>

            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a', marginTop: '32px', marginBottom: '16px' }}>2. Types de cookies utilisés</h2>

            {/* Préférences cookies */}
            <div style={{ marginBottom: '32px' }}>
              {[
                {
                  key: 'necessary',
                  title: 'Cookies nécessaires',
                  description: 'Indispensables au fonctionnement du site (connexion, sécurité)',
                  required: true
                },
                {
                  key: 'functional',
                  title: 'Cookies fonctionnels',
                  description: 'Améliorent l\'expérience utilisateur (préférences, langue)',
                  required: false
                },
                {
                  key: 'analytics',
                  title: 'Cookies analytiques',
                  description: 'Nous aident à comprendre comment vous utilisez le site',
                  required: false
                },
                {
                  key: 'marketing',
                  title: 'Cookies marketing',
                  description: 'Utilisés pour personnaliser la publicité',
                  required: false
                }
              ].map((cookie) => (
                <div key={cookie.key} style={{
                  background: 'rgba(45, 80, 22, 0.05)',
                  padding: '20px',
                  borderRadius: '12px',
                  marginBottom: '16px',
                  border: '1px solid rgba(45, 80, 22, 0.1)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
                      {cookie.title}
                    </h3>
                    <p style={{ color: '#666', margin: 0 }}>
                      {cookie.description}
                    </p>
                  </div>
                  <div style={{ marginLeft: '20px' }}>
                    <input
                      type="checkbox"
                      checked={preferences[cookie.key as keyof typeof preferences]}
                      disabled={cookie.required}
                      onChange={(e) => setPreferences(prev => ({
                        ...prev,
                        [cookie.key]: e.target.checked
                      }))}
                      style={{
                        width: '20px',
                        height: '20px',
                        accentColor: '#2D5016'
                      }}
                    />
                    {cookie.required && (
                      <span style={{
                        fontSize: '12px',
                        color: '#666',
                        marginLeft: '8px'
                      }}>
                        (obligatoire)
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a', marginTop: '32px', marginBottom: '16px' }}>3. Gestion des cookies</h2>
            <p style={{ marginBottom: '16px' }}>
              Vous pouvez modifier vos préférences ci-dessus ou dans les paramètres de votre navigateur. La désactivation de certains cookies peut affecter le fonctionnement du site.
            </p>

            {/* Bouton sauvegarder */}
            <div style={{
              background: 'rgba(45, 80, 22, 0.1)',
              padding: '20px',
              borderRadius: '12px',
              textAlign: 'center',
              border: '1px solid rgba(45, 80, 22, 0.2)'
            }}>
              <button
                onClick={handleSave}
                style={{
                  background: 'linear-gradient(135deg, #2D5016 0%, #4A7C2E 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                Sauvegarder les préférences
              </button>
            </div>

            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a', marginTop: '32px', marginBottom: '16px' }}>4. Contact</h2>
            <div style={{
              background: 'rgba(45, 80, 22, 0.1)',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid rgba(45, 80, 22, 0.2)'
            }}>
              <p style={{ marginBottom: '8px' }}>Pour toute question sur les cookies :</p>
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