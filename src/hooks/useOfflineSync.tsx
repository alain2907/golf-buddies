'use client';

import { useState, useEffect } from 'react';

interface OfflineSyncOptions {
  syncInterval?: number; // Interval de synchronisation en ms
  storageKey?: string; // Clé de stockage locale
}

export function useOfflineSync(options: OfflineSyncOptions = {}) {
  const [isOnline, setIsOnline] = useState(true);
  const [pendingSync, setPendingSync] = useState<any[]>([]);
  const { syncInterval = 30000, storageKey = 'offline_sync_queue' } = options;

  // Détection de l'état de connexion
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    setIsOnline(navigator.onLine);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Charger la file d'attente depuis le localStorage
  useEffect(() => {
    const loadQueue = () => {
      try {
        const stored = localStorage.getItem(storageKey);
        if (stored) {
          setPendingSync(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Error loading sync queue:', error);
      }
    };

    loadQueue();
  }, [storageKey]);

  // Sauvegarder la file d'attente dans le localStorage
  const saveQueue = (queue: any[]) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(queue));
    } catch (error) {
      console.error('Error saving sync queue:', error);
    }
  };

  // Ajouter une action à la file d'attente
  const addToQueue = (action: any) => {
    const newQueue = [...pendingSync, { ...action, timestamp: Date.now() }];
    setPendingSync(newQueue);
    saveQueue(newQueue);
  };

  // Synchroniser les actions en attente
  const syncPending = async (syncFn: (action: any) => Promise<void>) => {
    if (!isOnline || pendingSync.length === 0) return;

    const successfulSyncs: number[] = [];

    for (let i = 0; i < pendingSync.length; i++) {
      try {
        await syncFn(pendingSync[i]);
        successfulSyncs.push(i);
      } catch (error) {
        console.error('Sync failed for action:', pendingSync[i], error);
      }
    }

    // Retirer les actions synchronisées avec succès
    const newQueue = pendingSync.filter((_, index) => !successfulSyncs.includes(index));
    setPendingSync(newQueue);
    saveQueue(newQueue);
  };

  // Effacer la file d'attente
  const clearQueue = () => {
    setPendingSync([]);
    localStorage.removeItem(storageKey);
  };

  return {
    isOnline,
    pendingSync,
    addToQueue,
    syncPending,
    clearQueue,
    hasPendingSync: pendingSync.length > 0
  };
}
