'use client'

import { useEffect } from 'react'

/**
 * Measures real frame cadence once the intro is over. If the device cannot
 * sustain a comfortable frame rate, we switch the decorative layers to a
 * static, low-cost mode. Capable machines keep the full experience.
 */
export function PerformanceGovernor() {
  useEffect(() => {
    let timer = 0
    let fallback = 0
    let raf = 0
    let measured = false

    // Applied after the frame sample decides the device is struggling.
    const applyLow = () => {
      document.documentElement.classList.add('perf-low')
      window.dispatchEvent(new Event('sn:perf-low'))
    }

    const enableLow = () => {
      if (measured) return
      measured = true
      applyLow()
    }

    const nav = navigator as Navigator & {
      deviceMemory?: number
      connection?: { saveData?: boolean }
    }
    if (
      nav.connection?.saveData ||
      (navigator.hardwareConcurrency || 8) <= 4 ||
      (nav.deviceMemory !== undefined && nav.deviceMemory <= 4)
    ) {
      enableLow()
      return
    }

    const evaluate = () => {
      if (measured) return
      if (document.hidden) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      measured = true

      let frames = 0
      let start = 0
      const tick = (now: number) => {
        if (!start) start = now
        frames++
        if (now - start < 1200) {
          raf = window.requestAnimationFrame(tick)
          return
        }
        const fps = frames / ((now - start) / 1000)
        if (fps < 45) applyLow()
      }
      raf = window.requestAnimationFrame(tick)
    }

    const schedule = () => {
      window.clearTimeout(fallback)
      window.clearTimeout(timer)
      timer = window.setTimeout(evaluate, 1500)
    }

    const onIntro = () => schedule()

    window.addEventListener('sn:intro-complete', onIntro, { once: true })
    if (document.documentElement.classList.contains('intro-complete')) {
      // The intro may have completed before this effect mounted.
      schedule()
    } else {
      // Guard against an interrupted intro.
      fallback = window.setTimeout(evaluate, 5000)
    }

    return () => {
      window.clearTimeout(timer)
      window.clearTimeout(fallback)
      window.cancelAnimationFrame(raf)
      window.removeEventListener('sn:intro-complete', onIntro)
    }
  }, [])

  return null
}
