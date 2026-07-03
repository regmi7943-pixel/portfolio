import React from 'react'
import { HiOutlineGlobeAlt, HiOutlineClock, HiOutlineUserGroup, HiOutlineShieldCheck } from 'react-icons/hi'
import Reveal from '../components/motion/Reveal'
import RevealWords from '../components/motion/RevealWords'
import Parallax from '../components/motion/Parallax'
import Section from '../components/motion/Section'
import useCountUp from '../hooks/useCountUp'

const stats = [
  { icon: HiOutlineGlobeAlt, target: 3, suffix: '+', label: 'Live Client Websites' },
  { icon: HiOutlineClock, target: 2, suffix: '+', label: 'Years In Business' },
  { icon: HiOutlineUserGroup, target: 100, suffix: '%', label: 'Client Satisfaction' },
  { icon: HiOutlineShieldCheck, target: null, display: '∞', label: 'Free Hosting & Support' },
]

export default function About() {
  return (
    <Section id="about" className="relative py-12">
      {/* Decorative Blur Spot */}
      <div className="glow-spot w-80 h-80 bg-purple-500/10 top-1/2 left-10" />

      <div className="grid lg:grid-cols-[250px_1fr] gap-12 items-start relative z-10">
        {/* Profile Image Column — parallax + ring */}
        <Parallax speed={24} className="flex justify-center lg:justify-start">
          <div className="relative p-2 rounded-2xl glass-panel border shadow-lg max-w-[220px] group">
            {/* animated gradient ring */}
            <div className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 blur-md bg-gradient-to-br from-indigo-500/40 via-purple-500/30 to-blue-500/40 transition-opacity duration-500" />
            <div className="relative overflow-hidden rounded-xl">
              <img
                src="/profile.png"
                alt="Kiran Regmi"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </Parallax>

        {/* Content Column */}
        <div className="space-y-6">
          <div className="space-y-3">
            <Reveal>
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-650 dark:text-indigo-400">About Me</span>
            </Reveal>
            <RevealWords
              as="h2"
              className="h2"
              text="I help businesses grow online with professional websites."
              delay={0.05}
            />
          </div>

          <Reveal direction="up" delay={0.1}>
            <p className="p">
              I'm <strong className="text-slate-800 dark:text-white">Kiran Regmi</strong>, a freelance web developer based in Chitwan, Nepal. For the past two years, I've partnered with local businesses — schools, clinics, driving centers — to build websites that actually bring in customers and establish credibility.
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.18}>
            <p className="p">
              My approach is simple: clean design, fast load times, mobile-first layouts, and pricing that doesn't break the bank. Every project ships with free domain setup, free hosting forever, and ongoing technical support. No hidden fees, no recurring charges — one investment for a professional online presence.
            </p>
          </Reveal>

          {/* Count-up stat band (replaces the 4-card grid) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
            {stats.map((stat, idx) => (
              <Reveal key={stat.label} direction="up" delay={0.1 + idx * 0.08}>
                <StatCell stat={stat} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

function StatCell({ stat }) {
  const Icon = stat.icon
  // Infinity handled statically; numbers count up.
  const { ref, value } = useCountUp(stat.target ?? 0)
  return (
    <div
      ref={ref}
      className="relative text-center p-4 rounded-xl bg-slate-100/50 dark:bg-[#0D121F]/40 border border-slate-200/50 dark:border-slate-800/40 hover:border-indigo-500/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden spotlight"
    >
      <div className="text-2xl text-indigo-600 dark:text-indigo-400 mx-auto flex justify-center mb-2">
        <Icon />
      </div>
      <div className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight tabular-nums">
        {stat.display ?? value}{stat.suffix}
      </div>
      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">{stat.label}</div>
    </div>
  )
}
