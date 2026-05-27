import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, ExternalLink, Calendar, Star } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const accentColors = [
  { bg: 'from-amber-500/10 to-orange-500/10', border: 'border-amber-400/30 hover:border-amber-400/60', icon: 'bg-amber-50 dark:bg-amber-950/50 text-amber-500', dot: 'bg-amber-400' },
  { bg: 'from-violet-500/10 to-indigo-500/10', border: 'border-violet-400/30 hover:border-violet-400/60', icon: 'bg-violet-50 dark:bg-violet-950/50 text-violet-500', dot: 'bg-violet-500' },
  { bg: 'from-emerald-500/10 to-teal-500/10', border: 'border-emerald-400/30 hover:border-emerald-400/60', icon: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-500', dot: 'bg-emerald-500' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

export default function Achievements() {
  const achievements = portfolioData.achievements;

  return (
    <section
      id="achievements"
      className="py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 transition-colors duration-300 overflow-hidden relative"
    >
      {/* bg orbs */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-bold text-violet-600 dark:text-violet-400 uppercase tracking-widest mb-2">
            Milestones
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
            Achievements & Certifications
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full mx-auto mt-4" />
        </div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {achievements.map((item, idx) => {
            const colors = accentColors[idx % accentColors.length];
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ y: -7, scale: 1.01 }}
                className={`relative group rounded-3xl p-6 bg-gradient-to-br ${colors.bg} border ${colors.border} flex flex-col justify-between transition-all duration-300 overflow-hidden cursor-default`}
              >
                {/* Corner star decoration */}
                <Star
                  className="absolute -top-3 -right-3 w-16 h-16 opacity-5 rotate-12 group-hover:opacity-10 transition-opacity"
                  fill="currentColor"
                />

                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className={`h-11 w-11 rounded-2xl ${colors.icon} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <Trophy className="h-5 w-5" />
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-slate-200/50 dark:border-slate-700/50">
                      <Calendar className="h-3 w-3" />
                      {item.date}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="text-left space-y-1.5">
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-lg leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                      <span className={`inline-block w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                      {item.issuer}
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed pt-1">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Verify link */}
                {item.link && (
                  <div className="pt-5 mt-5 border-t border-slate-200/50 dark:border-slate-700/50">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline transition-colors"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Verify Credential
                    </a>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
