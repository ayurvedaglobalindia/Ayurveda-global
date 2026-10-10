"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle, ArrowRight, ShoppingBag } from "lucide-react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useUIStore } from "@/store/uiStore";

export function Toaster() {
  const { toasts, dismissToast, openCartDrawer } = useUIStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toastIcons = {
    success: <CheckCircle className="w-4 h-4 text-[#10B981]" />,
    error: <AlertCircle className="w-4 h-4 text-rose-500" />,
    info: <Info className="w-4 h-4 text-[#D4AF37]" />,
    warning: <AlertTriangle className="w-4 h-4 text-amber-400" />,
  };

  const toastContent = (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] flex flex-col items-center gap-2 w-full max-w-md px-3.5 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const isCartToast =
            toast.title.toLowerCase().includes("cart") ||
            toast.title.toLowerCase().includes("bag");

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -45, scale: 0.88 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -25, scale: 0.92 }}
              transition={{ type: "spring", damping: 22, stiffness: 320 }}
              className="pointer-events-auto flex items-center justify-between gap-3 px-4 py-2.5 rounded-full bg-[#071A12]/95 backdrop-blur-2xl border border-[#D4AF37]/40 shadow-[0_12px_36px_rgba(0,0,0,0.5)] text-white w-full sm:w-auto sm:min-w-[340px]"
              role="alert"
              aria-live="polite"
            >
              {/* Dynamic Island Pulse Icon & Title */}
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/15">
                  {toastIcons[toast.type]}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-sans font-bold text-xs text-white leading-tight truncate">
                    {toast.title}
                  </p>
                  {toast.message && (
                    <p className="text-[10px] text-[#FDFBF7]/80 font-sans truncate mt-0.5">
                      {toast.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons: Direct Checkout / Bag Shortcut */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                {isCartToast && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        dismissToast(toast.id);
                        openCartDrawer();
                      }}
                      className="px-2.5 py-1 rounded-full bg-[#D4AF37] hover:bg-[#E5C358] text-[#071A12] text-[10px] font-sans font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1 shadow-xs"
                    >
                      <ShoppingBag className="w-2.5 h-2.5" />
                      <span>Bag</span>
                    </button>
                    <Link
                      href="/checkout"
                      onClick={() => dismissToast(toast.id)}
                      className="hidden sm:inline-flex px-2 py-1 rounded-full bg-white/15 hover:bg-white/25 text-white text-[10px] font-sans font-semibold tracking-wide transition-colors items-center gap-0.5"
                    >
                      <span>Checkout</span>
                      <ArrowRight className="w-2.5 h-2.5 text-[#D4AF37]" />
                    </Link>
                  </div>
                )}
                <button
                  onClick={() => dismissToast(toast.id)}
                  className="w-6 h-6 rounded-full hover:bg-white/15 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                  aria-label="Dismiss"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );

  if (typeof window === "undefined") return null;

  return createPortal(toastContent, document.body);
}
