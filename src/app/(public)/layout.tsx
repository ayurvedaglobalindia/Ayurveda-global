"use client";

import { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF7F2] text-[#1C1D1F] selection:bg-[#EAE4DC] selection:text-[#1C1D1F] relative overflow-x-hidden w-full max-w-full">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 w-full">
        <AnnouncementBar />
        <Header />
      </div>

      {/* Main Content */}
      <main className="flex-1 bg-[#FAF7F2] relative z-10 pb-20 md:pb-0">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />

      {/* Footer */}
      <Footer />
    </div>
  );
}
