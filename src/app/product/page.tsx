import Link from 'next/link'
import Image from 'next/image'

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-[#000000] text-zinc-300 font-sans selection:bg-blue-500/30">
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto border-b border-zinc-800/60 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/icon.svg" alt="StoreTap Logo" width={32} height={32} />
          <span className="text-xl font-bold tracking-tight text-white">StoreTap</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <Link href="/product" className="text-white transition-colors">Product</Link>
          <Link href="/features" className="hover:text-white transition-colors">Features</Link>
          <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="px-4 py-2 rounded-lg bg-white text-black text-sm font-bold shadow-sm hover:bg-zinc-200 transition-all">
            Dashboard
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-20 pb-32 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white mb-6">
          The POS Built for <br/> <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">Modern Businesses</span>
        </h1>
        <p className="text-lg text-zinc-400 mb-16 max-w-2xl mx-auto leading-relaxed">
          StoreTap is designed to operate completely offline but sync seamlessly to the cloud. You never have to worry about internet interruptions affecting your sales again.
        </p>

        <div className="grid md:grid-cols-2 gap-6 text-left">
           <div className="bg-[#09090b] p-8 rounded-2xl border border-zinc-800/80 shadow-lg relative overflow-hidden group">
             <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center mb-6 relative z-10">
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
             </div>
             <h3 className="text-lg font-semibold text-white mb-3 relative z-10">Lightning Fast Checkout</h3>
             <p className="text-zinc-400 text-sm leading-relaxed relative z-10">
               Process orders in seconds with an intuitive, touch-friendly interface designed for cashiers and self-service kiosks.
             </p>
           </div>
           
           <div className="bg-[#09090b] p-8 rounded-2xl border border-zinc-800/80 shadow-lg relative overflow-hidden group">
             <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center mb-6 relative z-10">
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             </div>
             <h3 className="text-lg font-semibold text-white mb-3 relative z-10">Offline-First Architecture</h3>
             <p className="text-zinc-400 text-sm leading-relaxed relative z-10">
               Continue operating perfectly even when your internet drops. Data syncs automatically the moment you reconnect.
             </p>
           </div>
        </div>
      </main>
    </div>
  )
}
