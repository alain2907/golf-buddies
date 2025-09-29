'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { Home, Search, Plus, User, Calendar } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Navigation() {
  const pathname = usePathname()
  const { user } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Protection hydratation - ne rien rendre côté serveur
  if (!mounted) return null
  if (!user) return null

  const isActive = (path: string) => pathname === path

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 glass-effect md:hidden z-50">
      <div className="grid grid-cols-5 h-16">
        <NavItem
          href="/dashboard"
          icon={<Home className="w-5 h-5" />}
          label="Home"
          active={isActive('/dashboard')}
        />
        <NavItem
          href="/search"
          icon={<Search className="w-5 h-5" />}
          label="Search"
          active={isActive('/search')}
        />
        <NavItem
          href="/create"
          icon={<Plus className="w-6 h-6" />}
          label="Create"
          active={isActive('/create')}
          isCenter
        />
        <NavItem
          href="/events"
          icon={<Calendar className="w-5 h-5" />}
          label="Events"
          active={isActive('/events')}
        />
        <NavItem
          href="/profile"
          icon={<User className="w-5 h-5" />}
          label="Profile"
          active={isActive('/profile')}
        />
      </div>
    </nav>
  )
}

function NavItem({ href, icon, label, active, isCenter }: any) {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center justify-center transition-colors ${
        active ? 'text-golf-green' : 'text-gray-500 hover:text-golf-light'
      } ${isCenter ? 'relative' : ''}`}
    >
      {isCenter ? (
        <div className="absolute -top-4 bg-gradient-to-r from-golf-green to-golf-light rounded-full p-3 shadow-lg">
          <div className="text-white">{icon}</div>
        </div>
      ) : (
        <>
          {icon}
          <span className="text-xs mt-1">{label}</span>
        </>
      )}
    </Link>
  )
}