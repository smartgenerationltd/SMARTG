// Voice Service handling Real-Time Speech Recognition and Speech Synthesis with cross-browser fallbacks

export interface VoiceServiceCallbacks {
  onListeningStateChange?: (isListening: boolean) => void;
  onTranscriptChange?: (transcript: string, isFinal: boolean) => void;
  onSpeakingStateChange?: (isSpeaking: boolean) => void;
  onError?: (error: string) => void;
}

class VoiceService {
  private recognition: any | null = null;
  private isListening: boolean = false;
  private isSpeaking: boolean = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private activeUtterances: SpeechSynthesisUtterance[] = []; // Prevent garbage collection bug in Chrome
  private callbacks: VoiceServiceCallbacks = {};
  private activeLanguageCode: string = 'en-US';
  private cachedVoices: SpeechSynthesisVoice[] = [];
  private lastCapturedTranscript: string = '';

  constructor() {
    this.initVoices();
    this.initSpeechRecognition();
  }

  private initVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const loadVoices = () => {
      try {
        const voices = window.speechSynthesis.getVoices();
        if (voices && voices.length > 0) {
          this.cachedVoices = voices;
        }
      } catch (err) {
        console.warn('Could not load browser voices:', err);
      }
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }

  private initSpeechRecognition() {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.recognition.maxAlternatives = 1;

        this.recognition.onstart = () => {
          this.isListening = true;
          this.lastCapturedTranscript = '';
          this.callbacks.onListeningStateChange?.(true);
        };

        this.recognition.onresult = (event: any) => {
          let interimTranscript = '';
          let finalTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript;
            } else {
              interimTranscript += transcript;
            }
          }

