"use client"
import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import Image from 'next/image'
import Link from 'next/link'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const handleGoogleLogin = async () => {
    setLoading(true)
    setError(null)
    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      })
      
      if (error) throw error
    } catch (e: any) {
      setError(e.message)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center p-4">
      
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <div className="text-center mb-8">
          <Link href="/">
            <Image src="/icon.svg" alt="StoreTap Logo" width={48} height={48} className="mx-auto mb-5" />
          </Link>
          <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Welcome Back</h1>
          <p className="text-slate-500 text-sm font-medium">Sign in to your StoreTap account</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm font-medium p-4 rounded-xl mb-6 text-center">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <button 
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3.5 px-4 rounded-xl transition-all shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            {loading ? 'Connecting...' : 'Continue with Google'}
          </button>

          <div className="relative py-4 flex items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink-0 mx-4 text-slate-400 text-xs uppercase font-bold tracking-wider">Or</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          <div className="space-y-4 opacity-40 pointer-events-none">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Email address</label>
              <input type="email" placeholder="name@company.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 outline-none" disabled />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Password</label>
              <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 outline-none" disabled />
            </div>
            <button disabled className="w-full py-3.5 bg-blue-600 text-white font-bold rounded-xl">
              Sign In
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center text-sm font-medium text-slate-500">
        <Link href="/" className="hover:text-slate-800 transition-colors">← Back to home</Link>
      </div>
    </div>
  )
}
