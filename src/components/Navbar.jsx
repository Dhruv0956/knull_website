import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Command, Menu, X, LayoutGrid } from 'lucide-react';
import { smoothScrollTo } from '../utils/scroll';

const NAV_ITEMS = [
  { id: 'problem', label: 'The Problem' },
  { id: 'idea', label: 'The Idea' },
  { id: 'vision', label: 'The Vision' },
  { id: 'individuals', label: 'Living Intelligence' },
  { id: 'applications', label: 'Applications' },
  { id: 'founder', label: 'People' },
];

export default function Navbar({ onOpenCommandPalette, onOpenWorkspace }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [hoveredSection, setHoveredSection] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Scroll spy for active section highlight
      const scrollPos = window.scrollY + 200;
      let current = '';
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            current = item.id;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setActiveSection(targetId.replace('#', ''));
    setMobileMenuOpen(false);
    smoothScrollTo(targetId, -80);
  };

  return (
    <div className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 sm:px-8 pt-4 sm:pt-6 pointer-events-none">
      <header
        className={`pointer-events-auto transition-all duration-500 w-full max-w-[1240px] rounded-full flex items-center justify-between px-3 sm:px-5 ${
          scrolled
            ? 'py-2 sm:py-2.5 bg-white/90 backdrop-blur-[24px] border border-[#171717]/10 shadow-[0_12px_36px_rgba(23,23,23,0.06)]'
            : 'py-3 sm:py-3.5 bg-white/75 backdrop-blur-[16px] border border-[#171717]/[0.08] shadow-[0_4px_20px_rgba(23,23,23,0.03)]'
        }`}
      >
        {/* Brand Left */}
        <a 
          href="#hero" 
          onClick={(e) => handleNavClick(e, '#hero')}
          className="flex items-center gap-2.5 pl-2 group cursor-pointer"
        >
          <div className="w-7 h-7 rounded-lg bg-[#171717] flex items-center justify-center text-[#C8E63A] transition-transform duration-300 group-hover:scale-105 shadow-xs">
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 stroke-current stroke-[2.2]" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12h3l3-7 4 14 3-7h3" />
            </svg>
          </div>
          <span className="font-semibold tracking-[-0.02em] text-base sm:text-lg text-[#171717]">
            Knull
          </span>
        </a>

        {/* Center Nav Links with Liquid Indicator */}
        <nav 
          onMouseLeave={() => setHoveredSection(null)}
          className="hidden md:flex items-center gap-0.5 font-medium text-xs sm:text-sm text-[#5F5D57] relative p-1 bg-[#F8F7F2]/60 rounded-full border border-[#E8E6DF]/50"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            const isHovered = hoveredSection === item.id;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, `#${item.id}`)}
                onMouseEnter={() => setHoveredSection(item.id)}
                className={`relative px-3.5 py-1.5 rounded-full transition-colors cursor-pointer select-none ${
                  isActive ? 'text-[#171717] font-semibold' : 'text-[#5F5D57] hover:text-[#171717]'
                }`}
              >
                {/* Active Section Background Pill */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-white rounded-full border border-[#DCDAD2] shadow-xs -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Hover Ghost Pill when not active */}
                {!isActive && isHovered && (
                  <motion.div
                    layoutId="hoverNavPill"
                    className="absolute inset-0 bg-[#171717]/[0.04] rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}

                <span className="relative z-10">{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Cmd + K Button */}
          <button
            onClick={onOpenCommandPalette}
            className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-[#5F5D57] hover:text-[#171717] bg-[#F1F0EA]/70 hover:bg-[#E6E4DC] border border-[#DCDAD2] px-2.5 py-1.5 rounded-full transition-all cursor-pointer hover:scale-105"
            title="Open Command Palette (Cmd + K)"
          >
            <Command className="w-3 h-3" />
            <span>K</span>
          </button>

          {/* Direct Workspace Launcher button */}
          <button
            onClick={() => onOpenWorkspace('northwind')}
            className="hidden md:flex items-center gap-1.5 text-xs font-medium text-[#171717] bg-white/70 hover:bg-[#F1F0EA] border border-[#DCDAD2] px-3.5 py-1.5 rounded-full transition-all cursor-pointer hover:shadow-xs"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>BNI</span>
          </button>

          {/* Primary CTA button with Accent */}
          <a
            href="#vision"
            onClick={(e) => handleNavClick(e, '#vision')}
            className="group inline-flex items-center gap-1.5 bg-[#C8E63A] text-[#171717] text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 rounded-full hover:bg-[#B8D62E] transition-all transform hover:-translate-y-0.5 shadow-xs cursor-pointer"
          >
            <span>Explore Knull</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#5F5D57] hover:text-[#171717] rounded-full cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto absolute top-20 inset-x-4 bg-white/95 backdrop-blur-xl rounded-2xl border border-[#DCDAD2] p-5 shadow-2xl flex flex-col gap-2 font-medium text-sm text-[#171717] md:hidden"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, `#${item.id}`)}
                className="p-2.5 hover:bg-[#F1F0EA] rounded-xl transition-colors cursor-pointer flex items-center justify-between"
              >
                <span>{item.label}</span>
                {activeSection === item.id && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8E63A]" />
                )}
              </a>
            ))}
            <div className="pt-3 border-t border-[#E8E6DF] flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenWorkspace('northwind');
                }}
                className="w-full text-left p-2.5 font-medium text-[#171717] hover:bg-[#F1F0EA] rounded-xl cursor-pointer flex items-center justify-between"
              >
                <span>Meet BNI</span>
                <LayoutGrid className="w-4 h-4 text-[#5F5D57]" />
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCommandPalette();
                }}
                className="w-full text-left p-2.5 text-xs font-mono text-[#5F5D57] hover:bg-[#F1F0EA] rounded-xl flex items-center justify-between cursor-pointer"
              >
                <span>Command Palette</span>
                <span>⌘K</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
