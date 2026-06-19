/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Flame, Star, Award } from 'lucide-react';

export default function AboutBrand() {
  return (
    <section className="bg-brand-bg py-20 px-4 md:px-8 border-b border-brand-border scroll-mt-24" id="about-brand">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Visual Heavyweight Panel */}
          <div className="lg:col-span-5 relative" id="about-visuals">
            <div className="absolute -inset-1 bg-gradient-to-tr from-brand-accent to-brand-secondary rounded-2xl blur opacity-25"></div>
            <div className="relative overflow-hidden rounded-2xl border border-brand-border">
              <img 
                src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=800" 
                alt="Slow roasting premium coffee beans" 
                referrerPolicy="no-referrer"
                className="w-full h-[450px] object-cover scale-100 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-brand-bg via-brand-bg/40 to-transparent p-6 flex flex-col justify-end">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-accent mb-1 font-bold">
                  Our Roastery
                </span>
                <p className="font-serif text-xl italic text-brand-text">
                  "Sourcing beans that speak of soil, shade, and sweat."
                </p>
              </div>
            </div>
            
            {/* Pop-out Badge */}
            <div className="absolute -bottom-6 -right-4 bg-brand-card border border-brand-border p-4 rounded-xl shadow-md flex items-center space-x-3 max-w-[200px]">
              <div className="p-2.5 rounded-lg bg-brand-accent/10 text-brand-accent">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="font-sans text-[11px] font-bold text-brand-text/50 uppercase tracking-wider font-mono">Direct Trade</p>
                <p className="font-serif text-sm font-semibold text-brand-text">100% Traceable</p>
              </div>
            </div>
          </div>

          {/* Copy Panel */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6" id="about-brand-copy">
            <div className="flex items-center space-x-2">
              <span className="h-[1px] w-8 bg-brand-accent/40"></span>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-brand-accent font-bold">
                The Philosophy
              </span>
            </div>
            
            <h2 className="font-serif text-4xl md:text-5xl text-brand-text leading-[1.1] tracking-tight">
              An Architectural Haven <br />
              <span className="text-brand-text/70 italic">For Botanical Sips & Calm Mind</span>
            </h2>

            <p className="font-sans text-brand-text/70 text-sm leading-relaxed max-w-2xl font-light">
              We operate at the intersection of specialty extraction and dynamic hospitality. Built for a generation that demands both aesthetic inspiration and hyper-connected utility, our space is continuously tuned for comfortable remote work, deep conversations, and visual tranquility.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="flex items-start space-x-3.5">
                <div className="p-2 bg-brand-secondary rounded-lg text-brand-accent mt-1">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-brand-text text-sm mb-1">Micro-Lot Roasting</h4>
                  <p className="font-sans text-brand-text/60 text-xs leading-relaxed font-light">
                    Small-batch profiles roasted in-house to capture natural tasting notes of raspberry, bergamot, and rich volcanic cocoa.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="p-2 bg-brand-secondary rounded-lg text-brand-accent mt-1">
                  <Star className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-brand-text text-sm mb-1">Pioneering Plant Arts</h4>
                  <p className="font-sans text-brand-text/60 text-xs leading-relaxed font-light">
                    From organic charcoal infusions to rosewater house distillates, our menu elevates daily botanicals into liquid art.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
