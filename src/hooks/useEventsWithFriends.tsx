'use client'
import { useState, useEffect } from 'react'
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  Timestamp,
  limit,
  getDocs
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { GolfEvent } from '@/types'
import { useAuth } from './useAuth'
import { useFriends } from './useFriends'

export function useEventsWithFriends() {
  const { user } = useAuth()
  const { friends } = useFriends()
  const [events, setEvents] = useState<GolfEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) {
      setEvents([])
      setLoading(false)
      return
    }

    setLoading(true)

    // Récupérer tous les événements à venir
    const q = query(
      collection(db, 'events'),
      where('date', '>=', Timestamp.now()),
      where('status', '==', 'upcoming'),
      orderBy('date', 'asc'),
      limit(50)
    )

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const allEvents = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          date: doc.data().date?.toDate() || new Date(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate() || new Date()
        })) as GolfEvent[]

        // Filtrer les événements selon leur mode d'invitation
        const visibleEvents = allEvents.filter(event => {
          // Les événements communautaires sont visibles par tous
          if (event.inviteMode === 'community') {
            return true
          }

          // Les événements "amis uniquement" ne sont visibles que par :
          // 1. L'organisateur
          if (event.organizerId === user.uid) {
            return true
          }

          // 2. Les amis de l'organisateur
          const friendUserIds = friends.map(friend => friend.uid)
          if (friendUserIds.includes(event.organizerId)) {
            return true
          }

          // 3. Les participants déjà dans l'événement
          if (event.currentPlayers.includes(user.uid)) {
            return true
          }

          return false
        })

        setEvents(visibleEvents)
        setLoading(false)
        setError(null)
      },
      (err) => {
        console.error('Error loading events:', err)
        setError(err.message)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [user, friends])

  return {
    events,
    loading,
    error
  }
}

// Hook pour vérifier si un utilisateur peut voir un événement spécifique
export function useCanViewEvent(event: GolfEvent | null) {
  const { user } = useAuth()
  const { friends } = useFriends()

  if (!event || !user) return false

  // Les événements communautaires sont visibles par tous
  if (event.inviteMode === 'community') {
    return true
  }

  // Les événements "amis uniquement" ne sont visibles que par :
  // 1. L'organisateur
  if (event.organizerId === user.uid) {
    return true
  }

  // 2. Les amis de l'organisateur
  const friendUserIds = friends.map(friend => friend.uid)
  if (friendUserIds.includes(event.organizerId)) {
    return true
  }

  // 3. Les participants déjà dans l'événement
  if (event.currentPlayers.includes(user.uid)) {
    return true
  }

  return false
}