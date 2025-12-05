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
          I'm a Computer Information System student at Boston International College (2022-Present), focused on building fast, accessible, and well-crafted web and mobile applications.
          I enjoy creating innovative solutions that solve real-world problems, from e-commerce platforms to vehicle rental apps.
        </p>
        <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
          <p><strong>Education:</strong> Bachelor in Computer Information System, Boston International College</p>
          <p><strong>Previous:</strong> +2 Management (GPA: B+), Madi Multiple Campus, NEB</p>
          <p><strong>DOB:</strong> August 18, 2005</p>
          <p><strong>Nationality:</strong> Nepali</p>
        </div>
      </div>
    </div>
  )
}
