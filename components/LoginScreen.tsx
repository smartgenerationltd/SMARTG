import React, { useState } from 'react';
import GoogleIcon from './icons/GoogleIcon';
import FacebookIcon from './icons/FacebookIcon';
import AppleIcon from './icons/AppleIcon';
import RwandaIcon from './icons/RwandaIcon';
import LinkedinIcon from './icons/LinkedinIcon';
import InstagramIcon from './icons/InstagramIcon';
import XSocialIcon from './icons/XSocialIcon';
import { 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  Crown, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  Compass,
  CheckCircle2,
  Languages
} from 'lucide-react';
import { LANGUAGES } from '../constants';

export type Provider = 'google' | 'facebook' | 'apple' | 'linkedin' | 'instagram' | 'x' | 'email' | 'guest';

export interface UserProfile {
  name: string;
  email?: string;
  provider?: Provider;
  avatar?: string;
}

interface LoginScreenProps {
  onLogin: (userData: UserProfile) => void;
  texts?: {
    loginSubtitle?: string;
    signInGoogle?: string;
    signInFacebook?: string;
    signInApple?: string;
    signInLinkedin?: string;
    signInInstagram?: string;
    signInX?: string;
    signInEmail?: string;
    or?: string;
  };
  welcomeTitle?: string;
  currentLanguage?: string;
  onLanguageChange?: (lang: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ 
  onLogin, 
  texts, 
  welcomeTitle = "Rwanda AI Travel Concierge",
  currentLanguage = "English",
  onLanguageChange
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (mode === 'signup' && !name.trim()) {
      setError('Please enter your full name.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const userName = mode === 'signup' && name.trim() ? name.trim() : email.split('@')[0];
      onLogin({
        name: userName.charAt(0).toUpperCase() + userName.slice(1),
        email: email.trim(),
        provider: 'email'
      });
    }, 450);
  };

  const handleSocialLogin = (provider: Provider) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const providerNames: Record<Provider, string> = {
        google: 'Google Traveler',
        apple: 'Apple Explorer',
        facebook: 'Facebook Traveler',
        linkedin: 'Executive Explorer',
        instagram: 'Rwanda Explorer',
        x: 'X Explorer',
        email: 'Traveler',
        guest: 'Guest Traveler'
      };

