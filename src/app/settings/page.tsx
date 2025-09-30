'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SettingsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-golf-fairway/10 to-golf-sky/20 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-golf-green via-golf-light to-golf-fairway shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-20">
            <button
              onClick={() => router.back()}
              className="text-white hover:bg-white/20 mr-4 px-4 py-2 rounded-lg transition-colors"
            >
              ← Retour
            </button>
            <h1 className="text-2xl font-bold text-white">
              ⚙️ Paramètres et Informations Légales
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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