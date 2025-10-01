'use client';

import { useNetworkStatus } from '../hooks/useNetworkStatus';

interface OfflineIndicatorProps {
  className?: string;
  showOnline?: boolean; // Afficher aussi quand en ligne
}

export function OfflineIndicator({ className = '', showOnline = false }: OfflineIndicatorProps) {
  const { isOnline } = useNetworkStatus();

  if (isOnline && !showOnline) return null;

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded-lg shadow-lg transition-all duration-300 ${
        isOnline
          ? 'bg-green-500 text-white'
          : 'bg-red-500 text-white animate-pulse'
      } ${className}`}
    >
      <div className="flex items-center space-x-2">
        <span className="text-xl">{isOnline ? '✅' : '❌'}</span>
        <span className="font-semibold">
          {isOnline ? 'Connexion rétablie' : 'Mode hors ligne'}
        </span>
      </div>
    </div>
  );
}
