import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, FileText, Sparkles, CheckSquare, CornerDownLeft, X } from 'lucide-react';
import { smoothScrollTo, getLenis } from '../utils/scroll';

export default function CommandPalette({ isOpen, onOpen, onClose, onOpenWorkspace }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const items = [
    { id: 'nav-problem', title: 'The Problem: why we\'re building Knull', category: 'Section', icon: FileText, action: () => smoothScrollTo('#problem', -80) },
    { id: 'nav-vision', title: 'The Vision: our own architecture', category: 'Section', icon: FileText, action: () => smoothScrollTo('#vision', -80) },
    { id: 'nav-ahi', title: 'Bio-Neural Interface (BNI): evidence-driven investigation', category: 'Product', icon: Sparkles, action: () => onOpenWorkspace() },
    { id: 'nav-pillars', title: 'The four pillars', category: 'Section', icon: CheckSquare, action: () => smoothScrollTo('#individuals', -80) },
    { id: 'nav-architecture', title: 'Research architecture', category: 'Research', icon: Search, action: () => smoothScrollTo('#ecosystem', -80) },
    { id: 'nav-perspectives', title: 'Research perspectives', category: 'Research', icon: Search, action: () => smoothScrollTo('#people', -80) },
    { id: 'nav-founder', title: 'Founder', category: 'Company', icon: Calendar, action: () => smoothScrollTo('#founder', -80) },
  ];

  // Lenis must be running again before an item's smooth scroll starts
  const selectItem = (item) => {
    getLenis()?.start();
    item.action();
    onClose();
  };

  // Pause page smooth-scroll while the palette is open so the background stays put
  useEffect(() => {
    if (!isOpen) return;
    const lenis = getLenis();
    lenis?.stop();
    return () => lenis?.start();
  }, [isOpen]);

  const filtered = items.filter(i => 
    i.title.toLowerCase().includes(query.toLowerCase()) || 
    i.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onOpen();
      }
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + (filtered.length || 1)) % (filtered.length || 1));
      } else if (e.key === 'Enter' && filtered[selectedIndex]) {
        e.preventDefault();
        selectItem(filtered[selectedIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onOpen, onClose, selectItem]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9990] flex items-start justify-center pt-20 sm:pt-28 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/45 backdrop-blur-md"
          />

          {/* Palette Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-xl bg-[#171717] rounded-2xl border border-[#27272A] shadow-2xl overflow-hidden z-10 flex flex-col font-sans"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#27272A] bg-[#121215]">
              <Search className="w-4 h-4 text-[#71717A] shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                autoFocus
                placeholder="Jump to a section, pillar or research area..."
                className="w-full bg-transparent text-sm text-[#F8F7F2] placeholder-[#71717A] focus:outline-none"
              />
              <span className="hidden sm:inline-block font-mono text-[10px] uppercase text-[#71717A] bg-[#1F1F22] px-2 py-0.5 rounded border border-[#27272A]">
                ESC to close
              </span>
              <button onClick={onClose} className="text-[#71717A] hover:text-[#F8F7F2] p-1 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results List */}
            <div data-lenis-prevent className="max-h-80 overflow-y-auto overscroll-contain p-2 space-y-1">
              {filtered.length === 0 ? (
                <div className="p-8 text-center text-xs text-[#71717A]">
                  No matching sections found for "{query}".
                </div>
              ) : (
                filtered.map((item, idx) => {
                  const Icon = item.icon;
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => selectItem(item)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer text-xs transition-colors ${
                        isSelected ? 'bg-[#121215] text-[#F8F7F2] shadow-xs border border-[#27272A]' : 'text-[#A1A1AA] hover:bg-[#121215]/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${isSelected ? 'bg-[#C8E63A] text-[#171717]' : 'bg-[#1F1F22] text-[#5F5D57]'}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-medium text-[#F8F7F2]">{item.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-[#71717A]">{item.category}</span>
                        {isSelected && <CornerDownLeft className="w-3 h-3 text-[#F8F7F2]" />}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 bg-[#1F1F22] border-t border-[#27272A] flex items-center justify-between text-[11px] text-[#71717A] font-mono">
              <div className="flex items-center gap-3">
                <span>&uarr;&darr; Navigate</span>
                <span>&crarr; Select</span>
              </div>
              <span className="flex items-center gap-1.5 text-[#F8F7F2]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8E63A]" />
                Knull Research
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
