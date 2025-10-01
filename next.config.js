import withPWAInit from 'next-pwa'

const withPWA = withPWAInit({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  fallbacks: {
    document: '/offline.html',
    // Fallback pour les images
    image: '/logo-golf.png',
    // Fallback pour les autres ressources
    font: '/offline.html',
  },
  // Configuration de cache robuste pour Android
  runtimeCaching: [
    {
      // Pages de l'app : toujours vérifier le réseau d'abord
      urlPattern: /^https?:\/\/[^/]+\/(dashboard|profile|events|flights|friends|search|courses|settings).*/,
      handler: 'NetworkOnly', // Ne pas mettre en cache les pages principales
      options: {
        cacheName: 'pages-cache',
      },
    },
    {
      // API et assets : NetworkFirst avec fallback
      urlPattern: /^https?.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'offlineCache',
        expiration: {
          maxEntries: 200,
        },
        networkTimeoutSeconds: 10,
      },
    },
  ],
  // S'assurer que offline.html est bien précaché
  publicExcludes: ['!offline.html'],
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,  // 🚨 Désactivé pour tester l'hydratation
  // experimental: {        // 🚨 Turbo désactivé pour tester
  //   turbo: {
  //     rules: {}
  //   }
  // },
  images: {
    domains: ['firebasestorage.googleapis.com', 'lh3.googleusercontent.com']
  }
}

export default withPWA(nextConfig)