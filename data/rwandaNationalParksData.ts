export interface NationalParkGuide {
  id: string;
  name: string;
  tagline: string;
  size: string;
  ecosystem: string;
  altitude: string;
  image: string;
  keyWildlife: string[];
  signatureActivities: {
    name: string;
    description: string;
    permitPriceGuide: string;
  }[];
  bestSeasons: string;
  howToGetThere: string;
  travelGuidance: string[];
  responsibleTourism: string;
}

export const RWANDA_NATIONAL_PARKS: NationalParkGuide[] = [
  {
    id: 'volcanoes',
    name: 'Volcanoes National Park (Parc National des Volcans)',
    tagline: 'In the Heart of the Virungas — Sanctuary of the Mountain Gorillas',
    size: '160 sq km (62 sq mi)',
    ecosystem: 'Bamboo forest, afro-alpine moorland, and volcanic peaks',
    altitude: '2,400 m to 4,507 m (Mount Karisimbi summit)',
    image: 'https://images.unsplash.com/photo-1574063413132-355dbfd83e20?auto=format&fit=crop&w=1200&q=80',
    keyWildlife: [
      'Mountain Gorillas (Gorilla beringei beringei)',
      'Golden Monkeys (Cercopithecus kandti)',
      'Black-fronted Duikers',
      'Bushbucks',
      'Over 200 species of birds (17 Albertine Rift endemics)'
    ],
    signatureActivities: [
      {
        name: 'Mountain Gorilla Trekking',
        description: 'Spend an unforgettable 1 hour in the presence of a habituated wild gorilla family guided by RDB rangers.',
        permitPriceGuide: '$1,500 USD per person (standard international tariff via RDB)'
      },
      {
        name: 'Golden Monkey Tracking',
        description: 'Vibrant, fast-paced encounter tracking playful endangered golden monkeys leaping through bamboo canopies.',
        permitPriceGuide: '$100 USD per person'
      },
      {
        name: 'Mount Bisoke Crater Lake Hike',
        description: 'A 6-hour round-trip climb through lush vegetation leading to a breathtaking emerald crater lake at 3,711 meters.',
        permitPriceGuide: '$75 USD per person'
      },
      {
        name: 'Dian Fossey Karisoke Tomb Pilgrimage',
        description: 'Trek to the historic research station and burial site of legendary primatologist Dian Fossey and digit the gorilla.',
        permitPriceGuide: '$75 USD per person'
      },
      {
        name: 'Musanze Caves Exploration',
        description: 'Walk through 2 km of underground lava tube caves formed millions of years ago with illuminated walkways.',
        permitPriceGuide: '$50 USD per person'
      }
    ],
    bestSeasons: 'June to September and December to February (dry months offer easier trail traction; however gorilla permits are available all year).',
    howToGetThere: 'Approximately 2 hours (110 km) on a smooth paved highway from Kigali through scenic rolling hills to Musanze/Kinigi.',
    travelGuidance: [
      'Book gorilla permits several months in advance through an accredited tour operator or Irembo/RDB portal.',
      'Hire a local porter at Kinigi headquarters ($10 - $15 USD) — this supports the surrounding community and makes steep climbs effortless.',
      'Pack waterproof hiking trousers, garden gloves for stinging nettles, and ankle gaiters.'
    ],
    responsibleTourism: '10% of all park revenue is directly invested into local community infrastructure (schools, clean water, and health clinics) around the park perimeter.'
  },
  {
    id: 'akagera',
    name: 'Akagera National Park',
    tagline: 'Savanna Wildlife Wonderland & Central Africa’s Largest Wetland',
    size: '1,122 sq km (433 sq mi)',
    ecosystem: 'Acacia woodland, open savanna grasslands, papyrus swamps, and a chain of 10 scenic lakes',
    altitude: '1,250 m to 1,825 m',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    keyWildlife: [
      'Lions (reintroduced and flourishing)',
      'Black & White Rhinos',
      'African Bush Elephants',
      'Leopards',
      'Cape Buffaloes',
      'Giraffes, Zebras, Topis, Elands',
      'Hippos & Nile Crocodiles in Lake Ihema',
      'Shoebill Stork and 480+ bird species'
    ],
    signatureActivities: [
      {
        name: 'Big Five Game Drive (Day & Night)',
        description: 'Self-drive or guided 4x4 safari across southern and northern plains encountering predators and large herds.',
        permitPriceGuide: 'Park entry $100/day; Guided night drive ~$40'
      },
      {
        name: 'Lake Ihema Boat Safari',
        description: 'Cruise past massive pods of hippos, basking crocodiles, and water birds along the papyrus fringe.',
        permitPriceGuide: '$35 - $45 USD per person'
      },
      {
        name: 'Behind the Scenes & Community Ranger Tour',
        description: 'Visit park headquarters, anti-poaching canine units, and conservation command centers.',
        permitPriceGuide: '$25 USD per person'
      }
    ],
    bestSeasons: 'June to October (dry season where animals gather around water sources) and January to February.',
    howToGetThere: 'About 2.5 to 3 hours drive (130 km) east of Kigali through Rwamagana and Kayonza.',
    travelGuidance: [
      'Enter via the South Gate (near park HQ) and exit through the North Gate for an all-day game drive traverse.',
      'A 4WD safari vehicle with high clearance is strongly recommended during or right after rain.',
      'Accommodations range from luxury Ruzizi Tented Lodge and Magashi Camp to Karenge Bush Camp and scenic public campsites.'
    ],
    responsibleTourism: 'Managed via a successful public-private partnership with African Parks, Akagera is 100% self-funding with zero poaching in recent years.'
  },
  {
    id: 'nyungwe',
    name: 'Nyungwe National Park (UNESCO World Heritage)',
    tagline: 'Ancient Afro-Montane Rainforest, Chimpanzees & Canopy Walks',
    size: '1,019 sq km (393 sq mi)',
    ecosystem: 'Pristine primary rainforest, bogs, bamboo groves, and cloud forest',
    altitude: '1,600 m to 2,950 m (Mount Bigugu peak)',
    image: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1200&q=80',
    keyWildlife: [
      'Eastern Chimpanzees (Pan troglodytes schweinfurthii)',
      'Angolan Colobus Monkeys (super-troops up to 400 individuals)',
      'L’Hoest’s Monkeys',
      '322 bird species including Great Blue Turaco',
      'Over 1,000 plant and 140 orchid species'
    ],
    signatureActivities: [
      {
        name: 'Canopy Walkway Suspension Bridge',
        description: 'Trek across three suspension bridges 70 meters (230 ft) above the forest floor with panoramic bird’s-eye vistas.',
        permitPriceGuide: '$40 USD per person'
      },
      {
        name: 'Chimpanzee Tracking (Cyamudongo & Uwinka)',
        description: 'Early morning hike guided by expert trackers to observe habituated chimps swinging through the high canopy.',
        permitPriceGuide: '$150 USD per person'
      },
      {
        name: 'Kamiranzovu Waterfall & Swamp Trail',
        description: 'Hike through prehistoric giant ferns to a roaring multi-tiered waterfall in a dramatic ravine.',
        permitPriceGuide: '$40 - $50 USD per person'
      },
      {
        name: 'Gisakura Tea Estate Tour',
        description: 'Tour emerald green tea plantations bordering the forest edge and learn traditional plucking and processing.',
        permitPriceGuide: '$15 - $20 USD per person'
      }
    ],
    bestSeasons: 'Canopy walks and trails operate rain or shine year-round; dry months (July-August, Dec-Jan) offer slightly less muddy paths.',
    howToGetThere: '4.5 to 5 hours drive southwest from Kigali via Huye, or a 45-minute scenic domestic flight to Kamembe (Rusizi).',
    travelGuidance: [
      'Bring rain gear, warm fleeces (nights can drop to 12°C/54°F), and sturdy hiking boots.',
      'Cyamudongo chimp treks depart as early as 04:30 AM from Gisakura or Uwinka visitor centers.'
    ],
    responsibleTourism: 'Inscribed as a UNESCO World Heritage site in 2023 for its globally irreplaceable biodiversity and vital water catchment role for the Nile and Congo basins.'
  },
  {
    id: 'gishwati',
    name: 'Gishwati-Mukura National Park',
    tagline: 'Rwanda’s Cloud Forest Restoration Miracle',
    size: '34 sq km (13 sq mi)',
    ecosystem: 'Montane rainforest corridor bridging Volcanoes and Nyungwe ecosystems',
    altitude: '2,000 m to 3,000 m',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
    keyWildlife: [
      'Chimpanzees',
      'Golden Monkeys',
      'Blue Monkeys',
      '232 recorded bird species including Ruwenzori Batis and Regal Sunbird'
    ],
    signatureActivities: [
      {
        name: 'Intimate Primate & Nature Walk',
        description: 'Small group guided hikes through restored indigenous forest with resident naturalists.',
        permitPriceGuide: '$40 USD per person'
      },
      {
        name: 'Bird Watching & Orchid Walk',
        description: 'Explore rare high-altitude Albertine Rift endemic bird habitats and wild forest orchids.',
        permitPriceGuide: '$30 USD per person'
      }
    ],
    bestSeasons: 'December to February and June to August.',
    howToGetThere: 'Located in Rutsiro/Ngororero districts, about 2.5 hours northwest of Kigali or 40 minutes from Rubavu/Lake Kivu.',
    travelGuidance: [
      'Ideal for travelers who prefer tranquil, zero-crowd wilderness immersion and eco-lodging.',
      'Gishwati Lodge offers an intimate luxury base located directly within the reserve buffer zone.'
    ],
    responsibleTourism: 'A shining beacon of landscape restoration that turned previously degraded pastures back into a flourishing national park.'
  }
];
