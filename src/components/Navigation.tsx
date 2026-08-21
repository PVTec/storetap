'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="flex flex-col md:flex-row items-center justify-between px-6 py-4 max-w-7xl mx-auto border-b border-zinc-800/60 bg-black/50 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center justify-between w-full md:w-auto">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/icon.svg" alt="StoreTap Logo" width={32} height={32} className="text-blue-500" />
          <span className="text-xl font-bold tracking-tight text-white">StoreTap</span>
          <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono font-bold ml-1">v2.1.0</span>
        </Link>
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden text-zinc-400 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      <div className={`${isOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row items-center gap-6 md:gap-8 text-sm font-medium text-zinc-400 w-full md:w-auto mt-4 md:mt-0`}>
        <Link href="/product" className="hover:text-white transition-colors w-full md:w-auto text-center py-2 md:py-0">Product</Link>
        <Link href="/features" className="hover:text-white transition-colors w-full md:w-auto text-center py-2 md:py-0">Features</Link>
        <Link href="/pricing" className="hover:text-white transition-colors w-full md:w-auto text-center py-2 md:py-0">Pricing</Link>
        
        <div className="flex items-center gap-4 mt-2 md:mt-0 w-full md:w-auto justify-center">
          <Link href="/login" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
            Log in
          </Link>
          <Link href="/login" className="px-4 py-2 rounded-lg bg-white text-black text-sm font-bold shadow-sm hover:bg-zinc-200 transition-all text-center">
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  )
}
