import { FiveStarHotel } from '../types';

export const ORGANIZATION_BOOKING_CONTACT = {
  whatsappNumber: '+250781121179',
  whatsappRaw: '250781121179',
  email: 'giniyomugabo@gmail.com',
  companyName: 'Rwanda Travel & Luxury Concierge',
  availableHours: '24/7 VIP Concierge Support',
};

export function createHotelWhatsAppUrl(params: {
  hotelName: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number | string;
  roomType?: string;
  specialRequests?: string;
}): string {
  const { hotelName, checkIn, checkOut, guests = 2, roomType = 'Luxury Suite', specialRequests } = params;
  
  let text = `Hello Rwanda AI Concierge, I would like to book a stay at *${hotelName}*.\n\n`;
  if (checkIn) text += `📅 *Check-in:* ${checkIn}\n`;
  if (checkOut) text += `📅 *Check-out:* ${checkOut}\n`;
  text += `👥 *Guests:* ${guests}\n`;
  text += `🛏️ *Preferred Room:* ${roomType}\n`;
  if (specialRequests) text += `✨ *Special Requests:* ${specialRequests}\n`;
  text += `\nPlease check availability, current 5-star best rates, and confirm reservation procedures. Thank you!`;

  return `https://wa.me/${ORGANIZATION_BOOKING_CONTACT.whatsappRaw}?text=${encodeURIComponent(text)}`;
}

