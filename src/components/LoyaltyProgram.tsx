/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Gift, Sparkles, Award, Coffee, Mail, Check, ArrowRight } from 'lucide-react';

export default function LoyaltyProgram() {
  const [email, setEmail] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsJoined(true);
      // Optional: store membership sign-up locally
      localStorage.setItem('velvet_roast_loyalty_member', email);
    }, 1000);
  };

  const loyaltyTiers = [
    {
      points: '10 Points',
      title: 'Per ₹100 Pre-Ordered',
      description: 'Earn rich points automatically on artisanal coffees, slow-bar sips, and freshly baked pastries pre-scheduled with your seat.'
    },
    {
      points: '150 Points',
      title: 'Welcome Bonus',
      description: 'Unlock 150 points instantly upon joining. Redeem on your very first visit for a complimentary single-origin espresso shot.'
    },
    {
      points: 'Exclusive Nests',
      title: 'Priority Allocations',
      description: 'Loyalty members get complimentary select booth upgrades and premium window-side botanical pods during peak hours.'
    }
  ];

  return (
    <section className="bg-brand-secondary/40 py-20 px-4 md:px-8 border-b border-brand-border scroll-mt-24" id="loyalty-program">
      <div className="max-w-7xl mx-auto">
        
        {/* Bento Grid layout representing header + subscription card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Informational Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-brand-accent/5 border border-brand-accent/15 px-3 py-1.5 rounded-full">
              <Award className="w-3.5 h-3.5 text-brand-accent" />
              <span className="font-mono text-[9px] text-brand-accent uppercase tracking-[0.2em] font-bold">
                The Velvet Circle
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-brand-text italic leading-tight">
              Sip. Earn. Rejoice. <br />
              <span className="text-brand-accent not-italic font-black text-2xl sm:text-3.5xl uppercase tracking-wide block mt-1">
                Our Pre-booking Rewards Program
              </span>
            </h2>

            <p className="font-sans text-brand-text/75 text-sm sm:text-base leading-relaxed max-w-2xl font-light">
              Make the most of your quiet workspace mornings or intimate sensory coffee experiences. By pre-ordering your sustainable single-origin pour-overs or flaky multi-layered pastries with your table reservation, you bypass lines, secure flawless service, and accrue reward points toward free micro-lots.
            </p>

            {/* Loyalty tier info grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
              {loyaltyTiers.map((tier, idx) => (
                <div 
                  key={idx} 
                  className="bg-brand-card border border-brand-border/60 rounded-2xl p-5 hover:border-brand-accent/30 hover:shadow-md transition-all duration-300 group cursor-default"
                >
                  <div className="font-mono text-xs font-bold text-brand-accent-warm uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>{tier.points}</span>
                    <Sparkles className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-brand-accent" />
                  </div>
                  <h4 className="font-sans text-xs font-bold text-brand-text mb-1">
                    {tier.title}
                  </h4>
                  <p className="font-sans text-[11px] text-brand-text/70 leading-relaxed font-light">
                    {tier.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Form Box (Bento Card Accent) */}
          <div className="lg:col-span-5 relative" id="loyalty-interactive-box">
            <div className="absolute -inset-1.5 bg-gradient-to-tr from-brand-accent-warm to-brand-accent rounded-3xl blur opacity-15"></div>
            <div className="relative bg-brand-card border border-brand-border rounded-3xl p-6 sm:p-8 shadow-xl">
              
              {!isJoined ? (
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-accent-warm/10 flex items-center justify-center text-brand-accent-warm">
                      <Gift className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-sans text-sm font-bold text-brand-text">Join The Velvet Circle</h3>
                      <p className="font-mono text-[9px] text-brand-accent font-semibold uppercase tracking-wider">Unlocks free reward points</p>
                    </div>
                  </div>

                  <p className="font-sans text-xs text-brand-text/70 leading-relaxed mb-6 font-light">
                    Become a member of our exclusive loyalty program to track coffee tokens, get complimentary seat selection, and receive member-only seasonal extraction invitations.
                  </p>

                  <form onSubmit={handleJoin} className="space-y-3">
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text/35" />
                      <input 
                        type="email" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@gmail.com" 
                        className="w-full pl-11 pr-4 py-3 bg-brand-secondary/30 rounded-full border border-brand-border text-xs focus:outline-none focus:border-brand-accent focus:bg-brand-card transition-all duration-300 placeholder:text-brand-text/30 text-brand-text text-semibold"
                        id="loyalty-email-input"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 rounded-full bg-brand-accent hover:bg-brand-accent-hover text-white font-sans font-semibold text-xs uppercase tracking-wider shadow-md hover:shadow-lg active:scale-98 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed group/join-btn"
                      id="loyalty-submit-btn"
                    >
                      {loading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <span>Join Now & claim 150pts</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-350 group-hover/join-btn:translate-x-1" />
                        </>
                      )}
                    </button>
                  </form>

                  <div className="mt-4 flex items-center justify-center space-x-1 text-[10px] text-brand-text/40 font-mono">
                    <Coffee className="w-3 h-3 text-brand-accent-warm" />
                    <span>No subscription fees. Unsubscribe anytime.</span>
                  </div>
                </div>
              ) : (
                <div className="py-6 text-center space-y-4 animate-in fade-in zoom-in duration-350">
                  <div className="w-16 h-16 rounded-full bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center mx-auto text-brand-accent shadow-inner">
                    <Check className="w-7 h-7 stroke-[2.5] animate-bounce" />
                  </div>
                  
                  <div className="space-y-2">
                    <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-brand-accent-warm font-bold">
                      Welcome to the Circle!
                    </span>
                    <h3 className="font-serif text-2xl italic text-brand-text">Joined Successfully</h3>
                    <p className="font-sans text-xs text-brand-text/75 leading-relaxed max-w-sm mx-auto font-light">
                      We have credited your account associated with <strong className="font-semibold text-brand-accent select-all">{email}</strong> with <strong className="font-semibold text-brand-accent">150 Instant Welcome Points</strong>.
                    </p>
                  </div>

                  <div className="bg-brand-secondary/40 border border-brand-border/70 rounded-2xl p-4 max-w-sm mx-auto text-left flex items-start space-x-3">
                    <Sparkles className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5 animate-pulse" />
                    <div>
                      <p className="font-sans text-[10px] uppercase font-bold text-brand-text leading-none mb-1">Your Token Status</p>
                      <p className="font-sans text-[11px] text-brand-text/70 leading-normal font-light">
                        Points balance is synchronized with this browser session. Book your seat below to double your extraction bonuses!
                      </p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
