import React, { useState, useEffect } from 'react'
import { projects } from '../data/projects'
import ProjectCard from '../components/ProjectCard'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import Reveal from '../components/motion/Reveal'
import RevealWords from '../components/motion/RevealWords'
import Section from '../components/motion/Section'
import { FiGithub } from 'react-icons/fi'

const filters = [
  { id: 'all', label: 'All' },
  { id: 'web', label: 'Websites' },
  { id: 'mobile', label: 'Mobile Apps' },
]

export default function Projects() {
  const [filter, setFilter] = useState('all')

  const filteredProjects = projects.filter((p) => {
    if (filter === 'all') return true
    return p.category === filter
  })

  return (
    <Section id="projects" className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-650 dark:text-indigo-400">Delivered Projects</span>
          </Reveal>
          <RevealWords as="h2" className="h2" text="Real websites for real businesses." />
        </div>

        {/* Filter Buttons */}
        <Reveal direction="left" delay={0.15}>
          <div className="flex items-center p-1 rounded-xl bg-slate-200/50 dark:bg-slate-900/50 border border-slate-300/30 dark:border-slate-800/40 w-fit self-start md:self-auto relative">
            {filters.map((f) => {
              const active = filter === f.id
              return (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`relative px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors duration-300 ${
                    active ? 'text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 bg-white dark:bg-[#121926] rounded-lg shadow-sm"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{f.label}</span>
                </button>
              )
            })}
          </div>
        </Reveal>
      </div>

      {/* MOBILE INTERACTIVE SWIPE STACK */}
      <div className="md:hidden w-full flex flex-col items-center">
        <MobileTinderStack projects={filteredProjects} />
      </div>

      {/* DESKTOP RESPONSIVE GRID */}
      <motion.div layout className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  )
}

/* ==================== Tinder Stack Component ==================== */
function MobileTinderStack({ projects }) {
  const [stack, setStack] = useState(projects)

  useEffect(() => {
    setStack(projects)
  }, [projects])

  const handleSwipeAway = () => {
    setStack((prev) => {
      if (prev.length <= 1) return prev
      const [first, ...rest] = prev
      return [...rest, first] // Rotate the array infinitely
    })
  }

  if (stack.length === 0) {
    return (
      <div className="py-20 text-center text-slate-500 dark:text-slate-400 font-medium">
        No projects found for this category.
      </div>
    )
  }

  // Active indices relative to the base list
  const activeProject = stack[0]
  const baseIndex = projects.findIndex((p) => p.title === activeProject.title)

  return (
    <div className="w-full flex flex-col items-center space-y-6">
      {/* Symmetrical container for the stack */}
      <div className="relative w-full max-w-[300px] sm:max-w-[330px] h-[410px] flex items-center justify-center select-none">
        {stack.slice(0, 3).map((p, idx) => {
          const isTop = idx === 0
          const isSecond = idx === 1
          const isThird = idx === 2

          return (
            <TinderCard
              key={p.title}
              project={p}
              isTop={isTop}
              isSecond={isSecond}
              isThird={isThird}
              onSwipe={handleSwipeAway}
            />
          )
        })}
      </div>

      {/* Navigation Indicators & Manual Buttons */}
      <div className="flex flex-col items-center gap-3 relative z-20">
        <div className="flex gap-2">
          {projects.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === baseIndex ? 'bg-indigo-500 w-5' : 'bg-slate-300 dark:bg-slate-700 w-1.5'
              }`}
            />
          ))}
        </div>
        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest">
          Swipe Card Left or Right
        </span>
      </div>
    </div>
  )
}

/* ==================== Tinder Card Element ==================== */
function TinderCard({ project, isTop, isSecond, isThird, onSwipe }) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-25, 25])
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0.6, 1, 1, 1, 0.6])

  const handleDragEnd = (event, info) => {
    const swipeThreshold = 80
    if (info.offset.x < -swipeThreshold || info.offset.x > swipeThreshold) {
      onSwipe()
    }
  }

  const animateState = () => {
    if (isTop) return { x: 0, y: 0, scale: 1, rotate: 0, zIndex: 10 }
    if (isSecond) return { x: 0, y: 14, scale: 0.95, rotate: 1.5, zIndex: 9 }
    if (isThird) return { x: 0, y: 28, scale: 0.9, rotate: -1.5, zIndex: 8 }
    return { x: 0, y: 35, scale: 0.85, rotate: 0, zIndex: 0, opacity: 0 }
  }

  return (
    <motion.div
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        opacity: isTop ? opacity : animateState().opacity,
        zIndex: animateState().zIndex,
        position: 'absolute',
      }}
      animate={animateState()}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.4}
      onDragEnd={handleDragEnd}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className={`w-full h-[380px] bg-white dark:bg-[#0D131F] rounded-3xl overflow-hidden border border-slate-200/60 dark:border-slate-800/50 shadow-xl flex flex-col justify-between ${
        isTop ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'
      }`}
    >
      {/* Cover Image */}
      <div className="h-[180px] w-full overflow-hidden relative border-b border-slate-100 dark:border-slate-800/40">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover pointer-events-none"
        />
        {/* Visual Swipe Swipe Helper */}
        {isTop && (
          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[8px] font-bold text-white uppercase tracking-widest border border-white/10">
            Swipe Card
          </div>
        )}
      </div>

      {/* Info details */}
      <div className="p-5 flex flex-col justify-between grow">
        <div className="space-y-2">
          <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
            {project.title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Action button row */}
        <div className="flex gap-2.5 mt-auto pt-3">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="flex-1 text-center text-[10px] font-bold uppercase tracking-wider py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-sm"
            >
              Visit Site
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center"
            >
              <FiGithub className="text-sm" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}
