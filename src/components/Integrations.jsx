import React, { useState, useRef, useMemo } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Check, 
  Radio, 
  Layers, 
  ArrowUpRight, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  Database,
  RefreshCw,
  GitCommit
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

// Research-area icons (replaced third-party brand logos)
const AREA_ICONS = { neural: RefreshCw, memory: Database, appraisal: Radio, investigation: Zap, evidence: GitCommit, efficiency: Layers, review: ShieldCheck };
const BrandGlyph = ({ toolId, className = "w-5 h-5" }) => {
  const Icon = AREA_ICONS[toolId] || Layers;
  return <Icon className={className} />;
};

export default function Integrations() {
  const containerRef = useRef(null);
  const { addToast } = useToast();
  const isInView = useInView(containerRef, { once: false, amount: 0.15 });

  const [hoveredToolId, setHoveredToolId] = useState(null);


  // Seven ecosystem tools with precise relative coordinates surrounding center Cadence (50%, 50%)
  // Canvas coordinate space: 1000 x 640
  // Cadence Center: (500, 320)
  const tools = useMemo(() => [
    {
      id: "neural",
      name: "Neural Learning",
      category: "Adaptation",
      streamLabel: "Bio-inspired networks",
      initials: "NL",
      color: "text-blue-400",
      accentBg: "bg-blue-500/10 border-blue-500/25",
      stats: { primary: "Researching", secondary: "Recurrent, spiking, liquid", detail: "Candidate architectures" },
      // Top Center: (50%, 9%) -> (500, 58)
      pctX: 50,
      pctY: 9,
      float: { y: [0, -4, 0], duration: 5.2, delay: 0.1 },
      order: 0,
      // Connects from bottom of Zoom (500, 95) to top of Cadence (500, 250)
      path: "M 500 95 C 500 145, 500 200, 500 250",
      dur1: "2.6s",
      dur2: "2.6s",
      offset2: "1.3s"
    },
    {
      id: "memory",
      name: "Memory",
      category: "Associative, long-term",
      streamLabel: "Links across experience",
      initials: "AM",
      color: "text-emerald-300",
      accentBg: "bg-emerald-500/10 border-emerald-500/25",
      stats: { primary: "Researching", secondary: "Associative recall", detail: "Builds on past investigations" },
      // Top Left: (14%, 22%) -> (140, 140)
      pctX: 14,
      pctY: 22,
      float: { y: [0, 3, 0], duration: 5.8, delay: 0.7 },
      order: 1,
      // Connects from right of Slack (230, 140) to left-top of Cadence (380, 290)
      path: "M 230 140 C 290 170, 330 230, 380 290",
      dur1: "2.8s",
      dur2: "2.8s",
      offset2: "1.4s"
    },
    {
      id: "appraisal",
      name: "Appraisal",
      category: "Computational signals",
      streamLabel: "Curiosity, doubt, surprise",
      initials: "AS",
      color: "text-teal-300",
      accentBg: "bg-teal-500/10 border-teal-500/25",
      stats: { primary: "Researching", secondary: "Guides attention", detail: "Functional signals, not feelings" },
      // Top Right: (86%, 22%) -> (860, 140)
      pctX: 86,
      pctY: 22,
      float: { y: [0, -3.5, 0], duration: 5.5, delay: 0.3 },
      order: 2,
      // Connects from left of Meet (770, 140) to right-top of Cadence (620, 290)
      path: "M 770 140 C 710 170, 670 230, 620 290",
      dur1: "2.7s",
      dur2: "2.7s",
      offset2: "1.35s"
    },
    {
      id: "investigation",
      name: "Investigation",
      category: "Discovery",
      streamLabel: "Context-gap detection",
      initials: "IN",
      color: "text-[#F8F7F2]",
      accentBg: "bg-[#171717] border-[#27272A]",
      stats: { primary: "Prototype in BNI", secondary: "Evidence-based", detail: "Specific investigations today" },
      // Bottom Left: (14%, 72%) -> (140, 460)
      pctX: 14,
      pctY: 72,
      float: { y: [0, -3, 0], duration: 6.0, delay: 0.5 },
      order: 3,
      // Connects from right of Notion (230, 460) to left-bottom of Cadence (380, 350)
      path: "M 230 460 C 290 430, 330 380, 380 350",
      dur1: "3.0s",
      dur2: "3.0s",
      offset2: "1.5s"
    },
    {
      id: "evidence",
      name: "Evidence",
      category: "Validation",
      streamLabel: "Sources & uncertainty",
      initials: "EV",
      color: "text-violet-300",
      accentBg: "bg-violet-500/10 border-violet-500/25",
      stats: { primary: "Prototype in BNI", secondary: "Provenance tracking", detail: "Competing explanations kept" },
      // Bottom Right: (86%, 72%) -> (860, 460)
      pctX: 86,
      pctY: 72,
      float: { y: [0, 4, 0], duration: 6.2, delay: 0.9 },
      order: 4,
      // Connects from left of Linear (770, 460) to right-bottom of Cadence (620, 350)
      path: "M 770 460 C 710 430, 670 380, 620 350",
      dur1: "2.9s",
      dur2: "2.9s",
      offset2: "1.45s"
    },
    {
      id: "efficiency",
      name: "Efficiency",
      category: "Efficient compute",
      streamLabel: "Leaner reasoning",
      initials: "EC",
      color: "text-indigo-300",
      accentBg: "bg-indigo-500/10 border-indigo-500/25",
      stats: { primary: "Researching", secondary: "Efficiency goal", detail: "No benchmarks published yet" },
      // Bottom Mid-Left: (36%, 89%) -> (360, 570)
      pctX: 36,
      pctY: 89,
      float: { y: [0, 3.2, 0], duration: 5.7, delay: 1.0 },
      order: 5,
      // Connects from top of Teams (360, 520) to bottom-left of Cadence (450, 390)
      path: "M 360 520 C 380 470, 415 425, 450 390",
      dur1: "2.8s",
      dur2: "2.8s",
      offset2: "1.4s"
    },
    {
      id: "review",
      name: "Human Review",
      category: "Controlled change",
      streamLabel: "Approval before updates",
      initials: "HR",
      color: "text-blue-200",
      accentBg: "bg-sky-500/10 border-sky-500/25",
      stats: { primary: "Design principle", secondary: "Corrections reviewed", detail: "No silent rewrites" },
      // Bottom Mid-Right: (64%, 89%) -> (640, 570)
      pctX: 64,
      pctY: 89,
      float: { y: [0, -2.8, 0], duration: 5.4, delay: 0.8 },
      order: 6,
      // Connects from top of Jira (640, 520) to bottom-right of Cadence (550, 390)
      path: "M 640 520 C 620 470, 585 425, 550 390",
      dur1: "2.9s",
      dur2: "2.9s",
      offset2: "1.45s"
    },
  ], []);

  const handleCardHover = (tool) => {
    setHoveredToolId(tool.id);
  };

  return (
    <section 
      id="ecosystem" 
      ref={containerRef}
      className="py-24 md:py-36 bg-[#171717] border-b border-[#27272A] overflow-hidden relative select-none"
    >
      {/* Background Ambient Radial Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-[#C8E63A]/15 rounded-full filter blur-[110px] pointer-events-none transition-opacity duration-700"
        style={{
          opacity: hoveredToolId ? 0.35 : 0.2
        }}
      />

      <div className="max-w-[1240px] mx-auto px-6 relative z-10 text-center">
        
        {/* =========================================================================
            PHASE 1 & 2: EDITORIAL SECTION HEADING & COPY
            ========================================================================= */}
        <div className="max-w-2xl mx-auto mb-14 sm:mb-18">
          
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center gap-2 mb-3"
          >
            <span className="w-2 h-2 rounded-full bg-[#C8E63A]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#A1A1AA]">
              RESEARCH ARCHITECTURE
            </span>
          </motion.div>

          {/* Main Heading with Transform Reveal */}
          <div className="overflow-hidden">
            <motion.h2
              initial={{ opacity: 0, y: 35 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-6xl lg:text-7xl font-[550] tracking-[-0.035em] text-[#F8F7F2] leading-[0.96]"
            >
              How the research
            </motion.h2>
          </div>

          <div className="overflow-hidden mt-1">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
              transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-6xl lg:text-7xl font-serif italic font-normal text-[#F8F7F2] leading-[0.96]"
            >
              fits together.
            </motion.div>
          </div>

          {/* Supporting Copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 text-base sm:text-lg text-[#A1A1AA] leading-relaxed max-w-xl mx-auto"
          >
            A map of the research areas we're working on, how we expect them to connect, and how they might help us study sentience as an open question. These are research components, not finished products or third-party integrations.
          </motion.p>
        </div>

        {/* =========================================================================
            DESKTOP FLAGSHIP ASYMMETRIC LIVING ECOSYSTEM (100% Dead-Center Aligned)
            ========================================================================= */}
        <div className="hidden lg:block relative w-full max-w-[1040px] h-[660px] mx-auto">
          
          {/* =======================================================================
              SVG LAYER: Dynamic Curved Connection Lines & Constant Glowing Dots
              ======================================================================= */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none z-10" 
            viewBox="0 0 1000 640"
          >
            <defs>
              {/* High-visibility intense neon-lime blur filter */}
              <filter id="intenseLimeGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur1" />
                <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur1" />
                  <feMergeNode in="blur2" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              
              <linearGradient id="limeFlowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C8E63A" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#C8E63A" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {/* Central Cadence Absorption Ripple Rings */}
            <circle cx="500" cy="320" r="135" fill="none" stroke="#C8E63A" strokeWidth="1" opacity="0.15">
              <animate attributeName="r" values="120;155;120" dur="4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.25;0.05;0.25" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="500" cy="320" r="160" fill="none" stroke="#C8E63A" strokeWidth="1" strokeDasharray="4 6" opacity="0.12">
              <animate attributeName="r" values="145;185;145" dur="5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.2;0.03;0.2" dur="5s" repeatCount="indefinite" />
            </circle>

            {/* Connection Lines & Constant Flowing Data Dots */}
            {tools.map((tool) => {
              const isHovered = hoveredToolId === tool.id;
              
              return (
                <g key={tool.id}>
                  {/* Base subtle guide line */}
                  <path
                    d={tool.path}
                    fill="none"
                    stroke={isHovered ? "rgba(200,230,58,0.85)" : "rgba(255,255,255,0.12)"}
                    strokeWidth={isHovered ? 2 : 1.2}
                    strokeDasharray={isHovered ? "none" : "3 4"}
                    className="transition-all duration-300"
                  />

                  {/* Flowing animated dash pulse along the wire */}
                  <path
                    d={tool.path}
                    fill="none"
                    stroke="#C8E63A"
                    strokeWidth={isHovered ? 2.5 : 1.5}
                    strokeDasharray="8 24"
                    opacity={isHovered ? 0.9 : 0.45}
                  >
                    <animate 
                      attributeName="stroke-dashoffset" 
                      values="32;0" 
                      dur="1.2s" 
                      repeatCount="indefinite" 
                    />
                  </path>

                  {/* ===============================================================
                      CONSTANT VISIBLE DATA PARTICLES (STREAMING INTO CADENCE)
                      =============================================================== */}
                  
                  {/* Particle 1: Primary Vivid Lime Ingest Packet */}
                  <g>
                    <animateMotion 
                      dur={tool.dur1} 
                      repeatCount="indefinite" 
                      path={tool.path} 
                    />
                    {/* Outer Glowing Aura */}
                    <circle 
                      r="8" 
                      fill="#C8E63A" 
                      opacity="0.4" 
                      filter="url(#intenseLimeGlow)" 
                    />
                    {/* Vibrant Mid Core */}
                    <circle 
                      r="4" 
                      fill="#C8E63A" 
                      filter="url(#intenseLimeGlow)" 
                    />
                    {/* Ultra-Sharp Center Spark */}
                    <circle 
                      r="2" 
                      fill="#FFFFFF" 
                    />
                  </g>

                  {/* Particle 2: Staggered Secondary Follower Packet */}
                  <g>
                    <animateMotion 
                      dur={tool.dur2} 
                      begin={tool.offset2}
                      repeatCount="indefinite" 
                      path={tool.path} 
                    />
                    <circle 
                      r="6.5" 
                      fill="#C8E63A" 
                      opacity="0.32" 
                      filter="url(#intenseLimeGlow)" 
                    />
                    <circle 
                      r="3.2" 
                      fill="#C8E63A" 
                    />
                    <circle 
                      r="1.4" 
                      fill="#FFFFFF" 
                    />
                  </g>
                </g>
              );
            })}
          </svg>

          {/* =======================================================================
              CADENCE CENTER NODE (EXACT CENTER: left-1/2 top-1/2)
              ======================================================================= */}
          <div 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-auto"
          >
            {/* Ambient Radial Ingestion Glow */}
            <div 
              className="absolute -inset-12 rounded-full bg-[#C8E63A]/25 filter blur-[55px] -z-10 pointer-events-none transition-all duration-500"
              style={{
                transform: hoveredToolId ? 'scale(1.25)' : 'scale(1)',
                opacity: hoveredToolId ? 0.6 : 0.35
              }}
            />

            {/* Cadence Dominant Black Capsule */}
            <motion.div
              initial={{ opacity: 0, scale: 0.82 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.82 }}
              transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className={`w-[245px] p-6 rounded-[28px] bg-[#0E0E10] text-[#F8F7F2] border transition-all duration-300 shadow-[0_24px_70px_rgba(0,0,0,0.22)] flex flex-col items-center justify-center text-center relative ${
                hoveredToolId 
                  ? 'border-[#C8E63A] ring-2 ring-[#C8E63A]/40 scale-[1.025]' 
                  : 'border-[rgba(200,230,58,0.35)] hover:border-[#C8E63A]/70'
              }`}
            >
              {/* Subtle Breathing Motion */}
              <motion.div
                animate={{
                  scale: [1, 1.018, 1],
                  opacity: [0.95, 1, 0.95]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-full flex flex-col items-center"
              >
                {/* Cadence Intelligence Symbol with Absorbing Pulse */}
                <div className="relative mb-3.5">
                  <motion.div 
                    animate={{
                      rotate: 360,
                    }}
                    transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-1 rounded-2xl border border-dashed border-[#C8E63A]/40"
                  />
                  <div className="w-12 h-12 rounded-2xl bg-[#1D1D1C] border border-[#2E2E2A] flex items-center justify-center text-[#C8E63A] shadow-inner relative z-10">
                    <Sparkles className="w-6 h-6 animate-pulse" />
                  </div>
                </div>

                {/* Brand Name */}
                <h3 className="text-sm font-bold tracking-[0.22em] uppercase font-sans text-white">
                  KNULL
                </h3>

                {/* Context Layer Subtitle */}
                <span className="text-xs font-mono text-[#A3A198] mt-0.5 font-medium">
                  Research Core
                </span>

                {/* Continuous Ingest Status Feed */}
                <div className="mt-4 pt-3 border-t border-[#262624] w-full flex items-center justify-between text-[10px] font-mono">
                  <span className="flex items-center gap-1.5 text-[#C8E63A] font-semibold">
                    <span className="w-2 h-2 rounded-full bg-[#C8E63A] animate-ping" />
                    <span>7 Research Areas</span>
                  </span>
                  <span className="text-[#71717A] font-mono">
                    In progress
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* =======================================================================
              SURROUNDING INTEGRATION CARDS (Separated with Generous Spacing)
              ======================================================================= */}
          {tools.map((tool) => {
            const isHovered = hoveredToolId === tool.id;
            const isAnyHovered = hoveredToolId !== null;
            const isOther = isAnyHovered && !isHovered;

            return (
              <div
                key={tool.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto"
                style={{
                  left: `${tool.pctX}%`,
                  top: `${tool.pctY}%`,
                }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={isInView ? { 
                    opacity: isOther ? 0.42 : 1, 
                    scale: isHovered ? 1.04 : 1 
                  } : { opacity: 0, scale: 0.94 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.35 + tool.order * 0.08, 
                    ease: [0.22, 1, 0.36, 1] 
                  }}
                  onMouseEnter={() => handleCardHover(tool)}
                  onMouseLeave={() => setHoveredToolId(null)}
                  className="relative group cursor-pointer"
                >
                  {/* Floating Motion inside wrapper */}
                  <motion.div
                    animate={{
                      y: isHovered ? -5 : tool.float.y,
                    }}
                    transition={{
                      y: isHovered 
                        ? { duration: 0.22, ease: [0.22, 1, 0.36, 1] } 
                        : { duration: tool.float.duration, repeat: Infinity, ease: "easeInOut", delay: tool.float.delay }
                    }}
                  >
                    {/* The Clean White Card */}
                    <div className={`w-[185px] p-4.5 rounded-[18px] bg-[#121215] border transition-all duration-300 shadow-[0_12px_35px_rgba(0,0,0,0.04)] text-left ${
                      isHovered 
                        ? 'border-[#3F3F46] shadow-[0_20px_45px_rgba(0,0,0,0.08)] ring-1 ring-[#3F3F46]/10' 
                        : 'border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.2)]'
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl ${tool.accentBg} flex items-center justify-center text-[#F8F7F2] shrink-0 transition-colors shadow-2xs`}>
                          <BrandGlyph toolId={tool.id} className="w-4.5 h-4.5" />
                        </div>
                        <div className="overflow-hidden">
                          <h4 className="text-xs font-semibold text-[#F8F7F2] truncate">
                            {tool.name}
                          </h4>
                          <span className="text-[10px] font-mono text-[#A1A1AA] block truncate">
                            {tool.category}
                          </span>
                        </div>
                      </div>

                      {/* Small Live Stream Indicator with Green Dot */}
                      <div className="mt-3 pt-2.5 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between text-[9px] font-mono">
                        <span className="text-[#A1A1AA] truncate max-w-[115px]">
                          {tool.streamLabel}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      </div>
                    </div>

                    {/* ===============================================================
                        COMPACT HOVER TOOLTIP / FLOATING CONTEXT PANEL
                        =============================================================== */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.96, y: 8 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.96, y: 8 }}
                          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute left-1/2 -translate-x-1/2 -top-28 w-[210px] bg-[#0E0E10] text-white p-3.5 rounded-2xl border border-[#333230] shadow-xl z-50 pointer-events-none text-left"
                        >
                          <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-[#2B2A28]">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-[#A3A198] font-bold">
                              {tool.name}
                            </span>
                            <span className="text-[9px] font-mono text-[#C8E63A] flex items-center gap-1 font-semibold">
                              <Check className="w-2.5 h-2.5" /> Research area
                            </span>
                          </div>
                          
                          <div className="space-y-1 text-[10px] font-mono text-[#E4E3DF]">
                            <div className="flex items-center justify-between">
                              <span className="text-[#71717A]">Status:</span>
                              <span className="font-semibold text-white">{tool.stats.primary}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-[#71717A]">Focus:</span>
                              <span>{tool.stats.secondary}</span>
                            </div>
                            <div className="text-[9px] text-[#A3A198] pt-1 border-t border-[#262624]">
                              &bull; {tool.stats.detail}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* =========================================================================
            MOBILE RESPONSIVE EXPERIENCE (Clean Vertical Intelligence Network)
            ========================================================================= */}
        <div className="lg:hidden space-y-6 max-w-md mx-auto">
          {/* Cadence Center Node (Mobile) */}
          <div className="bg-[#0E0E10] text-[#F8F7F2] p-6 rounded-3xl border border-[rgba(200,230,58,0.35)] shadow-lg text-center relative overflow-hidden">
            <div className="w-11 h-11 rounded-2xl bg-[#1D1D1C] border border-[#2E2E2A] flex items-center justify-center text-[#C8E63A] mx-auto mb-3">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <h3 className="text-sm font-bold tracking-[0.2em] uppercase font-sans text-white">
              KNULL
            </h3>
            <span className="text-xs font-mono text-[#A3A198]">
              Research Core
            </span>
            <div className="mt-3.5 pt-3 border-t border-[#262624] flex items-center justify-between text-[11px] font-mono">
              <span className="text-[#C8E63A] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#C8E63A] animate-ping" />
                Research Areas
              </span>
              <span className="text-[#71717A]">7 connected</span>
            </div>
          </div>

          {/* Connected Tools Cards List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {tools.map((tool) => (
              <div
                key={tool.id}
                className="bg-[#121215] p-4 rounded-2xl border border-[rgba(255,255,255,0.08)] shadow-xs flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl ${tool.accentBg} flex items-center justify-center text-[#F8F7F2] shrink-0`}>
                    <BrandGlyph toolId={tool.id} className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#F8F7F2]">
                      {tool.name}
                    </h4>
                    <span className="text-[10px] font-mono text-[#A1A1AA]">
                      {tool.category}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-mono text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded-full font-medium">
                    {tool.stats.primary}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================================
            BOTTOM STATEMENT ANIMATION (Cinematic Closing Reveal)
            ========================================================================= */}
        <div className="mt-20 md:mt-24 pt-12 border-t border-[#27272A] max-w-xl mx-auto text-center">
          {/* "One context layer." */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-xs font-mono uppercase tracking-[0.2em] text-[#A1A1AA]"
          >
            One connected direction.
          </motion.p>

          {/* "Everything stays connected." Word-by-word reveal in editorial serif */}
          <div className="mt-3 flex items-center justify-center gap-2 flex-wrap">
            {["Built", "to", "work", "together."].map((word, wIdx) => (
              <motion.span
                key={wIdx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.2 + wIdx * 0.07, 
                  ease: [0.22, 1, 0.36, 1] 
                }}
                className="text-3xl sm:text-4xl font-serif italic text-[#F8F7F2]"
              >
                {word}
              </motion.span>
            ))}

            {/* Tiny slowly pulsing lime dot */}
            <motion.span
              animate={{ 
                scale: [1, 1.35, 1],
                opacity: [0.7, 1, 0.7] 
              }}
              transition={{ 
                duration: 2.2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="inline-block w-2.5 h-2.5 rounded-full bg-[#C8E63A] ml-1 shadow-[0_0_8px_rgba(200,230,58,0.6)]"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
