/**
 * NEXT.JS DASHBOARD LAYOUT COMPONENT REFERENCE FILE
 * Path in Next.js project: `components/DashboardLayout.tsx` or `app/dashboard/layout.tsx`
 * 
 * Implements a responsive velvet themed layout matching 'The Velvet Roast' brand palette:
 * - Soft off-white cream background
 * - Left side fixed navigation panel
 * - Highlighted links for "Orders" & "Reservations"
 */

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Coffee, 
  ShoppingBag, 
  Armchair, 
  Calendar, 
  Settings, 
  LogOut, 
  HelpCircle,
  Menu,
  X,
  Sparkles
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navItems = [
    {
      label: 'Orders Table',
      href: '/dashboard/orders',
      icon: ShoppingBag,
      id: 'sidebar-nav-orders'
    },
    {
      label: 'Reservations Nests',
      href: '/dashboard/reservations',
      icon: Armchair,
      id: 'sidebar-nav-reservations'
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#1F2421] font-sans flex flex-col md:flex-row">
      
      {/* 1. Mobile Friendly Header Bar */}
      <header className="md:hidden h-16 bg-white border-b border-black/5 px-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#2A5C3D] flex items-center justify-center text-white">
            <Coffee className="w-4.5 h-4.5" />
          </div>
          <div>
            <span className="font-serif text-sm font-bold text-[#1F2421]">The Velvet Roast</span>
            <span className="block font-mono text-[8px] uppercase font-semibold text-[#2A5C3D] tracking-wider">Staff Admin</span>
          </div>
        </div>

        <button 
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-1.5 hover:bg-[#FAF6F0] border rounded-lg text-stone-600 transition-colors"
          aria-label="Toggle Sidebar Navigation"
          id="mobile-sidebar-toggle"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* 2. Fixed Left Side Panel (Desktop only) */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-black/5 flex flex-col justify-between 
        transform md:translate-x-0 transition-transform duration-300 ease-in-out
        ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `} id="dashboard-sidebar-panel">
        
        {/* Top brand header */}
        <div className="p-6">
          <div className="flex items-center space-x-3.5 pb-6 border-b border-black/[0.04]">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#2A5C3D] to-[#2A5C3D]/80 flex items-center justify-center text-white">
              <Coffee className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-base tracking-wide text-[#1F2421] font-bold leading-none">
                The Velvet Roast
              </h2>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#2A5C3D] font-bold block mt-1">
                Lounge Controller
              </span>
            </div>
          </div>

          {/* Navigation Links for Orders & Reservations */}
          <nav className="mt-8 space-y-1.5" id="sidebar-navigation">
            <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#1F2421]/40 font-bold px-3 mb-2">
              Management Core
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`
                    w-full flex items-center space-x-3 px-3.5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all
                    ${isActive 
                      ? 'bg-[#2A5C3D]/10 text-[#2A5C3D] border-l-4 border-[#2A5C3D]' 
                      : 'text-[#1F2421]/70 hover:text-[#2A5C3D] hover:bg-[#FAF6F0]'
                    }
                  `}
                  id={item.id}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#2A5C3D]' : 'text-[#1F2421]/40'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer brand details */}
        <div className="p-6 border-t border-black/[0.04] bg-[#FAF6F0]/40 space-y-4">
          <div className="flex items-center space-x-2.5 text-[10px] font-mono text-stone-500">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <span>Staff Console Live</span>
          </div>
          
          <button 
            className="w-full flex items-center space-x-2.5 px-3 py-2 text-stone-500 hover:text-red-700 text-xs font-semibold rounded-lg hover:bg-red-50 transition-all cursor-pointer"
            id="sidebar-logout"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Portal</span>
          </button>
        </div>

      </aside>

      {/* 3. Main Content Stage */}
      <main className="flex-1 md:pl-64 flex flex-col min-h-screen relative" id="dashboard-main-area">
        {/* Subtle decorative amber light bubble */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#C87D43]/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
        
        <header className="hidden md:flex justify-between items-center h-20 px-8 bg-white/50 backdrop-blur-sm border-b border-black/[0.02]">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-wider text-stone-400">Security: Authenticated</p>
            <h3 className="font-serif text-lg font-bold text-[#1F2421] mt-0.5">Velvet Roast Hub</h3>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <span className="block text-xs font-bold text-[#1F2421]">Velvet Staff Admin</span>
              <span className="block text-[10px] font-mono text-[#2A5C3D]">Role: Principal Barista</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-[#FAF6F0] border border-black/5 flex items-center justify-center text-[#2A5C3D] font-mono font-bold text-xs uppercase shadow-inner">
              VS
            </div>
          </div>
        </header>

        {/* Dynamic Inner Content Area */}
        <div className="p-4 md:p-8 flex-1">
          {children}
        </div>
      </main>

    </div>
  );
}
