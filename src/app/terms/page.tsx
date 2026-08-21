import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#000000] text-zinc-300 font-sans flex flex-col">
      <Navigation />
      
      <main className="flex-1 max-w-4xl mx-auto px-6 pt-20 pb-32">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tighter text-white mb-8">Terms of Service</h1>
        
        <div className="space-y-6 text-zinc-400 text-sm md:text-base leading-relaxed">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-xl font-bold text-white mt-8 mb-4">1. Agreement to Terms</h2>
          <p>
            By accessing or using our Point of Sale system (StoreTap) and its related central dashboard, you agree to be bound by these Terms. 
            If you disagree with any part of the terms, then you may not access the Service.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">2. Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are and will remain the exclusive property of StoreTap Technologies 
            and its licensors. The Service is protected by copyright, trademark, and other laws of both the Philippines and foreign countries. 
            Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of StoreTap Technologies.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">3. License Use</h2>
          <p>
            When you purchase a license from StoreTap, you are granted a non-exclusive, non-transferable, revocable license to use the Software on 
            a single device in accordance with the specific tier you selected (Basic, Standard, Pro). 
            You may not share, resell, or distribute your license key.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">4. Limitation of Liability</h2>
          <p>
            In no event shall StoreTap Technologies, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any 
            indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, 
            or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or 
            content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration 
            of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">5. Changes</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide 
            at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">6. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at <a href="https://heyvince.vercel.app" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">heyvince.vercel.app</a>.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
