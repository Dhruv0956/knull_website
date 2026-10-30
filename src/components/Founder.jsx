import React, { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Check, Sparkles } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function Founder() {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: '-60px' });
  const { addToast } = useToast();
  const [copied, setCopied] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Parallax on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const cardY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.2, 0.9]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const handleContact = () => {
    setCopied(true);
    navigator.clipboard?.writeText("arjun@knull.ai");
    addToast('Founder email copied: arjun@knull.ai');
    setTimeout(() => {
      setCopied(false);
      window.location.href = "mailto:arjun@knull.ai?subject=Inquiry%20regarding%20Knull";
    }, 700);
  };

  return (
    <section 
      id="founder"
      ref={containerRef}
      className="py-28 md:py-36 bg-[#171717] text-[#F8F7F2] relative overflow-hidden border-b border-[#262626] select-none"
    >
      {/* Precision Matrix Grid Background with Radial Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at center, black 45%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 45%, transparent 85%)',
        }}
      />

      {/* Primary Ambient Lime Green Glow (Matches Website Theme) */}
      <motion.div
        style={{ scale: glowScale }}
        className="absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/2 w-[620px] h-[620px] bg-[#C8E63A]/14 rounded-full filter blur-[150px] pointer-events-none"
      />

      {/* Secondary Soft Accent Glow for Visual Depth */}
      <div className="absolute bottom-10 right-1/4 w-[380px] h-[380px] bg-[#C8E63A]/8 rounded-full filter blur-[130px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Founder Bio, Thesis & Directives */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Monospace Eyebrow with Lime Glowing Pulse Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2.5"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C8E63A] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C8E63A]" />
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#C8E63A] font-semibold">
                THE FOUNDER
              </span>
            </motion.div>

            {/* Bold Display Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white uppercase leading-[0.95]"
            >
              ARJUN <span className="font-serif italic font-normal text-[#E2E8F0]">R.</span>
            </motion.h2>

            {/* Background Bio Line */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-base sm:text-lg text-[#9CA3AF] leading-relaxed max-w-xl font-normal"
            >
              Founder of Knull, an AI research and engineering company pursuing adaptive, proprietary intelligence. Background across business, finance, entrepreneurship, and environmental research.
            </motion.p>

            {/* Core Philosophy Quote Card with Glass Tint */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md max-w-xl space-y-2 shadow-inner"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#C8E63A] uppercase tracking-wider font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8E63A]" />
                  Core Philosophical Thesis
                </span>
                <span className="text-[10px] font-mono text-[#71717A]">Knull Origins</span>
              </div>
              <p className="text-sm sm:text-base text-[#E5E7EB] leading-relaxed font-sans font-normal">
                &ldquo;Knull was born from looking at complex systems across disciplines. The most important behaviour is often found in the relationships between things, <span className="text-[#C8E63A] font-medium underline decoration-[#C8E63A]/50 decoration-2 underline-offset-4">not in the things themselves</span>.&rdquo;
              </p>
            </motion.div>

            {/* Interactive Contact Button in Website Lime Green */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="pt-2"
            >
              <button
                onClick={handleContact}
                className="group inline-flex items-center gap-2.5 bg-[#C8E63A] hover:bg-[#B8D62E] text-[#171717] font-mono text-xs sm:text-sm font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 transform hover:-translate-y-0.5 shadow-[0_8px_24px_rgba(200,230,58,0.25)] hover:shadow-[0_12px_32px_rgba(200,230,58,0.4)] cursor-pointer tracking-wider uppercase"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#171717]" />
                    <span>Copied (arjun@knull.ai)</span>
                  </>
                ) : (
                  <>
                    <span>CONTACT ARJUN</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#171717]" />
                  </>
                )}
              </button>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Minimalist Glowing AR Monogram Portrait Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              ref={cardRef}
              style={{ y: cardY }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[3/4] bg-[#121215] rounded-3xl border border-[#27272A] p-8 shadow-[0_24px_60px_rgba(0,0,0,0.5)] flex flex-col justify-between items-center text-center overflow-hidden group cursor-pointer"
            >
              {/* Dynamic Interactive Sheen on Mouse Hover with Website Lime Glow */}
              <motion.div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(420px circle at ${(mousePos.x + 0.5) * 100}% ${(mousePos.y + 0.5) * 100}%, rgba(200, 230, 58, 0.15), transparent 70%)`
                }}
              />

              {/* Top Metadata Pill */}
              <div className="w-full flex items-center justify-between text-[10px] font-mono text-[#71717A] border-b border-[#222226] pb-4 relative z-10">
                <span className="flex items-center gap-1.5 font-semibold text-white/90">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8E63A] animate-pulse" />
                  <span>KNULL</span>
                </span>
                <span className="uppercase text-[#A1A1AA] bg-white/[0.06] px-2.5 py-0.5 rounded-full border border-white/10 font-medium">
                  FOUNDER
                </span>
              </div>

              {/* Center AR Monogram with Atmospheric Depth */}
              <div className="relative z-10 flex flex-col items-center justify-center my-auto select-none">
                <motion.div
                  animate={{
                    x: mousePos.x * 12,
                    y: mousePos.y * 12,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="relative flex items-center justify-center"
                >
                  <span className="font-sans font-bold text-7xl sm:text-8xl tracking-[0.16em] text-[#222228] group-hover:text-[#2d3024] transition-colors duration-300 block pl-3">
                    AR
                  </span>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="font-sans font-bold text-7xl sm:text-8xl tracking-[0.16em] text-transparent bg-clip-text bg-gradient-to-b from-white/20 via-white/5 to-transparent block pl-3">
                      AR
                    </span>
                  </div>
                </motion.div>
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#D4D4D8] font-semibold mt-4 block">
                  ARJUN R.
                </span>
                <span className="text-[11px] font-mono text-[#71717A] mt-1 block">
                  Founder &bull; Systems Research
                </span>
              </div>

              {/* Bottom Card Footer */}
              <div className="w-full pt-4 border-t border-[#222226] flex items-center justify-between text-[10px] font-mono text-[#71717A] relative z-10">
                <span>Artificial Individuals</span>
                <span className="text-[#C8E63A] font-semibold flex items-center gap-1.5 bg-[#C8E63A]/10 px-2.5 py-1 rounded-full border border-[#C8E63A]/30">
                  <Sparkles className="w-3 h-3 text-[#C8E63A]" />
                  <span>Research Lead</span>
                </span>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Co-Founders: same card treatment as Arjun's, two columns on desktop */}
        <div className="mt-24 md:mt-32 space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2.5"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C8E63A] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C8E63A]" />
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#C8E63A] font-semibold">
              THE CO-FOUNDERS
            </span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 lg:gap-16">
            {CO_FOUNDERS.map((person, idx) => (
              <CoFounderCard key={person.initials} person={person} cardY={cardY} delay={0.1 + idx * 0.12} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const CO_FOUNDERS = [
  {
    name: "Harsh Yadav",
    initials: "HY",
    title: "Technical Co-Founder & Chief Engineer",
    focus: "AI Research & Engineering",
    description: "Leads Knull's AI research and engineering, working on the Bio-Neural Interface (BNI), our proprietary intelligence architecture, adaptive memory, neural learning, and emotion-inspired computational mechanisms.",
  },
  {
    name: "Dhruv Sharma",
    initials: "DS",
    title: "Technical Co-Founder",
    focus: "Backend & Systems Engineering",
    description: "Leads backend and systems engineering, developing the infrastructure, research workflows, and evidence-management systems supporting BNI.",
  },
];

function CoFounderCard({ person, cardY, delay }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, margin: '-60px' });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <motion.div
        ref={cardRef}
        style={{ y: cardY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[3/4] bg-[#121215] rounded-3xl border border-[#27272A] p-8 shadow-[0_24px_60px_rgba(0,0,0,0.5)] flex flex-col justify-between items-center text-center overflow-hidden group cursor-pointer"
      >
        {/* Dynamic Interactive Sheen on Mouse Hover with Website Lime Glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(420px circle at ${(mousePos.x + 0.5) * 100}% ${(mousePos.y + 0.5) * 100}%, rgba(200, 230, 58, 0.15), transparent 70%)`
          }}
        />

        {/* Top Metadata Pill */}
        <div className="w-full flex items-center justify-between text-[10px] font-mono text-[#71717A] border-b border-[#222226] pb-4 relative z-10">
          <span className="flex items-center gap-1.5 font-semibold text-white/90">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8E63A] animate-pulse" />
            <span>KNULL</span>
          </span>
          <span className="uppercase text-[#A1A1AA] bg-white/[0.06] px-2.5 py-0.5 rounded-full border border-white/10 font-medium">
            CO-FOUNDER
          </span>
        </div>

        {/* Center Monogram with Atmospheric Depth */}
        <div className="relative z-10 flex flex-col items-center justify-center my-auto select-none">
          <motion.div
            animate={{
              x: mousePos.x * 12,
              y: mousePos.y * 12,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative flex items-center justify-center"
          >
            <span className="font-sans font-bold text-7xl sm:text-8xl tracking-[0.16em] text-[#222228] group-hover:text-[#2d3024] transition-colors duration-300 block pl-3">
              {person.initials}
            </span>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="font-sans font-bold text-7xl sm:text-8xl tracking-[0.16em] text-transparent bg-clip-text bg-gradient-to-b from-white/20 via-white/5 to-transparent block pl-3">
                {person.initials}
              </span>
            </div>
          </motion.div>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#D4D4D8] font-semibold mt-4 block">
            {person.name}
          </span>
          <span className="text-[11px] font-mono text-[#71717A] mt-1 block">
            {person.title}
          </span>
        </div>

        {/* Bottom Card Footer */}
        <div className="w-full pt-4 border-t border-[#222226] flex items-center justify-between gap-2 text-[10px] font-mono text-[#71717A] relative z-10">
          <span>Focus</span>
          <span className="text-[#C8E63A] font-semibold flex items-center gap-1.5 bg-[#C8E63A]/10 px-2.5 py-1 rounded-full border border-[#C8E63A]/30">
            <Sparkles className="w-3 h-3 text-[#C8E63A] shrink-0" />
            <span>{person.focus}</span>
          </span>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: delay + 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[340px] sm:max-w-[380px] text-sm sm:text-base text-[#9CA3AF] leading-relaxed font-normal text-left"
      >
        {person.description}
      </motion.p>
    </div>
  );
}
