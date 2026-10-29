import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/Toast";
import { WhatsAppFloatButton } from "@/components/layout/WhatsAppFloatButton";
import { GlobalModals } from "@/components/layout/GlobalModals";
import { AnalyticsTracker } from "@/components/analytics/AnalyticsTracker";
import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import {
  SITE_URL,
  SITE_NAME,
  generateOrganizationStructuredData,
  generateWebsiteStructuredData,
} from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  title: {
    default: `${SITE_NAME} | Authentic Ayurvedic Wellness Products`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Discover authentic Ayurvedic wellness products. Standardized botanical extracts, pure Himalayan Shilajit, Ashwagandha KSM-66, and holistic vitality formulations. Discrete delivery across India.",
  keywords: [
    "ayurvedic",
    "wellness",
    "herbal supplements",
    "natural products",
    "ayurveda",
    "health",
    "shilajit",
    "ashwagandha",
    "vitality",
    "hair regrowth",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Authentic Ayurvedic Wellness Products`,
    description:
      "Discover authentic Ayurvedic wellness products. Standardized botanical extracts, lab purity tested, discrete delivery across India.",
    images: [
      {
        url: `${SITE_URL}/images/og-default.svg`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} Apothecary`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Authentic Ayurvedic Wellness Products`,
    description:
      "Discover authentic Ayurvedic wellness products. Standardized botanical extracts, lab purity tested.",
    images: [`${SITE_URL}/images/og-default.svg`],
  },
  verification: {
    google: "google-site-verification-code",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/icon-192x192.png",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#FAF7F2",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const globalStructuredData = [
    generateWebsiteStructuredData(),
    generateOrganizationStructuredData(),
  ];

  return (
    <html lang="en" className="antialiased" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://wa.me" />
        <link rel="ai-catalog" type="application/json" href="/ai-catalog.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(globalStructuredData),
          }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-screen bg-transparent text-[#1C1D1F] font-body selection:bg-[#EAE4DC] selection:text-[#1C1D1F] overflow-x-hidden w-full max-w-full">
        <AnimatedBackground />
        <Providers>
          <AnalyticsTracker />
          {children}
          <Toaster />
          <WhatsAppFloatButton />
          <GlobalModals />
        </Providers>
      </body>
    </html>
  );
}
