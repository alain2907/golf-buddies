const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function listCourses() {
  try {
    const snapshot = await db.collection('courses').get();
    console.log(`\n📊 Total de parcours de golf : ${snapshot.size}\n`);

    snapshot.forEach((doc) => {
      const data = doc.data();
      console.log(`- ${doc.id} : ${data.name} (${data.city})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Erreur:', error);
    process.exit(1);
  }
}

listCourses();
