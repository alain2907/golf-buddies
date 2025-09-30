'use client'
import {
  collection,
  query,
  where,
  getDocs,
  Timestamp
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { GolfEvent } from '@/types/index'

interface CompatibilityFactors {
  dateRange: number // heures avant/après
  locationRadius: number // km autour
  levelMatch: boolean
  gameTypeMatch: boolean
}

const DEFAULT_COMPATIBILITY: CompatibilityFactors = {
  dateRange: 3, // ±3 heures
  locationRadius: 25, // 25km
  levelMatch: true,
  gameTypeMatch: false // Optionnel
}

export async function findCompatibleEvents(
  newEvent: GolfEvent,
  compatibility: CompatibilityFactors = DEFAULT_COMPATIBILITY
): Promise<{ event: GolfEvent; users: string[] }[]> {
  try {
    // Calculer la plage de dates
    const eventTime = newEvent.date.getTime()
    const timeBuffer = compatibility.dateRange * 60 * 60 * 1000 // heures en ms
    const startTime = new Date(eventTime - timeBuffer)
    const endTime = new Date(eventTime + timeBuffer)

    // Chercher les événements dans la plage de temps
    const eventsRef = collection(db, 'events')
    const timeQuery = query(
      eventsRef,
      where('date', '>=', Timestamp.fromDate(startTime)),
      where('date', '<=', Timestamp.fromDate(endTime)),
      where('status', '==', 'upcoming')
    )

    const snapshot = await getDocs(timeQuery)
    const potentialEvents: GolfEvent[] = []

    snapshot.docs.forEach(doc => {
      const eventData = {
        id: doc.id,
        ...doc.data(),
        date: doc.data().date.toDate(),
        createdAt: doc.data().createdAt.toDate(),
        updatedAt: doc.data().updatedAt.toDate()
      } as GolfEvent

      // Exclure l'événement nouvellement créé
      if (eventData.id !== newEvent.id) {
        potentialEvents.push(eventData)
      }
    })

    // Filtrer par compatibilité
    const compatibleEvents = potentialEvents.filter(event => {
      return isEventCompatible(newEvent, event, compatibility)
    })

    // Retourner avec les utilisateurs intéressés
    const results = await Promise.all(
      compatibleEvents.map(async event => {
        const interestedUsers = await findInterestedUsers(newEvent, event)
        return { event, users: interestedUsers }
      })
    )

    return results.filter(result => result.users.length > 0)

  } catch (error) {
    console.error('Error finding compatible events:', error)
    return []
  }
}

function isEventCompatible(
  newEvent: GolfEvent,
  existingEvent: GolfEvent,
  compatibility: CompatibilityFactors
): boolean {
  // 1. Vérifier la proximité géographique (même ville pour simplifier)
  if (newEvent.location.city !== existingEvent.location.city) {
    return false
  }

  // 2. Vérifier le niveau si requis
  if (compatibility.levelMatch) {
    const newLevel = newEvent.requirements?.experienceLevel || 'all'
    const existingLevel = existingEvent.requirements?.experienceLevel || 'all'

    if (newLevel !== 'all' && existingLevel !== 'all' && newLevel !== existingLevel) {
      return false
    }
  }

  // 3. Vérifier le type de jeu si requis
  if (compatibility.gameTypeMatch) {
    const newType = (newEvent as any).playStyle || 'stroke_play'
    const existingType = (existingEvent as any).playStyle || 'stroke_play'

    if (newType !== existingType) {
      return false
    }
  }

  // 4. Vérifier qu'il y a de la place
  if (existingEvent.currentPlayers.length >= existingEvent.maxPlayers) {
    return false
  }

  return true
}

async function findInterestedUsers(
  newEvent: GolfEvent,
  existingEvent: GolfEvent
): Promise<string[]> {
  // Pour l'instant, on notifie les participants de l'événement existant
  // Plus tard, on pourrait avoir un système de préférences plus sophistiqué

  // Exclure l'organisateur du nouvel événement pour éviter les auto-notifications
  return existingEvent.currentPlayers.filter(
    userId => userId !== newEvent.organizerId
  )
}

export async function notifyCompatibleUsers(
  newEvent: GolfEvent,
  compatibleResults: { event: GolfEvent; users: string[] }[]
): Promise<void> {
  // Import dynamique pour éviter les problèmes de circular dependencies
  const { addDoc, collection, Timestamp } = await import('firebase/firestore')
  const { db } = await import('@/lib/firebase')

  // Créer les notifications pour chaque utilisateur compatible
  const notificationPromises: Promise<any>[] = []

  compatibleResults.forEach(({ event, users }) => {
    users.forEach(userId => {
      const notificationData = {
        userId,
        type: 'new_compatible_event',
        title: 'Nouvelle partie compatible !',
        message: `Une partie "${newEvent.title}" au ${newEvent.courseName} correspond à vos critères de recherche.`,
        eventId: newEvent.id,
        data: {
          compatibleWithEventId: event.id,
          compatibleEventTitle: event.title
        },
        read: false,
        createdAt: Timestamp.now(),
        scheduledFor: null
      }

      const promise = addDoc(collection(db, 'notifications'), notificationData)
        .then(() => {
          console.log(`Notification sent to user ${userId} for compatible event ${newEvent.title}`)
        })
        .catch(error => {
          console.error(`Error sending notification to user ${userId}:`, error)
        })

      notificationPromises.push(promise)
    })
  })

  // Attendre que toutes les notifications soient envoyées
  await Promise.allSettled(notificationPromises)
}

// Service principal de détection de compatibilité
export async function processEventCompatibility(newEvent: GolfEvent): Promise<void> {
  try {
    // 1. Trouver les événements compatibles
    const compatibleResults = await findCompatibleEvents(newEvent)

    if (compatibleResults.length === 0) {
      console.log('No compatible events found for:', newEvent.title)
      return
    }

    // 2. Notifier les utilisateurs concernés
    await notifyCompatibleUsers(newEvent, compatibleResults)

    console.log(`Found ${compatibleResults.length} compatible events for "${newEvent.title}"`)

  } catch (error) {
    console.error('Error processing event compatibility:', error)
  }
}