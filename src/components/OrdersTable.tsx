import React, { useState } from 'react';
import { Download, ShoppingBag, Eye, Check, ChevronDown, RefreshCw, Layers } from 'lucide-react';

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customer_name: string;
  total_amount_inr: number;
  items: OrderItem[];
  status: 'pending' | 'preparing' | 'ready' | 'completed';
  created_at: string;
}

interface OrdersTableProps {
  orders: Order[];
  onUpdateStatus: (orderId: string, itemIdx: string, status: Order['status']) => void;
  isValidating: boolean;
  onRefresh: () => void;
}

export default function OrdersTable({
  orders,
  onUpdateStatus,
  isValidating,
  onRefresh
}: OrdersTableProps) {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<Order | null>(null);

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesSearch = order.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          order.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // End-of-day CSV download utility for cafe staff
  const handleDownloadCSV = () => {
    if (orders.length === 0) return;

    // Headers matching Supabase DB spec & order specifics
    const headers = ['Order ID', 'Customer Name', 'Total Amount (INR)', 'Items Count', 'Items Details', 'Status', 'Created At'];
    
    const rows = filteredOrders.map(order => {
      const itemsDetailStr = order.items
        .map(item => `${item.name} (x${item.quantity})`)
        .join('; ');

      return [
        order.id,
        `"${order.customer_name.replace(/"/g, '""')}"`,
        order.total_amount_inr,
        order.items.reduce((acc, curr) => acc + curr.quantity, 0),
        `"${itemsDetailStr.replace(/"/g, '""')}"`,
        order.status,
        order.created_at
      ];
    });

    const csvContent = [
      headers.join(','),
      ...rows.map(e => e.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    
    // File name format with current date
    const todayStr = new Date().toISOString().split('T')[0];
    link.setAttribute('download', `the_velvet_roast_orders_${todayStr}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusStyle = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200/50';
      case 'preparing':
        return 'bg-blue-50 text-blue-700 border-blue-200/50';
      case 'ready':
        return 'bg-purple-50 text-purple-700 border-purple-200/50';
      case 'completed':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200/50';
    }
  };

  return (
    <div className="space-y-6" id="orders-table-wrapper">
      
      {/* Search and Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-brand-border/40 shadow-sm" id="orders-filter-container">
        <div className="flex-1 flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by ID or customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-80 bg-[#FAF6F0]/60 border border-brand-border text-brand-text text-xs rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-brand-accent transition-colors"
              id="order-search-input"
            />
            <div className="absolute left-3 top-3.5 text-brand-text/40">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Status Filter Tabs */}
          <div className="flex flex-wrap gap-1 bg-[#F1EBE1]/40 border border-brand-border/60 p-1 rounded-xl">
            {['all', 'pending', 'preparing', 'ready', 'completed'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                  filterStatus === status
                    ? 'bg-brand-accent text-white shadow-sm'
                    : 'text-brand-text/60 hover:text-brand-text'
                }`}
                id={`filter-tab-${status}`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Buttons / Operations */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={onRefresh}
            disabled={isValidating}
            className="p-2.5 bg-[#FAF6F0] hover:bg-[#F1EBE1] border border-brand-border text-brand-text/70 rounded-xl transition-all cursor-pointer flex items-center justify-center disabled:opacity-50"
            title="Force refresh current orders"
            id="refresh-orders-btn"
          >
            <RefreshCw className={`w-4 h-4 ${isValidating ? 'animate-spin text-brand-accent' : ''}`} />
          </button>

          <button
            onClick={handleDownloadCSV}
            className="inline-flex items-center space-x-2 px-4 py-2.5 bg-brand-accent hover:bg-brand-accent-hover text-white rounded-xl font-sans font-bold text-xs uppercase tracking-wider shadow-sm hover:shadow transition-all cursor-pointer"
            id="download-csv-btn"
            title="Download CSV for end-of-day audits"
          >
            <Download className="w-4 h-4" />
            <span>Download CSV</span>
          </button>
        </div>
      </div>

      {/* Orders Responsive Table */}
      <div className="bg-white rounded-3xl border border-brand-border/40 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse" id="orders-main-table">
            <thead>
              <tr className="border-b border-brand-border/50 bg-[#FAF6F0] text-[10px] font-mono tracking-wider text-brand-text/60 uppercase">
                <th className="py-4 px-6 font-bold">Order ID</th>
                <th className="py-4 px-6 font-bold">Customer</th>
                <th className="py-4 px-6 font-bold">Items Tray</th>
                <th className="py-4 px-6 font-bold">Total (INR)</th>
                <th className="py-4 px-6 font-bold">Timestamp</th>
                <th className="py-4 px-6 font-bold">Status Action</th>
                <th className="py-4 px-6 font-bold text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/30 text-xs">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 px-6 text-center text-brand-text/40 font-mono">
                    <ShoppingBag className="w-8 h-8 text-brand-accent/25 mx-auto mb-3" />
                     No orders match the current filter parameters.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#FAF6F0]/30 transition-colors" id={`order-row-${order.id}`}>
                    {/* ID */}
                    <td className="py-4 px-6 font-mono font-semibold text-brand-accent text-xs">
                      {order.id}
                    </td>

                    {/* Customer */}
                    <td className="py-4 px-6 text-brand-text">
                      <div className="font-semibold text-sm">{order.customer_name}</div>
                    </td>

                    {/* Items brief */}
                    <td className="py-4 px-6 max-w-xs text-brand-text/80 truncate font-sans">
                      {order.items.map((item, idx) => (
                        <span key={idx} className="inline-block bg-[#FAF6F0] border border-brand-border/60 text-[10px] rounded-md px-1.5 py-0.5 mr-1 mb-1">
                          {item.name} <span className="font-mono text-brand-accent font-bold">x{item.quantity}</span>
                        </span>
                      ))}
                    </td>

                    {/* Cost */}
                    <td className="py-4 px-6 font-mono font-bold text-[#C87D43] text-sm">
                      ₹{order.total_amount_inr}
                    </td>

                    {/* Created at */}
                    <td className="py-4 px-6 text-brand-text/60 font-mono text-[10px]">
                      {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>

                    {/* Status selection Dropdown */}
                    <td className="py-4 px-6">
                      <div className="relative inline-block text-left">
                        <select
                          value={order.status}
                          onChange={(e) => onUpdateStatus(order.id, '', e.target.value as Order['status'])}
                          className={`appearance-none pl-3 pr-8 py-1.5 border rounded-full font-mono text-[10px] font-bold uppercase tracking-wide focus:outline-none focus:ring-1 focus:ring-brand-accent cursor-pointer transition-colors ${getStatusStyle(order.status)}`}
                          style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%232A5C3D' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`, backgroundPosition: 'right 8px center', backgroundSize: '12px', backgroundRepeat: 'no-repeat' }}
                          title="Change status"
                          id={`status-dropdown-${order.id}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="preparing">Preparing</option>
                          <option value="ready">Ready</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                    </td>

                    {/* Detail pop up trigger */}
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => setSelectedOrderDetails(order)}
                        className="inline-flex items-center space-x-1 p-1 px-2.5 bg-[#FAF6F0] hover:bg-brand-accent/10 border border-brand-border text-brand-text/70 hover:text-brand-accent hover:border-brand-accent/20 rounded-lg transition-all cursor-pointer font-sans font-medium text-[10px] uppercase tracking-wider"
                        title="View order summary details"
                        id={`btn-view-${order.id}`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span className="hidden md:inline">Inspect</span>
                      </button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* INSPECT ORDER MODAL DETAIL OVERLAY */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" id="order-inspect-modal">
          <div className="bg-white rounded-3xl border border-brand-border max-w-lg w-full p-6 md:p-8 animate-scale-up shadow-2xl relative overflow-hidden">
            {/* Soft decorative background tint */}
            <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#FAF6F0] to-transparent -z-10"></div>
            
            <header className="flex justify-between items-start pb-5 border-b border-brand-border mb-6">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#C87D43] font-bold">
                  Order Slip Receipt
                </span>
                <h4 className="font-serif text-2xl text-brand-text mt-1 font-bold">
                  Order {selectedOrderDetails.id}
                </h4>
              </div>
              <button 
                onClick={() => setSelectedOrderDetails(null)}
                className="p-1 px-2.5 rounded-lg border border-brand-border hover:bg-[#FAF6F0] font-sans text-xs text-brand-text/60 cursor-pointer"
                id="close-modal-btn"
              >
                Close
              </button>
            </header>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-brand-text/50 uppercase">Customer Name</label>
                  <p className="font-semibold text-sm text-brand-text">{selectedOrderDetails.customer_name}</p>
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-brand-text/50 uppercase">Order Created At</label>
                  <p className="font-mono text-xs text-brand-text/70">
                    {new Date(selectedOrderDetails.created_at).toLocaleString()}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-brand-text/50 uppercase mb-2">Detailed Items Row</label>
                <div className="bg-[#FAF6F0] border border-brand-border/60 rounded-xl divide-y divide-brand-border/30 overflow-hidden">
                  {selectedOrderDetails.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between p-3 text-xs align-middle">
                      <div>
                        <span className="font-semibold text-brand-text">{item.name}</span>
                        <span className="font-mono text-brand-accent font-bold ml-2">x{item.quantity}</span>
                      </div>
                      <span className="font-mono text-brand-text/70">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                  <div className="flex justify-between p-3 font-semibold bg-[#F1EBE1]/50">
                    <span>Total Bill (INR)</span>
                    <span className="font-mono text-base text-[#C87D43]">₹{selectedOrderDetails.total_amount_inr}</span>
                  </div>
                </div>
              </div>

              {/* Status Update shortcut */}
              <div className="pt-2">
                <label className="block text-[10px] font-mono text-brand-text/50 uppercase mb-2">Immediate Status Actions</label>
                <div className="flex gap-2">
                  {(['pending', 'preparing', 'ready', 'completed'] as const).map(st => (
                    <button
                      key={st}
                      onClick={() => {
                        onUpdateStatus(selectedOrderDetails.id, '', st);
                        setSelectedOrderDetails(prev => prev ? { ...prev, status: st } : null);
                      }}
                      className={`flex-1 py-1.5 rounded-lg font-mono text-[9px] uppercase tracking-wider font-extrabold border transition-all cursor-pointer ${
                        selectedOrderDetails.status === st
                          ? 'bg-brand-accent text-white border-brand-accent shadow-sm'
                          : 'bg-[#FAF6F0] border-brand-border text-brand-text/60 hover:text-brand-text'
                      }`}
                      id={`modal-action-${st}`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
