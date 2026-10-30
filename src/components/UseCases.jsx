import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Code, Compass, UserCheck, Shield, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';

export default function UseCases() {
  const [activeTab, setActiveTab] = useState('systems');

  const tabs = [
    { id: 'systems', label: 'Complex Investigations', icon: Code, color: 'text-blue-400' },
    { id: 'science', label: 'Scientific Research', icon: Compass, color: 'text-emerald-400' },
    { id: 'governance', label: 'Analysis & Decisions', icon: Briefcase, color: 'text-violet-400' },
    { id: 'interaction', label: 'Personal Adaptive Intelligence', icon: UserCheck, color: 'text-indigo-400' },
    { id: 'autonomous', label: 'Autonomous Research', icon: Shield, color: 'text-amber-400' },
  ];

  const contentMap = {
    science: {
      headline: "Help researchers see what the evidence doesn't cover yet.",
      tag: "Envisioned",
      badgeColor: "bg-emerald-500/10 text-emerald-200 border-emerald-500/25",
      metricBadge: "bg-emerald-500/10 text-emerald-200 border-emerald-500/25",
      bullets: [
        "Keep track of findings, their sources and how confident each one is.",
        "Flag when a new result contradicts an earlier conclusion.",
        "Suggest directions worth investigating next.",
      ],
      metric: "Envisioned",
      metricSub: "Builds on BNI's investigation work. Not yet a product.",
    },
    systems: {
      headline: "Work through complex questions with evidence attached at every step.",
      tag: "Demonstrated in prototype",
      badgeColor: "bg-blue-500/10 text-blue-200 border-blue-500/25",
      metricBadge: "bg-blue-500/10 text-blue-200 border-blue-500/25",
      bullets: [
        "Gather evidence and record where each piece came from.",
        "Detect gaps in context before a conclusion is drawn.",
        "Keep competing explanations open until the evidence decides.",
      ],
      metric: "Prototype",
      metricSub: "Specific evidence-based investigations run in BNI today.",
    },
    governance: {
      headline: "Support decisions with reasoning you can inspect.",
      tag: "Envisioned",
      badgeColor: "bg-violet-500/10 text-violet-200 border-violet-500/25",
      metricBadge: "bg-violet-500/10 text-violet-200 border-violet-500/25",
      bullets: [
        "Separate evidence from assumptions in every recommendation.",
        "Show uncertainty instead of hiding it.",
        "Record why a recommendation changed, and who approved it.",
      ],
      metric: "Envisioned",
      metricSub: "Depends on our verifiable learning research.",
    },
    autonomous: {
      headline: "Systems that investigate open questions, with people in the loop.",
      tag: "Long-term vision",
      badgeColor: "bg-amber-500/10 text-amber-200 border-amber-500/25",
      metricBadge: "bg-amber-500/10 text-amber-200 border-amber-500/25",
      bullets: [
        "Identify unexplored possibilities and missing information.",
        "Plan and run investigations within agreed limits.",
        "Bring findings back for human review before anything changes.",
      ],
      metric: "Long term",
      metricSub: "General autonomous discovery is a research goal, not a current capability.",
    },
    interaction: {
      headline: "An AI that learns with you over time.",
      tag: "Long-term vision",
      badgeColor: "bg-indigo-500/10 text-indigo-200 border-indigo-500/25",
      metricBadge: "bg-indigo-500/10 text-indigo-200 border-indigo-500/25",
      bullets: [
        "Remember what matters to you, and why.",
        "Adapt to your goals, context and way of working.",
        "Respond to your actual needs, using empathy as a functional signal, not a feeling.",
      ],
      metric: "Long term",
      metricSub: "Needs long-term memory and continual learning first.",
    },
  };

  const current = contentMap[activeTab] || contentMap.science;

  return (
    <section id="applications" className="py-28 md:py-36 bg-[#121215] border-b border-[#27272A] relative overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6">
        
        <div className="max-w-2xl mb-14 text-left">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#C8E63A]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#71717A]">
              APPLICATIONS
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-[550] tracking-tight text-[#F8F7F2]">
            Where this could lead.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
            One workflow is demonstrated in our prototype today. The others are where we hope the research leads.
          </p>
        </div>

        {/* Tab Pills */}
        <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-[#27272A] relative">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                  isSelected
                    ? 'text-[#C8E63A] font-semibold'
                    : 'text-[#A1A1AA] hover:text-[#F8F7F2] hover:bg-[#171717]'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeUseCasePill"
                    className="absolute inset-0 bg-[#0E0E10] rounded-full shadow-xs -z-0"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${isSelected ? tab.color : 'text-current'}`} />
                  <span>{tab.label}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab Content with Animated Crossfade & Tasteful Color Elevation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-gradient-to-br from-[#171717] to-[#171717] p-8 sm:p-12 rounded-3xl border border-[#27272A] shadow-[0_12px_40px_rgba(248,247,242,0.04)]"
          >
            <div className="lg:col-span-8 space-y-6">
              <span className={`text-[10px] font-mono uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full border inline-block ${current.badgeColor}`}>
                {current.tag}
              </span>
              <h3 className="text-2xl sm:text-3xl font-[550] text-[#F8F7F2] leading-snug">
                {current.headline}
              </h3>
              <ul className="space-y-3.5 text-sm text-[#A1A1AA] leading-relaxed">
                {current.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#F8F7F2] mt-0.5 shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-4 bg-[#121215] p-7 sm:p-8 rounded-2xl border border-[#27272A] text-center space-y-3 shadow-xs">
              <span className="text-[10px] font-mono text-[#71717A] uppercase tracking-wider block">
                Status
              </span>
              <div className={`text-xl sm:text-2xl font-[550] py-2 px-3 rounded-xl border font-sans ${current.metricBadge}`}>
                {current.metric}
              </div>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                {current.metricSub}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
