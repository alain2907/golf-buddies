const admin = require('firebase-admin');
const serviceAccount = require('./smaaks-1-firebase-adminsdk-fbsvc-d4f55b6723.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Table de correspondance ville -> code postal (principales villes)
const cityPostalCodes = {
  'Paris': '75', 'Marseille': '13', 'Lyon': '69', 'Toulouse': '31', 'Nice': '06',
  'Nantes': '44', 'Strasbourg': '67', 'Montpellier': '34', 'Bordeaux': '33',
  'Lille': '59', 'Rennes': '35', 'Reims': '51', 'Le Havre': '76', 'Saint-Étienne': '42',
  'Toulon': '83', 'Grenoble': '38', 'Dijon': '21', 'Nîmes': '30', 'Angers': '49',
  'Villeurbanne': '69', 'Clermont-Ferrand': '63', 'Aix-en-Provence': '13',
  'Brest': '29', 'Limoges': '87', 'Tours': '37', 'Amiens': '80', 'Perpignan': '66',
  'Metz': '57', 'Besançon': '25', 'Orléans': '45', 'Rouen': '76', 'Mulhouse': '68',
  'Caen': '14', 'Boulogne-Billancourt': '92', 'Nancy': '54', 'Argenteuil': '95',
  'Montreuil': '93', 'Roubaix': '59', 'Tourcoing': '59', 'Avignon': '84',
  'Poitiers': '86', 'Nanterre': '92', 'Versailles': '78', 'Créteil': '94',
  'Pau': '64', 'Bayonne': '64', 'Antibes': '06', 'Cannes': '06', 'Biarritz': '64',
  'Ajaccio': '20', 'Bastia': '20', 'Evian-les-Bains': '74', 'Chamonix': '74',
  'Deauville': '14', 'Étretat': '76', 'Dinard': '35', 'Arcachon': '33',
  'Saint-Tropez': '83', 'Megève': '74', 'Courchevel': '73', 'Mâcon': '71',
  'Albi': '81', 'Carcassonne': '11', 'Béziers': '34', 'Anglet': '64',
  'Bonifacio': '20', 'Bormes-les-Mimosas': '83', 'Briançon': '05',
  'Brignoles': '83', 'Bruz': '35', 'Challuy': '58', 'Fuveau': '13',
  'Grasse': '06', 'La Turbie': '06', 'Mougins': '06', 'Divonne-les-Bains': '01',
  'Saint-Quentin-en-Yvelines': '78', 'Garches': '92', 'Fontainebleau': '77',
  'Chantilly': '60', 'Mortefontaine': '60', 'Saint-Germain-en-Laye': '78',
  'Saint-Briac-sur-Mer': '35', 'Saint-Jacques-de-la-Lande': '35',
  'La Tour-de-Salvagny': '69', 'Port-en-Bessin': '14', 'Bénouville': '14',
  'Cabourg': '14', 'Saint-Julien-sur-Calonne': '14', 'Clécy': '14',
  'Ardon': '45', 'Saint-Antoine-du-Rocher': '37', 'Rouffach': '68',
  'Illkirch-Graffenstaden': '67', 'Rueil-Malmaison': '92', 'Baden': '56',
  'Baillargues': '34', 'Baillet-en-France': '95', 'Bassussarry': '64',
  'Bellerive-sur-Allier': '03', 'Bidart': '64', 'Bievres': '92',
  'Billère': '64', 'Biot': '06', 'Bresson': '38', 'Aingeray': '54',
  'Aix-les-Bains': '73', 'Ammerschwihr': '68', 'Apremont': '85', 'Avrillé': '49'
};

async function analyzeDepartments() {
  try {
    const coursesSnapshot = await db.collection('courses').get();
    const departmentMap = new Map();
    const unknownCities = new Set();

    coursesSnapshot.forEach(doc => {
      const course = doc.data();
      const city = course.city || '';

      // Chercher le département
      let dept = null;

      // Vérifier dans notre table
      for (const [cityName, postalPrefix] of Object.entries(cityPostalCodes)) {
        if (city.toLowerCase().includes(cityName.toLowerCase())) {
          dept = postalPrefix;
          break;
        }
      }

      if (!dept) {
        unknownCities.add(city);
      } else {
        if (!departmentMap.has(dept)) {
          departmentMap.set(dept, []);
        }
        departmentMap.get(dept).push({
          name: course.name,
          city: course.city
        });
      }
    });

    console.log(`\n📊 Analyse de la couverture départementale\n`);
    console.log(`Total de golfs: ${coursesSnapshot.size}`);
    console.log(`Départements couverts: ${departmentMap.size}\n`);

    // Afficher les départements avec leur nombre de golfs
    const sortedDepts = Array.from(departmentMap.entries()).sort((a, b) => a[0].localeCompare(b[0]));

    console.log(`📍 Liste des départements couverts:\n`);
    sortedDepts.forEach(([dept, courses]) => {
      console.log(`${dept} (${courses.length} golf${courses.length > 1 ? 's' : ''})`);
    });

    console.log(`\n⚠️  Villes non identifiées (${unknownCities.size}):`);
    Array.from(unknownCities).sort().forEach(city => {
      console.log(`  - ${city}`);
    });

    // Vérifier spécifiquement le département 13
    if (departmentMap.has('13')) {
      console.log(`\n✅ Département 13 (Bouches-du-Rhône) - ${departmentMap.get('13').length} golfs:`);
      departmentMap.get('13').forEach(c => {
        console.log(`  - ${c.name} (${c.city})`);
      });
    }

  } catch (error) {
    console.error('Erreur:', error);
  } finally {
    process.exit(0);
  }
}

analyzeDepartments();
