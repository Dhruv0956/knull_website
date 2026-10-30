import React from 'react';

export default function Workflow() {
  const steps = [
    {
      step: "01 // CAPTURE",
      title: "Jot down rough bullets",
      desc: "Type a few words while you listen. Startup synchronizes your scratchpad bullets with hardware mic audio in real time.",
      borderColor: "border-[#141413]",
    },
    {
      step: "02 // ENHANCE",
      title: "AI synthesizes the context",
      desc: "Hit Enhance. The model retains your authentic voice while extracting accurate technical figures, customer metrics, and deliverables.",
      borderColor: "border-[#D1E043]",
    },
    {
      step: "03 // EXECUTE",
      title: "Ship directly to production",
      desc: "Export formatted tasks directly to Linear, update team architecture in Notion, or commit drafted code stubs directly to GitHub.",
      borderColor: "border-[#141413]",
    },
  ];

  return (
    <section id="workflow" className="py-24 md:py-32 bg-[#121215] border-b border-[#222226]">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#71717A] block mb-3">
              How It Works
            </span>
            <h2 className="text-4xl sm:text-5xl font-serif text-[#F8F7F2]">
              From raw thought to shipping code.
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#A1A1AA] leading-relaxed">
            Three frictionless stages designed around the human builder's flow rather than bureaucratic management software.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, idx) => (
            <div key={idx} className={`border-t-2 ${item.borderColor} pt-6 space-y-4`}>
              <span className="font-mono text-xs text-[#71717A] font-semibold">{item.step}</span>
              <h4 className="text-2xl font-serif font-bold text-[#F8F7F2]">{item.title}</h4>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
