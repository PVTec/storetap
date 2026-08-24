"use client";

import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, RefreshCw, CheckCircle2, User, Menu, Search, Filter, Plus, Trash2, Edit } from 'lucide-react';

// --- Types ---
type Product = { id: string; name: string; price: number; stock: number; initialStock: number; icon: string; category: string };
type CartItem = { product: Product; qty: number };
type Sale = { id: string; total: number; items: number; synced: boolean; date: Date };
type Utang = { id: string; customerName: string; productName: string; qty: number; total: number; remaining: number; dueDate: string; status: 'Unpaid' | 'Partial' | 'Paid'; date: Date };
type Tab = 'dashboard' | 'products' | 'utang' | 'inventory' | 'sales' | 'reports';

// --- Initial Data ---
const INITIAL_PRODUCTS: Product[] = [
  { id: '1', name: 'Premium Rice 1kg', price: 55, stock: 45, initialStock: 50, icon: '🍚', category: 'Grocery' },
  { id: '2', name: 'Canned Sardines', price: 23, stock: 120, initialStock: 150, icon: '🐟', category: 'Canned Goods' },
  { id: '3', name: 'Instant Noodles', price: 15, stock: 85, initialStock: 100, icon: '🍜', category: 'Grocery' },
  { id: '4', name: 'Cola 1L', price: 45, stock: 30, initialStock: 40, icon: '🥤', category: 'Drinks' },
  { id: '5', name: 'Cooking Oil 500ml', price: 35, stock: 25, initialStock: 30, icon: '🛢️', category: 'Grocery' },
  { id: '6', name: 'Detergent Powder', price: 12, stock: 0, initialStock: 50, icon: '🧼', category: 'Household' },
];

