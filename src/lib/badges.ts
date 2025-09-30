import { Badge, User } from '@/types'

// Default badge definitions
export const DEFAULT_BADGES: Omit<Badge, 'earned' | 'earnedDate'>[] = [
  {
    id: 'first_flight',
    name: 'Premier Flight',
    description: 'Première partie organisée',
    icon: '🏌️',
    category: 'participation',
    condition: {
      type: 'first_event'
    }
  },
  {
    id: 'explorer',
    name: 'Explorateur',
    description: '10+ parcours visités',
    icon: '🌍',
    category: 'achievement',
    condition: {
      type: 'courses_visited',
      threshold: 10
    }
  },
  {
    id: 'veteran',
    name: 'Vétéran',
    description: '50+ parties jouées',
    icon: '🎖️',
    category: 'participation',
    condition: {
      type: 'rounds_played',
      threshold: 50
    }
  },
  {
    id: 'eagle',
    name: 'Eagle',
    description: 'Réaliser un eagle',
    icon: '🎯',
    category: 'skill',
    condition: {
      type: 'best_score',
      threshold: 0 // This would need special logic for eagle tracking
    }
  },
  {
    id: 'organizer',
    name: 'Organisateur',
    description: '5+ événements organisés',
    icon: '👑',
    category: 'social',
    condition: {
      type: 'events_organized',
      threshold: 5
    }
  },
  {
    id: 'low_scorer',
    name: 'Score en Or',
    description: 'Score sous le par',
    icon: '🥇',
    category: 'skill',
    condition: {
      type: 'best_score',
      threshold: 72 // Example par
    }
  },
  {
    id: 'frequent_player',
    name: 'Joueur Assidu',
    description: '20+ parties jouées',
    icon: '⭐',
    category: 'participation',
    condition: {
      type: 'rounds_played',
      threshold: 20
    }
  },
  {
    id: 'course_collector',
    name: 'Collectionneur',
    description: '5+ parcours visités',
    icon: '🏆',
    category: 'achievement',
    condition: {
      type: 'courses_visited',
      threshold: 5
    }
  }
]

// Function to evaluate which badges a user has earned
export function evaluateUserBadges(user: User): Badge[] {
  const userStats = user.stats || {
    roundsPlayed: 0,
    averageScore: 0,
    bestScore: 0,
    coursesVisited: []
  }

  return DEFAULT_BADGES.map(badgeTemplate => {
    const earned = evaluateBadgeCondition(badgeTemplate.condition, user, userStats)

    return {
      ...badgeTemplate,
      earned,
      earnedDate: earned ? new Date() : undefined // In real app, this would be tracked
    }
  })
}

// Helper function to check if a badge condition is met
function evaluateBadgeCondition(
  condition: Badge['condition'],
  user: User,
  stats: NonNullable<User['stats']>
): boolean {
  switch (condition.type) {
    case 'rounds_played':
      return stats.roundsPlayed >= (condition.threshold || 0)

    case 'courses_visited':
      return stats.coursesVisited.length >= (condition.threshold || 0)

    case 'first_event':
      return stats.roundsPlayed > 0 // Simplified - in real app, track first organized event

    case 'best_score':
      return condition.threshold !== undefined && stats.bestScore > 0 && stats.bestScore <= condition.threshold

    case 'events_organized':
      // This would need to be tracked separately in the user profile
      // For now, return false as we don't have this data
      return false

    default:
      return false
  }
}

// Function to get earned badges only
export function getEarnedBadges(user: User): Badge[] {
  return evaluateUserBadges(user).filter(badge => badge.earned)
}

// Function to get next badges to earn (closest to completion)
export function getNextBadges(user: User): Badge[] {
  const allBadges = evaluateUserBadges(user)
  return allBadges
    .filter(badge => !badge.earned)
    .sort((a, b) => {
      // Sort by how close user is to earning the badge
      const progressA = getBadgeProgress(a, user)
      const progressB = getBadgeProgress(b, user)
      return progressB - progressA
    })
    .slice(0, 3) // Return top 3 next badges
}

// Function to calculate progress towards a badge (0-1)
export function getBadgeProgress(badge: Badge, user: User): number {
  const stats = user.stats || {
    roundsPlayed: 0,
    averageScore: 0,
    bestScore: 0,
    coursesVisited: []
  }

  if (badge.earned) return 1

  switch (badge.condition.type) {
    case 'rounds_played':
      return Math.min(stats.roundsPlayed / (badge.condition.threshold || 1), 1)

    case 'courses_visited':
      return Math.min(stats.coursesVisited.length / (badge.condition.threshold || 1), 1)

    case 'first_event':
      return stats.roundsPlayed > 0 ? 1 : 0

    case 'best_score':
      if (!badge.condition.threshold || stats.bestScore === 0) return 0
      // For score-based badges, progress is inverse (lower scores are better)
      return stats.bestScore <= badge.condition.threshold ? 1 : 0

    default:
      return 0
  }
}