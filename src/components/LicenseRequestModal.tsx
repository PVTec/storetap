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
  const [ackNoPayment, setAckNoPayment] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [refNum, setRefNum] = useState<string | null>(null)
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
      setRefNum(null)
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreed || !ackNoPayment) {
      alert("You must agree to the Terms of Service and Acknowledge the payment policy.")
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
        setRefNum(res.request?.referenceNumber || null)
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
      <div className="bg-[#09090b] border border-zinc-800 rounded-2xl w-full max-w-md relative shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-zinc-800/80 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-lg font-bold text-white">Get {tier} License</h2>
            <p className="text-zinc-500 text-xs mt-1">Fill out the form below to request your StoreTap license.</p>
          </div>
          <button 
            onClick={onClose}
            className="text-zinc-500 hover:text-white p-1 rounded-md hover:bg-zinc-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
        {isSuccess ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Request Submitted Successfully</h2>
            {refNum && (
              <div className="mb-4 p-3 bg-zinc-900 border border-zinc-800 rounded-lg">
                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Reference Number</p>
                <p className="text-lg font-mono font-bold text-white">{refNum}</p>
              </div>
            )}
            <div className="text-zinc-400 text-sm mb-6 leading-relaxed text-left space-y-4">
              <p>
                Your request has been recorded. A StoreTap provider will contact you at the phone number or email you provided.
              </p>
              <p className="text-blue-400 font-medium">
                No payment is required at this stage. Please wait for the provider to verify your request and confirm that your license is ready for activation. Payment instructions will be provided only after verification.
              </p>
              <p>
                You may use this reference number when contacting support. Your request status will appear under <strong>My Pending Requests</strong>.
              </p>
            </div>
            <button 
              onClick={() => {
                onClose();
                window.location.reload();
              }}
              className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-3 rounded-lg transition-colors"
            >
              Close & View Requests
            </button>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 space-y-2 mb-2">
                <p className="text-xs text-blue-400 font-medium">Provider Verification Notice</p>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  This form submits a request for the {tier} License — {tier === 'Basic' ? '₱150 for 30 days' : tier === 'Standard' ? '₱500 for 90 days' : '₱1,500 for 150 days'}. It is not an immediate payment and your license will not be activated yet. A StoreTap provider will contact you using the information below to verify your request, confirm your store details, explain the license and activation process, and prepare the system. <strong className="text-zinc-300 font-semibold">Do not send payment until the provider confirms that your license is ready for activation.</strong>
                </p>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  After verification and payment confirmation, the license will be issued or activated according to the selected tier. The license validity period begins according to the activation rules shown below. Please make sure your contact details are correct.
                </p>
              </div>

              <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 mb-4">
                <p className="text-sm font-bold text-white mb-3">Processing Steps</p>
                <div className="space-y-4">
                  <div className="flex gap-3 text-xs">
                    <div className="shrink-0 w-5 h-5 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center font-bold">1</div>
                    <div>
                      <p className="text-zinc-300 font-semibold mb-0.5">Request submitted</p>
                      <p className="text-zinc-500 leading-tight">Customer sends contact and store details; no payment is made</p>
                    </div>
                  </div>
                  <div className="flex gap-3 text-xs">
                    <div className="shrink-0 w-5 h-5 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center font-bold">2</div>
                    <div>
                      <p className="text-zinc-300 font-semibold mb-0.5">Provider verification</p>
                      <p className="text-zinc-500 leading-tight">Provider calls/messages the customer and confirms the request</p>
                    </div>
                  </div>
                  <div className="flex gap-3 text-xs">
                    <div className="shrink-0 w-5 h-5 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center font-bold">3</div>
                    <div>
                      <p className="text-zinc-300 font-semibold mb-0.5">System prepared</p>
                      <p className="text-zinc-500 leading-tight">Provider configures or prepares the license/system and confirms readiness</p>
                    </div>
                  </div>
                  <div className="flex gap-3 text-xs">
                    <div className="shrink-0 w-5 h-5 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center font-bold">4</div>
                    <div>
                      <p className="text-zinc-300 font-semibold mb-0.5">Payment and activation</p>
                      <p className="text-zinc-500 leading-tight">Customer receives payment instructions, pays through the agreed method, and the license/system is activated or released</p>
                    </div>
                  </div>
                </div>
              </div>
              
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

              <div className="mt-4 p-3 bg-zinc-900/30 border border-zinc-800 rounded-lg text-[10px] text-zinc-500 leading-relaxed">
                Your contact details will be used to verify and process this request. They may be shared with the assigned StoreTap provider so the provider can contact you about setup and activation. We will not use your information for unrelated marketing without your consent. See the <a href="/privacy" target="_blank" className="text-blue-400 hover:underline">Privacy Policy</a>.
              </div>

              <div className="flex items-start gap-3 mt-6">
                <input 
                  type="checkbox" 
                  id="ackNoPayment" 
                  checked={ackNoPayment}
                  onChange={e => setAckNoPayment(e.target.checked)}
                  className="mt-1 bg-zinc-900 border-zinc-700 rounded cursor-pointer shrink-0"
                />
                <label htmlFor="ackNoPayment" className="text-xs text-zinc-400 cursor-pointer leading-relaxed">
                  I understand that this form submits a request only. No payment is being made now. A provider will contact me to verify my details and confirm when the license or system is ready. I will review the final price, inclusions, renewal terms, and payment instructions before paying.
                </label>
              </div>

              <div className="flex items-start gap-3 mt-4">
                <input 
                  type="checkbox" 
                  id="terms" 
                  checked={agreed}
                  onChange={e => setAgreed(e.target.checked)}
                  className="mt-1 bg-zinc-900 border-zinc-700 rounded cursor-pointer shrink-0"
                />
                <label htmlFor="terms" className="text-xs text-zinc-400 cursor-pointer leading-relaxed">
                  I accept the StoreTap <a href="/terms" target="_blank" className="text-blue-400 hover:underline">Terms of Service</a> and Privacy Policy.
                </label>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting || !agreed || !ackNoPayment}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-colors mt-6"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request — No Payment Yet'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  </div>
  )
}
