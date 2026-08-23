"use client"
import { useState } from 'react'
import { sendProviderOTP, verifyProviderOTP } from '@/app/actions/admin'

interface ProviderOnboardingProps {
  email: string
  onComplete: () => void
}

export default function ProviderOnboarding({ email, onComplete }: ProviderOnboardingProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await sendProviderOTP(phone)
      if (res.success) {
        setStep(3)
      } else {
        setError("Failed to send OTP.")
      }
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await verifyProviderOTP(email, phone, otp)
      if (res.success) {
        onComplete()
      } else {
        setError(res.error || "Failed to verify OTP.")
      }
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#000000] flex items-center justify-center p-4">
      <div className="w-full max-w-[500px] bg-[#09090b] border border-zinc-800/80 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-500/5 blur-xl -z-10 rounded-2xl"></div>
        
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 border border-blue-500/20 shadow-lg shadow-blue-500/10">
              <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-3">Welcome, Provider!</h1>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              You've been upgraded to a **Provider** on StoreTap. As a Provider, you are a certified partner empowered to review, approve, and deploy system requests and licenses for clients.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg></div>
                <div>
                  <h3 className="text-white text-sm font-semibold">Approve Systems</h3>
                  <p className="text-zinc-500 text-xs">Review incoming requests and process system deployments.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 mt-0.5"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/></svg></div>
                <div>
                  <h3 className="text-white text-sm font-semibold">Generate Licenses</h3>
                  <p className="text-zinc-500 text-xs">Approve license requests for new and existing clients.</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setStep(2)}
              className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 transition-colors shadow-lg"
            >
              Get Started
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button onClick={() => setStep(1)} className="text-zinc-500 hover:text-white mb-6 flex items-center gap-2 text-sm transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
              Back
            </button>
            <h2 className="text-xl font-bold text-white mb-2">Verify your mobile number</h2>
            <p className="text-zinc-400 text-sm mb-6">For security reasons, Providers must have a verified contact number on file.</p>
            
            {error && (
              <div className="bg-red-500/10 text-red-400 p-3 rounded-lg text-sm mb-6 border border-red-500/20">
                {error}
              </div>
            )}

            <form onSubmit={handleSendOTP} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1.5">Mobile Number</label>
                <input 
                  type="tel"
                  required
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-blue-500 rounded-lg px-4 py-3 text-white outline-none transition-colors"
                />
              </div>
              <button 
                type="submit" 
                disabled={loading || !phone}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors disabled:opacity-50 mt-4"
              >
                {loading ? 'Sending...' : 'Send Verification Code'}
              </button>
            </form>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button onClick={() => setStep(2)} className="text-zinc-500 hover:text-white mb-6 flex items-center gap-2 text-sm transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
              Back
            </button>
            <h2 className="text-xl font-bold text-white mb-2">Enter Verification Code</h2>
            <p className="text-zinc-400 text-sm mb-6">We simulated sending an SMS to {phone}.<br/>(Use code <strong>123456</strong> for testing).</p>
            
            {error && (
              <div className="bg-red-500/10 text-red-400 p-3 rounded-lg text-sm mb-6 border border-red-500/20">
                {error}
              </div>
            )}

            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1.5">6-Digit Code</label>
                <input 
                  type="text"
                  required
                  maxLength={6}
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-blue-500 rounded-lg px-4 py-3 text-white outline-none transition-colors text-center text-2xl tracking-widest font-mono"
                />
              </div>
              <button 
                type="submit" 
                disabled={loading || otp.length < 6}
                className="w-full py-3 bg-white hover:bg-zinc-200 text-black font-bold rounded-lg transition-colors disabled:opacity-50 mt-4"
              >
                {loading ? 'Verifying...' : 'Verify & Continue'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
