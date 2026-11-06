import React, { useState, useRef } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  Mic, 
  Volume2, 
  CheckCircle2, 
  Clock, 
  Share2, 
  Layers, 
  ArrowUpRight,
  CornerDownRight,
  Check,
  Radio,
  FileText
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function DuringMeeting() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: '-60px' });
  const { addToast } = useToast();
  
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  // Smooth vertical parallax without crooked rotation tilts
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const leftCardY = useTransform(scrollYProgress, [0, 1], [15, -15]);
  const rightCardY = useTransform(scrollYProgress, [0, 1], [-15, 15]);
  const centerConduitScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.05, 0.95]);

  const comparisons = [
    {
      id: "memory",
      title: "Memory",
      typed: "why does every session start from scratch?",
      category: "Memory",
      categoryColor: "bg-amber-500/10 text-amber-200 border-amber-500/25",
      speaker: "Knull Research",
      role: "Open problem",
      initials: "ME",
      avatarBg: "bg-indigo-600",
      timestamp: "Problem #01",
      enhanced: "Useful intelligence should build on what it has already learned, instead of treating each interaction as a new beginning.",
      decision: "Memory needs to be selective, connected and traceable, not just a longer context window.",
      actionItem: "Research long-term associative memory that links evidence, findings and past investigations.",
      assignee: "Pillar 01 • Bio-inspired intelligence",
      ticketTag: "Problem #01",
      audioQuote: "Remembering is more than storing. It means knowing what to keep, and why.",
    },
    {
      id: "uncertainty",
      title: "Uncertainty",
      typed: "how sure should this answer be?",
      category: "Uncertainty",
      categoryColor: "bg-blue-500/10 text-blue-200 border-blue-500/25",
      speaker: "Knull Research",
      role: "Open problem",
      initials: "UN",
      avatarBg: "bg-emerald-600",
      timestamp: "Problem #02",
      enhanced: "A fluent answer can still be wrong. Reliable systems need to separate evidence from assumption, and say when they don't know.",
      decision: "Uncertainty should be tracked and shown, not hidden behind confident wording.",
      actionItem: "Keep sources, confidence and competing explanations attached to every conclusion.",
      assignee: "Pillar 04 • BNI-based artistic thinking",
      ticketTag: "Problem #02",
      audioQuote: "Doubt is useful when it sends you looking for better evidence.",
    },
    {
      id: "discovery",
      title: "Discovery",
      typed: "what should we be asking?",
      category: "Discovery",
      categoryColor: "bg-violet-500/10 text-violet-200 border-violet-500/25",
      speaker: "Knull Research",
      role: "Open problem",
      initials: "DI",
      avatarBg: "bg-purple-600",
      timestamp: "Problem #03",
      enhanced: "Most AI waits for the right question. Often the most valuable step is noticing what's missing, inconsistent or overlooked.",
      decision: "Useful independent investigation is still an open research problem, and one we think matters.",
      actionItem: "Detect context gaps and contradictions, then suggest what's worth investigating next.",
      assignee: "Pillar 03 • Proactive discovery",
      ticketTag: "Problem #03",
      audioQuote: "The question nobody thought to ask is often the one that matters.",
    },
  ];

  const handleSelectMoment = (idx) => {
    setActiveItemIndex(idx);
    addToast(`Viewing: ${comparisons[idx].category}`);
  };

  const current = comparisons[activeItemIndex];

  return (
    <section 
      id="problem" 
      ref={containerRef} 
      className="py-24 md:py-32 bg-[#171717] border-b border-[#27272A] overflow-hidden relative"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/10 w-[500px] h-[500px] bg-emerald-300/10 rounded-full filter blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-[500px] h-[500px] bg-[#C8E63A]/15 rounded-full filter blur-[140px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        
        {/* Editorial Section Header */}
        <div className="max-w-2xl mb-12 text-left">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#C8E63A]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#71717A]">
              01 &bull; THE PROBLEM
            </span>
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-[550] tracking-[-0.04em] text-[#F8F7F2] leading-[0.95]">
            Answers aren't <span className="font-serif italic font-normal">understanding.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
            Today's AI is remarkably capable. But turning answers into reliable understanding is still hard: building on what it learned before, knowing when it's unsure, and noticing what nobody asked about. We want to explore a different approach.
          </p>
        </div>

        {/* =========================================================================
            MOMENT SELECTOR TABS: Clean, Interactive Segmented Control
            ========================================================================= */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#F8F7F2]">
              Explore a problem:
            </span>
          </div>

          <div className="flex items-center gap-2 bg-[#1F1F22] p-1 rounded-xl border border-[#27272A]">
            {comparisons.map((item, idx) => {
              const isSelected = activeItemIndex === idx;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectMoment(idx)}
                  className={`relative px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'text-[#F8F7F2] font-semibold'
                      : 'text-[#A1A1AA] hover:text-[#F8F7F2]'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeMomentTab"
                      className="absolute inset-0 bg-[#121215] rounded-lg shadow-xs border border-[#27272A]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${item.avatarBg}`} />
                    <span>{item.category}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            MAIN TRANSFORMATION GRID (Balanced Symmetrical Layout)
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">
          
          {/* =====================================================================
              LEFT CARD: Raw User Scratchpad (Clean, Balanced, Tactile Depth)
              ===================================================================== */}
          <motion.div
            style={{ y: leftCardY }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.6, y: 20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative group"
          >
            {/* Subtle parallel layered back-sheet for elegant depth (NO diagonal askew angles) */}
            <div className="absolute inset-0 bg-[#1F1F22] rounded-3xl border border-[#27272A] translate-y-2 translate-x-2 -z-10 transition-transform group-hover:translate-y-2.5 group-hover:translate-x-2.5" />

            <div className="bg-[#121215] p-6 sm:p-7 rounded-3xl border border-[#27272A] shadow-[0_16px_40px_rgba(248,247,242,0.05)] h-full flex flex-col justify-between">
              <div>
                {/* Card Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#27272A]">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="text-xs font-mono uppercase text-amber-200 font-bold bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/25">
                      Open Questions
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#71717A] bg-[#171717] px-2.5 py-1 rounded-md border border-[#27272A] flex items-center gap-1">
                    <FileText className="w-3 h-3 text-[#71717A]" />
                    Research Inquiry
                  </span>
                </div>

                {/* Micro Subheading */}
                <p className="text-xs text-[#A1A1AA] mb-4">
                  Three gaps between producing an answer and developing understanding:
                </p>

                {/* Selectable Jotted Fragments */}
                <div className="space-y-3">
                  {comparisons.map((item, idx) => {
                    const isSelected = activeItemIndex === idx;
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleSelectMoment(idx)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                          isSelected
                            ? 'bg-gradient-to-r from-amber-500/10 to-[#121215] border-amber-400 shadow-sm ring-1 ring-amber-400/30'
                            : 'bg-[#171717] border-[#27272A] hover:bg-[#1F1F22] hover:border-[#27272A] opacity-80 hover:opacity-100'
                        }`}
                      >
                        {isSelected && (
                          <motion.div
                            layoutId="activeFragmentBar"
                            className="absolute -left-1 top-3.5 bottom-3.5 w-1.5 bg-amber-500 rounded-full"
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                          />
                        )}
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`text-[10px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded border ${item.categoryColor}`}>
                            {item.category}
                          </span>
                          <span className="text-[11px] font-mono text-[#71717A]">
                            {item.timestamp}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 pt-1">
                          <span className="text-amber-400 font-mono text-sm font-bold">&gt;</span>
                          <p className="text-sm font-mono text-[#F8F7F2] font-semibold">
                            &ldquo;{item.typed}&rdquo;
                            {isSelected && (
                              <span className="inline-block w-1.5 h-4 ml-1 bg-amber-500 animate-pulse align-middle" />
                            )}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Card Footer Helper */}
              <div className="pt-4 mt-6 text-xs text-[#71717A] font-mono flex items-center justify-between border-t border-[#27272A]">
                <span>3 open problems</span>
                <span className="text-amber-200 font-semibold">Select one to explore</span>
              </div>
            </div>
          </motion.div>

          {/* =====================================================================
              CENTER TRANSFORMATION CONDUIT (Interactive Neural Bridge)
              ===================================================================== */}
          <div className="hidden lg:flex lg:col-span-2 flex-col items-center justify-center text-center space-y-4 py-8">
            <motion.button
              type="button"
              style={{ scale: centerConduitScale }}
              aria-label={`Next open question: ${comparisons[(activeItemIndex + 1) % comparisons.length].category}`}
              className="h-11 px-4 rounded-full bg-[#0E0E10] text-[#C8E63A] flex items-center gap-1.5 shadow-lg border border-[#C8E63A]/50 hover:border-[#C8E63A] hover:bg-[#1A1C12] relative group cursor-pointer text-xs font-mono font-semibold uppercase tracking-wider transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#C8E63A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#171717]"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              onClick={() => handleSelectMoment((activeItemIndex + 1) % comparisons.length)}
            >
              Next
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              <span className="absolute -inset-1 rounded-full bg-[#C8E63A]/20 filter blur-sm -z-10 animate-pulse" />
            </motion.button>

            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#F8F7F2] block bg-[#121215] px-2.5 py-1 rounded-full border border-[#27272A] shadow-xs">
                Our Approach
              </span>
              <div className="w-16 h-0.5 bg-gradient-to-r from-amber-400 via-[#C8E63A] to-emerald-500 mx-auto rounded-full" />
              <span className="text-[9px] font-mono text-[#71717A] block">
                Question &rarr; Research
              </span>
            </div>
          </div>

          {/* =====================================================================
              RIGHT CARD: Cadence Real-Time Contextual Synthesis
              ===================================================================== */}
          <motion.div
            style={{ y: rightCardY }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.6, y: 20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative group"
          >
            {/* Matching parallel layered back-sheet for balanced depth */}
            <div className="absolute inset-0 bg-[#1F1F22] rounded-3xl border border-[#27272A] translate-y-2 -translate-x-2 -z-10 transition-transform group-hover:translate-y-2.5 group-hover:-translate-x-2.5" />

            <div className="bg-[#121215] p-6 sm:p-7 rounded-3xl border border-emerald-500/40 shadow-[0_20px_50px_rgba(16,185,129,0.07)] h-full flex flex-col justify-between">
              <div>
                {/* Card Header with Speaker Info */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#27272A]">
                  <div className="flex items-center gap-2.5">
                    <span className={`w-7 h-7 rounded-full ${current.avatarBg} text-white flex items-center justify-center text-[10px] font-bold shadow-xs`}>
                      {current.initials}
                    </span>
                    <div>
                      <span className="text-xs font-semibold text-[#F8F7F2] block leading-tight">
                        {current.speaker}
                      </span>
                      <span className="text-[10px] text-[#71717A] font-mono">
                        {current.role} &bull; {current.timestamp}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-emerald-200 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1 rounded-full font-semibold flex items-center gap-1.5 shadow-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Research focus
                  </span>
                </div>

                {/* Dynamic Enhanced Content with AnimatePresence */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-3.5"
                  >
                    {/* Executive Synthesis Box (Cadence Lime Highlight) */}
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-[#1A1C12] to-[#121215] border border-[#C8E63A]/80 space-y-1.5 shadow-xs">
                      <span className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider font-semibold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#8CB800]" />
                        Why it matters
                      </span>
                      <p className="text-xs sm:text-sm text-[#F8F7F2] leading-relaxed font-sans font-medium">
                        {current.enhanced}
                      </p>
                    </div>

                    {/* Agreed Decision */}
                    <div className="p-3 rounded-xl bg-[#171717] border border-[#27272A] space-y-1 text-xs">
                      <span className="text-[10px] font-mono text-emerald-300 font-bold uppercase tracking-wider block">
                        What we think:
                      </span>
                      <p className="text-[#F8F7F2] font-medium leading-snug">
                        {current.decision}
                      </p>
                    </div>

                    {/* Auto-extracted Action Item */}
                    <div className="p-3 rounded-xl bg-[#121215] border border-indigo-500/25 flex items-center justify-between shadow-xs">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 mt-0.5 shrink-0" />
                        <div>
                          <span className="text-xs font-medium text-[#F8F7F2] block">
                            {current.actionItem}
                          </span>
                          <span className="text-[10px] font-mono text-[#71717A]">
                            {current.assignee}
                          </span>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono text-indigo-300 bg-indigo-500/10 border border-indigo-500/25 px-2 py-0.5 rounded font-medium">
                        {current.ticketTag}
                      </span>
                    </div>

                    {/* Verbatim Spoken Ground Truth Snippet */}
                    <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-[11px] text-emerald-200 font-mono italic">
                      &ldquo;{current.audioQuote}&rdquo;
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Card Footer */}
              <div className="pt-4 mt-6 border-t border-[#27272A] flex items-center justify-between text-xs font-mono">
                <span className="text-indigo-300 font-semibold flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" />
                  Knull Core Research
                </span>
                <span className="text-emerald-300 font-bold">Open research</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
