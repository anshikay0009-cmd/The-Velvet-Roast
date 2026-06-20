/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { CAFE_TABLES, MENU_ITEMS } from '../data/cafeData';
import { CafeTable, Reservation } from '../types';
import { Calendar, Clock, Users, Map, Armchair, HelpCircle, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';

interface ReservationSectionProps {
  preOrders: { [itemId: string]: number };
  onBookingSuccess: (reservation: Reservation) => void;
}

export default function ReservationSection({
  preOrders,
  onBookingSuccess
}: ReservationSectionProps) {
  // Client Form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  
  // Date and Time selectors (default to tomorrow 12:00 as a high probability)
  const tomorrowStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  }, []);
  const [date, setDate] = useState(tomorrowStr);
  const [time, setTime] = useState('12:00');
  const [guests, setGuests] = useState(2);
  const [seatingZone, setSeatingZone] = useState<'indoor' | 'outdoor' | 'window'>('indoor');
  const [selectedTableId, setSelectedTableId] = useState<string>('');
  
  // Local active reservations lists for double-booking checks
  const [reservations, setReservations] = useState<Reservation[]>([]);

  // Form error states
  const [formError, setFormError] = useState<string | null>(null);

  // Load existing reservations from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('cafe_reservations_db');
    if (saved) {
      try {
        setReservations(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing reservations database', e);
      }
    } else {
      // Seed a few pre-existing reservations to show active table locking
      const seedReservations: Reservation[] = [
        {
          id: 'res-seed-1',
          name: 'James Carter',
          email: 'james@carter.io',
          phone: '+1 234567890',
          date: tomorrowStr,
          time: '12:00',
          guests: 2,
          seatingPreference: 'indoor',
          tableId: 'T-I2', // Velvet Nook 02 is booked at 12:00 tomorrow
          preOrders: [],
          status: 'confirmed',
          createdAt: new Date().toISOString()
        },
        {
          id: 'res-seed-2',
          name: 'Elena Rostova',
          email: 'elena@gmail.com',
          phone: '+1 987654321',
          date: tomorrowStr,
          time: '14:00',
          guests: 4,
          seatingPreference: 'outdoor',
          tableId: 'T-O1', // Garden Greenhouse is booked at 14:00 tomorrow
          preOrders: [],
          status: 'confirmed',
          createdAt: new Date().toISOString()
        }
      ];
      localStorage.setItem('cafe_reservations_db', JSON.stringify(seedReservations));
      setReservations(seedReservations);
    }
  }, [tomorrowStr]);

  // Determine booked table IDs for the CURRENT selected date and time slot
  const occupiedTableIds = useMemo(() => {
    return reservations
      .filter(res => res.date === date && res.time === time)
      .map(res => res.tableId);
  }, [reservations, date, time]);

  // Filter cafe tables by active seatingZone selection
  const tablesInSelectedZone = useMemo(() => {
    return CAFE_TABLES.filter(t => t.zone === seatingZone);
  }, [seatingZone]);

  // Select first available table automatically when seatingZone or slot changes
  useEffect(() => {
    const available = tablesInSelectedZone.find(t => !occupiedTableIds.includes(t.id) && t.capacity >= guests);
    if (available) {
      setSelectedTableId(available.id);
    } else {
      // fallback to any available in this zone
      const anyAvail = tablesInSelectedZone.find(t => !occupiedTableIds.includes(t.id));
      if (anyAvail) {
        setSelectedTableId(anyAvail.id);
      } else {
        setSelectedTableId('');
      }
    }
  }, [seatingZone, date, time, occupiedTableIds, tablesInSelectedZone, guests]);

  // Time options list
  const availableSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'
  ];

  // Selected table helper object
  const currentSelectedTable = useMemo(() => {
    return CAFE_TABLES.find(t => t.id === selectedTableId);
  }, [selectedTableId]);

  // Compute validation total preorders to include
  const preOrderItemsArray = useMemo(() => {
    return Object.entries(preOrders)
      .filter(([_, qty]) => qty > 0)
      .map(([itemId, qty]) => ({ menuItemId: itemId, quantity: qty }));
  }, [preOrders]);

  const preOrderSummary = useMemo(() => {
    let total = 0;
    preOrderItemsArray.forEach(p => {
      const found = MENU_ITEMS.find(i => i.id === p.menuItemId);
      if (found) {
        total += found.price * p.quantity;
      }
    });
    return total;
  }, [preOrderItemsArray]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Form boundary rules validation
    if (!name.trim()) return setFormError('Guest name is required.');
    if (!phone.trim() || phone.length < 8) return setFormError('A valid phone number is required to receive WhatsApp/text confirmation.');
    if (!email.trim() || !email.includes('@')) return setFormError('A valid email address is required.');
    if (!selectedTableId) return setFormError('Please select a specific seating spot on the visual seating map.');

    // Secondary deep double-booking check
    const alreadyBooked = reservations.some(
      res => res.date === date && res.time === time && res.tableId === selectedTableId
    );
    if (alreadyBooked) {
      return setFormError('This specific table was just booked by another user for this slot. Please select a different table or time.');
    }

    // Build fresh reservation payload
    const newReservation: Reservation = {
      id: `res-${Math.floor(100000 + Math.random() * 900000)}`,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      date,
      time,
      guests,
      seatingPreference: seatingZone,
      tableId: selectedTableId,
      preOrders: preOrderItemsArray,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    // Save synchronously to local database array
    const updatedReservations = [...reservations, newReservation];
    localStorage.setItem('cafe_reservations_db', JSON.stringify(updatedReservations));
    setReservations(updatedReservations);

    // Call success handler to open dynamic receipt popup
    onBookingSuccess(newReservation);
  };

  return (
    <section className="bg-brand-bg py-20 px-4 md:px-8 scroll-mt-24" id="table-reservation">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: Complete Reservation Setup Form */}
          <div className="lg:col-span-5 bg-brand-card border border-brand-border p-6 md:p-8 rounded-3xl shadow-sm" id="reservation-card-panel">
            <h3 className="font-serif text-2xl text-brand-text flex items-center mb-2">
              <Armchair className="w-6 h-6 text-brand-accent mr-3" />
              Pre-Book Seating
            </h3>
            <p className="font-sans text-xs text-brand-text/70 mb-6 leading-relaxed font-light">
              No account creation needed. Secure your favorite zone instantly and lock your physical table. Fully synchronized.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5" id="reservation-form">
              
              {/* DATE & TIME DYNAMIC SLOTS */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-brand-text/70 uppercase tracking-wider mb-1.5 flex items-center font-bold">
                    <Calendar className="w-3.5 h-3.5 text-brand-accent mr-1.5" />
                    Date
                  </label>
                  <input 
                    type="date" 
                    min={new Date().toISOString().split('T')[0]}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-brand-bg border border-brand-border text-brand-text font-mono text-xs rounded-xl p-3 focus:outline-none focus:border-brand-accent transition-colors"
                    id="booking-date"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-brand-text/70 uppercase tracking-wider mb-1.5 flex items-center font-bold">
                    <Clock className="w-3.5 h-3.5 text-brand-accent mr-1.5" />
                    Time Slot
                  </label>
                  <select 
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-brand-bg border border-brand-border text-brand-text font-mono text-xs rounded-xl p-3 focus:outline-none focus:border-brand-accent transition-colors"
                    id="booking-time"
                    required
                  >
                    {availableSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* NUMBER OF GUESTS SELECTOR */}
              <div>
                <label className="block text-[11px] font-mono text-brand-text/70 uppercase tracking-wider mb-2 flex items-center font-bold">
                  <Users className="w-4 h-4 text-brand-accent mr-1.5" />
                  Party size (Guests)
                </label>
                <div className="flex gap-2" id="booking-guests-row">
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setGuests(num)}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                        guests === num 
                          ? 'bg-brand-accent text-white scale-105 shadow-md shadow-brand-accent/20' 
                          : 'bg-brand-bg border border-brand-border text-brand-text/50 hover:text-brand-text'
                      }`}
                      id={`guest-btn-${num}`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* GUEST PROFILE (Guest checkout style) */}
              <div className="space-y-4 pt-2 border-t border-brand-border">
                
                <div>
                  <label className="block text-[11px] font-mono text-brand-text/70 uppercase tracking-wider mb-1.5 font-bold">
                    Guest Name
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. Clara Deveraux" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-brand-bg border border-brand-border text-brand-text text-xs rounded-xl p-3 focus:outline-none focus:border-brand-accent placeholder-brand-text/40"
                    id="booking-name"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-brand-text/70 uppercase tracking-wider mb-1.5 font-bold">
                      WhatsApp / Phone
                    </label>
                    <input 
                      type="tel" 
                      placeholder="+91 98200 98200" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-brand-bg border border-brand-border text-brand-text text-xs rounded-xl p-3 focus:outline-none focus:border-brand-accent placeholder-brand-text/40"
                      id="booking-phone"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-brand-text/70 uppercase tracking-wider mb-1.5 font-bold">
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      placeholder="clara@aesthetic.me" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-brand-bg border border-brand-border text-brand-text text-xs rounded-xl p-3 focus:outline-none focus:border-brand-accent placeholder-brand-text/40"
                      id="booking-email"
                      required
                    />
                  </div>
                </div>

              </div>

              {/* ATTACHED DYNAMIC PREORDER SUMMARY DISPLAY */}
              {preOrderItemsArray.length > 0 && (
                <div 
                  className="bg-brand-accent/5 border border-brand-accent/10 p-4 rounded-xl flex items-center justify-between shadow-sm"
                  id="attached-preorders"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-accent/10 text-brand-accent flex items-center justify-center font-mono font-bold text-xs">
                      {preOrderItemsArray.length}
                    </div>
                    <div>
                      <p className="font-sans text-xs font-semibold text-brand-text">Pre-Orders Attached</p>
                      <p className="font-sans text-[10px] text-brand-text/60">Drinks & pastries will serve upon arrival</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm font-extrabold text-brand-accent">+${preOrderSummary.toFixed(2)}</p>
                  </div>
                </div>
              )}

              {/* ERRORS */}
              {formError && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-600 p-3 rounded-xl text-xs font-mono text-center">
                  {formError}
                </div>
              )}

              {/* SUMBIT / ACTION BUTTON */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-brand-accent hover:bg-brand-accent-hover text-white hover:shadow-md active:scale-98 font-sans font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center space-x-2"
                id="sumbit-booking-btn"
              >
                <span>Reserve Physical Table {currentSelectedTable ? `(${currentSelectedTable.name})` : ''}</span>
                <CheckCircle2 className="w-4 h-4 ml-1" />
              </button>

              <div className="flex items-center justify-center space-x-2 text-[10px] font-mono text-brand-text/50 text-center pt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero spam guarantee. Secure verification codes only.</span>
              </div>

            </form>
          </div>

          {/* RIGHT: High Impact Architectural Seating Map */}
          <div className="lg:col-span-7 space-y-6" id="seating-map-panel">
            <div className="bg-brand-card border border-brand-border p-6 md:p-8 rounded-3xl shadow-sm">
              
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-5 border-b border-brand-border">
                <div className="mb-4 md:mb-0">
                  <span className="font-mono text-[10px] uppercase text-brand-accent tracking-[0.2em] font-semibold flex items-center">
                    <Map className="w-3.5 h-3.5 mr-1.5" />
                    Interactive Architectural Blueprint
                  </span>
                  <h3 className="font-serif text-xl tracking-tight text-brand-text mt-1">
                    Choose Your Physical Space
                  </h3>
                </div>
                
                {/* Zone Toggle Tabs */}
                <div className="flex bg-brand-bg border border-brand-border p-1 rounded-xl" id="zone-pills">
                  {(['indoor', 'window', 'outdoor'] as const).map(zone => (
                    <button
                      key={zone}
                      onClick={() => setSeatingZone(zone)}
                      className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold capitalize transition-all cursor-pointer ${
                        seatingZone === zone 
                          ? 'bg-brand-accent text-white shadow-sm' 
                          : 'text-brand-text/50 border border-transparent hover:text-brand-text'
                      }`}
                      id={`zone-pill-${zone}`}
                    >
                      {zone}
                    </button>
                  ))}
                </div>
              </div>

              {/* Legend indicators */}
              <div className="flex items-center space-x-6 mb-8 text-[11px] font-mono text-brand-text/60" id="map-legend">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-md border border-brand-border bg-brand-bg"></div>
                  <span>Available Spot</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-md bg-brand-secondary border border-brand-border opacity-40 flex items-center justify-center text-brand-text/40 font-bold">×</div>
                  <span>Occupied Slot</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-md bg-brand-accent border border-brand-accent shadow-sm"></div>
                  <span>Selected Table</span>
                </div>
              </div>

              {/* Seating blueprint stage */}
              <div className="bg-brand-bg border border-brand-border rounded-2xl p-8 relative overflow-hidden" id="blueprint-stage">
                
                {/* Visual zone dividers */}
                <div className="absolute top-4 left-4 font-mono text-[9px] uppercase tracking-widest text-brand-text/40">
                  Zone Code: REF-{seatingZone.toUpperCase().slice(0, 3)}
                </div>

                {/* Simulated center element based on selected zone */}
                {seatingZone === 'indoor' && (
                  <div className="absolute top-[48%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border border-brand-border/60 flex items-center justify-center text-center p-3 pointer-events-none">
                    <p className="font-serif italic text-[10px] text-brand-text/30 uppercase tracking-widest leading-relaxed">
                      Velvet Fire Hearth
                    </p>
                  </div>
                )}
                {seatingZone === 'window' && (
                  <div className="absolute top-[48%] left-[42%] -translate-x-1/2 -translate-y-1/2 w-48 h-3.5 bg-brand-secondary rounded border border-brand-border flex items-center justify-center pointer-events-none">
                    <p className="font-mono text-[8px] text-brand-text/40 uppercase tracking-[0.2em]">
                      Double-Glazed Sun Glass
                    </p>
                  </div>
                )}
                {seatingZone === 'outdoor' && (
                  <div className="absolute top-[48%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-3xl border border-brand-border border-dashed flex items-center justify-center text-center p-3 pointer-events-none">
                    <p className="font-serif italic text-[9px] text-brand-text/30 uppercase tracking-widest leading-relaxed">
                      Central Fountain
                    </p>
                  </div>
                )}

                {/* Seating grid layout */}
                <div className="grid grid-cols-2 gap-8 max-w-lg mx-auto relative z-10 py-6" id="table-layout-grid">
                  {tablesInSelectedZone.map((table) => {
                    const isOccupied = occupiedTableIds.includes(table.id);
                    const isSelected = selectedTableId === table.id;
                    const canFitParty = table.capacity >= guests;

                    return (
                      <button
                        key={table.id}
                        type="button"
                        onClick={() => {
                          if (!isOccupied) setSelectedTableId(table.id);
                        }}
                        className={`aspect-square sm:aspect-auto sm:h-40 rounded-2xl flex flex-col items-center justify-between p-4 border transition-all duration-300 peer group select-none cursor-pointer ${
                          isOccupied 
                            ? 'bg-brand-secondary/25 border-brand-border/40 text-brand-text/30 opacity-40 cursor-not-allowed'
                            : isSelected 
                              ? 'bg-brand-accent/5 border-brand-accent text-brand-accent scale-102 shadow hover:shadow-md'
                              : 'bg-brand-card border border-brand-border text-brand-text hover:border-brand-accent/50 hover:bg-brand-secondary/40'
                        }`}
                        id={`blueprint-table-${table.id}`}
                      >
                        <header className="w-full flex items-center justify-between">
                          <span className="font-mono text-[10px] tracking-wide text-brand-text/45">
                            {table.id}
                          </span>
                          <span className={`font-mono text-[9px] px-2 py-0.5 rounded-md ${
                            isOccupied 
                              ? 'bg-brand-secondary text-brand-text/30' 
                              : isSelected 
                                ? 'bg-brand-accent/15 text-brand-accent' 
                                : 'bg-brand-secondary text-brand-text/60'
                          }`}>
                            Cap: {table.capacity}p
                          </span>
                        </header>

                        <div className="py-2 flex flex-col items-center">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-1.5 transition-colors ${
                            isOccupied 
                              ? 'bg-brand-bg text-brand-text/30' 
                              : isSelected 
                                ? 'bg-brand-accent text-white' 
                                : 'bg-brand-secondary group-hover:text-brand-accent group-hover:bg-brand-accent/5 text-brand-text/60'
                          }`}>
                            <Armchair className="w-5 h-5" />
                          </div>
                          <p className="font-serif text-brand-text text-xs text-center font-medium max-w-[125px] truncate">
                            {table.name}
                          </p>
                        </div>

                        <footer className="w-full text-center">
                          {isOccupied ? (
                            <span className="font-mono text-[9px] text-brand-text/40 uppercase font-semibold">Locked / Booked</span>
                          ) : !canFitParty ? (
                            <span className="font-mono text-[9px] text-brand-text/45 uppercase flex items-center justify-center">
                              Small Cap (Fit: {table.capacity})
                            </span>
                          ) : isSelected ? (
                            <span className="font-mono text-[9px] text-brand-accent uppercase font-extrabold tracking-wide flex items-center justify-center">
                              Selected Spot ✓
                            </span>
                          ) : (
                            <span className="font-mono text-[9px] text-brand-text/40 group-hover:text-brand-text transition-colors uppercase">Tap to Select</span>
                          )}
                        </footer>
                      </button>
                    );
                  })}
                </div>

              </div>

              {/* Sourcing ingredients warning */}
              <div className="mt-6 flex items-start space-x-3 text-brand-text/60 text-xs bg-brand-secondary/40 border border-brand-border p-4 rounded-xl shadow-inner" id="reserve-warning">
                <HelpCircle className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                <p className="font-sans leading-relaxed">
                  <span className="font-semibold text-brand-text">Table Retention Limit:</span> Reservations are held for a maximum of 15 minutes past the slot. For parties larger than 6 guests, please contact our physical VIP desk directly at +91 (22) 6911 2000.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
