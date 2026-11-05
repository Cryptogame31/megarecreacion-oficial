import React from 'react';
import { motion } from 'motion/react';
import { METRICS } from '../data/mockData';
import { Award, Users, Clock, ThumbsUp, Sparkles } from 'lucide-react';

export const Metrics: React.FC = () => {
  const icons = [
    <Award className="w-7 h-7 text-pink-400 drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]" />,
    <Users className="w-7 h-7 text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]" />,
    <Clock className="w-7 h-7 text-amber-400 drop-shadow-[0_0_10px_rgba(245,158,11,0.8)]" />,
    <ThumbsUp className="w-7 h-7 text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]" />,
  ];

  const glowColors = [
    'rgba(236,72,153,0.3)',
    'rgba(6,182,212,0.3)',
    'rgba(245,158,11,0.3)',
    'rgba(16,185,129,0.3)',
  ];

  return (
    <section id="metricas-section" className="relative -mt-6 sm:-mt-10 z-20 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-realistic rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.7)] backdrop-blur-2xl relative overflow-hidden"
      >
        {/* Subtle Ambient Background Light */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-32 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 relative z-10">
          {METRICS.map((metric, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.04, y: -3 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className="flex flex-col items-center text-center space-y-1.5 sm:space-y-2 p-2 rounded-2xl group cursor-default"
            >
              <div
                className="p-2.5 sm:p-3.5 rounded-2xl bg-slate-900/90 border border-white/15 shadow-lg group-hover:border-white/40 transition-all duration-300 relative overflow-hidden"
                style={{
                  boxShadow: `0 0 20px ${glowColors[idx]}`,
                }}
              >
                {icons[idx]}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <span className="font-display text-2xl sm:text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent drop-shadow-md">
                {metric.value}
              </span>

              <span className="text-xs sm:text-base font-extrabold text-pink-300 flex items-center justify-center gap-1 text-center">
                {metric.label}
              </span>

              <span className="text-[11px] sm:text-xs text-slate-400 font-semibold">{metric.sublabel}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
