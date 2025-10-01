'use client'
import { useState, useEffect } from 'react'
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { JoinRequest } from '@/types'
import { acceptJoinRequest, rejectJoinRequest } from '@/lib/firestore'

export function useJoinRequests(eventId: string | null) {
  const [requests, setRequests] = useState<JoinRequest[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!eventId) {
      setRequests([])
      setLoading(false)
      return
    }

    const q = query(
      collection(db, 'joinRequests'),
      where('eventId', '==', eventId),
      where('status', '==', 'pending'),
      orderBy('createdAt', 'desc')
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const requestsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        respondedAt: doc.data().respondedAt?.toDate()
      })) as JoinRequest[]

      setRequests(requestsData)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [eventId])

  const acceptRequest = async (requestId: string, eventId: string, userId: string, requesterName: string, eventTitle: string) => {
    try {
      await acceptJoinRequest(requestId, eventId, userId)

      // Notifier le demandeur
      await addDoc(collection(db, 'notifications'), {
        userId: userId,
        type: 'join_request_accepted',
        title: 'Demande acceptée !',
        message: `Votre demande pour "${eventTitle}" a été acceptée.`,
        eventId: eventId,
        read: false,
        createdAt: serverTimestamp()
      })
    } catch (error) {
      console.error('Error accepting request:', error)
      throw error
    }
  }

  const rejectRequest = async (requestId: string, userId: string, eventTitle: string) => {
    try {
      await rejectJoinRequest(requestId)

      // Notifier le demandeur
      await addDoc(collection(db, 'notifications'), {
        userId: userId,
        type: 'join_request_rejected',
        title: 'Demande refusée',
        message: `Votre demande pour "${eventTitle}" a été refusée.`,
        read: false,
        createdAt: serverTimestamp()
      })
    } catch (error) {
      console.error('Error rejecting request:', error)
      throw error
    }
  }

  return {
    requests,
    loading,
    acceptRequest,
    rejectRequest
  }
}

// Hook pour vérifier le statut de demande d'un utilisateur
export function useUserJoinRequest(eventId: string | null, userId: string | undefined) {
  const [request, setRequest] = useState<JoinRequest | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!eventId || !userId) {
      setRequest(null)
      setLoading(false)
      return
    }

    const q = query(
      collection(db, 'joinRequests'),
      where('eventId', '==', eventId),
      where('userId', '==', userId),
      where('status', '==', 'pending')
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const doc = snapshot.docs[0]
        setRequest({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          respondedAt: doc.data().respondedAt?.toDate()
        } as JoinRequest)
      } else {
        setRequest(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [eventId, userId])

  return {
    request,
    loading
  }
}
