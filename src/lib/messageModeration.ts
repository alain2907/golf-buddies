import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  QuerySnapshot,
  DocumentData,
  query,
  where,
  orderBy
} from 'firebase/firestore';
import { db } from './firebase';
import { EventMessage, CreateMessageData, MessageReport } from '@/types/message';

// Configuration adaptée pour Golf Buddies
export const COLLECTIONS = {
  EVENT_MESSAGES: 'event_messages',  // Collection séparée pour messages avec modération
  EVENTS: 'events',
  USERS: 'users'
};

// Utilitaire de conversion des timestamps
function convertTimestamp(timestamp: any): Date {
  if (!timestamp) return new Date();
  if (timestamp.toDate) return timestamp.toDate();
  if (timestamp.seconds) return new Date(timestamp.seconds * 1000);
  return new Date(timestamp);
}

// Service de messagerie avec modération
export class MessageModerationService {
  static async createMessage(messageData: CreateMessageData, userId: string, user: any): Promise<string> {
    try {
      // Get event to check if user is organizer
      const eventRef = doc(db, COLLECTIONS.EVENTS, messageData.eventId);
      const eventSnap = await getDoc(eventRef);

      if (!eventSnap.exists()) {
        throw new Error('Événement introuvable');
      }

      const event = eventSnap.data();

      // Check if user is participant or organizer
      const isOrganizer = event.organizerId === userId;
      const isParticipant = event.currentPlayers?.includes(userId);

      if (!isOrganizer && !isParticipant) {
        throw new Error('Seuls les participants peuvent envoyer des messages');
      }

      const message = {
        ...messageData,
        userId,
        userName: user?.displayName || user?.email || 'Utilisateur',
        userAvatar: user?.photoURL || null,
        status: 'visible' as const,
        isOrganizer,
        reports: [],
        createdAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, COLLECTIONS.EVENT_MESSAGES), message);
      return docRef.id;
    } catch (error) {
      console.error('Error creating message:', error);
      throw error;
    }
  }

  static async getEventMessages(eventId: string): Promise<EventMessage[]> {
    try {
      const q = query(
        collection(db, COLLECTIONS.EVENT_MESSAGES),
        where('eventId', '==', eventId),
        orderBy('createdAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const messages: EventMessage[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        messages.push({
          id: doc.id,
          ...data,
          createdAt: convertTimestamp(data.createdAt),
          updatedAt: data.updatedAt ? convertTimestamp(data.updatedAt) : undefined,
          reports: data.reports || []
        } as EventMessage);
      });

      return messages;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  }

  static async moderateMessage(messageId: string, action: 'hide' | 'show', organizerId: string): Promise<void> {
    const messageRef = doc(db, COLLECTIONS.EVENT_MESSAGES, messageId);
    const messageSnap = await getDoc(messageRef);

    if (!messageSnap.exists()) {
      throw new Error('Message introuvable');
    }

    const messageData = messageSnap.data();

    // Get event to verify organizer
    const eventRef = doc(db, COLLECTIONS.EVENTS, messageData.eventId);
    const eventSnap = await getDoc(eventRef);

    if (!eventSnap.exists()) {
      throw new Error('Événement introuvable');
    }

    const event = eventSnap.data();
    if (event.organizerId !== organizerId) {
      throw new Error('Seul l\'organisateur peut modérer les messages');
    }

    await updateDoc(messageRef, {
      status: action === 'hide' ? 'hidden' : 'visible',
      updatedAt: serverTimestamp()
    });
  }

  static async reportMessage(messageId: string, userId: string, userName: string, reason: MessageReport['reason'], description?: string): Promise<void> {
    const messageRef = doc(db, COLLECTIONS.EVENT_MESSAGES, messageId);
    const messageSnap = await getDoc(messageRef);

    if (!messageSnap.exists()) {
      throw new Error('Message introuvable');
    }

    const messageData = messageSnap.data();
    const currentReports: MessageReport[] = messageData.reports || [];

    // Check if user already reported
    if (currentReports.some(report => report.userId === userId)) {
      throw new Error('Vous avez déjà signalé ce message');
    }

    const newReport: MessageReport = {
      userId,
      userName,
      reason,
      description: description || '',
      createdAt: new Date()
    };

    const updatedReports = [...currentReports, newReport];

    // Auto-hide if 3 or more reports
    const newStatus = updatedReports.length >= 3 ? 'reported' : messageData.status;

    await updateDoc(messageRef, {
      reports: updatedReports,
      status: newStatus,
      updatedAt: serverTimestamp()
    });
  }

  static async deleteMessage(messageId: string, userId: string): Promise<void> {
    const messageRef = doc(db, COLLECTIONS.EVENT_MESSAGES, messageId);
    const messageSnap = await getDoc(messageRef);

    if (!messageSnap.exists()) {
      throw new Error('Message introuvable');
    }

    const messageData = messageSnap.data();

    // Only message author or event organizer can delete
    if (messageData.userId !== userId) {
      // Check if user is the event organizer
      const eventRef = doc(db, COLLECTIONS.EVENTS, messageData.eventId);
      const eventSnap = await getDoc(eventRef);

      if (!eventSnap.exists()) {
        throw new Error('Événement introuvable');
      }

      const event = eventSnap.data();
      if (event.organizerId !== userId) {
        throw new Error('Seul l\'auteur ou l\'organisateur peut supprimer ce message');
      }
    }

    await deleteDoc(messageRef);
  }

  static subscribeToEventMessages(
    eventId: string,
    callback: (messages: EventMessage[]) => void
  ): () => void {
    const q = query(
      collection(db, COLLECTIONS.EVENT_MESSAGES),
      where('eventId', '==', eventId),
      orderBy('createdAt', 'asc')
    );

    return onSnapshot(q, (querySnapshot: QuerySnapshot<DocumentData>) => {
      const messages: EventMessage[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        messages.push({
          id: doc.id,
          ...data,
          createdAt: convertTimestamp(data.createdAt),
          updatedAt: data.updatedAt ? convertTimestamp(data.updatedAt) : undefined,
          reports: data.reports || []
        } as EventMessage);
      });

      callback(messages);
    });
  }
}