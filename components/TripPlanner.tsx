import React, { useState } from 'react';
import { TripPlanQuery, GeneratedItinerary, TravelStyle } from '../types';
import { geminiService } from '../services/geminiService';
import { 
  CalendarDays, 
  Sparkles, 
  MapPin, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  Share2, 
  Bookmark, 
  BookmarkCheck, 
  RefreshCw, 
  SlidersHorizontal,
  Compass,
  ArrowRight,
  Printer,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface TripPlannerProps {
  onSaveItinerary: (itinerary: GeneratedItinerary) => void;
  savedItineraries: GeneratedItinerary[];
  onOpenInChat: (message: string) => void;
  language: string;
}

const AVAILABLE_STYLES: TravelStyle[] = [
  'Wildlife',
  'Adventure',
  'Culture',
  'Food',
  'Luxury',
  'Budget',
  'Romantic',
  'Family',
  'Nature',
  'Photography',
  'Wellness',
  'Business'
];

const TripPlanner: React.FC<TripPlannerProps> = ({
  onSaveItinerary,
  savedItineraries,
  onOpenInChat,
  language
}) => {
  const [formData, setFormData] = useState<TripPlanQuery>({
    arrivalDate: '2026-06-10',
    departureDate: '2026-06-14',
    travelersCount: 2,
    budgetLevel: 'Moderate',
    styles: ['Wildlife', 'Culture', 'Nature'],
    pace: 'Moderate',
    transport: 'Private Chauffeur / Tour Van',
    notes: 'Excited for mountain gorillas, Kigali art, and Rwandan food!'
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [currentItinerary, setCurrentItinerary] = useState<GeneratedItinerary | null>(null);
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [activeRefinement, setActiveRefinement] = useState<string>('');

  const toggleStyle = (style: TravelStyle) => {
    setFormData((prev) => {
      const exists = prev.styles.includes(style);
      if (exists) {
        if (prev.styles.length === 1) return prev; // keep at least 1
        return { ...prev, styles: prev.styles.filter((s) => s !== style) };
      } else {
        return { ...prev, styles: [...prev.styles, style] };
      }
    });
  };

  const handleGenerate = async (customInstruction?: string) => {
    setIsGenerating(true);
    try {
      const queryToUse = customInstruction 
        ? { ...formData, notes: `${formData.notes ? formData.notes + '. ' : ''}${customInstruction}` }
        : formData;

      const itinerary = await geminiService.generateItinerary(queryToUse, language);
      setCurrentItinerary(itinerary);
      setExpandedDay(1);
    } catch (err) {
      console.warn('Trip planner error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRefine = (refinementText: string) => {
    setActiveRefinement(refinementText);
    handleGenerate(refinementText);
  };

  const isSaved = currentItinerary ? savedItineraries.some((item) => item.id === currentItinerary.id) : false;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      
      {/* Planner Header */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-amber-400/20 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
              <CalendarDays className="w-3.5 h-3.5" />
              <span>Smart Itinerary Architect</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Plan Your Dream Rwandan Journey
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Tell Rwanda AI your dates, group size, and travel style to generate a day-by-day tailored itinerary with budgets, activities, and local tips.
            </p>
          </div>
          {currentItinerary && (
            <button
              onClick={() => setCurrentItinerary(null)}
              className="self-start sm:self-auto px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 border border-slate-700 flex items-center space-x-1.5 transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Adjust Preferences</span>
            </button>
          )}
        </div>
      </div>

      {!currentItinerary ? (
        /* Configuration Form */
        <div className="bg-white dark:bg-slate-800/90 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 shadow-sm space-y-6">
          
          {/* Dates & Travelers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Arrival Date
              </label>
              <input
                type="date"
                value={formData.arrivalDate}
                onChange={(e) => setFormData({ ...formData, arrivalDate: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Departure Date
              </label>
              <input
                type="date"
                value={formData.departureDate}
                onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Travelers
              </label>
              <select
                value={formData.travelersCount}
                onChange={(e) => setFormData({ ...formData, travelersCount: Number(e.target.value) })}
                className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                <option value={1}>Solo Explorer (1 traveler)</option>
                <option value={2}>Couple / 2 Travelers</option>
                <option value={3}>Small Group (3 travelers)</option>
                <option value={4}>Family / Group (4 travelers)</option>
                <option value={6}>Large Group (6+ travelers)</option>
              </select>
            </div>
          </div>

          {/* Travel Styles Multi-Select */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
              Travel Styles (Pick what you love)
            </label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_STYLES.map((style) => {
                const selected = formData.styles.includes(style);
                return (
                  <button
                    key={style}
                    type="button"
                    onClick={() => toggleStyle(style)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                      selected
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                    }`}
                  >
                    {selected ? '✓ ' : '+ '}{style}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Budget, Pace, Transport */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Budget Tier
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {(['Budget', 'Moderate', 'Luxury'] as const).map((tier) => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setFormData({ ...formData, budgetLevel: tier })}
                    className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                      formData.budgetLevel === tier
                        ? 'bg-emerald-600 text-white border-emerald-600 font-bold'
                        : 'bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Travel Pace
              </label>
              <select
                value={formData.pace}
                onChange={(e) => setFormData({ ...formData, pace: e.target.value as any })}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-amber-500"
              >
                <option value="Relaxed">Relaxed (1-2 activities/day)</option>
                <option value="Moderate">Moderate (Balanced highlights)</option>
                <option value="Fast-paced">Fast-Paced (Cover maximum ground)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Transport Preference
              </label>
              <select
                value={formData.transport}
                onChange={(e) => setFormData({ ...formData, transport: e.target.value as any })}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-amber-500"
              >
                <option value="Private Chauffeur / Tour Van">Private Chauffeur & 4x4 Safari Van</option>
                <option value="Rental Car">Self-Drive Rental 4x4</option>
                <option value="Public / Moto">Public Buses, Moto-Taxis & Local</option>
              </select>
            </div>
          </div>

          {/* Special Notes / Interests */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Specific Wishes or Requirements (Optional)
            </label>
            <textarea
              rows={2}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="e.g. Vegetarian food options, want to visit Dian Fossey tomb, or have elderly travelers..."
              className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              onClick={() => handleGenerate()}
              disabled={isGenerating}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-extrabold text-sm sm:text-base shadow-lg shadow-amber-900/20 flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Rwanda AI is crafting your customized itinerary...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Generate Customized Rwanda Itinerary</span>
                </>
              )}
            </button>
          </div>

        </div>
      ) : (
        /* Generated Itinerary Display */
        <div className="space-y-6">
          
          {/* Top Itinerary Summary Card */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-700 pb-6">
              <div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  {currentItinerary.totalDays} Days · {currentItinerary.budgetTier} Tier
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                  {currentItinerary.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  {currentItinerary.summary}
                </p>
              </div>

              <div className="flex items-center space-x-2 self-start sm:self-auto flex-shrink-0">
                <button
                  onClick={() => onSaveItinerary(currentItinerary)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-colors ${
                    isSaved
                      ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-700'
                      : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  {isSaved ? <BookmarkCheck className="w-4 h-4 text-rose-600" /> : <Bookmark className="w-4 h-4" />}
                  <span>{isSaved ? 'Saved in My Trips' : 'Save Itinerary'}</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-300"
                  title="Print / Save PDF"
                >
                  <Printer className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Essential Practical Tips */}
            {currentItinerary.essentialTips && currentItinerary.essentialTips.length > 0 && (
              <div className="mt-4 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60">
                <h4 className="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                  <span>Key Trip Essentials & Tips</span>
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                  {currentItinerary.essentialTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Quick AI Refinements Bar */}
          <div className="bg-slate-900 text-white rounded-2xl p-4 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span className="text-xs font-bold text-slate-200">Refine this plan with AI:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                'Make it more budget-friendly',
                'Add more wildlife & safaris',
                'Focus on culture & food',
                'Add Lake Kivu relaxation',
                'Make it more adventurous'
              ].map((refine, idx) => (
                <button
                  key={idx}
                  onClick={() => handleRefine(refine)}
                  disabled={isGenerating}
                  className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-slate-300 border border-slate-700 transition-colors disabled:opacity-50"
                >
                  {refine}
                </button>
              ))}
            </div>
          </div>

          {/* Day by Day Cards */}
          <div className="space-y-4">
            {currentItinerary.days.map((day) => {
              const isExpanded = expandedDay === day.dayNumber;
              return (
                <div
                  key={day.dayNumber}
                  className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-xs transition-all"
                >
                  <button
                    onClick={() => setExpandedDay(isExpanded ? null : day.dayNumber)}
                    className="w-full p-5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-black text-sm flex items-center justify-center flex-shrink-0">
                        Day {day.dayNumber}
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                          📍 {day.locationTitle}
                        </span>
                        <h3 className="font-bold text-base text-slate-900 dark:text-white">
                          {day.theme}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      {day.estimatedDayCost && (
                        <span className="hidden sm:inline-block text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                          {day.estimatedDayCost}
                        </span>
                      )}
                      {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-700/80 space-y-4">
                      <p className="text-xs text-slate-600 dark:text-slate-300 italic pt-3">
                        {day.daySummary}
                      </p>

                      <div className="space-y-3 mt-3">
                        {day.activities.map((act, actIdx) => (
                          <div
                            key={actIdx}
                            className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600/80 space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-200">
                                {act.timeSlot}
                              </span>
                              <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
                                {act.travelTime && <span>🚗 {act.travelTime}</span>}
                                {act.estimatedCost && (
                                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                                    💰 {act.estimatedCost}
                                  </span>
                                )}
                              </div>
                            </div>

                            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                              {act.title}
                            </h4>
                            <p className="text-xs text-slate-600 dark:text-slate-300">
                              {act.description}
                            </p>

                            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
                              <span className="text-slate-500 dark:text-slate-400 font-medium">
                                📍 {act.location}
                              </span>
                              {act.tips && (
                                <span className="text-amber-700 dark:text-amber-300 text-[11px] bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-md">
                                  💡 {act.tips}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Day Action Buttons */}
                      <div className="flex items-center justify-end space-x-2 pt-2">
                        <button
                          onClick={() => onOpenInChat(`Tell me more about Day ${day.dayNumber} in ${day.locationTitle} and recommended hotels nearby`)}
                          className="text-xs px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold flex items-center space-x-1"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Ask Concierge About Day {day.dayNumber}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
};

export default TripPlanner;
