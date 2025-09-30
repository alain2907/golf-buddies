import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/hooks/useAuth'
import { Toaster } from 'react-hot-toast'
import EmailVerificationGuard from '@/components/auth/EmailVerificationGuard'
import HydrationGuard from '@/components/HydrationGuard'
import Navigation from '@/components/Navigation'
import PWAInstaller from '@/components/PWAInstaller'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: 'Golf Buddies - Trouvez votre partenaire de golf parfait',
  description:
    'Connectez-vous avec des golfeurs, rejoignez des parties, organisez des tournois et améliorez votre jeu',
  keywords:
    'golf, partenaires golf, réservation golf, parties golf, tournois golf, app golf, golfeurs france',
  authors: [{ name: 'Golf Buddies Team' }],
  openGraph: {
    title: 'Golf Buddies - Trouvez votre partenaire de golf parfait',
    description: 'Connectez-vous avec des golfeurs, rejoignez des parties et améliorez votre jeu',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Golf Buddies',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Golf Buddies',
    description: 'Trouvez votre partenaire de golf parfait',
  },
  themeColor: '#2D5016',
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Golf Buddies" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <HydrationGuard>
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#333',
                  color: '#fff',
                  borderRadius: '12px',
                  padding: '16px',
                },
                success: {
                  iconTheme: {
                    primary: '#4A7C2E',
                    secondary: '#fff',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#EF4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
            <EmailVerificationGuard>
              <div className="min-h-screen flex flex-col">
                <Navigation />
                <main className="flex-1 pb-16 md:pb-0">{children}</main>
              </div>
              <PWAInstaller />
            </EmailVerificationGuard>
          </HydrationGuard>
        </AuthProvider>
      </body>
    </html>
  )
}