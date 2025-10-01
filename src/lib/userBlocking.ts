import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { db } from './firebase'
import { User } from '@/types'

export class UserBlockingService {
  /**
   * Block a user
   */
  static async blockUser(currentUserId: string, userIdToBlock: string): Promise<void> {
    if (currentUserId === userIdToBlock) {
      throw new Error('Vous ne pouvez pas vous bloquer vous-même')
    }

    try {
      const userRef = doc(db, 'users', currentUserId)
      await updateDoc(userRef, {
        blockedUsers: arrayUnion(userIdToBlock)
      })
    } catch (error) {
      console.error('Error blocking user:', error)
      throw new Error('Erreur lors du blocage de l\'utilisateur')
    }
  }

  /**
   * Unblock a user
   */
  static async unblockUser(currentUserId: string, userIdToUnblock: string): Promise<void> {
    try {
      const userRef = doc(db, 'users', currentUserId)
      await updateDoc(userRef, {
        blockedUsers: arrayRemove(userIdToUnblock)
      })
    } catch (error) {
      console.error('Error unblocking user:', error)
      throw new Error('Erreur lors du déblocage de l\'utilisateur')
    }
  }

  /**
   * Check if a user is blocked
   */
  static async isUserBlocked(currentUserId: string, userIdToCheck: string): Promise<boolean> {
    try {
      const userRef = doc(db, 'users', currentUserId)
      const userSnap = await getDoc(userRef)

      if (!userSnap.exists()) {
        return false
      }

      const userData = userSnap.data() as User
      return userData.blockedUsers?.includes(userIdToCheck) || false
    } catch (error) {
      console.error('Error checking if user is blocked:', error)
      return false
    }
  }

  /**
   * Get all blocked users for a user
   */
  static async getBlockedUsers(currentUserId: string): Promise<User[]> {
    try {
      const userRef = doc(db, 'users', currentUserId)
      const userSnap = await getDoc(userRef)

      if (!userSnap.exists()) {
        return []
      }

      const userData = userSnap.data() as User
      const blockedUserIds = userData.blockedUsers || []

      if (blockedUserIds.length === 0) {
        return []
      }

      // Fetch blocked users' data
      const blockedUsersPromises = blockedUserIds.map(async (userId) => {
        const blockedUserRef = doc(db, 'users', userId)
        const blockedUserSnap = await getDoc(blockedUserRef)

        if (blockedUserSnap.exists()) {
          return {
            uid: blockedUserSnap.id,
            ...blockedUserSnap.data(),
            createdAt: blockedUserSnap.data().createdAt?.toDate() || new Date(),
            lastActive: blockedUserSnap.data().lastActive?.toDate()
          } as User
        }
        return null
      })

      const blockedUsers = await Promise.all(blockedUsersPromises)
      return blockedUsers.filter(Boolean) as User[]
    } catch (error) {
      console.error('Error fetching blocked users:', error)
      return []
    }
  }

  /**
   * Check if current user is blocked by another user
   */
  static async isBlockedBy(currentUserId: string, otherUserId: string): Promise<boolean> {
    try {
      const otherUserRef = doc(db, 'users', otherUserId)
      const otherUserSnap = await getDoc(otherUserRef)

      if (!otherUserSnap.exists()) {
        return false
      }

      const otherUserData = otherUserSnap.data() as User
      return otherUserData.blockedUsers?.includes(currentUserId) || false
    } catch (error) {
      console.error('Error checking if blocked by user:', error)
      return false
    }
  }
}
