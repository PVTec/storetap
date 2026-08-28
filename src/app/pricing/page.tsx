'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import LicenseRequestModal from '@/components/LicenseRequestModal'

export default function PricingPage() {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTier, setSelectedTier] = useState('Starter')
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
        const { getClientRole } = await import('@/app/actions/admin')
        const role = await getClientRole()
        setUserRole(role)
      }
    }
    checkUser()
  }, [])

  const plans = [
    {
      name: "Starter",
      price: "₱149",
      originalPrice: "₱749",
      discount: "80% OFF",
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
      btn: "Request Starter License",
      popular: false,
      bestValue: false
    },
    {
      name: "Growth",
      price: "₱499",
      originalPrice: "₱2499",
      discount: "80% OFF",
      duration: "3 Month License",
      features: [
        "All Free Features",
        "10 Premium Themes",
        "Priority Support"
      ],
      missing: [
        "Offline Mode"
      ],
      btn: "Request Growth License",
      popular: true,
      bestValue: false
    },
    {
      name: "Business Pro",
      price: "₱1499",
      originalPrice: "₱7499",
      discount: "80% OFF",
      duration: "5 Month License",
      features: [
        "All Standard Features",
        "Full Offline Capability",
        "Unlimited Updates",
        "VIP Support"
      ],
      missing: [],
      btn: "Request Business Pro License",
      popular: false,
      bestValue: true
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
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 font-sans selection:bg-teal-500/30">
      <Navigation />

      <main className="max-w-6xl mx-auto px-6 pt-20 pb-32 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
          Transparent pricing for<br/>growing businesses.
        </h1>
        <p className="text-lg text-zinc-400 mb-20 max-w-2xl mx-auto leading-relaxed">
          No hidden fees or surprise charges. Choose the license duration that fits your operation, and the system will simply notify you when it's time to renew.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 text-left max-w-5xl mx-auto">
          {plans.map((p, i) => (
             <div key={i} className={`bg-[#0c0c0e] p-8 rounded-2xl relative flex flex-col transition-all ${
                 p.popular ? 'border border-zinc-700 shadow-xl scale-[1.02] z-10' : 
                 p.bestValue ? 'border border-teal-500/50 shadow-[0_0_30px_rgba(20,184,166,0.1)] scale-[1.02] z-10' : 
                 'border border-zinc-800/80 hover:border-zinc-700'
               }`}>
               
               {p.popular && <span className="absolute -top-3 left-6 bg-zinc-700 text-zinc-200 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</span>}
               {p.bestValue && <span className="absolute -top-3 left-6 bg-teal-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Best Value</span>}
               
               <h3 className="text-xl font-bold text-white mb-2">{p.name}</h3>
               <div className="mb-6 flex flex-col items-start justify-center min-h-[4.5rem]">
                 <div className="flex items-center gap-2 mb-1">
                   <span className="text-sm text-zinc-500 line-through font-medium">{p.originalPrice}</span>
                   <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">{p.discount}</span>
                 </div>
                 <span className="text-4xl font-bold text-white">{p.price}</span>
                 {p.subtext && <span className="text-sm font-medium text-zinc-500 mt-1">{p.subtext}</span>}
               </div>
               
               <div className="inline-flex items-center justify-center px-3 py-1.5 bg-[#121214] border border-zinc-800/80 rounded-lg text-xs font-medium text-zinc-400 mb-8 w-max">
                 {p.duration}
               </div>

               <div className="flex-1">
                 <ul className="space-y-4 mb-8">
                   {p.features.map((f, j) => (
                     <li key={j} className="flex items-start gap-3 text-sm text-zinc-300">
                       <svg className={`w-4 h-4 shrink-0 mt-0.5 ${p.bestValue ? 'text-teal-400' : 'text-zinc-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                       <span className="leading-snug">{f}</span>
                     </li>
                   ))}
                   {p.missing.map((f, j) => (
                     <li key={j} className="flex items-start gap-3 text-sm text-zinc-600">
                       <svg className="w-4 h-4 text-zinc-700 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                       <span className="leading-snug">{f}</span>
                     </li>
                   ))}
                 </ul>
               </div>

               <button 
                 onClick={() => handleOpenModal(p.name)}
                 disabled={userRole === 'admin' || userRole === 'provider'}
                 className={`w-full py-3 rounded-lg text-sm font-semibold transition-all text-center block mt-4 cursor-pointer ${
                   (userRole === 'admin' || userRole === 'provider') ? 'opacity-50 cursor-not-allowed bg-zinc-800 text-zinc-500' : 
                   p.bestValue ? 'bg-teal-500 text-white hover:bg-teal-400' : 
                   p.popular ? 'bg-white text-black hover:bg-zinc-200' : 
                   'bg-[#121214] text-white border border-zinc-800 hover:bg-zinc-800 hover:text-white'
                 }`}
               >
                 {userRole === 'admin' || userRole === 'provider' ? 'Not Available' : p.btn}
               </button>
             </div>
          ))}
        </div>

        <div className="mt-32 border-t border-zinc-800/50 pt-32">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
            System Packages
          </h2>
          <p className="text-lg text-zinc-400 mb-16 max-w-xl mx-auto leading-relaxed">
            One-time deployment fees for your permanent cloud infrastructure. Delivered securely with bundled free licenses.
          </p>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 max-w-5xl mx-auto text-left">
            {/* Free System */}
            <div className="bg-[#0c0c0e] border border-zinc-800/80 rounded-2xl p-8 flex flex-col relative overflow-hidden transition-all hover:border-zinc-700">
              <span className="absolute top-5 right-5 bg-[#121214] text-zinc-400 border border-zinc-800/80 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">Limited</span>
              <div className="flex justify-between items-start mb-6 mt-2">
                <div>
                  <h3 className="text-xl font-bold text-white">Free Demo / Trial</h3>
                  <p className="text-zinc-500 text-sm mt-1">Basic Web Setup</p>
                </div>
              </div>
              <div className="mb-8">
                <p className="text-2xl font-bold text-white mb-1">Free <span className="text-sm font-medium text-zinc-500 font-normal">while testing</span></p>
                <p className="text-sm font-medium text-zinc-500">or Free for 30 days</p>
              </div>
              <div className="flex-1">
                <ul className="space-y-4 mb-8">
                  <li className="text-sm text-zinc-300 flex items-start gap-3">
                    <span className="text-zinc-400 mt-0.5"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg></span>
                    <span className="leading-snug">Try StoreTap before purchasing a full system (includes web access & DB storage).</span>
                  </li>
                  <li className="text-sm text-zinc-300 flex items-start gap-3">
                    <span className="text-zinc-400 mt-0.5"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg></span>
                    <span className="leading-snug">No permanent license included; paid license required for continued activation.</span>
                  </li>
                  <li className="text-sm text-zinc-500 flex items-start gap-3 mt-4 italic">
                    <span className="text-zinc-600 shrink-0 mt-0.5">⚠️</span> 
                    <span className="leading-snug">Demo instances may be deactivated after one month of inactivity.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Web System */}
            <div className="bg-[#0c0c0e] border border-zinc-800/80 hover:border-zinc-700 rounded-2xl p-8 flex flex-col relative overflow-hidden transition-all">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Web Version</h3>
                  <p className="text-zinc-500 text-sm mt-1">Patch v2.1.0.12.6</p>
                </div>
              </div>
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-zinc-600 line-through font-medium">₱1245</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">80% OFF</span>
                </div>
                <p className="text-3xl font-bold text-white mb-2">₱249 <span className="text-sm font-medium text-zinc-500 font-normal">one-time</span></p>
              </div>
              <div className="flex-1">
                <ul className="space-y-4 mb-8">
                  <li className="text-sm text-zinc-300 flex items-center gap-3">
                    <span className="text-zinc-300"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg></span> Free Hosting (Website)
                  </li>
                  <li className="text-sm text-zinc-300 flex items-center gap-3">
                    <span className="text-zinc-300"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg></span> Free Database Storage
                  </li>
                  <li className="text-sm text-zinc-300 flex items-center gap-3">
                    <span className="text-zinc-300"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg></span> Free <span className="font-semibold text-white ml-1">Starter Tier License</span> (30 Days)
                  </li>
                </ul>
              </div>
            </div>

            {/* App System */}
            <div className="bg-[#0c0c0e] border border-teal-500/50 rounded-2xl p-8 flex flex-col relative overflow-hidden shadow-[0_0_40px_rgba(20,184,166,0.1)] transition-all transform scale-[1.02]">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-teal-400 to-emerald-500"></div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Web Plus App</h3>
                  <p className="text-teal-400/80 text-sm mt-1 font-medium">Patch v2.1.0.12.6</p>
                </div>
              </div>
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-zinc-600 line-through font-medium">₱3749</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/30">80% OFF</span>
                </div>
                <p className="text-3xl font-bold text-white mb-2">₱749 <span className="text-sm font-medium text-zinc-500 font-normal">one-time</span></p>
              </div>
              <div className="flex-1">
                <ul className="space-y-4 mb-8">
                  <li className="text-sm text-zinc-300 flex items-center gap-3">
                    <span className="text-teal-400"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg></span> Free Mobile App
                  </li>
                  <li className="text-sm text-zinc-300 flex items-start gap-3">
                    <span className="text-teal-400 mt-0.5"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg></span> 
                    <span className="leading-snug">Free Hosting <span className="text-zinc-400">(Website)</span> & Database Storage</span>
                  </li>
                  <li className="text-sm text-zinc-300 flex items-center gap-3">
                    <span className="text-teal-400"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg></span> Free <span className="font-semibold text-white ml-1">Business Pro Tier</span> (30 Days)
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-20 text-center">
            <button 
              onClick={() => {
                if (userLogged) {
                  router.push('/dashboard')
                } else {
                  router.push('/login')
                }
              }}
              className="inline-block px-10 py-4 rounded-xl bg-teal-500 text-white font-semibold text-sm tracking-wide hover:bg-teal-400 transition-all shadow-[0_0_20px_rgba(20,184,166,0.15)] hover:shadow-[0_0_30px_rgba(20,184,166,0.25)]"
            >
              Get Started with StoreTap
            </button>
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
