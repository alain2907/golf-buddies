'use client'
import { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { User } from '@/types'

export function useEventParticipants(playerIds: string[]) {
  const [participants, setParticipants] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchParticipants = async () => {
      if (playerIds.length === 0) {
        setParticipants([])
        setLoading(false)
        return
      }

      try {
        const participantPromises = playerIds.map(async (playerId) => {
          const userDoc = await getDoc(doc(db, 'users', playerId))
          if (userDoc.exists()) {
            return {
              uid: userDoc.id,
              ...userDoc.data(),
              createdAt: userDoc.data().createdAt?.toDate() || new Date(),
              lastActive: userDoc.data().lastActive?.toDate()
            } as User
          }
          return null
        })

        const results = await Promise.all(participantPromises)
        setParticipants(results.filter(Boolean) as User[])
      } catch (error) {
        console.error('Error fetching participants:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchParticipants()
  }, [playerIds.join(',')])

  return { participants, loading }
}
