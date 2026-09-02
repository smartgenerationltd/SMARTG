import React from 'react';
import { ActiveTab } from '../types';
import { LANGUAGES } from '../constants';
import RwandaIcon from './icons/RwandaIcon';
import CrownIcon from './icons/CrownIcon';
import CreditIcon from './icons/CreditIcon';
import { 
  Sparkles, 
  MapPin, 
  Compass, 
  CalendarDays, 
  BookOpen, 
  ShieldAlert, 
  User, 
  Mic, 
  LogOut, 
  Languages, 
  Plus,
  Crown
} from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab?: (tab: ActiveTab) => void;
  onSelectTab?: (tab: ActiveTab) => void;
  language: string;
  setLanguage?: (lang: string) => void;
  onLanguageChange?: (lang: string) => void;
  isPremium: boolean;
  credits: number;
  onOpenPaymentModal: () => void;
  onOpenVoiceModal: () => void;
  onNewChat: () => void;
  user: { name: string } | null;
  onLogout: () => void;
  t?: (key: any) => string;
}

const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onSelectTab,
  language,
  setLanguage,
  onLanguageChange,
  isPremium,
  credits,
  onOpenPaymentModal,
  onOpenVoiceModal,
  onNewChat,
  user,
  onLogout,
  t
}) => {
  const handleSelectTab = (tab: ActiveTab) => {
    if (onSelectTab) onSelectTab(tab);
    else if (setActiveTab) setActiveTab(tab);
  };

  const handleLanguageChange = (lang: string) => {
    if (onLanguageChange) onLanguageChange(lang);
    else if (setLanguage) setLanguage(lang);
  };

  const translate = (key: string, fallback: string = '') => {
    if (typeof t === 'function') {
      try {
        const res = t(key);
        if (res) return res;
      } catch {
        // ignore
      }
    }
    return fallback || key;
  };
  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Compass className="w-4 h-4" /> },
    { id: 'hotels', label: '5★ Hotels', icon: <Crown className="w-4 h-4 text-amber-400" /> },
    { id: 'chat', label: 'AI Concierge', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'explore', label: 'Smart Map', icon: <MapPin className="w-4 h-4" /> },
    { id: 'planner', label: 'Trip Planner', icon: <CalendarDays className="w-4 h-4" /> },
    { id: 'experience', label: 'Experience Rwanda', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'safety', label: 'Safety & Help', icon: <ShieldAlert className="w-4 h-4" /> },
    { id: 'profile', label: 'My Rwanda', icon: <User className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-blue-900 border-b border-blue-800 shadow-md transition-colors text-yellow-400">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Name */}
          <button 
            onClick={() => handleSelectTab('home')}
            className="flex items-center space-x-3 text-left group focus:outline-none"
            aria-label="Go to home"
          >
            <div className="p-1.5 rounded-xl bg-blue-950 border border-yellow-400/40 shadow-xs group-hover:scale-105 transition-transform">
              <RwandaIcon className="h-7 w-7 text-yellow-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-[16px] tracking-tight text-yellow-400 font-sans">
                  Rwanda AI
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-yellow-400 text-blue-950 border border-yellow-300">
                  Concierge
                </span>
              </div>
              <p className="text-[11px] font-bold text-yellow-200/80 hidden sm:block truncate max-w-xs">
                Your Intelligent Rwanda Travel Guide
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-[16px] font-bold transition-all ${
                    isActive
                      ? 'bg-yellow-400 text-blue-950 shadow-sm border border-yellow-300'
                      : 'text-yellow-300 hover:text-yellow-100 hover:bg-blue-800/80'
                  }`}
                >
                  <span className={isActive ? 'text-blue-950' : 'text-yellow-400'}>
                    {item.icon}
                  </span>
                  <span className="text-[16px] font-bold">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Tools: Voice AI, Language, Credits/Upgrade, User */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Quick Voice Concierge Button */}
            <button
              onClick={onOpenVoiceModal}
              className="relative group flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-yellow-400 hover:bg-yellow-300 text-blue-950 text-xs font-bold shadow-sm hover:shadow transition-all focus:outline-none focus:ring-2 focus:ring-yellow-300"
              title="Speak with Rwanda Voice AI"
              aria-label="Open Voice Concierge"
            >
              <Mic className="w-3.5 h-3.5 text-blue-950 animate-pulse" />
              <span className="hidden sm:inline font-bold">Voice AI</span>
            </button>

            {/* Language Selector */}
            <div className="relative flex items-center">
              <Languages className="w-3.5 h-3.5 absolute left-2.5 text-yellow-400 pointer-events-none" />
              <select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="bg-blue-950 border border-yellow-400/40 rounded-xl py-1.5 pl-8 pr-7 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-yellow-400 text-yellow-300 cursor-pointer appearance-none"
                aria-label="Select language"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.name} className="bg-blue-900 text-yellow-300">
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Credits or Premium Badge */}
            {isPremium ? (
              <div 
                className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl bg-yellow-400 text-blue-950 font-bold border border-yellow-300" 
                title="Premium Member"
              >
                <CrownIcon className="h-4 w-4 text-blue-950" />
                <span className="text-xs font-bold hidden md:inline">Premium</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1">
                <button
                  onClick={onOpenPaymentModal}
                  className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl bg-blue-950 hover:bg-blue-800 border border-yellow-400/50 text-yellow-300 text-xs font-bold transition-colors"
                  title="Upgrade to Unlimited Credits"
                >
                  <CreditIcon className="h-3.5 w-3.5 text-yellow-400" />
                  <span className="font-bold text-yellow-400">{credits}</span>
                  <span className="hidden sm:inline text-[11px] opacity-90">credits</span>
                </button>
              </div>
            )}

            {/* User Avatar & Logout */}
            {user && (
              <div className="flex items-center space-x-1.5 pl-1 border-l border-blue-800">
                <button
                  onClick={() => handleSelectTab('profile')}
                  className="w-8 h-8 rounded-full bg-yellow-400 text-blue-950 flex items-center justify-center font-bold text-xs hover:ring-2 hover:ring-yellow-300 transition-all"
                  title={`Logged in as ${user.name}`}
                  aria-label="User Profile"
                >
                  {user.name.charAt(0).toUpperCase()}
                </button>
                <button
                  onClick={onLogout}
                  className="p-1.5 rounded-lg text-yellow-400/80 hover:text-rose-400 hover:bg-blue-800 transition-colors"
                  title={translate('logout', 'Logout')}
                  aria-label="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-blue-900 border-t border-blue-800 px-1 py-1.5 flex items-center justify-around shadow-lg">
        {[
          { id: 'home' as ActiveTab, label: 'Home', icon: <Compass className="w-4 h-4" /> },
          { id: 'hotels' as ActiveTab, label: '5★ Hotels', icon: <Crown className="w-4 h-4" /> },
          { id: 'chat' as ActiveTab, label: 'Concierge', icon: <Sparkles className="w-4 h-4" /> },
          { id: 'explore' as ActiveTab, label: 'Map', icon: <MapPin className="w-4 h-4" /> },
          { id: 'planner' as ActiveTab, label: 'Planner', icon: <CalendarDays className="w-4 h-4" /> },
          { id: 'profile' as ActiveTab, label: 'Profile', icon: <User className="w-4 h-4" /> },
        ].map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelectTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-1.5 rounded-xl font-bold transition-colors ${
                isActive 
                  ? 'text-blue-950 bg-yellow-400 shadow-sm' 
                  : 'text-yellow-300 hover:text-yellow-100 hover:bg-blue-800'
              }`}
            >
              <div className="p-1 rounded-md">
                {item.icon}
              </div>
              <span className="truncate max-w-[55px] text-[11px] font-bold">{item.label}</span>
            </button>
          );
        })}
      </div>

    </header>
  );
};

export default Navbar;
