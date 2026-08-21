"use client"
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { createBrowserClient } from '@supabase/ssr'
import LicenseRequestModal from '@/components/LicenseRequestModal'
import { getPendingRequestsCount, getLicenseRequests, getApprovedRequests, getUsersList, getNotifications, markNotificationsRead } from '@/app/actions/admin'
import RequestActions from '@/app/admin/requests/RequestActions'
import SystemRequestModal from '@/components/SystemRequestModal'

export default function DashboardPage() {
  const [licenses, setLicenses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('licenses')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSystemModalOpen, setIsSystemModalOpen] = useState(false)
  const [selectedTier, setSelectedTier] = useState('Basic')
  const [selectedSystem, setSelectedSystem] = useState<'web'|'app'>('web')
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [adminPendingCount, setAdminPendingCount] = useState(0)
  const [hasClientPending, setHasClientPending] = useState(false)
  const [adminRequests, setAdminRequests] = useState<any[]>([])
  const [loadingAdmin, setLoadingAdmin] = useState(true)
  const [approvedRequests, setApprovedRequests] = useState<any[]>([])
  const [loadingApproved, setLoadingApproved] = useState(true)
  const [usersList, setUsersList] = useState<any[]>([])
  const [loadingUsers, setLoadingUsers] = useState(true)
  const [notifications, setNotifications] = useState<any[]>([])
  const [loadingNotifications, setLoadingNotifications] = useState(true)
  const [unreadCount, setUnreadCount] = useState(0)

  const isAdmin = userEmail === 'vincentlayonuser@gmail.com' || userEmail === 'admin@vince.dev'
  const hasBasic = licenses.some(l => l.tier.toLowerCase() === 'basic' || l.tier.toLowerCase() === 'free')

  useEffect(() => {
    fetchLicenses()
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUserEmail(user.email || null)
        const checkIsAdmin = user.email === 'vincentlayonuser@gmail.com' || user.email === 'admin@vince.dev'
        if (checkIsAdmin) {
          setActiveTab('admin')
          getPendingRequestsCount().then(count => setAdminPendingCount(count))
          fetchAdminRequests()
          fetchApprovedRequests()
          fetchUsersList()
        }
        fetchNotifications(checkIsAdmin)
      }
    } catch (e) {
      console.error("Auth error", e)
    }
  }

  const fetchAdminRequests = async () => {
    setLoadingAdmin(true)
    const reqs = await getLicenseRequests()
    setAdminRequests(reqs)
    setLoadingAdmin(false)
  }

  const fetchApprovedRequests = async () => {
    setLoadingApproved(true)
    const reqs = await getApprovedRequests()
    setApprovedRequests(reqs)
    setLoadingApproved(false)
  }

  const fetchUsersList = async () => {
    setLoadingUsers(true)
    const users = await getUsersList()
    setUsersList(users)
    setLoadingUsers(false)
  }

  const fetchNotifications = async (isAdminStatus: boolean) => {
    setLoadingNotifications(true)
    const notifs = await getNotifications(isAdminStatus)
    setNotifications(notifs)
    setUnreadCount(notifs.filter((n: any) => !n.read).length)
    setLoadingNotifications(false)
  }

  const handleTabChange = async (tab: string) => {
    setActiveTab(tab)
    setIsSidebarOpen(false)
    if (tab === 'notifications' && unreadCount > 0) {
      await markNotificationsRead(isAdmin)
      setUnreadCount(0)
      setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    }
  }

  const fetchLicenses = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/licenses')
      const data = await res.json()
      if (Array.isArray(data)) {
        setLicenses(data)
        setHasClientPending(data.some(l => l.status === 'pending'))
      }
    } catch (error) {
      console.error('Failed to fetch', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      await supabase.auth.signOut()
      window.location.href = '/'
    } catch (e) {
      console.error(e)
    }
  }

  const handleOpenModal = (tierName: string) => {
    setSelectedTier(tierName)
    setIsModalOpen(true)
  }

  const handleOpenSystemModal = (type: 'web' | 'app') => {
    setSelectedSystem(type)
    setIsSystemModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-[#000000] text-zinc-300 font-sans selection:bg-blue-500/30 flex">
      
      {/* Sidebar Mobile Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}
      
      {/* Sidebar */}
      <aside className={`fixed md:sticky top-0 inset-y-0 left-0 h-screen w-64 bg-[#09090b] border-r border-zinc-800/80 flex flex-col z-50 transition-transform duration-200 ease-in-out md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center px-6 border-b border-zinc-800/80">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/icon.svg" alt="StoreTap Logo" width={28} height={28} />
            <span className="text-lg font-bold tracking-tight text-white">StoreTap</span>
          </Link>
        </div>
        <div className="p-4 flex-1 space-y-1">
          {!isAdmin ? (
            <>
              <button 
                onClick={() => handleTabChange('licenses')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'licenses' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'}`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
                My Licenses
              </button>
              <button 
                onClick={() => handleTabChange('store')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'store' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'}`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                License Store
              </button>
              <button 
                onClick={() => handleTabChange('system-store')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'system-store' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'}`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>
                System Store
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => handleTabChange('admin')}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'admin' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'}`}
              >
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                  Pending Requests
                </div>
                {adminPendingCount > 0 && (
                  <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">{adminPendingCount}</span>
                )}
              </button>
              <button 
                onClick={() => handleTabChange('approved')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'approved' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'}`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Approved Licenses
              </button>
              <button 
                onClick={() => handleTabChange('users')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'users' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'}`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                Manage Users
              </button>
            </>
          )}

          <button 
            onClick={() => handleTabChange('notifications')}
            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'notifications' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'}`}
          >
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              Notifications
            </div>
            {unreadCount > 0 && (
              <span className="bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-full">{unreadCount}</span>
            )}
          </button>

          <button 
            onClick={() => handleTabChange('about')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'about' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'}`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            About StoreTap
          </button>
        </div>
        <div className="p-4 border-t border-zinc-800/80">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs uppercase">
              {userEmail ? userEmail.charAt(0) : 'U'}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-white truncate">{userEmail || 'User'}</p>
              <p className="text-xs text-zinc-500">{isAdmin ? 'Admin Account' : 'Client Account'}</p>
            </div>
          </div>
          <button onClick={handleSignOut} className="w-full py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold rounded-lg transition-colors border border-zinc-800">
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="h-16 md:hidden flex items-center justify-between px-6 border-b border-zinc-800/80 bg-[#09090b]">
           <div className="flex items-center gap-3">
             <button onClick={() => setIsSidebarOpen(true)} className="text-zinc-400 p-1">
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
             </button>
             <div className="flex items-center gap-2">
               <Image src="/icon.svg" alt="StoreTap Logo" width={24} height={24} />
               <span className="font-bold text-white">StoreTap</span>
             </div>
           </div>
           <button onClick={handleSignOut} className="text-xs font-bold text-zinc-400">Sign Out</button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 lg:p-10">
          <div className="max-w-5xl mx-auto">
            
            {hasClientPending && (
              <div className="mb-6 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 flex items-start gap-3 text-blue-400 animate-in fade-in slide-in-from-top-4">
                <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <div className="text-sm">
                  <p className="font-bold mb-1">You have a pending license request!</p>
                  <p className="text-blue-400/80">Please prepare your payment and wait for the provider to contact you, or message <a href="https://www.facebook.com/VincentLayonuser" target="_blank" className="underline font-medium hover:text-blue-300">Vincent Layon</a> on Facebook.</p>
                </div>
              </div>
            )}

            {activeTab === 'licenses' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h1 className="text-2xl font-bold text-white mb-2">My Licenses</h1>
                <p className="text-zinc-400 text-sm mb-8">View and manage your active StoreTap POS licenses.</p>
                
                <div className="bg-[#09090b] border border-zinc-800/80 rounded-2xl overflow-hidden shadow-xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                      <thead>
                        <tr className="bg-zinc-900/50 border-b border-zinc-800/80 text-xs uppercase tracking-wider text-zinc-500 font-semibold">
                          <th className="py-4 px-6">License Key</th>
                          <th className="py-4 px-6">Tier</th>
                          <th className="py-4 px-6">Website</th>
                          <th className="py-4 px-6">Status</th>
                          <th className="py-4 px-6">Expiration</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm divide-y divide-zinc-800/60">
                        {loading ? (
                          <tr><td colSpan={5} className="py-12 text-center text-zinc-500 font-medium">Loading licenses...</td></tr>
                        ) : licenses.length === 0 ? (
                          <tr><td colSpan={5} className="py-12 text-center text-zinc-500 font-medium">You don't have any licenses yet. Go to the Store to buy one!</td></tr>
                        ) : (
                          licenses.map(l => (
                            <tr key={l.id} className="hover:bg-zinc-900/30 transition-colors group">
                              <td className="py-4 px-6 font-mono font-medium text-white">
                                {l.status === 'pending' ? (
                                  <span className="text-zinc-500 italic text-xs">{l.licenseKey}</span>
                                ) : (
                                  <div className="flex items-center gap-2">
                                    <span>{l.licenseKey}</span>
                                    <button 
                                      onClick={() => {
                                      navigator.clipboard.writeText(l.licenseKey)
                                      setCopiedKey(l.licenseKey)
                                      setTimeout(() => setCopiedKey(null), 2000)
                                    }} 
                                    className={`${copiedKey === l.licenseKey ? 'text-emerald-400' : 'text-zinc-500 hover:text-white'} transition-colors`} 
                                    title="Copy License Key"
                                  >
                                    {copiedKey === l.licenseKey ? (
                                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    ) : (
                                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                    )}
                                  </button>
                                  </div>
                                )}
                              </td>
                              <td className="py-4 px-6">
                                <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide ${
                                  l.tier === 'pro' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                  l.tier === 'standard' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                                  'bg-zinc-800 text-zinc-400'
                                }`}>
                                  {l.tier}
                                </span>
                              </td>
                              <td className="py-4 px-6 text-sm text-zinc-300">
                                {l.websiteUrl || <span className="text-zinc-600 italic">Not activated</span>}
                              </td>
                              <td className="py-4 px-6">
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                                  l.status === 'active' ? 'text-emerald-400' :
                                  l.status === 'unused' ? 'text-amber-400' :
                                  l.status === 'pending' ? 'text-blue-400' :
                                  l.status === 'expired' ? 'text-rose-400' : 'text-zinc-400'
                                }`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${
                                    l.status === 'active' ? 'bg-emerald-400' :
                                    l.status === 'unused' ? 'bg-amber-400' :
                                    l.status === 'pending' ? 'bg-blue-400' :
                                    l.status === 'expired' ? 'bg-rose-400' : 'bg-zinc-400'
                                  }`}></span>
                                  <span className="capitalize">{l.status}</span>
                                </span>
                              </td>
                              <td className="py-4 px-6 text-zinc-400">
                                {l.expiresAt ? new Date(l.expiresAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : (
                                  <span className="text-xs">After activation ({l.durationDays} days)</span>
                                )}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'store' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h1 className="text-2xl font-bold text-white mb-2">License Store</h1>
                <p className="text-zinc-400 text-sm mb-8">Purchase new licenses for your business.</p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Basic */}
                  <div className="bg-[#09090b] border border-zinc-800 rounded-2xl p-6 flex flex-col">
                    <h3 className="text-lg font-bold text-white mb-2">Basic</h3>
                    <div className="flex flex-col mb-6">
                      <p className="text-3xl font-black text-white mb-1">₱150</p>
                      <p className="text-sm font-medium text-zinc-500">&nbsp;</p>
                    </div>
                    <p className="text-sm text-zinc-500 mb-6">Valid for 30 Days (1 Month)</p>
                    <div className="flex-1">
                      <ul className="space-y-2 mb-6">
                        <li className="text-sm text-zinc-400 flex items-center gap-2">✓ Basic POS Features</li>
                        <li className="text-sm text-zinc-400 flex items-center gap-2">✓ Utang Tracking</li>
                      </ul>
                    </div>
                    <button 
                      onClick={() => handleOpenModal('Basic')}
                      className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-lg transition-colors"
                    >
                      Get Basic License
                    </button>
                  </div>

                  {/* Standard */}
                  <div className="bg-[#09090b] border border-emerald-500/30 rounded-2xl p-6 flex flex-col relative overflow-hidden shadow-[0_0_20px_rgba(16,185,129,0.05)]">
                    <h3 className="text-lg font-bold text-white mb-2">Standard</h3>
                    <p className="text-3xl font-black text-white mb-2">₱500</p>
                    <p className="text-sm text-zinc-500 mb-6">Valid for 90 Days (3 Months)</p>
                    <div className="flex-1">
                      <ul className="space-y-2 mb-6">
                        <li className="text-sm text-zinc-400 flex items-center gap-2">✓ All Free Features</li>
                        <li className="text-sm text-emerald-400 flex items-center gap-2">✓ 10 Premium Themes</li>
                        <li className="text-sm text-zinc-400 flex items-center gap-2">✓ Priority Support</li>
                      </ul>
                    </div>
                    <button 
                      onClick={() => handleOpenModal('Standard')}
                      className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-colors"
                    >
                      Get Standard License
                    </button>
                  </div>

                  {/* Pro */}
                  <div className="bg-[#09090b] border border-blue-500/50 rounded-2xl p-6 flex flex-col relative overflow-hidden shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
                    <span className="absolute top-4 right-4 bg-blue-500/10 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Best Value</span>
                    
                    <h3 className="text-lg font-bold text-white mb-2">Pro</h3>
                    <p className="text-3xl font-black text-white mb-2">₱1500</p>
                    <p className="text-sm text-zinc-500 mb-6">Valid for 150 Days (5 Months)</p>
                    <div className="flex-1">
                      <ul className="space-y-2 mb-6">
                        <li className="text-sm text-zinc-400 flex items-center gap-2">✓ All Standard Features</li>
                        <li className="text-sm text-blue-400 flex items-center gap-2">✓ Full Offline Mode</li>
                        <li className="text-sm text-zinc-400 flex items-center gap-2">✓ VIP Support</li>
                      </ul>
                    </div>
                    <button 
                      onClick={() => handleOpenModal('Pro')}
                      className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors"
                    >
                      Get Pro License
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'system-store' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h1 className="text-2xl font-bold text-white mb-2">System Store</h1>
                <p className="text-zinc-400 text-sm mb-8">Purchase StoreTap Systems with bundled free licenses.</p>
                
                <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
                  {/* Web System */}
                  <div className="bg-[#09090b] border border-zinc-800 rounded-2xl p-8 flex flex-col hover:border-zinc-700 transition-colors">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-white">Web Version</h3>
                        <p className="text-zinc-500 text-sm mt-1">Patch v2.1.0.9.5</p>
                      </div>
                      <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center border border-emerald-500/20">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                      </div>
                    </div>
                    <div className="mb-8">
                      <p className="text-4xl font-black text-white mb-2">₱250 <span className="text-sm font-medium text-zinc-500">one-time</span></p>
                    </div>
                    <div className="flex-1">
                      <ul className="space-y-3 mb-8">
                        <li className="text-sm text-zinc-300 flex items-center gap-3">
                          <span className="text-emerald-400">✓</span> Free Hosting (Website)
                        </li>
                        <li className="text-sm text-zinc-300 flex items-center gap-3">
                          <span className="text-emerald-400">✓</span> Free Database Storage
                        </li>
                        <li className="text-sm text-zinc-300 flex items-center gap-3">
                          <span className="text-emerald-400">✓</span> Free <span className="font-bold ml-1">Basic Tier License</span> (30 Days)
                        </li>
                      </ul>
                    </div>
                    <button 
                      onClick={() => handleOpenSystemModal('web')}
                      className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-lg transition-colors border border-zinc-700"
                    >
                      Purchase Web System
                    </button>
                  </div>

                  {/* App System */}
                  <div className="bg-[#09090b] border border-blue-500/50 rounded-2xl p-8 flex flex-col relative overflow-hidden shadow-[0_0_30px_rgba(59,130,246,0.1)] hover:border-blue-500/70 transition-colors">
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-white">App Version</h3>
                        <p className="text-zinc-500 text-sm mt-1">Patch v2.1.0.9.5</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center border border-blue-500/20">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                      </div>
                    </div>
                    <div className="mb-8">
                      <p className="text-4xl font-black text-white mb-2">₱750 <span className="text-sm font-medium text-zinc-500">one-time</span></p>
                    </div>
                    <div className="flex-1">
                      <ul className="space-y-3 mb-8">
                        <li className="text-sm text-zinc-300 flex items-center gap-3">
                          <span className="text-blue-400">✓</span> Free Mobile App
                        </li>
                        <li className="text-sm text-zinc-300 flex items-center gap-3">
                          <span className="text-blue-400">✓</span> Free Hosting & Database Storage
                        </li>
                        <li className="text-sm text-zinc-300 flex items-center gap-3">
                          <span className="text-blue-400">✓</span> Free <span className="font-bold ml-1">Pro Tier License</span> (30 Days)
                        </li>
                      </ul>
                    </div>
                    <button 
                      onClick={() => handleOpenSystemModal('app')}
                      className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors shadow-lg shadow-blue-500/20"
                    >
                      Purchase App System
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'about' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h1 className="text-2xl font-bold text-white mb-6">About StoreTap</h1>
                <div className="bg-[#09090b] border border-zinc-800 rounded-2xl p-8 max-w-2xl">
                  <Image src="/icon.svg" alt="Logo" width={64} height={64} className="mb-6" />
                  <h2 className="text-xl font-bold text-white mb-2">StoreTap POS System</h2>
                  <p className="text-zinc-400 mb-6">Version 2.1.0</p>
                  
                  <div className="space-y-4 text-sm text-zinc-300 leading-relaxed">
                    <p>
                      StoreTap is the ultimate cloud-connected Point of Sale system built specifically for modern businesses. 
                      Designed with an offline-first architecture, it ensures your store continues to operate flawlessly even when internet connectivity is completely lost.
                    </p>
                    <p>
                      By purchasing a license from this dashboard, you unlock the ability to activate your StoreTap application on your devices. Each license key can only be bound to a single device for maximum security.
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-zinc-800 text-xs text-zinc-500">
                    &copy; {new Date().getFullYear()} StoreTap Technologies. All rights reserved.
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'admin' && isAdmin && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h1 className="text-2xl font-bold text-white mb-2">Pending License Requests</h1>
                <p className="text-zinc-400 text-sm mb-8">Manage incoming license requests from clients.</p>
                
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
                      {loadingAdmin ? (
                        <tr><td colSpan={6} className="px-6 py-12 text-center text-zinc-500 font-medium">Loading requests...</td></tr>
                      ) : adminRequests.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-6 py-12 text-center text-zinc-500 font-medium">No requests found.</td>
                        </tr>
                      ) : adminRequests.map(req => (
                        <tr key={req.id} className="hover:bg-zinc-900/30 transition-colors group">
                          <td className="px-6 py-4 text-zinc-400 font-medium">{new Date(req.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</td>
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
                                <RequestActions requestId={req.id} requestType={req.requestType} onSuccess={() => {
                                  fetchAdminRequests();
                                  getPendingRequestsCount().then(count => setAdminPendingCount(count));
                                }} />
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-4">
                  {loadingAdmin ? (
                    <div className="bg-[#09090b] rounded-xl border border-zinc-800/80 p-8 text-center text-zinc-500 font-medium">Loading requests...</div>
                  ) : adminRequests.length === 0 ? (
                    <div className="bg-[#09090b] rounded-xl border border-zinc-800/80 p-8 text-center text-zinc-500 font-medium">
                      No requests found.
                    </div>
                  ) : adminRequests.map(req => (
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
                          <p className="text-zinc-300 font-medium">{new Date(req.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
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
                          <RequestActions requestId={req.id} requestType={req.requestType} onSuccess={() => {
                            fetchAdminRequests();
                            getPendingRequestsCount().then(count => setAdminPendingCount(count));
                          }} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'approved' && isAdmin && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h1 className="text-2xl font-bold text-white mb-2">Approved Licenses</h1>
                <p className="text-zinc-400 text-sm mb-8">View all approved license requests.</p>
                
                <div className="bg-[#09090b] rounded-xl border border-zinc-800/80 shadow-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm min-w-[600px]">
                      <thead className="bg-zinc-900/50 border-b border-zinc-800/80 text-xs uppercase tracking-wider font-semibold text-zinc-500">
                        <tr>
                          <th className="px-6 py-4">Date</th>
                          <th className="px-6 py-4">Name</th>
                          <th className="px-6 py-4">Tier</th>
                          <th className="px-6 py-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/60">
                        {loadingApproved ? (
                          <tr><td colSpan={4} className="px-6 py-12 text-center text-zinc-500 font-medium">Loading requests...</td></tr>
                        ) : approvedRequests.length === 0 ? (
                          <tr><td colSpan={4} className="px-6 py-12 text-center text-zinc-500 font-medium">No approved requests found.</td></tr>
                        ) : approvedRequests.map(req => (
                          <tr key={req.id} className="hover:bg-zinc-900/30 transition-colors group">
                            <td className="px-6 py-4 text-zinc-400 font-medium">{new Date(req.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                            <td className="px-6 py-4">
                              <div className="text-white font-bold">{req.name}</div>
                              <div className="text-zinc-500 text-xs">{req.email}</div>
                            </td>
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
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                Approved
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && isAdmin && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h1 className="text-2xl font-bold text-white mb-2">Manage Users</h1>
                <p className="text-zinc-400 text-sm mb-8">View clients who have interacted with StoreTap.</p>
                
                <div className="bg-[#09090b] rounded-xl border border-zinc-800/80 shadow-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm min-w-[600px]">
                      <thead className="bg-zinc-900/50 border-b border-zinc-800/80 text-xs uppercase tracking-wider font-semibold text-zinc-500">
                        <tr>
                          <th className="px-6 py-4">User</th>
                          <th className="px-6 py-4">Contact Number</th>
                          <th className="px-6 py-4">First Active</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/60">
                        {loadingUsers ? (
                          <tr><td colSpan={3} className="px-6 py-12 text-center text-zinc-500 font-medium">Loading users...</td></tr>
                        ) : usersList.length === 0 ? (
                          <tr><td colSpan={3} className="px-6 py-12 text-center text-zinc-500 font-medium">No users found.</td></tr>
                        ) : usersList.map((u, i) => (
                          <tr key={i} className="hover:bg-zinc-900/30 transition-colors group">
                            <td className="px-6 py-4">
                              <div className="text-white font-bold">{u.name}</div>
                              <div className="text-zinc-500 text-xs">{u.email}</div>
                            </td>
                            <td className="px-6 py-4 text-zinc-300 font-medium">{u.contactNumber}</td>
                            <td className="px-6 py-4 text-zinc-400 font-medium">{new Date(u.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h1 className="text-2xl font-bold text-white mb-2">Notifications</h1>
                <p className="text-zinc-400 text-sm mb-8">Stay updated with your latest alerts.</p>
                
                <div className="space-y-4">
                  {loadingNotifications ? (
                    <div className="bg-[#09090b] rounded-xl border border-zinc-800/80 p-8 text-center text-zinc-500 font-medium">Loading notifications...</div>
                  ) : notifications.length === 0 ? (
                    <div className="bg-[#09090b] rounded-xl border border-zinc-800/80 p-8 text-center text-zinc-500 font-medium">
                      You have no notifications.
                    </div>
                  ) : notifications.map(notif => (
                    <div key={notif.id} className="bg-[#09090b] rounded-xl border border-zinc-800/80 p-5 shadow-lg relative overflow-hidden flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </div>
                      <div>
                        <div className="flex justify-between items-start gap-4">
                          <h3 className="text-base font-bold text-white leading-tight mb-1">{notif.title}</h3>
                          <span className="text-[10px] text-zinc-500 font-medium whitespace-nowrap">{new Date(notif.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-zinc-400 text-sm leading-relaxed">{notif.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </main>

      <LicenseRequestModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        tier={selectedTier} 
      />

      <SystemRequestModal 
        isOpen={isSystemModalOpen}
        onClose={() => setIsSystemModalOpen(false)}
        systemType={selectedSystem}
      />
    </div>
  )
}
