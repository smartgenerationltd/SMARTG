import React from 'react';
import RwandaIcon from './components/icons/RwandaIcon';
import { Sparkles, Mic, MapPin, CalendarDays } from 'lucide-react';

interface WelcomeScreenProps {
  welcomeTitle: string;
  welcomeSubtitle: string;
  onQuickPrompt?: (prompt: string) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ 
  welcomeTitle, 
  welcomeSubtitle,
  onQuickPrompt
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center px-4 max-w-xl mx-auto space-y-6">
      <div className="p-4 bg-gradient-to-tr from-amber-400/20 to-emerald-400/20 border border-amber-400/30 rounded-3xl shadow-sm">
        <RwandaIcon className="h-16 w-16 text-[#00A1DE]" />
      </div>

      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-amber-300">
          {welcomeTitle || 'Rwanda AI Travel Concierge'}
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {welcomeSubtitle || 'Discover Rwanda through an AI that speaks your language. Ask about mountain gorillas, safari parks, vibrant Kigali neighborhoods, or plan your complete itinerary.'}
        </p>
      </div>

      {onQuickPrompt && (
        <div className="w-full space-y-2 pt-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Or try one of these questions:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              '🦍 How to get gorilla permits in Volcanoes National Park?',
              '🦁 Best 3-day Big 5 safari in Akagera',
              '☕ Top specialty coffee spots in Kigali',
              '🍲 Authentic Rwandan traditional dishes to try'
            ].map((q, idx) => (
              <button
                key={idx}
                onClick={() => onQuickPrompt(q)}
                className="p-3 text-left rounded-xl bg-white dark:bg-slate-800 hover:border-amber-400 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-all shadow-xs"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomeScreen;
