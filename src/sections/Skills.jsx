import React from 'react'
import { SiReact, SiFirebase, SiMysql, SiNodedotjs, SiHtml5, SiCss3, SiBootstrap, SiJavascript, SiPhp } from 'react-icons/si'
import RevealWords from '../components/motion/RevealWords'
import Reveal from '../components/motion/Reveal'
import Section from '../components/motion/Section'
import Marquee from '../components/motion/Marquee'

// One flat list — no nested category cards. Marquee handles the motion.
const skills = [
  { name: 'HTML5', icon: SiHtml5, color: 'text-[#E34F26]' },
  { name: 'CSS3', icon: SiCss3, color: 'text-[#1572B6]' },
  { name: 'JavaScript', icon: SiJavascript, color: 'text-[#F7DF1E]' },
  { name: 'Bootstrap', icon: SiBootstrap, color: 'text-[#7952B3]' },
  { name: 'Node.js', icon: SiNodedotjs, color: 'text-[#339933]' },
  { name: 'PHP', icon: SiPhp, color: 'text-[#777BB4]' },
  { name: 'MySQL', icon: SiMysql, color: 'text-[#4479A1]' },
  { name: 'Firebase', icon: SiFirebase, color: 'text-[#FFCA28]' },
  { name: 'React Native', icon: SiReact, color: 'text-[#61DAFB]' },
]

export default function Skills() {
  // Split into two rows for the counter-rotating marquees.
  const rowA = skills.slice(0, 5)
  const rowB = skills.slice(4).concat(skills.slice(0, 3)) // overlap a little for variety

  return (
    <Section id="skills" className="relative py-12">
      <div className="space-y-10">
        <div className="space-y-3 max-w-2xl">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-650 dark:text-indigo-400">My Stack</span>
          </Reveal>
          <RevealWords
            as="h2"
            className="h2"
            text="Tools I use to ship reliable products."
          />
          <Reveal delay={0.1}>
            <p className="p">
              A focused, battle-tested toolkit spanning front-end, back-end, databases, and mobile. No buzzword soup — just what gets the job done.
            </p>
          </Reveal>
        </div>

        {/* Edge fades */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-50 dark:from-[#080B10] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-50 dark:from-[#080B10] to-transparent z-10" />

          <div className="space-y-5">
            <Marquee duration={32}>
              {rowA.map((s) => <SkillPill key={s.name} skill={s} />)}
            </Marquee>
            <Marquee duration={38} reverse>
              {rowB.map((s) => <SkillPill key={s.name} skill={s} />)}
            </Marquee>
          </div>
        </div>
      </div>
    </Section>
  )
}

function SkillPill({ skill }) {
  const Icon = skill.icon
  return (
    <div className="group mx-3 flex items-center gap-3 px-5 py-3.5 rounded-2xl glass-card border hover:-translate-y-1 hover:shadow-glow transition-all duration-300 cursor-default">
      <span className={`text-2xl transition-transform duration-300 group-hover:scale-125 ${skill.color}`}>
        <Icon />
      </span>
      <span className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">{skill.name}</span>
    </div>
  )
}
