import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

/**
 * useCountUp — animates a number from 0 -> target once the ref enters view.
 *
 * Usage:
 *   const { ref, value } = useCountUp(100)
 *   <span ref={ref}>{value}</span>
 *
 * Pass `suffix` (e.g. '+', '%') separately; the hook returns just the number.
 */
export default function useCountUp(target, { duration = 1600, decimals = 0 } = {}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      // easeOutExpo for a snappy settle
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
      setValue(target * eased)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, duration])

  const display = decimals > 0 ? value.toFixed(decimals) : Math.round(value)
  return { ref, value: display, inView }
}
