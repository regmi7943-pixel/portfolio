import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * Parallax — move a child vertically based on its scroll progress
 * through the viewport. `speed` is in px of travel (negative = up).
 */
export default function Parallax({ children, speed = 60, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed])

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  )
}
