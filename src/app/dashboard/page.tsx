"use client"
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { createBrowserClient } from '@supabase/ssr'
import { getPendingRequests, getApprovedLicenseRequests, getApprovedSystemRequests, getUsersList, getNotifications, markNotificationsRead, getPendingRequestsCount, approveSystemRequest, getAdminGeneratedLicenses, getClientRole, getClientData, deleteGeneratedLicenses, deleteUsers, deleteNotifications, updateUserRole } from '@/app/actions/admin'
import { getClientPendingRequests, undoRequest, getClientApprovedSystems } from '@/app/actions/client'
import ProviderOnboarding from '@/components/ProviderOnboarding'
import RequestActions from '@/app/admin/requests/RequestActions'
import LicenseRequestModal from '@/components/LicenseRequestModal'
import SystemRequestModal from '@/components/SystemRequestModal'
import RequestDetailsModal from '@/components/RequestDetailsModal'
import GenerateLicenseModal from '@/components/GenerateLicenseModal'
import SystemApprovalModal from '@/components/SystemApprovalModal'

export default function DashboardPage() {
  const [licenses, setLicenses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('licenses')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSystemModalOpen, setIsSystemModalOpen] = useState(false)
  const [isGenerateLicenseModalOpen, setIsGenerateLicenseModalOpen] = useState(false)
  const [selectedTier, setSelectedTier] = useState('Basic')
  const [selectedSystem, setSelectedSystem] = useState<'web'|'app'|'free-web'>('web')
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [userRole, setUserRole] = useState<'admin' | 'provider' | 'client'>('client')
  const [isInitializing, setIsInitializing] = useState(true)
  const [isProviderOnboarded, setIsProviderOnboarded] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  
  const [adminPendingCount, setAdminPendingCount] = useState(0)
  const [hasClientPending, setHasClientPending] = useState(false)
  const [clientPendingRequests, setClientPendingRequests] = useState<any[]>([])
  const [clientSystems, setClientSystems] = useState<any[]>([])
  const [loadingClientPending, setLoadingClientPending] = useState(true)
  
  const [adminRequests, setAdminRequests] = useState<any[]>([])
  const [loadingAdmin, setLoadingAdmin] = useState(true)
  
  const [approvedLicenseRequests, setApprovedLicenseRequests] = useState<any[]>([])
  const [approvedSystemRequests, setApprovedSystemRequests] = useState<any[]>([])
  const [generatedLicenses, setGeneratedLicenses] = useState<any[]>([])
  const [loadingApproved, setLoadingApproved] = useState(true)
  
  const [usersList, setUsersList] = useState<any[]>([])
  const [loadingUsers, setLoadingUsers] = useState(true)
  const [notifications, setNotifications] = useState<any[]>([])
  const [loadingNotifications, setLoadingNotifications] = useState(true)
  const [unreadCount, setUnreadCount] = useState(0)
  
  const [selectedRequestDetails, setSelectedRequestDetails] = useState<any>(null)
  const [systemApprovalRequest, setSystemApprovalRequest] = useState<any>(null)
  
  const [selectedGeneratedLicenses, setSelectedGeneratedLicenses] = useState<string[]>([])
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([])
  const [isDeleting, setIsDeleting] = useState(false)

  const isAdmin = userRole === 'admin'
  const isProvider = userRole === 'provider'
  const isClient = userRole === 'client'
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
        const userData = await getClientData()
        const role = (userData?.role || 'client') as 'admin' | 'provider' | 'client'
        setUserRole(role)
        setIsProviderOnboarded(userData?.isProviderOnboarded || false)
        
        if (role === 'admin' || role === 'provider') {
          setActiveTab('admin')
          getPendingRequestsCount().then(count => setAdminPendingCount(count))
          fetchAdminRequests()
          fetchApprovedRequests()
          if (role === 'admin') {
            fetchUsersList()
          }
        } else {
          fetchClientPendingRequests()
        }
        fetchNotifications(role)
      }
    } catch (e) {
      console.error("Auth error", e)
    } finally {
      setIsInitializing(false)
    }
  }

  const fetchClientPendingRequests = async () => {
    setLoadingClientPending(true)
    const clientPending = await getClientPendingRequests()
    setClientPendingRequests(clientPending)
    setHasClientPending(clientPending.length > 0)
    
    const cSystems = await getClientApprovedSystems()
    setClientSystems(cSystems)
    setLoadingClientPending(false)
  }

  const fetchAdminRequests = async () => {
    setLoadingAdmin(true)
    const reqs = await getPendingRequests()
    setAdminRequests(reqs)
    setLoadingAdmin(false)
  }

  const fetchApprovedRequests = async () => {
    setLoadingApproved(true)
    const lReqs = await getApprovedLicenseRequests()
    const sReqs = await getApprovedSystemRequests()
    const gLics = await getAdminGeneratedLicenses()
    setApprovedLicenseRequests(lReqs)
    setApprovedSystemRequests(sReqs)
    setGeneratedLicenses(gLics)
    setLoadingApproved(false)
  }

  const fetchUsersList = async () => {
    setLoadingUsers(true)
    const users = await getUsersList()
    setUsersList(users)
    setLoadingUsers(false)
  }

  const fetchNotifications = async (roleString: string) => {
    setLoadingNotifications(true)
    const notifs = await getNotifications(roleString)
    setNotifications(notifs)
    setUnreadCount(notifs.filter((n: any) => !n.read).length)
    setLoadingNotifications(false)
  }

  const handleTabChange = async (tab: string) => {
    setActiveTab(tab)
    setIsSidebarOpen(false)
    if (tab === 'notifications' && unreadCount > 0) {
      await markNotificationsRead(userRole)
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

  const handleNotificationClick = (notif: any) => {
    if (!notif.title) return;
    const title = notif.title.toLowerCase()
    
    if (title.includes('request rejected') || title.includes('request approved')) {
      if (isAdmin || isProvider) {
        if (title.includes('system')) setActiveTab('approved-systems')
        else setActiveTab('approved-licenses')
      } else {
        if (title.includes('system')) setActiveTab('client-systems')
        else setActiveTab('licenses')
      }
    } else if (title.includes('request')) {
      if (isAdmin || isProvider) setActiveTab('admin')
      else setActiveTab('client-pending')
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

  const handleOpenSystemModal = (type: 'web' | 'app' | 'free-web') => {
    setSelectedSystem(type)
    setIsSystemModalOpen(true)
  }

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-[#000000] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-zinc-800 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-zinc-500 text-sm font-medium animate-pulse">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (userRole === 'provider' && !isProviderOnboarded && userEmail) {
    return (
      <ProviderOnboarding 
        email={userEmail} 
        onComplete={() => {
          setIsProviderOnboarded(true)
          checkUser()
        }} 
      />
    )
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
          {(!isAdmin && !isProvider) ? (
            <>
              <button 
                onClick={() => handleTabChange('licenses')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'licenses' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'}`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
                My Licenses
              </button>
              <button 
                onClick={() => handleTabChange('client-pending')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'client-pending' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'}`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                My Pending Requests
              </button>
              <button 
                onClick={() => handleTabChange('client-systems')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'client-systems' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'}`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>
                My Systems
              </button>
            </>
          ) : null}
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
          {(isAdmin || isProvider) && (
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
                onClick={() => handleTabChange('approved-licenses')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'approved-licenses' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'}`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Approved Licenses
              </button>
              {isAdmin && (
                <>
                  <button 
                    onClick={() => handleTabChange('generated-licenses')}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'generated-licenses' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'}`}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    Generated Licenses
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
              <p className="text-xs text-zinc-500 capitalize">{userRole} Account</p>
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
                      disabled={isAdmin || isProvider}
                      className={`w-full py-2 font-bold rounded-lg transition-colors ${isAdmin || isProvider ? 'bg-zinc-800/50 text-zinc-500 cursor-not-allowed' : 'bg-zinc-800 hover:bg-zinc-700 text-white'}`}
                    >
                      {isAdmin || isProvider ? 'Not Available' : 'Request Basic License'}
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
                      disabled={isAdmin || isProvider}
                      className={`w-full py-2 font-bold rounded-lg transition-colors ${isAdmin || isProvider ? 'bg-zinc-800/50 text-zinc-500 cursor-not-allowed border border-emerald-500/10' : 'bg-emerald-600 hover:bg-emerald-500 text-white'}`}
                    >
                      {isAdmin || isProvider ? 'Not Available' : 'Request Standard License'}
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
                        <li className="text-sm text-blue-400 flex items-center gap-2">✓ Advanced Offline Capability</li>
                        <li className="text-sm text-zinc-400 flex items-center gap-2">✓ VIP Support</li>
                      </ul>
                    </div>
                    <button 
                      onClick={() => handleOpenModal('Pro')}
                      disabled={isAdmin || isProvider}
                      className={`w-full py-2 font-bold rounded-lg transition-colors ${isAdmin || isProvider ? 'bg-zinc-800/50 text-zinc-500 cursor-not-allowed border border-blue-500/10' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}
                    >
                      {isAdmin || isProvider ? 'Not Available' : 'Request Pro License'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'system-store' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h1 className="text-2xl font-bold text-white mb-2">System Store</h1>
                <p className="text-zinc-400 text-sm mb-8">Request System Setup with bundled free licenses.</p>
                
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 max-w-5xl">
                  {/* Free System */}
                  <div className="bg-[#09090b] border border-zinc-500/30 rounded-2xl p-6 flex flex-col relative overflow-hidden shadow-[0_0_20px_rgba(161,161,170,0.05)] hover:shadow-[0_0_30px_rgba(161,161,170,0.1)] hover:border-zinc-500/50 transition-all">
                    <span className="absolute top-4 right-4 bg-zinc-800 text-zinc-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Limited</span>
                    <div className="flex justify-between items-start mb-6 mt-2">
                      <div>
                        <h3 className="text-xl font-bold text-white">Free Demo / Trial</h3>
                        <p className="text-zinc-500 text-sm mt-1">Basic Web Setup</p>
                      </div>
                      <div className="w-12 h-12 bg-zinc-800/50 text-zinc-400 rounded-xl flex items-center justify-center border border-zinc-700/50 shrink-0">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                      </div>
                    </div>
                    <div className="mb-8">
                      <p className="text-xl font-black text-white mb-1">Free while testing</p>
                      <p className="text-sm font-medium text-zinc-500">or Free for 30 days</p>
                    </div>
                    <div className="flex-1">
                      <ul className="space-y-4 mb-8">
                        <li className="text-sm text-zinc-300 flex items-start gap-3">
                          <span className="text-zinc-400 bg-zinc-800 p-1 rounded-full shrink-0 mt-0.5"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></span>
                          <span className="leading-tight">Try StoreTap before purchasing a full system (includes web access & DB storage).</span>
                        </li>
                        <li className="text-sm text-zinc-300 flex items-start gap-3">
                          <span className="text-zinc-400 bg-zinc-800 p-1 rounded-full shrink-0 mt-0.5"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></span>
                          <span className="leading-tight">No permanent license included; paid license required for continued activation.</span>
                        </li>
                        <li className="text-sm text-zinc-400 flex items-start gap-3 mt-4 text-xs italic">
                          <span className="text-amber-500 shrink-0 mt-0.5">⚠️</span> 
                          <span className="leading-tight">The demo may be deactivated or deleted after one month of complete inactivity.</span>
                        </li>
                      </ul>
                    </div>
                    <button 
                      onClick={() => handleOpenSystemModal('free-web')}
                      disabled={isAdmin || isProvider}
                      className={`w-full py-3 font-bold rounded-lg transition-colors border ${isAdmin || isProvider ? 'bg-zinc-800/30 text-zinc-600 border-zinc-800/50 cursor-not-allowed' : 'bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700'}`}
                    >
                      {isAdmin || isProvider ? 'Not Available' : 'Request Free System'}
                    </button>
                  </div>

                  {/* Web System */}
                  <div className="bg-[#09090b] border border-emerald-500/30 rounded-2xl p-6 flex flex-col relative overflow-hidden shadow-[0_0_20px_rgba(16,185,129,0.05)] hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] hover:border-emerald-500/50 transition-all">
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
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
                      <p className="text-3xl font-black text-white mb-2">₱250 <span className="text-sm font-medium text-zinc-500">one-time</span></p>
                    </div>
                    <div className="flex-1">
                      <ul className="space-y-4 mb-8">
                        <li className="text-sm text-zinc-300 flex items-center gap-3">
                          <span className="text-emerald-400 bg-emerald-500/10 p-1 rounded-full"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></span> Free Hosting (Website)
                        </li>
                        <li className="text-sm text-zinc-300 flex items-center gap-3">
                          <span className="text-emerald-400 bg-emerald-500/10 p-1 rounded-full"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></span> Free Database Storage
                        </li>
                        <li className="text-sm text-zinc-300 flex items-center gap-3">
                          <span className="text-emerald-400 bg-emerald-500/10 p-1 rounded-full"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></span> Free <span className="font-bold ml-1 text-emerald-400">Basic Tier License</span> (30 Days)
                        </li>
                      </ul>
                    </div>
                    <button 
                      onClick={() => handleOpenSystemModal('web')}
                      disabled={isAdmin || isProvider}
                      className={`w-full py-3 font-bold rounded-lg transition-colors border ${isAdmin || isProvider ? 'bg-zinc-800/30 text-zinc-600 border-zinc-800/50 cursor-not-allowed' : 'bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border-emerald-500/20'}`}
                    >
                      {isAdmin || isProvider ? 'Not Available' : 'Request Web System'}
                    </button>
                  </div>

                  {/* App System */}
                  <div className="bg-[#09090b] border border-blue-500/50 rounded-2xl p-6 flex flex-col relative overflow-hidden shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:shadow-[0_0_40px_rgba(59,130,246,0.25)] hover:border-blue-500/70 transition-all">
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-white">App Version</h3>
                        <p className="text-zinc-500 text-sm mt-1">Patch v2.1.0.9.5</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                      </div>
                    </div>
                    <div className="mb-8">
                      <p className="text-3xl font-black text-white mb-2">₱750 <span className="text-sm font-medium text-zinc-500">one-time</span></p>
                    </div>
                    <div className="flex-1">
                      <ul className="space-y-4 mb-8">
                        <li className="text-sm text-zinc-300 flex items-center gap-3">
                          <span className="text-blue-400 bg-blue-500/10 p-1 rounded-full"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></span> Free Mobile App
                        </li>
                        <li className="text-sm text-zinc-300 flex items-center gap-3 leading-relaxed">
                          <span className="text-blue-400 bg-blue-500/10 p-1 rounded-full shrink-0"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></span> 
                          <span>Free Hosting <span className="text-blue-400 font-medium">(Web Site)</span> & Database Storage</span>
                        </li>
                        <li className="text-sm text-zinc-300 flex items-center gap-3">
                          <span className="text-blue-400 bg-blue-500/10 p-1 rounded-full"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></span> Free <span className="font-bold ml-1 text-blue-400">Pro Tier License</span> (30 Days)
                        </li>
                      </ul>
                    </div>
                    <button 
                      onClick={() => handleOpenSystemModal('app')}
                      disabled={isAdmin || isProvider}
                      className={`w-full py-3 font-bold rounded-lg transition-colors ${isAdmin || isProvider ? 'bg-zinc-800/30 text-zinc-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25'}`}
                    >
                      {isAdmin || isProvider ? 'Not Available' : 'Request App System'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'client-pending' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h1 className="text-2xl font-bold text-white mb-2">My Pending Requests</h1>
                <p className="text-zinc-400 text-sm mb-8">View and manage your pending license and system requests.</p>

                <div className="bg-[#09090b] border border-zinc-800/80 rounded-2xl overflow-hidden shadow-xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                      <thead>
                        <tr className="bg-zinc-900/50 border-b border-zinc-800/80 text-xs uppercase tracking-wider text-zinc-500 font-semibold">
                          <th className="py-4 px-6">Reference No.</th>
                          <th className="py-4 px-6">Type</th>
                          <th className="py-4 px-6">Tier</th>
                          <th className="py-4 px-6">Date</th>
                          <th className="py-4 px-6 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm divide-y divide-zinc-800/60">
                        {loadingClientPending ? (
                          <tr><td colSpan={5} className="py-12 text-center text-zinc-500 font-medium">Loading requests...</td></tr>
                        ) : clientPendingRequests.length === 0 ? (
                          <tr><td colSpan={5} className="py-12 text-center text-zinc-500 font-medium">You have no pending requests.</td></tr>
                        ) : (
                          clientPendingRequests.map(req => (
                            <tr key={req.id} className="hover:bg-zinc-900/30 transition-colors group">
                              <td className="py-4 px-6 font-mono font-medium text-white">
                                {req.referenceNumber || 'N/A'}
                              </td>
                              <td className="py-4 px-6 capitalize">
                                {req.requestType}
                              </td>
                              <td className="py-4 px-6">
                                <span className={`inline-flex px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide ${
                                  req.tier.toLowerCase() === 'pro' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                  req.tier.toLowerCase() === 'standard' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                                  'bg-zinc-800 text-zinc-400 border border-zinc-700'
                                }`}>
                                  {req.tier}
                                </span>
                              </td>
                              <td className="py-4 px-6 text-zinc-400">
                                {new Date(req.createdAt).toLocaleDateString()}
                              </td>
                              <td className="py-4 px-6 text-right">
                                <div className="flex justify-end gap-2">
                                  <button
                                    onClick={() => setSelectedRequestDetails(req)}
                                    className="px-3 py-1.5 text-xs font-semibold bg-zinc-800 text-white rounded hover:bg-zinc-700 transition-colors border border-zinc-700"
                                  >
                                    View
                                  </button>
                                  <button
                                    onClick={async () => {
                                      if (confirm('Are you sure you want to undo this request?')) {
                                        await undoRequest(req.id, req.requestType);
                                        fetchClientPendingRequests();
                                      }
                                    }}
                                    className="px-3 py-1.5 text-xs font-semibold bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 rounded transition-colors border border-rose-500/20"
                                  >
                                    Undo
                                  </button>
                                </div>
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

            {activeTab === 'about' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h1 className="text-2xl font-bold text-white mb-6">About StoreTap</h1>
                <div className="bg-[#09090b] border border-zinc-800 rounded-2xl p-8 max-w-2xl">
                  <Image src="/icon.svg" alt="Logo" width={64} height={64} className="mb-6" />
                  <h2 className="text-xl font-bold text-white mb-2">StoreTap POS System</h2>
                  <p className="text-zinc-400 mb-6">Version 2.1.0</p>
                  
                  <div className="space-y-4 text-sm text-zinc-300 leading-relaxed">
                    <p>
                      StoreTap is a lightweight, cloud-connected Point of Sale system built specifically for local businesses. 
                      Designed with robust offline capabilities, it ensures your store continues to operate flawlessly even when internet connectivity is completely lost.
                    </p>
                    <p>
                      By purchasing a license from this dashboard, you unlock the ability to activate your StoreTap application on your devices. Each license key can only be bound to a single device for maximum security.
                    </p>
                    <div className="mt-6 pt-6 border-t border-zinc-800">
                      <h3 className="text-lg font-bold text-white mb-3">About StoreTap Providers</h3>
                      <p className="mb-4">
                        StoreTap is a software technology project and POS service created and operated by Vince. <strong className="text-zinc-200">StoreTap Providers</strong> are authorized StoreTap representatives or members who assist with system setup, licensing, deployment, and customer support. They are not independent sellers of a separate product.
                      </p>
                      <p>
                        The StoreTap web system, mobile/native application, licensing system, and database infrastructure are developed, maintained, and administered by StoreTap. Customer business data is stored and processed for the purpose of providing the service, subject to the StoreTap Privacy Policy. StoreTap is responsible for system maintenance, updates, technical support, and database administration according to the customer's service agreement.
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-zinc-800 text-xs text-zinc-500">
                    &copy; {new Date().getFullYear()} StoreTap Technologies. All rights reserved.
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'admin' && (isAdmin || isProvider) && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h1 className="text-2xl font-bold text-white mb-2">Pending License Requests</h1>
                <p className="text-zinc-400 text-sm mb-8">Manage incoming license requests from clients.</p>
                
                {/* Desktop Table View */}
                <div className="hidden md:block bg-[#09090b] rounded-xl border border-zinc-800/80 shadow-2xl overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-zinc-900/50 border-b border-zinc-800/80 text-xs uppercase tracking-wider font-semibold text-zinc-500">
                      <tr>
                        <th className="px-6 py-4">Ref No.</th>
                        <th className="px-6 py-4">Type</th>
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Contact</th>
                        <th className="px-6 py-4">Tier</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60">
                      {loadingAdmin ? (
                        <tr><td colSpan={7} className="px-6 py-12 text-center text-zinc-500 font-medium">Loading requests...</td></tr>
                      ) : adminRequests.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="px-6 py-12 text-center text-zinc-500 font-medium">No requests found.</td>
                        </tr>
                      ) : adminRequests.map(req => (
                        <tr key={req.id} className="hover:bg-zinc-900/30 transition-colors group">
                          <td className="px-6 py-4 text-white font-mono">{req.referenceNumber || 'N/A'}</td>
                          <td className="px-6 py-4 capitalize text-zinc-300">{req.requestType}</td>
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
                              <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity gap-2 items-center">
                                <button
                                  onClick={() => setSelectedRequestDetails(req)}
                                  className="px-2 py-1 text-xs font-semibold bg-zinc-800 text-white rounded hover:bg-zinc-700 transition-colors border border-zinc-700"
                                >
                                  View
                                  </button>
                                  {(req.requestType === 'system' && isProvider) ? (
                                    <span className="text-[10px] text-zinc-500 font-bold uppercase block mt-2 text-center">Admin Approval Required</span>
                                  ) : (
                                    <RequestActions 
                                      requestId={req.id} 
                                      requestType={req.requestType} 
                                      onApproveSystemClick={() => setSystemApprovalRequest(req)}
                                      onSuccess={() => {
                                        fetchAdminRequests();
                                        getPendingRequestsCount().then(count => setAdminPendingCount(count));
                                      }} 
                                    />
                                  )}
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
                        <div className="col-span-2">
                          <p className="text-[10px] uppercase font-bold text-zinc-600 mb-1 tracking-wider">Ref No. / Type</p>
                          <p className="text-white font-medium font-mono">{req.referenceNumber || 'N/A'} <span className="text-zinc-500 font-sans capitalize ml-2">({req.requestType})</span></p>
                        </div>
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
                        <div className="pt-4 border-t border-zinc-800/80 flex flex-col gap-2">
                          <button
                            onClick={() => setSelectedRequestDetails(req)}
                            className="w-full px-3 py-2 text-xs font-semibold bg-zinc-800 text-white rounded hover:bg-zinc-700 transition-colors border border-zinc-700"
                          >
                            View Details
                          </button>
                          {(req.requestType === 'system' && isProvider) ? (
                            <span className="text-[10px] text-zinc-500 font-bold uppercase block mt-2 text-center">Admin Approval Required</span>
                          ) : (
                            <RequestActions 
                              requestId={req.id} 
                              requestType={req.requestType} 
                              onApproveSystemClick={() => setSystemApprovalRequest(req)}
                              onSuccess={() => {
                                fetchAdminRequests();
                                getPendingRequestsCount().then(count => setAdminPendingCount(count));
                              }} 
                            />
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'approved-licenses' && (isAdmin || isProvider) && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h1 className="text-2xl font-bold text-white mb-2">Approved Licenses</h1>
                    <p className="text-zinc-400 text-sm">Overview of client-requested approved licenses.</p>
                  </div>
                </div>
                
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
                        ) : approvedLicenseRequests.length === 0 ? (
                          <tr><td colSpan={4} className="px-6 py-12 text-center text-zinc-500 font-medium">No approved license requests found.</td></tr>
                        ) : approvedLicenseRequests.map(req => (
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
                              {req.approvedByName && (
                                <div className="text-[10px] text-zinc-500 mt-2 font-medium">
                                  by {req.approvedByRole === 'admin' ? 'Admin' : 'Provider'} <span className="text-zinc-400">{req.approvedByName}</span>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'generated-licenses' && isAdmin && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h1 className="text-2xl font-bold text-white mb-2">Generated Licenses</h1>
                    <p className="text-zinc-400 text-sm">View and manage licenses generated directly by the admin.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {selectedGeneratedLicenses.length > 0 && (
                      <button 
                        onClick={async () => {
                          if(!confirm('Delete selected licenses?')) return;
                          setIsDeleting(true)
                          await deleteGeneratedLicenses(selectedGeneratedLicenses)
                          setSelectedGeneratedLicenses([])
                          fetchApprovedRequests()
                          setIsDeleting(false)
                        }}
                        disabled={isDeleting}
                        className="bg-rose-500 hover:bg-rose-600 text-white text-sm font-bold py-2 px-4 rounded-lg transition-colors"
                      >
                        {isDeleting ? 'Deleting...' : `Delete Selected (${selectedGeneratedLicenses.length})`}
                      </button>
                    )}
                    <button 
                      onClick={() => setIsGenerateLicenseModalOpen(true)}
                      className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                      Generate License
                    </button>
                  </div>
                </div>
                
                <div className="bg-[#09090b] rounded-xl border border-zinc-800/80 shadow-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm min-w-[600px]">
                      <thead className="bg-zinc-900/50 border-b border-zinc-800/80 text-xs uppercase tracking-wider font-semibold text-zinc-500">
                        <tr>
                          <th className="px-6 py-4 w-12">
                            <input 
                              type="checkbox" 
                              className="rounded border-zinc-700 bg-zinc-900"
                              checked={generatedLicenses.length > 0 && selectedGeneratedLicenses.length === generatedLicenses.length}
                              onChange={(e) => {
                                if (e.target.checked) setSelectedGeneratedLicenses(generatedLicenses.map(l => l.id))
                                else setSelectedGeneratedLicenses([])
                              }}
                            />
                          </th>
                          <th className="px-6 py-4">Date Generated</th>
                          <th className="px-6 py-4">License Key</th>
                          <th className="px-6 py-4">Tier / Duration</th>
                          <th className="px-6 py-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/60">
                        {loadingApproved ? (
                          <tr><td colSpan={4} className="px-6 py-12 text-center text-zinc-500 font-medium">Loading requests...</td></tr>
                        ) : generatedLicenses.length === 0 ? (
                          <tr><td colSpan={5} className="px-6 py-12 text-center text-zinc-500 font-medium">No generated licenses found.</td></tr>
                        ) : generatedLicenses.map(lic => (
                          <tr key={lic.id} className="hover:bg-zinc-900/30 transition-colors group">
                            <td className="px-6 py-4">
                              <input 
                                type="checkbox" 
                                className="rounded border-zinc-700 bg-zinc-900"
                                checked={selectedGeneratedLicenses.includes(lic.id)}
                                onChange={(e) => {
                                  if (e.target.checked) setSelectedGeneratedLicenses(prev => [...prev, lic.id])
                                  else setSelectedGeneratedLicenses(prev => prev.filter(id => id !== lic.id))
                                }}
                              />
                            </td>
                            <td className="px-6 py-4 text-zinc-400 font-medium">{new Date(lic.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                            <td className="px-6 py-4">
                              <div className="text-emerald-400 font-mono font-bold">{lic.licenseKey}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-white font-bold uppercase">{lic.tier}</div>
                              <div className="text-zinc-500 text-xs">{lic.durationDays} Days</div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide ${
                                lic.status === 'unused' ? 'bg-zinc-800 text-zinc-300' :
                                lic.status === 'active' ? 'bg-emerald-500/10 text-emerald-500' :
                                'bg-red-500/10 text-red-500'
                              }`}>
                                {lic.status}
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

            {activeTab === 'approved-systems' && isAdmin && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h1 className="text-2xl font-bold text-white mb-2">Approved Systems</h1>
                <p className="text-zinc-400 text-sm mb-8">View all approved system requests.</p>
                
                <div className="bg-[#09090b] rounded-xl border border-zinc-800/80 shadow-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm min-w-[600px]">
                      <thead className="bg-zinc-900/50 border-b border-zinc-800/80 text-xs uppercase tracking-wider font-semibold text-zinc-500">
                        <tr>
                          <th className="px-6 py-4">Date</th>
                          <th className="px-6 py-4">Name</th>
                          <th className="px-6 py-4">Tier</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/60">
                        {loadingApproved ? (
                          <tr><td colSpan={5} className="px-6 py-12 text-center text-zinc-500 font-medium">Loading requests...</td></tr>
                        ) : approvedSystemRequests.length === 0 ? (
                          <tr><td colSpan={5} className="px-6 py-12 text-center text-zinc-500 font-medium">No approved system requests found.</td></tr>
                        ) : approvedSystemRequests.map(req => (
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
                            <td className="px-6 py-4 text-right">
                              <button
                                onClick={() => setSelectedRequestDetails(req)}
                                className="px-3 py-1.5 text-xs font-semibold bg-zinc-800 text-white rounded hover:bg-zinc-700 transition-colors border border-zinc-700"
                              >
                                View
                              </button>
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
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h1 className="text-2xl font-bold text-white mb-2">Manage Users</h1>
                    <p className="text-zinc-400 text-sm">View clients who have interacted with StoreTap.</p>
                  </div>
                  {selectedUsers.length > 0 && (
                    <button 
                      onClick={async () => {
                        if(!confirm('Delete selected users? This will remove their roles.')) return;
                        setIsDeleting(true)
                        await deleteUsers(selectedUsers)
                        setSelectedUsers([])
                        fetchUsersList()
                        setIsDeleting(false)
                      }}
                      disabled={isDeleting}
                      className="bg-rose-500 hover:bg-rose-600 text-white text-sm font-bold py-2 px-4 rounded-lg transition-colors"
                    >
                      {isDeleting ? 'Deleting...' : `Delete Selected (${selectedUsers.length})`}
                    </button>
                  )}
                </div>
                
                <div className="bg-[#09090b] rounded-xl border border-zinc-800/80 shadow-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm min-w-[600px]">
                      <thead className="bg-zinc-900/50 border-b border-zinc-800/80 text-xs uppercase tracking-wider font-semibold text-zinc-500">
                        <tr>
                          <th className="px-6 py-4 w-12">
                            <input 
                              type="checkbox" 
                              className="rounded border-zinc-700 bg-zinc-900"
                              checked={usersList.length > 0 && selectedUsers.length === usersList.length}
                              onChange={(e) => {
                                if (e.target.checked) setSelectedUsers(usersList.map(u => u.email))
                                else setSelectedUsers([])
                              }}
                            />
                          </th>
                          <th className="px-6 py-4">User</th>
                          <th className="px-6 py-4">Contact Number</th>
                          <th className="px-6 py-4">Role</th>
                          <th className="px-6 py-4">First Active</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/60">
                        {loadingUsers ? (
                          <tr><td colSpan={3} className="px-6 py-12 text-center text-zinc-500 font-medium">Loading users...</td></tr>
                        ) : usersList.length === 0 ? (
                          <tr><td colSpan={4} className="px-6 py-12 text-center text-zinc-500 font-medium">No users found.</td></tr>
                        ) : usersList.map((u, i) => (
                          <tr key={i} className="hover:bg-zinc-900/30 transition-colors group">
                            <td className="px-6 py-4">
                              <input 
                                type="checkbox" 
                                className="rounded border-zinc-700 bg-zinc-900"
                                checked={selectedUsers.includes(u.email)}
                                onChange={(e) => {
                                  if (e.target.checked) setSelectedUsers(prev => [...prev, u.email])
                                  else setSelectedUsers(prev => prev.filter(email => email !== u.email))
                                }}
                              />
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-white font-bold">{u.name || 'Unknown'}</div>
                              <div className="text-zinc-500 text-xs">{u.email}</div>
                            </td>
                            <td className="px-6 py-4 text-zinc-300 font-medium">{u.contactNumber}</td>
                            <td className="px-6 py-4 text-zinc-300 font-medium">
                              <select 
                                value={u.role}
                                onChange={async (e) => {
                                  const newRole = e.target.value
                                  const res = await updateUserRole(u.email, newRole)
                                  if (res.success) {
                                    fetchUsersList()
                                  } else {
                                    alert('Failed to update role')
                                  }
                                }}
                                className="bg-zinc-800 border border-zinc-700 text-white text-xs rounded px-2 py-1 outline-none focus:border-emerald-500"
                              >
                                <option value="client">Client</option>
                                <option value="provider">Provider</option>
                                <option value="admin">Admin</option>
                              </select>
                            </td>
                            <td className="px-6 py-4 text-zinc-400 font-medium">{new Date(u.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'client-systems' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h1 className="text-2xl font-bold text-white mb-2">My Systems</h1>
                <p className="text-zinc-400 text-sm mb-8">Access your approved systems and contact your provider.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {clientSystems.length === 0 ? (
                    <div className="col-span-full bg-[#09090b] rounded-xl border border-zinc-800/80 p-8 text-center text-zinc-500 font-medium">
                      You have no approved systems yet.
                    </div>
                  ) : clientSystems.map((sys: any) => (
                    <div key={sys.id} className="bg-[#09090b] rounded-2xl border border-emerald-500/30 p-6 shadow-lg shadow-emerald-900/10 relative overflow-hidden flex flex-col">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-bl-full -z-10 blur-xl"></div>
                      
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-xs text-emerald-400 font-bold tracking-wider uppercase mb-1">{sys.type === 'web' ? 'Web System' : 'App System'}</p>
                          <h3 className="text-xl font-bold text-white">{sys.storeName || 'Custom System'}</h3>
                        </div>
                        <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-2 py-1 rounded">APPROVED</span>
                      </div>
                      
                      <div className="space-y-3 mb-6 flex-1">
                        <div>
                          <p className="text-xs text-zinc-500 uppercase">Reference</p>
                          <p className="text-sm font-mono text-zinc-300">{sys.referenceNumber || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-xs text-zinc-500 uppercase">Provider Contact</p>
                          <a href="https://www.facebook.com/VincentLayonuser" target="_blank" className="text-sm font-medium text-blue-400 hover:underline">Vincent Layon (Facebook)</a>
                        </div>
                        <div>
                          <p className="text-xs text-zinc-500 uppercase">Date Approved</p>
                          <p className="text-sm text-zinc-300">{new Date(sys.updatedAt).toLocaleDateString()}</p>
                        </div>
                      </div>

                      {sys.attachmentLink && (
                        <a 
                          href={sys.attachmentLink} 
                          target="_blank" 
                          rel="noreferrer"
                          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                          Access Files / Link
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h1 className="text-2xl font-bold text-white mb-2">Notifications</h1>
                    <p className="text-zinc-400 text-sm">Stay updated with your latest alerts.</p>
                  </div>
                  {selectedNotifications.length > 0 && (
                    <button 
                      onClick={async () => {
                        if(!confirm('Delete selected notifications?')) return;
                        setIsDeleting(true)
                        await deleteNotifications(selectedNotifications)
                        setSelectedNotifications([])
                        fetchNotifications(userRole)
                        setIsDeleting(false)
                      }}
                      disabled={isDeleting}
                      className="bg-rose-500 hover:bg-rose-600 text-white text-sm font-bold py-2 px-4 rounded-lg transition-colors"
                    >
                      {isDeleting ? 'Deleting...' : `Delete Selected (${selectedNotifications.length})`}
                    </button>
                  )}
                </div>
                
                <div className="mb-4 flex items-center gap-2 px-2">
                  <input 
                    type="checkbox" 
                    className="rounded border-zinc-700 bg-zinc-900"
                    checked={notifications.length > 0 && selectedNotifications.length === notifications.length}
                    onChange={(e) => {
                      if (e.target.checked) setSelectedNotifications(notifications.map(n => n.id))
                      else setSelectedNotifications([])
                    }}
                  />
                  <span className="text-sm text-zinc-400 font-medium">Select All</span>
                </div>

                <div className="space-y-4">
                  {loadingNotifications ? (
                    <div className="bg-[#09090b] rounded-xl border border-zinc-800/80 p-8 text-center text-zinc-500 font-medium">Loading notifications...</div>
                  ) : notifications.length === 0 ? (
                    <div className="bg-[#09090b] rounded-xl border border-zinc-800/80 p-8 text-center text-zinc-500 font-medium">
                      You have no notifications.
                    </div>
                  ) : notifications.map(notif => (
                    <div 
                      key={notif.id} 
                      className={`rounded-xl border p-5 shadow-lg relative overflow-hidden flex gap-4 items-start hover:border-emerald-500/50 transition-colors ${notif.read ? 'bg-zinc-900/50 border-zinc-800' : 'bg-zinc-800 border-zinc-700'}`}
                    >
                      {!notif.read && <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-emerald-500 pointer-events-none"></div>}
                      
                      <div className="flex items-center h-full pt-2">
                        <input 
                          type="checkbox" 
                          className="rounded border-zinc-700 bg-zinc-900 z-10 cursor-pointer"
                          checked={selectedNotifications.includes(notif.id)}
                          onChange={(e) => {
                            if (e.target.checked) setSelectedNotifications(prev => [...prev, notif.id])
                            else setSelectedNotifications(prev => prev.filter(id => id !== notif.id))
                          }}
                        />
                      </div>
                      
                      <div 
                        className="flex-1 flex gap-4 items-start cursor-pointer"
                        onClick={() => handleNotificationClick(notif)}
                      >
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start gap-4">
                            <h3 className="text-base font-bold text-white leading-tight mb-1 group-hover:text-emerald-400 transition-colors">{notif.title}</h3>
                            <span className="text-[10px] text-zinc-500 font-medium whitespace-nowrap">{new Date(notif.createdAt).toLocaleDateString()}</span>
                          </div>
                          <p className="text-zinc-400 text-sm leading-relaxed">{notif.message}</p>
                        </div>
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

      <RequestDetailsModal
        isOpen={!!selectedRequestDetails}
        onClose={() => setSelectedRequestDetails(null)}
        request={selectedRequestDetails}
      />

      <GenerateLicenseModal
        isOpen={isGenerateLicenseModalOpen}
        onClose={() => setIsGenerateLicenseModalOpen(false)}
        onSuccess={() => {
          // Re-fetch admin data when a license is successfully generated
          fetchApprovedRequests()
        }}
      />

      <SystemApprovalModal 
        isOpen={!!systemApprovalRequest}
        onClose={() => setSystemApprovalRequest(null)}
        request={systemApprovalRequest}
        onApprove={async (link: string) => {
          const res = await approveSystemRequest(systemApprovalRequest.id, link)
          if (!res.success) {
            alert(res.error)
          } else {
            fetchAdminRequests()
            getPendingRequestsCount().then(count => setAdminPendingCount(count))
            fetchApprovedRequests()
          }
        }}
      />
    </div>
  )
}
