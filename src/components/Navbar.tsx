/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Armchair, Coffee, ShieldCheck, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  preOrdersCount: number;
}

export default function Navbar({ preOrdersCount }: NavbarProps) {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="sticky top-0 z-40 bg-brand-bg/85 backdrop-blur-md border-b border-brand-border transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Slogan */}
          <div 
            onClick={() => scrollToSection('hero-section')}
            className="flex items-center space-x-2.5 cursor-pointer select-none group"
            id="brand-logo"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-accent to-brand-accent/75 p-[1px] flex items-center justify-center group-hover:rotate-6 transition-transform">
              <div className="w-full h-full rounded-[11px] bg-brand-bg flex items-center justify-center text-brand-accent">
                <Coffee className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h1 className="font-serif text-lg tracking-wide text-brand-text font-semibold leading-none">
                The Velvet Roast
              </h1>
              <span className="font-mono text-[9px] uppercase tracking-widest text-brand-accent font-bold block mt-1">
                Botanical Brew Lounge
              </span>
            </div>
          </div>

          {/* Desktop Nav Actions */}
          <div className="hidden md:flex items-center space-x-8 text-xs font-mono uppercase tracking-wider text-brand-text/70" id="desktop-links">
            <button 
              onClick={() => scrollToSection('about-brand')} 
              className="hover:text-brand-accent transition-colors cursor-pointer"
              id="nav-about-btn"
            >
              The Vibe
            </button>
            <button 
              onClick={() => scrollToSection('digital-menu')} 
              className="hover:text-brand-accent transition-colors cursor-pointer"
              id="nav-menu-btn"
            >
              Digital Menu
            </button>
            <button 
              onClick={() => scrollToSection('community-ugc')} 
              className="hover:text-brand-accent transition-colors cursor-pointer"
              id="nav-ugc-btn"
            >
              Social Proof
            </button>
            <button 
              onClick={() => scrollToSection('services-bar')} 
              className="hover:text-brand-accent transition-colors cursor-pointer"
              id="nav-services-btn"
            >
              Remote Work
            </button>
          </div>

          {/* Secondary CTA Panel */}
          <div className="flex items-center space-x-4">
            
            {preOrdersCount > 0 && (
              <button
                onClick={() => scrollToSection('digital-menu')}
                className="hidden sm:inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-xs text-brand-accent font-mono tracking-wide animation-pulse"
                id="navbar-tray-count-indicator"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
                </span>
                <span>Tray ({preOrdersCount})</span>
              </button>
            )}

            <button 
              onClick={() => scrollToSection('table-reservation')}
              className="px-5 py-2.5 rounded-full bg-brand-accent hover:bg-brand-accent-hover text-white font-sans font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-brand-accent/10"
              id="navbar-reserve-cta"
            >
              Book a Table
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}