          const currentText = (finalTranscript || interimTranscript).trim();
          if (currentText) {
            this.lastCapturedTranscript = currentText;
            this.callbacks.onTranscriptChange?.(currentText, Boolean(finalTranscript));
          }
        };

        this.recognition.onerror = (event: any) => {
          console.warn('Speech recognition error:', event.error);
          this.isListening = false;
          this.callbacks.onListeningStateChange?.(false);

          if (event.error === 'no-speech') {
            // User didn't speak in time, no critical error needed
            return;
          }

          if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
            this.callbacks.onError?.('Microphone permission is blocked. Please enable microphone access in your browser settings.');
          } else if (event.error !== 'aborted') {
            this.callbacks.onError?.(`Microphone notice (${event.error}). You can also tap the question suggestions or type your message.`);
          }
        };

        this.recognition.onend = () => {
          this.isListening = false;
          this.callbacks.onListeningStateChange?.(false);

          // If we captured an interim transcript that never fired isFinal, submit it on end
          if (this.lastCapturedTranscript) {
            this.callbacks.onTranscriptChange?.(this.lastCapturedTranscript, true);
            this.lastCapturedTranscript = '';
          }
        };
      } catch (err) {
        console.warn('Could not initialize SpeechRecognition:', err);
      }
    }
  }

  public setCallbacks(callbacks: VoiceServiceCallbacks) {
    this.callbacks = callbacks;
  }

  public mapLanguageToLocale(langNameOrCode: string): string {
    const map: Record<string, string> = {
      en: 'en-US',
      English: 'en-US',
      rw: 'rw-RW',
      Kinyarwanda: 'rw-RW',
      fr: 'fr-FR',
      Français: 'fr-FR',
      sw: 'sw-KE',
      Kiswahili: 'sw-KE',
      es: 'es-ES',
      Español: 'es-ES',
      de: 'de-DE',
      Deutsch: 'de-DE',
      zh: 'zh-CN',
      '中文': 'zh-CN',
      hi: 'hi-IN',
      'हिन्दी': 'hi-IN',
      ar: 'ar-SA',
      'العربية': 'ar-SA',
      pt: 'pt-BR',
      'Português': 'pt-BR',
      ja: 'ja-JP',
      '日本語': 'ja-JP',
      ru: 'ru-RU',
      'Русский': 'ru-RU'
    };
    return map[langNameOrCode] || 'en-US';
  }

  public isSpeechRecognitionSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return Boolean((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
  }

  public isSpeechSynthesisSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return 'speechSynthesis' in window;
  }

  public async requestMicrophonePermission(): Promise<boolean> {
    if (typeof navigator === 'undefined' || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      return true;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Stop tracks immediately after getting permission confirmation
      stream.getTracks().forEach((track) => track.stop());
      return true;
    } catch (err) {
      console.warn('Microphone permission request rejected:', err);
      return false;
    }
  }

  public async startListening(languageName: string = 'English'): Promise<boolean> {
    if (this.isSpeaking) {
      this.stopSpeaking();
    }

    if (!this.recognition) {
      this.initSpeechRecognition();
    }

    if (!this.recognition) {
      this.callbacks.onError?.('Speech recognition is not available in this browser environment. You can use text input or prompt suggestions.');
      return false;
    }

    try {
      this.activeLanguageCode = this.mapLanguageToLocale(languageName);
      this.recognition.lang = this.activeLanguageCode;
      this.recognition.start();
      return true;
    } catch (e: any) {
      if (e.name === 'InvalidStateError') {
        try {
          this.recognition.stop();
          setTimeout(() => {
            try {
              this.recognition?.start();
            } catch {}
          }, 150);
          return true;
        } catch {
          return false;
        }
      }
      console.warn('Failed to start speech recognition:', e);
      return false;
    }
  }

  public stopListening() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (e) {
        console.warn('Error stopping recognition:', e);
      }
      this.isListening = false;
      this.callbacks.onListeningStateChange?.(false);
    }
  }

  public speak(text: string, languageName: string = 'English', onComplete?: () => void) {
    if (!this.isSpeechSynthesisSupported()) {
      onComplete?.();
      return;
    }

    this.stopSpeaking();

    // Clean out MAP tags, markdown symbols, and technical formatting
    const cleanText = text
      .replace(/\[MAP:.*?\]/g, '')
      .replace(/\[.*?\]\(.*?\)/g, '')
      .replace(/[*_#`~>]/g, '')
      .replace(/\n+/g, '. ')
      .trim();

    if (!cleanText) {
      onComplete?.();
      return;
    }

    // Limit to the most pertinent first 320 characters for quick natural conversation
    const spokenSnippet = cleanText.length > 340 
      ? cleanText.substring(0, cleanText.lastIndexOf('.', 340) > 120 ? cleanText.lastIndexOf('.', 340) + 1 : 320) + '...'
      : cleanText;

    const utterance = new SpeechSynthesisUtterance(spokenSnippet);
    const langLocale = this.mapLanguageToLocale(languageName);
    utterance.lang = langLocale;
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    // Pick best available voice for language or suitable fallback
    const voices = this.cachedVoices.length > 0 ? this.cachedVoices : window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      const preferredVoice = 
        voices.find(v => v.lang.toLowerCase() === langLocale.toLowerCase()) ||
        voices.find(v => v.lang.toLowerCase().startsWith(langLocale.substring(0, 2).toLowerCase())) ||
        voices.find(v => v.lang.toLowerCase().startsWith('en'));
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
    }

    utterance.onstart = () => {
      this.isSpeaking = true;
      this.callbacks.onSpeakingStateChange?.(true);
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.callbacks.onSpeakingStateChange?.(false);
      this.activeUtterances = this.activeUtterances.filter(u => u !== utterance);
      this.currentUtterance = null;
      onComplete?.();
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis error:', e);
      this.isSpeaking = false;
      this.callbacks.onSpeakingStateChange?.(false);
      this.activeUtterances = this.activeUtterances.filter(u => u !== utterance);
      this.currentUtterance = null;
      onComplete?.();
    };

    this.currentUtterance = utterance;
    this.activeUtterances.push(utterance);

    // Chrome unfreeze workaround
    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('Speech synthesis speak invocation error:', err);
      this.isSpeaking = false;
      this.callbacks.onSpeakingStateChange?.(false);
      onComplete?.();
    }
  }

  public stopSpeaking() {
    if (this.isSpeechSynthesisSupported()) {
      try {
        window.speechSynthesis.cancel();
      } catch (err) {
        console.warn('Error canceling speech synthesis:', err);
      }
    }
    this.isSpeaking = false;
    this.callbacks.onSpeakingStateChange?.(false);
    this.currentUtterance = null;
    this.activeUtterances = [];
  }

  public getIsListening(): boolean {
    return this.isListening;
  }

  public getIsSpeaking(): boolean {
    return this.isSpeaking;
  }
}

export const voiceService = new VoiceService();
