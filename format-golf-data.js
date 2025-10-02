const fs = require('fs');
const data = JSON.parse(fs.readFileSync('temp-golf-clean.json', 'utf8'));

const formatted = data.elements.map((el, index) => {
  const tags = el.tags || {};
  let lat, lon;

  if (el.type === 'node') {
    lat = el.lat;
    lon = el.lon;
  } else if (el.center) {
    lat = el.center.lat;
    lon = el.center.lon;
  } else {
    return null;
  }

  const name = tags.name || tags['name:fr'] || `Golf ${index + 1}`;
  const address = [
    tags['addr:housenumber'],
    tags['addr:street'],
    tags['addr:postcode'],
    tags['addr:city']
  ].filter(Boolean).join(' ') || 'Adresse non renseignée';

  const holes = parseInt(tags.golf_course || tags.holes || '18');

  return {
    __name__: `golf-${el.id}`,
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
    website: tags.website || tags['contact:website'] || '',
    phone: tags.phone || tags['contact:phone'] || '',
    rating: 0,
    source: 'OpenStreetMap'
  };
}).filter(Boolean);

fs.writeFileSync('golf-courses-import.json', JSON.stringify(formatted, null, 2));
console.log(`✅ ${formatted.length} golfs formatés et prêts pour import !`);
console.log('\n📋 Liste des golfs :');
formatted.forEach((golf, i) => {
  console.log(`  ${i + 1}. ${golf.name} - ${golf.city}`);
});
