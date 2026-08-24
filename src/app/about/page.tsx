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
