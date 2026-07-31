import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How often are puzzles posted?',
      answer: 'We publish a fresh Daily Drop every single day at 00:00 UTC. You can also explore hundreds of past riddles in our Puzzle Archive.',
    },
    {
      question: 'Can I submit puzzles?',
      answer: 'Yes! We love community submissions. Follow us on X or Instagram and DM us your favorite riddles or original brain teasers to be featured in future daily drops.',
    },
    {
      question: 'Where are answers revealed?',
      answer: 'Answers can be revealed directly on any puzzle card by clicking the "Reveal Answer" button. Each revealed answer includes a detailed step-by-step explanation.',
    },
    {
      question: 'Do I need an account?',
      answer: 'No! ThePuzzleDrop is 100% free and static. Your streak, solved puzzles, and saved favorites are automatically saved directly in your browser\'s local storage.',
    },
    {
      question: 'Are answers case-sensitive?',
      answer: 'Not at all! Our smart answer validation automatically handles uppercase/lowercase letters, extra spaces, punctuation, and leading articles (like "a" or "the").',
    },
  ];

  return (
    <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-3">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Got Questions?</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={faq.question}
              className="bg-slate-800/80 border border-slate-700/60 rounded-2xl overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
              >
                <span className="font-bold text-base sm:text-lg text-white">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-amber-400 transition-transform duration-300 shrink-0 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-6 pb-6 text-slate-300 text-sm leading-relaxed border-t border-slate-700/40 pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
