import React from 'react'
import { HiMail } from 'react-icons/hi'
import { FaGithub } from 'react-icons/fa'

export default function Contact() {
  return (
    <div>
      <h2 className="h2 mb-6">Get In Touch</h2>
      <p className="p mb-8">Have a question or want to work together? Feel free to reach out!</p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Email Card */}
        <a
          href="mailto:regmi7943@gmail.com"
          className="card p-6 flex items-center gap-4 hover:shadow-lg transition-all duration-300 group"
        >
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl group-hover:scale-110 transition-transform">
            <HiMail />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">Email</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">regmi7943@gmail.com</p>
          </div>
        </a>

        {/* GitHub Card */}
        <a
          href="https://github.com/kiran987657"
          target="_blank"
          rel="noreferrer"
          className="card p-6 flex items-center gap-4 hover:shadow-lg transition-all duration-300 group"
        >
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 dark:from-slate-600 dark:to-slate-800 flex items-center justify-center text-white text-3xl group-hover:scale-110 transition-transform">
            <FaGithub />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">GitHub</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">@kiran987657</p>
          </div>
        </a>
      </div>
    </div>
  )
}
