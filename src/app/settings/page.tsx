'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SettingsPage() {
  const router = useRouter();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f5f5 0%, #e8f5e9 100%)',
      paddingBottom: '80px'
    }}>
      {/* Header */}
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
            <span style={{ fontSize: '24px' }}>⚙️</span>
            <h1 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'white',
              margin: 0
            }}>
              Paramètres et Informations Légales
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Utilisateurs bloqués */}
          <Link
            href="/settings/blocked"
            className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border border-golf-fairway/20 p-6 hover:shadow-2xl transition-all duration-300 group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-red-100 p-3 rounded-lg group-hover:bg-red-200 transition-colors">
                <span className="text-2xl">🚫</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Utilisateurs bloqués</h2>
                <p className="text-gray-600 text-sm">Gérer les utilisateurs bloqués</p>
              </div>
            </div>
            <p className="text-gray-700">
              Consultez et gérez la liste des utilisateurs que vous avez bloqués.
            </p>
          </Link>

          {/* Politique de Confidentialité */}
          <Link
            href="/settings/privacy"
            className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border border-golf-fairway/20 p-6 hover:shadow-2xl transition-all duration-300 group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition-colors">
                <span className="text-2xl">🔒</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Politique de Confidentialité</h2>
                <p className="text-gray-600 text-sm">Comment nous protégeons vos données</p>
              </div>
            </div>
            <p className="text-gray-700">
              Découvrez comment Golf Buddies collecte, utilise et protège vos données personnelles conformément au RGPD.
            </p>
          </Link>

          {/* Conditions Générales d'Utilisation */}
          <Link
            href="/settings/terms"
            className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border border-golf-fairway/20 p-6 hover:shadow-2xl transition-all duration-300 group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-green-100 p-3 rounded-lg group-hover:bg-green-200 transition-colors">
                <span className="text-2xl">📜</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Conditions Générales d'Utilisation</h2>
                <p className="text-gray-600 text-sm">Règles d'utilisation de la plateforme</p>
              </div>
            </div>
            <p className="text-gray-700">
              Les conditions d'utilisation de Golf Buddies, vos droits et obligations en tant qu'utilisateur.
            </p>
          </Link>

          {/* Politique des Cookies */}
          <Link
            href="/settings/cookies"
            className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border border-golf-fairway/20 p-6 hover:shadow-2xl transition-all duration-300 group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-orange-100 p-3 rounded-lg group-hover:bg-orange-200 transition-colors">
                <span className="text-2xl">🍪</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Politique des Cookies</h2>
                <p className="text-gray-600 text-sm">Gestion des cookies et préférences</p>
              </div>
            </div>
            <p className="text-gray-700">
              Comprenez comment nous utilisons les cookies et gérez vos préférences de confidentialité.
            </p>
          </Link>

          {/* Mentions Légales */}
          <Link
            href="/settings/legal"
            className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border border-golf-fairway/20 p-6 hover:shadow-2xl transition-all duration-300 group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-purple-100 p-3 rounded-lg group-hover:bg-purple-200 transition-colors">
                <span className="text-2xl">⚖️</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Mentions Légales</h2>
                <p className="text-gray-600 text-sm">Informations sur l'éditeur et l'hébergeur</p>
              </div>
            </div>
            <p className="text-gray-700">
              Informations légales sur CORBERA 10 SAS, éditeur de Golf Buddies, et hébergement des données.
            </p>
          </Link>

          {/* Suppression de compte */}
          <Link
            href="/settings/delete-account"
            className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border border-red-300 p-6 hover:shadow-2xl transition-all duration-300 group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-red-100 p-3 rounded-lg group-hover:bg-red-200 transition-colors">
                <span className="text-2xl">🗑️</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Supprimer mon compte</h2>
                <p className="text-gray-600 text-sm">Action irréversible</p>
              </div>
            </div>
            <p className="text-gray-700">
              Supprimez définitivement votre compte et toutes vos données associées.
            </p>
          </Link>
        </div>

        {/* Contact */}
        <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border border-golf-fairway/20 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>📧</span>
            Contact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">CORBERA 10 SAS</h3>
              <p className="text-gray-700 text-sm">
                71 rue Jean de Bernardy<br/>
                13001 Marseille, France<br/>
                SIREN : 529 138 919
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Support</h3>
              <p className="text-gray-700 text-sm">
                Email : <a href="mailto:contact@smaaks.fr" className="text-golf-green hover:underline">contact@smaaks.fr</a><br/>
                Réponse sous 24h en moyenne
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => router.back()}
            className="bg-golf-green hover:bg-golf-light text-white px-8 py-3 rounded-lg transition-colors font-medium"
          >
            ← Retour
          </button>
        </div>
      </div>
    </div>
  );
}