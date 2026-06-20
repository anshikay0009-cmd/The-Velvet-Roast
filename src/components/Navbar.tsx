/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Coffee, Armchair, Menu, X } from 'lucide-react';

interface NavbarProps {
  preOrdersCount: number;
}

const navMenuItems = [
  { id: 'digital-menu', label: 'Menu' },
  { id: 'table-reservation', label: 'Seating Nests' },
  { id: 'about-brand', label: 'Our Story' },
  { id: 'velvet-sanctuary-gallery', label: 'Vibe Gallery' },
  { id: 'community-ugc', label: 'Community Feed' },
];

export default function Navbar({ preOrdersCount }: NavbarProps) {
  const [activeSection, setActiveSection] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileMenuOpen(false);
  };

  // Monitor scroll to highlight active section
  useEffect(() => {
    const handleScroll = () => {
      let currentSection = '';
      const scrollPosition = window.scrollY + 120; // offset for sticky header

      for (const item of navMenuItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.getBoundingClientRect().height;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentSection = item.id;
            break;
          }
        }
      }

      // Special fallback to highlight nothing if scrolled to top
      if (window.scrollY < 50) {
        currentSection = '';
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // run once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-brand-bg/95 backdrop-blur-md border-b border-brand-border transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Header Container (Target of original user focus) */}
        <div className="flex items-center justify-between h-20" id="navbar-main-container">
          
          {/* Left Corner: Brand Logo & Cafe Name */}
          <div 
            onClick={scrollToTop}
            className="flex items-center space-x-3 cursor-pointer select-none group shrink-0"
            id="brand-logo"
            title="Scroll to top"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-accent to-brand-accent/75 p-[1px] flex items-center justify-center group-hover:rotate-6 transition-transform">
              <div className="w-full h-full rounded-[11px] bg-brand-bg flex items-center justify-center text-brand-accent">
                <Coffee className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h1 className="font-serif text-base sm:text-lg tracking-wide text-brand-text font-semibold leading-none group-hover:text-brand-accent transition-colors">
                The Velvet Roast
              </h1>
              <span className="font-mono text-[9px] uppercase tracking-widest text-brand-accent font-bold block mt-1">
                Botanical Brew Lounge
              </span>
            </div>
          </div>

          {/* Center Column: Navigation links for desktop */}
          <nav className="hidden lg:flex items-center space-x-1 lg:space-x-3 mx-4" id="navbar-desktop-nav">
            {navMenuItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? 'text-brand-accent bg-brand-accent/10 font-bold border border-brand-accent/20 shadow-sm' 
                      : 'text-brand-text/75 hover:text-brand-accent hover:bg-brand-secondary/50 border border-transparent'
                  }`}
                  id={`nav-link-${item.id}`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right side helper CTAs (Tray indicator, booking CTA and mobile toggle button) */}
          <div className="flex items-center space-x-2 sm:space-x-4 shrink-0" id="navbar-right-actions">
            {preOrdersCount > 0 && (
              <button
                onClick={() => scrollToSection('digital-menu')}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-xs text-brand-accent font-mono tracking-wide animate-pulse hover:bg-brand-accent/20 transition-colors"
                id="navbar-tray-count-indicator"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
                </span>
                <span className="hidden sm:inline">Tray ({preOrdersCount})</span>
                <span className="sm:hidden">({preOrdersCount})</span>
              </button>
            )}

            <button 
              onClick={() => scrollToSection('table-reservation')}
              className="px-4 sm:px-5 py-2.5 rounded-full bg-brand-accent hover:bg-brand-accent-hover text-white font-sans font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-md shadow-brand-accent/10 hover:scale-105 hover:shadow-lg hover:shadow-brand-accent/25 active:scale-95 whitespace-nowrap"
              id="navbar-reserve-cta"
            >
              Book Table
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-brand-text/70 hover:text-brand-accent hover:bg-brand-secondary/60 lg:hidden transition-colors cursor-pointer"
              title="Toggle Navigation Menu"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-brand-border bg-brand-bg/95 backdrop-blur-lg py-4 px-4 shadow-xl flex flex-col space-y-2 animate-fade-in-down" id="navbar-mobile-nav">
          <p className="font-mono text-[8px] uppercase tracking-[0.35em] text-brand-accent/60 font-bold px-3 mb-1">
            — Browse Sections —
          </p>
          {navMenuItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive 
                    ? 'text-brand-accent bg-brand-accent/10 font-bold border-l-4 border-brand-accent' 
                    : 'text-brand-text/80 hover:text-brand-accent hover:bg-brand-secondary/40'
                }`}
                id={`mobile-nav-link-${item.id}`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
