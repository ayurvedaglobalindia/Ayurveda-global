'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Menu,
  Search,
  ShoppingBag,
  Heart,
  User,
  ChevronDown,
  Sparkles,
  HeartPulse,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { useUserStore } from '@/store/userStore'
import { useUIStore } from '@/store/uiStore'

export function Header() {
  const [isMounted, setIsMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isAccountOpen, setIsAccountOpen] = useState(false)
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState<string | null>(null)

  const { getItemCount } = useCartStore()
  const { getItemCount: getWishlistCount } = useWishlistStore()
  const { isAuthenticated } = useUserStore()
  const {
    openModal,
    openCartDrawer,
    openSearch,
    showToast,
  } = useUIStore()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const cartCount = getItemCount()
  const wishlistCount = getWishlistCount()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const megaMenuContent = {
    supplements: {
      title: 'Herbal Supplements',
      description: 'Daily stamina, physical strength & holistic revitalization',
      items: [
        { label: 'BODY Essential Nutrition (60 Caps)', href: '/product/body-essential-nutrition', badge: 'Bestseller' },
        { label: 'Pure Himalayan Shilajit Resin (20g)', href: '/product/himalayan-shilajit-resin', badge: 'Gold Grade' },
        { label: 'KSM-66 Organic Ashwagandha (600mg)', href: '/product/ksm66-ashwagandha-root-extract', badge: 'Pure Extract' },
        { label: 'All Supplements', href: '/shop?category=supplements', badge: '' },
      ],
      cta: { label: 'View All Supplements', href: '/shop?category=supplements' },
    },
    'personal-care': {
      title: "Men's Personal Care",
      description: 'Topical endurance, long-lasting performance & intimate wellness',
      items: [
        { label: 'STAYMAX+ Delay Spray (30ml)', href: '/product/staymax-delay-spray', badge: 'Fast Action' },
        { label: 'Vajikara Gold Vitality Oil (50ml)', href: '/product/vajikara-gold-vitality-oil', badge: '7-Day Taila' },
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
            <div
              className="relative"
              onMouseEnter={() => setIsMegaMenuOpen('shop')}
              onMouseLeave={() => setIsMegaMenuOpen(null)}
            >
              <button
                className="flex items-center gap-1 px-3.5 py-2 rounded-xl text-[#FAF7EE] hover:text-[#D4B678] hover:bg-[#12241A] transition-all font-medium"
                aria-haspopup="true"
                aria-expanded={isMegaMenuOpen === 'shop'}
              >
                Catalog
                <ChevronDown
                  className="w-3.5 h-3.5 transition-transform"
                  style={{ transform: isMegaMenuOpen === 'shop' ? 'rotate(180deg)' : 'rotate(0)' }}
                />
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
                          <Link
                            href={content.cta.href}
                            className="font-heading font-medium text-[#FAF7EE] text-sm hover:text-[#D4B678] transition-colors"
                          >
                            {content.title}
                          </Link>
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

            {/* Power Combo Quick Link */}
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

            {/* Doctor Desk Link */}
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
            {/* Desktop Search Button Trigger (Zero Layout Breaking) */}
            <button
              type="button"
              onClick={() => openSearch()}
              className="hidden md:flex items-center gap-2.5 w-44 lg:w-56 pl-3.5 pr-2.5 py-2 bg-[#12241A] hover:bg-[#163022] border border-[#C2A265]/30 hover:border-[#C2A265]/60 rounded-full text-xs text-[#8A8478] hover:text-[#FAF7EE] transition-all shadow-inner group"
              aria-label="Search formulations and herbs"
            >
              <Search className="w-3.5 h-3.5 text-[#C2A265] group-hover:scale-110 transition-transform" />
              <span className="truncate">Search formulations...</span>
              <kbd className="ml-auto hidden lg:inline-flex items-center text-[10px] font-mono text-[#C2A265]/80 bg-[#08120C] px-1.5 py-0.5 rounded border border-[#C2A265]/25">
                ⌘K
              </kbd>
            </button>

            {/* Mobile Search Button */}
            <button
              type="button"
              onClick={() => openSearch()}
              className="p-2 md:hidden rounded-xl text-ayur-cream hover:text-ayur-gold hover:bg-ayur-forest-dark/50 transition-colors focus-visible-ring"
              aria-label="Search formulations"
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
              type="button"
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
                  type="button"
                  onClick={() => setIsAccountOpen(!isAccountOpen)}
                  className="flex items-center gap-1.5 p-2 rounded-xl text-ayur-cream hover:text-ayur-gold hover:bg-ayur-forest-dark/50 transition-all"
                  aria-label="Account menu"
                >
                  <User className="w-5 h-5" />
                  <ChevronDown
                    className="w-3.5 h-3.5 transition-transform"
                    style={{ transform: isAccountOpen ? 'rotate(180deg)' : 'rotate(0)' }}
                  />
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
                      type="button"
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
                type="button"
                onClick={() => openModal('auth-gate')}
                className="hidden sm:inline-flex items-center justify-center px-4 py-1.5 rounded-xl text-xs font-semibold text-ayur-gold-light bg-ayur-gold/10 border border-ayur-gold/30 hover:bg-ayur-gold/20 hover:border-ayur-gold hover:text-ayur-ivory transition-all duration-300 shadow-[0_0_15px_rgba(201,168,76,0.1)]"
              >
                Sign In
              </button>
            )}

            {/* Mobile Menu Button (Triggers Global MobileMenuDrawer) */}
            <button
              type="button"
              onClick={() => openModal('mobile-menu')}
              className="lg:hidden p-2 rounded-xl text-ayur-cream hover:text-ayur-gold hover:bg-ayur-forest-dark/50 transition-colors focus-visible-ring"
              aria-label="Open mobile navigation"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}