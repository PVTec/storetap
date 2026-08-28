import Link from 'next/link'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import prisma from '@/lib/prisma'
import { FeatureTabs } from '@/components/FeatureTabs' // I will create this client component

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
    <div className="min-h-screen font-sans selection:bg-teal-500/30 text-slate-900 bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-[#0f0f0f] pt-32 lg:pt-40 pb-0 relative overflow-hidden flex flex-col items-center text-center">
        <div className="max-w-4xl mx-auto px-6 relative z-10 w-full flex flex-col items-center">
          
          <h2 className="text-[10px] sm:text-xs font-bold tracking-widest text-zinc-400 uppercase mb-4 sm:mb-6">
            A LIGHTWEIGHT POS & UTANG SYSTEM
          </h2>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] text-white mb-6 sm:mb-8">
            Sell <span className="text-teal-500">Smarter</span>.<br/>
            Scale Without Limits.
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed font-medium mb-8 sm:mb-10">
            Sell even when the internet is down. Track utang without a notebook. Know your stock at a glance. Built for local businesses that want to grow without limits.
          </p>
          
          <Link href="/login" className="w-full sm:w-auto px-12 py-4 rounded bg-teal-500 text-white font-bold text-lg hover:bg-teal-400 transition-all text-center shadow-[0_0_40px_rgba(20,184,166,0.2)] mb-12 sm:mb-16">
            Start for Free
          </Link>

          <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto">
             <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Available On</p>
             <div className="grid grid-cols-2 gap-4 w-full">
               <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 font-medium text-sm hover:bg-zinc-800 transition-colors cursor-pointer">
                  <svg className="w-5 h-5 text-zinc-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                  Web
               </div>
               <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 font-medium text-sm hover:bg-zinc-800 transition-colors cursor-pointer">
                  <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 24 24"><path d="M17.523 15.3414C17.523 15.3414 16.208 17.6534 14.536 19.3494C12.864 21.0454 11.233 21.3664 11.233 21.3664C11.233 21.3664 9.602 21.0454 7.93 19.3494C6.258 17.6534 4.943 15.3414 4.943 15.3414L2.091 10.4284L4.943 5.51541L7.93 5.51541L11.233 10.4284L14.536 5.51541L17.523 5.51541L20.375 10.4284L17.523 15.3414Z"/></svg>
                  Android
               </div>
             </div>
          </div>
          
        </div>
        
        {/* Device Mockup (Sits comfortably within hero, distinct from stats) */}
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 mt-16 md:mt-24 mb-16 md:mb-24 relative z-10">
          <div className="absolute inset-0 bg-teal-500/10 blur-[120px] rounded-full"></div>
          
          <div className="relative bg-[#1a1a1a] p-2 md:p-3 rounded-t-[1.5rem] md:rounded-t-[2.5rem] rounded-b-xl border-4 border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] aspect-[4/3] md:aspect-video w-full flex flex-col overflow-hidden">
             
             {/* App Header */}
             <div className="h-10 md:h-14 bg-zinc-900 flex items-center justify-between px-4 md:px-6 border-b border-zinc-800/80 rounded-t-xl shrink-0">
                <div className="flex items-center gap-2 md:gap-3">
                   <div className="w-5 h-5 md:w-6 md:h-6 bg-teal-500 rounded-md flex items-center justify-center">
                     <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                   </div>
                   <span className="font-bold text-white text-sm md:text-lg tracking-tight">StoreTap</span>
                </div>
                <div className="flex items-center gap-3 md:gap-4">
                   <span className="text-[10px] md:text-xs font-bold px-2 py-1 md:py-1.5 bg-teal-500/10 text-teal-400 rounded-full border border-teal-500/20 uppercase tracking-widest hidden sm:block">Online Sync Active</span>
                   <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs text-white">V</div>
                </div>
             </div>
             
             {/* App Body */}
             <div className="flex-1 bg-[#0a0a0a] flex flex-col sm:flex-row p-2 md:p-4 gap-2 md:gap-4 rounded-b-xl overflow-hidden">
               {/* Left column - Products */}
               <div className="flex-[2] flex flex-col">
                  <div className="flex gap-2 mb-3 md:mb-4 overflow-x-auto pb-1 hide-scrollbar">
                    <div className="px-3 md:px-4 py-1 md:py-1.5 bg-teal-500 rounded-md text-white text-[10px] md:text-xs font-bold shrink-0">All items</div>
                    <div className="px-3 md:px-4 py-1 md:py-1.5 bg-zinc-900 text-zinc-400 rounded-md text-[10px] md:text-xs font-medium border border-zinc-800 shrink-0">Drinks</div>
                    <div className="px-3 md:px-4 py-1 md:py-1.5 bg-zinc-900 text-zinc-400 rounded-md text-[10px] md:text-xs font-medium border border-zinc-800 shrink-0">Snacks</div>
                    <div className="px-3 md:px-4 py-1 md:py-1.5 bg-zinc-900 text-zinc-400 rounded-md text-[10px] md:text-xs font-medium border border-zinc-800 shrink-0 hidden md:block">Meals</div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 overflow-y-auto">
                     {[1,2,3,4,5,6].map(i => (
                       <div key={i} className="bg-zinc-900 rounded-lg md:rounded-xl p-2 md:p-3 border border-zinc-800 flex flex-col h-20 md:h-28 relative cursor-pointer hover:bg-zinc-800 transition-colors group">
                          {i === 1 && <span className="absolute -top-1.5 -right-1.5 w-4 h-4 md:w-5 md:h-5 bg-teal-500 rounded-full text-white text-[9px] md:text-[10px] flex items-center justify-center font-bold z-10 shadow-lg">2</span>}
                          <div className="flex-1 flex items-center justify-center text-2xl md:text-3xl opacity-60 group-hover:opacity-100 transition-opacity group-hover:scale-110 duration-300">
                             {i%3===0 ? '🍜' : i%2===0 ? '🥤' : '🍔'}
                          </div>
                          <div className="mt-auto flex justify-between items-end">
                            <p className="text-[9px] md:text-[10px] font-medium text-zinc-400 truncate max-w-[60%]">Item {i}</p>
                            <p className="text-xs md:text-sm font-bold text-white">₱120</p>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
               {/* Right column - Cart */}
               <div className="flex-1 bg-zinc-900/50 rounded-lg md:rounded-xl border border-zinc-800 flex flex-col overflow-hidden max-w-[280px] w-full mx-auto sm:max-w-none">
                  <div className="p-2 md:p-3 bg-zinc-900 border-b border-zinc-800 flex justify-between items-center">
                     <span className="text-[10px] md:text-xs font-bold text-zinc-400 uppercase tracking-wider">Current Order</span>
                     <span className="text-[9px] md:text-xs font-medium bg-zinc-800 px-2 py-1 rounded text-zinc-300">Walk-in</span>
                  </div>
                  <div className="flex-1 p-2 md:p-3 space-y-2 md:space-y-3 overflow-y-auto">
                     <div className="flex justify-between items-center bg-zinc-950 p-2 rounded border border-zinc-800/50">
                       <div>
                          <p className="text-xs md:text-sm font-bold text-white">Burger</p>
                          <p className="text-[9px] md:text-xs text-zinc-500">₱120 x 2</p>
                       </div>
                       <p className="font-bold text-white text-xs md:text-sm">₱240</p>
                     </div>
                  </div>
                  <div className="p-2 md:p-3 bg-zinc-900 rounded-b-lg md:rounded-b-xl border-t border-zinc-800">
                     <div className="flex justify-between items-center mb-2 md:mb-3">
                       <span className="text-xs md:text-sm font-medium text-zinc-400">Total</span>
                       <span className="text-xl md:text-2xl font-black text-white">₱240</span>
                     </div>
                     <div className="w-full py-2.5 md:py-3 bg-teal-500 hover:bg-teal-400 transition-colors rounded-md md:rounded-lg text-white font-bold text-center text-xs md:text-sm cursor-pointer shadow-lg">
                       Charge ₱240
                     </div>
                  </div>
               </div>
             </div>
          </div>
        </div>
      </section>
      
      {/* Wave transition from dark hero to teal stats */}
      <div className="w-full bg-[#0f0f0f] -mt-1 relative z-0">
         <svg className="w-full h-auto text-teal-600 drop-shadow-sm" viewBox="0 0 1440 120" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
         </svg>
      </div>

      {/* Stats Banner */}
      <section className="bg-teal-600 pt-8 pb-16 px-6 relative overflow-hidden mt-0">
         <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
            <div className="lg:max-w-xl text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                Time to retire the notebook.
              </h2>
              <p className="text-teal-50 text-lg leading-relaxed font-medium">
                We're helping local stores transition from manual notebooks to a fully digital utang and POS system. Join the businesses managing their sales and credit better, even without internet.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-x-8 gap-y-8 lg:gap-12 w-full lg:w-auto">
               <div className="flex flex-col items-center lg:items-start">
                  <h3 className="text-3xl font-black text-white mb-1">{activeSystems}+</h3>
                  <span className="text-teal-100 text-xs font-bold uppercase tracking-widest">Active Systems</span>
               </div>
               <div className="flex flex-col items-center lg:items-start">
                  <h3 className="text-3xl font-black text-white mb-1">{licenseCount}+</h3>
                  <span className="text-teal-100 text-xs font-bold uppercase tracking-widest">Stores Upgraded</span>
               </div>
               <div className="flex flex-col items-center lg:items-start">
                  <h3 className="text-3xl font-black text-white mb-1">{activeUsers}+</h3>
                  <span className="text-teal-100 text-xs font-bold uppercase tracking-widest">Daily Users</span>
               </div>
               <div className="flex flex-col items-center lg:items-start">
                  <h3 className="text-3xl font-black text-white mb-1">99.9%</h3>
                  <span className="text-teal-100 text-xs font-bold uppercase tracking-widest">Uptime</span>
               </div>
            </div>
         </div>
      </section>

      {/* Industries Section */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
              Built for the local stores that keep the community moving.
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
             {/* Card 1 */}
             <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center text-2xl mb-6 shadow-sm">
                  🏪
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Sari-Sari Stores</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                  Manage hundreds of fast-moving items, track daily sales, and handle utang lists directly on your phone or tablet.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-slate-700 font-medium">
                    <span className="text-teal-500 mt-0.5">✓</span> Barcode scanning support
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-700 font-medium">
                    <span className="text-teal-500 mt-0.5">✓</span> Keep track of customer utang
                  </li>
                </ul>
             </div>
             
             {/* Card 2 */}
             <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl mb-6 shadow-sm">
                  🛒
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Convenience Stores</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                  Keep checkout fast during rush hours. Monitor stock levels and catch low stock before shelves run empty.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-slate-700 font-medium">
                    <span className="text-teal-500 mt-0.5">✓</span> Lightning fast checkout
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-700 font-medium">
                    <span className="text-teal-500 mt-0.5">✓</span> Low stock alerts
                  </li>
                </ul>
             </div>

             {/* Card 3 */}
             <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center text-2xl mb-6 shadow-sm">
                  🍽️
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Eateries & Carenderias</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                  Handle steady counter sales, daily reports, and repeat customers without slowing down service.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-slate-700 font-medium">
                    <span className="text-teal-500 mt-0.5">✓</span> Image-based product grid
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-700 font-medium">
                    <span className="text-teal-500 mt-0.5">✓</span> Track best-selling items
                  </li>
                </ul>
             </div>

             {/* Card 4 */}
             <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-2xl mb-6 shadow-sm">
                  🛍️
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Retail Shops</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                  Support gift shops, clothing stalls, pharmacies, and growing retailers with easy inventory management.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-slate-700 font-medium">
                    <span className="text-teal-500 mt-0.5">✓</span> Track product categories
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-700 font-medium">
                    <span className="text-teal-500 mt-0.5">✓</span> Offline capabilities
                  </li>
                </ul>
             </div>
          </div>
        </div>
      </section>

      {/* Interactive Features */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
           <FeatureTabs />
        </div>
      </section>

      {/* How It Works & Notice */}
      <section className="bg-slate-50 py-24 px-6 border-t border-slate-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
              Get Started with StoreTap
            </h2>
            <p className="text-slate-600 font-medium">A simple process to modernize your store.</p>
          </div>
          
          <div className="grid md:grid-cols-5 gap-4 mb-16 relative">
             <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0"></div>
             
             {[
               {step: 1, title: 'Choose System', desc: 'Select Demo, Web, or App version.'},
               {step: 2, title: 'Submit Details', desc: 'Tell us your store name & contact.'},
               {step: 3, title: 'Verification', desc: 'A provider will confirm your request.'},
               {step: 4, title: 'Preparation', desc: 'We prepare your system & license.'},
               {step: 5, title: 'Activation', desc: 'Pay safely and start selling!'},
             ].map((s) => (
               <div key={s.step} className="relative z-10 flex flex-col items-center text-center group">
                 <div className="w-12 h-12 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center font-bold text-slate-500 mb-4 shadow-sm group-hover:border-teal-500 group-hover:text-teal-600 transition-colors">
                   {s.step}
                 </div>
                 <h4 className="font-bold text-slate-900 text-sm mb-2">{s.title}</h4>
                 <p className="text-xs text-slate-600 px-2">{s.desc}</p>
               </div>
             ))}
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
             <h4 className="font-bold text-slate-900 mb-2">About StoreTap & Providers</h4>
             <p className="text-sm text-slate-600 leading-relaxed">
               StoreTap is a software technology project and POS service created and operated by Vince. StoreTap Providers are authorized StoreTap representatives or members who assist with system setup, licensing, deployment, and customer support. They are not independent sellers of a separate product. <br/><br/>
               <span className="font-semibold text-slate-900">Notice:</span> Submitting a request is not an immediate purchase. No payment is made at the request stage.
             </p>
          </div>
        </div>
      </section>

      {/* Meet the Founder */}
      <section className="bg-[#0a0a0a] border-t border-zinc-900 px-6 py-24 md:py-32">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">
          
          <div className="w-full md:w-2/5 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-zinc-800">
              <Image 
                src="/founder.png" 
                alt="Vincent Layon" 
                fill
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white font-bold text-xl mb-1">Vincent Layon</p>
                <p className="text-teal-400 font-medium text-sm">Creator of StoreTap</p>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-3/5 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-teal-500/10 border border-teal-500/20 text-teal-400 font-bold text-[10px] uppercase tracking-widest rounded-full mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
              The Vision
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
              Empowering local stores to go digital.
            </h2>
            
            <p className="text-zinc-400 text-lg leading-relaxed mb-8">
              "StoreTap was not built primarily to make money, but to help local stores transition into the digital era. We help them, and in turn, they help us."
            </p>
            
            <Link href="/about" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-teal-600 text-white font-bold hover:bg-teal-500 transition-all shadow-[0_0_30px_rgba(20,184,166,0.2)] hover:shadow-[0_0_40px_rgba(20,184,166,0.4)]">
              Read the Full Story
            </Link>
          </div>
          
        </div>
      </section>

      <Footer />
    </div>
  )
}
