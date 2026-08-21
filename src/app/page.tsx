import Link from 'next/link'
import Image from 'next/image'
import Navigation from '@/components/Navigation'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#000000] text-zinc-300 font-sans selection:bg-blue-500/30">
      
      <Navigation />

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-24 pb-32 grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
            StoreTap v2.1.0 is Live
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter leading-[1.1] text-white">
            The Ultimate POS <br className="hidden md:block"/>& Inventory <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">System</span>
          </h1>
          <p className="text-lg text-zinc-400 max-w-xl leading-relaxed">
            Experience seamless sales, utang tracking, and real-time inventory management for your store.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <Link href="/login" className="w-full sm:w-auto px-6 py-3 rounded-lg bg-white text-black font-bold text-base hover:bg-zinc-200 transition-all text-center">
              Start for Free
            </Link>
            <Link href="/pricing" className="w-full sm:w-auto px-6 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-white font-medium text-base hover:bg-zinc-800 transition-all text-center">
              View Pricing
            </Link>
          </div>
        </div>
        
        {/* Mockup matching the StoreTap V2.1.0 app style */}
        <div className="relative z-10 lg:pl-4 mt-10 lg:mt-0">
          <div className="absolute inset-0 bg-blue-500/10 blur-[100px] -z-10 rounded-full"></div>
          <div className="bg-[#09090b] border border-zinc-800 rounded-3xl p-2 shadow-2xl relative overflow-hidden max-w-[340px] mx-auto lg:mx-0 ring-1 ring-white/5">
            <div className="bg-black rounded-[1.25rem] h-[600px] w-full overflow-hidden border border-zinc-800/50 flex flex-col relative shadow-inner">
              
              {/* Fake App Header */}
              <div className="h-14 border-b border-zinc-800/80 flex items-center justify-between px-5 bg-black/80 backdrop-blur-md z-20">
                <div className="flex items-center gap-2">
                  <Image src="/icon.svg" alt="StoreTap Logo" width={20} height={20} />
                  <div className="font-bold text-base tracking-tight text-white">StoreTap</div>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                  <span className="text-[10px] text-zinc-400 font-medium">Online</span>
                </div>
              </div>
              
              {/* Fake App Content */}
              <div className="p-4 flex-1 overflow-y-auto space-y-4">
                
                {/* Stats row */}
                <div className="grid grid-cols-2 gap-3">
                   <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/80">
                      <p className="text-[10px] font-medium text-zinc-500 mb-1">Today's Sales</p>
                      <p className="text-xl font-semibold text-white">₱4,250</p>
                   </div>
                   <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/80">
                      <p className="text-[10px] font-medium text-zinc-500 mb-1">Transactions</p>
                      <p className="text-xl font-semibold text-white">42</p>
                   </div>
                </div>

                {/* Main POS Card */}
                <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-xl p-4 mt-2">
                  <div className="flex justify-between items-center border-b border-zinc-800/80 pb-3 mb-3">
                    <span className="font-medium text-zinc-300 text-sm">Current Order</span>
                    <span className="text-xs font-medium px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-md">#1042</span>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-zinc-800 rounded-md flex items-center justify-center text-sm">🍔</div>
                        <div>
                          <p className="text-sm font-medium text-zinc-200">Classic Burger</p>
                          <p className="text-xs text-zinc-500">x2</p>
                        </div>
                      </div>
                      <p className="font-medium text-zinc-200 text-sm">₱240</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-zinc-800 rounded-md flex items-center justify-center text-sm">🥤</div>
                        <div>
                          <p className="text-sm font-medium text-zinc-200">Iced Cola</p>
                          <p className="text-xs text-zinc-500">x1</p>
                        </div>
                      </div>
                      <p className="font-medium text-zinc-200 text-sm">₱45</p>
                    </div>
                  </div>

                  <div className="border-t border-zinc-800/80 pt-3 flex justify-between items-center mb-4">
                    <span className="font-medium text-zinc-500 text-sm">Total</span>
                    <span className="font-semibold text-white text-xl">₱285</span>
                  </div>

                  <button className="w-full py-2.5 bg-white text-black text-sm font-bold rounded-lg hover:bg-zinc-200 transition-colors">
                    Pay Now
                  </button>
                </div>

              </div>
              
              {/* Fake Bottom Nav */}
              <div className="h-14 bg-black border-t border-zinc-800/80 flex items-center justify-around px-2">
                <div className="p-2 text-white flex flex-col items-center">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
                </div>
                <div className="p-2 text-zinc-600 flex flex-col items-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                </div>
                <div className="p-2 text-zinc-600 flex flex-col items-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

    </div>
  )
}
