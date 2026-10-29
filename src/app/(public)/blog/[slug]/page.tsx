import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  Share2,
  CheckCircle2,
  MessageCircle,
  Tag,
  ShieldCheck,
} from "lucide-react";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog";
import { getProductBySlug } from "@/lib/products/registry";
import {
  SITE_URL,
  SITE_NAME,
  generateBreadcrumbStructuredData,
} from "@/lib/seo";

export function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getBlogPostBySlug(resolvedParams.slug);

  if (!post) {
    return {
      title: "Article Not Found",
      description: "The requested Ayurvedic wellness article could not be found.",
    };
  }

  const title = post.seoTitle || post.title;
  const description = post.excerpt;
  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;
  const ogImageUrl = post.image.startsWith("http")
    ? post.image
    : `${SITE_URL}${post.image}`;

  return {
    title,
    description,
    keywords: post.tags,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: "en_IN",
      type: "article",
      publishedTime: post.isoDate,
      authors: [post.author.name],
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
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

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const post = getBlogPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const relatedProduct = getProductBySlug(post.relatedProductSlug);
  const otherPosts = getAllBlogPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE_URL}/blog/${post.slug}#article`,
    headline: post.title,
    description: post.excerpt,
    image: post.image.startsWith("http") ? post.image : `${SITE_URL}${post.image}`,
    datePublished: post.isoDate,
    dateModified: "2026-10-29T00:00:00.000Z",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/brand-logo.png`,
      },
    },
  };

  const breadcrumbSchema = generateBreadcrumbStructuredData([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${post.slug}` },
  ]);

  return (
    <article className="bg-[#FAF7F2] min-h-screen text-[#1C1D1F] py-6 sm:py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([articleSchema, breadcrumbSchema]),
        }}
      />

      <div className="container max-w-4xl px-4 sm:px-6 mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#737373] mb-6 font-mono">
          <Link
            href="/blog"
            className="hover:text-[#1C1D1F] flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Articles</span>
          </Link>
          <span>/</span>
          <span className="text-[#9E8047]">{post.category}</span>
        </div>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#737373] font-mono mb-3">
            <span className="px-3 py-1 rounded-full bg-[#EAE4DC] text-[#1C1D1F] font-semibold">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#9E8047]" />
              {post.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#9E8047]" />
              {post.readTime}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1C1D1F] leading-tight mb-4 tracking-tight">
            {post.title}
          </h1>

          <p className="text-sm sm:text-base text-[#555555] leading-relaxed font-sans mb-6">
            {post.excerpt}
          </p>

          {/* Author Strip */}
          <div className="flex items-center justify-between py-4 border-y border-[#9E8047]/25">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#EAE4DC] border border-[#9E8047]/30">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="font-medium text-xs sm:text-sm text-[#1C1D1F] block">
                  {post.author.name}
                </span>
                <span className="text-[11px] text-[#737373] block">
                  {post.author.role}
                </span>
              </div>
            </div>

            <a
              href={`https://wa.me/919123485451?text=Namaste%20Vaidya%20Ji%2C%20I%20read%20your%20article%20on%20${encodeURIComponent(post.title)}%20and%20wanted%20guidance.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#25D366]/10 text-[#075E54] hover:bg-[#25D366]/20 transition-colors text-xs font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span className="hidden sm:inline">Ask Dr. on WhatsApp</span>
              <span className="sm:hidden">Ask Vaidya</span>
            </a>
          </div>
        </header>

        {/* Hero Featured Visual */}
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-[#F5F1EB] border border-[#9E8047]/25 mb-10 shadow-sm">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </div>

        {/* Content Body */}
        <div className="prose max-w-none text-[#333333] space-y-8 text-sm sm:text-base leading-relaxed font-sans mb-12">
          {post.content.map((section, idx) => (
            <section key={idx} className="space-y-3">
              {section.heading && (
                <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1C1D1F] mt-6 mb-2">
                  {section.heading}
                </h2>
              )}
              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-[#444444] leading-relaxed">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>

        {/* Recommended Formulation Card */}
        {relatedProduct && (
          <div className="p-6 sm:p-8 rounded-2xl bg-[#F5F1EB] border border-[#9E8047]/30 my-10 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-white border border-[#9E8047]/25 flex-shrink-0">
                  <Image
                    src={relatedProduct.images[0]?.src || "/images/brand-logo.png"}
                    alt={relatedProduct.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#9E8047] font-semibold block mb-1">
                    Therapeutic Formulation Mentioned in Article
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-medium text-[#1C1D1F]">
                    {relatedProduct.name}
                  </h3>
                  <p className="text-xs text-[#666666] line-clamp-2 mt-1">
                    {relatedProduct.shortDescription}
                  </p>
                  <span className="text-xs font-mono font-semibold text-[#1C1D1F] mt-2 block">
                    ₹{(relatedProduct.price / 100).toFixed(0)} INR • Free Delivery Available
                  </span>
                </div>
              </div>

              <Link
                href={`/product/${relatedProduct.slug}`}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#1C1D1F] hover:bg-[#071A12] text-[#FDFBF7] text-xs font-medium tracking-wide inline-flex items-center justify-center gap-2 transition-all flex-shrink-0 shadow-sm"
              >
                <span>View Formulation</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </Link>
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-6 pb-8 border-t border-[#9E8047]/20">
          <Tag className="w-3.5 h-3.5 text-[#9E8047]" />
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-md bg-[#EAE4DC] text-[#555555]"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Read Next Section */}
        {otherPosts.length > 0 && (
          <div className="pt-10 border-t border-[#9E8047]/25">
            <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#1C1D1F] mb-6">
              Continue Reading From Apothecary Journal
            </h3>
            <div className="grid sm:grid-cols-3 gap-5">
              {otherPosts.map((other) => (
                <Link
                  key={other.id}
                  href={`/blog/${other.slug}`}
                  className="group block p-4 rounded-xl bg-white border border-[#9E8047]/20 hover:border-[#9E8047]/50 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-gray-100 mb-3">
                    <Image
                      src={other.image}
                      alt={other.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#9E8047] uppercase block mb-1">
                      {other.category}
                    </span>
                    <h4 className="font-serif text-sm font-medium text-[#1C1D1F] line-clamp-2 leading-snug group-hover:text-[#9E8047] transition-colors">
                      {other.title}
                    </h4>
                  </div>
                  <span className="text-xs text-[#9E8047] inline-flex items-center gap-1 font-mono mt-3">
                    Read <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
