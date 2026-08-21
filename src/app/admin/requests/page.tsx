import prisma from '@/lib/prisma'
import Navigation from '@/components/Navigation'
import RequestActions from './RequestActions'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AdminRequestsPage() {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session || (session.user.email !== 'vincentlayonuser@gmail.com' && session.user.email !== 'admin@vince.dev')) {
    redirect('/')
  }

  const requests = await prisma.licenseRequest.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="min-h-screen bg-[#000000] text-zinc-300 font-sans selection:bg-blue-500/30">
      <Navigation />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 md:pt-32 pb-32">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 tracking-tight">License Requests</h1>
        
        {/* Desktop Table View */}
        <div className="hidden md:block bg-[#09090b] rounded-xl border border-zinc-800/80 shadow-2xl overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-900/50 border-b border-zinc-800/80 text-xs uppercase tracking-wider font-semibold text-zinc-500">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Tier</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {requests.map(req => (
                <tr key={req.id} className="hover:bg-zinc-900/30 transition-colors group">
                  <td className="px-6 py-4 text-zinc-400 font-medium">{req.createdAt.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                  <td className="px-6 py-4">
                    <div className="text-white font-bold">{req.name}</div>
                    <div className="text-zinc-500 text-xs">{req.email}</div>
                  </td>
                  <td className="px-6 py-4 text-zinc-300 font-medium">{req.contactNumber}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide ${
                      req.tier.toLowerCase() === 'pro' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                      req.tier.toLowerCase() === 'standard' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                      'bg-zinc-800 text-zinc-400 border border-zinc-700'
                    }`}>
                      {req.tier}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                      req.status === 'pending' ? 'text-amber-400 bg-amber-500/10 border border-amber-500/20' : 
                      req.status === 'approved' ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' : 
                      'text-rose-400 bg-rose-500/10 border border-rose-500/20'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        req.status === 'pending' ? 'bg-amber-400' :
                        req.status === 'approved' ? 'bg-emerald-400' : 'bg-rose-400'
                      }`}></span>
                      <span className="capitalize">{req.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {req.status === 'pending' && (
                      <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                        <RequestActions requestId={req.id} />
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              
              {requests.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-zinc-500 font-medium">No requests found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {requests.map(req => (
            <div key={req.id} className="bg-[#09090b] rounded-xl border border-zinc-800/80 p-5 shadow-lg relative overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white leading-tight">{req.name}</h3>
                  <p className="text-zinc-500 text-sm mt-0.5">{req.email}</p>
                </div>
                <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${
                  req.tier.toLowerCase() === 'pro' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                  req.tier.toLowerCase() === 'standard' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                  'bg-zinc-800 text-zinc-400 border border-zinc-700'
                }`}>
                  {req.tier}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-y-3 mb-5 text-sm">
                <div>
                  <p className="text-[10px] uppercase font-bold text-zinc-600 mb-1 tracking-wider">Contact</p>
                  <p className="text-zinc-300 font-medium">{req.contactNumber}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-zinc-600 mb-1 tracking-wider">Date</p>
                  <p className="text-zinc-300 font-medium">{req.createdAt.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-[10px] uppercase font-bold text-zinc-600 mb-1 tracking-wider">Status</p>
                  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${
                    req.status === 'pending' ? 'text-amber-400' : 
                    req.status === 'approved' ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      req.status === 'pending' ? 'bg-amber-400' :
                      req.status === 'approved' ? 'bg-emerald-400' : 'bg-rose-400'
                    }`}></span>
                    <span className="capitalize">{req.status}</span>
                  </span>
                </div>
              </div>

              {req.status === 'pending' && (
                <div className="pt-4 border-t border-zinc-800/80">
                  <RequestActions requestId={req.id} />
                </div>
              )}
            </div>
          ))}
          
          {requests.length === 0 && (
            <div className="bg-[#09090b] rounded-xl border border-zinc-800/80 p-8 text-center text-zinc-500 font-medium">
              No requests found.
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
