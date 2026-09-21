'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Leaf, Sparkles, Shield, Truck, RotateCcw } from 'lucide-react'
import { motion, useMotionValue, useTransform, useSpring, useScroll } from 'framer-motion'
import { classNames } from '@/lib/utils/formatters'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'
import { useScrollReveal, useParallax, useReducedMotion } from '@/hooks/useScrollReveal'

const trustIndicators = [
  { icon: Truck, label: 'Free Shipping', desc: 'Orders above ₹999' },
  { icon: Shield, label: 'Authentic', desc: '100% genuine herbs' },
  { icon: RotateCcw, label: 'Easy Returns', desc: '7-day policy' },
  { icon: Sparkles, label: 'Pure Quality', desc: 'Lab tested batches' },
]

export function Hero() {
  const prefersReduced = useReducedMotion()
  const { scrollY } = useScroll()
  const [mounted, setMounted] = useState(false)

  const scrollProgress = useMotionValue(0)
  const scale = useSpring(useTransform(scrollY, [0, 500], [1, 0.95]), { stiffness: 200, damping: 30 })
  const opacity = useSpring(useTransform(scrollY, [0, 300], [1, 0]), { stiffness: 200, damping: 30 })
  const yOffset = useSpring(useTransform(scrollY, [0, 500], [0, 100]), { stiffness: 200, damping: 30 })

  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal({ delay: 100 })
  const { ref: statsRef, isVisible: statsVisible } = useScrollReveal({ delay: 300 })
  const { ref: trustRef, isVisible: trustVisible } = useScrollReveal({ delay: 500 })

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      scrollProgress.set(Math.min(window.scrollY / 500, 1))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrollProgress])

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100vh] flex items-center overflow-hidden"
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-ayur-forest via-ayur-leaf to-ayur-black" />
      <div
        className="absolute inset-0 opacity-5"
        style={{ backgroundImage: "url('/images/textures/botanical-lines.svg')" }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-ayur-gold/10 blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      <motion.div
        className="absolute top-1/4 right-10 w-[300px] h-[300px] rounded-full bg-ayur-sage/10 blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear', delay: 5 }}
      />

      <motion.div
        className="absolute bottom-1/4 left-10 w-[200px] h-[200px] rounded-full bg-ayur-gold/5 blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.08, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear', delay: 10 }}
      />

      <div className="container relative py-20 lg:py-32 z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.175, 0.885, 0.32, 1.275] }}
            className="mb-8 flex items-center gap-4"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="px-4 py-2 rounded-full bg-ayur-gold/20 text-ayur-gold text-sm font-medium border border-ayur-gold/30"
            >
              Authentic Ayurvedic Wellness
            </motion.span>
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 60 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-0.5 bg-gradient-to-r from-ayur-gold to-ayur-copper rounded-full"
            />
          </motion.div>

          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.175, 0.885, 0.32, 1.275] }}
            className="font-heading text-5xl md:text-7xl lg:text-8xl font-medium text-ayur-cream leading-[1.1] mb-8 tracking-tight"
          >
            Ancient Wisdom for{' '}
            <motion.span
              initial={{ opacity: 0, rotateY: 90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-ayur-gold relative inline-block"
            >
              Modern Wellness
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-xl md:text-2xl text-ayur-beige leading-relaxed mb-12 max-w-2xl"
          >
            Discover premium Ayurvedic formulations crafted with pure herbs.
            BODY Essential Nutrition for daily vitality and STAYMAX+ for men's wellness.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <Link href="/shop">
              <Button variant="gold" size="lg" className="group relative overflow-hidden">
                <span className="relative flex items-center gap-2 z-10">
                  Shop Now
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-ayur-gold-light to-ayur-copper scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 0 }}
                />
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="border-ayur-gold text-ayur-gold hover:bg-ayur-gold hover:text-ayur-black group relative overflow-hidden">
                <span className="relative z-10">Our Story</span>
                <motion.div className="absolute inset-0 bg-gradient-to-r from-ayur-gold to-ayur-copper scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-wrap items-center gap-8 text-ayur-sand text-sm"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-ayur-gold animate-pulse-gold" />
              <span className="font-medium text-ayur-cream">Trusted by 10,000+ customers</span>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-ayur-gold" />
              <span>98% satisfaction rate</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-ayur-gold" />
              <span>GMP certified facility</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div ref={statsRef} className={classNames('container relative z-10 -mt-20 lg:-mt-28 pb-16', statsVisible ? 'opacity-100' : 'opacity-0')}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {trustIndicators.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="group relative p-5 md:p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-ayur-gold/20 hover:border-ayur-gold/50 hover:bg-white/10 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-ayur-gold/10 to-ayur-copper/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              <div className="relative w-12 h-12 rounded-xl bg-ayur-forest/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                <item.icon className="w-6 h-6 text-ayur-gold" />
              </div>
              <p className="relative font-heading font-medium text-ayur-cream mb-1">{item.label}</p>
              <p className="relative text-sm text-ayur-sand">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ayur-cream to-transparent pointer-events-none" />
    </section>
  )
}