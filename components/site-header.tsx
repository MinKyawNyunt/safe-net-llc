'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { LogoMark, Wordmark } from '@/components/logo'

const navLinks = [
  { label: 'Work', href: '#work', index: '01' },
  { label: 'Services', href: '#services', index: '02' },
  { label: 'Process', href: '#process', index: '03' },
  { label: 'About', href: '#about', index: '04' },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const barRef = useRef<HTMLDivElement | null>(null)
  const stateRef = useRef(false)

  useEffect(() => {
    let raf = 0
    let maxScroll = 0

    const measure = () => {
      maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
    }

    const update = () => {
      raf = 0
      const y = window.scrollY
      const isScrolled = y > 24
      if (isScrolled !== stateRef.current) {
        stateRef.current = isScrolled
        setScrolled(isScrolled)
      }
      const progress = maxScroll > 0 ? Math.min(Math.max(y / maxScroll, 0), 1) : 0
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`
      }
    }

    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update)
    }

    const onResize = () => {
      measure()
      onScroll()
    }

    // The pinned work section changes document height after hydration.
    const ro = new ResizeObserver(() => {
      measure()
      onScroll()
    })
    ro.observe(document.body)

    // A thin band at the middle of the viewport decides the active nav item.
    const sections = ['work', 'services', 'process', 'about', 'contact']
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    let io: IntersectionObserver | null = null
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id)
            }
          }
        },
        { rootMargin: '-44% 0px -54% 0px', threshold: 0 },
      )
      sections.forEach((section) => io?.observe(section))
    }

    measure()
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.cancelAnimationFrame(raf)
      ro.disconnect()
      io?.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  return (
    <>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="shell header-inner">
          <a href="#top" onClick={() => setOpen(false)} className="group/logo flex items-center gap-2.5" aria-label="Safe Net LLC home">
            <LogoMark className="h-8 w-7 text-electric transition-transform duration-500 group-hover/logo:-rotate-6" />
            <Wordmark className="text-[0.98rem] text-ink" />
          </a>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={activeSection === link.href.slice(1) ? 'true' : undefined}
                className={`group/nav relative flex items-center gap-1.5 text-[0.78rem] font-medium tracking-[0.01em] transition-colors hover:text-ink ${
                  activeSection === link.href.slice(1) ? 'text-ink' : 'text-dim'
                }`}
              >
                <span
                  className={`mono text-[0.48rem] transition-colors group-hover/nav:text-mint/70 ${
                    activeSection === link.href.slice(1) ? 'text-mint/80' : 'text-white/25'
                  }`}
                >
                  {link.index}
                </span>
                <span className="nav-roll">
                  <span>{link.label}</span>
                  <span aria-hidden="true">{link.label}</span>
                </span>
                <span
                  className={`absolute -bottom-2 left-0 h-px bg-gradient-to-r from-electric to-mint transition-all duration-500 ${
                    activeSection === link.href.slice(1) ? 'w-full opacity-100' : 'w-0 opacity-0'
                  }`}
                  aria-hidden="true"
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2.5 pr-2 xl:flex">
              <span className="status-dot" />
              <span className="mono text-[0.55rem] text-white/45">Taking new projects</span>
            </div>
            <div className="hidden sm:block">
              <a href="#contact" className="btn btn-ghost btn-sm">
                Start a project
                <ArrowUpRight className="size-3.5" />
              </a>
            </div>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="relative z-[110] flex size-10 items-center justify-center rounded-full border border-white/14 text-ink transition-colors hover:border-white/30 hover:bg-white/5 lg:hidden"
            >
              {open ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
            </button>
          </div>
        </div>
        <div ref={barRef} className="scroll-progress" />
      </header>

      <div className={`mobile-menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <nav className="flex h-full flex-col overflow-y-auto px-[var(--pad)] pb-32 pt-[calc(var(--header-h)+2rem)]" aria-label="Mobile">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="group flex items-baseline justify-between border-b border-white/10 py-5"
              style={{ '--i': i } as React.CSSProperties}
            >
              <span className="flex items-baseline gap-4">
                <span className="mono text-[0.55rem] text-electric/70">{link.index}</span>
                <span className="display text-[2.5rem] text-ink transition-colors group-hover:text-mint">
                  {link.label}
                </span>
              </span>
              <ArrowUpRight className="size-5 text-white/35 transition-transform duration-500 group-hover:-translate-y-1 group-hover:text-mint" />
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="group mt-8 flex items-center justify-between rounded-2xl border border-white/12 bg-white/[0.03] p-5"
            style={{ '--i': navLinks.length } as React.CSSProperties}
          >
            <span>
              <span className="mono text-[0.52rem] text-white/35">Have a project?</span>
              <span className="mt-1 block text-xl font-medium tracking-[-0.03em]">
                Let&apos;s make it behave.
              </span>
            </span>
            <span className="arrow-circle">
              <ArrowUpRight className="size-4" />
            </span>
          </a>
        </nav>

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-[var(--pad)] pb-8">
          <div className="mono text-[0.52rem] leading-relaxed text-white/35">
            contact@safenet.llc
            <br />
            +1 (307) 434-9898
          </div>
          <span className="mono text-[0.52rem] text-white/25">Sheridan, WY</span>
        </div>
      </div>
    </>
  )
}
