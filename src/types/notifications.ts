export interface Notification {
  id: string
  userId: string
  type: NotificationType
  title: string
  message: string
  eventId?: string
  data?: any
  read: boolean
  createdAt: Date
  scheduledFor?: Date
}

export type NotificationType =
  | 'new_compatible_event'    // Nouvelle partie compatible trouvée
  | 'event_reminder_24h'      // Rappel 24h avant
  | 'event_reminder_1h'       // Rappel 1h avant
  | 'flight_complete'         // Flight complet
  | 'event_cancelled'         // Partie annulée
  | 'player_joined'           // Nouveau joueur rejoint
  | 'player_left'             // Joueur quitte la partie
  | 'event_updated'           // Modification de partie

export interface NotificationPreferences {
  userId: string
  email: boolean
  push: boolean
  compatibleEvents: boolean
  reminders: boolean
  eventUpdates: boolean
  updatedAt: Date
}

export interface ScheduledNotification {
  id: string
  notificationId: string
  userId: string
  eventId: string
  type: NotificationType
  scheduledFor: Date
  sent: boolean
  createdAt: Date
}