'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react'
import toast from 'react-hot-toast'
import dynamic from 'next/dynamic'

const GoogleSignInButton = dynamic(() => import('@/components/GoogleSignInButton'), {
  ssr: false
})

export default function SignupPage() {
  const { signUp, user, loading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard')
    }
  }, [user, loading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (!formData.displayName.trim()) {
        toast.error('Veuillez entrer votre nom d\'utilisateur')
        setIsSubmitting(false)
        return
      }
      if (formData.password !== formData.confirmPassword) {
        toast.error('Les mots de passe ne correspondent pas')
        setIsSubmitting(false)
        return
      }
      if (formData.password.length < 6) {
        toast.error('Le mot de passe doit contenir au moins 6 caractères')
        setIsSubmitting(false)
        return
      }
      await signUp(formData.email, formData.password, formData.displayName)
    } catch (error: any) {
      toast.error(error.message || 'Une erreur est survenue')
    } finally {
      setIsSubmitting(false)
    }
  }


  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>Loading...</div>
      </div>
    )
  }

  if (user) {
    return null
  }

  return (
    <div style={{ minHeight: '100vh', padding: '16px', paddingBottom: '80px' }}>
      {/* Navbar */}
      <nav style={{
        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        padding: '24px 48px',
        marginBottom: '20px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h1 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: 'white',
              margin: 0
            }}>
              Inscription
            </h1>
          </div>
          <button
            onClick={() => router.push('/')}
            style={{
              background: 'white',
              color: '#4facfe',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Accueil
          </button>
        </div>
      </nav>

      {/* Contenu principal */}
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <div style={{
          background: 'white',
          padding: '32px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          marginBottom: '24px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            {/* Logo */}
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              margin: '0 auto 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
              color: 'white'
            }}>
              🏌️
            </div>

            {/* Title */}
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>
              Inscription
            </h2>
            <p style={{ fontSize: '16px', color: '#666', marginBottom: '0' }}>
              Rejoignez la communauté Golf Buddies
            </p>
          </div>

        {/* Google Sign In */}
        <div style={{ marginBottom: '24px' }}>
          <GoogleSignInButton />
        </div>

        <div style={{ position: 'relative', marginBottom: '24px' }}>
          <div style={{ position: 'absolute', inset: '0', display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '100%', borderTop: '1px solid #d1d5db' }} />
          </div>
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', fontSize: '14px' }}>
            <span style={{ padding: '0 8px', background: 'white', color: '#6b7280' }}>ou</span>
          </div>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
              Nom d&apos;utilisateur
            </label>
            <div style={{ position: 'relative' }}>
              <User style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', width: '20px', height: '20px' }} />
              <input
                type="text"
                value={formData.displayName}
                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                style={{
                  width: '100%',
                  paddingLeft: '40px',
                  paddingRight: '16px',
                  paddingTop: '12px',
                  paddingBottom: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
                placeholder="Votre nom d&apos;utilisateur"
                required
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
              Email
            </label>
            <div style={{ position: 'relative' }}>
              <Mail style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', width: '20px', height: '20px' }} />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: '100%',
                  paddingLeft: '40px',
                  paddingRight: '16px',
                  paddingTop: '12px',
                  paddingBottom: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
                placeholder="votre@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
              Mot de passe
            </label>
            <div style={{ position: 'relative' }}>
              <Lock style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', width: '20px', height: '20px' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                style={{
                  width: '100%',
                  paddingLeft: '40px',
                  paddingRight: '48px',
                  paddingTop: '12px',
                  paddingBottom: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
                placeholder="••••••••"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {showPassword ? <EyeOff style={{ width: '20px', height: '20px' }} /> : <Eye style={{ width: '20px', height: '20px' }} />}
              </button>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
              Confirmer le mot de passe
            </label>
            <div style={{ position: 'relative' }}>
              <Lock style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', width: '20px', height: '20px' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                style={{
                  width: '100%',
                  paddingLeft: '40px',
                  paddingRight: '16px',
                  paddingTop: '12px',
                  paddingBottom: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
                placeholder="Confirmez votre mot de passe"
                required
                minLength={6}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              background: isSubmitting ? '#9ca3af' : '#4facfe',
              color: 'white',
              fontWeight: '500',
              padding: '12px 16px',
              borderRadius: '8px',
              border: 'none',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              opacity: isSubmitting ? 0.5 : 1,
              transition: 'background-color 0.2s, opacity 0.2s'
            }}
            onMouseOver={(e) => {
              if (!isSubmitting) {
                (e.target as HTMLButtonElement).style.backgroundColor = '#3b82f6'
              }
            }}
            onMouseOut={(e) => {
              if (!isSubmitting) {
                (e.target as HTMLButtonElement).style.backgroundColor = '#4facfe'
              }
            }}
          >
            {isSubmitting ? 'Chargement...' : "S'inscrire"}
          </button>
        </form>

        {/* Toggle Login/Signup */}
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <button
            onClick={() => router.push('/login')}
            style={{
              color: '#4facfe',
              fontWeight: '500',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              transition: 'color 0.2s'
            }}
            onMouseOver={(e) => (e.target as HTMLButtonElement).style.color = '#3b82f6'}
            onMouseOut={(e) => (e.target as HTMLButtonElement).style.color = '#4facfe'}
          >
            Déjà un compte ? Se connecter
          </button>
        </div>

        </div>
      </div>

      {/* Barre de navigation en bas */}
      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'white',
        borderTop: '1px solid #e5e7eb',
        padding: '12px 0',
        zIndex: 50
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          maxWidth: '480px',
          margin: '0 auto'
        }}>
          {/* Home */}
          <div
            onClick={() => router.push('/dashboard')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
              color: '#6b7280'
            }}
          >
            <span style={{ fontSize: '24px' }}>🏠</span>
            <span style={{ fontSize: '12px', fontWeight: '500' }}>Home</span>
          </div>

          {/* Search */}
          <div
            onClick={() => router.push('/search')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
              color: '#6b7280'
            }}
          >
            <span style={{ fontSize: '24px' }}>🔍</span>
            <span style={{ fontSize: '12px', fontWeight: '500' }}>Search</span>
          </div>

          {/* Events */}
          <div
            onClick={() => router.push('/events')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
              color: '#6b7280'
            }}
          >
            <span style={{ fontSize: '24px' }}>📅</span>
            <span style={{ fontSize: '12px', fontWeight: '500' }}>Events</span>
          </div>

          {/* Profile */}
          <div
            onClick={() => router.push('/profile')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
              color: '#6b7280'
            }}
          >
            <span style={{ fontSize: '24px' }}>👤</span>
            <span style={{ fontSize: '12px', fontWeight: '500' }}>Profile</span>
          </div>
        </div>
      </nav>
    </div>
  )
}