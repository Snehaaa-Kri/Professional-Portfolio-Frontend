import React from 'react';
import { Mail } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { portfolioData } from '../data/portfolioData';

export default function Footer() {
  const name = import.meta.env.VITE_OWNER_NAME || portfolioData.personalInfo.name;
  const github = import.meta.env.VITE_GITHUB_URL || portfolioData.personalInfo.github || '#';
  const linkedin = import.meta.env.VITE_LINKEDIN_URL || portfolioData.personalInfo.linkedin || '#';
  const email = import.meta.env.VITE_EMAIL || portfolioData.personalInfo.email || '#';

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, href: github, label: 'GitHub' },
    { icon: <Linkedin className="h-5 w-5" />, href: linkedin, label: 'LinkedIn' },
    { icon: <Mail className="h-5 w-5" />, href: `mailto:${email}`, label: 'Email' },
  ];

  return (
    <footer className="bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="flex justify-center space-x-6">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-500/50 dark:hover:border-indigo-400/50 hover:shadow-glow-indigo flex items-center justify-center transition-all duration-300"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>
        <p className="text-slate-500 dark:text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} {name}. All rights reserved.
        </p>
        <p className="text-slate-400 dark:text-slate-600 text-xs">
          Built with React.js, Vite, Tailwind CSS, and Framer Motion.
        </p>
      </div>
    </footer>
  );
}
