import React from 'react'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Resume from './sections/Resume'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

export default function App() {
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
