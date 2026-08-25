import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#000000] text-zinc-300 font-sans flex flex-col">
      <Navigation />
      
      <main className="flex-1 max-w-4xl mx-auto px-6 pt-20 pb-32">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tighter text-white mb-8">Terms of Service</h1>
        
        <div className="space-y-6 text-zinc-400 text-sm md:text-base leading-relaxed">
          <p>Effective Date: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-xl font-bold text-white mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the StoreTap Point of Sale (POS) system, StoreTap Central dashboard, or any associated applications and services (collectively, the "Service"), provided by StoreTap Technologies ("StoreTap", "we", "our", or "us"), you agree to comply with and be bound by these Terms of Service ("Terms"). These Terms govern your access to and use of the Service. If you do not agree to these Terms in their entirety, you must not use or access the Service.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">2. Description of Service</h2>
          <p>
            StoreTap provides a cloud-based and offline-capable Point of Sale and inventory management software solution designed for local retail environments. The Service includes software features for sales tracking, debt ("utang") management, inventory synchronization, and reporting.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">3. Authorized Providers and Payment Processing</h2>
          <p>
            StoreTap Central acts as a platform to connect prospective users with authorized independent distributors and service providers ("Providers"). Please note the following critical terms regarding transactions:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><strong>No Direct Payments on Platform:</strong> StoreTap does not process payments, collect funds, or ask for credit card information directly through our website for the acquisition of system licenses or physical hardware.</li>
            <li><strong>Off-Platform Settlements:</strong> All financial transactions, payment settlements, hardware acquisitions, and final pricing agreements are conducted strictly between you (the "Client") and the assigned Provider off-platform.</li>
            <li><strong>Release of Liability:</strong> StoreTap Technologies acts solely as the software developer. We are not liable or responsible for payment disputes, refunds, hardware warranties, or any unfulfilled promises made by independent Providers. Your commercial agreement is directly with the Provider.</li>
          </ul>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">4. Software Licensing and Use Restrictions</h2>
          <p>
            Upon activation of your account by a Provider, StoreTap grants you a revocable, non-exclusive, non-transferable, limited license to use the Service solely for your internal business operations. You agree not to:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Modify, decompile, reverse engineer, or attempt to derive the source code of the Service.</li>
            <li>Sublicense, resell, rent, lease, or distribute the Service to any third party.</li>
            <li>Use the Service in any manner that violates applicable local or international laws, including but not limited to the Republic Act No. 8424 (Tax Reform Act of 1997) of the Philippines, regarding the accurate recording of sales.</li>
            <li>Attempt to bypass or exploit any security measures or license restrictions integrated into the Service.</li>
          </ul>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">5. Account Registration and Security</h2>
          <p>
            To use the Service, you must register for an account using a valid Google Account. You are responsible for maintaining the confidentiality of your authentication credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized access to your account. StoreTap will not be liable for any loss or damage arising from your failure to protect your account.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">6. Data Ownership and Responsibilities</h2>
          <p>
            You retain all rights and ownership to the data you input into the Service, including inventory records, sales data, and customer debt information ("User Data"). By using the Service, you grant StoreTap a worldwide, non-exclusive license to host, copy, transmit, and display User Data as necessary to provide the Service to you. You are solely responsible for the accuracy and legality of your User Data.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">7. Intellectual Property Rights</h2>
          <p>
            All intellectual property rights in the Service, including but not limited to software code, design, logos, trademarks, and documentation, are the exclusive property of StoreTap Technologies. Nothing in these Terms constitutes a transfer of any intellectual property rights to you.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">8. Disclaimer of Warranties</h2>
          <p>
            THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. STORETAP EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, ERROR-FREE, OR FREE FROM VIRUSES OR OTHER HARMFUL COMPONENTS.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">9. Limitation of Liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL STORETAP TECHNOLOGIES, ITS AFFILIATES, DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OR INABILITY TO USE THE SERVICE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">10. Governing Law and Dispute Resolution</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the Republic of the Philippines, without regard to its conflict of law provisions. Any dispute arising from or relating to the subject matter of these Terms shall be subject to the exclusive jurisdiction of the courts located in the Philippines.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">11. Modifications to Terms</h2>
          <p>
            We reserve the right to modify or replace these Terms at any time at our sole discretion. We will provide reasonable notice of any material changes by posting the updated Terms on this page. Your continued use of the Service following the posting of any changes constitutes your acceptance of those changes.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">12. Contact Information</h2>
          <p>
            If you have any questions or concerns regarding these Terms of Service, please contact our legal and support team at <a href="https://heyvince.vercel.app" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">heyvince.vercel.app</a>.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
