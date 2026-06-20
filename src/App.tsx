/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ServicesBar from './components/ServicesBar';
import AboutBrand from './components/AboutBrand';
import CircularGallery from './components/CircularGallery';
import SocialUGC from './components/SocialUGC';
import MenuSection from './components/MenuSection';
import ReservationSection from './components/ReservationSection';
import NotificationReceipt from './components/NotificationReceipt';
import Footer from './components/Footer';
import { Reservation } from './types';
import { Armchair, Coffee, HelpCircle, Star, Sparkles } from 'lucide-react';

export default function App() {
  // Pre-orders basket state
  const [preOrders, setPreOrders] = useState<{ [itemId: string]: number }>({});
  
  // Successful transaction record (triggers receipt overlay modal)
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  // Floating CTA visibility based on user scrolling past high threshold
  const [showFloatingCta, setShowFloatingCta] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show floating CTA once user scrolls past 400px of content
      if (window.scrollY > 400) {
        setShowFloatingCta(true);
      } else {
        setShowFloatingCta(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute total elements in the pre-order basket
  const preOrdersCount = useMemo(() => {
    const values = Object.values(preOrders) as number[];
    return values.reduce((accum, curr) => accum + curr, 0);
  }, [preOrders]);

  // Handlers
  const handleAddPreOrder = (itemId: string) => {
    setPreOrders(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const handleRemovePreOrder = (itemId: string) => {
    setPreOrders(prev => {
      const copy = { ...prev };
      if (copy[itemId] > 1) {
        copy[itemId] -= 1;
      } else {
        delete copy[itemId];
      }
      return copy;
    });
  };

  const handleClearPreOrders = () => {
    setPreOrders({});
  };

  const handleBookingSuccess = (reservation: Reservation) => {
    setConfirmedReservation(reservation);
  };

  const handleCloseReceipt = () => {
    setConfirmedReservation(null);
    setPreOrders({}); // Clear tray after checkout completes
    // Smooth scroll back to top of page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToBooking = () => {
    const el = document.getElementById('table-reservation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-brand-bg min-h-screen text-brand-text relative overflow-x-hidden">
      
      {/* Decorative top soft warm lights panel */}
      <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-brand-accent/5 via-transparent to-transparent pointer-events-none z-0"></div>

      {/* HEADER SECTION */}
      <Navbar preOrdersCount={preOrdersCount} />

      {/* BODY CONTENT SECTIONS */}
      <main className="relative z-10">
        
        {/* LANDING / HERO */}
        <HeroSection onReserveClick={handleScrollToBooking} />

        {/* CUSTOM SERVICES ICON BAR */}
        <ServicesBar />

        {/* GOURMET DIGITAL MENU SECTION */}
        <MenuSection 
          preOrders={preOrders}
          onAddPreOrder={handleAddPreOrder}
          onRemovePreOrder={handleRemovePreOrder}
          onClearPreOrders={handleClearPreOrders}
          onProceedToBooking={handleScrollToBooking}
        />

        {/* REPLICATED PHYSICAL SEATING SELECTION & CONTACT HUB */}
        <ReservationSection 
          preOrders={preOrders}
          onBookingSuccess={handleBookingSuccess}
        />

        {/* BRAND AMBIENCE & PHILOSOPHY CODES */}
        <AboutBrand />

        {/* INTERACTIVE SANCTUARY GALLERY */}
        <section className="bg-brand-bg py-24 border-b border-brand-border scroll-mt-24" id="velvet-sanctuary-gallery">
          <div className="max-w-7xl mx-auto px-4 md:px-8 text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <span className="h-[1px] w-6 bg-brand-accent/40"></span>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-brand-accent font-bold">
                Velvet Moods
              </span>
              <span className="h-[1px] w-6 bg-brand-accent/40"></span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-text mb-4">
              The Botanical Showcase
            </h2>
            <p className="font-sans text-brand-text/70 text-sm max-w-xl mx-auto font-light leading-relaxed">
              Experience the visual rhythms of our physical sanctuary. Grab, drag, and spin your mouse (or swipe your screen) to explore the curated vibes of The Velvet Roast.
            </p>
          </div>

          <div style={{ height: '520px', position: 'relative' }} className="w-full relative select-none">
            <CircularGallery
              bend={3}
              textColor="#ecebe4"
              borderRadius={0.06}
              scrollEase={0.03}
              scrollSpeed={2.5}
              fontUrl="https://fonts.googleapis.com/css2?family=Outfit:wght@600&display=swap"
              font="bold 20px Outfit"
              items={[
                { image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=600', text: 'Charcoal Latte' },
                { image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&q=80&w=600', text: 'Golden Espresso' },
                { image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=600', text: 'Cold Foam Brew' },
                { image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600', text: 'Pistachio Shakerato' },
                { image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=600', text: 'Frangipane Croissant' },
                { image: 'https://images.unsplash.com/photo-1485856407642-7f9ba0268b51?auto=format&fit=crop&q=80&w=600', text: 'Matcha Lava Cruffin' },
                { image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&q=80&w=600', text: 'Truffle Smashed Avocado' },
                { image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600', text: 'Harissa Garden Bowl' }
              ]}
            />
          </div>
        </section>

        {/* COMMUNITY INSTAGRAM UGC CARDS (SOCIAL PROOF) */}
        <SocialUGC />

      </main>

      {/* OUTLET CONTACTS & COMPREHENSIVE LINKS FOOTER */}
      <Footer />

      {/* TRANSACTION OVERLAY MODAL */}
      {confirmedReservation && (
        <NotificationReceipt 
          reservation={confirmedReservation}
          onClose={handleCloseReceipt}
        />
      )}

      {/* FLOATING VIEWPORT CTA: Persistent "Book a Table" anchor in the lower right bottom viewport */}
      <AnimatePresence>
        {showFloatingCta && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-6 right-6 z-40 group"
          >
            {/* Hidden dynamic tooltip displaying Proceed to Reservation on hover */}
            <div 
              className="absolute bottom-full right-4 mb-3 px-3.5 py-1.5 bg-stone-900 border border-stone-800 text-stone-200 text-[10px] font-mono uppercase tracking-widest rounded-lg shadow-xl opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 pointer-events-none whitespace-nowrap"
              id="floating-cta-tooltip"
            >
              Proceed to Reservation
              {/* Subtle visual caret */}
              <div className="absolute top-full right-8 -mt-1 w-2 h-2 bg-stone-900 border-r border-b border-stone-800 rotate-45"></div>
            </div>

            <button
              onClick={handleScrollToBooking}
              className="group/btn flex items-center space-x-2.5 px-5 py-3.5 bg-brand-accent text-white rounded-full font-sans font-bold text-xs uppercase tracking-wide hover:shadow-2xl hover:shadow-brand-accent/25 active:scale-95 transition-transform border border-brand-accent-hover select-none cursor-pointer"
              id="persistent-floating-cta"
              title="Book Your Selected Spots Instantly"
            >
              <Armchair className="w-4.5 h-4.5" />
              <span>Book a Spot</span>
              {preOrdersCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-white text-brand-accent flex items-center justify-center font-mono text-[10px] font-extrabold group-hover/btn:scale-105 transition-transform">
                  {preOrdersCount}
                </span>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
