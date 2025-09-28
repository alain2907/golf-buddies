'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import {
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  updateProfile as updateFirebaseProfile
} from 'firebase/auth'
import { auth, googleProvider, db } from '@/lib/firebase'
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { User } from '@/types'
import toast from 'react-hot-toast'

interface AuthContextType {
  user: User | null
  firebaseUser: FirebaseUser | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, displayName: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  logout: () => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null)
  const [loading, setLoading] = useState(true)

  // Check for redirect result on mount
  useEffect(() => {
    const checkRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth)
        if (result?.user) {
          await handleUserLogin(result.user)
        }
      } catch (error: any) {
        console.error('Redirect error:', error)
        toast.error('Login failed. Please try again.')
      }
    }
    checkRedirectResult()
  }, [])

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setFirebaseUser(firebaseUser)

      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
        if (userDoc.exists()) {
          const userData = userDoc.data() as User
          setUser(userData)
          // Update last active
          await updateDoc(doc(db, 'users', firebaseUser.uid), {
            lastActive: serverTimestamp()
          })
        } else {
          // Create profile if it doesn't exist
          await handleUserLogin(firebaseUser)
        }
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const handleUserLogin = async (firebaseUser: FirebaseUser) => {
    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))

    if (!userDoc.exists()) {
      // Create new user profile
      const userData: User = {
        uid: firebaseUser.uid,
        email: firebaseUser.email!,
        displayName: firebaseUser.displayName || 'Golfer',
        photoURL: firebaseUser.photoURL || undefined,
        createdAt: new Date(),
        preferences: {
          playStyle: 'casual',
          preferredTeeTime: 'morning',
          walkingOrCart: 'both',
          notifications: true
        },
        stats: {
          roundsPlayed: 0,
          averageScore: 0,
          bestScore: 0
        }
      }

      await setDoc(doc(db, 'users', firebaseUser.uid), {
        ...userData,
        createdAt: serverTimestamp(),
        lastActive: serverTimestamp()
      })

      setUser(userData)
      toast.success('Welcome to Golf Buddies!')
    } else {
      setUser(userDoc.data() as User)
    }
  }

  const signUp = async (email: string, password: string, displayName: string) => {
    try {
      const { user: newUser } = await createUserWithEmailAndPassword(auth, email, password)

      // Update Firebase profile
      await updateFirebaseProfile(newUser, { displayName })

      // Create Firestore user document
      const userData: User = {
        uid: newUser.uid,
        email: newUser.email!,
        displayName,
        createdAt: new Date(),
        preferences: {
          playStyle: 'casual',
          preferredTeeTime: 'morning',
          walkingOrCart: 'both',
          notifications: true
        },
        stats: {
          roundsPlayed: 0,
          averageScore: 0,
          bestScore: 0
        }
      }

      await setDoc(doc(db, 'users', newUser.uid), {
        ...userData,
        createdAt: serverTimestamp(),
        lastActive: serverTimestamp()
      })

      setUser(userData)
      toast.success('Account created successfully!')
    } catch (error: any) {
      console.error('Signup error:', error)
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('This email is already registered')
      }
      throw error
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast.success('Welcome back!')
    } catch (error: any) {
      console.error('Signin error:', error)
      if (error.code === 'auth/user-not-found') {
        throw new Error('No account found with this email')
      }
      if (error.code === 'auth/wrong-password') {
        throw new Error('Incorrect password')
      }
      throw error
    }
  }

  const signInWithGoogle = async () => {
    try {
      // Try popup first, fall back to redirect if blocked
      try {
        const result = await signInWithPopup(auth, googleProvider)
        await handleUserLogin(result.user)
        toast.success('Welcome!')
      } catch (popupError: any) {
        if (popupError.code === 'auth/popup-blocked') {
          // Fall back to redirect
          await signInWithRedirect(auth, googleProvider)
        } else {
          throw popupError
        }
      }
    } catch (error: any) {
      console.error('Google signin error:', error)
      toast.error('Google sign-in failed. Please try again.')
      throw error
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      setUser(null)
      setFirebaseUser(null)
      toast.success('Logged out successfully')
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('Logout failed')
      throw error
    }
  }

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return

    try {
      const updatedUser = { ...user, ...data }
      await updateDoc(doc(db, 'users', user.uid), {
        ...data,
        updatedAt: serverTimestamp()
      })
      setUser(updatedUser)

      // Update Firebase profile if displayName or photoURL changed
      if (firebaseUser && (data.displayName || data.photoURL)) {
        await updateFirebaseProfile(firebaseUser, {
          displayName: data.displayName || firebaseUser.displayName,
          photoURL: data.photoURL || firebaseUser.photoURL
        })
      }

      toast.success('Profile updated successfully')
    } catch (error) {
      console.error('Update profile error:', error)
      toast.error('Failed to update profile')
      throw error
    }
  }

  const resetPassword = async (email: string) => {
    const { sendPasswordResetEmail } = await import('firebase/auth')
    try {
      await sendPasswordResetEmail(auth, email)
      toast.success('Password reset email sent!')
    } catch (error: any) {
      console.error('Reset password error:', error)
      if (error.code === 'auth/user-not-found') {
        throw new Error('No account found with this email')
      }
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      firebaseUser,
      loading,
      signIn,
      signUp,
      signInWithGoogle,
      logout,
      updateProfile,
      resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}