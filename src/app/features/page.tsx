import Link from 'next/link'
import Image from 'next/image'

export default function FeaturesPage() {
  const features = [
    {
      title: "Real-time Remote Monitoring",
      description: "Monitor your store's sales, transactions, and performance from anywhere in the world.",
      icon: "🌍"
    },
    {
      title: "Inventory Management",
      description: "Track stocks across multiple branches and get low-stock alerts automatically.",
      icon: "📦"
    },
    {
      title: "Utang (Credit) Tracking",
      description: "Easily manage customer debts and partial payments securely inside the app.",
      icon: "📓"
    },
    {
      title: "Advanced Sales Reports",
      description: "Export daily, weekly, and monthly sales data to Excel/CSV in a single click.",
      icon: "📊"
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
          <Link href="/features" className="text-white transition-colors">Features</Link>
          <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="px-4 py-2 rounded-lg bg-white text-black text-sm font-bold shadow-sm hover:bg-zinc-200 transition-all">
            Dashboard
          </Link>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-20 pb-32 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white mb-6">
          Everything You Need. <br/> <span className="text-zinc-500">Nothing You Don't.</span>
        </h1>
        
        <div className="grid md:grid-cols-2 gap-6 text-left mt-16">
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
