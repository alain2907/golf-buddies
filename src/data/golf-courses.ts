export interface GolfCourse {
  id: string
  name: string
  city: string
  region: string
  postalCode: string
  holes: number
  par: number
  distance: number // en mètres
  website?: string
  phone?: string
  email?: string
  coordinates: {
    lat: number
    lng: number
  }
  facilities: string[]
  description?: string
  rating?: number
}

export const golfCourses: GolfCourse[] = [
  // Île-de-France (Paris et environs)
  {
    id: 'golf-national',
    name: 'Golf National',
    city: 'Saint-Quentin-en-Yvelines',
    region: 'Île-de-France',
    postalCode: '78114',
    holes: 18,
    par: 72,
    distance: 6842,
    website: 'https://www.golf-national.com',
    phone: '01 30 43 36 00',
    coordinates: { lat: 48.7626, lng: 2.0774 },
    facilities: ['Practice', 'Pro Shop', 'Restaurant', 'Bar', 'Vestiaires', 'Location voiturettes'],
    description: 'Le Golf National est le temple du golf français, hôte de la Ryder Cup 2018',
    rating: 4.8
  },
  {
    id: 'golf-saint-cloud',
    name: 'Golf de Saint-Cloud',
    city: 'Garches',
    region: 'Île-de-France',
    postalCode: '92380',
    holes: 18,
    par: 72,
    distance: 6232,
    website: 'https://www.golfsaintcloud.com',
    phone: '01 47 01 01 85',
    coordinates: { lat: 48.8467, lng: 2.1881 },
    facilities: ['Practice', 'Pro Shop', 'Restaurant', 'Putting green', 'Pitching green'],
    description: 'Un parcours historique créé en 1911, proche de Paris',
    rating: 4.6
  },
  {
    id: 'golf-fontainebleau',
    name: 'Golf de Fontainebleau',
    city: 'Fontainebleau',
    region: 'Île-de-France',
    postalCode: '77300',
    holes: 18,
    par: 72,
    distance: 6139,
    website: 'https://www.golfdefontainebleau.com',
    phone: '01 64 22 22 95',
    coordinates: { lat: 48.4097, lng: 2.6819 },
    facilities: ['Practice', 'Pro Shop', 'Restaurant', 'Bar', 'Location matériel'],
    description: 'Parcours en forêt de Fontainebleau, l\'un des plus anciens de France (1909)',
    rating: 4.7
  },
  {
    id: 'golf-chantilly',
    name: 'Golf de Chantilly',
    city: 'Chantilly',
    region: 'Hauts-de-France',
    postalCode: '60500',
    holes: 36,
    par: 72,
    distance: 6387,
    website: 'https://www.golfdechantilly.com',
    phone: '03 44 57 04 43',
    coordinates: { lat: 49.1894, lng: 2.4886 },
    facilities: ['Practice', 'Pro Shop', 'Restaurant gastronomique', 'Bar', 'Spa', 'Hôtel'],
    description: 'Prestigieux golf royal avec deux parcours 18 trous',
    rating: 4.9
  },
  {
    id: 'golf-morfontaine',
    name: 'Golf de Morfontaine',
    city: 'Mortefontaine',
    region: 'Hauts-de-France',
    postalCode: '60128',
    holes: 18,
    par: 70,
    distance: 6034,
    website: 'https://www.golfdemorfontaine.fr',
    phone: '03 44 54 68 30',
    coordinates: { lat: 49.1233, lng: 2.6050 },
    facilities: ['Practice', 'Pro Shop', 'Restaurant', 'Vestiaires luxe'],
    description: 'L\'un des plus exclusifs et prestigieux golfs de France',
    rating: 5.0
  },
  {
    id: 'golf-saint-germain',
    name: 'Golf de Saint-Germain',
    city: 'Saint-Germain-en-Laye',
    region: 'Île-de-France',
    postalCode: '78100',
    holes: 18,
    par: 71,
    distance: 5868,
    website: 'https://www.golfsaintgermain.fr',
    phone: '01 39 10 30 30',
    coordinates: { lat: 48.9067, lng: 2.0667 },
    facilities: ['Practice couvert', 'Pro Shop', 'Restaurant', 'Bar'],
    description: 'Parcours en forêt avec vues sur la vallée de la Seine',
    rating: 4.5
  },

  // Côte d\'Azur
  {
    id: 'golf-cannes-mougins',
    name: 'Golf de Cannes-Mougins',
    city: 'Mougins',
    region: 'Provence-Alpes-Côte d\'Azur',
    postalCode: '06250',
    holes: 18,
    par: 72,
    distance: 6279,
    website: 'https://www.golfcannes-mougins.com',
    phone: '04 93 75 79 13',
    coordinates: { lat: 43.5847, lng: 6.9664 },
    facilities: ['Practice', 'Pro Shop', 'Restaurant', 'Piscine', 'Tennis'],
    description: 'Parcours avec vue sur les Alpes et la Méditerranée',
    rating: 4.6
  },
  {
    id: 'golf-saint-donat',
    name: 'Golf de Saint-Donat',
    city: 'Grasse',
    region: 'Provence-Alpes-Côte d\'Azur',
    postalCode: '06130',
    holes: 18,
    par: 71,
    distance: 5858,
    website: 'https://www.golfsaintdonat.com',
    phone: '04 93 77 35 60',
    coordinates: { lat: 43.6333, lng: 6.9500 },
    facilities: ['Practice', 'Pro Shop', 'Restaurant panoramique', 'Bar'],
    description: 'Parcours technique avec vue sur la baie de Cannes',
    rating: 4.4
  },
  {
    id: 'golf-monte-carlo',
    name: 'Monte-Carlo Golf Club',
    city: 'La Turbie',
    region: 'Provence-Alpes-Côte d\'Azur',
    postalCode: '06320',
    holes: 18,
    par: 71,
    distance: 5817,
    website: 'https://www.montecarlogolfclub.com',
    phone: '04 92 41 50 70',
    coordinates: { lat: 43.7506, lng: 7.4014 },
    facilities: ['Practice', 'Pro Shop', 'Restaurant', 'Bar', 'Héliport'],
    description: 'Golf exclusif avec vue sur Monaco et la Méditerranée',
    rating: 4.8
  },

  // Nouvelle-Aquitaine
  {
    id: 'golf-biarritz',
    name: 'Golf de Biarritz Le Phare',
    city: 'Biarritz',
    region: 'Nouvelle-Aquitaine',
    postalCode: '64200',
    holes: 18,
    par: 69,
    distance: 5402,
    website: 'https://www.golfbiarritz.com',
    phone: '05 59 03 71 80',
    coordinates: { lat: 43.4872, lng: -1.5556 },
    facilities: ['Practice', 'Pro Shop', 'Restaurant', 'Bar', 'École de golf'],
    description: 'Golf historique avec vue sur l\'océan Atlantique',
    rating: 4.7
  },
  {
    id: 'golf-chiberta',
    name: 'Golf de Chiberta',
    city: 'Anglet',
    region: 'Nouvelle-Aquitaine',
    postalCode: '64600',
    holes: 18,
    par: 72,
    distance: 6149,
    website: 'https://www.golfchiberta.com',
    phone: '05 59 63 83 20',
    coordinates: { lat: 43.5139, lng: -1.5231 },
    facilities: ['Practice', 'Pro Shop', 'Restaurant', 'Bar', 'Piscine'],
    description: 'Parcours links en bord de mer',
    rating: 4.6
  },
  {
    id: 'golf-bordeaux-lac',
    name: 'Golf de Bordeaux-Lac',
    city: 'Bordeaux',
    region: 'Nouvelle-Aquitaine',
    postalCode: '33300',
    holes: 18,
    par: 72,
    distance: 6187,
    website: 'https://www.golfbordeauxlac.com',
    phone: '05 56 50 92 72',
    coordinates: { lat: 44.8833, lng: -0.5667 },
    facilities: ['Practice', 'Pro Shop', 'Restaurant', 'Bar'],
    description: 'Parcours moderne près du centre de Bordeaux',
    rating: 4.3
  },

  // Bretagne
  {
    id: 'golf-dinard',
    name: 'Golf de Dinard',
    city: 'Saint-Briac-sur-Mer',
    region: 'Bretagne',
    postalCode: '35800',
    holes: 18,
    par: 72,
    distance: 6055,
    website: 'https://www.golfdedinard.com',
    phone: '02 99 88 32 07',
    coordinates: { lat: 48.6242, lng: -2.1369 },
    facilities: ['Practice', 'Pro Shop', 'Restaurant', 'Bar'],
    description: 'Links historique créé en 1887, le deuxième plus ancien de France',
    rating: 4.7
  },
  {
    id: 'golf-rennes',
    name: 'Golf de Rennes',
    city: 'Saint-Jacques-de-la-Lande',
    region: 'Bretagne',
    postalCode: '35136',
    holes: 27,
    par: 72,
    distance: 6235,
    website: 'https://www.golfderennes.com',
    phone: '02 99 64 24 48',
    coordinates: { lat: 48.0833, lng: -1.6833 },
    facilities: ['Practice', 'Pro Shop', 'Restaurant', 'Bar', 'Salle de séminaire'],
    description: 'Trois parcours 9 trous permettant 3 combinaisons 18 trous',
    rating: 4.5
  },

  // Rhône-Alpes
  {
    id: 'golf-evian',
    name: 'Evian Resort Golf Club',
    city: 'Évian-les-Bains',
    region: 'Auvergne-Rhône-Alpes',
    postalCode: '74500',
    holes: 18,
    par: 72,
    distance: 6115,
    website: 'https://www.evianresort.com',
    phone: '04 50 26 85 00',
    coordinates: { lat: 46.3833, lng: 6.5833 },
    facilities: ['Practice', 'Pro Shop', 'Restaurant', 'Spa', 'Hôtel 5 étoiles'],
    description: 'Parcours de l\'Evian Championship avec vue sur le lac Léman',
    rating: 4.9
  },
  {
    id: 'golf-lyon-salvagny',
    name: 'Golf de Lyon Salvagny',
    city: 'La Tour-de-Salvagny',
    region: 'Auvergne-Rhône-Alpes',
    postalCode: '69890',
    holes: 18,
    par: 72,
    distance: 6317,
    website: 'https://www.golflyonsalvagny.com',
    phone: '04 78 48 49 50',
    coordinates: { lat: 45.8167, lng: 4.7167 },
    facilities: ['Practice', 'Pro Shop', 'Restaurant', 'Bar'],
    description: 'Parcours vallonné dans les Monts du Lyonnais',
    rating: 4.4
  },
  {
    id: 'golf-divonne',
    name: 'Golf de Divonne',
    city: 'Divonne-les-Bains',
    region: 'Auvergne-Rhône-Alpes',
    postalCode: '01220',
    holes: 18,
    par: 72,
    distance: 6035,
    website: 'https://www.golfdivonne.com',
    phone: '04 50 40 34 11',
    coordinates: { lat: 46.3572, lng: 6.1425 },
    facilities: ['Practice', 'Pro Shop', 'Restaurant', 'Bar', 'Casino'],
    description: 'Parcours avec vue sur le Mont-Blanc',
    rating: 4.6
  },

  // Normandie
  {
    id: 'golf-deauville',
    name: 'Golf Barrière Deauville',
    city: 'Deauville',
    region: 'Normandie',
    postalCode: '14800',
    holes: 27,
    par: 72,
    distance: 6112,
    website: 'https://www.golfdeauville.com',
    phone: '02 31 14 24 24',
    coordinates: { lat: 49.3583, lng: 0.0750 },
    facilities: ['Practice', 'Pro Shop', 'Restaurant', 'Bar', 'Hôtel Barrière'],
    description: 'Trois parcours 9 trous près de la plage de Deauville',
    rating: 4.7
  },
  {
    id: 'golf-etretat',
    name: 'Golf d\'Étretat',
    city: 'Étretat',
    region: 'Normandie',
    postalCode: '76790',
    holes: 18,
    par: 72,
    distance: 6005,
    website: 'https://www.golfetretat.com',
    phone: '02 35 27 04 89',
    coordinates: { lat: 49.7072, lng: 0.2042 },
    facilities: ['Practice', 'Pro Shop', 'Restaurant', 'Bar'],
    description: 'Parcours spectaculaire sur les falaises d\'Étretat',
    rating: 4.8
  },
  {
    id: 'golf-omaha-beach',
    name: 'Omaha Beach Golf Club',
    city: 'Port-en-Bessin',
    region: 'Normandie',
    postalCode: '14520',
    holes: 36,
    par: 72,
    distance: 6214,
    website: 'https://www.golfparcours.com',
    phone: '02 31 22 12 12',
    coordinates: { lat: 49.3486, lng: -0.8922 },
    facilities: ['Practice', 'Pro Shop', 'Restaurant', 'Bar', 'Musée'],
    description: 'Deux parcours 18 trous sur les plages du débarquement',
    rating: 4.7
  },
  {
    id: 'golf-caen-la-mer',
    name: 'Golf de Caen la Mer',
    city: 'Bénouville',
    region: 'Normandie',
    postalCode: '14970',
    holes: 18,
    par: 72,
    distance: 5892,
    website: 'https://www.golfcaen.com',
    phone: '02 31 44 79 09',
    coordinates: { lat: 49.2439, lng: -0.2772 },
    facilities: ['Practice', 'Pro Shop', 'Restaurant', 'Bar'],
    description: 'Parcours technique à 10 minutes de Caen',
    rating: 4.3
  },
  {
    id: 'golf-cabourg',
    name: 'Golf de Cabourg le Home',
    city: 'Cabourg',
    region: 'Normandie',
    postalCode: '14390',
    holes: 18,
    par: 72,
    distance: 6021,
    website: 'https://www.golfcabourg.com',
    phone: '02 31 91 25 56',
    coordinates: { lat: 49.2833, lng: -0.1167 },
    facilities: ['Practice', 'Pro Shop', 'Restaurant', 'Bar', 'Hôtel'],
    description: 'Parcours boisé en bord de mer',
    rating: 4.5
  },
  {
    id: 'golf-saint-julien',
    name: 'Golf de Saint-Julien',
    city: 'Saint-Julien-sur-Calonne',
    region: 'Normandie',
    postalCode: '14130',
    holes: 18,
    par: 71,
    distance: 5715,
    website: 'https://www.golfsaintjulien.com',
    phone: '02 31 64 30 30',
    coordinates: { lat: 49.2667, lng: 0.2167 },
    facilities: ['Practice', 'Pro Shop', 'Restaurant'],
    description: 'Golf vallonné dans le Pays d\'Auge',
    rating: 4.2
  },
  {
    id: 'golf-clecy',
    name: 'Golf de Clécy',
    city: 'Clécy',
    region: 'Normandie',
    postalCode: '14570',
    holes: 9,
    par: 72,
    distance: 5850,
    website: 'https://www.golfclecy.com',
    phone: '02 31 69 72 72',
    coordinates: { lat: 48.9167, lng: -0.4833 },
    facilities: ['Practice', 'Pro Shop', 'Bar'],
    description: 'Golf 9 trous au cœur de la Suisse Normande',
    rating: 4.0
  },

  // Val de Loire
  {
    id: 'golf-limere',
    name: 'Golf International de la Limère',
    city: 'Ardon',
    region: 'Centre-Val de Loire',
    postalCode: '45160',
    holes: 18,
    par: 72,
    distance: 6384,
    website: 'https://www.limere.fr',
    phone: '02 38 45 90 09',
    coordinates: { lat: 47.7833, lng: 1.8833 },
    facilities: ['Practice', 'Pro Shop', 'Restaurant', 'Bar', 'Hôtel'],
    description: 'Parcours de championnat dans la vallée de la Loire',
    rating: 4.5
  },
  {
    id: 'golf-tours-ardree',
    name: 'Golf de Tours Ardrée',
    city: 'Saint-Antoine-du-Rocher',
    region: 'Centre-Val de Loire',
    postalCode: '37360',
    holes: 18,
    par: 72,
    distance: 6211,
    website: 'https://www.golftoursardree.com',
    phone: '02 47 56 77 38',
    coordinates: { lat: 47.4967, lng: 0.6317 },
    facilities: ['Practice', 'Pro Shop', 'Restaurant', 'Bar'],
    description: 'Parcours dessiné par Jean Garaialde',
    rating: 4.4
  },

  // Alsace
  {
    id: 'golf-alsace',
    name: 'Golf d\'Alsace',
    city: 'Rouffach',
    region: 'Grand Est',
    postalCode: '68250',
    holes: 18,
    par: 72,
    distance: 6159,
    website: 'https://www.golf-alsace.com',
    phone: '03 89 78 52 21',
    coordinates: { lat: 47.9569, lng: 7.2986 },
    facilities: ['Practice', 'Pro Shop', 'Restaurant', 'Bar', 'Spa'],
    description: 'Parcours au pied des Vosges avec vue sur la plaine d\'Alsace',
    rating: 4.5
  },
  {
    id: 'golf-strasbourg',
    name: 'Golf de Strasbourg Illkirch',
    city: 'Illkirch-Graffenstaden',
    region: 'Grand Est',
    postalCode: '67400',
    holes: 18,
    par: 72,
    distance: 6205,
    website: 'https://www.golf-strasbourg.com',
    phone: '03 88 66 17 22',
    coordinates: { lat: 48.5297, lng: 7.7206 },
    facilities: ['Practice', 'Pro Shop', 'Restaurant', 'Bar'],
    description: 'Parcours en forêt près de Strasbourg',
    rating: 4.3
  }
]

// Fonction utilitaire pour obtenir les golfs par région
export function getGolfCoursesByRegion(region: string): GolfCourse[] {
  return golfCourses.filter(course => course.region === region)
}

// Fonction utilitaire pour obtenir les golfs par ville
export function getGolfCoursesByCity(city: string): GolfCourse[] {
  return golfCourses.filter(course => course.city.toLowerCase().includes(city.toLowerCase()))
}

// Fonction utilitaire pour obtenir un golf par ID
export function getGolfCourseById(id: string): GolfCourse | undefined {
  return golfCourses.find(course => course.id === id)
}

// Fonction pour obtenir les régions uniques
export function getUniqueRegions(): string[] {
  return [...new Set(golfCourses.map(course => course.region))].sort()
}

// Fonction pour obtenir les villes uniques
export function getUniqueCities(): string[] {
  return [...new Set(golfCourses.map(course => course.city))].sort()
}