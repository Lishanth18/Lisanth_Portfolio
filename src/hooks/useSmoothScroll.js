import { useEffect, useRef } from 'react'

export function useSmoothScroll() {
  const lenisRef = useRef(null)

  useEffect(() => {
    // Dynamically import Lenis to avoid SSR issues and catch load failures
    let lenis = null
    let animationId = null

    async function initLenis() {
      try {
        const { default: Lenis } = await import('lenis')
        lenis = new Lenis({
          duration: 1.4,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 0.8,
          touchMultiplier: 1.5,
        })

        lenisRef.current = lenis

        function raf(time) {
          lenis.raf(time)
          animationId = requestAnimationFrame(raf)
        }

        animationId = requestAnimationFrame(raf)
      } catch (e) {
        console.warn('Lenis smooth scroll failed to initialize:', e)
      }
    }

    initLenis()

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
      if (lenis) lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return lenisRef
}
