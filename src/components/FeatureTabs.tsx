'use client'

import { useState } from 'react'

export function FeatureTabs() {
  const [activeTab, setActiveTab] = useState(0)

  const features = [
    {
      id: 0,
      title: "Fast Sales & Checkout",
      desc: "Process orders in seconds. Our one-tap interface and fast cart checkout are designed to handle peak hours at your store without slowing you down.",
      image: "/screenshots/sales.png"
    },
    {
      id: 1,
      title: "Utang Management",
      desc: "Record customer balances, due dates, and partial payments directly. No more messy notebooks. Manage everything seamlessly.",
      image: "/screenshots/utang.png"
    },
    {
      id: 2,
      title: "Inventory Tracking",
      desc: "Never run out of stock unexpectedly. View current stock levels, adjust quantities, and monitor expected income in real-time.",
      image: "/screenshots/inventory.png"
    },
    {
      id: 3,
      title: "Daily Reports & Analytics",
      desc: "Understand your business better. Generate daily, weekly, or custom date range reports for sales and income instantly.",
      image: "/screenshots/reports.png"
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
      
      <div className="flex-1 bg-slate-100 rounded-3xl p-4 lg:p-8 min-h-[400px] flex items-center justify-center">
        <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-2xl border border-slate-200">
          <img 
            src={features[activeTab].image} 
            alt={features[activeTab].title} 
            className="w-full h-full object-cover transition-opacity duration-300"
          />
        </div>
      </div>
    </div>
  )
}
