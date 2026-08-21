"use client"
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0d0d12] text-white font-sans selection:bg-blue-500/30 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-black text-xl shadow-[0_0_20px_rgba(59,130,246,0.5)]">
            ST
          </div>
          <span className="text-xl font-bold tracking-tight">StoreTap</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-400 font-mono ml-2">v2.0</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <Link href="#product" className="hover:text-white transition-colors">Product</Link>
          <Link href="#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="#pricing" className="hover:text-white transition-colors">Purchase</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors hidden sm:block">
            Log in
          </Link>
          <Link href="/login" className="px-5 py-2.5 rounded-lg bg-white text-black text-sm font-bold shadow-lg hover:shadow-white/20 transition-all hover:-translate-y-0.5">
            Sign up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-24 pb-32 grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8 z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400">
            The Lightweight and Advanced <br className="hidden md:block"/> Store System.
          </h1>
          <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
            StoreTap — cloud-connected Point of Sale machines with built-in remote monitoring, e-payments, inventory tracking, bandwidth control, and more. Start your automated business with the most feature-packed system available.
          </p>
          <div className="flex items-center gap-5 pt-4">
            <Link href="/login" className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg shadow-[0_0_30px_rgba(79,70,229,0.3)] hover:shadow-[0_0_40px_rgba(79,70,229,0.5)] transition-all hover:-translate-y-1">
              Get Started Now
            </Link>
            <Link href="#demo" className="px-8 py-4 rounded-xl bg-slate-800/50 border border-slate-700 text-white font-bold text-lg hover:bg-slate-800 transition-colors">
              View Demo
            </Link>
          </div>
        </div>
        
        {/* Mockup */}
        <div className="relative z-10 lg:pl-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl -z-10 rounded-full"></div>
          <div className="bg-[#12121a] border border-slate-800 rounded-[2.5rem] p-4 shadow-2xl relative overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
            <div className="bg-slate-900 rounded-[2rem] h-[600px] w-full overflow-hidden border border-slate-800 flex flex-col relative">
              
              {/* Fake App Header */}
              <div className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-950/50 backdrop-blur-md z-20">
                <div className="font-bold text-lg tracking-wide">STORETAP</div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                  <span className="text-xs text-slate-400 font-mono">ONLINE</span>
                </div>
              </div>
              
              {/* Fake App Content */}
              <div className="p-6 space-y-6 flex-1 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-slate-900/90 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900"></div>
                
                <div className="relative z-10 text-center space-y-2 mb-8">
                   <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mx-auto mb-4">
                     <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                   </div>
                   <h3 className="text-xl font-bold text-white">High Speed Connection!</h3>
                </div>

                <div className="relative z-10 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-xl p-4 text-center font-bold flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Disconnected
                </div>

                <div className="relative z-10 bg-slate-800/80 border border-slate-700 rounded-2xl p-6 shadow-lg backdrop-blur-sm">
                  <p className="text-xs text-slate-400 text-center font-semibold tracking-wider uppercase mb-2">Time Remaining</p>
                  <p className="text-3xl text-center font-mono font-bold text-blue-400">--:--:--</p>
                </div>

                <div className="relative z-10 grid grid-cols-3 gap-3 pt-2">
                  <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Credits</p>
                    <p className="font-mono font-bold text-emerald-400">₱0</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Points</p>
                    <p className="font-mono font-bold text-amber-400">0</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Expiry</p>
                    <p className="font-mono font-bold text-slate-300">--</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Grid Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px] -z-20"></div>
    </div>
  )
}
