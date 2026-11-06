import React from 'react';
import { smoothScrollTo } from '../utils/scroll';

export default function Footer() {
  const sections = [
    {
      title: "Research",
      links: [
        { label: "The Problem", href: "#problem" },
        { label: "The Idea", href: "#idea" },
        { label: "The Vision", href: "#vision" },
        { label: "Bio-Neural Interface", href: "#memory" },
        { label: "Living Intelligence", href: "#individuals" },
        { label: "Applications", href: "#applications" },
      ],
    },
    {
      title: "Pillars",
      links: [
        { label: "Bio-Inspired Intelligence", href: "#individuals" },
        { label: "Computational Emotions", href: "#individuals" },
        { label: "Proactive Discovery", href: "#individuals" },
        { label: "BNI-Based Artistic Thinking", href: "#individuals" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Knull", href: "#hero" },
        { label: "Founder", href: "#founder" },
        { label: "Research Perspectives", href: "#people" },
        { label: "Research Architecture", href: "#ecosystem" },
      ],
    },
    {
      title: "Trust",
      links: [
        { label: "Evidence & Provenance", href: "#security" },
        { label: "Terms of Research", href: "#" },
        { label: "Reviewable Changes", href: "#security" },
      ],
    },
  ];

  const handleLinkClick = (e, href) => {
    if (href.startsWith('#') && href.length > 1) {
      e.preventDefault();
      smoothScrollTo(href, href === '#hero' ? 0 : -80);
    }
  };

  return (
    <footer className="bg-[#0E0E10] py-24 text-[#71717A] text-xs font-sans">
      <div className="max-w-[1240px] mx-auto px-6">
        
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-20">
          
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <a 
              href="#hero" 
              onClick={(e) => handleLinkClick(e, '#hero')}
              className="flex items-center gap-2.5 group cursor-pointer inline-flex"
            >
              <div className="w-8 h-8 rounded-lg bg-[#121215] flex items-center justify-center text-[#F8F7F2] group-hover:bg-[#C8E63A] group-hover:text-[#171717] transition-colors">
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 stroke-current stroke-[2.2]" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12h3l3-7 4 14 3-7h3" />
                </svg>
              </div>
              <span className="font-semibold text-xl text-[#F8F7F2] tracking-tight">
                Knull
              </span>
            </a>
            <p className="text-xs text-[#71717A] max-w-xs leading-relaxed font-normal">
              An AI that doesn't just respond. It remembers, questions, discovers, and evolves with you. Knull is an AI research and engineering company pursuing adaptive, proprietary intelligence.
            </p>
            <div className="pt-2 text-[11px] font-mono text-[#A1A1AA]">
              San Francisco &bull; Distributed Research Labs
            </div>
          </div>

          {/* Nav columns */}
          {sections.map((col, idx) => (
            <div key={idx} className="space-y-3.5">
              <h5 className="font-mono uppercase tracking-wider text-[#F8F7F2] text-[11px] font-semibold">
                {col.title}
              </h5>
              <ul className="space-y-2.5">
                {col.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <a 
                      href={link.href} 
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="hover:text-[#F8F7F2] transition-colors cursor-pointer"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#333230] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#A1A1AA] font-mono">
          <div>
            &copy; 2026 Knull Technologies Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-[#C8E63A]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8E63A] animate-pulse" />
              Research in progress
            </span>
            <span>BNI &bull; First research product</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
