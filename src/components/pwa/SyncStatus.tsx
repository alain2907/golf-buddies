'use client';

interface SyncStatusProps {
  pendingCount: number;
  isOnline: boolean;
  onSync?: () => void;
  className?: string;
}

export function SyncStatus({ pendingCount, isOnline, onSync, className = '' }: SyncStatusProps) {
  if (pendingCount === 0) return null;

  return (
    <div className={`bg-yellow-50 border-l-4 border-yellow-400 p-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <span className="text-2xl">⚠️</span>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-800">
              <span className="font-semibold">{pendingCount}</span> action{pendingCount > 1 ? 's' : ''} en attente de synchronisation
            </p>
            {!isOnline && (
              <p className="text-xs text-yellow-700 mt-1">
                Les données seront synchronisées automatiquement lorsque vous serez en ligne
              </p>
            )}
          </div>
        </div>
        {isOnline && onSync && (
          <button
            onClick={onSync}
            className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 px-3 py-1 rounded-lg text-sm font-semibold transition-all"
          >
            Synchroniser
          </button>
        )}
      </div>
    </div>
  );
}
