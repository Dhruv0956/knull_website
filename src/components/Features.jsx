import React from 'react';
import { MicOff, ShieldCheck, Cpu } from 'lucide-react';

export default function Features() {
  const pillars = [
    {
      icon: <MicOff className="w-6 h-6 text-[#F8F7F2]" />,
      title: "No Meeting Bots",
      desc: "Uses your computer audio directly. Never invites an intrusive third-party bot into client presentations or confidential founder discussions.",
      tag: "Works with Zoom, Meet, Teams & Phone",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      title: "Private by Default",
      desc: "Your audio, customer discussions, and codebase secrets never train public LLMs. Fully local-first processing with zero data leakage.",
      tag: "SOC-2 & GDPR Compliant",
    },
    {
      icon: <Cpu className="w-6 h-6 text-[#F8F7F2]" />,
      title: "Continuous Memory",
      desc: "Unlike traditional chatbots that reset with every session, Startup maintains an episodic knowledge graph that connects notes over months.",
      tag: "Episodic Knowledge Graph",
    },
  ];

  return (
    <section id="features" className="py-24 md:py-32 bg-[#171717] border-b border-[#222226]">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#71717A] block mb-3">
            Core Architecture
          </span>
          <h2 className="text-4xl sm:text-6xl font-serif text-[#F8F7F2] leading-[1.05]">
            Built for builders in back-to-back execution.
          </h2>
          <p className="mt-4 text-base text-[#A1A1AA]">
            Stop letting game-changing customer insights and architectural decisions vanish into messy temporary text files.
          </p>
        </div>

        {/* 3 Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => (
            <div 
              key={idx}
              className="bg-[#121215] p-8 rounded-3xl border border-[#222226] shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex flex-col justify-between group hover:border-[#8F8D85] transition-all hover:-translate-y-1"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#171717] border border-[#222226] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-bold text-[#F8F7F2] mb-3">{pillar.title}</h3>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#222226] text-xs font-mono text-[#71717A]">
                {pillar.tag}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
