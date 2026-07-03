import React from 'react'

/**
 * Marquee — seamless infinite horizontal scroller. Duplicates children
 * so the CSS `marquee` keyframe (-50%) loops without a visible seam.
 *
 * reverse: scroll right-to-left.
 * duration: seconds per loop (also settable via inline style on the track).
 */
export default function Marquee({
  children,
  reverse = false,
  duration = 40,
  className = '',
  pauseOnHover = true,
}) {
  return (
    <div className={`group relative overflow-hidden ${className}`}>
      <div
        className={`marquee-track ${pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''} ${
          reverse ? 'animate-marquee-rev' : 'animate-marquee'
        }`}
        style={{ animationDuration: `${duration}s` }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">{children}</div>
      </div>
    </div>
  )
}
