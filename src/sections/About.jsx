import React from 'react'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <div className="grid md:grid-cols-[200px_1fr] gap-8 items-start">
      <motion.img
        src="/profile.png"
        alt="Kiran Regmi"
        className="w-40 h-40 md:w-48 md:h-48 rounded-2xl object-cover border border-slate-200 dark:border-slate-800"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      />
      <div className="space-y-4">
        <h2 className="h2">About Me</h2>
        <p className="p">
          I'm a front-end and cross‑platform developer focused on building fast, accessible, and well-crafted products.
          I enjoy clean architectures, smooth animations, and solving real user problems.
        </p>
      </div>
    </div>
  )
}
