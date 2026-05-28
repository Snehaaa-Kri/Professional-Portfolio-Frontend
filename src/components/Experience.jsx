import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Briefcase, MapPin } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Experience() {
  const experiences = portfolioData.experience;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <section
      id="experience"
      className="py-20 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800 transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
            Career path
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
            Work Experience
          </h2>
          <div className="h-1 w-20 bg-indigo-500 rounded-full mx-auto mt-3" />
        </div>

        {/* Vertical Timeline container */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 md:ml-6 space-y-12"
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={`${exp.company}-${index}`}
              variants={itemVariants}
              className="relative pl-8 md:pl-10 group"
            >
              {/* Timeline Indicator (Dot/Briefcase) */}
              <div className="absolute -left-[17px] top-1 h-8 w-8 rounded-full bg-white dark:bg-slate-900 border-2 border-indigo-500 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 dark:group-hover:bg-indigo-500 dark:group-hover:text-slate-950 transition-all duration-300 shadow-md">
                <Briefcase className="h-4 w-4" />
              </div>

              {/* Card wrapper */}
              <div className="glass-card p-6 md:p-8 rounded-2xl border border-slate-200/60 dark:border-slate-800 group-hover:border-indigo-500/40 dark:group-hover:border-indigo-400/40 group-hover:shadow-glow-indigo transition-all duration-300">
                
                {/* Header Information */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-base font-semibold text-slate-700 dark:text-slate-300">
                      {exp.company}
                    </p>
                  </div>
                  
                  {/* Period badge */}
                  <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
                    <Calendar className="h-4 w-4 text-indigo-500" />
                    <span className="font-medium">{exp.period}</span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center space-x-1.5 text-xs text-slate-500 dark:text-slate-400 mb-4">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{exp.location}</span>
                </div>

                {/* Description list */}
                <ul className="list-disc list-outside ml-4 space-y-2 text-slate-600 dark:text-slate-300 text-sm md:text-base mb-6">
                  {exp.description.map((bullet, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {bullet}
                    </li>
                  ))}
                </ul>

                {/* Technology Tags */}
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:border-indigo-400/40 dark:hover:border-indigo-500/40 transition-colors duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
