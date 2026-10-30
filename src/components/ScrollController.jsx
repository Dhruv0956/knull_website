import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { smoothScrollTo } from '../utils/scroll';

const SECTIONS = [
  { id: 'hero', label: 'Top' },
  { id: 'problem', label: 'Problem' },
  { id: 'idea', label: 'Idea' },
  { id: 'vision', label: 'Vision' },
  { id: 'memory', label: 'BNI' },
  { id: 'individuals', label: 'Pillars' },
];

export default function ScrollController() {
  const { scrollYProgress } = useScroll();
  const [percent, setPercent] = useState(0);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setPercent(Math.round(latest * 100));
      setVisible(latest > 0.04);

      // Determine active section index
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      let activeIdx = 0;
      for (let i = 0; i < SECTIONS.length; i++) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && scrollPos >= el.offsetTop) {
          activeIdx = i;
        }
      }
      setCurrentSectionIndex(activeIdx);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const handleScrollUp = () => {
    if (currentSectionIndex <= 1) {
      smoothScrollTo('#hero', 0);
    } else {
      const prevId = SECTIONS[currentSectionIndex - 1].id;
      smoothScrollTo(`#${prevId}`, -80);
    }
  };

  const handleScrollDown = () => {
    if (currentSectionIndex < SECTIONS.length - 1) {
      const nextId = SECTIONS[currentSectionIndex + 1].id;
      smoothScrollTo(`#${nextId}`, -80);
    } else {
      smoothScrollTo('#founder', -80);
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          initial={{ opacity: 0, y: 20, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.92 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center gap-1.5 bg-white/90 backdrop-blur-xl border border-[#171717]/10 p-1.5 rounded-full shadow-[0_8px_30px_rgba(23,23,23,0.08)] select-none"
        >
          {/* Scroll Up Button */}
          <button
            onClick={handleScrollUp}
            className="w-8 h-8 rounded-full bg-[#F8F7F2] hover:bg-[#171717] hover:text-[#C8E63A] text-[#171717] transition-all flex items-center justify-center cursor-pointer group shadow-xs"
            title="Scroll up to previous section"
            aria-label="Scroll up"
          >
            <ArrowUp className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
          </button>

          {/* Section Indicator & Progress */}
          <div className="px-2.5 flex items-center gap-2 text-xs font-mono">
            <div className="relative w-4 h-4 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  className="stroke-[#E8E6DF]"
                  strokeWidth="3"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  className="stroke-[#C8E63A]"
                  strokeWidth="3"
                  strokeDasharray={88}
                  strokeDashoffset={88 - (88 * percent) / 100}
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className="text-[#171717] font-semibold text-[11px]">
              {SECTIONS[currentSectionIndex]?.label || 'Knull'}
            </span>
            <span className="text-[#88867F] text-[10px]">
              {percent}%
            </span>
          </div>

          {/* Scroll Down Button */}
          <button
            onClick={handleScrollDown}
            className="w-8 h-8 rounded-full bg-[#F8F7F2] hover:bg-[#171717] hover:text-[#C8E63A] text-[#171717] transition-all flex items-center justify-center cursor-pointer group shadow-xs"
            title="Scroll down to next section"
            aria-label="Scroll down"
          >
            <ArrowDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-y-0.5" />
          </button>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
