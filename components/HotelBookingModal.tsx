import React, { useState } from 'react';
import { FiveStarHotel } from '../types';
import { 
  ORGANIZATION_BOOKING_CONTACT, 
  createHotelWhatsAppUrl, 
  createHotelEmailUrl 
} from '../data/fiveStarHotelsData';
import { 
  X, 
  MessageSquare, 
  Mail, 
  Phone, 
  Calendar, 
  Users, 
  Bed, 
  Sparkles, 
  CheckCircle2, 
  Copy, 
  ExternalLink,
  ShieldCheck,
  Star
} from 'lucide-react';

interface HotelBookingModalProps {
  hotel: FiveStarHotel | null;
  onClose: () => void;
}

const HotelBookingModal: React.FC<HotelBookingModalProps> = ({ hotel, onClose }) => {
  if (!hotel) return null;

  // Defaults: tomorrow for check-in, 3 days later for check-out
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const nextThreeDays = new Date(today);
  nextThreeDays.setDate(today.getDate() + 4);

  const tomorrowStr = tomorrow.toISOString().split('T')[0];
  const nextThreeDaysStr = nextThreeDays.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState<string>(tomorrowStr);
  const [checkOut, setCheckOut] = useState<string>(nextThreeDaysStr);
  const [guests, setGuests] = useState<number>(2);
  const [roomType, setRoomType] = useState<string>(hotel.roomTypes?.[0] || 'Luxury Suite');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [copiedContact, setCopiedContact] = useState<string | null>(null);

  const whatsAppUrl = createHotelWhatsAppUrl({
    hotelName: hotel.name,
    checkIn,
    checkOut,
    guests,
    roomType,
    specialRequests: specialRequests.trim() || undefined
  });

  const emailUrl = createHotelEmailUrl({
    hotelName: hotel.name,
    checkIn,
    checkOut,
    guests,
    roomType,
    specialRequests: specialRequests.trim() || undefined
  });

  const handleCopyContact = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedContact(label);
    setTimeout(() => setCopiedContact(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header with Hotel Info */}
        <div className="relative h-44 sm:h-52 w-full flex-shrink-0">
          <img
            src={hotel.image}
            alt={hotel.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white backdrop-blur-md transition-colors border border-slate-700"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-3 left-5 right-5 text-white">
            <div className="flex items-center space-x-2">
              <span className="flex items-center text-xs font-bold bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded-md">
                <Star className="w-3.5 h-3.5 fill-current text-slate-950 mr-1" />
                5-STAR LUXURY
              </span>
              <span className="text-xs text-amber-300 font-semibold">{hotel.region}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black mt-1 text-white truncate">{hotel.name}</h2>
            <p className="text-xs text-slate-300 flex items-center space-x-1 mt-0.5">
              <span>{hotel.priceRange}</span>
              <span>·</span>
              <span className="text-emerald-400 font-semibold">{hotel.location}</span>
            </p>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-slate-200 text-xs sm:text-sm">
          
          {/* VIP Booking Guarantee Banner */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-amber-950/40 border border-emerald-500/40 flex items-start space-x-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-white text-xs sm:text-sm">Direct VIP Concierge Booking</p>
              <p className="text-[11px] sm:text-xs text-slate-300 mt-0.5">
                Instant reservation assistance via official WhatsApp (<span className="text-emerald-400 font-mono font-semibold">+250 781 121 179</span>) or Email (<span className="text-amber-300 font-semibold">giniyomugabo@gmail.com</span>). Best available 5-star rates & tailored itinerary coordination guaranteed.
              </p>
            </div>
          </div>

          {/* Booking Parameters Form */}
          <div className="space-y-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
            <h3 className="font-bold text-xs uppercase tracking-wider text-amber-400 flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Customize Your Reservation</span>
            </h3>

            {/* Dates Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>Check-In Date</span>
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-medium text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>Check-Out Date</span>
                </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-medium text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Guests & Room Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center space-x-1">
                  <Users className="w-3.5 h-3.5 text-amber-400" />
                  <span>Number of Guests</span>
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-medium text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value={1}>1 Guest (Solo Traveler)</option>
                  <option value={2}>2 Guests (Couple / Pair)</option>
                  <option value={3}>3 Guests</option>
                  <option value={4}>4 Guests (Family Suite)</option>
                  <option value={6}>5-6 Guests (Exclusive Villa)</option>
                  <option value={10}>Group / VIP Delegation (7+)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center space-x-1">
                  <Bed className="w-3.5 h-3.5 text-amber-400" />
                  <span>Room Preference</span>
                </label>
                <select
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-medium text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {hotel.roomTypes?.map((rt, idx) => (
                    <option key={idx} value={rt}>
                      {rt}
                    </option>
                  )) || <option value="Luxury Suite">Luxury Suite</option>}
                </select>
              </div>
            </div>

            {/* Special Concierge Requests */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Special Requests & Concierge Services (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g., VIP Airport Pick-up, Gorilla permit help, Champagne on arrival, Helicopter charter"
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Contact Direct Copy Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">WhatsApp & Calls</span>
                  <span className="font-mono font-bold text-white">+250 781 121 179</span>
                </div>
              </div>
              <button
                onClick={() => handleCopyContact('+250781121179', 'phone')}
                className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition-colors"
                title="Copy phone"
              >
                {copiedContact === 'phone' ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div className="truncate">
                  <span className="text-[10px] text-slate-400 block font-semibold">Direct Email</span>
                  <span className="font-bold text-white truncate block max-w-[140px]">giniyomugabo@gmail.com</span>
                </div>
              </div>
              <button
                onClick={() => handleCopyContact('giniyomugabo@gmail.com', 'email')}
                className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition-colors"
                title="Copy email"
              >
                {copiedContact === 'email' ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

        </div>

        {/* Primary Action Buttons Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
          
          {/* 1. Book via WhatsApp Button (Highest Priority) */}
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-lg shadow-emerald-950/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>Book via WhatsApp (+250 781 121 179)</span>
          </a>

          {/* 2. Book via Email Button */}
          <a
            href={emailUrl}
            className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-lg shadow-amber-950/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Mail className="w-4 h-4" />
            <span>Book via Email (giniyomugabo@gmail.com)</span>
          </a>

        </div>

      </div>
    </div>
  );
};

export default HotelBookingModal;
