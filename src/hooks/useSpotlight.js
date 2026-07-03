import { useCallback } from 'react'

/**
 * useSpotlight — returns an onMouseMove handler that tracks the cursor
 * position as CSS custom properties (--mx, --my) on the target element,
 * powering the `.spotlight` radial-gradient hover effect.
 *
 *   <div onMouseMove={onMove} className="spotlight">…</div>
 */
export default function useSpotlight() {
  return useCallback((e) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }, [])
}
