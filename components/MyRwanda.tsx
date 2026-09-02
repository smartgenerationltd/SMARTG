import React, { useState } from 'react';
import { GeneratedItinerary, Place, ActiveTab } from '../types';
import { RWANDA_PLACES } from '../data/rwandaPlacesData';
import CrownIcon from './icons/CrownIcon';
import CreditIcon from './icons/CreditIcon';
import { 
  User, 
  Bookmark, 
  MapPin, 
  CalendarDays, 
  Sparkles, 
  Trash2, 
  ArrowRight, 
  ExternalLink,
  CreditCard,
  Languages,
  CheckCircle2,
  Heart
} from 'lucide-react';

interface MyRwandaProps {
  user: { name: string } | null;
  credits: number;
  isPremium: boolean;
  onOpenPaymentModal: () => void;
  savedPlaceIds?: string[];
  onToggleSavePlace?: (placeId: string) => void;
  savedItineraries?: GeneratedItinerary[];
  onDeleteItinerary?: (id: string) => void;
  onSelectPlace: (place: Place) => void;
  onNavigateTab: (tab: ActiveTab) => void;
  onAskConcierge: (prompt: string) => void;
  language: string;
}

const MyRwanda: React.FC<MyRwandaProps> = ({
  user,
  credits,
  isPremium,
  onOpenPaymentModal,
  savedPlaceIds = [],
  onToggleSavePlace = () => {},
  savedItineraries = [],
  onDeleteItinerary = () => {},
  onSelectPlace,
  onNavigateTab,
  onAskConcierge,
  language
}) => {
  const [activeSubView, setActiveSubView] = useState<'saved_places' | 'trips' | 'account'>('saved_places');

  const safePlaceIds = savedPlaceIds || [];
  const savedPlaces = RWANDA_PLACES.filter((p) => safePlaceIds.includes(p.id));

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      
      {/* User Header Profile Card */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-amber-400/20 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 font-black text-2xl flex items-center justify-center shadow-lg">
              {user?.name?.charAt(0).toUpperCase() || 'R'}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-black text-white">
                  {user?.name || 'Traveler'}
                </h1>
                {isPremium ? (
                  <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-bold text-xs">
                    <CrownIcon className="w-3.5 h-3.5" />
                    <span>Premium Member</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-medium text-xs">
                    <span>Explorer Tier</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Preferred Language: <strong className="text-slate-200">{language}</strong> · Active Traveler
              </p>
            </div>
          </div>

          {/* Credits & Subscription Manager */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 flex items-center justify-between sm:justify-start space-x-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Credits Balance</span>
              <div className="flex items-center space-x-1.5 mt-0.5">
                <CreditIcon className="w-4 h-4 text-emerald-400" />
                <span className="text-lg font-black text-white">
                  {isPremium ? 'Unlimited' : `${credits} Remaining`}
                </span>
              </div>
            </div>

            {!isPremium && (
              <button
                onClick={onOpenPaymentModal}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-xs font-bold shadow-xs transition-all"
              >
                Upgrade
              </button>
            )}
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="mt-8 flex flex-wrap gap-2 border-t border-slate-800 pt-4">
          <button
            onClick={() => setActiveSubView('saved_places')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
              activeSubView === 'saved_places'
                ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                : 'bg-white/10 hover:bg-white/20 text-slate-200'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Saved Places ({savedPlaces.length})</span>
          </button>

          <button
            onClick={() => setActiveSubView('trips')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
              activeSubView === 'trips'
                ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                : 'bg-white/10 hover:bg-white/20 text-slate-200'
            }`}
          >
            <CalendarDays className="w-3.5 h-3.5" />
            <span>Saved Itineraries ({savedItineraries.length})</span>
          </button>

          <button
            onClick={() => setActiveSubView('account')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
              activeSubView === 'account'
                ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                : 'bg-white/10 hover:bg-white/20 text-slate-200'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Account & Membership</span>
          </button>
        </div>
      </div>

      {/* 1. Saved Places View */}
      {activeSubView === 'saved_places' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <Heart className="w-5 h-5 text-rose-500 fill-current" />
              <span>Your Bookmarked Places in Rwanda</span>
            </h2>
            <button
              onClick={() => onNavigateTab('explore')}
              className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center space-x-1"
            >
              <span>Explore More Places</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {savedPlaces.length === 0 ? (
            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-12 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-rose-50 dark:bg-rose-950/40 flex items-center justify-center text-rose-500">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">No saved places yet</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Explore Rwanda's national parks, coffee cafes, and cultural institutions and tap the heart icon to save them here!
              </p>
              <button
                onClick={() => onNavigateTab('explore')}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-colors"
              >
                Browse Rwanda Smart Map
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedPlaces.map((place) => (
                <div
                  key={place.id}
                  className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-40">
                      <img
                        src={place.image}
                        alt={place.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => onToggleSavePlace(place.id)}
                        className="absolute top-3 right-3 p-2 rounded-full bg-rose-500 text-white shadow-md"
                        title="Remove from Saved"
                      >
                        <Heart className="w-4 h-4 fill-current" />
                      </button>
                      <span className="absolute bottom-2.5 left-3 bg-black/60 backdrop-blur-xs text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-md">
                        {place.region}
                      </span>
                    </div>

                    <div className="p-4">
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">{place.name}</h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">{place.description}</p>
                    </div>
                  </div>

                  <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onSelectPlace(place)}
                      className="py-1.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-800 dark:text-slate-200 text-xs font-semibold"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => onAskConcierge(`Tell me all about visiting ${place.name} in ${place.region}`)}
                      className="py-1.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold flex items-center justify-center space-x-1"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Ask AI</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 2. Saved Itineraries View */}
      {activeSubView === 'trips' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <CalendarDays className="w-5 h-5 text-amber-500" />
              <span>Your Saved Rwanda Travel Itineraries</span>
            </h2>
            <button
              onClick={() => onNavigateTab('planner')}
              className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center space-x-1"
            >
              <span>Create New Trip</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {savedItineraries.length === 0 ? (
            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-12 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center text-amber-500">
                <CalendarDays className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">No saved trips yet</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Use the AI Trip Planner to create custom day-by-day itineraries and save them for your trip!
              </p>
              <button
                onClick={() => onNavigateTab('planner')}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-colors"
              >
                Plan a New Trip
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {savedItineraries.map((itinerary) => (
                <div
                  key={itinerary.id}
                  className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                        {itinerary.totalDays} Days
                      </span>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                        {itinerary.budgetTier} Tier
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white mt-1">
                      {itinerary.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2 max-w-xl">
                      {itinerary.summary}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <button
                      onClick={() => onAskConcierge(`Tell me all about my saved itinerary "${itinerary.title}" and practical preparations`)}
                      className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center space-x-1"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Review in Chat</span>
                    </button>

                    <button
                      onClick={() => onDeleteItinerary(itinerary.id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      title="Delete Saved Trip"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 3. Account & Membership Info */}
      {activeSubView === 'account' && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Membership & Credits
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-300/60 dark:border-amber-700/60 space-y-4">
              <div className="flex items-center space-x-2">
                <CrownIcon className="w-6 h-6 text-amber-500" />
                <h3 className="font-bold text-base text-amber-950 dark:text-amber-200">
                  Unlimited VIP Travel Concierge
                </h3>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Enjoy unlimited AI queries, real-time voice streaming with zero limits, instant multi-day itinerary generation, and priority offline access.
              </p>
              <div className="pt-2">
                <button
                  onClick={onOpenPaymentModal}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors"
                >
                  {isPremium ? 'Manage Membership' : 'Upgrade to Premium ($10 / 12,000 RWF)'}
                </button>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-750 border border-slate-200 dark:border-slate-700 space-y-3 text-xs text-slate-700 dark:text-slate-300">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Supported Payment Options in Rwanda:</h4>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>MTN MoMoPay (Code: 651631)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Equity Bank Rwanda (Account: 4002111867160)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Visa & Mastercard worldwide</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MyRwanda;
