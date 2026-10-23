'use client'

import { useEffect, useRef } from 'react'

type Vec3 = { x: number; y: number; z: number; seed: number; bright: boolean }

type Edge = { a: number; b: number; pulse: number }

type Orbit = { points: Vec3[]; dashed: boolean; tint: 'blue' | 'mint' }

type Projected = { sx: number; sy: number; depth: number; near: boolean }

function fibonacciSphere(count: number): Vec3[] {
  const points: Vec3[] = []
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const radius = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = golden * i
    points.push({
      x: Math.cos(theta) * radius,
      y,
      z: Math.sin(theta) * radius,
      seed: (Math.sin(i * 12.9898) * 43758.5453) % 1,
      bright: i % 17 === 0,
    })
  }
  return points
}

function ring(count: number, radius: number, tiltX: number, tiltZ: number): Vec3[] {
  const out: Vec3[] = []
  const cz = Math.cos(tiltZ)
  const sz = Math.sin(tiltZ)
  const cx = Math.cos(tiltX)
  const sx = Math.sin(tiltX)
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2
    const x = Math.cos(a) * radius
    const y = 0
    const z = Math.sin(a) * radius
    const x1 = x * cz - y * sz
    const y1 = x * sz + y * cz
    const y2 = y1 * cx - z * sx
    const z2 = y1 * sx + z * cx
    out.push({ x: x1, y: y2, z: z2, seed: (i / count) % 1, bright: i % 24 === 0 })
  }
  return out
}

function buildEdges(nodes: Vec3[]): Edge[] {
  const edges: Edge[] = []
  const seen = new Set<string>()
  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i]
    const nearest: { index: number; distance: number }[] = []
    for (let j = 0; j < nodes.length; j++) {
      if (i === j) continue
      const dx = a.x - nodes[j].x
      const dy = a.y - nodes[j].y
      const dz = a.z - nodes[j].z
      nearest.push({ index: j, distance: dx * dx + dy * dy + dz * dz })
    }
    nearest.sort((m, n) => m.distance - n.distance)
    const links = i % 3 === 0 ? 3 : 2
    for (let k = 0; k < links; k++) {
      const j = nearest[k].index
      const key = i < j ? `${i}-${j}` : `${j}-${i}`
      if (seen.has(key)) continue
      seen.add(key)
      edges.push({ a: i, b: j, pulse: edges.length % 19 === 0 ? 1 : 0 })
    }
  }
  return edges
}

