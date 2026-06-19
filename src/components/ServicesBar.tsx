/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CalendarCheck, Wifi, Leaf, ShieldAlert, Plug, MapPin } from 'lucide-react';

interface ServiceItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}

export default function ServicesBar() {
  const services: ServiceItem[] = [
    {
      icon: CalendarCheck,
      title: 'Seamless Pre-Booking',
      desc: 'Lock in your preferred seating zone & exact table instantly.'
    },
    {
      icon: Wifi,
      title: 'Free 150Mbps Wi-Fi',
      desc: 'Symmetric fiber connection optimized for remote work and study.'
    },
    {
      icon: Leaf,
      title: 'Dietary Inclusive',
      desc: 'A robust selection of gluten-free, vegan, and organic creations.'
    },
    {
      icon: Plug,
      title: 'Dedicated Power Outlets',
      desc: 'Uncapped charging docks built into every single table and counter.'
    },
    {
      icon: MapPin,
      title: 'Valet & Bike Ingress',
      desc: 'Secure bicycle stands and complimentary valet parking validation.'
    }
  ];

  return (
    <div className="bg-brand-secondary/50 border-y border-brand-border py-10 px-4 scroll-mt-24" id="services-bar">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div 
                key={idx} 
                className="flex flex-col items-center p-4 bg-brand-card rounded-xl border border-brand-border hover:border-brand-accent/30 hover:shadow-sm transition-all duration-300 md:col-span-1 col-span-2 last:col-span-2 md:last:col-span-1"
                id={`service-card-${idx}`}
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-sans font-semibold text-brand-text text-sm tracking-wide mb-1">
                  {srv.title}
                </h3>
                <p className="font-sans text-xs text-brand-text/70 leading-relaxed max-w-[180px]">
                  {srv.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
