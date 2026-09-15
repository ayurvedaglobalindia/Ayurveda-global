import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Toaster } from '@/components/ui/Toast'
import { WhatsAppFloatButton } from '@/components/layout/WhatsAppFloatButton'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
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
        url: '/images/og-default.jpg',
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
    images: ['/images/og-default.jpg'],
  },
  verification: {
    google: 'google-site-verification-code',
  },
}

export const viewport: Viewport = {
  themeColor: '#1B3A2F',
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
    <html lang="en" className={`${inter.variable} antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://wa.me" />
      </head>
      <body className="min-h-screen bg-ayur-cream font-body">
        <Providers>
          {children}
          <Toaster />
          <WhatsAppFloatButton />
        </Providers>
      </body>
    </html>
  )
}