# Base de données des golfs - Golf Buddies

## 📍 Localisation des données

Les parcours de golf sont stockés dans **Firestore** (collection `courses`), **pas dans le fichier TypeScript**.

- **Firestore collection**: `courses`
- **Nombre actuel**: 155 golfs
- **Couverture**: 61 départements sur 101 (60%)

## 🔧 Scripts d'import

### Import depuis un fichier JSON
```bash
node import-courses.js [nom-fichier.json]
```

Le script utilise:
- Fichier par défaut: `golf-courses-import.json`
- Service Account: `smaaks-1-firebase-adminsdk-fbsvc-d4f55b6723.json`

### Import depuis OpenStreetMap
```bash
node scripts/import-golf-courses.js
```

## 📋 Format JSON pour les imports

```json
[
  {
    "__name__": "golf-id-unique",
    "name": "Nom du Golf",
    "city": "Ville",
    "region": "Région française",
    "country": "France",
    "address": "Adresse complète",
    "coordinates": {
      "latitude": 48.1234,
      "longitude": 2.5678
    },
    "holes": 18,
    "description": "Description du parcours",
    "website": "https://www.golf-exemple.com",
    "phone": "01 23 45 67 89",
    "rating": 4.2
  }
]
```

### Champs obligatoires
- `__name__`: ID unique du document Firestore (format: `golf-nom-ville`)
- `name`: Nom du golf
- `city`: Ville (utilisée pour déterminer le département)
- `region`: Région administrative française
- `country`: "France"
- `coordinates.latitude`: Latitude GPS
- `coordinates.longitude`: Longitude GPS
- `holes`: Nombre de trous (généralement 9 ou 18)

### Champs optionnels
- `address`: Adresse complète
- `description`: Description du parcours
- `website`: Site web officiel
- `phone`: Numéro de téléphone
- `rating`: Note (0-5)

## 📊 Couverture actuelle par département

### Départements bien couverts (>5 golfs)
- **83** (Var): 14 golfs
- **06** (Alpes-Maritimes): 12 golfs
- **13** (Bouches-du-Rhône): 8 golfs (dont Fuveau)
- **78** (Yvelines): 6 golfs
- **64** (Pyrénées-Atlantiques): 5 golfs
- **85** (Vendée): 5 golfs

### 35 départements sans aucun golf (à compléter)

**Prioritaires**:
- 59 (Nord - Lille)
- 42 (Loire - Saint-Étienne)
- 76 (Seine-Maritime - Rouen) - était présent avant
- 87 (Haute-Vienne - Limoges)
- 86 (Vienne - Poitiers)

**Autres**:
02, 07, 09, 12, 15, 18, 19, 23, 27, 28, 32, 36, 39, 47, 48, 50, 52, 53, 55, 61, 65, 70, 79, 82, 89, 90, 93, 94, 2B

**Note**: Le département 75 (Paris) n'a pas de golf (normal - Paris intra-muros)

## 🔍 Scripts d'analyse

### Vérifier la couverture départementale
```bash
node full-department-analysis.js
```

Affiche:
- Nombre total de golfs
- Départements couverts avec nombre de golfs
- Départements manquants
- Golfs par département détaillé

### Vérifier les golfs dans Firestore
```bash
node check-firestore-courses.js
```

## 📝 Procédure pour ajouter des golfs

1. **Créer un fichier JSON** avec les nouveaux golfs (format ci-dessus)
2. **Vérifier les données**:
   - ID unique (`__name__`)
   - Ville correcte (pour le département)
   - Coordonnées GPS valides
3. **Importer dans Firestore**:
   ```bash
   node import-courses.js nouveau-golfs.json
   ```
4. **Vérifier l'import**:
   ```bash
   node full-department-analysis.js
   ```

## ⚠️ Attention

- Ne PAS modifier directement `src/data/golf-courses.ts` - ce fichier n'est plus utilisé
- L'application charge les golfs depuis Firestore via le hook `useCourses()`
- Toujours tester l'import sur un petit fichier avant d'importer beaucoup de golfs
- Les golfs avec `__name__` existant seront écrasés (pas de doublons)

## 🗺️ Sources de données recommandées

1. **Site officiel de la FFGolf**: https://www.ffgolf.org
2. **OpenStreetMap**: Via le script `scripts/import-golf-courses.js`
3. **Albatros**: https://www.albatros.com
4. **Google Maps**: Recherche manuelle pour coordonnées GPS

## 📞 Contact

Pour toute question sur la base de données des golfs: contact@smaaks.fr
