import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full text-center text-zinc-500 text-xs py-10 border-t border-zinc-800/80 bg-black">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col md:flex-row items-center gap-2 text-zinc-400 text-sm">
          <span>StoreTap v2.1.0 &ndash; Built by <span className="font-semibold text-white">StoreTap Technologies</span></span>
          <span className="hidden md:inline-block text-zinc-700">|</span>
          <span>&copy; {new Date().getFullYear()} All Rights Reserved.</span>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 font-medium text-zinc-400">
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
          <a href="https://heyvince.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Contact Support</a>
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 mt-8 text-zinc-600 space-y-1">
        <p>Customer data is never sold. StoreTap uses data strictly for service provision.</p>
        <p>Demo data and expired license data may be permanently deleted after 30 consecutive days of inactivity.</p>
      </div>
    </footer>
  )
}
