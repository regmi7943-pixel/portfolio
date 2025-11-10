import React from 'react'
import useTheme from '../hooks/useTheme'

const links = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#resume', label: 'Resume' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const { theme, toggle } = useTheme()

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60 border-b border-slate-200/60 dark:border-slate-800/60">
      <nav className="container flex items-center justify-between py-4">
        <a href="#hero" className="font-bold tracking-tight text-lg">Kiran Regmi</a>
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              {l.label}
            </a>
          ))}
          <button aria-label="Toggle theme" onClick={toggle} className="btn btn-secondary p-2 h-10 w-10 justify-center">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
        <div className="md:hidden flex items-center gap-2">
          <button aria-label="Toggle theme" onClick={toggle} className="btn btn-secondary p-2 h-10 w-10 justify-center">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </nav>
    </header>
  )
}
