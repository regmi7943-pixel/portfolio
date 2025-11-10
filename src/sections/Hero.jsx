import React from 'react'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <div className="pt-16 md:pt-24 grid md:grid-cols-2 gap-10 items-center">
      <div className="space-y-6">
        <h1 className="h1">Hi, I'm Kiran Regmi</h1>
        <p className="p">I build performant, delightful apps with React, React Native, Firebase, MySQL, and Node.js.</p>
        <div className="flex gap-3">
          <a href="#projects" className="btn btn-primary">View Projects</a>
          <a href="#contact" className="btn btn-secondary">Contact Me</a>
        </div>
      </div>
      <div className="relative h-64 md:h-80">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 70 }}
          className="absolute inset-0 card shadow-float flex items-center justify-center"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="text-7xl"
          >
            🚀
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
