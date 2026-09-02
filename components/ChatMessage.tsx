import React, { useState } from 'react';
import { Message } from '../types';
import RwandaIcon from './icons/RwandaIcon';
import VolcanoesHotels from './VolcanoesHotels';
import HuyeHotels from './HuyeHotels';
import { voiceService } from '../services/voiceService';
import { 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  MapPin, 
  Sparkles 
} from 'lucide-react';

interface ChatMessageProps {
  message: Message;
  isLoading?: boolean;
  language?: string;
  onSelectMapDestination?: (lat: number, lng: number, name: string) => void;
}

const LoadingIndicator: React.FC = () => (
  <div className="flex items-center space-x-2 py-1">
    <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"></div>
    <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
    <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
  </div>
);

const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  isLoading = false,
  language = 'English',
  onSelectMapDestination
}) => {
  const isModel = message.role === 'model';
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);

  // Extract map destinations embedded in the response [MAP:lat,lng,Place Name]
  const mapMatches: { lat: number; lng: number; name: string }[] = [];
  const mapRegex = /\[MAP:([-+]?\d*\.?\d+),([-+]?\d*\.?\d+),([^\]]+)\]/g;
  let match;
  while ((match = mapRegex.exec(message.content)) !== null) {
    mapMatches.push({
      lat: parseFloat(match[1]),
      lng: parseFloat(match[2]),
      name: match[3].trim()
    });
  }

  const handleSpeak = () => {
    if (isPlaying) {
      voiceService.stopSpeaking();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      voiceService.speak(message.content, language, () => {
        setIsPlaying(false);
      });
    }
  };

  const handleCopy = () => {
    const cleanText = message.content.replace(/\[MAP:.*?\]/g, '').trim();
    navigator.clipboard.writeText(cleanText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatContent = (content: string) => {
    const cleanContent = content.replace(/\[MAP:.*?\]/g, '').trim();

    let html = cleanContent
      .replace(/^### (.*$)/gm, '<h3 class="text-sm font-bold mt-3 mb-1 text-amber-900 dark:text-amber-200">$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 class="text-base font-extrabold mt-3 mb-1.5 text-amber-900 dark:text-amber-100">$1</h2>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900 dark:text-white">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/^- (.*$)/gm, '<li class="ml-4 list-disc my-0.5">$1</li>');
    html = html.replace(/(<li.*<\/li>)/gs, '<ul class="my-1.5 space-y-0.5">$1</ul>');

    return { __html: html };
  };

  const CustomComponent = message.component === 'VolcanoesHotels' 
    ? VolcanoesHotels 
    : message.component === 'HuyeHotels' 
    ? HuyeHotels 
    : null;

  if (isModel) {
    if (CustomComponent) {
      return (
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700 flex items-center justify-center">
            <RwandaIcon className="h-5 w-5 text-[#00A1DE]" />
          </div>
          <div className="flex-1">
            <CustomComponent />
          </div>
        </div>
      );
    }
    
    return (
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700 flex items-center justify-center">
          <RwandaIcon className="h-5 w-5 text-[#00A1DE]" />
        </div>

        <div className="flex-1 max-w-2xl space-y-2">
          <div className={`rounded-2xl rounded-tl-xs p-4 sm:p-5 shadow-xs border ${
            message.isSuggestion 
              ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800/60' 
              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
          }`}>
            {isLoading && message.content.length === 0 ? (
              <LoadingIndicator />
            ) : (
              <>
                <div 
                  className="prose prose-sm dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-relaxed" 
                  dangerouslySetInnerHTML={formatContent(message.content)} 
                />

                {/* Map Locations Quick Action Pills */}
                {mapMatches.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700/80">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      📍 Mentioned Locations (Tap to view on map):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {mapMatches.map((loc, idx) => (
                        <button
                          key={idx}
                          onClick={() => onSelectMapDestination?.(loc.lat, loc.lng, loc.name)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:hover:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 text-xs font-semibold flex items-center space-x-1 transition-colors"
                        >
                          <MapPin className="w-3 h-3 text-emerald-600" />
                          <span>{loc.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Action Bar (Listen, Copy) */}
          {!isLoading && message.content && (
            <div className="flex items-center space-x-2 text-xs text-slate-400 pl-1">
              <button
                onClick={handleSpeak}
                className="flex items-center space-x-1 hover:text-amber-500 transition-colors"
                title={isPlaying ? 'Stop voice' : 'Listen to response'}
              >
                {isPlaying ? <VolumeX className="w-3.5 h-3.5 text-amber-500" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{isPlaying ? 'Mute' : 'Listen'}</span>
              </button>
              <span>·</span>
              <button
                onClick={handleCopy}
                className="flex items-center space-x-1 hover:text-slate-200 transition-colors"
                title="Copy text"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start justify-end space-x-3">
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 rounded-2xl rounded-tr-xs p-3.5 sm:p-4 shadow-sm max-w-xl">
        <p className="text-xs sm:text-sm font-semibold">{message.content}</p>
      </div>
      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-800 dark:text-slate-200 font-bold text-xs">
        U
      </div>
    </div>
  );
};

export default ChatMessage;
