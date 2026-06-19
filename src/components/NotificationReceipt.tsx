/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMemo } from 'react';
import { Reservation } from '../types';
import { MENU_ITEMS } from '../data/cafeData';
import { Check, Calendar, Phone, Mail, ShoppingBag, MapPin, ExternalLink, X, Download, Share2 } from 'lucide-react';

interface NotificationReceiptProps {
  reservation: Reservation;
  onClose: () => void;
}

export default function NotificationReceipt({
  reservation,
  onClose
}: NotificationReceiptProps) {
  
  // Find menu items names pre-ordered
  const preOrderDetails = useMemo(() => {
    return reservation.preOrders.map(pre => {
      const item = MENU_ITEMS.find(m => m.id === pre.menuItemId);
      return {
        name: item ? item.name : 'Unknown Dish',
        qty: pre.quantity,
        price: item ? item.price : 0
      };
    });
  }, [reservation]);

  // Compute preorders total cost
  const preOrderTotal = useMemo(() => {
    return preOrderDetails.reduce((accum, curr) => accum + (curr.price * curr.qty), 0);
  }, [preOrderDetails]);

  // Construct Google Calendar Link
  const googleCalendarUrl = useMemo(() => {
    const formattedDate = reservation.date.replace(/-/g, '');
    const startHourStr = reservation.time.replace(':', '');
    
    // Estimate a 1.5 hr length
    const startHourInt = parseInt(reservation.time.split(':')[0], 10);
    const startMinInt = parseInt(reservation.time.split(':')[1], 10);
    let endHourInt = startHourInt + 1;
    let endMinInt = startMinInt + 30;
    if (endMinInt >= 60) {
      endMinInt -= 60;
      endHourInt += 1;
    }
    const padStr = (num: number) => num.toString().padStart(2, '0');
    const endHourStr = `${padStr(endHourInt)}${padStr(endMinInt)}`;
    
    const title = encodeURIComponent('VIP Seating: Cafe Pre-Booking');
    const dates = `${formattedDate}T${startHourStr}00/${formattedDate}T${endHourStr}00`;
    const details = encodeURIComponent(
      `Table Reservation Receipt.\n\nGuest Name: ${reservation.name}\nTable ID: ${reservation.tableId} (${reservation.seatingPreference.toUpperCase()} Zone)\nParty Size: ${reservation.guests} Guests\n\nEnjoy your gourmet pastries & specialty brews!`
    );
    const location = encodeURIComponent('The Velvet Roast Bistro & Gardens, NYC');

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  }, [reservation]);

  // Download standard .ics Calendar File
  const handleDownloadICS = () => {
    const formattedDate = reservation.date.replace(/-/g, '');
    const startHourStr = reservation.time.replace(':', '');
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `DTSTART:${formattedDate}T${startHourStr}00`,
      `DTEND:${formattedDate}T${parseInt(startHourStr, 15) ? parseInt(startHourStr, 15)+130 : '1430'}00`,
      'SUMMARY:Table Booking at The Velvet Roast',
      `DESCRIPTION:Reservation Code: ${reservation.id}\\nGuest: ${reservation.name}\\nTable: ${reservation.tableId}\\nZone: ${reservation.seatingPreference}`,
      'LOCATION:The Velvet Roast Bistro & Gardens\\, NYC',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `velvet-roast-booking-${reservation.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // WhatsApp simulation text link
  const whatsAppUrl = useMemo(() => {
    const text = `Hey, my table reservation at The Velvet Roast is confirmed! 🥐✨\nBooking code: ${reservation.id}\nDate: ${reservation.date} at ${reservation.time}\nTable: ${reservation.tableId} (${reservation.seatingPreference} zone)`;
    return `https://api.whatsapp.com/send?phone=${encodeURIComponent(reservation.phone)}&text=${encodeURIComponent(text)}`;
  }, [reservation]);

  // Email simulation template (mailto)
  const mailToUrl = useMemo(() => {
    const subject = encodeURIComponent(`The Velvet Roast Booking Confirmation: #${reservation.id}`);
    const body = encodeURIComponent(
      `Hello ${reservation.name},\n\nYour premium table pre-booking is officially locked!\n\nReservation Reference: #${reservation.id}\nDate: ${reservation.date}\nTime: ${reservation.time}\nGuests: ${reservation.guests} pax\nSeating Spot: Table ${reservation.tableId} (${reservation.seatingPreference} Choice)\n\nWe look forward to serving you.\n\nThe Velvet Roast Botanical Team`
    );
    return `mailto:${reservation.email}?subject=${subject}&body=${body}`;
  }, [reservation]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1c1917]/80 backdrop-blur-md" id="receipt-modal">
      <div className="relative w-full max-w-lg bg-brand-card border border-brand-border rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-350" id="receipt-modal-card">
        
        {/* Modal Close Flag */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-brand-secondary border border-brand-border text-brand-text/60 hover:text-brand-text transition-colors cursor-pointer"
          id="receipt-close-x-btn"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal content body */}
        <div className="p-6 md:p-8 overflow-y-auto max-h-[85vh] scrollbar-none">
          
          {/* Animated celebration top section */}
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent flex items-center justify-center mx-auto mb-4 animate-bounce">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <h3 className="font-serif text-2xl text-brand-text">Booking Fully Locked!</h3>
            <p className="font-sans text-brand-text/70 text-xs mt-1">
              Your table and pre-order are guaranteed under code <span className="font-mono text-brand-accent font-bold">#{reservation.id}</span>.
            </p>
          </div>

          {/* Elegant Ticket card design */}
          <div className="bg-brand-secondary border border-brand-border rounded-2xl relative" id="ticket-body">
            
            {/* Visual half circles representing ticket perforations (Left/Right) */}
            <div className="absolute top-1/2 -left-3.5 -translate-y-1/2 w-6 h-6 rounded-full bg-brand-card border border-brand-border border-r-transparent hidden sm:block"></div>
            <div className="absolute top-1/2 -right-3.5 -translate-y-1/2 w-6 h-6 rounded-full bg-brand-card border border-brand-border border-l-transparent hidden sm:block"></div>

            {/* Ticket Header Details */}
            <div className="p-5 border-b border-brand-border border-dashed">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-wider text-brand-text/50 font-bold">Selected Zone</p>
                  <p className="font-sans font-bold text-xs text-brand-accent capitalize">{reservation.seatingPreference} Seating</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-[9px] uppercase tracking-wider text-brand-text/50 font-bold">Reserved Table</p>
                  <p className="font-sans font-extrabold text-xs text-brand-text">{reservation.tableId}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-brand-border">
                <div>
                  <p className="font-mono text-[9px] uppercase text-brand-text/50 font-bold">Date</p>
                  <p className="font-sans font-semibold text-xs text-brand-text">{reservation.date}</p>
                </div>
                <div>
                  <p className="font-mono text-[9px] uppercase text-brand-text/50 font-bold">Arrival Time</p>
                  <p className="font-sans font-semibold text-xs text-brand-text">{reservation.time}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-[9px] uppercase text-brand-text/50 font-bold">Party Size</p>
                  <p className="font-sans font-semibold text-xs text-brand-text">{reservation.guests} Pax</p>
                </div>
              </div>
            </div>

            {/* Ticket Bottom Details / Preorder Summary */}
            <div className="p-5 bg-brand-bg/40 rounded-b-2xl">
              <div className="flex items-center space-x-2 text-brand-text/70 mb-3.5">
                <ShoppingBag className="w-3.5 h-3.5 text-brand-accent" />
                <span className="font-mono text-[9px] uppercase tracking-wide font-bold">Pre-Ordered Basket Items</span>
              </div>

              {preOrderDetails.length > 0 ? (
                <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
                  {preOrderDetails.map((pre, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs font-sans">
                      <div className="flex items-center space-x-1.5 text-brand-text/80 min-w-0">
                        <span className="font-mono text-brand-accent font-bold shrink-0">x{pre.qty}</span>
                        <span className="truncate font-light">{pre.name}</span>
                      </div>
                      <span className="font-mono text-brand-text/60 shrink-0">${(pre.price * pre.qty).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between text-xs font-sans pt-2 border-t border-brand-border mt-1">
                    <span className="font-semibold text-brand-text">Tray Total</span>
                    <span className="font-mono font-bold text-brand-accent">${preOrderTotal.toFixed(2)}</span>
                  </div>
                </div>
              ) : (
                <p className="font-sans text-brand-text/50 text-xs italic">No culinary pre-orders were attached.</p>
              )}
            </div>

          </div>

          {/* Barcode representation for VIP check-in */}
          <div className="flex flex-col items-center justify-center mt-6 p-4 border border-brand-border rounded-xl bg-brand-secondary/40">
            <div className="w-full h-8 bg-brand-card border border-brand-border rounded flex items-center justify-center p-1.5 select-none pointer-events-none shadow-inner">
              {/* Simulated high value barcode */}
              <div className="flex space-x-[2px] w-full h-full">
                {[1,3,2,1,4,1,2,3,4,1,3,2,1,2,4,3,1,2,4,3,2,2,1,4,1,3,2,1,4,1,2,3,1].map((width, i) => (
                  <div key={i} className={`h-full bg-brand-text`} style={{ flexGrow: width }}></div>
                ))}
              </div>
            </div>
            <span className="font-mono text-[9px] text-brand-text/45 uppercase tracking-[0.3em] mt-2 font-bold">
              CODE-{reservation.id}-VIP-GATE
            </span>
          </div>

          {/* DYNAMIC CONFIRMATION SHARERS / PLATFORM INTEGRATIONS */}
          <div className="mt-8 space-y-4" id="integrations-and-sharers">
            <h4 className="font-mono text-[10px] uppercase text-brand-text/50 text-center tracking-widest font-bold">
              Live Platform Confirms & Calendars
            </h4>

            {/* ROW 1: Real SMS / WhatsApp simulators */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center space-x-2 p-3 bg-[#25d366]/5 hover:bg-[#25d366]/10 border border-[#25d366]/20 rounded-2xl text-[#128c7e] text-xs font-semibold hover:scale-101 active:scale-99 transition-all cursor-pointer text-center font-bold"
                id="whatsapp-confirm-link"
              >
                <Phone className="w-4 h-4 fill-[#25d366]" />
                <span>Notify VIP WhatsApp</span>
              </a>
              
              <a
                href={mailToUrl}
                className="flex items-center justify-center space-x-2 p-3 bg-brand-secondary hover:bg-brand-bg border border-brand-border rounded-2xl text-brand-text text-xs font-semibold hover:scale-101 active:scale-99 transition-all cursor-pointer text-center font-bold"
                id="email-confirm-link"
              >
                <Mail className="w-4 h-4" />
                <span>Send Email Receipt</span>
              </a>
            </div>

            {/* ROW 2: Calendar integrations (Standard download + Google Calendar link) */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleDownloadICS}
                className="flex items-center justify-center space-x-2 p-3 bg-brand-secondary border border-brand-border hover:bg-brand-bg rounded-2xl text-brand-text text-xs font-semibold hover:scale-101 transition-all cursor-pointer font-bold"
                id="ics-calendar-download"
              >
                <Download className="w-4 h-4" />
                <span>Add to Apple/Outlook</span>
              </button>

              <a
                href={googleCalendarUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center space-x-2 p-3 bg-brand-accent/5 hover:bg-brand-accent/10 border border-brand-accent/25 rounded-2xl text-brand-accent text-xs font-semibold hover:scale-101 transition-all cursor-pointer font-bold"
                id="google-calendar-confirm-link"
              >
                <Calendar className="w-4 h-4" />
                <span>Sync Google Calendar</span>
              </a>
            </div>

          </div>

          <div className="mt-8 pt-6 border-t border-brand-border flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-brand-accent hover:bg-brand-accent-hover text-white text-xs font-mono font-bold uppercase cursor-pointer shadow-md"
              id="confirm-close-btn"
            >
              Done / Back to Bistro
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
