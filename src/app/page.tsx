import Link from 'next/link'
import Image from 'next/image'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 font-sans selection:bg-blue-100">
      
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto border-b border-slate-200/60 bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Image src="/icon.svg" alt="StoreTap Logo" width={36} height={36} className="text-blue-600" />
          <span className="text-xl font-bold tracking-tight text-slate-900">StoreTap</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-mono font-bold ml-1">v2.1.0</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-500">
          <Link href="/product" className="hover:text-blue-600 transition-colors">Product</Link>
          <Link href="/features" className="hover:text-blue-600 transition-colors">Features</Link>
          <Link href="/pricing" className="hover:text-blue-600 transition-colors">Pricing</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors hidden sm:block">
            Log in
          </Link>
          <Link href="/login" className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold shadow-sm hover:bg-blue-700 hover:shadow transition-all">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-20 pb-24 grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            The Future of Offline POS
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-[1.15] text-slate-900">
            Smart, Fast, and <br className="hidden md:block"/><span className="text-blue-600">Always Online.</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-xl leading-relaxed font-medium">
            StoreTap is the ultimate cloud-connected Point of Sale system with built-in remote monitoring, e-payments, inventory tracking, and offline capabilities.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-6">
            <Link href="/login" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-blue-600 text-white font-bold text-lg shadow-md hover:bg-blue-700 hover:-translate-y-0.5 transition-all text-center">
              Start Free Trial
            </Link>
            <Link href="/product" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-lg hover:bg-slate-50 hover:border-slate-300 transition-all text-center">
              Explore Product
            </Link>
          </div>
          
          <div className="flex items-center gap-4 pt-8 text-sm font-medium text-slate-400">
            <div className="flex items-center gap-1.5"><svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> No Credit Card Required</div>
            <div className="flex items-center gap-1.5"><svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Cancel Anytime</div>
          </div>
        </div>
        
        {/* Mockup matching the StoreTap V2.1.0 app style */}
        <div className="relative z-10 lg:pl-4">
          <div className="absolute inset-0 bg-blue-100/50 blur-3xl -z-10 rounded-full transform -translate-y-10 scale-110"></div>
          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-3 shadow-2xl relative overflow-hidden transform hover:-translate-y-2 transition-transform duration-500 max-w-sm mx-auto lg:mx-0">
            <div className="bg-[#fafafa] rounded-[2rem] h-[650px] w-full overflow-hidden border border-slate-100 flex flex-col relative shadow-inner">
              
              {/* Fake App Header */}
              <div className="h-16 border-b border-slate-200 flex items-center justify-between px-6 bg-white z-20">
                <div className="flex items-center gap-2">
                  <Image src="/icon.svg" alt="StoreTap Logo" width={24} height={24} />
                  <div className="font-extrabold text-lg tracking-tight text-slate-800">StoreTap</div>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">Online</span>
                </div>
              </div>
              
              {/* Fake App Content */}
              <div className="p-5 flex-1 overflow-y-auto space-y-4">
                
                {/* Stats row */}
                <div className="grid grid-cols-2 gap-3">
                   <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                      <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Today's Sales</p>
                      <p className="text-xl font-black text-slate-800">₱4,250</p>
                   </div>
                   <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                      <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Transactions</p>
                      <p className="text-xl font-black text-slate-800">42</p>
                   </div>
                </div>

                {/* Main POS Card */}
                <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4 mt-2">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <span className="font-bold text-slate-700">Current Order</span>
                    <span className="text-xs font-bold px-2 py-1 bg-blue-50 text-blue-600 rounded-lg">#1042</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-lg">🍔</div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">Classic Burger</p>
                          <p className="text-xs text-slate-500">x2</p>
                        </div>
                      </div>
                      <p className="font-bold text-slate-800">₱240</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-lg">🥤</div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">Iced Cola</p>
                          <p className="text-xs text-slate-500">x1</p>
                        </div>
                      </div>
                      <p className="font-bold text-slate-800">₱45</p>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-3 flex justify-between items-center">
                    <span className="font-bold text-slate-500 text-sm">Total</span>
                    <span className="font-black text-blue-600 text-2xl">₱285</span>
                  </div>

                  <button className="w-full py-3.5 bg-slate-900 text-white font-bold rounded-xl shadow-md mt-2">
                    Pay Now
                  </button>
                </div>

              </div>
              
              {/* Fake Bottom Nav */}
              <div className="h-16 bg-white border-t border-slate-200 flex items-center justify-around px-4">
                <div className="p-2 text-blue-600 flex flex-col items-center">
                  <svg className="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
                </div>
                <div className="p-2 text-slate-400 flex flex-col items-center">
                  <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                </div>
                <div className="p-2 text-slate-400 flex flex-col items-center">
                  <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

    </div>
  )
}
