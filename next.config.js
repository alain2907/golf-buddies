import withPWAInit from 'next-pwa'

const withPWA = withPWAInit({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  fallbacks: {
    document: '/offline'
  }
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