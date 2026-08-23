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
        <div className="text-center mb-24">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white mb-6">About StoreTap</h1>
          <p className="text-zinc-400 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            StoreTap was not built primarily to make money, but to help local stores transition into the digital era. 
            It started with a mission to help my mother's business become more efficient and reliable. By providing 
            cloud-synced, offline-first tools at an affordable price, we aim to recover basic expenses while genuinely 
            uplifting local business owners. We help them, and in turn, they help us.
          </p>
        </div>

        {/* Founder Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl">
            <Image 
              src="/founder.png" 
              alt="Vincent Layon - Founder" 
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Meet the Founder</h2>
            <h3 className="text-xl text-blue-400 mb-6">Vincent Layon (Vince)</h3>
            <div className="space-y-4 text-zinc-400 leading-relaxed">
              <p>
                I am a passionate developer with expertise in building a wide range of systems, from Platform-as-a-Service (PaaS) 
                and inventory systems to enterprise-grade examination, payroll, and ID management systems.
              </p>
              <p>
                My technical background spans mobile application development, intricate game development with custom logic, 
                real-time economic and probability engines, and professional web applications. 
              </p>
              <p>
                A core part of my expertise is building <strong>AI-driven systems</strong>, including custom AI for decision support, 
                digital pets, and AI companions. My work and performance have been recognized by industry leaders like <strong>Globe Telecom</strong> and <strong>PLDT</strong>.
              </p>
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
