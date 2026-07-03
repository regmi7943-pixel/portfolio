import React, { useState } from 'react'
import { projects } from '../data/projects'
import ProjectCard from '../components/ProjectCard'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from '../components/motion/Reveal'
import RevealWords from '../components/motion/RevealWords'
import Section from '../components/motion/Section'

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

      {/* Projects Grid */}
      <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  )
}
