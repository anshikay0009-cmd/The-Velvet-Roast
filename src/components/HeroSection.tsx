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
    <div className="relative bg-stone-950 min-h-[85vh] flex items-center justify-center py-24 px-4 overflow-hidden scroll-mt-24" id="hero-section">
      
      {/* Visual background image with soft dark-to-transparent gradient overlay */}
      <div className="absolute inset-0 z-0 bg-stone-950">
        <img 
          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=1920" 
          alt="The Velvet Roast Atmospheric Cozy Lounge Interior" 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-35 object-center scale-100 hover:scale-[1.03] transition-transform duration-[12000ms] ease-out"
        />
        {/* Layered cinematic dark-to-transparent gradients to guarantee perfect high-contrast legibility */}
        <div className="absolute inset-0 bg-stone-950/70"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/85 to-stone-950/30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/70 via-transparent to-stone-950/70"></div>
      </div>

      {/* Hero Structural Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        
        {/* Aesthetic Slogan Tag */}
        <div 
          className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-6 cursor-pointer hover:border-white/40 transition-all hover:bg-white/15"
          onClick={onReserveClick}
          id="hero-tag-pill"
        >
          <Flame className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
          <span className="font-mono text-[10px] text-stone-200 uppercase tracking-[0.25em] font-semibold">
            Voted Best Cozy Workspace 2026
          </span>
        </div>

        {/* Highly aesthetic headliner */}
        <h2 className="font-serif text-5xl sm:text-7xl text-white italic tracking-tight leading-[1.05] mb-6">
          Brewing Moments. <br />
          <span className="text-stone-300 not-italic font-black text-4xl sm:text-6xl uppercase tracking-[0.05em] block mt-2 bg-gradient-to-r from-stone-100 to-stone-350 bg-clip-text text-transparent">
            Zero Friction Booking
          </span>
        </h2>

        {/* Short, high conversion value proposition */}
        <p className="font-sans text-stone-300 text-sm md:text-base max-w-2xl leading-relaxed mb-10 font-light font-sans">
          Welcome to a physical environment designed for high-resolution living. We combine direct-trade shade-grown botanical coffee extraction with a high-fidelity workspace. Reserve your exact favorite table to work, read, or sip in luxury.
        </p>

        {/* High impact CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4" id="hero-cta-buttons">
          <button
            onClick={onReserveClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-accent hover:bg-brand-accent-hover text-white font-sans font-bold text-xs uppercase tracking-wider hover:shadow-2xl hover:shadow-brand-accent/40 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2 shadow-lg shadow-brand-accent/15"
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
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 border border-white/25 text-white hover:bg-white/20 hover:border-white/40 hover:scale-105 active:scale-95 text-xs font-sans font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer"
            id="hero-menu-btn"
          >
            Explore Digital Menu
          </button>
        </div>

        {/* Floating properties indicators */}
        <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto mt-16 pt-8 border-t border-white/10 text-center text-stone-400 font-mono text-[10px] uppercase tracking-widest">
          <div>
            <p className="text-stone-100 font-bold text-xs sm:text-sm font-sans">08:00 - 22:00</p>
            <p className="mt-1 text-[9px] text-stone-400 font-sans">Open Daily</p>
          </div>
          <div>
            <p className="text-stone-100 font-bold text-xs sm:text-sm font-sans">150MBPS FIBER</p>
            <p className="mt-1 text-[9px] text-stone-400 font-sans">Aesthetic WFH</p>
          </div>
          <div>
            <p className="text-stone-100 font-bold text-xs sm:text-sm font-sans">12 PREMIUM CODES</p>
            <p className="mt-1 text-[9px] text-stone-400 font-sans">Reserved Tables</p>
          </div>
        </div>

      </div>

      {/* Decorative Chevron */}
      <div 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 hover:text-white cursor-pointer transition-colors animate-bounce"
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
