import React from 'react';
import { ActiveTab, Place } from '../types';
import { RWANDA_PLACES } from '../data/rwandaPlacesData';
import { RWANDA_NATIONAL_PARKS } from '../data/rwandaNationalParksData';
import { CULTURAL_DISHES } from '../data/rwandaCultureData';
import { 
  FIVE_STAR_HOTELS, 
  ORGANIZATION_BOOKING_CONTACT, 
  createHotelWhatsAppUrl, 
  createHotelEmailUrl 
} from '../data/fiveStarHotelsData';
import { 
  Sparkles, 
  Mic, 
  MapPin, 
  CalendarDays, 
  BookOpen, 
  ShieldCheck, 
  Compass, 
  ArrowRight, 
  Navigation, 
  TreePine, 
  Utensils, 
  Coffee, 
  Heart, 
  ChevronRight,
  Eye,
  Crown,
  MessageSquare,
  Mail,
  Star
} from 'lucide-react';


interface HomeHeroProps {
  onNavigateTab: (tab: ActiveTab) => void;
  onOpenVoiceModal: () => void;
  onPromptClick?: (prompt: string, isFindNearby?: boolean) => void;
  onQuickPrompt?: (prompt: string) => void;
  onSelectPlace: (place: Place) => void;
  savedPlaceIds?: string[];
  onToggleSavePlace?: (placeId: string) => void;
  language: string;
}

