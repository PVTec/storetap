import prisma from '@/lib/prisma'
import Navigation from '@/components/Navigation'
import ApproveButton from './ApproveButton'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AdminRequestsPage() {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session || session.user.email !== 'vincentlayonuser@gmail.com') {
    redirect('/')
  }

  const requests = await prisma.licenseRequest.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="min-h-screen bg-[#000000] text-zinc-300 font-sans">
      <Navigation />
      
      <main className="max-w-6xl mx-auto px-6 pt-32 pb-32">
        <h1 className="text-3xl font-bold text-white mb-8">License Requests</h1>
        
        <div className="bg-[#09090b] rounded-xl border border-zinc-800 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-900 border-b border-zinc-800">
              <tr>
                <th className="px-6 py-4 font-medium text-zinc-400">Date</th>
                <th className="px-6 py-4 font-medium text-zinc-400">Name</th>
                <th className="px-6 py-4 font-medium text-zinc-400">Contact</th>
                <th className="px-6 py-4 font-medium text-zinc-400">Tier</th>
                <th className="px-6 py-4 font-medium text-zinc-400">Status</th>
                <th className="px-6 py-4 font-medium text-zinc-400 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {requests.map(req => (
                <tr key={req.id} className="hover:bg-zinc-900/50">
                  <td className="px-6 py-4 text-zinc-300">{req.createdAt.toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <div className="text-white font-medium">{req.name}</div>
                    <div className="text-zinc-500 text-xs">{req.email}</div>
                  </td>
                  <td className="px-6 py-4 text-zinc-300">{req.contactNumber}</td>
                  <td className="px-6 py-4">
                    <span className="bg-zinc-800 text-white px-2 py-1 rounded text-xs font-semibold uppercase">{req.tier}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      req.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' : 
                      req.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500' : 
                      'bg-red-500/10 text-red-500'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {req.status === 'pending' && (
                      <ApproveButton requestId={req.id} />
                    )}
                  </td>
                </tr>
              ))}
              
              {requests.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-zinc-500">No requests found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
