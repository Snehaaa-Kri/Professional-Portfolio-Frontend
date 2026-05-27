import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Github } from './Icons';
import { portfolioData } from '../data/portfolioData';

// Gradient placeholder when project image fails / is a local path
const PLACEHOLDER = 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=600&q=80';

export default function Projects() {
  const allProjects = portfolioData.projects;
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...new Set(allProjects.map((p) => p.category))];
  const filteredProjects =
    filter === 'All' ? allProjects : allProjects.filter((p) => p.category === filter);

  return (
    <section
      id="projects"
      className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden relative"
    >
      {/* bg orbs */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-violet-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-sm font-bold text-violet-600 dark:text-violet-400 uppercase tracking-widest mb-2">
            Portfolio
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
            Featured Projects
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full mx-auto mt-4" />
        </div>

        {/* Filter Pills */}
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`relative px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                filter === cat
                  ? 'text-white shadow-lg shadow-violet-500/25'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-violet-400/50'
              }`}
            >
              {filter === cat && (
                <motion.div
                  layoutId="activeProjectFilter"
                  className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                />
              )}
              {cat}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.article
                layout
                key={project.title}
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4 }}
                className="group relative rounded-3xl overflow-hidden border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900/80 flex flex-col hover:border-violet-400/50 dark:hover:border-violet-500/40 hover:shadow-xl dark:hover:shadow-violet-900/20 transition-all duration-400"
              >
                {/* Gradient border glow on hover */}
                <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-violet-500/0 via-indigo-500/0 to-pink-500/0 group-hover:from-violet-500/20 group-hover:via-indigo-500/20 group-hover:to-pink-500/20 transition-all duration-500 pointer-events-none" />

                {/* Image */}
                <div className="aspect-[16/9] overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    onError={(e) => { e.target.src = PLACEHOLDER; }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600 ease-out"
                    loading="lazy"
                  />
                  {/* overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Category chip */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-violet-600/90 backdrop-blur-md text-white text-xs font-bold shadow-lg">
                    {project.category}
                  </div>

                  {/* Hover quick-links overlay */}
                  <div className="absolute bottom-4 inset-x-4 flex gap-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <a
                      href={project.github || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-slate-900/90 backdrop-blur-md text-white text-sm font-semibold hover:bg-slate-800 transition-colors"
                    >
                      <Github className="h-4 w-4" /> Code
                    </a>
                    <a
                      href={project.demo || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-violet-600/90 backdrop-blur-md text-white text-sm font-semibold hover:bg-violet-700 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" /> Demo
                    </a>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-grow text-left gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors leading-tight mb-2">
                      {project.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/50 text-slate-600 dark:text-slate-300 text-xs font-semibold"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
