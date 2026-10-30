import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Testimonials() {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.18 });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activeMarker, setActiveMarker] = useState(null);
  const [highlightActive, setHighlightActive] = useState(true);

  // Mouse Parallax (Desktop only, max 5px on waveform, max 2px on quote)
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Scroll Parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const waveformScrollY = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const quoteScrollY = useTransform(scrollYProgress, [0, 1], [3, -3]);

  // Existing authentic customer testimonials with distinct conversation signatures
  // Independent publications that inform Knull's research. Knull did not author them.
  const testimonials = useMemo(() => [
    {
      id: "zhao-2023",
      chapterNumber: "01",
      chapterTitle: "BRAIN-INSPIRED AI AND AGI",
      duration: "2023",
      quoteParts: [
        { text: "A review of how principles from the human brain have shaped AI, and what they could mean on the path toward " },
        { text: "general intelligence", highlight: true },
        { text: ". It informs how we think about bio-inspired learning and memory." }
      ],
      author: "When Brain-inspired AI Meets AGI",
      role: "Zhao et al., 2023",
      initials: "ZH",
      company: "INDEPENDENT PUBLICATION",
      verifiedTag: "INDEPENDENT PUBLICATION",
      // Figures quoted from the paper (arXiv:2303.15935)
      facts: [
        { value: "86B", label: "neurons in the human brain, each forming up to 10,000 synapses" },
        { value: "1.5B → 175B", label: "parameters from GPT-2 to GPT-3" },
        { value: "10.4% → 40.7%", label: "GSM8K math accuracy with zero-shot chain-of-thought" },
      ],
      waveformPath: "M 0 60 C 100 60, 150 25, 220 25 C 290 25, 320 90, 400 90 C 470 90, 520 35, 600 35 C 680 35, 720 80, 800 80 C 880 80, 930 60, 1000 60",
      secondaryWavePath: "M 0 60 C 80 60, 140 45, 200 45 C 280 45, 340 75, 420 75 C 500 75, 560 45, 650 45 C 730 45, 820 65, 900 65 C 950 65, 980 60, 1000 60",
      markers: [
        { id: "m1", x: 220, y: 25, time: "Theme 01", note: "Brain-inspired design in AI" },
        { id: "m2", x: 520, y: 45, time: "Theme 02", note: "Learning, memory and reasoning" },
        { id: "m3", x: 800, y: 80, time: "Theme 03", note: "Open questions on the path to AGI" },
      ]
    },
    {
      id: "fares-2022",
      chapterNumber: "02",
      chapterTitle: "HUMAN BRAIN AND AI",
      duration: "2022",
      quoteParts: [
        { text: "An overview of how AI and brain-computer interfaces are being combined, from decoding neural signals to closed-loop systems. It informs how we think about the " },
        { text: "relationship between biological and artificial intelligence", highlight: true },
        { text: "." }
      ],
      author: "In the Realm of Hybrid Brain: Human Brain and AI",
      role: "Fares et al., 2022",
      initials: "FA",
      company: "INDEPENDENT PUBLICATION",
      verifiedTag: "INDEPENDENT PUBLICATION",
      // Figures quoted from the paper (arXiv:2210.01461)
      facts: [
        { value: "~20 W", label: "powers the human brain; a computer needs ~250 W to classify 1,000 object types" },
        { value: "10¹³–10¹⁶", label: "estimated operations per second of raw brain compute" },
        { value: "1,024", label: "channels on Neuralink's closed-loop implantable chip" },
      ],
      waveformPath: "M 0 60 C 80 60, 120 16, 180 16 C 240 16, 280 100, 350 100 C 420 100, 460 22, 540 22 C 620 22, 680 92, 760 92 C 840 92, 920 60, 1000 60",
      secondaryWavePath: "M 0 60 C 90 60, 150 80, 230 80 C 310 80, 370 30, 450 30 C 530 30, 600 85, 690 85 C 770 85, 860 40, 940 40 C 970 40, 990 60, 1000 60",
      markers: [
        { id: "m4", x: 180, y: 16, time: "Theme 01", note: "Brain-computer interfaces" },
        { id: "m5", x: 460, y: 32, time: "Theme 02", note: "AI for neural signal decoding" },
        { id: "m6", x: 760, y: 92, time: "Theme 03", note: "Closed-loop hybrid systems" },
      ]
    },
  ], []);

  const current = testimonials[currentIndex];

  const next = useCallback(() => {
    setHighlightActive(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setHighlightActive(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  // Trigger brief highlight animation whenever testimonial changes
  useEffect(() => {
    setHighlightActive(true);
    const timer = setTimeout(() => {
      setHighlightActive(false);
    }, 1400);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  // Auto-Progression: 9 seconds timer, cleanly paused on hover
  useEffect(() => {
    if (!isInView || isPaused) return;

    const timer = setTimeout(() => {
      next();
    }, 9000);

    return () => clearTimeout(timer);
  }, [isInView, isPaused, next, currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [next, prev]);

  // Mouse Parallax tracking inside card
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
    setIsPaused(false);
  };

  return (
    <section 
      id="people"
      ref={containerRef}
      className="py-28 md:py-36 bg-[#171717] border-b border-[#27272A] overflow-hidden relative select-none"
    >
      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        
        {/* =========================================================================
            SECTION INTRO: EDITORIAL HEADER (Cinematic Entrance Phases 1, 2, 3)
            ========================================================================= */}
        <div className="max-w-3xl mb-14 sm:mb-18 text-left">
          
          {/* Phase 1: Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2 mb-3.5"
          >
            <span className="w-2 h-2 rounded-full bg-[#C8E63A]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#A1A1AA]">
              RESEARCH PERSPECTIVES
            </span>
          </motion.div>

          {/* Phase 2: Heading Line-by-Line Reveal with Overflow Mask */}
          <div className="overflow-hidden">
            <motion.h2
              initial={{ opacity: 0, y: 35 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-6xl lg:text-7xl font-[550] tracking-[-0.035em] text-[#F8F7F2] leading-[0.96]"
            >
              Ideas we're
            </motion.h2>
          </div>

          <div className="overflow-hidden mt-1">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
              transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-6xl lg:text-7xl font-serif italic font-normal text-[#F8F7F2] leading-[0.96]"
            >
              learning from.
            </motion.div>
          </div>

          {/* Phase 3: Supporting Copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 text-base sm:text-lg text-[#A1A1AA] leading-relaxed max-w-xl"
          >
            Two independent publications that inform our thinking. Knull didn't write them, and they don't prove our approach works. They help frame the questions we're pursuing.
          </motion.p>
        </div>

        {/* =========================================================================
            PHASE 5: MAIN TESTIMONIAL CONTAINER (Editorial Recorded Conversation)
            ========================================================================= */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, scale: 0.97, y: 50 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.97, y: 50 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#121215] rounded-[32px] border border-[rgba(255,255,255,0.08)] p-8 sm:p-14 lg:p-18 shadow-[0_20px_70px_rgba(0,0,0,0.035)] relative overflow-hidden transition-shadow duration-300 hover:shadow-[0_28px_85px_rgba(0,0,0,0.06)]"
        >
          {/* =======================================================================
              TOP BAR: Live Conversation Status & Timestamp
              ======================================================================= */}
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-[rgba(255,255,255,0.06)] text-xs font-mono">
            {/* Live Conversation Indicator with Gentle Pulse */}
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <motion.span 
                  animate={{ 
                    scale: [1, 1.35, 1],
                    opacity: [1, 0.45, 1]
                  }}
                  transition={{ 
                    duration: 2.2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="absolute inline-flex h-full w-full rounded-full bg-[#C8E63A] opacity-75"
                />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#8CB800]" />
              </span>
              <span className="tracking-widest uppercase font-semibold text-[#F8F7F2]">
                INDEPENDENT RESEARCH
              </span>
            </div>

            {/* Conversation Duration Timestamp */}
            <div className="flex items-center gap-3 text-[#A1A1AA]">
              <span className="bg-[#171717] px-2.5 py-1 rounded-md border border-[rgba(255,255,255,0.08)] font-semibold text-[#F8F7F2]">
                {current.duration}
              </span>
            </div>
          </div>

          {/* =======================================================================
              WAVEFORM LAYER: Subtle Organic Waveform with Moving Signal & Markers
              ======================================================================= */}
          <motion.div 
            style={{ 
              y: waveformScrollY,
              x: mouseOffset.x * 4
            }}
            className="relative h-20 sm:h-24 my-4 select-none"
          >
            <svg 
              className="w-full h-full overflow-visible" 
              viewBox="0 0 1000 120" 
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="waveGlowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#C8E63A" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#C8E63A" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#C8E63A" stopOpacity="0.1" />
                </linearGradient>

                <filter id="signalGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Secondary background harmonic wave */}
              <motion.path
                key={`sec-${current.id}`}
                d={current.secondaryWavePath}
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1.2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.8 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* Primary Morphing Conversation Waveform */}
              <motion.path
                key={`prim-${current.id}`}
                d={current.waveformPath}
                fill="none"
                stroke="rgba(248,247,242,0.12)"
                strokeWidth="1.6"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* Lime Accent Waveform Highlight Segment */}
              <motion.path
                key={`accent-${current.id}`}
                d={current.waveformPath}
                fill="none"
                stroke="url(#waveGlowGrad)"
                strokeWidth="2.4"
                strokeDasharray="240 760"
                initial={{ strokeDashoffset: 1000 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
              />

              {/* Active Moving Lime Signal Point (Current moment in conversation) */}
              <g>
                <animateMotion 
                  dur="7s" 
                  repeatCount="indefinite" 
                  path={current.waveformPath} 
                />
                <circle r="7" fill="#C8E63A" opacity="0.35" filter="url(#signalGlow)" />
                <circle r="3.5" fill="#C8E63A" />
                <circle r="1.5" fill="#FFFFFF" />
              </g>

              {/* Interactive Conversation Moment Markers */}
              {current.markers.map((marker) => {
                const isHovered = activeMarker?.id === marker.id;
                return (
                  <g 
                    key={marker.id}
                    className="cursor-pointer pointer-events-auto"
                    onMouseEnter={() => setActiveMarker(marker)}
                    onMouseLeave={() => setActiveMarker(null)}
                  >
                    {/* Hit area */}
                    <circle cx={marker.x} cy={marker.y} r="14" fill="transparent" />
                    
                    {/* Visual dot */}
                    <circle 
                      cx={marker.x} 
                      cy={marker.y} 
                      r={isHovered ? "5" : "3"} 
                      fill={isHovered ? "#C8E63A" : "#F8F7F2"}
                      stroke="#171717"
                      strokeWidth="1.5"
                      className="transition-all duration-200"
                    />

                    {/* Subtle pulse ring on marker */}
                    {isHovered && (
                      <circle 
                        cx={marker.x} 
                        cy={marker.y} 
                        r="9" 
                        fill="none" 
                        stroke="#C8E63A" 
                        strokeWidth="1"
                        opacity="0.8" 
                      />
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Marker Floating Tooltip */}
            <AnimatePresence>
              {activeMarker && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.95 }}
                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute bg-[#0E0E10] text-white px-3 py-1.5 rounded-xl text-[10px] font-mono shadow-xl border border-[#333230] z-40 pointer-events-none -translate-x-1/2 whitespace-nowrap"
                  style={{
                    left: `${(activeMarker.x / 1000) * 100}%`,
                    top: `${activeMarker.y - 32}px`,
                  }}
                >
                  <span className="text-[#C8E63A] font-semibold mr-1.5">{activeMarker.time}</span>
                  <span className="text-[#E4E3DF]">{activeMarker.note}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* =======================================================================
              MAIN CONVERSATION BODY: LARGE QUOTE LEFT, CUSTOMER IDENTITY RIGHT
              ======================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center pt-4">
            
            {/* LEFT / MAIN: Large Testimonial Quote */}
            <div className="lg:col-span-8 text-left">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={current.id}
                  style={{ y: quoteScrollY }}
                  initial={{ opacity: 0, x: 45, filter: "blur(4px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -40, filter: "blur(4px)" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="text-3xl sm:text-4xl lg:text-[44px] font-[480] text-[#F8F7F2] leading-[1.12] tracking-[-0.025em] font-sans"
                >
                  {current.quoteParts.map((part, pIdx) => {
                    if (part.highlight) {
                      return (
                        <span 
                          key={pIdx}
                          className={`relative inline-block transition-colors duration-500 font-[520] ${
                            highlightActive 
                              ? 'text-[#F8F7F2] bg-[#C8E63A]/40 px-1 rounded' 
                              : 'text-[#F8F7F2]'
                          }`}
                        >
                          {part.text}
                        </span>
                      );
                    }
                    return <span key={pIdx}>{part.text}</span>;
                  })}
                </motion.blockquote>
              </AnimatePresence>
            </div>

            {/* RIGHT: Customer Identity & Verification */}
            <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-[rgba(255,255,255,0.08)] pt-6 lg:pt-0 lg:pl-10 text-left">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, x: -25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 25 }}
                  transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-3.5"
                >
                  {/* Minimal Black Circle Avatar with Lime Initials */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="w-13 h-13 rounded-full bg-[#0E0E10] text-[#C8E63A] flex items-center justify-center font-mono font-bold text-sm tracking-wider shadow-sm border border-[#2B2A28]"
                  >
                    {current.initials}
                  </motion.div>

                  {/* Customer Name & Role */}
                  <div>
                    <h4 className="font-semibold text-lg text-[#F8F7F2] tracking-tight">
                      {current.author}
                    </h4>
                    <p className="text-sm text-[#A1A1AA] font-normal leading-snug">
                      {current.role}
                    </p>
                  </div>

                  {/* Monospace Verified Label */}
                  <div className="pt-2 border-t border-[rgba(255,255,255,0.06)] flex items-center gap-1.5 text-[11px] font-mono text-[#71717A]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{current.verifiedTag}</span>
                  </div>

                  {/* Key figures from the paper */}
                  <div className="pt-1 space-y-2.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#71717A] block">
                      Key figures
                    </span>
                    {current.facts.map((fact) => (
                      <div key={fact.value} className="flex items-baseline gap-2.5">
                        <span className="font-mono text-sm font-semibold text-[#F8F7F2] whitespace-nowrap bg-[#C8E63A]/25 px-1.5 py-0.5 rounded">
                          {fact.value}
                        </span>
                        <span className="text-xs text-[#A1A1AA] leading-snug">
                          {fact.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* =======================================================================
              BOTTOM CONTROLS & CHAPTER NAVIGATION
              ======================================================================= */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-10 border-t border-[rgba(255,255,255,0.08)] mt-12">
            
            {/* Chapter Indicator with Segmented Progress Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#F8F7F2]">
                {current.chapterNumber} &bull; {current.chapterTitle}
              </span>

              {/* 3-Segment Progress Bar */}
              <div className="flex items-center gap-2">
                {testimonials.map((item, idx) => {
                  const isActive = currentIndex === idx;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setHighlightActive(false);
                        setCurrentIndex(idx);
                      }}
                      className="group cursor-pointer py-1"
                      aria-label={`Jump to chapter ${item.chapterNumber}`}
                    >
                      <div className="w-14 sm:w-16 h-1 rounded-full bg-[rgba(255,255,255,0.12)] overflow-hidden relative transition-all">
                        {isActive && (
                          <motion.div
                            layoutId="activeChapterFill"
                            className="absolute inset-0 bg-[#C8E63A]"
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Circular Arrow Navigation Controls */}
            <div className="flex items-center gap-3">
              {/* Previous Button */}
              <motion.button
                onClick={prev}
                whileTap={{ scale: 0.92 }}
                whileHover={{ x: -3 }}
                className="w-13 h-13 rounded-full border border-[rgba(255,255,255,0.10)] bg-[#121215] hover:bg-[#0E0E10] hover:text-white text-[#F8F7F2] flex items-center justify-center transition-colors duration-200 cursor-pointer shadow-2xs group"
                aria-label="Previous publication"
              >
                <ArrowLeft className="w-4.5 h-4.5 group-hover:-translate-x-0.5 transition-transform" />
              </motion.button>

              {/* Next Button */}
              <motion.button
                onClick={next}
                whileTap={{ scale: 0.92 }}
                whileHover={{ x: 3 }}
                className="w-13 h-13 rounded-full border border-[rgba(255,255,255,0.10)] bg-[#121215] hover:bg-[#0E0E10] hover:text-white text-[#F8F7F2] flex items-center justify-center transition-colors duration-200 cursor-pointer shadow-2xs group"
                aria-label="Next publication"
              >
                <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-0.5 transition-transform" />
              </motion.button>
            </div>
          </div>

          {/* Micro Auto-Progression Status (Pauses on hover) */}
          <div className="absolute bottom-0 inset-x-0 h-0.5 bg-transparent overflow-hidden">
            {!isPaused && isInView && (
              <motion.div
                key={currentIndex}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 9, ease: "linear" }}
                className="h-full bg-[#C8E63A]/60"
              />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
