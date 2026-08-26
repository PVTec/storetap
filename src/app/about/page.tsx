import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Image from 'next/image'

export default function AboutPage() {
  const certificates = [
    { src: '/cert_chme.jpg', title: 'Outstanding Performance (PLDT)', date: 'December 7, 2024' },
    { src: '/gnp1.jpg', title: 'Outstanding Performance (Globe)', date: 'December 2022' },
    { src: '/hackathon2024.jpg', title: 'Hackathon 1st Runner Up', date: '2024' },
    { src: '/hackathon2025.jpeg', title: 'Hackathon 1st Runner Up', date: '2025' },
    { src: '/cert_2025.jpg', title: 'Certificate of Recognition', date: '2025' },
    { src: '/cert_participation.jpg', title: 'Hackathon Participation', date: '2025' },
    { src: '/cert php.png', title: 'PHP Web Development Training', date: '2025' }
  ]

  return (
    <div className="min-h-screen bg-[#000000] text-zinc-300 font-sans flex flex-col">
      <Navigation />
      
      <main className="flex-1 max-w-5xl mx-auto px-6 pt-24 pb-32">
        {/* Mission Section */}
        <div className="text-center mb-32 relative">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-500/10 blur-[100px] -z-10 rounded-full" />
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter text-white mb-8">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">StoreTap</span>
          </h1>
          <div className="space-y-6 text-zinc-400 text-lg md:text-xl leading-relaxed max-w-4xl mx-auto">
            <p>
              StoreTap is a lightweight, cloud-based Point of Sale (POS) and Inventory system with robust offline capabilities built exclusively for local business owners. 
              Our mission is to provide an uninterrupted sales experience, even when internet connectivity is spotty or completely lost.
            </p>
            
            <blockquote className="relative p-6 mt-8 bg-zinc-900/50 border-l-4 border-indigo-500 rounded-r-2xl italic text-zinc-300 text-lg md:text-xl shadow-lg">
              <span className="text-3xl text-indigo-500/30 absolute -top-2 -left-3 font-serif">"</span>
              StoreTap was not built primarily to make money, but to help local stores transition into the digital era. 
              It started with a mission to help my mother's business become more efficient and reliable. By providing 
              cloud-synced tools with seamless offline support at an affordable price, we aim to recover basic expenses while genuinely 
              uplifting local business owners. We help them, and in turn, they help us.
              <footer className="mt-4 text-base font-semibold text-indigo-400 not-italic">
                — Vincent Layon, Founder
              </footer>
            </blockquote>
          </div>
        </div>

        {/* Founder Section */}
        <div className="max-w-4xl mx-auto mb-32 bg-[#09090b] border border-zinc-800/80 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Accent glow matching the picture */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[100px] -z-10 rounded-full" />
          
          <div className="flex flex-col md:flex-row gap-12 items-center">
            {/* Founder Image - Adjusted Size */}
            <div className="w-48 h-48 md:w-64 md:h-64 shrink-0 relative rounded-full overflow-hidden border-4 border-zinc-800 shadow-xl ring-2 ring-indigo-500/20">
              <Image 
                src="/founder.png" 
                alt="Vincent Layon - Founder" 
                fill
                className="object-cover object-top"
              />
            </div>
            
            {/* Founder Bio */}
            <div>
              <div className="mb-6">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Meet the Founder</h2>
                <h3 className="text-lg text-indigo-400 font-medium">Vincent Layon (Vince)</h3>
              </div>
              
              <div className="space-y-4 text-zinc-400 leading-relaxed">
                <p>
                  I am a passionate developer with expertise in building a wide range of systems, from Platform-as-a-Service (PaaS) 
                  and inventory platforms to enterprise-grade examination, payroll, and ID management systems.
                </p>
                <p>
                  My technical background spans mobile application development, intricate game development with custom logic, 
                  real-time economic and probability engines, and professional web applications. 
                </p>
                <p>
                  A core part of my expertise is building <strong className="text-zinc-200">AI-driven systems</strong>, including custom AI for decision support, 
                  digital pets, and AI companions. My work and performance have been recognized by industry leaders like <strong className="text-zinc-200">Globe Telecom</strong> and <strong className="text-zinc-200">PLDT</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Providers Section */}
        <div className="max-w-5xl mx-auto mb-32 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-[2.5rem] blur-xl -z-10" />
          <div className="bg-[#09090b] border border-zinc-800/80 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
              <svg className="w-48 h-48 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 flex items-center gap-4">
              <span className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </span>
              Our Authorized Providers
            </h2>
            
            <div className="grid md:grid-cols-2 gap-10 text-zinc-400 leading-relaxed text-sm md:text-base relative z-10">
              <div className="space-y-3">
                <h3 className="text-white font-semibold text-lg flex items-center gap-2">
                  Role & Responsibilities
                </h3>
                <p>
                  StoreTap Providers are authorized representatives or members who assist clients with system setup, licensing, deployment, and localized customer support. They act on behalf of StoreTap and are not independent sellers of a separate product.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-white font-semibold text-lg flex items-center gap-2">
                  System Infrastructure
                </h3>
                <p>
                  The StoreTap platform, including the web system, mobile application, database infrastructure, and licensing management, is entirely developed and administered by StoreTap. We remain fully responsible for system maintenance, technical updates, and data privacy.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Certificates Section */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-10 text-center">Awards & Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert, index) => (
              <div key={index} className="bg-[#09090b] border border-zinc-800/80 rounded-2xl overflow-hidden group hover:border-zinc-700 transition-colors">
                <div className="relative h-56 w-full border-b border-zinc-800/80 bg-zinc-900/50">
                  <Image 
                    src={cert.src} 
                    alt={cert.title} 
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-white font-semibold mb-1">{cert.title}</h3>
                  <p className="text-zinc-500 text-sm">{cert.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
