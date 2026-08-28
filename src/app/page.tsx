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
      <section className="bg-[#0f0f0f] pt-32 pb-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-white">
              StoreTap <br />
              <span className="text-teal-400 font-extrabold tracking-tighter">A Lightweight POS</span> <br />
              & Utang System
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Sell even when the internet is down. Track utang without a notebook. Know your stock at a glance. Built for local businesses that want to grow without limits.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center lg:justify-start">
              <Link href="/login" className="w-full sm:w-auto px-8 py-4 rounded-lg bg-teal-500 text-white font-bold text-lg hover:bg-teal-400 transition-all text-center shadow-[0_0_20px_rgba(20,184,166,0.3)]">
                Start for Free
              </Link>
              <Link href="/pricing" className="w-full sm:w-auto px-8 py-4 rounded-lg bg-transparent border-2 border-zinc-700 text-white font-bold text-lg hover:bg-zinc-800 transition-all text-center">
                View Pricing
              </Link>
            </div>
            
            <div className="pt-8 flex flex-col items-center lg:items-start gap-4">
               <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Available On</p>
               <div className="flex gap-4">
                 <div className="flex items-center gap-2 px-4 py-2 rounded bg-zinc-900 border border-zinc-800">
                    <span className="text-zinc-300 font-medium text-sm">Web Browser</span>
                 </div>
                 <div className="flex items-center gap-2 px-4 py-2 rounded bg-zinc-900 border border-zinc-800">
                    <span className="text-zinc-300 font-medium text-sm">Android App</span>
                 </div>
               </div>
            </div>
          </div>
          
          <div className="flex-1 w-full max-w-2xl lg:max-w-none relative">
            <div className="absolute inset-0 bg-teal-500/20 blur-[100px] rounded-full"></div>
            {/* Tablet Mockup */}
            <div className="relative bg-zinc-950 p-3 rounded-[2rem] border-[6px] border-zinc-800 shadow-2xl aspect-[4/3] w-full flex flex-col overflow-hidden">
               {/* App Header */}
               <div className="h-14 bg-zinc-900 flex items-center justify-between px-6 border-b border-zinc-800/80 rounded-t-xl shrink-0">
                  <div className="flex items-center gap-2">
                     <div className="w-6 h-6 bg-teal-500 rounded-md"></div>
                     <span className="font-bold text-white text-lg">StoreTap</span>
                  </div>
                  <div className="flex items-center gap-4">
                     <span className="text-xs font-semibold px-2 py-1 bg-teal-500/10 text-teal-400 rounded-full border border-teal-500/20">Online Sync Active</span>
                     <div className="w-8 h-8 rounded-full bg-zinc-800"></div>
                  </div>
               </div>
               
               {/* App Body */}
               <div className="flex-1 bg-black flex p-4 gap-4 rounded-b-xl overflow-hidden">
                 {/* Left column - Products */}
                 <div className="flex-[2] flex flex-col">
                    <div className="flex gap-2 mb-4 overflow-hidden">
                      <div className="px-4 py-1.5 bg-zinc-800 rounded-full text-white text-xs font-bold">All items</div>
                      <div className="px-4 py-1.5 bg-zinc-900 text-zinc-400 rounded-full text-xs font-medium border border-zinc-800">Drinks</div>
                      <div className="px-4 py-1.5 bg-zinc-900 text-zinc-400 rounded-full text-xs font-medium border border-zinc-800">Snacks</div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                       {[1,2,3,4,5,6].map(i => (
                         <div key={i} className="bg-zinc-900 rounded-xl p-3 border border-zinc-800 flex flex-col h-28 relative">
                            {i === 1 && <span className="absolute -top-2 -right-2 w-5 h-5 bg-teal-500 rounded-full text-white text-[10px] flex items-center justify-center font-bold">2</span>}
                            <div className="flex-1 flex items-center justify-center text-3xl opacity-50">
                               {i%3===0 ? '🍜' : i%2===0 ? '🥤' : '🍔'}
                            </div>
                            <div className="mt-auto">
                              <p className="text-[10px] font-medium text-zinc-400 truncate">Product Name</p>
                              <p className="text-sm font-bold text-white">₱120</p>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
                 {/* Right column - Cart */}
                 <div className="flex-1 bg-zinc-900 rounded-xl border border-zinc-800 flex flex-col">
                    <div className="p-3 border-b border-zinc-800 flex justify-between items-center">
                       <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Current Order</span>
                       <span className="text-xs text-zinc-500">Walk-in</span>
                    </div>
                    <div className="flex-1 p-3 space-y-3">
                       <div className="flex justify-between items-center">
                         <div>
                            <p className="text-sm font-bold text-white">Product Name</p>
                            <p className="text-xs text-zinc-500">₱120 x 2</p>
                         </div>
                         <p className="font-bold text-white">₱240</p>
                       </div>
                    </div>
                    <div className="p-3 bg-zinc-950 rounded-b-xl border-t border-zinc-800">
                       <div className="flex justify-between items-center mb-3">
                         <span className="text-sm font-medium text-zinc-400">Total</span>
                         <span className="text-2xl font-black text-white">₱240</span>
                       </div>
                       <div className="w-full py-3 bg-teal-500 rounded-lg text-white font-bold text-center text-sm">
                         Charge ₱240
                       </div>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-teal-600 py-12 px-6">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-2">{activeSystems}+</h2>
              <p className="text-teal-100 font-bold text-sm tracking-widest uppercase">Active Systems</p>
            </div>
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-2">{licenseCount}+</h2>
              <p className="text-teal-100 font-bold text-sm tracking-widest uppercase">Licensed Stores</p>
            </div>
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-2">{activeUsers}+</h2>
              <p className="text-teal-100 font-bold text-sm tracking-widest uppercase">Active Users</p>
            </div>
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-2">99.9%</h2>
              <p className="text-teal-100 font-bold text-sm tracking-widest uppercase">Uptime</p>
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
      <section className="bg-[#0f0f0f] px-6 py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-teal-500/5 blur-[100px] -z-10 rounded-full" />
        
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="w-40 h-40 md:w-56 md:h-56 shrink-0 relative rounded-full overflow-hidden border-4 border-zinc-800 shadow-2xl">
            <Image 
              src="/founder.png" 
              alt="Vincent Layon - Founder" 
              fill
              className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
          
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Meet the Founder</h2>
            <h3 className="text-lg text-teal-400 font-medium mb-6">Vincent Layon (Vince)</h3>
            
            <blockquote className="relative text-zinc-300 text-lg md:text-xl leading-relaxed border-l-4 border-teal-500 pl-6 mb-8 font-medium">
              "StoreTap was not built primarily to make money, but to help local stores transition into the digital era... We help them, and in turn, they help us."
            </blockquote>
            
            <Link href="/about" className="px-6 py-3 rounded-lg bg-zinc-800 text-white font-bold hover:bg-zinc-700 transition-colors inline-flex items-center gap-2 border border-zinc-700">
              Read Full Story
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
