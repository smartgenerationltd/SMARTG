import { CulturalDish, KinyarwandaPhrase } from '../types';

export const CULTURAL_DISHES: CulturalDish[] = [
  {
    name: 'Brochettes & Ibirayi',
    kinyarwandaName: 'Ibihaza n’Ibirayi bikaranze',
    description: 'Tender skewers of marinated goat, beef, or Lake Kivu sambaza/tilapia fish, charcoal grilled and served with seasoned fried potato wedges (Ibirayi).',
    ingredients: ['Goat / Beef / Lake Kivu Fish', 'Pili Pili chili', 'Garlic & ginger', 'Red onions', 'Potatoes'],
    howItsEnjoyed: 'The quintessential Rwandan social meal! Typically enjoyed in lively neighborhood bars with a cold Skol or Virunga beer.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    whereToTry: 'Repub Lounge, Meze Fresh, or any local sports bar in Nyamirambo and Kimihurura.'
  },
  {
    name: 'Isombe',
    kinyarwandaName: 'Isombe y’imyumbati',
    description: 'A beloved traditional green delicacy prepared from pounded cassava leaves slowly stewed with salted fish, beef stock, peanut butter, and spring onions.',
    ingredients: ['Pounded cassava leaves', 'Peanut paste', 'Dry fish / smoked meat', 'Leeks', 'Eggplants'],
    howItsEnjoyed: 'Traditionally served atop steaming white rice, boiled green bananas (Amatooke), or sweet potatoes during family gatherings.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    whereToTry: 'Heaven Restaurant, Hotel des Mille Collines, or local buffet restaurants in Kigali.'
  },
  {
    name: 'Akabenz',
    kinyarwandaName: 'Akabenz kokeje',
    description: 'Crisp, roasted and spiced dry-fried pork cuts simmered with caramelised onions, aromatic herbs, and fiery scotch bonnet chili peppers.',
    ingredients: ['Prime pork belly/ribs', 'Fresh chili', 'Ginger & garlic', 'Caramelized red onions'],
    howItsEnjoyed: 'A famous Kigali weekend specialty. Folklore says it was named after Mercedes-Benz because both are top luxury!',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    whereToTry: 'Remera and Nyamirambo local barbecue bistros.'
  },
  {
    name: 'Ibihaza (Pumpkin & Beans Stew)',
    kinyarwandaName: 'Ibihaza n’Ibishyimbo',
    description: 'A comforting, hearty vegetarian stew of tender sweet pumpkin chunks slow-simmered with red kidney beans, tomatoes, and traditional herbs.',
    ingredients: ['Fresh yellow pumpkin', 'Red kidney beans', 'Tomatoes', 'Onions', 'Coriander'],
    howItsEnjoyed: 'Very nutritious, earthy, and staple across rural and urban Rwandan households.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
    whereToTry: 'Traditional buffet luncheons across Kigali.'
  },
  {
    name: 'Ugali & Dodo',
    kinyarwandaName: 'Ubugari bw’ibigori n’imboga',
    description: 'Stiff, dense porridge made from white cornmeal (or cassava flour), served alongside sautéed local wild amaranth greens (Dodo).',
    ingredients: ['Cornmeal / Cassava flour', 'Amaranth greens (Dodo)', 'Onions', 'Garlic', 'Palm oil'],
    howItsEnjoyed: 'Pinch off a small portion with your right hand, roll into a ball, and dip into fragrant stews.',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80',
    whereToTry: 'Available across all authentic Rwandan family-style restaurants.'
  },
  {
    name: 'Ikivuguto & Urwagwa',
    kinyarwandaName: 'Ikivuguto cy’amata & Urwagwa rw’ibitoki',
    description: 'Ikivuguto is traditional rich fermented whole milk (similar to kefir); Urwagwa is traditional artisanal fermented banana wine.',
    ingredients: ['Fresh unpasteurized dairy / Ripe sweet bananas', 'Sorghum flour fermentation agent'],
    howItsEnjoyed: 'Ikivuguto is enjoyed chilled as a nutritious drink; Urwagwa is shared in ceremonies and social celebrations.',
    image: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=800&q=80',
    whereToTry: 'Milk bars (Amata Meza) across Nyamirambo, and cultural villages in Musanze and Nyanza.'
  }
];

