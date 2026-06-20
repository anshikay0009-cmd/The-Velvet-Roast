/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Armchair, ArrowDown, Leaf, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onReserveClick: () => void;
}

export default function HeroSection({ onReserveClick }: HeroSectionProps) {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative bg-stone-950 min-h-[90vh] flex flex-col justify-between py-16 px-4 overflow-hidden scroll-mt-24" id="hero-section">
      
      {/* Visual background image with soft dark-to-transparent gradient overlay */}
      <div className="absolute inset-0 z-0 bg-stone-950">
        <img 
          src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&q=80&w=1920" 
          alt="The Velvet Roast Atmospheric Cozy Botanical Garden Lounge Interior" 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-40 object-center scale-100 hover:scale-[1.03] transition-transform duration-[12000ms] ease-out"
        />
        {/* Layered cinematic dark-to-transparent gradients to guarantee perfect high-contrast legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-stone-950/30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/60 via-transparent to-stone-950/60"></div>
      </div>

      {/* Hero Structural Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center my-auto">
        
        {/* Aesthetic Slogan Tag */}
        <div 
          className="inline-flex items-center space-x-2 bg-brand-accent/20 backdrop-blur-md border border-brand-accent/30 px-4 py-2 rounded-full mb-6 cursor-pointer hover:border-brand-accent/50 transition-all hover:bg-brand-accent/35"
          onClick={onReserveClick}
          id="hero-tag-pill"
        >
          <Sparkles className="w-3.5 h-3.5 text-brand-accent-warm animate-pulse" />
          <span className="font-mono text-[10px] text-stone-200 uppercase tracking-[0.25em] font-semibold">
            Voted Seattle's Best Botanical Lounge 2026
          </span>
        </div>

        {/* Highly aesthetic headliner */}
        <h2 className="font-serif text-5xl sm:text-7xl text-white italic tracking-tight leading-[1.05] mb-6 animate-fade-in">
          Earthy Extraction. <br />
          <span className="text-stone-100 not-italic font-black text-4xl sm:text-6xl uppercase tracking-[0.05em] block mt-2 bg-gradient-to-r from-brand-accent-warm to-stone-200 bg-clip-text text-transparent">
            A Sun-Drenched Escape
          </span>
        </h2>

        {/* Short, high conversion value proposition */}
        <p className="font-sans text-stone-300 text-sm md:text-base max-w-2xl leading-relaxed mb-10 font-light">
          Step into a glass-framed garden sanctuary designed for high-fidelity comfort and artisanal slow-bar sips. We combine wild-foraged botanicals and sustainable shade-grown micro-lots with a cozy, vine-sheltered workspace. Reserve your exact table below.
        </p>

        {/* High impact CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in" id="hero-cta-buttons">
          <button
            onClick={onReserveClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-accent-warm hover:bg-brand-accent-warm-hover text-white font-sans font-bold text-xs uppercase tracking-wider hover:shadow-2xl hover:shadow-brand-accent-warm/40 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2 shadow-lg shadow-brand-accent-warm/15"
            id="hero-reserve-btn"
          >
            <Armchair className="w-4 h-4" />
            <span>Select Your Seating Nest</span>
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('digital-menu');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 border border-white/25 text-white hover:bg-white/20 hover:border-white/40 hover:scale-105 active:scale-95 text-xs font-sans font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer"
            id="hero-menu-btn"
          >
            Explore Botanical Menu
          </button>
        </div>

        {/* Floating properties indicators */}
        <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto mt-16 pt-8 border-t border-white/10 text-center text-stone-400 font-mono text-[10px] uppercase tracking-widest w-full">
          <div>
            <p className="text-stone-100 font-bold text-xs sm:text-sm font-sans">08:00 - 22:00</p>
            <p className="mt-1 text-[9px] text-stone-400 font-sans font-medium">Open Daily</p>
          </div>
          <div>
            <p className="text-stone-100 font-bold text-xs sm:text-sm font-sans">150MBPS FIBER</p>
            <p className="mt-1 text-[9px] text-stone-400 font-sans font-medium">Aesthetic WFH</p>
          </div>
          <div>
            <p className="text-stone-100 font-bold text-xs sm:text-sm font-sans">12 BOTANICAL BOOTHS</p>
            <p className="mt-1 text-[9px] text-stone-400 font-sans font-medium">Reserved Spaces</p>
          </div>
        </div>

      </div>

      {/* Decorative Chevron */}
      <div 
        className="relative z-10 mx-auto mt-4 text-white/50 hover:text-white cursor-pointer transition-colors animate-bounce"
        onClick={() => {
          const el = document.getElementById('digital-menu');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
        id="hero-scroll-indicator"
      >
        <ArrowDown className="w-5 h-5" />
      </div>

    </div>
  );
}
