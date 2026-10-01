'use client'

import { ReactNode } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { AnnouncementBar } from '@/components/layout/AnnouncementBar'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'
import { WhatsAppFloatButton } from '@/components/layout/WhatsAppFloatButton'
import { GlobalModals } from '@/components/layout/GlobalModals'
import { AGMascotGuide } from '@/components/mascot/AGMascotGuide'

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-ayur-void text-ayur-cream selection:bg-ayur-gold selection:text-ayur-void relative">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 w-full">
        <AnnouncementBar />
        <Header />
      </div>

      {/* Main Content */}
      <main className="flex-1 bg-ayur-void relative z-10 pb-20 md:pb-0">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />

      {/* Footer */}
      <Footer />

      {/* WhatsApp Float Button (Desktop) */}
      <WhatsAppFloatButton />

      {/* Small Interactive AG Mascot Guide */}
      <AGMascotGuide />

      {/* Global Modals */}
      <GlobalModals />
    </div>
  )
}