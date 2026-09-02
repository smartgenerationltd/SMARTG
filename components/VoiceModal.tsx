import React, { useState, useEffect, useRef } from 'react';
import { voiceService } from '../services/voiceService';
import { geminiService } from '../services/geminiService';
import { getSystemInstruction, LANGUAGES } from '../constants';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  X, 
  Sparkles, 
  MessageSquare, 
  RotateCcw,
  Languages as LanguagesIcon,
  Square,
  Send,
  AlertCircle,
  Play
} from 'lucide-react';

interface VoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: string;
  setLanguage?: (lang: string) => void;
  onSendQueryToChat?: (prompt: string) => void;
}

const VoiceModal: React.FC<VoiceModalProps> = ({
  isOpen,
  onClose,
  language,
  setLanguage,
  onSendQueryToChat
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [textInput, setTextInput] = useState('');
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [chatSession, setChatSession] = useState<any>(null);
  const [voiceHistory, setVoiceHistory] = useState<{ role: 'user' | 'model'; text: string }[]>([]);

  const isRecognitionSupported = voiceService.isSpeechRecognitionSupported();
  const isSynthesisSupported = voiceService.isSpeechSynthesisSupported();
  const transcriptBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setErrorMessage(null);
      try {
        const session = geminiService.createChat(getSystemInstruction(language));
        setChatSession(session);
      } catch (err) {
        console.warn('Failed to initialize chat session in voice modal:', err);
      }

      voiceService.setCallbacks({
        onListeningStateChange: (listening) => setIsListening(listening),
        onTranscriptChange: (text, isFinal) => {
          setTranscript(text);
          if (isFinal && text.trim().length > 1) {
            handleProcessUserSpeech(text);
          }
        },
        onSpeakingStateChange: (speaking) => setIsSpeaking(speaking),
        onError: (err) => {
          setErrorMessage(err);
        }
      });
    } else {
      voiceService.stopListening();
      voiceService.stopSpeaking();
      setIsListening(false);
      setIsSpeaking(false);
      setIsThinking(false);
      setErrorMessage(null);
    }
  }, [isOpen, language]);

  useEffect(() => {
    if (transcriptBoxRef.current) {
      transcriptBoxRef.current.scrollTop = transcriptBoxRef.current.scrollHeight;
    }
  }, [transcript, aiResponse, isThinking]);

  const handleStartListening = async () => {
    setErrorMessage(null);
    voiceService.stopSpeaking();
    setTranscript('');

    const hasPermission = await voiceService.requestMicrophonePermission();
    if (!hasPermission) {
      setErrorMessage('Microphone access was blocked. Please check browser permissions or use text below.');
      return;
    }

    const started = await voiceService.startListening(language);
    if (!started && !isRecognitionSupported) {
      setErrorMessage('Speech recognition is not supported in this browser. You can type questions below.');
    }
  };

  const handleStopListening = () => {
    voiceService.stopListening();
  };

  const handleProcessUserSpeech = async (userText: string) => {
    if (!userText.trim()) return;

    voiceService.stopListening();
    setIsThinking(true);
    setErrorMessage(null);
    setVoiceHistory((prev) => [...prev, { role: 'user', text: userText }]);

    try {
      let replyText = '';
      if (chatSession) {
        const result = await chatSession.sendMessage({ message: userText });
        replyText = result.text?.trim() || '';
      } else {
        replyText = `Welcome to Rwanda! Regarding "${userText}": Rwanda offers incredible primate trekking in Volcanoes National Park, Big 5 safaris in Akagera, vibrant cultural spots in Kigali, and relaxed lakeside stays along Lake Kivu.`;
      }

      setAiResponse(replyText);
      setVoiceHistory((prev) => [...prev, { role: 'model', text: replyText }]);
      setIsThinking(false);

      if (speechEnabled) {
        voiceService.speak(replyText, language);
      }
    } catch (err: any) {
      console.warn('Voice AI processing error:', err);
      const fallbackMsg = "Muraho! I encountered a temporary connection issue. Please try asking again or switch to chat view.";
      setAiResponse(fallbackMsg);
      setIsThinking(false);
      if (speechEnabled) {
        voiceService.speak(fallbackMsg, language);
      }
    }
  };

  const handleInterrupt = () => {
    voiceService.stopSpeaking();
    setIsSpeaking(false);
  };

  const handleReplayAudio = () => {
    if (aiResponse) {
      voiceService.speak(aiResponse, language);
    }
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInput.trim() || isThinking) return;
    const prompt = textInput.trim();
    setTextInput('');
    setTranscript(prompt);
    handleProcessUserSpeech(prompt);
  };

  const handleSamplePrompt = (prompt: string) => {
    setTranscript(prompt);
    handleProcessUserSpeech(prompt);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md transition-all animate-fadeIn">
      <div className="relative w-full max-w-xl bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 border border-amber-400/30 rounded-3xl p-5 sm:p-7 shadow-2xl text-white overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Ambient Glow Effects */}
        <div className="absolute -top-24 -left-24 w-60 h-60 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between relative z-10 border-b border-slate-700/60 pb-3.5 mb-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-white leading-tight">Rwanda Voice Concierge</h3>
              <p className="text-xs text-slate-400">Speak naturally in {language}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Language Selector in Modal */}
            {setLanguage && (
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg py-1.5 px-2.5 appearance-none pr-6 focus:outline-none focus:ring-1 focus:ring-amber-400 cursor-pointer"
                  aria-label="Change voice language"
                >
                  {LANGUAGES.map((l) => (
                    <option key={l.code} value={l.name}>
                      {l.flag} {l.name}
                    </option>
                  ))}
                </select>
                <LanguagesIcon className="w-3 h-3 absolute right-2 top-2.5 text-slate-400 pointer-events-none" />
              </div>
            )}

            {/* TTS Mute Toggle */}
            <button
              onClick={() => {
                const nextState = !speechEnabled;
                setSpeechEnabled(nextState);
                if (!nextState) voiceService.stopSpeaking();
              }}
              className={`p-2 rounded-xl border transition-colors ${
                speechEnabled 
                  ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-300' 
                  : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
              title={speechEnabled ? 'Voice playback active (click to mute)' : 'Voice muted (click to enable)'}
              aria-label="Toggle voice output"
            >
              {speechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-white transition-colors"
              aria-label="Close voice modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Error / Notice Banner */}
        {errorMessage && (
          <div className="relative z-10 mb-3 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-amber-400" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-amber-300 hover:text-white text-xs ml-2 underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Center Interactive Orb / Microphone Control */}
        <div className="flex flex-col items-center justify-center my-3 sm:my-5 relative z-10">
          <div className="relative flex items-center justify-center">
            
            {/* Outer Pulsing Wave Rings */}
            {isListening && (
              <>
                <div className="absolute w-44 h-44 rounded-full bg-emerald-500/20 animate-ping duration-1000" />
                <div className="absolute w-36 h-36 rounded-full bg-emerald-500/30 animate-pulse duration-700" />
              </>
            )}

            {isSpeaking && (
              <>
                <div className="absolute w-44 h-44 rounded-full bg-amber-500/20 animate-ping duration-1000" />
                <div className="absolute w-36 h-36 rounded-full bg-amber-500/30 animate-pulse duration-700" />
              </>
            )}

            {/* Central Main Button */}
            <button
              onClick={
                isListening 
                  ? handleStopListening 
                  : isSpeaking 
                  ? handleInterrupt 
                  : handleStartListening
              }
              className={`relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full flex flex-col items-center justify-center shadow-xl transition-all transform active:scale-95 cursor-pointer ${
                isListening
                  ? 'bg-gradient-to-tr from-emerald-600 to-teal-400 text-white shadow-emerald-500/50 ring-4 ring-emerald-400/50'
                  : isSpeaking
                  ? 'bg-gradient-to-tr from-amber-600 to-yellow-400 text-white shadow-amber-500/50 ring-4 ring-amber-400/50'
                  : isThinking
                  ? 'bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-blue-500/50 animate-pulse'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-2 border-slate-600 hover:border-amber-400'
              }`}
              aria-label="Toggle voice listening or stop playback"
            >
              {isListening ? (
                <>
                  <Mic className="w-8 h-8 animate-bounce" />
                  <span className="text-[10px] font-bold mt-1 tracking-wider uppercase">Listening</span>
                </>
              ) : isSpeaking ? (
                <>
                  <Square className="w-7 h-7" />
                  <span className="text-[10px] font-bold mt-1 tracking-wider uppercase">Tap to Stop</span>
                </>
              ) : isThinking ? (
                <>
                  <Sparkles className="w-7 h-7 animate-spin" />
                  <span className="text-[10px] font-bold mt-1 tracking-wider uppercase">Thinking</span>
                </>
              ) : (
                <>
                  <Mic className="w-8 h-8 text-amber-400" />
                  <span className="text-[10px] font-bold mt-1 tracking-wider uppercase text-slate-300">Tap to Speak</span>
                </>
              )}
            </button>
          </div>

          {/* Status Text & Visual Waveform Indicator */}
          <div className="mt-3 text-center">
            <p className="text-xs sm:text-sm font-medium text-slate-300">
              {isListening 
                ? 'Listening to your voice... Speak now' 
                : isThinking 
                ? 'Rwanda AI Concierge is generating an answer...' 
                : isSpeaking 
                ? 'Speaking response (tap orb or stop button to interrupt)...' 
                : 'Tap microphone orb to ask a question'}
            </p>

            {/* Sound Wave Bars Animation */}
            {(isListening || isSpeaking) && (
              <div className="flex items-center justify-center space-x-1 mt-2">
                {[40, 70, 100, 60, 90, 45, 80, 50, 75, 30].map((height, i) => (
                  <span
                    key={i}
                    className={`w-1 rounded-full transition-all duration-150 ${
                      isListening ? 'bg-emerald-400' : 'bg-amber-400'
                    } animate-pulse`}
                    style={{ 
                      height: `${Math.max(6, Math.round(height * (isListening ? 0.25 : 0.2)))}px`,
                      animationDelay: `${i * 70}ms`
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Live Transcript & Spoken Answer Display */}
        <div 
          ref={transcriptBoxRef}
          className="flex-1 min-h-[90px] max-h-[140px] overflow-y-auto bg-slate-950/70 border border-slate-800 rounded-2xl p-3.5 my-2.5 relative z-10 text-xs sm:text-sm space-y-2"
        >
          {transcript && (
            <div>
              <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold block mb-0.5">
                You asked:
              </span>
              <p className="text-slate-200 font-medium italic">"{transcript}"</p>
            </div>
          )}
          
          {aiResponse && (
            <div className="pt-2 border-t border-slate-800/80">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] uppercase tracking-wider text-amber-400 font-bold block">
                  Concierge Answer:
                </span>
                {speechEnabled && !isSpeaking && (
                  <button
                    onClick={handleReplayAudio}
                    className="flex items-center space-x-1 text-[11px] text-slate-400 hover:text-amber-300 font-medium"
                    title="Replay voice audio"
                  >
                    <Play className="w-3 h-3" />
                    <span>Replay Voice</span>
                  </button>
                )}
              </div>
              <p className="text-slate-300 leading-relaxed">
                {aiResponse.replace(/\[MAP:.*?\]/g, '')}
              </p>
            </div>
          )}

          {!transcript && !aiResponse && (
            <p className="text-xs text-slate-500 text-center py-4">
              Ask: "How do I get gorilla trekking permits in Volcanoes National Park?" or "What are the top cultural museums in Butare?"
            </p>
          )}
        </div>

        {/* Text Input Fallback */}
        <form onSubmit={handleTextSubmit} className="relative z-10 my-1.5 flex items-center space-x-2">
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Or type your question here..."
            className="flex-1 bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          />
          <button
            type="submit"
            disabled={!textInput.trim() || isThinking}
            className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-bold transition-all"
            aria-label="Send query"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Suggested Quick Speech Prompts */}
        <div className="relative z-10 mt-1">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] uppercase font-bold text-slate-400">Quick Voice Prompts:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {[
              'Top things to do in Kigali',
              'Gorilla permits & Volcanoes NP',
              'Akagera Safari Big 5',
              'Best Rwandan dishes to try'
            ].map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSamplePrompt(q)}
                className="text-[11px] px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Switch to Full Text Chat */}
        {onSendQueryToChat && (
          <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between relative z-10 text-xs text-slate-400">
            <span>Want interactive maps & directions?</span>
            <button
              onClick={() => {
                onClose();
                onSendQueryToChat(transcript || aiResponse || 'Tell me about travel in Rwanda');
              }}
              className="flex items-center space-x-1 text-amber-400 hover:text-amber-300 font-bold"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Open in Chat View</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default VoiceModal;
