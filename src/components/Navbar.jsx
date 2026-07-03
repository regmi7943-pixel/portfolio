import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useTheme from '../hooks/useTheme'
import { HiMenu, HiX } from 'react-icons/hi'
import Magnetic from './motion/Magnetic'

const links = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Work' },
  { href: '#skills', label: 'Stack' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#process', label: 'Process' },
  { href: '#testimonials', label: 'Reviews' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const { theme, toggle } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b transition-all duration-300">
      <nav className="container flex items-center justify-between py-4">
        {/* Logo / Profile */}
        <a href="#hero" className="flex items-center gap-3 group">
          <img
            src="/profile.png"
            alt="Kiran Regmi"
            className="h-9 w-9 rounded-full object-cover border border-slate-200 dark:border-slate-800 group-hover:scale-105 group-hover:border-slate-400 dark:group-hover:border-slate-600 transition-all duration-350"
          />
          <div className="flex flex-col">
            <span className="font-bold tracking-tight text-sm text-slate-800 dark:text-white leading-none">Kiran Regmi</span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wider mt-0.5 uppercase">Web Developer</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-xs font-semibold uppercase tracking-wider text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors duration-200 group"
            >
              {l.label}
              <span className="absolute -bottom-1.5 left-0 h-0.5 w-0 bg-indigo-500 group-hover:w-full transition-all duration-300 rounded-full" />
            </a>
          ))}

          <div className="flex items-center gap-4 pl-4 border-l border-slate-200 dark:border-slate-800">
            <button
              aria-label="Toggle theme"
              onClick={toggle}
              className="btn btn-secondary p-2 h-9 w-9 justify-center rounded-lg text-lg hover:rotate-12 transition-transform"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <Magnetic strength={0.3}>
              <a href="#contact" className="btn btn-primary px-4 py-2 text-xs rounded-lg uppercase tracking-wider font-bold">
                Start a Project
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex items-center gap-3">
          <button
            aria-label="Toggle theme"
            onClick={toggle}
            className="btn btn-secondary p-2 h-9 w-9 justify-center rounded-lg text-base"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          <button
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn btn-secondary p-2 h-9 w-9 justify-center rounded-lg text-xl"
          >
            {mobileMenuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden glass-panel border-b absolute top-full left-0 w-full overflow-hidden"
          >
            <motion.div
              className="px-6 py-4 flex flex-col gap-1"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }}
            >
              {links.map((l) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileMenuOpen(false)}
                  variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}
                  className="text-sm font-semibold uppercase tracking-wider py-2.5 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                >
                  {l.label}
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-primary w-full py-3 mt-3 text-xs rounded-lg uppercase tracking-wider font-bold"
              >
                Start a Project
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
