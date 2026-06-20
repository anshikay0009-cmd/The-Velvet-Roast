import { useState, useEffect } from 'react';
import { useSWR } from '../hooks/usePeriodicFetch';
import OrdersTable, { Order } from './OrdersTable';
import { Reservation } from '../types';
import { 
  ShoppingBag, 
  Armchair, 
  CheckCircle, 
  Clock, 
  Trash2, 
  TrendingUp, 
  Calendar,
  Share2,
  RefreshCw,
  Coffee,
  Database,
  ArrowLeftRight
} from 'lucide-react';

// Seed initial orders if none are found in localStorage
const SEED_ORDERS: Order[] = [
  {
    id: '#O-1092',
    customer_name: 'Arthur Pendragon',
    total_amount_inr: 1230,
    items: [
      { name: 'Truffled Smashed Avocado Toast', quantity: 1, price: 750 },
      { name: 'Malabar Pistachio Shakerato', quantity: 1, price: 480 }
    ],
    status: 'pending',
    created_at: new Date(Date.now() - 5 * 60000).toISOString() // 5 mins ago
  },
  {
    id: '#O-1091',
    customer_name: 'Clara Deveraux',
    total_amount_inr: 810,
    items: [
      { name: 'Activated Charcoal Rose Latte', quantity: 1, price: 450 },
      { name: 'Twice-Baked Almond Frangipane Croissant', quantity: 1, price: 360 }
    ],
    status: 'preparing',
    created_at: new Date(Date.now() - 15 * 60000).toISOString() // 15 mins ago
  },
  {
    id: '#O-1090',
    customer_name: 'Maya Lin',
    total_amount_inr: 390,
    items: [
      { name: 'Salted Jaggery Cold Foam Brew', quantity: 1, price: 390 }
    ],
    status: 'ready',
    created_at: new Date(Date.now() - 32 * 60000).toISOString() // 32 mins ago
  },
  {
    id: '#O-1089',
    customer_name: 'Siddharth Sen',
    total_amount_inr: 1470,
    items: [
      { name: 'Superfood Harissa Garden Bowl', quantity: 1, price: 790 },
      { name: 'Chili-Crisp Folded Eggs Brioche', quantity: 1, price: 680 }
    ],
    status: 'completed',
    created_at: new Date(Date.now() - 120 * 60000).toISOString() // 2 hours ago
  }
];

interface AdminDashboardProps {
  onToggleView: () => void;
}

