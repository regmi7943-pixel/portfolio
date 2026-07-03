import React, { useRef, useEffect } from 'react'

export default function CanvasBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId

    // Mouse coordinates tracking
    const mouse = { x: null, y: null, radius: 100 }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    const handleMouseLeave = () => {
      mouse.x = null
      mouse.y = null
    }

    // Attach listener to parent element for local coordination
    const container = canvas.parentElement
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
      container.addEventListener('mouseleave', handleMouseLeave)
    }

    // Handle resize with device pixel ratio scaling for retina displays
    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return
      const dpr = window.devicePixelRatio || 1
      const width = canvas.parentElement.clientWidth
      const height = canvas.parentElement.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.scale(dpr, dpr)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    // Particle class definition
    class Particle {
      constructor(w, h) {
        this.w = w
        this.h = h
        this.baseX = Math.random() * w
        this.baseY = Math.random() * h
        this.x = this.baseX
        this.y = this.baseY
        this.vx = (Math.random() - 0.5) * 0.35
        this.vy = (Math.random() - 0.5) * 0.35
        this.size = Math.random() * 1.5 + 0.6
        this.density = Math.random() * 18 + 8
      }

      draw() {
        // Adapt colors according to theme: soft dark particles or soft light particles
        const isDark = document.documentElement.classList.contains('dark')
        ctx.fillStyle = isDark ? 'rgba(99, 102, 241, 0.22)' : 'rgba(79, 70, 229, 0.12)'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
      }

      update() {
        this.baseX += this.vx
        this.baseY += this.vy

        // Bounce boundaries
        if (this.baseX < 0 || this.baseX > this.w) this.vx *= -1
        if (this.baseY < 0 || this.baseY > this.h) this.vy *= -1

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x
          const dy = mouse.y - this.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < mouse.radius) {
            const forceDirectionX = dx / distance
            const forceDirectionY = dy / distance
            const maxDistance = mouse.radius
            const force = (maxDistance - distance) / maxDistance
            const directionX = forceDirectionX * force * this.density * 0.6
            const directionY = forceDirectionY * force * this.density * 0.6

            this.x -= directionX
            this.y -= directionY
          } else {
            this.x += (this.baseX - this.x) * 0.08
            this.y += (this.baseY - this.y) * 0.08
          }
        } else {
          this.x += (this.baseX - this.x) * 0.08
          this.y += (this.baseY - this.y) * 0.08
        }
      }
    }

    const particles = []
    const particleCount = 70
    const w = canvas.width / (window.devicePixelRatio || 1)
    const h = canvas.height / (window.devicePixelRatio || 1)

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(w, h))
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.update()
        p.draw()
      })
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove)
        container.removeEventListener('mouseleave', handleMouseLeave)
      }
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />
}
