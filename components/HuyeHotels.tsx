import React from 'react';
import HotelIcon from './icons/HotelIcon';
import PhoneIcon from './icons/PhoneIcon';
import EmailIcon from './icons/EmailIcon';
import { huyeHotelsData as hotelData } from '../data/huyeHotelsData';
import { 
  createHotelWhatsAppUrl, 
  createHotelEmailUrl, 
  ORGANIZATION_BOOKING_CONTACT 
} from '../data/fiveStarHotelsData';
import { MessageSquare, Mail } from 'lucide-react';

const SourceTag: React.FC<{ source: string }> = ({ source }) => {
    const [name, value] = source.split('+');
    return (
        <span className="inline-block bg-gray-200 dark:bg-gray-700 rounded-md px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-300 mr-1.5 mb-1.5">
            {name.trim()}
            {value && <span className="ml-1 opacity-70">+{value.trim()}</span>}
        </span>
    );
};

const HuyeHotels: React.FC = () => {
    return (
        <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg overflow-hidden">
            <header className="bg-white dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                    <HotelIcon className="h-6 w-6 text-blue-500" />
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Hotels in Huye (Butare)</h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Accommodations near National Ethnographic Museum & University</p>
                    </div>
                </div>

                <a
                    href={`https://wa.me/${ORGANIZATION_BOOKING_CONTACT.whatsappRaw}?text=${encodeURIComponent('Hello Rwanda Concierge, I would like to book a hotel in Huye (Butare).')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center space-x-1 self-start sm:self-auto"
                >
                    <MessageSquare className="w-3.5 h-3.5 fill-current" />
                    <span>WhatsApp Booking Desk</span>
                </a>
            </header>

            <div className="p-4 md:p-6 space-y-4">
                {hotelData.map((hotel, index) => {
                    const whatsAppUrl = createHotelWhatsAppUrl({ hotelName: `${hotel.name} (Huye)` });
                    const emailUrl = createHotelEmailUrl({ hotelName: `${hotel.name} (Huye)` });

                    return (
                        <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 transition-shadow hover:shadow-md flex flex-col justify-between space-y-3">
                            <div>
                                <h3 className="font-bold text-lg text-blue-600 dark:text-amber-400">{hotel.name}</h3>
                                {hotel.description && <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 mb-3">{hotel.description}</p>}
                                
                                <div className="my-3 space-y-2">
                                    {hotel.phone && hotel.phone.length > 0 && (
                                        <div className="flex items-start space-x-2">
                                            <PhoneIcon className="h-5 w-5 text-gray-500 dark:text-gray-400 mt-0.5 flex-shrink-0" />
                                            <div className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                                                {hotel.phone.join(' · ')}
                                            </div>
                                        </div>
                                    )}
                                    {hotel.email && (
                                        <div className="flex items-start space-x-2">
                                            <EmailIcon className="h-5 w-5 text-gray-500 dark:text-gray-400 mt-0.5 flex-shrink-0" />
                                            <span className="text-sm text-gray-700 dark:text-gray-300">{hotel.email}</span>
                                        </div>
                                    )}
                                </div>
                                
                                {hotel.sources && hotel.sources.length > 0 && (
                                    <div className="border-t border-gray-200 dark:border-gray-700 mt-3 pt-3">
                                        {hotel.sources.map((src, i) => <SourceTag key={i} source={src} />)}
                                    </div>
                                )}
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
                                    <span>Book WhatsApp</span>
                                </a>
                                <a
                                    href={emailUrl}
                                    className="flex-1 py-2 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-1.5 shadow-xs transition-colors"
                                >
                                    <Mail className="w-3.5 h-3.5" />
                                    <span>Book Email</span>
                                </a>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HuyeHotels;

