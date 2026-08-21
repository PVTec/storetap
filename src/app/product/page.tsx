import Link from 'next/link'
import Image from 'next/image'

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 font-sans selection:bg-blue-100">
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto border-b border-slate-200/60 bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/icon.svg" alt="StoreTap Logo" width={36} height={36} />
          <span className="text-xl font-bold tracking-tight text-slate-900">StoreTap</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-500">
          <Link href="/product" className="text-blue-600 transition-colors">Product</Link>
          <Link href="/features" className="hover:text-blue-600 transition-colors">Features</Link>
          <Link href="/pricing" className="hover:text-blue-600 transition-colors">Pricing</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold shadow-sm hover:bg-blue-700 hover:shadow transition-all">
            Dashboard
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-16 pb-24 text-center">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6">
          The POS Built for <br/> <span className="text-blue-600">Modern Businesses</span>
        </h1>
        <p className="text-lg text-slate-500 mb-12">
          StoreTap is designed to operate completely offline but sync seamlessly to the cloud. You never have to worry about internet interruptions affecting your sales again.
        </p>

        <div className="grid md:grid-cols-2 gap-6 text-left">
           <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
             <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
             </div>
             <h3 className="text-xl font-bold text-slate-900 mb-3">Lightning Fast Checkout</h3>
             <p className="text-slate-500 leading-relaxed">
               Process orders in seconds with an intuitive, touch-friendly interface designed for cashiers and self-service kiosks.
             </p>
           </div>
           
           <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
             <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             </div>
             <h3 className="text-xl font-bold text-slate-900 mb-3">Offline-First Architecture</h3>
             <p className="text-slate-500 leading-relaxed">
               Continue operating perfectly even when your internet drops. Data syncs automatically the moment you reconnect.
             </p>
           </div>
        </div>
      </main>
    </div>
  )
}
