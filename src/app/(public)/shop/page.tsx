import { Suspense } from "react";
import type { Metadata } from "next";
import ShopClient from "./ShopClient";
import { getAllProducts, getCategories } from "@/lib/products/registry";
import {
  SITE_URL,
  SITE_NAME,
  generateBreadcrumbStructuredData,
  generateCollectionStructuredData,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: "Shop Authentic Ayurvedic Formulations & Natural Wellness",
  description:
    "Browse Ayur Veda Global's complete catalog of standardized herbal supplements, vitality sprays, and hair regrowth formulas. 100% natural, lab-tested, discrete India-wide delivery.",
  alternates: {
    canonical: `${SITE_URL}/shop`,
  },
  openGraph: {
    title: `Shop Authentic Ayurvedic Formulations & Natural Wellness | ${SITE_NAME}`,
    description:
      "Browse Ayur Veda Global's complete catalog of standardized herbal supplements, vitality sprays, and hair regrowth formulas. 100% natural, lab-tested, discrete India-wide delivery.",
    url: `${SITE_URL}/shop`,
    siteName: SITE_NAME,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/og-default.svg`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} Dispensary Catalog`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Shop Authentic Ayurvedic Formulations & Natural Wellness | ${SITE_NAME}`,
    description:
      "Browse Ayur Veda Global's complete catalog of standardized herbal supplements, vitality sprays, and hair regrowth formulas.",
    images: [`${SITE_URL}/images/og-default.svg`],
  },
};

export default function ShopPage() {
  const products = getAllProducts();
  const categories = getCategories();

  const breadcrumbSchema = generateBreadcrumbStructuredData([
    { name: "Home", url: "/" },
    { name: "Shop", url: "/shop" },
  ]);

  const collectionSchema = generateCollectionStructuredData(
    "Ayurvedic Dispensary & Formulations",
    "Comprehensive catalog of authentic, standardized herbal extracts, classical Rasayana supplements, and topical vitality formulas.",
    "/shop",
    products,
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([collectionSchema, breadcrumbSchema]),
        }}
      />
      <Suspense
        fallback={
          <div className="min-h-[50vh] flex items-center justify-center text-[#737373] text-xs font-mono">
            Loading dispensary catalog...
          </div>
        }
      >
        <ShopClient
          initialProducts={products}
          initialCategories={categories}
        />
      </Suspense>
    </>
  );
}
