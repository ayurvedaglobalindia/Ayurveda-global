/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Save,
  Image as ImageIcon,
  DollarSign,
  Tag,
  Layers,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  FileText,
  Sliders,
  ShieldCheck,
  Eye,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import type { Product } from "@/types";
import { formatINR } from "@/lib/utils/formatters";

interface ProductEditorModalProps {
  isOpen: boolean;
  product: Product | null;
  onClose: () => void;
  onSave: (product: Product) => void;
}

const PRESET_IMAGES = [
  {
    label: "Himalayan Shilajit Resin",
    src: "/images/products/himalayan-shilajit-resin-card.jpg",
  },
  {
    label: "Ashwagandha KSM-66",
    src: "/images/products/ashwagandha-root-extract-card.jpg",
  },
  {
    label: "BODY Essential Nutrition",
    src: "/images/products/body-essential-nutrition-card.jpg",
  },
  {
    label: "Vajikara Gold Vitality Oil",
    src: "/images/products/vajikara-gold-vitality-oil-card.jpg",
  },
  {
    label: "STAYMAX+ Delay Spray",
    src: "/images/products/staymax-delay-spray-card.jpg",
  },
  {
    label: "Vitality Power Combo",
    src: "/images/products/vitality-power-combo-card.jpg",
  },
  {
    label: "Hair Re-Grow Scalp Kit",
    src: "/images/products/hair-regrow-kit-card.jpg",
  },
  {
    label: "Hair Re-Grow Capsules",
    src: "/images/products/hair-regrow-capsules-card.jpg",
  },
  {
    label: "Hair Re-Grow Taila",
    src: "/images/products/hair-regrow-oil-card.jpg",
  },
];

