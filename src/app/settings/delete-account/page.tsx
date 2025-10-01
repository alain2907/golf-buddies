'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { deleteUser } from 'firebase/auth';
import { doc, collection, query, where, getDocs, writeBatch } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import toast from 'react-hot-toast';

export default function DeleteAccountPage() {
  const router = useRouter();
  const { user, firebaseUser } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteAccount = async () => {
    if (!firebaseUser || !user) {
      toast.error('Vous devez être connecté');
      return;
    }

    if (confirmText !== 'SUPPRIMER') {
      toast.error('Veuillez taper "SUPPRIMER" pour confirmer');
      return;
    }

    setIsDeleting(true);

    try {
      const batch = writeBatch(db);

      // 1. Supprimer les événements créés par l'utilisateur
      const eventsQuery = query(
        collection(db, 'events'),
        where('createdBy', '==', user.uid)
      );
      const eventsSnapshot = await getDocs(eventsQuery);
      eventsSnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });

      // 2. Supprimer les participations aux événements
      const participationsQuery = query(
        collection(db, 'events'),
        where('participants', 'array-contains', user.uid)
      );
      const participationsSnapshot = await getDocs(participationsQuery);
      for (const eventDoc of participationsSnapshot.docs) {
        const eventData = eventDoc.data();
        const updatedParticipants = eventData.participants.filter(
          (id: string) => id !== user.uid
        );
        batch.update(eventDoc.ref, { participants: updatedParticipants });
      }

      // 3. Supprimer les demandes d'ami
      const friendRequestsQuery = query(
        collection(db, 'friendRequests'),
        where('fromUserId', '==', user.uid)
      );
      const friendRequestsSnapshot = await getDocs(friendRequestsQuery);
      friendRequestsSnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });

      const receivedRequestsQuery = query(
        collection(db, 'friendRequests'),
        where('toUserId', '==', user.uid)
      );
      const receivedRequestsSnapshot = await getDocs(receivedRequestsQuery);
      receivedRequestsSnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });

      // 4. Supprimer les notifications
      const notificationsQuery = query(
        collection(db, 'notifications'),
        where('userId', '==', user.uid)
      );
      const notificationsSnapshot = await getDocs(notificationsQuery);
      notificationsSnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });

      // 5. Supprimer les messages (marquer comme supprimés)
      const messagesQuery = query(
        collection(db, 'messages'),
        where('senderId', '==', user.uid)
      );
      const messagesSnapshot = await getDocs(messagesQuery);
      messagesSnapshot.forEach((doc) => {
        batch.update(doc.ref, {
          content: '[Message supprimé]',
          deleted: true
        });
      });

      // 6. Supprimer le document utilisateur
      batch.delete(doc(db, 'users', user.uid));

      // Exécuter toutes les suppressions
      await batch.commit();

      // 7. Supprimer le compte Firebase Auth
      await deleteUser(firebaseUser);

      toast.success('Votre compte a été supprimé avec succès');
      router.push('/');
    } catch (error: any) {
      console.error('Erreur lors de la suppression:', error);

      if (error.code === 'auth/requires-recent-login') {
        toast.error('Pour des raisons de sécurité, veuillez vous reconnecter avant de supprimer votre compte');
        router.push('/login?returnTo=/settings/delete-account');
      } else {
        toast.error('Erreur lors de la suppression du compte');
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-20">
            <button
              onClick={() => router.back()}
              className="text-white hover:bg-white/20 mr-4 px-4 py-2 rounded-lg transition-colors"
            >
              ← Retour
            </button>
            <h1 className="text-2xl font-bold text-white">
              ⚠️ Suppression de compte
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!showConfirm ? (
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-red-200 p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-red-100 p-4 rounded-full">
                <span className="text-4xl">⚠️</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Attention</h2>
                <p className="text-gray-600">Cette action est irréversible</p>
              </div>
            </div>

            <div className="space-y-6 mb-8">
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <h3 className="font-bold text-red-800 mb-2">
                  Les données suivantes seront définitivement supprimées :
                </h3>
                <ul className="space-y-2 text-red-700">
                  <li className="flex items-start gap-2">
                    <span>🗑️</span>
                    <span>Votre profil et toutes vos informations personnelles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>🗑️</span>
                    <span>Tous les événements de golf que vous avez créés</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>🗑️</span>
                    <span>Vos participations aux événements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>🗑️</span>
                    <span>Votre liste d&apos;amis et demandes d&apos;ami</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>🗑️</span>
                    <span>Tous vos messages (marqués comme supprimés)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>🗑️</span>
                    <span>Vos statistiques et préférences</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <h3 className="font-bold text-blue-800 mb-2">💡 Alternatives</h3>
                <p className="text-blue-700">
                  Si vous souhaitez simplement faire une pause, vous pouvez :
                </p>
                <ul className="mt-2 space-y-1 text-blue-700">
                  <li>• Vous déconnecter temporairement</li>
                  <li>• Masquer votre profil des recherches</li>
                  <li>• Désactiver les notifications</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => router.back()}
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={() => setShowConfirm(true)}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              >
                Je comprends, continuer
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-red-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Confirmation finale
            </h2>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Pour confirmer la suppression, tapez{' '}
                <span className="font-bold text-red-600">SUPPRIMER</span> en majuscules :
              </label>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
                placeholder="Tapez SUPPRIMER"
                disabled={isDeleting}
              />
            </div>

            <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 mb-6">
              <p className="text-yellow-800 font-medium">
                ⚠️ Cette action est irréversible. Toutes vos données seront définitivement perdues.
              </p>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  setShowConfirm(false);
                  setConfirmText('');
                }}
                disabled={isDeleting}
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                Annuler
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={confirmText !== 'SUPPRIMER' || isDeleting}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? 'Suppression en cours...' : 'Supprimer définitivement mon compte'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
