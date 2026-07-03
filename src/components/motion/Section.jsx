import React from 'react'
import { motion } from 'framer-motion'

/**
 * Section — a scroll wrapper that fades its content up when it enters view,
 * with subtle scale for depth. Keeps section reveal logic in one place.
 */
export default function Section({ children, id, className = '', delay = 0 }) {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  )
}