const HomeHero: React.FC<HomeHeroProps> = ({
  onNavigateTab,
  onOpenVoiceModal,
  onPromptClick,
  onQuickPrompt,
  onSelectPlace,
  savedPlaceIds = [],
  onToggleSavePlace = () => {},
  language
}) => {
  const handlePrompt = (prompt: string, isFindNearby?: boolean) => {
    if (onPromptClick) {
      onPromptClick(prompt, isFindNearby);
    } else if (onQuickPrompt) {
      onQuickPrompt(prompt);
    }
  };

  const featuredParks = RWANDA_NATIONAL_PARKS;
  const popularPlaces = RWANDA_PLACES.slice(0, 6);

  const quickPrompts = [
    { label: '📍 Find Places Near Me', action: () => handlePrompt('Find places near me', true), highlight: true },
    { label: '🦍 Mountain Gorilla Trekking Guide', action: () => handlePrompt('Tell me everything about Gorilla Trekking permits and what to expect in Volcanoes National Park') },
    { label: '🦁 Big 5 Safari in Akagera', action: () => handlePrompt('What is the best itinerary for a safari in Akagera National Park?') },
    { label: '☕ Best Kigali Coffee & Cafes', action: () => handlePrompt('Where can I taste the best specialty coffee in Kigali?') },
    { label: '⛵ Lake Kivu Kayaking & Beaches', action: () => handlePrompt('What are the top activities around Lake Kivu in Rubavu and Karongi?') },
    { label: '🍲 Traditional Rwandan Foods', action: () => handlePrompt('What are the traditional Rwandan foods I must try and where in Kigali?') },
    { label: '🛡️ Safety Tips for Tourists', action: () => handlePrompt('Is Rwanda safe for solo travelers and what emergency numbers should I know?') },
  ];

  return (
    <div className="space-y-10 pb-16">
      
      {/* Hero Header Section with Rwandan Inspired Canvas */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-sky-950 to-emerald-950 text-white p-6 sm:p-10 lg:p-12 border border-amber-400/20 shadow-2xl">
        {/* Background ambient lighting */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-wide uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Land of a Thousand Hills</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight font-sans">
            Discover Rwanda through an AI that speaks your language.
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Welcome to your intelligent travel companion. Seamlessly plan multi-day safaris, converse via real-time voice, explore interactive maps, and uncover rich cultural treasures.
          </p>

          {/* Hero Action Buttons */}
          <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
            <button
              onClick={onOpenVoiceModal}
              className="flex items-center space-x-2.5 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-sm shadow-lg shadow-emerald-900/40 hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <Mic className="w-4 h-4 animate-pulse" />
              <span>Talk to Rwanda AI</span>
            </button>

            <button
              onClick={() => onNavigateTab('planner')}
              className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-lg shadow-amber-900/30 hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-amber-300"
            >
              <CalendarDays className="w-4 h-4" />
              <span>Plan My Trip</span>
            </button>

            <button
              onClick={() => onPromptClick('Find places near me', true)}
              className="flex items-center space-x-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 backdrop-blur-xs transition-all"
            >
              <Navigation className="w-4 h-4 text-amber-400" />
              <span>Places Near Me</span>
            </button>
          </div>
        </div>
      </section>

      {/* Quick Access Action Modules */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <Compass className="w-5 h-5 text-amber-500" />
            <span>Concierge Modules</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          
          <button
            onClick={() => onNavigateTab('chat')}
            className="flex flex-col items-start p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 hover:border-amber-400 dark:hover:border-amber-400 shadow-xs hover:shadow-md transition-all text-left group"
          >
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 mb-3 group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="font-bold text-sm text-slate-900 dark:text-white">AI Concierge</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Chat & Ask Anything</span>
          </button>

          <button
            onClick={() => onNavigateTab('explore')}
            className="flex flex-col items-start p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 hover:border-amber-400 dark:hover:border-amber-400 shadow-xs hover:shadow-md transition-all text-left group"
          >
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mb-3 group-hover:scale-110 transition-transform">
              <MapPin className="w-5 h-5" />
            </div>
            <span className="font-bold text-sm text-slate-900 dark:text-white">Smart Map</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Interactive GPS Map</span>
          </button>

          <button
            onClick={() => onNavigateTab('planner')}
            className="flex flex-col items-start p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 hover:border-amber-400 dark:hover:border-amber-400 shadow-xs hover:shadow-md transition-all text-left group"
          >
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 mb-3 group-hover:scale-110 transition-transform">
              <CalendarDays className="w-5 h-5" />
            </div>
            <span className="font-bold text-sm text-slate-900 dark:text-white">Trip Planner</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">AI Daily Itineraries</span>
          </button>

          <button
            onClick={() => onNavigateTab('experience')}
            className="flex flex-col items-start p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 hover:border-amber-400 dark:hover:border-amber-400 shadow-xs hover:shadow-md transition-all text-left group"
          >
            <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 mb-3 group-hover:scale-110 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="font-bold text-sm text-slate-900 dark:text-white">Culture & Food</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Language & Dishes</span>
          </button>

          <button
            onClick={() => onNavigateTab('safety')}
            className="flex flex-col items-start p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 hover:border-amber-400 dark:hover:border-amber-400 shadow-xs hover:shadow-md transition-all text-left group"
          >
            <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 mb-3 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="font-bold text-sm text-slate-900 dark:text-white">Safety & Help</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Emergency Numbers</span>
          </button>

          <button
            onClick={onOpenVoiceModal}
            className="flex flex-col items-start p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-700/60 hover:border-emerald-500 shadow-xs hover:shadow-md transition-all text-left group"
          >
            <div className="p-2.5 rounded-xl bg-emerald-500 text-white mb-3 group-hover:scale-110 transition-transform">
              <Mic className="w-5 h-5" />
            </div>
            <span className="font-bold text-sm text-emerald-900 dark:text-emerald-300">Voice Assistant</span>
            <span className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-1">Speak in {language}</span>
          </button>

        </div>
      </section>

      {/* Quick Reach Prompts Carousel */}
      <section className="bg-amber-50/70 dark:bg-slate-800/50 border border-amber-200/80 dark:border-slate-700/80 rounded-2xl p-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-400 mb-3 flex items-center space-x-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Quick Reach Questions & Travel Prompts</span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {quickPrompts.map((item, idx) => (
            <button
              key={idx}
              onClick={item.action}
              className={`text-xs font-medium px-3.5 py-2 rounded-xl transition-all text-left ${
                item.highlight
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xs'
                  : 'bg-white dark:bg-slate-700 hover:bg-amber-100 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-600'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </section>

      {/* 4 National Parks Spotlight */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <TreePine className="w-5 h-5 text-emerald-600" />
              <span>Rwanda’s 4 National Parks</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Primate sanctuaries, Big Five savannas, and ancient rainforests
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('experience')}
            className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center space-x-1"
          >
            <span>View Details</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredParks.map((park) => (
            <div
              key={park.id}
              className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={park.image}
                    alt={park.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-2.5 left-3 right-3">
                    <span className="text-[10px] uppercase font-bold text-amber-300 bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-xs">
                      {park.size}
                    </span>
                    <h3 className="text-sm font-bold text-white mt-1 line-clamp-1">{park.name}</h3>
                  </div>
                </div>

                <div className="p-4">
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                    {park.tagline}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {park.keyWildlife.slice(0, 2).map((w, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-medium bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md"
                      >
                        {w.split('(')[0]}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0">
                <button
                  onClick={() => onPromptClick(`Tell me all about visiting ${park.name}, activities, best seasons, and entry permits`)}
                  className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-amber-100 dark:hover:bg-amber-950/50 text-slate-800 dark:text-slate-200 hover:text-amber-900 dark:hover:text-amber-300 text-xs font-bold transition-colors flex items-center justify-center space-x-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Ask AI Guide</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5-Star Luxury Hotels & Lodges Spotlight Section */}
      <section className="bg-gradient-to-br from-slate-900/90 via-slate-900 to-amber-950/30 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center space-x-2">
              <span className="flex items-center text-xs font-bold uppercase tracking-wider bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded-md">
                <Crown className="w-3.5 h-3.5 mr-1" />
                5-STAR RWANDA LUXURY
              </span>
              <span className="text-xs text-amber-300 font-semibold">Gorilla Lodges · Savanna Camps · City Suites</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1.5 flex items-center space-x-2">
              <span>Premier 5-Star Hotels & Luxury Lodges</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Direct booking coordination via official WhatsApp (<span className="text-emerald-400 font-mono font-semibold">+250 781 121 179</span>) or Email (<span className="text-amber-300 font-semibold">giniyomugabo@gmail.com</span>).
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('hotels')}
            className="self-start md:self-auto px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center space-x-1.5 shadow-md shadow-amber-950/40 transition-all flex-shrink-0"
          >
            <span>View All 5-Star Hotels</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Top 4 Curated 5-Star Lodges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {FIVE_STAR_HOTELS.slice(0, 4).map((hotel) => {
            const whatsAppUrl = createHotelWhatsAppUrl({ hotelName: hotel.name });
            const emailUrl = createHotelEmailUrl({ hotelName: hotel.name });

            return (
              <div
                key={hotel.id}
                className="group bg-slate-950/80 border border-slate-800 hover:border-amber-500/50 rounded-2xl overflow-hidden shadow-md flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                    
                    <div className="absolute top-2.5 left-2.5 flex items-center space-x-0.5 px-2 py-0.5 rounded-md bg-slate-950/80 text-amber-400 text-[10px] font-bold border border-amber-500/40">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 fill-current text-amber-400" />
                      ))}
                    </div>

                    <div className="absolute top-2.5 right-2.5 text-[10px] font-bold bg-slate-950/80 text-slate-300 px-2 py-0.5 rounded-md">
                      {hotel.region.split('/')[0]}
                    </div>

                    <div className="absolute bottom-2 left-2.5 right-2.5">
                      <span className="text-xs font-bold text-white block truncate">{hotel.name}</span>
                      <span className="text-[11px] text-emerald-400 font-semibold">{hotel.priceRange}</span>
                    </div>
                  </div>

                  <div className="p-3.5 space-y-2">
                    <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                      {hotel.tagline}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {hotel.amenities.slice(0, 2).map((a, idx) => (
                        <span key={idx} className="text-[9px] font-semibold bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-3.5 pt-0 space-y-1.5">
                  <div className="grid grid-cols-2 gap-1.5">
                    <a
                      href={whatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-1.5 px-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] flex items-center justify-center space-x-1 transition-colors"
                      title="Book via WhatsApp"
                    >
                      <MessageSquare className="w-3 h-3 fill-current" />
                      <span>WhatsApp</span>
                    </a>
                    <a
                      href={emailUrl}
                      className="py-1.5 px-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[10px] flex items-center justify-center space-x-1 transition-colors"
                      title="Book via Email"
                    >
                      <Mail className="w-3 h-3" />
                      <span>Email</span>
                    </a>
                  </div>
                  <button
                    onClick={() => onNavigateTab('hotels')}
                    className="w-full py-1 text-center text-[10px] font-semibold text-slate-400 hover:text-amber-300 transition-colors"
                  >
                    View details & all rooms →
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Places & Landmarks */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-amber-500" />
              <span>Must-Visit Rwandan Destinations</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Curated cultural institutions, nature trails, and artistic landmarks
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('explore')}
            className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center space-x-1"
          >
            <span>Explore All On Map</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {popularPlaces.map((place) => {
            const isSaved = savedPlaceIds.includes(place.id);
            return (
              <div
                key={place.id}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={place.image}
                      alt={place.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSavePlace(place.id);
                      }}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-xs transition-colors ${
                        isSaved 
                          ? 'bg-rose-500 text-white' 
                          : 'bg-black/40 text-white hover:bg-black/60'
                      }`}
                      title={isSaved ? 'Saved to My Rwanda' : 'Save Place'}
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                    <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs text-amber-300 text-[11px] font-bold px-2.5 py-1 rounded-md">
                      {place.region}
                    </span>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-base text-slate-900 dark:text-white line-clamp-1">
                      {place.name}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">
                      {place.description}
                    </p>
                    <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>⏱️ {place.recommendedDuration || '2 hours'}</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        {place.estimatedPrice || 'Free'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onSelectPlace(place)}
                    className="py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center justify-center space-x-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Details</span>
                  </button>
                  <button
                    onClick={() => handlePrompt(`Tell me all about ${place.name} and practical tips for visitors`)}
                    className="py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold flex items-center justify-center space-x-1"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Ask AI</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Culinary & Food Showcase Preview */}
      <section className="bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-sky-500/10 dark:from-amber-950/20 dark:via-emerald-950/20 dark:to-sky-950/20 border border-amber-300/40 dark:border-slate-700 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <Utensils className="w-5 h-5 text-amber-500" />
              <span>Taste Authentic Rwandan Flavors</span>
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              From charcoal-grilled goat brochettes and Isombe to aromatic single-origin Bourbon Arabica coffee.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('experience')}
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold flex items-center space-x-1.5 shadow-xs"
          >
            <span>Full Food & Language Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {CULTURAL_DISHES.slice(0, 3).map((dish, idx) => (
            <div
              key={idx}
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xs rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col justify-between"
            >
              <div>
                <img
                  src={dish.image}
                  alt={dish.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-32 object-cover rounded-xl mb-3"
                />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">{dish.name}</h3>
                <span className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">{dish.kinyarwandaName}</span>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 line-clamp-2">{dish.description}</p>
              </div>
              <button
                onClick={() => handlePrompt(`Where can I find the best ${dish.name} in Kigali and how is it prepared?`)}
                className="mt-3 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center space-x-1"
              >
                <span>Where to taste in Kigali</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default HomeHero;
