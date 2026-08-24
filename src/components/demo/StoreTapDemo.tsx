"use client";

import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, ShoppingCart, Package, ListOrdered, DollarSign, Clock, RefreshCw, CheckCircle2 } from 'lucide-react';

// --- Types ---
type Product = { id: string; name: string; price: number; stock: number; icon: string; category: string };
type CartItem = { product: Product; qty: number };
type Sale = { id: string; total: number; date: Date; items: number; synced: boolean };

// --- Initial Data ---
const INITIAL_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Premium Rice 1kg', price: 55, stock: 45, icon: '🍚', category: 'Grocery' },
  { id: 'p2', name: 'Canned Sardines', price: 23, stock: 120, icon: '🐟', category: 'Canned Goods' },
  { id: 'p3', name: 'Instant Noodles', price: 15, stock: 85, icon: '🍜', category: 'Grocery' },
  { id: 'p4', name: 'Cola 1L', price: 45, stock: 30, icon: '🥤', category: 'Drinks' },
  { id: 'p5', name: 'Cooking Oil 500ml', price: 35, stock: 25, icon: '🛢️', category: 'Grocery' },
  { id: 'p6', name: 'Detergent Powder', price: 12, stock: 50, icon: '🧼', category: 'Household' },
];

export default function StoreTapDemo() {
  // --- State ---
  const [isOnline, setIsOnline] = useState(true);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'inventory' | 'sales'>('dashboard');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showSyncSuccess, setShowSyncSuccess] = useState(false);
  
  // Real-time clock
  const [time, setTime] = useState('');
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Sync Logic
  useEffect(() => {
    if (isOnline) {
      const unsyncedSales = sales.filter(s => !s.synced);
      if (unsyncedSales.length > 0 && !isSyncing) {
        setIsSyncing(true);
        // Simulate network delay for sync
        setTimeout(() => {
          setSales(prev => prev.map(s => ({ ...s, synced: true })));
          setIsSyncing(false);
          setShowSyncSuccess(true);
          setTimeout(() => setShowSyncSuccess(false), 3000);
        }, 1500);
      }
    }
  }, [isOnline, sales, isSyncing]);

  // --- Handlers ---
  const addToCart = (product: Product) => {
    if (product.stock <= 0) return;
    
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        if (existing.qty >= product.stock) return prev;
        return prev.map(item => item.product.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { product, qty: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const processSale = () => {
    if (cart.length === 0) return;

    const total = cart.reduce((sum, item) => sum + (item.product.price * item.qty), 0);
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

    // Deduct stock
    setProducts(prev => prev.map(p => {
      const cartItem = cart.find(c => c.product.id === p.id);
      return cartItem ? { ...p, stock: p.stock - cartItem.qty } : p;
    }));

    // Create sale record
    const newSale: Sale = {
      id: Math.random().toString(36).substring(7),
      total,
      date: new Date(),
      items: totalItems,
      synced: isOnline // If online, synced immediately. If offline, false.
    };

    setSales(prev => [newSale, ...prev]);
    setCart([]);
  };

  const unsyncedCount = sales.filter(s => !s.synced).length;
  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.qty), 0);

  return (
    <div className="w-full max-w-5xl mx-auto my-16">
      
      {/* External Control Panel (The Simulator Controls) */}
      <div className="mb-8 p-6 bg-[#09090b] border border-zinc-800 rounded-2xl shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <span className="text-blue-500">🎮</span> Interactive Simulator
            </h3>
            <p className="text-zinc-400 text-sm">
              Experience the system yourself. Try turning off the internet below, making a sale, and turning it back on to see our seamless background sync in action!
            </p>
          </div>
          
          <div className="flex items-center gap-4 bg-zinc-900 p-3 rounded-xl border border-zinc-800">
            <span className="text-sm font-medium text-zinc-300">Network Connection:</span>
            <button 
              onClick={() => setIsOnline(!isOnline)}
              className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none ${isOnline ? 'bg-emerald-500' : 'bg-red-500'}`}
            >
              <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${isOnline ? 'translate-x-8' : 'translate-x-1'}`} />
            </button>
            <span className={`text-sm font-bold w-16 ${isOnline ? 'text-emerald-500' : 'text-red-500'}`}>
              {isOnline ? 'ONLINE' : 'OFFLINE'}
            </span>
          </div>
        </div>
      </div>

      {/* The Computer Frame */}
      <div className="relative rounded-2xl overflow-hidden border-[8px] border-[#1e1e21] shadow-2xl bg-[#0d1117] flex flex-col h-[700px]">
        
        {/* System Header (Top Bar) */}
        <header className="h-14 bg-[#161b22] border-b border-zinc-800 flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-white font-bold tracking-wide ml-4">STORETAP</span>
            <span className="text-xs px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded border border-blue-500/30">v2.1</span>
          </div>
          
          <div className="flex items-center gap-4 text-sm font-medium">
            
            {/* Sync Indicators */}
            {isSyncing && (
              <div className="flex items-center gap-2 text-blue-400 bg-blue-400/10 px-3 py-1.5 rounded-full border border-blue-400/20">
                <RefreshCw size={14} className="animate-spin" />
                <span className="text-xs">Syncing...</span>
              </div>
            )}
            
            {showSyncSuccess && (
              <div className="flex items-center gap-2 text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-full border border-emerald-400/20 animate-pulse">
                <CheckCircle2 size={14} />
                <span className="text-xs">Synced!</span>
              </div>
            )}

            {!isOnline && unsyncedCount > 0 && (
              <div className="flex items-center gap-2 text-amber-500 bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20">
                <WifiOff size={14} />
                <span className="text-xs">Pending: {unsyncedCount}</span>
              </div>
            )}

            <div className="flex items-center gap-2 text-zinc-300 bg-zinc-800/50 px-3 py-1.5 rounded-full">
              <Clock size={14} />
              <span>{time}</span>
            </div>
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${isOnline ? 'text-emerald-400 bg-emerald-400/10 border border-emerald-400/20' : 'text-red-400 bg-red-400/10 border border-red-400/20'}`}>
              {isOnline ? <Wifi size={14} /> : <WifiOff size={14} />}
              <span className="text-xs font-bold uppercase">{isOnline ? 'Online' : 'Offline'}</span>
            </div>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar Navigation */}
          <aside className="w-16 md:w-56 bg-[#161b22] border-r border-zinc-800 flex flex-col py-4 shrink-0">
            <nav className="flex flex-col gap-2 px-2 md:px-3">
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
              >
                <ShoppingCart size={20} />
                <span className="hidden md:inline font-medium">Dashboard</span>
              </button>
              <button 
                onClick={() => setActiveTab('inventory')}
                className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${activeTab === 'inventory' ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
              >
                <Package size={20} />
                <span className="hidden md:inline font-medium">Inventory</span>
              </button>
              <button 
                onClick={() => setActiveTab('sales')}
                className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${activeTab === 'sales' ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
              >
                <ListOrdered size={20} />
                <span className="hidden md:inline font-medium">Sales Records</span>
                {!isOnline && unsyncedCount > 0 && (
                  <span className="hidden md:flex ml-auto bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {unsyncedCount}
                  </span>
                )}
              </button>
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 bg-[#0d1117] flex overflow-hidden">
            
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <>
                {/* Product Grid */}
                <div className="flex-1 p-6 overflow-y-auto">
                  <h2 className="text-xl font-bold text-white mb-6">Point of Sale</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {products.map(p => (
                      <div 
                        key={p.id}
                        onClick={() => addToCart(p)}
                        className={`bg-[#161b22] border ${p.stock > 0 ? 'border-zinc-700 hover:border-blue-500 cursor-pointer hover:shadow-lg' : 'border-red-900/50 opacity-50 cursor-not-allowed'} rounded-xl p-4 transition-all flex flex-col items-center text-center group`}
                      >
                        <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{p.icon}</div>
                        <h4 className="text-zinc-200 font-medium mb-1 leading-tight">{p.name}</h4>
                        <div className="text-emerald-400 font-bold mb-2">₱{p.price.toFixed(2)}</div>
                        <div className={`text-xs px-2 py-1 rounded-md ${p.stock > 0 ? 'bg-zinc-800 text-zinc-400' : 'bg-red-500/20 text-red-400'}`}>
                          {p.stock > 0 ? `${p.stock} in stock` : 'Out of Stock'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cart Sidebar */}
                <div className="w-80 bg-[#161b22] border-l border-zinc-800 flex flex-col shrink-0">
                  <div className="p-4 border-b border-zinc-800 bg-[#0d1117]">
                    <h3 className="text-lg font-bold text-white">Current Order</h3>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {cart.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-zinc-500">
                        <ShoppingCart size={40} className="mb-3 opacity-20" />
                        <p>Cart is empty</p>
                      </div>
                    ) : (
                      cart.map(item => (
                        <div key={item.product.id} className="flex items-center justify-between bg-[#0d1117] p-3 rounded-lg border border-zinc-800">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">{item.product.icon}</div>
                            <div>
                              <div className="text-sm font-medium text-white truncate max-w-[120px]">{item.product.name}</div>
                              <div className="text-xs text-zinc-400">₱{item.product.price} × {item.qty}</div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <span className="font-bold text-emerald-400">₱{(item.product.price * item.qty).toFixed(2)}</span>
                            <button onClick={() => removeFromCart(item.product.id)} className="text-xs text-red-400 hover:text-red-300">Remove</button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  
                  <div className="p-4 border-t border-zinc-800 bg-[#0d1117]">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-zinc-400">Total</span>
                      <span className="text-2xl font-bold text-white">₱{cartTotal.toFixed(2)}</span>
                    </div>
                    <button 
                      onClick={processSale}
                      disabled={cart.length === 0}
                      className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors ${cart.length === 0 ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg'}`}
                    >
                      <DollarSign size={20} />
                      Pay Cash
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Inventory Tab */}
            {activeTab === 'inventory' && (
              <div className="flex-1 p-6 overflow-y-auto">
                <h2 className="text-xl font-bold text-white mb-6">Inventory Management</h2>
                <div className="bg-[#161b22] rounded-xl border border-zinc-800 overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#0d1117] border-b border-zinc-800">
                        <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Product</th>
                        <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Category</th>
                        <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Price</th>
                        <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Stock</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                      {products.map(p => (
                        <tr key={p.id} className="hover:bg-zinc-800/30">
                          <td className="p-4 flex items-center gap-3">
                            <span className="text-2xl">{p.icon}</span>
                            <span className="text-sm font-medium text-white">{p.name}</span>
                          </td>
                          <td className="p-4 text-sm text-zinc-400">{p.category}</td>
                          <td className="p-4 text-sm text-emerald-400 font-medium">₱{p.price.toFixed(2)}</td>
                          <td className="p-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${p.stock > 10 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                              {p.stock}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Sales Tab */}
            {activeTab === 'sales' && (
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-white">Recent Sales</h2>
                  {!isOnline && unsyncedCount > 0 && (
                    <div className="bg-amber-500/10 border border-amber-500/20 text-amber-500 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2">
                      <WifiOff size={16} />
                      {unsyncedCount} sales pending sync
                    </div>
                  )}
                </div>
                
                {sales.length === 0 ? (
                  <div className="text-center text-zinc-500 mt-20">
                    <ListOrdered size={48} className="mx-auto mb-4 opacity-20" />
                    <p>No sales recorded yet.</p>
                  </div>
                ) : (
                  <div className="bg-[#161b22] rounded-xl border border-zinc-800 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#0d1117] border-b border-zinc-800">
                          <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Receipt ID</th>
                          <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Time</th>
                          <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Items</th>
                          <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Total</th>
                          <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800">
                        {sales.map(s => (
                          <tr key={s.id} className="hover:bg-zinc-800/30">
                            <td className="p-4 text-sm font-medium text-white">#{s.id.toUpperCase()}</td>
                            <td className="p-4 text-sm text-zinc-400">{s.date.toLocaleTimeString()}</td>
                            <td className="p-4 text-sm text-zinc-400">{s.items}</td>
                            <td className="p-4 text-sm font-bold text-emerald-400">₱{s.total.toFixed(2)}</td>
                            <td className="p-4">
                              {s.synced ? (
                                <span className="inline-flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                                  <CheckCircle2 size={12} /> Synced
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-xs text-amber-500 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20">
                                  <WifiOff size={12} /> Offline
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
}
