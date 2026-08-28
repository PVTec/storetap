"use client"
import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const getSupabase = () => createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError(null)
    try {
      const supabase = getSupabase()
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })
      
      if (error) throw error
    } catch (e: any) {
      setError(e.message)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex text-white selection:bg-teal-500/30 font-sans">
      
      {/* LEFT SIDE: Form & Action */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-16 relative">
        {/* Back Button */}
        <Link href="/" className="absolute top-8 left-8 text-zinc-500 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium z-10">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to Site
        </Link>

        <div className="w-full max-w-sm relative z-10">
          <div className="mb-10 text-center lg:text-left">
            <img src="/logo-with-text.png" alt="StoreTap Logo" className="h-10 mx-auto lg:mx-0 mb-8 object-contain" />
            <h1 className="text-3xl font-bold tracking-tight text-white mb-3">
              Welcome back
            </h1>
            <p className="text-zinc-400">
              Log in to access your dashboard.
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium p-3 rounded-lg mb-6 text-center">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <button 
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-zinc-200 text-black font-bold py-3.5 px-4 rounded-xl transition-all shadow-sm disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {loading ? 'Connecting...' : 'Continue with Google'}
            </button>

            <div className="bg-[#0c0c0e] border border-zinc-800/80 rounded-xl p-5 text-center shadow-lg transition-colors hover:border-zinc-700">
              <div className="flex items-center justify-center gap-2 mb-2 text-teal-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                <span className="font-bold text-sm tracking-wide">Secure Sign-In</span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed max-w-[260px] mx-auto">
                We exclusively use Google authentication to ensure your store's data stays protected. Fast, secure, and passwordless.
              </p>
            </div>

            <p className="text-center text-[11px] text-zinc-600 mt-8 leading-relaxed max-w-[280px] mx-auto">
              By continuing, you agree to StoreTap's <Link href="/terms" className="underline hover:text-zinc-400">Terms of Use</Link> and <Link href="/privacy" className="underline hover:text-zinc-400">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Visual & Trust (Hidden on small screens) */}
      <div className="hidden lg:flex w-1/2 bg-[#0c0c0e] border-l border-zinc-800/50 relative items-center justify-center overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 p-12 max-w-lg text-center flex flex-col items-center">
          {/* Abstract App UI Mockup */}
          <div className="w-[300px] h-[450px] bg-[#0a0a0a] rounded-[2rem] border border-zinc-800 shadow-[0_0_50px_rgba(20,184,166,0.1)] relative overflow-hidden mb-12 transform transition-transform duration-700 hover:scale-[1.02]">
            <div className="absolute inset-0 ring-1 ring-inset ring-white/5 rounded-[2rem] z-20 pointer-events-none"></div>
            <div className="h-12 border-b border-zinc-800/80 flex items-center px-5 bg-[#0c0c0e]">
               <div className="flex gap-1.5">
                 <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                 <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                 <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
               </div>
            </div>
            <div className="p-6 space-y-4 relative z-10">
              <div className="h-16 bg-[#121214] rounded-xl border border-zinc-800/80"></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="h-24 bg-teal-500/5 rounded-xl border border-teal-500/20 flex flex-col justify-center px-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-12 h-12 bg-teal-500/10 blur-xl rounded-full"></div>
                  <div className="w-6 h-1 bg-teal-500/50 rounded-full mb-3"></div>
                  <div className="w-16 h-3 bg-teal-400 rounded-full mb-1"></div>
                  <div className="w-10 h-2 bg-teal-400/50 rounded-full"></div>
                </div>
                <div className="h-24 bg-zinc-800/20 rounded-xl border border-zinc-800/80 flex flex-col justify-center px-4">
                  <div className="w-6 h-1 bg-zinc-600 rounded-full mb-3"></div>
                  <div className="w-16 h-3 bg-zinc-500 rounded-full mb-1"></div>
                  <div className="w-10 h-2 bg-zinc-600 rounded-full"></div>
                </div>
              </div>
              <div className="h-8 bg-[#121214] rounded-lg border border-zinc-800/80 w-2/3 mt-2"></div>
              <div className="space-y-3 pt-3 border-t border-zinc-800/50">
                <div className="h-14 bg-gradient-to-r from-[#121214] to-[#0c0c0e] rounded-lg border border-zinc-800/50"></div>
                <div className="h-14 bg-gradient-to-r from-[#121214] to-[#0c0c0e] rounded-lg border border-zinc-800/50"></div>
              </div>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">The Future of Local Retail</h2>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-sm mx-auto">
            Join the growing network of sari-sari stores, cafés, and local shops that trust StoreTap to run smoothly—even offline.
          </p>
        </div>
      </div>
      
    </div>
  )
}
