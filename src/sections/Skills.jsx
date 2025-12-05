import React from 'react'
import { SiReact, SiFirebase, SiMysql, SiNodedotjs, SiHtml5, SiCss3, SiBootstrap, SiJavascript, SiPhp } from 'react-icons/si'
import { motion } from 'framer-motion'

const skills = [
  { name: 'HTML', icon: <SiHtml5 className="text-orange-600" /> },
  { name: 'CSS', icon: <SiCss3 className="text-blue-500" /> },
  { name: 'Bootstrap', icon: <SiBootstrap className="text-purple-600" /> },
  { name: 'JavaScript', icon: <SiJavascript className="text-yellow-500" /> },
  { name: 'PHP', icon: <SiPhp className="text-indigo-500" /> },
  { name: 'Node.js', icon: <SiNodedotjs className="text-green-600" /> },
  { name: 'React Native', icon: <SiReact className="text-sky-500" /> },
  { name: 'MySQL', icon: <SiMysql className="text-blue-600" /> },
  { name: 'Firebase', icon: <SiFirebase className="text-amber-500" /> },
]

export default function Skills() {
  return (
    <div>
      <h2 className="h2 mb-6">Skills</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {skills.map((s) => (
          <motion.div
            key={s.name}
            className="card p-4 flex items-center gap-3"
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12 }}
          >
            <div className="text-2xl">{s.icon}</div>
            <div className="font-medium">{s.name}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
