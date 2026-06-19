/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { Coffee, Menu, X, Armchair, ChevronUp, ChevronDown, Minimize2, Maximize2 } from 'lucide-react';

interface NavbarProps {
  preOrdersCount: number;
}

export default function Navbar({ preOrdersCount }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero-section');
  
  // Foldable header collapse states
  const [isFoldedManual, setIsFoldedManual] = useState(false);
  const [isHeaderVisibleOnScroll, setIsHeaderVisibleOnScroll] = useState(true);
  const lastScrollY = useRef(0);
  
  const isManualScrolling = useRef(false);
  const manualScrollTimeoutRef = useRef<number | null>(null);

  const navItems = [
    { id: 'hero-section', label: 'Home' },
    { id: 'services-bar', label: 'Amenities' },
    { id: 'digital-menu', label: 'Menu' },
    { id: 'table-reservation', label: 'Bookings' },
    { id: 'about-brand', label: 'Our Story' },
    { id: 'velvet-sanctuary-gallery', label: 'Gallery' },
    { id: 'community-ugc', label: 'Social Feed' },
  ];

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    setActiveSection(id);
    
    // Set manual scrolling mode to prevent scroll spy overrides during smoothing transitions
    if (manualScrollTimeoutRef.current) {
      window.clearTimeout(manualScrollTimeoutRef.current);
    }
    
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      isManualScrolling.current = true;
      manualScrollTimeoutRef.current = window.setTimeout(() => {
        isManualScrolling.current = false;
      }, 1000);
    }
  };

  // Monitor scroll positioning to update active navigation links in real-time
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Smart navbar hiding on scroll (auto-folding)
      if (currentScrollY > 120 && !isManualScrolling.current) {
        if (currentScrollY > lastScrollY.current + 8) {
          // Scrolling down -> Fold/Hide header
          setIsHeaderVisibleOnScroll(false);
        } else if (currentScrollY < lastScrollY.current - 12) {
          // Scrolling up -> Unfold/Show header
          setIsHeaderVisibleOnScroll(true);
        }
      } else if (currentScrollY < 60) {
        // Safe zone at the top
        setIsHeaderVisibleOnScroll(true);
      }
      
      lastScrollY.current = currentScrollY;

      if (isManualScrolling.current) return;

      const scrollPos = window.scrollY + 220; // stable offset for sticky header
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const isAtBottom = window.scrollY + clientHeight >= scrollHeight - 80;

      if (isAtBottom) {
        // Force highlight the bottom-most category when scrolled to the end (e.g., Social Feed)
        setActiveSection(navItems[navItems.length - 1].id);
        return;
      }

      let currentActive = 'hero-section';
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            currentActive = item.id;
          }
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // execute immediately
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (manualScrollTimeoutRef.current) {
        window.clearTimeout(manualScrollTimeoutRef.current);
      }
    };
  }, []);

  // Look up active section label
  const activeSectionLabel = navItems.find(item => item.id === activeSection)?.label || 'Home';

  return (
    <>
      {/* 1. DYNAMIC COMPACT FLOATING PILL (Activated when manually folded) */}
      <div 
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-brand-card/95 border border-brand-accent/30 rounded-full shadow-2xl backdrop-blur-xl px-5 py-2.5 flex items-center space-x-4 cursor-pointer hover:border-brand-accent hover:shadow-brand-accent/20 transition-all duration-500 hover:scale-102 group select-none ${
          isFoldedManual 
            ? 'opacity-100 translate-y-0 pointer-events-auto visible scale-100' 
            : 'opacity-0 -translate-y-12 pointer-events-none invisible scale-95'
        }`}
        onClick={() => setIsFoldedManual(false)}
        title="Click to unfold full navigation menu"
        id="navbar-folded-pill"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-accent to-brand-accent/80 p-[1px] flex items-center justify-center text-white group-hover:rotate-12 transition-transform duration-300">
          <div className="w-full h-full rounded-full bg-brand-bg flex items-center justify-center text-brand-accent text-xs">
            <Coffee className="w-3.5 h-3.5 animate-pulse" />
          </div>
        </div>
        <div className="flex flex-col items-start leading-none pr-1">
          <p className="font-serif text-[11px] text-brand-text font-bold tracking-wider uppercase">The Velvet Roast</p>
          <p className="font-mono text-[9px] text-brand-accent/90 tracking-widest uppercase mt-0.5">
            {activeSectionLabel} <span className="text-brand-text/50 font-normal">• Tap to Expand</span>
          </p>
        </div>
        <div className="w-6 h-6 rounded-full bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all duration-300">
          <Maximize2 className="w-3 h-3" />
        </div>
      </div>

      {/* 2. MINI SMART TAB (When auto-hidden by scroll, but not manually folded) */}
      <div 
        className={`fixed top-0 left-1/2 -translate-x-1/2 z-50 bg-brand-card border-b border-x border-brand-border/80 rounded-b-xl shadow-lg px-4.5 py-1.5 flex items-center space-x-2.5 cursor-pointer hover:border-brand-accent/50 transition-all duration-300 ${
          (!isHeaderVisibleOnScroll && !isFoldedManual) 
            ? 'translate-y-0 opacity-100 pointer-events-auto visible' 
            : '-translate-y-full opacity-0 pointer-events-none invisible'
        }`}
        onClick={() => setIsHeaderVisibleOnScroll(true)}
        title="Tap to reveal sticky header menu"
        id="navbar-scrolled-tab"
      >
        <Coffee className="w-3.5 h-3.5 text-brand-accent animate-pulse" />
        <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-brand-text/60 font-semibold">
          Header Folded
        </span>
        <ChevronDown className="w-3 h-3 text-brand-accent" />
      </div>

      {/* 3. CORE INTEGRATED NAVIGATION BAR */}
      <nav 
        className={`sticky top-0 z-40 bg-brand-bg/95 backdrop-blur-md border-b border-brand-border transition-all duration-500 ease-in-out ${
          isFoldedManual 
            ? 'pointer-events-none opacity-0 -translate-y-24 absolute' 
            : !isHeaderVisibleOnScroll 
              ? '-translate-y-full shadow-none border-b-transparent absolute' 
              : 'translate-y-0 opacity-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Brand Logo & Slogan */}
            <div 
              onClick={() => scrollToSection('hero-section')}
              className="flex items-center space-x-2.5 cursor-pointer select-none group z-50"
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
   
            {/* Desktop Nav Actions: White Background capsule for navigation tags when clicked/active */}
            <div className="hidden lg:flex items-center space-x-1.5 text-[10px] font-mono uppercase tracking-wider text-brand-text/70" id="desktop-links">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button 
                    key={item.id}
                    onClick={() => scrollToSection(item.id)} 
                    className={`relative px-4 py-2 rounded-full cursor-pointer transition-all duration-300 hover:scale-102 active:scale-95 group font-semibold ${
                      isActive 
                        ? 'text-brand-accent bg-brand-card border border-brand-accent/25 shadow-sm' 
                        : 'hover:text-brand-accent hover:bg-brand-card/45 border border-transparent text-brand-text/75'
                    }`}
                    id={`nav-${item.id}-btn`}
                  >
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
   
            {/* Secondary CTA Panel */}
            <div className="hidden sm:flex items-center space-x-4">
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

              {/* Explicit manual fold trigger inside desktop navbar */}
              <button
                onClick={() => setIsFoldedManual(true)}
                className="p-2.5 rounded-full bg-brand-card hover:bg-brand-secondary border border-brand-border hover:border-brand-accent/30 text-brand-text/50 hover:text-brand-accent hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                title="Fold Menu / Collapse Navbar"
                aria-label="Fold Header Menu"
              >
                <Minimize2 className="w-3.5 h-3.5" />
              </button>
            </div>
  
            {/* Mobile hamburger navigation panel toggle */}
            <div className="flex items-center space-x-2 lg:hidden z-50">
              {preOrdersCount > 0 && (
                <button
                  onClick={() => scrollToSection('digital-menu')}
                  className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-[10px] text-brand-accent font-mono tracking-wide hover:bg-brand-accent/20 transition-colors mr-1"
                >
                  <span>({preOrdersCount})</span>
                </button>
              )}
              
              {/* Manual fold trigger for mobile view */}
              <button
                onClick={() => setIsFoldedManual(true)}
                className="p-2 w-10 h-10 rounded-full bg-brand-card border border-brand-border text-brand-text/50 hover:text-brand-accent flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300 mr-1"
                title="Fold Header"
              >
                <Minimize2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 w-10 h-10 rounded-full bg-brand-card border border-brand-border text-brand-text flex items-center justify-center hover:text-brand-accent hover:border-brand-accent/30 hover:scale-105 active:scale-95 transition-all duration-300"
                aria-label="Toggle navigation menu"
              >
                {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
  
          </div>
        </div>
  
        {/* Slide-out Overlay Drawer for Mobile Navigation: White active states matching branding */}
        <div 
          className={`fixed inset-0 top-[81px] bg-brand-bg/98 backdrop-blur-xl z-40 transition-all duration-500 lg:hidden border-t border-brand-border flex flex-col justify-between py-12 px-6 ${
            isOpen ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-full pointer-events-none'
          }`}
        >
          <div className="flex flex-col space-y-4 text-center mt-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-brand-accent/60 font-semibold mb-2">
              — Browse Rooms —
            </p>
            {navItems.map((item, idx) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full max-w-xs mx-auto font-serif text-lg tracking-wide py-2.5 px-6 rounded-xl transition-all duration-300 active:scale-95 ${
                    isActive 
                      ? 'text-brand-accent bg-brand-card border border-brand-accent/20 shadow-md font-bold scale-102' 
                      : 'text-brand-text/80 hover:text-brand-accent hover:bg-brand-card/40'
                  }`}
                  style={{ transitionDelay: `${idx * 40}ms` }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
  
          <div className="flex flex-col items-center space-y-6 pb-8">
            <div className="h-[1px] w-24 bg-brand-border"></div>
            <button
              onClick={() => scrollToSection('table-reservation')}
              className="w-full max-w-xs px-8 py-4 rounded-full bg-brand-accent hover:bg-brand-accent-hover text-white font-sans font-bold text-xs uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-brand-accent/20 flex items-center justify-center space-x-2"
            >
              <Armchair className="w-4 h-4" />
              <span>Book a Premium Table</span>
            </button>
            <p className="font-mono text-[10px] text-brand-text/40 tracking-wider">
              1048 Velvet Blvd • Seattle, WA
            </p>
          </div>
        </div>
      </nav>
    </>
  );
}
