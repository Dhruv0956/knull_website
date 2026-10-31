import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function AfterMeeting() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: '-60px' });
  const { addToast } = useToast();
  const [copied, setCopied] = useState(false);

  // Bidirectional continuous scroll parallax & 3D tilt
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rawCardTilt = useTransform(scrollYProgress, [0, 0.5, 1], [-2.5, -1, 0.5]);
  const resultCardTilt = useTransform(scrollYProgress, [0, 0.5, 1], [2.5, 1, -0.5]);
  const sandboxY = useTransform(scrollYProgress, [0, 1], [25, -25]);

  const rawBullets = [
    "Built: the Bio-Neural Interface (BNI), evidence-based investigation and context-gap detection.",
    "Researching: bio-inspired neural computation.",
    "Researching: adaptive memory and continual learning.",
    "Long term: our own efficient, proprietary architecture.",
    "Open question: whether artificial sentience is possible at all.",
  ];

  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard?.writeText("Built: BNI evidence-based investigation. Researching: bio-inspired computation, adaptive memory, continual learning. Long term: a proprietary architecture. Open question: whether artificial sentience is possible.");
    addToast('Roadmap copied');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="vision" ref={containerRef} className="py-28 md:py-36 bg-[#171717] border-b border-[#27272A] overflow-hidden relative">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-violet-400/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#C8E63A]/10 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        
        {/* Editorial Section Header */}
        <div className="max-w-2xl mb-16 text-left">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#C8E63A]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#71717A]">
              03 &bull; THE VISION
            </span>
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-[550] tracking-[-0.04em] text-[#F8F7F2] leading-[0.95]">
            Our own <span className="font-serif italic font-normal">architecture.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
            We don't intend to depend on GPT, Qwen or any other existing model forever. Our goal is a proprietary architecture inspired by biological intelligence, with adaptive memory, continual learning and more efficient reasoning. Further out, our founders want to explore a harder question: could an artificial being ever be sentient? Nobody knows yet, and there's no established way to build one. We treat it as an open scientific question, not a promise.
          </p>
        </div>

        {/* Polished Product Interaction Sandbox with 3D Overlapping Depth */}
        <motion.div 
          style={{ y: sandboxY }}
          className="bg-[#121215] rounded-3xl border border-[#27272A] p-6 sm:p-10 shadow-[0_20px_60px_rgba(248,247,242,0.06)] relative overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#27272A] gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/25 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-violet-300 font-semibold bg-violet-500/10 px-2 py-0.5 rounded-full border border-violet-500/25">
                  Research Roadmap
                </span>
                <h3 className="text-xl font-[550] text-[#F8F7F2]">From BNI to our own architecture</h3>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center perspective-[1200px]">
            
            {/* LEFT: Raw Fragments (3D tilted left) */}
            <motion.div 
              style={{ rotate: rawCardTilt }}
              whileHover={{ rotate: 0, scale: 1.01, transition: { duration: 0.2 } }}
              className="lg:col-span-6 bg-gradient-to-br from-[#171717] to-[#1F1F22] p-6 rounded-2xl border border-amber-500/25 space-y-4 transition-all duration-300 shadow-xs cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase text-amber-200 font-semibold bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/25">
                  Where we are
                </span>
                <span className="text-[10px] font-mono bg-[#121215] text-[#A1A1AA] px-2 py-0.5 rounded border border-[#27272A]">
                  4 Stages
                </span>
              </div>
              <ul className="space-y-2.5 text-xs text-[#F8F7F2] font-mono leading-relaxed">
                {rawBullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-2 bg-[#121215] p-3 rounded-xl border border-[#27272A] shadow-xs">
                    <span className="text-[#71717A] select-none">&bull;</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <div className="text-[11px] text-[#71717A] font-mono">
                What exists today, what we're researching, and where we're headed.
              </div>
            </motion.div>

            {/* RIGHT: Structured Meeting Result (3D tilted right with colorful cards) */}
            <motion.div 
              style={{ rotate: resultCardTilt }}
              whileHover={{ rotate: 0, scale: 1.01, transition: { duration: 0.2 } }}
              className="lg:col-span-6 bg-gradient-to-br from-[#121215] to-[#1A1C12] p-6 rounded-2xl border border-emerald-500/25 space-y-4 min-h-[300px] flex flex-col justify-between shadow-xs cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs uppercase text-emerald-200 font-semibold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/25 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Knull Research Blueprint
                  </span>
                  <button
                    onClick={handleCopy}
                    className="text-[10px] font-mono text-emerald-300 hover:text-emerald-200 bg-[#121215] border border-emerald-500/25 px-2.5 py-1 rounded-full transition-colors cursor-pointer shadow-xs"
                  >
                    {copied ? 'Copied ✓' : 'Copy'}
                  </button>
                </div>

                    <div className="space-y-3 text-xs">
                      {/* Mission Card */}
                      <div className="p-3.5 bg-[#121215] rounded-xl border border-violet-500/25 space-y-1 shadow-xs">
                        <span className="text-[10px] font-mono text-violet-300 uppercase font-semibold">
                          Built today
                        </span>
                        <p className="text-[#F8F7F2] leading-relaxed">
                          BNI runs <span className="lime-highlight font-medium">evidence-governed investigations</span> and flags gaps in context.
                        </p>
                      </div>

                      {/* Approach Card */}
                      <div className="p-3.5 bg-[#121215] rounded-xl border border-emerald-500/25 space-y-1 shadow-xs">
                        <span className="text-[10px] font-mono text-emerald-300 uppercase font-semibold">
                          Researching
                        </span>
                        <p className="text-[#F8F7F2] font-medium leading-relaxed">
                          Bio-inspired neural computation, associative memory and continual learning. Candidates, not final choices.
                        </p>
                      </div>

                      {/* Proprietary Card */}
                      <div className="p-3.5 bg-[#121215] rounded-xl border border-amber-500/25 space-y-1 shadow-xs">
                        <span className="text-[10px] font-mono text-amber-300 uppercase font-semibold">
                          Long-term vision
                        </span>
                        <p className="text-[#F8F7F2] font-medium leading-relaxed">
                          A proprietary architecture that learns from experience and reasons more efficiently. Not yet built or validated.
                        </p>
                      </div>

                      {/* Open Question Card */}
                      <div className="p-3.5 bg-[#121215] rounded-xl border border-violet-500/25 space-y-1 shadow-xs">
                        <span className="text-[10px] font-mono text-violet-300 uppercase font-semibold">
                          Open question
                        </span>
                        <p className="text-[#F8F7F2] font-medium leading-relaxed">
                          Could a sentient artificial being ever exist? We're exploring it, with no guarantee of an answer. BNI is not sentient and doesn't experience feelings.
                        </p>
                      </div>
                    </div>
              </div>

              <div className="pt-3 border-t border-[#27272A] text-[10px] font-mono flex items-center justify-between">
                <span className="text-indigo-300 font-medium">Built &bull; Researching &bull; Vision &bull; Open question</span>
                <span className="text-emerald-300 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/25">
                  Work in progress
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
