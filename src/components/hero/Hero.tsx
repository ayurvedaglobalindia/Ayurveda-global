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
      className="relative min-h-[100vh] flex flex-col justify-center py-10 sm:py-14 md:py-20 lg:py-24 overflow-hidden"
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-ayur-forest via-ayur-leaf to-ayur-black" />
      <div
        className="absolute inset-0 opacity-5"
        style={{ backgroundImage: "url('/images/textures/botanical-lines.svg')" }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[500px] md:w-[700px] lg:w-[800px] h-[320px] sm:h-[500px] md:h-[700px] lg:h-[800px] rounded-full bg-ayur-gold/10 blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      <motion.div
        className="absolute top-1/4 right-4 sm:right-10 w-[180px] sm:w-[260px] md:w-[300px] h-[180px] sm:h-[260px] md:h-[300px] rounded-full bg-ayur-sage/10 blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear', delay: 5 }}
      />

      <motion.div
        className="absolute bottom-1/4 left-4 sm:left-10 w-[140px] sm:w-[180px] md:w-[200px] h-[140px] sm:h-[180px] md:h-[200px] rounded-full bg-ayur-gold/5 blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.08, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear', delay: 10 }}
      />

      <div className="container relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 sm:mb-6 md:mb-8 flex items-center gap-3 sm:gap-4"
          >
            <span className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-ayur-gold/20 text-ayur-gold text-xs sm:text-sm font-medium border border-ayur-gold/30">
              Authentic Ayurvedic Wellness
            </span>
            <div className="h-0.5 w-10 sm:w-16 bg-gradient-to-r from-ayur-gold to-ayur-copper rounded-full" />
          </motion.div>

          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-ayur-cream leading-[1.15] mb-4 sm:mb-6 md:mb-8 tracking-tight"
          >
            Ancient Wisdom for{' '}
            <span className="text-ayur-gold relative inline-block">
              Modern Wellness
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-sm sm:text-base md:text-xl text-ayur-beige/90 leading-relaxed mb-6 sm:mb-8 md:mb-10 max-w-2xl"
          >
            Discover premium Ayurvedic formulations crafted with pure herbs.
            BODY Essential Nutrition for daily vitality and STAYMAX+ for men's wellness.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-10"
          >
            <Link href="/shop">
              <Button variant="gold" size="lg" className="group relative overflow-hidden text-sm sm:text-base">
                <span className="relative flex items-center gap-2 z-10">
                  Shop Now
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="border-ayur-gold text-ayur-gold hover:bg-ayur-gold hover:text-ayur-black group relative overflow-hidden text-sm sm:text-base">
                <span className="relative z-10">Our Story</span>
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap items-center gap-3 sm:gap-6 md:gap-8 text-ayur-sand text-xs sm:text-sm"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-ayur-gold animate-pulse-gold flex-shrink-0" />
              <span className="font-medium text-ayur-cream">Trusted by 10,000+ customers</span>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-ayur-gold flex-shrink-0" />
              <span>98% satisfaction rate</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-ayur-gold flex-shrink-0" />
              <span>GMP certified facility</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 4 Trust Feature Cards - Stacks cleanly under heading on mobile */}
      <div ref={statsRef} className={classNames('container relative z-10 mt-8 sm:mt-10 md:mt-12 lg:mt-14', statsVisible ? 'opacity-100' : 'opacity-0')}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {trustIndicators.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="group relative p-3.5 sm:p-5 md:p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-ayur-gold/25 hover:border-ayur-gold/60 hover:bg-white/15 transition-all duration-300"
            >
              <div className="relative w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl bg-ayur-forest/50 border border-ayur-gold/20 flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-105 transition-transform duration-300">
                <item.icon className="w-4.5 h-4.5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-ayur-gold" />
              </div>
              <p className="relative font-heading text-sm sm:text-base md:text-lg font-medium text-ayur-cream mb-0.5 sm:mb-1">{item.label}</p>
              <p className="relative text-xs sm:text-sm text-ayur-sand/90">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}