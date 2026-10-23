'use client'

import { useState } from 'react'
import { ArrowUpRight, Check, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react'

type Fields = { email: string; subject: string; message: string }
type Errors = Partial<Fields>

const endpoints = [
  {
    icon: Mail,
    label: 'Email',
    value: 'contact@safenet.llc',
    href: 'mailto:contact@safenet.llc',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (307) 434-9898',
    href: 'tel:+13074349898',
  },
]

export function Contact() {
  const [fields, setFields] = useState<Fields>({ email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  function validate(): Errors {
    const next: Errors = {}
    if (!fields.email.trim()) {
      next.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      next.email = 'Enter a valid email address.'
    }
    if (!fields.subject.trim()) next.subject = 'A short subject helps us route this.'
    if (!fields.message.trim()) next.message = 'Tell us a little about the project.'
    return next
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const next = validate()
    if (Object.keys(next).length) {
      setErrors(next)
      return
    }
    setErrors({})
    setStatus('loading')
    try {
      const response = await fetch('https://n8n.safenetonlinestore.com/webhook/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      })
      if (!response.ok) throw new Error('Request failed')
      setStatus('success')
      setFields({ email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { id, value } = event.target
    setFields((current) => ({ ...current, [id]: value }))
    if (errors[id as keyof Errors]) {
      setErrors((current) => ({ ...current, [id]: undefined }))
    }
    if (status === 'error') setStatus('idle')
  }

  return (
    <section id="contact" className="section relative overflow-hidden">
      <div className="contact-glow" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(4,6,11,0)_0%,rgba(4,6,11,0.35)_55%,rgba(4,6,11,0.75)_100%)]"
        aria-hidden="true"
      />

      <div className="shell relative z-10">
        <div className="grid gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-20">
          <div>
            <span className="section-kicker mono text-[0.6rem]" data-reveal>
              <span className="section-index">07</span> Start a project
            </span>

            <h2
              className="mt-6 text-[clamp(3.1rem,6.4vw,6.4rem)] font-medium leading-[0.9] tracking-[-0.06em] text-white"
              data-reveal-lines
            >
              <span className="line-mask" style={{ '--d': '0ms' } as React.CSSProperties}>
                <span className="whitespace-nowrap">Let&apos;s make it</span>
              </span>
              <span className="line-mask" style={{ '--d': '100ms' } as React.CSSProperties}>
                <span className="serif text-gradient whitespace-nowrap">behave.</span>
              </span>
            </h2>

            <p
              className="mt-7 max-w-md text-[0.96rem] leading-[1.85] text-dim"
              data-reveal
              style={{ '--reveal-delay': '160ms' } as React.CSSProperties}
            >
              Bring us the messy version: the idea, the spreadsheet, the process nobody
              wants to own. We&apos;ll tell you honestly what it will take.
            </p>

            <div
              className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.025] px-4 py-2.5"
              data-reveal
            >
              <span className="status-dot" />
              <span className="mono text-[0.52rem] text-white/55">
                Taking new projects <span className="text-mint/80">/ Q4 2026</span>
              </span>
            </div>

            <div className="mt-10" data-reveal style={{ '--reveal-delay': '220ms' } as React.CSSProperties}>
              {endpoints.map((endpoint) => (
                <a
                  key={endpoint.label}
                  href={endpoint.href}
                  className="group flex items-center gap-4 border-t border-white/10 py-4"
                >
                  <span className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.025] text-mint transition-colors duration-500 group-hover:border-mint/40">
                    <endpoint.icon className="size-4" />
                  </span>
                  <span className="flex-1">
                    <span className="mono block text-[0.48rem] text-white/30">{endpoint.label}</span>
                    <span className="mt-0.5 block text-[0.88rem] text-white/80 transition-colors group-hover:text-white">
                      {endpoint.value}
                    </span>
                  </span>
                  <ArrowUpRight className="size-4 text-white/25 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:text-mint" />
                </a>
              ))}
              <div className="flex items-start gap-4 border-y border-white/10 py-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.025] text-mint">
                  <MapPin className="size-4" />
                </span>
                <div>
                  <span className="mono block text-[0.48rem] text-white/30">Studio</span>
                  <span className="mt-0.5 block max-w-[19rem] text-[0.85rem] leading-relaxed text-white/75">
                    30 N Gould St, Ste N
                    <br />
                    Sheridan, WY 82801, USA
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4" data-reveal>
              {[
                ['01', 'We reply within one business day'],
                ['02', 'A 30-minute call, no pitch deck'],
                ['03', 'A clear scope and next step'],
              ].map(([num, copy]) => (
                <div key={num} className="flex items-center gap-2.5">
                  <span className="mono text-[0.5rem] text-mint/60">{num}</span>
                  <span className="text-[0.72rem] text-white/45">{copy}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative" data-reveal="scale">
            <div className="form-panel">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mint/50 to-transparent" />

              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="mono text-[0.5rem] tracking-[0.18em] text-white/35">Project inquiry</span>
                  <h3 className="mt-2 text-[1.35rem] font-medium tracking-[-0.03em] text-white">
                    Tell us what you&apos;re building.
                  </h3>
                </div>
                <span className="flex items-center gap-1.5 rounded-full border border-mint/15 bg-mint/[0.04] px-2.5 py-1">
                  <ShieldCheck className="size-3 text-mint/70" />
                  <span className="mono text-[0.42rem] text-mint/60">SECURE</span>
                </span>
              </div>

              {status === 'success' ? (
                <div className="flex min-h-[420px] flex-col items-start justify-center py-10" aria-live="polite">
                  <span className="flex size-14 items-center justify-center rounded-full border border-mint/30 bg-mint/[0.08] text-mint">
                    <Check className="size-6" />
                  </span>
                  <h4 className="mt-6 text-3xl font-medium tracking-[-0.04em] text-white">Signal received.</h4>
                  <p className="mt-3 max-w-sm text-[0.88rem] leading-[1.8] text-dim">
                    Thanks for the context. You&apos;ll hear from a real person within one
                    business day — usually sooner.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="mt-8 link-underline mono text-[0.55rem] text-mint/80"
                  >
                    Send another message →
                  </button>
                </div>
              ) : (
                <form className="mt-8 flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
                  <div className={`field ${errors.email ? 'has-error' : ''}`}>
                    <label htmlFor="email">Your email</label>
                    <input
                      id="email"
                      name="email"
                      suppressHydrationWarning
                      type="email"
                      autoComplete="email"
                      value={fields.email}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="field-error">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className={`field ${errors.subject ? 'has-error' : ''}`}>
                    <label htmlFor="subject">What do you need?</label>
                    <input
                      id="subject"
                      name="subject"
                      suppressHydrationWarning
                      type="text"
                      value={fields.subject}
                      onChange={handleChange}
                      placeholder="New product, platform, AI integration…"
                      aria-invalid={Boolean(errors.subject)}
                      aria-describedby={errors.subject ? 'subject-error' : undefined}
                    />
                    {errors.subject && (
                      <p id="subject-error" className="field-error">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div className={`field ${errors.message ? 'has-error' : ''}`}>
                    <label htmlFor="message">The short version</label>
                    <textarea
                      id="message"
                      name="message"
                      suppressHydrationWarning
                      rows={5}
                      value={fields.message}
                      onChange={handleChange}
                      placeholder="Where is the friction? What have you tried? What does a win look like?"
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                    {errors.message && (
                      <p id="message-error" className="field-error">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div aria-live="polite">
                    {status === 'error' && (
                      <p className="text-[0.78rem] text-[#ff8a9b]">
                        That didn&apos;t go through. Try again, or email{' '}
                        <a href="mailto:contact@safenet.llc" className="underline underline-offset-2">
                          contact@safenet.llc
                        </a>
                        .
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn btn-primary mt-1 h-12 w-full disabled:cursor-wait disabled:opacity-70"
                  >
                    {status === 'loading' ? (
                      <>
                        Sending
                        <span className="size-3.5 animate-spin rounded-full border border-black/25 border-t-black" />
                      </>
                    ) : (
                      <>
                        Send the brief
                        <ArrowUpRight className="size-4" />
                      </>
                    )}
                  </button>

                  <p className="mono text-[0.47rem] leading-relaxed text-white/25">
                    No newsletters. No spam. Just a reply from a human.
                  </p>
                </form>
              )}
            </div>

            <div className="mt-5 flex items-center justify-between px-2">
              <span className="mono text-[0.48rem] text-white/25">AVG. RESPONSE / 4H</span>
              <span className="flex items-center gap-2">
                <span className="size-1 rounded-full bg-mint" />
                <span className="mono text-[0.48rem] text-white/25">ENCRYPTED IN TRANSIT</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
