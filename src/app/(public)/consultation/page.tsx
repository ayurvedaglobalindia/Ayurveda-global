import { Metadata } from "next";
import ConsultationClient from "./ConsultationClient";
import {
  SITE_URL,
  SITE_NAME,
  generateBreadcrumbStructuredData,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: "Free Ayurvedic Doctor Consultation",
  description:
    "Consult certified Ayurvedic Vaidyas (BAMS) for personalized health guidance, customized herbal formulations, and lifestyle recommendations. 100% confidential.",
  alternates: {
    canonical: `${SITE_URL}/consultation`,
  },
  openGraph: {
    title: `Free Ayurvedic Doctor Consultation | ${SITE_NAME}`,
    description:
      "Consult certified Ayurvedic Vaidyas for personalized health guidance and herbal regimens. 100% confidential.",
    url: `${SITE_URL}/consultation`,
    siteName: SITE_NAME,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/og-default.svg`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} Consultation Desk`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Free Ayurvedic Doctor Consultation | ${SITE_NAME}`,
    description:
      "Consult certified Ayurvedic Vaidyas for personalized health guidance and herbal regimens.",
    images: [`${SITE_URL}/images/og-default.svg`],
  },
};

export default function ConsultationPage() {
  const breadcrumbSchema = generateBreadcrumbStructuredData([
    { name: "Home", url: "/" },
    { name: "Consultation", url: "/consultation" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <ConsultationClient />
    </>
  );
}
