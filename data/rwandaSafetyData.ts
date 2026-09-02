import { SafetyContact } from '../types';

export const SAFETY_CONTACTS: SafetyContact[] = [
  {
    service: 'National Emergency / Police',
    phone: '112',
    description: 'Toll-free 24/7 central emergency line for police, urgent safety, and accidents.',
    category: 'emergency'
  },
  {
    service: 'SAMU (Ambulance / Medical Emergency)',
    phone: '912',
    description: 'Government medical ambulance dispatch service operating 24/7.',
    category: 'emergency'
  },
  {
    service: 'Rwanda National Police (General Inquiries)',
    phone: '+250 788 311 115',
    description: 'Police headquarters desk for non-emergency inquiries and reports.',
    category: 'police'
  },
  {
    service: 'Tourist Police Division',
    phone: '+250 788 311 155',
    description: 'Dedicated English and French-speaking tourist assistance officers.',
    category: 'police'
  },
  {
    service: 'Traffic Police & Road Accidents',
    phone: '113',
    description: 'Direct dispatch for vehicular accidents and road safety assistance.',
    category: 'police'
  },
  {
    service: 'King Faisal Hospital (Kigali)',
    phone: '+250 252 588 888',
    description: 'Leading international tertiary hospital with 24/7 trauma & emergency department.',
    location: 'KG 544 St, Kacyiru, Kigali',
    category: 'hospital'
  },
  {
    service: 'Centre Hospitalier Universitaire de Kigali (CHUK)',
    phone: '+250 252 575 555',
    description: 'Major public university referral hospital with 24/7 casualty wing.',
    location: 'KN 4 Ave, Downtown Kigali',
    category: 'hospital'
  },
  {
    service: 'Hopital La Croix du Sud (Kigali)',
    phone: '+250 788 305 684',
    description: 'Top-tier private hospital providing emergency consultations, lab, and imaging.',
    location: 'Remera, Kigali',
    category: 'hospital'
  },
  {
    service: 'Rwanda Development Board (Tourism Helpdesk)',
    phone: '+250 252 576 514',
    description: 'Official tourism agency for permits, park questions, and tour operator verifications.',
    location: 'KG 220 St, Gishushu, Kigali',
    category: 'emergency'
  }
];

export const SAFETY_GUIDELINES = [
  {
    category: 'General Traveler Security',
    icon: 'ShieldCheck',
    tips: [
      'Rwanda is ranked among the safest countries in the world. Walking in Kigali during the day or evening is very safe.',
      'Keep your passport and large cash in your hotel safe; carry a digital copy on your phone.',
      'Only use registered moto-taxis (all drivers wear numbered vests and carry a spare passenger helmet, which is mandatory by law).'
    ]
  },
  {
    category: 'Health & Medical Guidance',
    icon: 'HeartPulse',
    tips: [
      'Yellow Fever certificate is required if arriving from an endemic country.',
      'Malaria prophylaxis is recommended, especially when visiting Akagera and Lake Kivu lowland areas.',
      'Drink bottled or purified water. Tap water in hotels is generally used for washing.'
    ]
  },
  {
    category: 'Plastic Bag Ban (Non-Biodegradable Bags)',
    icon: 'Leaf',
    tips: [
      'Rwanda strictly bans single-use plastic bags. Baggage is inspected upon arrival at Kigali International Airport.',
      'Pack using reusable cloth or paper packing cubes and luggage organizers.'
    ]
  },
  {
    category: 'Wildlife & Trekking Rules',
    icon: 'Compass',
    tips: [
      'Maintain a minimum 7 to 10-meter distance from mountain gorillas and golden monkeys.',
      'Wear a surgical mask during gorilla viewing to protect primates from human respiratory illnesses.',
      'Wear sturdy waterproof hiking boots and gaiters for muddy terrain in Volcanoes and Nyungwe forests.'
    ]
  },
  {
    category: 'Currency & Payments',
    icon: 'CreditCard',
    tips: [
      'Official currency is the Rwandan Franc (RWF). US Dollars printed after 2013 are widely accepted for tours/hotels.',
      'MoMoPay (MTN Mobile Money) and Visa/Mastercard are accepted in almost all supermarkets, restaurants, and hotels in Kigali.'
    ]
  }
];
