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

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { items: cartItems, getItemCount } = useCartStore()
  const { getItemCount: getWishlistCount } = useWishlistStore()
  const { user, isAuthenticated } = useUserStore()
  const { openModal, closeModal, isCartDrawerOpen, isWishlistDrawerOpen, isMobileMenuOpen, isSearchOpen, closeSearch, closeMobileMenu } = useUIStore()

  const cartCount = getItemCount()
  const wishlistCount = getWishlistCount()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={classNames(
      'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-soft' : 'bg-transparent'
    )}>
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0" aria-label="Ayur Veda Global Home">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ayur-forest to-ayur-sage flex items-center justify-center">
              <span className="text-ayur-cream font-heading font-bold text-lg">AV</span>
            </div>
            <span className="font-heading text-xl font-medium text-ayur-black hidden sm:block">Ayur Veda Global</span>
          </Link>

          <div className="flex-1 max-w-xl hidden md:block">
            <form role="search" className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ayur-stone" aria-hidden="true" />
              <input
                type="search"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => openModal('search')}
                placeholder="Search products, herbs, wellness..."
                className="w-full pl-12 pr-4 py-2.5 bg-ayur-cream border-0 rounded-full text-ayur-black placeholder-ayur-stone focus:outline-none focus:ring-2 focus:ring-ayur-gold transition-all"
                aria-label="Search products"
              />
            </form>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => openModal('wishlist')}
              className="relative p-2 rounded-full text-ayur-forest hover:bg-ayur-beige transition-colors focus-visible-ring"
              aria-label={`Wishlist, ${wishlistCount} items`}
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-ayur-copper text-white text-xs font-medium flex items-center justify-center">
                  {wishlistCount > 99 ? '99+' : wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={() => openModal('cart')}
              className="relative p-2 rounded-full text-ayur-forest hover:bg-ayur-beige transition-colors focus-visible-ring"
              aria-label={`Cart, ${cartCount} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-ayur-gold text-ayur-black text-xs font-medium flex items-center justify-center">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  className="flex items-center gap-2 p-2 rounded-full text-ayur-forest hover:bg-ayur-beige transition-colors focus-visible-ring"
                  aria-label="Account menu"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <User className="w-5 h-5" />
                  <ChevronDown className="w-4 h-4" />
                </button>
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-strong border border-ayur-beige py-2"
                  >
                    <Link href="/account" className="block px-4 py-2 text-sm text-ayur-forest hover:bg-ayur-beige">My Account</Link>
                    <Link href="/orders" className="block px-4 py-2 text-sm text-ayur-forest hover:bg-ayur-beige">My Orders</Link>
                    <Link href="/wishlist" className="block px-4 py-2 text-sm text-ayur-forest hover:bg-ayur-beige">Wishlist</Link>
                    <hr className="my-2 border-ayur-beige" />
                    <button className="block w-full text-left px-4 py-2 text-sm text-ayur-copper hover:bg-ayur-beige">Logout</button>
                  </motion.div>
                </AnimatePresence>
              </div>
            ) : (
              <Link href="/login" className="px-4 py-2 rounded-full text-ayur-forest hover:bg-ayur-beige transition-colors font-medium focus-visible-ring hidden sm:block">
                Sign In
              </Link>
            )}

            <button
              onClick={() => openModal('mobile-menu')}
              className="md:hidden p-2 rounded-lg text-ayur-forest hover:bg-ayur-beige transition-colors focus-visible-ring"
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Search"
      size="full"
      showCloseButton
    >
      <form className="w-full max-w-xl mx-auto">
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-ayur-stone" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search products, herbs, wellness..."
            className="w-full pl-12 pr-4 py-4 bg-ayur-cream border-0 rounded-xl text-lg text-ayur-black placeholder-ayur-stone focus:outline-none focus:ring-2 focus:ring-ayur-gold"
            aria-label="Search products"
            autoFocus
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {['Ashwagandha', 'Shatavari', 'Immunity', 'Men\'s Wellness', 'Daily Wellness'].map(term => (
            <button
              key={term}
              type="button"
              onClick={() => setQuery(term)}
              className="px-4 py-2 bg-white border border-ayur-sand rounded-full text-sm text-ayur-forest hover:bg-ayur-beige transition-colors"
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
        <Link href="/" className="block px-4 py-3 text-ayur-forest hover:bg-ayur-beige rounded-lg transition-colors font-medium" onClick={onClose}>Home</Link>
        <Link href="/shop" className="block px-4 py-3 text-ayur-forest hover:bg-ayur-beige rounded-lg transition-colors font-medium" onClick={onClose}>Shop</Link>
        <Link href="/categories" className="block px-4 py-3 text-ayur-forest hover:bg-ayur-beige rounded-lg transition-colors font-medium" onClick={onClose}>Categories</Link>
        <Link href="/about" className="block px-4 py-3 text-ayur-forest hover:bg-ayur-beige rounded-lg transition-colors font-medium" onClick={onClose}>About Us</Link>
        <Link href="/contact" className="block px-4 py-3 text-ayur-forest hover:bg-ayur-beige rounded-lg transition-colors font-medium" onClick={onClose}>Contact</Link>
        <Link href="/faq" className="block px-4 py-3 text-ayur-forest hover:bg-ayur-beige rounded-lg transition-colors font-medium" onClick={onClose}>FAQ</Link>
        <hr className="my-4 border-ayur-beige" />
        {isAuthenticated ? (
          <>
            <Link href="/account" className="block px-4 py-3 text-ayur-forest hover:bg-ayur-beige rounded-lg transition-colors font-medium" onClick={onClose}>My Account</Link>
            <Link href="/orders" className="block px-4 py-3 text-ayur-forest hover:bg-ayur-beige rounded-lg transition-colors font-medium" onClick={onClose}>My Orders</Link>
            <Link href="/wishlist" className="block px-4 py-3 text-ayur-forest hover:bg-ayur-beige rounded-lg transition-colors font-medium" onClick={onClose}>Wishlist</Link>
          </>
        ) : (
          <Link href="/login" className="block px-4 py-3 text-ayur-forest hover:bg-ayur-beige rounded-lg transition-colors font-medium" onClick={onClose}>Sign In</Link>
        )}
      </nav>
    </Drawer>
  )
}