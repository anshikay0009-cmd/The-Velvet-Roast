/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Armchair, Calendar, ArrowDown, Users, Flame } from 'lucide-react';

interface HeroSectionProps {
  onReserveClick: () => void;
}

export default function HeroSection({ onReserveClick }: HeroSectionProps) {
  return (
    <div className="relative bg-brand-bg min-h-[85vh] flex items-center justify-center py-24 px-4 overflow-hidden scroll-mt-24" id="hero-section">
      
      {/* Visual background image with cream premium glassmorphic treatment */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1920" 
          alt="The Velvet Roast Atmospheric Cafe Lounge" 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-15 object-center scale-100 hover:scale-102 transition-transform duration-10000 ease-out"
        />
        {/* Layered cinematic gradients to guarantee perfect high-contrast contrast text */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/75 to-brand-bg/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-bg/40 via-transparent to-brand-bg/40"></div>
      </div>

      {/* Hero Structural Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        
        {/* Aesthetic Slogan Tag */}
        <div 
          className="inline-flex items-center space-x-2 bg-brand-secondary/80 backdrop-blur-md border border-brand-border px-4 py-2 rounded-full mb-6 cursor-pointer hover:border-brand-accent/20 transition-all"
          onClick={onReserveClick}
          id="hero-tag-pill"
        >
          <Flame className="w-3.5 h-3.5 text-brand-accent animate-pulse" />
          <span className="font-mono text-[10px] text-brand-text/80 uppercase tracking-[0.25em] font-semibold">
            Voted Best Cozy Workspace 2026
          </span>
        </div>

        {/* Highly aesthetic headliner */}
        <h2 className="font-serif text-5xl sm:text-7xl text-brand-text italic tracking-tight leading-[1.05] mb-6">
          Brewing Moments. <br />
          <span className="text-brand-accent not-italic font-black text-4xl sm:text-6xl uppercase tracking-[0.05em]">
            Zero Friction Booking
          </span>
        </h2>

        {/* Short, high conversion value proposition */}
        <p className="font-sans text-brand-text/70 text-sm md:text-base max-w-2xl leading-relaxed mb-10 font-light">
          Welcome to a physical environment designed for high-resolution living. We combine direct-trade shade-grown botanical coffee extraction with a high-fidelity workspace. Reserve your exact favorite table to work, read, or sip in luxury.
        </p>

        {/* High impact CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4" id="hero-cta-buttons">
          <button
            onClick={onReserveClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-accent hover:bg-brand-accent-hover text-white font-sans font-bold text-xs uppercase tracking-wider hover:shadow-2xl hover:shadow-brand-accent/10 active:scale-98 transition-all cursor-pointer flex items-center justify-center space-x-2"
            id="hero-reserve-btn"
          >
            <Armchair className="w-4 h-4" />
            <span>Select Your Seating Spotlight</span>
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('digital-menu');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-secondary border border-brand-border text-brand-text hover:bg-brand-card font-sans font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer"
            id="hero-menu-btn"
          >
            Explore Digital Menu
          </button>
        </div>

        {/* Floating properties indicators */}
        <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto mt-16 pt-8 border-t border-brand-border text-center text-brand-text/50 font-mono text-[10px] uppercase tracking-widest">
          <div>
            <p className="text-brand-accent font-bold text-xs sm:text-sm">08:00 - 22:00</p>
            <p className="mt-1 text-[9px] text-brand-text/50">Open Daily</p>
          </div>
          <div>
            <p className="text-brand-accent font-bold text-xs sm:text-sm">150MBPS FIBER</p>
            <p className="mt-1 text-[9px] text-brand-text/50">Aesthetic WFH</p>
          </div>
          <div>
            <p className="text-brand-accent font-bold text-xs sm:text-sm">12 PREMIUM CODES</p>
            <p className="mt-1 text-[9px] text-brand-text/50">Reserved Tables</p>
          </div>
        </div>

      </div>

      {/* Decorative Chevron */}
      <div 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-brand-text/40 hover:text-brand-accent cursor-pointer transition-colors animate-bounce"
        onClick={() => {
          const el = document.getElementById('about-brand');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        id="hero-scroll-indicator"
      >
        <ArrowDown className="w-5 h-5" />
      </div>

    </div>
  );
}
