import React, { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi'
import CanvasBackground from '../components/motion/CanvasBackground'
import MorphingBlob from '../components/motion/MorphingBlob'

/* ---------- Project showcase data ---------- */
const showcaseProjects = [
  {
    image: '/projects/nanohana-lodge.jpg',
    title: 'Nanohana Lodge',
    tag: 'Next.js + Gemini API',
  },
  {
    image: '/projects/p2.jpg',
    title: 'Nawajeevan Clinic',
    tag: 'React + Firebase',
  },
  {
    image: '/projects/haque-dental.jpg',
    title: 'Haque Dental',
    tag: 'Next.js + Three.js',
  },
  {
    image: '/projects/p3.jpg',
    title: 'Sankalpa Batika',
    tag: 'Vite + React',
  },
]



export default function Hero() {
  const containerRef = useRef(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20 })
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20 })

  // Parallax transforms for the showcase
  const rotateY = useTransform(smoothX, [0, 1], [-8, 8])
  const rotateX = useTransform(smoothY, [0, 1], [6, -6])
  const translateX = useTransform(smoothX, [0, 1], [-12, 12])
  const translateY = useTransform(smoothY, [0, 1], [-8, 8])

  // Cursor glow position
  const glowX = useTransform(smoothX, [0, 1], ['0%', '100%'])
  const glowY = useTransform(smoothY, [0, 1], ['0%', '100%'])

  // Active showcase card
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActiveIdx((i) => (i + 1) % showcaseProjects.length), 3200)
    return () => clearInterval(id)
  }, [])

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
  }

  const handleMouseLeave = () => {
    mouseX.set(0.5)
    mouseY.set(0.5)
  }

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 transition-colors duration-500"
    >
      {/* Dynamic Visual Background Elements */}
      <CanvasBackground />
      <div className="absolute right-[-10%] top-[-10%] opacity-35 dark:opacity-20 pointer-events-none z-0">
        <MorphingBlob />
      </div>

      {/* Faint vertical column grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5] dark:opacity-[0.35] z-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(15,23,42,0.04) 1px, transparent 1px)',
          backgroundSize: '80px 100%',
        }}
      />

      <div className="container relative grid lg:grid-cols-12 gap-10 lg:gap-8 items-center min-h-[88vh] py-16 z-10">
        {/* =================== LEFT: bold type =================== */}
        <div className="lg:col-span-7 relative">
          {/* Eyebrow rule + nameplate */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-10"
          >
            <span className="h-px w-10 bg-slate-400 dark:bg-slate-600" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
              Kiran Regmi <span className="text-slate-300 dark:text-slate-700">/</span> Web Dev · Chitwan, NP
            </span>
          </motion.div>

          {/* Huge chunky headline */}
          <h1 className="font-extrabold tracking-[-0.03em] leading-[0.92] text-slate-900 dark:text-white text-[2.5rem] sm:text-6xl lg:text-[5.5rem]">
            <RevealLine text="High-growth" delay={0.05} />
            <RevealLine text="websites for" delay={0.13} />
            <div className="flex items-baseline flex-wrap gap-x-5">
              <RevealLine text="local" delay={0.21} />
              <span className="relative inline-block">
                <RevealLine text="businesses." delay={0.29} accent />
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.9, duration: 0.5, ease: 'easeOut' }}
                  className="absolute -bottom-1 left-0 right-0 h-2 bg-indigo-500 origin-left -z-0"
                />
              </span>
            </div>
          </h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-8 max-w-md text-base text-slate-600 dark:text-slate-400 leading-relaxed"
          >
            Freelance developer building fast, affordable sites that turn visitors into customers — for schools, clinics & local brands across Nepal.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72, duration: 0.5 }}
            className="mt-10 flex items-center gap-6"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-slate-950 px-7 py-4 text-sm font-bold uppercase tracking-wider rounded-none hover:gap-5 transition-all duration-300"
            >
              Explore work
              <HiArrowRight className="text-lg group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="#pricing"
              className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-white pb-1 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-500 transition-colors"
            >
              View pricing
            </a>
          </motion.div>
        </div>

        {/* =================== RIGHT: Interactive Project Showcase =================== */}
        <motion.div
          className="lg:col-span-5 relative flex items-center justify-center min-h-[360px] lg:min-h-[480px] w-full"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ perspective: '1200px' }}
        >
          {/* Cursor-tracking radial glow */}
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full pointer-events-none z-0"
            style={{
              left: glowX,
              top: glowY,
              x: '-50%',
              y: '-50%',
              background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(99,102,241,0.05) 40%, transparent 70%)',
            }}
          />

          {/* Depth glow orbs behind the card stack */}
          <div className="absolute w-48 h-48 rounded-full bg-indigo-500/20 dark:bg-indigo-500/10 blur-3xl top-10 left-10 animate-pulse" />
          <div className="absolute w-36 h-36 rounded-full bg-purple-500/20 dark:bg-purple-500/10 blur-3xl bottom-16 right-8" />
          <div className="absolute w-28 h-28 rounded-full bg-emerald-500/15 dark:bg-emerald-500/8 blur-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

          {/* ==================== MOBILE LAYOUT: Flat, Fast Swipe Card ==================== */}
          <div className="lg:hidden w-full max-w-[280px] sm:max-w-[320px] aspect-[4/5] relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={(e, info) => {
                  const swipeThreshold = 40
                  if (info.offset.x < -swipeThreshold) {
                    // Swiped Left -> Next
                    setActiveIdx((prev) => (prev + 1) % showcaseProjects.length)
                  } else if (info.offset.x > swipeThreshold) {
                    // Swiped Right -> Prev
                    setActiveIdx((prev) => (prev - 1 + showcaseProjects.length) % showcaseProjects.length)
                  }
                }}
                initial={{ opacity: 0, x: 40, filter: 'blur(3px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -40, filter: 'blur(3px)' }}
                transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                className="w-full h-full rounded-2xl overflow-hidden border border-slate-200/50 dark:border-slate-700/50 shadow-2xl bg-white dark:bg-slate-900 cursor-grab active:cursor-grabbing relative select-none touch-pan-y"
              >
                <img
                  src={showcaseProjects[activeIdx].image}
                  alt={showcaseProjects[activeIdx].title}
                  className="w-full h-full object-cover pointer-events-none"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />

                {/* Info Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-6 pointer-events-none">
                  <h3 className="text-white font-extrabold text-lg sm:text-xl tracking-tight drop-shadow-md">
                    {showcaseProjects[activeIdx].title}
                  </h3>
                  <span className="inline-block mt-2 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-200 bg-indigo-500/40 rounded-md border border-indigo-400/30 backdrop-blur-sm">
                    {showcaseProjects[activeIdx].tag}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Swipe indicator badge */}
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] font-bold text-white uppercase tracking-widest pointer-events-none z-20 border border-white/10">
              Swipe
            </div>
          </div>

          {/* ==================== DESKTOP LAYOUT: 3D Perspective Card Stack ==================== */}
          <motion.div
            className="hidden lg:block relative w-[340px] h-[400px]"
            style={{
              rotateX,
              rotateY,
              translateX,
              translateY,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Background cards (depth stack) */}
            {showcaseProjects.map((project, i) => {
              const isActive = i === activeIdx
              const offset = ((i - activeIdx + showcaseProjects.length) % showcaseProjects.length)

              return (
                <motion.div
                  key={project.title}
                  className="absolute inset-0 rounded-2xl overflow-hidden border border-slate-200/50 dark:border-slate-700/50 shadow-2xl cursor-pointer will-change-transform"
                  animate={{
                    scale: isActive ? 1 : 0.9 - offset * 0.03,
                    y: isActive ? 0 : -14 - offset * 12,
                    x: isActive ? 0 : 6 + offset * 4,
                    rotateZ: isActive ? 0 : 1.5 + offset * 1,
                    zIndex: showcaseProjects.length - offset,
                    opacity: offset > 2 ? 0 : 1 - offset * 0.15,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                  }}
                  onClick={() => setActiveIdx(i)}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Screenshot */}
                  <div className="w-full h-full relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />

                    {/* Bottom info bar */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          className="absolute bottom-0 inset-x-0 p-5"
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.35 }}
                        >
                          <h3 className="text-white font-bold text-lg tracking-tight drop-shadow-lg">
                            {project.title}
                          </h3>
                          <span className="inline-block mt-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-200 bg-indigo-500/30 rounded-md border border-indigo-400/30 backdrop-blur-sm">
                            {project.tag}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Sheen sweep on active */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                        initial={{ x: '-100%' }}
                        animate={{ x: '200%' }}
                        transition={{ duration: 1.2, delay: 0.2, ease: 'easeInOut' }}
                      />
                    )}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Dots navigation */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-40">
            {showcaseProjects.map((p, i) => (
              <button
                key={p.title}
                onClick={() => setActiveIdx(i)}
                aria-label={`View ${p.title}`}
                className="group p-2"
              >
                <div className={`h-2 rounded-full transition-all duration-400 ${
                  i === activeIdx ? 'bg-indigo-500 w-8 shadow-md shadow-indigo-500/25' : 'bg-slate-300 dark:bg-slate-700 w-2 group-hover:bg-slate-450'
                }`} />
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom hairline rule with a marquee-ish scroll hint */}
      <div className="container pb-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 dark:text-slate-600"
        >
          <span>04 live client sites</span>
          <span className="hidden sm:inline">free hosting · forever</span>
          <span>scroll ↓</span>
        </motion.div>
      </div>
    </section>
  )
}

/* ---------------- Masked headline line reveal ---------------- */
function RevealLine({ text, delay = 0, accent = false }) {
  return (
    <span className="block overflow-hidden py-1">
      <motion.span
        className={`block ${accent ? 'text-indigo-600 dark:text-indigo-400' : ''}`}
        initial={{ y: '110%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {text}
      </motion.span>
    </span>
  )
}
