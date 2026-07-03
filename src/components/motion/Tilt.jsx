import React, { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/**
 * Tilt — 3D pointer-tracking tilt for cards. Children with the
 * `tilt-pop` class will lift toward the viewer (parallax depth).
 *
 * Props:
 *  - max: max rotation in degrees (default 10)
 *  - scale: hover scale (default 1.02)
 */
export default function Tilt({ children, max = 10, scale = 1.02, className = '' }) {
  const ref = useRef(null)
  const [hasHover, setHasHover] = useState(true)

  useEffect(() => {
    const hoverMediaQuery = window.matchMedia('(hover: hover)')
    setHasHover(hoverMediaQuery.matches)
  }, [])

  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)

  const sx = useSpring(x, { stiffness: 200, damping: 18 })
  const sy = useSpring(y, { stiffness: 200, damping: 18 })

  const rotateX = useTransform(sy, [0, 1], [max, -max])
  const rotateY = useTransform(sx, [0, 1], [-max, max])

  const handleMove = (e) => {
    if (!hasHover) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width)
    y.set((e.clientY - rect.top) / rect.height)
  }

  const reset = () => {
    x.set(0.5)
    y.set(0.5)
  }

  if (!hasHover) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      whileHover={{ scale }}
      transition={{ scale: { duration: 0.25 } }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
