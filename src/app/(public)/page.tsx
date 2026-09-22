import { Metadata } from 'next'
import Link from 'next/link'
import { Leaf, Truck, Shield, RotateCcw, Sparkles, Star, ArrowRight, Tag, CheckCircle2, Clock, Percent } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { ProductCard } from '@/components/product/ProductCard'
import { getFeaturedProducts, getAllProducts, getCategories } from '@/lib/products/registry'
import { generateWebsiteStructuredData, generateOrganizationStructuredData } from '@/lib/seo'
import type { Product } from '@/types'
import { Hero } from '@/components/hero/Hero'

export const metadata: Metadata = {
  title: 'Authentic Ayurvedic Wellness Products',
  description: 'Discover premium Ayurvedic wellness products. BODY Essential Nutrition supplements and STAYMAX+ Delay Spray. Natural herbs, sustainable sourcing, free shipping on orders above ₹999.',
  openGraph: {
    title: 'Ayur Veda Global | Authentic Ayurvedic Wellness Products',
    description: 'Discover premium Ayurvedic wellness products. Natural herbs, sustainable sourcing.',
    type: 'website',
  },
}

const benefits = [
  {
    icon: Leaf,
    title: '100% Natural Ingredients',
    description: 'Pure Ayurvedic herbs sourced sustainably from trusted farms across India.',
  },
  {
    icon: Sparkles,
    title: 'Traditional Formulations',
    description: 'Time-tested recipes passed down through generations of Ayurvedic practitioners.',
  },
  {
    icon: Shield,
    title: 'Quality Assured',
    description: 'Every batch tested for purity, potency, and safety in certified laboratories.',
  },
  {
    icon: RotateCcw,
    title: 'Sustainable Practices',
    description: 'Eco-friendly packaging and ethical sourcing that respects nature.',
  },
]

const trustBadges = [
  { icon: Truck, title: 'Free Shipping', desc: 'On orders above ₹999' },
  { icon: Shield, title: 'Authentic Products', desc: '100% genuine herbs' },
  { icon: RotateCcw, title: 'Easy Returns', desc: '7-day return policy' },
  { icon: Star, title: 'Customer Support', desc: 'WhatsApp & Email' },
]

const featuredProducts = getFeaturedProducts(4)

