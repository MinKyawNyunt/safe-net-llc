'use client'

import { useEffect } from 'react'

/**
 * Measures real frame cadence once the intro is over. If the device cannot
 * sustain a comfortable frame rate, the decorative layers switch to a cheaper
 * mode.
 *
 * Only measured cadence is trusted here. `navigator.deviceMemory` and
 * `navigator.hardwareConcurrency` are deliberately ignored: browsers with
 * fingerprinting protection (Brave Shields) report farbled values — a machine
 * with 8 cores and 8 GB reports 6 cores and 4 GB — which made capable devices
 * look weak and froze every animation on the page, hero globe included.
 */

const MIN_FPS = 42
const SAMPLE_MS = 1400

export function PerformanceGovernor() {
  useEffect(() => {
    let timer = 0
    let fallback = 0
    let raf = 0
    let cancelled = false

    // Applied only after measured frames decide the device is struggling.
    const applyLow = () => {
      document.documentElement.classList.add('perf-low')
      window.dispatchEvent(new Event('sn:perf-low'))
    }

    const nav = navigator as Navigator & { connection?: { saveData?: boolean } }
    if (nav.connection?.saveData) {
      applyLow()
      return
    }

    const sample = () =>
      new Promise<number | null>((resolve) => {
        let frames = 0
        let start = 0
        let prev = 0
        let throttled = false
        const tick = (now: number) => {
          if (cancelled) {
            resolve(null)
            return
          }
          if (!start) {
            start = now
            prev = now
          }
          if (now - prev > 200) throttled = true
          prev = now
          frames++
          if (now - start < SAMPLE_MS) {
            raf = window.requestAnimationFrame(tick)
            return
          }
          // A hidden or occluded window gets its frames throttled, which says
          // nothing about the hardware. Treat such a sample as unusable.
          if (document.hidden || throttled) resolve(null)
          else resolve(frames / ((now - start) / 1000))
        }
        raf = window.requestAnimationFrame(tick)
      })

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timer = window.setTimeout(resolve, ms)
      })

    const evaluate = async () => {
      if (cancelled) return
      if (document.hidden) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      let fps = await sample()
      if (fps === null) {
        await wait(900)
        fps = await sample()
      }
      if (fps === null || fps >= MIN_FPS) return

      // Confirm before downgrading: one bad burst (scroll storm, intro exit,
      // background tab hitching) must not freeze the site for the session.
      await wait(600)
      const confirm = await sample()
      if (cancelled || confirm === null || confirm >= MIN_FPS) return
      applyLow()
    }

    const schedule = () => {
      window.clearTimeout(fallback)
      window.clearTimeout(timer)
      timer = window.setTimeout(evaluate, 1400)
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
      cancelled = true
      window.clearTimeout(timer)
      window.clearTimeout(fallback)
      window.cancelAnimationFrame(raf)
      window.removeEventListener('sn:intro-complete', onIntro)
    }
  }, [])

  return null
}
