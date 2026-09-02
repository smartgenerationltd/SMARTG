export interface Message {
  role: 'user' | 'model';
  content: string;
  isSuggestion?: boolean;
  component?: 'VolcanoesHotels' | 'HuyeHotels';
  timestamp?: number;
  placeCard?: Place;
  itineraryCard?: GeneratedItinerary;
}

export interface Destination {
  lat: number;
  lng: number;
  name: string;
  category?: PlaceCategory;
  description?: string;
  image?: string;
}

export type PlaceCategory = 
  | 'all'
  | 'national_parks'
  | 'attractions'
  | 'hotels'
  | 'restaurants'
  | 'museums'
  | 'culture'
  | 'adventure'
  | 'shopping'
  | 'transport'
  | 'hospitals';

export interface Place {
  id: string;
  name: string;
  category: PlaceCategory;
  region: 'Kigali' | 'Northern Province' | 'Southern Province' | 'Eastern Province' | 'Western Province';
  description: string;
  whyVisit: string;
  lat: number;
  lng: number;
  image: string;
  estimatedPrice?: string;
  recommendedDuration?: string;
  bestTimeToVisit?: string;
  openingHours?: string;
  rating?: number;
  reviewsCount?: number;
  tags?: string[];
  contact?: string;
}

export type TravelStyle = 
  | 'Adventure'
  | 'Wildlife'
  | 'Luxury'
  | 'Budget'
  | 'Family'
  | 'Romantic'
  | 'Business'
  | 'Culture'
  | 'Food'
  | 'Nature'
  | 'Photography'
  | 'Wellness';

export interface TripPlanQuery {
  arrivalDate: string;
  departureDate: string;
  travelersCount: number;
  budgetLevel: 'Budget' | 'Moderate' | 'Luxury';
  styles: TravelStyle[];
  pace: 'Relaxed' | 'Moderate' | 'Fast-paced';
  transport: 'Public / Moto' | 'Rental Car' | 'Private Chauffeur / Tour Van';
  notes?: string;
}

export interface ItineraryDayActivity {
  timeSlot: 'Morning' | 'Afternoon' | 'Evening';
  title: string;
  location: string;
  coordinates?: { lat: number; lng: number };
  description: string;
  estimatedCost?: string;
  travelTime?: string;
  tips?: string;
}

export interface ItineraryDay {
  dayNumber: number;
  dateStr?: string;
  theme: string;
  locationTitle: string;
  activities: ItineraryDayActivity[];
  daySummary: string;
  estimatedDayCost?: string;
}

export interface GeneratedItinerary {
  id: string;
  title: string;
  summary: string;
  totalDays: number;
  travelStyles: string[];
  budgetTier: string;
  days: ItineraryDay[];
  essentialTips: string[];
  createdAt: number;
}

export interface CulturalDish {
  name: string;
  kinyarwandaName?: string;
  description: string;
  ingredients: string[];
  howItsEnjoyed: string;
  image: string;
  whereToTry: string;
}

export interface KinyarwandaPhrase {
  phrase: string;
  kinyarwanda: string;
  pronunciation: string;
  context: string;
  audioKey?: string;
}

export interface SafetyContact {
  service: string;
  phone: string;
  description: string;
  location?: string;
  category: 'emergency' | 'hospital' | 'police' | 'embassy';
}

export interface UserProfile {
  name: string;
  email?: string;
  preferredLanguage: string;
  isPremium: boolean;
  credits: number;
  savedPlaceIds: string[];
  savedItineraries: GeneratedItinerary[];
}

export interface FiveStarHotel {
  id: string;
  name: string;
  stars: number;
  region: 'Kigali' | 'Volcanoes / Northern' | 'Akagera / Eastern' | 'Nyungwe / Western' | 'Lake Kivu / Western';
  location: string;
  lat: number;
  lng: number;
  image: string;
  gallery?: string[];
  priceRange: string;
  pricePerNightUSD: number;
  description: string;
  highlights: string[];
  amenities: string[];
  roomTypes: string[];
  recommendedFor: string[];
  contactPhone?: string;
  contactEmail?: string;
  tagline: string;
}

export type ActiveTab = 'home' | 'hotels' | 'chat' | 'explore' | 'planner' | 'experience' | 'safety' | 'profile';

