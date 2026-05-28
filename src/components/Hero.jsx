import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, FileText, Mail, Terminal, Code2, Server, Database, Cpu } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { portfolioData } from '../data/portfolioData';

/* ─── Floating particle canvas ──────────────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.r = Math.random() * 1.5 + 0.5;
        this.alpha = Math.random() * 0.4 + 0.1;
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139,92,246,${this.alpha})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < 90; i++) particles.push(new Particle());

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      // draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(139,92,246,${0.08 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(loop);
    };
    loop();

    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

/* ─── Animated Code Terminal Card ───────────────────────────────────────── */
function TerminalCard({ leetcodeRating }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [cursor, setCursor] = useState(true);

  const codeLines = [
    { text: 'const dev = {', color: 'text-violet-300' },
    { text: '  name: "Sneha Kumari",', color: 'text-emerald-400' },
    { text: '  stack: ["MERN", "REST", "JWT"],', color: 'text-sky-400' },
    { text: `  rating: "${leetcodeRating || 1937}+ LeetCode",`, color: 'text-amber-400' },
    { text: '  status: "open_to_work",', color: 'text-emerald-400' },
    { text: '};', color: 'text-violet-300' },
    { text: '', color: '' },
    { text: 'dev.build("impact") 🚀', color: 'text-pink-400' },
  ];

  useEffect(() => {
    if (visibleLines < codeLines.length) {
      const t = setTimeout(() => setVisibleLines(v => v + 1), 420);
      return () => clearTimeout(t);
    }
  }, [visibleLines, codeLines.length]);

  useEffect(() => {
    const t = setInterval(() => setCursor(c => !c), 530);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="rounded-2xl overflow-hidden border border-slate-700/60 dark:border-slate-700/40 bg-slate-900/95 dark:bg-slate-950/95 shadow-2xl shadow-violet-900/20 backdrop-blur-xl">
      {/* Terminal titlebar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/80 border-b border-slate-700/50">
        <span className="w-3 h-3 rounded-full bg-red-500/80" />
        <span className="w-3 h-3 rounded-full bg-amber-400/80" />
        <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
        <span className="ml-3 text-xs text-slate-500 font-mono">portfolio.js</span>
      </div>
      {/* Code body */}
      <div className="p-5 font-mono text-sm leading-7 min-h-[210px]">
        {codeLines.slice(0, visibleLines).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
            className={`${line.color}`}
          >
            {line.text || '\u00A0'}
          </motion.div>
        ))}
        {visibleLines <= codeLines.length && (
          <span className={`inline-block w-2 h-4 bg-violet-400 align-middle transition-opacity ${cursor ? 'opacity-100' : 'opacity-0'}`} />
        )}
      </div>
    </div>
  );
}

/* ─── Orbiting Tech Icons ────────────────────────────────────────────────── */
const orbitItems = [
  { icon: <Server className="w-4 h-4" />, label: 'Node.js', angle: 0 },
  { icon: <Database className="w-4 h-4" />, label: 'MongoDB', angle: 72 },
  { icon: <Code2 className="w-4 h-4" />, label: 'React', angle: 144 },
  { icon: <Cpu className="w-4 h-4" />, label: 'REST API', angle: 216 },
  { icon: <Terminal className="w-4 h-4" />, label: 'Express', angle: 288 },
];

