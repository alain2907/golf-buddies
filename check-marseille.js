const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function listGolfs() {
  const snapshot = await db.collection('courses').get();
  const golfs = [];
  snapshot.forEach(doc => {
    const data = doc.data();
    golfs.push({ id: doc.id, name: data.name, city: data.city });
  });

  // Filtrer pour zone Marseille/Aix
  const zone = golfs.filter(g => g.city && (
    g.city.toLowerCase().includes('pennes') ||
    g.city.toLowerCase().includes('marseille') ||
    g.city.toLowerCase().includes('aix-en')
  ));

  console.log('Total golfs:', golfs.length);
  console.log('\nGolfs zone Marseille/Aix trouvés:', zone.length);
  zone.forEach(g => console.log(`  - ${g.name} (${g.city})`));

  process.exit(0);
}

listGolfs();
