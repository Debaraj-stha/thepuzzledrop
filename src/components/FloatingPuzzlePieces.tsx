import { motion } from 'motion/react';

export function FloatingPuzzlePieces() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Background ambient glowing gradients */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl" />

      {/* Floating puzzle SVGs */}
      <motion.div
        animate={{
          y: [0, -25, 0],
          rotate: [0, 8, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-20 left-[10%] text-amber-400/20 text-6xl"
      >
        <svg className="w-16 h-16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5H2V20c0 1.1.9 2 2 2h4v-1.5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5V22h4c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5s-1.12-2.5-2.5-2.5z"/>
        </svg>
      </motion.div>

      <motion.div
        animate={{
          y: [0, 30, 0],
          rotate: [0, -12, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute top-1/2 right-[12%] text-sky-400/20 text-7xl"
      >
        <svg className="w-20 h-20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5H2V20c0 1.1.9 2 2 2h4v-1.5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5V22h4c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5s-1.12-2.5-2.5-2.5z"/>
        </svg>
      </motion.div>

      <motion.div
        animate={{
          y: [0, -20, 0],
          x: [0, 15, 0],
          rotate: [0, 15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute bottom-1/4 left-[15%] text-indigo-400/15 text-5xl"
      >
        <svg className="w-14 h-14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5H2V20c0 1.1.9 2 2 2h4v-1.5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5V22h4c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5s-1.12-2.5-2.5-2.5z"/>
        </svg>
      </motion.div>
    </div>
  );
}
