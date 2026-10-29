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
  Star,
} from "lucide-react";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { Rating } from "@/components/ui/Rating";
import { formatINR } from "@/lib/utils/formatters";
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
          openCartDrawer();
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
    openCartDrawer();
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
    if (product.id === "himalayan-shilajit-resin") {
      return {
        forText: "Endurance & Cellular Stamina",
        withText: "75%+ Fulvic Acid & 84+ Minerals",
      };
    }
    if (product.id === "ashwagandha-root-extract") {
      return {
        forText: "Cortisol Relief & Muscular Recovery",
        withText: "KSM-66 Full-Spectrum Withanolides",
      };
    }
    if (product.id === "vajikara-gold-vitality-oil") {
      return {
        forText: "Microcirculation & Tissue Vigour",
        withText: "Swarna Bhasma & Classical Kesar",
      };
    }
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

  // Variant: List Layout (Horizontal on Desktop/Mobile)
  if (variant === "list") {
    return (
      <motion.article
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 0.35 }}
        className="group relative rounded-2xl border border-[#0E3924]/15 bg-white hover:border-[#0E3924]/35 transition-all p-3 sm:p-4 flex flex-col sm:flex-row items-center gap-4 shadow-2xs hover:shadow-md w-full"
      >
        <div className="relative w-28 h-32 sm:w-36 sm:h-40 bg-[#FAF7F2] rounded-xl overflow-hidden flex-shrink-0 border border-[#0E3924]/10">
          <Link href={`/product/${product.slug}`} className="block relative w-full h-full">
            <Image
              src={imageError ? "/images/products/body-essential-nutrition-card.jpg" : primaryImage.src}
              alt={primaryImage.alt}
              fill
              sizes="(max-width: 640px) 112px, 144px"
              className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
              onError={() => setImageError(true)}
            />
          </Link>
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-between w-full h-full space-y-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-[#0E3924]/6 text-[#0E3924] border border-[#0E3924]/10">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-[#0E3924]">
                <Star className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" />
                <span>{product.rating || 4.9}</span>
              </div>
            </div>

            <h3 className="font-editorial text-base sm:text-lg text-[#071A12] font-medium leading-snug">
              <Link href={`/product/${product.slug}`} className="hover:text-[#0E3924] transition-colors">
                {product.name}
              </Link>
            </h3>

            <p className="text-xs text-[#555555] line-clamp-2 font-editorial">
              {product.shortDescription || product.description}
            </p>
          </div>

          <div className="flex items-center justify-between gap-3 pt-2 border-t border-[#0E3924]/10 flex-wrap">
            <div className="flex items-baseline gap-2">
              <span className="font-sans text-base font-bold text-[#071A12]">
                {formatINR(product.price)}
              </span>
              {hasDiscount && (
                <span className="text-xs text-stone-400 line-through">
                  {formatINR(product.compareAtPrice!)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleWishlistToggle}
                className="p-2 rounded-xl border border-stone-200 text-stone-600 hover:text-rose-600 transition-colors"
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${inWishlist ? "fill-rose-500 text-rose-500" : ""}`} />
              </button>

              <button
                type="button"
                onClick={handleAddToCart}
                className="px-4 py-2 bg-[#0E3924] text-white rounded-xl text-xs font-semibold hover:bg-[#071A12] transition-colors inline-flex items-center gap-1.5 shadow-xs"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{justAdded ? "Added!" : "Add to Bag"}</span>
              </button>
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  // Clinical Bento Product Card (2-Column Grid on Mobile)
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="h-full group relative rounded-2xl border border-[#0E3924]/15 bg-white hover:border-[#0E3924]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-[0_2px_12px_rgba(7,26,18,0.04)] hover:shadow-[0_8px_24px_rgba(7,26,18,0.1)] w-full min-w-0"
    >
      {/* 4:5 Portrait Ratio Image Canvas Matching Botanical Studio Imagery */}
      <div className="relative w-full aspect-[4/5] bg-[#FAF7F2] overflow-hidden group/img border-b border-[#0E3924]/10">
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
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={
              product.id === "vitality-power-combo" ||
              product.id === "body-essential-nutrition"
            }
            className="object-contain transition-transform duration-500 ease-out group-hover:scale-105 group-hover/img:scale-105"
            onError={() => setImageError(true)}
          />
        </Link>

        {/* Top Header Discount Badge (Myntra / Meesho Style Sleek Pill) */}
        {hasDiscount && (
          <div className="absolute top-1.5 left-1.5 z-10 pointer-events-none">
            <span className="bg-[#0E3924] text-[#FDFBF7] text-[8px] sm:text-[9px] font-sans font-bold px-1.5 py-0.5 rounded-full shadow-xs tracking-wider uppercase border border-[#D4AF37]/40 flex items-center gap-0.5">
              <span>{discountPercentage}% OFF</span>
            </span>
          </div>
        )}

        {/* Top-Right: Discreet Quick Action Buttons (Chote Icons, Elegant Glass Pill - Myntra / Flipkart style) */}
        <div className="absolute top-1.5 right-1.5 z-10 flex items-center gap-1">
          {/* Quick View Button */}
          <button
            type="button"
            onClick={handleQuickView}
            className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/95 hover:bg-white text-[#071A12] hover:text-[#0E3924] flex items-center justify-center border border-stone-200/80 shadow-2xs transition-all active:scale-90"
            aria-label={`Quick preview for ${product.name}`}
            title="Quick Preview"
          >
            <Eye className="w-3 h-3" />
          </button>

          {/* Wishlist Button */}
          <button
            type="button"
            onClick={handleWishlistToggle}
            className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/95 hover:bg-white flex items-center justify-center border border-stone-200/80 shadow-2xs transition-all active:scale-90 ${
              inWishlist ? "text-rose-500" : "text-[#071A12] hover:text-rose-500"
            }`}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              className={`w-3 h-3 ${inWishlist ? "fill-rose-500 text-rose-500" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Card Body - Perfectly Balanced Spacing & Natural Benefit Typography */}
      <div className="p-2 sm:p-3 flex-1 flex flex-col justify-between space-y-1.5 bg-white min-w-0">
        <div className="space-y-0.5 min-w-0">
          {/* Natural Benefit Highlight Text - Compact Tagline */}
          <p className="text-[9.5px] sm:text-[10px] text-[#0E3924] font-medium line-clamp-1 leading-normal tracking-wide">
            <span className="font-semibold">{clinical.forText}</span>
            <span className="text-[#9E8047] mx-1">•</span>
            <span className="text-[#666666] font-normal">{clinical.withText}</span>
          </p>

          {/* Product Title (Clean, refined size like Ajio/Myntra luxury beauty) */}
          <h3 className="font-sans text-[12px] sm:text-[13.5px] font-medium text-[#071A12] line-clamp-2 min-h-[2.1rem] sm:min-h-[2.4rem] group-hover:text-[#0E3924] transition-colors leading-snug break-words">
            <Link href={`/product/${product.slug}`} className="hover:underline">
              {product.name}
            </Link>
          </h3>
        </div>

        {/* Rating, Pricing & CTA Section */}
        <div className="mt-auto pt-0.5 space-y-1.5">
          {/* Compact Non-Clipping Rating Row (Flipkart / Amazon Pill Style) */}
          <div className="flex items-center justify-between text-xs min-w-0">
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-sm bg-[#0E3924]/8 text-[#0E3924] text-[9.5px] sm:text-[10px] font-bold shrink-0">
              <Star className="w-2.5 h-2.5 fill-[#D4AF37] text-[#D4AF37]" />
              <span>{product.rating || 4.9}</span>
              <span className="text-[8.5px] sm:text-[9px] text-[#555555] font-normal">
                ({product.reviewCount || 128})
              </span>
            </span>
            <span className="text-[8px] sm:text-[8.5px] font-sans uppercase text-[#0E3924] tracking-wider font-semibold px-1.5 py-0.5 rounded-full bg-[#FAF7F2] border border-[#0E3924]/10 shrink-0">
              {product.category === "supplements" ? "Rasayana" : product.category === "wellness" ? "Vajikara" : "Taila"}
            </span>
          </div>

          {/* Price Row (Flipkart & Myntra style clear layout) */}
          <div className="flex items-center justify-between gap-1 pt-0.5 flex-wrap">
            <div className="flex items-baseline gap-1.5">
              <span className="font-sans text-[13px] sm:text-[14.5px] font-bold text-[#071A12] tracking-tight">
                {formatINR(product.price)}
              </span>
              {hasDiscount && (
                <span className="text-[10px] sm:text-[11px] text-stone-400 line-through font-normal">
                  {formatINR(product.compareAtPrice!)}
                </span>
              )}
            </div>
            {hasDiscount && (
              <span className="text-[8px] sm:text-[8.5px] font-sans font-bold text-[#0E3924] bg-[#0E3924]/8 border border-[#0E3924]/15 px-1.5 py-0.2 rounded-full shrink-0 tracking-tight">
                Save ₹{Math.round((product.compareAtPrice! - product.price) / 100)}
              </span>
            )}
          </div>

          {/* Add to Bag CTA and View Link */}
          <div className="pt-2 border-t border-[#0E3924]/10 space-y-1.5">
            {inCart ? (
              <div className="w-full flex items-center justify-between bg-[#FAF7F2] p-1 px-1.5 sm:px-2 rounded-xl border border-[#0E3924]/20">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={handleDecrement}
                    className="w-6 h-6 rounded-lg bg-white text-[#071A12] flex items-center justify-center border border-stone-200 shadow-2xs hover:bg-stone-50 active:scale-95 transition-all"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3 h-3 text-[#0E3924]" />
                  </button>
                  <span className="text-[11px] font-bold text-[#071A12] px-1.5 min-w-[18px] text-center font-sans">
                    {cartQuantity}
                  </span>
                  <button
                    type="button"
                    onClick={handleIncrement}
                    className="w-6 h-6 rounded-lg bg-white text-[#071A12] flex items-center justify-center border border-stone-200 shadow-2xs hover:bg-stone-50 active:scale-95 transition-all"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3 h-3 text-[#0E3924]" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => openCartDrawer()}
                  className="text-[10px] font-semibold py-1 px-2.5 bg-[#0E3924] text-white rounded-lg hover:bg-[#071A12] transition-colors inline-flex items-center gap-1 shadow-2xs active:scale-95"
                >
                  <ShoppingBag className="w-2.5 h-2.5 text-[#D4AF37]" />
                  <span>View Bag</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={
                  product?.inventory?.trackQuantity &&
                  product?.inventory?.quantity === 0
                }
                className="w-full text-[11px] sm:text-xs font-sans font-bold py-2 sm:py-2.5 px-3 rounded-lg bg-[#0E3924] hover:bg-[#071A12] text-white transition-all inline-flex items-center justify-center gap-1.5 shadow-2xs whitespace-nowrap active:scale-95 group/btn"
              >
                {justAdded ? (
                  <>
                    <Check className="w-3 h-3 text-[#D4AF37]" />
                    <span className="text-white">Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3 h-3 text-[#D4AF37] group-hover/btn:scale-110 transition-transform" />
                    <span className="tracking-wide">ADD TO BAG</span>
                  </>
                )}
              </button>
            )}

            {/* Accessible View Details text link */}
            <div className="text-center">
              <Link
                href={`/product/${product.slug}`}
                className="text-[10px] sm:text-[11px] text-[#737373] hover:text-[#0E3924] font-sans font-medium transition-colors hover:underline inline-flex items-center gap-0.5"
              >
                <span>View Details</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
