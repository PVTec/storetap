'use client'

import { useState } from 'react'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import LicenseRequestModal from '@/components/LicenseRequestModal'

export default function PricingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTier, setSelectedTier] = useState('Basic')

  const plans = [
    {
      name: "Basic",
      price: "₱150",
      subtext: "First license is FREE",
      duration: "1 Month License",
      features: [
        "Sales Module (Quick actions)",
        "Utang Management",
        "Inventory System",
        "Reports & Analytics",
        "User Management"
      ],
      missing: [
        "Premium Themes",
        "Offline Mode"
      ],
      btn: "Get Basic License",
      popular: false
    },
    {
      name: "Standard",
      price: "₱500",
      duration: "3 Month License",
      features: [
        "All Free Features",
        "10 Premium Themes",
        "Priority Support"
      ],
      missing: [
        "Offline Mode"
      ],
      btn: "Get Standard License",
      popular: false
    },
    {
      name: "Pro",
      price: "₱1500",
      duration: "5 Month License",
      features: [
        "All Standard Features",
        "Full Offline Capability",
        "Unlimited Updates",
        "VIP Support"
      ],
      missing: [],
      btn: "Get Pro License",
      popular: true
    }
  ]

  const handleOpenModal = (tierName: string) => {
    setSelectedTier(tierName)
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-[#000000] text-zinc-300 font-sans selection:bg-blue-500/30">
      <Navigation />

      <main className="max-w-5xl mx-auto px-6 pt-20 pb-32 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-zinc-400 mb-16 max-w-xl mx-auto">
          Choose the perfect license duration for your business needs. Your app will prompt you when it's time to renew.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 text-left max-w-5xl mx-auto">
          {plans.map((p, i) => (
             <div key={i} className={`bg-[#09090b] p-8 rounded-3xl border shadow-lg relative transition-all flex flex-col ${p.popular ? 'border-blue-500/50 ring-1 ring-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.15)]' : 'border-zinc-800/80 hover:border-zinc-700'}`}>
               {p.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Best Value</span>}
               
               <h3 className="text-base font-semibold text-white mb-2">{p.name}</h3>
               <div className="mb-6 flex flex-col items-start justify-center min-h-[4rem]">
                 <span className="text-4xl font-bold text-white">{p.price}</span>
                 {p.subtext && <span className="text-sm font-medium text-zinc-500 mt-1">{p.subtext}</span>}
               </div>
               
               <div className="inline-block px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-md text-xs font-medium text-zinc-300 mb-8 w-max">
                 {p.duration}
               </div>

               <div className="flex-1">
                 <ul className="space-y-3 mb-6">
                   {p.features.map((f, j) => (
                     <li key={j} className="flex items-center gap-3 text-sm text-zinc-300">
                       <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                       {f}
                     </li>
                   ))}
                   {p.missing.map((f, j) => (
                     <li key={j} className="flex items-center gap-3 text-sm text-zinc-600">
                       <svg className="w-4 h-4 text-zinc-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                       {f}
                     </li>
                   ))}
                 </ul>
               </div>

               <button 
                 onClick={() => handleOpenModal(p.name)}
                 className={`w-full py-2.5 rounded-lg text-sm font-bold transition-all text-center block mt-4 cursor-pointer ${p.popular ? 'bg-white text-black hover:bg-zinc-200' : 'bg-zinc-900 text-white border border-zinc-800 hover:bg-zinc-800'}`}
               >
                 {p.btn}
               </button>
             </div>
          ))}
        </div>
      </main>
      <Footer />

      <LicenseRequestModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        tier={selectedTier} 
      />
    </div>
  )
}

