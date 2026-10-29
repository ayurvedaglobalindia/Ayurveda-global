"use client";

import React from "react";
import { Lock, ShieldCheck, Truck, EyeOff, PackageCheck } from "lucide-react";

interface DiscreetPackagingBadgeProps {
  variant?: "detailed" | "compact" | "banner";
  className?: string;
}

export function DiscreetPackagingBadge({
  variant = "detailed",
  className = "",
}: DiscreetPackagingBadgeProps) {
  if (variant === "compact") {
    return (
      <div
        className={`flex items-center gap-2 p-3 rounded-xl bg-[#FAF7F2] border border-[#9E8047]/25 text-xs text-[#071A12] ${className}`}
      >
        <Lock className="w-4 h-4 text-[#0E3924] shrink-0" />
        <span className="font-medium">
          <strong>100% Discreet Packaging:</strong> Plain brown box with no product or medical branding.
        </span>
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl bg-gradient-to-br from-[#FAF7F2] via-white to-[#F2EFE9] border border-[#9E8047]/30 p-4 sm:p-5 shadow-xs ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#9E8047]/20">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#0E3924] flex items-center justify-center text-[#D4AF37]">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-serif font-bold text-[#071A12] uppercase tracking-wide">
              100% Confidential &amp; Discreet Packaging
            </h4>
            <p className="text-[10px] text-stone-500 font-sans">
              Your personal privacy is our sacred guarantee across all deliveries
            </p>
          </div>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1 text-[9.5px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[#0E3924]/10 text-[#0E3924] border border-[#0E3924]/20">
          <EyeOff className="w-3 h-3" />
          Zero Visibility
        </span>
      </div>

      {/* 3 Pillars of Confidentiality */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3.5">
        <div className="flex items-start gap-2.5">
          <PackageCheck className="w-4 h-4 text-[#9E8047] shrink-0 mt-0.5" />
          <div>
            <span className="text-[11px] font-bold text-[#071A12] block">
              Plain Brown Box
            </span>
            <p className="text-[10px] text-stone-600 leading-snug">
              No mention of product name, wellness herbs, or sexual health on external box.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-[#0E3924] shrink-0 mt-0.5" />
          <div>
            <span className="text-[11px] font-bold text-[#071A12] block">
              Discreet Sender Label
            </span>
            <p className="text-[10px] text-stone-600 leading-snug">
              Dispatched neutrally under &ldquo;AVG Logistics&rdquo;. Delivery agents cannot discern contents.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <Truck className="w-4 h-4 text-[#075E54] shrink-0 mt-0.5" />
          <div>
            <span className="text-[11px] font-bold text-[#071A12] block">
              Doorstep COD &amp; UPI
            </span>
            <p className="text-[10px] text-stone-600 leading-snug">
              Inspect sealed carton &amp; pay via Cash or UPI QR upon delivery at your doorstep.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
