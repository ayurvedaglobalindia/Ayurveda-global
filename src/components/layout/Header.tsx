'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  Menu,
  X,
  Search,
  ShoppingBag,
  Heart,
  User,
  ChevronDown,
  Sparkles,
  PhoneCall,
  Shield,
  ArrowRight,
  HeartPulse,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { useUserStore } from '@/store/userStore'
import { useUIStore } from '@/store/uiStore'
import { getCategories } from '@/lib/products/registry'

export function Header() {
  const [isMounted, setIsMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const [isAccountOpen, setIsAccountOpen] = useState(false)
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState<string | null>(null)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)

  const { items: cartItems, getItemCount } = useCartStore()
  const { getItemCount: getWishlistCount } = useWishlistStore()
  const { user, isAuthenticated } = useUserStore()
  const {
    openModal,
    closeModal,
    openCartDrawer,
    isMobileMenuOpen,
    isSearchOpen,
    toggleSearch,
    closeSearch,
    closeMobileMenu,
  } = useUIStore()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const cartCount = getItemCount()
  const wishlistCount = getWishlistCount()
  const categories = getCategories()

  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setIsSearchExpanded(false)
      setMobileSearchOpen(false)
    }
  }

  const megaMenuContent = {
    supplements: {
      title: 'Herbal Supplements',
      description: 'Daily stamina, physical strength & holistic revitalization',
      items: [
        { label: 'BODY Essential Nutrition (60 Caps)', href: '/product/body-essential-nutrition', badge: 'Bestseller' },
        { label: 'BODY Essential Nutrition (120 Caps)', href: '/product/body-essential-nutrition?variant=120', badge: 'Value Pack' },
        { label: 'All Supplements', href: '/shop?category=supplements', badge: '' },
      ],
      cta: { label: 'View All Supplements', href: '/shop?category=supplements' },
    },
    'personal-care': {
      title: "Men's Personal Care",
      description: 'Topical endurance, long-lasting performance & intimate wellness',
      items: [
        { label: 'STAYMAX+ Delay Spray (30ml)', href: '/product/staymax-delay-spray', badge: 'Fast Action' },
        { label: 'STAYMAX+ Twin Pack (2×30ml)', href: '/product/staymax-delay-spray?variant=60', badge: 'Save 38%' },
        { label: 'All Personal Care', href: '/shop?category=personal-care', badge: '' },
      ],
      cta: { label: 'View All Personal Care', href: '/shop?category=personal-care' },
    },
    wellness: {
      title: 'Power Combos',
      description: 'Inside-out synergistic vitality kits for maximum efficacy',
      items: [
        { label: 'Vitality & Performance Power Combo', href: '/product/vitality-power-combo', badge: '29% OFF • Best Value' },
        { label: 'Deluxe 2-Month Combo', href: '/product/vitality-power-combo?variant=deluxe', badge: 'Save ₹1,897' },
        { label: 'All Combos', href: '/shop?category=wellness', badge: '' },
      ],
      cta: { label: 'View All Combos', href: '/shop?category=wellness' },
    },
  }

  return (
    <header
      className={`w-full transition-all duration-300 z-50 ${
        isScrolled
          ? 'bg-ayur-void/95 backdrop-blur-2xl border-b border-ayur-gold/20 shadow-luxury'
          : 'bg-ayur-void/80 backdrop-blur-xl border-b border-ayur-gold/10'
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-3 sm:gap-6">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0 group py-1"
            aria-label="Ayur Veda Global Home"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <Image
                src="/images/logo.png"
                alt="Ayur Veda Global"
                width={40}
                height={40}
                className="object-contain filter drop-shadow-[0_2px_10px_rgba(201,168,76,0.3)]"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-base sm:text-lg md:text-xl font-bold tracking-tight text-ayur-ivory group-hover:text-emerald-300 transition-colors">
                Ayur Veda Global
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase font-bold tracking-[0.2em] text-emerald-400 -mt-0.5">
                Authentic Herbal Wellness
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center gap-1 text-sm font-medium text-ayur-cream"
            aria-label="Main Navigation"
          >
            <Link
              href="/"
              className="relative px-4 py-2.5 rounded-xl text-ayur-cream hover:text-ayur-gold-light hover:bg-ayur-forest-dark/50 transition-all"
            >
              Home
            </Link>

            {/* Shop Mega Menu */}
            <div className="relative" onMouseEnter={() => setIsMegaMenuOpen('shop')} onMouseLeave={() => setIsMegaMenuOpen(null)}>
              <button
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-ayur-cream hover:text-ayur-gold-light hover:bg-ayur-forest-dark/50 transition-all font-medium"
                aria-haspopup="true"
                aria-expanded={isMegaMenuOpen === 'shop'}
              >
                Shop All
                <ChevronDown className="w-4 h-4 transition-transform" style={{ transform: isMegaMenuOpen === 'shop' ? 'rotate(180deg)' : 'rotate(0)' }} />
              </button>

              <AnimatePresence>
                {isMegaMenuOpen === 'shop' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 top-full mt-3 w-96 bg-ayur-charcoal/98 backdrop-blur-2xl border border-ayur-gold/20 rounded-2xl shadow-luxury py-4 z-50"
                    role="menu"
                  >
                    {Object.entries(megaMenuContent).map(([key, content]) => (
                      <div key={key} className="px-4 py-3 border-b border-ayur-forest-dark/50 last:border-0">
                        <div className="mb-3">
                          <Link href={content.cta.href} className="font-heading font-semibold text-ayur-ivory text-sm">{content.title}</Link>
                          <p className="text-xs text-ayur-stone mt-0.5">{content.description}</p>
                        </div>
                        <div className="space-y-2">
                          {content.items.map((item) => (
                            <Link
                              key={item.label}
                              href={item.href}
                              className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-sm text-ayur-sand hover:text-ayur-ivory hover:bg-ayur-forest-dark/50 transition-all"
                            >
                              <span>{item.label}</span>
                              {item.badge && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-ayur-gold/15 text-ayur-gold-light border border-ayur-gold/30">
                                  {item.badge}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                    <div className="pt-3 border-t border-ayur-forest-dark/50">
                      <Link
                        href="/shop"
                        className="btn-gold-outline w-full text-center text-sm py-2.5"
                      >
                        Browse Complete Catalog
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick Links */}
            <Link
              href="/product/vitality-power-combo"
              className="relative px-4 py-2.5 rounded-xl text-ayur-gold-light font-semibold hover:text-ayur-ivory hover:bg-ayur-gold/10 transition-all flex items-center gap-1.5 group"
            >
              <Sparkles className="w-3.5 h-3.5 text-ayur-gold animate-pulse" />
              Power Combo
              <span className="text-[10px] bg-ayur-gold/20 text-ayur-gold-light px-2 py-0.5 rounded-full border border-ayur-gold/40 font-bold">
                29% OFF
              </span>
            </Link>

            <Link
              href="/faq"
              className="relative px-3.5 py-2.5 rounded-xl text-ayur-cream hover:text-ayur-gold-light hover:bg-ayur-forest-dark/50 transition-all"
            >
              FAQ
            </Link>

            <a
              href="https://wa.me/919123485451?text=Hi%20Ayur%20Veda%20Global%2C%20I%20would%20like%20to%20consult%20with%20an%20Ayurvedic%20doctor."
              target="_blank"
              rel="noopener noreferrer"
              className="relative px-3 py-1.5 rounded-full text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 hover:bg-emerald-900/90 hover:border-emerald-400 transition-all flex items-center gap-1.5 text-xs font-bold shadow-sm group"
            >
              <HeartPulse className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span>Free Doctor Consult</span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </a>

            <Link
              href="/about"
              className="relative px-3.5 py-2.5 rounded-xl text-ayur-cream hover:text-ayur-gold-light hover:bg-ayur-forest-dark/50 transition-all"
            >
              Heritage
            </Link>

            <Link
              href="/contact"
              className="relative px-3.5 py-2.5 rounded-xl text-ayur-cream hover:text-ayur-gold-light hover:bg-ayur-forest-dark/50 transition-all"
            >
              Contact
            </Link>
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop Search */}
            <div className="hidden md:block relative">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchExpanded(true)}
                  onBlur={() => setTimeout(() => setIsSearchExpanded(false), 200)}
                  placeholder="Search herbs, power combo, spray..."
                  className="w-48 lg:w-60 focus:w-72 pl-9 pr-3 py-2 bg-ayur-charcoal/90 border border-ayur-forest-dark/50 focus:border-ayur-gold/50 rounded-full text-xs text-ayur-ivory placeholder-ayur-stone focus:outline-none focus:ring-1 focus:ring-ayur-gold transition-all duration-300 shadow-inner"
                  aria-label="Search products"
                />
                <Search className="absolute left-3 w-4 h-4 text-ayur-gold/70 pointer-events-none" aria-hidden="true" />
                {isSearchExpanded && searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 w-4 h-4 text-ayur-stone hover:text-ayur-ivory"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </form>
            </div>

            {/* Mobile Search Button */}
            <button
              onClick={() => setMobileSearchOpen(true)}
              className="p-2 md:hidden rounded-xl text-ayur-cream hover:text-ayur-gold hover:bg-ayur-forest-dark/50 transition-colors focus-visible-ring"
              aria-label="Search products"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-2 rounded-xl text-ayur-cream hover:text-emerald-300 hover:bg-emerald-950/40 transition-colors focus-visible-ring group"
              aria-label={isMounted ? `Wishlist, ${wishlistCount} items` : 'Wishlist'}
            >
              <Heart className="w-5 h-5 transition-transform group-hover:scale-110" />
              {isMounted && wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-ayur-crimson text-ayur-cream text-[10px] font-bold flex items-center justify-center shadow-md animate-scale-in">
                  {wishlistCount > 99 ? '99+' : wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={openCartDrawer}
              className="relative p-2 rounded-xl text-ayur-cream hover:text-emerald-300 hover:bg-emerald-950/40 transition-colors focus-visible-ring group"
              aria-label={isMounted ? `Cart, ${cartCount} items` : 'Cart'}
            >
              <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110 text-emerald-400" />
              {isMounted && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-emerald-500 to-amber-400 text-black text-[10px] font-bold flex items-center justify-center shadow-md animate-scale-in">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>

            {/* User Account */}
            {isMounted && isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsAccountOpen(!isAccountOpen)}
                  className="flex items-center gap-1.5 p-2 rounded-xl text-ayur-cream hover:text-ayur-gold hover:bg-ayur-forest-dark/50 transition-all"
                  aria-label="Account menu"
                >
                  <User className="w-5 h-5" />
                  <ChevronDown className="w-3.5 h-3.5 transition-transform" style={{ transform: isAccountOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
                </button>
                {isAccountOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 top-full mt-3 w-52 bg-ayur-charcoal/98 backdrop-blur-2xl rounded-2xl shadow-luxury border border-ayur-gold/20 py-2 z-50"
                  >
                    <Link
                      href="/account"
                      className="block px-4 py-2.5 text-xs text-ayur-cream hover:bg-ayur-forest-dark hover:text-ayur-gold-light transition-colors"
                      onClick={() => setIsAccountOpen(false)}
                    >
                      My Account
                    </Link>
                    <Link
                      href="/orders"
                      className="block px-4 py-2.5 text-xs text-ayur-cream hover:bg-ayur-forest-dark hover:text-ayur-gold-light transition-colors"
                      onClick={() => setIsAccountOpen(false)}
                    >
                      My Orders
                    </Link>
                    <Link
                      href="/wishlist"
                      className="block px-4 py-2.5 text-xs text-ayur-cream hover:bg-ayur-forest-dark hover:text-ayur-gold-light transition-colors"
                      onClick={() => setIsAccountOpen(false)}
                    >
                      Wishlist
                    </Link>
                  </motion.div>
                )}
              </div>
            ) : (
              <Link
                href="/account"
                className="hidden sm:inline-flex items-center justify-center px-5 py-2 rounded-xl text-xs font-semibold text-ayur-gold-light bg-ayur-gold/10 border border-ayur-gold/30 hover:bg-ayur-gold/20 hover:border-ayur-gold hover:text-ayur-ivory transition-all duration-300 shadow-[0_0_15px_rgba(201,168,76,0.1)]"
              >
                Sign In
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => openModal('mobile-menu')}
              className="lg:hidden p-2 rounded-xl text-ayur-cream hover:text-ayur-gold hover:bg-ayur-forest-dark/50 transition-colors focus-visible-ring"
              aria-label="Open mobile navigation"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Modal */}
      <AnimatePresence>
        {mobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ayur-void/95 backdrop-blur-xl flex flex-col p-4 md:p-8"
          >
            <div className="flex items-center justify-between pb-4 border-b border-ayur-forest-dark/50 mb-6">
              <span className="font-heading text-lg font-bold text-gradient-gold">Search Products</span>
              <button
                onClick={() => setMobileSearchOpen(false)}
                className="p-2 rounded-xl text-ayur-cream hover:bg-ayur-forest-dark/50"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSearchSubmit} className="mt-8 max-w-xl mx-auto w-full">
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ayur-gold" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search herbs, power combo, spray..."
                  className="w-full pl-12 pr-4 py-4 bg-ayur-charcoal border border-ayur-forest-dark/50 focus:border-ayur-gold rounded-2xl text-base text-ayur-ivory placeholder-ayur-stone focus:outline-none focus:ring-2 focus:ring-ayur-gold"
                  autoFocus
                />
              </div>

              <div>
                <p className="text-xs uppercase font-bold tracking-wider text-ayur-gold mb-3">Popular Searches</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Vitality Power Combo',
                    'BODY Nutrition (60 Caps)',
                    'STAYMAX+ Delay Spray',
                    'Ashwagandha',
                    'Himalayan Shilajit',
                    'Safed Musli',
                  ].map(term => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => {
                        setSearchQuery(term)
                        handleSearchSubmit(new Event('submit') as unknown as React.FormEvent)
                      }}
                      className="px-4 py-2 rounded-full text-sm font-medium text-ayur-cream bg-ayur-forest-dark border border-ayur-gold/20 hover:border-ayur-gold hover:text-ayur-gold-light transition-all"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex"
          >
            <div
              className="fixed inset-0 bg-ayur-void/90 backdrop-blur-md"
              onClick={closeMobileMenu}
              aria-hidden="true"
            />

            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-xs bg-ayur-void border-r border-ayur-gold/20 p-6 flex flex-col justify-between shadow-luxury z-10"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-ayur-forest-dark/50">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-ayur-gold/15 border border-ayur-gold/30 p-1 flex items-center justify-center">
                    <Image src="/images/logo-dark.png" alt="Logo" width={30} height={30} className="object-contain" />
                  </div>
                  <span className="font-heading text-lg font-bold text-ayur-gold-light">Ayur Veda Global</span>
                </div>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 rounded-xl text-ayur-cream hover:text-ayur-gold hover:bg-ayur-forest-dark/50"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="mt-6 space-y-1.5 flex-1 overflow-y-auto">
                <Link
                  href="/"
                  onClick={closeMobileMenu}
                  className="block px-3 py-3 rounded-xl text-base font-semibold text-ayur-cream hover:bg-ayur-forest-dark/50 hover:text-ayur-gold-light transition-all"
                >
                  Home
                </Link>
                <Link
                  href="/product/vitality-power-combo"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-between px-3 py-3 rounded-xl text-base font-semibold text-ayur-gold-light bg-ayur-gold/10 border border-ayur-gold/30 hover:bg-ayur-gold/20 transition-all"
                >
                  <span>Power Combo</span>
                  <span className="text-[10px] font-bold bg-ayur-gold text-ayur-void px-2 py-0.5 rounded">29% OFF</span>
                </Link>
                <Link
                  href="/shop"
                  onClick={closeMobileMenu}
                  className="block px-3 py-3 rounded-xl text-base font-semibold text-ayur-cream hover:bg-ayur-forest-dark/50 hover:text-ayur-gold-light transition-all"
                >
                  Shop All Products
                </Link>
                <Link
                  href="/shop?category=supplements"
                  onClick={closeMobileMenu}
                  className="block px-3 py-3 rounded-xl text-base font-semibold text-ayur-cream hover:bg-ayur-forest-dark/50 hover:text-ayur-gold-light transition-all"
                >
                  Herbal Supplements
                </Link>
                <Link
                  href="/shop?category=personal-care"
                  onClick={closeMobileMenu}
                  className="block px-3 py-3 rounded-xl text-base font-semibold text-ayur-cream hover:bg-ayur-forest-dark/50 hover:text-ayur-gold-light transition-all"
                >
                  Personal Care & Sprays
                </Link>
                <Link
                  href="/faq"
                  onClick={closeMobileMenu}
                  className="block px-3 py-3 rounded-xl text-base font-semibold text-ayur-cream hover:bg-ayur-forest-dark/50 hover:text-ayur-gold-light transition-all"
                >
                  Frequently Asked Questions
                </Link>
                <a
                  href="https://wa.me/919123485451?text=Hi%20Ayur%20Veda%20Global%2C%20I%20would%20like%20to%20consult%20with%20an%20Ayurvedic%20doctor."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-between px-3 py-3 rounded-xl text-base font-semibold text-emerald-300 bg-emerald-950/40 border border-emerald-500/30 hover:bg-emerald-950/70 transition-all"
                >
                  <span>Doctor Consultation</span>
                  <span className="text-[10px] font-bold bg-emerald-500 text-black px-2 py-0.5 rounded">BAMS Vaidya</span>
                </a>
                <Link
                  href="/about"
                  onClick={closeMobileMenu}
                  className="block px-3 py-3 rounded-xl text-base font-semibold text-ayur-cream hover:bg-ayur-forest-dark/50 hover:text-ayur-gold-light transition-all"
                >
                  Our Heritage & Quality
                </Link>
                <Link
                  href="/contact"
                  onClick={closeMobileMenu}
                  className="block px-3 py-3 rounded-xl text-base font-semibold text-ayur-cream hover:bg-ayur-forest-dark/50 hover:text-ayur-gold-light transition-all"
                >
                  Contact & WhatsApp Desk
                </Link>
                <Link
                  href="/faq"
                  onClick={closeMobileMenu}
                  className="block px-3 py-3 rounded-xl text-base font-semibold text-ayur-cream hover:bg-ayur-forest-dark/50 hover:text-ayur-gold-light transition-all"
                >
                  FAQs
                </Link>
              </nav>

              {/* Footer in Drawer */}
              <div className="pt-4 border-t border-ayur-forest-dark/50 space-y-3">
                <a
                  href="https://wa.me/919123485451?text=Hi%20Ayur%20Veda%20Global%2C%20I%20have%20an%20enquiry."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-ayur-sage hover:bg-ayur-sage-light text-ayur-void font-bold text-xs shadow-lg transition-all"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Consult on WhatsApp</span>
                </a>

                {isAuthenticated ? (
                  <Link
                    href="/account"
                    onClick={closeMobileMenu}
                    className="block text-center py-2 text-xs font-semibold text-ayur-cream hover:text-ayur-gold-light"
                  >
                    My Account / Orders
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    onClick={closeMobileMenu}
                    className="block text-center py-3 rounded-xl border border-ayur-gold/40 text-xs font-bold text-ayur-gold-light hover:bg-ayur-gold/10"
                  >
                    Sign In to Your Account
                  </Link>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}