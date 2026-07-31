import { motion } from 'motion/react';
import { Trophy, Flame, CheckCircle, Heart, Zap } from 'lucide-react';

interface StatsSectionProps {
  solvedCount: number;
  streak: number;
  favoritesCount: number;
}

export function StatsSection({ solvedCount, streak, favoritesCount }: StatsSectionProps) {
  const globalStats = [
    { label: 'Total Puzzles Created', value: '500+', desc: 'Handcrafted brain benders' },
    { label: 'Community Solves', value: '100K+', desc: 'Across 120+ countries' },
    { label: 'Puzzle Categories', value: '50+', desc: 'Riddles, Math, Logic & more' },
  ];

  return (
    <section id="stats" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Global Counters */}
      <div className="bg-[#1E293B]/40 border border-white/5 rounded-[32px] p-8 sm:p-12 shadow-2xl relative overflow-hidden mb-12">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#38BDF8]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center max-w-xl mx-auto mb-10 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FACC15]/10 border border-[#FACC15]/20 text-[#FACC15] text-xs font-semibold mb-3">
            <Trophy className="w-3.5 h-3.5" />
            <span>Platform Impact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            ThePuzzleDrop Numbers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 text-center">
          {globalStats.map((stat, idx) => (
            <div key={stat.label} className="p-6 rounded-2xl bg-[#1E293B]/40 border border-white/5">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`text-4xl sm:text-5xl font-extrabold ${idx % 2 === 0 ? 'text-[#FACC15]' : 'text-[#38BDF8]'} font-mono tracking-tight mb-2`}
              >
                {stat.value}
              </motion.div>
              <div className="text-base font-bold text-white mb-1">{stat.label}</div>
              <div className="text-xs text-[#CBD5E1] uppercase tracking-wide">{stat.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* User Personal Stats Card */}
      <div className="bg-[#1E293B]/60 backdrop-blur-xl border border-white/10 rounded-[24px] p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-6">
          <Zap className="w-5 h-5 text-[#FACC15] fill-[#FACC15]" />
          <h3 className="text-xl font-bold text-white">Your Solver Dashboard</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-[#0F172A]/80 border border-white/5">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white font-mono">{solvedCount}</div>
              <div className="text-xs text-[#CBD5E1]">Puzzles Solved</div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-[#0F172A]/80 border border-white/5">
            <div className="p-3 rounded-xl bg-[#FACC15]/10 text-[#FACC15]">
              <Flame className="w-6 h-6 fill-[#FACC15]" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white font-mono">{streak} Days</div>
              <div className="text-xs text-[#CBD5E1]">Active Streak</div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-[#0F172A]/80 border border-white/5">
            <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400">
              <Heart className="w-6 h-6 fill-rose-500/20" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white font-mono">{favoritesCount}</div>
              <div className="text-xs text-[#CBD5E1]">Saved Favorites</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
