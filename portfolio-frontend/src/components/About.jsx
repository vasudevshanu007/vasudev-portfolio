import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';
import { personalInfo, skillBars, education, achievements } from '../data/index.js';

const TABS = ['Skills', 'Education', 'Achievements'];

// ── Animated progress bar ─────────────────────────
function SkillBar({ name, percentage, index }) {
  const ref     = useRef(null);
  const inView  = useInView(ref, { once: true, margin: '-30px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="mb-5"
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{name}</span>
        <span className="text-xs font-semibold text-primary">{percentage}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${percentage}%` } : {}}
          transition={{ duration: 1, delay: index * 0.07 + 0.2, ease: 'easeOut' }}
          className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
        />
      </div>
    </motion.div>
  );
}

const sectionVar = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const itemVar = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// Floating decorative blobs
const BLOBS = [
  { w: 200, h: 200, top: '5%',  left: '70%', color: '#dd8fe7', delay: 0,   dur: 8  },
  { w: 100, h: 100, top: '70%', left: '2%',  color: '#f07484', delay: 1.2, dur: 7  },
  { w: 70,  h: 70,  top: '40%', left: '92%', color: '#f07484', delay: 0.5, dur: 6  },
];

export default function About() {
  const [activeTab, setActiveTab] = useState('Skills');

  return (
    <section id="about" className="section-padding bg-white/90 dark:bg-dark-800/80 relative overflow-hidden">
      {/* Floating blobs */}
      {BLOBS.map((b, i) => (
        <motion.div
          key={i}
          aria-hidden
          animate={{ y: [0, -18, 0], x: [0, 12, 0] }}
          transition={{ duration: b.dur, repeat: Infinity, ease: 'easeInOut', delay: b.delay }}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: b.w, height: b.h,
            top: b.top, left: b.left,
            background: b.color,
            opacity: 0.05,
            filter: 'blur(45px)',
          }}
        />
      ))}
      <div className="container-custom">
        {/* Header */}
        <motion.div
          variants={sectionVar}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="text-center mb-14"
        >
          <motion.span variants={itemVar} className="text-xs font-semibold tracking-[0.3em] uppercase text-primary">
            Who I Am
          </motion.span>
          <motion.h2 variants={itemVar} className="section-title mt-2">
            About <span className="gradient-text">Me</span>
          </motion.h2>
          <motion.p variants={itemVar} className="section-subtitle max-w-xl mx-auto">
            A passionate developer who loves building products and solving hard problems.
          </motion.p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* ── Left: Image ──────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex-shrink-0 w-full lg:w-80 flex flex-col items-center lg:items-start gap-6"
          >
            <div className="relative w-56 h-80 lg:w-64 lg:h-96 mx-auto lg:mx-0">
              {/* Decorative border */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-accent p-0.5">
                <div className="w-full h-full rounded-2xl overflow-hidden bg-white dark:bg-dark-700">
                  <img
                    src="/img/vasudev.jpg"
                    alt="Vasudev Kumar"
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
              {/* Decoration square */}
              <div className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl border-2 border-primary/30 -z-10" />
            </div>

            {/* Quick facts */}
            <div className="glass-card p-4 w-full max-w-xs mx-auto lg:mx-0 space-y-3">
              {[
                { label: 'Name',     value: 'Vasudev Kumar' },
                { label: 'Role',     value: 'Full Stack Developer' },
                { label: 'Location', value: 'India' },
                { label: 'Email',    value: personalInfo.email, href: `mailto:${personalInfo.email}` },
              ].map(({ label, value, href }) => (
                <div key={label} className="flex gap-2 text-sm">
                  <span className="w-20 font-medium text-gray-500 dark:text-gray-400 flex-shrink-0">{label}:</span>
                  {href ? (
                    <a href={href} className="text-primary truncate hover:underline">{value}</a>
                  ) : (
                    <span className="text-gray-800 dark:text-gray-200">{value}</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Content ───────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex-1 min-w-0"
          >
            {/* Bio */}
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8 text-sm sm:text-base">
              {personalInfo.bio}
            </p>

            {/* Tabs */}
            <div
              className="flex rounded-full border border-gray-200 dark:border-white/15 p-1 mb-6 w-fit gap-1"
              role="tablist"
            >
              {TABS.map((tab) => (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-250 ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-primary to-accent text-white shadow-md'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab panels */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              role="tabpanel"
            >
              {/* ── Skills tab ─────────────────── */}
              {activeTab === 'Skills' && (
                <div className="grid sm:grid-cols-2 gap-x-10">
                  {skillBars.map((skill, i) => (
                    <SkillBar key={skill.name} {...skill} index={i} />
                  ))}
                </div>
              )}

              {/* ── Education tab ──────────────── */}
              {activeTab === 'Education' && (
                <div className="space-y-4">
                  {education.map((edu, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="glass-card p-4 flex gap-4"
                    >
                      <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold">
                        {edu.type === 'college' ? 'U' : 'S'}
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-gray-900 dark:text-white">{edu.institution}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{edu.degree} · {edu.duration}</p>
                        <span className="inline-block mt-1.5 text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                          {edu.grade}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* ── Achievements tab ───────────── */}
              {activeTab === 'Achievements' && (
                <div className="space-y-3">
                  {achievements.map((ach, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="glass-card p-4 flex items-start gap-3 hover:border-primary/40 transition-colors duration-300"
                    >
                      <span className="text-2xl flex-shrink-0">{ach.icon}</span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-semibold text-sm text-gray-900 dark:text-white">{ach.title}</h4>
                          {ach.link && (
                            <a
                              href={ach.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:text-accent"
                              aria-label={`View ${ach.title}`}
                            >
                              <FiExternalLink size={13} />
                            </a>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{ach.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
