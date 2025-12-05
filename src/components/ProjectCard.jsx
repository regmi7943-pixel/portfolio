import React from 'react'
import { motion } from 'framer-motion'

export default function ProjectCard({ project }) {
  return (
    <motion.div
      className="card overflow-hidden shadow-float"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -6 }}
    >
      <div className="h-44 bg-slate-100 dark:bg-slate-800">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
      </div>
      <div className="p-5 space-y-3">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <p className="p">{project.description}</p>
        {project.tech && (
          <div className="text-xs text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-lg px-3 py-2">
            <strong>Tech Stack:</strong> {project.tech}
          </div>
        )}
      </div>
    </motion.div>
  )
}
