'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { LayoutDashboard, Package, Users, MessageSquare, LogOut, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { classNames } from '@/lib/utils/formatters'
import { Button } from '@/components/ui/Button'
import { Drawer } from '@/components/ui/Drawer'

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth')
    if (auth) {
      setIsAuthenticated(true)
    } else {
      router.push('/admin/login')
    }
    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ayur-cream">
        <div className="w-8 h-8 border-4 border-ayur-forest border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Orders', href: '/admin', icon: Package },
    { name: 'Leads', href: '/admin/leads', icon: MessageSquare },
  ]

  const handleLogout = () => {
    localStorage.removeItem('admin_auth')
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-ayur-cream">
      <Drawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        position="left"
        size="lg"
      >
        <nav className="space-y-1">
          {navigation.map(item => (
            <Link
              key={item.name}
              href={item.href}
              className={classNames(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                pathname === item.href
                  ? 'bg-ayur-forest/10 text-ayur-forest'
                  : 'text-ayur-stone hover:bg-ayur-beige hover:text-ayur-forest'
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          ))}
          <hr className="my-4 border-ayur-beige" />
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-ayur-copper hover:bg-red-50 transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </nav>
      </Drawer>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 bg-white border-b border-ayur-beige">
          <div className="flex items-center justify-between h-16 px-4 lg:px-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg text-ayur-stone hover:text-ayur-forest hover:bg-ayur-beige"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              <Link href="/admin" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-ayur-forest to-ayur-sage flex items-center justify-center">
                  <span className="text-ayur-cream font-heading font-bold text-sm">AV</span>
                </div>
                <span className="font-heading text-lg font-medium text-ayur-black">Admin</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-ayur-stone hidden sm:block">Admin Panel</span>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-1" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}