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
  ShieldCheck,
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
import { trackEvent } from "@/lib/analytics";
import { motion } from "framer-motion";

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
  const { openModal, openCartDrawer, showToast, isAgeVerified } = useUIStore();

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
      message: `${product.name} added to cart.`,
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
        message: `${product.name} added to your wishlist.`,
      });
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openModal("quick-view", { product });
  };

  // Clinical specs row (IMC & Krishna Style): "FOR: ..." | "WITH: ..."
  const getClinicalSpecs = () => {
    if (product.id === "body-essential-nutrition") {
      return {
        forText: "Muscle Vitality & Stamina",
        withText: "Shudh Shilajit & Safed Musli",
      };
    }
    if (product.id === "staymax-delay-spray") {
      return {
        forText: "Intimate Control & Delay",
        withText: "Pure Aloe & Vitamin E",
      };
    }
    if (product.id === "hair-regrow-kit") {
      return {
        forText: "Follicle Strength & Regrowth",
        withText: "Bhringraj & Amla Root",
      };
    }
    if (product.id === "hair-regrow-capsules") {
      return {
        forText: "Root Micronutrients & Density",
        withText: "Biotin, Brahmi & Amla",
      };
    }
    if (product.id === "hair-regrow-oil") {
      return {
        forText: "Scalp Nourishment & Anti-Fall",
        withText: "Rosemary & Cold-Pressed Taila",
      };
    }
    if (product.id === "vitality-power-combo") {
      return {
        forText: "Inside-Out Synergy & Potency",
        withText: "Ashwagandha KSM & Shilajit",
      };
    }
    return {
      forText: "Cellular Energy & Vitality",
      withText: "Classical Shuddha Botanicals",
    };
  };

  const clinical = getClinicalSpecs();

  if (variant === "compact") {
    return (
      <Link
        href={`/product/${product.slug}`}
        className="flex gap-3.5 p-2.5 bg-white rounded-xl border border-[#0E3924]/15 hover:border-[#0E3924] transition-colors group shadow-xs"
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
          <h4 className="font-heading font-normal text-xs sm:text-sm text-[#071A12] line-clamp-1 group-hover:text-[#D4AF37] transition-colors break-words">
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

  // Clinical Bento Product Card (2-Column Grid on Mobile)
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.22 } }}
      className="h-full group relative rounded-2xl border border-[#0E3924]/15 bg-white hover:border-[#0E3924]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-[0_4px_20px_rgba(7,26,18,0.06)] hover:shadow-[0_10px_32px_rgba(7,26,18,0.12)] w-full min-w-0"
    >
      {/* 1:1 Aspect Ratio Image Canvas with Subtle Luxury Zoom */}
      <div className="relative w-full aspect-square border-b border-[#0E3924]/10 bg-[#FAF7F2] overflow-hidden group/img">
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
            className="object-contain p-3 sm:p-5 transition-transform duration-500 ease-out group-hover:scale-105 group-hover/img:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            onError={() => setImageError(true)}
          />
        </Link>

        {/* Clean Editorial Discount Pill */}
        {hasDiscount && (
          <div className="absolute top-2 left-2 z-10 pointer-events-none">
            <span className="bg-[#0E3924] text-[#FDFBF7] text-[9px] sm:text-[10px] font-sans font-semibold px-2 py-0.5 rounded-full shadow-xs tracking-wider uppercase border border-[#D4AF37]/30">
              {discountPercentage}% OFF
            </span>
          </div>
        )}

        {/* Top-Right Quick-View & Wishlist Actions */}
        <div className="absolute top-2 right-2 z-10 flex items-center gap-1">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleQuickView}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center border border-[#0E3924]/15 text-[#555555] hover:text-[#071A12] transition-colors shadow-xs"
            aria-label="Quick view"
            title="Quick View"
          >
            <Eye className="w-3.5 h-3.5" />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={handleWishlistToggle}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center border border-[#0E3924]/15 transition-colors shadow-xs ${
              inWishlist
                ? "text-rose-600 border-rose-300"
                : "text-[#555555] hover:text-[#071A12]"
            } ${isHeartPopping ? "animate-[heartPop_0.45s_ease-in-out]" : ""}`}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              className={`w-3.5 h-3.5 ${inWishlist ? "fill-current text-rose-600" : ""}`}
            />
          </motion.button>
        </div>

        {/* Verified Lab Standard Micro Tag */}
        <div className="absolute bottom-2 left-2 right-2 z-10 pointer-events-none flex justify-center">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/95 border border-[#0E3924]/15 text-[8px] sm:text-[9px] font-sans font-medium text-[#0E3924] shadow-2xs">
            <ShieldCheck className="w-2.5 h-2.5 text-[#10B981]" />
            <span>NABL Certified • 100% Shuddha</span>
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2.5 bg-white min-w-0">
        <div className="space-y-1.5 min-w-0">
          {/* Clinical Therapeutic Keynote */}
          <div className="text-[9px] sm:text-[10px] font-mono leading-tight bg-[#FAF7F2] px-2 py-1.5 rounded-lg border border-[#D4AF37]/25 truncate">
            <span className="text-[#0E3924] font-semibold">{clinical.forText}</span>
            <span className="text-[#9E8047] mx-1">•</span>
            <span className="text-[#666666]">{clinical.withText}</span>
          </div>

          {/* Product Title (2 Lines Max, Fixed Height to Align Across Grid) */}
          <h3 className="font-editorial text-xs sm:text-[15px] text-[#071A12] line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem] group-hover:text-[#0E3924] transition-colors break-words whitespace-normal leading-snug">
            <Link href={`/product/${product.slug}`}>{product.name}</Link>
          </h3>
        </div>

        {/* Price & Rating Section */}
        <div className="mt-auto pt-1 space-y-2">
          {/* Rating Row */}
          <div className="flex items-center justify-between text-xs">
            <Rating rating={4.9} reviewsCount={128} size="sm" />
            <span className="text-[9px] font-mono uppercase text-[#0E3924] tracking-wider font-semibold">
              Ayurvedic
            </span>
          </div>

          {/* Price Row with Clean Strikethrough & Savings Tag */}
          <div className="flex items-baseline justify-between pt-0.5">
            <PriceDisplay
              price={product.price}
              compareAtPrice={product.compareAtPrice}
              size="sm"
            />
            {hasDiscount && (
              <span className="text-[9px] sm:text-[10px] font-sans font-semibold text-[#0E3924] bg-[#FAF7F2] border border-[#0E3924]/20 px-1.5 py-0.5 rounded">
                SAVE ₹{Math.round(((product.compareAtPrice! - product.price) / 100))}
              </span>
            )}
          </div>

          {/* Clean Editorial Add to Cart CTA */}
          <div className="pt-1.5 border-t border-[#0E3924]/10">
            {inCart ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full flex items-center justify-between bg-[#FAF7F2] p-1 px-1.5 sm:px-2 rounded-xl border border-[#0E3924]/20"
              >
                <div className="flex items-center gap-1">
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={handleDecrement}
                    className="w-6 h-6 rounded-lg bg-white text-[#071A12] flex items-center justify-center border border-stone-200 shadow-2xs hover:bg-stone-50"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3 h-3 text-[#0E3924]" />
                  </motion.button>
                  <span className="text-[11px] font-bold text-[#071A12] px-1.5 min-w-[18px] text-center font-sans">
                    {cartQuantity}
                  </span>
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={handleIncrement}
                    className="w-6 h-6 rounded-lg bg-white text-[#071A12] flex items-center justify-center border border-stone-200 shadow-2xs hover:bg-stone-50"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3 h-3 text-[#0E3924]" />
                  </motion.button>
                </div>

                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={() => openCartDrawer()}
                  className="text-[10px] font-semibold py-1 px-2.5 bg-[#0E3924] text-white rounded-lg hover:bg-[#071A12] transition-colors inline-flex items-center gap-1 shadow-2xs"
                >
                  <ShoppingBag className="w-2.5 h-2.5 text-[#D4AF37]" />
                  <span>View Bag</span>
                </motion.button>
              </motion.div>
            ) : (
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={handleAddToCart}
                disabled={
                  product?.inventory?.trackQuantity &&
                  product?.inventory?.quantity === 0
                }
                className="w-full text-[11px] sm:text-xs font-sans font-semibold py-2.5 px-3 rounded-xl bg-[#0E3924] text-white hover:bg-[#071A12] transition-colors inline-flex items-center justify-center gap-1.5 shadow-xs whitespace-nowrap active:scale-95 group/btn"
              >
                {justAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span className="text-white">Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D4AF37] group-hover/btn:scale-110 transition-transform" />
                    <span>ADD TO BAG</span>
                  </>
                )}
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
