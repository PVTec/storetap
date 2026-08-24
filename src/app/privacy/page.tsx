import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#000000] text-zinc-300 font-sans flex flex-col">
      <Navigation />
      
      <main className="flex-1 max-w-4xl mx-auto px-6 pt-20 pb-32">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tighter text-white mb-8">Privacy Policy</h1>
        
        <div className="space-y-6 text-zinc-400 text-sm md:text-base leading-relaxed">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-xl font-bold text-white mt-8 mb-4">1. Introduction</h2>
          <p>
            At StoreTap, we respect your privacy and are committed to protecting it through our compliance with this policy. 
            This policy describes the types of information we may collect from you or that you may provide when you visit the website 
            and our practices for collecting, using, maintaining, protecting, and disclosing that information.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">2. Information We Collect</h2>
          <p>
            We collect several types of information from and about users of our Website and App, including:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><strong>Personal Information:</strong> Such as your email address, name, contact numbers, and store name when you request a system or license.</li>
            <li><strong>Device Information:</strong> Information about your internet connection, the equipment you use to access our app, and usage details.</li>
            <li><strong>Store Data:</strong> While the app features offline capabilities, synced data (like sales and inventory) is stored securely on our servers to enable cloud backup.</li>
          </ul>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">3. How We Use Your Information</h2>
          <p>
            We use information that we collect about you or that you provide to us, including any personal information:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>To present our app and its contents to you.</li>
            <li>To provide you with information, products, or services that you request from us.</li>
            <li>To carry out our obligations, facilitate connections with our authorized Providers, and enforce our rights arising from any agreements entered into between you and us.</li>
            <li>To notify you about changes to our app or any products or services we offer or provide though it.</li>
          </ul>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">4. Sharing Your Information</h2>
          <p>
            We do not sell your personal information. However, to fulfill your requests for licenses or systems, we share your submitted contact details (name, email, phone number) with our authorized independent Providers. These Providers will use this information solely to contact you, confirm your request, and arrange the off-platform setup and payment settlement.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">5. Data Security</h2>
          <p>
            We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. 
            All information you provide to us is stored on our secure servers behind firewalls.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">6. Contact Information</h2>
          <p>
            To ask questions or comment about this privacy policy and our privacy practices, contact us via <a href="https://heyvince.vercel.app" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">heyvince.vercel.app</a>.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
