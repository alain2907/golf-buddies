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
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f5f5 0%, #e8f5e9 100%)',
      paddingBottom: '80px'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #2D5016 0%, #4A7C2E 100%)',
        paddingTop: '20px',
        paddingBottom: '20px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <button
            onClick={() => router.push('/settings')}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '12px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s',
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
          >
            ← Retour
          </button>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{ fontSize: '24px' }}>🗑️</span>
            <h1 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'white',
              margin: 0
            }}>
              Suppression de compte
            </h1>
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '32px 20px'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          {!showConfirm ? (
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '24px'
              }}>
                <div style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  padding: '16px',
                  borderRadius: '50%'
                }}>
                  <span style={{ fontSize: '32px' }}>⚠️</span>
                </div>
                <div>
                  <h2 style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#1a1a1a',
                    margin: 0
                  }}>Attention</h2>
                  <p style={{
                    color: '#666',
                    margin: '4px 0 0 0'
                  }}>Cette action est irréversible</p>
                </div>
              </div>

              <div style={{
                background: 'rgba(239, 68, 68, 0.1)',
                borderLeft: '4px solid #EF4444',
                padding: '16px',
                borderRadius: '8px',
                marginBottom: '24px'
              }}>
                <h3 style={{
                  fontWeight: 'bold',
                  color: '#991B1B',
                  marginBottom: '12px'
                }}>
                  Les données suivantes seront définitivement supprimées :
                </h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  color: '#B91C1C'
                }}>
                  <li style={{ marginBottom: '8px' }}>🗑️ Votre profil et toutes vos informations personnelles</li>
                  <li style={{ marginBottom: '8px' }}>🗑️ Tous les événements de golf que vous avez créés</li>
                  <li style={{ marginBottom: '8px' }}>🗑️ Vos participations aux événements</li>
                  <li style={{ marginBottom: '8px' }}>🗑️ Votre liste d&apos;amis et demandes d&apos;ami</li>
                  <li style={{ marginBottom: '8px' }}>🗑️ Tous vos messages (marqués comme supprimés)</li>
                  <li style={{ marginBottom: '8px' }}>🗑️ Vos statistiques et préférences</li>
                </ul>
              </div>

              <div style={{
                background: 'rgba(59, 130, 246, 0.1)',
                borderLeft: '4px solid #3B82F6',
                padding: '16px',
                borderRadius: '8px',
                marginBottom: '32px'
              }}>
                <h3 style={{
                  fontWeight: 'bold',
                  color: '#1E3A8A',
                  marginBottom: '8px'
                }}>💡 Alternatives</h3>
                <p style={{
                  color: '#1E40AF',
                  marginBottom: '8px'
                }}>
                  Si vous souhaitez simplement faire une pause, vous pouvez :
                </p>
                <ul style={{
                  margin: 0,
                  paddingLeft: '20px',
                  color: '#1E40AF'
                }}>
                  <li>Vous déconnecter temporairement</li>
                  <li>Masquer votre profil des recherches</li>
                  <li>Désactiver les notifications</li>
                </ul>
              </div>

              <div style={{
                display: 'flex',
                gap: '16px',
                justifyContent: 'center'
              }}>
                <button
                  onClick={() => router.push('/settings')}
                  style={{
                    padding: '12px 24px',
                    background: '#E5E7EB',
                    color: '#374151',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#D1D5DB'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#E5E7EB'}
                >
                  Annuler
                </button>
                <button
                  onClick={() => setShowConfirm(true)}
                  style={{
                    padding: '12px 24px',
                    background: 'linear-gradient(135deg, #DC2626 0%, #EF4444 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  Je comprends, continuer
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#1a1a1a',
                marginBottom: '24px'
              }}>
                Confirmation finale
              </h2>

              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  color: '#374151',
                  fontWeight: '500',
                  marginBottom: '8px'
                }}>
                  Pour confirmer la suppression, tapez{' '}
                  <span style={{ fontWeight: 'bold', color: '#DC2626' }}>SUPPRIMER</span> en majuscules :
                </label>
                <input
                  type="text"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #D1D5DB',
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                  placeholder="Tapez SUPPRIMER"
                  disabled={isDeleting}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#DC2626'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#D1D5DB'}
                />
              </div>

              <div style={{
                background: 'rgba(252, 211, 77, 0.2)',
                border: '1px solid #F59E0B',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '24px'
              }}>
                <p style={{
                  color: '#92400E',
                  fontWeight: '500',
                  margin: 0
                }}>
                  ⚠️ Cette action est irréversible. Toutes vos données seront définitivement perdues.
                </p>
              </div>

              <div style={{
                display: 'flex',
                gap: '16px',
                justifyContent: 'center'
              }}>
                <button
                  onClick={() => {
                    setShowConfirm(false);
                    setConfirmText('');
                  }}
                  disabled={isDeleting}
                  style={{
                    padding: '12px 24px',
                    background: '#E5E7EB',
                    color: '#374151',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: isDeleting ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s',
                    opacity: isDeleting ? 0.5 : 1
                  }}
                  onMouseEnter={(e) => !isDeleting && (e.currentTarget.style.background = '#D1D5DB')}
                  onMouseLeave={(e) => !isDeleting && (e.currentTarget.style.background = '#E5E7EB')}
                >
                  Annuler
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={confirmText !== 'SUPPRIMER' || isDeleting}
                  style={{
                    padding: '12px 24px',
                    background: confirmText === 'SUPPRIMER' && !isDeleting
                      ? 'linear-gradient(135deg, #DC2626 0%, #EF4444 100%)'
                      : '#9CA3AF',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: confirmText === 'SUPPRIMER' && !isDeleting ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s',
                    boxShadow: confirmText === 'SUPPRIMER' && !isDeleting
                      ? '0 2px 8px rgba(239, 68, 68, 0.3)'
                      : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (confirmText === 'SUPPRIMER' && !isDeleting) {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (confirmText === 'SUPPRIMER' && !isDeleting) {
                      e.currentTarget.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  {isDeleting ? 'Suppression en cours...' : 'Supprimer définitivement mon compte'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bouton de retour */}
        <div style={{
          marginTop: '32px',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <button
            onClick={() => router.push('/settings')}
            style={{
              background: 'linear-gradient(135deg, #2D5016 0%, #4A7C2E 100%)',
              color: 'white',
              border: 'none',
              padding: '16px 32px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 4px 12px rgba(45, 80, 22, 0.3)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            ← Retour
          </button>
        </div>
      </div>
    </div>
  );
}
