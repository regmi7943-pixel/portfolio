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
            className="flex items-center justify-center h-9 w-9 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors text-base"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          <button
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-center h-9 w-9 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors text-xl"
          >
            {mobileMenuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile Full-Screen Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden fixed inset-0 h-screen w-screen bg-slate-50 dark:bg-[#080B10] z-[999] flex flex-col p-6 overflow-y-auto"
          >
            {/* Header row inside menu */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-200/50 dark:border-slate-800/60">
              <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3">
                <img
                  src="/profile.png"
                  alt="Kiran Regmi"
                  className="h-9 w-9 rounded-full object-cover border border-slate-200 dark:border-slate-800"
                />
                <div className="flex flex-col">
                  <span className="font-bold tracking-tight text-sm text-slate-800 dark:text-white leading-none">Kiran Regmi</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wider mt-0.5 uppercase">Web Developer</span>
                </div>
              </a>

              {/* Close Button */}
              <button
                aria-label="Close menu"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center h-9 w-9 rounded-lg bg-slate-200/60 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-300/40 dark:border-slate-700/50 transition-colors text-xl"
              >
                <HiX />
              </button>
            </div>

            {/* Menu Links */}
            <motion.div
              className="flex-1 flex flex-col justify-center gap-2 py-8"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
            >
              {links.map((l) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileMenuOpen(false)}
                  variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  className="text-2xl font-extrabold uppercase tracking-widest text-slate-800 dark:text-slate-200 hover:text-indigo-650 dark:hover:text-indigo-400 py-3 transition-colors border-b border-slate-200/40 dark:border-slate-800/40"
                >
                  {l.label}
                </motion.a>
              ))}
            </motion.div>

            {/* Start Project CTA at bottom */}
            <div className="pb-8">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-primary w-full py-4 text-xs rounded-xl uppercase tracking-wider font-bold text-center block"
              >
                Start a Project
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
