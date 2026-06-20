/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { MENU_ITEMS } from '../data/cafeData';
import { MenuItem } from '../types';
import { Search, Flame, Star, ShoppingBag, Plus, Minus, Check, Sparkles, Filter } from 'lucide-react';

interface MenuSectionProps {
  preOrders: { [itemId: string]: number };
  onAddPreOrder: (itemId: string) => void;
  onRemovePreOrder: (itemId: string) => void;
  onClearPreOrders: () => void;
  onProceedToBooking: () => void;
}

export default function MenuSection({
  preOrders,
  onAddPreOrder,
  onRemovePreOrder,
  onClearPreOrders,
  onProceedToBooking
}: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [veganOnly, setVeganOnly] = useState<boolean>(false);
  const [glutenFreeOnly, setGlutenFreeOnly] = useState<boolean>(false);
  const [signatureOnly, setSignatureOnly] = useState<boolean>(false);

  // Categories mapping
  const categories = [
    { id: 'all', label: 'All Creations' },
    { id: 'coffee', label: 'Specialty Brews' },
    { id: 'bakery', label: 'Artisanal Bakery' },
    { id: 'mains', label: 'Crafted Mains' },
    { id: 'desserts', label: 'Sweet Cravings' }
  ];

  // Best sellers & High ratings (Mainstay Highlights)
  const mainstayItems = useMemo(() => {
    return MENU_ITEMS.filter(item => item.tags.includes('Signature') || item.tags.includes('Best-Seller')).slice(0, 3);
  }, []);

  // Filter items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const satisfiesVegan = !veganOnly || item.tags.includes('Vegan');
      const satisfiesGlutenFree = !glutenFreeOnly || item.tags.includes('Gluten-Free');
      const satisfiesSignature = !signatureOnly || item.tags.includes('Signature') || item.tags.includes('Best-Seller');

      return matchesCategory && matchesSearch && satisfiesVegan && satisfiesGlutenFree && satisfiesSignature;
    });
  }, [selectedCategory, searchQuery, veganOnly, glutenFreeOnly, signatureOnly]);

  // Compute total basket summary
  const basketDetails = useMemo(() => {
    let itemsCount = 0;
    let totalPrice = 0;
    const itemsList: { item: MenuItem; qty: number }[] = [];

    Object.entries(preOrders).forEach(([itemId, qty]) => {
      if (qty > 0) {
        const found = MENU_ITEMS.find(i => i.id === itemId);
        if (found) {
          itemsCount += qty;
          totalPrice += found.price * qty;
          itemsList.push({ item: found, qty });
        }
      }
    });

    return { itemsCount, totalPrice, itemsList };
  }, [preOrders]);

  return (
    <section className="bg-brand-bg py-20 px-4 md:px-8 border-b border-brand-border scroll-mt-24" id="digital-menu">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-14" id="menu-header">
          <div className="inline-flex items-center space-x-2 bg-brand-accent/10 border border-brand-accent/20 px-3.5 py-1 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-accent animate-pulse" />
            <span className="font-mono text-[10px] text-brand-accent uppercase tracking-widest font-semibold">
              App-Style Digital Menu
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl text-brand-text tracking-tight animate-fade-in">
            Crafted Sips & Pastry Arts
          </h2>
          <p className="font-sans text-brand-text/70 text-sm mt-3 font-light">
            Pure ingredients, explicit pricing, and instant table attachment. Build a culinary pre-order to accompany your booking. No hidden costs.
          </p>
        </div>

        {/* SECTION 1: Mainstay Highlights / Chef Recommendations */}
        <div className="mb-14" id="chef-recommendations">
          <div className="flex items-center space-x-3 mb-6">
            <span className="p-1 px-2.5 rounded-md bg-brand-accent/10 text-brand-accent text-xs font-mono font-bold uppercase tracking-wider">
              Must Try
            </span>
            <h3 className="font-serif text-xl text-brand-text">Mainstay Recommendations</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mainstayItems.map((item) => (
              <div 
                key={`mainstay-${item.id}`}
                className="bg-brand-card border border-brand-border rounded-2xl p-5 flex items-center space-x-4 hover:border-brand-accent/50 group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden cursor-pointer"
                id={`recommendation-card-${item.id}`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-brand-accent/5 to-transparent rounded-tr-2xl pointer-events-none"></div>
                <img 
                  src={item.image} 
                  alt={item.name} 
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 rounded-xl object-cover border border-brand-border shrink-0"
                />
                <div className="flex-grow min-w-0">
                  <header className="flex items-center space-x-2 mb-1">
                    <span className="flex items-center text-xs font-semibold text-brand-accent">
                      <Star className="w-3 h-3 fill-brand-accent mr-1" />
                      {item.rating}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-brand-border"></span>
                    <span className="text-[10px] font-mono text-brand-text/50 uppercase">{item.prepTime}</span>
                  </header>
                  <h4 className="font-sans font-bold text-brand-text text-sm truncate group-hover:text-brand-accent transition-colors">
                    {item.name}
                  </h4>
                  <p className="font-sans text-brand-text/60 text-xs truncate mb-2">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-semibold text-brand-text">
                      ${item.price.toFixed(2)}
                    </span>
                    
                    {preOrders[item.id] ? (
                      <div className="flex items-center space-x-2 bg-brand-accent text-white rounded-lg py-1 px-2.5 text-xs font-bold shadow-md">
                        <button 
                          onClick={() => onRemovePreOrder(item.id)}
                          className="hover:scale-110 active:scale-95 text-white focus:outline-none"
                          id={`mainstay-sub-item-${item.id}`}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-mono text-xs w-4 text-center text-white">{preOrders[item.id]}</span>
                        <button 
                          onClick={() => onAddPreOrder(item.id)}
                          className="hover:scale-110 active:scale-95 text-white focus:outline-none"
                          id={`mainstay-add-item-${item.id}`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => onAddPreOrder(item.id)}
                        className="flex items-center space-x-1.5 px-3 py-1 bg-brand-secondary text-brand-text border border-brand-border hover:bg-brand-accent hover:text-white hover:border-brand-accent rounded-lg text-xs font-semibold font-sans transition-all duration-350 shadow-sm"
                        id={`mainstay-select-item-${item.id}`}
                      >
                        <Plus className="w-3 h-3" />
                        <span>Select</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: Control Hub (Categories / Dietary Filters / Search) */}
        <div className="bg-brand-secondary border border-brand-border rounded-3xl p-6 mb-10 text-brand-text" id="menu-controls">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Group 2.1: Categorization Tabs */}
            <div className="lg:col-span-8 overflow-x-auto flex space-x-2 pb-2 lg:pb-0 scrollbar-none" id="category-tabs">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider shrink-0 transition-all cursor-pointer ${
                    selectedCategory === cat.id 
                      ? 'bg-brand-accent text-white shadow-md shadow-brand-accent/20' 
                      : 'bg-brand-card text-brand-text/70 border border-brand-border hover:text-brand-text'
                  }`}
                  id={`cat-tab-${cat.id}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Group 2.2: Dynamic Search */}
            <div className="lg:col-span-4 relative" id="search-bar">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text/40" />
              <input 
                type="text" 
                placeholder="Search ingredients..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-brand-card pl-10 pr-4 py-2.5 rounded-full border border-brand-border text-xs font-sans text-brand-text focus:outline-none focus:border-brand-accent placeholder-brand-text/40 transition-colors"
                id="menu-search-input"
              />
            </div>

          </div>

          {/* Group 2.3: Dietary Flags */}
          <div className="flex flex-wrap items-center gap-6 mt-5 pt-5 border-t border-brand-border" id="dietary-checkmarks">
            <span className="font-mono text-[10px] text-brand-text/50 uppercase tracking-widest flex items-center space-x-1.5 font-bold">
              <Filter className="w-3 h-3" />
              <span>Intolerance Filters:</span>
            </span>

            <label className="inline-flex items-center space-x-2 cursor-pointer select-none">
              <input 
                type="checkbox" 
                checked={veganOnly} 
                onChange={(e) => setVeganOnly(e.target.checked)}
                className="hidden peer"
                id="checkbox-vegan"
              />
              <div className="w-4 h-4 rounded border border-brand-border bg-brand-card flex items-center justify-center peer-checked:bg-brand-accent peer-checked:border-brand-accent transition-all text-white">
                {veganOnly && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <span className="font-sans text-xs text-brand-text/70 peer-checked:text-brand-text font-medium">Vegan Friendly</span>
            </label>

            <label className="inline-flex items-center space-x-2 cursor-pointer select-none">
              <input 
                type="checkbox" 
                checked={glutenFreeOnly} 
                onChange={(e) => setGlutenFreeOnly(e.target.checked)}
                className="hidden peer"
                id="checkbox-gluten-free"
              />
              <div className="w-4 h-4 rounded border border-brand-border bg-brand-card flex items-center justify-center peer-checked:bg-brand-accent peer-checked:border-brand-accent transition-all text-white">
                {glutenFreeOnly && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <span className="font-sans text-xs text-brand-text/70 peer-checked:text-brand-text font-medium">Gluten-Free Only</span>
            </label>

            <label className="inline-flex items-center space-x-2 cursor-pointer select-none">
              <input 
                type="checkbox" 
                checked={signatureOnly} 
                onChange={(e) => setSignatureOnly(e.target.checked)}
                className="hidden peer"
                id="checkbox-signatures"
              />
              <div className="w-4 h-4 rounded border border-brand-border bg-brand-card flex items-center justify-center peer-checked:bg-brand-accent peer-checked:border-brand-accent transition-all text-white">
                {signatureOnly && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <span className="font-sans text-xs text-brand-text/70 peer-checked:text-brand-text font-medium">Top Rated / Signatures</span>
            </label>
          </div>
        </div>

        {/* SECTION 3: Main Card List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" id="menu-cards-grid">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              className="bg-brand-card border border-brand-border hover:border-brand-accent/50 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 group transition-all duration-350 flex flex-col justify-between cursor-pointer"
              id={`menu-card-${item.id}`}
            >
              {/* Card Photo Block */}
              <div className="relative aspect-video overflow-hidden bg-brand-secondary">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Popularity glass overlay */}
                <div className="absolute top-3 left-3 bg-brand-bg/90 backdrop-blur-md border border-brand-border px-2.5 py-1 rounded-full flex items-center space-x-1 shadow-md">
                  <Star className="w-3 h-3 fill-brand-accent text-brand-accent" />
                  <span className="font-mono text-[10px] font-bold text-brand-text">{item.rating} Vibe</span>
                </div>

                {/* Dietary Tags Overlay */}
                <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
                  {item.tags.map((tag, i) => (
                    <span 
                      key={i}
                      className="font-mono text-[8px] tracking-widest px-2 py-0.5 uppercase font-extrabold rounded bg-brand-bg/90 border border-brand-border text-brand-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Text & Sizing */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] text-brand-accent uppercase tracking-widest font-bold">{item.category}</span>
                    <span className="text-[10px] font-mono text-brand-text/50">{item.prepTime} estimate</span>
                  </div>
                  <h3 className="font-serif text-lg text-brand-text group-hover:text-brand-accent transition-colors duration-300">
                    {item.name}
                  </h3>
                  <p className="font-sans text-brand-text/70 text-xs leading-relaxed mt-2.5 mb-5 font-light">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-brand-border">
                  <span className="font-mono text-lg font-bold text-brand-text">
                    ${item.price.toFixed(2)}
                  </span>

                  {preOrders[item.id] ? (
                    <div className="flex items-center space-x-3 bg-brand-accent text-white rounded-full py-1.5 px-3.5 text-xs font-bold shadow-md shadow-brand-accent/25 hover:shadow-lg hover:shadow-brand-accent/35 transition-all duration-300 hover:scale-[1.02]">
                      <button 
                        onClick={() => onRemovePreOrder(item.id)}
                        className="p-1 rounded-full hover:bg-white/20 hover:scale-115 active:scale-90 text-white focus:outline-none transition-all duration-200 flex items-center justify-center"
                        id={`menu-card-sub-${item.id}`}
                        title="Remove 1 from tray"
                      >
                        <Minus className="w-3 h-3 stroke-[3]" />
                      </button>
                      <span className="font-mono text-sm w-4 text-center text-white select-none">{preOrders[item.id]}</span>
                      <button 
                        onClick={() => onAddPreOrder(item.id)}
                        className="p-1 rounded-full hover:bg-white/20 hover:scale-115 active:scale-90 text-white focus:outline-none transition-all duration-200 flex items-center justify-center"
                        id={`menu-card-add-${item.id}`}
                        title="Add 1 more to tray"
                      >
                        <Plus className="w-3 h-3 stroke-[3]" />
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => onAddPreOrder(item.id)}
                      className="group/select flex items-center space-x-1.5 px-4.5 py-2 bg-brand-secondary border border-brand-border text-brand-text/80 hover:bg-brand-accent hover:text-white hover:border-brand-accent rounded-full text-xs font-semibold tracking-wide transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95 cursor-pointer shadow-sm hover:shadow-md hover:shadow-brand-accent/20"
                      id={`menu-card-select-btn-${item.id}`}
                    >
                      <Plus className="w-3.5 h-3.5 transition-transform duration-300 group-hover/select:rotate-90" />
                      <span>Select</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filteredItems.length === 0 && (
            <div className="col-span-full py-16 text-center" id="menu-no-results">
              <p className="font-sans text-brand-text/50 text-sm">No dishes match your specific intolerant filters.</p>
              <button 
                onClick={() => {
                  setVeganOnly(false);
                  setGlutenFreeOnly(false);
                  setSignatureOnly(false);
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-4 font-mono text-xs text-brand-accent hover:underline"
                id="menu-reset-filters-btn"
              >
                Clear all filters and search again
              </button>
            </div>
          )}
        </div>

        {/* Dynamic Pre-Order tray sticky drawer/box */}
        {basketDetails.itemsCount > 0 && (
          <div 
            className="mt-16 bg-brand-secondary border border-brand-accent/20 rounded-3xl p-6 shadow-xl relative overflow-hidden"
            id="menu-preorder-tray"
          >
            <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-brand-accent/5 to-transparent pointer-events-none"></div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              
              <div className="flex items-start space-x-4 mb-4 md:mb-0">
                <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-brand-text">Active Seating Tray Pre-Orders</h4>
                  <p className="font-sans text-xs text-brand-text/70 mt-0.5">
                    You have selected <span className="font-bold text-brand-accent">{basketDetails.itemsCount} gourmet items</span> to accompany your reservation table.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <p className="font-sans text-[10px] uppercase text-brand-text/50 tracking-wider">Subtotal</p>
                  <p className="font-mono text-2xl font-bold text-brand-text">${basketDetails.totalPrice.toFixed(2)}</p>
                </div>
                <div className="flex space-x-3">
                  <button 
                    onClick={onClearPreOrders}
                    className="px-4 py-2.5 rounded-full border border-brand-border text-xs font-mono text-brand-text/60 hover:text-brand-text hover:border-brand-text/80 transition-colors"
                    id="clear-preorder-btn"
                  >
                    Clear Tray
                  </button>
                  <button 
                    onClick={onProceedToBooking}
                    className="px-6 py-2.5 rounded-full bg-brand-accent text-white hover:bg-brand-accent-hover active:scale-95 text-xs font-semibold font-sans uppercase tracking-wider transition-colors shadow-lg"
                    id="confirm-tray-and-book"
                  >
                    Attach to Reservation →
                  </button>
                </div>
              </div>

            </div>

            {/* Quick list of pre-ordered items */}
            <div className="mt-5 pt-5 border-t border-brand-border flex flex-wrap gap-2.5">
              {basketDetails.itemsList.map(({ item, qty }) => (
                <div 
                  key={`tray-badge-${item.id}`}
                  className="inline-flex items-center space-x-2 bg-brand-card border border-brand-border px-3 py-1 rounded-full text-xs text-brand-text"
                >
                  <span className="w-2 h-2 rounded-full bg-brand-accent"></span>
                  <span className="font-sans max-w-[120px] truncate-ellipsis">{item.name}</span>
                  <span className="font-mono font-bold text-brand-accent text-[11px]">x{qty}</span>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
