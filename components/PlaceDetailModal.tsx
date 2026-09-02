import React from 'react';
import { Place } from '../types';
import { 
  X, 
  MapPin, 
  Clock, 
  DollarSign, 
  Star, 
  Heart, 
  Navigation, 
  Sparkles, 
  Phone, 
  Calendar,
  Share2,
  MessageSquare,
  Mail,
  Crown,
  ShieldCheck
} from 'lucide-react';
import { 
  ORGANIZATION_BOOKING_CONTACT, 
  createHotelWhatsAppUrl, 
  createHotelEmailUrl 
} from '../data/fiveStarHotelsData';

interface PlaceDetailModalProps {
  place: Place | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (placeId: string) => void;
  onGetDirections: (lat: number, lng: number, name: string) => void;
  onAskConcierge: (prompt: string) => void;
}


const PlaceDetailModal: React.FC<PlaceDetailModalProps> = ({
  place,
  onClose,
  isSaved,
  onToggleSave,
  onGetDirections,
  onAskConcierge,
}) => {
  if (!place) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs transition-all animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header Image with Floating Action Buttons */}
        <div className="relative h-64 sm:h-72 w-full flex-shrink-0">
          <img
            src={place.image}
            alt={place.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-xs transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            onClick={() => onToggleSave(place.id)}
            className={`absolute top-4 left-4 p-2.5 rounded-full backdrop-blur-xs transition-colors ${
              isSaved ? 'bg-rose-500 text-white' : 'bg-black/50 hover:bg-black/80 text-white'
            }`}
            title={isSaved ? 'Saved in My Rwanda' : 'Save Place'}
          >
            <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
          </button>

          <div className="absolute bottom-4 left-5 right-5 text-white">
            <span className="text-[11px] font-bold uppercase tracking-wider bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded-md">
              {place.region} · {place.category.replace('_', ' ')}
            </span>
            <h2 className="text-xl sm:text-2xl font-black mt-1.5">{place.name}</h2>
            {place.rating && (
              <div className="flex items-center space-x-1 mt-1 text-xs text-amber-300">
                <Star className="w-4 h-4 fill-current text-amber-400" />
                <span className="font-bold">{place.rating}</span>
                <span className="text-slate-300">({place.reviewsCount || 100}+ reviews)</span>
              </div>
            )}
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-slate-800 dark:text-slate-200 text-xs sm:text-sm">
          
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Overview
            </h3>
            <p className="leading-relaxed text-slate-700 dark:text-slate-300">
              {place.description}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60">
            <h4 className="font-bold text-xs uppercase tracking-wider text-amber-900 dark:text-amber-300 mb-1 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Why You Should Visit</span>
            </h4>
            <p className="text-slate-800 dark:text-slate-200 leading-relaxed">
              {place.whyVisit}
            </p>
          </div>

          {/* Quick Specifications Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {place.estimatedPrice && (
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-slate-500 dark:text-slate-400 block mb-0.5">💰 Price Guide</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">{place.estimatedPrice}</span>
              </div>
            )}

            {place.recommendedDuration && (
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-slate-500 dark:text-slate-400 block mb-0.5">⏱️ Recommended Time</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{place.recommendedDuration}</span>
              </div>
            )}

            {place.bestTimeToVisit && (
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-slate-500 dark:text-slate-400 block mb-0.5">☀️ Best Time to Visit</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{place.bestTimeToVisit}</span>
              </div>
            )}

            {place.openingHours && (
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-slate-500 dark:text-slate-400 block mb-0.5">🕒 Hours</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{place.openingHours}</span>
              </div>
            )}

            {place.contact && (
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 sm:col-span-2">
                <span className="font-bold text-slate-500 dark:text-slate-400 block mb-0.5">📞 Contact / Booking</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{place.contact}</span>
              </div>
            )}
          </div>

          {/* VIP Hotel Booking Banner if Category is Hotels or 5-Star Tag */}
          {(place.category === 'hotels' || place.tags?.includes('5-Star') || place.tags?.includes('Luxury')) && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-emerald-950/40 border border-amber-500/40 space-y-3">
              <div className="flex items-center space-x-2">
                <Crown className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  Direct VIP 5-Star Reservation Desk
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Book your stay at <strong className="text-white">{place.name}</strong> with the organization concierge for exclusive rates, guaranteed availability, and airport / safari coordination.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <a
                  href={createHotelWhatsAppUrl({ hotelName: place.name })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-current" />
                  <span>Book via WhatsApp (+250 781 121 179)</span>
                </a>

                <a
                  href={createHotelEmailUrl({ hotelName: place.name })}
                  className="py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2 shadow-md transition-all"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email: giniyomugabo@gmail.com</span>
                </a>
              </div>
            </div>
          )}

          {/* Tags */}
          {place.tags && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {place.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}


        </div>

        {/* Modal Action Buttons Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-2 flex-shrink-0">
          <button
            onClick={() => {
              onGetDirections(place.lat, place.lng, place.name);
              onClose();
            }}
            className="px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center space-x-1.5"
          >
            <Navigation className="w-4 h-4 text-emerald-600" />
            <span>Show on Map & Directions</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onAskConcierge(`Tell me everything I should know about visiting ${place.name} in ${place.region}, including practical tips, dress code, and best nearby spots.`);
            }}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold flex items-center space-x-1.5 shadow-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>Ask Rwanda AI About This</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default PlaceDetailModal;
