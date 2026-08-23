'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import LicenseRequestModal from '@/components/LicenseRequestModal'
import SystemRequestModal from '@/components/SystemRequestModal'

export default function PricingSection() {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTier, setSelectedTier] = useState('Basic')
  const [isSystemModalOpen, setIsSystemModalOpen] = useState(false)
  const [selectedSystem, setSelectedSystem] = useState<'free-web'|'web'|'app'>('web')
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
      name: "Basic",
      price: "₱150",
      subtext: "",
      duration: "30 Days",
      features: [
        "Sales and inventory",
        "Utang tracking",
        "Standard Support"
      ],
      missing: [
        "Premium themes",
        "Offline mode"
      ],
      btn: "Request Basic License",
      popular: false
    },
    {
      name: "Standard",
      price: "₱500",
      subtext: "",
      duration: "90 Days",
      features: [
        "Sales and inventory",
        "Utang tracking",
        "Premium themes",
        "Priority Support"
      ],
      missing: [
        "Offline mode"
      ],
      btn: "Request Standard License",
      popular: false
    },
    {
      name: "Pro",
      price: "₱1,500",
      subtext: "",
      duration: "150 Days",
      features: [
        "Sales and inventory",
        "Utang tracking",
        "Premium themes",
        "Offline mode",
        "VIP Support"
      ],
      missing: [],
      btn: "Request Pro License",
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

  const handleOpenSystemModal = (type: 'free-web' | 'web' | 'app') => {
    if (userRole === 'admin' || userRole === 'provider') {
      alert("Admins and Providers cannot request systems.")
      return
    }
    
    if (userLogged) {
      setSelectedSystem(type)
      setIsSystemModalOpen(true)
    } else {
      router.push('/login')
    }
  }

  return (
    <div id="pricing-section" className="w-full">
      <div className="max-w-5xl mx-auto text-center relative z-10 overflow-hidden px-6">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white mb-4">
          System Packages
        </h2>
        <p className="text-zinc-400 mb-16 max-w-xl mx-auto">
          A system package covers setup and delivery. A license activates StoreTap features for a specific period. These are separate items.
        </p>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 max-w-5xl mx-auto text-left">
          {/* Free System */}
          <div className="bg-[#09090b] border border-zinc-500/30 rounded-2xl p-6 flex flex-col relative overflow-hidden shadow-[0_0_20px_rgba(161,161,170,0.05)] transition-all">
            <span className="absolute top-4 right-4 bg-zinc-800 text-zinc-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Limited</span>
            <div className="flex justify-between items-start mb-6 mt-2">
              <div>
                <h3 className="text-xl font-bold text-white">Free Demo / Trial</h3>
                <p className="text-zinc-500 text-sm mt-1">Basic Web Access</p>
              </div>
              <div className="w-12 h-12 bg-zinc-800/50 text-zinc-400 rounded-xl flex items-center justify-center border border-zinc-700/50 shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
              </div>
            </div>
            <div className="mb-8">
              <p className="text-xl font-black text-white mb-1">Free</p>
            </div>
            <div className="flex-1">
              <ul className="space-y-4 mb-8">
                <li className="text-sm text-zinc-300 flex items-start gap-3">
                  <span className="text-zinc-400 bg-zinc-800 p-1 rounded-full shrink-0 mt-0.5"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></span>
                  <span className="leading-tight">Basic web access for evaluation.</span>
                </li>
                <li className="text-sm text-zinc-300 flex items-start gap-3">
                  <span className="text-zinc-400 bg-zinc-800 p-1 rounded-full shrink-0 mt-0.5"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg></span>
                  <span className="leading-tight">No permanent license.</span>
                </li>
                <li className="text-sm text-zinc-400 flex items-start gap-3 mt-4 text-xs italic">
                  <span className="text-amber-500 shrink-0 mt-0.5">⚠️</span> 
                  <span className="leading-tight">Inactive demos may be deactivated or deleted according to the stated inactivity rule.</span>
                </li>
              </ul>
            </div>
            <button 
              onClick={() => handleOpenSystemModal('free-web')}
              disabled={userRole === 'admin' || userRole === 'provider'}
              className={`w-full py-2.5 rounded-lg text-sm font-bold transition-all text-center block mt-4 cursor-pointer ${(userRole === 'admin' || userRole === 'provider') ? 'opacity-50 cursor-not-allowed bg-zinc-800 text-zinc-500' : 'bg-zinc-900 text-white border border-zinc-800 hover:bg-zinc-800'}`}
            >
              {userRole === 'admin' || userRole === 'provider' ? 'Not Available' : 'Start Free Demo'}
            </button>
          </div>

          {/* Web System */}
          <div className="bg-[#09090b] border border-emerald-500/30 rounded-2xl p-6 flex flex-col relative overflow-hidden shadow-[0_0_20px_rgba(16,185,129,0.05)] transition-all">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-white">Web System Setup</h3>
              </div>
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center border border-emerald-500/20">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
              </div>
            </div>
            <div className="mb-8">
              <p className="text-3xl font-black text-white mb-2">₱250 <span className="text-sm font-medium text-zinc-500">one-time</span></p>
            </div>
            <div className="flex-1">
              <ul className="space-y-4 mb-8">
                <li className="text-sm text-zinc-300 flex items-center gap-3">
                  <span className="text-emerald-400 bg-emerald-500/10 p-1 rounded-full"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></span> Provider-prepared web system
                </li>
                <li className="text-sm text-zinc-300 flex items-center gap-3">
                  <span className="text-emerald-400 bg-emerald-500/10 p-1 rounded-full"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></span> Hosting/database setup
                </li>
                <li className="text-sm text-zinc-300 flex items-center gap-3">
                  <span className="text-emerald-400 bg-emerald-500/10 p-1 rounded-full"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></span> <span className="font-bold ml-1 text-emerald-400">Basic Tier License</span> (30 Days)
                </li>
              </ul>
            </div>
            <button 
              onClick={() => handleOpenSystemModal('web')}
              disabled={userRole === 'admin' || userRole === 'provider'}
              className={`w-full py-2.5 rounded-lg text-sm font-bold transition-all text-center block mt-4 cursor-pointer ${(userRole === 'admin' || userRole === 'provider') ? 'opacity-50 cursor-not-allowed bg-zinc-800 text-zinc-500' : 'bg-emerald-500 text-white hover:bg-emerald-600'}`}
            >
              {userRole === 'admin' || userRole === 'provider' ? 'Not Available' : 'Request Web System'}
            </button>
          </div>

          {/* App System */}
          <div className="bg-[#09090b] border border-blue-500/50 rounded-2xl p-6 flex flex-col relative overflow-hidden shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-white">App System Setup</h3>
              </div>
              <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
              </div>
            </div>
            <div className="mb-8">
              <p className="text-3xl font-black text-white mb-2">₱750 <span className="text-sm font-medium text-zinc-500">one-time</span></p>
            </div>
            <div className="flex-1">
              <ul className="space-y-4 mb-8">
                <li className="text-sm text-zinc-300 flex items-center gap-3">
                  <span className="text-blue-400 bg-blue-500/10 p-1 rounded-full"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></span> Provider-prepared app/system setup
                </li>
                <li className="text-sm text-zinc-300 flex items-center gap-3 leading-relaxed">
                  <span className="text-blue-400 bg-blue-500/10 p-1 rounded-full shrink-0"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></span> 
                  <span>Hosting/database setup</span>
                </li>
                <li className="text-sm text-zinc-300 flex items-center gap-3">
                  <span className="text-blue-400 bg-blue-500/10 p-1 rounded-full"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></span> <span className="font-bold ml-1 text-blue-400">Pro Tier License</span> (30 Days)
                </li>
              </ul>
            </div>
            <button 
              onClick={() => handleOpenSystemModal('app')}
              disabled={userRole === 'admin' || userRole === 'provider'}
              className={`w-full py-2.5 rounded-lg text-sm font-bold transition-all text-center block mt-4 cursor-pointer ${(userRole === 'admin' || userRole === 'provider') ? 'opacity-50 cursor-not-allowed bg-zinc-800 text-zinc-500' : 'bg-blue-500 text-white hover:bg-blue-600 shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]'}`}
            >
              {userRole === 'admin' || userRole === 'provider' ? 'Not Available' : 'Request App System'}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-32 max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white mb-4">
          License Plans
        </h2>
        <p className="text-zinc-400 mb-16 max-w-xl mx-auto">
          Choose the activation period and features that fit your business.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 text-left">
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
      </div>

      <LicenseRequestModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        tier={selectedTier} 
      />
      <SystemRequestModal
        isOpen={isSystemModalOpen}
        onClose={() => setIsSystemModalOpen(false)}
        systemType={selectedSystem}
      />
    </div>
  )
}
