'use client'

import { useEffect, useRef } from 'react'

export function Cursor() {
  const layerRef = useRef<HTMLDivElement | null>(null)
  const dotRef = useRef<HTMLDivElement | null>(null)
  const ringRef = useRef<HTMLDivElement | null>(null)
  const labelRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const finePointer =
      window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(hover: none)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!finePointer) return

    const layer = layerRef.current
    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current
    if (!layer || !dot || !ring || !label) return

    document.documentElement.classList.add('cursor-ready')
    layer.style.opacity = '0'

    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let ringX = targetX
    let ringY = targetY
    let dotX = targetX
    let dotY = targetY
    let raf = 0
    let running = false
    let visible = false
    let activeEl: Element | null = null
    let lastTarget: EventTarget | null = null

    const place = (el: HTMLElement, x: number, y: number) => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
    }

    const setInteractive = (el: Element | null) => {
      const interactive =
        el instanceof Element
          ? el.closest<HTMLElement>('a, button, [data-cursor], input, textarea, select, label')
          : null
      if (interactive === activeEl) {
        if (interactive) {
          const text = interactive.getAttribute('data-cursor') || ''
          if (label.textContent !== text) {
            label.textContent = text
            ring.classList.toggle('is-label', Boolean(text))
          }
        }
        return
      }
      activeEl = interactive
      const isField = Boolean(interactive?.matches('input, textarea, select, label'))
      ring.classList.toggle('is-active', Boolean(interactive) && !isField)
      ring.classList.toggle(
        'is-label',
        Boolean(interactive) && !isField && Boolean(interactive?.getAttribute('data-cursor')),
      )
      label.textContent = interactive?.getAttribute('data-cursor') || ''
    }

    const loop = () => {
      running = false
      dotX += (targetX - dotX) * 0.55
      dotY += (targetY - dotY) * 0.55
      ringX += (targetX - ringX) * 0.16
      ringY += (targetY - ringY) * 0.16

      const settled =
        Math.abs(targetX - dotX) < 0.1 &&
        Math.abs(targetY - dotY) < 0.1 &&
        Math.abs(targetX - ringX) < 0.2 &&
        Math.abs(targetY - ringY) < 0.2

      if (settled) {
        dotX = targetX
        dotY = targetY
        ringX = targetX
        ringY = targetY
      }

      place(dot, dotX, dotY)
      place(ring, ringX, ringY)

      // Stop scheduling frames once the ring has caught up. This keeps the
      // page idle when the mouse isn't moving.
      if (!settled) {
        running = true
        raf = window.requestAnimationFrame(loop)
      }
    }

    const start = () => {
      if (running || reduce) return
      running = true
      raf = window.requestAnimationFrame(loop)
    }

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX
      targetY = event.clientY
      if (!visible) {
        visible = true
        layer.style.opacity = '1'
      }
      if (event.target !== lastTarget) {
        lastTarget = event.target
        setInteractive(event.target instanceof Element ? event.target : null)
      }
      if (reduce) {
        dotX = ringX = targetX
        dotY = ringY = targetY
        place(dot, dotX, dotY)
        place(ring, ringX, ringY)
      } else {
        start()
      }
    }

    const onLeave = () => {
      visible = false
      layer.style.opacity = '0'
      running = false
      window.cancelAnimationFrame(raf)
    }

    const onDown = () => ring.classList.add('is-down')
    const onUp = () => ring.classList.remove('is-down')

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    document.addEventListener('mouseleave', onLeave)
    window.addEventListener('blur', onLeave)

    return () => {
      window.cancelAnimationFrame(raf)
      document.documentElement.classList.remove('cursor-ready')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('blur', onLeave)
    }
  }, [])

  return (
    <div ref={layerRef} className="cursor-layer" aria-hidden="true">
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring">
        <span ref={labelRef} className="cursor-label" />
      </div>
    </div>
  )
}