export function HeroVisual() {
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true })
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let lowPerf = document.documentElement.classList.contains('perf-low')
    const lowPower =
      window.matchMedia('(max-width: 767px)').matches ||
      (navigator.hardwareConcurrency || 8) <= 4

    const nodeCount = lowPower ? 96 : 132
    const segments = lowPower ? 68 : 92
    const sphere = fibonacciSphere(nodeCount)
    const orbits: Orbit[] = [
      { points: ring(segments, 1.42, 1.15, 0.18), dashed: false, tint: 'blue' },
      { points: ring(segments, 1.22, 0.35, 1.1), dashed: true, tint: 'mint' },
    ]
    if (!lowPower) {
      orbits.push({ points: ring(segments, 1.7, 1.5, -0.35), dashed: true, tint: 'blue' })
    }
    const edges = buildEdges(sphere)
    const pulseEdges = edges.filter((edge) => edge.pulse === 1).slice(0, lowPower ? 4 : 6)
    const frameInterval = 1000 / (lowPower ? 24 : 30)

    const makeGlow = (mid: string) => {
      const sprite = document.createElement('canvas')
      sprite.width = 48
      sprite.height = 48
      const sctx = sprite.getContext('2d')
      if (sctx) {
        const gradient = sctx.createRadialGradient(24, 24, 0, 24, 24, 24)
        gradient.addColorStop(0, 'rgba(255,255,255,0.98)')
        gradient.addColorStop(0.18, mid)
        gradient.addColorStop(0.55, 'rgba(60,140,230,0.12)')
        gradient.addColorStop(1, 'rgba(0,0,0,0)')
        sctx.fillStyle = gradient
        sctx.fillRect(0, 0, 48, 48)
      }
      return sprite
    }

    const blueGlow = makeGlow('rgba(96,183,255,0.9)')
    const mintGlow = makeGlow('rgba(120,240,205,0.9)')

    let width = 0
    let height = 0
    let dpr = 1
    let raf = 0
    let start = 0
    let lastDraw = 0
    let lastRect = 0
    let inView = true
    let running = true
    let mx = 0
    let my = 0
    let tmx = 0
    let tmy = 0
    let pointerClientX = -10000
    let pointerClientY = -10000
    let rectBox = { left: 0, top: 0, width: 1, height: 1 }

    const resize = () => {
      const rect = wrap.getBoundingClientRect()
      width = Math.max(1, rect.width)
      height = Math.max(1, rect.height)
      rectBox = { left: rect.left, top: rect.top, width, height }
      dpr = Math.min(window.devicePixelRatio || 1, lowPower ? 0.9 : 1.0)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (reduce || lowPerf) draw(performance.now())
    }

    const pointerMove = (event: PointerEvent) => {
      pointerClientX = event.clientX
      pointerClientY = event.clientY
      tmx = (event.clientX / window.innerWidth) * 2 - 1
      tmy = (event.clientY / window.innerHeight) * 2 - 1
    }

    const draw = (now: number) => {
      if (!running || !inView || document.hidden) return
      if (!reduce && !lowPerf) raf = window.requestAnimationFrame(draw)

      // 30–45fps is plenty for a slowly rotating background object and leaves
      // the main thread available for scrolling and the custom cursor.
      if (now - lastDraw < frameInterval - 2) return
      lastDraw = now
      if (!start) start = now
      const time = (now - start) / 1000

      if (!reduce) {
        mx += (tmx - mx) * 0.055
        my += (tmy - my) * 0.055
      }

      // Refresh the pointer box a few times per second rather than on every
      // pointer event, avoiding forced layout on mousemove.
      if (now - lastRect > 120) {
        const rect = wrap.getBoundingClientRect()
        rectBox = { left: rect.left, top: rect.top, width: rect.width, height: rect.height }
        lastRect = now
      }
      const rawX = (pointerClientX - rectBox.left) / rectBox.width
      const rawY = (pointerClientY - rectBox.top) / rectBox.height
      const cursorActive = rawX >= -0.2 && rawX <= 1.2 && rawY >= -0.2 && rawY <= 1.2
      const cursorX = rawX * width
      const cursorY = rawY * height

      const scrollOffset = reduce ? 0 : window.scrollY * 0.00045
      const rotY = (reduce ? 0.5 : time * 0.13) + mx * 0.7 + scrollOffset
      const rotX = -0.22 + my * 0.38
      const cosY = Math.cos(rotY)
      const sinY = Math.sin(rotY)
      const cosX = Math.cos(rotX)
      const sinX = Math.sin(rotX)

      ctx.clearRect(0, 0, width, height)
      ctx.globalCompositeOperation = 'lighter'

      const cx = width * 0.5
      const cy = height * 0.5
      const zoom = Math.min(width, height) * 0.33
      const camZ = 2.85

      const project = (node: Vec3): Projected => {
        const x1 = node.x * cosY - node.z * sinY
        const z1 = node.x * sinY + node.z * cosY
        const y1 = node.y * cosX - z1 * sinX
        const z2 = node.y * sinX + z1 * cosX
        const persp = camZ / (camZ - z2)
        let sx = cx + x1 * zoom * persp
        let sy = cy + y1 * zoom * persp
        let near = false
        if (cursorActive) {
          const dx = sx - cursorX
          const dy = sy - cursorY
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 150 && dist > 0.001) {
            const force = (1 - dist / 150) * 16
            sx += (dx / dist) * force
            sy += (dy / dist) * force
            near = true
          }
        }
        return { sx, sy, depth: (z2 + 1) / 2, near }
      }

      const projected = sphere.map(project)

      // Central core.
      const pulse = reduce ? 0.6 : 0.55 + Math.sin(time * 1.1) * 0.08
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, zoom * 1.15)
      core.addColorStop(0, `rgba(70,140,230,${0.16 * pulse})`)
      core.addColorStop(0.35, `rgba(35,90,170,${0.09 * pulse})`)
      core.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = core
      ctx.beginPath()
      ctx.arc(cx, cy, zoom * 1.15, 0, Math.PI * 2)
      ctx.fill()

      // Orbit rings: one path per ring instead of one stroke per segment.
      for (const orbit of orbits) {
        const pts = orbit.points.map(project)
        ctx.beginPath()
        pts.forEach((p, i) => {
          if (i === 0) ctx.moveTo(p.sx, p.sy)
          else ctx.lineTo(p.sx, p.sy)
        })
        ctx.closePath()
        ctx.setLineDash(orbit.dashed ? [2, 7] : [])
        ctx.strokeStyle =
          orbit.tint === 'mint' ? 'rgba(120,240,205,0.13)' : 'rgba(120,190,255,0.11)'
        ctx.lineWidth = 0.7
        ctx.stroke()
        ctx.setLineDash([])

        const step = Math.max(1, Math.ceil(pts.length / 2))
        for (let i = 0; i < pts.length; i += step) {
          const p = pts[i]
          const size = 5 + p.depth * 8
          ctx.globalAlpha = 0.35 + p.depth * 0.45
          ctx.drawImage(blueGlow, p.sx - size / 2, p.sy - size / 2, size, size)
        }
        ctx.globalAlpha = 1
      }

      // Edges: batch everything into two strokes.
      ctx.beginPath()
      const nearEdges: { a: Projected; b: Projected }[] = []
      for (const edge of edges) {
        const a = projected[edge.a]
        const b = projected[edge.b]
        if (cursorActive) {
          const mxp = (a.sx + b.sx) * 0.5 - cursorX
          const myp = (a.sy + b.sy) * 0.5 - cursorY
          if (mxp * mxp + myp * myp < 170 * 170) {
            nearEdges.push({ a, b })
            continue
          }
        }
        ctx.moveTo(a.sx, a.sy)
        ctx.lineTo(b.sx, b.sy)
      }
      ctx.strokeStyle = 'rgba(110,180,250,0.1)'
      ctx.lineWidth = 0.7
      ctx.stroke()

      if (nearEdges.length) {
        ctx.beginPath()
        for (const edge of nearEdges) {
          ctx.moveTo(edge.a.sx, edge.a.sy)
          ctx.lineTo(edge.b.sx, edge.b.sy)
        }
        ctx.strokeStyle = 'rgba(120,240,205,0.4)'
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // Node highlights are sprites; the rest are batched tiny dots.
      ctx.beginPath()
      sphere.forEach((node, i) => {
        const p = projected[i]
        if (node.bright) {
          const size = 12 + p.depth * 8
          ctx.globalAlpha = Math.min(1, 0.45 + p.depth * 0.5)
          ctx.drawImage(mintGlow, p.sx - size / 2, p.sy - size / 2, size, size)
          ctx.moveTo(p.sx + 1.1, p.sy)
          ctx.arc(p.sx, p.sy, 1.1, 0, Math.PI * 2)
        } else {
          ctx.moveTo(p.sx + (p.near ? 1.4 : 0.95), p.sy)
          ctx.arc(p.sx, p.sy, p.near ? 1.4 : 0.95, 0, Math.PI * 2)
        }
      })
      ctx.globalAlpha = 1
      ctx.fillStyle = 'rgba(220,242,255,0.85)'
      ctx.fill()

      // A small number of travelling signals.
      if (!reduce) {
        for (let i = 0; i < pulseEdges.length; i++) {
          const edge = pulseEdges[i]
          const a = projected[edge.a]
          const b = projected[edge.b]
          const phase = (time * 0.2 + i * 0.17) % 1
          const x = a.sx + (b.sx - a.sx) * phase
          const y = a.sy + (b.sy - a.sy) * phase
          const size = 10 + a.depth * 12
          ctx.globalAlpha = Math.sin(phase * Math.PI) * 0.85
          ctx.drawImage(mintGlow, x - size / 2, y - size / 2, size, size)
        }
        ctx.globalAlpha = 1
      }

      ctx.globalCompositeOperation = 'source-over'
    }

    const onVisibility = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(raf)
        raf = 0
      } else if (!reduce && inView) {
        lastDraw = 0
        raf = window.requestAnimationFrame(draw)
      }
    }

    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0].isIntersecting
        if (inView && !reduce && !lowPerf) {
          lastDraw = 0
          window.cancelAnimationFrame(raf)
          raf = window.requestAnimationFrame(draw)
        } else if (inView && (reduce || lowPerf)) {
          raf = 0
          draw(performance.now())
        } else if (!inView) {
          window.cancelAnimationFrame(raf)
          raf = 0
        }
      },
      { threshold: 0 },
    )

    const ro = new ResizeObserver(() => {
      resize()
    })
    ro.observe(wrap)
    io.observe(wrap)

    resize()
    const onLowPerf = () => {
      lowPerf = true
      window.cancelAnimationFrame(raf)
      raf = 0
      draw(performance.now())
    }

    window.addEventListener('pointermove', pointerMove, { passive: true })
    window.addEventListener('sn:perf-low', onLowPerf)
    document.addEventListener('visibilitychange', onVisibility)
    if (reduce) {
      draw(performance.now())
    } else {
      raf = window.requestAnimationFrame(draw)
    }

    return () => {
      running = false
      window.cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', pointerMove)
      window.removeEventListener('sn:perf-low', onLowPerf)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <div ref={wrapRef} className="hero-visual-wrap">
      <svg viewBox="0 0 600 600" className="absolute inset-0 size-full opacity-45" aria-hidden="true">
        <defs>
          <path
            id="heroOrbitText"
            d="M300,300 m-268,0 a268,268 0 1,1 536,0 a268,268 0 1,1 -536,0"
          />
        </defs>
        <g>
          <text
            fill="rgba(165,198,235,0.34)"
            fontSize="9.5"
            letterSpacing="7.2"
            fontFamily="var(--font-mono)"
          >
            <textPath href="#heroOrbitText" startOffset="0%">
              SAFE NET LLC · SYSTEMS ENGINEERING · SIGNAL INTEGRITY · ZERO FRICTION ·
            </textPath>
          </text>
        </g>
      </svg>

      <div className="absolute inset-[9%] rounded-full border border-white/[0.055]" />
      <div className="absolute inset-[22%] rounded-full border border-dashed border-white/[0.05]" />

      <canvas ref={canvasRef} className="relative z-[1] size-full" aria-hidden="true" />
    </div>
  )
}
