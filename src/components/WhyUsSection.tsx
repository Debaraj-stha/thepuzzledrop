import { Brain, Zap, Target } from 'lucide-react';

export function WhyUsSection() {
  const cards = [
    {
      icon: Brain,
      title: 'Improve Thinking',
      description: 'Strengthen cognitive agility, logical deduction, and creative problem-solving skills with daily mental exercises.',
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    },
    {
      icon: Zap,
      title: 'Daily Challenges',
      description: 'Handcrafted puzzle drops published daily. Build a streak and turn curiosity into a fulfilling daily habit.',
      color: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
    },
    {
      icon: Target,
      title: 'Fun Learning',
      description: 'No paywalls, no clutter, and no ad noise. Pure, satisfying riddles designed for quick coffee breaks or deep sessions.',
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Why ThePuzzleDrop?
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-2">
          Designed for thinkers, problem solvers, and puzzle lovers worldwide.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.title}
              className="group p-8 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-slate-600 transition-all hover:-translate-y-1 shadow-xl"
            >
              <div className={`w-14 h-14 rounded-2xl border ${c.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <Icon className="w-7 h-7" />
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                {c.title}
              </h3>

              <p className="text-slate-400 text-sm leading-relaxed">
                {c.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
