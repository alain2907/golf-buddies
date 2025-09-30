'use client'
import { useState, useEffect } from 'react'
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  orderBy,
  getDocs,
  getDoc
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from './useAuth'
import { FriendRequest, Friendship, User } from '@/types'

export function useFriends() {
  const { user } = useAuth()
  const [friends, setFriends] = useState<User[]>([])
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([])
  const [sentRequests, setSentRequests] = useState<FriendRequest[]>([])
  const [loading, setLoading] = useState(true)

  // Écouter les demandes d'amis reçues
  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }

    const friendRequestsQuery = query(
      collection(db, 'friendRequests'),
      where('toUserId', '==', user.uid),
      where('status', '==', 'pending'),
      orderBy('createdAt', 'desc')
    )

    const unsubscribe = onSnapshot(friendRequestsQuery, (snapshot) => {
      const requests = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      })) as FriendRequest[]
      setFriendRequests(requests)
    })

    return () => unsubscribe()
  }, [user])

  // Écouter les demandes d'amis envoyées
  useEffect(() => {
    if (!user) return

    const sentRequestsQuery = query(
      collection(db, 'friendRequests'),
      where('fromUserId', '==', user.uid),
      where('status', '==', 'pending'),
      orderBy('createdAt', 'desc')
    )

    const unsubscribe = onSnapshot(sentRequestsQuery, (snapshot) => {
      const requests = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      })) as FriendRequest[]
      setSentRequests(requests)
    })

    return () => unsubscribe()
  }, [user])

  // Écouter la liste d'amis
  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }

    const friendshipsQuery = query(
      collection(db, 'friendships'),
      where('users', 'array-contains', user.uid)
    )

    const unsubscribe = onSnapshot(friendshipsQuery, async (snapshot) => {
      const friendships = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      })) as Friendship[]

      // Récupérer les infos des amis
      const friendUserIds = friendships.map(friendship =>
        friendship.users.find(uid => uid !== user.uid)
      ).filter(Boolean) as string[]

      if (friendUserIds.length === 0) {
        setFriends([])
        setLoading(false)
        return
      }

      // Récupérer les profils des amis
      const friendProfiles = await Promise.all(
        friendUserIds.map(async (friendId) => {
          const userDoc = await getDoc(doc(db, 'users', friendId))
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
      )

      setFriends(friendProfiles.filter(Boolean) as User[])
      setLoading(false)
    })

    return () => unsubscribe()
  }, [user])

  // Envoyer une demande d'ami
  const sendFriendRequest = async (targetUserId: string) => {
    if (!user) throw new Error('Utilisateur non connecté')

    // Vérifier si une demande existe déjà
    const existingRequestQuery = query(
      collection(db, 'friendRequests'),
      where('fromUserId', '==', user.uid),
      where('toUserId', '==', targetUserId),
      where('status', '==', 'pending')
    )

    const existingDocs = await getDocs(existingRequestQuery)
    if (!existingDocs.empty) {
      throw new Error('Demande d\'ami déjà envoyée')
    }

    // Vérifier si ils sont déjà amis
    const friendshipQuery = query(
      collection(db, 'friendships'),
      where('users', 'array-contains', user.uid)
    )

    const friendshipDocs = await getDocs(friendshipQuery)
    const isAlreadyFriend = friendshipDocs.docs.some(doc => {
      const friendship = doc.data() as Friendship
      return friendship.users.includes(targetUserId)
    })

    if (isAlreadyFriend) {
      throw new Error('Vous êtes déjà amis')
    }

    // Récupérer les infos de l'utilisateur cible
    const targetUserDoc = await getDoc(doc(db, 'users', targetUserId))
    if (!targetUserDoc.exists()) {
      throw new Error('Utilisateur introuvable')
    }

    const targetUser = targetUserDoc.data() as User

    // Créer la demande d'ami
    await addDoc(collection(db, 'friendRequests'), {
      fromUserId: user.uid,
      fromUserName: user.displayName,
      fromUserPhoto: user.photoURL,
      toUserId: targetUserId,
      toUserName: targetUser.displayName,
      toUserPhoto: targetUser.photoURL,
      status: 'pending',
      createdAt: new Date()
    })
  }

  // Accepter une demande d'ami
  const acceptFriendRequest = async (requestId: string) => {
    if (!user) throw new Error('Utilisateur non connecté')

    const requestDoc = await getDoc(doc(db, 'friendRequests', requestId))
    if (!requestDoc.exists()) {
      throw new Error('Demande introuvable')
    }

    const request = requestDoc.data() as FriendRequest

    // Créer l'amitié
    await addDoc(collection(db, 'friendships'), {
      users: [request.fromUserId, request.toUserId],
      createdAt: new Date()
    })

    // Mettre à jour le statut de la demande
    await updateDoc(doc(db, 'friendRequests', requestId), {
      status: 'accepted',
      respondedAt: new Date()
    })
  }

  // Rejeter une demande d'ami
  const rejectFriendRequest = async (requestId: string) => {
    await updateDoc(doc(db, 'friendRequests', requestId), {
      status: 'rejected',
      respondedAt: new Date()
    })
  }

  // Supprimer un ami
  const removeFriend = async (friendUserId: string) => {
    if (!user) throw new Error('Utilisateur non connecté')

    const friendshipsQuery = query(
      collection(db, 'friendships'),
      where('users', 'array-contains', user.uid)
    )

    const friendshipDocs = await getDocs(friendshipsQuery)
    const friendshipToDelete = friendshipDocs.docs.find(doc => {
      const friendship = doc.data() as Friendship
      return friendship.users.includes(friendUserId)
    })

    if (friendshipToDelete) {
      await deleteDoc(doc(db, 'friendships', friendshipToDelete.id))
    }
  }

  // Annuler une demande d'ami envoyée
  const cancelFriendRequest = async (requestId: string) => {
    await deleteDoc(doc(db, 'friendRequests', requestId))
  }

  // Rechercher des utilisateurs par nom
  const searchUsers = async (searchTerm: string): Promise<User[]> => {
    if (!searchTerm.trim()) return []

    const usersQuery = query(
      collection(db, 'users'),
      orderBy('displayName')
    )

    const usersSnapshot = await getDocs(usersQuery)
    const users = usersSnapshot.docs
      .map(doc => ({
        uid: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        lastActive: doc.data().lastActive?.toDate()
      }) as User)
      .filter(u =>
        u.uid !== user?.uid &&
        u.displayName.toLowerCase().includes(searchTerm.toLowerCase())
      )

    return users
  }

  // Vérifier le statut d'amitié avec un utilisateur
  const getFriendshipStatus = async (targetUserId: string): Promise<'none' | 'pending_sent' | 'pending_received' | 'friends'> => {
    if (!user) return 'none'

    // Vérifier si ils sont amis
    const friendshipQuery = query(
      collection(db, 'friendships'),
      where('users', 'array-contains', user.uid)
    )

    const friendshipDocs = await getDocs(friendshipQuery)
    const isAlreadyFriend = friendshipDocs.docs.some(doc => {
      const friendship = doc.data() as Friendship
      return friendship.users.includes(targetUserId)
    })

    if (isAlreadyFriend) return 'friends'

    // Vérifier les demandes en attente
    const sentRequestQuery = query(
      collection(db, 'friendRequests'),
      where('fromUserId', '==', user.uid),
      where('toUserId', '==', targetUserId),
      where('status', '==', 'pending')
    )

    const sentDocs = await getDocs(sentRequestQuery)
    if (!sentDocs.empty) return 'pending_sent'

    const receivedRequestQuery = query(
      collection(db, 'friendRequests'),
      where('fromUserId', '==', targetUserId),
      where('toUserId', '==', user.uid),
      where('status', '==', 'pending')
    )

    const receivedDocs = await getDocs(receivedRequestQuery)
    if (!receivedDocs.empty) return 'pending_received'

    return 'none'
  }

  return {
    friends,
    friendRequests,
    sentRequests,
    loading,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    removeFriend,
    cancelFriendRequest,
    searchUsers,
    getFriendshipStatus
  }
}