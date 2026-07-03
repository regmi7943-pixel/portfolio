import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ImQuotesLeft } from 'react-icons/im'
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi'
import Reveal from '../components/motion/Reveal'
import RevealWords from '../components/motion/RevealWords'
import Section from '../components/motion/Section'

const testimonials = [
  {
    quote: "The interactive patient appointment request system has completely streamlined our clinic's onboarding. Kiran translated our fertility clinic's scientific vision into a premium, reassuring web experience.",
    author: "Dr. Nabin Kumar Rauniyar",
    role: "Lead Specialist",
    company: "Nawajeevan",
    avatarBg: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
  },
  {
    quote: "Kiran built an eco-friendly booking portal for our guesthouse that brought us 45% more direct bookings this season. Highly recommended.",
    author: "Kul Bahadur Acharya",
    role: "Founder",
    company: "Nanohana Lodge",
    avatarBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
  {
    quote: "The liveNotice board and admission inquiry features have bridged a massive communication gap. Extremely useful and effective.",
    author: "Dr. Mahendra Pd. Chaudhary",
    role: "Founder",
    company: "Sankalpa Batika",
    avatarBg: "bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-500/20",
  },
  {
    quote: "A truly world-class web presence. The scientific tooth whitening animations and elegant UI significantly elevated our conversions.",
    author: "Dr. Kamrul Haque",
    role: "Chief Dentist",
    company: "Haque Dental",
    avatarBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  }
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-play the slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const active = testimonials[currentIndex]

  const next = () => setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  const prev = () => setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))

  return (
    <Section id="testimonials" className="space-y-12 py-24 relative overflow-hidden flex flex-col items-center justify-center">
      {/* Symmetrical Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="space-y-4 text-center max-w-2xl mx-auto relative z-10 px-4 mb-8">
        <Reveal>
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Client Success
          </span>
        </Reveal>
        <RevealWords as="h2" className="h2 leading-tight" text="Trusted by industry leaders." />
      </div>

      <div className="max-w-4xl w-full mx-auto px-6 relative z-10">
        {/* Locked height container prevents layout shift between varying text lengths */}
        <div className="min-h-[400px] sm:min-h-[350px] flex flex-col items-center justify-center relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="text-center flex flex-col items-center w-full"
            >
              <div className="text-slate-200/50 dark:text-slate-800/40 text-5xl font-serif mb-8">
                <ImQuotesLeft />
              </div>
              
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-light leading-snug md:leading-tight text-slate-800 dark:text-white mb-10 max-w-3xl text-balance">
                "{active.quote}"
              </h3>
              
              <div className="flex flex-col items-center gap-4">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg border uppercase tracking-wider select-none ${active.avatarBg}`}>
                  {active.author.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>
                <div className="text-center">
                  <div className="text-slate-900 dark:text-white font-semibold text-lg">{active.author}</div>
                  <div className="text-slate-500 dark:text-slate-400 text-sm mt-1">{active.role}, <span className="text-slate-500 dark:text-slate-400 font-medium">{active.company}</span></div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Symmetrical Navigation Controls */}
        <div className="flex justify-center items-center gap-6 mt-12">
          <button 
            onClick={prev}
            className="p-3 rounded-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <HiArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="flex gap-2.5">
            {testimonials.map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => setCurrentIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-indigo-500 w-8' : 'bg-slate-300 dark:bg-slate-700 w-2.5 hover:bg-slate-400 dark:hover:bg-slate-600'}`} 
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>

          <button 
            onClick={next}
            className="p-3 rounded-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <HiArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Section>
  )
}
