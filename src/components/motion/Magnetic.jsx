import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Magnetic — wraps an element and pulls it toward the cursor while hovered,
 * like a button that's attracted to your mouse. Returns to center on leave.
 */
export default function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const { width, height, left, top } = el.getBoundingClientRect()
    const x = (e.clientX - (left + width / 2)) * strength
    const y = (e.clientY - (top + height / 2)) * strength
    setPos({ x, y })
  }

  const reset = () => setPos({ x: 0, y: 0 })

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 250, damping: 18, mass: 0.4 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
