import React from 'react'

export default function Resume() {
  return (
    <div className="space-y-4">
      <h2 className="h2">Resume</h2>
      <p className="p">Download my CV for a concise overview of my experience and skills.</p>
      <a href="/Kiran-Regmi-CV.pdf" download className="btn btn-primary w-max">
        ⬇️ Download CV
      </a>
    </div>
  )
}
