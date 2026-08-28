import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function FeaturesPage() {
  const features = [
    {
      title: "Smart Sales & Dashboard",
      description: "Quick product cards, custom pricing, and 'Undo Last Sale' with automatic stock restoration.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20"
    },
    {
      title: "Complete Utang Management",
      description: "Track partial payments, full payment history, and calculate remaining balances easily.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: "text-rose-400",
      bg: "bg-rose-500/10",
      border: "border-rose-500/20"
    },
    {
      title: "Advanced Inventory",
      description: "Stock adjustments with reasons, history logging, and low-stock warnings.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20"
    },
    {
      title: "Reports & Analytics",
      description: "Filter sales/utang by period, track cash vs utang collections, and export data.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20"
    },
    {
      title: "User Management",
      description: "Role-based visibility (Admin/Staff), real-time online user tracking, and session monitoring.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20"
    },
    {
      title: "Dynamic Themes",
      description: "10 premium themes including a soft-contrast Midnight theme tailored for every environment.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      color: "text-teal-400",
      bg: "bg-teal-500/10",
      border: "border-teal-500/20"
    }
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 font-sans selection:bg-teal-500/30">
      <Navigation />

      <main className="max-w-6xl mx-auto px-6 pt-20 pb-32 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/10 border border-teal-500/20 text-teal-400 font-bold text-[10px] uppercase tracking-widest rounded-full mb-6 mt-12">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
          Features Overview
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
          Powerful Features.<br/> Built for Real Stores.
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-16">
          Everything you need to run your local store, conveniently packaged in an ultra-fast, offline-capable system.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {features.map((f, i) => (
             <div key={i} className="group bg-[#09090b] p-8 rounded-2xl border border-zinc-800/80 shadow-lg hover:border-zinc-700 transition-all hover:-translate-y-1 hover:shadow-2xl">
               <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 border ${f.bg} ${f.border} ${f.color}`}>
                 {f.icon}
               </div>
               <h3 className="text-lg font-bold text-white mb-3 group-hover:text-teal-400 transition-colors">{f.title}</h3>
               <p className="text-zinc-400 text-sm leading-relaxed">{f.description}</p>
             </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
