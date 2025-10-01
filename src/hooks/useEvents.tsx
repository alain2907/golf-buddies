'use client'
import { useState, useEffect } from 'react'
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  Timestamp,
  limit
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { GolfEvent } from '@/types'
import {
  createEvent as createEventDb,
  updateEvent as updateEventDb,
  deleteEvent as deleteEventDb,
  joinEvent as joinEventDb,
  leaveEvent as leaveEventDb,
  searchEvents as searchEventsDb
} from '@/lib/firestore'

export function useEvents() {
  const [events, setEvents] = useState<GolfEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load upcoming events
  useEffect(() => {
    setLoading(true)
    const q = query(
      collection(db, 'events'),
      where('date', '>=', Timestamp.now()),
      where('status', '==', 'upcoming'),
      orderBy('date', 'asc'),
      limit(20)
    )

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const eventsData = snapshot.docs.map(doc => {
          const data = doc.data()
          return {
            id: doc.id,
            ...data,
            date: data.date?.toDate() || new Date(),
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date()
          }
        }) as GolfEvent[]
        setEvents(eventsData)
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
  }, [])

  const createEvent = async (eventData: Omit<GolfEvent, 'id'>) => {
    try {
      const eventId = await createEventDb(eventData)
      return eventId
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  const updateEvent = async (eventId: string, data: Partial<GolfEvent>) => {
    try {
      await updateEventDb(eventId, data)
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  const deleteEvent = async (eventId: string) => {
    try {
      await deleteEventDb(eventId)
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  const joinEvent = async (eventId: string, userId: string, userName: string, userPhoto?: string, userHandicap?: number) => {
    try {
      await joinEventDb(eventId, userId, userName, userPhoto, userHandicap)
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  const leaveEvent = async (eventId: string, userId: string) => {
    try {
      await leaveEventDb(eventId, userId)
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  const searchEvents = async (filters: any) => {
    try {
      const results = await searchEventsDb(filters)
      return results
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  return {
    events,
    loading,
    error,
    createEvent,
    updateEvent,
    deleteEvent,
    joinEvent,
    leaveEvent,
    searchEvents
  }
}

// Hook for a single event with real-time updates
export function useEvent(eventId: string | null) {
  const [event, setEvent] = useState<GolfEvent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!eventId) {
      setEvent(null)
      setLoading(false)
      return
    }

    setLoading(true)
    const { subscribeToEvent } = require('@/lib/firestore')

    const unsubscribe = subscribeToEvent(eventId, (eventData: GolfEvent | null) => {
      setEvent(eventData)
      setLoading(false)
      setError(eventData ? null : 'Event not found')
    })

    return () => unsubscribe()
  }, [eventId])

  return { event, loading, error }
}

// Hook for user's events
export function useUserEvents(userId: string | undefined) {
  const [events, setEvents] = useState<GolfEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) {
      setEvents([])
      setLoading(false)
      return
    }

    setLoading(true)
    const q = query(
      collection(db, 'events'),
      where('currentPlayers', 'array-contains', userId),
      orderBy('date', 'desc')
    )

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const eventsData = snapshot.docs.map(doc => {
          const data = doc.data()
          return {
            id: doc.id,
            ...data,
            date: data.date?.toDate() || new Date(),
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date()
          }
        }) as GolfEvent[]
        setEvents(eventsData)
        setLoading(false)
        setError(null)
      },
      (err) => {
        console.error('Error loading user events:', err)
        setError(err.message)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [userId])

  return { events, loading, error }
}