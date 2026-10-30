import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, Lock, Check, EyeOff, Server, Shield, Sparkles } from 'lucide-react';

export default function Security() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.18 });

  // Security activation step: 0 -> 1 -> 2 -> 3 -> 4 (✓ PROTECTED)
  const [activationStep, setActivationStep] = useState(0);
  const [hoveredLabelId, setHoveredLabelId] = useState(null);

  // Boundary deflection & ripple event simulation
  const [deflectionEvent, setDeflectionEvent] = useState(null);
  const [entryParticleProgress, setEntryParticleProgress] = useState(0);

  // Mouse Parallax (Desktop only, max 5px on boundary, max 2px on core)
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Scroll Parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const headingScrollY = useTransform(scrollYProgress, [0, 1], [4, -4]);
  const boundaryScrollY = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const particlesScrollY = useTransform(scrollYProgress, [0, 1], [-10, 10]);
  const coreScrollY = useTransform(scrollYProgress, [0, 1], [-2, 2]);

  // Four Protection Pillars (Preserved from existing design)
  const protectionLabels = useMemo(() => [
    {
      id: "bots",
      num: 1,
      code: "BI",
      title: "Bio-Inspired Intelligence",
      shortDesc: "Learning that builds on experience.",
      expandedDesc: "Researching bio-inspired networks and memory, so each interaction can build on the last.",
      // Upper-Left
      pos: { x: "4%", y: "10%" },
      path: "M 110 85 C 160 115, 200 150, 240 185",
      anchorX: 110,
      anchorY: 85,
    },
    {
      id: "training",
      num: 2,
      code: "PD",
      title: "Proactive Discovery",
      shortDesc: "Finding the questions nobody asked.",
      expandedDesc: "Spotting missing information, overlooked links and contradictions worth investigating.",
      // Lower-Left
      pos: { x: "4%", y: "76%" },
      path: "M 110 380 C 160 350, 200 320, 240 295",
      anchorX: 110,
      anchorY: 380,
    },
    {
      id: "encryption",
      num: 3,
      code: "CE",
      title: "Computational Emotions",
      shortDesc: "Knowing what deserves attention.",
      expandedDesc: "Curiosity, doubt, surprise and empathy as functional signals that guide attention, not feelings.",
      // Upper-Right
      pos: { x: "64%", y: "10%" },
      path: "M 530 85 C 480 115, 440 150, 400 185",
      anchorX: 530,
      anchorY: 85,
    },
    {
      id: "governance",
      num: 4,
      code: "AT",
      title: "BNI-Based Artistic Thinking",
      shortDesc: "Understanding that can explain how it changed.",
      expandedDesc: "Sources, uncertainty and proposed corrections stay on record for human review.",
      // Lower-Right
      pos: { x: "64%", y: "76%" },
      path: "M 530 380 C 480 350, 440 320, 400 295",
      anchorX: 530,
      anchorY: 380,
    },
  ], []);

  // Floating Internal Conversation Particles (representing protected memory items)
  const conversationParticles = useMemo(() => [
    { id: "p1", label: "source", x: 260, y: 120, dur: 4.5, delay: 0.2 },
    { id: "p2", label: "evidence", x: 390, y: 110, dur: 5.2, delay: 0.8 },
    { id: "p3", label: "uncertainty", x: 180, y: 220, dur: 4.8, delay: 0.5 },
    { id: "p4", label: "past finding", x: 440, y: 220, dur: 5.6, delay: 1.1 },
    { id: "p5", label: "assumption", x: 200, y: 310, dur: 4.2, delay: 0.3 },
    { id: "p6", label: "correction", x: 420, y: 320, dur: 5.0, delay: 0.9 },
    { id: "p7", label: "change history", x: 320, y: 360, dur: 4.6, delay: 0.6 },
    { id: "p8", label: "human review", x: 320, y: 90, dur: 5.4, delay: 1.3 },
  ], []);

  // Step-by-step security activation upon entering view
  useEffect(() => {
    if (!isInView) {
      setActivationStep(0);
      return;
    }

    // Sequence 0 -> 1 -> 2 -> 3 -> 4
    const t1 = setTimeout(() => setActivationStep(1), 700);
    const t2 = setTimeout(() => setActivationStep(2), 1100);
    const t3 = setTimeout(() => setActivationStep(3), 1500);
    const t4 = setTimeout(() => setActivationStep(4), 1900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isInView]);

  // Periodic Signature Boundary Blocking & Deflection Event (~every 12 seconds)
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      // Trigger a deflection event on the right boundary edge
      setDeflectionEvent({
        x: 540,
        y: 240,
        label: "Unreviewed change",
        key: Date.now(),
      });

      // Clear after 2.5s
      setTimeout(() => {
        setDeflectionEvent(null);
      }, 2500);
    }, 12000);

    return () => clearInterval(interval);
  }, [isInView]);

  // Animate conversation entry particle: outside -> boundary contact -> absorbs into core
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setEntryParticleProgress(0);
      const timer = setTimeout(() => {
        setEntryParticleProgress(1);
      }, 100);
      return () => clearTimeout(timer);
    }, 8000);

    return () => clearInterval(interval);
  }, [isInView]);

  // Mouse Parallax Handler
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
    setHoveredLabelId(null);
  };

  return (
    <section 
      id="security"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="py-28 md:py-36 bg-[#171717] border-b border-[#27272A] overflow-hidden relative select-none"
    >
      {/* Extremely subtle 56px engineering grid background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(248,247,242, 1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(248,247,242, 1) 1px, transparent 1px)
          `,
          backgroundSize: '56px 56px',
        }}
      />

      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        
        {/* =========================================================================
            TWO-COLUMN EDITORIAL COMPOSITION (Header Left, Boundary Canvas Right)
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* =======================================================================
              LEFT COLUMN: EDITORIAL SECTION COPY & INTEGRITY SUMMARY
              ======================================================================= */}
          <motion.div 
            style={{ y: headingScrollY }}
            className="lg:col-span-5 text-left space-y-6"
          >
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2 mb-2"
            >
              <span className="w-2 h-2 rounded-full bg-[#C8E63A]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#A1A1AA]">
                TRUST &bull; BY DESIGN
              </span>
            </motion.div>

            {/* Line-by-Line Heading Reveal with Overflow Masks */}
            <div>
              <div className="overflow-hidden">
                <motion.h2
                  initial={{ opacity: 0, y: 35 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="text-5xl sm:text-6xl font-[550] tracking-[-0.035em] text-[#F8F7F2] leading-[0.96]"
                >
                  Learning you
                </motion.h2>
              </div>

              <div className="overflow-hidden mt-1">
                <motion.div
                  initial={{ opacity: 0, y: 35 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
                  transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="text-5xl sm:text-6xl font-serif italic font-normal text-[#F8F7F2] leading-[0.96]"
                >
                  can check.
                </motion.div>
              </div>
            </div>

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed max-w-lg"
            >
              Trust comes from seeing how a system learned. BNI keeps the source of every finding, records how conclusions change, and holds corrections for human review. Privacy and controlled change are part of the design from the start.
            </motion.p>

            {/* Live Boundary Reassurance Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="p-4 rounded-2xl bg-[#121215] border border-[rgba(255,255,255,0.08)] shadow-xs flex items-center justify-between text-xs font-mono max-w-md"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[#F8F7F2] font-semibold">Design principles:</span>
                <span className="text-emerald-200 font-medium">Traceable &amp; reviewable</span>
              </div>
              <span className="text-[#A1A1AA] text-[11px]">
                {activationStep >= 4 ? "4/4 Pillars" : `${activationStep}/4 Pillars`}
              </span>
            </motion.div>
          </motion.div>

          {/* =======================================================================
              RIGHT COLUMN: THE CONVERSATION BOUNDARY VISUAL SYSTEM
              ======================================================================= */}
          <div className="lg:col-span-7 relative w-full max-w-[660px] h-[520px] mx-auto select-none">
            
            {/* Ambient Radial Core Glow behind Cadence Memory */}
            <div 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[340px] rounded-full bg-[#C8E63A]/15 filter blur-[60px] pointer-events-none transition-all duration-700"
              style={{
                transform: hoveredLabelId ? 'translate(-50%, -50%) scale(1.15)' : 'translate(-50%, -50%) scale(1)',
                opacity: activationStep >= 4 ? 0.35 : 0.15
              }}
            />

            {/* =====================================================================
                SVG LAYER: Organic Living Boundary, Curved Lines & Deflections
                ===================================================================== */}
            <motion.svg 
              style={{ 
                y: boundaryScrollY,
                x: mouseOffset.x * 4
              }}
              className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
              viewBox="0 0 640 480"
            >
              <defs>
                <filter id="boundaryGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* ===================================================================
                  THE ORGANIC BOUNDARY PERIMETER (Soft Living Irregular Path)
                  =================================================================== */}
              <motion.path
                d="M 320 50 C 450 48, 540 98, 560 210 C 580 320, 520 400, 390 425 C 260 450, 140 410, 95 310 C 50 210, 120 70, 240 52 Z"
                fill="rgba(18,18,21,0.6)"
                stroke="rgba(255,255,255,0.13)"
                strokeWidth="1.2"
                strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { 
                  pathLength: 1, 
                  opacity: 1,
                  d: [
                    "M 320 50 C 450 48, 540 98, 560 210 C 580 320, 520 400, 390 425 C 260 450, 140 410, 95 310 C 50 210, 120 70, 240 52 Z",
                    "M 320 53 C 447 50, 542 95, 558 213 C 578 318, 517 403, 392 422 C 262 448, 142 408, 97 312 C 52 212, 122 68, 238 54 Z",
                    "M 320 50 C 450 48, 540 98, 560 210 C 580 320, 520 400, 390 425 C 260 450, 140 410, 95 310 C 50 210, 120 70, 240 52 Z"
                  ]
                } : { pathLength: 0, opacity: 0 }}
                transition={{ 
                  pathLength: { duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] },
                  d: { duration: 10, repeat: Infinity, ease: "easeInOut" }
                }}
              />

              {/* Four Curved Connection Lines from Labels to Cadence Memory Core */}
              {protectionLabels.map((lbl, idx) => {
                const isActive = activationStep >= lbl.num;
                const isHovered = hoveredLabelId === lbl.id;

                return (
                  <motion.path
                    key={lbl.id}
                    d={lbl.path}
                    fill="none"
                    stroke={isHovered ? "#C8E63A" : isActive ? "rgba(200,230,58,0.55)" : "rgba(255,255,255,0.10)"}
                    strokeWidth={isHovered ? 1.8 : 1.2}
                    strokeDasharray={isHovered ? "none" : "3 3"}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={isInView ? { 
                      pathLength: isActive ? 1 : 0, 
                      opacity: isHovered ? 1 : isActive ? 0.7 : 0.25 
                    } : { pathLength: 0, opacity: 0 }}
                    transition={{ 
                      pathLength: { duration: 0.65, delay: 0.5 + idx * 0.15, ease: [0.22, 1, 0.36, 1] } 
                    }}
                  />
                );
              })}

              {/* Boundary Deflection Ripple Effect (Triggered periodically) */}
              {deflectionEvent && (
                <g>
                  {/* Expanding Contact Ripple */}
                  <circle
                    cx={deflectionEvent.x}
                    cy={deflectionEvent.y}
                    r="8"
                    fill="none"
                    stroke="#C8E63A"
                    strokeWidth="1.8"
                    filter="url(#boundaryGlow)"
                  >
                    <animate attributeName="r" values="6;28" dur="0.55s" fill="freeze" />
                    <animate attributeName="opacity" values="0.8;0" dur="0.55s" fill="freeze" />
                  </circle>

                  {/* Deflected Particle rebounding back into core */}
                  <circle
                    cx={deflectionEvent.x}
                    cy={deflectionEvent.y}
                    r="4"
                    fill="#C8E63A"
                  >
                    <animate 
                      attributeName="cx" 
                      values={`${deflectionEvent.x};${deflectionEvent.x - 70};320`} 
                      dur="1.8s" 
                      fill="freeze" 
                      keyTimes="0;0.35;1" 
                    />
                    <animate 
                      attributeName="cy" 
                      values={`${deflectionEvent.y};${deflectionEvent.y - 15};240`} 
                      dur="1.8s" 
                      fill="freeze" 
                      keyTimes="0;0.35;1" 
                    />
                  </circle>
                </g>
              )}
            </motion.svg>

            {/* Boundary Deflection Micro-Pill Tag */}
            <AnimatePresence>
              {deflectionEvent && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -5 }}
                  transition={{ duration: 0.25 }}
                  className="absolute z-40 bg-[#0E0E10] text-[#C8E63A] border border-[#2B2A28] px-2.5 py-1 rounded-full text-[10px] font-mono shadow-md pointer-events-none"
                  style={{
                    left: `${(deflectionEvent.x / 640) * 100 - 8}%`,
                    top: `${(deflectionEvent.y / 480) * 100 - 6}%`,
                  }}
                >
                  &larr; Held for review
                </motion.div>
              )}
            </AnimatePresence>

            {/* =====================================================================
                ENTERING CONVERSATION FRAGMENT (Conversation -> Boundary -> Memory)
                ===================================================================== */}
            <motion.div
              animate={{
                y: [0, 45, 120],
                opacity: [0, 0.75, 0],
                scale: [0.95, 1, 0.7]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: [0.22, 1, 0.36, 1],
                times: [0, 0.45, 1]
              }}
              className="absolute left-[45%] top-2 z-20 pointer-events-none text-center"
            >
              <span className="text-[10px] font-mono text-[#A1A1AA] bg-[#121215]/80 border border-[rgba(255,255,255,0.08)] px-2 py-0.5 rounded-full shadow-2xs">
                &ldquo;New evidence&rdquo;
              </span>
            </motion.div>

            {/* =====================================================================
                CENTRAL CADENCE MEMORY CORE (Dark Rounded Capsule: 320, 240)
                ===================================================================== */}
            <motion.div
              style={{
                y: coreScrollY,
                x: mouseOffset.x * 2,
              }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-auto"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.88 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className={`w-[230px] p-6 rounded-[28px] bg-[#0E0E10] text-[#F8F7F2] border transition-all duration-400 shadow-[0_20px_60px_rgba(0,0,0,0.20)] flex flex-col items-center justify-center text-center relative ${
                  activationStep >= 4 
                    ? 'border-[rgba(200,230,58,0.35)]' 
                    : 'border-[#262624]'
                }`}
              >
                {/* Subtle slow breath */}
                <motion.div
                  animate={{
                    scale: [1, 1.018, 1],
                    opacity: [0.95, 1, 0.95]
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-full flex flex-col items-center"
                >
                  {/* Cadence Memory Emblem */}
                  <div className="w-11 h-11 rounded-2xl bg-[#1D1D1C] border border-[#2E2E2A] flex items-center justify-center text-[#C8E63A] mb-3 shadow-inner relative">
                    <ShieldCheck className="w-5 h-5 text-[#C8E63A]" />
                    {activationStep >= 4 && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#C8E63A] ring-2 ring-[#111111]" />
                    )}
                  </div>

                  {/* Brand & Memory Title */}
                  <h3 className="text-xs font-bold tracking-[0.22em] uppercase font-sans text-white">
                    KNULL
                  </h3>
                  <span className="text-[11px] font-mono text-[#71717A] mt-0.5">
                    EVIDENCE RECORD
                  </span>

                  {/* Status Indicator */}
                  <div className="mt-3.5 pt-3 border-t border-[#262624] w-full flex items-center justify-between text-[10px] font-mono">
                    <span className="flex items-center gap-1.5 text-[#C8E63A]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C8E63A] animate-pulse" />
                      <span>{activationStep >= 4 ? "Traceable" : "Linking"}</span>
                    </span>
                    <span className="text-[#71717A]">
                      {activationStep >= 4 ? "4/4 Active" : `${activationStep}/4 Active`}
                    </span>
                  </div>

                  {/* Subtitle tag */}
                  <span className="text-[9px] font-mono text-[#A1A1AA] mt-2 block uppercase tracking-wider">
                    Reviewable by design
                  </span>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* =====================================================================
                FLOATING CONVERSATION PARTICLES (Context within the boundary)
                ===================================================================== */}
            <motion.div 
              style={{ y: particlesScrollY }}
              className="absolute inset-0 pointer-events-none z-20"
            >
              {conversationParticles.map((pt) => (
                <motion.div
                  key={pt.id}
                  style={{
                    position: 'absolute',
                    left: `${(pt.x / 640) * 100}%`,
                    top: `${(pt.y / 480) * 100}%`,
                  }}
                  animate={{
                    y: [0, -6, 0],
                    x: [0, 4, 0],
                    opacity: [0.35, 0.5, 0.35]
                  }}
                  transition={{
                    duration: pt.dur,
                    delay: pt.delay,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="flex items-center gap-1.5 select-none"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0E0E10]/30" />
                  <span className="text-[10px] font-mono text-[#71717A] whitespace-nowrap">
                    {pt.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* =====================================================================
                FOUR MINIMAL FLOATING PROTECTION LABELS (No Cards)
                ===================================================================== */}
            {protectionLabels.map((lbl) => {
              const isHovered = hoveredLabelId === lbl.id;
              const isActive = activationStep >= lbl.num;

              return (
                <motion.div
                  key={lbl.id}
                  style={{
                    position: 'absolute',
                    left: lbl.pos.x,
                    top: lbl.pos.y,
                  }}
                  onMouseEnter={() => setHoveredLabelId(lbl.id)}
                  onMouseLeave={() => setHoveredLabelId(null)}
                  className="z-30 cursor-pointer text-left max-w-[170px]"
                >
                  <motion.div
                    animate={{
                      y: isHovered ? -4 : 0,
                      scale: isHovered ? 1.02 : 1,
                      opacity: hoveredLabelId && !isHovered ? 0.45 : 1,
                    }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className={`p-3 rounded-2xl transition-all duration-200 ${
                      isHovered ? 'bg-[#121215] shadow-md border border-[rgba(255,255,255,0.12)]' : 'bg-transparent'
                    }`}
                  >
                    {/* Header with Lime Status Indicator */}
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                        isActive ? 'bg-[#C8E63A]' : 'bg-[rgba(255,255,255,0.2)]'
                      }`} />
                      <h4 className="text-xs font-semibold text-[#F8F7F2] leading-tight">
                        <span className="font-mono text-[10px] text-[#A1A1AA] mr-1.5">{lbl.code}</span>
                        {lbl.title}
                      </h4>
                    </div>

                    {/* Short Explanation */}
                    <p className="text-[11px] text-[#A1A1AA] leading-snug">
                      {isHovered ? lbl.expandedDesc : lbl.shortDesc}
                    </p>

                    {/* Connected status on hover */}
                    {isHovered && (
                      <div className="mt-2 pt-1.5 border-t border-[rgba(255,255,255,0.06)] flex items-center gap-1 text-[9px] font-mono text-emerald-200 font-semibold">
                        <Check className="w-2.5 h-2.5 text-emerald-400" />
                        <span>Research pillar</span>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            SECURITY STANDARDS CERTIFICATION RAIL (Minimal Monospace Ribbon)
            ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 md:mt-20 pt-8 border-t border-[#27272A] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#A1A1AA]"
        >
          <div className="flex items-center gap-2 text-[#F8F7F2] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#C8E63A]" />
            <span>HOW WE APPROACH TRUST:</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="flex items-center gap-1.5 hover:text-[#F8F7F2] transition-colors cursor-default">
              <span className="w-1 h-1 rounded-full bg-emerald-600" />
              NEW AI. NEW GUARDRAILS.
            </span>
            <span className="text-[#DCDAD2] hidden sm:inline">&bull;</span>
            <span className="flex items-center gap-1.5 hover:text-[#F8F7F2] transition-colors cursor-default">
              <span className="w-1 h-1 rounded-full bg-emerald-600" />
              SOURCES KEPT
            </span>
            <span className="text-[#DCDAD2] hidden sm:inline">&bull;</span>
            <span className="flex items-center gap-1.5 hover:text-[#F8F7F2] transition-colors cursor-default">
              <span className="w-1 h-1 rounded-full bg-emerald-600" />
              UNCERTAINTY SHOWN
            </span>
            <span className="text-[#DCDAD2] hidden sm:inline">&bull;</span>
            <span className="flex items-center gap-1.5 hover:text-[#F8F7F2] transition-colors cursor-default">
              <span className="w-1 h-1 rounded-full bg-emerald-600" />
              CHANGES REVIEWED
            </span>
            <span className="text-[#DCDAD2] hidden sm:inline">&bull;</span>
            <span className="flex items-center gap-1.5 hover:text-[#F8F7F2] transition-colors cursor-default">
              <span className="w-1 h-1 rounded-full bg-emerald-600" />
              NO SILENT REWRITES
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
