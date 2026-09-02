import React, { useState, useMemo } from 'react';
import { FiveStarHotel } from '../types';
import { 
  FIVE_STAR_HOTELS, 
  ORGANIZATION_BOOKING_CONTACT, 
  createHotelWhatsAppUrl, 
  createHotelEmailUrl 
} from '../data/fiveStarHotelsData';
import HotelBookingModal from './HotelBookingModal';
import { 
  Star, 
  MapPin, 
  Sparkles, 
  MessageSquare, 
  Mail, 
  Phone, 
  Navigation, 
  Search, 
  SlidersHorizontal, 
  CheckCircle2, 
  ShieldCheck, 
  Flame, 
  Crown,
  BedDouble,
  Coffee,
  Waves,
  Heart
} from 'lucide-react';

interface FiveStarHotelsProps {
  onAskConcierge?: (prompt: string) => void;
  onGetDirections?: (lat: number, lng: number, name: string) => void;
  language?: string;
}

type RegionFilter = 'all' | 'Kigali' | 'Volcanoes / Northern' | 'Akagera / Eastern' | 'Nyungwe / Western' | 'Lake Kivu / Western';

const REGIONS: { id: RegionFilter; label: string; icon: string }[] = [
  { id: 'all', label: 'All 5★ Hotels & Lodges', icon: '✨' },
  { id: 'Kigali', label: 'Kigali Capital', icon: '🏙️' },
  { id: 'Volcanoes / Northern', label: 'Volcanoes NP (Gorillas)', icon: '🦍' },
  { id: 'Akagera / Eastern', label: 'Akagera NP (Big 5 Safari)', icon: '🦁' },
  { id: 'Nyungwe / Western', label: 'Nyungwe (Canopy & Chimps)', icon: '🌿' },
  { id: 'Lake Kivu / Western', label: 'Lake Kivu Beach Resorts', icon: '⛵' },
];

const AMENITY_TAGS = [
  'All Amenities',
  'Outdoor Heated Pool',
  'Fine Dining',
  'Spa',
  'Helipad',
  'Fireplace',
  'Butler'
];

