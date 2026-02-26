import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function Cursor() {
  const [hovering, setHovering] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Spring-lagged positions for ring & halo
  const springX = useSpring(rawX, { stiffness: 200, damping: 25 });
  const springY = useSpring(rawY, { stiffness: 200, damping: 25 });

  // Center each element on the cursor (subtract half their width)
  const dotX  = useTransform(rawX,    v => v - 5);   // dot  10 px → -5
  const dotY  = useTransform(rawY,    v => v - 5);
  const ringX = useTransform(springX, v => v - 18);  // ring 36 px → -18
  const ringY = useTransform(springY, v => v - 18);
  const haloX = useTransform(springX, v => v - 32);  // halo 64 px → -32
  const haloY = useTransform(springY, v => v - 32);

  useEffect(() => {
    const onMove  = (e) => { rawX.set(e.clientX); rawY.set(e.clientY); };
    const onEnter = (e) => { if (e.target.closest('a, button')) setHovering(true); };
    const onLeave = () => setHovering(false);

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout',  onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout',  onLeave);
    };
  }, [rawX, rawY]);

  return (
    <>
      {/* Inner dot — instant, disappears on hover */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-primary pointer-events-none z-[9999]"
        style={{ x: dotX, y: dotY }}
        animate={{ scale: hovering ? 0 : 1, opacity: hovering ? 0 : 1 }}
        transition={{ duration: 0.12 }}
      />

      {/* Outer ring — springy lag, scales up on hover */}
      <motion.div
        className="fixed top-0 left-0 w-9 h-9 rounded-full border-2 border-primary/50 pointer-events-none z-[9998]"
        style={{ x: ringX, y: ringY }}
        animate={{ scale: hovering ? 1.8 : 1, borderColor: hovering ? 'rgba(240,116,132,0.9)' : 'rgba(240,116,132,0.5)' }}
        transition={{ duration: 0.2 }}
      />

      {/* Soft glow halo behind ring */}
      <motion.div
        className="fixed top-0 left-0 w-16 h-16 rounded-full pointer-events-none z-[9997]"
        style={{
          x: haloX,
          y: haloY,
          background: 'radial-gradient(circle, rgba(240,116,132,0.15) 0%, transparent 70%)',
        }}
        animate={{ scale: hovering ? 2.5 : 1, opacity: hovering ? 1 : 0.6 }}
        transition={{ duration: 0.3 }}
      />
    </>
  );
}
