import Link from 'next/link'
import Image from 'next/image'

export default function FeaturesPage() {
  const features = [
    {
      title: "Real-time Remote Monitoring",
      description: "Monitor your store's sales and inventory from anywhere in the world.",
      icon: "🌍"
    },
    {
      title: "E-Payments Integration",
      description: "Accept GCash, Maya, and credit cards directly from the terminal.",
      icon: "💳"
    },
    {
      title: "Bandwidth Control",
      description: "Integrated internet voucher generation and bandwidth limiting.",
      icon: "📶"
    },
    {
      title: "Advanced Sales Reports",
      description: "Export daily, weekly, and monthly sales data to Excel/CSV.",
      icon: "📊"
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
          <Link href="/features" className="text-blue-600 transition-colors">Features</Link>
          <Link href="/pricing" className="hover:text-blue-600 transition-colors">Pricing</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold shadow-sm hover:bg-blue-700 hover:shadow transition-all">
            Dashboard
          </Link>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-16 pb-24 text-center">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6">
          Everything You Need. <br/> <span className="text-slate-500">Nothing You Don't.</span>
        </h1>
        
        <div className="grid md:grid-cols-2 gap-6 text-left mt-16">
          {features.map((f, i) => (
             <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
               <div className="text-4xl mb-4">{f.icon}</div>
               <h3 className="text-lg font-bold text-slate-900 mb-2">{f.title}</h3>
               <p className="text-slate-500 text-sm">{f.description}</p>
             </div>
          ))}
        </div>
      </main>
    </div>
  )
}
