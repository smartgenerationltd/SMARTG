import React, { useState } from 'react';
import { CULTURAL_DISHES, KINYARWANDA_PHRASES, RWANDA_CULTURE_TOPICS } from '../data/rwandaCultureData';
import { RWANDA_NATIONAL_PARKS, NationalParkGuide } from '../data/rwandaNationalParksData';
import { KinyarwandaPhrase } from '../types';
import { voiceService } from '../services/voiceService';
import { geminiService } from '../services/geminiService';
import { 
  BookOpen, 
  Utensils, 
  Languages, 
  TreePine, 
  Sparkles, 
  Mic, 
  Volume2, 
  CheckCircle2, 
  Info, 
  Compass, 
  ArrowRight,
  Square,
  Award
} from 'lucide-react';

interface ExperienceRwandaProps {
  onAskConcierge: (prompt: string) => void;
  language: string;
}

const ExperienceRwanda: React.FC<ExperienceRwandaProps> = ({
  onAskConcierge,
  language
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'culture' | 'food' | 'phrases' | 'parks'>('phrases');
  const [practicingPhrase, setPracticingPhrase] = useState<KinyarwandaPhrase | null>(null);
  const [isListeningForPractice, setIsListeningForPractice] = useState(false);
  const [practiceFeedback, setPracticeFeedback] = useState<string | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [selectedPark, setSelectedPark] = useState<NationalParkGuide>(RWANDA_NATIONAL_PARKS[0]);

  const handleListenPronunciation = (phrase: KinyarwandaPhrase) => {
    voiceService.speak(phrase.kinyarwanda, 'Kinyarwanda');
  };

  const handleStartPractice = async (phrase: KinyarwandaPhrase) => {
    setPracticingPhrase(phrase);
    setPracticeFeedback(null);
    setIsListeningForPractice(true);

    voiceService.setCallbacks({
      onListeningStateChange: (listening) => setIsListeningForPractice(listening),
      onTranscriptChange: async (text, isFinal) => {
        if (isFinal) {
          voiceService.stopListening();
          setIsListeningForPractice(false);
          setIsEvaluating(true);
          const feedback = await geminiService.checkPronunciation(phrase, text, language);
          setPracticeFeedback(feedback);
          setIsEvaluating(false);
        }
      }
    });

    await voiceService.startListening('Kinyarwanda');
  };

  const handleStopPractice = () => {
    voiceService.stopListening();
    setIsListeningForPractice(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-amber-950 text-white p-6 sm:p-8 rounded-3xl border border-amber-400/20 shadow-xl">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Rwanda Cultural Experience</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Immerse Yourself in Rwandan Heritage
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
          Master essential Kinyarwanda greetings with AI voice feedback, explore authentic culinary traditions, and uncover the wonders of Rwanda’s 4 national parks.
        </p>

        {/* Sub-Tabs Nav */}
        <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-700/60 pt-4">
          {[
            { id: 'phrases', label: '🗣️ Kinyarwanda Phrasebook & Voice Coach' },
            { id: 'food', label: '🍲 Rwandan Cuisine & Drinks' },
            { id: 'parks', label: '🌲 4 National Parks In-Depth' },
            { id: 'culture', label: '🎭 Traditions & Etiquette' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeSubTab === tab.id
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-900/30 font-black'
                  : 'bg-white/10 hover:bg-white/20 text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. Kinyarwanda Phrasebook & AI Voice Coach */}
      {activeSubTab === 'phrases' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-700 pb-4 mb-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                  <Languages className="w-5 h-5 text-amber-500" />
                  <span>Essential Kinyarwanda Phrases with Voice Coach</span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Listen to native pronunciations, tap the mic to practice speaking, and receive immediate coaching from Rwanda AI.
                </p>
              </div>
            </div>

            {/* Interactive Voice Practice Feedback Banner */}
            {practicingPhrase && (
              <div className="mb-6 p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-sky-950 text-white border border-amber-400/40 shadow-md space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-amber-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                      Practicing: "{practicingPhrase.kinyarwanda}" ({practicingPhrase.pronunciation})
                    </span>
                  </div>
                  {isListeningForPractice && (
                    <button
                      onClick={handleStopPractice}
                      className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center space-x-1"
                    >
                      <Square className="w-3 h-3" />
                      <span>Stop Listening</span>
                    </button>
                  )}
                </div>

                {isListeningForPractice && (
                  <div className="flex items-center space-x-3 py-2">
                    <div className="w-4 h-4 rounded-full bg-emerald-400 animate-ping" />
                    <p className="text-sm font-semibold text-emerald-300">
                      Listening... Speak the phrase into your microphone now!
                    </p>
                  </div>
                )}

                {isEvaluating && (
                  <div className="flex items-center space-x-2 py-2 text-amber-300 text-sm">
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>AI Coach is analyzing your pronunciation...</span>
                  </div>
                )}

                {practiceFeedback && (
                  <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-200 leading-relaxed">
                    <span className="font-bold text-amber-400 block mb-1">Coach Feedback:</span>
                    {practiceFeedback}
                  </div>
                )}
              </div>
            )}

            {/* Phrases Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {KINYARWANDA_PHRASES.map((phrase, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 dark:bg-slate-750 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between space-y-3 hover:border-amber-400 transition-colors"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                        {phrase.phrase}
                      </span>
                      <button
                        onClick={() => handleListenPronunciation(phrase)}
                        className="p-1.5 rounded-lg bg-white dark:bg-slate-700 hover:bg-amber-100 dark:hover:bg-amber-950/60 text-amber-600 dark:text-amber-400 shadow-xs"
                        title="Listen"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mt-1">
                      <h3 className="text-lg font-black text-slate-900 dark:text-white">
                        {phrase.kinyarwanda}
                      </h3>
                      <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                        Phonetic: [{phrase.pronunciation}]
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">
                      💡 {phrase.context}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <button
                      onClick={() => handleStartPractice(phrase)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center space-x-1.5 shadow-xs transition-colors"
                    >
                      <Mic className="w-3.5 h-3.5" />
                      <span>Practice with Mic</span>
                    </button>

                    <button
                      onClick={() => onAskConcierge(`Explain how to use the Kinyarwanda phrase "${phrase.kinyarwanda}" in daily interactions with locals`)}
                      className="text-xs text-slate-500 hover:text-amber-600 dark:text-slate-400 font-semibold"
                    >
                      Learn more →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. Food & Drinks Showcase */}
      {activeSubTab === 'food' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center space-x-2">
              <Utensils className="w-5 h-5 text-amber-500" />
              <span>Authentic Rwandan Food & Drinks</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Rwandan cuisine celebrates organic local ingredients from volcanic fertile soils: plantains, cassava leaves, fresh lake fish, and slow-roasted meats.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CULTURAL_DISHES.map((dish, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 dark:bg-slate-750 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <img
                      src={dish.image}
                      alt={dish.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-5">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-base text-slate-900 dark:text-white">
                          {dish.name}
                        </h3>
                        {dish.kinyarwandaName && (
                          <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                            {dish.kinyarwandaName}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                        {dish.description}
                      </p>

                      <div className="mt-4 space-y-2 text-xs">
                        <div>
                          <span className="font-bold text-slate-700 dark:text-slate-300">Key Ingredients: </span>
                          <span className="text-slate-600 dark:text-slate-400">{dish.ingredients.join(', ')}</span>
                        </div>
                        <div>
                          <span className="font-bold text-slate-700 dark:text-slate-300">Social Tradition: </span>
                          <span className="text-slate-600 dark:text-slate-400">{dish.howItsEnjoyed}</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-300">
                          <span className="font-bold">📍 Where to Taste: </span>
                          <span>{dish.whereToTry}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <button
                      onClick={() => onAskConcierge(`Where are the best spots in Kigali to eat authentic ${dish.name} and what is the typical price?`)}
                      className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Ask AI for Restaurant Recommendations</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. 4 National Parks In-Depth */}
      {activeSubTab === 'parks' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center space-x-2">
              <TreePine className="w-5 h-5 text-emerald-600" />
              <span>Rwanda’s 4 Protected National Parks</span>
            </h2>

            {/* Park Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
              {RWANDA_NATIONAL_PARKS.map((park) => (
                <button
                  key={park.id}
                  onClick={() => setSelectedPark(park)}
                  className={`p-3 rounded-2xl text-left border transition-all ${
                    selectedPark.id === park.id
                      ? 'bg-emerald-600 text-white border-emerald-600 font-bold shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-[10px] opacity-80 uppercase block">{park.size}</span>
                  <span className="text-xs font-bold line-clamp-1">{park.name.split('(')[0]}</span>
                </button>
              ))}
            </div>

            {/* Selected Park Details */}
            <div className="space-y-6">
              <div className="relative rounded-3xl overflow-hidden h-64 sm:h-80 border border-slate-200 dark:border-slate-700">
                <img
                  src={selectedPark.image}
                  alt={selectedPark.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs uppercase font-bold text-amber-400 bg-black/50 px-2.5 py-1 rounded-md">
                    {selectedPark.ecosystem} · {selectedPark.altitude}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black mt-2">{selectedPark.name}</h3>
                  <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-xl">{selectedPark.tagline}</p>
                </div>
              </div>

              {/* Park Specs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Signature Activities */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center space-x-1.5">
                    <Compass className="w-4 h-4 text-amber-500" />
                    <span>Signature Activities & Permits</span>
                  </h4>
                  <div className="space-y-2.5">
                    {selectedPark.signatureActivities.map((act, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600/60"
                      >
                        <div className="flex items-center justify-between">
                          <h5 className="font-bold text-xs text-slate-900 dark:text-white">{act.name}</h5>
                          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                            {act.permitPriceGuide}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">{act.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Wildlife & Practical Guidance */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                      Key Wildlife & Fauna
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedPark.keyWildlife.map((w, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-600"
                        >
                          🐾 {w}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs text-slate-700 dark:text-slate-300 space-y-2">
                    <h5 className="font-bold text-amber-900 dark:text-amber-300">How to Get There & Best Timing:</h5>
                    <p>🚗 <strong>Transport:</strong> {selectedPark.howToGetThere}</p>
                    <p>☀️ <strong>Best Season:</strong> {selectedPark.bestSeasons}</p>
                  </div>

                  <button
                    onClick={() => onAskConcierge(`Give me full details, lodging options, and packing advice for visiting ${selectedPark.name}`)}
                    className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center space-x-2 shadow-xs transition-colors"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Plan a Trip to {selectedPark.name.split('(')[0]}</span>
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Traditions & Etiquette */}
      {activeSubTab === 'culture' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-amber-500" />
              <span>Rwandan Customs, Traditions & Etiquette</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Rwanda is built on core homegrown initiatives that foster dignity, cleanliness, and unity.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {RWANDA_CULTURE_TOPICS.map((topic, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 dark:bg-slate-750 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 space-y-3"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                      {topic.subtitle}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                      {topic.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {topic.description}
                  </p>

                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-300">
                    <strong>💡 Traveler Tip: </strong>{topic.travelerTip}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ExperienceRwanda;
