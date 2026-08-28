'use client'

import { useState } from 'react'

export function FeatureTabs() {
  const [activeTab, setActiveTab] = useState(0)

  const features = [
    {
      id: 0,
      title: "Point of Sale",
      desc: "Give staff a POS workflow that handles real store transactions without slowing the line down. No barcodes or QR codes needed. Just tap product cards.",
      imgContent: (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col h-full relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-2 bg-teal-500"></div>
           <h4 className="font-bold text-slate-800 mb-4">Checkout Simulator</h4>
           <div className="flex gap-4 mb-4">
             <div className="flex-1 bg-slate-50 p-3 rounded-lg border border-slate-100 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100">
               <span className="text-3xl mb-2">🍔</span>
               <span className="text-xs font-medium text-slate-600">Burger</span>
               <span className="text-sm font-bold text-slate-900">₱120</span>
             </div>
             <div className="flex-1 bg-slate-50 p-3 rounded-lg border border-slate-100 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100">
               <span className="text-3xl mb-2">🥤</span>
               <span className="text-xs font-medium text-slate-600">Cola</span>
               <span className="text-sm font-bold text-slate-900">₱45</span>
             </div>
           </div>
           <div className="mt-auto bg-slate-50 p-4 rounded-lg border border-slate-200">
             <div className="flex justify-between items-center font-bold text-slate-900">
               <span>Total</span>
               <span>₱165</span>
             </div>
             <button className="w-full mt-4 bg-teal-500 text-white font-bold py-2 rounded-lg hover:bg-teal-600 transition-colors">
               Pay Now
             </button>
           </div>
        </div>
      )
    },
    {
      id: 1,
      title: "Utang Management",
      desc: "Record customer balances, due dates, and partial payments directly. No more messy notebooks. Manage everything seamlessly.",
      imgContent: (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col h-full relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-2 bg-blue-500"></div>
           <h4 className="font-bold text-slate-800 mb-4">Customer Balances</h4>
           <div className="space-y-3">
             <div className="flex justify-between items-center p-3 border border-slate-100 rounded-lg bg-slate-50">
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">JD</div>
                 <div>
                   <p className="text-sm font-bold text-slate-900">John Doe</p>
                   <p className="text-xs text-slate-500">Due: Tommorrow</p>
                 </div>
               </div>
               <span className="font-bold text-rose-500">₱450.00</span>
             </div>
             <div className="flex justify-between items-center p-3 border border-slate-100 rounded-lg bg-slate-50">
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">MS</div>
                 <div>
                   <p className="text-sm font-bold text-slate-900">Maria Santos</p>
                   <p className="text-xs text-slate-500">Partial Paid</p>
                 </div>
               </div>
               <span className="font-bold text-amber-500">₱120.00</span>
             </div>
           </div>
           <button className="w-full mt-auto bg-slate-900 text-white font-bold py-2 rounded-lg hover:bg-slate-800 transition-colors">
             Add New Utang
           </button>
        </div>
      )
    },
    {
      id: 2,
      title: "Offline Sync",
      desc: "Keep working even when the internet drops. The moment your connection is back, all your inventory adjustments and sales sync to the cloud automatically.",
      imgContent: (
         <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-800 p-6 flex flex-col h-full relative overflow-hidden text-white">
           <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500"></div>
           <div className="flex-1 flex flex-col items-center justify-center text-center">
             <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6 relative">
               <div className="absolute top-0 right-0 w-5 h-5 bg-rose-500 border-2 border-slate-900 rounded-full animate-pulse"></div>
               <svg className="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             </div>
             <h4 className="font-bold text-lg mb-2">Offline Mode Active</h4>
             <p className="text-sm text-slate-400 max-w-[250px]">
               Internet connection lost. You can continue selling. 12 transactions pending sync.
             </p>
           </div>
         </div>
      )
    }
  ]

  return (
    <div className="flex flex-col lg:flex-row gap-12">
      <div className="flex-1 space-y-4">
        <h2 className="text-4xl font-bold text-slate-900 mb-8 max-w-lg leading-tight">
          Everything your store needs, connected in one platform.
        </h2>
        <div className="flex flex-col space-y-4">
          {features.map((f, index) => (
            <div 
              key={f.id}
              onClick={() => setActiveTab(index)}
              className={`p-6 rounded-2xl cursor-pointer transition-all border-l-4 ${activeTab === index ? 'bg-slate-50 border-teal-500 shadow-sm' : 'border-transparent hover:bg-slate-50/50'}`}
            >
              <h3 className={`text-xl font-bold mb-2 ${activeTab === index ? 'text-slate-900' : 'text-slate-600'}`}>{f.title}</h3>
              <p className={`text-sm leading-relaxed ${activeTab === index ? 'text-slate-700' : 'text-slate-500'}`}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex-1 bg-slate-100 rounded-3xl p-8 lg:p-12 min-h-[400px]">
        {features[activeTab].imgContent}
      </div>
    </div>
  )
}
