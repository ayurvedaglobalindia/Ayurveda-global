import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Providers } from '@/components/providers'
import { Toaster } from '@/components/ui/Toast'
import { WhatsAppFloatButton } from '@/components/layout/WhatsAppFloatButton'
import { GlobalModals } from '@/components/layout/GlobalModals'

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
    title: {
      default: 'Ayur Veda Global | Authentic Ayurvedic Wellness Products',
      template: '%s | Ayur Veda Global',
    },
    description: 'Discover authentic Ayurvedic wellness products. BODY Essential Nutrition supplements and STAYMAX+ Delay Spray. Natural herbs, sustainable sourcing, free shipping on orders above ₹999.',
    keywords: ['ayurvedic', 'wellness', 'herbal supplements', 'natural products', 'ayurveda', 'health'],
    authors: [{ name: 'Ayur Veda Global' }],
    creator: 'Ayur Veda Global',
    publisher: 'Ayur Veda Global',
    robots: 'index, follow',
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      url: 'https://ayurvedaglobal.com',
      siteName: 'Ayur Veda Global',
      title: 'Ayur Veda Global | Authentic Ayurvedic Wellness Products',
      description: 'Discover authentic Ayurvedic wellness products. Natural herbs, sustainable sourcing.',
      images: [
        {
          url: '/images/og-default.svg',
          width: 1200,
          height: 630,
          alt: 'Ayur Veda Global',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Ayur Veda Global | Authentic Ayurvedic Wellness Products',
      description: 'Discover authentic Ayurvedic wellness products. Natural herbs, sustainable sourcing.',
      images: ['/images/og-default.svg'],
    },
    verification: {
      google: 'google-site-verification-code',
    },
    icons: {
      icon: '/favicon.ico',
    },
  }

export const viewport: Viewport = {
  themeColor: '#030F07',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="antialiased dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
        <link rel="dns-prefetch" href="https://wa.me" />
      </head>
      <body className="min-h-screen bg-ayur-void text-ayur-cream font-body selection:bg-ayur-gold selection:text-ayur-void">
        <Providers>
          {children}
          <Toaster />
          <WhatsAppFloatButton />
          <GlobalModals />
        </Providers>
      </body>
    </html>
  )
}