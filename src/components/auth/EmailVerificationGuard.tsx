'use client'
import { useAuth } from '@/hooks/useAuth'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

interface EmailVerificationGuardProps {
  children: React.ReactNode
}

export default function EmailVerificationGuard({ children }: EmailVerificationGuardProps) {
  const { firebaseUser, needsEmailVerification, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Don't redirect if still loading or on verify-email page
    if (loading || pathname === '/verify-email') return

    // Redirect to verify-email page if user needs email verification
    if (firebaseUser && needsEmailVerification) {
      router.push('/verify-email')
    }
  }, [firebaseUser, needsEmailVerification, loading, router, pathname])

  // Show loading while checking
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  // Show children if email is verified or user is not logged in
  if (!firebaseUser || !needsEmailVerification || pathname === '/verify-email') {
    return <>{children}</>
  }

  // Show loading while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner />
    </div>
  )
}