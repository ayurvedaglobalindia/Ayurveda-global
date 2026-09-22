'use client'

import { ReactNode } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { AnnouncementBar } from '@/components/layout/AnnouncementBar'

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-40 w-full shadow-soft">
        <AnnouncementBar />
        <Header />
      </div>
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}