function OrbitRing() {
  const [rotation, setRotation] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setRotation(r => (r + 0.2) % 360), 16);
    return () => clearInterval(t);
  }, []);

  const r = 88;
  return (
    <div className="relative w-48 h-48 mx-auto">
      {/* Center core */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/40">
          <span className="text-white text-xl font-black font-mono">SK</span>
        </div>
        <div className="absolute w-20 h-20 rounded-full border border-violet-500/20 animate-ping" style={{ animationDuration: '2.5s' }} />
      </div>
      {/* Orbit path */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 192 192">
        <circle cx="96" cy="96" r={r} fill="none" stroke="rgba(139,92,246,0.15)" strokeWidth="1" strokeDasharray="4 6" />
      </svg>
      {/* Orbit items */}
      {orbitItems.map((item, i) => {
        const angle = ((item.angle + rotation) * Math.PI) / 180;
        const x = 96 + r * Math.cos(angle) - 20;
        const y = 96 + r * Math.sin(angle) - 20;
        return (
          <div
            key={i}
            className="absolute w-10 h-10 rounded-xl bg-slate-800/90 dark:bg-slate-900/90 border border-slate-700/60 flex items-center justify-center text-violet-400 shadow-md shadow-violet-900/20 transition-all"
            style={{ left: x, top: y }}
            title={item.label}
          >
            {item.icon}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Stat Chip ──────────────────────────────────────────────────────────── */
function StatChip({ value, label, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center px-5 py-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-700/50 backdrop-blur-sm shadow-sm"
    >
      <span className="text-2xl font-black bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">{value}</span>
      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5 whitespace-nowrap">{label}</span>
    </motion.div>
  );
}

/* ─── Tilt wrapper using mouse tracking ─────────────────────────────────── */
function TiltCard({ children }) {
  const cardRef = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    rotateX.set(-dy * 8);
    rotateY.set(dx * 8);
  };
  const handleMouseLeave = () => { rotateX.set(0); rotateY.set(0); };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 900 }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Main Hero ──────────────────────────────────────────────────────────── */
export default function Hero() {
  const { name, title, subtitle, taglines, avatarPlaceholder, stats } = portfolioData.personalInfo;

  const github   = import.meta.env.VITE_GITHUB_URL  || '#';
  const linkedin = import.meta.env.VITE_LINKEDIN_URL || '#';
  const email    = import.meta.env.VITE_EMAIL        || '#';
  const resume   = import.meta.env.VITE_RESUME_URL   || '#';

  const [taglineIndex, setTaglineIndex] = useState(0);
  const [statsData, setStatsData] = useState({
    leetcodeSolved: 816,
    leetcodeRating: 1937,
    totalSolved: 968,
    loading: true
  });

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    fetch(`${API_URL}/api/stats`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStatsData({
            leetcodeSolved: data.leetcodeSolved,
            leetcodeRating: data.leetcodeRating,
            totalSolved: data.totalSolved,
            loading: false
          });
        }
      })
      .catch(err => {
        console.error('Error fetching live stats in Hero:', err);
        setStatsData(prev => ({ ...prev, loading: false }));
      });
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTaglineIndex(p => (p + 1) % taglines.length), 2800);
    return () => clearInterval(t);
  }, [taglines.length]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-slate-50 dark:bg-[#07081a] transition-colors duration-500"
    >
      {/* ── Layered background ── */}
      <ParticleCanvas />

      {/* Gradient mesh orbs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-violet-500/10 dark:bg-violet-500/8 blur-[120px] pointer-events-none -translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-indigo-500/10 dark:bg-indigo-600/8 blur-[120px] pointer-events-none translate-x-1/4 translate-y-1/4" />
      <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full bg-pink-500/5 dark:bg-pink-500/5 blur-[80px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />

      {/* Fine dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* ── Content grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── LEFT: Text column ── */}
          <div className="space-y-7 text-left">

            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-violet-600/10 to-indigo-600/10 dark:from-violet-500/15 dark:to-indigo-500/15 border border-violet-300/40 dark:border-violet-500/30 text-violet-700 dark:text-violet-300 text-sm font-semibold backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Open to Internships & Full-Time Roles
            </motion.div>

            {/* Greeting + name */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl xl:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.08]"
            >
              Hi, I'm{' '}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-violet-500 via-indigo-500 to-pink-500 bg-clip-text text-transparent">
                  {name.split(' ')[0]}
                </span>
                {/* underline glow */}
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, delay: 0.7, ease: 'easeOut' }}
                  className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-indigo-400 to-pink-500 rounded-full origin-left"
                />
              </span>
              <br />
              <span className="text-slate-800 dark:text-slate-100">{name.split(' ')[1]}</span>
            </motion.h1>

            {/* Animated tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex items-center gap-3 text-lg sm:text-xl font-bold text-slate-600 dark:text-slate-400"
            >
              <span className="text-slate-400 dark:text-slate-600">{'>'}</span>
              <div className="h-8 relative overflow-hidden flex items-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={taglineIndex}
                    initial={{ y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -24, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="absolute font-mono text-violet-600 dark:text-violet-400 whitespace-nowrap"
                  >
                    {taglines[taglineIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="text-violet-500 font-mono"
              >_</motion.span>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed"
            >
              {subtitle}
            </motion.p>

            {/* Stat chips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              {stats.map((s, i) => {
                let displayValue = s.value;
                if (s.label === "DSA Problems Solved") {
                  displayValue = `${statsData.totalSolved}+`;
                } else if (s.label === "LeetCode Rating") {
                  displayValue = `${statsData.leetcodeRating}+`;
                }
                return (
                  <StatChip key={s.label} value={displayValue} label={s.label} delay={0.5 + i * 0.08} />
                );
              })}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap gap-4 pt-1"
            >
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo('projects')}
                className="relative group px-7 py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold shadow-lg shadow-violet-500/30 flex items-center gap-2 overflow-hidden transition-shadow hover:shadow-violet-500/50"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Projects <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
                {/* shine sweep */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                href={resume}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold flex items-center gap-2 hover:border-violet-400/60 dark:hover:border-violet-500/50 hover:shadow-md transition-all duration-200 backdrop-blur-sm"
              >
                <FileText className="h-4 w-4 text-violet-500" />
                Resume
              </motion.a>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
              className="flex items-center gap-5 pt-2"
            >
              {[
                { href: github,           icon: <Github className="h-5 w-5" />,   label: 'GitHub',   hover: 'hover:text-white hover:bg-slate-800' },
                { href: linkedin,         icon: <Linkedin className="h-5 w-5" />, label: 'LinkedIn', hover: 'hover:text-white hover:bg-blue-600' },
                { href: `mailto:${email}`,icon: <Mail className="h-5 w-5" />,     label: 'Email',    hover: 'hover:text-white hover:bg-pink-600' },
              ].map(({ href, icon, label, hover }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={label !== 'Email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 flex items-center justify-center transition-all duration-200 ${hover}`}
                >
                  {icon}
                </motion.a>
              ))}
              <span className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-slate-200 dark:from-slate-800 to-transparent" />
              <button
                onClick={() => scrollTo('contact')}
                className="text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
              >
                Let's connect →
              </button>
            </motion.div>
          </div>

          {/* ── RIGHT: Visual column ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            className="flex flex-col items-center gap-8"
          >
            {/* Orbit ring */}
            <div className="relative">
              {/* Ambient halo */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 via-indigo-500/20 to-pink-500/20 blur-3xl rounded-full scale-150 pointer-events-none" />
              <OrbitRing />
            </div>

            {/* Terminal code card with tilt */}
            <TiltCard>
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="w-full max-w-sm"
              >
                {/* Card glow border */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-500 to-pink-500 opacity-40 blur group-hover:opacity-70 transition duration-500" />
                  <div className="relative">
                    <TerminalCard leetcodeRating={statsData.leetcodeRating} />
                  </div>
                </div>
              </motion.div>
            </TiltCard>

            {/* Profile image badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="relative"
            >
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-violet-500 via-indigo-500 to-pink-500 opacity-60 blur-md" />
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white/30 dark:border-white/10 shadow-xl">
                <img
                  src={avatarPlaceholder}
                  alt={name}
                  className="w-full h-full object-cover"
                  onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=7c3aed&color=fff&size=80`; }}
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-950 flex items-center justify-center">
                <span className="text-white text-[8px] font-black">✓</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-xs text-slate-400 dark:text-slate-600 font-medium tracking-widest uppercase"
        >
          Scroll
        </motion.span>
        <motion.button
          onClick={() => scrollTo('about')}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          className="w-8 h-12 rounded-full border border-slate-300 dark:border-slate-700 flex items-start justify-center pt-2 text-slate-400 hover:text-violet-500 hover:border-violet-400/50 transition-colors"
          aria-label="Scroll to about section"
        >
          <motion.span
            animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="block w-1 h-3 bg-current rounded-full"
          />
        </motion.button>
      </div>
    </section>
  );
}
