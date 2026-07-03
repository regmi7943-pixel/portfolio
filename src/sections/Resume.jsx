import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { HiOutlineLightBulb, HiOutlineTemplate, HiOutlineCode, HiOutlineStatusOnline } from 'react-icons/hi'
import Reveal from '../components/motion/Reveal'
import RevealWords from '../components/motion/RevealWords'
import Section from '../components/motion/Section'

const steps = [
  {
    step: '01',
    icon: HiOutlineLightBulb,
    title: 'Discovery Call',
    description: 'We discuss your business, goals, and what your website needs to accomplish. I learn about your brand, target audience, and competitors.',
    accent: 'amber',
  },
  {
    step: '02',
    icon: HiOutlineTemplate,
    title: 'Design & Layout',
    description: "I create a clean, modern design tailored to your business. You review, give feedback, and we refine it until it's exactly right.",
    accent: 'indigo',
  },
  {
    step: '03',
    icon: HiOutlineCode,
    title: 'Development',
    description: 'I build your site with responsive layouts, fast performance, SEO optimization, and any admin panels or email systems your plan includes.',
    accent: 'emerald',
  },
  {
    step: '04',
    icon: HiOutlineStatusOnline,
    title: 'Launch & Support',
    description: 'I set up your domain, deploy to hosting (free forever), and hand over the keys. Plus ongoing technical support whenever you need it.',
    accent: 'rose',
  },
]

const accentMap = {
  amber: 'text-amber-500 bg-amber-500/10 dark:bg-amber-500/5 border-amber-500/30',
  indigo: 'text-indigo-500 bg-indigo-500/10 dark:bg-indigo-500/5 border-indigo-500/30',
  emerald: 'text-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/5 border-emerald-500/30',
  rose: 'text-rose-500 bg-rose-500/10 dark:bg-rose-500/5 border-rose-500/30',
}

export default function Process() {
  const trackRef = useRef(null)
  // Progress line fills as the timeline scrolls through the viewport.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 75%', 'end 60%'],
  })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <Section id="process" className="relative py-12">
      <div className="glow-spot w-[400px] h-[400px] bg-indigo-500/5 -top-20 right-0" />

      <div className="space-y-14 relative z-10">
        <div className="max-w-2xl space-y-3">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-650 dark:text-indigo-400">How I Work</span>
          </Reveal>
          <RevealWords as="h2" className="h2" text="From idea to live website in four steps." />
          <Reveal delay={0.1}>
            <p className="p">
              No complicated processes or corporate jargon. Here's exactly what happens when you work with me — straightforward, transparent, and efficient.
            </p>
          </Reveal>
        </div>

        {/* Vertical timeline (desktop centered, mobile left rail) */}
        <div ref={trackRef} className="relative lg:pl-0 pl-2">
          {/* Static rail */}
          <div className="absolute left-[22px] lg:left-1/2 lg:-translate-x-1/2 top-2 bottom-2 w-[2px] bg-slate-200/70 dark:bg-slate-800/60 rounded-full" />
          {/* Animated filling line */}
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute left-[22px] lg:left-1/2 lg:-translate-x-1/2 top-2 bottom-2 w-[2px] origin-top rounded-full bg-gradient-to-b from-amber-400 via-indigo-500 to-rose-500"
          />

          <ol className="space-y-10 lg:space-y-2">
            {steps.map((s, idx) => {
              const Icon = s.icon
              const left = idx % 2 === 0
              return (
                <li key={s.step} className="relative">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className={`relative flex items-center gap-6 lg:gap-0 ${left ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                  >
                    {/* Node on the rail */}
                    <div className="absolute left-[22px] lg:left-1/2 -translate-x-1/2 z-10">
                      <span className="relative flex h-4 w-4">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-30 animate-ping" />
                        <span className="relative inline-flex rounded-full h-4 w-4 border-2 border-slate-50 dark:border-[#080B10] bg-gradient-to-br from-indigo-500 to-purple-500" />
                      </span>
                    </div>

                    {/* Spacer for desktop zig-zag */}
                    <div className="hidden lg:block lg:w-1/2" />

                    {/* Card */}
                    <div className={`flex-1 lg:w-1/2 pl-12 lg:pl-0 ${left ? 'lg:pr-14 lg:text-right' : 'lg:pl-14'}`}>
                      <div className="inline-block glass-card rounded-2xl p-5 max-w-md hover:-translate-y-1 hover:shadow-glow transition-all duration-300 relative overflow-hidden">
                        {/* Step watermark */}
                        <span className={`absolute -top-3 ${left ? 'left-2' : 'right-2'} text-7xl font-black text-slate-100 dark:text-[#121A28] leading-none select-none pointer-events-none`}>
                          {s.step}
                        </span>
                        <div className="relative z-10 flex items-center gap-3 mb-2.5 flex-wrap">
                          <div className={`h-10 w-10 rounded-xl flex items-center justify-center text-xl border ${accentMap[s.accent]}`}>
                            <Icon />
                          </div>
                          <h3 className="text-base font-bold text-slate-800 dark:text-white">{s.title}</h3>
                        </div>
                        <p className="relative z-10 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{s.description}</p>
                      </div>
                    </div>
                  </motion.div>
                </li>
              )
            })}
          </ol>
        </div>

        {/* Trust Indicators */}
        <Reveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 pt-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Typical Delivery: 7–14 Days
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Unlimited Revisions During Build
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Zero Recurring Fees
            </span>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
