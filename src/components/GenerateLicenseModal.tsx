'use client'

import { useState } from 'react'
import { generateCustomLicense } from '@/app/actions/admin'

interface GenerateLicenseModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function GenerateLicenseModal({ isOpen, onClose, onSuccess }: GenerateLicenseModalProps) {
  const [tier, setTier] = useState('Basic')
  const [durationMode, setDurationMode] = useState<'days' | 'months'>('months')
  const [durationValue, setDurationValue] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [generatedKey, setGeneratedKey] = useState('')

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const days = durationMode === 'months' ? durationValue * 30 : durationValue

    const res = await generateCustomLicense(tier, days)
    if (res.success && res.license) {
      setGeneratedKey(res.license.licenseKey)
      onSuccess()
    } else {
      alert(res.error || 'Failed to generate license')
    }

    setIsSubmitting(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#09090b] border border-zinc-800 rounded-2xl w-full max-w-md relative shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-zinc-800/80 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-lg font-bold text-white">Generate Custom License</h2>
            <p className="text-zinc-500 text-xs mt-1">Create a new license key with a custom duration.</p>
          </div>
          <button 
            onClick={onClose}
            className="text-zinc-500 hover:text-white p-1 rounded-md hover:bg-zinc-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {generatedKey ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h2 className="text-xl font-bold text-white mb-2">License Generated!</h2>
              <div className="mb-6 p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">License Key</p>
                <p className="text-lg font-mono font-bold text-emerald-400 break-all">{generatedKey}</p>
              </div>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(generatedKey)
                  alert('Copied to clipboard!')
                }}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-lg transition-colors mb-3"
              >
                Copy License Key
              </button>
              <button 
                onClick={() => {
                  setGeneratedKey('')
                  onClose()
                }}
                className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-2.5 rounded-lg transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">License Tier</label>
                <select 
                  value={tier}
                  onChange={(e) => setTier(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Basic">Basic</option>
                  <option value="Standard">Standard</option>
                  <option value="Pro">Pro</option>
                </select>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Duration Unit</label>
                  <select 
                    value={durationMode}
                    onChange={(e) => setDurationMode(e.target.value as 'days' | 'months')}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="months">Months</option>
                    <option value="days">Days</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Duration Value</label>
                  <input 
                    type="number" 
                    min="1"
                    required
                    value={durationValue}
                    onChange={e => setDurationValue(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2.5 rounded-lg transition-colors mt-6"
              >
                {isSubmitting ? 'Generating...' : 'Generate License'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
