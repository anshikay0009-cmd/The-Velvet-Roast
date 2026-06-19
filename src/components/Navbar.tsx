/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Coffee, Armchair } from 'lucide-react';

interface NavbarProps {
  preOrdersCount: number;
}

export default function Navbar({ preOrdersCount }: NavbarProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-brand-bg/95 backdrop-blur-md border-b border-brand-border transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left Corner: Brand Logo & Cafe Name */}
          <div 
            onClick={scrollToTop}
            className="flex items-center space-x-3 cursor-pointer select-none group"
            id="brand-logo"
            title="Scroll to top"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-accent to-brand-accent/75 p-[1px] flex items-center justify-center group-hover:rotate-6 transition-transform">
              <div className="w-full h-full rounded-[11px] bg-brand-bg flex items-center justify-center text-brand-accent">
                <Coffee className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h1 className="font-serif text-lg tracking-wide text-brand-text font-semibold leading-none group-hover:text-brand-accent transition-colors">
                The Velvet Roast
              </h1>
              <span className="font-mono text-[9px] uppercase tracking-widest text-brand-accent font-bold block mt-1">
                Botanical Brew Lounge
              </span>
            </div>
          </div>

          {/* Right side helper CTAs (Tray indicator and direct Book a Table CTA) */}
          <div className="flex items-center space-x-4">
            {preOrdersCount > 0 && (
              <button
                onClick={() => scrollToSection('digital-menu')}
                className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-xs text-brand-accent font-mono tracking-wide animate-pulse hover:bg-brand-accent/20 transition-colors"
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
              className="px-5 py-2.5 rounded-full bg-brand-accent hover:bg-brand-accent-hover text-white font-sans font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-md shadow-brand-accent/10 hover:scale-105 hover:shadow-lg hover:shadow-brand-accent/25 active:scale-95"
              id="navbar-reserve-cta"
            >
              Book a Table
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
