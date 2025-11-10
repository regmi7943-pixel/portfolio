import React from 'react'
import { projects } from '../data/projects'
import ProjectCard from '../components/ProjectCard'

export default function Projects() {
  return (
    <div>
      <h2 className="h2 mb-6">Projects</h2>
      <div className="space-y-8">
        <div>
          <div className="grid sm:grid-cols-2 gap-6">
            {projects.map((p) => (
              <ProjectCard key={p.title} project={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
