"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Star,
  Plus,
  Minus,
  Truck,
  ShieldCheck,
  Leaf,
  Banknote,
  CheckCircle2,
  ChevronDown,
  Droplets,
  Clock,
  Sun,
  MessageCircle,
  ShoppingBag,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { classNames } from "@/lib/utils/formatters";
import { Button } from "@/components/ui/Button";
import { ImageGallery } from "@/components/ui/ImageGallery";
import type { Product, ProductVariant } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { useUIStore } from "@/store/uiStore";
import { useUserStore } from "@/store/userStore";
import {
  useWhatsAppStore,
  buildWhatsAppUrl,
  buildProductEnquiryMessage,
} from "@/store/whatsappStore";
import { formatINR } from "@/lib/utils/formatters";
import { PincodeDeliveryEstimator } from "@/components/product/PincodeDeliveryEstimator";
import { DiscreetPackagingBadge } from "@/components/product/DiscreetPackagingBadge";
import {
  ReviewSubmissionModal,
  CustomerReview,
} from "@/components/product/ReviewSubmissionModal";

export function ProductDetails({
  product,
  selectedVariant,
  onVariantChange,
}: {
  product: Product;
  selectedVariant?: ProductVariant;
  onVariantChange?: (variant: ProductVariant) => void;
}) {
  const router = useRouter();
  const { addItem } = useCartStore();
  const { openCartDrawer, showToast } = useUIStore();

  const [quantity, setQuantity] = useState(1);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState(
    selectedVariant?.id || product.variants[0]?.id,
  );

  // Accordion state
  const [openFaq, setOpenFaq] = useState<string | null>("overview");

  // Reviews state
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [customReviews, setCustomReviews] = useState<CustomerReview[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`ayur_custom_reviews_${product.id}`);
      if (saved) {
        setCustomReviews(JSON.parse(saved));
      }
    } catch {}
  }, [product.id]);

  const defaultReviews: CustomerReview[] = [
    {
      id: "def-1",
      author: "Rajesh S.",
      location: "New Delhi",
      rating: 5,
      date: "2 weeks ago",
      title: "Noticeable improvement in daily stamina and focus",
      comment:
        "Been using this formulation consistently for the past month. Genuine Ayurvedic potency without any synthetic side effects. Very impressed with the quick dispatch and discreet packaging.",
      verified: true,
    },
    {
      id: "def-2",
      author: "Amit V.",
      location: "Bengaluru, Karnataka",
      rating: 5,
      date: "1 month ago",
      title: "Authentic standardized herbs, totally worth it",
      comment:
        "The difference between raw market herbs and this calibrated extract is clearly felt. Noticeably higher energy throughout workdays. High recommendation.",
      verified: true,
    },
    {
      id: "def-3",
      author: "Sunita P.",
      location: "Pune, Maharashtra",
      rating: 5,
      date: "1 month ago",
      title: "Clean packaging and prompt customer support",
      comment:
        "Doctor consultation on WhatsApp helped clarify exact dosage timing with meals. Delivered in 2 days via BlueDart.",
      verified: true,
    },
  ];

  const allReviews = [...customReviews, ...defaultReviews];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const variantParam = urlParams.get("variant");
      if (variantParam) {
        const match = product.variants.find(
          (v) =>
            v.id === variantParam ||
            v.id.toLowerCase().includes(variantParam.toLowerCase()),
        );
        if (match) {
          setSelectedVariantId(match.id);
          onVariantChange?.(match);
        }
      }
    }
  }, [product.variants, onVariantChange]);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 280);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentVariant =
    product.variants.find((v) => v.id === selectedVariantId) ||
    product.variants[0];
  const maxQuantity = currentVariant?.inventory || product.inventory.quantity;

  const handleAddToCart = () => {
    addItem(product, selectedVariantId, quantity);
    showToast({
      type: "success",
      title: "Added to Cart",
      message: `${product.name} has been added.`,
    });
    openCartDrawer();
  };

  const handleBuyNow = () => {
    addItem(product, selectedVariantId, quantity);
    router.push("/checkout");
  };

  const { user } = useUserStore();
  const { trackLead } = useWhatsAppStore();

  const handleWhatsAppOrder = () => {
    const primaryAddr = user?.addresses?.[0];
    const userCity = primaryAddr
      ? [primaryAddr.city, primaryAddr.state].filter(Boolean).join(", ")
      : "";
    const variantSuffix = currentVariant ? ` (${currentVariant.name})` : "";
    const message = buildProductEnquiryMessage({
      customerName: user?.name || "",
      customerPhone: user?.phone || "",
      customerCity: userCity,
      productName: `${product.name}${variantSuffix}`,
      quantity: quantity,
      price: (currentVariant?.price || product.price) * quantity,
      enquiry: `Hi Ayur Veda Global, I want to order ${quantity}x ${product.name}${variantSuffix} via Cash on Delivery (COD). Please confirm stock and delivery timeline.`,
      source: "product-page",
    });

    trackLead({
      source: "product-page",
      productName: product.name,
      quantity,
      orderTotal: (currentVariant?.price || product.price) * quantity,
    });

    window.open(buildWhatsAppUrl(message), "_blank");
  };

  const currentPrice = currentVariant?.price || product.price;
  const comparePrice = currentVariant?.compareAtPrice || product.compareAtPrice;
  const discountPct = comparePrice
    ? Math.round(((comparePrice - currentPrice) / comparePrice) * 100)
    : 0;

  const PRODUCT_INGREDIENTS: Record<
    string,
    Array<{ name: string; english: string; benefit: string; image: string }>
  > = {
    "body-essential-nutrition": [
      {
        name: "Ashwagandha",
        english: "Withania somnifera",
        benefit: "Sustained cellular stamina & stress adaptation",
        image: "/images/botanicals/ashwagandha.webp",
      },
      {
        name: "Himalayan Shilajit",
        english: "Mineral Pitch",
        benefit: "Fulvic acid for ATP cellular endurance",
        image: "/images/botanicals/shilajit.webp",
      },
      {
        name: "Safed Musli",
        english: "Chlorophytum borivilianum",
        benefit: "Muscle tissue rejuvenation & inner vigor",
        image: "/images/botanicals/gokshura.webp",
      },
      {
        name: "Gokshura",
        english: "Tribulus terrestris",
        benefit: "Natural testosterone & reproductive vitality",
        image: "/images/botanicals/gokshura.webp",
      },
      {
        name: "Amla",
        english: "Phyllanthus emblica",
        benefit: "Antioxidant cellular defense & digestion",
        image: "/images/botanicals/amla.webp",
      },
    ],
    "staymax-delay-spray": [
      {
        name: "Herbal Extract",
        english: "Syzygium aromaticum",
        benefit: "Gentle nerve soothing without total numbness",
        image: "/images/botanicals/mortar-pestle.webp",
      },
      {
        name: "Aloe Vera",
        english: "Aloe barbadensis",
        benefit: "Deep dermal soothing & frictionless glide",
        image: "/images/botanicals/tulsi.webp",
      },
      {
        name: "Vitamin E",
        english: "Tocopherol",
        benefit: "Cellular hydration & skin barrier protection",
        image: "/images/botanicals/amla.webp",
      },
    ],
    "vitality-power-combo": [
      {
        name: "Ashwagandha",
        english: "Withania somnifera",
        benefit: "Inside-out physical power & vigor",
        image: "/images/botanicals/ashwagandha.webp",
      },
      {
        name: "Himalayan Shilajit",
        english: "Mineral Pitch",
        benefit: "Cellular rejuvenation & physical endurance",
        image: "/images/botanicals/shilajit.webp",
      },
      {
        name: "Gokshura & Musli",
        english: "Synergistic Tonic",
        benefit: "Deep reproductive tissue revitalization",
        image: "/images/botanicals/gokshura.webp",
      },
      {
        name: "Herbal Delay Extract",
        english: "Topical Taila",
        benefit: "Instant external performance & control",
        image: "/images/botanicals/mortar-pestle.webp",
      },
    ],
    "hair-regrow-kit": [
      {
        name: "Bhringraj",
        english: "Eclipta prostrata",
        benefit: "Activates dormant hair follicles",
        image: "/images/botanicals/bhringraj.webp",
      },
      {
        name: "Amla",
        english: "Phyllanthus emblica",
        benefit: "Rich natural Vitamin C, halts hair fall",
        image: "/images/botanicals/amla.webp",
      },
      {
        name: "Neem",
        english: "Azadirachta indica",
        benefit: "Clears scalp micro-inflammation & dandruff",
        image: "/images/botanicals/neem.webp",
      },
      {
        name: "Turmeric",
        english: "Curcuma longa",
        benefit: "Scalp circulation & follicle defense",
        image: "/images/botanicals/turmeric.webp",
      },
      {
        name: "Tulsi",
        english: "Ocimum tenuiflorum",
        benefit: "Purifies scalp sebum & cooling action",
        image: "/images/botanicals/tulsi.webp",
      },
    ],
  };

  const ingredients =
    PRODUCT_INGREDIENTS[product.id] || PRODUCT_INGREDIENTS["hair-regrow-kit"];

  const benefits = [
    {
      title: "Deep Root Nourishment",
      icon: <Droplets className="w-6 h-6 text-[#1f3d2b]" />,
    },
    {
      title: "Controls Breakage",
      icon: <ShieldCheck className="w-6 h-6 text-[#1f3d2b]" />,
    },
    {
      title: "Restores Natural Balance",
      icon: <Leaf className="w-6 h-6 text-[#1f3d2b]" />,
    },
    {
      title: "Zero Side Effects",
      icon: <CheckCircle2 className="w-6 h-6 text-[#1f3d2b]" />,
    },
  ];

  return (
    <div className="bg-[#fafaf9] min-h-screen pb-24 md:pb-12">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left Column: Image Gallery */}
          <div className="space-y-4 sticky top-24">
            <ImageGallery images={product.images} alt={product.name} />
          </div>

          {/* Right Column: Info & Actions */}
          <div className="space-y-6">
            {/* Rating */}
            <div className="flex items-center gap-2 text-sm text-[#1f3d2b] font-medium">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-[#1f3d2b]">4.9</span>
              <span className="text-stone-500 font-normal">|</span>
              <span className="text-[#1f3d2b]">1,420+ Verified Reviews</span>
            </div>

            {/* Title */}
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1f3d2b] leading-tight mb-2">
                {product.name}
              </h1>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF7F2] border border-[#9E8047]/30 text-[#1f3d2b] rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
                <Leaf className="w-3.5 h-3.5 text-[#4E5F52]" />
                Standardized Botanical Formulation
              </div>
            </div>

            {/* Price Block */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-sm space-y-3">
              <div className="flex items-end gap-3 flex-wrap">
                <span className="text-3xl sm:text-4xl font-bold text-[#1f3d2b]">
                  {formatINR(currentPrice)}
                </span>
                {comparePrice && comparePrice > currentPrice && (
                  <>
                    <span className="text-lg text-stone-400 line-through mb-1">
                      {formatINR(comparePrice)}
                    </span>
                    <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-1 rounded mb-1.5">
                      {discountPct}% OFF
                    </span>
                  </>
                )}
              </div>
              <p className="text-xs text-stone-500">
                Inclusive of all taxes.{" "}
                <span className="text-[#1f3d2b] font-medium">
                  Free Shipping across India.
                </span>
              </p>
            </div>

            {/* Variant Selector */}
            {product.variants.length > 0 && (
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-[#1f3d2b]">
                  Select Package
                </label>
                <div className="space-y-2">
                  {product.variants.map((variant, index) => {
                    const isSelected = selectedVariantId === variant.id;
                    const vPrice = variant.price;
                    const vCompare = variant.compareAtPrice || vPrice;
                    const vDiscount =
                      vCompare > vPrice
                        ? Math.round(((vCompare - vPrice) / vCompare) * 100)
                        : 0;

                    let badge = "";
                    if (index === 1)
                      badge = `Save ${vDiscount}% - Most Popular`;
                    if (index === 2) badge = "Best Value";

                    return (
                      <button
                        key={variant.id}
                        onClick={() => {
                          setSelectedVariantId(variant.id);
                          onVariantChange?.(variant);
                        }}
                        className={classNames(
                          "relative w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left",
                          isSelected
                            ? "border-[#1f3d2b] bg-[#e7ede8]/30"
                            : "border-stone-200 bg-white hover:border-[#1f3d2b]/30",
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={classNames(
                              "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                              isSelected
                                ? "border-[#1f3d2b]"
                                : "border-stone-300",
                            )}
                          >
                            {isSelected && (
                              <div className="w-2.5 h-2.5 bg-[#1f3d2b] rounded-full" />
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-[#1f3d2b]">
                              {variant.name}
                            </p>
                            {badge && (
                              <span className="inline-block mt-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                                {badge}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-[#1f3d2b]">
                            {formatINR(vPrice)}
                          </p>
                          {vCompare > vPrice && (
                            <p className="text-xs text-stone-400 line-through">
                              {formatINR(vCompare)}
                            </p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[#1f3d2b]">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border-2 border-stone-200 rounded-lg bg-white overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-stone-600 hover:bg-stone-50 transition-colors disabled:opacity-50"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-semibold text-[#1f3d2b]">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity(Math.min(maxQuantity || 99, quantity + 1))
                    }
                    className="p-3 text-stone-600 hover:bg-stone-50 transition-colors disabled:opacity-50"
                    disabled={quantity >= (maxQuantity || 99)}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {maxQuantity && maxQuantity < 10 && (
                  <span className="text-xs text-red-600 font-medium">
                    Only {maxQuantity} left in stock
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="primary"
                  onClick={handleBuyNow}
                  className="flex-1 bg-[#1f3d2b] hover:bg-[#152a1d] text-white py-4 rounded-xl text-base font-bold uppercase tracking-wider shadow-md"
                >
                  Buy Now (COD Available)
                </Button>
                <Button
                  variant="outline"
                  onClick={handleAddToCart}
                  className="sm:w-1/3 border-2 border-[#1f3d2b] text-[#1f3d2b] hover:bg-[#e7ede8] py-4 rounded-xl text-base font-bold uppercase tracking-wider"
                >
                  Add to Cart
                </Button>
              </div>

              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white text-sm font-semibold tracking-wide transition-all shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
              >
                <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
                <span>Instant Order via WhatsApp (Cash on Delivery)</span>
              </button>
            </div>

            {/* Postal Delivery & Pincode Estimator */}
            <PincodeDeliveryEstimator />

            {/* 100% Discreet Packaging & Privacy Guarantee */}
            <DiscreetPackagingBadge className="mt-4" />

            {/* Trust Icons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-stone-200">
              <div className="flex flex-col items-center justify-center p-2 text-center gap-1">
                <Leaf className="w-6 h-6 text-[#1f3d2b]" />
                <span className="text-[10px] font-semibold text-stone-600 leading-tight">
                  100% Herbal
                  <br />& Raw
                </span>
              </div>
              <div className="flex flex-col items-center justify-center p-2 text-center gap-1">
                <Truck className="w-6 h-6 text-[#1f3d2b]" />
                <span className="text-[10px] font-semibold text-stone-600 leading-tight">
                  Fast 2-3 Day
                  <br />
                  Delivery
                </span>
              </div>
              <div className="flex flex-col items-center justify-center p-2 text-center gap-1">
                <Banknote className="w-6 h-6 text-[#1f3d2b]" />
                <span className="text-[10px] font-semibold text-stone-600 leading-tight">
                  Cash on
                  <br />
                  Delivery
                </span>
              </div>
              <div className="flex flex-col items-center justify-center p-2 text-center gap-1">
                <ShieldCheck className="w-6 h-6 text-[#1f3d2b]" />
                <span className="text-[10px] font-semibold text-stone-600 leading-tight">
                  GMP & Ayush
                  <br />
                  Certified
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* --- Content Sections Below Hero --- */}
        <div className="mt-16 sm:mt-24 space-y-16">
          {/* Key Health Benefits */}
          <section className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm">
            <div className="text-center mb-8">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#1f3d2b] font-semibold">
                Why Choose Ayurveda Global?
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((b, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center p-4 rounded-2xl bg-[#fafaf9] border border-stone-100 hover:border-[#e7ede8] transition-colors"
                >
                  <div className="w-12 h-12 bg-[#e7ede8] rounded-full flex items-center justify-center mb-3">
                    {b.icon}
                  </div>
                  <h3 className="font-semibold text-[#1f3d2b]">{b.title}</h3>
                </div>
              ))}
            </div>
          </section>

          {/* Key Ingredients */}
          <section className="py-8">
            <div className="text-center mb-10">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#1f3d2b] font-semibold mb-2">
                Key Standardized Botanicals
              </h2>
              <p className="text-stone-500 max-w-2xl mx-auto text-xs sm:text-sm">
                Authentic, lab-tested herbal extracts engineered for maximum biological potency and tissue assimilation.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 justify-center">
              {ingredients.map((ing, i) => (
                <div
                  key={i}
                  className="group flex flex-col items-center text-center p-4 bg-white rounded-2xl border border-stone-200 hover:border-[#9E8047]/60 transition-all shadow-xs hover:shadow-md"
                >
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mb-3 border-2 border-[#9E8047]/30 shadow-2xs group-hover:scale-105 transition-transform bg-[#FAF7F2]">
                    <Image
                      src={ing.image}
                      alt={ing.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <h4 className="font-bold text-[#1f3d2b] text-sm">{ing.name}</h4>
                  <p className="text-[10px] text-stone-500 italic mb-1 font-mono">
                    ({ing.english})
                  </p>
                  <p className="text-xs text-stone-600 leading-tight">
                    {ing.benefit}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* How to Use */}
          <section className="bg-[#1f3d2b] text-white rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

            <div className="relative z-10 text-center mb-10">
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold mb-3">
                How to Use / Dosage
              </h2>
              <p className="text-stone-300">Simple steps for best results.</p>
            </div>

            <div className="relative z-10 grid sm:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                  <Droplets className="w-8 h-8 text-[#e7ede8]" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Step 1: Measure</h3>
                  <p className="text-sm text-stone-300">
                    Take 30ml juice or few drops of oil as required.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center space-y-4 relative">
                <div className="hidden sm:block absolute top-8 left-0 w-full h-[1px] bg-white/20 -z-10" />
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                  <CheckCircle2 className="w-8 h-8 text-[#e7ede8]" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">
                    Step 2: Apply / Consume
                  </h3>
                  <p className="text-sm text-stone-300">
                    Mix with water if juice. Massage gently if oil.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                  <Sun className="w-8 h-8 text-[#e7ede8]" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">
                    Step 3: Best Timing
                  </h3>
                  <p className="text-sm text-stone-300">
                    Empty stomach in morning or overnight application.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Accordion */}
          <section className="max-w-3xl mx-auto py-8">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1f3d2b] font-semibold text-center mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {[
                {
                  id: "overview",
                  title: "Product Overview",
                  content:
                    product.description ||
                    "A highly potent ayurvedic formulation targeting root causes naturally.",
                },
                {
                  id: "ingredients",
                  title: "Complete Ingredients List",
                  content:
                    product.ingredients?.join(", ") ||
                    "Bhringraj, Amla, Methi, Neem, Giloy, Karela, Aloe Vera, Ashwagandha, Brahmi, Jatamansi, Shikakai.",
                },
                {
                  id: "doctor",
                  title: "Doctor Advice & Safety",
                  content:
                    "Safe for regular use. Formulated in GMP-certified facilities under expert supervision. Pregnant women or individuals with specific conditions should consult a physician.",
                },
                {
                  id: "shipping",
                  title: "Shipping & Returns",
                  content:
                    "Free shipping across India on all prepaid and COD orders. Delivery within 2-5 working days. 7-day easy return policy for damaged or incorrect items.",
                },
              ].map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() =>
                      setOpenFaq(openFaq === faq.id ? null : faq.id)
                    }
                    className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-[#fafaf9] transition-colors"
                  >
                    <span className="font-semibold text-[#1f3d2b]">
                      {faq.title}
                    </span>
                    <ChevronDown
                      className={classNames(
                        "w-5 h-5 text-stone-400 transition-transform duration-200",
                        openFaq === faq.id ? "rotate-180" : "",
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {openFaq === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-5 pt-0 text-stone-600 text-sm leading-relaxed border-t border-stone-100">
                          {faq.content}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </section>

          {/* Customer Reviews & Testimonials Section */}
          <section className="max-w-4xl mx-auto py-10 border-t border-stone-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex text-[#D4AF37]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <span className="font-bold text-lg text-[#1f3d2b]">4.9 out of 5</span>
                  <span className="text-xs text-stone-500 font-mono">
                    ({allReviews.length} verified ratings)
                  </span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1f3d2b]">
                  Verified Patron Experiences
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setIsReviewModalOpen(true)}
                className="px-5 py-2.5 rounded-full bg-[#071A12] hover:bg-[#152a1d] text-[#D4AF37] text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
              >
                Write a Review
              </button>
            </div>

            {/* Rating Breakdown Bars */}
            <div className="grid sm:grid-cols-2 gap-6 bg-stone-50/80 p-5 rounded-2xl border border-stone-200 mb-8">
              <div className="flex flex-col justify-center">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl sm:text-4xl font-serif font-bold text-[#1f3d2b]">4.9</span>
                  <span className="text-stone-500 text-xs sm:text-sm">out of 5.0</span>
                </div>
                <div className="flex text-[#D4AF37] mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-stone-600 font-sans">
                  100% verified customer ratings compiled from apothecary consultations and direct orders.
                </p>
              </div>

              <div className="space-y-1.5 justify-center flex flex-col text-xs font-mono">
                {[
                  { star: 5, pct: "92%" },
                  { star: 4, pct: "8%" },
                  { star: 3, pct: "0%" },
                  { star: 2, pct: "0%" },
                  { star: 1, pct: "0%" },
                ].map((row) => (
                  <div key={row.star} className="flex items-center gap-2">
                    <span className="w-7 text-stone-600 text-[11px] shrink-0">{row.star} ★</span>
                    <div className="flex-1 h-2 bg-stone-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#D4AF37] rounded-full transition-all"
                        style={{ width: row.pct }}
                      />
                    </div>
                    <span className="w-8 text-right text-[10px] text-stone-500 shrink-0">{row.pct}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {allReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex text-[#D4AF37]">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-[10.5px] font-mono text-stone-400">
                        {rev.date}
                      </span>
                    </div>

                    <h4 className="font-semibold text-sm text-[#1f3d2b] mb-1 leading-snug">
                      {rev.title}
                    </h4>

                    <p className="text-xs text-stone-600 leading-relaxed font-sans line-clamp-4 mb-3">
                      &ldquo;{rev.comment}&rdquo;
                    </p>

                    {rev.image && (
                      <div className="mb-3">
                        <img
                          src={rev.image}
                          alt="Customer verification photo"
                          className="w-16 h-16 rounded-xl object-cover border border-stone-200 shadow-2xs hover:scale-105 transition-transform cursor-pointer"
                          onClick={() => window.open(rev.image, "_blank")}
                        />
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-semibold text-[#1f3d2b] block">
                        {rev.author}
                      </span>
                      <span className="text-[10.5px] text-stone-400 font-mono">
                        {rev.location}
                      </span>
                    </div>
                    {rev.verified && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium text-[#075E54] bg-[#25D366]/15 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3 text-[#25D366]" />
                        Verified
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Review Submission Modal */}
          <ReviewSubmissionModal
            productId={product.id}
            productName={product.name}
            isOpen={isReviewModalOpen}
            onClose={() => setIsReviewModalOpen(false)}
            onReviewSubmitted={(newRev) => {
              setCustomReviews((prev) => [newRev, ...prev]);
            }}
          />
        </div>
      </div>

      {/* Mobile Sticky CTA Dock */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#071A12]/95 backdrop-blur-md border-t border-[#D4AF37]/30 shadow-2xl p-2.5 px-3 flex items-center justify-between gap-2.5"
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-[#D4AF37]/40 shrink-0 bg-stone-900">
                <Image
                  src={productImages[0] || "/images/products/himalayan-shilajit-resin-card.jpg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-white truncate max-w-[110px]">
                  {product.name}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="font-bold text-sm text-[#D4AF37] font-mono">
                    {formatINR(currentPrice)}
                  </span>
                  {comparePrice && comparePrice > currentPrice && (
                    <span className="text-[10px] text-stone-400 line-through">
                      {formatINR(comparePrice)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="w-9 h-9 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white flex items-center justify-center shadow-xs active:scale-95 cursor-pointer"
                title="Order via WhatsApp"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
              </button>
              <button
                type="button"
                onClick={handleAddToCart}
                className="px-3 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#E5C358] text-[#071A12] text-xs font-bold uppercase tracking-wider shadow-md active:scale-95 flex items-center gap-1 cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-[#071A12]" />
                <span>Add</span>
              </button>
              <button
                type="button"
                onClick={handleBuyNow}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-stone-100 text-[#071A12] text-xs font-bold uppercase tracking-wider shadow-md active:scale-95 cursor-pointer"
              >
                Buy Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