      onLogin({
        name: providerNames[provider] || 'Rwanda Explorer',
        email: `${provider}.traveler@example.com`,
        provider: provider
      });
    }, 300);
  };

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-y-auto font-sans bg-slate-950 text-slate-100"
      style={{
        backgroundImage: `
          radial-gradient(circle at 15% 15%, rgba(0, 161, 222, 0.25), transparent 45%),
          radial-gradient(circle at 85% 85%, rgba(32, 96, 61, 0.3), transparent 45%),
          radial-gradient(circle at 50% 50%, rgba(250, 210, 1, 0.1), transparent 60%),
          linear-gradient(to bottom, #020617, #090d16, #020617)
        `
      }}
    >
      {/* Top Header Controls: Language Selector */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex items-center space-x-2">
        {onLanguageChange && (
          <div className="relative flex items-center bg-slate-900/80 backdrop-blur-md border border-slate-700/80 rounded-xl px-2.5 py-1.5 shadow-md">
            <Languages className="w-3.5 h-3.5 text-amber-400 mr-2 pointer-events-none" />
            <select
              value={currentLanguage}
              onChange={(e) => onLanguageChange(e.target.value)}
              className="bg-transparent text-xs font-semibold text-slate-200 focus:outline-none cursor-pointer appearance-none pr-3"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.name} className="bg-slate-900 text-white">
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Main Authentication Container */}
      <div className="w-full max-w-xl my-8 relative z-10">
        
        {/* Glow decoration */}
        <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-sky-500/20 rounded-3xl blur-xl opacity-70 pointer-events-none" />

        <div className="relative bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-10 space-y-6">
          
          {/* Header & Emblem */}
          <div className="text-center space-y-2.5">
            <div className="inline-flex items-center justify-center p-3.5 rounded-2xl bg-gradient-to-br from-emerald-500/20 via-sky-500/20 to-amber-500/20 border border-emerald-500/30 shadow-inner mb-1">
              <RwandaIcon className="h-12 w-12 text-emerald-400" />
            </div>

            <div className="flex items-center justify-center space-x-2">
              <span className="flex items-center space-x-1 text-[11px] font-bold uppercase tracking-widest bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                <Crown className="w-3 h-3 text-amber-400" />
                <span>OFFICIAL RWANDA CONCIERGE</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {welcomeTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              {texts?.loginSubtitle || "Sign in to access AI travel recommendations, curated 5-star hotel bookings, GPS navigation, and bespoke safari itineraries."}
            </p>
          </div>

          {/* Mode Switcher Tabs: Sign In / Create Account */}
          <div className="grid grid-cols-2 p-1 bg-slate-950/80 rounded-2xl border border-slate-800 text-xs font-bold">
            <button
              type="button"
              onClick={() => { setMode('signin'); setError(null); }}
              className={`py-2.5 rounded-xl transition-all ${
                mode === 'signin'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode('signup'); setError(null); }}
              className={`py-2.5 rounded-xl transition-all ${
                mode === 'signup'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/50 text-red-300 text-xs flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0 animate-ping" />
              <span>{error}</span>
            </div>
          )}

          {/* Email / Password Form */}
          <form onSubmit={handleEmailSubmit} className="space-y-3.5">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Jane Doe"
                    required={mode === 'signup'}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-lg shadow-amber-950/50 transition-all transform active:scale-[0.99] disabled:opacity-50 mt-2"
            >
              {isSubmitting ? (
                <span className="flex items-center space-x-2">
                  <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Signing In...</span>
                </span>
              ) : (
                <>
                  <span>{mode === 'signin' ? 'Sign In to Rwanda Concierge' : 'Create My Traveler Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center py-1">
            <div className="flex-grow border-t border-slate-800" />
            <span className="flex-shrink mx-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              {texts?.or || 'Or Continue With'}
            </span>
            <div className="flex-grow border-t border-slate-800" />
          </div>

          {/* Social Sign In Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={() => handleSocialLogin('google')}
              className="flex items-center justify-center space-x-2 py-2 px-3 bg-slate-950/80 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 rounded-xl text-xs font-semibold text-slate-200 transition-all active:scale-[0.98]"
            >
              <GoogleIcon className="h-4 w-4" />
              <span>Google</span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialLogin('apple')}
              className="flex items-center justify-center space-x-2 py-2 px-3 bg-slate-950/80 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 rounded-xl text-xs font-semibold text-slate-200 transition-all active:scale-[0.98]"
            >
              <AppleIcon className="h-4 w-4 text-white" />
              <span>Apple</span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialLogin('facebook')}
              className="flex items-center justify-center space-x-2 py-2 px-3 bg-slate-950/80 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 rounded-xl text-xs font-semibold text-slate-200 transition-all active:scale-[0.98]"
            >
              <FacebookIcon className="h-4 w-4 text-[#1877F2]" />
              <span>Facebook</span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialLogin('linkedin')}
              className="flex items-center justify-center space-x-2 py-2 px-3 bg-slate-950/80 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 rounded-xl text-xs font-semibold text-slate-200 transition-all active:scale-[0.98]"
            >
              <LinkedinIcon className="h-4 w-4 text-[#0A66C2]" />
              <span>LinkedIn</span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialLogin('x')}
              className="flex items-center justify-center space-x-2 py-2 px-3 bg-slate-950/80 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 rounded-xl text-xs font-semibold text-slate-200 transition-all active:scale-[0.98]"
            >
              <XSocialIcon className="h-4 w-4 text-white" />
              <span>X (Twitter)</span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialLogin('instagram')}
              className="flex items-center justify-center space-x-2 py-2 px-3 bg-slate-950/80 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 rounded-xl text-xs font-semibold text-slate-200 transition-all active:scale-[0.98]"
            >
              <InstagramIcon className="h-4 w-4" />
              <span>Instagram</span>
            </button>
          </div>

          {/* Quick Instant Traveler Pass Button */}
          <div className="pt-2 border-t border-slate-800/80">
            <button
              type="button"
              onClick={() => handleSocialLogin('guest')}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-slate-800/90 text-slate-300 hover:text-white text-xs font-semibold border border-slate-800 flex items-center justify-center space-x-2 transition-colors"
            >
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              <span>Continue as Guest Traveler (Instant Preview)</span>
            </button>
          </div>

          {/* Trust & Security Footer */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-1 text-[11px] text-slate-400">
            <span className="flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>256-Bit Encrypted</span>
            </span>
            <span className="flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Verified 5★ Booking Desk</span>
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
