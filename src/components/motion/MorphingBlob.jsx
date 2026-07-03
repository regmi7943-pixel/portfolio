import React from 'react'
import { motion } from 'framer-motion'

const blobPaths = {
  stateA: "M150,50 C220,50 270,100 270,170 C270,240 220,290 150,290 C80,290 30,240 30,170 C30,100 80,50 150,50 Z",
  stateB: "M150,70 C250,40 290,140 260,200 C230,260 210,310 150,280 C90,250 40,210 60,150 C80,90 90,100 150,70 Z"
}

export default function MorphingBlob({ className = '' }) {
  return (
    <div className={`relative w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] ${className}`}>
      {/* Glow mesh underneath */}
      <div className="absolute inset-10 bg-indigo-500/20 dark:bg-indigo-600/10 rounded-full blur-3xl opacity-60 dark:opacity-40" />
      <div className="absolute inset-10 bg-purple-500/20 dark:bg-fuchsia-600/10 rounded-full blur-3xl opacity-40 dark:opacity-30 translate-x-12 translate-y-12" />

      <motion.svg
        viewBox="0 0 300 300"
        className="w-full h-full relative z-10"
        animate={{
          y: [-10, 10, -10],
          rotate: [0, 4, -4, 0]
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <motion.path
          fill="url(#hero-blob-gradient)"
          animate={{
            d: [blobPaths.stateA, blobPaths.stateB, blobPaths.stateA]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <defs>
          <linearGradient id="hero-blob-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(129, 140, 248, 0.45)" /> {/* Indigo-400 with opacity */}
            <stop offset="100%" stopColor="rgba(192, 132, 252, 0.45)" /> {/* Purple-400 with opacity */}
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  )
}
