import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiGithub, FiSearch, FiStar } from 'react-icons/fi';
import { projects } from '../data/index.js';

const CATEGORIES = ['All', 'Web', 'Mobile', 'ML/AI'];

const containerVar = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const cardVar = {
  hidden:  { opacity: 0, y: 30, scale: 0.97 },
  visible: { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.3 } },
};

function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      variants={cardVar}
      layout
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="glass-card overflow-hidden group flex flex-col hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-44 bg-dark-900">
        <motion.img
          src={project.image}
          alt={project.title}
          loading="lazy"
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.4 }}
          className="w-full h-full object-cover"
        />

        {/* Overlay on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-dark-900/80 backdrop-blur-sm flex items-center justify-center gap-4"
            >
              {project.liveUrl && project.liveUrl !== '#' && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.05 }}
                  className="w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white hover:bg-primary/80 transition-colors duration-200"
                  aria-label="View live demo"
                >
                  <FiExternalLink size={16} />
                </motion.a>
              )}
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white hover:bg-primary/80 transition-colors duration-200"
                  aria-label="View on GitHub"
                >
                  <FiGithub size={16} />
                </motion.a>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category + featured badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-dark-900/80 text-gray-300 backdrop-blur-sm">
            {project.category}
          </span>
          {project.featured && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/90 text-white flex items-center gap-1 backdrop-blur-sm">
              <FiStar size={10} />
              Featured
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2 leading-snug">
          {project.title}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-4 flex-1 line-clamp-3">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.slice(0, 5).map((t) => (
            <span key={t} className="tag text-[10px]">{t}</span>
          ))}
          {project.tech.length > 5 && (
            <span className="tag text-[10px]">+{project.tech.length - 5}</span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mt-auto pt-3 border-t border-gray-100 dark:border-white/5">
          {project.liveUrl && project.liveUrl !== '#' ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-2 rounded-lg text-xs font-medium bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 transition-opacity duration-200"
            >
              Live Demo
            </a>
          ) : (
            <span className="flex-1 text-center py-2 rounded-lg text-xs font-medium bg-gray-100 dark:bg-white/5 text-gray-400 cursor-not-allowed">
              No Demo
            </span>
          )}
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-2 rounded-lg text-xs font-medium border border-gray-200 dark:border-white/15 text-gray-600 dark:text-gray-300 hover:border-primary hover:text-primary transition-colors duration-200 flex items-center justify-center gap-1"
            >
              <FiGithub size={12} />
              GitHub
            </a>
          ) : (
            <span className="flex-1 text-center py-2 rounded-lg text-xs font-medium border border-gray-100 dark:border-white/5 text-gray-400 cursor-not-allowed flex items-center justify-center gap-1">
              <FiGithub size={12} />
              Private
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

const sectionVar = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const textVar = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Projects() {
  const [category, setCategory] = useState('All');
  const [search, setSearch]     = useState('');

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchCat    = category === 'All' || p.category === category;
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
                          p.tech.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [category, search]);

  return (
    <section id="projects" className="section-padding bg-gray-50 dark:bg-dark-700">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          variants={sectionVar}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="text-center mb-10"
        >
          <motion.span variants={textVar} className="text-xs font-semibold tracking-[0.3em] uppercase text-primary">
            What I've Built
          </motion.span>
          <motion.h2 variants={textVar} className="section-title mt-2">
            My <span className="gradient-text">Projects</span>
          </motion.h2>
          <motion.p variants={textVar} className="section-subtitle max-w-xl mx-auto">
            A selection of projects I've worked on — from full-stack web apps to ML models.
          </motion.p>
        </motion.div>

        {/* Filter + Search */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-8"
        >
          {/* Category filters */}
          <div className="flex gap-2 flex-wrap justify-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-250 ${
                  category === cat
                    ? 'bg-gradient-to-r from-primary to-accent text-white shadow-md'
                    : 'text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-white/15 hover:border-primary hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <FiSearch
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects or tech…"
              className="pl-9 pr-4 py-2 rounded-full text-xs bg-white dark:bg-dark-600 border border-gray-200 dark:border-white/15 text-gray-700 dark:text-gray-300 placeholder-gray-400 focus:outline-none focus:border-primary transition-colors duration-200 w-56"
            />
          </div>
        </motion.div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-400 py-20"
          >
            No projects match your search.
          </motion.p>
        ) : (
          <motion.div
            variants={containerVar}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-30px' }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
