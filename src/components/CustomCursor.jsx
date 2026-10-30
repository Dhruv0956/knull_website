import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState('default'); // 'default' | 'pointer' | 'interactive' | 'text'
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Fast tight spring for precision center dot
  const dotSpringConfig = { damping: 42, stiffness: 700, mass: 0.1 };
  const dotX = useSpring(mouseX, dotSpringConfig);
  const dotY = useSpring(mouseY, dotSpringConfig);

  // Softer fluid spring for the trailing glowing aura ring
  const ringSpringConfig = { damping: 26, stiffness: 220, mass: 0.5 };
  const ringX = useSpring(mouseX, ringSpringConfig);
  const ringY = useSpring(mouseY, ringSpringConfig);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      if (!target) return;

      const interactive = target.closest('button, a, input, select, textarea, [data-cursor="pointer"]');
      const canvasEl = target.closest('[data-cursor="interactive"]');
      const textEl = target.closest('p, h1, h2, h3, blockquote');

      if (canvasEl) {
        setCursorType('interactive');
      } else if (interactive) {
        setCursorType('pointer');
      } else if (textEl && !interactive) {
        setCursorType('text');
      } else {
        setCursorType('default');
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* 1. Fluid Trailing Aura & Outer Ring with Animated Pulsing Halo */}
      <motion.div
        className="cadence-custom-cursor pointer-events-none fixed top-0 left-0 z-[9998] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
        }}
        animate={{
          scale: isClicking ? 0.75 : cursorType === 'interactive' ? 1.6 : cursorType === 'pointer' ? 1.3 : 1,
          width: cursorType === 'interactive' ? 56 : cursorType === 'pointer' ? 36 : 28,
          height: cursorType === 'interactive' ? 56 : cursorType === 'pointer' ? 36 : 28,
          backgroundColor:
            cursorType === 'interactive'
              ? 'rgba(200, 230, 58, 0.15)'
              : cursorType === 'pointer'
              ? 'rgba(200, 230, 58, 0.22)'
              : 'rgba(248,247,242, 0.04)',
          borderColor:
            cursorType === 'interactive'
              ? 'rgba(200, 230, 58, 0.65)'
              : cursorType === 'pointer'
              ? '#F8F7F2'
              : 'rgba(248,247,242, 0.22)',
          borderWidth: cursorType === 'pointer' ? '1.5px' : '1px',
          boxShadow:
            cursorType === 'interactive'
              ? '0 0 24px rgba(200, 230, 58, 0.45), inset 0 0 12px rgba(139, 92, 246, 0.2)'
              : cursorType === 'pointer'
              ? '0 0 16px rgba(200, 230, 58, 0.35)'
              : 'none',
        }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Animated Rotating Gradient Reticle when hovering interactive card */}
        {cursorType === 'interactive' && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border border-dashed border-[#C8E63A]/80"
          />
        )}

        {/* Micro text inside cursor when over interactive 3D cards */}
        {cursorType === 'interactive' && (
          <span className="text-[8px] font-mono font-bold tracking-widest text-[#F8F7F2] uppercase select-none">
            DRAG
          </span>
        )}
      </motion.div>

      {/* 2. Precision Center Dot with High Responsiveness */}
      <motion.div
        className="cadence-custom-cursor pointer-events-none fixed top-0 left-0 z-[9999] rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          x: dotX,
          y: dotY,
        }}
        animate={{
          scale: isClicking ? 1.6 : cursorType === 'pointer' ? 0.6 : cursorType === 'interactive' ? 0 : 1,
          width: 5,
          height: 5,
          backgroundColor: cursorType === 'pointer' ? '#C8E63A' : '#F8F7F2',
          boxShadow: cursorType === 'pointer' ? '0 0 8px #C8E63A' : 'none',
        }}
        transition={{ duration: 0.12, ease: [0.22, 1, 0.36, 1] }}
      />
    </>
  );
}
