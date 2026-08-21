'use client'

import { useState } from 'react'
import { approveLicenseRequest, rejectLicenseRequest, approveSystemRequest, rejectSystemRequest } from '@/app/actions/admin'

export default function RequestActions({ 
  requestId, 
  requestType, 
  onSuccess,
  onApproveSystemClick
}: { 
  requestId: string, 
  requestType: 'license' | 'system', 
  onSuccess?: () => void,
  onApproveSystemClick?: () => void
}) {
  const [isApproving, setIsApproving] = useState(false)
  const [isRejecting, setIsRejecting] = useState(false)

  const handleApprove = async () => {
    if (requestType === 'system' && onApproveSystemClick) {
      onApproveSystemClick()
      return
    }

    setIsApproving(true)
    const res = await approveLicenseRequest(requestId)
    
    if (!res.success) {
      alert(res.error)
    } else if (onSuccess) {
      onSuccess()
    }
    setIsApproving(false)
  }

  const handleReject = async () => {
    if (!confirm("Are you sure you want to reject and delete this request?")) return;
    
    setIsRejecting(true)
    const res = requestType === 'license'
      ? await rejectLicenseRequest(requestId)
      : await rejectSystemRequest(requestId)
      
    if (!res.success) {
      alert(res.error)
    } else if (onSuccess) {
      onSuccess()
    }
    setIsRejecting(false)
  }

  return (
    <div className="flex items-center gap-2">
      <button 
        onClick={handleApprove}
        disabled={isApproving || isRejecting}
        className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors disabled:opacity-50 flex-1 sm:flex-none justify-center"
      >
        {isApproving ? 'Approving...' : 'Approve'}
      </button>
      <button 
        onClick={handleReject}
        disabled={isApproving || isRejecting}
        className="border border-rose-500/50 text-rose-400 hover:bg-rose-500/10 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors disabled:opacity-50 flex-1 sm:flex-none justify-center"
      >
        {isRejecting ? 'Rejecting...' : 'Reject'}
      </button>
    </div>
  )
}
