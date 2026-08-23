'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import LicenseRequestModal from '@/components/LicenseRequestModal'

export default function PricingPage() {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTier, setSelectedTier] = useState('Basic')
  const [userLogged, setUserLogged] = useState(false)
  const [userRole, setUserRole] = useState('client')

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      const { data: { session } } = await supabase.auth.getSession()
      setUserLogged(!!session)
      
      if (session) {
        // Fetch role via an API endpoint or Server Action if possible
        // But since this is a client component, I will import getClientRole if possible, or just skip it if it's tricky.
        // Wait, I can import getClientRole directly in a Client component if it's a Server Action.
        const { getClientRole } = await import('@/app/actions/admin')
        const role = await getClientRole()
        setUserRole(role)
      }
    }
    checkUser()
  }, [])

  const plans = [
    {
      name: "Free Demo / Trial",
      price: "₱0",
      subtext: "While actively testing",
      duration: "Evaluation License",
      features: [
        "Try before purchasing",
        "Basic web access & DB",
        "Demo support / guided setup"
      ],
      missing: [
        "No permanent license",
        "Deleted if inactive for 30 days"
      ],
      btn: "Start Free Trial",
      popular: false
    },
    {
      name: "Basic",
      price: "₱150",
      subtext: "",
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
    if (userRole === 'admin' || userRole === 'provider') {
      alert("Admins and Providers cannot request licenses.")
      return
    }
    
    if (userLogged) {
      setSelectedTier(tierName)
      setIsModalOpen(true)
    } else {
      router.push('/login')
    }
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
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-left max-w-7xl mx-auto">
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
                 disabled={userRole === 'admin' || userRole === 'provider'}
                 className={`w-full py-2.5 rounded-lg text-sm font-bold transition-all text-center block mt-4 cursor-pointer ${(userRole === 'admin' || userRole === 'provider') ? 'opacity-50 cursor-not-allowed bg-zinc-800 text-zinc-500' : p.popular ? 'bg-white text-black hover:bg-zinc-200' : 'bg-zinc-900 text-white border border-zinc-800 hover:bg-zinc-800'}`}
               >
                 {userRole === 'admin' || userRole === 'provider' ? 'Not Available' : p.btn}
               </button>
             </div>
          ))}
        </div>
        
        <div className="mt-16 p-6 bg-blue-950/20 border border-blue-900/30 rounded-2xl max-w-4xl mx-auto text-left flex gap-4 items-start">
          <div className="text-blue-500 mt-1 shrink-0">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2 text-lg">Free Demo/Trial</h4>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Try StoreTap before you buy. This demo includes basic web access and database storage for evaluation. To keep the service available for everyone, a demo that has no sales or inventory activity for 30 consecutive days may be deactivated and permanently deleted. The demo does not include a permanent license.
            </p>
          </div>
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

