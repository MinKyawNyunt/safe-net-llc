"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

type FormFields = {
  email: string
  subject: string
  message: string
}

type FormErrors = Partial<FormFields>

export function ContactCTA() {
  const [fields, setFields] = useState<FormFields>({ email: "", subject: "", message: "" })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  function validate(): FormErrors {
    const errs: FormErrors = {}
    if (!fields.email.trim()) {
      errs.email = "Email is required."
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      errs.email = "Enter a valid email address."
    }
    if (!fields.subject.trim()) errs.subject = "Subject is required."
    if (!fields.message.trim()) errs.message = "Message is required."
    return errs
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})
    setStatus("loading")
    try {
      const res = await fetch("https://n8n.safenetonlinestore.com/webhook/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      })
      if (!res.ok) throw new Error("Request failed")
      setStatus("success")
      setFields({ email: "", subject: "", message: "" })
    } catch {
      setStatus("error")
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { id, value } = e.target
    setFields((prev) => ({ ...prev, [id]: value }))
    if (errors[id as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [id]: undefined }))
    }
  }

  return (
    <section id="contact" className="border-t border-border bg-muted/40 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 rounded-3xl border border-border bg-card p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
          <div id="about">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Let&apos;s build something that works
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              Tell us about your operations and the problems you&apos;re trying to
              solve. We&apos;ll get back to you within one business day with a clear
              next step.
            </p>

            <div className="mt-8 flex flex-col gap-4">
              <a href="mailto:contact@safenet.llc" className="flex items-center gap-3 text-foreground">
                <span className="flex size-10 items-center justify-center rounded-lg bg-accent text-primary">
                  <Mail className="size-5" />
                </span>
                <span className="text-sm font-medium">contact@safenet.llc</span>
              </a>
              <a href="tel:+13074349898" className="flex items-center gap-3 text-foreground">
                <span className="flex size-10 items-center justify-center rounded-lg bg-accent text-primary">
                  <Phone className="size-5" />
                </span>
                <span className="text-sm font-medium">+1 (307) 434-9898</span>
              </a>
              <div className="flex items-center gap-3 text-foreground">
                <span className="flex size-10 items-center justify-center rounded-lg bg-accent text-primary">
                  <MapPin className="size-5" />
                </span>
                <span className="text-sm font-medium">30 N Gould St Ste N Sheridan, WY, 82801, USA</span>
              </div>
            </div>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={fields.email}
                onChange={handleChange}
                placeholder="jane@acme.com"
                className={`h-10 rounded-lg border bg-background px-3 text-sm text-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/30 ${errors.email ? "border-destructive" : "border-input"}`}
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="subject" className="text-sm font-medium text-foreground">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                value={fields.subject}
                onChange={handleChange}
                placeholder="How can we help?"
                className={`h-10 rounded-lg border bg-background px-3 text-sm text-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/30 ${errors.subject ? "border-destructive" : "border-input"}`}
              />
              {errors.subject && <p className="text-xs text-destructive">{errors.subject}</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-sm font-medium text-foreground">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                value={fields.message}
                onChange={handleChange}
                placeholder="Tell us about your project..."
                className={`rounded-lg border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/30 ${errors.message ? "border-destructive" : "border-input"}`}
              />
              {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
            </div>
            {status === "success" && (
              <p className="text-sm font-medium text-green-600">Message sent! We&apos;ll be in touch soon.</p>
            )}
            {status === "error" && (
              <p className="text-sm font-medium text-destructive">Something went wrong. Please try again.</p>
            )}
            <Button type="submit" size="lg" className="mt-1 h-11 text-base" disabled={status === "loading"}>
              {status === "loading" ? "Sending…" : "Send message"}
              {status !== "loading" && <ArrowRight className="size-4" />}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
