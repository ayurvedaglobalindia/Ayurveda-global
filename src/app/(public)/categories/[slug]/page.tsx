import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryPageClient from "./CategoryPageClient";
import {
  getCategories,
  getCategoryBySlug,
  getProductsByCategory,
} from "@/lib/products/registry";
import {
  SITE_URL,
  SITE_NAME,
  generateBreadcrumbStructuredData,
  generateCollectionStructuredData,
} from "@/lib/seo";

export function generateStaticParams() {
  const categories = getCategories();
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

interface CategoryPageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const category = getCategoryBySlug(resolvedParams.slug);

  if (!category) {
    return {
      title: `Category Not Found | ${SITE_NAME}`,
      description: "The requested category could not be found.",
    };
  }

  const title = `${category.name} Formulations`;
  const description =
    category.description ||
    `Explore authentic Ayurvedic ${category.name.toLowerCase()} products formulated with standardized herbal extracts. Free shipping across India.`;
  const canonicalUrl = `${SITE_URL}/categories/${category.slug}`;
  const catImg = category.image || "/images/og-default.svg";
  const ogImageUrl = catImg.startsWith("http") ? catImg : `${SITE_URL}${catImg}`;

  return {
    title,
    description,
    keywords: [
      category.name.toLowerCase(),
      "ayurveda",
      "herbal",
      "wellness",
      "ayurvedic medicine",
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
          alt: category.name,
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

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const category = getCategoryBySlug(resolvedParams.slug);

  if (!category) {
    notFound();
  }

  const products = getProductsByCategory(category.slug);
  const breadcrumbSchema = generateBreadcrumbStructuredData([
    { name: "Home", url: "/" },
    { name: "Categories", url: "/categories" },
    { name: category.name, url: `/categories/${category.slug}` },
  ]);
  const collectionSchema = generateCollectionStructuredData(
    category.name,
    category.description,
    `/categories/${category.slug}`,
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
          <div className="container py-16 text-center text-[#D4AF37]">
            Loading category...
          </div>
        }
      >
        <CategoryPageClient
          initialCategory={category}
          initialProducts={products}
          slug={category.slug}
        />
      </Suspense>
    </>
  );
}
