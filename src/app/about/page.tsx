import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#000000] text-zinc-300 font-sans flex flex-col">
      <Navigation />
      
      <main className="flex-1 max-w-4xl mx-auto px-6 pt-20 pb-32">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white mb-8 text-center">About StoreTap</h1>
        
        <div className="space-y-6 text-zinc-400 leading-relaxed text-sm md:text-base">
          <p>
            StoreTap is a modern, offline-first Point of Sale (POS) and Inventory system built exclusively for the modern business owner.
            Our mission is to provide an uninterrupted sales experience, even when internet connectivity is spotty or completely lost.
          </p>
          <p>
            StoreTap was built by <strong>Vince AI Developer</strong> to tackle the real-world problems faced by small to medium enterprises. 
            From tracking "utang" (debts) easily, to managing stock levels, to syncing data seamlessly to the cloud once connectivity is restored, 
            StoreTap gives you the peace of mind to focus on what matters most: growing your business.
          </p>
          <p>
            We believe that technology should be accessible, lightning fast, and beautiful. That's why we've designed our dashboard to be 
            as sleek as it is powerful, complete with dynamic themes like Midnight Mode to suit any store environment.
          </p>
          <div className="mt-12 pt-8 border-t border-zinc-800">
            <h2 className="text-xl font-bold text-white mb-4">Contact Us</h2>
            <p>
              For inquiries, partnerships, or support, feel free to reach out through our official channels or visit <a href="https://heyvince.vercel.app" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">heyvince.vercel.app</a>.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