export default function StoreTapDemo() {
  const [isOnline, setIsOnline] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // State
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [utangs, setUtangs] = useState<Utang[]>([]);
  
  // Modals & UI State
  const [fastSaleMode, setFastSaleMode] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showSyncSuccess, setShowSyncSuccess] = useState(false);
  
  // Utang Modal State
  const [showUtangModal, setShowUtangModal] = useState(false);
  const [selectedUtangProduct, setSelectedUtangProduct] = useState<Product | null>(null);
  const [utangForm, setUtangForm] = useState({ customerName: '', dueDate: '' });
  
  // Add Product Form State
  const [newProductForm, setNewProductForm] = useState({ name: '', price: '', stock: '', category: 'Grocery' });

  // Sync Simulation
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

  // --- Handlers ---
  const handleNavClick = (tab: Tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

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
    setProducts(prev => prev.map(p => p.id === product.id ? { ...p, stock: p.stock - 1 } : p));
    setSales(prev => [{
      id: Math.random().toString(36).substring(7).toUpperCase(),
      total: product.price,
      items: 1,
      synced: isOnline,
      date: new Date()
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
      id: Math.random().toString(36).substring(7).toUpperCase(),
      total,
      items,
      synced: isOnline,
      date: new Date()
    }, ...prev]);
    
    setCart([]);
    setFastSaleMode(false);
  };

  const openUtangModal = (product: Product) => {
    setSelectedUtangProduct(product);
    setShowUtangModal(true);
    setUtangForm({ customerName: '', dueDate: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0] });
  };

  const saveUtang = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUtangProduct) return;

    setProducts(prev => prev.map(p => p.id === selectedUtangProduct.id ? { ...p, stock: p.stock - 1 } : p));
    
    setUtangs(prev => [{
      id: Math.random().toString(36).substring(7).toUpperCase(),
      customerName: utangForm.customerName,
      productName: selectedUtangProduct.name,
      qty: 1,
      total: selectedUtangProduct.price,
      remaining: selectedUtangProduct.price,
      dueDate: utangForm.dueDate,
      status: 'Unpaid',
      date: new Date()
    }, ...prev]);
    
    setShowUtangModal(false);
  };

  const addNewProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newProd: Product = {
      id: Math.random().toString(36).substring(7),
      name: newProductForm.name,
      price: parseFloat(newProductForm.price),
      stock: parseInt(newProductForm.stock),
      initialStock: parseInt(newProductForm.stock),
      category: newProductForm.category,
      icon: '📦'
    };
    setProducts([...products, newProd]);
    setNewProductForm({ name: '', price: '', stock: '', category: 'Grocery' });
  };

  // --- Derived Stats ---
  const totalSalesCount = sales.length;
  const totalIncome = sales.reduce((sum, s) => sum + s.total, 0);
  const totalUtangCount = utangs.filter(u => u.status !== 'Paid').length;
  
  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.qty), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const unsyncedCount = sales.filter(s => !s.synced).length;
  const lowStockCount = products.filter(p => p.stock > 0 && p.stock <= 5).length;

  const totalInventoryUnits = products.reduce((sum, p) => sum + p.stock, 0);
  const totalExpectedIncome = products.reduce((sum, p) => sum + (p.stock * p.price), 0);

  // --- Shared Components ---
  const NavItem = ({ tab, label }: { tab: Tab, label: string }) => (
    <div 
      onClick={() => handleNavClick(tab)}
      className={`px-3 py-1.5 font-medium text-sm rounded-lg cursor-pointer transition-colors ${activeTab === tab ? 'text-gray-900 bg-[#fafafa]' : 'text-gray-500 hover:text-gray-900 hover:bg-[#fafafa]'}`}
    >
      {label}
    </div>
  );

  return (
    <div className="w-full max-w-5xl mx-auto my-16 font-sans">
      
      {/* Simulator Controls */}
      <div className="mb-8 p-6 bg-[#09090b] border border-zinc-800 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative z-20">
        <div>
          <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            <span className="text-blue-500">🎮</span> Full Application Clone
          </h3>
          <p className="text-zinc-400 text-sm">
            Experience the complete StoreTap system. Navigate through all pages, add products, make sales, and record utang offline!
          </p>
        </div>
        
        <div className="flex items-center gap-4 bg-zinc-900 p-3 rounded-xl border border-zinc-800 shrink-0">
          <span className="text-sm font-medium text-zinc-300">Network:</span>
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

      {/* The App Frame */}
      <div className="relative rounded-2xl overflow-hidden border-[12px] border-[#1e1e21] shadow-2xl bg-white h-[750px] flex flex-col">
        <div className="flex-1 overflow-y-auto bg-[#fafafa] text-[#1a1a1a] relative">
          
          {/* Top Navbar */}
          <nav className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-40 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2">
              <button className="lg:hidden text-gray-500" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <Menu size={24} />
              </button>
              <div className="font-bold text-xl text-[#1a1a1a] tracking-tight flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-sm">S</div>
                StoreTap
              </div>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              <NavItem tab="dashboard" label="Dashboard" />
              <NavItem tab="products" label="Products" />
              <NavItem tab="utang" label="Utang" />
              <NavItem tab="inventory" label="Inventory" />
              <NavItem tab="sales" label="Sales" />
              <NavItem tab="reports" label="Reports" />
            </div>

            {/* Status & User */}
            <div className="flex items-center gap-3">
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
              </div>
            </div>
          </nav>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="lg:hidden absolute top-[60px] left-0 w-64 h-full bg-white border-r border-gray-200 z-50 shadow-xl flex flex-col p-4">
              <div className="flex flex-col gap-2">
                <NavItem tab="dashboard" label="Dashboard" />
                <NavItem tab="products" label="Products" />
                <NavItem tab="utang" label="Utang" />
                <NavItem tab="inventory" label="Inventory" />
                <NavItem tab="sales" label="Sales" />
                <NavItem tab="reports" label="Reports" />
              </div>
            </div>
          )}

          {/* Main Content Area */}
          <div className="p-4 lg:p-6 max-w-7xl mx-auto pb-20">
            
            {/* VIEW: DASHBOARD */}
            {activeTab === 'dashboard' && (
              <>
                <div className="grid grid-cols-3 gap-2 md:gap-4 mb-4">
                  <div className="bg-white border border-gray-200 p-4 rounded-xl">
                    <div className="text-sm font-medium text-gray-500">Sales</div>
                    <div className="text-2xl font-bold text-[#1a1a1a]">{totalSalesCount}</div>
                  </div>
                  <div className="bg-white border border-gray-200 p-4 rounded-xl">
                    <div className="text-sm font-medium text-gray-500">Income</div>
                    <div className="text-2xl font-bold text-[#1a1a1a]">₱{totalIncome.toLocaleString()}</div>
                  </div>
                  <div className="bg-white border border-gray-200 p-4 rounded-xl">
                    <div className="text-sm font-medium text-gray-500">Utang</div>
                    <div className="text-2xl font-bold text-[#1a1a1a]">{totalUtangCount}</div>
                  </div>
                </div>

                <div className="flex justify-between items-center flex-wrap gap-2 mb-4">
                  <small className="text-gray-500">Recent activity available for undo</small>
                  <div className="flex gap-2">
                    <button onClick={() => setFastSaleMode(!fastSaleMode)} className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${fastSaleMode ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
                      🛒 Fast Sale
                    </button>
                  </div>
                </div>

                {fastSaleMode && (
                  <div className="bg-[#eff6ff] border border-[#bfdbfe] text-[#1e40af] p-4 rounded-xl mb-4 flex justify-between items-center">
                    <span><strong>Fast Sale Mode:</strong> <span>{cartCount}</span> items in cart</span>
                    <div className="flex gap-2">
                      <button onClick={() => setCart([])} className="px-3 py-1.5 text-sm font-medium border border-[#bfdbfe] hover:bg-[#dbeafe] rounded-lg">Clear</button>
                      <button onClick={processCartSale} className="px-3 py-1.5 text-sm font-medium bg-[#10b981] text-white hover:bg-[#059669] rounded-lg">Checkout ₱{cartTotal.toFixed(2)}</button>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold tracking-tight">Products</h2>
                  {lowStockCount > 0 && <span className="bg-red-100 text-red-600 px-2 py-1 rounded-md text-sm font-medium border border-red-200">{lowStockCount} low stock</span>}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
                  {products.map(p => (
                    <div key={p.id} className="bg-white border border-gray-200 p-4 rounded-xl flex flex-col">
                      <div className="w-full h-[120px] bg-[#f4f5f7] rounded-xl flex items-center justify-center mb-4 relative text-4xl">
                        {p.icon}
                        {cart.find(c => c.product.id === p.id) && fastSaleMode && (
                          <div className="absolute top-2 right-2 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-md">In Cart: {cart.find(c => c.product.id === p.id)?.qty}</div>
                        )}
                      </div>
                      <div className="flex flex-col flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h5 className="font-semibold text-base leading-tight">{p.name}</h5>
                          {p.stock <= 5 && <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${p.stock <= 0 ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>{p.stock <= 0 ? 'OUT' : 'LOW'}</span>}
                        </div>
                        <div className="text-lg font-bold mb-1">₱ {p.price.toFixed(2)}</div>
                        <div className="text-sm text-gray-500 mb-4">{p.stock} in stock</div>
                        <div className="mt-auto flex flex-col gap-2">
                          {fastSaleMode ? (
                            <button onClick={() => addToCart(p)} disabled={p.stock <= 0} className="w-full py-2 px-3 text-sm font-semibold rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50">Add to Cart</button>
                          ) : (
                            <button onClick={() => processNormalSale(p)} disabled={p.stock <= 0} className="w-full py-2 px-3 text-sm font-semibold rounded-lg bg-[#10b981] hover:bg-[#059669] text-white disabled:opacity-50">Cash Sale</button>
                          )}
                          <button onClick={() => openUtangModal(p)} disabled={p.stock <= 0} className="w-full py-2 px-3 text-sm font-semibold rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50">Record Utang</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* VIEW: UTANG RECORDS */}
            {activeTab === 'utang' && (
              <>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold tracking-tight mb-1">Utang Records</h2>
                  <p className="text-gray-500 text-sm">Track outstanding customer balances and payments.</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-[#fafafa] border-b border-gray-200 text-gray-500 font-semibold">
                        <tr>
                          <th className="p-4">Customer</th>
                          <th className="p-4">Product</th>
                          <th className="p-4">Total</th>
                          <th className="p-4">Remaining</th>
                          <th className="p-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {utangs.length === 0 ? (
                          <tr><td colSpan={5} className="text-center py-8 text-gray-500">No utang records yet.</td></tr>
                        ) : utangs.map(u => (
                          <tr key={u.id} className="hover:bg-gray-50">
                            <td className="p-4 font-medium">{u.customerName}</td>
                            <td className="p-4 text-gray-500">{u.productName}</td>
                            <td className="p-4">₱{u.total.toFixed(2)}</td>
                            <td className="p-4 font-bold text-red-500">₱{u.remaining.toFixed(2)}</td>
                            <td className="p-4"><span className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-xs font-bold">Unpaid</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {/* VIEW: INVENTORY */}
            {activeTab === 'inventory' && (
              <>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight mb-1">Inventory</h2>
                    <p className="text-gray-500 text-sm">View stock levels and low stock warnings.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white border border-gray-200 rounded-xl p-5 md:col-span-1 h-fit">
                    <div className="font-semibold text-gray-500 mb-4 text-sm">Inventory Summary</div>
                    <div className="flex justify-between py-2 border-b border-gray-100 text-sm"><span className="text-gray-500">Total Products</span><span className="font-semibold">{products.length}</span></div>
                    <div className="flex justify-between py-2 border-b border-gray-100 text-sm"><span className="text-gray-500">Current Stock</span><span className="font-semibold">{totalInventoryUnits}</span></div>
                    <div className="flex justify-between py-2 border-b border-gray-100 text-sm"><span className="text-gray-500">Expected Income</span><span className="font-semibold">₱{totalExpectedIncome.toFixed(2)}</span></div>
                  </div>
                  <div className="md:col-span-2 bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-[#fafafa] border-b border-gray-200 text-gray-500 font-semibold">
                          <tr><th className="p-4">Name</th><th className="p-4">Price</th><th className="p-4">Stock</th><th className="p-4">Status</th></tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {products.map(p => (
                            <tr key={p.id} className="hover:bg-gray-50">
                              <td className="p-4 font-medium">{p.name}</td>
                              <td className="p-4">₱{p.price.toFixed(2)}</td>
                              <td className="p-4">{p.stock}</td>
                              <td className="p-4">
                                {p.stock <= 0 ? <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold">Out</span> : 
                                 p.stock <= 5 ? <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-xs font-bold">Low</span> :
                                 <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs font-bold">OK</span>}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* VIEW: PRODUCTS */}
            {activeTab === 'products' && (
              <>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold tracking-tight mb-1">Manage Products</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="bg-white border border-gray-200 rounded-xl p-5 lg:col-span-1 h-fit">
                    <h5 className="font-bold mb-4">Add New Product</h5>
                    <form onSubmit={addNewProduct} className="space-y-4 text-sm">
                      <div>
                        <label className="block text-gray-500 mb-1 font-medium">Product Name</label>
                        <input required type="text" value={newProductForm.name} onChange={e=>setNewProductForm({...newProductForm, name: e.target.value})} className="w-full border border-gray-200 rounded-lg p-2 focus:border-blue-500 outline-none" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-gray-500 mb-1 font-medium">Price (₱)</label>
                          <input required type="number" min="0" value={newProductForm.price} onChange={e=>setNewProductForm({...newProductForm, price: e.target.value})} className="w-full border border-gray-200 rounded-lg p-2 focus:border-blue-500 outline-none" />
                        </div>
                        <div>
                          <label className="block text-gray-500 mb-1 font-medium">Initial Stock</label>
                          <input required type="number" min="0" value={newProductForm.stock} onChange={e=>setNewProductForm({...newProductForm, stock: e.target.value})} className="w-full border border-gray-200 rounded-lg p-2 focus:border-blue-500 outline-none" />
                        </div>
                      </div>
                      <button type="submit" className="w-full bg-[#1a1a1a] text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors">Add Product</button>
                    </form>
                  </div>
                  <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-[#fafafa] border-b border-gray-200 text-gray-500 font-semibold">
                        <tr><th className="p-4">Product</th><th className="p-4">Price</th><th className="p-4">Actions</th></tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {products.map(p => (
                          <tr key={p.id} className="hover:bg-gray-50">
                            <td className="p-4 flex items-center gap-3"><span className="text-2xl">{p.icon}</span><span className="font-medium">{p.name}</span></td>
                            <td className="p-4">₱{p.price.toFixed(2)}</td>
                            <td className="p-4"><button className="text-blue-500 text-xs font-semibold mr-3 hover:underline">Edit</button><button className="text-red-500 text-xs font-semibold hover:underline" onClick={() => setProducts(products.filter(x => x.id !== p.id))}>Delete</button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {/* VIEW: SALES */}
            {activeTab === 'sales' && (
              <>
                <div className="mb-6"><h2 className="text-2xl font-bold tracking-tight">Sales Records</h2></div>
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-[#fafafa] border-b border-gray-200 text-gray-500 font-semibold">
                      <tr><th className="p-4">Receipt ID</th><th className="p-4">Items</th><th className="p-4">Total</th><th className="p-4">Status</th></tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {sales.length === 0 ? <tr><td colSpan={4} className="text-center py-8 text-gray-500">No sales yet.</td></tr> : sales.map(s => (
                        <tr key={s.id} className="hover:bg-gray-50">
                          <td className="p-4 font-bold text-gray-600">#{s.id}</td>
                          <td className="p-4 text-gray-500">{s.items}</td>
                          <td className="p-4 font-bold text-emerald-600">₱{s.total.toFixed(2)}</td>
                          <td className="p-4">
                            {s.synced ? <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-md text-xs font-bold">Synced</span> : <span className="bg-red-100 text-red-700 px-2 py-1 rounded-md text-xs font-bold">Offline</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {/* VIEW: REPORTS */}
            {activeTab === 'reports' && (
              <>
                <div className="mb-6"><h2 className="text-2xl font-bold tracking-tight">Sales Report</h2></div>
                <div className="bg-white border border-gray-200 rounded-xl p-6 text-center mb-6">
                  <div className="text-gray-500 font-medium mb-2">Total Revenue (All Time)</div>
                  <div className="text-4xl font-bold text-emerald-600">₱{totalIncome.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6 text-center text-gray-500">
                  Select a date range to generate detailed charts. (Simulation only)
                </div>
              </>
            )}

          </div>

          {/* --- MODALS --- */}
          {/* Utang Modal */}
          {showUtangModal && (
            <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-200">
                <div className="flex justify-between items-center p-5 border-b border-gray-200">
                  <h5 className="font-bold text-lg">Record Utang</h5>
                  <button onClick={() => setShowUtangModal(false)} className="text-gray-400 hover:text-gray-700"><X size={20}/></button>
                </div>
                <form onSubmit={saveUtang}>
                  <div className="p-5 space-y-4">
                    <div>
                      <label className="block text-gray-500 mb-1 font-medium text-sm">Product</label>
                      <input type="text" disabled value={selectedUtangProduct?.name || ''} className="w-full border border-gray-200 bg-gray-50 rounded-lg p-2 outline-none text-sm" />
                    </div>
                    <div>
                      <label className="block text-gray-500 mb-1 font-medium text-sm">Customer Name</label>
                      <input required type="text" value={utangForm.customerName} onChange={e=>setUtangForm({...utangForm, customerName: e.target.value})} className="w-full border border-gray-200 rounded-lg p-2 focus:border-blue-500 outline-none text-sm" />
                    </div>
                    <div>
                      <label className="block text-gray-500 mb-1 font-medium text-sm">Due Date</label>
                      <input required type="date" value={utangForm.dueDate} onChange={e=>setUtangForm({...utangForm, dueDate: e.target.value})} className="w-full border border-gray-200 rounded-lg p-2 focus:border-blue-500 outline-none text-sm" />
                    </div>
                  </div>
                  <div className="p-5 border-t border-gray-200 flex justify-end gap-2 bg-[#fafafa]">
                    <button type="button" onClick={() => setShowUtangModal(false)} className="px-4 py-2 border border-gray-200 rounded-lg font-medium text-sm hover:bg-gray-50 text-gray-700">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-[#1a1a1a] text-white rounded-lg font-semibold text-sm hover:bg-gray-800">Save Utang</button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
