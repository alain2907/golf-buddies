'use client'

import { useAuth } from '@/hooks/useAuth'

export default function HydrationGuard({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth()
  if (loading) return null // ou un splash screen stable
  return <>{children}</>
}