export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          phone: string | null;
          email: string | null;
          avatar_url: string | null;
          role: "customer" | "admin" | "editor";
          addresses: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          phone?: string | null;
          email?: string | null;
          avatar_url?: string | null;
          role?: "customer" | "admin" | "editor";
          addresses?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          phone?: string | null;
          email?: string | null;
          avatar_url?: string | null;
          role?: "customer" | "admin" | "editor";
          addresses?: Json;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          image_url: string | null;
          sort_order: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          image_url?: string | null;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          image_url?: string | null;
          sort_order?: number;
          is_active?: boolean;
        };
      };
      products: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string;
          short_description: string | null;
          price: number;
          compare_at_price: number | null;
          category_id: string | null;
          sku: string | null;
          stock: number;
          images: string[];
          is_featured: boolean;
          rating: number;
          review_count: number;
          benefits: string[];
          ingredients: string[];
          how_to_use: string | null;
          specifications: Json;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description: string;
          short_description?: string | null;
          price: number;
          compare_at_price?: number | null;
          category_id?: string | null;
          sku?: string | null;
          stock?: number;
          images?: string[];
          is_featured?: boolean;
          rating?: number;
          review_count?: number;
          benefits?: string[];
          ingredients?: string[];
          how_to_use?: string | null;
          specifications?: Json;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          description?: string;
          short_description?: string | null;
          price?: number;
          compare_at_price?: number | null;
          category_id?: string | null;
          sku?: string | null;
          stock?: number;
          images?: string[];
          is_featured?: boolean;
          rating?: number;
          review_count?: number;
          benefits?: string[];
          ingredients?: string[];
          how_to_use?: string | null;
          specifications?: Json;
          is_active?: boolean;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          order_number: string;
          user_id: string | null;
          customer_name: string;
          customer_phone: string;
          customer_email: string | null;
          shipping_address: Json;
          items: Json;
          subtotal: number;
          shipping_fee: number;
          discount: number;
          total: number;
          payment_method: "upi" | "razorpay" | "cod" | "whatsapp";
          payment_status: "pending" | "paid" | "failed" | "refunded";
          order_status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";
          carrier_name: string | null;
          awb_tracking_number: string | null;
          tracking_history: Json;
          admin_notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          order_number: string;
          user_id?: string | null;
          customer_name: string;
          customer_phone: string;
          customer_email?: string | null;
          shipping_address: Json;
          items: Json;
          subtotal: number;
          shipping_fee?: number;
          discount?: number;
          total: number;
          payment_method: "upi" | "razorpay" | "cod" | "whatsapp";
          payment_status?: "pending" | "paid" | "failed" | "refunded";
          order_status?: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";
          carrier_name?: string | null;
          awb_tracking_number?: string | null;
          tracking_history?: Json;
          admin_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          order_number?: string;
          user_id?: string | null;
          customer_name?: string;
          customer_phone?: string;
          customer_email?: string | null;
          shipping_address?: Json;
          items?: Json;
          subtotal?: number;
          shipping_fee?: number;
          discount?: number;
          total?: number;
          payment_method?: "upi" | "razorpay" | "cod" | "whatsapp";
          payment_status?: "pending" | "paid" | "failed" | "refunded";
          order_status?: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";
          carrier_name?: string | null;
          awb_tracking_number?: string | null;
          tracking_history?: Json;
          admin_notes?: string | null;
          updated_at?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string | null;
          title: string;
          quantity: number;
          unit_price: number;
          total_price: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id?: string | null;
          title: string;
          quantity: number;
          unit_price: number;
          total_price: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string | null;
          title?: string;
          quantity?: number;
          unit_price?: number;
          total_price?: number;
        };
      };
    };
  };
}
