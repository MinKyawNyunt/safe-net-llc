import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google'
import './globals.css'
import { CosmicBackground } from '@/components/cosmic-background'
import { Cursor } from '@/components/cursor'
import { MotionProvider } from '@/components/motion-provider'
import { PerformanceGovernor } from '@/components/performance-governor'
import { Preloader } from '@/components/preloader'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://safenet.llc'

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'Safe Net LLC',
      url: siteUrl,
      logo: `${siteUrl}/icon.svg`,
      description:
        'A software studio founded in 2026. Digital products, business platforms and AI-powered automation.',
      foundingDate: '2026',
      email: 'contact@safenet.llc',
      telephone: '+1-307-434-9898',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '30 N Gould St, Ste N',
        addressLocality: 'Sheridan',
        addressRegion: 'WY',
        postalCode: '82801',
        addressCountry: 'US',
      },
      knowsAbout: [
        'Product engineering',
        'Custom ERP',
        'Product lifecycle management',
        'Workflow automation',
        'AI integrations',
        'Web development',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      name: 'Safe Net LLC',
      url: siteUrl,
      publisher: { '@id': `${siteUrl}/#organization` },
    },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: { canonical: '/' },
  title: 'Safe Net LLC — We make complex systems behave',
  description:
    'Safe Net LLC is a software studio founded in 2026. We design and build digital products, business platforms and AI-powered automation.',
  keywords: [
    'software studio',
    'product engineering',
    'custom ERP',
    'PLM',
    'workflow automation',
    'AI integrations',
    'Safe Net LLC',
  ],
  icons: {
    icon: '/logo.ico',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Safe Net LLC — We make complex systems behave',
    description:
      'Digital products, business platforms and AI-powered automation. A software studio founded in 2026.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Safe Net LLC',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Safe Net LLC — We make complex systems behave.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Safe Net LLC — We make complex systems behave',
    description:
      'Digital products, business platforms and AI-powered automation. A software studio founded in 2026.',
    images: ['/og.png'],
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#04060b',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="font-sans antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <CosmicBackground />
        <Preloader />
        <Cursor />
        <MotionProvider />
        <PerformanceGovernor />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <noscript>
          <style>{`.preloader{display:none!important}.cursor-layer{display:none!important}`}</style>
        </noscript>
        {process.env.VERCEL === '1' && <Analytics />}
      </body>
    </html>
  )
}
