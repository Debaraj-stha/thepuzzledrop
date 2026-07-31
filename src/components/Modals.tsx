import { X, Heart, History, ShieldCheck, FileText, Check, ArrowUpRight } from 'lucide-react';
import { Puzzle } from '../types';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  puzzles: Puzzle[];
  favoriteIds: number[];
  onSelectPuzzle: (id: number) => void;
  onToggleFavorite: (id: number) => void;
}

export function FavoritesModal({
  isOpen,
  onClose,
  puzzles,
  favoriteIds,
  onSelectPuzzle,
  onToggleFavorite,
}: FavoritesModalProps) {
  if (!isOpen) return null;

  const favoritePuzzles = puzzles.filter((p) => favoriteIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl p-6 shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h3 className="text-xl font-bold text-white">Your Saved Favorites</h3>
            <span className="text-xs font-mono bg-slate-800 px-2 py-0.5 rounded text-amber-400">
              {favoritePuzzles.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto py-4 space-y-3 flex-1 pr-1">
          {favoritePuzzles.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Heart className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <p className="text-sm">No favorite puzzles saved yet.</p>
              <p className="text-xs text-slate-500 mt-1">Click the heart icon on any puzzle card to save it here!</p>
            </div>
          ) : (
            favoritePuzzles.map((p) => (
              <div
                key={p.id}
                className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between gap-4 hover:border-slate-600 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono mb-1">
                    <span className="text-amber-400 font-bold">#{p.id}</span>
                    <span className="text-sky-400">{p.category}</span>
                    <span className="text-slate-500">• {p.difficulty}</span>
                  </div>
                  <h4 className="font-bold text-white text-base">{p.title}</h4>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      onSelectPuzzle(p.id);
                      onClose();
                    }}
                    className="px-3 py-1.5 bg-amber-400 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1 hover:bg-amber-300"
                  >
                    <span>Solve</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onToggleFavorite(p.id)}
                    className="p-1.5 text-rose-500 hover:bg-slate-700 rounded-lg"
                    title="Remove from favorites"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

interface RecentModalProps {
  isOpen: boolean;
  onClose: () => void;
  puzzles: Puzzle[];
  recentIds: number[];
  onSelectPuzzle: (id: number) => void;
}

export function RecentModal({
  isOpen,
  onClose,
  puzzles,
  recentIds,
  onSelectPuzzle,
}: RecentModalProps) {
  if (!isOpen) return null;

  const recentPuzzles = recentIds
    .map((id) => puzzles.find((p) => p.id === id))
    .filter((p): p is Puzzle => Boolean(p));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl p-6 shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-sky-400" />
            <h3 className="text-xl font-bold text-white">Recently Viewed</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto py-4 space-y-3 flex-1 pr-1">
          {recentPuzzles.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <History className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <p className="text-sm">No recently viewed puzzles.</p>
            </div>
          ) : (
            recentPuzzles.map((p) => (
              <div
                key={p.id}
                className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between gap-4 hover:border-slate-600 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono mb-1">
                    <span className="text-amber-400 font-bold">#{p.id}</span>
                    <span className="text-sky-400">{p.category}</span>
                  </div>
                  <h4 className="font-bold text-white text-base">{p.title}</h4>
                </div>

                <button
                  onClick={() => {
                    onSelectPuzzle(p.id);
                    onClose();
                  }}
                  className="px-3 py-1.5 bg-sky-500 text-white font-bold text-xs rounded-lg flex items-center gap-1 hover:bg-sky-400"
                >
                  <span>Revisit</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export function LegalModal({
  type,
  onClose,
}: {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}) {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl p-6 shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            {type === 'privacy' ? (
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            ) : (
              <FileText className="w-5 h-5 text-amber-400" />
            )}
            <h3 className="text-xl font-bold text-white">
              {type === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto py-6 space-y-4 text-slate-300 text-sm leading-relaxed pr-2">
          {type === 'privacy' ? (
            <>
              <p>
                <strong>ThePuzzleDrop Privacy Policy:</strong> We prioritize your privacy above all else. This website is 100% static and operates completely within your browser.
              </p>
              <h4 className="font-bold text-white">Data Storage</h4>
              <p>
                All your progress, solved puzzle states, active streaks, and favorited items are stored locally on your device using `localStorage`. No personal data, IP addresses, or analytics are transmitted to any remote servers.
              </p>
              <h4 className="font-bold text-white">Cookies & Tracking</h4>
              <p>
                We do not use third-party tracking cookies or advertising pixels. Enjoy a clean, private puzzle-solving experience.
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>ThePuzzleDrop Terms of Service:</strong> Welcome to ThePuzzleDrop! By accessing and using this website, you agree to these simple terms.
              </p>
              <h4 className="font-bold text-white">Intellectual Property</h4>
              <p>
                All puzzle questions, brain teasers, riddles, graphics, and visual design elements on ThePuzzleDrop are protected for community use. Feel free to copy and share individual daily puzzles with friends using the built-in share buttons.
              </p>
              <h4 className="font-bold text-white">Disclaimer</h4>
              <p>
                This website is provided "as is" for entertainment and educational purposes. Have fun and keep your brain sharp!
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
