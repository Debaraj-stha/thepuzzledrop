import {
  Dices,
  Flame,
  Heart,
  History,
  Menu,
  Search,
  X
} from 'lucide-react';
import { useState } from 'react';
import Logo from './logo';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  onRandomClick: () => void;
  favoritesCount: number;
  streak: number;
  onOpenFavorites: () => void;
  onOpenRecent: () => void;
  onSearchClick: () => void;
}

export function Navbar({
  theme,
  toggleTheme,
  onRandomClick,
  favoritesCount,
  streak,
  onOpenFavorites,
  onOpenRecent,
  onSearchClick,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Daily Puzzle', href: '#daily-puzzle' },
    { name: 'Archive', href: '#archive' },
    { name: 'Categories', href: '#categories' },
    { name: 'Stats', href: '#stats' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0F172A]/80 border-b border-white/10 text-white transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <Logo/>
          {/* <div className="w-8 h-8 bg-gradient-to-br from-[#FACC15] to-[#EAB308] rounded-lg flex items-center justify-center shadow-lg shadow-yellow-500/20 group-hover:scale-105 transition-transform">
            <PuzzleIcon className="w-5 h-5 text-[#0F172A]" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight text-white">
              ThePuzzleDrop
            </span>
            <span className="text-[10px] text-[#FACC15] uppercase tracking-widest font-mono font-medium -mt-1">
              Daily Brain Teasers
            </span>
          </div> */}
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3 py-1.5 text-sm font-medium text-[#CBD5E1] hover:text-[#FACC15] transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center space-x-2">
          {/* Streak Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#FACC15]/10 border border-[#FACC15]/20 text-[#FACC15] rounded-full text-xs font-semibold">
            <Flame className="w-3.5 h-3.5 text-[#FACC15] fill-[#FACC15] animate-pulse" />
            <span>{streak} Day Streak</span>
          </div>

          {/* Quick Search */}
          <button
            onClick={onSearchClick}
            className="p-2 text-[#CBD5E1] hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            title="Search puzzles"
            id="nav-search-btn"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Random Puzzle */}
          <button
            onClick={onRandomClick}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#38BDF8] hover:text-[#38BDF8] bg-[#38BDF8]/10 hover:bg-[#38BDF8]/20 border border-[#38BDF8]/30 rounded-lg transition-all active:scale-95"
            title="Pick a Random Puzzle"
            id="nav-random-btn"
          >
            <Dices className="w-3.5 h-3.5" />
            <span>Random</span>
          </button>

          {/* Favorites */}
          <button
            onClick={onOpenFavorites}
            className="relative p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800/80 rounded-lg transition-colors"
            title="View Saved Favorites"
            id="nav-favorites-btn"
          >
            <Heart className="w-4 h-4" />
            {favoritesCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose-500 text-white font-bold text-[10px] rounded-full flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Recent */}
          <button
            onClick={onOpenRecent}
            className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 rounded-lg transition-colors"
            title="Recently Viewed"
            id="nav-recent-btn"
          >
            <History className="w-4 h-4" />
          </button>

        
        </div>

        {/* Mobile menu button */}
        <div className="flex sm:hidden items-center space-x-2">
          <button
            onClick={onRandomClick}
            className="p-2 text-sky-400 bg-sky-500/10 rounded-lg"
            title="Random Puzzle"
          >
            <Dices className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white rounded-lg"
            id="nav-mobile-toggle"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-4 pt-2 pb-6 bg-slate-900 border-b border-slate-800 space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-slate-800">
            <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold">
              <Flame className="w-4 h-4 fill-amber-400" />
              <span>{streak} Day Streak</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenFavorites}
                className="p-2 text-rose-400 bg-slate-800 rounded-lg flex items-center gap-1 text-xs"
              >
                <Heart className="w-4 h-4 fill-rose-500/20" />
                <span>Favorites ({favoritesCount})</span>
              </button>
             
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg text-center"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
