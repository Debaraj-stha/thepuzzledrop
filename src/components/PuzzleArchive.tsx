import { useState } from 'react';
import { Search, Filter, Check, Heart, ArrowUpRight, Sparkles } from 'lucide-react';
import { Puzzle, CategoryType, DifficultyType } from '../types';

interface PuzzleArchiveProps {
  puzzles: Puzzle[];
  solvedIds: number[];
  favoriteIds: number[];
  selectedCategory: CategoryType | 'All';
  selectedDifficulty: DifficultyType | 'All';
  searchQuery: string;
  onSelectPuzzle: (id: number) => void;
  onToggleFavorite: (id: number) => void;
  onCategoryChange: (cat: CategoryType | 'All') => void;
  onDifficultyChange: (diff: DifficultyType | 'All') => void;
  onSearchChange: (q: string) => void;
}

const CATEGORIES: (CategoryType | 'All')[] = [
  'All',
  'Riddle',
  'Brain Teaser',
  'Math',
  'Logic',
  'Spot Difference',
  'Guess Movie',
  'Emoji Quiz',
];

const DIFFICULTIES: (DifficultyType | 'All')[] = [
  'All',
  'Easy',
  'Medium',
  'Hard',
  'Expert',
];

export function PuzzleArchive({
  puzzles,
  solvedIds,
  favoriteIds,
  selectedCategory,
  selectedDifficulty,
  searchQuery,
  onSelectPuzzle,
  onToggleFavorite,
  onCategoryChange,
  onDifficultyChange,
  onSearchChange,
}: PuzzleArchiveProps) {
  const [showFilters, setShowFilters] = useState(false);

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy': return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'Medium': return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'Hard': return 'bg-orange-500/15 text-orange-400 border-orange-500/30';
      case 'Expert': return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
      default: return 'bg-slate-500/15 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <section id="archive" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complete Collection</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Puzzle Archive
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Explore our vast repository of brain benders, riddles, and logic tests.
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search puzzles or keywords..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400"
              id="archive-search-input"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2.5 rounded-xl border transition-colors flex items-center gap-1.5 text-xs font-semibold ${
              selectedCategory !== 'All' || selectedDifficulty !== 'All'
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
            id="archive-filter-btn"
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>
      </div>

      {/* Category Pills & Difficulty Filter bar */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#FACC15] text-[#0F172A] font-bold shadow-md shadow-yellow-500/10'
                  : 'bg-[#1E293B]/60 hover:bg-white/5 text-[#CBD5E1] hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Difficulty Filter row */}
        {(showFilters || selectedDifficulty !== 'All') && (
          <div className="flex items-center gap-2 pt-2 border-t border-white/10">
            <span className="text-xs text-[#CBD5E1] font-mono">Difficulty:</span>
            {DIFFICULTIES.map((diff) => (
              <button
                key={diff}
                onClick={() => onDifficultyChange(diff)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  selectedDifficulty === diff
                    ? 'bg-[#38BDF8] text-[#0F172A] font-bold'
                    : 'bg-[#1E293B]/40 text-[#CBD5E1] hover:text-white border border-white/5'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Grid of Puzzle Cards */}
      {puzzles.length === 0 ? (
        <div className="text-center py-16 bg-[#1E293B]/40 rounded-2xl border border-white/5">
          <p className="text-[#CBD5E1] text-base font-medium">No puzzles found matching your criteria.</p>
          <button
            onClick={() => {
              onCategoryChange('All');
              onDifficultyChange('All');
              onSearchChange('');
            }}
            className="mt-4 px-4 py-2 bg-[#1E293B] hover:bg-white/5 text-[#FACC15] text-xs font-semibold rounded-lg border border-white/10"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {puzzles.map((p) => {
            const isSolved = solvedIds.includes(p.id);
            const isFavorite = favoriteIds.includes(p.id);

            return (
              <div
                key={p.id}
                className="group relative bg-[#1E293B]/40 hover:bg-[#38BDF8]/5 border border-white/5 hover:border-[#38BDF8]/30 rounded-[24px] p-6 transition-all hover:-translate-y-1 shadow-lg flex flex-col justify-between"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getDifficultyColor(p.difficulty)}`}>
                        {p.difficulty}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-sky-500/10 text-sky-400 border border-sky-500/20">
                        {p.category}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(p.id);
                      }}
                      className={`p-1.5 hover:bg-slate-700/60 rounded-lg transition-colors ${
                        isFavorite ? 'text-rose-500' : 'text-slate-500 hover:text-rose-400'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
                    </button>
                  </div>

                  {/* Title & Preview */}
                  <h3 className="font-bold text-lg text-white mb-2 group-hover:text-amber-400 transition-colors line-clamp-1">
                    #{p.id}. {p.title}
                  </h3>
                  <p className="text-slate-400 text-xs line-clamp-3 leading-relaxed mb-6 font-mono">
                    {p.question}
                  </p>
                </div>

                {/* Footer action */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-700/40 text-xs">
                  <span className="text-slate-500 font-mono">
                    {isSolved ? (
                      <span className="text-emerald-400 font-medium flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Solved
                      </span>
                    ) : (
                      'Unsolved'
                    )}
                  </span>

                  <button
                    onClick={() => onSelectPuzzle(p.id)}
                    className="flex items-center gap-1 text-amber-400 font-semibold group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Solve Puzzle</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
