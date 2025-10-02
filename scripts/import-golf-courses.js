/**
 * Script pour importer les parcours de golf français depuis OpenStreetMap
 * Usage: node scripts/import-golf-courses.js
 */

const https = require('https');
const admin = require('firebase-admin');
require('dotenv').config({ path: '.env.local' });

// Initialize Firebase Admin with environment variables
// Note: Pour l'admin SDK, on utilise les credentials de l'app web
admin.initializeApp({
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
});

const db = admin.firestore();

// Requête Overpass API pour récupérer les golfs en France
const overpassQuery = `
[out:json][timeout:60];
area["ISO3166-1"="FR"][admin_level=2];
(
  node["leisure"="golf_course"](area);
  way["leisure"="golf_course"](area);
  relation["leisure"="golf_course"](area);
);
out center;
`;

function fetchGolfCourses() {
  return new Promise((resolve, reject) => {
    const postData = overpassQuery;

    const options = {
      hostname: 'overpass-api.de',
      port: 443,
      path: '/api/interpreter',
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    console.log('🔍 Récupération des golfs depuis OpenStreetMap...');

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.elements || []);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

function formatGolfCourse(element) {
  const tags = element.tags || {};

  // Récupérer les coordonnées
  let lat, lon;
  if (element.type === 'node') {
    lat = element.lat;
    lon = element.lon;
  } else if (element.center) {
    lat = element.center.lat;
    lon = element.center.lon;
  } else {
    return null; // Pas de coordonnées disponibles
  }

  // Extraire le nom
  const name = tags.name || tags['name:fr'] || `Golf ${element.id}`;

  // Extraire l'adresse
  const address = [
    tags['addr:housenumber'],
    tags['addr:street'],
    tags['addr:postcode'],
    tags['addr:city']
  ].filter(Boolean).join(' ') || 'Adresse non renseignée';

  // Nombre de trous
  const holes = parseInt(tags.golf_course || tags.holes || '18');

  // Site web
  const website = tags.website || tags['contact:website'] || '';

  // Téléphone
  const phone = tags.phone || tags['contact:phone'] || '';

  return {
    id: `osm-${element.id}`,
    name: name,
    address: address,
    city: tags['addr:city'] || 'Non renseigné',
    region: tags['addr:state'] || tags['addr:region'] || 'France',
    country: 'France',
    coordinates: {
      latitude: lat,
      longitude: lon
    },
    holes: holes,
    description: tags.description || `Parcours de golf de ${holes} trous`,
    website: website,
    phone: phone,
    rating: 0,
    reviews: [],
    amenities: [],
    images: [],
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    source: 'OpenStreetMap'
  };
}

async function importToFirestore(golfCourses) {
  console.log(`\n📥 Import de ${golfCourses.length} golfs dans Firestore...`);

  const batch = db.batch();
  let count = 0;
  let batchCount = 0;

  for (const course of golfCourses) {
    const formatted = formatGolfCourse(course);
    if (!formatted) continue;

    const docRef = db.collection('courses').doc(formatted.id);
    batch.set(docRef, formatted, { merge: true });
    count++;
    batchCount++;

    // Firestore limite à 500 opérations par batch
    if (batchCount === 500) {
      await batch.commit();
      console.log(`  ✓ ${count} golfs importés...`);
      batchCount = 0;
    }
  }

  // Commit du dernier batch
  if (batchCount > 0) {
    await batch.commit();
  }

  console.log(`\n✅ Import terminé : ${count} parcours de golf ajoutés !`);
  return count;
}

async function main() {
  try {
    console.log('🏌️ Début de l\'import des parcours de golf français\n');

    // Récupérer les données d'OpenStreetMap
    const elements = await fetchGolfCourses();
    console.log(`✓ ${elements.length} golfs trouvés sur OpenStreetMap`);

    // Importer dans Firestore
    await importToFirestore(elements);

    console.log('\n🎉 Processus terminé avec succès !');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Erreur:', error);
    process.exit(1);
  }
}

main();
