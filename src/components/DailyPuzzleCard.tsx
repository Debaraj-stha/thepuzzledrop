import { useState, useEffect, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Eye, 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  Copy, 
  Share2, 
  Check, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Puzzle } from '../types';
import { isAnswerCorrect } from '../utils/answerChecker';

interface DailyPuzzleCardProps {
  puzzle: Puzzle;
  totalPuzzles: number;
  currentIndex: number;
  isSolved: boolean;
  isFavorite: boolean;
  onSolve: (id: number) => void;
  onToggleFavorite: (id: number) => void;
  onPrev: () => void;
  onNext: () => void;
}

export function DailyPuzzleCard({
  puzzle,
  totalPuzzles,
  currentIndex,
  isSolved,
  isFavorite,
  onSolve,
  onToggleFavorite,
  onPrev,
  onNext,
}: DailyPuzzleCardProps) {
  const [userAnswer, setUserAnswer] = useState('');
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [shake, setShake] = useState(false);

  // Reset state when active puzzle changes
  useEffect(() => {
    setUserAnswer('');
    setStatus(isSolved ? 'correct' : 'idle');
    setShowHint(false);
    setShowExplanation(isSolved);
  }, [puzzle.id, isSolved]);

  const handleCheckAnswer = () => {
    if (!userAnswer.trim()) return;

    if (isAnswerCorrect(userAnswer, puzzle.answers)) {
      setStatus('correct');
      setShowExplanation(true);
      onSolve(puzzle.id);
      
      // Fire confetti burst!
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FACC15', '#38BDF8', '#F43F5E', '#10B981']
        });
      } catch (e) {
        console.error('Confetti trigger error', e);
      }
    } else {
      setStatus('incorrect');
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCheckAnswer();
    }
  };

  const handleCopyPuzzle = () => {
    const textToCopy = `🧩 ThePuzzleDrop #${puzzle.id}: ${puzzle.title}\n\nCategory: ${puzzle.category} | Difficulty: ${puzzle.difficulty}\n\n${puzzle.question}\n\nCan you solve it? Try at ThePuzzleDrop!`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    const shareData = {
      title: `ThePuzzleDrop #${puzzle.id} - ${puzzle.title}`,
      text: `Try solving this ${puzzle.category} on ThePuzzleDrop!`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      } catch {
        handleCopyPuzzle();
      }
    } else {
      handleCopyPuzzle();
    }
  };

  // Difficulty badge colors
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
    <section id="daily-puzzle" className="max-w-3xl mx-auto px-4 py-8">
      {/* Progress & Header Controls */}
      <div className="flex items-center justify-between mb-4 text-xs sm:text-sm text-slate-400 font-mono">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-amber-400">Puzzle {currentIndex + 1} of {totalPuzzles}</span>
          {isSolved && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-sans font-medium">
              <Check className="w-3 h-3" /> Solved
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopyPuzzle}
            className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors flex items-center gap-1"
            title="Copy Puzzle text"
            id="puzzle-copy-btn"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>

          <button
            onClick={handleShare}
            className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors"
            title="Share Puzzle"
            id="puzzle-share-btn"
          >
            {shared ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </button>

          <button
            onClick={() => onToggleFavorite(puzzle.id)}
            className={`p-1.5 hover:bg-slate-800 rounded-lg transition-colors ${
              isFavorite ? 'text-rose-500 fill-rose-500' : 'text-slate-400 hover:text-rose-400'
            }`}
            title="Favorite Puzzle"
            id="puzzle-favorite-btn"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-8">
        <div 
          className="bg-gradient-to-r from-amber-400 to-sky-400 h-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / totalPuzzles) * 100}%` }}
        />
      </div>

      {/* Main Puzzle Card */}
      <motion.div
        animate={shake ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
        transition={{ duration: 0.5 }}
        className="relative bg-[#1E293B]/60 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 sm:p-10 shadow-2xl relative flex flex-col"
      >
        {/* Glow halo */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#FACC15]/10 rounded-full blur-2xl pointer-events-none" />

        {/* Puzzle Metadata Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-6 border-b border-white/10">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#0F172A] border border-white/10 text-[#FACC15]">
              #{puzzle.id}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(puzzle.difficulty)}`}>
              {puzzle.difficulty}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/30">
              {puzzle.category}
            </span>
          </div>

          <span className="text-xs text-[#CBD5E1] font-mono">
            {puzzle.date}
          </span>
        </div>

        {/* Puzzle Title & Question */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            {puzzle.title}
          </h2>
          <div className="bg-[#0F172A]/80 rounded-2xl p-6 border border-white/10 font-mono text-slate-200 text-base sm:text-lg whitespace-pre-line leading-relaxed shadow-inner">
            {puzzle.question}
          </div>
        </div>

        {/* Answer Input Section */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => {
                setUserAnswer(e.target.value);
                if (status === 'incorrect') setStatus('idle');
              }}
              onKeyDown={handleKeyDown}
              placeholder="Type your answer..."
              disabled={isSolved}
              className={`flex-1 px-6 py-4 rounded-2xl bg-[#0F172A] border text-white placeholder-slate-500 focus:outline-none transition-all font-medium text-base ${
                status === 'incorrect'
                  ? 'border-rose-500 focus:border-rose-500'
                  : status === 'correct'
                  ? 'border-emerald-500 focus:border-emerald-500'
                  : 'border-white/10 focus:border-[#FACC15]'
              }`}
              id="puzzle-answer-input"
            />

            <button
              onClick={handleCheckAnswer}
              disabled={isSolved || !userAnswer.trim()}
              className="px-6 py-4 bg-[#FACC15] text-[#0F172A] font-bold rounded-xl shadow-lg shadow-yellow-500/10 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px]"
              id="puzzle-check-answer-btn"
            >
              <span>Check Answer</span>
            </button>
          </div>

          {/* Feedback Message */}
          <AnimatePresence mode="wait">
            {status === 'correct' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <span className="font-bold">✅ Correct! Excellent!</span>
                    <p className="text-xs text-emerald-300/80">You nailed this brain teaser!</p>
                  </div>
                </div>

                <button
                  onClick={onNext}
                  className="px-4 py-2 bg-emerald-500 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1 hover:bg-emerald-400 transition-colors"
                >
                  <span>Next Puzzle</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            )}

            {status === 'incorrect' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center gap-2 text-sm font-medium"
              >
                <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                <span>❌ Not quite. Try again or check a hint!</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Hint & Reveal Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-700/50">
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-sky-400 hover:text-sky-300 bg-sky-500/10 hover:bg-sky-500/20 rounded-lg transition-colors"
            id="puzzle-hint-btn"
          >
            <HelpCircle className="w-4 h-4" />
            <span>{showHint ? 'Hide Hint' : 'Need a Hint?'}</span>
          </button>

          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors"
            id="puzzle-reveal-btn"
          >
            <Eye className="w-4 h-4 text-amber-400" />
            <span>{showExplanation ? 'Hide Answer' : 'Reveal Answer'}</span>
          </button>
        </div>

        {/* Hint Box */}
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mt-4"
            >
              <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-500/30 text-sky-200 text-sm">
                <span className="font-bold text-sky-400 flex items-center gap-1.5 mb-1">
                  💡 Hint
                </span>
                "{puzzle.hint}"
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Explanation / Answer Reveal Box */}
        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mt-4"
            >
              <div className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-slate-200 text-sm space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                  <Sparkles className="w-4 h-4" />
                  <span>Answer: {puzzle.answers[0].toUpperCase()}</span>
                </div>
                <p className="text-slate-300 leading-relaxed font-sans">
                  {puzzle.explanation}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={onPrev}
          disabled={currentIndex === 0}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-sm font-semibold border border-slate-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          id="puzzle-prev-btn"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Puzzle</span>
        </button>

        <button
          onClick={onNext}
          disabled={currentIndex === totalPuzzles - 1}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-sm font-semibold border border-slate-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          id="puzzle-next-btn"
        >
          <span>Next Puzzle</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
