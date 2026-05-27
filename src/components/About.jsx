import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Server, GraduationCap, Cpu, ExternalLink, RefreshCw } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const badges = [
  { icon: <GraduationCap className="w-4 h-4" />, text: 'CS Student @ IIIT Una' },
  { icon: <Server className="w-4 h-4" />,        text: 'Backend Developer' },
  { icon: <Code2 className="w-4 h-4" />,          text: 'MERN Stack' },
  { icon: <Cpu className="w-4 h-4" />,            text: 'DSA Enthusiast' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.13 } },
};
const itemVariants = {
  hidden: { y: 28, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.55, ease: 'easeOut' } },
};

/* Codolio embed image card – renders the user's public stats card as an <img> */
function CodolioCard({ url }) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Codolio card image endpoint
  const cardImgUrl = url || 'https://codolio.com/profile/sneha_00/card';

  if (error) return null;

  return (
    <div className="relative rounded-2xl overflow-hidden border border-slate-200/60 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/50 shadow-sm">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800/80">
          <RefreshCw className="w-5 h-5 text-violet-400 animate-spin" />
        </div>
      )}
      <a href={cardImgUrl.replace('/card', '')} target="_blank" rel="noopener noreferrer">
        <img
          src={cardImgUrl}
          alt="Codolio Stats Card"
          className="w-full object-contain"
          onLoad={() => setLoading(false)}
          onError={() => { setError(true); setLoading(false); }}
        />
      </a>
      <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-900/70 text-slate-300 backdrop-blur-sm">
        Codolio
      </div>
    </div>
  );
}

/* GitHub readme-stats card – fetches the public SVG from vercel */
function GithubStatsCard({ githubUrl }) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // extract username from URL e.g. https://github.com/Snehaaa-Kri
  const username = githubUrl ? githubUrl.replace(/\/$/, '').split('/').pop() : '';
  if (!username) return null;

  const statsUrl = `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=tokyonight&hide_border=true&bg_color=0d1117&title_color=a78bfa&icon_color=818cf8&text_color=94a3b8&count_private=true`;

  if (error) return null;

  return (
    <div className="relative rounded-2xl overflow-hidden border border-slate-200/60 dark:border-slate-700/50 bg-[#0d1117] shadow-sm">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800/80 min-h-[120px]">
          <RefreshCw className="w-5 h-5 text-violet-400 animate-spin" />
        </div>
      )}
      <a href={githubUrl} target="_blank" rel="noopener noreferrer">
        <img
          src={statsUrl}
          alt="GitHub Stats"
          className="w-full object-contain"
          onLoad={() => setLoading(false)}
          onError={() => { setError(true); setLoading(false); }}
        />
      </a>
      <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-900/70 text-slate-300 backdrop-blur-sm">
        GitHub
      </div>
    </div>
  );
}

/* GitHub streak stats card */
function StreakCard({ githubUrl }) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const username = githubUrl ? githubUrl.replace(/\/$/, '').split('/').pop() : '';
  if (!username) return null;

  const streakUrl = `https://streak-stats.demolab.com/?user=${username}&theme=tokyonight&hide_border=true&background=0d1117&stroke=a78bfa&ring=818cf8&fire=f472b6&currStreakLabel=a78bfa&sideLabels=94a3b8&dates=94a3b8`;

  if (error) return null;

  return (
    <div className="relative rounded-2xl overflow-hidden border border-slate-200/60 dark:border-slate-700/50 bg-[#0d1117] shadow-sm">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800/80 min-h-[120px]">
          <RefreshCw className="w-5 h-5 text-violet-400 animate-spin" />
        </div>
      )}
      <a href={githubUrl} target="_blank" rel="noopener noreferrer">
        <img
          src={streakUrl}
          alt="GitHub Streak"
          className="w-full object-contain"
          onLoad={() => setLoading(false)}
          onError={() => { setError(true); setLoading(false); }}
        />
      </a>
      <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-900/70 text-slate-300 backdrop-blur-sm">
        Streak
      </div>
    </div>
  );
}

export default function About() {
  const { bio, stats } = portfolioData.personalInfo;

  const leetcodeUrl  = import.meta.env.VITE_LEETCODE;
  const githubUrl    = import.meta.env.VITE_GITHUB_URL;
  const linkedinUrl  = import.meta.env.VITE_LINKEDIN_URL;

  return (
    <section
      id="about"
      className="py-24 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800 transition-colors duration-300 overflow-hidden relative"
    >
      {/* subtle bg accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-violet-500/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-indigo-500/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start"
        >
          {/* ── Left: Bio + Stats ── */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <motion.div variants={itemVariants} className="space-y-2">
              <p className="text-sm font-bold text-violet-600 dark:text-violet-400 uppercase tracking-widest">
                Introduction
              </p>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
                About Me
              </h2>
              <div className="h-1 w-16 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500" />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="space-y-5 text-slate-600 dark:text-slate-400 leading-relaxed text-base sm:text-lg"
            >
              {bio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </motion.div>

            {/* Badges */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              {badges.map(({ icon, text }) => (
                <span
                  key={text}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold hover:border-violet-400/60 dark:hover:border-violet-500/50 transition-colors"
                >
                  <span className="text-violet-500 dark:text-violet-400">{icon}</span>
                  {text}
                </span>
              ))}
            </motion.div>

            {/* ── Stat Cards (clickable → real profiles) ── */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <motion.a
                  key={stat.label}
                  href={stat.link || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="relative group glass-card p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800 text-center overflow-hidden cursor-pointer block no-underline"
                  aria-label={stat.linkLabel}
                >
                  {/* top gradient bar */}
                  <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-violet-500 via-indigo-500 to-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-t-2xl" />
                  {/* glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                  <div className="text-2xl mb-1 relative z-10">{stat.icon}</div>
                  <p className="text-3xl font-black bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent mb-0.5 relative z-10">
                    {stat.value}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider relative z-10">
                    {stat.label}
                  </p>

                  {/* hover link label */}
                  <div className="flex items-center justify-center gap-1 mt-2 text-[11px] font-semibold text-violet-500 dark:text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 relative z-10">
                    <ExternalLink className="w-3 h-3" />
                    <span>{stat.linkLabel}</span>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Live profile embed cards ── */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-6 space-y-4"
          >
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">
              Live Profile Stats
            </p>

            {/* Codolio DSA card */}
            <CodolioCard url={leetcodeUrl} />

            {/* GitHub readme-stats */}
            <GithubStatsCard githubUrl={githubUrl} />

            {/* GitHub streak */}
            <StreakCard githubUrl={githubUrl} />

            {/* Footer note */}
            <p className="text-center text-[11px] text-slate-400 dark:text-slate-600 font-medium">
              Stats auto-updated from{' '}
              <a href={leetcodeUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-violet-500 transition-colors">Codolio</a>
              {' & '}
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-violet-500 transition-colors">GitHub</a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
