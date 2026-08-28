'use client'
import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { createSystemRequest } from '@/app/actions/system'

interface SystemRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  systemType: 'web' | 'app' | 'free-web';
}

export default function SystemRequestModal({ isOpen, onClose, systemType }: SystemRequestModalProps) {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [refNum, setRefNum] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [ackNoPayment, setAckNoPayment] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    backupContact: '',
    storeName: ''
  })

  const price = systemType === 'free-web' ? '₱0 (Free Limited)' : systemType === 'web' ? '₱249' : '₱749'
  const title = systemType === 'free-web' ? 'Free Web Version' : systemType === 'web' ? 'Web Version' : 'Web Plus App'

  useEffect(() => {
    if (isOpen) {
      const fetchUser = async () => {
        const supabase = createBrowserClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )
        const { data: { user } } = await supabase.auth.getUser()
        if (user?.email) {
          setFormData(prev => ({ ...prev, email: user.email! }))
        }
      }
      fetchUser()
      setRefNum(null)
    } else {
      setSubmitted(false)
      setError('')
      setAgreed(false)
      setAckNoPayment(false)
      setFormData(prev => ({ ...prev, contactNumber: '', name: '', backupContact: '', storeName: '' }))
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreed || !ackNoPayment) {
      setError('You must agree to the Terms of Service and Acknowledge the payment policy.')
      return
    }
    
    setLoading(true)
    setError('')
    try {
      const res = await createSystemRequest({
        name: formData.name,
        email: formData.email,
        contactNumber: formData.contactNumber,
        backupContact: formData.backupContact,
        storeName: formData.storeName,
        type: systemType
      })
      if (res.success) {
        setRefNum(res.data?.referenceNumber || null)
        setSubmitted(true)
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-0">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-[#0c0c0e] border border-zinc-800 rounded-2xl w-full max-w-md relative z-10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        
        <div className="p-6 border-b border-zinc-800/80 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-lg font-bold text-white">Purchase System</h2>
            <p className="text-zinc-500 text-xs mt-1">You are requesting the {title} ({price})</p>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-white p-1 rounded-md hover:bg-zinc-800 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Request Submitted Successfully</h3>
              {refNum && (
                <div className="mb-4 p-3 bg-zinc-900 border border-zinc-800 rounded-lg">
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Reference Number</p>
                  <p className="text-lg font-mono font-bold text-white">{refNum}</p>
                </div>
              )}
              <div className="text-sm text-zinc-400 mb-6 leading-relaxed text-left space-y-4">
                <p>
                  Your request has been recorded. A StoreTap provider will contact you at the phone number or email you provided.
                </p>
                <p className="text-teal-400 font-medium">
                  No payment is required at this stage. Please wait for the provider to verify your request and confirm that your system is ready for release. Payment instructions will be provided only after verification.
                </p>
                <p>
                  You may use this reference number when contacting support. Your request status will appear under <strong>My Pending Requests</strong>.
                </p>
              </div>
              <div className="p-4 bg-teal-500/10 border border-teal-500/20 rounded-lg mb-6 text-left">
                <p className="text-sm text-teal-400 font-medium">Or message Vincent directly:</p>
                <a href="https://www.facebook.com/VincentLayonuser" target="_blank" className="text-sm text-white font-bold underline mt-1 inline-block hover:text-teal-300">
                  Vincent Layon on Facebook
                </a>
              </div>
              <button 
                onClick={() => {
                  onClose();
                  window.location.reload();
                }}
                className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-lg transition-colors"
              >
                Close & View Requests
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm rounded-lg">
                  {error}
                </div>
              )}

              {systemType === 'free-web' && (
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 space-y-2">
                  <p className="text-xs text-amber-400 font-medium">⚠️ Automatic Deactivation Policy</p>
                  <p className="text-xs text-zinc-400">
                    This free system is intended for trial and evaluation. If the system remains completely unused (no sales, no inventory changes) for <strong className="text-zinc-300">1 month</strong> after approval, the system and its database will be permanently deactivated and deleted to save server resources.
                  </p>
                  <p className="text-xs text-zinc-400">
                    You also <strong className="text-zinc-300">do not receive</strong> a free Basic License with this tier.
                  </p>
                </div>
              )}

              {systemType !== 'free-web' && (
                <div className="bg-teal-500/5 border border-teal-500/20 rounded-xl overflow-hidden mb-4">
                  <div className="p-4 space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-4 h-4 text-teal-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>
                      <p className="text-xs text-teal-400 font-bold tracking-wide uppercase">Provider Setup Notice</p>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      This form submits a request for the {title} — {price} one-time setup fee. It is not an immediate payment. A StoreTap provider will contact you to verify your store details, confirm the requested branding and setup, explain what is included, and prepare the system. <strong className="text-zinc-300 font-semibold">Do not send payment until the provider confirms that the system is ready for release.</strong>
                    </p>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {systemType === 'app' ? 'This package includes the app/setup, hosting/database, and a 30-day Business Pro license. The Pro license is temporary and renewal is separate.' : 'The included Starter license is valid for 30 days according to the offer shown on this page. Continued use after the included period may require license renewal.'} Hosting, database availability, inactivity limits, support, and renewal terms are described below.
                    </p>
                  </div>
                  <div className="bg-teal-500/10 p-4 border-t border-teal-500/10">
                    <p className="text-xs font-semibold text-teal-300 mb-1.5 flex items-center gap-2">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                      About StoreTap Providers
                    </p>
                    <p className="text-[11px] text-teal-200/70 leading-relaxed">
                      StoreTap Providers are authorized representatives who assist with system setup and deployment. They act on behalf of StoreTap and are not independent sellers. All core infrastructure, maintenance, and data privacy remain fully managed by StoreTap.
                    </p>
                  </div>
                </div>
              )}

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
                <label className="block text-sm font-medium text-zinc-400 mb-1.5">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-teal-500 transition-colors"
                  placeholder="Juan Dela Cruz"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1.5">Active Contact Number</label>
                <input 
                  type="text" 
                  required
                  value={formData.contactNumber}
                  onChange={e => setFormData({...formData, contactNumber: e.target.value})}
                  className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-teal-500 transition-colors"
                  placeholder="09123456789"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1.5">Backup Contact Number</label>
                <input 
                  type="text" 
                  required
                  value={formData.backupContact}
                  onChange={e => setFormData({...formData, backupContact: e.target.value})}
                  className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-teal-500 transition-colors"
                  placeholder="09987654321"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1.5">Custom Branding Store Name <span className="text-zinc-600 font-normal">(Optional)</span></label>
                <input 
                  type="text" 
                  value={formData.storeName}
                  onChange={e => setFormData({...formData, storeName: e.target.value})}
                  className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-teal-500 transition-colors"
                  placeholder="e.g. Juan's Sari-Sari Store"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1.5">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-teal-500 transition-colors"
                  placeholder="juan@example.com"
                />
                <p className="text-[10px] text-zinc-500 mt-1.5">Must be an active email address we can contact.</p>
              </div>

              <div className="mt-4 p-3 bg-zinc-900/30 border border-zinc-800 rounded-lg text-[10px] text-zinc-500 leading-relaxed">
                Your contact details will be used to verify and process this request. They may be shared with the assigned StoreTap provider so the provider can contact you about setup and activation. We will not use your information for unrelated marketing without your consent. See the <a href="/privacy" target="_blank" className="text-teal-400 hover:underline">Privacy Policy</a>.
              </div>

              <div className="pt-2 space-y-4">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-start pt-1 shrink-0">
                    <input 
                      type="checkbox" 
                      className="sr-only"
                      checked={ackNoPayment}
                      onChange={e => setAckNoPayment(e.target.checked)}
                    />
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${ackNoPayment ? 'bg-teal-500 border-teal-500' : 'border-zinc-700 group-hover:border-zinc-500 bg-black'}`}>
                      {ackNoPayment && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                    </div>
                  </div>
                  <span className="text-xs text-zinc-400 leading-relaxed">
                    I understand that this form submits a request only. No payment is being made now. A provider will contact me to verify my details and confirm when the license or system is ready. I will review the final price, inclusions, renewal terms, and payment instructions before paying.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-start pt-1 shrink-0">
                    <input 
                      type="checkbox" 
                      className="sr-only"
                      checked={agreed}
                      onChange={e => setAgreed(e.target.checked)}
                    />
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${agreed ? 'bg-teal-500 border-teal-500' : 'border-zinc-700 group-hover:border-zinc-500 bg-black'}`}>
                      {agreed && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                    </div>
                  </div>
                  <span className="text-xs text-zinc-400 leading-relaxed">
                    I accept the StoreTap <a href="/terms" target="_blank" className="text-teal-400 hover:underline">Terms of Service</a> and Privacy Policy. I understand that the free license bundled with this purchase is valid for 1 month upon approval.
                  </span>
                </label>
              </div>

              <div className="pt-4 border-t border-zinc-800/80">
                <button 
                  type="submit" 
                  disabled={loading || !agreed || !ackNoPayment}
                  className="w-full py-3 bg-white text-black font-bold rounded-lg transition-colors hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : 'Submit Request — No Payment Yet'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
