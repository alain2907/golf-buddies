'use client';

import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Description */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl sm:text-2xl">🏌️</span>
              <h2 className="text-xl sm:text-2xl font-bold">Golf Buddies</h2>
            </div>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-md">
              La plateforme golf qui connecte les passionnés pour créer des parties de golf et partager des moments inoubliables sur les plus beaux parcours.
            </p>
          </div>

          {/* Plateforme */}
          <div className="sm:col-span-1">
            <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Plateforme</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/search"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Découvrir des parties
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Mon tableau de bord
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Mon profil
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Centre d'aide
                </Link>
              </li>
            </ul>
          </div>

          {/* Légal */}
          <div className="sm:col-span-1">
            <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Légal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/settings/terms"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  CGU
                </Link>
              </li>
              <li>
                <Link
                  href="/settings/privacy"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link
                  href="/settings/cookies"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Cookies
                </Link>
              </li>
              <li>
                <Link
                  href="/settings/legal"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Séparateur */}
        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Contact */}
            <div>
              <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Contact</h3>
              <div className="space-y-1 sm:space-y-2 text-sm text-gray-300">
                <p><strong className="text-white">CORBERA 10 SAS</strong></p>
                <p>71 rue Jean de Bernardy</p>
                <p>13001 Marseille, France</p>
                <p>SIREN : 529 138 919</p>
                <p>
                  Email: <a
                    href="mailto:contact@smaaks.fr"
                    className="text-green-400 hover:text-green-300 transition-colors"
                  >
                    contact@smaaks.fr
                  </a>
                </p>
              </div>
            </div>

            {/* Copyright */}
            <div className="flex flex-col justify-end">
              <div className="text-center lg:text-right">
                <p className="text-sm text-gray-400">
                  © {new Date().getFullYear()} Golf Buddies - CORBERA 10 SAS
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Tous droits réservés
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}