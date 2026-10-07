import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartItem, CartState, Product } from "@/types";
import {
  getProductById,
  getProductBySlug,
  getProductImage,
} from "@/lib/products/registry";
import { calculateShipping } from "@/lib/shipping";

interface CartStore extends CartState {
  addItem: (product: Product, variantId?: string, quantity?: number) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (
    productId: string,
    variantId: string | undefined,
    quantity: number,
  ) => void;
  clearCart: () => void;
  applyCoupon: (code: string, discount: number) => void;
  removeCoupon: () => void;
  setShipping: (shipping: number) => void;
  setTax: (tax: number) => void;
  getSubtotal: () => number;
  getTotal: () => number;
  getItemCount: () => number;
  isInCart: (productId: string, variantId?: string) => boolean;
  getItemQuantity: (productId: string, variantId?: string) => number;
  reserveStock: () => Promise<boolean>;
  releaseStock: () => void;
}

const initialState: CartState = {
  items: [],
  discount: 0,
  shipping: 0,
  tax: 0,
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      addItem: (product: Product, variantId?: string, quantity: number = 1) => {
        if (!product || !product.id) return;

        const canonical =
          getProductById(product.id) ||
          getProductBySlug(product.slug || product.id);
        const baseProduct = canonical ? { ...canonical, ...product } : product;
        const resolvedImg = getProductImage(baseProduct, product.id);
        const images =
          baseProduct.images &&
          Array.isArray(baseProduct.images) &&
          baseProduct.images.length > 0
            ? baseProduct.images
            : [resolvedImg];

        const enrichedProduct: Product = {
          ...baseProduct,
          images,
        };

        const variant = variantId
          ? enrichedProduct.variants?.find((v) => v.id === variantId)
          : enrichedProduct.variants?.[0];
        const price = variant?.price ?? enrichedProduct.price;
        const variantIdToUse = variantId || variant?.id || "default";

        set((state) => {
          const currentItems = Array.isArray(state.items) ? state.items : [];
          const existingIndex = currentItems.findIndex(
            (item) =>
              item.productId === enrichedProduct.id &&
              (item.variantId === variantIdToUse ||
                (!item.variantId && variantIdToUse === "default")),
          );

          if (existingIndex >= 0) {
            const newItems = [...currentItems];
            newItems[existingIndex] = {
              ...newItems[existingIndex],
              quantity: newItems[existingIndex].quantity + quantity,
              price,
              product: enrichedProduct,
            };
            return { items: newItems };
          }

          const newItem: CartItem = {
            id: `${enrichedProduct.id}-${variantIdToUse}`,
            productId: enrichedProduct.id,
            variantId: variantIdToUse,
            quantity: Math.max(1, quantity),
            price,
            product: enrichedProduct,
          };
          return { items: [...currentItems, newItem] };
        });
      },

      removeItem: (productId: string, variantId?: string) => {
        set((state) => ({
          items: (state.items || []).filter(
            (item) =>
              !(
                item.productId === productId &&
                (variantId === undefined ||
                  item.variantId === variantId ||
                  (!item.variantId && variantId === "default"))
              ),
          ),
        }));
      },

      updateQuantity: (
        productId: string,
        variantId: string | undefined,
        quantity: number,
      ) => {
        if (quantity <= 0) {
          get().removeItem(productId, variantId);
          return;
        }

        set((state) => ({
          items: (state.items || []).map((item) =>
            item.productId === productId &&
            (variantId === undefined ||
              item.variantId === variantId ||
              (!item.variantId && variantId === "default"))
              ? { ...item, quantity }
              : item,
          ),
        }));
      },

      clearCart: () => {
        set(initialState);
      },

      applyCoupon: (code: string, discount: number) => {
        set({ couponCode: code, discount });
      },

      removeCoupon: () => {
        set({ couponCode: undefined, discount: 0 });
      },

      setShipping: (shipping: number) => {
        set({ shipping });
      },

      setTax: (tax: number) => {
        set({ tax });
      },

      getSubtotal: () => {
        const items = get().items || [];
        return items.reduce(
          (sum, item) =>
            sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
          0,
        );
      },

      getTotal: () => {
        const { items = [], discount = 0, shipping = 0, tax = 0 } = get();
        const subtotal = items.reduce(
          (sum, item) =>
            sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
          0,
        );
        if (items.length === 0) return 0;
        const effectiveShipping =
          shipping > 0 ? shipping : calculateShipping(subtotal).cost;
        return Math.max(0, subtotal - discount + effectiveShipping + tax);
      },

      getItemCount: () => {
        const items = get().items || [];
        return items.reduce(
          (sum, item) => sum + (Number(item.quantity) || 0),
          0,
        );
      },

      isInCart: (productId: string, variantId?: string) => {
        const items = get().items || [];
        return items.some(
          (item) =>
            item.productId === productId &&
            (variantId === undefined ||
              item.variantId === variantId ||
              (!item.variantId && variantId === "default")),
        );
      },

      getItemQuantity: (productId: string, variantId?: string) => {
        const items = get().items || [];
        if (variantId !== undefined) {
          const item = items.find(
            (i) =>
              i.productId === productId &&
              (i.variantId === variantId ||
                (!i.variantId && variantId === "default")),
          );
          return item?.quantity || 0;
        }
        return items
          .filter((i) => i.productId === productId)
          .reduce((sum, i) => sum + i.quantity, 0);
      },

      reserveStock: async () => {
        return true;
      },

      releaseStock: () => {},
    }),
    {
      name: "ayur-veda-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        couponCode: state.couponCode,
        discount: state.discount,
      }),
      onRehydrateStorage: () => (state) => {
        if (state && Array.isArray(state.items)) {
          state.items = state.items
            .filter((item) => item && item.productId)
            .map((item) => {
              const canonical =
                getProductById(item.productId) ||
                getProductBySlug(item.productId);
              const fallbackImg = getProductImage(
                item.product || canonical,
                item.productId,
              );
              const baseProduct = canonical
                ? { ...canonical, ...(item.product || {}) }
                : item.product;
              const images =
                baseProduct?.images &&
                Array.isArray(baseProduct.images) &&
                baseProduct.images.length > 0
                  ? baseProduct.images
                  : [fallbackImg];

              return {
                ...item,
                price: Number(item.price) || baseProduct?.price || 0,
                quantity: Math.max(1, Number(item.quantity) || 1),
                product: {
                  ...baseProduct,
                  images,
                },
              };
            });
        }
      },
    },
  ),
);
