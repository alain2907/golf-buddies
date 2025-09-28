import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  addDoc,
  Timestamp,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
  onSnapshot,
  QuerySnapshot,
  DocumentData
} from 'firebase/firestore'
import { db } from './firebase'
import { GolfEvent, User, Message } from '@/types'

// User operations
export const createUserProfile = async (uid: string, data: Partial<User>) => {
  return setDoc(doc(db, 'users', uid), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  })
}

export const getUserProfile = async (uid: string): Promise<User | null> => {
  const docSnap = await getDoc(doc(db, 'users', uid))
  return docSnap.exists() ? docSnap.data() as User : null
}

export const updateUserProfile = async (uid: string, data: Partial<User>) => {
  return updateDoc(doc(db, 'users', uid), {
    ...data,
    updatedAt: serverTimestamp()
  })
}

// Event operations
export const createEvent = async (eventData: Omit<GolfEvent, 'id'>) => {
  const docRef = await addDoc(collection(db, 'events'), {
    ...eventData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  })
  return docRef.id
}

export const getEvent = async (eventId: string): Promise<GolfEvent | null> => {
  const docSnap = await getDoc(doc(db, 'events', eventId))
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as GolfEvent : null
}

export const updateEvent = async (eventId: string, data: Partial<GolfEvent>) => {
  return updateDoc(doc(db, 'events', eventId), {
    ...data,
    updatedAt: serverTimestamp()
  })
}

export const deleteEvent = async (eventId: string) => {
  return deleteDoc(doc(db, 'events', eventId))
}

export const joinEvent = async (eventId: string, userId: string) => {
  return updateDoc(doc(db, 'events', eventId), {
    currentPlayers: arrayUnion(userId),
    updatedAt: serverTimestamp()
  })
}

export const leaveEvent = async (eventId: string, userId: string) => {
  return updateDoc(doc(db, 'events', eventId), {
    currentPlayers: arrayRemove(userId),
    updatedAt: serverTimestamp()
  })
}

// Search events
export const searchEvents = async (filters: {
  city?: string
  date?: Date
  format?: string
  experienceLevel?: string
}) => {
  let q = query(collection(db, 'events'))

  if (filters.city) {
    q = query(q, where('location.city', '==', filters.city))
  }

  if (filters.format) {
    q = query(q, where('format', '==', filters.format))
  }

  if (filters.experienceLevel) {
    q = query(q, where('requirements.experienceLevel', 'in', [filters.experienceLevel, 'all']))
  }

  q = query(q, orderBy('date', 'asc'), limit(20))

  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as GolfEvent[]
}

// Get upcoming events
export const getUpcomingEvents = async (limitCount = 10) => {
  const q = query(
    collection(db, 'events'),
    where('date', '>=', Timestamp.now()),
    where('status', '==', 'upcoming'),
    orderBy('date', 'asc'),
    limit(limitCount)
  )

  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as GolfEvent[]
}

// Get user's events
export const getUserEvents = async (userId: string) => {
  const q = query(
    collection(db, 'events'),
    where('currentPlayers', 'array-contains', userId),
    orderBy('date', 'desc')
  )

  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as GolfEvent[]
}

// Message operations
export const sendMessage = async (eventId: string, messageData: Omit<Message, 'id' | 'timestamp'>) => {
  return addDoc(collection(db, 'events', eventId, 'messages'), {
    ...messageData,
    timestamp: serverTimestamp()
  })
}

export const getEventMessages = async (eventId: string, limitCount = 50) => {
  const q = query(
    collection(db, 'events', eventId, 'messages'),
    orderBy('timestamp', 'desc'),
    limit(limitCount)
  )

  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Message[]
}

// Real-time listeners
export const subscribeToEvent = (
  eventId: string,
  callback: (event: GolfEvent | null) => void
) => {
  return onSnapshot(doc(db, 'events', eventId), (doc) => {
    if (doc.exists()) {
      callback({ id: doc.id, ...doc.data() } as GolfEvent)
    } else {
      callback(null)
    }
  })
}

export const subscribeToMessages = (
  eventId: string,
  callback: (messages: Message[]) => void
) => {
  const q = query(
    collection(db, 'events', eventId, 'messages'),
    orderBy('timestamp', 'asc')
  )

  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Message[]
    callback(messages)
  })
}