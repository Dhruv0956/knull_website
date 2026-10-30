import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Calendar, Sparkles } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { smoothScrollTo } from '../utils/scroll';

export default function FinalCTA({ onOpenWorkspace }) {
  const containerRef = useRef(null);
  const { addToast } = useToast();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.25, 0.9]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.04, 0.14, 0.04]);
  const textY = useTransform(scrollYProgress, [0, 1], [25, -25]);

  return (
    <section 
      ref={containerRef}
      className="py-32 md:py-44 bg-[#171717] text-[#F8F7F2] text-center relative overflow-hidden border-b border-[#333230]"
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
        <span className="text-xs font-mono uppercase tracking-widest text-[#88867F] block">
          EXPLORE KNULL
        </span>

        {/* Headline with Serif Emphasis */}
        <h2 className="text-5xl sm:text-7xl lg:text-8xl font-[550] tracking-[-0.045em] text-[#F8F7F2] leading-[0.94] max-w-4xl mx-auto">
          The future of intelligence <br className="hidden sm:inline" />
          <span className="font-serif italic font-normal text-[#C8E63A]">doesn't end with an answer.</span>
        </h2>

        <p className="text-lg sm:text-xl text-[#88867F] max-w-xl mx-auto font-normal leading-relaxed">
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
            onClick={() => {
              if (onOpenWorkspace) {
                onOpenWorkspace('northwind');
              } else {
                addToast('Opening BNI');
              }
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent text-[#F8F7F2] border border-[#5F5D57] hover:border-[#F8F7F2] px-7 py-4 rounded-full text-sm font-medium transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#C8E63A]" />
            <span>Meet BNI</span>
          </button>
        </div>

        <p className="text-xs text-[#88867F] font-mono pt-4">
          Remembers &bull; Questions &bull; Discovers &bull; Evolves
        </p>
      </motion.div>
    </section>
  );
}
