import React from 'react';
import { motion } from 'framer-motion';
import {
  FiGithub, FiLinkedin, FiTwitter, FiInstagram,
  FiHeart, FiArrowUp,
} from 'react-icons/fi';
import { personalInfo } from '../data/index.js';

const SOCIAL_LINKS = [
  { icon: FiGithub,    href: personalInfo.github,    label: 'GitHub'    },
  { icon: FiLinkedin,  href: personalInfo.linkedin,  label: 'LinkedIn'  },
  { icon: FiTwitter,   href: personalInfo.twitter,   label: 'Twitter'   },
  { icon: FiInstagram, href: personalInfo.instagram, label: 'Instagram' },
];

const NAV_LINKS = [
  { label: 'Home',       href: '#home'       },
  { label: 'About',      href: '#about'       },
  { label: 'Projects',   href: '#projects'    },
  { label: 'Experience', href: '#experience'  },
  { label: 'Skills',     href: '#skills'      },
  { label: 'Contact',    href: '#contact'     },
];

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const scrollTo  = (href) =>
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="bg-dark-900 dark:bg-dark-900 border-t border-white/5">
      <div className="container-custom px-6 py-12">
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <p className="text-xl font-bold gradient-text mb-3">VK</p>
            <p className="text-xs text-gray-500 leading-relaxed max-w-xs">
              Full Stack Developer passionate about building products that make a difference.
              Based in India, open to opportunities worldwide.
            </p>
          </div>

          {/* Nav links */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Navigation
            </p>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-xs text-gray-500 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Connect
            </p>
            <div className="flex flex-wrap gap-2">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-lg flex items-center justify-center border border-white/10 text-gray-500 hover:border-primary hover:text-primary hover:bg-primary/10 transition-all duration-300"
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
            <div className="mt-4 space-y-1.5">
              <a href={`mailto:${personalInfo.email}`} className="block text-xs text-gray-500 hover:text-white transition-colors duration-200">
                {personalInfo.email}
              </a>
              <a href={`tel:${personalInfo.phone}`} className="block text-xs text-gray-500 hover:text-white transition-colors duration-200">
                {personalInfo.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600 text-center sm:text-left">
            © {new Date().getFullYear()} Vasudev Kumar. All rights reserved.
          </p>
          <p className="text-xs text-gray-600 flex items-center gap-1">
            Built with <FiHeart size={11} className="text-primary" /> using React & Tailwind CSS
          </p>

          {/* Scroll to top */}
          <motion.button
            onClick={scrollTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary hover:bg-primary/10 transition-all duration-300"
            aria-label="Scroll to top"
          >
            <FiArrowUp size={14} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
