const admin = require('firebase-admin');
const fs = require('fs');

// Initialize Firebase Admin
const serviceAccount = require('./smaaks-1-firebase-adminsdk-fbsvc-d4f55b6723.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function importGolfCourses() {
  try {
    console.log('🏌️ Début de l\'import des parcours de golf\n');

    // Lire le fichier JSON (argument ou fichier par défaut)
    const fileName = process.argv[2] || 'golf-courses-import.json';
    const golfsData = JSON.parse(fs.readFileSync(fileName, 'utf8'));
    console.log(`📋 ${golfsData.length} parcours à importer\n`);

    // Importer chaque golf
    for (const golf of golfsData) {
      const { __name__, ...golfData } = golf;
      const docRef = db.collection('courses').doc(__name__);

      await docRef.set(golfData);
      console.log(`✓ ${golfData.name} - ${golfData.city}`);
    }

    console.log(`\n✅ ${golfsData.length} parcours de golf importés avec succès !`);
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Erreur:', error);
    process.exit(1);
  }
}

importGolfCourses();
