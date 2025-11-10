import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Resume from './sections/Resume'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import MobileEmulator from './sections/MobileEmulator'

export default function App() {
  const isEmbed = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('embed') === '1'
  const [showFullSite, setShowFullSite] = useState(false)

  const handleEnterSite = () => {
    setShowFullSite(true)
  }

  if (!showFullSite && !isEmbed) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-10 py-16">
        <div className="text-xs uppercase tracking-[0.4em] text-white/40">Tap power to wake</div>
        <MobileEmulator onEnterSite={handleEnterSite} initialPowerOn={false} />
        <button
          type="button"
          onClick={handleEnterSite}
          className="text-xs uppercase tracking-[0.3em] text-white/40 transition hover:text-white/70"
        >
          Skip to site
        </button>
      </div>
    )
  }
  return (
    <div>
      <Navbar />
      <main className="container space-y-24 md:space-y-32">
        <section id="hero"><Hero /></section>
        <section id="about"><About /></section>
        <section id="skills"><Skills /></section>
        <section id="projects"><Projects /></section>
        <section id="resume"><Resume /></section>
        <section id="contact"><Contact /></section>
      </main>
      <Footer />
    </div>
  )
}
