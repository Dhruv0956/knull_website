import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  FileText, 
  Sparkles, 
  Check, 
  Copy, 
  ChevronRight, 
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function HeroProductMockup({ onOpenFullWorkspace }) {
  const containerRef = useRef(null);
  const { addToast } = useToast();
  const [aiEnhancedVisible, setAiEnhancedVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  // Scroll transforms for the 3D overlapping tilted card stack
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Back Card 1 (Calendar Dossier - Tilted Left)
  const card1Rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-5, -9, -13]);
  const card1X = useTransform(scrollYProgress, [0, 0.5, 1], [-25, -55, -90]);
  const card1Y = useTransform(scrollYProgress, [0, 0.5, 1], [-15, 10, 35]);

  // Back Card 2 (AI Semantic Memory - Tilted Right)
  const card2Rotate = useTransform(scrollYProgress, [0, 0.5, 1], [4, 7, 11]);
  const card2X = useTransform(scrollYProgress, [0, 0.5, 1], [25, 55, 90]);
  const card2Y = useTransform(scrollYProgress, [0, 0.5, 1], [-20, -35, -55]);

  // Front Card 3 (Main Notepad)
  const frontCardRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [4, 0, -3]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAiEnhancedVisible(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard?.writeText("Claim A holds, with moderate confidence. Investigate the conflict with Source C before changing the conclusion.");
    addToast('Example conclusion copied');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      ref={containerRef}
      data-cursor="interactive"
      className="relative w-full perspective-[1200px] select-none py-6 sm:py-10"
    >
      {/* =========================================================================
          BACK CARD 1 (Z-INDEX 10): Tilted Left — Calendar & Pre-Meeting Brief
          Palette: Soft Cobalt Blue, Fresh Emerald, Calm Ivory
          ========================================================================= */}
      <motion.div
        style={{
          rotate: card1Rotate,
          x: card1X,
          y: card1Y,
        }}
        whileHover={{ zIndex: 40, scale: 1.03, rotate: -2, transition: { duration: 0.25 } }}
        className="absolute -top-6 left-2 sm:-left-4 w-[85%] sm:w-[80%] bg-[#FFFFFF]/90 backdrop-blur-md rounded-3xl border border-blue-200/80 p-5 shadow-[0_20px_50px_rgba(37,99,235,0.08)] z-10 transition-shadow hover:shadow-2xl"
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E6DF] mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-wider text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
              Investigation &bull; Context Gap
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#88867F]">Example</span>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-[550] text-[#171717]">
            What evidence is still missing?
          </h4>
          <div className="flex items-center gap-2 text-[11px] text-[#5F5D57]">
            <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[9px] font-bold">
              EV
            </span>
            <span>3 sources linked</span>
            <span className="text-[#88867F]">&bull;</span>
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px] font-bold">
              UN
            </span>
            <span>Uncertainty tracked</span>
          </div>
        </div>

        <div className="mt-3.5 pt-3 border-t border-[#E8E6DF] flex items-center justify-between">
          <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Evidence Linked
          </span>
          <span className="text-[10px] font-mono text-[#88867F]">2 Context Gaps Flagged</span>
        </div>
      </motion.div>

      {/* =========================================================================
          BACK CARD 2 (Z-INDEX 20): Tilted Right — Cross-Meeting AI Recall
          Palette: Electric Violet, Warm Amber, Dark Slate
          ========================================================================= */}
      <motion.div
        style={{
          rotate: card2Rotate,
          x: card2X,
          y: card2Y,
        }}
        whileHover={{ zIndex: 40, scale: 1.03, rotate: 2, transition: { duration: 0.25 } }}
        className="absolute -top-4 right-2 sm:-right-4 w-[85%] sm:w-[80%] bg-[#FFFFFF]/90 backdrop-blur-md rounded-3xl border border-violet-200/80 p-5 shadow-[0_20px_50px_rgba(124,58,237,0.08)] z-20 transition-shadow hover:shadow-2xl"
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E6DF] mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-wider text-violet-700 font-semibold bg-violet-50 px-2 py-0.5 rounded-full border border-violet-200">
              Associative Memory &bull; Research
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#88867F] bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full font-medium">
            Concept
          </span>
        </div>

        <p className="text-xs text-[#171717] leading-relaxed font-sans">
          &ldquo;A new finding contradicts an earlier conclusion. A correction is proposed and held for human review.&rdquo;
        </p>

        <div className="mt-3.5 pt-3 border-t border-[#E8E6DF] flex items-center justify-between text-[10px] font-mono text-[#88867F]">
          <span className="text-violet-700 font-semibold">Linked to past investigations</span>
          <span>Illustrative</span>
        </div>
      </motion.div>

      {/* =========================================================================
          FRONT MAIN CARD (Z-INDEX 30): Primary Cadence Live Meeting Notepad
          Palette: Pure White, Deep Ink, Cadence Lime, Emerald & Cobalt Chips
          ========================================================================= */}
      <motion.div 
        style={{
          rotateX: frontCardRotateX,
        }}
        className="relative z-30 w-full bg-[#FFFFFF] rounded-3xl border border-[#DCDAD2] shadow-[0_32px_80px_-20px_rgba(23,23,23,0.16)] overflow-hidden transition-all duration-300"
      >
        {/* Top Application Header Bar */}
        <div className="bg-[#F8F7F2] px-5 py-3 border-b border-[#E8E6DF] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E8E6DF]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#E8E6DF]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#E8E6DF]" />
            </div>
            <span className="text-xs font-mono text-[#5F5D57] font-medium">
              Knull &bull; AHI &times; Investigation
            </span>
          </div>

          {/* Live Recording Indicator with Emerald Pulse + Lime Badge */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-900 font-semibold text-[11px]">Illustrative</span>
            </div>

            <button
              onClick={onOpenFullWorkspace}
              className="text-xs font-medium text-[#171717] bg-white hover:bg-[#F1F0EA] px-2.5 py-1 rounded-full border border-[#DCDAD2] transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
            >
              <span>Research</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Main Split Mockup Area */}
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[460px] text-xs">
          
          {/* Left Side: Live Meeting & Note Stream */}
          <div className="md:col-span-7 bg-white p-6 sm:p-7 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E8E6DF]">
            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-[#88867F]">Concept view &bull; Not live output</span>
                    <span className="text-[10px] font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200">
                      AHI
                    </span>
                  </div>
                  <button 
                    onClick={handleCopy}
                    className="text-[#88867F] hover:text-[#171717] transition-colors flex items-center gap-1 text-[11px] cursor-pointer"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <h2 className="text-xl sm:text-2xl font-[550] tracking-tight text-[#171717]">
                  AHI Investigation Loop
                </h2>
              </div>

              {/* What user typed: Raw Scratchpad */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#88867F]">
                    Inputs
                  </span>
                  <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Evidence
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#F8F7F2] border border-[#E8E6DF] text-xs text-[#171717] font-mono space-y-1.5">
                  <p>&bull; Claim A is supported by two independent sources</p>
                  <p>&bull; Source C conflicts with an earlier finding</p>
                  <p>&bull; No data yet on long-term effects</p>
                </div>
              </div>

              {/* AI Enhancement Reveal with Violet + Lime Highlight */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#88867F]">
                    AHI Assessment
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono bg-violet-50 text-violet-700 px-2.5 py-0.5 rounded-full font-semibold border border-violet-200">
                    <Sparkles className="w-2.5 h-2.5 text-violet-600" />
                    Evidence-governed
                  </span>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={aiEnhancedVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="p-4 rounded-2xl bg-gradient-to-br from-white to-[#FAFDF0] border border-[#C8E63A]/70 space-y-2 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-xs text-[#171717]">Working conclusion:</h4>
                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium border border-emerald-200">
                      Needs review
                    </span>
                  </div>
                  <p className="text-xs text-[#5F5D57] leading-relaxed">
                    Claim A holds, with moderate confidence. The conflict with Source C should be investigated before the conclusion changes, and the missing long-term data is <span className="lime-highlight font-medium text-[#171717]">the next question worth asking</span>.
                  </p>
                </motion.div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8E6DF] text-[11px] text-[#88867F] font-mono flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Remember &bull; Question &bull; Discover &bull; Evolve
              </span>
              <span className="text-[#171717] font-semibold">Reviewable</span>
            </div>
          </div>

          {/* Right Side: Action Items & Decisions */}
          <div className="md:col-span-5 bg-[#F8F7F2] p-6 sm:p-7 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E6DF]">
                <span className="font-mono text-xs uppercase tracking-wider text-[#171717] font-semibold">
                  Next Steps
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-medium">
                  3 Steps
                </span>
              </div>

              <div className="space-y-2.5">
                {[
                  { task: "Question: Flag the conflict between Source C and the earlier finding", owner: "Doubt signal", due: "Done", done: true, tag: "Step #01", tagColor: "bg-indigo-50 text-indigo-700 border-indigo-200" },
                  { task: "Discover: Identify the missing long-term evidence", owner: "Curiosity signal", due: "Done", done: true, tag: "Step #02", tagColor: "bg-emerald-50 text-emerald-700 border-emerald-200" },
                  { task: "Evolve: Propose a correction, held for human approval", owner: "Verifiable learning", due: "Pending", done: false, tag: "Step #03", tagColor: "bg-amber-50 text-amber-700 border-amber-200" },
                ].map((item, idx) => (
                  <div 
                    key={idx}
                    className="p-3 rounded-xl bg-white border border-[#E8E6DF] space-y-1.5 shadow-xs hover:border-[#171717] transition-all"
                  >
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${item.done ? 'text-emerald-600' : 'text-[#DCDAD2]'}`} />
                      <span className={`text-xs ${item.done ? 'text-[#5F5D57]' : 'text-[#171717] font-medium'}`}>
                        {item.task}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#88867F] pl-5">
                      <span>{item.owner}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[9px] border font-medium ${item.tagColor}`}>
                        {item.tag}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3.5 bg-gradient-to-r from-white to-[#F9F8F2] rounded-xl border border-amber-200/70 text-[11px] text-[#5F5D57] space-y-1 font-mono shadow-xs">
                <span className="text-amber-900 font-semibold block flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Core Principle:
                </span>
                <p className="text-[#171717] font-sans">&bull; Learning should never mean silently rewriting what it knew.</p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8E6DF] text-[11px] font-mono text-[#88867F] flex items-center justify-between">
              <span className="text-indigo-700 font-semibold flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" />
                Remember &bull; Question &bull; Discover &bull; Evolve
              </span>
              <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Illustrative
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
