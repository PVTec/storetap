import { useState } from 'react'

interface SystemApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: any;
  onApprove: (attachmentLink: string) => Promise<void>;
}

export default function SystemApprovalModal({ isOpen, onClose, request, onApprove }: SystemApprovalModalProps) {
  const [attachmentLink, setAttachmentLink] = useState('')
  const [paymentConfirmed, setPaymentConfirmed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isOpen || !request) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!paymentConfirmed) return

    setIsSubmitting(true)
    await onApprove(attachmentLink)
    setIsSubmitting(false)
    onClose()
  }

  const generatedTier = request.type === 'web' ? 'BASIC' : 'PRO'

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-0">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-[#09090b] border border-zinc-800 rounded-2xl w-full max-w-md sm:max-w-xl relative z-10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        
        <div className="p-6 border-b border-zinc-800/80 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-lg font-bold text-emerald-400">Approve System Request</h2>
            <p className="text-zinc-400 text-xs mt-1">Review and attach files before finalizing approval.</p>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-white p-1 rounded-md hover:bg-zinc-800 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Review Section */}
            <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl space-y-3">
              <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wide">Client Review</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-zinc-500 text-xs">Name</p>
                  <p className="text-zinc-300">{request.name}</p>
                </div>
                <div>
                  <p className="text-zinc-500 text-xs">Type</p>
                  <p className="text-zinc-300 capitalize">{request.requestType} ({request.type})</p>
                </div>
                <div>
                  <p className="text-zinc-500 text-xs">Store / Branding</p>
                  <p className="text-zinc-300">{request.storeName || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-zinc-500 text-xs">Bundled License</p>
                  <p className="text-emerald-400 font-medium">1 Month {generatedTier}</p>
                </div>
              </div>
            </div>

            {/* Inputs */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">Attachment Link / File URL</label>
              <input 
                type="url" 
                required
                value={attachmentLink}
                onChange={e => setAttachmentLink(e.target.value)}
                className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-zinc-600"
                placeholder="https://drive.google.com/..."
              />
              <p className="text-xs text-zinc-500 mt-1.5">Provide a link where the client can download or access their finished system.</p>
            </div>

            {/* Payment Check */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-start pt-0.5">
                  <input 
                    type="checkbox" 
                    className="sr-only"
                    checked={paymentConfirmed}
                    onChange={e => setPaymentConfirmed(e.target.checked)}
                  />
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${paymentConfirmed ? 'bg-emerald-500 border-emerald-500' : 'border-zinc-700 group-hover:border-zinc-500 bg-black'}`}>
                    {paymentConfirmed && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                  </div>
                </div>
                <div className="text-sm">
                  <p className="text-white font-medium">Payment Confirmed</p>
                  <p className="text-xs text-zinc-400 mt-0.5">I verify that the client has successfully paid the required amount for this system.</p>
                </div>
              </label>
            </div>

            <div className="pt-4 border-t border-zinc-800/80">
              <button 
                type="submit" 
                disabled={isSubmitting || !paymentConfirmed || !attachmentLink}
                className="w-full py-3 bg-emerald-600 text-white font-bold rounded-lg transition-colors hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
              >
                {isSubmitting ? 'Approving...' : 'Confirm Approval & Generate License'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}
