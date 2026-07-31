import { ArrowDown, Puzzle, Twitter } from 'lucide-react';
import { motion } from 'motion/react';
import { SOCIAL } from '../data/social';

interface HeroProps {
  onStartSolving: () => void;
}

export function Hero({ onStartSolving }: HeroProps) {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center">
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FACC15]/10 rounded-full border border-[#FACC15]/20 mb-6"
        >
          <span className="w-1.5 h-1.5 bg-[#FACC15] rounded-full animate-pulse" />
          <span className="text-[10px] uppercase tracking-widest font-bold text-[#FACC15]">Daily Challenge • New Drop Every Midnight</span>
        </motion.div>

        {/* Large Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-6"
        >
          Challenge Your Mind <br />
          <span className="text-[#38BDF8]">Every Single Day.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg sm:text-xl text-[#CBD5E1] max-w-2xl leading-relaxed mb-10"
        >
          Solve daily riddles, logic puzzles, and brain teasers in a premium minimal experience.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={onStartSolving}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#FACC15] text-[#0F172A] font-bold text-base shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-2.5 transition-all hover:scale-[1.02] active:scale-[0.98]"
            id="hero-start-solving-btn"
          >
            <Puzzle className="w-5 h-5 text-[#0F172A]" />
            <span>Start Solving</span>
          </button>

          <a
            href={SOCIAL.X}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-[#1E293B] border border-white/10 rounded-xl hover:bg-white/5 text-[#CBD5E1] hover:text-white font-medium text-base flex items-center justify-center gap-2.5 transition-all"
            id="hero-follow-x-btn"
          >
            <Twitter className="w-5 h-5 text-[#38BDF8]" />
            <span>Follow on X</span>
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="mt-16 text-slate-500 flex flex-col items-center gap-1 cursor-pointer"
          onClick={onStartSolving}
        >
          <span className="text-xs uppercase tracking-widest font-mono">Explore Daily Drop</span>
          <ArrowDown className="w-4 h-4 text-amber-400/80" />
        </motion.div>
      </div>
    </section>
  );
}
