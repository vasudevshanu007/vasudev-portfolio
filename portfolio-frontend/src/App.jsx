import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import Cursor from './components/Cursor';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

function AppContent() {
  const [loading, setLoading] = useState(true);
  const vantaRef    = useRef(null);
  const vantaEffect = useRef(null);

  // Splash screen timer
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  // Global card spotlight — sets CSS vars --mouse-x / --mouse-y on every .glass-card
  useEffect(() => {
    const update = (e) => {
      document.querySelectorAll('.glass-card').forEach((card) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - r.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - r.top}px`);
      });
    };
    window.addEventListener('mousemove', update);
    return () => window.removeEventListener('mousemove', update);
  }, []);

  // ── Full-page Vanta WAVES background ──────────────
  // Initialized once here so the animation persists across ALL sections as the user scrolls.
  useEffect(() => {
    const initVanta = () => {
      if (vantaEffect.current || !vantaRef.current || !window.VANTA?.WAVES) return;
      try {
        vantaEffect.current = window.VANTA.WAVES({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x091020,   // matches dark-900 — seamless with dark theme
          shininess: 55,
          waveHeight: 20,
          waveSpeed: 0.65,
          zoom: 0.8,
        });
      } catch (err) {
        console.error('Vanta WAVES init error:', err);
      }
    };

    // Small delay ensures CDN scripts (THREE + VANTA) have fully executed
    const timer = setTimeout(initVanta, 150);

    return () => {
      clearTimeout(timer);
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  return (
    <>
      <Cursor />

      {/*
       * Fixed full-page Vanta WAVES canvas.
       * position: fixed  → stays in viewport as user scrolls
       * z-index: -10     → sits behind every page element
       * no background    → Vanta canvas (inserted at z:-1 inside this div) is fully visible
       * All sections use semi-transparent backgrounds so the waves show through.
       */}
      <div
        ref={vantaRef}
        className="fixed inset-0"
        style={{ zIndex: -10 }}
      />

      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Navbar />
            <main>
              <Hero />
              <About />
              <Projects />
              <Experience />
              <Skills />
              <Contact />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>

      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#0e1525',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            fontSize: '14px',
          },
          success: { iconTheme: { primary: '#f07484', secondary: '#fff' } },
          error:   { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
        }}
      />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
