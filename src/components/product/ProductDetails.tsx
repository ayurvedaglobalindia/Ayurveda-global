"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  const { addItem } = useCartStore();
  const { openCartDrawer, showToast } = useUIStore();

  const [quantity, setQuantity] = useState(1);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState(
    selectedVariant?.id || product.variants[0]?.id,
  );

  // Accordion state
  const [openFaq, setOpenFaq] = useState<string | null>("overview");

  const variantParam = searchParams?.get("variant");

  useEffect(() => {
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
  }, [variantParam, product.variants, onVariantChange]);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 450);
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

  const ingredients = [
    {
      name: "Bhringraj",
      english: "False Daisy",
      benefit: "Promotes hair growth",
    },
    {
      name: "Amla",
      english: "Indian Gooseberry",
      benefit: "Rich in Vitamin C",
    },
    { name: "Methi", english: "Fenugreek", benefit: "Prevents hair fall" },
    {
      name: "Neem",
      english: "Indian Lilac",
      benefit: "Anti-dandruff properties",
    },
    {
      name: "Giloy",
      english: "Heart-leaved moonseed",
      benefit: "Reduces stress",
    },
    { name: "Karela", english: "Bitter Gourd", benefit: "Purifies scalp" },
  ];

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
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#e7ede8] text-[#1f3d2b] rounded-full text-xs font-semibold uppercase tracking-wider">
                <Leaf className="w-3.5 h-3.5" />
                Formulated with 11 Raw Potent Herbs
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
              <h2 className="font-serif text-2xl sm:text-3xl text-[#1f3d2b] font-semibold mb-3">
                Power of 11 Pure Herbs
              </h2>
              <p className="text-stone-500 max-w-2xl mx-auto">
                Carefully selected natural ingredients to provide maximum
                efficacy and safety.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
              {ingredients.map((ing, i) => (
                <div
                  key={i}
                  className="group flex flex-col items-center text-center p-4 bg-white rounded-2xl border border-stone-200 hover:border-[#1f3d2b] transition-all shadow-sm hover:shadow-md cursor-default"
                >
                  <div className="w-16 h-16 rounded-full bg-[#e7ede8] flex items-center justify-center mb-3 group-hover:bg-[#1f3d2b] transition-colors">
                    <Leaf className="w-8 h-8 text-[#1f3d2b] group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="font-bold text-[#1f3d2b]">{ing.name}</h4>
                  <p className="text-[10px] text-stone-500 mb-1">
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
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-stone-200 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] p-3 px-4 flex items-center justify-between gap-4"
          >
            <div className="flex flex-col">
              <span className="text-xs text-stone-500 line-through leading-none mb-1">
                {comparePrice && comparePrice > currentPrice
                  ? formatINR(comparePrice)
                  : ""}
              </span>
              <span className="font-bold text-xl text-[#1f3d2b] leading-none">
                {formatINR(currentPrice)}
              </span>
            </div>
            <Button
              variant="primary"
              onClick={handleBuyNow}
              className="flex-1 bg-[#1f3d2b] hover:bg-[#152a1d] text-white py-3 rounded-lg text-sm font-bold uppercase tracking-wider shadow-sm"
            >
              Buy Now
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
