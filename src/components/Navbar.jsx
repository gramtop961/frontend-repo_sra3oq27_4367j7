import { useEffect } from 'react'

const navLinks = [
  { label: 'Tools', href: '#' },
  { label: 'Learn', href: '#' },
  { label: 'About', href: '#' },
  { label: 'Contact', href: '#' },
]

export default function Navbar({ playClick }) {
  useEffect(() => {
    // attach click sounds for nav links
    const links = document.querySelectorAll('a[data-clickable="true"]')
    links.forEach((el) => el.addEventListener('click', playClick))
    return () => links.forEach((el) => el.removeEventListener('click', playClick))
  }, [playClick])

  return (
    <header className="w-full sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-black/30 bg-black/50 border-b border-white/5">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="text-2xl font-bold tracking-wider select-none" style={{ fontFamily: 'Rajdhani, system-ui, sans-serif' }}>
          <span className="text-[#FFA500]">Power</span>
          <span className="text-white">IQ</span>
        </div>
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                data-clickable="true"
                onClick={(e) => e.preventDefault()}
                className="text-sm text-gray-300 hover:text-white transition-colors"
                style={{ fontFamily: 'Inter, ui-sans-serif, system-ui' }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
