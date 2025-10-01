/**
 * PWA Offline Package - Export centralisé
 */

// Hooks
export { useOfflineSync } from './hooks/useOfflineSync';
export { useLocalStorage } from './hooks/useLocalStorage';
export { useNetworkStatus } from './hooks/useNetworkStatus';

// Components
export { OfflineIndicator } from './components/OfflineIndicator';
export { InstallPrompt } from './components/InstallPrompt';
export { SyncStatus } from './components/SyncStatus';

// Lib
export { OfflineStorage, offlineStorage } from './lib/offlineStorage';
export { CacheManager, cacheManager } from './lib/cacheManager';

// Config
export { PWA_CONFIG, MANIFEST_TEMPLATE } from './config/pwa.config';
