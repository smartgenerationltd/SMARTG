import React from 'react';
import HotelIcon from './icons/HotelIcon';
import MapPinIcon from './icons/MapPinIcon';
import { volcanoesHotelsData as hotelData } from '../data/volcanoesHotelsData';
import { 
  createHotelWhatsAppUrl, 
  createHotelEmailUrl, 
  ORGANIZATION_BOOKING_CONTACT 
} from '../data/fiveStarHotelsData';
import { MessageSquare, Mail, Crown, ShieldCheck } from 'lucide-react';

const SourceTag: React.FC<{ source: string }> = ({ source }) => {
    const [name, value] = source.split('+');
    return (
        <span className="inline-block bg-gray-200 dark:bg-gray-700 rounded-md px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-300 mr-1.5 mb-1.5">
            {name.trim()}
            {value && <span className="ml-1 opacity-70">+{value.trim()}</span>}
        </span>
    );
};

const HotelCategory: React.FC<{title: string, hotels: typeof hotelData.luxury}> = ({ title, hotels }) => (
    <section>
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center space-x-2">
                <span>{title}</span>
            </h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {hotels.map((hotel, index) => {
                const whatsAppUrl = createHotelWhatsAppUrl({ hotelName: `${hotel.name} (Volcanoes NP)` });
                const emailUrl = createHotelEmailUrl({ hotelName: `${hotel.name} (Volcanoes NP)` });

                return (
                    <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 transition-shadow hover:shadow-lg flex flex-col justify-between space-y-3">
                        <div>
                            <h4 className="font-bold text-blue-600 dark:text-amber-400 text-base">{hotel.name}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 mb-3">{hotel.description}</p>
                            <div>
                                {hotel.sources.map((src, i) => <SourceTag key={i} source={src} />)}
                            </div>
                        </div>

                        {/* Booking Action Buttons */}
                        <div className="pt-2 border-t border-gray-100 dark:border-gray-700 flex flex-wrap items-center gap-2">
                            <a
                                href={whatsAppUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-xs transition-colors"
                            >
                                <MessageSquare className="w-3.5 h-3.5 fill-current" />
                                <span>WhatsApp (+250)</span>
                            </a>
                            <a
                                href={emailUrl}
                                className="flex-1 py-2 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-1.5 shadow-xs transition-colors"
                            >
                                <Mail className="w-3.5 h-3.5" />
                                <span>Email Booking</span>
                            </a>
                        </div>
                    </div>
                );
            })}
        </div>
    </section>
);


const VolcanoesHotels: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg overflow-hidden">
        <header className="bg-white dark:bg-gray-900 p-5 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                    <Crown className="h-6 w-6 text-amber-500" />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Hotels & Lodges: Volcanoes National Park</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Gorilla trekking luxury lodges and boutique accommodations</p>
                </div>
            </div>

            <div className="flex items-center space-x-2 text-xs">
                <a
                    href={`https://wa.me/${ORGANIZATION_BOOKING_CONTACT.whatsappRaw}?text=${encodeURIComponent('Hello Rwanda Concierge, I would like to book a Volcanoes National Park hotel or lodge.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold flex items-center space-x-1"
                >
                    <MessageSquare className="w-3 h-3 fill-current" />
                    <span>WhatsApp Booking Desk</span>
                </a>
            </div>
        </header>

        <div className="p-6 space-y-6">
            <HotelCategory title="Luxury & 5-Star Lodges" hotels={hotelData.luxury} />
            <div className="border-t border-gray-200 dark:border-gray-700"></div>
            <HotelCategory title="Mid-Range & Comfortable" hotels={hotelData.midRange} />
            <div className="border-t border-gray-200 dark:border-gray-700"></div>
            <HotelCategory title="Budget & Guesthouses" hotels={hotelData.budget} />
            <div className="border-t border-gray-200 dark:border-gray-700"></div>
            
            <section>
                 <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Where They’re Located</h3>
                 <div className="space-y-4">
                    {hotelData.locations.map((loc, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex items-start space-x-4">
                            <MapPinIcon className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                            <div className="flex-1">
                                <h4 className="font-semibold text-green-700 dark:text-green-400">{loc.name}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 mb-3">{loc.description}</p>
                                <div>
                                    {loc.sources.map((src, i) => <SourceTag key={i} source={src} />)}
                                </div>
                            </div>
                        </div>
                    ))}
                 </div>
            </section>
        </div>
    </div>
  );
};

export default VolcanoesHotels;

