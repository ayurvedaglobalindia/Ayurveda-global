import { Metadata } from 'next'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Leaf, Truck, Shield, RotateCcw, Sparkles, Star, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ProductCard } from '@/components/product/ProductCard'
import { getFeaturedProducts, getAllProducts } from '@/lib/products/registry'
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

      <section className="section bg-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-medium text-ayur-black mb-4">
              Why Choose Ayur Veda Global
            </h2>
            <p className="text-ayur-stone text-lg">
              We bridge traditional Ayurvedic wisdom with modern wellness needs,
              offering products that are pure, potent, and sustainably sourced.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-ayur-cream hover:bg-ayur-beige transition-colors"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-ayur-forest/10 flex items-center justify-center">
                  <benefit.icon className="w-8 h-8 text-ayur-forest" />
                </div>
                <h3 className="font-heading text-xl font-medium text-ayur-black mb-2">{benefit.title}</h3>
                <p className="text-ayur-stone">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-medium text-ayur-black">Featured Products</h2>
              <p className="text-ayur-stone mt-2">Our most loved Ayurvedic formulations</p>
            </div>
            <Link href="/shop">
              <Button variant="ghost" className="gap-2">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-ayur-black text-ayur-cream relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url('/images/textures/wood-grain.png')" }} />
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
            {trustBadges.map((badge, index) => (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-ayur-cream"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-ayur-forest/10 flex items-center justify-center">
                  <badge.icon className="w-7 h-7 text-ayur-forest" />
                </div>
                <h3 className="font-heading text-lg font-medium text-ayur-black mb-1">{badge.title}</h3>
                <p className="text-ayur-stone text-sm">{badge.desc}</p>
              </motion.div>
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