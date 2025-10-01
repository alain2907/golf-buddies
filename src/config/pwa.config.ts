/**
 * Configuration PWA générique
 * À adapter selon les besoins de votre application
 */

export const PWA_CONFIG = {
  // Ressources à mettre en cache au premier chargement
  precacheResources: [
    '/',
    '/offline',
    '/manifest.json',
    // Ajoutez vos pages importantes ici
  ],

  // Stratégies de cache par type de ressource
  cacheStrategies: {
    images: 'cache-first',
    api: 'network-first',
    static: 'cache-first'
  },

  // Durée de vie du cache (en secondes)
  cacheDuration: {
    images: 7 * 24 * 60 * 60, // 7 jours
    api: 5 * 60, // 5 minutes
    static: 30 * 24 * 60 * 60 // 30 jours
  },

  // Options de synchronisation
  syncOptions: {
    interval: 30000, // 30 secondes
    maxRetries: 3,
    retryDelay: 5000 // 5 secondes
  }
};

// Configuration manifest.json de base
export const MANIFEST_TEMPLATE = {
  name: 'Nom de votre App',
  short_name: 'App',
  description: 'Description de votre application',
  theme_color: '#5A2D82',
  background_color: '#ffffff',
  display: 'standalone',
  orientation: 'portrait',
  scope: '/',
  start_url: '/',
  lang: 'fr',
  icons: [
    {
      src: '/icons/icon-192x192.png',
      sizes: '192x192',
      type: 'image/png'
    },
    {
      src: '/icons/icon-512x512.png',
      sizes: '512x512',
      type: 'image/png'
    }
  ]
};
