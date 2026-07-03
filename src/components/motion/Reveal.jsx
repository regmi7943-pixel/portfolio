import React from 'react'
import { motion } from 'framer-motion'

/**
 * Reveal — fade + slide an element into view on scroll.
 * Use anywhere you'd normally hand-roll a `whileInView`.
 *
 * direction: 'up' | 'down' | 'left' | 'right' | 'none'
 */
export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 28,
  once = true,
  amount = 0.3,
  className = '',
  as: Tag = 'div',
}) {
  const offset = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  }[direction]

  const MotionTag = motion[Tag] || motion.div

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}
