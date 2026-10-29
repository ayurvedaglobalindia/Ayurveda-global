import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPageClient from "./ProductPageClient";
import { getAllProducts, getProductBySlug } from "@/lib/products/registry";
import {
  SITE_URL,
  SITE_NAME,
  generateProductStructuredData,
  generateBreadcrumbStructuredData,
} from "@/lib/seo";

export function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

interface ProductPageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.slug);

  if (!product) {
    return {
      title: `Product Not Found | ${SITE_NAME}`,
      description: "The requested Ayurvedic product could not be found.",
    };
  }

  // Strip existing brand suffix if present to prevent double brand suffix with root template
  const rawTitle = product.seo?.title || product.name;
  const title = rawTitle.replace(/\s*\|\s*Ayur\s*Veda\s*Global.*$/i, "").trim();
  const description =
    product.seo?.description ||
    product.shortDescription ||
    product.description.slice(0, 160);
  const canonicalUrl = `${SITE_URL}/product/${product.slug}`;
  const primaryImg = product.images[0]?.src || "/images/og-default.svg";
  const ogImageUrl = primaryImg.startsWith("http")
    ? primaryImg
    : `${SITE_URL}${primaryImg}`;

  return {
    title,
    description,
    keywords: product.seo?.keywords || [
      "ayurveda",
      "ayurvedic wellness",
      "natural herbs",
      product.name.toLowerCase(),
      product.category,
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const productSchema = generateProductStructuredData(product);
  const breadcrumbSchema = generateBreadcrumbStructuredData([
    { name: "Home", url: "/" },
    { name: "Shop", url: "/shop" },
    { name: product.name, url: `/product/${product.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([productSchema, breadcrumbSchema]),
        }}
      />
      <Suspense
        fallback={
          <div className="container py-16 text-center text-[#D4AF37]">
            Loading product details...
          </div>
        }
      >
        <ProductPageClient initialProduct={product} slug={product.slug} />
      </Suspense>
    </>
  );
}
