"use client";

import { useEffect, useState } from 'react';

type License = {
  id: string;
  licenseKey: string;
  tier: string;
  status: string;
  deviceId: string | null;
  durationDays: number;
  activatedAt: string | null;
  expiresAt: string | null;
  createdAt: string;
};

export default function Dashboard() {
  const [licenses, setLicenses] = useState<License[]>([]);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [generateForm, setGenerateForm] = useState({
    tier: 'pro',
    count: 1,
    durationDays: 30
  });

  const fetchLicenses = async () => {
    try {
      const res = await fetch('/api/licenses');
      const data = await res.json();
      setLicenses(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLicenses();
  }, []);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    try {
      await fetch('/api/licenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(generateForm)
      });
      await fetchLicenses();
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const activeCount = licenses.filter(l => l.status === 'active').length;
  const expiredCount = licenses.filter(l => l.status === 'expired').length;
  const unusedCount = licenses.filter(l => l.status === 'unused').length;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-blue-100 pb-12">
      {/* Header Gradient Bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
      
      <div className="max-w-7xl mx-auto px-6 pt-10 space-y-8">
        
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">StoreTap Central</h1>
            <p className="text-slate-500 mt-1 font-medium">Global License Management System</p>
          </div>
          <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg shadow-sm hover:bg-slate-50 hover:text-red-600 transition-all font-medium text-sm">
            Sign Out
          </button>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <p className="text-sm text-slate-500 font-semibold uppercase tracking-wider mb-2">Total Licenses</p>
            <p className="text-4xl font-black text-slate-800">{licenses.length}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <p className="text-sm text-emerald-500 font-semibold uppercase tracking-wider mb-2">Active Stores</p>
            <p className="text-4xl font-black text-emerald-600">{activeCount}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <p className="text-sm text-amber-500 font-semibold uppercase tracking-wider mb-2">Unused Keys</p>
            <p className="text-4xl font-black text-amber-600">{unusedCount}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <p className="text-sm text-rose-500 font-semibold uppercase tracking-wider mb-2">Expired</p>
            <p className="text-4xl font-black text-rose-600">{expiredCount}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Generate Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-7 rounded-2xl shadow-sm border border-slate-100 sticky top-8">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-600 p-2 rounded-lg">✨</span>
                Generate Keys
              </h2>
              <form onSubmit={handleGenerate} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">License Tier</label>
                  <select 
                    className="w-full border border-slate-200 rounded-xl p-3 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                    value={generateForm.tier}
                    onChange={e => setGenerateForm({...generateForm, tier: e.target.value})}
                  >
                    <option value="free">Free Trial (1 Min)</option>
                    <option value="standard">Standard (₱500)</option>
                    <option value="pro">Pro (₱1500)</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Quantity</label>
                    <input 
                      type="number" min="1" max="100"
                      className="w-full border border-slate-200 rounded-xl p-3 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                      value={generateForm.count}
                      onChange={e => setGenerateForm({...generateForm, count: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Days Valid</label>
                    <input 
                      type="number" min="1"
                      className="w-full border border-slate-200 rounded-xl p-3 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                      value={generateForm.durationDays}
                      onChange={e => setGenerateForm({...generateForm, durationDays: parseInt(e.target.value)})}
                    />
                  </div>
                </div>
                <button 
                  type="submit" 
                  disabled={isGenerating}
                  className="w-full py-3.5 bg-slate-900 text-white font-bold rounded-xl shadow-md hover:bg-blue-600 hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:hover:translate-y-0 mt-2"
                >
                  {isGenerating ? 'Generating...' : 'Generate New Keys'}
                </button>
              </form>
            </div>
          </div>

          {/* Table */}
          <div className="lg:col-span-2">
            <div className="bg-white p-7 rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <h2 className="text-xl font-bold mb-6">License Database</h2>
              <div className="overflow-x-auto rounded-xl border border-slate-100">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                      <th className="py-4 px-5">License Key</th>
                      <th className="py-4 px-5">Tier</th>
                      <th className="py-4 px-5">Status</th>
                      <th className="py-4 px-5">Device ID</th>
                      <th className="py-4 px-5 text-right">Expires</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-slate-100">
                    {loading ? (
                      <tr><td colSpan={5} className="py-8 text-center text-slate-400 font-medium animate-pulse">Loading database...</td></tr>
                    ) : licenses.map(l => (
                      <tr key={l.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-4 px-5 font-mono text-xs font-medium text-slate-700 bg-slate-50/50">{l.licenseKey}</td>
                        <td className="py-4 px-5">
                          <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide ${
                            l.tier === 'pro' ? 'bg-purple-100 text-purple-700' :
                            l.tier === 'standard' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {l.tier}
                          </span>
                        </td>
                        <td className="py-4 px-5">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                            l.status === 'active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' :
                            l.status === 'unused' ? 'bg-amber-50 text-amber-600 border border-amber-200' :
                            l.status === 'expired' ? 'bg-rose-50 text-rose-600 border border-rose-200' : 'bg-slate-50 text-slate-600 border border-slate-200'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              l.status === 'active' ? 'bg-emerald-500' :
                              l.status === 'unused' ? 'bg-amber-500' :
                              l.status === 'expired' ? 'bg-rose-500' : 'bg-slate-500'
                            }`}></span>
                            {l.status}
                          </span>
                        </td>
                        <td className="py-4 px-5 font-mono text-xs text-slate-400 max-w-[120px] truncate" title={l.deviceId || ''}>
                          {l.deviceId || '—'}
                        </td>
                        <td className="py-4 px-5 text-right text-slate-500 whitespace-nowrap">
                          {l.expiresAt ? new Date(l.expiresAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : '—'}
                        </td>
                      </tr>
                    ))}
                    {!loading && licenses.length === 0 && (
                      <tr><td colSpan={5} className="py-12 text-center text-slate-400 font-medium">No licenses generated yet. Start by generating some keys!</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
