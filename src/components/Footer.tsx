/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MapPin, Phone, Mail, Clock, Instagram, Send, Star, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-bg border-t border-brand-border text-brand-text/70 font-sans" id="cafe-footer">
      
      {/* Top Map + Core Info Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Column 1: Brand & Operational Hours */}
          <div className="lg:col-span-4 space-y-6" id="footer-hours">
            <div>
              <h3 className="font-serif text-lg font-bold text-brand-text tracking-wide">The Velvet Roast</h3>
              <p className="font-mono text-[9px] uppercase tracking-widest text-brand-accent font-bold mt-1">
                Botanical Brew Lounge
              </p>
            </div>
            
            <p className="text-xs text-brand-text/70 leading-relaxed max-w-sm font-light">
              Crafting premium micro-lot botanical extractions and quiet remote-work spaces for independent minded creators, freelancers, and designers.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-3 text-xs">
                <Clock className="w-4 h-4 text-brand-accent shrink-0" />
                <div>
                  <p className="font-semibold text-brand-text">Open Everyday</p>
                  <p className="text-brand-text/50">08:00 AM – 10:00 PM</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-xs">
                <Phone className="w-4 h-4 text-brand-accent shrink-0" />
                <div>
                  <p className="font-semibold text-brand-text">Reservations Hotline</p>
                  <p className="text-brand-text/50">+1 (212) 555-0155</p>
                </div>
              </div>
            </div>

            {/* Social Channels */}
            <div className="flex items-center space-x-3 pt-4">
              <span className="font-mono text-[10px] uppercase tracking-wider text-brand-text/50 font-bold">Find Us:</span>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-brand-secondary border border-brand-border text-brand-text hover:text-brand-accent hover:border-brand-accent flex items-center justify-center transition-colors shadow-sm"
                id="footer-instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Structural Link columns */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-6" id="footer-directory">
            <div>
              <h4 className="font-mono text-[10px] uppercase font-bold text-brand-text tracking-widest mb-4">The Bistro</h4>
              <ul className="space-y-3 text-xs text-brand-text/60">
                <li><button onClick={() => document.getElementById('digital-menu')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-brand-accent transition-colors cursor-pointer text-left font-light">Digital Menu</button></li>
                <li><button onClick={() => document.getElementById('about-brand')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-brand-accent transition-colors cursor-pointer text-left font-light">Our Sourcing</button></li>
                <li><button onClick={() => document.getElementById('services-bar')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-brand-accent transition-colors cursor-pointer text-left font-light">Services & Wi-Fi</button></li>
                <li><button onClick={() => document.getElementById('community-ugc')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-brand-accent transition-colors cursor-pointer text-left font-light">Aesthetics</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-[10px] uppercase font-bold text-brand-text tracking-widest mb-4">Policy</h4>
              <ul className="space-y-3 text-xs text-brand-text/60">
                <li><a href="#" className="hover:text-brand-accent transition-colors font-light">Table Rules</a></li>
                <li><a href="#" className="hover:text-brand-accent transition-colors font-light">Seat Fair Use</a></li>
                <li><a href="#" className="hover:text-brand-accent transition-colors font-light">Guest FAQ</a></li>
                <li><a href="#" className="hover:text-brand-accent transition-colors font-light">Sitemap</a></li>
              </ul>
            </div>
          </div>

          {/* Column 3: Full Custom Google Maps IFrame Integration */}
          <div className="lg:col-span-5 space-y-4" id="footer-maps">
            <div className="flex items-center space-x-2.5">
              <MapPin className="w-4 h-4 text-brand-accent" />
              <h4 className="font-mono text-[10px] uppercase font-bold text-brand-text tracking-widest">
                Location: Greenwich Village, NYC
              </h4>
            </div>

            {/* Google map iframe wrapper with elegant border */}
            <div className="relative w-full h-[180px] bg-brand-secondary border border-brand-border rounded-2xl overflow-hidden shadow-inner grayscale contrast-110 brightness-95 hover:grayscale-0 transition-all duration-500">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.1818290356555!2d-74.00492852341495!3d40.7360251713898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259952c4840d1%3A0xe100c5017c1bf8cd!2sThe%20Velvet%20Roast%20Botanical%20Cafe!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer"
                title="The Velvet Roast Cafe Greenwich Village NYC Location"
                className="absolute inset-0"
              />
            </div>

            <p className="font-sans text-[11px] text-brand-text/50 leading-relaxed font-light">
              Find us at <span className="font-semibold text-brand-text/70">45 W 11th St, New York, NY 10011</span>. Subways: F, M, L to 14th St or West 4th St / Washington Square.
            </p>
          </div>

        </div>
      </div>

      {/* Extreme Bottom Bar */}
      <div className="bg-brand-secondary/40 border-t border-brand-border py-6" id="footer-legals">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-text/50">
          <div className="flex items-center space-x-2">
            <p>&copy; {currentYear} The Velvet Roast Botanical Cafe. All rights reserved.</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleScrollTop}
              className="text-[10px] font-mono uppercase tracking-wider text-brand-accent hover:underline cursor-pointer font-bold"
              id="back-to-top-btn"
            >
              Back To Top ▲
            </button>
          </div>
        </div>
      </div>

    </footer>
  );
}
