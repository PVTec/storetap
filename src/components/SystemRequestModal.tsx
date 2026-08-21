'use client'
import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { createSystemRequest } from '@/app/actions/system'

interface SystemRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  systemType: 'web' | 'app';
}

export default function SystemRequestModal({ isOpen, onClose, systemType }: SystemRequestModalProps) {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [refNum, setRefNum] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [agreed, setAgreed] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    backupContact: '',
    storeName: ''
  })

  const price = systemType === 'web' ? '₱250' : '₱750'
  const title = systemType === 'web' ? 'Web Version' : 'App Version'

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
      setFormData(prev => ({ ...prev, contactNumber: '', name: '', backupContact: '', storeName: '' }))
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreed) {
      setError('You must agree to the Terms of Service to proceed.')
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
      <div className="bg-[#09090b] border border-zinc-800 rounded-2xl w-full max-w-md relative z-10 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        <div className="p-6 border-b border-zinc-800/80 flex items-center justify-between">
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

        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Request Submitted!</h3>
              {refNum && (
                <div className="mb-4 p-3 bg-zinc-900 border border-zinc-800 rounded-lg">
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Reference Number</p>
                  <p className="text-lg font-mono font-bold text-white">{refNum}</p>
                </div>
              )}
              <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                Your system request has been submitted successfully. Please prepare your payment of {price} and wait for the provider to contact you.
              </p>
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg mb-6">
                <p className="text-sm text-blue-400 font-medium">Or message Vincent directly:</p>
                <a href="https://www.facebook.com/VincentLayonuser" target="_blank" className="text-sm text-white font-bold underline mt-1 inline-block hover:text-blue-300">
                  Vincent Layon on Facebook
                </a>
              </div>
              <button 
                onClick={onClose}
                className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm rounded-lg">
                  {error}
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1.5">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
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
                  className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
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
                  className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="09987654321"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1.5">Custom Branding Store Name <span className="text-zinc-600 font-normal">(Optional)</span></label>
                <input 
                  type="text" 
                  value={formData.storeName}
                  onChange={e => setFormData({...formData, storeName: e.target.value})}
                  className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
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
                  className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="juan@example.com"
                />
                <p className="text-[10px] text-zinc-500 mt-1.5">Must be an active email address we can contact.</p>
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-start pt-1">
                    <input 
                      type="checkbox" 
                      className="sr-only"
                      checked={agreed}
                      onChange={e => setAgreed(e.target.checked)}
                    />
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${agreed ? 'bg-blue-500 border-blue-500' : 'border-zinc-700 group-hover:border-zinc-500 bg-black'}`}>
                      {agreed && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                    </div>
                  </div>
                  <span className="text-xs text-zinc-400 leading-relaxed">
                    I accept and agree to the <a href="/terms" target="_blank" className="text-blue-400 hover:underline">Terms of Service</a>. I understand that the free license bundled with this purchase is valid for 1 month upon approval.
                  </span>
                </label>
              </div>

              <div className="pt-4 border-t border-zinc-800/80">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-3 bg-white text-black font-bold rounded-lg transition-colors hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : 'Proceed Request'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
