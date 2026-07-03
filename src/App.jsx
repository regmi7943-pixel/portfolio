import React from 'react'
import Navbar from './components/Navbar'
import ScrollProgress from './components/motion/ScrollProgress'
import Section from './components/motion/Section'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Pricing from './sections/Pricing'
import Process from './sections/Resume'
import Testimonials from './sections/Testimonials'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

export default function App() {
  return (
    <div className="relative min-h-screen">
      {/* Top scroll progress bar */}
      <ScrollProgress />
      <Navbar />
      <main className="container space-y-28 md:space-y-40 pt-10 md:pt-16">
        <section id="hero"><Hero /></section>
        <About />
        <Projects />
        <Skills />
        <Pricing />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
