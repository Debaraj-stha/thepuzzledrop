import { ElementType } from 'react';
import { CategoryType } from '../types';
import { 
  Puzzle, 
  Brain, 
  Binary, 
  Sparkles, 
  Eye, 
  Film, 
  Smile 
} from 'lucide-react';

interface CategoriesSectionProps {
  onSelectCategory: (category: CategoryType) => void;
}

const CATEGORY_CARDS: {
  title: CategoryType;
  icon: ElementType;
  description: string;
  color: string;
  glow: string;
}[] = [
  {
    title: 'Riddle',
    icon: Puzzle,
    description: 'Wordplay, metaphorical teasers, and clever linguistic mysteries.',
    color: 'from-amber-500 to-amber-600',
    glow: 'group-hover:shadow-amber-500/20',
  },
  {
    title: 'Brain Teaser',
    icon: Brain,
    description: 'Lateral thinking puzzles that challenge your conventional assumptions.',
    color: 'from-sky-500 to-sky-600',
    glow: 'group-hover:shadow-sky-500/20',
  },
  {
    title: 'Math',
    icon: Binary,
    description: 'Numerical sequences, algebra riddles, and geometric paradoxes.',
    color: 'from-emerald-500 to-emerald-600',
    glow: 'group-hover:shadow-emerald-500/20',
  },
  {
    title: 'Logic',
    icon: Sparkles,
    description: 'Deductive reasoning, truth-teller paradoxes, and switch puzzles.',
    color: 'from-indigo-500 to-indigo-600',
    glow: 'group-hover:shadow-indigo-500/20',
  },
  {
    title: 'Spot Difference',
    icon: Eye,
    description: 'Visual observation tests and hidden pattern anomalies.',
    color: 'from-purple-500 to-purple-600',
    glow: 'group-hover:shadow-purple-500/20',
  },
  {
    title: 'Guess Movie',
    icon: Film,
    description: 'Cryptic movie plots disguised entirely in emoji stories.',
    color: 'from-rose-500 to-rose-600',
    glow: 'group-hover:shadow-rose-500/20',
  },
  {
    title: 'Emoji Quiz',
    icon: Smile,
    description: 'Popular pop culture, famous icons, and books coded in emojis.',
    color: 'from-teal-500 to-teal-600',
    glow: 'group-hover:shadow-teal-500/20',
  },
];

export function CategoriesSection({ onSelectCategory }: CategoriesSectionProps) {
  return (
    <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Explore Categories
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-2">
          Dive into your favorite puzzle formats, designed to exercise different regions of your cognitive thinking.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {CATEGORY_CARDS.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.title}
              onClick={() => {
                onSelectCategory(cat.title);
                const el = document.getElementById('archive');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group text-left p-6 rounded-[24px] bg-[#1E293B]/40 hover:bg-[#38BDF8]/5 border border-white/5 hover:border-[#38BDF8]/30 transition-all hover:-translate-y-1 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${cat.color} p-2.5 text-slate-950 font-bold mb-4 shadow-lg group-hover:scale-110 transition-transform flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-slate-950" />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors mb-2">
                  {cat.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-6 text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                <span>Browse Puzzles</span>
                <span>→</span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
