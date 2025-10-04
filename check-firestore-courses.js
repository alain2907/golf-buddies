const admin = require('firebase-admin');
const serviceAccount = require('./smaaks-1-firebase-adminsdk-fbsvc-d4f55b6723.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function checkCourses() {
  try {
    const coursesSnapshot = await db.collection('courses').get();
    console.log(`\n📊 Nombre total de golfs dans Firestore: ${coursesSnapshot.size}\n`);

    // Grouper par département (2 premiers chiffres du code postal si disponible)
    const departmentMap = new Map();
    const noDepartment = [];

    coursesSnapshot.forEach(doc => {
      const course = doc.data();
      const city = course.city || '';

      // Essayer de trouver le code postal dans l'adresse ou déduire du nom de ville
      // Pour une analyse complète, on va juste grouper par ville pour l'instant
      const dept = city.substring(0, 20); // Grouper par ville

      if (!departmentMap.has(dept)) {
        departmentMap.set(dept, []);
      }
      departmentMap.get(dept).push({
        name: course.name,
        city: course.city,
        id: doc.id
      });
    });

    console.log(`🏌️  Golfs par ville (aperçu des 30 premières):\n`);
    let count = 0;
    for (const [dept, courses] of Array.from(departmentMap.entries()).sort()) {
      console.log(`${dept}: ${courses.length} golf(s)`);
      courses.forEach(c => console.log(`  - ${c.name}`));
      count++;
      if (count >= 30) {
        console.log(`\n... et ${departmentMap.size - 30} autres villes\n`);
        break;
      }
    }

    // Chercher spécifiquement Fuveau
    console.log(`\n🔍 Recherche de Fuveau:\n`);
    const fuveauCourses = [];
    coursesSnapshot.forEach(doc => {
      const course = doc.data();
      if (course.city && course.city.toLowerCase().includes('fuveau')) {
        fuveauCourses.push({
          id: doc.id,
          name: course.name,
          city: course.city,
          region: course.region
        });
      }
    });

    if (fuveauCourses.length > 0) {
      console.log(`✅ Trouvé ${fuveauCourses.length} golf(s) à Fuveau:`);
      fuveauCourses.forEach(c => {
        console.log(`  - ${c.name} (${c.city}, ${c.region})`);
      });
    } else {
      console.log(`❌ Aucun golf trouvé à Fuveau`);
    }

  } catch (error) {
    console.error('Erreur:', error);
  } finally {
    process.exit(0);
  }
}

checkCourses();
