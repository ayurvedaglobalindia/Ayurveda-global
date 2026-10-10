"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Truck, ShoppingBag, HeartPulse } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useUserStore } from "@/store/userStore";
import { useUIStore } from "@/store/uiStore";
import {
  buildWhatsAppUrl,
  buildVaidyaConsultationMessage,
} from "@/store/whatsappStore";

export function MobileBottomNav() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const { getItemCount: getCartCount } = useCartStore();
  const { user } = useUserStore();
  const { openCartDrawer, openSearch, isSearchOpen } = useUIStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cartCount = getCartCount();

  const handleDoctorWhatsApp = () => {
    const msg = buildVaidyaConsultationMessage();
    window.open(buildWhatsAppUrl(msg), "_blank");
  };

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur-xl border-t border-stone-200/50 px-2 shadow-lg"
      style={{
        height: "calc(68px + env(safe-area-inset-bottom, 8px))",
        paddingBottom: "env(safe-area-inset-bottom, 8px)",
      }}
    >
      <div className="flex items-center justify-around max-w-md mx-auto h-[68px]">
        {/* 1. Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center gap-0.5 text-[10px] transition-colors py-1 px-2 ${
            pathname === "/"
              ? "text-[#1C1D1F] font-semibold"
              : "text-[#737373] hover:text-[#1C1D1F]"
          }`}
          aria-label="Home"
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </Link>

        {/* 2. Live Search Modal */}
        <button
          type="button"
          onClick={openSearch}
          className={`flex flex-col items-center justify-center gap-0.5 text-[10px] transition-colors py-1 px-2 ${
            isSearchOpen
              ? "text-[#1C1D1F] font-semibold"
              : "text-[#737373] hover:text-[#1C1D1F]"
          }`}
          aria-label="Search Formulations"
        >
          <Search className="w-5 h-5" />
          <span>Search</span>
        </button>

        {/* 3. Center Action: Elevated Vaidya Consult with Seamless Rotating Neon Ring */}
        <button
          type="button"
          onClick={handleDoctorWhatsApp}
          className="flex flex-col items-center -translate-y-[18px] text-[#4E5F52] hover:text-[#3D4B40] transition-colors group relative z-50 focus:outline-none"
          aria-label="Consult Chief Vaidya on WhatsApp"
        >
          <div className="relative w-[56px] h-[56px] rounded-full bg-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            {/* Seamless Rotating Neon Ring */}
            <span
              className="absolute inset-0 rounded-full pointer-events-none animate-spin-ring"
              style={{
                border: "2px solid transparent",
                background:
                  "linear-gradient(#fff, #fff) padding-box, conic-gradient(from 0deg, #22c55e, #10b981, transparent 65%, #22c55e) border-box",
                boxShadow: "0 0 10px rgba(34, 197, 94, 0.6)",
                animation: "spinRing 2.5s linear infinite",
              }}
              aria-hidden="true"
            />
            {/* Minimalist Vaidya Consult Heart & ECG Icon */}
            <img
              src="/images/vaidya-icon.svg"
              alt="Vaidya Consult"
              className="w-8 h-8 object-contain relative z-10 drop-shadow-2xs"
            />
          </div>
          <span className="text-[10px] font-semibold text-[#1F3D2B] mt-[4px] tracking-wide leading-none">
            Vaidya Consult
          </span>
        </button>

        {/* 4. Cart */}
        <button
          type="button"
          onClick={openCartDrawer}
          className="flex flex-col items-center justify-center gap-0.5 text-[10px] relative text-[#737373] hover:text-[#1C1D1F] transition-colors py-1 px-2"
          aria-label="Open Shopping Cart"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {isMounted && cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#4E5F52] text-[#FFFFFF] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </div>
          <span>Cart</span>
        </button>

        {/* 5. Track Order */}
        <Link
          href="/track-order"
          className={`flex flex-col items-center justify-center gap-0.5 text-[10px] transition-colors py-1 px-2 ${
            pathname === "/track-order"
              ? "text-[#1C1D1F] font-semibold"
              : "text-[#737373] hover:text-[#1C1D1F]"
          }`}
          aria-label="Track Order Status"
        >
          <Truck className="w-5 h-5" />
          <span>Track</span>
        </Link>
      </div>
    </nav>
  );
}
