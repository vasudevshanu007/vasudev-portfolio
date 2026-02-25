import React from 'react';
import { motion } from 'framer-motion';
import {
  SiReact, SiNodedotjs, SiMongodb, SiExpress, SiJavascript,
  SiPython, SiCplusplus, SiGit, SiTailwindcss, SiBootstrap,
  SiHtml5, SiCss3,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { TbApi } from 'react-icons/tb';

// ── Tech stack data ──────────────────────────────────────────────────────────
const TECH_GROUPS = [
  {
    label: 'Languages',
    items: [
      { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E', bg: '#F7DF1E15' },
      { name: 'Python',     Icon: SiPython,     color: '#3776AB', bg: '#3776AB15' },
      { name: 'C++',        Icon: SiCplusplus,  color: '#00599C', bg: '#00599C15' },
      { name: 'Java',       Icon: FaJava,       color: '#ED8B00', bg: '#ED8B0015' },
    ],
  },
  {
    label: 'Frontend',
    items: [
      { name: 'React.js',  Icon: SiReact,       color: '#61DAFB', bg: '#61DAFB15' },
      { name: 'HTML5',     Icon: SiHtml5,       color: '#E34F26', bg: '#E34F2615' },
      { name: 'CSS3',      Icon: SiCss3,        color: '#1572B6', bg: '#1572B615' },
      { name: 'Tailwind',  Icon: SiTailwindcss, color: '#06B6D4', bg: '#06B6D415' },
      { name: 'Bootstrap', Icon: SiBootstrap,   color: '#7952B3', bg: '#7952B315' },
    ],
  },
  {
    label: 'Backend & DB',
    items: [
      { name: 'Node.js',    Icon: SiNodedotjs, color: '#339933', bg: '#33993315' },
      { name: 'Express.js', Icon: SiExpress,   color: '#f07484', bg: '#f0748415' },
      { name: 'MongoDB',    Icon: SiMongodb,   color: '#47A248', bg: '#47A24815' },
      { name: 'REST API',   Icon: TbApi,       color: '#f07484', bg: '#f0748415' },
    ],
  },
  {
    label: 'Tools',
    items: [
      { name: 'Git', Icon: SiGit, color: '#F05032', bg: '#F0503215' },
    ],
  },
];

// ── Additional skill chips ────────────────────────────────────────────────────
const SKILL_CHIPS = [
  'Data Structures', 'Algorithms', 'OOP Concepts', 'Machine Learning',
  'JWT Auth', 'REST APIs', 'Responsive Design', 'Problem Solving',
  'React Native', 'Competitive Programming', 'Shopify/Liquid',
];

// ── Variants ──────────────────────────────────────────────────────────────────
const sectionVar = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const textVar = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const groupVar = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07 } },
};
const itemVar = {
  hidden:  { opacity: 0, scale: 0.85, y: 15 },
  visible: { opacity: 1, scale: 1,    y: 0,  transition: { duration: 0.45 } },
};

export default function Skills() {
  return (
    <section id="skills" className="section-padding bg-gray-50 dark:bg-dark-700">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          variants={sectionVar}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="text-center mb-12"
        >
          <motion.span variants={textVar} className="text-xs font-semibold tracking-[0.3em] uppercase text-primary">
            My Toolkit
          </motion.span>
          <motion.h2 variants={textVar} className="section-title mt-2">
            Skills & <span className="gradient-text">Technologies</span>
          </motion.h2>
          <motion.p variants={textVar} className="section-subtitle max-w-xl mx-auto">
            Technologies I work with every day to build robust, scalable products.
          </motion.p>
        </motion.div>

        {/* Tech groups */}
        <div className="space-y-10">
          {TECH_GROUPS.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: gi * 0.1 }}
            >
              <h4 className="text-xs font-semibold tracking-wider uppercase text-gray-400 dark:text-gray-500 mb-4">
                {group.label}
              </h4>

              <motion.div
                variants={groupVar}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-20px' }}
                className="flex flex-wrap gap-3"
              >
                {group.items.map(({ name, Icon, color, bg }) => (
                  <motion.div
                    key={name}
                    variants={itemVar}
                    whileHover={{ scale: 1.06, y: -4 }}
                    whileTap={{ scale: 0.97 }}
                    className="glass-card flex items-center gap-3 px-4 py-3 cursor-default hover:border-primary/40 hover:shadow-md transition-all duration-300"
                    style={{
                      '--icon-bg': bg,
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: bg }}
                    >
                      <Icon size={18} style={{ color }} />
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                      {name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Additional skills chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.6 }}
          className="mt-10"
        >
          <h4 className="text-xs font-semibold tracking-wider uppercase text-gray-400 dark:text-gray-500 mb-4">
            Other Skills
          </h4>
          <div className="flex flex-wrap gap-2">
            {SKILL_CHIPS.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ scale: 1.05 }}
                className="px-3 py-1.5 rounded-full text-xs font-medium border border-gray-200 dark:border-white/15 text-gray-600 dark:text-gray-400 hover:border-primary hover:text-primary dark:hover:text-primary hover:bg-primary/5 transition-all duration-200 cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
