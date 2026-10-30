import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { Search, Sparkles, FileText, ArrowRight, CornerDownLeft } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function AIMemory() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: '-60px' });
  const { addToast } = useToast();
  const [searchQuery, setSearchQuery] = useState("What context is still missing?");
  const [activeQuery, setActiveQuery] = useState("What context is still missing?");
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(true);

  // Bidirectional continuous scroll parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const workspaceY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const lineOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.35, 0.1]);

  const sampleQueries = [
    "What context is still missing?",
    "How does BNI adapt when evidence conflicts?",
    "Where did this finding come from?",
  ];

  const handleRunSearch = (q) => {
    setIsSearching(true);
    setSearchQuery(q);
    setActiveQuery(q);

    setTimeout(() => {
      setIsSearching(false);
      setHasSearched(true);
      addToast(`Showing pre-written example for: "${q}"`);
    }, 750);
  };

  return (
    <section id="memory" ref={containerRef} className="py-28 md:py-36 bg-white border-b border-[#E8E6DF] overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6">
        
        {/* Editorial Section Header */}
        <div className="max-w-2xl mb-16 text-left">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#C8E63A]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#88867F]">
              04 &bull; BIO-NEURAL INTERFACE
            </span>
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-[550] tracking-[-0.04em] text-[#171717] leading-[0.95]">
            BNI <span className="font-serif italic font-normal">remembers why.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5F5D57] leading-relaxed">
            Our Bio-Neural Interface (BNI) is our first research product. Today it runs evidence-based investigations: it gathers sources, tracks uncertainty and flags gaps in context. Next, we're researching long-term associative memory that connects evidence and past investigations over time. It's also our first step in exploring whether something like sentience could ever emerge from it.
          </p>
        </div>

        {/* AI Memory Search Workspace with Parallax */}
        <motion.div 
          style={{ y: workspaceY }}
          className="bg-[#F8F7F2] rounded-3xl border border-[#DCDAD2] p-6 sm:p-10 shadow-xs space-y-8 relative overflow-hidden"
        >
          {/* Subtle SVG Connection Line with Dynamic Scroll Opacity */}
          <motion.svg 
            style={{ opacity: lineOpacity }}
            className="absolute inset-0 w-full h-full pointer-events-none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 120 100 Q 240 180 400 220 T 800 320"
              fill="none"
              stroke="#171717"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
          </motion.svg>

          {/* Search Input Bar with Smooth Expansion */}
          <div className="space-y-3 relative z-10">
            <div className="flex items-center gap-3 bg-white p-3.5 sm:p-4 rounded-2xl border border-[#DCDAD2] focus-within:border-[#171717] transition-all shadow-xs">
              <Search className="w-5 h-5 text-[#88867F] shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleRunSearch(searchQuery)}
                placeholder="Pick or type an example question..."
                className="w-full bg-transparent text-sm sm:text-base text-[#171717] placeholder-[#88867F] focus:outline-none"
              />
              <button
                onClick={() => handleRunSearch(searchQuery)}
                disabled={isSearching}
                className="px-5 py-2.5 rounded-xl bg-[#171717] text-[#FAF9F5] text-xs font-semibold hover:bg-black transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                {isSearching ? (
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8E63A] animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8E63A] animate-bounce" style={{ animationDelay: '120ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8E63A] animate-bounce" style={{ animationDelay: '240ms' }} />
                  </div>
                ) : (
                  <>
                    <span>Show</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>

            {/* Clickable Example Prompts */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-[#88867F] font-mono text-[11px]">Illustrative examples, pre-written (not live AI output):</span>
              {sampleQueries.map((q) => (
                <button
                  key={q}
                  onClick={() => handleRunSearch(q)}
                  className={`px-3 py-1 rounded-full border text-[11px] transition-all cursor-pointer ${
                    activeQuery === q
                      ? 'bg-[#171717] text-[#C8E63A] border-[#171717] font-semibold scale-105'
                      : 'bg-white text-[#5F5D57] border-[#DCDAD2] hover:border-[#171717]'
                  }`}
                >
                  "{q}"
                </button>
              ))}
            </div>
          </div>

          {/* AI Synthesized Response Area with AnimatePresence */}
          <AnimatePresence mode="wait">
            {hasSearched && (
              <motion.div
                key={activeQuery}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCDAD2] space-y-6 relative z-10 shadow-xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#171717] font-semibold">
                    <span className="w-2 h-2 rounded-full bg-[#C8E63A]" />
                    <span>Example BNI response &bull; pre-written for illustration</span>
                  </div>

                  {activeQuery.toLowerCase().includes("context") ? (
                    <p className="text-sm sm:text-base text-[#171717] leading-relaxed font-sans">
                      "Two gaps stand out: there's no data beyond 12 months, and Source B doesn't explain how its sample was chosen. Both should be checked before relying on this conclusion."
                    </p>
                  ) : activeQuery.toLowerCase().includes("adapt") ? (
                    <p className="text-sm sm:text-base text-[#171717] leading-relaxed font-sans">
                      "BNI doesn't overwrite the earlier finding. It records the conflict, keeps both explanations, and proposes a correction for human review."
                    </p>
                  ) : (
                    <p className="text-sm sm:text-base text-[#171717] leading-relaxed font-sans">
                      "This finding traces back to three sources and one earlier investigation. <span className="lime-highlight font-medium">Each step keeps its source, its confidence and what it replaced</span>, so the reasoning can be checked."
                    </p>
                  )}
                </div>

                {/* Source Cards with Tooltips */}
                <div className="pt-5 border-t border-[#E8E6DF] space-y-3">
                  <span className="text-[11px] font-mono text-[#88867F] uppercase block">
                    What BNI connects (illustrative records):
                  </span>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    {[
                      {
                        title: "Evidence & Source",
                        date: "Record 01 &bull; Provenance",
                        snippet: "Where a claim came from and how strong its support is.",
                      },
                      {
                        title: "Uncertainty & Competing Views",
                        date: "Record 02 &bull; Confidence",
                        snippet: "What's still unknown, and which explanations are still in play.",
                      },
                      {
                        title: "Investigation History",
                        date: "Record 03 &bull; Memory",
                        snippet: "Past investigations, earlier conclusions and proposed corrections.",
                      },
                    ].map((source, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ y: -3 }}
                        transition={{ duration: 0.18 }}
                        className="p-4 rounded-xl border border-[#E8E6DF] bg-[#FAF9F5] hover:bg-white hover:border-[#171717] transition-all space-y-2 cursor-pointer group"
                      >
                        <div className="flex items-center justify-between text-[11px] font-mono text-[#88867F]">
                          <span dangerouslySetInnerHTML={{ __html: source.date }} />
                          <FileText className="w-3.5 h-3.5 text-[#5F5D57] group-hover:text-[#171717]" />
                        </div>
                        <h4 className="font-semibold text-xs text-[#171717] group-hover:underline">
                          {source.title}
                        </h4>
                        <p className="text-[11px] text-[#5F5D57] italic leading-snug">
                          {source.snippet}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
