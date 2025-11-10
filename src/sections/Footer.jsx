import React from 'react'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-200 dark:border-slate-800">
      <div className="container py-6 text-sm flex items-center justify-between">
        <p>© {new Date().getFullYear()} Kiran Regmi</p>
        <a href="#hero" className="hover:text-indigo-600 dark:hover:text-indigo-400">Back to top ↑</a>
      </div>
    </footer>
  )
}
