/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ServicesBar from './components/ServicesBar';
import AboutBrand from './components/AboutBrand';
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
    <div className="bg-brand-bg min-h-screen text-brand-text relative">
      
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
      {showFloatingCta && (
        <div className="fixed bottom-6 right-6 z-40 animate-in fade-in slide-in-from-bottom-10 duration-500">
          <button
            onClick={handleScrollToBooking}
            className="group flex items-center space-x-2.5 px-5 py-3.5 bg-brand-accent text-white rounded-full font-sans font-bold text-xs uppercase tracking-wide hover:shadow-2xl hover:shadow-brand-accent/25 active:scale-95 transition-transform border border-brand-accent-hover select-none cursor-pointer"
            id="persistent-floating-cta"
            title="Book Your Selected Spots Instantly"
          >
            <Armchair className="w-4.5 h-4.5" />
            <span>Book a Spot</span>
            {preOrdersCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-white text-brand-accent flex items-center justify-center font-mono text-[10px] font-extrabold group-hover:scale-105 transition-transform">
                {preOrdersCount}
              </span>
            )}
          </button>
        </div>
      )}

    </div>
  );
}
