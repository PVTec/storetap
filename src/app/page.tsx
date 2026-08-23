import Link from 'next/link'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import PricingSection from '@/components/PricingSection'
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
  const activeSystemsCount = approvedSystems

  return (
    <div className="min-h-screen bg-[#000000] text-zinc-300 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <Navigation />
      
      <main className="pt-24 pb-24">
        {/* 1. Hero Section */}
        <section className="relative px-6 pt-16 pb-20 md:pt-32 md:pb-32 overflow-hidden max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
          
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter text-white mb-6 relative z-10 max-w-4xl">
            A Lightweight <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Offline & Utang</span> POS System
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl relative z-10">
            Built for sari-sari stores, cafés, food stalls, and local businesses. Sell even when the internet is down, track utang without a notebook, and know your stock at a glance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10 w-full sm:w-auto mb-6">
            <Link 
              href="#pricing"
              className="px-8 py-4 rounded-xl bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 transition-all shadow-[0_0_30px_rgba(37,99,235,0.25)] hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] flex items-center justify-center"
            >
              Start Free Demo
            </Link>
            <Link 
              href="#pricing"
              className="px-8 py-4 rounded-xl bg-zinc-900 text-white border border-zinc-800 font-bold text-lg hover:bg-zinc-800 transition-all flex items-center justify-center"
            >
              View System Pricing
            </Link>
            <Link 
              href="#action"
              className="px-8 py-4 rounded-xl bg-transparent text-white border border-zinc-700 font-bold text-lg hover:bg-zinc-900 transition-all flex items-center justify-center"
            >
              See How It Works
            </Link>
          </div>
          
          <p className="text-sm text-zinc-500 relative z-10 max-w-xl mx-auto leading-relaxed border border-zinc-800/50 bg-zinc-900/30 p-4 rounded-xl backdrop-blur-sm">
            No payment is required to request a demo or system. A provider will verify your details, prepare your system, and send payment instructions only when it is ready.
          </p>
          
          {/* Dashboard Preview / Mockup */}
          <div className="mt-20 w-full max-w-5xl relative z-10" style={{ perspective: '1000px' }}>
            <div className="relative rounded-2xl md:rounded-[2rem] overflow-hidden border border-zinc-800 bg-[#09090b] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform md:rotate-x-12 md:-translate-y-4 hover:rotate-x-0 hover:-translate-y-2 transition-transform duration-700 group cursor-default">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-50 group-hover:opacity-100 transition-opacity"></div>
              
              {/* Fake Browser Chrome */}
              <div className="p-3 md:p-4 bg-[#0f0f13] border-b border-zinc-800 flex items-center gap-2">
                <div className="flex gap-2 shrink-0">
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500/50"></div>
                </div>
                <div className="ml-4 h-6 w-full max-w-[200px] md:max-w-md bg-zinc-800/50 rounded flex items-center px-3 mx-auto md:mx-0">
                  <div className="text-[10px] md:text-xs text-zinc-500 font-mono overflow-hidden text-ellipsis whitespace-nowrap">storetap.app / dashboard</div>
                </div>
              </div>
              
              {/* Synthetic Mockup UI instead of an image to ensure it always looks good without an actual screenshot */}
              <div className="w-full h-auto min-h-[300px] md:min-h-[500px] bg-[#000000] p-4 md:p-8 flex flex-col md:flex-row gap-6 relative">
                
                {/* Sidebar mock */}
                <div className="w-48 hidden md:flex flex-col gap-4 border-r border-zinc-900 pr-6 shrink-0">
                  <div className="h-8 w-8 bg-blue-600 rounded-lg mb-4 shadow-[0_0_15px_rgba(37,99,235,0.5)]"></div>
                  <div className="h-4 bg-zinc-800 rounded w-full mb-2"></div>
                  <div className="h-4 bg-zinc-900 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-zinc-900 rounded w-5/6 mb-8"></div>
                  
                  <div className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mb-1">Store</div>
                  <div className="h-8 bg-blue-600/10 border border-blue-500/20 rounded-md w-full mb-2 flex items-center px-3">
                    <div className="h-2 bg-blue-500/50 rounded w-1/2"></div>
                  </div>
                  <div className="h-8 bg-zinc-900/50 rounded-md w-full mb-2"></div>
                  <div className="h-8 bg-zinc-900/50 rounded-md w-full"></div>
                </div>
                
                {/* Main content mock */}
                <div className="flex-1 flex flex-col gap-6">
                  {/* Top nav mock */}
                  <div className="h-10 flex justify-between items-center w-full mb-2">
                    <div className="h-6 bg-zinc-800 rounded w-32 md:w-48"></div>
                    <div className="flex gap-3">
                      <div className="h-8 w-8 bg-zinc-900 rounded-full"></div>
                      <div className="h-8 w-8 bg-zinc-800 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Stats row */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="h-24 bg-[#09090b] border border-zinc-800/80 rounded-xl p-4 flex flex-col justify-between">
                       <div className="h-2 bg-zinc-700 rounded w-1/2"></div>
                       <div className="h-6 bg-white rounded w-3/4"></div>
                    </div>
                    <div className="h-24 bg-[#09090b] border border-zinc-800/80 rounded-xl p-4 flex flex-col justify-between">
                       <div className="h-2 bg-zinc-700 rounded w-1/2"></div>
                       <div className="h-6 bg-emerald-500 rounded w-3/4"></div>
                    </div>
                    <div className="h-24 bg-[#09090b] border border-zinc-800/80 rounded-xl p-4 flex flex-col justify-between">
                       <div className="h-2 bg-zinc-700 rounded w-2/3"></div>
                       <div className="h-6 bg-blue-500 rounded w-1/2"></div>
                    </div>
                    <div className="h-24 bg-[#09090b] border border-zinc-800/80 rounded-xl p-4 flex flex-col justify-between">
                       <div className="h-2 bg-zinc-700 rounded w-1/2"></div>
                       <div className="h-6 bg-indigo-500 rounded w-2/3"></div>
                    </div>
                  </div>
                  
                  {/* Chart and list */}
                  <div className="flex flex-col md:flex-row gap-6 mt-2 flex-1">
                    <div className="flex-[2] bg-[#09090b] border border-zinc-800/80 rounded-xl p-6 min-h-[200px] flex flex-col">
                      <div className="h-4 bg-zinc-800 rounded w-32 mb-8"></div>
                      <div className="flex-1 flex items-end gap-2 px-4 pb-2">
                        {[40, 70, 45, 90, 65, 30, 80, 50, 60, 100].map((h, i) => (
                           <div key={i} className="flex-1 bg-gradient-to-t from-blue-600/80 to-blue-400/50 rounded-t-sm" style={{ height: `${h}%` }}></div>
                        ))}
                      </div>
                    </div>
                    <div className="flex-1 bg-[#09090b] border border-zinc-800/80 rounded-xl p-6 flex flex-col gap-4">
                      <div className="h-4 bg-zinc-800 rounded w-24 mb-2"></div>
                      {[1,2,3,4].map(i => (
                        <div key={i} className="flex justify-between items-center w-full">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 bg-zinc-900 rounded-md"></div>
                            <div className="h-2 bg-zinc-700 rounded w-16"></div>
                          </div>
                          <div className="h-2 bg-zinc-600 rounded w-10"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Built for Local Stores */}
        <section className="py-24 px-6 bg-[#040405] border-y border-zinc-900">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
              Made for the Way Local Stores Operate
            </h2>
            <p className="text-zinc-400 text-lg max-w-3xl mx-auto leading-relaxed">
              StoreTap is designed for sari-sari stores, cafés, food stalls, small groceries, and neighborhood retailers that need a simple and affordable POS—not a complicated enterprise tool. We give you exactly what you need to run your business smoothly.
            </p>
          </div>
        </section>

        {/* 3. Core Features */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
              Everything You Need. Nothing You Don't.
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#09090b] border border-zinc-800 rounded-2xl p-8 hover:border-zinc-700 transition-colors shadow-lg">
              <div className="w-14 h-14 bg-indigo-500/10 text-indigo-400 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Track Utang Without a Notebook</h3>
              <p className="text-zinc-400 leading-relaxed">
                Record credit (utang) directly at checkout. Know exactly who owes what, and track partial payments without searching through notebooks.
              </p>
            </div>
            
            <div className="bg-[#09090b] border border-zinc-800 rounded-2xl p-8 hover:border-zinc-700 transition-colors shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-blue-500/5 opacity-0 hover:opacity-100 transition-opacity"></div>
              <div className="w-14 h-14 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center mb-6 relative z-10">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 relative z-10">Sell Even When Offline</h3>
              <p className="text-zinc-400 leading-relaxed relative z-10">
                Internet down? No problem. Continue making sales and tracking utang offline. Everything syncs automatically when you're back online.
              </p>
            </div>
            
            <div className="bg-[#09090b] border border-zinc-800 rounded-2xl p-8 hover:border-zinc-700 transition-colors shadow-lg">
              <div className="w-14 h-14 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Know Your Stock at a Glance</h3>
              <p className="text-zinc-400 leading-relaxed">
                Simple inventory management. See what's running low instantly, check product history, and avoid overstocking dead items.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Offline Mode Spotlight */}
        <section className="py-24 px-6 bg-gradient-to-b from-[#000000] to-[#0a0a0f] relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 order-2 md:order-1">
              <span className="text-blue-400 font-bold tracking-wider text-sm uppercase mb-3 block">Internet-Independent</span>
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
                Never Miss a Sale Due to Bad Connection
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center shrink-0 border border-red-500/20">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3" /></svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Seamless Offline Transition</h4>
                    <p className="text-zinc-400 text-sm">When your connection drops, StoreTap automatically switches to local storage. You won't even notice the difference while ringing up customers.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Automatic Background Sync</h4>
                    <p className="text-zinc-400 text-sm">Once the internet is restored, all your offline sales, inventory changes, and utang records automatically sync to your database without any manual effort.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 w-full order-1 md:order-2 flex justify-center">
              <div className="w-full max-w-sm bg-[#09090b] border border-zinc-800 rounded-3xl p-6 relative shadow-2xl">
                 <div className="absolute -top-3 right-6 flex items-center gap-2 bg-red-500/20 text-red-400 px-4 py-1.5 rounded-full text-xs font-bold border border-red-500/30 backdrop-blur-md shadow-lg shadow-red-500/10">
                   <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,1)]"></div> Offline Mode Active
                 </div>
                 
                 <div className="flex justify-between items-center mb-8 mt-2 pb-4 border-b border-zinc-800">
                    <div className="h-6 w-24 bg-zinc-800 rounded-md"></div>
                    <div className="h-8 w-8 bg-zinc-800 rounded-full"></div>
                 </div>
                 
                 <div className="space-y-4">
                   <div className="bg-[#121217] p-4 rounded-xl border border-zinc-800 flex items-center justify-between">
                     <div className="flex flex-col gap-2">
                       <div className="h-3 w-32 bg-zinc-700 rounded"></div>
                       <div className="h-2 w-20 bg-zinc-800 rounded"></div>
                     </div>
                     <div className="h-5 w-16 bg-blue-500/20 rounded"></div>
                   </div>
                   
                   <div className="bg-[#121217] p-4 rounded-xl border border-zinc-800 flex items-center justify-between">
                     <div className="flex flex-col gap-2">
                       <div className="h-3 w-40 bg-zinc-700 rounded"></div>
                       <div className="h-2 w-24 bg-zinc-800 rounded"></div>
                     </div>
                     <div className="h-5 w-16 bg-blue-500/20 rounded"></div>
                   </div>
                   
                   <div className="bg-[#121217] p-4 rounded-xl border border-zinc-800 flex items-center justify-between border-l-4 border-l-amber-500">
                     <div className="flex flex-col gap-2">
                       <div className="h-3 w-28 bg-zinc-700 rounded"></div>
                       <div className="h-2 w-24 bg-zinc-800 rounded"></div>
                     </div>
                     <div className="h-5 w-16 bg-amber-500/20 rounded"></div>
                   </div>
                 </div>
                 
                 <div className="mt-8 pt-4 border-t border-zinc-800">
                   <div className="h-12 w-full bg-blue-600 rounded-xl flex items-center justify-center">
                     <div className="h-3 w-20 bg-white/50 rounded-sm"></div>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. See StoreTap in Action */}
        <section id="action" className="py-24 px-6 max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            See StoreTap in Action
          </h2>
          <p className="text-zinc-400 mb-12 max-w-xl mx-auto">
            Experience how easy it is to manage sales, track utang, and handle inventory on a daily basis.
          </p>
          <div className="aspect-video bg-[#09090b] border border-zinc-800 rounded-2xl flex flex-col items-center justify-center overflow-hidden relative group cursor-pointer shadow-2xl hover:border-zinc-700 transition-colors">
             <div className="absolute inset-0 bg-zinc-900/50 group-hover:bg-zinc-900/30 transition-colors"></div>
             
             {/* Fake video thumbnail using synthetic UI */}
             <div className="absolute inset-0 p-8 flex flex-col blur-[2px] opacity-30">
               <div className="h-12 w-full border-b border-zinc-800 flex items-center justify-between px-4">
                 <div className="w-32 h-4 bg-zinc-600 rounded"></div>
                 <div className="w-16 h-4 bg-zinc-600 rounded"></div>
               </div>
               <div className="flex-1 flex gap-6 mt-6">
                 <div className="w-64 h-full bg-zinc-800 rounded-xl hidden md:block"></div>
                 <div className="flex-1 flex flex-col gap-4">
                   <div className="h-24 bg-zinc-800 rounded-xl w-full"></div>
                   <div className="h-full bg-zinc-800 rounded-xl w-full"></div>
                 </div>
               </div>
             </div>
             
             <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(37,99,235,0.6)] group-hover:scale-110 transition-transform relative z-10">
               <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
             </div>
             <p className="text-white font-medium relative z-10 bg-black/50 px-4 py-1.5 rounded-full backdrop-blur-md">Interactive Walkthrough (Coming Soon)</p>
             <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
          </div>
        </section>

        {/* 6. How it Works */}
        <section className="py-24 px-6 bg-[#040405] border-y border-zinc-900">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
                Simple Request Process
              </h2>
              <p className="text-zinc-400 max-w-xl mx-auto">
                No upfront payment. We verify your store details first to ensure you get exactly what you need.
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6 md:gap-4 relative">
              <div className="hidden md:block absolute top-6 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 z-0"></div>
              
              {[
                { step: 1, title: 'Request', desc: 'Customer sends contact and store details; no payment is made.' },
                { step: 2, title: 'Verification', desc: 'Provider calls or messages the customer to verify details and confirm the request.' },
                { step: 3, title: 'Preparation', desc: 'Provider configures the license or system and confirms readiness for launch.' },
                { step: 4, title: 'Activation', desc: 'Customer receives payment instructions, pays, and the system is fully activated.' },
              ].map((s, i) => (
                <div key={i} className="bg-[#09090b] border border-zinc-800 rounded-xl p-6 relative z-10 text-center flex flex-col items-center shadow-lg hover:border-zinc-700 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-black border-2 border-zinc-700 flex items-center justify-center font-black text-lg text-white mb-6 shadow-inner">
                    {s.step}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{s.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Pricing Section Component */}
        <section id="pricing" className="py-24">
           <PricingSection />
        </section>

        {/* 8. Trust/Numbers */}
        <section className="py-24 px-6 border-y border-zinc-900 relative overflow-hidden bg-[#040405]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-blue-600/5 blur-[120px] pointer-events-none"></div>
          <div className="max-w-5xl mx-auto relative z-10">
             <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-16 text-center">
               <div>
                 <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 mb-3">{activeUsers}+</div>
                 <div className="text-zinc-500 text-sm font-medium uppercase tracking-wider">Active Stores</div>
               </div>
               <div>
                 <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 mb-3">{activeSystemsCount}+</div>
                 <div className="text-zinc-500 text-sm font-medium uppercase tracking-wider">Deployed Systems</div>
               </div>
               <div className="col-span-2 md:col-span-1">
                 <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 mb-3">{licenseCount}+</div>
                 <div className="text-zinc-500 text-sm font-medium uppercase tracking-wider">Active Licenses</div>
               </div>
             </div>
          </div>
        </section>

        {/* 9. FAQ */}
        <section className="py-24 px-6 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-center text-white mb-16">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "What is the difference between a System Package and a License?",
                a: "A System Package is a one-time payment for the initial setup, hosting configuration, and deployment of your StoreTap system (Web or App). A License is a recurring activation (e.g., 30, 90, 150 days) that allows you to use the features within that system."
              },
              {
                q: "Can I try the system for free?",
                a: "Yes! You can request the Free Demo/Trial. It provides basic web access and database storage so you can evaluate StoreTap. However, demo accounts without any activity for 30 consecutive days may be permanently deactivated or deleted to save resources."
              },
              {
                q: "Do I need to pay immediately after requesting?",
                a: "No. After you submit a request, a provider will contact you to verify your details and prepare your system. You only send payment once the provider confirms your system or license is ready for activation."
              },
              {
                q: "How does the offline mode work?",
                a: "If your internet goes down, the system seamlessly switches to local storage on your device. You can continue recording sales and utang. Once your connection is restored, the app automatically syncs all offline data to the cloud."
              }
            ].map((faq, i) => (
              <div key={i} className="bg-[#09090b] border border-zinc-800/80 rounded-2xl p-6 md:p-8 hover:border-zinc-700 transition-colors group">
                <h3 className="text-lg font-bold text-white mb-3 flex items-start gap-4">
                  <span className="text-blue-500 shrink-0">Q.</span>
                  {faq.q}
                </h3>
                <p className="text-zinc-400 leading-relaxed pl-8">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 10. CTA */}
        <section className="py-32 px-6 relative overflow-hidden text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tighter">
              Ready to Upgrade Your Store?
            </h2>
            <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
              Join local businesses tracking utang securely and managing stock without the headaches of paper notebooks.
            </p>
            <Link 
              href="#pricing"
              className="inline-block px-10 py-5 rounded-xl bg-white text-black font-bold text-lg hover:bg-zinc-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.25)]"
            >
              Get Started with StoreTap
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
