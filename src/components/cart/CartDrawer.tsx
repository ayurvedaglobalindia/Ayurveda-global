/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import {
  X,
  Plus,
  Minus,
  Trash2,
  Gift,
  Truck,
  Lock,
  Shield,
  RotateCcw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { classNames } from "@/lib/utils/formatters";
import { Button } from "@/components/ui/Button";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { formatINR, calculateShipping } from "@/lib/utils/formatters";
import { getProductImage } from "@/lib/products/registry";
import { validateCoupon } from "@/lib/coupons";
import { useCartStore } from "@/store/cartStore";
import { useUserStore } from "@/store/userStore";
import { useUIStore } from "@/store/uiStore";
import {
  buildWhatsAppUrl,
  buildOrderWhatsAppMessage,
} from "@/store/whatsappStore";

export function CartDrawer() {
  const [isMounted, setIsMounted] = useState(false);
  const { isCartDrawerOpen, closeCartDrawer } = useUIStore();
  const { user } = useUserStore();
  const {
    items = [],
    couponCode,
    discount = 0,
    tax = 0,
    getSubtotal,
    getTotal,
    updateQuantity,
    removeItem,
    removeCoupon,
    getItemCount,
    applyCoupon: applyCouponStore,
  } = useCartStore();

  const subtotal = getSubtotal();
  const total = getTotal();
  const itemCount = getItemCount();
  const shippingCalc = calculateShipping(subtotal);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleApplyCoupon = (code: string) => {
    if (!code.trim()) return;
    setCouponError(null);
    setCouponLoading(true);
    try {
      const data = validateCoupon(
        code.trim().toUpperCase(),
        subtotal,
        items.map((i) => i.productId),
        items.map((i) => i.product?.category).filter(Boolean) as string[],
      );
      if (data.valid) {
        applyCouponStore(
          data.coupon?.code || code.trim().toUpperCase(),
          data.discount,
        );
        setCouponError(null);
      } else {
        setCouponError(data.error || "Invalid coupon code");
      }
    } catch {
      setCouponError("Unable to apply coupon. Please try again.");
    } finally {
      setCouponLoading(false);
    }
  };

  const handleWhatsAppOrder = () => {
    const orderId = `AVG-WA-${Date.now().toString().slice(-6)}`;
    const primaryAddr = user?.addresses?.[0];
    const message = buildOrderWhatsAppMessage({
      orderId,
      orderNumber: orderId,
      customerName: user?.name || "Customer Patron",
      customerPhone: user?.phone || primaryAddr?.phone || "",
      customerEmail: user?.email || "",
      shippingAddress: {
        firstName:
          primaryAddr?.firstName || user?.name?.split(" ")[0] || "Customer",
        lastName:
          primaryAddr?.lastName ||
          user?.name?.split(" ").slice(1).join(" ") ||
          "",
        addressLine1: primaryAddr?.addressLine1 || "Direct WhatsApp Order",
        addressLine2: primaryAddr?.addressLine2 || "",
        city: primaryAddr?.city || "",
        state: primaryAddr?.state || "",
        pincode: primaryAddr?.pincode || "",
        phone: primaryAddr?.phone || user?.phone || "",
      },
      items: items.map((item) => ({
        name: item.product?.name || "Ayurvedic Formulation",
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity,
      })),
      subtotal,
      shipping: shippingCalc.cost,
      tax,
      discount,
      total,
      paymentMethod: "whatsapp",
      couponCode,
    });
    window.open(buildWhatsAppUrl(message), "_blank");
  };

  useEffect(() => {
    if (!isCartDrawerOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCartDrawer();
    };

    document.addEventListener("keydown", handleEscape);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = originalOverflow;
    };
  }, [isCartDrawerOpen, closeCartDrawer]);

  if (!isMounted) return null;

  const drawerContent = (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <div
          className="fixed inset-0 z-[100] overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Shopping Cart"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={closeCartDrawer}
            aria-hidden="true"
          />

          {/* Slide-in Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed inset-y-0 right-0 w-full max-w-full sm:max-w-md bg-[#FAF7F2] border-l border-[#9E8047]/25 shadow-2xl flex flex-col text-[#1C1D1F] z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3.5 sm:p-4 border-b border-[#9E8047]/25 bg-[#FAF7F2]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#FFFFFF] border border-[#9E8047]/25 p-0.5 flex-shrink-0 shadow-sm">
                  <img src="/images/brand-logo.png" alt="Ayurveda Global" className="w-full h-full object-contain" />
                </div>
                <h2 className="font-heading text-base font-medium text-[#1C1D1F] flex items-center gap-2">
                  <span>Your Cart</span>
                  <span className="text-[11px] font-sans px-2 py-0.5 rounded-full bg-[#EFF4F0] text-[#4E5F52] border border-[#4E5F52]/30 font-semibold shadow-inner">
                    {itemCount}
                  </span>
                </h2>
              </div>
              <button
                onClick={closeCartDrawer}
                className="p-1.5 rounded-lg text-[#737373] hover:text-[#1C1D1F] hover:bg-[#EAE4DC] transition-colors"
                aria-label="Close cart"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content List */}
            <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3.5 overscroll-contain">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-14 h-14 mx-auto mb-3.5 rounded-full bg-[#FFFFFF] border border-[#9E8047]/25 flex items-center justify-center text-[#9E8047] shadow-xs">
                    <Gift className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading text-base font-normal text-[#1C1D1F] mb-1.5">
                    Your cart is empty
                  </h3>
                  <p className="text-xs text-[#737373] mb-5">
                    Explore authentic Ayurvedic formulations to begin.
                  </p>
                  <Link href="/shop" onClick={closeCartDrawer}>
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full text-xs font-medium py-2.5 rounded-full shadow-xs"
                    >
                      Explore Formulations
                    </Button>
                  </Link>
                </div>
              ) : (
                <>
                  <div className="space-y-3">
                    {items.map((item) => (
                      <CartDrawerItem
                        key={item.id}
                        item={item}
                        onUpdateQuantity={updateQuantity}
                        onRemove={removeItem}
                      />
                    ))}
                  </div>

                  <CouponInput
                    couponCode={couponCode}
                    onApply={handleApplyCoupon}
                    onRemove={() => {
                      removeCoupon();
                      setCouponError(null);
                    }}
                    subtotal={subtotal}
                    error={couponError}
                    loading={couponLoading}
                  />

                  <CartSummary
                    subtotal={subtotal}
                    shipping={shippingCalc.cost}
                    tax={tax}
                    discount={discount}
                    total={total}
                    freeShippingThreshold={
                      shippingCalc.freeShipping ? 0 : 99900 - subtotal
                    }
                  />
                </>
              )}
            </div>

            {/* Bottom Footer Actions */}
            {items.length > 0 && (
              <div className="p-3.5 sm:p-4 border-t border-[#9E8047]/25 bg-[#FFFFFF] space-y-2.5">
                <div className="flex gap-2">
                  <Link
                    href="/checkout"
                    onClick={closeCartDrawer}
                    className="flex-1"
                  >
                    <Button
                      variant="primary"
                      size="md"
                      className="w-full text-xs font-semibold py-2.5 rounded-full shadow-xs"
                    >
                      Proceed to Checkout ({formatINR(total)})
                    </Button>
                  </Link>
                  <Button
                    variant="whatsapp"
                    size="md"
                    onClick={handleWhatsAppOrder}
                    className="px-3.5 py-2.5 shadow-xs flex-shrink-0 rounded-full"
                    title="Order directly via WhatsApp"
                    aria-label="Order directly via WhatsApp"
                  >
                    <svg
                      className="w-4 h-4 text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.5 14.4c-.3-.1-1.8-.9-2-.9-.3-.1-.5-.1-.7.2-.2.3-.8 1-.9 1.2-.2.2-.4.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.2-.2-.2-.3-.3-.3-.5 0-.2 0-.4-.1-.5-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5-.2 0-.4 0-.6 0-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5 0 1.5 1.1 2.9 1.2 3.1.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.5-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4 0-.1-.3-.2-.6-.3" />
                    </svg>
                  </Button>
                </div>
                <div className="flex items-center justify-center gap-3 text-[10.5px] text-[#737373]">
                  <span className="flex items-center gap-1">
                    <Lock className="w-3 h-3 text-[#4E5F52]" /> 100%
                    Confidential
                  </span>
                  <span className="text-[#999999]">•</span>
                  <span className="flex items-center gap-1">
                    <Shield className="w-3 h-3 text-[#4E5F52]" /> AYUSH
                    Certified
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-1.5 text-center pt-1">
                  <div className="p-1.5 rounded-lg bg-[#FAF7F2] border border-[#9E8047]/25">
                    <Truck className="w-3.5 h-3.5 text-[#4E5F52] mx-auto mb-0.5" />
                    <span className="text-[9.5px] text-[#737373] block">
                      Free Express
                    </span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-[#FAF7F2] border border-[#9E8047]/25">
                    <Lock className="w-3.5 h-3.5 text-[#4E5F52] mx-auto mb-0.5" />
                    <span className="text-[9.5px] text-[#737373] block">
                      Discreet Box
                    </span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-[#FAF7F2] border border-[#9E8047]/25">
                    <Shield className="w-3.5 h-3.5 text-[#4E5F52] mx-auto mb-0.5" />
                    <span className="text-[9.5px] text-[#737373] block">
                      Doorstep COD
                    </span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-[#FAF7F2] border border-[#9E8047]/25">
                    <RotateCcw className="w-3.5 h-3.5 text-[#4E5F52] mx-auto mb-0.5" />
                    <span className="text-[9.5px] text-[#737373] block">
                      Easy Return
                    </span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(drawerContent, document.body);
}

function CartDrawerItem({
  item,
  onUpdateQuantity,
  onRemove,
}: {
  item: {
    id: string;
    productId: string;
    variantId?: string;
    quantity: number;
    price: number;
    product: {
      name: string;
      images?: { src: string; alt: string; isPrimary?: boolean }[];
      variants?: { id: string; name: string }[];
    };
  };
  onUpdateQuantity: (
    productId: string,
    variantId: string | undefined,
    quantity: number,
  ) => void;
  onRemove: (productId: string, variantId?: string) => void;
}) {
  const resolvedImage = getProductImage(item.product, item.productId, "thumb");
  const [imgSrc, setImgSrc] = useState(resolvedImage.src);
  const variantName = item.product?.variants?.find(
    (v) => v.id === item.variantId,
  )?.name;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex items-start gap-3 p-3 bg-[#FFFFFF] border border-[#9E8047]/25 rounded-xl hover:border-[#1C1D1F]/30 transition-colors shadow-xs"
    >
      <Link
        href={`/product/${item.productId}`}
        className="flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden bg-[#FAF7F2] border border-[#9E8047]/20 relative"
      >
        <Image
          src={imgSrc}
          alt={resolvedImage.alt || item.product?.name || "Product"}
          fill
          className="object-cover"
          sizes="56px"
          onError={() =>
            setImgSrc("/images/products/body-essential-nutrition-thumb.jpg")
          }
        />
      </Link>
      <div className="flex-1 min-w-0">
        <Link href={`/product/${item.productId}`}>
          <h4 className="font-heading font-medium text-[#1C1D1F] text-xs sm:text-[13px] leading-snug line-clamp-2 hover:text-[#4E5F52] transition-colors">
            {item.product?.name || "Ayurvedic Formulation"}
          </h4>
        </Link>
        {variantName && (
          <p className="text-[10px] text-[#737373] font-medium mt-0.5 truncate">
            {variantName}
          </p>
        )}
        <PriceDisplay
          price={item.price}
          size="sm"
          className="mt-0.5 text-xs text-[#1C1D1F] font-semibold"
        />
        <QuantitySelector
          value={item.quantity}
          onChange={(qty) =>
            onUpdateQuantity(item.productId, item.variantId, qty)
          }
          min={1}
          max={99}
          size="sm"
          className="mt-1.5"
        />
      </div>
      <button
        onClick={() => onRemove(item.productId, item.variantId)}
        className="p-1.5 rounded-lg text-[#999999] hover:text-red-500 hover:bg-red-50 transition-colors flex-shrink-0"
        aria-label="Remove item"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
}

export function CouponInput({
  couponCode,
  onApply,
  onRemove,
  subtotal,
  error,
  loading = false,
}: {
  couponCode?: string;
  onApply: (code: string) => void;
  onRemove: () => void;
  subtotal: number;
  error?: string | null;
  loading?: boolean;
}) {
  const [code, setCode] = useState("");

  return (
    <div className="bg-[#FFFFFF] border border-[#9E8047]/25 rounded-xl p-3 sm:p-3.5 shadow-xs">
      <h3 className="font-heading text-xs font-semibold uppercase tracking-wider text-[#1C1D1F] mb-2 flex items-center gap-1.5">
        <Gift className="w-3.5 h-3.5 text-[#9E8047]" />
        Apply Coupon
      </h3>
      {couponCode ? (
        <div className="flex items-center justify-between text-xs bg-[#EFF4F0] p-2 rounded-lg border border-[#4E5F52]/30">
          <span className="font-medium text-[#4E5F52] font-mono tracking-wider">
            {couponCode}
          </span>
          <button
            onClick={onRemove}
            className="text-xs text-[#737373] hover:text-red-500 transition-colors"
          >
            Remove
          </button>
        </div>
      ) : (
        <div className="space-y-1.5">
          <div className="flex gap-2">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="Enter coupon code"
              className="flex-1 bg-[#FAF7F2] border border-[#9E8047]/25 focus:border-[#1C1D1F] rounded-lg px-3 py-1.5 text-xs text-[#1C1D1F] placeholder-[#999999] focus:outline-none"
              aria-label="Coupon code"
            />
            <Button
              variant="primary"
              size="sm"
              onClick={() => onApply(code)}
              disabled={!code.trim() || loading}
              className="text-xs px-3 py-1.5 rounded-lg"
            >
              {loading ? "..." : "Apply"}
            </Button>
          </div>
          {error && (
            <p className="text-[11px] text-red-500 font-medium">{error}</p>
          )}
        </div>
      )}
    </div>
  );
}

function CartSummary({
  subtotal,
  shipping,
  tax,
  discount,
  total,
  freeShippingThreshold,
}: {
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  freeShippingThreshold: number;
}) {
  return (
    <div className="bg-[#FFFFFF] border border-[#9E8047]/25 rounded-xl p-3 sm:p-3.5 space-y-2 shadow-xs">
      <h3 className="font-heading text-xs font-semibold uppercase tracking-wider text-[#1C1D1F]">
        Order Summary
      </h3>
      <div className="space-y-1.5 text-xs">
        <div className="flex justify-between text-[#737373]">
          <span>Subtotal</span>
          <span className="text-[#1C1D1F] font-medium">
            {formatINR(subtotal)}
          </span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-[#4E5F52]">
            <span>Discount</span>
            <span className="font-medium">-{formatINR(discount)}</span>
          </div>
        )}
        <div className="flex justify-between text-[#737373]">
          <span>Shipping</span>
          <span className="text-[#4E5F52] font-medium">
            {shipping === 0 ? "FREE" : formatINR(shipping)}
          </span>
        </div>
        {tax > 0 && (
          <div className="flex justify-between text-[#737373]">
            <span>Tax</span>
            <span className="text-[#1C1D1F] font-medium">{formatINR(tax)}</span>
          </div>
        )}
        <div className="flex justify-between border-t border-[#9E8047]/25 pt-2">
          <span className="font-medium text-[#1C1D1F]">Total</span>
          <span className="font-semibold text-[#1C1D1F] text-sm sm:text-base">
            {formatINR(total)}
          </span>
        </div>
      </div>
      {freeShippingThreshold > 0 && (
        <p className="text-[10.5px] text-[#4E5F52] text-center bg-[#EFF4F0] border border-[#4E5F52]/30 rounded-lg p-1.5 font-medium">
          Add {formatINR(freeShippingThreshold)} more for free express shipping
        </p>
      )}
    </div>
  );
}
