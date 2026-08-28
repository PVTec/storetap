import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 font-sans selection:bg-teal-500/30">
      <Navigation />

      <main className="pt-20 pb-32">
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 text-center mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/10 border border-teal-500/20 text-teal-400 font-bold text-[10px] uppercase tracking-widest rounded-full mb-6 mt-12">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
            Product Tour
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
            Built for speed.<br/> Designed for local stores.
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            See exactly how StoreTap replaces manual notebooks with a professional, lightning-fast digital interface.
          </p>
        </section>

        {/* Feature 1 - Sales Dashboard */}
        <section className="max-w-6xl mx-auto px-6 mb-32">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Fast Sales & Checkout</h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                Process orders in seconds. Our one-tap interface and fast cart checkout are designed to handle peak hours at your store without slowing you down.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-zinc-300"><span className="text-teal-500">✓</span> Instant product search</li>
                <li className="flex items-center gap-3 text-zinc-300"><span className="text-teal-500">✓</span> Categorized item grid</li>
              </ul>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-zinc-800 bg-zinc-900 aspect-[16/9]">
                <img src="/screenshots/sales.png" alt="Sales Dashboard" className="object-cover w-full h-full" />
              </div>
            </div>
          </div>
        </section>

        {/* Feature 2 - Utang Records */}
        <section className="max-w-6xl mx-auto px-6 mb-32">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Utang Management</h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                Throw away the notebook. Track customer balances, add partial payments, and view complete payment histories digitally.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-zinc-300"><span className="text-teal-500">✓</span> Real-time balance tracking</li>
                <li className="flex items-center gap-3 text-zinc-300"><span className="text-teal-500">✓</span> Detailed payment history logs</li>
              </ul>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-zinc-800 bg-zinc-900 aspect-[16/9]">
                <img src="/screenshots/utang.png" alt="Utang Records" className="object-cover w-full h-full" />
              </div>
            </div>
          </div>
        </section>

        {/* Feature 3 - Inventory Tracking */}
        <section className="max-w-6xl mx-auto px-6 mb-32">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Inventory Tracking</h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                Never run out of stock unexpectedly. View current stock levels, adjust quantities, and monitor expected income in real-time.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-zinc-300"><span className="text-teal-500">✓</span> Low stock warnings</li>
                <li className="flex items-center gap-3 text-zinc-300"><span className="text-teal-500">✓</span> Expected income calculations</li>
              </ul>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-zinc-800 bg-zinc-900 aspect-[16/9]">
                <img src="/screenshots/inventory.png" alt="Inventory Dashboard" className="object-cover w-full h-full" />
              </div>
            </div>
          </div>
        </section>

        {/* Feature 4 - Reports */}
        <section className="max-w-6xl mx-auto px-6 mb-32">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Daily Reports & Analytics</h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                Understand your business better. Generate daily, weekly, or custom date range reports for sales and income.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-zinc-300"><span className="text-teal-500">✓</span> Cash income tracking</li>
                <li className="flex items-center gap-3 text-zinc-300"><span className="text-teal-500">✓</span> Detailed transaction logs</li>
              </ul>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-zinc-800 bg-zinc-900 aspect-[16/9]">
                <img src="/screenshots/reports.png" alt="Reports" className="object-cover w-full h-full" />
              </div>
            </div>
          </div>
        </section>
        
        {/* Feature 5 - Settings */}
        <section className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Customizable Themes</h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                Make StoreTap yours. Choose from multiple built-in color themes to match your store's personality and make the interface comfortable for your eyes.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-zinc-300"><span className="text-teal-500">✓</span> Multiple premium themes</li>
                <li className="flex items-center gap-3 text-zinc-300"><span className="text-teal-500">✓</span> Instant interface updates</li>
              </ul>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-zinc-800 bg-zinc-900 aspect-[16/9]">
                <img src="/screenshots/settings.png" alt="Settings & Themes" className="object-cover w-full h-full" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
