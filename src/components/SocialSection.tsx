import { Twitter, Instagram, Facebook, ArrowUpRight } from 'lucide-react';

export function SocialSection() {
  const socials = [
    {
      name: 'Follow on X',
      handle: '@ThePuzzleDrop',
      icon: Twitter,
      url: 'https://x.com',
      color: 'from-sky-500/20 to-slate-900 border-sky-500/30 text-sky-400',
      buttonBg: 'bg-sky-500 hover:bg-sky-400 text-slate-950',
    },
    {
      name: 'Follow on Instagram',
      handle: '@ThePuzzleDrop',
      icon: Instagram,
      url: 'https://instagram.com',
      color: 'from-pink-500/20 via-purple-500/10 to-slate-900 border-pink-500/30 text-pink-400',
      buttonBg: 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white',
    },
    {
      name: 'Follow on Facebook',
      handle: '/ThePuzzleDrop',
      icon: Facebook,
      url: 'https://facebook.com',
      color: 'from-blue-600/20 to-slate-900 border-blue-600/30 text-blue-400',
      buttonBg: 'bg-blue-600 hover:bg-blue-500 text-white',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Join Our Solver Community
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-2">
          Daily drop alerts, community leaderboard highlights, and bonus mini-riddles posted every day.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {socials.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.name}
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-b ${s.color} border p-8 flex flex-col justify-between shadow-xl group`}
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-900/80 border border-slate-700 flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  {s.name}
                </h3>
                <p className="text-slate-400 text-xs font-mono mb-6">
                  {s.handle}
                </p>
              </div>

              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-transform group-hover:scale-[1.02] shadow-lg`}
              >
                <span>Connect</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}