export function createHotelEmailUrl(params: {
  hotelName: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number | string;
  roomType?: string;
  specialRequests?: string;
}): string {
  const { hotelName, checkIn, checkOut, guests = 2, roomType = 'Luxury Suite', specialRequests } = params;
  
  const subject = `Booking Inquiry & Reservation: ${hotelName}`;
  let body = `Dear Rwanda Travel Concierge Team,\n\n`;
  body += `I would like to make a 5-Star hotel booking reservation for ${hotelName}.\n\n`;
  body += `Booking Details:\n`;
  body += `- Hotel: ${hotelName}\n`;
  if (checkIn) body += `- Check-in Date: ${checkIn}\n`;
  if (checkOut) body += `- Check-out Date: ${checkOut}\n`;
  body += `- Number of Guests: ${guests}\n`;
  body += `- Room Preference: ${roomType}\n`;
  if (specialRequests) body += `- Special Requests / Transfers: ${specialRequests}\n`;
  body += `\nPlease kindly provide availability, tailored rates, and payment/confirmation details.\n\n`;
  body += `Best regards,\n`;

  return `mailto:${ORGANIZATION_BOOKING_CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const FIVE_STAR_HOTELS: FiveStarHotel[] = [
  // ==================== KIGALI CITY (CAPITAL LUXURY) ====================
  {
    id: 'radisson-blu-kigali',
    name: 'Radisson Blu Hotel & Convention Centre',
    stars: 5,
    region: 'Kigali',
    location: 'KG 2 Roundabout, Kimihurura, Kigali',
    lat: -1.9535,
    lng: 30.0938,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80'
    ],
    priceRange: '$280 - $750 / night',
    pricePerNightUSD: 280,
    tagline: 'Iconic dome architecture and premier international luxury convention destination.',
    description: 'Adjacent to the landmark illuminated Kigali Convention Centre dome, Radisson Blu offers 292 upscale rooms and suites, multiple world-class restaurants, an outdoor swimming pool, tennis court, and full-service Amani Spa.',
    highlights: [
      'Adjacent to the iconic illuminated Kigali Convention Dome',
      'Larder Italian Restaurant & Filini fine dining',
      'Extensive heated outdoor pool & lush tropical gardens',
      'Full-service luxury spa and 24-hour wellness center'
    ],
    amenities: [
      'Outdoor Heated Pool',
      'Fine Dining Restaurants',
      'Amani Luxury Spa',
      'Tennis Courts',
      '24/7 Room Service',
      'Airport VIP Shuttle',
      'High-Speed Wi-Fi',
      'Executive Lounge',
      'Fitness Center'
    ],
    roomTypes: [
      'Standard Premium King Room',
      'Executive Suite with Dome View',
      'Diplomatic Suite',
      'Presidential Suite'
    ],
    recommendedFor: ['Business Executives', 'Conference Delegates', 'Luxury Couples', 'VIP Travelers'],
    contactPhone: '+250 252 252 252',
    contactEmail: 'info.kigali@radissonblu.com'
  },
  {
    id: 'kigali-serena-hotel',
    name: 'Kigali Serena Hotel',
    stars: 5,
    region: 'Kigali',
    location: 'KN 3 Ave, Central Business District, Kigali',
    lat: -1.9538,
    lng: 30.0605,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'
    ],
    priceRange: '$320 - $850 / night',
    pricePerNightUSD: 320,
    tagline: 'Timeless Rwandan diplomatic elegance with the iconic Maisha Health Club & Spa.',
    description: 'Set on an exclusive boulevard in central Kigali, the 5-star Kigali Serena Hotel blends pan-African artistry with modern luxury. Features a stunning landscaped pool deck, Milima Restaurant overlooking the gardens, and the acclaimed Maisha Spa.',
    highlights: [
      'Prestigous diplomatic address in central Kigali',
      'Acclaimed Maisha Health Club & Spa with steam and sauna',
      'Milima Restaurant offering African fusion & international buffets',
      'Lagoon-style swimming pool surrounded by palm trees'
    ],
    amenities: [
      'Lagoon Pool',
      'Maisha Spa & Health Club',
      'Milima & Sokoni Restaurants',
      'Executive Club Lounge',
      'Concierge Chauffeur Service',
      'Business Center',
      'High-Speed Wi-Fi',
      'Banquet Ballrooms'
    ],
    roomTypes: [
      'Deluxe King Room',
      'Superior Room with Balcony',
      'Executive Suite',
      'State Suite / Presidential'
    ],
    recommendedFor: ['Diplomats', 'Luxury Tourists', 'Family Vacations', 'Business Travelers'],
    contactPhone: '+250 788 184 500',
    contactEmail: 'kigali@serenahotels.com'
  },
  {
    id: 'kigali-marriott-hotel',
    name: 'Kigali Marriott Hotel',
    stars: 5,
    region: 'Kigali',
    location: 'KN 3 Ave, Nyarugenge District, Kigali',
    lat: -1.9515,
    lng: 30.0620,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80'
    ],
    priceRange: '$290 - $790 / night',
    pricePerNightUSD: 290,
    tagline: 'Spacious modern luxury, outdoor resort pool, and Soko restaurant in downtown Kigali.',
    description: 'Boasting panoramic views of Kigali’s rolling hills, Kigali Marriott provides 5-star luxury accommodations with Italian marble bathrooms, Saray Spa, expansive outdoor resort pool, Cucina Italian Restaurant, and Iriba Bar & Terrace.',
    highlights: [
      'Saray Spa offering signature African botanical therapies',
      'Cucina Restaurant serving authentic Italian cuisine & fine wines',
      'Large heated resort pool with private cabanas',
      'M Club Lounge with complimentary breakfast and evening cocktails'
    ],
    amenities: [
      'Resort Pool & Sun Deck',
      'Saray Spa & Steam Rooms',
      'Cucina & Soko Restaurants',
      'M Club VIP Lounge',
      '24/7 Fitness Center',
      'Valet Parking',
      'High-Speed Wi-Fi',
      'Concierge Desk'
    ],
    roomTypes: [
      'Deluxe Guest Room',
      'Executive Room with M Club Access',
      'Junior Suite',
      'Presidential Suite'
    ],
    recommendedFor: ['International Travelers', 'Marriott Bonvoy Members', 'Couples', 'Corporate Guests'],
    contactPhone: '+250 222 111 111',
    contactEmail: 'reservations.kigali@marriott.com'
  },
  {
    id: 'the-retreat-by-heaven',
    name: 'The Retreat by Heaven',
    stars: 5,
    region: 'Kigali',
    location: 'KN 29 St #5, Kiyovu, Kigali',
    lat: -1.9585,
    lng: 30.0645,
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80'
    ],
    priceRange: '$480 - $1,200 / night',
    pricePerNightUSD: 480,
    tagline: 'Kigali’s premier eco-luxury boutique hotel & wellness retreat in upscale Kiyovu.',
    description: 'An eco-friendly 5-star sanctuary featuring 20 bespoke luxury villas with private saltwater plunge pools, custom teak furniture made by Tanzanian artisans, solar power, organic Fusion Restaurant, and open-air yoga decks.',
    highlights: [
      'Private saltwater plunge pool villas with outdoor showers',
      'Fusion Restaurant serving farm-to-table Rwandan gourmet cuisine',
      'Hot tub, cedar wood sauna, and wellness massage pavilion',
      'Quiet, lush green residential haven in historic Kiyovu'
    ],
    amenities: [
      'Private Plunge Pools',
      'Saltwater Main Pool',
      'Farm-to-Table Gourmet Dining',
      'Open-air Yoga & Gym',
      'Cedar Wood Sauna & Spa',
      'Organic Toiletries',
      'Boutique Craft Shop',
      'Airport Luxury Transfer'
    ],
    roomTypes: [
      'Luxury Pool Villa',
      'Master King Suite with Private Garden',
      'Superior King Suite',
      'Family Villa'
    ],
    recommendedFor: ['Honeymooners', 'Wellness Seekers', 'Eco-Luxury Travelers', 'High-Profile Guests'],
    contactPhone: '+250 782 000 001',
    contactEmail: 'theretreat@heavenrwanda.com'
  },
  {
    id: 'four-points-sheraton-kigali',
    name: 'Four Points by Sheraton Kigali',
    stars: 5,
    region: 'Kigali',
    location: 'KN 3 Ave, Nyarugenge, Kigali',
    lat: -1.9520,
    lng: 30.0610,
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80',
    priceRange: '$220 - $550 / night',
    pricePerNightUSD: 220,
    tagline: 'Modern stylish comfort with panoramic city views and lively rooftop lounge.',
    description: 'Centrally situated in the financial district, Four Points offers contemporary upscale rooms, heated rooftop pool, Moksha restaurant serving rich pan-Asian and Indian flavors, and the Best Brews local craft beer program.',
    highlights: [
      'Heated pool with skyline sunset views',
      'Moksha fine pan-Asian & Indian cuisine',
      'Steps away from financial institutions & embassies',
      'State-of-the-art fitness center'
    ],
    amenities: [
      'Rooftop Heated Pool',
      'Moksha Pan-Asian Restaurant',
      'Fitness Studio',
      'Best Brews Bar',
      'High-Speed Wi-Fi',
      '24-Hour In-Room Dining',
      'Airport Shuttle'
    ],
    roomTypes: [
      'Traditional King Room',
      'Executive Suite',
      'Junior Suite with City Panorama'
    ],
    recommendedFor: ['Business Travelers', 'Urban Explorers', 'Solo Luxury Travelers'],
    contactPhone: '+250 788 310 000',
    contactEmail: 'fourpoints.kigali@marriott.com'
  },
  {
    id: 'ubumwe-grande-hotel',
    name: 'Ubumwe Grande Hotel',
    stars: 5,
    region: 'Kigali',
    location: 'KN 67 St, Kigali City Center',
    lat: -1.9480,
    lng: 30.0585,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
    priceRange: '$210 - $480 / night',
    pricePerNightUSD: 210,
    tagline: 'Kigali’s most famous rooftop infinity pool and 360-degree skyline views.',
    description: 'Featuring Kigali’s iconic rooftop infinity pool, Ubumwe Grande delivers contemporary 5-star elegance with stylish rooms, apartments for long stays, rooftop grill, and central convenience for exploring the city.',
    highlights: [
      'Iconic rooftop infinity pool overlooking Kigali’s hills',
      'Rooftop Rendezvous Bar & Grill for sunset cocktails',
      'Fully equipped luxury serviced apartments available',
      'Prime central location near museums and shopping'
    ],
    amenities: [
      'Rooftop Infinity Pool',
      'Rooftop Grill & Bar',
      'Fitness Gym',
      'Conference Facilities',
      'High-Speed Wi-Fi',
      'Underground Secure Parking',
      'Airport Transfers'
    ],
    roomTypes: [
      'Superior Room',
      'Executive King Suite',
      'One-Bedroom Luxury Apartment',
      'Two-Bedroom Penthouse'
    ],
    recommendedFor: ['Couples', 'Long-Stay Executives', 'Sunset Lovers', 'Business Travelers'],
    contactPhone: '+250 788 165 700',
    contactEmail: 'info@ubumwegrandehotel.com'
  },

  // ==================== VOLCANOES NATIONAL PARK / MUSANZE (GORILLA LUXURY) ====================
  {
    id: 'one-and-only-gorillas-nest',
    name: 'One&Only Gorilla’s Nest',
    stars: 5,
    region: 'Volcanoes / Northern',
    location: 'Kinigi, Volcanoes National Park, Musanze',
    lat: -1.4552,
    lng: 29.5398,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80'
    ],
    priceRange: '$1,800 - $4,500 / night (All-Inclusive)',
    pricePerNightUSD: 1800,
    tagline: 'Ultra-luxury sanctuary cushioned in the foothills of the Virunga volcano range.',
    description: 'An extraordinary ultra-luxury resort nestled among towering eucalyptus trees in Kinigi. Private treehouse-style suites suspended in the canopy feature open stone fireplaces, private viewing decks, open-air baths, private butlers, and bespoke gorilla trekking gear.',
    highlights: [
      'Direct gateway to Volcanoes National Park gorilla tracking headquarters',
      'Nest restaurant celebrating local Rwandan volcanic soil ingredients',
      'One&Only Spa featuring holistic treatments with African botanical herbs',
      'Private heated plunge pool and personal villa butler service'
    ],
    amenities: [
      'Private Heated Plunge Pools',
      'All-Inclusive Fine Dining',
      'One&Only Spa & Wellness',
      'Private Helipad for Quick Transfers',
      'Personal Dedicated Butler',
      'Pre-Trek Boot Cleaning & Gear Prep',
      'Open Stone Fireplaces in Suites',
      'Curated Rwandan Coffee Tastings'
    ],
    roomTypes: [
      'Forest King Lodge',
      'Two-Bedroom Virunga Suite',
      'Ingagi Luxury Suite with Plunge Pool',
      'Silverback Presidential Suite'
    ],
    recommendedFor: ['Gorilla Trekking Connoisseurs', 'Ultra-Luxury Travelers', 'Honeymooners', 'Celebrities'],
    contactPhone: '+250 788 389 700',
    contactEmail: 'reservations@oneandonlygorillasnest.com'
  },
  {
    id: 'bisate-lodge-wilderness',
    name: 'Bisate Lodge (Wilderness Safaris)',
    stars: 5,
    region: 'Volcanoes / Northern',
    location: 'Kinigi, Volcanoes National Park, Musanze',
    lat: -1.4599,
    lng: 29.5533,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80'
    ],
    priceRange: '$1,950 - $3,800 / night (All-Inclusive)',
    pricePerNightUSD: 1950,
    tagline: 'World-famous thatched spherical villas perched on an eroded volcanic cone.',
    description: 'Bisate is an award-winning eco-luxury architectural masterpiece by Wilderness Safaris. Only 6 spherical thatched forest villas mimic the King’s Palace, with panoramic floor-to-ceiling views of Bisoke and Karisimbi volcanoes.',
    highlights: [
      'Only 6 ultra-exclusive forest villas with central volcanic fireplaces',
      'Indigenous reforestation program (plant your own tree during stay)',
      'Unobstructed dramatic vistas of Mount Bisoke & Karisimbi',
      'Master sommelier curated wine cellar & private dining'
    ],
    amenities: [
      'Private Heated Forest Villas',
      'Volcanic Fireplaces',
      'Gourmet All-Inclusive Safari Cuisine',
      'Sommelier Wine Cellar',
      'Personal Butler & Trekking Porter',
      'In-Villa Massage Therapies',
      'Helicopter Landing Area',
      'Eco-Conservation Activities'
    ],
    roomTypes: [
      'Luxury Forest Villa (Spherical)',
      'Bisate Kwanda Day Lounge Suite',
      'Exclusive Villa Buyout Option'
    ],
    recommendedFor: ['Bucket-List Travelers', 'Gorilla Trekkers', 'Architectural Enthusiasts', 'Couples'],
    contactPhone: '+250 788 310 990',
    contactEmail: 'enquiry@wildernessdestinations.com'
  },
  {
    id: 'singita-kwitonda-lodge',
    name: 'Singita Kwitonda Lodge & Kataza House',
    stars: 5,
    region: 'Volcanoes / Northern',
    location: 'Kinigi, Volcanoes National Park',
    lat: -1.4670,
    lng: 29.5420,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    priceRange: '$2,100 - $5,000 / night (All-Inclusive)',
    pricePerNightUSD: 2100,
    tagline: 'Ultra-exclusive luxury bordering directly on the national park boundary.',
    description: 'Set on 178 acres right along Volcanoes National Park’s border, Singita Kwitonda features 8 opulent suites and the exclusive 4-bedroom Kataza House. Constructed with volcanic rock, river timber, and featuring private heated plunge pools, fire pits, and on-site conservation nursery.',
    highlights: [
      'Closest luxury lodge to the gorilla tracking boundary',
      'Private heated plunge pools and indoor/outdoor fireplaces',
      'Singita signature farm-to-table cuisine & world-renowned wine list',
      'Dedicated gear room and mud-room for post-gorilla trek relaxation'
    ],
    amenities: [
      'Private Heated Plunge Pools',
      'Indoor & Outdoor Fireplaces',
      'Farm-to-Table Fine Dining',
      'Singita Wine Cellar & Sommelier',
      'Akarabo Conservation Nursery',
      'Private Spa Treatment Rooms',
      'Gear & Boot Cleaning Service',
      'Kataza House Private Staff & Chef'
    ],
    roomTypes: [
      'One-Bedroom Luxury Suite',
      'Two-Bedroom Family Suite',
      'Kataza House (4-Bedroom Exclusive Villa)'
    ],
    recommendedFor: ['VIPs & Dignitaries', 'Gorilla Safari Connoisseurs', 'Family Private Buyouts'],
    contactPhone: '+250 788 111 222',
    contactEmail: 'reservations@singita.com'
  },
  {
    id: 'virunga-lodge-volcanoes-safaris',
    name: 'Virunga Lodge (Volcanoes Safaris)',
    stars: 5,
    region: 'Volcanoes / Northern',
    location: 'Between Lake Bulera & Ruhondo, Musanze',
    lat: -1.4651,
    lng: 29.5215,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    priceRange: '$1,200 - $2,600 / night (All-Inclusive)',
    pricePerNightUSD: 1200,
    tagline: 'Perched high on a ridge with 360-degree views of the Virunga Volcanoes and Twin Lakes.',
    description: 'One of Africa’s most iconic safari lodges, Virunga Lodge offers 10 stone and tile bandas with breathtaking 360-degree vistas of the Virunga Volcanoes and the sparkling Twin Lakes (Ruhondo and Burera). Features Dian Fossey Map Room, spa, and traditional Intore dance performances.',
    highlights: [
      '360-degree panoramic views of Twin Lakes & Virunga Volcanoes',
      '10 luxurious stone bandas named after historic explorers',
      'Complimentary massages at the Ikirunga Spa',
      'Historical Dian Fossey Map Room & library'
    ],
    amenities: [
      'Ikirunga Spa & Saunas',
      'All-Inclusive Meals & Premium Drinks',
      'Personal Dedicated Butler',
      'Scenic Fire Pit Terrace',
      'Intore Dance Cultural Evenings',
      'Private Gorilla Trekking Transport',
      'High-Speed Wi-Fi'
    ],
    roomTypes: [
      'Deluxe Stone Banda',
      'Karisimbi Presidential Banda',
      'Sabyinyo Deluxe Banda'
    ],
    recommendedFor: ['Scenic Photography', 'Gorilla Trekkers', 'Couples', 'History Enthusiasts'],
    contactPhone: '+250 788 300 005',
    contactEmail: 'sales@volcanoessafaris.com'
  },
  {
    id: 'sabyinyo-silverback-lodge',
    name: 'Sabyinyo Silverback Lodge (Governors’ Camp)',
    stars: 5,
    region: 'Volcanoes / Northern',
    location: 'Foothills of Mount Sabyinyo, Musanze',
    lat: -1.4580,
    lng: 29.5480,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80'
    ],
    priceRange: '$1,300 - $2,800 / night (All-Inclusive)',
    pricePerNightUSD: 1300,
    tagline: 'Rwanda’s first community-owned 5-star luxury lodge nestled at the base of Mount Sabyinyo.',
    description: 'Owned by the SACOLA community trust and operated by Governors’ Camp, Sabyinyo Silverback Lodge features stone cottages with terracotta roof tiles, large sitting rooms with fireplaces, and sweeping views of the volcanic peaks. Directly supports local conservation and community schools.',
    highlights: [
      'Direct revenue-sharing model supporting surrounding local villages',
      'Warm stone fireplaces lit each evening in every cottage',
      'Spectacular uninterrupted vistas of Mount Sabyinyo and Mount Gahinga',
      'Gourmet meals and evening sundowners with mountain guides'
    ],
    amenities: [
      'Stone Cottage Fireplaces',
      'Private Verandas',
      'All-Inclusive Fine Dining & Drinks',
      'Community Cultural Tours',
      'Post-Trek Boot Cleaning & Gaiters',
      'High-Speed Wi-Fi',
      'Bar & Library Lounge'
    ],
    roomTypes: [
      'Luxury Stone Cottage',
      'Silverback Suite',
      'Family Cottage with Two En-Suite Bedrooms'
    ],
    recommendedFor: ['Gorilla Trekkers', 'Eco-Conscious Travelers', 'Families', 'Couples'],
    contactPhone: '+250 788 300 001',
    contactEmail: 'info@governorscamp.com'
  },
  {
    id: 'the-bishops-house-rwanda',
    name: 'The Bishop’s House Rwanda',
    stars: 5,
    region: 'Volcanoes / Northern',
    location: 'Musanze Town (25 min to Kinigi)',
    lat: -1.4980,
    lng: 29.6320,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    priceRange: '$750 - $1,500 / night (All-Inclusive)',
    pricePerNightUSD: 750,
    tagline: 'Colonial-style boutique sanctuary with antique furnishings and manicured gardens.',
    description: 'A lavish colonial-era styled boutique manor boasting 9 luxurious rooms, hand-crafted four-poster beds, custom drapery, tranquil swimming pool, and fine dining with a private chef in the heart of Musanze.',
    highlights: [
      'Intimate boutique setting with only 9 opulent suites',
      'Exquisite hand-carved four-poster mahogany beds',
      'Private chauffeur service to Volcanoes National Park park gates',
      'Custom gourmet multi-course culinary experience'
    ],
    amenities: [
      'Swimming Pool & Sun Courtyard',
      'Gourmet Private Dining',
      'Private Park Transfers',
      'Cocktail Bar & Lounge',
      'Spa Massages',
      'High-Speed Wi-Fi'
    ],
    roomTypes: [
      'Luxury Manor Room',
      'Presidential Bishop Suite'
    ],
    recommendedFor: ['Couples', 'Boutique Travelers', 'Gorilla Safaris'],
    contactPhone: '+250 788 388 900',
    contactEmail: 'reservations@tbhrwanda.com'
  },
  {
    id: 'amakoro-songa-lodge',
    name: 'Amakoro Songa Lodge',
    stars: 5,
    region: 'Volcanoes / Northern',
    location: 'Kinigi / Volcanoes Foothills, Musanze',
    lat: -1.4360,
    lng: 29.5850,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    priceRange: '$890 - $1,800 / night (All-Inclusive)',
    pricePerNightUSD: 890,
    tagline: 'Eco-luxury volcanic stone cottages with outdoor hot tubs and traditional Rwandan hearths.',
    description: 'Constructed from local black volcanic rock and rustic timbers, Amakoro Songa Lodge offers bespoke luxury cottages, wood-burning indoor fireplaces, outdoor hot tubs under the stars, traditional herbal foot massages, and garden-to-table gourmet dining.',
    highlights: [
      'Private outdoor heated cedar hot tubs surrounded by bamboo forests',
      'Warm wood-burning fireplaces in every bedroom and bathroom',
      'Garden-to-table organic dining with chef-guided cooking sessions',
      'Complimentary post-gorilla trek boot clean & foot reflexology'
    ],
    amenities: [
      'Outdoor Hot Tubs',
      'Indoor Stone Fireplaces',
      'Organic Farm-to-Table Dining',
      'Foot Reflexology & Spa',
      'Private Verandas',
      'High-Speed Wi-Fi'
    ],
    roomTypes: [
      'Standard Luxury Cottage',
      'Songa Deluxe Suite',
      'Family Volcano Chalet'
    ],
    recommendedFor: ['Couples', 'Eco-Luxury Travelers', 'Gorilla Trekkers'],
    contactPhone: '+250 788 888 777',
    contactEmail: 'info@amakorosonga.com'
  },
  {
    id: 'five-volcanoes-boutique-hotel',
    name: 'Five Volcanoes Boutique Hotel',
    stars: 5,
    region: 'Volcanoes / Northern',
    location: 'Musanze Road, Kinigi',
    lat: -1.4883,
    lng: 29.5912,
    image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80',
    priceRange: '$650 - $1,400 / night (Full Board)',
    pricePerNightUSD: 650,
    tagline: 'Exceptional hospitality, heated pool, and lush volcanic gardens in Kinigi.',
    description: 'Five Volcanoes Boutique Hotel offers 13 deluxe bedrooms, a VIP cottage, a heated swimming pool, traditional sauna, and massage hut just 15 minutes from the national park headquarters. Known for friendly Rwandan staff and cozy fire pits.',
    highlights: [
      'Heated pool surrounded by flowers and volcano views',
      'Traditional sauna & steam room for post-trek revival',
      'Only 15 minutes drive to Gorilla Trekking Briefing Point',
      'Cozy outdoor fire pit for evening drinks'
    ],
    amenities: [
      'Heated Swimming Pool',
      'Traditional Finnish Sauna & Steam',
      'Outdoor Fire Pit',
      'Gourmet Full-Board Restaurant',
      'Free Boot Cleaning',
      'Bar & Lounge',
      'Wi-Fi'
    ],
    roomTypes: [
      'Deluxe Double/Twin Room',
      'Family Suite',
      'VIP Volcanoes Cottage'
    ],
    recommendedFor: ['Families', 'Gorilla Trekkers', 'Comfort Seekers'],
    contactPhone: '+250 788 308 000',
    contactEmail: 'info@fivevolcanoesrwanda.com'
  },

  // ==================== AKAGERA NATIONAL PARK (BIG 5 SAFARI LUXURY) ====================
  {
    id: 'magashi-camp-wilderness',
    name: 'Magashi Camp (Wilderness Safaris)',
    stars: 5,
    region: 'Akagera / Eastern',
    location: 'Lake Rwanyakazinga, Akagera National Park',
    lat: -1.7800,
    lng: 30.7200,
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80'
    ],
    priceRange: '$1,350 - $2,400 / night (All-Inclusive)',
    pricePerNightUSD: 1350,
    tagline: 'Ultra-luxury tented camp in a private exclusive concession on Lake Rwanyakazinga.',
    description: 'Set in Akagera’s remote, wildlife-rich northern sector, Magashi features 6 spacious luxury safari tents overlooking Lake Rwanyakazinga. Enjoy exclusive Big 5 game drives, night drives, swamp boat safaris, and fine dining on the lakeside deck.',
    highlights: [
      'Exclusive private wildlife concession with zero tourist crowds',
      'High concentrations of lions, leopards, rhinos, and elephants',
      'Lakeside plunge pool & panoramic viewing lounge',
      'Night game drives & guided swamp boat cruises'
    ],
    amenities: [
      'Lakeside Plunge Pool',
      'All-Inclusive Gourmet Safari Cuisine',
      'Open Safari 4x4 Game Drives',
      'Boat Safaris on Lake Rwanyakazinga',
      'Private Viewing Decks',
      'Evening Boma Campfire',
      'All Drinks & Fine Wines Included'
    ],
    roomTypes: [
      'Luxury Safari Tented Suite',
      'Exclusive Concession Buyout'
    ],
    recommendedFor: ['Big Five Safari Enthusiasts', 'Birders', 'Luxury Honeymooners', 'Photographers'],
    contactPhone: '+250 788 310 990',
    contactEmail: 'magashi@wildernessdestinations.com'
  },
  {
    id: 'akagera-game-lodge-mantis',
    name: 'Akagera Game Lodge (Mantis Collection)',
    stars: 5,
    region: 'Akagera / Eastern',
    location: 'Southern Sector, Akagera National Park',
    lat: -1.9100,
    lng: 30.6900,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    priceRange: '$350 - $750 / night',
    pricePerNightUSD: 350,
    tagline: 'Perched on a ridge with sweeping vistas over Lake Ihema and the savanna.',
    description: 'Managed by Mantis (Accor), Akagera Game Lodge features 60 contemporary luxury rooms, swimming pool overlooking Lake Ihema, Shoebill Restaurant, tennis court, and immediate access to southern park game loops.',
    highlights: [
      'Elevated ridge views over Lake Ihema and wetlands',
      'Large swimming pool with savanna vistas',
      'Shoebill Restaurant serving international and Rwandan delicacies',
      'Closest lodge to the southern park entrance & Lake Ihema boat dock'
    ],
    amenities: [
      'Swimming Pool with Lake View',
      'Shoebill Fine Restaurant',
      'Elephant Bar & Sundowner Deck',
      'Tennis & Conference Facilities',
      'Safari Game Drive Bookings',
      'High-Speed Wi-Fi',
      '24-Hour Electricity & AC'
    ],
    roomTypes: [
      'Balcony Room with Lake View',
      'Savanna Suite',
      'Family Interconnecting Suite',
      'Presidential Suite'
    ],
    recommendedFor: ['Families', 'Safari Groups', 'Weekend Getaways', 'Accor ALL Members'],
    contactPhone: '+250 788 300 100',
    contactEmail: 'akagera@mantiscollection.com'
  },
  {
    id: 'ruzizi-tented-lodge',
    name: 'Ruzizi Tented Lodge',
    stars: 5,
    region: 'Akagera / Eastern',
    location: 'Lake Ihema Shore, Akagera National Park',
    lat: -1.8900,
    lng: 30.7100,
    image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=80',
    priceRange: '$450 - $950 / night (Full Board)',
    pricePerNightUSD: 450,
    tagline: 'Eco-luxury tented lodge hidden beneath palms along Lake Ihema’s shoreline.',
    description: 'An intimate 20-bed eco-luxury tented lodge connected by wooden boardwalks under palms and fig trees on Lake Ihema. Solar-powered, each luxury tent features handcrafted queen beds and private deck over the water.',
    highlights: [
      'Hippos and crocodiles visible right from the dining deck',
      'Boardwalks meandering through towering palms',
      '100% solar powered sustainable eco-luxury',
      'Profits reinvested directly into Akagera conservation'
    ],
    amenities: [
      'Lakeside Dining Deck & Fireplace',
      'En-Suite Canvas Tents with Decks',
      'Solar Heated Showers',
      'Lake Ihema Sunset Boat Cruises',
      'All-Inclusive Meals',
      'Safari Guides'
    ],
    roomTypes: [
      'Luxury Lake Tented Suite',
      'Treehouse Suite',
      'Family Tented Suite'
    ],
    recommendedFor: ['Nature Lovers', 'Eco-Tourists', 'Couples', 'Bird Watchers'],
    contactPhone: '+250 782 166 015',
    contactEmail: 'ruzizi@africanparks.org'
  },

  // ==================== NYUNGWE NATIONAL PARK (RAINFOREST LUXURY) ====================
  {
    id: 'one-and-only-nyungwe-house',
    name: 'One&Only Nyungwe House',
    stars: 5,
    region: 'Nyungwe / Western',
    location: 'Gisakura Tea Estate, Nyungwe National Park',
    lat: -2.4800,
    lng: 29.1200,
    image: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80'
    ],
    priceRange: '$1,650 - $3,900 / night (All-Inclusive)',
    pricePerNightUSD: 1650,
    tagline: 'Immerse in ancient rainforest luxury among rolling Gisakura emerald tea fields.',
    description: 'Set within a working Gisakura tea plantation on the edge of the ancient Nyungwe Rainforest, this 5-star haven features luxury villa suites with open fireplaces, private viewing decks over the canopy, heated infinity pool facing the jungle, and chimpanzee tracking concierge.',
    highlights: [
      'Heated outdoor infinity pool cantilevering over the rainforest canopy',
      'Tea plantation tours & gourmet tea-infused multi-course dinners',
      'Helipad for 45-minute scenic helicopter flights from Kigali',
      'Direct access to Chimpanzee tracking and Canopy Walkway'
    ],
    amenities: [
      'Heated Rainforest Infinity Pool',
      'One&Only Holistic Spa',
      'Tea Sommelier Experiences',
      'Private Helipad',
      'Yoga & Fitness Pavilions',
      'All-Inclusive Gourmet Dining & Drinks',
      'Archery & Mountain Biking',
      'Open Fireplaces in All Suites'
    ],
    roomTypes: [
      'Nyungwe Luxury Room',
      'Two-Bedroom Forest Suite',
      'Gisakura Master Suite'
    ],
    recommendedFor: ['Chimpanzee Trackers', 'Tea Enthusiasts', 'Honeymooners', 'Wellness Seekers'],
    contactPhone: '+250 788 389 700',
    contactEmail: 'reservations@oneandonlynyungwehouse.com'
  },
  {
    id: 'nyungwe-top-view-hill-hotel',
    name: 'Nyungwe Top View Hill Hotel',
    stars: 5,
    region: 'Nyungwe / Western',
    location: 'Gisakura Ridge, Nyungwe National Park',
    lat: -2.4850,
    lng: 29.1350,
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
    priceRange: '$380 - $750 / night (Full Board)',
    pricePerNightUSD: 380,
    tagline: '360-degree ridge panoramas of Nyungwe Forest and Lake Kivu in the distance.',
    description: 'Perched on top of a high hill near Gisakura, this luxury lodge offers 12 red-brick stone cottages with private verandas offering breathtaking panoramic views of the rainforest, tea fields, and Lake Kivu on clear days.',
    highlights: [
      'Stunning 360-degree hilltop views of Nyungwe forest canopy',
      'Individual stone cottages with private balconies and fireplaces',
      'Traditional Intore dance performances at sunset',
      'Quick 10-minute drive to Uwinka Canopy Walk headquarters'
    ],
    amenities: [
      'Hilltop Panoramic Restaurant & Bar',
      'Open Fireplaces in Cottages',
      'Full Board Meal Packages',
      'Cultural Dance Evenings',
      'Chimp Trekking Guides',
      'Free Wi-Fi in Public Areas'
    ],
    roomTypes: [
      'Luxury Stone Cottage with Fireplace',
      'Family Cottage'
    ],
    recommendedFor: ['Scenic Photography', 'Hikers & Birders', 'Primate Enthusiasts'],
    contactPhone: '+250 788 800 555',
    contactEmail: 'info@nyungwehotel.com'
  },

  // ==================== LAKE KIVU (BEACH & RESORT LUXURY) ====================
  {
    id: 'lake-kivu-serena-hotel',
    name: 'Lake Kivu Serena Hotel',
    stars: 5,
    region: 'Lake Kivu / Western',
    location: 'Rubavu / Gisenyi Beachfront, Lake Kivu',
    lat: -1.7015,
    lng: 29.2610,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80'
    ],
    priceRange: '$290 - $720 / night',
    pricePerNightUSD: 290,
    tagline: 'Rwanda’s premier 5-star tropical beach resort with private white sands on Lake Kivu.',
    description: 'Set on the palm-lined white sandy shores of Lake Kivu in Rubavu (Gisenyi), Lake Kivu Serena Hotel features 66 luxury rooms, a private white sand beach, water sports center (kayaking, jet skiing, sailing), swimming pool, and Kiyaga Restaurant serving fresh Lake Kivu sambaza fish.',
    highlights: [
      'Private white sand beach safe for swimming (no crocodiles or bilharzia)',
      'Water sports: catamaran sailing, kayaking, and sunset cruises',
      'Kiyaga Restaurant with open-air terrace overlooking the lake',
      'Maisha Spa and beachfront massage cabanas'
    ],
    amenities: [
      'Private Beachfront Access',
      'Large Swimming Pool',
      'Water Sports & Boat Charters',
      'Maisha Spa & Health Club',
      'Kiyaga & Ziwani Beach Restaurants',
      'Tennis Courts',
      'High-Speed Wi-Fi',
      'Beach Volleyball'
    ],
    roomTypes: [
      'Superior Lake View Room',
      'Deluxe Family Room',
      'Executive Beachfront Suite',
      'Presidential Suite'
    ],
    recommendedFor: ['Beach Lovers', 'Honeymooners', 'Families', 'Water Sports Enthusiasts'],
    contactPhone: '+250 252 541 100',
    contactEmail: 'kivu@serenahotels.com'
  },
  {
    id: 'cleo-lake-kivu-hotel',
    name: 'Cleo Lake Kivu Hotel',
    stars: 5,
    region: 'Lake Kivu / Western',
    location: 'Bwishyura, Karongi / Kibuye, Lake Kivu',
    lat: -2.0550,
    lng: 29.3450,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    priceRange: '$420 - $1,100 / night',
    pricePerNightUSD: 420,
    tagline: 'Exclusive boutique luxury villa and infinity pool nestled on Karongi’s pristine peninsula.',
    description: 'An intimate 5-star luxury boutique haven in Karongi (Kibuye) set on a private peninsula jutting into Lake Kivu. Offers private villa suites, infinity pool overlooking island archipelagos, private yacht cruises, and gourmet cuisine.',
    highlights: [
      'Stunning infinity pool merging seamlessly into Lake Kivu',
      'Private speed boat excursions to Napoleon Island (fruit bats) & Peace Island',
      'Bespoke French-Rwandan fusion dining paired with fine wines',
      'Peaceful, secluded peninsula atmosphere away from city life'
    ],
    amenities: [
      'Infinity Pool with Archipelago Views',
      'Private Yacht / Boat Excursions',
      'Luxury Spa Pavilion',
      'Gourmet Lakeview Dining',
      'Kayaking & Paddleboarding',
      'Helipad for Direct Fly-in',
      'High-Speed Wi-Fi'
    ],
    roomTypes: [
      'King Suite with Lake Panorama',
      'Villa Suite with Private Terrace',
      'Presidential Peninsula Villa'
    ],
    recommendedFor: ['Romantic Escapes', 'Honeymoons', 'Yachting Enthusiasts', 'VIP Privacy'],
    contactPhone: '+250 788 380 000',
    contactEmail: 'reservations@cleolakelivu.com'
  },
  {
    id: 'cormoran-lodge-karongi',
    name: 'Cormoran Lodge',
    stars: 5,
    region: 'Lake Kivu / Western',
    location: 'Kibuye / Karongi Hills, Lake Kivu',
    lat: -2.0620,
    lng: 29.3510,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
    priceRange: '$240 - $550 / night',
    pricePerNightUSD: 240,
    tagline: 'Handcrafted luxury wood and stone cabins built over the tranquil waters of Kibuye.',
    description: 'Entirely built with sustainable local wood and volcanic stone on steep hills over Lake Kivu, Cormoran Lodge features 7 exquisite cabins with private balconies offering sweeping views of islands and night-singing fishermen.',
    highlights: [
      'Elevated wooden cabins suspended over Lake Kivu',
      'Watch night fishermen singing their traditional rhythmic chants',
      'Boat tours to Peace Island and coffee washing stations',
      'Cozy restaurant with stone fireplace and lake panorama'
    ],
    amenities: [
      'Private Lakeview Cabins',
      'Gourmet Restaurant & Bar',
      'Kayaks & Motorboat Charters',
      'Waterfront Sunbathing Deck',
      'Stone Fireplace',
      'Wi-Fi'
    ],
    roomTypes: [
      'Double Wood Cabin',
      'Twin Cabin',
      'VIP Lake Cabana'
    ],
    recommendedFor: ['Couples', 'Writers & Creators', 'Nature Lovers'],
    contactPhone: '+250 788 625 217',
    contactEmail: 'cormoranlodge@yahoo.fr'
  },
  {
    id: 'mantis-kivu-marina-bay-hotel',
    name: 'Mantis Kivu Marina Bay Hotel',
    stars: 5,
    region: 'Lake Kivu / Western',
    location: 'Rusizi / Kamembe Waterfront, Lake Kivu',
    lat: -2.4830,
    lng: 28.9050,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    priceRange: '$280 - $650 / night',
    pricePerNightUSD: 280,
    tagline: 'Modern 5-star lakeside hotel near Kamembe Airport with sweeping bay vistas.',
    description: 'Located in Rusizi near the southern tip of Lake Kivu and 10 minutes from Kamembe Airport, Mantis Kivu Marina Bay Hotel offers upscale contemporary rooms, an expansive outdoor pool overlooking the marina, gym, and restaurant.',
    highlights: [
      'Prime location 10 minutes from Kamembe Airport (KME) with direct flights from Kigali',
      'Panoramic pool terrace overlooking Rusizi Marina and DR Congo border vistas',
      'Ideal gateway combining Lake Kivu boat cruises and Nyungwe chimp treks',
      'Accor ALL live hospitality standards and conference facilities'
    ],
    amenities: [
      'Outdoor Marina-View Pool',
      'Fine Dining Restaurant & Bar',
      'Airport VIP Shuttle',
      'Fitness Center & Spa',
      'High-Speed Wi-Fi',
      'Conference Rooms'
    ],
    roomTypes: [
      'Deluxe Marina View Room',
      'Executive Suite',
      'Presidential Suite'
    ],
    recommendedFor: ['Business Travelers', 'Transit to Nyungwe', 'Leisure Couples'],
    contactPhone: '+250 788 192 000',
    contactEmail: 'reservations@kivumarinabay.com'
  }
];
