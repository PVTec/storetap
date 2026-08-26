import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full text-center text-zinc-500 text-xs py-6 border-t border-zinc-800/80 bg-black">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col md:flex-row items-center gap-2">
          <span>StoreTap v2.1.0 &ndash; Built by <a href="https://heyvince.vercel.app" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">heyvince.vercel.app</a></span>
          <span className="hidden md:inline-block text-zinc-700">|</span>
          <span>&copy; 2026 Vince AI Developer. All Rights Reserved.</span>
        </div>
        <div className="flex items-center gap-4 font-medium text-zinc-400">
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
          <a href="https://www.facebook.com/profile.php?id=61593914545999" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Contact Us</a>
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  )
}
