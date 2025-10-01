'use client';

import { useEffect } from 'react';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

export function OfflineFallback() {
  const { isOnline } = useNetworkStatus();

  useEffect(() => {
    // Si on est hors ligne et qu'on n'est pas déjà sur la page offline
    if (!isOnline && typeof window !== 'undefined') {
      const currentPath = window.location.pathname;

      // Ne pas rediriger si on est déjà sur une page statique offline
      if (currentPath !== '/offline.html') {
        // Rediriger vers la page offline statique
        window.location.href = '/offline.html';
      }
    }
  }, [isOnline]);

  return null;
}
