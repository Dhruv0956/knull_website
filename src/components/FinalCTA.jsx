import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, X } from 'lucide-react';
import { smoothScrollTo } from '../utils/scroll';

export default function FinalCTA() {
  const containerRef = useRef(null);
  const modalRef = useRef(null);
  const gotItRef = useRef(null);
  const meetBniRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.25, 0.9]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.04, 0.14, 0.04]);
  const textY = useTransform(scrollYProgress, [0, 1], [25, -25]);

  useEffect(() => {
    if (!isModalOpen) return;

    const appRoot = document.getElementById('root');
    const wasInert = appRoot?.hasAttribute('inert');
    const previousOverflow = document.body.style.overflow;

    appRoot?.setAttribute('inert', '');
    document.body.style.overflow = 'hidden';
    gotItRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false);
        return;
      }

      if (event.key !== 'Tab') return;

      const focusable = modalRef.current?.querySelectorAll('button:not([disabled])');
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && (document.activeElement === first || !modalRef.current.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !modalRef.current.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (!wasInert) appRoot?.removeAttribute('inert');
    };
  }, [isModalOpen]);

  return (
    <section
      ref={containerRef}
      className="py-32 md:py-44 bg-[#0E0E10] text-[#F8F7F2] text-center relative overflow-hidden border-b border-[#333230]"
    >
      {/* Dynamic Scroll Parallax Ambient Glow */}
      <motion.div
        style={{
          scale: glowScale,
          opacity: glowOpacity,
        }}
        className="absolute inset-0 m-auto w-[650px] h-[650px] bg-[#C8E63A] rounded-full filter blur-[160px] pointer-events-none"
      />

      <motion.div
        style={{ y: textY }}
        className="max-w-[1240px] mx-auto px-6 relative z-10 space-y-7"
      >
        <span className="text-xs font-mono uppercase tracking-widest text-[#71717A] block">
          EXPLORE KNULL
        </span>

        {/* Headline with Serif Emphasis */}
        <h2 className="text-5xl sm:text-7xl lg:text-8xl font-[550] tracking-[-0.045em] text-[#F8F7F2] leading-[0.94] max-w-4xl mx-auto">
          The future of intelligence <br className="hidden sm:inline" />
          <span className="font-serif italic font-normal text-[#C8E63A]">doesn't end with an answer.</span>
        </h2>

        <p className="text-lg sm:text-xl text-[#71717A] max-w-xl mx-auto font-normal leading-relaxed">
          We're building toward AI that learns from experience, explores what it doesn't know, and develops a deeper understanding over time, moving us closer to knowing whether artificial sentience is possible.
        </p>

        {/* Lime Primary CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href="#vision"
            onClick={(e) => {
              e.preventDefault();
              smoothScrollTo('#vision', -80);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C8E63A] text-[#171717] px-8 py-4 rounded-full text-sm font-semibold hover:bg-[#B8D62E] transition-all transform hover:-translate-y-0.5 shadow-md group cursor-pointer"
          >
            <span>Explore Knull</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>

          <button
            ref={meetBniRef}
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent text-[#F8F7F2] border border-[#5F5D57] hover:border-[#F8F7F2] px-7 py-4 rounded-full text-sm font-medium transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#C8E63A]" />
            <span>Meet BNI</span>
          </button>
        </div>

        <p className="text-xs text-[#71717A] font-mono pt-4">
          Remembers &bull; Questions &bull; Discovers &bull; Evolves
        </p>
      </motion.div>

      {createPortal(
        <AnimatePresence onExitComplete={() => meetBniRef.current?.focus()}>
          {isModalOpen && (
            <>
              <motion.div
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsModalOpen(false)}
                className="fixed inset-0 z-[9990] bg-black/65 backdrop-blur-sm"
              />

              <div className="fixed inset-0 z-[9991] flex items-center justify-center p-4 pointer-events-none">
                <motion.div
                  ref={modalRef}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="meet-bni-modal-title"
                  aria-describedby="meet-bni-modal-description"
                  initial={{ opacity: 0, scale: 0.96, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97, y: 8 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-full max-w-md overflow-hidden rounded-2xl border border-[#C8E63A]/25 bg-[#121215] p-6 text-left font-sans text-[#F8F7F2] shadow-2xl pointer-events-auto sm:p-8"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-[#C8E63A]" />
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    aria-label="Close dialog"
                    className="absolute right-4 top-4 rounded-full p-2 text-[#71717A] transition-colors hover:bg-[#1F1F22] hover:text-[#F8F7F2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8E63A] cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>

                  <span className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#C8E63A]/10 text-[#C8E63A]">
                    <Sparkles className="h-5 w-5" />
                  </span>
                  <h2 id="meet-bni-modal-title" className="pr-10 text-3xl font-[550] tracking-[-0.03em]">
                    Coming Soon.
                  </h2>
                  <p id="meet-bni-modal-description" className="mt-3 text-sm leading-relaxed text-[#A1A1AA] sm:text-base">
                    We're working on something new. Stay tuned.
                  </p>
                  <button
                    ref={gotItRef}
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-[#C8E63A] px-6 py-3 text-sm font-semibold text-[#171717] transition-colors hover:bg-[#B8D62E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8E63A] cursor-pointer sm:w-auto"
                  >
                    Got it
                  </button>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
