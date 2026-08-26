import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#000000] text-zinc-300 font-sans flex flex-col">
      <Navigation />
      
      <main className="flex-1 max-w-4xl mx-auto px-6 pt-20 pb-32">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tighter text-white mb-8">Privacy Policy</h1>
        
        <div className="space-y-6 text-zinc-400 text-sm md:text-base leading-relaxed">
          <p>Effective Date: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-xl font-bold text-white mt-8 mb-4">1. Introduction and Scope</h2>
          <p>
            StoreTap Technologies ("StoreTap", "we", "our", or "us") is deeply committed to protecting your privacy and ensuring the security of your personal and business data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website (StoreTap Central), use our Point of Sale applications, or engage with our services (collectively, the "Service").
          </p>
          <p>
            This policy is designed to comply with applicable data protection laws, including the Data Privacy Act of 2012 (Republic Act No. 10173) of the Philippines. By accessing or using the Service, you signify your consent to the data practices described in this Privacy Policy.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">2. Information We Collect</h2>
          <p>We collect information that identifies, relates to, or could reasonably be linked to you ("Personal Data"), as well as anonymized or aggregated data. We collect this data through the following methods:</p>
          
          <h3 className="text-lg font-semibold text-white mt-4 mb-2">A. Information You Provide to Us Directly</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Account and Profile Data:</strong> When you register or authenticate using your Google Account, we receive basic profile information (such as your name and email address) necessary to establish and secure your account.</li>
            <li><strong>Request Details:</strong> When requesting a demo, system, or license, you provide contact information (e.g., phone number, email) and business details (e.g., store name, location) to facilitate deployment.</li>
            <li><strong>Business Operations Data:</strong> While using the POS system, you input data regarding your inventory, sales transactions, and customer debt ("utang") records.</li>
          </ul>

          <h3 className="text-lg font-semibold text-white mt-4 mb-2">B. Information Collected Automatically</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Device and Usage Data:</strong> We automatically collect information about how you access and use the Service, including IP addresses, browser types, device identifiers, operating systems, and interaction metrics.</li>
            <li><strong>Synchronization Data:</strong> Our system features offline capabilities. When your device regains internet connectivity, local operational data is automatically synchronized with our secure cloud servers to ensure data persistence and backup.</li>
          </ul>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">3. How We Use Your Information</h2>
          <p>We process your Personal Data and Business Operations Data for the following legitimate purposes:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><strong>Service Delivery:</strong> To operate, maintain, and provide the core functionalities of the POS system, including cloud backups and multi-device synchronization.</li>
            <li><strong>Deployment and Support:</strong> To connect you with authorized Providers who will facilitate your system setup, hardware delivery, and licensing.</li>
            <li><strong>Security and Authentication:</strong> To verify your identity via Google OAuth, protect against unauthorized access, and monitor for fraudulent activity.</li>
            <li><strong>Improvement and Analytics:</strong> To analyze usage patterns, diagnose technical issues, and improve the user experience and overall performance of the Service.</li>
            <li><strong>Communication:</strong> To send administrative notices, system updates, security alerts, and responses to your inquiries.</li>
          </ul>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">4. How We Share and Disclose Information</h2>
          <p>StoreTap does not sell, rent, or trade your Personal Data. We may share your information only in the following specific circumstances:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><strong>Authorized Providers:</strong> We share your submitted contact and request details with authorized StoreTap representatives or members (Providers) solely for the purpose of executing your request for a system or license. These Providers assist with setup, deployment, and support on behalf of StoreTap and are not independent sellers of a separate product.</li>
            <li><strong>Service Providers:</strong> We may employ third-party cloud hosting and infrastructure services (e.g., Supabase, Vercel) to operate the Service. These sub-processors are bound by strict confidentiality and data protection agreements.</li>
            <li><strong>Legal Compliance and Protection:</strong> We may disclose your information if required to do so by law, court order, or governmental request, or when we believe in good faith that disclosure is necessary to protect our rights, prevent fraud, or ensure the safety of our users.</li>
          </ul>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">5. Data Security and Retention</h2>
          <p>
            We implement robust, industry-standard technical and organizational security measures (such as encryption in transit and at rest) to protect your data against unauthorized access, alteration, disclosure, or destruction. We utilize Google Authentication to prevent password-related vulnerabilities.
          </p>
          <p className="mt-4">
            We retain your Personal Data and Business Operations Data only for as long as your account is active or as necessary to fulfill the purposes outlined in this policy, comply with our legal obligations, resolve disputes, and enforce our agreements.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">6. Your Data Privacy Rights</h2>
          <p>Depending on your jurisdiction, and in accordance with the Data Privacy Act of 2012, you possess certain rights regarding your Personal Data, including:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>The right to be informed about how your data is processed.</li>
            <li>The right to access the Personal Data we hold about you.</li>
            <li>The right to rectify inaccurate or incomplete data.</li>
            <li>The right to request the erasure or blocking of your data under specific conditions.</li>
            <li>The right to data portability.</li>
          </ul>
          <p className="mt-4">To exercise any of these rights, please contact us using the information provided below.</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">7. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy periodically to reflect changes in our practices or regulatory requirements. We will notify you of any material changes by posting the updated policy on this page and updating the "Effective Date." We encourage you to review this policy regularly.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">8. Contact Us</h2>
          <p>
            If you have any questions, concerns, or requests related to this Privacy Policy or our data practices, please contact our Data Protection Officer at <a href="https://heyvince.vercel.app" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">heyvince.vercel.app</a>.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
