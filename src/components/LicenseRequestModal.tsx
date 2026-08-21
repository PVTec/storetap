'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { createLicenseRequest } from '@/app/actions/license'

interface LicenseRequestModalProps {
  isOpen: boolean
  onClose: () => void
  tier: string
}

export default function LicenseRequestModal({ isOpen, onClose, tier }: LicenseRequestModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [userLogged, setUserLogged] = useState(false)

  useEffect(() => {
    async function getUser() {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user?.email) {
        setEmail(session.user.email)
        setUserLogged(true)
        if (session.user.user_metadata?.full_name) {
          setName(session.user.user_metadata.full_name)
        }
      }
    }
    if (isOpen) {
      getUser()
      setIsSuccess(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreed) {
      alert("You must agree to the Terms of Services")
      return
    }
    
    setIsSubmitting(true)
    try {
      const res = await createLicenseRequest({
        name,
        email,
        contactNumber,
        tier
      })
      if (res.success) {
        setIsSuccess(true)
      } else {
        alert(res.error || "Failed to submit request")
      }
    } catch (err) {
      alert("An error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#09090b] border border-zinc-800 rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {isSuccess ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Request Submitted!</h2>
            <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
              Your request is already submitted. Please wait for the provider to contact you or you can message him through this link: <a href="https://www.facebook.com/VincentLayonuser" target="_blank" className="text-blue-400 hover:underline">Vincent Layon</a>.
              <br /><br />
              Please prepare your payment so we can activate your {tier} license immediately.
            </p>
            <button 
              onClick={onClose}
              className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-2 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold text-white mb-2">Get {tier} License</h2>
            <p className="text-zinc-400 text-sm mb-6">Fill out the form below to request your StoreTap license.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                  placeholder="Juan Dela Cruz"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Active Contact Number</label>
                <input 
                  type="tel" 
                  required
                  value={contactNumber}
                  onChange={e => setContactNumber(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                  placeholder="09123456789"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  readOnly={userLogged}
                  onChange={e => !userLogged && setEmail(e.target.value)}
                  className={`w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 ${userLogged ? 'opacity-60 cursor-not-allowed' : ''}`}
                  placeholder="juan@example.com"
                />
                {userLogged && <p className="text-xs text-zinc-500 mt-1">Using your logged-in account email.</p>}
              </div>

              <div className="flex items-start gap-3 mt-6">
                <input 
                  type="checkbox" 
                  id="terms" 
                  checked={agreed}
                  onChange={e => setAgreed(e.target.checked)}
                  className="mt-1 bg-zinc-900 border-zinc-700 rounded cursor-pointer"
                />
                <label htmlFor="terms" className="text-sm text-zinc-400 cursor-pointer">
                  I accept and agree to the <a href="/terms" target="_blank" className="text-blue-400 hover:underline">Terms of Services</a>.
                </label>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting || !agreed}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2.5 rounded-lg transition-colors mt-6"
              >
                {isSubmitting ? 'Submitting...' : 'Proceed'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
