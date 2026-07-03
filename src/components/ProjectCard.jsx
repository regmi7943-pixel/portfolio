import React, { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { HiOutlineExternalLink } from 'react-icons/hi'
import { FiGithub } from 'react-icons/fi'
import Tilt from './motion/Tilt'

const ProjectCard = forwardRef(({ project }, ref) => {
  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="h-full"
    >
      <Tilt max={8} scale={1.015} className="h-full">
        <div className="glass-card flex flex-col rounded-2xl overflow-hidden shadow-sm h-full group relative">
          {/* Project Image Panel */}
          <div className="h-48 overflow-hidden relative bg-slate-100 dark:bg-slate-900 border-b border-slate-200/50 dark:border-slate-800/30">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-[1.1s] ease-out [@media(hover:hover)]:group-hover:scale-[1.1]"
            />
            {/* overlay sweep on hover - desktop only */}
            <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            {/* sheen - desktop only */}
            <div className="hidden md:block absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            {project.category === 'web' && (
              <span className="absolute top-3 right-3 px-2 py-1 text-[9px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300 rounded-md border border-indigo-500/20 backdrop-blur-md">
                Web Dev
              </span>
            )}
            {project.category === 'mobile' && (
              <span className="absolute top-3 right-3 px-2 py-1 text-[9px] font-bold uppercase tracking-wider bg-sky-500/10 text-sky-600 dark:bg-sky-500/20 dark:text-sky-300 rounded-md border border-sky-500/20 backdrop-blur-md">
                Mobile App
              </span>
            )}

            {/* hover action row - desktop only */}
            <div className="hidden md:flex absolute inset-x-0 bottom-0 p-3 gap-2 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400" style={{ transformStyle: 'preserve-3d' }}>
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 text-center text-[10px] font-bold uppercase tracking-wider px-3 py-2 rounded-lg bg-white/90 text-slate-900 hover:bg-white transition-colors backdrop-blur"
                >
                  Visit Site
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center px-3 py-2 rounded-lg bg-white/15 text-white hover:bg-white/25 transition-colors backdrop-blur"
                  aria-label="View code"
                >
                  <FiGithub className="text-sm" />
                </a>
              )}
            </div>
          </div>

          {/* Card Info */}
          <div className="p-5 flex flex-col flex-1 space-y-4">
            <h3 className="text-base font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-650 dark:group-hover:text-indigo-400 transition-colors">
              {project.title}
            </h3>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed flex-1">
              {project.description}
            </p>

            {/* Mobile Actions: Rendered persistently on mobile touch-devices */}
            <div className="flex md:hidden gap-3 pt-2">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 text-center text-[11px] font-bold uppercase tracking-wider py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-sm"
                >
                  Visit Site
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center px-4 rounded-xl border border-slate-350 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                  aria-label="View code"
                >
                  <FiGithub className="text-base" />
                </a>
              )}
            </div>

            {/* Tech Stack List */}
            {project.tech && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.tech.split(',').map((t, i) => (
                  <motion.span
                    key={t.trim()}
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                    className="text-[9px] font-semibold text-slate-650 dark:text-slate-400 bg-slate-200/50 dark:bg-slate-850/40 px-2 py-1 rounded-md border border-slate-300/20 dark:border-slate-800/20"
                  >
                    {t.trim()}
                  </motion.span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Tilt>
    </motion.div>
  )
})

export default ProjectCard
