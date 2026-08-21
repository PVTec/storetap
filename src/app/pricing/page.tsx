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
      features: ["All Free Features", "Unlimited Reports", "E-Payments", "Cloud Sync"],
      btn: "Buy Standard",
      popular: true
    },
    {
      name: "Pro",
      price: "₱1500",
      duration: "per year",
      features: ["All Standard Features", "Priority Support", "Multi-store Management", "Advanced Analytics"],
      btn: "Buy Pro",
      popular: false
    }
  ]

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 font-sans selection:bg-blue-100">
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto border-b border-slate-200/60 bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/icon.svg" alt="StoreTap Logo" width={36} height={36} />
          <span className="text-xl font-bold tracking-tight text-slate-900">StoreTap</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-500">
          <Link href="/product" className="hover:text-blue-600 transition-colors">Product</Link>
          <Link href="/features" className="hover:text-blue-600 transition-colors">Features</Link>
          <Link href="/pricing" className="text-blue-600 transition-colors">Pricing</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold shadow-sm hover:bg-blue-700 hover:shadow transition-all">
            Dashboard
          </Link>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-16 pb-24 text-center">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-slate-500 mb-16">Choose the perfect license for your business needs.</p>
        
        <div className="grid md:grid-cols-3 gap-8 text-left max-w-4xl mx-auto">
          {plans.map((p, i) => (
             <div key={i} className={`bg-white p-8 rounded-3xl border shadow-sm relative ${p.popular ? 'border-blue-500 ring-4 ring-blue-50' : 'border-slate-200'}`}>
               {p.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</span>}
               <h3 className="text-lg font-bold text-slate-900 mb-2">{p.name}</h3>
               <div className="mb-6">
                 <span className="text-4xl font-black">{p.price}</span>
                 <span className="text-slate-500 text-sm ml-1">/{p.duration}</span>
               </div>
               <ul className="space-y-3 mb-8">
                 {p.features.map((f, j) => (
                   <li key={j} className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                     <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                     {f}
                   </li>
                 ))}
               </ul>
               <button className={`w-full py-3 rounded-xl font-bold transition-all ${p.popular ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'}`}>
                 {p.btn}
               </button>
             </div>
          ))}
        </div>
      </main>
    </div>
  )
}