export default function AdminDashboard({ onToggleView }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'orders' | 'reservations'>('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Helper fetchers that synchronize from LocalStorage database arrays
  const fetchOrdersSync = async () => {
    // Mimic real API network delay (500ms) to make loading spinner authentic
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check local storage records
    const storedOrders = localStorage.getItem('cafe_orders_db');
    if (storedOrders) {
      try {
        return JSON.parse(storedOrders) as Order[];
      } catch (e) {
        console.error('Error parsing orders', e);
      }
    }
    // Seed initial orders fallback
    localStorage.setItem('cafe_orders_db', JSON.stringify(SEED_ORDERS));
    return SEED_ORDERS;
  };

  const fetchReservationsSync = async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const storedRes = localStorage.getItem('cafe_reservations_db');
    if (storedRes) {
      try {
        return JSON.parse(storedRes) as Reservation[];
      } catch (e) {
        console.error('Error parsing reservations', e);
      }
    }
    return [];
  };

  // Implement SWR (dynamic polling re-fetch hooks) every 30 seconds
  const swrOrders = useSWR<Order[]>('orders-cache', fetchOrdersSync, {
    refreshInterval: 30000,
    onSuccess: (data) => {
      setOrders(data);
    }
  });

  const swrReservations = useSWR<Reservation[]>('reservations-cache', fetchReservationsSync, {
    refreshInterval: 30000,
    onSuccess: (data) => {
      setReservations(data);
    }
  });

  // Calculate current total sales metrics
  const totalSalesINR = orders
    .filter(o => o.status === 'completed' || o.status === 'ready' || o.status === 'preparing')
    .reduce((sum, o) => sum + o.total_amount_inr, 0);

  // Handle status update of order
  const handleUpdateOrderStatus = (orderId: string, itemIdx: string, newStatus: Order['status']) => {
    const updated = orders.map(ord => {
      if (ord.id === orderId) {
        return { ...ord, status: newStatus };
      }
      return ord;
    });
    setOrders(updated);
    localStorage.setItem('cafe_orders_db', JSON.stringify(updated));
    showToast(`Order ${orderId} updated to ${newStatus.toUpperCase()}`);
  };

  // Handle status update of reservations
  const handleUpdateReservationStatus = (resId: string, newStatus: Reservation['status'] | 'seated' | 'cancelled') => {
    const updated = reservations.map(res => {
      if (res.id === resId) {
        // Safe casting across statuses
        return { ...res, status: newStatus as any };
      }
      return res;
    });
    setReservations(updated as any);
    localStorage.setItem('cafe_reservations_db', JSON.stringify(updated));
    showToast(`Reservation status updated to ${newStatus.toUpperCase()}`);
  };

  // Helper temporary toast alert
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Clean filters / empty data reset and reseed to show workflow
  const handleReseedDatabases = () => {
    localStorage.setItem('cafe_orders_db', JSON.stringify(SEED_ORDERS));
    swrOrders.mutate();
    swrReservations.mutate();
    showToast('Database reset and re-seeded with premium mock items');
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#1F2421] font-sans flex flex-col md:flex-row relative" id="admin-dashboard-container">
      
      {/* Dynamic temporary toast */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center space-x-2 px-4 py-3 bg-stone-950 text-white rounded-xl shadow-2xl border border-stone-800 text-xs font-mono animate-bounce" id="dashboard-toast">
          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* FIXED LEFT SIDEBAR (Tailwind Match) */}
      <aside className="w-full md:w-64 bg-white border-r border-[#1F2421]/10 flex flex-col justify-between shrink-0" id="velvet-dashboard-sidebar">
        
        <div className="p-6">
          {/* Top Brand Tag Header */}
          <div className="flex items-center space-x-3 pb-6 border-b border-[#1F2421]/5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#2A5C3D] to-[#2A5C3D]/80 flex items-center justify-center text-white">
              <Coffee className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-sm font-bold tracking-wide text-brand-text">The Velvet Roast</h2>
              <span className="block font-mono text-[8px] uppercase font-extrabold text-brand-accent tracking-widest mt-0.5">Lounge Controller</span>
            </div>
          </div>

          {/* SWR Active Background Synchronizer Widget */}
          <div className="mt-4 p-3 bg-[#FAF6F0] rounded-xl border border-[#1F2421]/10 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${swrOrders.isValidating ? 'bg-brand-accent-warm' : 'bg-emerald-500'}`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${swrOrders.isValidating ? 'bg-brand-accent-warm' : 'bg-emerald-500'}`}></span>
              </span>
              <span className="font-mono text-[9px] text-[#1F2421]/60">
                {swrOrders.isValidating ? 'Syncing...' : 'Live polling active'}
              </span>
            </div>
            <span className="font-mono text-[8px] text-[#1F2421]/40" title="Auto-refresh period: 30 seconds">
              30s loop
            </span>
          </div>

          {/* Navigation Links for Orders & Reservations */}
          <nav className="mt-8 space-y-1.5" id="admin-sidebar-nav">
            <p className="font-mono text-[8px] uppercase tracking-wider text-brand-text/40 font-bold px-3 mb-2">
              Management core
            </p>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-[#2A5C3D]/10 text-[#2A5C3D] border-l-4 border-brand-accent'
                  : 'text-[#1F2421]/75 hover:text-brand-accent hover:bg-[#FAF6F0]'
              }`}
              id="sidebar-orders-tab"
            >
              <div className="flex items-center space-x-2.5">
                <ShoppingBag className="w-4 h-4" />
                <span>Orders Table</span>
              </div>
              <span className="font-mono text-[10px] bg-[#FAF6F0] border px-2 py-0.5 rounded-full font-bold">
                {orders.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('reservations')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'reservations'
                  ? 'bg-[#2A5C3D]/10 text-[#2A5C3D] border-l-4 border-brand-accent'
                  : 'text-[#1F2421]/75 hover:text-brand-accent hover:bg-[#FAF6F0]'
              }`}
              id="sidebar-reservations-tab"
            >
              <div className="flex items-center space-x-2.5">
                <Armchair className="w-4 h-4" />
                <span>Reservations Nests</span>
              </div>
              <span className="font-mono text-[10px] bg-[#FAF6F0] border px-2 py-0.5 rounded-full font-bold">
                {reservations.length}
              </span>
            </button>
          </nav>
        </div>

        {/* BOTTOM: Toggle modes back to customer */}
        <div className="p-4 border-t border-[#1F2421]/5 bg-[#FAF6F0]/50 space-y-3">
          <button
            onClick={onToggleView}
            className="w-full flex items-center justify-center space-x-2 py-2.5 px-3 bg-brand-accent hover:bg-[#1D442B] text-white text-[10px] font-mono uppercase font-bold tracking-widest rounded-xl shadow-sm hover:shadow transition-all cursor-pointer"
            id="toggle-back-to-cafe"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>Go to Guest Site</span>
          </button>

          <button
            onClick={handleReseedDatabases}
            className="w-full flex items-center justify-center space-x-2.5 py-2 text-[#1F2421]/50 hover:text-brand-accent-warm text-[9px] font-mono uppercase tracking-widest rounded-lg hover:bg-red-500/5 border border-dashed border-[#1F2421]/10 transition-all cursor-pointer"
            title="Reseed databases with original data items"
            id="reseed-db-btn"
          >
            <Database className="w-3.5 h-3.5 animate-pulse" />
            <span>Reseed Database</span>
          </button>

          <p className="text-[9px] font-mono text-center text-[#1F2421]/40 leading-relaxed uppercase">
            Velvet Control Console v2.0
          </p>
        </div>
      </aside>

      {/* MAIN CONTENT STAGE */}
      <main className="flex-1 flex flex-col min-h-screen relative overflow-y-auto" id="admin-dashboard-main-area">
        {/* Amber spot decorator */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C87D43]/5 rounded-full blur-3xl pointer-events-none -y-10"></div>
        
        {/* Main top header */}
        <header className="flex justify-between items-center h-20 px-6 bg-white border-b border-[#1F2421]/10 shrink-0">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-wider text-[#1F2421]/40">
              Interactive Live Preview
            </p>
            <h3 className="font-serif text-lg font-bold text-brand-text">
              {activeTab === 'orders' ? 'Active Orders Stream' : 'Botanical Table Reservoirs'}
            </h3>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-right hidden sm:block">
              <span className="block text-xs font-bold text-brand-text">Barista Command</span>
              <span className="block text-[9px] font-mono text-[#2A5C3D]">Session: Active Host</span>
            </span>
            <div className="w-9 h-9 rounded-full bg-[#FAF6F0] border border-[#1F2421]/10 flex items-center justify-center text-[#2A5C3D] font-mono font-bold text-xs uppercase shadow-inner">
              VR
            </div>
          </div>
        </header>

        {/* SUMMARY METRICS ROW */}
        <div className="p-6 pb-2 grid grid-cols-1 md:grid-cols-3 gap-5" id="dashboard-metrics-summary-bar">
          
          <div className="bg-white border border-[#1F2421]/10 p-5 rounded-2xl flex items-center justify-between shadow-sm">
            <div>
              <span className="font-mono text-[9px] uppercase text-[#1F2421]/50 tracking-wide font-bold">Est. Sales Vol (INR)</span>
              <p className="font-mono text-2xl font-bold text-brand-accent mt-1 leading-none">
                ₹{totalSalesINR.toLocaleString()}
              </p>
              <span className="block text-[9px] font-mono text-[#1F2421]/45 mt-2">Validated orders total</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#2A5C3D]/10 text-[#2A5C3D] flex items-center justify-center font-bold">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white border border-[#1F2421]/10 p-5 rounded-2xl flex items-center justify-between shadow-sm">
            <div>
              <span className="font-mono text-[9px] uppercase text-[#1F2421]/50 tracking-wide font-bold font-bold">Total Orders</span>
              <p className="font-mono text-2xl font-bold text-[#C87D43] mt-1 leading-none">
                {orders.length}
              </p>
              <span className="block text-[9px] font-mono text-[#1F2421]/45 mt-2">
                {orders.filter(o => o.status === 'pending').length} pending review
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#C87D43]/10 text-[#C87D43] flex items-center justify-center font-bold">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white border border-[#1F2421]/10 p-5 rounded-2xl flex items-center justify-between shadow-sm">
            <div>
              <span className="font-mono text-[9px] uppercase text-[#1F2421]/50 tracking-wide font-bold font-bold">Reservations</span>
              <p className="font-mono text-2xl font-bold text-slate-800 mt-1 leading-none">
                {reservations.length}
              </p>
              <span className="block text-[10px] font-mono text-[#1F2421]/45 mt-2">
                Active tables allocated
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
              <Armchair className="w-6 h-6" />
            </div>
          </div>

        </div>

        {/* CORE INNER VIEW (Switching between Orders and Reservations) */}
        <div className="p-6 flex-1">
          {activeTab === 'orders' ? (
            <OrdersTable 
              orders={orders}
              onUpdateStatus={handleUpdateOrderStatus}
              isValidating={swrOrders.isValidating}
              onRefresh={swrOrders.mutate}
            />
          ) : (
            /* Reservations Nest Subpanel code */
            <div className="space-y-6" id="reservations-panel">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#1F2421]/10 shadow-sm">
                <div>
                  <h4 className="font-serif text-base font-bold text-brand-text">Active Seating Allocations</h4>
                  <p className="text-xs text-[#1F2421]/60 font-light mt-0.5">Reservations booked live from the customer selection interface</p>
                </div>
                
                <button
                  onClick={swrReservations.mutate}
                  disabled={swrReservations.isValidating}
                  className="px-4 py-2 bg-[#FAF6F0] hover:bg-[#F1EBE1] border border-[#1F2421]/10 text-[#1F2421]/80 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-2 cursor-pointer"
                  id="refresh-reservations-btn"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${swrReservations.isValidating ? 'animate-spin' : ''}`} />
                  <span>Update Nest Data</span>
                </button>
              </div>

              <div className="bg-white rounded-3xl border border-[#1F2421]/10 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse" id="reservations-admin-table">
                    <thead>
                      <tr className="border-b border-[#1F2421]/10 bg-[#FAF6F0] text-[10px] font-mono tracking-wider text-[#1F2421]/60 uppercase">
                        <th className="py-4 px-6 font-bold">Reserve ID</th>
                        <th className="py-4 px-6 font-bold">Customer</th>
                        <th className="py-4 px-6 font-bold">Phone Details</th>
                        <th className="py-4 px-6 font-bold text-center">Party Size</th>
                        <th className="py-4 px-6 font-bold">Time slot</th>
                        <th className="py-4 px-6 font-bold">Selected Table</th>
                        <th className="py-4 px-6 font-bold">Action / Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1F2421]/5 text-xs">
                      {reservations.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-12 px-6 text-center text-[#1F2421]/40 font-mono">
                            <Armchair className="w-8 h-8 text-brand-accent/25 mx-auto mb-3" />
                            No online table reservations yet. Book matching spots from the Customer Site!
                          </td>
                        </tr>
                      ) : (
                        reservations.map((res) => (
                          <tr key={res.id} className="hover:bg-[#FAF6F0]/20 transition-colors" id={`res-row-${res.id}`}>
                            {/* ID */}
                            <td className="py-4 px-6 font-mono font-bold text-[#C87D43]">
                              {res.id}
                            </td>

                            {/* Cust Name */}
                            <td className="py-4 px-6 font-semibold text-brand-text">
                              {res.name}
                            </td>

                            {/* Phone */}
                            <td className="py-4 px-6 font-mono text-brand-text/75 text-[11px]">
                              {res.phone}
                            </td>

                            {/* Party size */}
                            <td className="py-4 px-6 text-center font-bold">
                              <span className="bg-[#FAF6F0] border px-2 py-0.5 rounded-md text-[10px]">
                                {res.guests} Guests
                              </span>
                            </td>

                            {/* Time */}
                            <td className="py-4 px-6 font-mono text-[10px] text-brand-text/70">
                              <span className="block font-bold">{res.date}</span>
                              <span className="block text-[9px] text-[#2A5C3D] font-bold">{res.time}</span>
                            </td>

                            {/* Table */}
                            <td className="py-4 px-6 text-brand-text/80 font-medium">
                              <span className="inline-block bg-[#FAF6F0] text-brand-accent border border-brand-accent/10 px-2 py-0.5 rounded-md font-mono text-[10px] font-semibold">
                                {res.tableId}
                              </span>
                            </td>

                            {/* Live status adjustment */}
                            <td className="py-4 px-6">
                              <div className="relative inline-block text-left">
                                <select
                                  value={res.status}
                                  onChange={(e: any) => handleUpdateReservationStatus(res.id, e.target.value)}
                                  className={`appearance-none pl-3 pr-8 py-1 bg-white border border-[#1F2421]/15 rounded-full font-mono text-[10px] font-bold uppercase tracking-wide focus:outline-none focus:ring-1 focus:ring-brand-accent cursor-pointer transition-all ${
                                    res.status === 'confirmed' 
                                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                                      : res.status === 'seated'
                                        ? 'bg-blue-50 text-blue-800 border-blue-200'
                                        : 'bg-red-50 text-red-800 border-red-200'
                                  }`}
                                  style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%232A5C3D' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`, backgroundPosition: 'right 8px center', backgroundSize: '12px', backgroundRepeat: 'no-repeat' }}
                                  title="Change reservation status"
                                  id={`res-dropdown-${res.id}`}
                                >
                                  <option value="confirmed">Confirmed</option>
                                  <option value="seated">Seated</option>
                                  <option value="cancelled">Cancelled</option>
                                </select>
                              </div>
                            </td>

                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}
        </div>

      </main>

    </div>
  );
}
