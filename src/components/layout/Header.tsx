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

  return (
    <header
      className={`w-full transition-all duration-200 z-50 ${
        isScrolled
          ? 'bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E2DDD5] shadow-sm'
          : 'bg-[#FAF7F2] border-b border-[#E2DDD5]'
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-4">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 flex-shrink-0 group py-1"
            aria-label="Ayur Veda Global Home"
          >
            <div className="relative w-8 h-8 flex items-center justify-center flex-shrink-0">
              <Image
                src="/images/brand-logo.png"
                alt="Ayur Veda Global"
                width={32}
                height={32}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-base sm:text-lg font-medium tracking-tight text-[#1C1D1F] transition-colors">
                Ayur Veda Global
              </span>
              <span className="text-[9px] uppercase tracking-[0.16em] font-medium text-[#737373] -mt-0.5 font-sans">
                Classical Apothecary
              </span>
            </div>
          </Link>

          {/* Clean Desktop Navigation: Shop → Collections → About → FAQ → Contact */}
          <nav
            className="hidden md:flex items-center gap-6 text-sm font-medium text-[#1C1D1F]"
            aria-label="Main Navigation"
          >
            <Link
              href="/shop"
              className="text-[#1C1D1F] hover:text-[#9E8047] transition-colors font-sans text-xs tracking-wider uppercase"
            >
              Shop
            </Link>

            <Link
              href="/categories"
              className="text-[#1C1D1F] hover:text-[#9E8047] transition-colors font-sans text-xs tracking-wider uppercase"
            >
              Collections
            </Link>

            <Link
              href="/about"
              className="text-[#1C1D1F] hover:text-[#9E8047] transition-colors font-sans text-xs tracking-wider uppercase"
            >
              About
            </Link>

            <Link
              href="/faq"
              className="text-[#1C1D1F] hover:text-[#9E8047] transition-colors font-sans text-xs tracking-wider uppercase"
            >
              FAQ
            </Link>

            <Link
              href="/contact"
              className="text-[#1C1D1F] hover:text-[#9E8047] transition-colors font-sans text-xs tracking-wider uppercase"
            >
              Contact
            </Link>
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Desktop Search Button Trigger */}
            <button
              type="button"
              onClick={() => openSearch()}
              className="hidden md:flex items-center gap-2 w-44 lg:w-48 pl-3 pr-2 py-1.5 bg-[#FFFFFF] border border-[#E2DDD5] hover:border-[#1C1D1F] rounded-full text-xs text-[#737373] hover:text-[#1C1D1F] transition-colors"
              aria-label="Search formulations"
            >
              <Search className="w-3.5 h-3.5 text-[#737373]" />
              <span className="truncate">Search catalog...</span>
              <kbd className="ml-auto hidden lg:inline-flex items-center text-[9px] font-mono text-[#737373] bg-[#F4EFEA] px-1.5 py-0.5 rounded border border-[#E2DDD5]">
                ⌘K
              </kbd>
            </button>

            {/* Mobile Search Button */}
            <button
              type="button"
              onClick={() => openSearch()}
              className="p-2 md:hidden rounded-lg text-[#1C1D1F] hover:text-[#9E8047] transition-colors"
              aria-label="Search formulations"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-2 rounded-lg text-[#1C1D1F] hover:text-[#9E8047] transition-colors"
              aria-label={isMounted ? `Wishlist, ${wishlistCount} items` : 'Wishlist'}
            >
              <Heart className="w-4.5 h-4.5" />
              {isMounted && wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#9E2A2B] text-[#FAF7F2] text-[9px] font-bold flex items-center justify-center">
                  {wishlistCount > 99 ? '99+' : wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              type="button"
              onClick={openCartDrawer}
              className="relative p-2 rounded-lg text-[#1C1D1F] hover:text-[#9E8047] transition-colors"
              aria-label={isMounted ? `Cart, ${cartCount} items` : 'Cart'}
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              {isMounted && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#1C1D1F] text-[#FAF7F2] text-[9px] font-bold flex items-center justify-center">
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
                  className="flex items-center gap-1 p-2 rounded-lg text-[#1C1D1F] hover:text-[#9E8047] transition-colors"
                  aria-label="Account menu"
                >
                  <User className="w-4.5 h-4.5" />
                  <ChevronDown
                    className="w-3 h-3 transition-transform"
                    style={{ transform: isAccountOpen ? 'rotate(180deg)' : 'rotate(0)' }}
                  />
                </button>
                {isAccountOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-[#FFFFFF] rounded-xl shadow-lg border border-[#E2DDD5] py-1.5 z-50 text-xs"
                  >
                    <Link
                      href="/account"
                      className="block px-4 py-2 text-[#1C1D1F] hover:bg-[#F4EFEA] transition-colors"
                      onClick={() => setIsAccountOpen(false)}
                    >
                      Account Details
                    </Link>
                    <Link
                      href="/orders"
                      className="block px-4 py-2 text-[#1C1D1F] hover:bg-[#F4EFEA] transition-colors"
                      onClick={() => setIsAccountOpen(false)}
                    >
                      Orders &amp; Shipments
                    </Link>
                    <Link
                      href="/wishlist"
                      className="block px-4 py-2 text-[#1C1D1F] hover:bg-[#F4EFEA] transition-colors"
                      onClick={() => setIsAccountOpen(false)}
                    >
                      Saved Formulations
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        useUserStore.getState().logout()
                        setIsAccountOpen(false)
                        showToast({ type: 'info', title: 'Signed Out' })
                      }}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors border-t border-[#E2DDD5]"
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
                className="hidden sm:inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-medium text-[#1C1D1F] border border-[#1C1D1F] hover:bg-[#1C1D1F] hover:text-[#FAF7F2] transition-colors"
              >
                Sign In
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => openModal('mobile-menu')}
              className="md:hidden p-2 rounded-lg text-[#1C1D1F] hover:text-[#9E8047] transition-colors"
              aria-label="Open mobile navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}