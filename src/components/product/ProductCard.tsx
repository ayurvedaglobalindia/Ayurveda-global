"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Heart,
  ShoppingBag,
  Eye,
  Sparkles,
  Shield,
  CheckCircle2,
  Plus,
  Minus,
  Truck,
  Leaf,
  Check,
} from "lucide-react";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { Rating } from "@/components/ui/Rating";
import type { Product } from "@/types";
import { getProductImage } from "@/lib/products/registry";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useUserStore } from "@/store/userStore";
import { useUIStore } from "@/store/uiStore";
import {
  useWhatsAppStore,
  buildWhatsAppUrl,
  buildProductEnquiryMessage,
} from "@/store/whatsappStore";
import { trackEvent } from "@/lib/analytics";
import { motion, AnimatePresence } from "framer-motion";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "compact" | "featured" | "list";
  showQuickActions?: boolean;
}

export function ProductCard({
  product,
  variant = "default",
  showQuickActions = true,
}: ProductCardProps) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isHeartPopping, setIsHeartPopping] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const { addItem, updateQuantity, removeItem, isInCart, getItemQuantity } =
    useCartStore();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } =
    useWishlistStore();
  const { user } = useUserStore();
  const { openModal, openCartDrawer, showToast, isAgeVerified } = useUIStore();
  const { trackLead } = useWhatsAppStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const primaryImage = getProductImage(
    product,
    product.id,
    variant === "compact" ? "thumb" : "card",
  );
  const [imageError, setImageError] = useState(false);
  const hasDiscount =
    product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.compareAtPrice! - product.price) / product.compareAtPrice!) *
          100,
      )
    : 0;

  const inCart = isMounted && isInCart(product.id);
  const inWishlist = isMounted && isInWishlist(product.id);
  const cartQuantity = isMounted ? getItemQuantity(product.id) : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.ageRestricted && !isAgeVerified(product.id)) {
      openModal("age-gate", {
        productId: product.id,
        productName: product.name,
        onVerify: () => {
          addItem(product);
          setJustAdded(true);
          setTimeout(() => setJustAdded(false), 1400);
          showToast({
            type: "success",
            title: "Added to Bag",
            message: `${product.name} (1 unit) added.`,
          });
        },
      });
      return;
    }

    addItem(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
    trackEvent("add_to_cart", {
      productId: product.id,
      productName: product.name,
      price: product.price,
    });
    showToast({
      type: "success",
      title: "Added to Bag",
      message: `${product.name} has been added to your cart.`,
    });
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartQuantity <= 1) {
      removeItem(product.id);
    } else {
      updateQuantity(product.id, undefined, cartQuantity - 1);
    }
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.ageRestricted && !isAgeVerified(product.id)) {
      openModal("age-gate", {
        productId: product.id,
        productName: product.name,
        onVerify: () => {
          addItem(product);
          router.push("/checkout");
        },
      });
      return;
    }

    addItem(product);
    router.push("/checkout");
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsHeartPopping(true);
    setTimeout(() => setIsHeartPopping(false), 500);

    if (inWishlist) {
      removeFromWishlist(product.id);
      showToast({ type: "info", title: "Removed from wishlist" });
    } else {
      addToWishlist(product);
      showToast({
        type: "success",
        title: "Saved to Wishlist",
        message: `${product.name} added to your personal wishlist.`,
      });
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openModal("quick-view", { product });
  };

  const getFeatureHighlight = () => {
    if (product.id === "vitality-power-combo") {
      return {
        badge: "Master Combo",
        pill: "Inside-Out Stamina + Instant Endurance",
      };
    }
    if (product.id === "body-essential-nutrition") {
      return {
        badge: "Herbal Rasayana",
        pill: "Ashwagandha • Shilajit • 60 Caps",
      };
    }
    if (product.id === "hair-regrow-kit") {
      return {
        badge: "Dual Kit",
        pill: "100ml Oil + 60 Botanical Capsules",
      };
    }
    if (product.id === "hair-regrow-capsules") {
      return {
        badge: "Hair Nutrients",
        pill: "Bhringraj & Amla Root Micronutrients",
      };
    }
    if (product.id === "hair-regrow-oil") {
      return {
        badge: "Scalp Taila",
        pill: "Bhringraj & Rosemary Scalp Oil (100ml)",
      };
    }
    if (product.id === "staymax-delay-spray") {
      return {
        badge: "Topical Spray",
        pill: "Herbal Delay • Aloe & Vit E • 30ml",
      };
    }
    return {
      badge: "Classical Rasayana",
      pill: product.tagline || "Classical Rasayana Formulation",
    };
  };

  const feature = getFeatureHighlight();

  if (variant === "compact") {
    return (
      <Link
        href={`/product/${product.slug}`}
        className="flex gap-3.5 p-2.5 bg-white rounded-xl border border-[#D4AF37]/25 hover:border-[#1B4332] transition-colors group shadow-xs"
      >
        <div className="w-16 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-[#FAF7F2] relative">
          <Image
            src={primaryImage.src}
            alt={primaryImage.alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="64px"
          />
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <h4 className="font-heading font-normal text-xs sm:text-sm text-[#081C15] line-clamp-1 group-hover:text-[#D4AF37] transition-colors break-words">
            {product.name}
          </h4>
          <p className="text-[11px] text-[#737373] line-clamp-1 mt-0.5 font-sans break-words overflow-hidden">
            {product.shortDescription}
          </p>
          <div className="mt-1.5">
            <PriceDisplay
              price={product.price}
              compareAtPrice={product.compareAtPrice}
              size="sm"
            />
          </div>
        </div>
      </Link>
    );
  }

  // Rich Full-Width List View Variant for Catalog
  if (variant === "list") {
    return (
      <motion.article
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="group relative rounded-2xl border border-[#D4AF37]/25 bg-white hover:border-[#1B4332]/50 transition-all flex flex-col md:flex-row overflow-hidden shadow-xs hover:shadow-md w-full"
      >
        {/* Left Image Stage */}
        <div className="relative w-full md:w-64 md:flex-shrink-0 aspect-[4/3] md:aspect-square bg-[#FAF7F2] border-b md:border-b-0 md:border-r border-[#D4AF37]/20 overflow-hidden">
          <Link
            href={`/product/${product.slug}`}
            className="block w-full h-full relative"
            aria-label={`View ${product.name}`}
          >
            <Image
              src={
                imageError
                  ? "/images/products/body-essential-nutrition-card.jpg"
                  : primaryImage.src
              }
              alt={primaryImage.alt}
              fill
              className="object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 256px"
              onError={() => setImageError(true)}
            />
          </Link>

          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute top-3 left-3 z-10 pointer-events-none">
              <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-sans font-bold tracking-tight text-[#10B981] bg-[#081C15]/90 border border-[#10B981]/40 backdrop-blur-md shadow-xs">
                {discountPercentage}% OFF
              </span>
            </div>
          )}

          {/* Quick Action Buttons */}
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
            <button
              onClick={handleQuickView}
              className="w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center border border-[#D4AF37]/30 text-[#737373] hover:text-[#081C15] transition-colors shadow-xs"
              aria-label="Quick view formulation"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleWishlistToggle}
              className={`w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center border border-[#D4AF37]/30 transition-colors shadow-xs ${
                inWishlist
                  ? "text-rose-600 border-rose-200"
                  : "text-[#737373] hover:text-[#081C15]"
              } ${isHeartPopping ? "animate-[heartPop_0.45s_ease-in-out]" : ""}`}
              aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart
                className={`w-3.5 h-3.5 ${inWishlist ? "fill-current text-rose-600" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Center Details Stage */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between min-w-0">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[#1B4332] bg-[#FAF7F2] border border-[#D4AF37]/25 px-2.5 py-0.5 rounded-full">
                <Leaf className="w-3 h-3 text-[#10B981] flex-shrink-0" />
                <span>{feature.pill}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Rating rating={4.8} reviewsCount={124} size="sm" />
                <span className="text-[11px] text-[#737373]">
                  • NABL Verified
                </span>
              </div>
            </div>

            <h3 className="font-editorial font-medium text-lg sm:text-xl text-[#081C15] hover:text-[#D4AF37] transition-colors">
              <Link href={`/product/${product.slug}`}>{product.name}</Link>
            </h3>

            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed line-clamp-2">
              {product.description || product.shortDescription}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-[#1B4332]">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                100% Ayurvedic
              </span>
              <span className="inline-flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-[#10B981]" />
                NABL Lab Certified
              </span>
              <span className="inline-flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-[#10B981]" />
                Free Express COD
              </span>
            </div>
          </div>
        </div>

        {/* Right CTA & Price Stage */}
        <div className="p-4 sm:p-5 md:w-56 md:flex-shrink-0 flex flex-col justify-between items-start md:items-end border-t md:border-t-0 md:border-l border-[#D4AF37]/20 bg-[#FAF7F2]/40">
          <div className="w-full md:text-right space-y-1 mb-4 md:mb-0">
            <span className="text-[10.5px] font-mono text-[#737373] block uppercase tracking-wider">
              Price
            </span>
            <PriceDisplay
              price={product.price}
              compareAtPrice={product.compareAtPrice}
              size="lg"
            />
            {hasDiscount && (
              <span className="text-[11px] font-sans text-[#10B981] block font-semibold">
                SAVE {discountPercentage}%
              </span>
            )}
          </div>

          <div className="w-full space-y-2">
            {inCart ? (
              <div className="w-full flex items-center justify-between bg-[#EBF1EC] p-2 rounded-xl border border-[#10B981]/30">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleDecrement}
                    className="w-6 h-6 rounded-md bg-white text-[#081C15] flex items-center justify-center border border-stone-200 hover:bg-stone-50"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-semibold text-[#081C15] px-1">
                    {cartQuantity}
                  </span>
                  <button
                    onClick={handleIncrement}
                    className="w-6 h-6 rounded-md bg-white text-[#081C15] flex items-center justify-center border border-stone-200 hover:bg-stone-50"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <button
                  className="text-xs py-1.5 px-3 bg-[#1B4332] text-white font-medium rounded-lg hover:bg-[#081C15] transition-colors inline-flex items-center gap-1"
                  onClick={() => openCartDrawer()}
                >
                  <ShoppingBag className="w-3 h-3" />
                  <span>Bag</span>
                </button>
              </div>
            ) : (
              <div className="w-full space-y-2">
                <button
                  onClick={handleAddToCart}
                  disabled={
                    product?.inventory?.trackQuantity &&
                    product?.inventory?.quantity === 0
                  }
                  className="w-full text-xs font-semibold py-2.5 px-3 rounded-xl border border-[#1B4332] bg-white hover:bg-[#1B4332]/5 text-[#1B4332] transition-colors inline-flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={
                    product?.inventory?.trackQuantity &&
                    product?.inventory?.quantity === 0
                  }
                  className="w-full text-xs font-semibold py-2.5 px-3 rounded-xl bg-[#1B4332] hover:bg-[#081C15] text-white transition-colors inline-flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>Buy Now</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.article>
    );
  }

  // Diamond-Tier Bento-Grid Card (Default Mobile 2-Column Grid)
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.22 } }}
      className="h-full group relative rounded-2xl border border-[#D4AF37]/25 bg-white hover:border-[#1B4332]/45 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-[0_4px_24px_rgba(8,28,21,0.06)] hover:shadow-[0_12px_36px_rgba(8,28,21,0.12)] w-full min-w-0"
    >
      {/* 1:1 Aspect Ratio Canvas Stage */}
      <div className="relative w-full aspect-square border-b border-[#D4AF37]/20 bg-[#FAF7F2] overflow-hidden group/img">
        <Link
          href={`/product/${product.slug}`}
          className="block relative w-full h-full"
          aria-label={`View ${product.name}`}
        >
          <Image
            src={
              imageError
                ? "/images/products/body-essential-nutrition-card.jpg"
                : primaryImage.src
            }
            alt={primaryImage.alt}
            fill
            priority={
              product.id === "vitality-power-combo" ||
              product.id === "body-essential-nutrition"
            }
            className="object-contain p-3.5 sm:p-5 transition-transform duration-500 ease-out group-hover:scale-105 group-hover/img:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            onError={() => setImageError(true)}
          />
        </Link>

        {/* Floating Glass Pill: Top-Left Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-2 left-2 z-10 pointer-events-none">
            <span className="bg-[#081C15]/90 text-[#10B981] border border-[#10B981]/40 text-[10px] font-bold px-2.5 py-0.5 rounded-full backdrop-blur-md shadow-xs flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-[#D4AF37]" />
              <span>{discountPercentage}% OFF</span>
            </span>
          </div>
        )}

        {/* Top-Right Quick Action Glass Pills: Quick View + Heartbeat Wishlist */}
        <div className="absolute top-2 right-2 z-10 flex items-center gap-1 sm:gap-1.5">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleQuickView}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/85 hover:bg-white backdrop-blur-md flex items-center justify-center border border-[#D4AF37]/30 text-[#555555] hover:text-[#081C15] transition-all shadow-xs"
            aria-label="Quick view formulation"
            title="Quick View"
          >
            <Eye className="w-3.5 h-3.5" />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={handleWishlistToggle}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/85 hover:bg-white backdrop-blur-md flex items-center justify-center border border-[#D4AF37]/30 transition-all shadow-xs ${
              inWishlist
                ? "text-rose-600 border-rose-300"
                : "text-[#555555] hover:text-[#081C15]"
            } ${isHeartPopping ? "animate-[heartPop_0.45s_ease-in-out]" : ""}`}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              className={`w-3.5 h-3.5 ${inWishlist ? "fill-current text-rose-600" : ""}`}
            />
          </motion.button>
        </div>

        {/* Trust Verification Micro-Pill Tag under image stage */}
        <div className="absolute bottom-1.5 left-2 right-2 z-10 pointer-events-none flex justify-center">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md border border-[#D4AF37]/25 text-[8px] sm:text-[9px] font-sans font-semibold text-[#1B4332] shadow-2xs">
            <Shield className="w-2.5 h-2.5 text-[#10B981]" />
            <span>NABL Lab Tested • 100% Organic</span>
          </span>
        </div>
      </div>

      {/* Card Content Stage */}
      <div className="p-3 sm:p-4 lg:p-5 flex-1 flex flex-col justify-between space-y-2 sm:space-y-3 bg-white min-w-0">
        <div className="space-y-1 sm:space-y-1.5 min-w-0">
          {/* Key Benefits / Nature Tag */}
          <div className="inline-flex items-center gap-1 text-[8.5px] sm:text-[9.5px] font-mono uppercase tracking-wider text-[#1B4332] bg-[#FAF7F2] border border-[#D4AF37]/25 px-2 py-0.5 rounded-full max-w-full truncate">
            <Leaf className="w-2.5 h-2.5 text-[#10B981] flex-shrink-0" />
            <span className="truncate">FOR: {feature.badge || "Cellular Vitality"}</span>
          </div>

          {/* Product Title (Strictly aligned 2 lines) */}
          <h3 className="font-editorial font-medium text-xs sm:text-base text-[#081C15] line-clamp-2 min-h-[2.1rem] sm:min-h-[2.75rem] group-hover:text-[#D4AF37] transition-colors break-words whitespace-normal leading-snug">
            <Link href={`/product/${product.slug}`}>{product.name}</Link>
          </h3>

          {/* Product Description on sm+ screens */}
          <p className="hidden sm:block text-[11px] sm:text-xs text-[#555555] line-clamp-2 min-h-[2rem] leading-relaxed font-sans break-words overflow-hidden">
            {product.shortDescription}
          </p>
        </div>

        {/* Pricing & Morphing CTA Block with strictly bottom-aligned mt-auto */}
        <div className="mt-auto pt-1 sm:pt-2 space-y-1.5 sm:space-y-2">
          {/* Rating */}
          <div className="flex items-center justify-between">
            <Rating rating={4.8} reviewsCount={124} size="sm" />
            {product?.inventory?.quantity && product?.inventory?.quantity < 10 && (
              <span className="text-[8.5px] sm:text-[9.5px] text-amber-700 font-medium bg-amber-50 px-1 sm:px-1.5 py-0.5 rounded border border-amber-200">
                Low stock
              </span>
            )}
          </div>

          {/* Dynamic Price Row with Large Luxury Green Font + Savings Tag */}
          <div className="flex items-baseline justify-between pt-0.5">
            <PriceDisplay
              price={product.price}
              compareAtPrice={product.compareAtPrice}
              size="sm"
            />
            {hasDiscount && (
              <span className="text-[9.5px] sm:text-[10.5px] font-sans font-bold text-[#10B981] bg-emerald-50 px-1.5 py-0.5 rounded">
                SAVE {discountPercentage}%
              </span>
            )}
          </div>

          {/* Morphing Slide-Up "Quick Add" CTA Button */}
          <div className="pt-1.5 border-t border-[#D4AF37]/20">
            {inCart ? (
              /* Morphed State: Tactile Quantity Selector + Bag View */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full flex items-center justify-between bg-[#EBF1EC] p-1 px-1.5 sm:px-2 rounded-xl border border-[#10B981]/40"
              >
                <div className="flex items-center gap-1">
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={handleDecrement}
                    className="w-6 h-6 rounded-lg bg-white text-[#081C15] flex items-center justify-center border border-stone-200 shadow-2xs hover:bg-stone-50"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3 h-3 text-[#1B4332]" />
                  </motion.button>
                  <span className="text-[11px] font-bold text-[#081C15] px-1.5 min-w-[18px] text-center">
                    {cartQuantity}
                  </span>
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={handleIncrement}
                    className="w-6 h-6 rounded-lg bg-white text-[#081C15] flex items-center justify-center border border-stone-200 shadow-2xs hover:bg-stone-50"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3 h-3 text-[#1B4332]" />
                  </motion.button>
                </div>

                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={() => openCartDrawer()}
                  className="text-[10px] font-bold py-1 px-2 sm:px-2.5 bg-[#1B4332] text-white rounded-lg hover:bg-[#081C15] transition-colors inline-flex items-center gap-1 shadow-2xs"
                >
                  <ShoppingBag className="w-2.5 h-2.5 text-[#D4AF37]" />
                  <span>Bag</span>
                </motion.button>
              </motion.div>
            ) : (
              /* Initial State: Sleek Full-Width Quick Add CTA */
              <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddToCart}
                  disabled={
                    product?.inventory?.trackQuantity &&
                    product?.inventory?.quantity === 0
                  }
                  className="w-full sm:flex-1 text-[11px] sm:text-xs font-semibold py-2 sm:py-2.5 px-3 rounded-xl bg-[#1B4332] text-white hover:bg-[#081C15] transition-all duration-200 inline-flex items-center justify-center gap-1.5 shadow-xs whitespace-nowrap active:scale-95 group/btn"
                >
                  {justAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#10B981]" />
                      <span className="text-[#10B981]">Added ✓</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D4AF37] group-hover/btn:scale-110 transition-transform" />
                      <span>Quick Add</span>
                    </>
                  )}
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBuyNow}
                  disabled={
                    product?.inventory?.trackQuantity &&
                    product?.inventory?.quantity === 0
                  }
                  className="hidden sm:inline-flex sm:flex-1 text-[11px] sm:text-xs font-semibold py-2 sm:py-2.5 px-3 rounded-xl bg-white border border-[#1B4332] text-[#1B4332] hover:bg-[#FAF7F2] transition-all duration-200 items-center justify-center gap-1.5 shadow-2xs whitespace-nowrap active:scale-95"
                >
                  <span>Buy Now</span>
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
