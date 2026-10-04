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
import { getCategories, getAllProducts, getProductImage } from '@/lib/products/registry'
import { formatINR } from '@/lib/utils/formatters'
import type { Product } from '@/types'

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
    openSearch,
    toggleSearch,
    closeSearch,
    closeMobileMenu,
    showToast,
  } = useUIStore()

  const isSearchActive = isSearchOpen || mobileSearchOpen

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

  const allProductsList = getAllProducts()

  const liveMatchingProducts = searchQuery.trim()
    ? allProductsList.filter(p => {
        const q = searchQuery.toLowerCase().trim()
        const text = [
          p.name,
          p.tagline,
          p.description,
          p.shortDescription || '',
          p.category,
          ...(p.tags || []),
          ...(p.ingredients || []),
        ].join(' ').toLowerCase()
        return text.includes(q)
      })
    : []

  const executeSearch = (query: string) => {
    const q = query.trim()
    if (q) {
      router.push(`/shop?q=${encodeURIComponent(q)}`)
      setSearchQuery('')
      setIsSearchExpanded(false)
      setMobileSearchOpen(false)
      closeSearch()
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    executeSearch(searchQuery)
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
          ? 'bg-[#0B150F]/95 backdrop-blur-2xl border-b border-[#C2A265]/20 shadow-2xl'
          : 'bg-[#0B150F]/85 backdrop-blur-xl border-b border-[#C2A265]/15'
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
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <Image
                src="/images/brand-logo.png"
                alt="Ayur Veda Global"
                width={34}
                height={34}
                className="object-contain filter drop-shadow-[0_2px_6px_rgba(194,162,101,0.25)]"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-sm sm:text-base md:text-lg font-normal tracking-tight text-[#FAF7EE] group-hover:text-[#D4B678] transition-colors">
                Ayur Veda Global
              </span>
              <span className="text-[7.5px] sm:text-[8.5px] uppercase font-semibold tracking-[0.2em] text-[#C2A265] -mt-0.5">
                Classical Apothecary
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center gap-1 text-sm font-medium text-[#FAF7EE] flex-shrink-0"
            aria-label="Main Navigation"
          >
            <Link
              href="/"
              className="relative px-3.5 py-2 rounded-xl text-[#FAF7EE] hover:text-[#D4B678] hover:bg-[#12241A] transition-all"
            >
              Home
            </Link>

            <Link
              href="/#apothecary"
              className="relative px-3.5 py-2 rounded-xl text-[#FAF7EE] hover:text-[#D4B678] hover:bg-[#12241A] transition-all"
            >
              Formulations
            </Link>

            {/* Shop Mega Menu */}
            <div className="relative" onMouseEnter={() => setIsMegaMenuOpen('shop')} onMouseLeave={() => setIsMegaMenuOpen(null)}>
              <button
                className="flex items-center gap-1 px-3.5 py-2 rounded-xl text-[#FAF7EE] hover:text-[#D4B678] hover:bg-[#12241A] transition-all font-medium"
                aria-haspopup="true"
                aria-expanded={isMegaMenuOpen === 'shop'}
              >
                Catalog
                <ChevronDown className="w-3.5 h-3.5 transition-transform" style={{ transform: isMegaMenuOpen === 'shop' ? 'rotate(180deg)' : 'rotate(0)' }} />
              </button>

              <AnimatePresence>
                {isMegaMenuOpen === 'shop' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 top-full mt-3 w-96 bg-[#102016]/98 backdrop-blur-2xl border border-[#C2A265]/25 rounded-2xl shadow-2xl py-4 z-50"
                    role="menu"
                  >
                    {Object.entries(megaMenuContent).map(([key, content]) => (
                      <div key={key} className="px-4 py-3 border-b border-[#C2A265]/10 last:border-0">
                        <div className="mb-2">
                          <Link href={content.cta.href} className="font-heading font-medium text-[#FAF7EE] text-sm hover:text-[#D4B678] transition-colors">{content.title}</Link>
                          <p className="text-xs text-[#A8A295] mt-0.5">{content.description}</p>
                        </div>
                        <div className="space-y-1.5">
                          {content.items.map((item) => (
                            <Link
                              key={item.label}
                              href={item.href}
                              className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg text-xs text-[#C5BFB3] hover:text-[#FAF7EE] hover:bg-[#142A1D] transition-all"
                            >
                              <span>{item.label}</span>
                              {item.badge && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#C2A265]/15 text-[#D4B678] border border-[#C2A265]/30">
                                  {item.badge}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                    <div className="pt-3 px-4">
                      <Link
                        href="/shop"
                        className="block w-full py-2.5 rounded-xl bg-[#C2A265] text-[#0B150F] text-center font-semibold text-xs tracking-wider uppercase hover:bg-[#D4B678] transition-all shadow-md"
                      >
                        Browse Complete Catalog →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick Links */}
            <Link
              href="/product/vitality-power-combo"
              className="relative px-3.5 py-2 rounded-xl text-[#D4B678] font-medium hover:text-[#FAF7EE] hover:bg-[#142A1D] transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C2A265]" />
              <span>Power Combo</span>
              <span className="text-[10px] bg-[#C2A265]/20 text-[#D4B678] px-2 py-0.5 rounded-full border border-[#C2A265]/40 font-bold">
                29% OFF
              </span>
            </Link>

            <a
              href="https://wa.me/919123485451?text=Hi%20Ayur%20Veda%20Global%2C%20I%20would%20like%20to%20consult%20with%20an%20Ayurvedic%20doctor."
              target="_blank"
              rel="noopener noreferrer"
              className="relative px-3.5 py-1.5 rounded-full text-[#D4B678] bg-[#142A1D] border border-[#C2A265]/35 hover:bg-[#183525] transition-all flex items-center gap-1.5 text-xs font-semibold shadow-sm group"
            >
              <HeartPulse className="w-3.5 h-3.5 text-[#C2A265]" />
              <span>Chief Vaidya Desk</span>
            </a>

            <Link
              href="/about"
              className="relative px-3 py-2 rounded-xl text-[#FAF7EE] hover:text-[#D4B678] hover:bg-[#12241A] transition-all"
            >
              Heritage
            </Link>
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Desktop Search */}
            <div className="hidden md:block relative">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchExpanded(true)}
                  onBlur={() => setTimeout(() => setIsSearchExpanded(false), 250)}
                  placeholder="Search formulations, herbs..."
                  className="w-44 lg:w-56 pl-9 pr-7 py-2 bg-[#12241A] border border-[#C2A265]/30 focus:border-[#C2A265] rounded-full text-xs text-[#FAF7EE] placeholder-[#8A8478] focus:outline-none focus:ring-1 focus:ring-[#C2A265] transition-colors shadow-inner"
                  aria-label="Search products"
                />
                <Search className="absolute left-3 w-4 h-4 text-[#C2A265] pointer-events-none" aria-hidden="true" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 w-4 h-4 text-[#8A8478] hover:text-[#FAF7EE] transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </form>

              {/* Desktop Live Dropdown */}
              <AnimatePresence>
                {isSearchExpanded && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    onMouseDown={(e) => e.preventDefault()}
                    className="absolute right-0 top-full mt-2 w-80 lg:w-96 bg-[#102016]/98 backdrop-blur-2xl rounded-2xl shadow-2xl border border-[#C2A265]/35 p-3.5 z-50 space-y-3"
                  >
                    {searchQuery.trim() ? (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[10px] text-[#A8A295] px-1 uppercase tracking-wider font-semibold">
                          <span>Matching Formulations</span>
                          <span>{liveMatchingProducts.length} Found</span>
                        </div>
                        {liveMatchingProducts.length > 0 ? (
                          <div className="space-y-1.5 max-h-64 overflow-y-auto">
                            {liveMatchingProducts.map(product => {
                              const img = getProductImage(product, product.id)
                              return (
                                <Link
                                  key={product.id}
                                  href={`/product/${product.id}`}
                                  onClick={() => {
                                    setIsSearchExpanded(false)
                                    setSearchQuery('')
                                  }}
                                  className="flex items-center gap-3 p-2 rounded-xl bg-[#0D1B12] hover:bg-[#142A1D] border border-[#C2A265]/15 hover:border-[#C2A265]/40 transition-all group"
                                >
                                  <div className="relative w-10 h-10 rounded-lg bg-[#08120C] border border-[#C2A265]/20 flex-shrink-0 overflow-hidden">
                                    <Image
                                      src={img.src}
                                      alt={product.name}
                                      fill
                                      className="object-contain p-1"
                                      sizes="40px"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-[#FAF7EE] group-hover:text-[#D4B678] truncate leading-tight">
                                      {product.name}
                                    </p>
                                    <span className="text-[10px] text-[#8A8478] block truncate">
                                      {product.category === 'supplements' ? 'Herbal Supplement' : product.category === 'personal-care' ? 'Personal Care & Spray' : 'Vitality Power Combo'}
                                    </span>
                                  </div>
                                  <span className="text-xs font-semibold text-[#D4B678] flex-shrink-0">
                                    {formatINR(product.price)}
                                  </span>
                                </Link>
                              )
                            })}
                          </div>
                        ) : (
                          <div className="p-3 text-center rounded-xl bg-[#0D1B12] text-xs text-[#8A8478]">
                            No formulation matching &ldquo;{searchQuery}&rdquo;.
                          </div>
                        )}
                        <button
                          onClick={() => executeSearch(searchQuery)}
                          className="w-full py-2 px-3 rounded-xl bg-[#142A1D] hover:bg-[#183525] border border-[#C2A265]/35 text-[#FAF7EE] text-xs font-medium transition-all text-center flex items-center justify-center gap-1.5"
                        >
                          <span>View all results in Shop</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#C2A265]" />
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between text-[10px] text-[#C2A265] uppercase tracking-wider font-semibold px-1">
                          <span className="flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            Popular Searches
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {[
                            'Vitality Power Combo',
                            'BODY Essential Nutrition',
                            'STAYMAX+ Delay Spray',
                            'Himalayan Shilajit',
                            'Ashwagandha',
                            'Safed Musli',
                          ].map(term => (
                            <button
                              key={term}
                              type="button"
                              onClick={() => executeSearch(term)}
                              className="px-2.5 py-1 rounded-full text-[11px] font-medium text-[#FAF7EE] bg-[#0D1B12] hover:bg-[#183525] border border-[#C2A265]/25 hover:border-[#C2A265] transition-all"
                            >
                              {term}
                            </button>
                          ))}
                        </div>
                        <div className="pt-2 border-t border-[#C2A265]/15">
                          <Link
                            href="/shop"
                            onClick={() => setIsSearchExpanded(false)}
                            className="block w-full py-2 rounded-xl bg-[#142A1D] hover:bg-[#183525] text-center text-xs font-semibold text-[#D4B678] border border-[#C2A265]/30 transition-all"
                          >
                            Browse All 3 Master Formulations →
                          </Link>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Search Button */}
            <button
              onClick={() => openSearch()}
              className="p-2 md:hidden rounded-xl text-ayur-cream hover:text-ayur-gold hover:bg-ayur-forest-dark/50 transition-colors focus-visible-ring"
              aria-label="Search products"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-2 rounded-xl text-[#FAF7EE] hover:text-[#D4B678] hover:bg-[#12241A] transition-colors focus-visible-ring group"
              aria-label={isMounted ? `Wishlist, ${wishlistCount} items` : 'Wishlist'}
            >
              <Heart className="w-5 h-5 transition-transform group-hover:scale-110" />
              {isMounted && wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-[#8B0000] text-[#FAF7EE] text-[10px] font-bold flex items-center justify-center shadow-md animate-scale-in">
                  {wishlistCount > 99 ? '99+' : wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={openCartDrawer}
              className="relative p-2 rounded-xl text-[#FAF7EE] hover:text-[#D4B678] hover:bg-[#12241A] transition-colors focus-visible-ring group"
              aria-label={isMounted ? `Cart, ${cartCount} items` : 'Cart'}
            >
              <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110 text-[#C2A265]" />
              {isMounted && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#C2A265] text-[#0B150F] text-[10px] font-bold flex items-center justify-center shadow-md animate-scale-in">
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
                    <button
                      onClick={() => {
                        useUserStore.getState().logout()
                        setIsAccountOpen(false)
                        showToast({ type: 'info', title: 'Signed Out' })
                      }}
                      className="block w-full text-left px-4 py-2 text-xs text-rose-300 hover:bg-rose-950/30 transition-colors border-t border-ayur-forest-dark/50"
                    >
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <button
                onClick={() => openModal('auth-gate')}
                className="hidden sm:inline-flex items-center justify-center px-4 py-1.5 rounded-xl text-xs font-semibold text-ayur-gold-light bg-ayur-gold/10 border border-ayur-gold/30 hover:bg-ayur-gold/20 hover:border-ayur-gold hover:text-ayur-ivory transition-all duration-300 shadow-[0_0_15px_rgba(201,168,76,0.1)]"
              >
                Sign In
              </button>
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
        {isSearchActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#070E0A]/95 backdrop-blur-2xl flex flex-col p-4 md:p-8"
          >
            <div className="flex items-center justify-between pb-3.5 border-b border-[#C2A265]/25 mb-4">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-[#C2A265]" />
                <span className="font-heading text-base sm:text-lg font-medium text-[#FAF7EE]">
                  Search Apothecary
                </span>
              </div>
              <button
                onClick={() => {
                  setMobileSearchOpen(false)
                  closeSearch()
                }}
                className="p-2 rounded-xl text-[#FAF7EE] hover:bg-[#12241A] transition-colors"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSearchSubmit} className="mt-4 max-w-xl mx-auto w-full">
              <div className="relative mb-5">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C2A265]" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search formulations, Shilajit, Delay Spray, capsules..."
                  className="w-full pl-12 pr-10 py-3.5 bg-[#102016] border border-[#C2A265]/35 focus:border-[#C2A265] rounded-2xl text-sm sm:text-base text-[#FAF7EE] placeholder-[#8A8478] focus:outline-none focus:ring-2 focus:ring-[#C2A265] transition-all shadow-inner"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-[#8A8478] hover:text-[#FAF7EE]"
                    aria-label="Clear search query"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* If user typed, show live matching products */}
              {searchQuery.trim() && (
                <div className="mb-6 space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#A8A295] px-1 uppercase tracking-wider font-semibold">
                    <span>Matching Formulations</span>
                    <span>{liveMatchingProducts.length} Found</span>
                  </div>
                  {liveMatchingProducts.length > 0 ? (
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {liveMatchingProducts.map(product => {
                        const img = getProductImage(product, product.id)
                        return (
                          <Link
                            key={product.id}
                            href={`/product/${product.id}`}
                            onClick={() => {
                              setMobileSearchOpen(false)
                              closeSearch()
                              setSearchQuery('')
                            }}
                            className="flex items-center gap-3 p-2.5 rounded-xl bg-[#102016] border border-[#C2A265]/20 hover:border-[#C2A265]/50 transition-all"
                          >
                            <div className="relative w-11 h-11 rounded-lg bg-[#08120C] border border-[#C2A265]/20 flex-shrink-0 overflow-hidden">
                              <Image
                                src={img.src}
                                alt={product.name}
                                fill
                                className="object-contain p-1"
                                sizes="44px"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-[#FAF7EE] truncate leading-tight">
                                {product.name}
                              </p>
                              <span className="text-[10px] text-[#A8A295] block truncate mt-0.5">
                                {product.tagline}
                              </span>
                            </div>
                            <span className="text-xs font-semibold text-[#D4B678] flex-shrink-0">
                              {formatINR(product.price)}
                            </span>
                          </Link>
                        )
                      })}
                    </div>
                  ) : (
                    <p className="text-xs text-[#8A8478] p-3 text-center bg-[#102016] rounded-xl border border-[#C2A265]/15">
                      No formulation matching &ldquo;{searchQuery}&rdquo;.
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => executeSearch(searchQuery)}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#C2A265] text-[#0B150F] text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <span>View all matching results in Shop</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <div>
                <p className="text-xs uppercase font-bold tracking-wider text-[#C2A265] mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Popular Formulations
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Vitality Power Combo',
                    'BODY Essential Nutrition',
                    'STAYMAX+ Delay Spray',
                    'Himalayan Shilajit',
                    'Ashwagandha',
                    'Safed Musli',
                  ].map(term => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => executeSearch(term)}
                      className="px-3.5 py-1.5 rounded-full text-xs font-medium text-[#FAF7EE] bg-[#12241A] border border-[#C2A265]/25 hover:border-[#C2A265] hover:text-[#D4B678] transition-all"
                    >
                      {term}
                    </button>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-[#C2A265]/15">
                  <Link
                    href="/shop"
                    onClick={() => {
                      setMobileSearchOpen(false)
                      closeSearch()
                    }}
                    className="block w-full py-2.5 rounded-xl bg-[#142A1D] border border-[#C2A265]/35 text-[#D4B678] text-center text-xs font-semibold hover:bg-[#183525] transition-all"
                  >
                    Browse All 3 Master Formulations in Shop →
                  </Link>
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
                  <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center flex-shrink-0">
                    <Image src="/images/brand-logo.png" alt="Ayur Veda Global Logo" width={32} height={32} className="object-contain filter drop-shadow-[0_2px_8px_rgba(194,162,101,0.25)]" />
                  </div>
                  <span className="font-heading text-lg font-normal text-[#FAF7EE]">Ayur Veda Global</span>
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
                  Contact &amp; WhatsApp Desk
                </Link>
                <Link
                  href="/track-order"
                  onClick={closeMobileMenu}
                  className="block px-3 py-3 rounded-xl text-base font-semibold text-ayur-cream hover:bg-ayur-forest-dark/50 hover:text-ayur-gold-light transition-all"
                >
                  Track Your Order
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
                    href="/account"
                    onClick={closeMobileMenu}
                    className="block text-center py-3 rounded-xl border border-ayur-gold/40 text-xs font-bold text-ayur-gold-light hover:bg-ayur-gold/10"
                  >
                    Sign In / Account
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