import React from 'react';

export default function SocialProof() {
  const teams = [
    { name: "Bio-Inspired Intelligence", symbol: "BI" },
    { name: "Computational Emotions", symbol: "CE" },
    { name: "Proactive Discovery", symbol: "PD" },
    { name: "BNI-Based Artistic Thinking", symbol: "AT" },
  ];

  return (
    <section className="py-14 bg-[#121215] border-b border-[#27272A]">
      <div className="max-w-[1240px] mx-auto px-6 text-center">
        <span className="text-xs font-mono uppercase tracking-widest text-[#71717A] block mb-8">
          Four connected research pillars
        </span>

        {/* Minimalist Monochrome Logo Strip */}
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-75">
          {teams.map((team, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 text-sm font-semibold tracking-tight text-[#F8F7F2] hover:opacity-100 transition-opacity cursor-pointer group"
            >
              <span className="w-6 h-6 rounded-md bg-[#1F1F22] group-hover:bg-[#C8E63A] transition-colors flex items-center justify-center text-[10px] font-mono text-[#F8F7F2] group-hover:text-[#171717]">
                {team.symbol.slice(0, 2)}
              </span>
              <span>{team.name}</span>
            </div>
          ))}
        </div>
        
        <span className="text-[10px] font-mono text-[#71717A] block mt-4">
          Remembers &bull; Questions &bull; Discovers &bull; Evolves
        </span>
      </div>
    </section>
  );
}
