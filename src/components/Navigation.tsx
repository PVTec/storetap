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
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto border-b border-zinc-800/60 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/icon.svg" alt="StoreTap Logo" width={32} height={32} className="text-blue-500" />
          <span className="text-xl font-bold tracking-tight text-white">StoreTap</span>
          <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono font-bold ml-1">v2.1.0</span>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          {pathname !== '/' && (
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
          )}
          <Link href="/product" className="hover:text-white transition-colors">Product</Link>
          <Link href="/features" className="hover:text-white transition-colors">Features</Link>
          <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
            Log in
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          onClick={() => setIsOpen(true)} 
          className="md:hidden text-zinc-400 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-[60] md:hidden backdrop-blur-sm" 
          onClick={() => setIsOpen(false)} 
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 right-0 w-64 bg-[#09090b] border-l border-zinc-800/80 flex flex-col z-[70] transform transition-transform duration-200 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-6 border-b border-zinc-800/80">
          <span className="font-bold text-white">Menu</span>
          <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex flex-col p-6 gap-6 text-sm font-medium text-zinc-400">
          {pathname !== '/' && (
            <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">Home</Link>
          )}
          <Link href="/product" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">Product</Link>
          <Link href="/features" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">Features</Link>
          <Link href="/pricing" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">Pricing</Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">About</Link>
          <hr className="border-zinc-800/80" />
          <Link href="/login" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">
            Log in
          </Link>
        </div>
      </div>
    </>
  )
}
