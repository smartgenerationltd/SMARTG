import React from 'react';
import { SAFETY_CONTACTS, SAFETY_GUIDELINES } from '../data/rwandaSafetyData';
import { 
  ShieldAlert, 
  PhoneCall, 
  HeartPulse, 
  MapPin, 
  Sparkles, 
  ShieldCheck, 
  Leaf, 
  Compass, 
  CreditCard,
  AlertTriangle
} from 'lucide-react';

interface SafetyAssistantProps {
  onAskConcierge: (prompt: string) => void;
}

const SafetyAssistant: React.FC<SafetyAssistantProps> = ({ onAskConcierge }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-rose-400/20 shadow-xl">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold uppercase tracking-wider mb-2">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Traveler Security & Emergency Directory</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Rwanda Safety & Healthcare Guide
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
          Rwanda is globally recognized as one of the world’s safest countries. Keep these 24/7 direct emergency lines and healthcare recommendations at hand.
        </p>
      </div>

      {/* 24/7 Direct Emergency Numbers Grid */}
      <section className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <PhoneCall className="w-5 h-5 text-rose-500" />
              <span>Emergency Dispatch & Hospital Numbers</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Tap any number to call directly from your mobile phone.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SAFETY_CONTACTS.map((contact, idx) => (
            <div
              key={idx}
              className="bg-slate-50 dark:bg-slate-750 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between space-y-3 hover:border-rose-300 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                    contact.category === 'emergency'
                      ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                      : contact.category === 'hospital'
                      ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}>
                    {contact.category}
                  </span>
                  {contact.location && (
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center space-x-0.5">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate max-w-[120px]">{contact.location.split(',')[0]}</span>
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-sm text-slate-900 dark:text-white mt-2">
                  {contact.service}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  {contact.description}
                </p>
              </div>

              <a
                href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}
                className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 hover:text-amber-200 font-mono text-xs font-bold flex items-center justify-center space-x-2 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call: {contact.phone}</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Safety Guidelines Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SAFETY_GUIDELINES.map((guide, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm space-y-3"
          >
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <span>{guide.category}</span>
            </h3>

            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              {guide.tips.map((tip, tipIdx) => (
                <li key={tipIdx} className="flex items-start space-x-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span className="leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Ask Safety AI Box */}
      <div className="bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-sky-500/10 dark:from-slate-800 dark:to-slate-800 border border-amber-300/60 dark:border-slate-700 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Have a specific health, visa, or safety question?</span>
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
            Ask our AI Travel Concierge for personalized health advisories, yellow fever requirements, or night travel safety in Kigali.
          </p>
        </div>
        <button
          onClick={() => onAskConcierge('What are the medical and vaccine requirements for traveling in Rwanda, and what safety advice should I follow?')}
          className="self-start sm:self-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold flex items-center space-x-1.5 shadow-xs transition-colors"
        >
          <Sparkles className="w-4 h-4" />
          <span>Ask Safety Concierge</span>
        </button>
      </div>

    </div>
  );
};

export default SafetyAssistant;
