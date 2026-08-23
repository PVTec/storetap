import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import PricingSection from '@/components/PricingSection'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#000000] text-zinc-300 font-sans selection:bg-blue-500/30">
      <Navigation />
      
      <main className="pt-32 pb-24 px-6 md:px-12">
        <PricingSection />
      </main>
      
      <Footer />
    </div>
  )
}
