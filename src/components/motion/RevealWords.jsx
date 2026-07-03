import React from 'react'
import { motion } from 'framer-motion'

/**
 * RevealWords — splits a string into words and masks each one so they
 * slide up from behind a clip-mask, staggered. Great for headlines.
 */
export default function RevealWords({
  text,
  className = '',
  highlightClassName,
  highlightText,
  delay = 0,
  stagger = 0.08,
  once = true,
  as: Tag = 'h2',
}) {
  const MotionTag = motion[Tag] || motion.h2

  // Split out the highlighted segment (if provided) and keep the surrounding text.
  let segments = [{ text, hl: false }]
  if (highlightText && text.includes(highlightText)) {
    const [before, rest] = text.split(highlightText)
    segments = [
      { text: before, hl: false },
      { text: highlightText, hl: true },
      { text: rest, hl: false },
    ].filter((s) => s.text.length > 0)
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.4 }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {segments.map((seg, si) =>
        seg.text.split(' ').map((word, wi) => (
          <span key={`${si}-${wi}`} className="word-mask">
            <motion.span
              className={`word-inner ${seg.hl ? highlightClassName : ''}`}
              variants={{
                hidden: { y: '110%', opacity: 0 },
                visible: {
                  y: '0%',
                  opacity: 1,
                  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              {word}
              {wi < seg.text.split(' ').length - 1 ? '\u00A0' : ''}
            </motion.span>
          </span>
        ))
      )}
    </MotionTag>
  )
}
