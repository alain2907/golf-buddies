import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/hooks/useAuth'
import { Toaster } from 'react-hot-toast'
import Navigation from '@/components/navigation/Navigation'
import EmailVerificationGuard from '@/components/auth/EmailVerificationGuard'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Golf Buddies - Find Your Perfect Golf Partner',
  description: 'Connect with golfers, join rounds, organize tournaments, and improve your game',
  keywords: 'golf, golf partners, tee times, golf rounds, golf tournaments, golf app',
  authors: [{ name: 'Golf Buddies Team' }],
  openGraph: {
    title: 'Golf Buddies - Find Your Perfect Golf Partner',
    description: 'Connect with golfers, join rounds, and improve your game',
    type: 'website',
    locale: 'en_US',
    siteName: 'Golf Buddies',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Golf Buddies',
    description: 'Find your perfect golf partner',
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#2D5016',
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
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
              <main className="flex-1 pb-16 md:pb-0">
                {children}
              </main>
              <Navigation />
            </div>
          </EmailVerificationGuard>
        </AuthProvider>
      </body>
    </html>
  )
}