import { Sparkles, Eye, Film, Smile, Brain, Binary } from 'lucide-react';

interface GallerySectionProps {
  onSelectPuzzle: (id: number) => void;
}

const GALLERY_ITEMS = [
  {
    id: 3,
    title: 'The Sinking Voyage',
    category: 'Guess Movie',
    emoji: '🚢 🧊 ❄️ 🌊 💎 💑',
    gradient: 'from-blue-600/40 via-sky-600/30 to-slate-900',
    icon: Film,
  },
  {
    id: 6,
    title: 'Pop Culture Icon',
    category: 'Emoji Quiz',
    emoji: '⚡ 🧙‍♂️ 🧹 👓 🏰',
    gradient: 'from-amber-600/40 via-amber-500/20 to-slate-900',
    icon: Smile,
  },
  {
    id: 4,
    title: 'The Missing Digit',
    category: 'Math',
    emoji: '2 → 6 → 12 → 20 → 30 → 42 → ?',
    gradient: 'from-emerald-600/40 via-teal-600/20 to-slate-900',
    icon: Binary,
  },
  {
    id: 11,
    title: 'Sci-Fi Masterpiece',
    category: 'Guess Movie',
    emoji: '🕶️ 💊 🔴 🔵 🥋 🤖 🕴️',
    gradient: 'from-emerald-700/40 via-emerald-600/20 to-slate-900',
    icon: Film,
  },
  {
    id: 9,
    title: 'Spot the Visual Anomaly',
    category: 'Spot Difference',
    emoji: '🕰️ ⏱️ ⌛ ⏰ ⌛ ⏱️',
    gradient: 'from-purple-600/40 via-purple-500/20 to-slate-900',
    icon: Eye,
  },
  {
    id: 14,
    title: 'The Explorer\'s Journey',
    category: 'Emoji Quiz',
    emoji: '🤠 🐍 📜 🗿 💎 🛕',
    gradient: 'from-amber-700/40 via-orange-600/20 to-slate-900',
    icon: Brain,
  },
];

export function GallerySection({ onSelectPuzzle }: GallerySectionProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Visual Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Puzzle Gallery
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            A visual gallery of emoji codes, visual anomalies, and mathematical sequences.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {GALLERY_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => onSelectPuzzle(item.id)}
              className="group relative h-64 rounded-2xl border border-slate-700/60 overflow-hidden cursor-pointer shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-amber-400/60"
            >
              {/* Background gradient canvas */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} transition-transform duration-500 group-hover:scale-110`} />

              {/* Grid overlay texture */}
              <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />

              {/* Content */}
              <div className="relative h-full p-6 flex flex-col justify-between z-10">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-900/80 text-amber-400 border border-slate-700/80 flex items-center gap-1.5 backdrop-blur-md">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.category}</span>
                  </span>
                  <span className="text-xs font-mono text-slate-400 bg-slate-900/80 px-2 py-1 rounded-md">
                    #{item.id}
                  </span>
                </div>

                <div className="my-auto text-center py-4">
                  <div className="text-3xl sm:text-4xl tracking-widest filter drop-shadow-md group-hover:scale-110 transition-transform duration-300">
                    {item.emoji}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-700/40">
                  <span className="font-bold text-white text-base group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </span>
                  <span className="text-xs font-semibold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-lg border border-amber-400/20 group-hover:bg-amber-400 group-hover:text-slate-950 transition-all">
                    Solve
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