export const KINYARWANDA_PHRASES: KinyarwandaPhrase[] = [
  {
    phrase: 'Hello / Greetings',
    kinyarwanda: 'Muraho',
    pronunciation: 'Moo-RAH-hoh',
    context: 'Standard, polite greeting used anytime of day.',
    audioKey: 'muraho'
  },
  {
    phrase: 'How are you?',
    kinyarwanda: 'Amakuru?',
    pronunciation: 'Ah-mah-KOO-roo',
    context: 'Literally means "What is the news?". Respond with "Ni meza" (It is good).',
    audioKey: 'amakuru'
  },
  {
    phrase: 'I am good / All is well',
    kinyarwanda: 'Ni meza',
    pronunciation: 'Nee MAY-zah',
    context: 'The classic friendly reply to "Amakuru?".',
    audioKey: 'nimeza'
  },
  {
    phrase: 'Thank you very much',
    kinyarwanda: 'Murakoze cyane',
    pronunciation: 'Moo-rah-KOH-zay CHYAH-nay',
    context: 'Shows deep appreciation for hospitality, food, or service.',
    audioKey: 'murakoze'
  },
  {
    phrase: 'Goodbye (to person staying)',
    kinyarwanda: 'Mwirirwe / Mubeho',
    pronunciation: 'Mwee-REER-way / Moo-BAY-hoh',
    context: 'Polite farewell used in the afternoon/evening.',
    audioKey: 'mwirirwe'
  },
  {
    phrase: 'Please / Excuse me',
    kinyarwanda: 'Nyamuneka',
    pronunciation: 'Nyah-moo-NAY-kah',
    context: 'Courteous word when asking for assistance or passing by.',
    audioKey: 'nyamuneka'
  },
  {
    phrase: 'How much is this?',
    kinyarwanda: 'Ni angahe?',
    pronunciation: 'Nee ahn-GAH-hay',
    context: 'Essential phrase for shopping in Kimironko market and craft shops.',
    audioKey: 'niangahe'
  },
  {
    phrase: 'Where is...?',
    kinyarwanda: 'Aho ... biri he?',
    pronunciation: 'Ah-hoh ... BEE-ree hay',
    context: 'Useful for asking directions on foot or with moto drivers.',
    audioKey: 'birihe'
  },
  {
    phrase: 'I want / I would like',
    kinyarwanda: 'Ndashaka',
    pronunciation: 'N-dah-SHAH-kah',
    context: 'Used when ordering food, water ("Amazi"), or transport.',
    audioKey: 'ndashaka'
  },
  {
    phrase: 'Water',
    kinyarwanda: 'Amazi',
    pronunciation: 'Ah-MAH-zee',
    context: 'Ask for "Amazi akonje" for cold bottled water.',
    audioKey: 'amazi'
  },
  {
    phrase: 'Welcome!',
    kinyarwanda: 'Murakaza neza',
    pronunciation: 'Moo-rah-KAH-zah NAY-zah',
    context: 'Heard frequently when arriving in hotels, cafes, and airports.',
    audioKey: 'murakazaneza'
  },
  {
    phrase: 'Help me please',
    kinyarwanda: 'Mfashe nyamuneka',
    pronunciation: 'M-FAH-shay nyah-moo-NAY-kah',
    context: 'For assistance in urgent or confusing situations.',
    audioKey: 'mfashe'
  }
];

export const RWANDA_CULTURE_TOPICS = [
  {
    title: 'Umuganda (Community Service)',
    subtitle: 'The Spirit of Unity and Cleanliness',
    description: 'On the last Saturday of every month from 08:00 to 11:00 AM, citizens across Rwanda come together to clean streets, build public infrastructure, and plant trees. This is why Kigali is recognized as Africa’s cleanest city.',
    travelerTip: 'Commercial activities pause until midday during Umuganda. Tourists are warmly welcomed to observe or join their hotel/host community!'
  },
  {
    title: 'Intore & Traditional Dance',
    subtitle: 'Dance of the Heroes & Sacred Drummers',
    description: 'Intore was historically performed by the royal warriors. Today, dancers wear grass headdresses mimicking the lion’s mane and leap rhythmically to the thunderous pulse of Ingoma drums and praise horns.',
    travelerTip: 'Catch world-class live Intore performances at Inema Arts on Thursdays, the Ethnographic Museum in Huye, or cultural centers in Musanze.'
  },
  {
    title: 'Agaseke (Peace Baskets)',
    subtitle: 'Symbol of Hope and Reconciliation',
    description: 'Delicately handwoven from natural sisal and sweetgrass with iconic zig-zag patterns, Agaseke baskets are given to celebrate marriages and peace. They are featured on the Rwandan national coat of arms.',
    travelerTip: 'Purchase authentic fair-trade Agaseke at Nyamirambo Women’s Center or Gahaya Gifted Hands.'
  },
  {
    title: 'Kwita Izina (Gorilla Naming Ceremony)',
    subtitle: 'Global Conservation Celebration',
    description: 'An annual September celebration where baby mountain gorillas born during the year are named by international dignitaries, conservationists, and local heroes in Kinigi, Musanze.',
    travelerTip: 'Attracts thousands of visitors worldwide with music, exhibitions, and gala concerts.'
  }
];
