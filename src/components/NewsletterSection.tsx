import { useState, FormEvent } from 'react';
import { Mail, CheckCircle, Sparkles } from 'lucide-react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="relative rounded-[24px] bg-gradient-to-br from-[#38BDF8]/20 to-transparent border border-[#38BDF8]/20 p-8 sm:p-12 text-center shadow-2xl overflow-hidden">
        <div className="max-w-xl mx-auto relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-[#FACC15]/10 border border-[#FACC15]/30 text-[#FACC15] flex items-center justify-center mx-auto mb-4">
            <Mail className="w-6 h-6" />
          </div>

          <h2 className="text-3xl font-extrabold text-white mb-3">
            Stay Sharp
          </h2>
          <p className="text-[#CBD5E1] text-sm mb-8 leading-relaxed">
            Get one unique puzzle delivered to your inbox every morning. Join 25,000+ puzzle enthusiasts.
          </p>

          {submitted ? (
            <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-semibold text-sm flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span>Coming Soon! Thanks for joining our early drop list.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                required
                className="flex-1 px-4 py-3.5 rounded-xl bg-[#0F172A]/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#FACC15] text-sm"
                id="newsletter-email-input"
              />
              <button
                type="submit"
                className="px-6 py-3.5 bg-white text-[#0F172A] font-bold text-sm rounded-xl shadow-lg hover:bg-slate-100 transition-all flex items-center justify-center gap-1.5"
                id="newsletter-subscribe-btn"
              >
                <Sparkles className="w-4 h-4 text-[#0F172A]" />
                <span>Join</span>
              </button>
            </form>
          )}

          <p className="text-[11px] text-white/40 mt-4 italic uppercase tracking-wider">
            *100% Free • No Spam
          </p>
        </div>
      </div>
    </section>
  );
}