const FiveStarHotels: React.FC<FiveStarHotelsProps> = ({
  onAskConcierge,
  onGetDirections,
  language
}) => {
  const [selectedRegion, setSelectedRegion] = useState<RegionFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAmenity, setSelectedAmenity] = useState('All Amenities');
  const [selectedHotelForBooking, setSelectedHotelForBooking] = useState<FiveStarHotel | null>(null);
  const [sortBy, setSortBy] = useState<'recommended' | 'price_low' | 'price_high'>('recommended');

  const filteredHotels = useMemo(() => {
    return FIVE_STAR_HOTELS.filter((hotel) => {
      // Region check
      if (selectedRegion !== 'all' && hotel.region !== selectedRegion) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = hotel.name.toLowerCase().includes(q);
        const matchesLocation = hotel.location.toLowerCase().includes(q);
        const matchesDesc = hotel.description.toLowerCase().includes(q);
        const matchesAmenity = hotel.amenities.some((a) => a.toLowerCase().includes(q));
        if (!matchesName && !matchesLocation && !matchesDesc && !matchesAmenity) {
          return false;
        }
      }
      // Amenity check
      if (selectedAmenity !== 'All Amenities') {
        const matches = hotel.amenities.some((a) => a.toLowerCase().includes(selectedAmenity.toLowerCase()));
        if (!matches) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_low') return a.pricePerNightUSD - b.pricePerNightUSD;
      if (sortBy === 'price_high') return b.pricePerNightUSD - a.pricePerNightUSD;
      return 0; // Default curated order
    });
  }, [selectedRegion, searchQuery, selectedAmenity, sortBy]);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16 px-2 sm:px-4">
      
      {/* Top Luxury Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-950/80 via-slate-900 to-slate-950 border border-amber-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="absolute -right-10 -top-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-10 -bottom-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center space-x-1 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold tracking-wide">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>Official 5-Star Rwanda Luxury Collection</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Direct Reservation Support</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            5-Star Hotels & Ultra-Luxury Lodges in Rwanda
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Experience world-class Rwandan hospitality, from presidential suites in Kigali to ultra-luxury gorilla lodges in Volcanoes National Park, Big 5 savanna camps in Akagera, and tranquil Lake Kivu beach villas.
          </p>

          {/* Quick Direct Organization Booking Header */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                ⚡ Instant VIP Booking Desk
              </span>
              <p className="text-slate-300 text-xs">
                Link directly with our reservation team via WhatsApp or Email for verified 5-star availability, helicopter transfers, and gorilla permits.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto flex-shrink-0">
              <a
                href={`https://wa.me/${ORGANIZATION_BOOKING_CONTACT.whatsappRaw}?text=${encodeURIComponent('Hello Rwanda Concierge, I would like to inquire about booking 5-star hotels in Rwanda.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp: +250 781 121 179</span>
              </a>

              <a
                href={`mailto:${ORGANIZATION_BOOKING_CONTACT.email}?subject=${encodeURIComponent('5-Star Hotel Reservation Inquiry - Rwanda')}&body=${encodeURIComponent('Dear Concierge Team,\n\nI would like to inquire about booking 5-star luxury accommodations in Rwanda.\n\nThank you!')}`}
                className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email: giniyomugabo@gmail.com</span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="space-y-4">
        
        {/* Search & Sort Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative w-full md:max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search 5-star hotels, lodges, amenities, or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
            />
          </div>

          <div className="flex items-center space-x-2 w-full md:w-auto justify-end">
            <SlidersHorizontal className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-400 font-semibold">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-medium text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
            >
              <option value="recommended">Curated Top Recommendations</option>
              <option value="price_low">Starting Price: Low to High</option>
              <option value="price_high">Starting Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Region Filter Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          {REGIONS.map((r) => {
            const isActive = selectedRegion === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setSelectedRegion(r.id)}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-950/40 scale-105'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                <span>{r.icon}</span>
                <span>{r.label}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Hotel Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHotels.map((hotel) => {
          const directWhatsApp = createHotelWhatsAppUrl({ hotelName: hotel.name });
          const directEmail = createHotelEmailUrl({ hotelName: hotel.name });

          return (
            <div
              key={hotel.id}
              className="group bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image & Badges */}
                <div className="relative h-56 w-full overflow-hidden flex-shrink-0 bg-slate-950">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  
                  {/* 5-Star Rating Badge */}
                  <div className="absolute top-3.5 left-3.5 flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-amber-500/50 text-amber-400 text-xs font-black">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current text-amber-400" />
                    ))}
                    <span className="ml-1 text-[11px] text-white">5-STAR</span>
                  </div>

                  {/* Region Tag */}
                  <span className="absolute top-3.5 right-3.5 text-[11px] font-bold uppercase tracking-wider bg-slate-950/80 backdrop-blur-md text-slate-200 border border-slate-700 px-2.5 py-1 rounded-lg">
                    {hotel.region}
                  </span>

                  {/* Nightly Price Tag */}
                  <div className="absolute bottom-3 right-3 px-3 py-1 rounded-xl bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-bold backdrop-blur-md">
                    {hotel.priceRange}
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-5 space-y-4">
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-1 text-xs text-amber-400 font-medium">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{hotel.location}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                      {hotel.name}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {hotel.description}
                    </p>
                  </div>

                  {/* Highlights List */}
                  <div className="space-y-1.5 pt-1">
                    {hotel.highlights.slice(0, 2).map((hl, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-[11px] text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{hl}</span>
                      </div>
                    ))}
                  </div>

                  {/* Amenities Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-semibold bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700"
                      >
                        {amenity}
                      </span>
                    ))}
                    {hotel.amenities.length > 3 && (
                      <span className="text-[10px] font-semibold bg-slate-800/60 text-slate-400 px-1.5 py-0.5 rounded-md">
                        +{hotel.amenities.length - 3} more
                      </span>
                    )}
                  </div>

                </div>
              </div>

              {/* Booking & Action Buttons */}
              <div className="p-5 pt-0 space-y-2.5">
                
                {/* Book Now Section */}
                <div className="pt-3 border-t border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1">
                      <Crown className="w-3 h-3 text-amber-400" />
                      <span>Direct 5★ Reservation</span>
                    </span>
                    <span className="text-slate-400 text-[10px]">Instant Confirmation</span>
                  </div>

                  {/* Primary 1-Click WhatsApp 'Book Now' Button */}
                  <a
                    href={directWhatsApp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md shadow-emerald-950/40 transition-all active:scale-[0.98]"
                    title={`Book ${hotel.name} via WhatsApp (+250 781 121 179)`}
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                    <span>Book Now via WhatsApp (+250 781 121 179)</span>
                  </a>

                  {/* Secondary 1-Click Email 'Book Now' Button */}
                  <a
                    href={directEmail}
                    className="w-full py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2 shadow-md shadow-amber-950/40 transition-all active:scale-[0.98]"
                    title={`Book ${hotel.name} via Email (giniyomugabo@gmail.com)`}
                  >
                    <Mail className="w-4 h-4" />
                    <span>Book Now via Email (giniyomugabo@gmail.com)</span>
                  </a>

                  {/* Customize Dates / Room Tier Button */}
                  <button
                    onClick={() => setSelectedHotelForBooking(hotel)}
                    className="w-full py-1.5 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-medium flex items-center justify-center space-x-1.5 transition-colors border border-slate-700"
                  >
                    <BedDouble className="w-3.5 h-3.5 text-amber-400" />
                    <span>Customize Dates, Guests & Room Tier</span>
                  </button>
                </div>

                {/* Auxiliary Options: Show on Map & Ask Concierge */}
                <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                  {onGetDirections && (
                    <button
                      onClick={() => onGetDirections(hotel.lat, hotel.lng, hotel.name)}
                      className="hover:text-emerald-400 flex items-center space-x-1 transition-colors"
                    >
                      <Navigation className="w-3 h-3 text-emerald-400" />
                      <span>Map & Route</span>
                    </button>
                  )}

                  {onAskConcierge && (
                    <button
                      onClick={() => onAskConcierge(`Tell me all about the 5-star experience, room categories, and amenities at ${hotel.name} in ${hotel.region}.`)}
                      className="hover:text-amber-400 flex items-center space-x-1 transition-colors ml-auto"
                    >
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>Ask Concierge</span>
                    </button>
                  )}
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* If No Matches Found */}
      {filteredHotels.length === 0 && (
        <div className="text-center py-16 bg-slate-900/50 rounded-3xl border border-slate-800 space-y-3">
          <p className="text-base text-slate-300 font-bold">No 5-star hotels found matching your search.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedRegion('all');
              setSelectedAmenity('All Amenities');
            }}
            className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Interactive Hotel Booking Modal */}
      {selectedHotelForBooking && (
        <HotelBookingModal
          hotel={selectedHotelForBooking}
          onClose={() => setSelectedHotelForBooking(null)}
        />
      )}

    </div>
  );
};

export default FiveStarHotels;
