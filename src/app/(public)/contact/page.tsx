import type { Metadata } from "next";
import ContactClient from "./ContactClient";
import {
  SITE_URL,
  SITE_NAME,
  generateContactPageStructuredData,
  generateBreadcrumbStructuredData,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact Us & Vaidya Support Desk",
  description:
    "Get in touch with Ayur Veda Global for personalized Ayurvedic guidance, order assistance, or WhatsApp consultation with senior BAMS Vaidyas. Phone: +91-9123485451.",
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: `Contact Us & Vaidya Support Desk | ${SITE_NAME}`,
    description:
      "Get in touch with Ayur Veda Global for personalized Ayurvedic guidance, order assistance, or WhatsApp consultation with senior BAMS Vaidyas.",
    url: `${SITE_URL}/contact`,
    siteName: SITE_NAME,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/og-default.svg`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} Contact`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact Us & Vaidya Support Desk | ${SITE_NAME}`,
    description:
      "Get in touch with Ayur Veda Global for personalized Ayurvedic guidance and order assistance.",
    images: [`${SITE_URL}/images/og-default.svg`],
  },
};

export default function ContactPage() {
  const contactSchema = generateContactPageStructuredData();
  const breadcrumbSchema = generateBreadcrumbStructuredData([
    { name: "Home", url: "/" },
    { name: "Contact", url: "/contact" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([contactSchema, breadcrumbSchema]),
        }}
      />
      <ContactClient />
    </>
  );
}
