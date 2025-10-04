const admin = require('firebase-admin');
const serviceAccount = require('./smaaks-1-firebase-adminsdk-fbsvc-d4f55b6723.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Table complète ville -> département (codes postaux français)
const CITY_DEPT = {
  // Déjà identifiées
  'Fuveau': '13', 'Aix-en-Provence': '13', 'Marseille': '13',
  'Cannes': '06', 'Grasse': '06', 'La Turbie': '06', 'Mougins': '06', 'Antibes': '06', 'Biot': '06',
  'Deauville': '14', 'Caen': '14', 'Bénouville': '14', 'Cabourg': '14', 'Saint-Julien-sur-Calonne': '14',
  'Bordeaux': '33', 'Arcachon': '33',
  'Rennes': '35', 'Dinard': '35', 'Saint-Briac-sur-Mer': '35', 'Saint-Jacques-de-la-Lande': '35', 'Bruz': '35',
  'Biarritz': '64', 'Anglet': '64', 'Pau': '64', 'Bayonne': '64', 'Bassussarry': '64', 'Bidart': '64', 'Billère': '64',
  'Strasbourg': '67', 'Illkirch-Graffenstaden': '67',
  'Mulhouse': '68', 'Rouffach': '68', 'Ammerschwihr': '68',
  'Lyon': '69', 'La Tour-de-Salvagny': '69', 'Salvagny': '69',
  'Evian-les-Bains': '74', 'Chamonix': '74', 'Megève': '74', 'Talloires-Montmin': '74', 'Voglans': '74', 'Évian-les-Bains': '74',
  'Étretat': '76', 'Le Havre': '76', 'Rouen': '76',
  'Fontainebleau': '77',
  'Versailles': '78', 'Saint-Quentin-en-Yvelines': '78', 'Saint-Germain-en-Laye': '78',
  'Chantilly': '60', 'Mortefontaine': '60', 'Morfontaine': '60', 'Vineuil-Saint-Firmin': '60',
  'Garches': '92', 'Rueil-Malmaison': '92', 'Bievres': '92', 'Marnes-la-Coquette': '92', 'Nanterre': '92',
  'Montpellier': '34', 'Baillargues': '34', 'Béziers': '34',
  'Ardon': '45', 'Orléans': '45',
  'Tours': '37', 'Saint-Antoine-du-Rocher': '37',
  'Ajaccio': '2A', 'Bastia': '2B', 'Bonifacio': '2A',
  'Besançon': '25',
  'Nîmes': '30',
  'Grenoble': '38', 'Bresson': '38',
  'Angers': '49', 'Avrillé': '49',
  'Nancy': '54', 'Aingeray': '54',
  'Baden': '56',
  'Metz': '57',
  'Challuy': '58', 'Nevers': '58',
  'Toulon': '83', 'Saint-Tropez': '83', 'Bormes-les-Mimosas': '83', 'Brignoles': '83',
  'Aix-les-Bains': '73', 'Courchevel': '73',
  'Albi': '81',
  'Carcassonne': '11',
  'Apremont': '85',
  'Baillet-en-France': '95',
  'Bellerive-sur-Allier': '03', 'Vichy': '03',
  'Briançon': '05', 'Gap': '05',
  'Divonne-les-Bains': '01', 'Condeissiat': '01',
  'Clécy': '14', 'Port-en-Bessin': '14',

  // Villes non identifiées - à compléter
  'Chalon-sur-Saône': '71', 'Mâcon': '71',
  'Champniers': '16',
  'Changé': '72', 'Le Mans': '72',
  'Chaource': '10',
  'Chassieu': '69',
  'Chaussy': '95',
  'Civry-la-Forêt': '78',
  'Clohars-Fouesnant': '29', 'Brest': '29',
  'Courson-Monteloup': '91',
  'Cély': '77',
  'Digne-les-Bains': '04',
  'Feucherolles': '78',
  'Fort-Mahon-Plage': '80', 'Amiens': '80',
  'Fréhel': '22',
  'Frépillon': '95',
  'Gassin': '83',
  'Gueux': '51', 'Reims': '51',
  'Guyancourt': '78',
  'L\'Alpe-d\'Huez': '38',
  'La Boulie': '78',
  'La Chaize-le-Vicomte': '85',
  'La Grande-Motte': '34',
  'La Londe-les-Maures': '83',
  'La Martre': '83',
  'La Motte': '83',
  'La Rochelle': '17',
  'La Salle': '73',
  'La Teste-de-Buch': '33',
  'La Valette-du-Var': '83',
  'Landerneau': '29',
  'Le Pian-Médoc': '33',
  'Le Tronchet': '35',
  'Les Orres': '05',
  'Les Pennes-Mirabeau': '13',
  'Levernois': '21', 'Dijon': '21',
  'Lucenay': '69',
  'Mallemort': '13',
  'Mandelieu-la-Napoule': '06',
  'Mercuès': '46',
  'Missillac': '44', 'Nantes': '44',
  'Moliets-et-Maa': '40',
  'Monthieux': '01',
  'Montélier': '26',
  'Montélimar': '26',
  'Mouleydier': '24',
  'Mouriès': '13',
  'Méribel': '73',
  'Nans-les-Pins': '83',
  'Neufchâtel-Hardelot': '62', 'Wimereux': '62',
  'Norges-la-Ville': '21',
  'Olonne-sur-Mer': '85',
  'Opio': '06',
  'Orcines': '63', 'Clermont-Ferrand': '63',
  'Pléneuf-Val-André': '22',
  'Plérin': '22',
  'Pornic': '44',
  'Puget-sur-Argens': '83',
  'Péone': '06',
  'Quéven': '56',
  'Rixheim': '68',
  'Roquebrune-sur-Argens': '83',
  'Royan': '17',
  'Saint-André-des-Eaux': '44',
  'Saint-Arnoult': '78',
  'Saint-Brice': '35',
  'Saint-Chaffrey': '05',
  'Saint-Cyprien': '66', 'Perpignan': '66',
  'Saint-Donat-sur-l\'Herbasse': '26',
  'Saint-Jean-de-Monts': '85',
  'Saint-Nom-la-Bretèche': '78',
  'Saint-Pierre-Quiberon': '56',
  'Saint-Raphaël': '83',
  'Sainte-Maxime': '83',
  'Seignosse': '40',
  'Seilh': '31', 'Toulouse': '31',
  'Signy-l\'Abbaye': '08',
  'Soorts-Hossegor': '40',
  'Talmont-Saint-Hilaire': '85',
  'Tourrettes': '83',
  'Valbonne': '06',
  'Vals-près-le-Puy': '43',
  'Vedène': '84', 'Avignon': '84',
  'Vidauban': '83',
  'Vigneux-de-Bretagne': '44',
  'Villette-d\'Anthon': '38',
  'Villette-de-Vienne': '38',
  'Vineuil': '41',
  'Vitrac': '24',
  'Épinal': '88',
  'Saint-Étienne': '42',
  'Limoges': '87',
  'Poitiers': '86',
  'Créteil': '94',
  'Montreuil': '93',
  'Lille': '59', 'Roubaix': '59', 'Tourcoing': '59', 'Bondues': '59', 'Villeneuve-d\'Ascq': '59',
  'Nice': '06',
  // Nouveaux golfs ajoutés
  'La Fouillouse': '42',
  'Mont-Saint-Aignan': '76',
  'Saint-Cyr': '86',
  'Saint-Sébastien-de-Morsent': '27',
  'Coudray': '28',
  'Auch': '32',
  'Villedieu-sur-Indre': '36',
  'Saint-Germain-lès-Arlay': '39',
  'Bon-Encontre': '47',
  'La Canourgue': '48',
  'La Glacerie': '50',
  'Champfleur': '61',
  'Saint-Sulpice-le-Guérétois': '23',
  'Combles-en-Barrois': '55',
  'Saint-Priest': '07',
  'La Bastide-de-Sérou': '09',
  'Onet-le-Château': '12',
  'Arpajon-sur-Cère': '15',
  'Osmoy': '18',
  'Villebret': '03',
  'Chaumont': '52',
  'Aureilhan': '65',
  'Baudoncourt': '70',
  'Romagné': '79',
  'Montauban': '82',
  'Appoigny': '89',
  'Rougemont-le-Château': '90',
  'Châteauneuf-Grasse': '06',
  'Chamonix-Mont-Blanc': '74'
};

async function fullAnalysis() {
  try {
    const coursesSnapshot = await db.collection('courses').get();
    const deptMap = new Map();
    const notFound = [];

    coursesSnapshot.forEach(doc => {
      const course = doc.data();
      const city = course.city || '';

      let dept = null;
      for (const [knownCity, deptCode] of Object.entries(CITY_DEPT)) {
        if (city.toLowerCase() === knownCity.toLowerCase()) {
          dept = deptCode;
          break;
        }
      }

      if (!dept) {
        notFound.push({ name: course.name, city });
      } else {
        if (!deptMap.has(dept)) {
          deptMap.set(dept, []);
        }
        deptMap.get(dept).push({ name: course.name, city });
      }
    });

    console.log(`\n📊 ANALYSE COMPLÈTE DE LA COUVERTURE DÉPARTEMENTALE\n`);
    console.log(`Total golfs: ${coursesSnapshot.size}`);
    console.log(`Départements couverts: ${deptMap.size} / 101 (96 métropole + Corse 2A/2B + 3 non couverts)\n`);

    const sorted = Array.from(deptMap.entries()).sort((a, b) => {
      const numA = a[0].replace(/[AB]/, '');
      const numB = b[0].replace(/[AB]/, '');
      return numA.localeCompare(numB, undefined, { numeric: true });
    });

    console.log(`✅ DÉPARTEMENTS COUVERTS:\n`);
    sorted.forEach(([dept, courses]) => {
      console.log(`${dept}: ${courses.length} golf(s)`);
    });

    console.log(`\n❌ GOLFS NON IDENTIFIÉS (${notFound.length}):`);
    notFound.forEach(g => console.log(`  - ${g.name} (${g.city})`));

    // Liste des départements manquants
    const allDepts = [];
    for (let i = 1; i <= 95; i++) {
      if (i === 20) continue; // Corse
      allDepts.push(i.toString().padStart(2, '0'));
    }
    allDepts.push('2A', '2B'); // Corse

    const missing = allDepts.filter(d => !deptMap.has(d));
    console.log(`\n❌ DÉPARTEMENTS SANS GOLF (${missing.length}):\n`);
    console.log(missing.join(', '));

  } catch (error) {
    console.error('Erreur:', error);
  } finally {
    process.exit(0);
  }
}

fullAnalysis();
