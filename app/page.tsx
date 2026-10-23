import { Contact } from '@/components/contact'
import { Hero } from '@/components/hero'
import { Manifesto } from '@/components/manifesto'
import { Marquee } from '@/components/marquee'
import { Process } from '@/components/process'
import { Services } from '@/components/services'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { Studio } from '@/components/studio'
import { Work } from '@/components/work'

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Marquee />
        <Manifesto />
        <Services />
        <Work />
        <Process />
        <Studio />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
