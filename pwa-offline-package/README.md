# 📦 PWA Offline Package

Package générique pour ajouter des fonctionnalités PWA et mode hors connexion à n'importe quelle application Next.js / React.

## 📋 Contenu du package

### Hooks

- **`useOfflineSync`** : Synchronisation automatique des actions en mode hors ligne
- **`useLocalStorage`** : Gestion simplifiée du localStorage avec React
- **`useNetworkStatus`** : Détection de l'état de connexion réseau

### Composants

- **`OfflineIndicator`** : Indicateur visuel de l'état de connexion
- **`InstallPrompt`** : Popup d'installation PWA
- **`SyncStatus`** : Affichage du statut de synchronisation

### Librairies

- **`offlineStorage`** : Gestion IndexedDB pour stockage hors ligne
- **`cacheManager`** : Gestion avancée du cache avec stratégies

### Configuration

- **`pwa.config.ts`** : Configuration centralisée PWA

## 🚀 Installation

1. **Copier les fichiers dans votre projet Next.js**

```bash
cp -r hooks components lib config /votre-projet/src/
```

2. **Installer les dépendances**

```bash
npm install next-pwa
```

3. **Configurer Next.js**

Créer ou modifier `next.config.ts` :

```typescript
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig = {
  // votre config
};

export default withPWA(nextConfig);
```

4. **Créer le manifest.json**

Créer `public/manifest.json` :

```json
{
  "name": "Votre App",
  "short_name": "App",
  "description": "Description",
  "theme_color": "#5A2D82",
  "background_color": "#ffffff",
  "display": "standalone",
  "orientation": "portrait",
  "scope": "/",
  "start_url": "/",
  "lang": "fr",
  "icons": [
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

5. **Ajouter les icônes PWA**

Créer le dossier `public/icons/` et ajouter vos icônes :
- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png

6. **Mettre à jour le layout**

Dans `app/layout.tsx` :

```typescript
export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#5A2D82" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

## 📖 Guide d'utilisation

### 1. Détection de la connexion

```typescript
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { OfflineIndicator } from '@/components/OfflineIndicator';

export default function MyComponent() {
  const { isOnline } = useNetworkStatus();

  return (
    <div>
      <OfflineIndicator />
      {isOnline ? 'En ligne' : 'Hors ligne'}
    </div>
  );
}
```

### 2. Synchronisation hors ligne

```typescript
import { useOfflineSync } from '@/hooks/useOfflineSync';

export default function MyComponent() {
  const { isOnline, addToQueue, syncPending, hasPendingSync } = useOfflineSync();

  const handleAction = async (data) => {
    if (isOnline) {
      // Action directe si en ligne
      await saveToAPI(data);
    } else {
      // Mise en queue si hors ligne
      addToQueue({ type: 'save', data });
    }
  };

  // Synchroniser quand la connexion revient
  useEffect(() => {
    if (isOnline && hasPendingSync) {
      syncPending(async (action) => {
        if (action.type === 'save') {
          await saveToAPI(action.data);
        }
      });
    }
  }, [isOnline, hasPendingSync]);

  return <button onClick={() => handleAction(myData)}>Sauvegarder</button>;
}
```

### 3. Stockage local

```typescript
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function MyComponent() {
  const { storedValue, setValue, removeValue } = useLocalStorage('myKey', defaultValue);

  return (
    <div>
      <input
        value={storedValue}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={removeValue}>Effacer</button>
    </div>
  );
}
```

### 4. Gestion du cache

```typescript
import { cacheManager } from '@/lib/cacheManager';

// Stratégie Network First (pour les API)
const fetchData = async () => {
  try {
    return await cacheManager.networkFirst('/api/data');
  } catch (error) {
    console.error('Erreur de récupération:', error);
  }
};

// Stratégie Cache First (pour les images)
const loadImage = async (url) => {
  return await cacheManager.cacheFirst(url);
};
```

### 5. IndexedDB pour données complexes

```typescript
import { offlineStorage } from '@/lib/offlineStorage';

// Sauvegarder
await offlineStorage.save('user_profile', userData);

// Récupérer
const profile = await offlineStorage.get('user_profile');

// Récupérer tout
const allData = await offlineStorage.getAll();

// Supprimer
await offlineStorage.delete('user_profile');

// Tout effacer
await offlineStorage.clear();
```

### 6. Prompt d'installation PWA

```typescript
import { InstallPrompt } from '@/components/InstallPrompt';

export default function Layout({ children }) {
  return (
    <div>
      {children}
      <InstallPrompt appName="Mon Application" />
    </div>
  );
}
```

### 7. Statut de synchronisation

```typescript
import { SyncStatus } from '@/components/SyncStatus';
import { useOfflineSync } from '@/hooks/useOfflineSync';

export default function MyComponent() {
  const { isOnline, pendingSync, syncPending } = useOfflineSync();

  return (
    <SyncStatus
      pendingCount={pendingSync.length}
      isOnline={isOnline}
      onSync={() => syncPending(handleSync)}
    />
  );
}
```

## ⚙️ Configuration avancée

### Personnaliser les stratégies de cache

Modifier `config/pwa.config.ts` :

```typescript
export const PWA_CONFIG = {
  precacheResources: [
    '/',
    '/dashboard',
    '/profile',
  ],
  cacheStrategies: {
    images: 'cache-first',
    api: 'network-first',
    static: 'cache-first'
  },
  cacheDuration: {
    images: 7 * 24 * 60 * 60,
    api: 5 * 60,
    static: 30 * 24 * 60 * 60
  }
};
```

## 🎯 Cas d'usage recommandés

1. **Applications de gestion** : Formulaires, édition de données
2. **Apps sociales** : Lecture de contenu, synchronisation de posts
3. **E-commerce** : Navigation produits, panier offline
4. **Apps de productivité** : Notes, tâches, calendrier
5. **Apps de santé** : Suivi d'activités, journaux

## 📝 Notes importantes

- Testez toujours le mode offline en simulant une déconnexion réseau
- IndexedDB a une limite de stockage (généralement 50MB+)
- Le cache SW persiste entre les sessions
- Pensez à gérer les conflits de synchronisation
- Les Service Workers ne fonctionnent qu'en HTTPS (sauf localhost)

## 🔧 Dépannage

### Le Service Worker ne s'installe pas
- Vérifier que vous êtes en HTTPS ou localhost
- Vérifier la console pour les erreurs
- Clear cache et reload

### Les données ne se synchronisent pas
- Vérifier `useOfflineSync` est bien appelé
- Vérifier la fonction de sync passée à `syncPending`
- Vérifier les erreurs dans la console

### Le prompt d'installation n'apparaît pas
- Chrome : Doit remplir les critères PWA
- Safari iOS : Installation manuelle via "Ajouter à l'écran d'accueil"
- Vérifier le manifest.json est valide

## 📚 Ressources

- [Next PWA Documentation](https://github.com/shadowwalker/next-pwa)
- [MDN Service Workers](https://developer.mozilla.org/fr/docs/Web/API/Service_Worker_API)
- [Web.dev PWA](https://web.dev/progressive-web-apps/)
- [IndexedDB API](https://developer.mozilla.org/fr/docs/Web/API/IndexedDB_API)

## 📄 Licence

Ce package est libre d'utilisation pour tous vos projets.

---

**Créé pour faciliter l'intégration PWA dans vos applications Next.js / React**
