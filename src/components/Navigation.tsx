'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav className={`w-full fixed top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-md border-b border-zinc-800 shadow-lg py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo-icon.png" alt="StoreTap Logo" width={24} height={24} className="rounded" />
            <span className="text-xl font-bold tracking-tight text-white">StoreTap</span>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
            {pathname !== '/' && (
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
            )}
            <Link href="/product" className="hover:text-white transition-colors">Product</Link>
            <Link href="/features" className="hover:text-white transition-colors">Features</Link>
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-5 text-sm font-bold">
            <Link href="/login" className="text-zinc-300 hover:text-white transition-colors">
              Log In
            </Link>
            <Link href="/login" className="px-5 py-2 rounded bg-teal-600 text-white hover:bg-teal-500 transition-colors font-medium">
              Start for Free
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button 
            onClick={() => setIsOpen(true)} 
            className="md:hidden text-white bg-zinc-800/50 hover:bg-zinc-700/50 p-2 rounded-md transition-colors border border-zinc-700/50"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-[60] md:hidden backdrop-blur-sm" 
          onClick={() => setIsOpen(false)} 
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 right-0 w-72 bg-[#0a0a0a] border-l border-zinc-800 shadow-2xl flex flex-col z-[70] transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-5 border-b border-zinc-800">
          <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
            <Image src="/logo-icon.png" alt="StoreTap Logo" width={20} height={20} className="rounded" />
            <span className="text-lg font-bold tracking-tight text-white">StoreTap</span>
          </Link>
          <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 p-2 rounded-md">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex flex-col p-5 gap-5 text-sm font-medium text-zinc-300 flex-1 overflow-y-auto">
          {pathname !== '/' && (
            <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">Home</Link>
          )}
          <Link href="/product" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">Product</Link>
          <Link href="/features" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">Features</Link>
          <Link href="/pricing" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">Pricing</Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">About</Link>
        </div>
        
        <div className="p-5 border-t border-zinc-800 flex flex-col gap-3">
          <Link href="/login" onClick={() => setIsOpen(false)} className="w-full py-2.5 text-center text-zinc-300 text-sm font-medium hover:text-white rounded transition-colors border border-zinc-800">
            Log In
          </Link>
          <Link href="/login" onClick={() => setIsOpen(false)} className="w-full py-2.5 text-center bg-teal-600 text-white text-sm font-medium rounded hover:bg-teal-500 transition-colors">
            Start for Free
          </Link>
        </div>
      </div>
    </>
  )
}
