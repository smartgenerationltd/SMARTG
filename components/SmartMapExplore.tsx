import React, { useState, useMemo } from 'react';
import { Place, PlaceCategory, Destination } from '../types';
import { RWANDA_PLACES } from '../data/rwandaPlacesData';
import MapComponent from './MapComponent';
import { 
  Search, 
  MapPin, 
  Compass, 
  Crosshair, 
  Sparkles, 
  Heart, 
  Navigation, 
  Layers, 
  Filter,
  Eye
} from 'lucide-react';

interface SmartMapExploreProps {
  destinations?: Destination[];
  userLocation: { lat: number; lng: number } | null;
  onGetDirections: (lat: number, lng: number, name: string) => void;
  onRequestLocate: () => void;
  onSelectPlace: (place: Place) => void;
  savedPlaceIds?: string[];
  onToggleSavePlace?: (placeId: string) => void;
  onAskConcierge?: (prompt: string) => void;
  getDirectionsText?: string;
}

const CATEGORIES: { id: PlaceCategory; label: string; icon: string }[] = [
  { id: 'all', label: 'All Destinations', icon: '🌟' },
  { id: 'national_parks', label: 'National Parks', icon: '🌲' },
  { id: 'attractions', label: 'Landmarks', icon: '🏛️' },
  { id: 'museums', label: 'Museums & History', icon: '📜' },
  { id: 'culture', label: 'Culture & Arts', icon: '🎭' },
  { id: 'adventure', label: 'Adventure & Lakes', icon: '🥾' },
  { id: 'restaurants', label: 'Food & Coffee', icon: '☕' },
  { id: 'shopping', label: 'Markets & Crafts', icon: '🛍️' },
  { id: 'hospitals', label: 'Emergency & Hospitals', icon: '🏥' },
];

const SmartMapExplore: React.FC<SmartMapExploreProps> = ({
  destinations = [],
  userLocation,
  onGetDirections,
  onRequestLocate,
  onSelectPlace,
  savedPlaceIds = [],
  onToggleSavePlace = () => {},
  onAskConcierge,
  getDirectionsText = 'Get Directions',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<PlaceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPlaces = useMemo(() => {
    return RWANDA_PLACES.filter((place) => {
      const matchCategory = selectedCategory === 'all' || place.category === selectedCategory;
      const matchSearch =
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (place.tags && place.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Combined destinations to display on Leaflet Map
  const mapDestinations: Destination[] = useMemo(() => {
    const placesAsDestinations: Destination[] = filteredPlaces.map((p) => ({
      lat: p.lat,
      lng: p.lng,
      name: p.name,
      category: p.category,
      description: p.description,
      image: p.image,
    }));

    // Merge with any custom search destinations from chat
    return [...placesAsDestinations, ...destinations.filter(d => !placesAsDestinations.some(p => p.name === d.name))];
  }, [filteredPlaces, destinations]);

  return (
    <div className="flex flex-col lg:flex-row h-full w-full gap-4 pb-16 lg:pb-4 overflow-hidden">
      
      {/* Left / Top Map Panel */}
      <div className="w-full lg:w-3/5 h-80 sm:h-96 lg:h-full rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm relative flex flex-col">
        <div className="flex-1 w-full h-full relative">
          <MapComponent
            destinations={mapDestinations}
            onGetDirections={onGetDirections}
            onRequestLocate={onRequestLocate}
            userLocation={userLocation}
            getDirectionsText={getDirectionsText}
          />
        </div>
      </div>

      {/* Right / Bottom Interactive Explorer List & Filter Panel */}
      <div className="w-full lg:w-2/5 flex flex-col bg-white dark:bg-slate-800/90 rounded-3xl border border-slate-200 dark:border-slate-700 p-4 sm:p-5 shadow-sm overflow-hidden h-[600px] lg:h-full">
        
        {/* Search Bar & GPS Locate Button */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Kigali, gorillas, lakes, coffee..."
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <button
            onClick={onRequestLocate}
            className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors"
            title="Locate my GPS position"
          >
            <Crosshair className="w-4 h-4" />
          </button>
        </div>

        {/* Category Pills Scroller */}
        <div className="flex space-x-1.5 overflow-x-auto pb-2 scrollbar-thin mb-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-1 ${
                selectedCategory === cat.id
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Results Header Count */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pb-2 border-b border-slate-200 dark:border-slate-700 mb-3">
          <span>Showing {filteredPlaces.length} Destinations</span>
          {userLocation && (
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
              📍 GPS Active
            </span>
          )}
        </div>

        {/* Places Scrollable Cards List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {filteredPlaces.map((place) => {
            const isSaved = savedPlaceIds.includes(place.id);
            return (
              <div
                key={place.id}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-750 border border-slate-200 dark:border-slate-700/80 hover:border-amber-400 transition-all flex gap-3 group"
              >
                <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 relative">
                  <img
                    src={place.image}
                    alt={place.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSavePlace(place.id);
                    }}
                    className={`absolute top-1.5 right-1.5 p-1 rounded-full backdrop-blur-xs ${
                      isSaved ? 'bg-rose-500 text-white' : 'bg-black/40 text-white'
                    }`}
                  >
                    <Heart className={`w-3 h-3 ${isSaved ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                        {place.region}
                      </span>
                      {place.rating && (
                        <span className="text-[10px] font-bold text-amber-500">
                          ★ {place.rating}
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                      {place.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                      {place.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 mt-1 border-t border-slate-200/60 dark:border-slate-700/60">
                    <button
                      onClick={() => onSelectPlace(place)}
                      className="text-[11px] font-bold text-slate-700 dark:text-slate-300 hover:text-amber-600 flex items-center space-x-1"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Details</span>
                    </button>

                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => onGetDirections(place.lat, place.lng, place.name)}
                        className="p-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-slate-200"
                        title="Route / Directions"
                      >
                        <Navigation className="w-3 h-3 text-emerald-600" />
                      </button>
                      <button
                        onClick={() => onAskConcierge(`Tell me all about visiting ${place.name} in ${place.region}`)}
                        className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-[10px] flex items-center space-x-1"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>Ask AI</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default SmartMapExplore;
