'use client';

import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="bg-black text-gray-300 px-6 py-10 mt-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Colonne 1 */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Golf Buddies</h3>
          <p className="text-sm leading-relaxed">
            La plateforme qui connecte les passionnés de golf pour créer
            des rencontres sportives et partager des moments inoubliables.
          </p>
        </div>

        {/* Colonne 2 */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Plateforme</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/search" className="hover:text-white">Découvrir des événements</Link></li>
            <li><Link href="/dashboard" className="hover:text-white">Mon tableau de bord</Link></li>
            <li><Link href="/profile" className="hover:text-white">Mon profil</Link></li>
            <li><Link href="/help" className="hover:text-white">Centre d'aide</Link></li>
          </ul>
        </div>

        {/* Colonne 3 */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Légal</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/settings/terms" className="hover:text-white">Conditions générales</Link></li>
            <li><Link href="/settings/privacy" className="hover:text-white">Politique de confidentialité</Link></li>
            <li><Link href="/settings/cookies" className="hover:text-white">Politique des cookies</Link></li>
            <li><Link href="/settings/legal" className="hover:text-white">Mentions légales</Link></li>
          </ul>
        </div>
      </div>

      {/* Bas du footer */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-xs text-gray-400">
        © 2025 Golf Buddies. Tous droits réservés. | contact@golfbuddies.fr
      </div>
    </footer>
  );
}