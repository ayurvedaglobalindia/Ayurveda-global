import { getSupabaseBrowserClient, isSupabaseConfigured } from "./client";
import { getAllProducts, getProductBySlug as getStaticProductBySlug } from "@/lib/products/registry";
import type { Product } from "@/types";
import type { Database } from "./types";

export type SupabaseProduct = Database["public"]["Tables"]["products"]["Row"];
export type SupabaseCategory = Database["public"]["Tables"]["categories"]["Row"];

/**
 * Maps a Supabase product row to the unified Product interface
 */
export function mapSupabaseToProduct(item: SupabaseProduct): Product {
  const images =
    item.images && item.images.length > 0
      ? item.images.map((imgStr, idx) => ({
          src: imgStr,
          alt: `${item.title} image ${idx + 1}`,
          isPrimary: idx === 0,
        }))
      : [
          {
            src: "/images/og-default.svg",
            alt: item.title,
            isPrimary: true,
          },
        ];

  return {
    id: item.id,
    name: item.title,
    slug: item.slug,
    tagline: item.short_description || "Classical Ayurvedic Botanical Formulation",
    description: item.description,
    shortDescription: item.short_description || item.description.slice(0, 160),
    price: item.price,
    compareAtPrice: item.compare_at_price || undefined,
    category: (item.category_id as any) || "wellness",
    variants: [],
    inventory: {
      quantity: item.stock,
      trackQuantity: true,
    },
    tags: ["ayurveda", "botanical"],
    images,
    featured: item.is_featured,
    ingredients: item.ingredients || [],
    usage: item.how_to_use || "Take as directed by Ayurvedic physician.",
    warnings: ["Store in a cool, dry place away from direct sunlight."],
    seo: {
      title: `${item.title} | Ayur Veda Global`,
      description: item.short_description || item.description.slice(0, 160),
      keywords: ["ayurveda", "organic"],
    },
    rating: item.rating ? Number(item.rating) : 4.9,
    reviewCount: item.review_count || 100,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  };
}

/**
 * Dynamic Product Listing: Fetches products from Supabase database with fallback to static registry
 */
export async function fetchProducts(options?: {
  categoryId?: string;
  featuredOnly?: boolean;
  limit?: number;
}): Promise<Product[]> {
  const supabase = getSupabaseBrowserClient();

  if (isSupabaseConfigured() && supabase) {
    try {
      let query = supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (options?.categoryId) {
        query = query.eq("category_id", options.categoryId);
      }
      if (options?.featuredOnly) {
        query = query.eq("is_featured", true);
      }
      if (options?.limit) {
        query = query.limit(options.limit);
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return (data as SupabaseProduct[]).map(mapSupabaseToProduct);
      }
    } catch (err) {
      console.warn("Supabase products fetch failed, using fallback catalogue:", err);
    }
  }

  // Fallback to static catalogue
  const fallback = getAllProducts();
  if (options?.featuredOnly) {
    return fallback.filter((p) => p.featured);
  }
  return fallback;
}

/**
 * Dynamic Product Details: Fetches single product by slug from Supabase
 */
export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const supabase = getSupabaseBrowserClient();

  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .eq("is_active", true)
        .single();

      if (!error && data) {
        return mapSupabaseToProduct(data as SupabaseProduct);
      }
    } catch (err) {
      console.warn("Supabase product by slug fetch failed, using fallback:", err);
    }
  }

  return getStaticProductBySlug(slug) || null;
}

/**
 * Fetches active categories from Supabase
 */
export async function fetchCategories(): Promise<SupabaseCategory[]> {
  const supabase = getSupabaseBrowserClient();
  if (!isSupabaseConfigured() || !supabase) return [];

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error || !data) return [];
  return data as SupabaseCategory[];
}
