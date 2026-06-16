import { useEffect, useRef } from 'react'

export default function StarField({ starCount = 200, className = '' }) {
  const canvasRef = useRef(null)
  const animFrameRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()

    const w = canvas.offsetWidth
    const h = canvas.offsetHeight

    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 1.5 + 0.3,
      speed: Math.random() * 0.02 + 0.005,
      twinkleSpeed: Math.random() * 0.02 + 0.01,
      twinklePhase: Math.random() * Math.PI * 2,
      depth: Math.random() * 3 + 1,
    }))

    const handleMouse = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = (e.clientX - rect.left) / w - 0.5
      mouseRef.current.y = (e.clientY - rect.top) / h - 0.5
    }

    let time = 0
    const animate = () => {
      time += 1
      const cw = canvas.offsetWidth
      const ch = canvas.offsetHeight
      ctx.clearRect(0, 0, cw, ch)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      for (const star of stars) {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.5 + 0.5
        const opacity = 0.15 + twinkle * 0.7

        // Parallax based on mouse and depth
        const px = star.x + mx * star.depth * 15
        const py = star.y + my * star.depth * 15

        ctx.beginPath()
        ctx.arc(px, py, star.size * (0.7 + twinkle * 0.3), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200, 210, 255, ${opacity})`
        ctx.fill()

        // Rare bright stars get a glow
        if (star.size > 1.2 && twinkle > 0.8) {
          ctx.beginPath()
          ctx.arc(px, py, star.size * 3, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(100, 150, 255, ${opacity * 0.1})`
          ctx.fill()
        }
      }

      animFrameRef.current = requestAnimationFrame(animate)
    }

    animate()
    window.addEventListener('resize', resize)
    canvas.addEventListener('mousemove', handleMouse)

    return () => {
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', handleMouse)
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [starCount])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-auto ${className}`}
    />
  )
}
