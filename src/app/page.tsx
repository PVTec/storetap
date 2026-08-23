import Link from 'next/link'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import prisma from '@/lib/prisma'

export default async function LandingPage() {

  const uniqueUsers = await prisma.license.findMany({
    select: { userId: true },
    distinct: ['userId']
  })

  const approvedSystems = await prisma.systemRequest.count({
    where: { status: 'approved' }
  })

  // Real stats
  const activeUsers = uniqueUsers.length
  const licenseCount = await prisma.license.count()
  const activeSystems = 5 + approvedSystems
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
            The Ultimate POS <br className="hidden md:block" />& Inventory <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">System</span>
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
          <p className="text-sm text-zinc-500 font-medium">
            <span className="text-emerald-500 font-bold">✓</span> Works on any device with a browser. No app download required!
          </p>

          <div className="flex items-center gap-10 pt-10">
            <div className="flex flex-col">
              <h3 className="text-3xl font-bold text-white">{activeSystems}+</h3>
              <p className="text-zinc-500 font-bold text-[10px] tracking-widest uppercase mt-1">Active Systems</p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-3xl font-bold text-white">{licenseCount}+</h3>
              <p className="text-zinc-500 font-bold text-[10px] tracking-widest uppercase mt-1">Licensed Stores</p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-3xl font-bold text-white">{activeUsers}+</h3>
              <p className="text-zinc-500 font-bold text-[10px] tracking-widest uppercase mt-1">Active Users</p>
            </div>
          </div>
        </div>

        {/* Mockup matching the StoreTap V2.1.0 app style */}
        <div className="relative z-10 lg:pl-4 mt-10 lg:mt-0">
          <div className="absolute -inset-10 bg-blue-600/30 blur-[80px] md:blur-[100px] md:bg-blue-500/20 -z-10 rounded-full"></div>
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
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg>
                </div>
                <div className="p-2 text-zinc-600 flex flex-col items-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                </div>
                <div className="p-2 text-zinc-600 flex flex-col items-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* Core Features Overview */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter text-white mb-16">
          Everything You Need to Run Your Business
        </h2>
        <div className="grid md:grid-cols-3 gap-6 text-left">
          <div className="bg-[#09090b] p-8 rounded-2xl border border-zinc-800/80 shadow-lg hover:border-zinc-700 transition-colors group">
            <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-3">Smart POS</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Lightning-fast checkout through seamless tapping. No barcodes or QR codes needed. Just tap product cards and utilize our quick change calculators designed for busy stores.
            </p>
          </div>
          <div className="bg-[#09090b] p-8 rounded-2xl border border-zinc-800/80 shadow-lg hover:border-zinc-700 transition-colors group">
            <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-3">Utang Tracking</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Easily record partial payments, track full history, and manage customer credit without the hassle of a notebook.
            </p>
          </div>
          <div className="bg-[#09090b] p-8 rounded-2xl border border-zinc-800/80 shadow-lg hover:border-zinc-700 transition-colors group">
            <div className="w-12 h-12 bg-pink-500/10 border border-pink-500/20 text-pink-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-3">Inventory Sync</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Work completely offline. The moment your internet is back, all your inventory adjustments and sales sync to the cloud.
            </p>
          </div>
        </div>
        <div className="mt-16">
          <Link href="/features" className="text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-2 font-medium">
            See all features
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </Link>
        </div>
      </section>

      {/* Founder Teaser Section */}
      <section className="border-t border-zinc-800/80 bg-zinc-950 px-6 py-24 relative overflow-hidden">
        {/* Subtle accent glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/5 blur-[100px] -z-10 rounded-full" />
        
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* Founder Image */}
          <div className="w-40 h-40 md:w-56 md:h-56 shrink-0 relative rounded-full overflow-hidden border-2 border-zinc-800 shadow-xl ring-2 ring-indigo-500/20">
            <Image 
              src="/founder.png" 
              alt="Vincent Layon - Founder" 
              fill
              className="object-cover object-top"
            />
          </div>
          
          {/* Content */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Meet the Founder</h2>
            <h3 className="text-lg text-indigo-400 font-medium mb-6">Vincent Layon (Vince)</h3>
            
            <blockquote className="relative italic text-zinc-400 text-lg md:text-xl leading-relaxed border-l-2 border-indigo-500/50 pl-6 mb-8">
              <span className="text-4xl text-indigo-500/20 absolute -top-4 -left-4 font-serif">"</span>
              StoreTap was not built primarily to make money, but to help local stores transition into the digital era... We help them, and in turn, they help us.
            </blockquote>
            
            <Link href="/about" className="px-6 py-3 rounded-full bg-zinc-900 border border-zinc-800 text-white font-medium hover:bg-zinc-800 transition-colors inline-flex items-center gap-2">
              Read Full Story & View Credentials
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
