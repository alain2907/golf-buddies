'use client'
import { useState, useEffect } from 'react'
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  Timestamp,
  deleteDoc
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Notification, NotificationType, NotificationPreferences } from '@/types/notifications'
import { useAuth } from './useAuth'

export function useNotifications() {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Écouter les notifications de l'utilisateur
  useEffect(() => {
    if (!user?.uid) {
      setNotifications([])
      setUnreadCount(0)
      setLoading(false)
      return
    }

    setLoading(true)
    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    )

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const notificationData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          scheduledFor: doc.data().scheduledFor?.toDate()
        })) as Notification[]

        setNotifications(notificationData)
        setUnreadCount(notificationData.filter(n => !n.read).length)
        setLoading(false)
        setError(null)
      },
      (err) => {
        console.error('Error loading notifications:', err)
        setError(err.message)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [user?.uid])

  const createNotification = async (
    userId: string,
    type: NotificationType,
    title: string,
    message: string,
    eventId?: string,
    data?: any,
    scheduledFor?: Date
  ) => {
    try {
      const notificationData = {
        userId,
        type,
        title,
        message,
        eventId,
        data,
        read: false,
        createdAt: Timestamp.now(),
        scheduledFor: scheduledFor ? Timestamp.fromDate(scheduledFor) : null
      }

      const docRef = await addDoc(collection(db, 'notifications'), notificationData)
      return docRef.id
    } catch (error: any) {
      setError(error.message)
      throw error
    }
  }

  const markAsRead = async (notificationId: string) => {
    try {
      await updateDoc(doc(db, 'notifications', notificationId), {
        read: true
      })
    } catch (error: any) {
      setError(error.message)
      throw error
    }
  }

  const markAllAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter(n => !n.read)
      const promises = unreadNotifications.map(n => markAsRead(n.id))
      await Promise.all(promises)
    } catch (error: any) {
      setError(error.message)
      throw error
    }
  }

  const deleteNotification = async (notificationId: string) => {
    try {
      await deleteDoc(doc(db, 'notifications', notificationId))
    } catch (error: any) {
      setError(error.message)
      throw error
    }
  }

  // Créer notification pour nouvelle partie compatible
  const notifyCompatibleEvent = async (
    userId: string,
    eventId: string,
    eventTitle: string,
    courseName: string
  ) => {
    return createNotification(
      userId,
      'new_compatible_event',
      'Nouvelle partie compatible !',
      `Une partie "${eventTitle}" au ${courseName} correspond à vos critères.`,
      eventId
    )
  }

  // Programmer rappels automatiques
  const scheduleEventReminders = async (
    userId: string,
    eventId: string,
    eventTitle: string,
    eventDate: Date
  ) => {
    const reminder24h = new Date(eventDate.getTime() - 24 * 60 * 60 * 1000)
    const reminder1h = new Date(eventDate.getTime() - 60 * 60 * 1000)

    const promises = []

    // Rappel 24h avant
    if (reminder24h > new Date()) {
      promises.push(
        createNotification(
          userId,
          'event_reminder_24h',
          'Partie demain !',
          `N'oubliez pas votre partie "${eventTitle}" demain.`,
          eventId,
          null,
          reminder24h
        )
      )
    }

    // Rappel 1h avant
    if (reminder1h > new Date()) {
      promises.push(
        createNotification(
          userId,
          'event_reminder_1h',
          'Partie dans 1 heure !',
          `Votre partie "${eventTitle}" commence dans 1 heure. Préparez-vous !`,
          eventId,
          null,
          reminder1h
        )
      )
    }

    return Promise.all(promises)
  }

  // Notifier flight complet
  const notifyFlightComplete = async (
    userIds: string[],
    eventId: string,
    eventTitle: string
  ) => {
    const promises = userIds.map(userId =>
      createNotification(
        userId,
        'flight_complete',
        'Flight complet !',
        `Votre partie "${eventTitle}" est maintenant complète. Rendez-vous sur le parcours !`,
        eventId
      )
    )

    return Promise.all(promises)
  }

  return {
    notifications,
    unreadCount,
    loading,
    error,
    createNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    notifyCompatibleEvent,
    scheduleEventReminders,
    notifyFlightComplete
  }
}

// Hook pour les préférences de notifications
export function useNotificationPreferences() {
  const { user } = useAuth()
  const [preferences, setPreferences] = useState<NotificationPreferences | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.uid) {
      setPreferences(null)
      setLoading(false)
      return
    }

    // Charger les préférences utilisateur
    const loadPreferences = async () => {
      try {
        // Pour l'instant, on utilise des valeurs par défaut
        // Plus tard, on pourra les stocker en base
        const defaultPrefs: NotificationPreferences = {
          userId: user.uid,
          email: true,
          push: true,
          compatibleEvents: true,
          reminders: true,
          eventUpdates: true,
          updatedAt: new Date()
        }

        setPreferences(defaultPrefs)
        setLoading(false)
      } catch (error) {
        console.error('Error loading notification preferences:', error)
        setLoading(false)
      }
    }

    loadPreferences()
  }, [user?.uid])

  const updatePreferences = async (updates: Partial<NotificationPreferences>) => {
    if (!preferences) return

    const updatedPrefs = { ...preferences, ...updates, updatedAt: new Date() }
    setPreferences(updatedPrefs)

    // TODO: Sauvegarder en base de données
    console.log('Notification preferences updated:', updatedPrefs)
  }

  return {
    preferences,
    loading,
    updatePreferences
  }
}