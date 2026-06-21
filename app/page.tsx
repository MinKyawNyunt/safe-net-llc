import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { Approach } from "@/components/approach"
import { Process } from "@/components/process"
import { ContactCTA } from "@/components/contact-cta"
import { SiteFooter } from "@/components/site-footer"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Services />
        <Approach />
        {/* <Process /> */}
        <ContactCTA />
      </main>
      <SiteFooter />
    </div>
  )
}
