import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const tabIcons = { Languages: '{ }', Frontend: '⬡', 'Backend & APIs': '⚙', 'Databases & Tools': '🗄' };

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};
const itemVariants = {
  hidden: { y: 16, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
};

// Colour stops per skill level
function levelColor(level) {
  if (level >= 90) return 'from-emerald-500 to-teal-400';
  if (level >= 80) return 'from-violet-600 to-indigo-500';
  if (level >= 70) return 'from-indigo-500 to-blue-400';
  return 'from-slate-500 to-slate-400';
}

export default function Skills() {
  const categories = portfolioData.skills;
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section
      id="skills"
      className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden relative"
    >
      {/* bg accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-violet-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title */}
        <div className="text-center mb-14">
          <p className="text-sm font-bold text-violet-600 dark:text-violet-400 uppercase tracking-widest mb-2">
            Expertise
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
            Skills & Tech Stack
          </h2>
          <div className="h-1 w-16 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 mx-auto mt-4" />
        </div>

        {/* Category Tab Selector */}
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {categories.map((cat, idx) => (
            <button
              key={cat.category}
              onClick={() => setActiveTab(idx)}
              className={`relative px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                activeTab === idx
                  ? 'text-white shadow-lg shadow-violet-500/25'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-violet-400/50 dark:hover:border-violet-500/40'
              }`}
            >
              {activeTab === idx && (
                <motion.div
                  layoutId="activeSkillTabBg"
                  className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl -z-10"
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                />
              )}
              <span className="mr-1.5 font-mono text-xs opacity-70">
                {tabIcons[cat.category] || '#'}
              </span>
              {cat.category}
            </button>
          ))}
        </div>

        {/* Skill Cards */}
        <div className="min-h-[260px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              {categories[activeTab].items.map((skill) => (
                <motion.div
                  key={skill.name}
                  variants={itemVariants}
                  whileHover={{ y: -3 }}
                  className="group relative p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/70 dark:border-slate-800 hover:border-violet-400/50 dark:hover:border-violet-500/40 shadow-sm hover:shadow-md dark:shadow-none transition-all duration-300 overflow-hidden cursor-default"
                >
                  {/* ambient corner glow */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-violet-500/5 rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="flex justify-between items-center mb-3">
                    <span className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                      {skill.name}
                    </span>
                    <span className={`text-xs font-black px-2.5 py-1 rounded-lg bg-gradient-to-r ${levelColor(skill.level)} text-white shadow-sm`}>
                      {skill.level}%
                    </span>
                  </div>

                  {/* Progress track */}
                  <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.9, ease: 'easeOut', delay: 0.05 }}
                      className={`h-full bg-gradient-to-r ${levelColor(skill.level)} rounded-full relative`}
                    >
                      {/* shimmer */}
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shine_2s_ease-in-out_infinite]" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