export default function HomePage() {
  const structuredData = [
    generateWebsiteStructuredData(),
    generateOrganizationStructuredData(),
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Hero />

      {/* Quick Category Navigation Pill Carousel / Bar */}
      <section className="bg-ayur-cream border-b border-ayur-sand/50 py-6">
        <div className="container">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <span className="text-xs font-semibold text-ayur-sage uppercase tracking-wider">Explore Collections</span>
              <h2 className="font-heading text-xl sm:text-2xl font-medium text-ayur-black">Shop by Wellness Category</h2>
            </div>
            <Link href="/shop" className="text-xs sm:text-sm font-medium text-ayur-forest hover:text-ayur-gold flex items-center gap-1">
              All Categories <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            <Link href="/shop?category=supplements" className="p-4 rounded-2xl bg-white border border-ayur-sand/60 hover:border-ayur-forest hover:shadow-soft transition-all duration-300 group flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-ayur-mint-soft flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <Leaf className="w-6 h-6 text-ayur-forest" />
              </div>
              <div>
                <h3 className="font-medium text-sm sm:text-base text-ayur-black group-hover:text-ayur-forest">Supplements</h3>
                <p className="text-xs text-ayur-stone">Vitality, Immunity & Energy</p>
              </div>
            </Link>

            <Link href="/shop?category=personal-care" className="p-4 rounded-2xl bg-white border border-ayur-sand/60 hover:border-ayur-forest hover:shadow-soft transition-all duration-300 group flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-ayur-gold/15 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <Sparkles className="w-6 h-6 text-ayur-gold-deep" />
              </div>
              <div>
                <h3 className="font-medium text-sm sm:text-base text-ayur-black group-hover:text-ayur-forest">Personal Care</h3>
                <p className="text-xs text-ayur-stone">Men's Endurance & Natural Care</p>
              </div>
            </Link>

            <Link href="/shop" className="col-span-2 md:col-span-1 p-4 rounded-2xl bg-gradient-to-br from-ayur-forest to-ayur-leaf text-ayur-cream border border-ayur-forest hover:shadow-soft transition-all duration-300 group flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Tag className="w-6 h-6 text-ayur-gold" />
                </div>
                <div>
                  <h3 className="font-medium text-sm sm:text-base text-ayur-cream">Special Bundles</h3>
                  <p className="text-xs text-ayur-sand">Save up to 20% on Combos</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-ayur-gold group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Showcase */}
      <section className="section bg-white">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ayur-mint-soft text-ayur-forest text-xs font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-ayur-sage" />
                Authentic Formulations
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-medium text-ayur-black">Featured Products</h2>
              <p className="text-ayur-stone mt-2 text-sm sm:text-base">Our clinical-grade, lab-tested herbal formulations</p>
            </div>
            <Link href="/shop">
              <Button variant="outline" className="gap-2 border-ayur-forest text-ayur-forest hover:bg-ayur-forest hover:text-white">
                View All Products
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Ayurvedic Guarantees Section */}
      <section className="section bg-ayur-cream border-y border-ayur-sand/40">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-ayur-forest uppercase tracking-wider">The Ayur Veda Promise</span>
            <h2 className="font-heading text-3xl font-medium text-ayur-black mt-2">Why Choose Ayur Veda Global</h2>
            <p className="text-ayur-stone text-sm sm:text-base mt-2">
              Combining ancient Ayurvedic treatises with modern analytical testing for pure, safe efficacy.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map(benefit => (
              <div
                key={benefit.title}
                className="p-6 rounded-2xl bg-white border border-ayur-sand/50 hover:border-ayur-forest/30 hover:shadow-soft transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-ayur-mint-soft flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <benefit.icon className="w-6 h-6 text-ayur-forest" />
                </div>
                <h3 className="font-heading text-lg font-medium text-ayur-black mb-2">{benefit.title}</h3>
                <p className="text-sm text-ayur-stone leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-ayur-black text-ayur-cream relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url('/images/textures/botanical-lines.svg')" }} />
        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="px-3 py-1 rounded-full bg-ayur-gold/20 text-ayur-gold text-sm font-medium mb-4 inline-block">
                Our Philosophy
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-medium mb-6">
                Rooted in Tradition, Crafted for Today
              </h2>
              <p className="text-ayur-beige text-lg leading-relaxed mb-6">
                At Ayur Veda Global, we believe that true wellness comes from harmony between
                body, mind, and nature. Our formulations are inspired by centuries of Ayurvedic
                knowledge, adapted for the rhythms of modern life.
              </p>
              <p className="text-ayur-beige text-lg leading-relaxed mb-8">
                Every herb is carefully selected, every formula meticulously tested.
                We honor the ancient wisdom while embracing contemporary standards of quality
                and sustainability.
              </p>
              <Link href="/about">
                <Button variant="gold" size="lg">
                  Learn More About Us
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-ayur-forest relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Leaf className="w-24 h-24 text-ayur-gold/30" />
                </div>
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden bg-ayur-charcoal relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-24 h-24 text-ayur-gold/30" />
                </div>
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden bg-ayur-forest/50 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Shield className="w-24 h-24 text-ayur-gold/30" />
                </div>
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden bg-ayur-charcoal/50 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Truck className="w-24 h-24 text-ayur-gold/30" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-medium text-ayur-black mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-ayur-stone text-lg">
              Quality you can trust, service you can rely on
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map((badge) => (
              <div
                key={badge.title}
                className="text-center p-6 rounded-2xl bg-ayur-cream border border-ayur-sand/40 hover:shadow-soft transition-all duration-300"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-ayur-forest/10 flex items-center justify-center">
                  <badge.icon className="w-7 h-7 text-ayur-forest" />
                </div>
                <h3 className="font-heading text-lg font-medium text-ayur-black mb-1">{badge.title}</h3>
                <p className="text-ayur-stone text-sm">{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-ayur-forest text-ayur-cream relative">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-medium mb-6">
              Stay Connected with Ayurvedic Wisdom
            </h2>
            <p className="text-ayur-beige text-lg mb-8">
              Subscribe to our newsletter for wellness tips, new product launches, and exclusive offers.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" action="/api/newsletter" method="POST">
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="flex-1 bg-ayur-black/30 border-ayur-gold/30 text-ayur-cream placeholder-ayur-stone focus:ring-ayur-gold"
                required
              />
              <Button variant="gold" size="lg" type="submit">
                Subscribe
              </Button>
            </form>
            <p className="text-xs text-ayur-stone mt-4">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>
    </>
  )
}