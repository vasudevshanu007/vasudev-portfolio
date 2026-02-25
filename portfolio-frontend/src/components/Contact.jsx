import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  FiSend, FiUser, FiMail, FiPhone, FiMessageSquare,
  FiMapPin, FiLinkedin, FiGithub, FiTwitter,
} from 'react-icons/fi';
import { personalInfo } from '../data/index.js';

// Dev:  Vite proxy  → /api/send-email  → localhost:5000/send-email
// Prod: VITE_API_BASE (Render URL)    → https://xxx.onrender.com/send-email
const API_URL = import.meta.env.VITE_API_BASE
  ? `${import.meta.env.VITE_API_BASE}/send-email`
  : '/api/send-email';

const INITIAL_FORM = { name: '', phone: '', email: '', message: '' };

function validate(form) {
  if (!form.name.trim())    return 'Please enter your name.';
  if (!form.email.trim())   return 'Please enter your email.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Please enter a valid email.';
  if (!form.message.trim()) return 'Please enter a message.';
  return null;
}

const sectionVar = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const textVar = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Contact() {
  const [form, setForm]         = useState(INITIAL_FORM);
  const [submitting, setSubmit] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((f) => ({ ...f, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validate(form);
    if (error) { toast.error(error); return; }

    setSubmit(true);
    const toastId = toast.loading('Sending message…');

    try {
      const res = await fetch(API_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Server error');

      toast.success('Message sent! I\'ll get back to you soon.', { id: toastId });
      setForm(INITIAL_FORM);
    } catch {
      toast.error('Failed to send. Please email me directly.', { id: toastId });
    } finally {
      setSubmit(false);
    }
  };

  // ── Shared input class ────────────────────────────────────────────────────
  const inputClass =
    'w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-white dark:bg-dark-600 border border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-primary dark:focus:border-primary transition-colors duration-200';

  return (
    <section id="contact" className="section-padding bg-white dark:bg-dark-800">
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
            Let's Talk
          </motion.span>
          <motion.h2 variants={textVar} className="section-title mt-2">
            Get In <span className="gradient-text">Touch</span>
          </motion.h2>
          <motion.p variants={textVar} className="section-subtitle max-w-xl mx-auto">
            Have a project idea or want to collaborate? I'd love to hear from you.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 max-w-4xl mx-auto">
          {/* ── Left: Contact info ──────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 space-y-6"
          >
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Hire Me 🚀
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                I'm open to freelance opportunities, internships, and full-time roles.
                Feel free to reach out — let's build something great together!
              </p>
            </div>

            {/* Contact details */}
            <div className="space-y-3">
              {[
                { icon: FiPhone, label: personalInfo.phone, href: `tel:${personalInfo.phone}` },
                { icon: FiMail,  label: personalInfo.email, href: `mailto:${personalInfo.email}` },
                { icon: FiMapPin,label: 'Ranchi, India',    href: null },
              ].map(({ icon: Icon, label, href }) => (
                <div key={label} className="flex items-center gap-3 text-sm">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-primary/10 text-primary flex-shrink-0">
                    <Icon size={15} />
                  </div>
                  {href ? (
                    <a href={href} className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-200">
                      {label}
                    </a>
                  ) : (
                    <span className="text-gray-600 dark:text-gray-400">{label}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Find me on
              </p>
              <div className="flex gap-3">
                {[
                  { icon: FiLinkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
                  { icon: FiGithub,   href: personalInfo.github,   label: 'GitHub'   },
                  { icon: FiTwitter,  href: personalInfo.twitter,  label: 'Twitter'  },
                ].map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-xl flex items-center justify-center border border-gray-200 dark:border-white/15 text-gray-500 dark:text-gray-400 hover:border-primary hover:text-primary hover:bg-primary/10 transition-all duration-300"
                  >
                    <Icon size={16} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Right: Form ─────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3"
          >
            <form
              id="contact-form"
              onSubmit={handleSubmit}
              noValidate
              className="glass-card p-6 space-y-4"
            >
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                  Full Name <span className="text-primary">*</span>
                </label>
                <div className="relative">
                  <FiUser size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    autoComplete="name"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Email + Phone (row) */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                    Email <span className="text-primary">*</span>
                  </label>
                  <div className="relative">
                    <FiMail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      autoComplete="email"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                    Phone (optional)
                  </label>
                  <div className="relative">
                    <FiPhone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      autoComplete="tel"
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                  Message <span className="text-primary">*</span>
                </label>
                <div className="relative">
                  <FiMessageSquare size={14} className="absolute left-3.5 top-3.5 text-gray-400 pointer-events-none" />
                  <textarea
                    id="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell me about your project or opportunity…"
                    required
                    className={`${inputClass} pl-10 resize-none`}
                  />
                </div>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={!submitting ? { scale: 1.02 } : {}}
                whileTap={!submitting ? { scale: 0.98 } : {}}
                className="w-full py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-primary to-accent text-white flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Sending…
                  </>
                ) : (
                  <>
                    <FiSend size={15} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
