'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { Mail, RefreshCw, CheckCircle } from 'lucide-react'

export default function VerifyEmailPage() {
  const { firebaseUser, sendVerificationEmail, checkEmailVerification, needsEmailVerification } = useAuth()
  const [isChecking, setIsChecking] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Redirect if email is already verified or no user
    if (!firebaseUser || !needsEmailVerification) {
      router.push('/')
    }
  }, [firebaseUser, needsEmailVerification, router])

  const handleCheckVerification = async () => {
    setIsChecking(true)
    try {
      const isVerified = await checkEmailVerification()
      if (isVerified) {
        router.push('/')
      }
    } catch (error: any) {
      console.error('Check verification error:', error)
    } finally {
      setIsChecking(false)
    }
  }

  const handleResendEmail = async () => {
    setIsSending(true)
    try {
      await sendVerificationEmail()
    } catch (error: any) {
      console.error('Resend email error:', error)
    } finally {
      setIsSending(false)
    }
  }

  if (!firebaseUser || !needsEmailVerification) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-golf-green to-golf-sand flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center">
          {/* Icon */}
          <div className="mx-auto w-16 h-16 bg-golf-green/10 rounded-full flex items-center justify-center mb-6">
            <Mail className="w-8 h-8 text-golf-green" />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Verify Your Email
          </h1>

          {/* Subtitle */}
          <p className="text-gray-600 mb-6">
            We&apos;ve sent a verification email to
          </p>

          {/* Email */}
          <div className="bg-gray-50 rounded-lg p-3 mb-6">
            <p className="font-medium text-golf-green">
              {firebaseUser.email}
            </p>
          </div>

          {/* Instructions */}
          <div className="text-left bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-blue-900 mb-2">Next steps:</h3>
            <ol className="text-sm text-blue-800 space-y-1">
              <li>1. Check your email inbox</li>
              <li>2. Click the verification link</li>
              <li>3. Return here and click &quot;I&apos;ve verified&quot;</li>
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleCheckVerification}
              disabled={isChecking}
              className="w-full bg-golf-green hover:bg-golf-green/90 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isChecking ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Checking...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  I&apos;ve verified my email
                </>
              )}
            </button>

            <button
              onClick={handleResendEmail}
              disabled={isSending}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSending ? 'Sending...' : 'Resend verification email'}
            </button>
          </div>

          {/* Help text */}
          <p className="text-sm text-gray-500 mt-6">
            Didn&apos;t receive the email? Check your spam folder or click resend.
          </p>
        </div>
      </div>
    </div>
  )
}