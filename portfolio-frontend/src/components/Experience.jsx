import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiBriefcase, FiCalendar } from 'react-icons/fi';
import { experiences } from '../data/index.js';

const sectionVar = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const textVar = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Experience() {
  const timelineRef = useRef(null);
  const lineInView  = useInView(timelineRef, { once: true, margin: '-80px' });

  return (
    <section id="experience" className="section-padding bg-white/90 dark:bg-dark-800/80">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          variants={sectionVar}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="text-center mb-14"
        >
          <motion.span variants={textVar} className="text-xs font-semibold tracking-[0.3em] uppercase text-primary">
            My Journey
          </motion.span>
          <motion.h2 variants={textVar} className="section-title mt-2">
            Work <span className="gradient-text">Experience</span>
          </motion.h2>
          <motion.p variants={textVar} className="section-subtitle max-w-xl mx-auto">
            Internships and professional experiences that shaped my skills.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-3xl mx-auto">
          {/* Animated vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={lineInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{ originY: 0 }}
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-accent/60 to-transparent -translate-x-1/2"
          />

          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
                className={`relative flex md:justify-between items-start mb-12 ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-row gap-8`}
              >
                {/* Timeline dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-5 z-10">
                  {/* Pulsing ring */}
                  <motion.div
                    animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: index * 0.4 }}
                    className="absolute inset-0 rounded-full bg-primary/30 pointer-events-none"
                  />
                  <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/25 flex items-center justify-center">
                    <FiBriefcase size={16} className="text-white" />
                  </div>
                </div>

                {/* Spacer for desktop alternating layout */}
                <div className="hidden md:block flex-1" />

                {/* Card */}
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="flex-1 ml-14 md:ml-0 md:max-w-[45%] glass-card p-6 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
                >
                  {/* Company & role */}
                  <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
                    <div>
                      <h3 className="font-bold text-base text-gray-900 dark:text-white">{exp.role}</h3>
                      <p className="text-sm font-semibold gradient-text">{exp.company}</p>
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        exp.type === 'Remote'
                          ? 'bg-accent/15 text-accent'
                          : 'bg-primary/15 text-primary'
                      }`}
                    >
                      {exp.type}
                    </span>
                  </div>

                  {/* Duration */}
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <FiCalendar size={12} />
                    <span>{exp.duration}</span>
                  </div>

                  {/* Description bullets */}
                  <ul className="space-y-2 mb-4">
                    {exp.description.map((point, i) => (
                      <li key={i} className="flex gap-2 text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                        <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary" />
                        {point}
                      </li>
                    ))}
                  </ul>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-gray-100 dark:border-white/5">
                    {exp.tech.map((t) => (
                      <span key={t} className="tag text-[10px]">{t}</span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}

          {/* End dot */}
          <div className="absolute left-6 md:left-1/2 -translate-x-1/2 bottom-0 w-3 h-3 rounded-full bg-gradient-to-br from-primary to-accent" />
        </div>
      </div>
    </section>
  );
}
