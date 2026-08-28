'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <nav className="w-full border-b border-slate-200 bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-2.5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo-icon.png" alt="StoreTap Logo" width={24} height={24} className="rounded" />
            <span className="text-xl font-black tracking-tighter text-slate-900">StoreTap</span>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-500">
            {pathname !== '/' && (
              <Link href="/" className="hover:text-teal-600 transition-colors">Home</Link>
            )}
            <Link href="/product" className="hover:text-teal-600 transition-colors">Product</Link>
            <Link href="/features" className="hover:text-teal-600 transition-colors">Features</Link>
            <Link href="/pricing" className="hover:text-teal-600 transition-colors">Pricing</Link>
            <Link href="/about" className="hover:text-teal-600 transition-colors">About</Link>
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-5 text-sm font-bold">
            <Link href="/login" className="text-slate-600 hover:text-teal-600 transition-colors">
              Log In
            </Link>
            <Link href="/login" className="px-5 py-2 rounded-lg bg-[#F25C05] text-white hover:bg-[#d95204] transition-colors shadow-sm text-xs uppercase tracking-wider">
              Start for Free
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button 
            onClick={() => setIsOpen(true)} 
            className="md:hidden text-slate-900 hover:text-teal-600 transition-colors p-1"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 z-[60] md:hidden backdrop-blur-sm" 
          onClick={() => setIsOpen(false)} 
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 right-0 w-72 bg-white shadow-2xl flex flex-col z-[70] transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
            <Image src="/logo-icon.png" alt="StoreTap Logo" width={20} height={20} className="rounded" />
            <span className="text-lg font-black tracking-tighter text-slate-900">StoreTap</span>
          </Link>
          <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600 bg-slate-50 p-2 rounded-full">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex flex-col p-5 gap-5 text-sm font-bold text-slate-500 flex-1 overflow-y-auto">
          {pathname !== '/' && (
            <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-teal-600 transition-colors">Home</Link>
          )}
          <Link href="/product" onClick={() => setIsOpen(false)} className="hover:text-teal-600 transition-colors">Product</Link>
          <Link href="/features" onClick={() => setIsOpen(false)} className="hover:text-teal-600 transition-colors">Features</Link>
          <Link href="/pricing" onClick={() => setIsOpen(false)} className="hover:text-teal-600 transition-colors">Pricing</Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="hover:text-teal-600 transition-colors">About</Link>
        </div>
        
        <div className="p-5 border-t border-slate-100 flex flex-col gap-3">
          <Link href="/login" onClick={() => setIsOpen(false)} className="w-full py-2.5 text-center text-slate-700 text-sm font-bold hover:bg-slate-50 rounded-lg transition-colors">
            Log In
          </Link>
          <Link href="/login" onClick={() => setIsOpen(false)} className="w-full py-2.5 text-center bg-[#F25C05] text-white text-sm font-bold rounded-lg hover:bg-[#d95204] transition-colors shadow-sm uppercase tracking-wider">
            Start for Free
          </Link>
        </div>
      </div>
    </>
  )
}
