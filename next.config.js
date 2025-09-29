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

export default nextConfig