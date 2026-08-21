import Link from 'next/link'
import Image from 'next/image'

export default function PricingPage() {
  const plans = [
    {
      name: "Free Trial",
      price: "₱0",
      duration: "1 Month",
      features: ["Basic POS Features", "Offline Mode", "Limited Reports"],
      btn: "Start Free",
      popular: false
    },
    {
      name: "Standard",
      price: "₱500",
      duration: "per month",
      features: ["All Free Features", "Unlimited Reports", "Inventory Tracking", "Cloud Sync"],
      btn: "Buy Standard",
      popular: true
    },
    {
      name: "Pro",
      price: "₱1500",
      duration: "per year",
      features: ["All Standard Features", "Priority Support", "Utang Tracking", "Advanced Analytics"],
      btn: "Buy Pro",
      popular: false
    }
  ]

  return (
    <div className="min-h-screen bg-[#000000] text-zinc-300 font-sans selection:bg-blue-500/30">
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto border-b border-zinc-800/60 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/icon.svg" alt="StoreTap Logo" width={32} height={32} />
          <span className="text-xl font-bold tracking-tight text-white">StoreTap</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <Link href="/product" className="hover:text-white transition-colors">Product</Link>
          <Link href="/features" className="hover:text-white transition-colors">Features</Link>
          <Link href="/pricing" className="text-white transition-colors">Pricing</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="px-4 py-2 rounded-lg bg-white text-black text-sm font-bold shadow-sm hover:bg-zinc-200 transition-all">
            Dashboard
          </Link>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-20 pb-32 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-zinc-400 mb-16">Choose the perfect license for your business needs.</p>
        
        <div className="grid md:grid-cols-3 gap-6 text-left max-w-4xl mx-auto">
          {plans.map((p, i) => (
             <div key={i} className={`bg-[#09090b] p-8 rounded-3xl border shadow-lg relative transition-all ${p.popular ? 'border-blue-500/50 ring-1 ring-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.15)]' : 'border-zinc-800/80 hover:border-zinc-700'}`}>
               {p.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</span>}
               <h3 className="text-base font-semibold text-white mb-2">{p.name}</h3>
               <div className="mb-6 flex items-baseline gap-1">
                 <span className="text-4xl font-bold text-white">{p.price}</span>
                 <span className="text-zinc-500 text-sm">/{p.duration}</span>
               </div>
               <ul className="space-y-3 mb-8">
                 {p.features.map((f, j) => (
                   <li key={j} className="flex items-center gap-3 text-sm text-zinc-300">
                     <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                     {f}
                   </li>
                 ))}
               </ul>
               <button className={`w-full py-2.5 rounded-lg text-sm font-bold transition-all ${p.popular ? 'bg-white text-black hover:bg-zinc-200' : 'bg-zinc-900 text-white border border-zinc-800 hover:bg-zinc-800'}`}>
                 {p.btn}
               </button>
             </div>
          ))}
        </div>
      </main>
    </div>
  )
}
