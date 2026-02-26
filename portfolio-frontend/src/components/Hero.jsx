import React, { useState, useEffect, useRef } from 'react';
import { motion, animate, useInView } from 'framer-motion';
// THREE + VANTA loaded via CDN in index.html → available as window.THREE / window.VANTA
import {
  FiInstagram, FiLinkedin, FiTwitter,
  FiGithub, FiDownload, FiArrowRight, FiArrowDown,
} from 'react-icons/fi';
import { personalInfo, stats } from '../data/index.js';

// ── Typing animation hook ──────────────────────────
function useTyping(words, speed = 100, pause = 2000) {
  const [text, setText]         = useState('');
  const [wordIdx, setWordIdx]   = useState(0);
  const [charIdx, setCharIdx]   = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    const delay   = deleting ? speed / 2 : charIdx === current.length ? pause : speed;

    const timeout = setTimeout(() => {
      if (!deleting && charIdx < current.length) {
        setText(current.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      } else if (!deleting && charIdx === current.length) {
        setDeleting(true);
      } else if (deleting && charIdx > 0) {
        setText(current.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
      } else {
        setDeleting(false);
        setWordIdx((w) => (w + 1) % words.length);
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, charIdx, deleting, wordIdx, words, speed, pause]);

  return text;
}

// ── Social icon map ────────────────────────────────
const SOCIALS = [
  { label: 'GitHub',    href: personalInfo.github,    Icon: FiGithub    },
  { label: 'LinkedIn',  href: personalInfo.linkedin,  Icon: FiLinkedin  },
  { label: 'Twitter',   href: personalInfo.twitter,   Icon: FiTwitter   },
  { label: 'Instagram', href: personalInfo.instagram, Icon: FiInstagram },
];

// ── Interactive particle canvas ────────────────────
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const N = 70;
    const particles = Array.from({ length: N }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r:  Math.random() * 1.5 + 0.5,
    }));

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', onMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 120 && d > 0) {
          p.vx += (dx / d) * 0.3;
          p.vy += (dy / d) * 0.3;
        }
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 1.5) { p.vx = p.vx / speed * 1.5; p.vy = p.vy / speed * 1.5; }
        p.vx *= 0.99;
        p.vy *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width)  p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(240,116,132,0.75)';
        ctx.fill();
      }

      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(221,143,231,${(1 - d / 130) * 0.45})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}

// ── Animated stat counter ──────────────────────────
function AnimatedStat({ value, label }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!inView) return;
    const match = value.match(/^([\d.]+)(\D*)$/);
    if (!match) { setDisplay(value); return; }
    const num      = parseFloat(match[1]);
    const suffix   = match[2];
    const decimals = match[1].includes('.') ? match[1].split('.')[1].length : 0;
    const controls = animate(0, num, {
      duration: 2,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(v.toFixed(decimals) + suffix),
    });
    return controls.stop;
  }, [inView, value]);

  return (
    <div
      ref={ref}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center hover:border-primary/40 transition-all duration-300"
    >
      <p className="text-2xl font-bold gradient-text">{display}</p>
      <p className="text-xs text-gray-400 mt-1">{label}</p>
    </div>
  );
}

// ── Framer variants ────────────────────────────────
const containerVar = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const itemVar = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

export default function Hero() {
  const typedRole = useTyping(personalInfo.roles);

  const scrollToContact = () =>
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    /*
     * Z-index layout:
     *   section  — NO background (body bg-dark-800 shows as fallback)
     *     Vanta canvas is inserted as first child at z-index:-1
     *     → sits in root stacking context, above body bg, below all z>0 children
     *   overlays — z-index: 1   (readability + ambient glow)
     *   content  — z-index: 2
     */
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Particle network */}
      <ParticleCanvas />

      {/* Dark readability overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1, background: 'rgba(0,0,0,0.22)' }}
      />

      {/* Pink / purple ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background:
            'radial-gradient(ellipse 80% 60% at 70% 40%, rgba(240,116,132,0.08) 0%, transparent 60%), ' +
            'radial-gradient(ellipse 60% 50% at 20% 70%, rgba(221,143,231,0.06) 0%, transparent 55%)',
        }}
      />

      {/* ── Main content ─────────────────────────── */}
      <div
        className="container-custom w-full px-6 pt-24 pb-12"
        style={{ position: 'relative', zIndex: 2 }}
      >
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-6">

          {/* ── Left: Text ───────────────────────── */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            variants={containerVar}
            initial="hidden"
            animate="visible"
          >
            {/* "HELLO, I AM" label */}
            <motion.div variants={itemVar} className="inline-flex items-center gap-3 mb-5">
              <span className="w-10 h-px bg-primary/60" />
              <span className="text-xs font-light tracking-[0.4em] uppercase text-gray-300/80">
                Hello, I Am
              </span>
              <span className="w-10 h-px bg-primary/60" />
            </motion.div>

            {/* Name — Playfair Display */}
            <motion.h1
              variants={itemVar}
              className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-5"
            >
              <span className="gradient-text">Vasudev Kumar</span>
            </motion.h1>

            {/* Typed role */}
            <motion.div
              variants={itemVar}
              className="text-lg sm:text-xl font-light text-gray-300 mb-2 h-8"
            >
              <span className="typing-cursor">{typedRole}</span>
            </motion.div>

            {/* Sub-text */}
            <motion.p
              variants={itemVar}
              className="text-sm text-gray-400 mb-8 max-w-lg mx-auto lg:mx-0 tracking-wide leading-relaxed"
            >
              Based in India · Building modern web apps & solving complex problems
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={itemVar}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10"
            >
              <a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <FiDownload size={16} />
                Download CV
              </a>
              <button onClick={scrollToContact} className="btn-outline-hero">
                Hire Me
                <FiArrowRight size={16} />
              </button>
            </motion.div>

            {/* Social links */}
            <motion.div
              variants={itemVar}
              className="flex items-center justify-center lg:justify-start gap-3"
            >
              {SOCIALS.map(({ label, href, Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-white/20 text-gray-400 hover:border-primary hover:text-primary hover:bg-primary/10 transition-all duration-300"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: Profile image ───────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="flex-shrink-0 relative"
          >
            {/* Rotating gradient ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, #f07484, #dd8fe7, transparent, #f07484)',
                padding: 3,
                borderRadius: '50%',
                width: '100%',
                height: '100%',
              }}
            />

            {/* Image */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-52 h-64 sm:w-64 sm:h-80 rounded-full overflow-hidden border-4 shadow-2xl shadow-primary/20"
              style={{ borderColor: '#091020' }}
            >
              <img
                src="/img/vasudev.jpg"
                alt="Vasudev Kumar"
                className="w-full h-full object-cover object-top"
                loading="eager"
              />
            </motion.div>

            {/* Floating badge — role */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className="absolute -right-4 top-8 bg-dark-700/90 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-2xl shadow-xl"
            >
              <p className="text-xs font-semibold text-white">👨‍💻 Full Stack Dev</p>
            </motion.div>

            {/* Floating badge — problems */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 }}
              className="absolute -left-4 bottom-10 bg-dark-700/90 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-2xl shadow-xl"
            >
              <p className="text-xs font-semibold text-white">⚡ 500+ DSA Solved</p>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Stats bar ────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {stats.map(({ label, value }) => (
            <AnimatedStat key={label} value={value} label={label} />
          ))}
        </motion.div>
      </div>

      {/* ── Scroll indicator ─────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-500"
        style={{ zIndex: 2 }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <FiArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