export function ProductEditorModal({
  isOpen,
  product,
  onClose,
  onSave,
}: ProductEditorModalProps) {
  const isEditing = Boolean(product);

  const [activeTab, setActiveTab] = useState<
    "general" | "pricing" | "herbal" | "media"
  >("general");

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    slug: "",
    tagline: "",
    category: "supplements",
    priceINR: "1499",
    comparePriceINR: "1999",
    inventory: 100,
    sku: "",
    shortDescription: "",
    description: "",
    imageSrc: "/images/products/body-essential-nutrition-card.jpg",
    ingredients: "Ashwagandha (Withania somnifera), Shuddha Shilajit, Safed Musli, Gokshura, Kaunch Beej",
    benefits: "Boosts physical stamina and endurance; Enhances inner strength; Relieves mental and bodily fatigue; Certified 100% Ayurvedic Rasayana",
    usage: "Take 1-2 capsules twice daily with lukewarm water or warm milk after meals, or as directed by an Ayurvedic physician.",
    warnings: "Do not exceed recommended daily dosage. Keep out of reach of children. Store in a cool, dry place away from direct sunlight.",
    tags: "daily-wellness, immunity, stamina, energy, rasayana",
    seoTitle: "",
    seoDescription: "",
    ageRestricted: false,
    featured: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id,
        name: product.name,
        slug: product.slug,
        tagline: product.tagline || "",
        category: product.category || "supplements",
        priceINR: (product.price / 100).toString(),
        comparePriceINR: product.compareAtPrice
          ? (product.compareAtPrice / 100).toString()
          : "",
        inventory: product.inventory?.quantity ?? 100,
        sku:
          product.variants?.[0]?.sku ||
          `AVG-${product.id.toUpperCase().replace(/\W/g, "-")}`,
        shortDescription: product.shortDescription || "",
        description: product.description || "",
        imageSrc:
          product.images?.[0]?.src ||
          "/images/products/body-essential-nutrition-card.jpg",
        ingredients: Array.isArray(product.ingredients)
          ? product.ingredients.join(", ")
          : "",
        benefits:
          product.tags?.join("; ") ||
          "Supports vitality; Enhances immunity; 100% Ayurvedic",
        usage: product.usage || "",
        warnings: Array.isArray(product.warnings)
          ? product.warnings.join("; ")
          : "",
        tags: Array.isArray(product.tags) ? product.tags.join(", ") : "",
        seoTitle: product.seo?.title || product.name,
        seoDescription:
          product.seo?.description || product.shortDescription || "",
        ageRestricted: Boolean(product.ageRestricted),
        featured: Boolean(product.featured),
      });
    } else {
      // Default clean template for creating a new product
      const timestamp = Date.now().toString().slice(-6);
      setFormData({
        id: `formulation-${timestamp}`,
        name: "",
        slug: "",
        tagline: "Authentic & Lab-Tested | Classical Ayurvedic Care",
        category: "supplements",
        priceINR: "1499",
        comparePriceINR: "1999",
        inventory: 150,
        sku: `AVG-HERB-${timestamp}`,
        shortDescription: "",
        description: "",
        imageSrc: "/images/products/himalayan-shilajit-resin-card.jpg",
        ingredients:
          "Standardized Ayurvedic botanical extracts, Shuddha Shilajit, Triphala, Ashwagandha",
        benefits:
          "Enhances physical vigor and vitality; Balances physiological doshas; Certified pure herbal extracts",
        usage:
          "Take 1 capsule or 1/2 teaspoon twice daily with warm water after meals, or as advised by your Vaidya.",
        warnings:
          "Keep away from direct heat and moisture. Consult a Vaidya if pregnant or on active medical treatment.",
        tags: "ayurveda, immunity, wellness, vitality",
        seoTitle: "",
        seoDescription: "",
        ageRestricted: false,
        featured: false,
      });
    }
    setErrors({});
  }, [product, isOpen]);

  if (!isOpen) return null;

  // Auto generate slug from name
  const handleNameChange = (val: string) => {
    const generatedSlug = val
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
    setFormData((prev) => ({
      ...prev,
      name: val,
      slug: prev.slug === "" || !isEditing ? generatedSlug : prev.slug,
      sku:
        prev.sku === "" || !isEditing
          ? `AVG-${generatedSlug.toUpperCase().replace(/[^A-Z0-9]/g, "-")}`
          : prev.sku,
      seoTitle: prev.seoTitle === "" ? `${val} | Ayur Veda Global` : prev.seoTitle,
    }));
  };

  const pricePaise = Math.round((parseFloat(formData.priceINR) || 0) * 100);
  const comparePricePaise = formData.comparePriceINR
    ? Math.round((parseFloat(formData.comparePriceINR) || 0) * 100)
    : undefined;

  const discountPercent =
    comparePricePaise && comparePricePaise > pricePaise
      ? Math.round(
          ((comparePricePaise - pricePaise) / comparePricePaise) * 100,
        )
      : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Formulation title is required";
    }
    if (pricePaise <= 0) {
      newErrors.priceINR = "Enter a valid positive selling price";
    }
    if (!formData.slug.trim()) {
      newErrors.slug = "Product URL handle (slug) is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const generatedId =
      formData.id.trim() ||
      formData.slug.trim() ||
      `prod-${Date.now().toString()}`;

    const ingredientsList = formData.ingredients
      .split(/[,;\n]/)
      .map((s) => s.trim())
      .filter(Boolean);

    const warningsList = formData.warnings
      .split(/[;\n]/)
      .map((s) => s.trim())
      .filter(Boolean);

    const tagsList = formData.tags
      .split(/[,;\n]/)
      .map((s) => s.trim())
      .filter(Boolean);

    const builtProduct: Product = {
      id: generatedId,
      slug: formData.slug.trim().toLowerCase(),
      name: formData.name.trim(),
      tagline: formData.tagline.trim(),
      description: formData.description.trim() || formData.shortDescription.trim() || formData.name.trim(),
      shortDescription:
        formData.shortDescription.trim() ||
        formData.description.trim().slice(0, 160) ||
        formData.tagline.trim(),
      category: formData.category as any,
      images: [
        {
          src: formData.imageSrc.trim(),
          alt: `${formData.name.trim()} - Authentic Ayurvedic Formulation`,
          isPrimary: true,
        },
      ],
      price: pricePaise,
      compareAtPrice: comparePricePaise,
      variants: [
        {
          id: `${generatedId}-std`,
          name: "Standard Pack",
          price: pricePaise,
          compareAtPrice: comparePricePaise,
          inventory: formData.inventory,
          sku: formData.sku.trim() || `AVG-${generatedId.toUpperCase()}`,
        },
      ],
      inventory: {
        quantity: formData.inventory,
        trackQuantity: true,
      },
      tags: tagsList.length > 0 ? tagsList : ["ayurveda", "wellness"],
      ingredients:
        ingredientsList.length > 0
          ? ingredientsList
          : ["Classical Ayurvedic Herbal Extracts"],
      usage: formData.usage.trim() || "As directed by your Ayurvedic physician.",
      warnings:
        warningsList.length > 0
          ? warningsList
          : ["For adult consumption. Store in a cool dry place."],
      ageRestricted: formData.ageRestricted,
      featured: formData.featured,
      rating: product?.rating || 4.9,
      reviewCount: product?.reviewCount || 48,
      seo: {
        title:
          formData.seoTitle.trim() ||
          `${formData.name.trim()} | Ayur Veda Global`,
        description:
          formData.seoDescription.trim() ||
          formData.shortDescription.trim() ||
          formData.tagline.trim(),
        keywords: tagsList,
      },
      createdAt: product?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onSave(builtProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#FFFFFF] text-[#1C1D1F] border border-[#9E8047]/25 rounded-2xl shadow-2xl overflow-hidden my-4 sm:my-8 flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#071A12] text-white border-b border-[#D4AF37]/30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#EFF4F0]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37] font-semibold">
                  Seller Central Formulation Studio
                </span>
                <span className="px-2 py-0.2 rounded-full bg-[#10B981]/20 text-[#10B981] text-[9px] font-mono border border-[#10B981]/30">
                  {isEditing ? "Editing Mode" : "New Formulation"}
                </span>
              </div>
              <h2 className="text-base font-semibold text-white">
                {isEditing ? `Edit: ${product?.name}` : "Create & List New Product"}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation Strip */}
        <div className="flex items-center gap-1 px-6 bg-[#FAF7F2] border-b border-[#9E8047]/20 overflow-x-auto scrollbar-none text-xs">
          {[
            { id: "general", label: "1. Overview & Info", icon: FileText },
            { id: "pricing", label: "2. Pricing & Inventory", icon: DollarSign },
            { id: "herbal", label: "3. Ayurvedic Properties", icon: Sparkles },
            { id: "media", label: "4. Imagery & SEO", icon: ImageIcon },
          ].map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                type="button"
                className={`flex items-center gap-1.5 py-3 px-3.5 font-medium border-b-2 transition-all whitespace-nowrap ${
                  isActive
                    ? "border-[#4E5F52] text-[#4E5F52] font-semibold bg-white"
                    : "border-transparent text-[#737373] hover:text-[#1C1D1F]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Form Content & Live Preview Split */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Form Fields */}
          <form
            id="seller-product-form"
            onSubmit={handleSubmit}
            className="lg:col-span-8 space-y-4 text-xs"
          >
            {/* SECTION 1: GENERAL OVERVIEW */}
            {activeTab === "general" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#737373] mb-1">
                    Formulation Name / Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pure Himalayan Shilajit Resin (20g)"
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#9E8047]/25 text-xs text-[#1C1D1F] focus:outline-none focus:border-[#4E5F52] font-medium"
                  />
                  {errors.name && (
                    <p className="text-rose-600 text-[10px] mt-1">{errors.name}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#737373] mb-1">
                      URL Handle (Slug) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. himalayan-shilajit-resin"
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData({ ...formData, slug: e.target.value.toLowerCase() })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#9E8047]/25 text-xs text-[#1C1D1F] font-mono focus:outline-none focus:border-[#4E5F52]"
                    />
                    <span className="text-[10px] text-[#737373] mt-0.5 block">
                      Live URL: /product/{formData.slug || "slug"}
                    </span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#737373] mb-1">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#9E8047]/25 text-xs text-[#1C1D1F] focus:outline-none focus:border-[#4E5F52]"
                    >
                      <option value="supplements">Herbal Supplements</option>
                      <option value="personal-care">Personal Care &amp; Vitality</option>
                      <option value="wellness">Power Combos &amp; Regrowth</option>
                      <option value="classical">Classical Rasayanas</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#737373] mb-1">
                    Tagline / Subtitle
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 100% Herbal &amp; Safe | Energy, Strength &amp; Stamina"
                    value={formData.tagline}
                    onChange={(e) =>
                      setFormData({ ...formData, tagline: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#9E8047]/25 text-xs text-[#1C1D1F] focus:outline-none focus:border-[#4E5F52]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#737373] mb-1">
                    Short Excerpt / Card Description
                  </label>
                  <input
                    type="text"
                    placeholder="Short summary displayed on search results and catalog cards..."
                    value={formData.shortDescription}
                    onChange={(e) =>
                      setFormData({ ...formData, shortDescription: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#9E8047]/25 text-xs text-[#1C1D1F] focus:outline-none focus:border-[#4E5F52]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#737373] mb-1">
                    Full Formulation Narrative &amp; Classical Background
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Comprehensive description of the Ayurvedic formulation, classical extraction methodology, and tissue vitality benefits..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full p-3 rounded-xl bg-[#FAF7F2] border border-[#9E8047]/25 text-xs text-[#1C1D1F] focus:outline-none focus:border-[#4E5F52] leading-relaxed"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) =>
                        setFormData({ ...formData, featured: e.target.checked })
                      }
                      className="rounded text-[#4E5F52] focus:ring-[#4E5F52] w-4 h-4 cursor-pointer"
                    />
                    <span className="text-xs text-[#1C1D1F]">
                      Pin as Featured / Bestseller on Storefront
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.ageRestricted}
                      onChange={(e) =>
                        setFormData({ ...formData, ageRestricted: e.target.checked })
                      }
                      className="rounded text-[#4E5F52] focus:ring-[#4E5F52] w-4 h-4 cursor-pointer"
                    />
                    <span className="text-xs text-[#1C1D1F]">
                      Enforce 18+ Age Verification Gate
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* SECTION 2: PRICING & INVENTORY */}
            {activeTab === "pricing" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#737373] mb-1">
                      Selling Price (INR ₹) <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#737373]">
                        ₹
                      </span>
                      <input
                        type="number"
                        min="1"
                        step="1"
                        required
                        placeholder="1499"
                        value={formData.priceINR}
                        onChange={(e) =>
                          setFormData({ ...formData, priceINR: e.target.value })
                        }
                        className="w-full pl-7 pr-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#9E8047]/25 text-xs text-[#1C1D1F] font-mono font-semibold focus:outline-none focus:border-[#4E5F52]"
                      />
                    </div>
                    {errors.priceINR && (
                      <p className="text-rose-600 text-[10px] mt-1">{errors.priceINR}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#737373] mb-1">
                      Compare at Price / MRP (INR ₹)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#737373]">
                        ₹
                      </span>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        placeholder="1999"
                        value={formData.comparePriceINR}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            comparePriceINR: e.target.value,
                          })
                        }
                        className="w-full pl-7 pr-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#9E8047]/25 text-xs text-[#1C1D1F] font-mono focus:outline-none focus:border-[#4E5F52]"
                      />
                    </div>
                    {discountPercent > 0 && (
                      <span className="text-[10px] text-[#4E5F52] font-semibold mt-1 block">
                        ✓ Patron savings: {discountPercent}% OFF displayed
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#737373] mb-1">
                      Stock SKU Identifier
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. AVG-SHIL-20G"
                      value={formData.sku}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          sku: e.target.value.toUpperCase(),
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#9E8047]/25 text-xs text-[#1C1D1F] font-mono focus:outline-none focus:border-[#4E5F52]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#737373] mb-1">
                      Warehouse Available Units
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="99999"
                      value={formData.inventory}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          inventory: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#9E8047]/25 text-xs text-[#1C1D1F] font-mono focus:outline-none focus:border-[#4E5F52]"
                    />
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#9E8047]/20 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-xs text-[#1C1D1F] block">
                      Automatic Free Express Shipping
                    </span>
                    <span className="text-[10px] text-[#737373]">
                      Qualifies automatically when price is &ge; ₹999
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-full ${
                      pricePaise >= 99900
                        ? "bg-[#EFF4F0] text-[#4E5F52] border border-[#4E5F52]/30"
                        : "bg-stone-200 text-stone-600"
                    }`}
                  >
                    {pricePaise >= 99900 ? "Eligible (Free)" : "Standard Shipping"}
                  </span>
                </div>
              </div>
            )}

            {/* SECTION 3: AYURVEDIC PROPERTIES */}
            {activeTab === "herbal" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#737373] mb-1">
                    Standardized Ingredients &amp; Botanical Extracts (Comma Separated)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Pure Himalayan Shilajit (85% Fulvic Acid), KSM-66 Ashwagandha, Safed Musli, Gokshura"
                    value={formData.ingredients}
                    onChange={(e) =>
                      setFormData({ ...formData, ingredients: e.target.value })
                    }
                    className="w-full p-3 rounded-xl bg-[#FAF7F2] border border-[#9E8047]/25 text-xs text-[#1C1D1F] focus:outline-none focus:border-[#4E5F52]"
                  />
                  <span className="text-[10px] text-[#737373]">
                    Displayed on the formulation detail page and AYUSH lab report specs
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#737373] mb-1">
                    Key Health Benefits &amp; Physiological Indications (Semicolon Separated)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Enhances cellular energy &amp; ATP; Boosts stamina &amp; vigor; Balances Vata and Pitta doshas"
                    value={formData.benefits}
                    onChange={(e) =>
                      setFormData({ ...formData, benefits: e.target.value })
                    }
                    className="w-full p-3 rounded-xl bg-[#FAF7F2] border border-[#9E8047]/25 text-xs text-[#1C1D1F] focus:outline-none focus:border-[#4E5F52]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#737373] mb-1">
                    How to Use / Dosage &amp; Anupana Instructions
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Dissolve a pea-sized amount in lukewarm milk or water. Consume once daily after breakfast."
                    value={formData.usage}
                    onChange={(e) =>
                      setFormData({ ...formData, usage: e.target.value })
                    }
                    className="w-full p-3 rounded-xl bg-[#FAF7F2] border border-[#9E8047]/25 text-xs text-[#1C1D1F] focus:outline-none focus:border-[#4E5F52]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#737373] mb-1">
                    Contraindications &amp; Safety Warnings
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Not recommended for pregnant women without Vaidya consultation; Store away from direct sunlight"
                    value={formData.warnings}
                    onChange={(e) =>
                      setFormData({ ...formData, warnings: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#9E8047]/25 text-xs text-[#1C1D1F] focus:outline-none focus:border-[#4E5F52]"
                  />
                </div>
              </div>
            )}

            {/* SECTION 4: MEDIA & SEO */}
            {activeTab === "media" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#737373] mb-1">
                    Primary Product Image URL / Path <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="/images/products/himalayan-shilajit-resin-card.jpg"
                    value={formData.imageSrc}
                    onChange={(e) =>
                      setFormData({ ...formData, imageSrc: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#9E8047]/25 text-xs text-[#1C1D1F] font-mono focus:outline-none focus:border-[#4E5F52]"
                  />
                </div>

                {/* Preset Image Chooser */}
                <div>
                  <span className="block text-[10px] font-mono uppercase text-[#737373] mb-1.5">
                    Or select from authentic Ayurveda Global studio library:
                  </span>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {PRESET_IMAGES.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, imageSrc: preset.src })
                        }
                        className={`p-1.5 rounded-lg border text-left flex items-center gap-2 transition-all ${
                          formData.imageSrc === preset.src
                            ? "border-[#4E5F52] bg-[#EFF4F0] ring-1 ring-[#4E5F52]"
                            : "border-[#9E8047]/20 bg-[#FAF7F2] hover:bg-white"
                        }`}
                      >
                        <div className="w-7 h-7 rounded bg-white relative overflow-hidden flex-shrink-0">
                          <img
                            src={preset.src}
                            alt={preset.label}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <span className="text-[10px] truncate text-[#1C1D1F] font-medium">
                          {preset.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#737373] mb-1">
                    Keywords &amp; Search Tags (Comma Separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. shilajit, stamina, muscle, rasayana, vitality"
                    value={formData.tags}
                    onChange={(e) =>
                      setFormData({ ...formData, tags: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#9E8047]/25 text-xs text-[#1C1D1F] focus:outline-none focus:border-[#4E5F52]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#737373] mb-1">
                      Google SEO Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Pure Shilajit Resin | Ayur Veda Global"
                      value={formData.seoTitle}
                      onChange={(e) =>
                        setFormData({ ...formData, seoTitle: e.target.value })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#9E8047]/25 text-xs text-[#1C1D1F] focus:outline-none focus:border-[#4E5F52]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#737373] mb-1">
                      Meta Description
                    </label>
                    <input
                      type="text"
                      placeholder="Search snippet summary..."
                      value={formData.seoDescription}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          seoDescription: e.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#9E8047]/25 text-xs text-[#1C1D1F] focus:outline-none focus:border-[#4E5F52]"
                    />
                  </div>
                </div>
              </div>
            )}
          </form>

          {/* Interactive Live Card Preview */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#737373] block">
              Storefront Real-Time Preview
            </span>

            <div className="bg-[#FAF7F2] border border-[#9E8047]/30 rounded-2xl p-3 shadow-md space-y-2.5">
              <div className="aspect-[4/3] rounded-xl bg-white border border-[#9E8047]/20 relative overflow-hidden flex items-center justify-center">
                <img
                  src={formData.imageSrc}
                  alt={formData.name || "Preview"}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/images/products/body-essential-nutrition-card.jpg";
                  }}
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#071A12]/80 backdrop-blur-xs text-[#D4AF37] font-mono text-[9px] font-semibold border border-[#D4AF37]/30">
                  {formData.category.toUpperCase()}
                </span>
                {discountPercent > 0 && (
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[#10B981] text-[#071A12] font-mono text-[9px] font-bold">
                    {discountPercent}% OFF
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-heading text-xs font-semibold text-[#1C1D1F] line-clamp-1">
                  {formData.name || "Formulation Title Preview"}
                </h3>
                <p className="text-[10px] text-[#737373] line-clamp-1">
                  {formData.tagline || "Classical Ayurvedic extract formulation"}
                </p>
              </div>

              <div className="flex items-baseline justify-between pt-1 border-t border-[#9E8047]/20">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-semibold text-sm text-[#1C1D1F]">
                    {formatINR(pricePaise)}
                  </span>
                  {comparePricePaise && comparePricePaise > pricePaise && (
                    <span className="text-[10px] text-[#737373] line-through">
                      {formatINR(comparePricePaise)}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-mono text-[#4E5F52]">
                  {formData.inventory > 0
                    ? `● ${formData.inventory} In Stock`
                    : "Out of Stock"}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#EFF4F0] border border-[#4E5F52]/30 space-y-1 text-[11px] text-[#4E5F52]">
              <div className="flex items-center gap-1 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Instant Seller Central Sync</span>
              </div>
              <p className="text-[10px] text-[#737373] leading-relaxed">
                Saving will immediately publish this formulation to /shop, global search, and allow direct cart &amp; checkout!
              </p>
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="px-6 py-3.5 bg-[#FAF7F2] border-t border-[#9E8047]/25 flex items-center justify-between">
          <div className="text-[10px] text-[#737373] font-mono hidden sm:block">
            SKU: {formData.sku || "AUTO-GENERATED"}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 rounded-xl border border-[#9E8047]/25 text-xs font-medium text-[#1C1D1F] hover:bg-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="seller-product-form"
              className="py-2 px-5 rounded-xl bg-[#4E5F52] hover:bg-[#3D4D40] text-white text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isEditing ? "Save & Update SKU" : "Publish to Storefront"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
