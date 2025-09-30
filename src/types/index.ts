export interface User {
  uid: string
  email: string
  displayName: string
  handicap?: number
  homeClub?: string
  photoURL?: string
  phoneNumber?: string
  bio?: string
  createdAt: Date
  lastActive?: Date
  preferences: {
    playStyle: 'competitive' | 'casual' | 'practice'
    preferredTeeTime: 'morning' | 'afternoon' | 'evening'
    walkingOrCart: 'walking' | 'cart' | 'both'
    notifications: boolean
  }
  stats?: {
    roundsPlayed: number
    averageScore: number
    bestScore: number
    coursesVisited: string[] // Array of course IDs visited
  }
  badges?: Badge[]
}

export interface GolfEvent {
  id: string
  title: string
  description: string
  type: 'tournament' | 'casual_round' | 'practice' | 'lesson'
  courseId: string
  courseName: string
  date: Date
  time: string
  maxPlayers: number
  currentPlayers: string[]
  waitlist?: string[]
  organizerId: string
  organizerName: string
  organizerPhoto?: string
  inviteMode: 'community' | 'friends'
  requirements: {
    handicapMax?: number
    handicapMin?: number
    experienceLevel: 'beginner' | 'intermediate' | 'advanced' | 'all'
    ageMin?: number
    ageMax?: number
  }
  format: 'stroke_play' | 'match_play' | 'scramble' | 'best_ball' | 'skins' | 'casual'
  greenFee?: number
  cartIncluded: boolean
  walkingAllowed: boolean
  facilities?: string[]
  location: {
    address: string
    city: string
    state?: string
    country?: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  weather?: {
    temp: number
    conditions: string
    windSpeed: number
  }
  status: 'upcoming' | 'in_progress' | 'completed' | 'cancelled'
  createdAt: Date
  updatedAt: Date
}

export interface GolfCourse {
  id: string
  name: string
  address: string
  city: string
  state?: string
  country?: string
  holes: number
  par: number
  length?: number
  rating?: number
  slope?: number
  website?: string
  phone?: string
  email?: string
  description?: string
  amenities?: string[]
  images?: string[]
  priceRange?: 'budget' | 'moderate' | 'premium'
  coordinates?: {
    lat: number
    lng: number
  }
}

export interface Message {
  id: string
  eventId: string
  userId: string
  userName: string
  userPhoto?: string
  text: string
  timestamp: Date
  edited?: boolean
  editedAt?: Date
  isOrganizer: boolean
  replyTo?: string
  reactions?: Record<string, string[]>
}

export interface Notification {
  id: string
  userId: string
  type: 'event_joined' | 'event_left' | 'event_cancelled' | 'message' | 'reminder'
  title: string
  body: string
  eventId?: string
  read: boolean
  createdAt: Date
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  earned: boolean
  earnedDate?: Date
  category: 'participation' | 'achievement' | 'social' | 'skill'
  condition: {
    type: 'rounds_played' | 'courses_visited' | 'first_event' | 'best_score' | 'events_organized'
    threshold?: number
    target?: number
  }
}

export interface FriendRequest {
  id: string
  fromUserId: string
  fromUserName: string
  fromUserPhoto?: string
  toUserId: string
  toUserName: string
  toUserPhoto?: string
  status: 'pending' | 'accepted' | 'rejected'
  createdAt: Date
  respondedAt?: Date
}

export interface Friendship {
  id: string
  users: [string, string] // Array of two user IDs
  createdAt: Date
  lastInteraction?: Date
}