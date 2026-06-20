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
import LoyaltyProgram from './components/LoyaltyProgram';
import MenuSection from './components/MenuSection';
import ReservationSection from './components/ReservationSection';
import NotificationReceipt from './components/NotificationReceipt';
import Footer from './components/Footer';
import { Reservation } from './types';
import { Armchair, Coffee, HelpCircle, Star, Sparkles, ArrowLeftRight } from 'lucide-react';
import AdminDashboard from './components/AdminDashboard';
import { MENU_ITEMS } from './data/cafeData';

export default function App() {
  // View mode switcher state: 'customer' (default) or 'admin'
  const [viewMode, setViewMode] = useState<'customer' | 'admin'>('customer');

  // Staff Authentication States
  const [showStaffLoginModal, setShowStaffLoginModal] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);

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
    
    // Auto-create corresponding Order in localStorage so it reflects in the Staff Dashboard live
    if (reservation.preOrders && reservation.preOrders.length > 0) {
      const orderItems = reservation.preOrders.map(pre => {
        const menuItem = MENU_ITEMS.find(m => m.id === pre.menuItemId);
        return {
          name: menuItem ? menuItem.name : 'Unknown Item',
          quantity: pre.quantity,
          price: menuItem ? menuItem.price : 0
        };
      });

      const totalBill = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

      const newOrder: any = {
        id: `#O-${Math.floor(1000 + Math.random() * 9000)}`,
        customer_name: reservation.name,
        total_amount_inr: totalBill,
        items: orderItems,
        status: 'pending',
        created_at: new Date().toISOString()
      };

      try {
        const storedOrders = localStorage.getItem('cafe_orders_db');
        let currentOrders = [];
        if (storedOrders) {
          currentOrders = JSON.parse(storedOrders);
        }
        localStorage.setItem('cafe_orders_db', JSON.stringify([newOrder, ...currentOrders]));
      } catch (err) {
        console.error('Error auto-creating order slip:', err);
      }
    }
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

  if (viewMode === 'admin') {
    return <AdminDashboard onToggleView={() => setViewMode('customer')} />;
  }

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

        {/* LOYALTY PROGRAM (MEMBER POINTS & BENEFITS) */}
        <LoyaltyProgram />

      </main>

      {/* OUTLET CONTACTS & COMPREHENSIVE LINKS FOOTER */}
      <Footer onStaffPortalClick={() => { setShowStaffLoginModal(true); setPasscode(''); setPasscodeError(false); }} />

      {/* TRANSACTION OVERLAY MODAL */}
      {confirmedReservation && (
        <NotificationReceipt 
          reservation={confirmedReservation}
          onClose={handleCloseReceipt}
        />
      )}

      {/* SECURE STAFF PORTAL PASSCODE VERIFICATION MODAL */}
      {showStaffLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md" id="staff-pin-overlay">
          <div className="bg-white rounded-3xl border border-brand-border max-w-sm w-full p-6 md:p-8 shadow-2xl relative overflow-hidden" id="staff-pin-modal">
            {/* Decorative warm glow gradient */}
            <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#2A5C3D]/5 to-transparent -z-10"></div>
            
            <header className="text-center pb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#2A5C3D]/10 text-brand-accent flex items-center justify-center mx-auto mb-3">
                <Coffee className="w-6 h-6 animate-pulse" />
              </div>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#C87D43] font-bold">
                Staff Authentication
              </span>
              <h4 className="font-serif text-xl text-brand-text mt-1 font-bold">
                Lounge Controller Entry
              </h4>
              <p className="text-[11px] text-[#1F2421]/60 font-light mt-1">
                Enter your 4-digit staff PIN to access active order streams and table nests.
              </p>
            </header>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (passcode === '8844') {
                  setViewMode('admin');
                  setShowStaffLoginModal(false);
                } else {
                  setPasscodeError(true);
                }
              }}
              className="space-y-4"
              id="staff-pin-form"
            >
              <div>
                <label className="block text-[10px] font-mono text-brand-text/50 uppercase text-center mb-2">
                  Security Passcode PIN
                </label>
                <input
                  type="password"
                  maxLength={4}
                  placeholder="••••"
                  value={passcode}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, ''); // Numeric only
                    setPasscode(val);
                    setPasscodeError(false);
                  }}
                  className={`w-full tracking-widest text-center font-mono text-xl font-bold bg-[#FAF6F0] border ${
                    passcodeError ? 'border-red-500 text-red-700 ring-2 ring-red-100' : 'border-brand-border text-brand-text focus:border-brand-accent focus:ring-1 focus:ring-brand-accent'
                  } rounded-2xl py-3 px-4 focus:outline-none transition-all placeholder:text-[#1F2421]/20`}
                  id="staff-passcode-input"
                  autoFocus
                />
                
                {passcodeError && (
                  <p className="text-center text-red-600 text-[10px] font-mono font-semibold mt-2" id="staff-pin-error">
                    🚨 Invalid PIN! Please try again.
                  </p>
                )}
              </div>

              {/* Secure note */}
              <div className="bg-[#FAF6F0] border border-brand-border/60 rounded-xl p-3 text-[10px] text-brand-text/50 leading-relaxed font-mono flex items-start space-x-2">
                <span className="text-brand-accent">ℹ</span>
                <span>For evaluation & review, enter the Velvet staff credential code <strong className="text-brand-accent font-bold">8844</strong>.</span>
              </div>

              <div className="flex space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowStaffLoginModal(false)}
                  className="flex-1 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl font-sans font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                  id="cancel-staff-btn"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-brand-accent hover:bg-brand-accent-hover text-white rounded-xl font-sans font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer"
                  id="verify-staff-btn"
                >
                  Verify
                </button>
              </div>
            </form>
          </div>
        </div>
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
              aria-label={preOrdersCount > 0 ? `Book a Spot with ${preOrdersCount} pre-ordered item${preOrdersCount === 1 ? '' : 's'} in tray` : 'Book a Spot'}
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
