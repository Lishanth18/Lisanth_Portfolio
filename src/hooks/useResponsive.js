import { useState, useEffect } from 'react'

const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1440,
}

export function useResponsive() {
  const [device, setDevice] = useState('desktop')
  const [quality, setQuality] = useState('high')

  useEffect(() => {
    function handleResize() {
      const w = window.innerWidth
      if (w < BREAKPOINTS.mobile) {
        setDevice('mobile')
        setQuality('low')
      } else if (w < BREAKPOINTS.tablet) {
        setDevice('tablet')
        setQuality('medium')
      } else {
        setDevice('desktop')
        setQuality('high')
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return { device, quality, isMobile: device === 'mobile', isTablet: device === 'tablet', isDesktop: device === 'desktop' }
}
