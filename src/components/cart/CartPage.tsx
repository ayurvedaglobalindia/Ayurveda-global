"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, ArrowLeft, ShoppingBag, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { ProductCard } from "@/components/product/ProductCard";
import { formatINR, calculateShipping } from "@/lib/utils/formatters";
import { useCartStore } from "@/store/cartStore";
import {
  getProductsByCategory,
  getProductImage,
} from "@/lib/products/registry";
import { validateCoupon } from "@/lib/coupons";
import type { CartItem } from "@/types";
import { motion } from "framer-motion";
import { CouponInput } from "./CartDrawer";

interface CartPageProps {
  initialItems?: CartItem[];
}

export function CartPage() {
  const {
    items,
    couponCode,
    discount,
    tax,
    getSubtotal,
    getTotal,
    updateQuantity,
    removeItem,
    removeCoupon,
    applyCoupon,
    getItemCount,
  } = useCartStore();

  const subtotal = getSubtotal();
  const total = getTotal();
  const itemCount = getItemCount();
  const shippingCalc = calculateShipping(subtotal);
  const freeShippingRemaining = Math.max(0, 99900 - subtotal);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

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
        applyCoupon(
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

  if (!isMounted) {
    return (
      <div className="container py-16 lg:py-24 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#1C1D1F] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto text-center bg-[#FAF7F2] p-8 sm:p-10 rounded-2xl border border-[#9E8047]/25 shadow-xs"
        >
          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#FFFFFF] border border-[#9E8047]/25 flex items-center justify-center text-[#9E8047]">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h1 className="font-heading text-2xl font-normal text-[#1C1D1F] mb-2">
            Your cart is empty
          </h1>
          <p className="text-[#737373] text-sm mb-6">
            Looks like you haven&apos;t added any formulations to your cart yet.
          </p>
          <Link href="/shop" className="inline-block w-full">
            <Button
              variant="primary"
              className="w-full py-3 rounded-full font-medium text-sm"
            >
              Explore Formulations
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  const relatedProducts = getProductsByCategory("supplements").slice(0, 4);

  return (
    <div className="container py-5 sm:py-7 lg:py-8 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-6"
      >
        <Link
          href="/shop"
          className="p-2 rounded-lg text-[#1C1D1F] bg-[#FFFFFF] border border-[#9E8047]/25 hover:border-[#1C1D1F] hover:bg-[#FAF7F2] transition-colors"
          aria-label="Back to shop"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div className="flex items-center gap-2">
          <h1 className="font-heading text-lg sm:text-xl font-normal text-[#1C1D1F]">
            Shopping Cart
          </h1>
          <span className="text-[11px] font-sans px-2 py-0.5 rounded-full bg-[#EFF4F0] text-[#4E5F52] border border-[#4E5F52]/30 font-semibold">
            {itemCount}
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="grid lg:grid-cols-3 gap-6"
      >
        <div className="lg:col-span-2 space-y-3">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 * index }}
            >
              <CartPageItem
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            </motion.div>
          ))}
        </div>

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#FAF7F2] border border-[#9E8047]/25 rounded-2xl p-4 sm:p-5 sticky top-24 shadow-xs"
          >
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

            <div className="mt-4 space-y-2.5">
              <h3 className="font-heading text-xs font-semibold uppercase tracking-wider text-[#1C1D1F]">
                Order Summary
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-[#737373]">
                  <span>Subtotal ({itemCount} items)</span>
                  <span className="text-[#1C1D1F] font-medium">
                    {formatINR(subtotal)}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#4E5F52] font-semibold">
                    <span>Discount</span>
                    <span>-{formatINR(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#737373]">
                  <span>Shipping</span>
                  <span className="text-[#4E5F52] font-semibold">
                    {shippingCalc.freeShipping
                      ? "FREE"
                      : formatINR(shippingCalc.cost)}
                  </span>
                </div>
                {tax > 0 && (
                  <div className="flex justify-between text-[#737373]">
                    <span>Tax</span>
                    <span>{formatINR(tax)}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-[#9E8047]/25 pt-2.5">
                  <span className="font-medium text-[#1C1D1F] text-xs sm:text-sm">
                    Total
                  </span>
                  <span className="font-bold text-[#1C1D1F] text-base sm:text-lg">
                    {formatINR(total)}
                  </span>
                </div>
              </div>
              {freeShippingRemaining > 0 && (
                <p className="text-[10.5px] text-[#4E5F52] text-center mt-2.5 font-medium bg-[#EFF4F0] border border-[#4E5F52]/25 rounded-lg p-1.5">
                  Add {formatINR(freeShippingRemaining)} more for free express
                  shipping
                </p>
              )}
              <Link href="/checkout" className="mt-4 block">
                <Button
                  variant="primary"
                  className="w-full py-2.5 rounded-full font-semibold text-xs shadow-xs"
                >
                  Proceed to Checkout ({formatINR(total)})
                </Button>
              </Link>
              <p className="text-center text-[10.5px] text-[#737373] mt-3">
                🔒 100% Confidential packaging • Cash on Delivery available
              </p>
            </div>
          </motion.div>

          {relatedProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="font-heading text-xs font-semibold uppercase tracking-wider text-[#1C1D1F] mb-2.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#9E8047]" />
                Recommended Formulations
              </h3>
              <div className="space-y-2.5">
                {relatedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    variant="compact"
                    showQuickActions={false}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function CartPageItem({
  item,
  onUpdateQuantity,
  onRemove,
}: {
  item: CartItem;
  onUpdateQuantity: (
    productId: string,
    variantId: string | undefined,
    quantity: number,
  ) => void;
  onRemove: (productId: string, variantId?: string) => void;
}) {
  const resolvedImage = getProductImage(item.product, item.productId, "thumb");
  const [imgSrc, setImgSrc] = useState(resolvedImage.src);
  const lineTotal = item.price * item.quantity;
  const variantName = item.product?.variants?.find(
    (v) => v.id === item.variantId,
  )?.name;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#FFFFFF] border border-[#9E8047]/25 rounded-xl overflow-hidden hover:border-[#1C1D1F]/30 transition-all shadow-xs"
    >
      <div className="flex gap-3.5 p-3 sm:p-4">
        <Link
          href={`/product/${item.productId}`}
          className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-[#FAF7F2] border border-[#9E8047]/20 relative"
        >
          <Image
            src={imgSrc}
            alt={resolvedImage.alt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 64px, 80px"
            onError={() =>
              setImgSrc("/images/products/body-essential-nutrition-thumb.jpg")
            }
          />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2.5">
            <div>
              <Link href={`/product/${item.productId}`}>
                <h3 className="font-heading font-medium text-xs sm:text-sm text-[#1C1D1F] hover:text-[#4E5F52] transition-colors leading-snug">
                  {item.product.name}
                </h3>
              </Link>
              {variantName && (
                <span className="inline-block text-[10px] text-[#737373] mt-0.5 font-medium bg-[#FAF7F2] px-1.5 py-0.5 rounded border border-[#9E8047]/25">
                  {variantName}
                </span>
              )}
            </div>
            <button
              onClick={() => onRemove(item.productId, item.variantId)}
              className="p-1.5 rounded-lg text-[#999999] hover:text-red-500 hover:bg-red-50 transition-colors flex-shrink-0"
              aria-label="Remove item"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
            <QuantitySelector
              value={item.quantity}
              onChange={(qty) =>
                onUpdateQuantity(item.productId, item.variantId, qty)
              }
              min={1}
              max={99}
              size="sm"
            />
            <PriceDisplay
              price={lineTotal}
              size="sm"
              className="font-semibold text-[#1C1D1F] text-xs sm:text-sm"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
