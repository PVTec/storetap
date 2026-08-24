"use client";

import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, ShoppingCart, RefreshCw, CheckCircle2, ChevronDown, User, ListOrdered, Menu, Package, FileText, Settings, Key, X, Monitor } from 'lucide-react';

// --- Types ---
type Product = { id: string; name: string; price: number; stock: number; icon: string };
type CartItem = { product: Product; qty: number };
type Sale = { id: string; total: number; items: number; synced: boolean };

// --- Initial Data ---
const INITIAL_PRODUCTS: Product[] = [
  { id: '1', name: 'Premium Rice 1kg', price: 55, stock: 45, icon: '🍚' },
  { id: '2', name: 'Canned Sardines', price: 23, stock: 120, icon: '🐟' },
  { id: '3', name: 'Instant Noodles', price: 15, stock: 85, icon: '🍜' },
  { id: '4', name: 'Cola 1L', price: 45, stock: 30, icon: '🥤' },
  { id: '5', name: 'Cooking Oil 500ml', price: 35, stock: 25, icon: '🛢️' },
  { id: '6', name: 'Detergent Powder', price: 12, stock: 0, icon: '🧼' },
];

export default function StoreTapDemo() {
  const [isOnline, setIsOnline] = useState(true);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showSyncSuccess, setShowSyncSuccess] = useState(false);
  const [fastSaleMode, setFastSaleMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sync Logic Simulation
  useEffect(() => {
    if (isOnline) {
      const unsyncedSales = sales.filter(s => !s.synced);
      if (unsyncedSales.length > 0 && !isSyncing) {
        setIsSyncing(true);
        setTimeout(() => {
          setSales(prev => prev.map(s => ({ ...s, synced: true })));
          setIsSyncing(false);
          setShowSyncSuccess(true);
          setTimeout(() => setShowSyncSuccess(false), 3000);
        }, 1500);
      }
    }
  }, [isOnline, sales, isSyncing]);

  // Handlers
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

  const processNormalSale = (product: Product) => {
    if (product.stock <= 0) return;
    
    // Deduct stock
    setProducts(prev => prev.map(p => p.id === product.id ? { ...p, stock: p.stock - 1 } : p));
    
    // Record Sale
    setSales(prev => [{
      id: Math.random().toString(36).substring(7),
      total: product.price,
      items: 1,
      synced: isOnline
    }, ...prev]);
  };

  const processCartSale = () => {
    if (cart.length === 0) return;
    const total = cart.reduce((sum, item) => sum + (item.product.price * item.qty), 0);
    const items = cart.reduce((sum, item) => sum + item.qty, 0);

    setProducts(prev => prev.map(p => {
      const cartItem = cart.find(c => c.product.id === p.id);
      return cartItem ? { ...p, stock: p.stock - cartItem.qty } : p;
    }));

    setSales(prev => [{
      id: Math.random().toString(36).substring(7),
      total,
      items,
      synced: isOnline
    }, ...prev]);
    
    setCart([]);
    setFastSaleMode(false);
  };

  // Derived Stats
  const totalSales = sales.length;
  const totalIncome = sales.reduce((sum, s) => sum + s.total, 0);
  const totalUtang = 12; // Static mock
  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.qty), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const unsyncedCount = sales.filter(s => !s.synced).length;

  return (
    <div className="w-full max-w-5xl mx-auto my-16 font-sans">
      
      {/* External Control Panel (The Simulator Controls) */}
      <div className="mb-8 p-6 bg-[#09090b] border border-zinc-800 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative z-20">
        <div>
          <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            <span className="text-blue-500">🎮</span> Interactive UI Clone
          </h3>
          <p className="text-zinc-400 text-sm">
            This is a pixel-perfect React clone of the actual StoreTap interface. Try turning off the internet below, making a sale, and turning it back on!
          </p>
        </div>
        
        <div className="flex items-center gap-4 bg-zinc-900 p-3 rounded-xl border border-zinc-800 shrink-0">
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

      {/* The Computer Frame Wrapper */}
      <div className="relative rounded-2xl overflow-hidden border-[12px] border-[#1e1e21] shadow-2xl bg-white h-[750px] flex flex-col">
        
        {/* --- ACTUAL STORETAP UI CLONE STARTS HERE --- */}
        <div className="flex-1 overflow-y-auto bg-[#fafafa] text-[#1a1a1a]">
          
          {/* Top Navbar */}
          <nav className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button className="lg:hidden text-gray-500" onClick={() => setIsMobileMenuOpen(true)}>
                <Menu size={24} />
              </button>
              <div className="font-bold text-xl text-[#1a1a1a] tracking-tight flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-sm">S</div>
                StoreTap
              </div>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              <div className="px-3 py-1.5 text-gray-900 font-medium text-sm rounded-lg bg-[#fafafa]">Dashboard</div>
              <div className="px-3 py-1.5 text-gray-500 font-medium text-sm hover:text-gray-900 hover:bg-[#fafafa] rounded-lg cursor-pointer transition-colors">Products</div>
              <div className="px-3 py-1.5 text-gray-500 font-medium text-sm hover:text-gray-900 hover:bg-[#fafafa] rounded-lg cursor-pointer transition-colors">Utang</div>
              <div className="px-3 py-1.5 text-gray-500 font-medium text-sm hover:text-gray-900 hover:bg-[#fafafa] rounded-lg cursor-pointer transition-colors">Inventory</div>
              <div className="px-3 py-1.5 text-gray-500 font-medium text-sm hover:text-gray-900 hover:bg-[#fafafa] rounded-lg cursor-pointer transition-colors">Sales</div>
              <div className="px-3 py-1.5 text-gray-500 font-medium text-sm hover:text-gray-900 hover:bg-[#fafafa] rounded-lg cursor-pointer transition-colors">Reports</div>
            </div>

            {/* User Info / Offline Indicators */}
            <div className="flex items-center gap-3">
              {/* Sync Status Badge Simulator */}
              {!isOnline && (
                <div className="flex items-center gap-1.5 bg-red-100 text-red-600 px-2 py-1 rounded-md text-xs font-bold border border-red-200">
                  <WifiOff size={14} /> OFFLINE
                </div>
              )}
              {isOnline && unsyncedCount > 0 && isSyncing && (
                <div className="flex items-center gap-1.5 bg-blue-100 text-blue-600 px-2 py-1 rounded-md text-xs font-bold border border-blue-200">
                  <RefreshCw size={14} className="animate-spin" /> SYNCING
                </div>
              )}
              {isOnline && showSyncSuccess && (
                <div className="flex items-center gap-1.5 bg-emerald-100 text-emerald-600 px-2 py-1 rounded-md text-xs font-bold border border-emerald-200">
                  <CheckCircle2 size={14} /> SYNCED
                </div>
              )}

              <div className="hidden lg:flex items-center">
                <span className="text-gray-500 font-semibold text-sm mr-4 flex items-center gap-1"><User size={16}/> admin</span>
                <button className="border border-gray-200 text-[#1a1a1a] px-3 py-1 rounded-lg text-sm font-medium hover:bg-[#fafafa] transition-colors">Logout</button>
              </div>
            </div>
          </nav>

          {/* Main Content Area */}
          <div className="p-4 lg:p-6 max-w-7xl mx-auto">
            
            {/* Stat Cards */}
            <div className="grid grid-cols-3 gap-2 md:gap-4 mb-4">
              <div className="bg-white border border-gray-200 p-4 md:p-5 rounded-xl transition-transform hover:shadow-sm">
                <div className="text-sm font-medium text-gray-500">Sales</div>
                <div className="text-2xl md:text-3xl font-bold text-[#1a1a1a] tracking-tight">{totalSales}</div>
              </div>
              <div className="bg-white border border-gray-200 p-4 md:p-5 rounded-xl transition-transform hover:shadow-sm">
                <div className="text-sm font-medium text-gray-500">Income</div>
                <div className="text-2xl md:text-3xl font-bold text-[#1a1a1a] tracking-tight">₱{totalIncome.toLocaleString()}</div>
              </div>
              <div className="bg-white border border-gray-200 p-4 md:p-5 rounded-xl transition-transform hover:shadow-sm">
                <div className="text-sm font-medium text-gray-500">Utang</div>
                <div className="text-2xl md:text-3xl font-bold text-[#1a1a1a] tracking-tight">{totalUtang}</div>
              </div>
            </div>

            {/* Fast Sale / Undo Bar */}
            <div className="flex justify-between items-center flex-wrap gap-2 mb-4">
              <small className="text-gray-500">Recent activity available for undo</small>
              <div className="flex gap-2">
                <button 
                  onClick={() => setFastSaleMode(!fastSaleMode)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${fastSaleMode ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]' : 'border-gray-200 text-[#1a1a1a] bg-transparent hover:bg-[#fafafa]'}`}
                >
                  🛒 Fast Sale
                </button>
                <button className="px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-200 text-red-500 bg-transparent hover:bg-gray-50 transition-colors">
                  ↩️ Undo Last Sale
                </button>
              </div>
            </div>

            {/* Cart Indicator Alert */}
            {fastSaleMode && (
              <div className="bg-[#eff6ff] border border-[#bfdbfe] text-[#1e40af] p-4 rounded-xl mb-4 flex justify-between items-center">
                <span><strong>Fast Sale Mode:</strong> <span>{cartCount}</span> items in cart</span>
                <div className="flex gap-2">
                  <button onClick={() => setCart([])} className="px-3 py-1.5 text-sm font-medium border border-[#bfdbfe] text-[#1e40af] hover:bg-[#dbeafe] rounded-lg transition-colors">Clear</button>
                  <button onClick={processCartSale} className="px-3 py-1.5 text-sm font-medium bg-[#10b981] text-white hover:bg-[#059669] rounded-lg transition-colors">
                    Checkout ₱<span>{cartTotal.toFixed(2)}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Products Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-[#1a1a1a] tracking-tight">Products</h2>
              <span className="bg-red-100 text-red-600 px-2 py-1 rounded-md text-sm font-medium border border-red-200">1 low stock</span>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 pb-20">
              {products.map(p => (
                <div key={p.id} className="bg-white border border-gray-200 p-4 rounded-xl transition-shadow hover:shadow-md flex flex-col h-full">
                  
                  {/* Image Placeholder */}
                  <div className="w-full h-[120px] md:h-[150px] bg-[#f4f5f7] rounded-xl flex items-center justify-center mb-4 overflow-hidden relative">
                    <span className="text-4xl md:text-5xl">{p.icon}</span>
                    {cart.find(c => c.product.id === p.id) && fastSaleMode && (
                      <div className="absolute top-2 right-2 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
                        In Cart: {cart.find(c => c.product.id === p.id)?.qty}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-semibold text-base text-[#1a1a1a] leading-tight">{p.name}</h5>
                      {p.stock <= 5 && (
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${p.stock <= 0 ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
                          {p.stock <= 0 ? 'OUT' : 'LOW'}
                        </span>
                      )}
                    </div>
                    
                    <div className="text-lg font-bold text-[#1a1a1a] mb-1">₱ {p.price.toFixed(2)}</div>
                    <div className="text-sm text-gray-500 mb-4">{p.stock} in stock</div>
                    
                    <div className="mt-auto flex flex-col sm:flex-row gap-2">
                      {fastSaleMode ? (
                        <button 
                          onClick={() => addToCart(p)}
                          disabled={p.stock <= 0}
                          className="w-full py-2 px-3 text-sm font-semibold rounded-lg border border-gray-200 text-[#1a1a1a] hover:bg-[#fafafa] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          Add to Cart
                        </button>
                      ) : (
                        <button 
                          onClick={() => processNormalSale(p)}
                          disabled={p.stock <= 0}
                          className="w-full py-2 px-3 text-sm font-semibold rounded-lg bg-[#10b981] hover:bg-[#059669] text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          Cash Sale
                        </button>
                      )}
                      
                      <button 
                        disabled={p.stock <= 0}
                        className="w-full sm:w-auto py-2 px-3 text-sm font-semibold rounded-lg border border-gray-200 text-[#1a1a1a] hover:bg-[#fafafa] disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
                      >
                        Record Utang
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
      
      <div className="mt-6 flex items-center justify-center gap-2 text-sm text-zinc-500">
        <Monitor size={16} />
        <span>Pixel-perfect UI clone of StoreTap v2.1.0</span>
      </div>
    </div>
  );
}
