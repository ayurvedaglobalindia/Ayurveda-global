'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Search, ShoppingBag, Heart, User, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { classNames } from '@/lib/utils/formatters'
import { Button } from '@/components/ui/Button'
import { Drawer } from '@/components/ui/Drawer'
import { Modal } from '@/components/ui/Modal'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { useUserStore } from '@/store/userStore'
import { useUIStore } from '@/store/uiStore'
import { Logo } from '@/components/ui/Logo'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { items: cartItems, getItemCount } = useCartStore()
  const { getItemCount: getWishlistCount } = useWishlistStore()
  const { user, isAuthenticated } = useUserStore()
  const { openModal, closeModal, isCartDrawerOpen, isWishlistDrawerOpen, isMobileMenuOpen, isSearchOpen, toggleSearch, closeSearch, closeMobileMenu } = useUIStore()

  const cartCount = getItemCount()
  const wishlistCount = getWishlistCount()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={classNames(
      'w-full transition-all duration-300',
      isScrolled ? 'bg-ayur-cream/98 backdrop-blur-md shadow-soft border-b border-ayur-sand/50' : 'bg-ayur-cream/95 backdrop-blur-sm border-b border-ayur-sand/40'
    )}>
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          <Link href="/" className="flex items-center gap-3 flex-shrink-0" aria-label="Ayur Veda Global Home">
            <Logo variant="header" animate />
          </Link>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-ayur-forest" aria-label="Main Navigation">
            <Link href="/shop" className="hover:text-ayur-gold transition-colors py-1">Shop All</Link>
            <Link href="/shop?category=supplements" className="hover:text-ayur-gold transition-colors py-1">Supplements</Link>
            <Link href="/shop?category=personal-care" className="hover:text-ayur-gold transition-colors py-1">Personal Care</Link>
            <Link href="/about" className="hover:text-ayur-gold transition-colors py-1">Our Heritage</Link>
            <Link href="/contact" className="hover:text-ayur-gold transition-colors py-1">Contact</Link>
          </nav>

          <div className="flex-1 max-w-md hidden md:block">
            <form role="search" onSubmit={e => { e.preventDefault(); if (searchQuery.trim()) { window.location.href = `/shop?q=${encodeURIComponent(searchQuery.trim())}`; } }} className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ayur-stone" aria-hidden="true" />
              <input
                type="search"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search herbs, wellness, solutions..."
                className="w-full pl-11 pr-4 py-2 bg-ayur-beige/80 border border-ayur-sand/60 rounded-full text-sm text-ayur-black placeholder-ayur-stone focus:outline-none focus:ring-2 focus:ring-ayur-gold focus:bg-white transition-all duration-300"
                aria-label="Search products"
              />
            </form>
          </div>

          <div className="flex items-center gap-1 md:gap-2">
            <button
              onClick={toggleSearch}
              className="p-2 md:hidden rounded-full text-ayur-forest hover:bg-ayur-beige transition-all duration-300 focus-visible-ring"
              aria-label="Search products"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => openModal('wishlist')}
              className="relative p-2 md:p-2.5 rounded-full text-ayur-forest hover:bg-ayur-beige hover:text-ayur-crimson transition-all duration-300 focus-visible-ring group"
              aria-label={`Wishlist, ${wishlistCount} items`}
            >
              <Heart className="w-5 h-5 md:w-5.5 md:h-5.5 transition-transform group-hover:scale-110" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-ayur-crimson text-white text-xs font-medium flex items-center justify-center animate-scale-in">
                  {wishlistCount > 99 ? '99+' : wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={() => openModal('cart')}
              className="relative p-2 md:p-2.5 rounded-full text-ayur-forest hover:bg-ayur-beige hover:text-ayur-crimson transition-all duration-300 focus-visible-ring group"
              aria-label={`Cart, ${cartCount} items`}
            >
              <ShoppingBag className="w-5 h-5 md:w-5.5 md:h-5.5 transition-transform group-hover:scale-110" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-ayur-gold text-ayur-black text-xs font-medium flex items-center justify-center animate-scale-in">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  className="flex items-center gap-2 p-2 md:p-2.5 rounded-full text-ayur-forest hover:bg-ayur-beige transition-all duration-300 focus-visible-ring"
                  aria-label="Account menu"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <User className="w-5 h-5 md:w-5.5 md:h-5.5" />
                  <ChevronDown className="w-4 h-4 md:w-4.5 md:h-4.5 transition-transform" />
                </button>
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="absolute right-0 top-full mt-3 w-56 bg-white rounded-2xl shadow-strong border border-ayur-sand/50 py-2 overflow-hidden"
                  >
                    <Link href="/account" className="block px-4 py-3 text-sm text-ayur-forest hover:bg-ayur-beige transition-colors">My Account</Link>
                    <Link href="/orders" className="block px-4 py-3 text-sm text-ayur-forest hover:bg-ayur-beige transition-colors">My Orders</Link>
                    <Link href="/wishlist" className="block px-4 py-3 text-sm text-ayur-forest hover:bg-ayur-beige transition-colors">Wishlist</Link>
                    <hr className="my-2 border-ayur-sand/50" />
                    <button className="block w-full text-left px-4 py-3 text-sm text-ayur-crimson hover:bg-ayur-beige transition-colors">Logout</button>
                  </motion.div>
                </AnimatePresence>
              </div>
            ) : (
              <Link href="/login" className="px-4 py-2 md:px-5 md:py-2.5 rounded-full text-ayur-forest hover:bg-ayur-beige hover:text-ayur-crimson transition-all duration-300 font-medium focus-visible-ring hidden sm:block">
                Sign In
              </Link>
            )}

            <button
              onClick={() => openModal('mobile-menu')}
              className="md:hidden p-2 rounded-lg text-ayur-forest hover:bg-ayur-beige transition-all duration-300 focus-visible-ring"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <MobileSearchModal isOpen={isSearchOpen} onClose={closeSearch} />
      <MobileMenuDrawer isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
    </header>
  )
}

function MobileSearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('')

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onClose()
      window.location.href = `/shop?q=${encodeURIComponent(query.trim())}`
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Search Products & Wisdom"
      size="full"
      showCloseButton
    >
      <form onSubmit={handleSearchSubmit} className="w-full max-w-xl mx-auto">
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-ayur-stone" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search products, herbs, wellness..."
            className="w-full pl-12 pr-4 py-4 bg-ayur-beige border-0 rounded-xl text-lg text-ayur-black placeholder-ayur-stone focus:outline-none focus:ring-2 focus:ring-ayur-gold"
            aria-label="Search products"
            autoFocus
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {['Vitality Power Combo', 'BODY Nutrition', 'STAYMAX+ Delay Spray', 'Ashwagandha', 'Purified Shilajit', 'Rasayana'].map(term => (
            <button
              key={term}
              type="button"
              onClick={() => {
                setQuery(term)
                onClose()
                window.location.href = `/shop?q=${encodeURIComponent(term)}`
              }}
              className="px-4 py-2 bg-white border border-ayur-sand rounded-full text-sm font-medium text-ayur-forest hover:bg-ayur-beige hover:border-ayur-gold transition-all duration-300"
            >
              {term}
            </button>
          ))}
        </div>
      </form>
    </Modal>
  )
}

function MobileMenuDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { user, isAuthenticated } = useUserStore()

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Menu" position="left" size="lg">
      <nav className="space-y-1">
        <Link href="/" className="block px-4 py-3 text-ayur-forest hover:bg-ayur-beige rounded-lg transition-all duration-300 font-medium" onClick={onClose}>Home</Link>
        <Link href="/shop" className="block px-4 py-3 text-ayur-forest hover:bg-ayur-beige rounded-lg transition-all duration-300 font-medium" onClick={onClose}>Shop</Link>
        <Link href="/categories" className="block px-4 py-3 text-ayur-forest hover:bg-ayur-beige rounded-lg transition-all duration-300 font-medium" onClick={onClose}>Categories</Link>
        <Link href="/about" className="block px-4 py-3 text-ayur-forest hover:bg-ayur-beige rounded-lg transition-all duration-300 font-medium" onClick={onClose}>About Us</Link>
        <Link href="/contact" className="block px-4 py-3 text-ayur-forest hover:bg-ayur-beige rounded-lg transition-all duration-300 font-medium" onClick={onClose}>Contact</Link>
        <Link href="/faq" className="block px-4 py-3 text-ayur-forest hover:bg-ayur-beige rounded-lg transition-all duration-300 font-medium" onClick={onClose}>FAQ</Link>
        <hr className="my-4 border-ayur-sand/50" />
        {isAuthenticated ? (
          <>
            <Link href="/account" className="block px-4 py-3 text-ayur-forest hover:bg-ayur-beige rounded-lg transition-all duration-300 font-medium" onClick={onClose}>My Account</Link>
            <Link href="/orders" className="block px-4 py-3 text-ayur-forest hover:bg-ayur-beige rounded-lg transition-all duration-300 font-medium" onClick={onClose}>My Orders</Link>
            <Link href="/wishlist" className="block px-4 py-3 text-ayur-forest hover:bg-ayur-beige rounded-lg transition-all duration-300 font-medium" onClick={onClose}>Wishlist</Link>
          </>
        ) : (
          <Link href="/login" className="block px-4 py-3 text-ayur-forest hover:bg-ayur-beige rounded-lg transition-all duration-300 font-medium" onClick={onClose}>Sign In</Link>
        )}
      </nav>
    </Drawer>
  )
}