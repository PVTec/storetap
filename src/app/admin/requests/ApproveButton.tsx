'use client'

import { useState } from 'react'
import { approveLicenseRequest } from '@/app/actions/admin'

export default function ApproveButton({ requestId }: { requestId: string }) {
  const [isApproving, setIsApproving] = useState(false)

  const handleApprove = async () => {
    setIsApproving(true)
    const res = await approveLicenseRequest(requestId)
    if (!res.success) {
      alert(res.error)
    }
    setIsApproving(false)
  }

  return (
    <button 
      onClick={handleApprove}
      disabled={isApproving}
      className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded text-xs font-bold transition-colors disabled:opacity-50"
    >
      {isApproving ? 'Approving...' : 'Approve'}
    </button>
  )
}
