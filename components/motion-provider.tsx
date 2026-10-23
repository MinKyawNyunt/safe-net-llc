'use client'

import { useEffect } from 'react'

/**
 * Coordinates the intro sequence with on-scroll reveals.
 * Content is only hidden once `is-ready` is on <html>, so the page remains
 * fully readable if JavaScript never runs.
 */
export function MotionProvider() {
  useEffect(() => {
    let observer: IntersectionObserver | null = null
    let started = false

    const observe = () => {
      const targets = document.querySelectorAll<HTMLElement>('[data-reveal], [data-reveal-lines]')
      if (!('IntersectionObserver' in window)) {
        targets.forEach((el) => el.classList.add('is-in'))
        return
      }

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-in')
              observer?.unobserve(entry.target)
            }
          }
        },
        { threshold: 0.08, rootMargin: '0px 0px -6% 0px' },
      )

      targets.forEach((el) => observer?.observe(el))
    }

    const start = () => {
      if (started) return
      started = true
      document.documentElement.classList.add('is-ready')
      // Let the hidden state paint before the observer reveals in-view items.
      requestAnimationFrame(() => requestAnimationFrame(observe))
    }

    if (document.documentElement.classList.contains('intro-complete')) {
      start()
    } else {
      window.addEventListener('sn:intro-complete', start, { once: true })
      // Safety net in case the preloader is interrupted.
      const fallback = window.setTimeout(start, 4500)
      return () => {
        window.clearTimeout(fallback)
        window.removeEventListener('sn:intro-complete', start)
        observer?.disconnect()
      }
    }

    return () => observer?.disconnect()
  }, [])

  return null
}
