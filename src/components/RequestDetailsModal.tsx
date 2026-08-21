export default function RequestDetailsModal({ 
  isOpen, 
  onClose, 
  request 
}: { 
  isOpen: boolean, 
  onClose: () => void,
  request: any
}) {
  if (!isOpen || !request) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-0">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-[#09090b] border border-zinc-800 rounded-2xl w-full max-w-md sm:max-w-2xl relative z-10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        
        <div className="p-6 border-b border-zinc-800/80 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-lg font-bold text-white">Request Details</h2>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-white p-1 rounded-md hover:bg-zinc-800 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">Reference Number</label>
              <div className="text-white font-mono font-medium">{request.referenceNumber || 'N/A'}</div>
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">Type</label>
              <div className="text-white capitalize">{request.requestType}</div>
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">Name</label>
              <div className="text-white">{request.name}</div>
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">Email</label>
              <div className="text-zinc-300">{request.email}</div>
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">Contact Number</label>
              <div className="text-zinc-300">{request.contactNumber}</div>
            </div>
            
            {request.requestType === 'system' && (
              <>
                <div>
                  <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">Backup Contact</label>
                  <div className="text-zinc-300">{request.backupContact}</div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">Store Name (Branding)</label>
                  <div className="text-zinc-300">{request.storeName || 'N/A'}</div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">Requested Tier</label>
              <div className="text-white">{request.tier}</div>
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">Date</label>
              <div className="text-zinc-300">{new Date(request.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-zinc-800/80">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-lg border border-transparent bg-zinc-800 px-4 py-2.5 text-sm font-bold text-white hover:bg-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 transition-colors"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
