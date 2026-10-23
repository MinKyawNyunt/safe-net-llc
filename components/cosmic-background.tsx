'use client'

import { useEffect, useRef } from 'react'

const VERTEX_SHADER = `
precision mediump float;

attribute vec3 aPos;
attribute float aSeed;

uniform float uTime;
uniform float uScroll;
uniform vec2 uRes;
uniform vec2 uMouse;

varying float vAlpha;
varying float vSeed;

void main() {
  // Each star lives in a 44-unit deep tunnel. Scrolling pushes the whole
  // field toward the camera; the modulo recycles stars at the far end.
  float depth = mod(aPos.z * 44.0 - uScroll - uTime * 0.32, 44.0) + 0.65;
  float persp = 1.0 / depth;

  // A slow lateral drift keeps the field alive when the page is idle.
  vec2 drift = vec2(
    sin(uTime * 0.13 + aSeed * 6.2831),
    cos(uTime * 0.11 + aSeed * 4.7124)
  ) * 0.012;

  vec2 position = vec2(aPos.x * 1.9, aPos.y * 1.32) + drift;
  position *= persp * 2.0;

  // Camera-style parallax: near stars travel further than distant ones, and
  // everything shifts opposite the pointer so the field feels like space.
  position -= uMouse * (0.032 + persp * 0.085);

  gl_Position = vec4(position, 0.0, 1.0);

  float minDim = min(uRes.x, uRes.y);
  gl_PointSize = clamp(2.0 * persp * minDim * 0.0065, 1.0, 10.0);
  gl_PointSize *= 0.55 + aSeed * 0.75;

  vAlpha = smoothstep(0.65, 5.0, depth) * (1.0 - smoothstep(26.0, 44.0, depth));
  vAlpha *= (0.36 + aSeed * 0.64) * (0.78 + 0.22 * sin(uTime * 1.7 + aSeed * 43.0));
  vSeed = aSeed;
}
`

const FRAGMENT_SHADER = `
precision mediump float;

varying float vAlpha;
varying float vSeed;

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  float core = smoothstep(0.5, 0.0, d);
  float alpha = pow(core, 1.7) * vAlpha;

  vec3 blue = vec3(0.52, 0.76, 1.0);
  vec3 white = vec3(0.88, 0.95, 1.0);
  vec3 mint = vec3(0.47, 0.94, 0.81);

  vec3 color = mix(blue, white, smoothstep(0.6, 1.0, vSeed));
  color = mix(color, mint, step(0.94, vSeed) * 0.8);

  gl_FragColor = vec4(color, alpha * 0.9);
}
`

const MAX_STARS = 520
const SCROLL_DEPTH = 0.022

type Quality = {
  count: number
  frameInterval: number
  dpr: number
}

