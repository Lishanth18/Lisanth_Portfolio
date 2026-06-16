import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollProgress(sectionRef, options = {}) {
  const progressRef = useRef(0)
  const {
    start = 'top top',
    end = 'bottom bottom',
    onEnter,
    onLeave,
    onEnterBack,
    onLeaveBack,
    scrub = true,
  } = options

  useEffect(() => {
    if (!sectionRef.current) return

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start,
      end,
      scrub: scrub === true ? 0.5 : scrub,
      onUpdate: (self) => {
        progressRef.current = self.progress
      },
      onEnter,
      onLeave,
      onEnterBack,
      onLeaveBack,
    })

    return () => trigger.kill()
  }, [sectionRef, start, end, scrub, onEnter, onLeave, onEnterBack, onLeaveBack])

  return progressRef
}

export function useGsapTimeline(sectionRef, options = {}) {
  const timelineRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: options.start || 'top top',
        end: options.end || 'bottom bottom',
        scrub: options.scrub ?? 1,
        pin: options.pin ?? false,
      },
    })

    timelineRef.current = tl

    return () => {
      tl.kill()
    }
  }, [sectionRef])

  return timelineRef
}
