import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FiInstagram, FiLinkedin, FiTwitter, FiFacebook,
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
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-gray-50 dark:bg-dark-800"
    >
      {/* ── Decorative background blobs ─────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-blob animation-delay-4000" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(#f07484 1px, transparent 1px), linear-gradient(90deg, #f07484 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container-custom w-full px-6 pt-24 pb-12 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-6">

          {/* ── Left: Text content ─────────────── */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            variants={containerVar}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={itemVar} className="inline-flex items-center gap-2 mb-5">
              <span className="w-8 h-px bg-primary" />
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-primary">
                Welcome to my portfolio
              </span>
              <span className="w-8 h-px bg-primary" />
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={itemVar}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white mb-4"
            >
              Hi, I'm{' '}
              <span className="gradient-text">Vasudev Kumar</span>
            </motion.h1>

            {/* Typed role */}
            <motion.div
              variants={itemVar}
              className="text-xl sm:text-2xl font-medium text-gray-600 dark:text-gray-300 mb-2 h-8"
            >
              <span className="typing-cursor">{typedRole}</span>
            </motion.div>

            {/* Sub-text */}
            <motion.p
              variants={itemVar}
              className="text-base text-gray-500 dark:text-gray-400 mb-8 max-w-lg mx-auto lg:mx-0"
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
              <button onClick={scrollToContact} className="btn-outline">
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
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-300 dark:border-white/20 text-gray-500 dark:text-gray-400 hover:border-primary hover:text-primary hover:bg-primary/10 transition-all duration-300"
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
            {/* Rotating ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  'conic-gradient(from 0deg, #f07484, #dd8fe7, transparent, #f07484)',
                padding: 3,
                borderRadius: '50%',
                width: '100%',
                height: '100%',
              }}
            />

            {/* Image wrapper */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-full overflow-hidden border-4 border-dark-800 shadow-2xl"
            >
              <img
                src="/img/vasudev.jpg"
                alt="Vasudev Kumar"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </motion.div>

            {/* Floating badge — role */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className="absolute -right-4 top-8 glass-card px-4 py-2 shadow-xl"
            >
              <p className="text-xs font-semibold text-gray-900 dark:text-white">👨‍💻 Full Stack Dev</p>
            </motion.div>

            {/* Floating badge — problems */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 }}
              className="absolute -left-4 bottom-10 glass-card px-4 py-2 shadow-xl"
            >
              <p className="text-xs font-semibold text-gray-900 dark:text-white">⚡ 500+ DSA Solved</p>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Stats bar ────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {stats.map(({ label, value }) => (
            <div
              key={label}
              className="glass-card p-4 text-center hover:border-primary/40 transition-colors duration-300"
            >
              <p className="text-2xl font-bold gradient-text">{value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Scroll indicator ─────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-400 dark:text-gray-600"
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