function measureQuality(lowPower: boolean, lowPerf: boolean): Quality {
  if (lowPerf) {
    return { count: 170, frameInterval: 1000 / 20, dpr: 1 }
  }
  if (lowPower) {
    return { count: 300, frameInterval: 1000 / 24, dpr: 1 }
  }
  return { count: 480, frameInterval: 1000 / 30, dpr: 1.1 }
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const compactQuery = window.matchMedia('(max-width: 767px)')
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    // Viewport only: navigator.hardwareConcurrency is farbled by browsers with
    // fingerprinting protection (Brave Shields), so it cannot describe the
    // device and previously downgraded capable machines.
    const lowPower = compactQuery.matches
    let lowPerf = document.documentElement.classList.contains('perf-low')
    let reduceMotion = motionQuery.matches
    let quality = measureQuality(lowPower, lowPerf)

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      premultipliedAlpha: true,
      desynchronized: true,
      powerPreference: 'default',
    })

    if (!gl) {
      canvas.style.display = 'none'
      return
    }

    const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
    const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
    if (!vertex || !fragment) return

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vertex)
    gl.attachShader(program, fragment)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program))
      return
    }
    gl.useProgram(program)

    const positions = new Float32Array(MAX_STARS * 4)
    for (let i = 0; i < MAX_STARS; i++) {
      positions[i * 4] = Math.random() * 2 - 1
      positions[i * 4 + 1] = Math.random() * 2 - 1
      positions[i * 4 + 2] = Math.random()
      positions[i * 4 + 3] = Math.random()
    }

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

    const aPos = gl.getAttribLocation(program, 'aPos')
    const aSeed = gl.getAttribLocation(program, 'aSeed')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 16, 0)
    gl.enableVertexAttribArray(aSeed)
    gl.vertexAttribPointer(aSeed, 1, gl.FLOAT, false, 16, 12)

    const uTime = gl.getUniformLocation(program, 'uTime')
    const uScroll = gl.getUniformLocation(program, 'uScroll')
    const uRes = gl.getUniformLocation(program, 'uRes')
    const uMouse = gl.getUniformLocation(program, 'uMouse')

    gl.clearColor(0, 0, 0, 0)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE)

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 }
    let width = window.innerWidth
    let height = window.innerHeight
    let scrollPos = window.scrollY
    let elapsed = 0
    let raf = 0
    let last = 0
    let lastDraw = 0
    let wakeUntil = 0

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.max(1, Math.round(width * quality.dpr))
      canvas.height = Math.max(1, Math.round(height * quality.dpr))
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    const draw = (now: number) => {
      const delta = last ? Math.min((now - last) / 1000, 0.1) : 0
      last = now

      if (!reduceMotion) {
        elapsed += delta

        // Ease scroll and pointer so fast wheel flicks read as smooth flight
        // instead of a jittery jump, then snap once the difference is tiny.
        const target = window.scrollY
        scrollPos += (target - scrollPos) * (1 - Math.exp(-delta * 14))
        if (Math.abs(target - scrollPos) < 0.4) scrollPos = target

        const pointerEase = 1 - Math.exp(-delta * 5)
        pointer.x += (pointer.tx - pointer.x) * pointerEase
        pointer.y += (pointer.ty - pointer.y) * pointerEase
      }

      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform1f(uTime, reduceMotion ? 0 : elapsed)
      gl.uniform1f(uScroll, reduceMotion ? 0 : scrollPos * SCROLL_DEPTH)
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform2f(uMouse, reduceMotion ? 0 : pointer.x, reduceMotion ? 0 : pointer.y)
      gl.drawArrays(gl.POINTS, 0, quality.count)
    }

    const frame = (now: number) => {
      raf = 0
      if (document.hidden) return

      // Render at a fixed budget instead of every display refresh. The cap
      // keeps the starfield cheap while leaving headroom for scrolling.
      if (now - lastDraw < quality.frameInterval - 2) {
        raf = window.requestAnimationFrame(frame)
        return
      }
      lastDraw = now
      draw(now)

      // Normally the field animates continuously. On devices flagged as
      // low-performance it only wakes for interactions, then goes idle.
      const keepGoing = !reduceMotion && (!lowPerf || now < wakeUntil)
      if (keepGoing) raf = window.requestAnimationFrame(frame)
      else last = 0
    }

    const wake = (ms = 1600) => {
      if (reduceMotion || document.hidden) return
      wakeUntil = performance.now() + ms
      if (!raf) {
        last = 0
        lastDraw = 0
        raf = window.requestAnimationFrame(frame)
      }
    }

    const pause = () => {
      window.cancelAnimationFrame(raf)
      raf = 0
      last = 0
      lastDraw = 0
    }

    const onScroll = () => {
      if (lowPerf) wake(1400)
    }

    const onPointer = (event: PointerEvent) => {
      pointer.tx = (event.clientX / width) * 2 - 1
      pointer.ty = (event.clientY / height) * 2 - 1
      if (lowPerf) wake(1400)
    }

    const onPointerLeave = () => {
      pointer.tx = 0
      pointer.ty = 0
      if (lowPerf) wake(1600)
    }

    const onPointerEnd = (event: PointerEvent) => {
      if (event.pointerType !== 'touch') return
      pointer.tx = 0
      pointer.ty = 0
      if (lowPerf) wake(1600)
    }

    const onVisibility = () => {
      if (document.hidden) {
        pause()
        return
      }
      if (reduceMotion) draw(performance.now())
      else wake(1400)
    }

    const onResize = () => {
      resize()
      if (reduceMotion) draw(performance.now())
      else wake(1000)
    }

    const onPerfLow = () => {
      if (lowPerf) return
      lowPerf = true
      quality = measureQuality(lowPower, lowPerf)
      resize()
      wake(1600)
    }

    const onMotionChange = (event: MediaQueryListEvent) => {
      reduceMotion = event.matches
      if (reduceMotion) {
        pause()
        draw(performance.now())
      } else {
        wake(2000)
      }
    }

    resize()
    window.addEventListener('resize', onResize)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('pointermove', onPointer, { passive: true })
    window.addEventListener('pointerleave', onPointerLeave)
    window.addEventListener('pointerup', onPointerEnd, { passive: true })
    window.addEventListener('pointercancel', onPointerEnd, { passive: true })
    window.addEventListener('sn:perf-low', onPerfLow)
    document.addEventListener('visibilitychange', onVisibility)
    motionQuery.addEventListener('change', onMotionChange)

    if (reduceMotion) draw(performance.now())
    else wake(2400)

    return () => {
      pause()
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('pointerleave', onPointerLeave)
      window.removeEventListener('pointerup', onPointerEnd)
      window.removeEventListener('pointercancel', onPointerEnd)
      window.removeEventListener('sn:perf-low', onPerfLow)
      document.removeEventListener('visibilitychange', onVisibility)
      motionQuery.removeEventListener('change', onMotionChange)
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
      gl.deleteShader(vertex)
      gl.deleteShader(fragment)
    }
  }, [])

  return <canvas ref={canvasRef} className="cosmic-stars" aria-hidden="true" />
}

export function CosmicBackground() {
  return (
    <div className="cosmic-bg" aria-hidden="true">
      <div className="bg-cosmic-glow" />
      <div className="aurora aurora-a" />
      <div className="aurora aurora-b" />
      <div className="aurora aurora-c" />
      <div className="bg-grid" />
      <Starfield />
      <div className="vignette" />
    </div>
  )
}
