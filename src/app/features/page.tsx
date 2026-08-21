import Link from 'next/link'
import Image from 'next/image'
import Navigation from '@/components/Navigation'

export default function FeaturesPage() {
  const features = [
    {
      title: "Smart Sales & Dashboard",
      description: "Quick product cards, custom pricing, and 'Undo Last Sale' with automatic stock restoration.",
      icon: "🛒"
    },
    {
      title: "Complete Utang Management",
      description: "Track partial payments, full payment history, and calculate remaining balances easily.",
      icon: "📓"
    },
    {
      title: "Advanced Inventory",
      description: "Stock adjustments with reasons, history logging, and low-stock warnings.",
      icon: "📦"
    },
    {
      title: "Reports & Analytics",
      description: "Filter sales/utang by period, track cash vs utang collections, and export data.",
      icon: "📊"
    },
    {
      title: "User Management",
      description: "Role-based visibility (Admin/Staff), real-time online user tracking, and session monitoring.",
      icon: "👥"
    },
    {
      title: "Dynamic Themes",
      description: "10 premium themes including a soft-contrast Midnight theme tailored for every environment.",
      icon: "🎨"
    }
  ]

  return (
    <div className="min-h-screen bg-[#000000] text-zinc-300 font-sans selection:bg-blue-500/30">
      <Navigation />

      <main className="max-w-5xl mx-auto px-6 pt-20 pb-32 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white mb-6">
          Powerful Features. <br/> <span className="text-zinc-500">Built for Real Stores.</span>
        </h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-left mt-16">
          {features.map((f, i) => (
             <div key={i} className="bg-[#09090b] p-6 rounded-2xl border border-zinc-800/80 shadow-lg hover:border-zinc-700 transition-colors">
               <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center text-xl mb-5">
                 {f.icon}
               </div>
               <h3 className="text-base font-semibold text-white mb-2">{f.title}</h3>
               <p className="text-zinc-400 text-sm leading-relaxed">{f.description}</p>
             </div>
          ))}
        </div>
      </main>
    </div>
  )
}
