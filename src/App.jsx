import React, { useState, useEffect } from 'react';
import { ToastProvider } from './context/ToastContext';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import ScrollController from './components/ScrollController';
import CommandPalette from './components/CommandPalette';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import BeforeMeeting from './components/BeforeMeeting';
import DuringMeeting from './components/DuringMeeting';
import AfterMeeting from './components/AfterMeeting';
import AIMemory from './components/AIMemory';
import FeaturesSection from './components/FeaturesSection';
import Integrations from './components/Integrations';
import UseCases from './components/UseCases';
import Testimonials from './components/Testimonials';
import Security from './components/Security';
import FinalCTA from './components/FinalCTA';
import Founder from './components/Founder';
import Footer from './components/Footer';
import { initLenis, smoothScrollTo } from './utils/scroll';

export default function App() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Initialize Lenis smooth inertia scrolling
  useEffect(() => {
    const scrollHandler = initLenis();
    return () => {
      scrollHandler?.destroy();
    };
  }, []);

  // The simulated meeting workspace was removed; "Research" entry points now lead to the AHI section
  const handleOpenWorkspace = () => smoothScrollTo('#memory', -80);

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#F8F7F2] text-[#171717] font-sans selection:bg-[#C8E63A] selection:text-[#171717] relative overflow-x-hidden">
        {/* Custom cursor on desktop */}
        <CustomCursor />

        {/* Top 2px scroll progress indicator */}
        <ScrollProgress />

        {/* Bidirectional scroll navigator (Up & Down) */}
        <ScrollController />

        {/* Command Palette (Cmd + K) */}
        <CommandPalette
          isOpen={commandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
          onOpenWorkspace={handleOpenWorkspace}
        />

        {/* Global Floating Pill Navbar */}
        <Navbar
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          onOpenWorkspace={handleOpenWorkspace}
        />

        {/* Smooth Landing Page Content Wrapper */}
        <div className="origin-top">
          {/* Main Editorial Product Journey */}
          <main>
            <Hero onOpenWorkspace={handleOpenWorkspace} />
            <SocialProof />
            <DuringMeeting />
            <BeforeMeeting />
            <AfterMeeting />
            <AIMemory />
            <FeaturesSection />
            <Integrations />
            <UseCases />
            <Testimonials />
            <Security />
            <FinalCTA onOpenWorkspace={handleOpenWorkspace} />
            <Founder />
          </main>

          {/* Dark Editorial Footer */}
          <Footer />
        </div>
      </div>
    </ToastProvider>
  );
}
