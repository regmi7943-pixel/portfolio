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
        <div className="flex gap-3">
          <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-secondary">
            🧩 Code
          </a>
          <a href={project.demo} target="_blank" rel="noreferrer" className="btn btn-primary">
            🔗 Live Demo
          </a>
        </div>
      </div>
    </motion.div>
  )
}
