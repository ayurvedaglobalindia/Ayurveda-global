"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getOrdersServer, updateOrderStatusServer, getLeadsServer } from "@/app/actions";
import Link from "next/link";
import Image from "next/image";
import {
  Shield,
  Lock,
  KeyRound,
  ArrowRight,
  LogOut,
  Package,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
  AlertTriangle,
  Search,
  Filter,
  Eye,
  Smartphone,
  Monitor,
  Tablet,
  RefreshCw,
  ExternalLink,
  MessageCircle,
  Sliders,
  ChevronRight,
  Download,
  Calendar,
  Globe,
  Tag,
  Share2,
  MapPin,
  Gift,
  Layers,
  Save,
  Check,
  Users,
  UserCheck,
  Printer,
  FileText,
  CheckSquare,
  Square,
  Plus,
  Minus,
  Send,
  Sparkles,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatINR, formatDate } from "@/lib/utils/formatters";
import {
  getAnalyticsSummary,
  downloadOrdersCSV,
  downloadAnalyticsCSV,
  clearAllAnalyticsData,
  type AnalyticsSummary,
  type DateRange,
} from "@/lib/analytics";
import {
  loginAdmin,
  isAdminAuthenticated,
  logoutAdmin,
  isLockedOut,
} from "@/lib/auth/adminAuth";
import { getAllProducts, getProductImage } from "@/lib/products/registry";
import { useUserStore } from "@/store/userStore";
import { buildWhatsAppUrl } from "@/store/whatsappStore";
import { OrderInvoiceModal } from "@/components/admin/OrderInvoiceModal";

interface PatronProfile {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  ordersCount: number;
  totalLtv: number;
  averageOrderValue: number;
  lastActive: string;
  source: string;
  productsBoughtOrInquired: string[];
  recentAwb?: string;
  statusTier: "VIP" | "Repeat" | "Buyer" | "Lead";
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [pin, setPin] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<
    "analytics" | "orders" | "products" | "customers" | "coupons" | "marketing" | "settings"
  >("analytics");
  const [dateRange, setDateRange] = useState<DateRange>("all");

  // Dashboard Data
  const [orders, setOrders] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [stockOverrides, setStockOverrides] = useState<Record<string, number>>({});
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  
  // Orders State & Bulk Selection
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [invoiceOrder, setInvoiceOrder] = useState<any | null>(null);
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);

  // Inventory Filters
  const [inventorySearch, setInventorySearch] = useState("");
  const [inventoryFilter, setInventoryFilter] = useState<"all" | "low" | "out" | "instock">("all");

  // Customers & Leads CRM State
  const [customerSearch, setCustomerSearch] = useState("");
  const [customerFilter, setCustomerFilter] = useState<"all" | "vip" | "repeat" | "buyer" | "lead">("all");
  const [contactModalPatron, setContactModalPatron] = useState<PatronProfile | null>(null);
  const [contactMessageTemplate, setContactMessageTemplate] = useState<"dispatch" | "vaidya" | "vip" | "inquiry">("dispatch");
  const [customContactMessage, setCustomContactMessage] = useState("");

  // Toast Notification
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);

  // Marketing Settings State
  const [marketingConfig, setMarketingConfig] = useState({
    ga4Id: "",
    gscTag: "",
    metaPixelId: "",
    whatsappNumber: "919123485451",
  });
  const [configSaved, setConfigSaved] = useState(false);

  // Store Regulatory & Shipping Settings State
  const [storeSettings, setStoreSettings] = useState({
    freeShippingThreshold: 999,
    codEnabled: true,
    discreetPackaging: true,
    ayushCertified: true,
    freeGiftThreshold: 1499,
    deliveryWindowDays: "2-4 Business Days",
  });
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Coupons State
  const [coupons, setCoupons] = useState([
    {
      code: "AYUR10",
      discount: 10,
      type: "percent",
      minOrder: 999,
      active: true,
    },
    {
      code: "WELLNESS10",
      discount: 10,
      type: "percent",
      minOrder: 0,
      active: true,
    },
    {
      code: "WELCOME10",
      discount: 10,
      type: "percent",
      minOrder: 0,
      active: true,
    },
    {
      code: "FREESHIP",
      discount: 49,
      type: "flat",
      minOrder: 499,
      active: true,
    },
    {
      code: "VIP20",
      discount: 20,
      type: "percent",
      minOrder: 1999,
      active: true,
    },
  ]);
  const [newCouponCode, setNewCouponCode] = useState("");
  const [newCouponDiscount, setNewCouponDiscount] = useState("10");

  const showToast = (message: string, type: "success" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    setIsMounted(true);
    const authed = isAdminAuthenticated();
    setIsAuthenticated(authed);
    if (authed) {
      loadDashboardData("all");
    }

    // Load saved settings & coupons
    try {
      const savedMarketing = localStorage.getItem("ayur_marketing_config");
      if (savedMarketing) setMarketingConfig(JSON.parse(savedMarketing));

      const savedCoupons = localStorage.getItem("ayur_custom_coupons");
      if (savedCoupons) setCoupons(JSON.parse(savedCoupons));

      const savedStore = localStorage.getItem("ayur_store_settings");
      if (savedStore) setStoreSettings(JSON.parse(savedStore));
    } catch {}

    // Global keyboard listener for ESC to close modals
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedOrder(null);
        setInvoiceOrder(null);
        setContactModalPatron(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadDashboardData = (range: DateRange = dateRange) => {
    // 1. Load analytics for selected range
    setAnalytics(getAnalyticsSummary(range));

    // 2. Gather all orders
    if (typeof window !== "undefined") {
      getOrdersServer()
        .then((serverOrders) => {
          let allOrders: any[] = [
            ...(useUserStore.getState().recentOrders || []),
          ];
          if (serverOrders && serverOrders.length > 0) {
            allOrders = [...allOrders, ...serverOrders];
          } else {
            try {
              const local = JSON.parse(
                localStorage.getItem("ayur_orders") || "[]",
              );
              allOrders = [...allOrders, ...local];
            } catch {}
          }
          const uniqueOrders = allOrders.filter(
            (v, i, a) =>
              a.findIndex(
                (t) => t.id === v.id || t.orderNumber === v.orderNumber,
              ) === i,
          );
          setOrders(uniqueOrders);
        })
        .catch(() => {
          try {
            const local = JSON.parse(
              localStorage.getItem("ayur_orders") || "[]",
            );
            setOrders(local);
          } catch {}
        });
    }

    // 3. Gather customer leads & stock overrides
    if (typeof window !== "undefined") {
      getLeadsServer()
        .then((serverLeads) => {
          let allLeads: any[] = serverLeads || [];
          try {
            const local = JSON.parse(
              localStorage.getItem("ayur_whatsapp_leads") || "[]",
            );
            allLeads = [...allLeads, ...local];
          } catch {}
          const uniqueLeads = allLeads.filter(
            (v, i, a) =>
              a.findIndex(
                (t) =>
                  (t.customerPhone && t.customerPhone === v.customerPhone) ||
                  (t.id && t.id === v.id),
              ) === i,
          );
          setLeads(uniqueLeads);
        })
        .catch(() => {});

      try {
        const savedStock = JSON.parse(
          localStorage.getItem("ayur_stock_overrides") || "{}",
        );
        setStockOverrides(savedStock);
      } catch {}
    }
  };

  const handleStockUpdate = (productId: string, newQty: number) => {
    const updated = { ...stockOverrides, [productId]: Math.max(0, newQty) };
    setStockOverrides(updated);
    try {
      localStorage.setItem("ayur_stock_overrides", JSON.stringify(updated));
    } catch {}
    showToast(`Inventory updated to ${Math.max(0, newQty)} units for ${productId.toUpperCase()}`);
  };

  const handleQuickStockAdjust = (productId: string, delta: number) => {
    const current =
      stockOverrides[productId] !== undefined
        ? stockOverrides[productId]
        : (getAllProducts().find((p) => p.id === productId)?.inventory?.quantity ?? 100);
    const newQty = Math.max(0, current + delta);
    handleStockUpdate(productId, newQty);
  };

  const handleUpdateTracking = (orderId: string, awb: string) => {
    const updated = orders.map((o) =>
      o.id === orderId || o.orderNumber === orderId
        ? { ...o, trackingNumber: awb, awbNumber: awb, status: "shipped" }
        : o,
    );
    setOrders(updated);
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("ayur_orders", JSON.stringify(updated.slice(0, 50)));
        updateOrderStatusServer(orderId, "shipped").catch(console.error);
      }
    } catch {}
    if (selectedOrder && (selectedOrder.id === orderId || selectedOrder.orderNumber === orderId)) {
      setSelectedOrder({ ...selectedOrder, trackingNumber: awb, awbNumber: awb, status: "shipped" });
    }
    showToast(`AWB ${awb} assigned. Order marked as Shipped.`);
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    const updated = orders.map((o) =>
      o.id === orderId || o.orderNumber === orderId
        ? { ...o, status: newStatus }
        : o,
    );
    setOrders(updated);

    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "ayur_orders",
          JSON.stringify(updated.slice(0, 50)),
        );
        updateOrderStatusServer(orderId, newStatus).catch(console.error);
      }
    } catch {}

    if (
      selectedOrder &&
      (selectedOrder.id === orderId || selectedOrder.orderNumber === orderId)
    ) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
    showToast(`Order status updated to ${newStatus.toUpperCase()}`);
  };

  const handleBulkStatusChange = (newStatus: string) => {
    if (selectedOrderIds.length === 0) return;
    const count = selectedOrderIds.length;
    const updated = orders.map((o) => {
      const id = o.id || o.orderNumber;
      if (selectedOrderIds.includes(id)) {
        if (typeof window !== "undefined") {
          updateOrderStatusServer(id, newStatus).catch(console.error);
        }
        return { ...o, status: newStatus };
      }
      return o;
    });
    setOrders(updated);
    try {
      localStorage.setItem("ayur_orders", JSON.stringify(updated.slice(0, 50)));
    } catch {}
    showToast(`Batch updated ${count} orders to ${newStatus.toUpperCase()}`);
    setSelectedOrderIds([]);
  };

  const handleResetData = () => {
    if (typeof window !== "undefined") {
      if (
        confirm(
          "Are you sure you want to zero out all stored data and start fresh tracking? All existing test data will be reset to 0.",
        )
      ) {
        clearAllAnalyticsData();
        useUserStore.getState().clearOrders();
        setOrders([]);
        setAnalytics(getAnalyticsSummary(dateRange));
        showToast("All test logs and orders zeroed out cleanly", "info");
      }
    }
  };

  const handleRangeChange = (range: DateRange) => {
    setDateRange(range);
    loadDashboardData(range);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    const res = await loginAdmin(pin);
    setAuthLoading(false);

    if (res.success) {
      setIsAuthenticated(true);
      setPin("");
      loadDashboardData();
      showToast("Apothecary Terminal Authenticated");
    } else {
      setAuthError(res.message);
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    setIsAuthenticated(false);
  };

  const handleSaveMarketing = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(
      "ayur_marketing_config",
      JSON.stringify(marketingConfig),
    );
    setConfigSaved(true);
    showToast("Marketing pixels and analytics IDs persisted");
    setTimeout(() => setConfigSaved(false), 2500);
  };

  const handleSaveStoreSettings = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(
      "ayur_store_settings",
      JSON.stringify(storeSettings),
    );
    setSettingsSaved(true);
    showToast("Store regulatory parameters saved");
    setTimeout(() => setSettingsSaved(false), 2500);
  };

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;
    const code = newCouponCode.trim().toUpperCase();
    if (coupons.some((c) => c.code === code)) {
      showToast("Coupon code already exists", "info");
      return;
    }
    const updated = [
      ...coupons,
      {
        code,
        discount: Number(newCouponDiscount) || 10,
        type: "percent" as const,
        minOrder: 0,
        active: true,
      },
    ];
    setCoupons(updated);
    try {
      localStorage.setItem("ayur_custom_coupons", JSON.stringify(updated));
    } catch {}
    setNewCouponCode("");
    showToast(`Coupon ${code} created successfully`);
  };

  const handleToggleCoupon = (code: string) => {
    const updated = coupons.map((c) =>
      c.code === code ? { ...c, active: !c.active } : c,
    );
    setCoupons(updated);
    try {
      localStorage.setItem("ayur_custom_coupons", JSON.stringify(updated));
    } catch {}
    showToast(`Toggled coupon ${code}`);
  };

  // 1. Loading View
  if (!isMounted) {
    return (
      <div className="bg-[#FAF7F2] min-h-screen container py-16 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#1C1D1F] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // 2. Login View
  if (!isAuthenticated) {
    const lockout = isLockedOut();
    return (
      <div className="bg-[#FAF7F2] min-h-screen text-[#1C1D1F] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-[#FFFFFF] border border-[#9E8047]/25 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="text-center mb-6">
            <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-[#EFF4F0] border border-[#4E5F52]/30 flex items-center justify-center text-[#4E5F52]">
              <Shield className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-semibold text-[#4E5F52] uppercase tracking-wider block font-mono">
              Ayur Veda Global Operations
            </span>
            <h1 className="font-heading text-xl sm:text-2xl font-normal text-[#1C1D1F] mt-1">
              Admin Operations Terminal
            </h1>
            <p className="text-xs text-[#737373] mt-1 font-sans">
              Centralized enterprise command for order fulfillment, stock, marketing &amp; patron CRM.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-medium text-[#737373] uppercase tracking-wider mb-1 font-mono">
                Administrator Security Passkey
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Enter administrator passkey (ayur2026)"
                  className="w-full pl-3 pr-10 py-2.5 bg-[#FAF7F2] border border-[#9E8047]/25 rounded-xl text-xs text-[#1C1D1F] placeholder-[#999999] focus:outline-none focus:border-[#4E5F52] transition-colors"
                  disabled={lockout.locked}
                  required
                  autoFocus
                />
                <KeyRound className="w-4 h-4 text-[#737373] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              {authError && (
                <p className="text-rose-600 text-xs mt-1.5 flex items-center gap-1 font-medium font-sans">
                  <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{authError}</span>
                </p>
              )}
              {lockout.locked && (
                <p className="text-amber-700 text-xs mt-1.5 font-medium font-mono">
                  Lockout active. Please wait {lockout.remainingSeconds}s.
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              disabled={authLoading || lockout.locked}
              className="w-full py-2.5 bg-[#4E5F52] hover:bg-[#3D4D40] text-white text-xs font-medium uppercase tracking-wider rounded-xl transition-all shadow-xs"
            >
              {authLoading ? "Verifying..." : "Authenticate Terminal"}
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-[#9E8047]/25 text-center">
            <Link
              href="/"
              className="text-xs text-[#737373] hover:text-[#1C1D1F] transition-colors inline-flex items-center gap-1"
            >
              ← <span>Return to Storefront</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. Authenticated Calculations & Aggregations
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const deliveredOrders = orders.filter((o) => o.status === "delivered");
  const pendingOrders = orders.filter(
    (o) => o.status === "processing" || o.status === "confirmed",
  );
  const aov = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;
  const codOrdersCount = orders.filter((o) => o.paymentMethod === "cod").length;
  const prepaidOrdersCount = orders.length - codOrdersCount;
  const products = getAllProducts();

  // Inventory Aggregations
  const totalInventoryUnits = products.reduce((acc, p) => {
    const qty = stockOverrides[p.id] !== undefined ? stockOverrides[p.id] : (p.inventory?.quantity ?? 100);
    return acc + qty;
  }, 0);
  const totalInventoryValuation = products.reduce((acc, p) => {
    const qty = stockOverrides[p.id] !== undefined ? stockOverrides[p.id] : (p.inventory?.quantity ?? 100);
    return acc + p.price * qty;
  }, 0);
  const lowStockCount = products.filter((p) => {
    const qty = stockOverrides[p.id] !== undefined ? stockOverrides[p.id] : (p.inventory?.quantity ?? 100);
    return qty > 0 && qty <= 10;
  }).length;
  const outOfStockCount = products.filter((p) => {
    const qty = stockOverrides[p.id] !== undefined ? stockOverrides[p.id] : (p.inventory?.quantity ?? 100);
    return qty === 0;
  }).length;

  // Filtered orders for table
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      searchQuery.trim() === "" ||
      order.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.orderNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerPhone?.includes(searchQuery) ||
      order.shippingAddress?.phone?.includes(searchQuery);
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filtered products for inventory
  const filteredProducts = products.filter((p) => {
    const qty = stockOverrides[p.id] !== undefined ? stockOverrides[p.id] : (p.inventory?.quantity ?? 100);
    const matchesSearch =
      inventorySearch.trim() === "" ||
      p.name.toLowerCase().includes(inventorySearch.toLowerCase()) ||
      p.id.toLowerCase().includes(inventorySearch.toLowerCase()) ||
      p.category.toLowerCase().includes(inventorySearch.toLowerCase());
    if (!matchesSearch) return false;
    if (inventoryFilter === "low") return qty > 0 && qty <= 10;
    if (inventoryFilter === "out") return qty === 0;
    if (inventoryFilter === "instock") return qty > 10;
    return true;
  });

  // CRM Patrons Consolidation
  const patronsMap = new Map<string, PatronProfile>();

  orders.forEach((o) => {
    const phone = (o.shippingAddress?.phone || o.customerPhone || "").trim();
    const name = (o.customerName || `${o.shippingAddress?.firstName || ""} ${o.shippingAddress?.lastName || ""}`.trim()) || "Patron";
    const key = phone || name.toLowerCase();
    const orderTotal = o.total || 0;
    const items = (o.items || []).map((i: any) => i.name || i.productName).filter(Boolean);
    const city = o.shippingAddress?.city || "";
    const state = o.shippingAddress?.state || "";
    const awb = o.trackingNumber || o.awbNumber || "";

    if (patronsMap.has(key)) {
      const existing = patronsMap.get(key)!;
      existing.ordersCount += 1;
      existing.totalLtv += orderTotal;
      existing.averageOrderValue = Math.round(existing.totalLtv / existing.ordersCount);
      items.forEach((item: string) => {
        if (!existing.productsBoughtOrInquired.includes(item)) {
          existing.productsBoughtOrInquired.push(item);
        }
      });
      if (awb && !existing.recentAwb) existing.recentAwb = awb;
      if (existing.totalLtv >= 5000 || existing.ordersCount >= 2) {
        existing.statusTier = existing.totalLtv >= 5000 ? "VIP" : "Repeat";
      }
    } else {
      patronsMap.set(key, {
        id: key,
        name,
        phone,
        email: o.customerEmail || "",
        address: o.shippingAddress?.addressLine1 || "",
        city,
        state,
        pincode: o.shippingAddress?.pincode || "",
        ordersCount: 1,
        totalLtv: orderTotal,
        averageOrderValue: orderTotal,
        lastActive: o.createdAt || new Date().toISOString(),
        source: "Storefront Checkout",
        productsBoughtOrInquired: items,
        recentAwb: awb,
        statusTier: orderTotal >= 5000 ? "VIP" : "Buyer",
      });
    }
  });

  leads.forEach((l, idx) => {
    const phone = (l.customerPhone || "").trim();
    const name = (l.customerName || "Enquiry Patron").trim();
    const key = phone || `lead-${idx}`;
    const prod = l.productName || "General Consultation";

    if (patronsMap.has(key)) {
      const existing = patronsMap.get(key)!;
      if (prod && !existing.productsBoughtOrInquired.includes(prod)) {
        existing.productsBoughtOrInquired.push(prod);
      }
    } else {
      patronsMap.set(key, {
        id: key,
        name,
        phone,
        ordersCount: 0,
        totalLtv: 0,
        averageOrderValue: 0,
        lastActive: l.createdAt || new Date().toISOString(),
        source: l.source || "WhatsApp Lead",
        productsBoughtOrInquired: prod ? [prod] : [],
        statusTier: "Lead",
      });
    }
  });

  const allPatrons: PatronProfile[] = Array.from(patronsMap.values()).sort(
    (a, b) => b.totalLtv - a.totalLtv || b.ordersCount - a.ordersCount,
  );

  const filteredPatrons = allPatrons.filter((p) => {
    const matchesSearch =
      customerSearch.trim() === "" ||
      p.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
      p.phone.includes(customerSearch) ||
      (p.city && p.city.toLowerCase().includes(customerSearch.toLowerCase()));
    const matchesTier =
      customerFilter === "all" ||
      (customerFilter === "vip" && p.statusTier === "VIP") ||
      (customerFilter === "repeat" && p.statusTier === "Repeat") ||
      (customerFilter === "buyer" && (p.statusTier === "Buyer" || p.ordersCount > 0)) ||
      (customerFilter === "lead" && p.statusTier === "Lead");
    return matchesSearch && matchesTier;
  });

  const getWhatsAppTemplateText = (
    template: "dispatch" | "vaidya" | "vip" | "inquiry",
    patron: PatronProfile,
  ) => {
    const prod = patron.productsBoughtOrInquired[0] || "Ayur Veda Global Formulations";
    switch (template) {
      case "dispatch":
        return `Namaste ${patron.name}! Your order from Ayur Veda Global has been securely packed in tamper-proof discreet packaging and dispatched via express courier. ${
          patron.recentAwb
            ? `Carrier Tracking (AWB): ${patron.recentAwb}. Track here: https://www.delhivery.com/track/package/${patron.recentAwb}`
            : "Tracking details will be shared on departure."
        } Pranam! 🌿`;
      case "vaidya":
        return `Namaste ${patron.name}! Our Chief Ayurvedic Vaidya at Ayur Veda Global is following up on your wellness regimen with ${prod}. Are you consuming it after meals with warm water as prescribed? If you have any dosha questions or dosage inquiries, our team is at your service! 🌿`;
      case "vip":
        return `Namaste ${patron.name}! As an esteemed patron of Ayur Veda Global, we have activated an exclusive 15% VIP courtesy savings on your next regimen replenish. Use code: AYUR15 at checkout (https://ayurvedaglobal.com/shop). Warm regards! 🌿`;
      case "inquiry":
        return `Namaste ${patron.name}! Following up on your wellness inquiry regarding ${prod} — our senior herbalist and Vaidya consultation desk is available to assist you in selecting the ideal classical formulation for your body type. How may we guide you today? 🌿`;
    }
  };

  const handleExportCustomersCSV = () => {
    if (typeof window === "undefined") return;
    const headers = [
      "Patron Name",
      "Phone",
      "Tier",
      "Orders Count",
      "Lifetime Value (INR)",
      "AOV (INR)",
      "Formulations",
      "Source",
      "Recent AWB",
      "City",
      "State",
    ];
    const rows = filteredPatrons.map((p) =>
      [
        `"${p.name}"`,
        `"${p.phone}"`,
        `"${p.statusTier}"`,
        p.ordersCount,
        p.totalLtv,
        p.averageOrderValue,
        `"${p.productsBoughtOrInquired.join("; ")}"`,
        `"${p.source}"`,
        `"${p.recentAwb || ""}"`,
        `"${p.city || ""}"`,
        `"${p.state || ""}"`,
      ].join(","),
    );
    const csvContent =
      "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ayurveda_global_patrons_crm_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${filteredPatrons.length} patrons to CSV`);
  };

  const handleExportInventoryCSV = () => {
    if (typeof window === "undefined") return;
    const headers = [
      "SKU",
      "Formulation Name",
      "Category",
      "Price (INR)",
      "Live Stock Units",
      "Valuation (INR)",
      "Views",
      "Cart Adds",
      "Units Sold",
      "Revenue (INR)",
    ];
    const rows = products.map((p) => {
      const qty =
        stockOverrides[p.id] !== undefined
          ? stockOverrides[p.id]
          : (p.inventory?.quantity ?? 100);
      const perf = analytics?.productPerformance.find(
        (x) => x.id === p.id || x.id === p.slug,
      );
      const views = perf?.views || 0;
      const cartAdds = perf?.addToCart || 0;
      const unitsSold = perf?.orders || 0;
      const rev = perf?.revenue || unitsSold * p.price;
      return [
        `"${p.id}"`,
        `"${p.name}"`,
        `"${p.category}"`,
        p.price,
        qty,
        p.price * qty,
        views,
        cartAdds,
        unitsSold,
        rev,
      ].join(",");
    });
    const csvContent =
      "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ayurveda_global_inventory_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Inventory ledger exported to CSV");
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-[#1C1D1F] pb-16">
      {/* Top Operations Header */}
      <header className="border-b border-[#9E8047]/25 bg-[#FFFFFF] sticky top-0 z-30 shadow-xs">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#EFF4F0] border border-[#4E5F52]/30 flex items-center justify-center text-[#4E5F52]">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading text-sm font-semibold text-[#1C1D1F] uppercase tracking-wider">
                  Ayur Veda Global
                </h1>
                <span className="text-[9px] uppercase px-2 py-0.5 rounded-full bg-[#EFF4F0] text-[#4E5F52] font-mono font-medium border border-[#4E5F52]/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Terminal Live
                </span>
              </div>
              <p className="text-[10px] text-[#737373] hidden sm:block">
                Centralized Operations, Real-Time Analytics &amp; Order Fulfillment
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleResetData}
              className="text-xs text-amber-800 hover:text-amber-900 hover:bg-amber-100/60 px-2.5 py-1.5 rounded-lg border border-amber-300 bg-amber-50 inline-flex items-center gap-1.5 transition-colors"
              title="Reset all test data and start fresh tracking series from zero"
            >
              <RefreshCw className="w-3 h-3 text-amber-800" />
              <span className="hidden md:inline">Reset Data</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="text-xs text-[#737373] hover:text-[#1C1D1F] px-3 py-1.5 rounded-lg border border-[#9E8047]/25 bg-[#FAF7F2] inline-flex items-center gap-1.5 transition-colors"
            >
              <span>Live Store</span>
              <ExternalLink className="w-3 h-3 text-[#4E5F52]" />
            </Link>

            <button
              onClick={handleLogout}
              className="p-2 rounded-lg border border-[#9E8047]/25 hover:border-red-500 hover:text-red-600 text-[#737373] transition-colors"
              title="Lock Terminal"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation Strip */}
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-1 overflow-x-auto scrollbar-none border-t border-[#9E8047]/20 pt-1">
          {[
            {
              id: "analytics",
              label: "Real Analytics & Funnel",
              icon: TrendingUp,
            },
            { id: "orders", label: `Orders (${orders.length})`, icon: Package },
            {
              id: "products",
              label: `Inventory (${products.length})`,
              icon: Layers,
            },
            {
              id: "customers",
              label: `Patrons CRM (${allPatrons.length})`,
              icon: Users,
            },
            {
              id: "coupons",
              label: `Coupons (${coupons.length})`,
              icon: Gift,
            },
            { id: "marketing", label: "Marketing Integrations", icon: Globe },
            { id: "settings", label: "Store Settings", icon: Sliders },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 py-2.5 px-3.5 text-xs font-medium border-b-2 transition-all whitespace-nowrap ${
                  isActive
                    ? "border-[#4E5F52] text-[#4E5F52] font-semibold bg-[#FAF7F2]/50"
                    : "border-transparent text-[#737373] hover:text-[#1C1D1F]"
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 ${isActive ? "text-[#4E5F52]" : "text-[#737373]"}`}
                />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Panel Content */}
      <motion.main
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="container max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6"
      >
        {/* TAB 1: REAL ANALYTICS & MARKETING FUNNEL */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            {/* Date Range Selector & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#9E8047]/25">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#4E5F52]" />
                <span className="text-xs font-medium text-[#1C1D1F]">
                  Date Range:
                </span>
                <div className="flex items-center gap-1 bg-[#FFFFFF] border border-[#9E8047]/25 p-1 rounded-xl">
                  {(
                    ["all", "today", "yesterday", "7d", "30d"] as DateRange[]
                  ).map((r) => (
                    <button
                      key={r}
                      onClick={() => handleRangeChange(r)}
                      className={`px-2.5 py-1 text-[11px] rounded-lg font-medium transition-colors uppercase ${
                        dateRange === r
                          ? "bg-[#4E5F52] text-white"
                          : "text-[#737373] hover:text-[#1C1D1F]"
                      }`}
                    >
                      {r === "all"
                        ? "All Time"
                        : r === "7d"
                          ? "7 Days"
                          : r === "30d"
                            ? "30 Days"
                            : r}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => downloadAnalyticsCSV(analytics!)}
                  disabled={!analytics}
                  className="px-3 py-1.5 rounded-lg bg-[#FFFFFF] border border-[#9E8047]/25 hover:border-[#1C1D1F] text-xs font-medium text-[#1C1D1F] inline-flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-[#4E5F52]" />
                  <span>Export Analytics CSV</span>
                </button>

                <button
                  onClick={() => downloadOrdersCSV(orders)}
                  className="px-3 py-1.5 rounded-lg bg-[#4E5F52] hover:bg-[#3D4D40] text-white text-xs font-medium inline-flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Orders CSV</span>
                </button>
              </div>
            </div>

            {/* Core Metrics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#9E8047]/25 shadow-xs space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#737373] block">
                  Gross Revenue
                </span>
                <p className="text-xl sm:text-2xl font-semibold text-[#1C1D1F]">
                  {formatINR(totalRevenue)}
                </p>
                <span className="text-[10px] text-[#4E5F52] font-medium flex items-center gap-1">
                  <span>✓ 100% Real Confirmed Data</span>
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#9E8047]/25 shadow-xs space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#737373] block">
                  Total Orders
                </span>
                <p className="text-xl sm:text-2xl font-semibold text-[#1C1D1F]">
                  {orders.length}
                </p>
                <span className="text-[10px] text-[#737373]">
                  {deliveredOrders.length} Delivered • {pendingOrders.length} Active
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#9E8047]/25 shadow-xs space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#737373] block">
                  Average Order Value (AOV)
                </span>
                <p className="text-xl sm:text-2xl font-semibold text-[#4E5F52]">
                  {formatINR(aov)}
                </p>
                <span className="text-[10px] text-[#737373]">
                  Basket size across checkouts
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#9E8047]/25 shadow-xs space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#737373] block">
                  WhatsApp Leads &amp; Clicks
                </span>
                <p className="text-xl sm:text-2xl font-semibold text-[#1C1D1F]">
                  {analytics?.whatsappClicks || leads.length}
                </p>
                <span className="text-[10px] text-[#4E5F52] font-medium">
                  Direct Concierge Inquiries
                </span>
              </div>
            </div>

            {/* Payment Method & Fulfillment Split */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#9E8047]/25 shadow-xs">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#737373] block mb-1">
                  Doorstep COD Orders
                </span>
                <div className="flex items-baseline justify-between">
                  <p className="text-lg font-semibold text-[#1C1D1F]">{codOrdersCount} orders</p>
                  <span className="text-xs font-mono text-[#737373]">
                    {orders.length > 0 ? Math.round((codOrdersCount / orders.length) * 100) : 0}% of volume
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#9E8047]/25 shadow-xs">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#737373] block mb-1">
                  Prepaid / WhatsApp Direct
                </span>
                <div className="flex items-baseline justify-between">
                  <p className="text-lg font-semibold text-[#4E5F52]">{prepaidOrdersCount} orders</p>
                  <span className="text-xs font-mono text-[#737373]">
                    {orders.length > 0 ? Math.round((prepaidOrdersCount / orders.length) * 100) : 0}% of volume
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#9E8047]/25 shadow-xs">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#737373] block mb-1">
                  Conversion Rate
                </span>
                <div className="flex items-baseline justify-between">
                  <p className="text-lg font-semibold text-[#4E5F52]">
                    {analytics?.funnel.conversionRate || 0}%
                  </p>
                  <span className="text-xs font-mono text-[#737373]">
                    {analytics?.funnel.ordersCompleted || orders.length} orders / {analytics?.funnel.productViews || 0} views
                  </span>
                </div>
              </div>
            </div>

            {/* Secondary Metrics: Reach, Impressions, Clicks, Searches */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#9E8047]/25 shadow-xs">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#737373] block">
                  Unique Visitors
                </span>
                <p className="text-base font-semibold text-[#1C1D1F] mt-0.5">
                  {analytics?.uniqueSessions || 1}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#9E8047]/25 shadow-xs">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#737373] block">
                  Total Impressions
                </span>
                <p className="text-base font-semibold text-[#1C1D1F] mt-0.5">
                  {analytics?.totalImpressions || 0}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#9E8047]/25 shadow-xs">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#737373] block">
                  CTA &amp; Lead Clicks
                </span>
                <p className="text-base font-semibold text-[#1C1D1F] mt-0.5">
                  {analytics?.totalClicks || 0}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#9E8047]/25 shadow-xs">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#737373] block">
                  Catalog Searches
                </span>
                <p className="text-base font-semibold text-[#1C1D1F] mt-0.5">
                  {analytics?.totalSearches || 0}
                </p>
              </div>
            </div>

            {/* Complete E-Commerce Funnel Flow */}
            <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#9E8047]/25 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#9E8047]/25">
                <div>
                  <h2 className="font-heading text-sm font-semibold text-[#1C1D1F]">
                    Commerce Conversion Funnel
                  </h2>
                  <p className="text-xs text-[#737373]">
                    Visit → Product View → WhatsApp / Cart → Checkout → Completed Order
                  </p>
                </div>
                <span className="text-xs font-mono font-semibold text-[#4E5F52] bg-[#EFF4F0] px-2.5 py-1 rounded-full border border-[#4E5F52]/30">
                  {analytics?.funnel.conversionRate || 0}% Conversion
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
                {[
                  {
                    step: "1. Store Visits",
                    val: analytics?.funnel.visitors || 1,
                    desc: "Unique user sessions",
                    bg: "bg-[#FAF7F2]",
                  },
                  {
                    step: "2. Product Views",
                    val: analytics?.funnel.productViews || 0,
                    desc: "Formulation inspection",
                    bg: "bg-[#FAF7F2]",
                  },
                  {
                    step: "3. Cart / WhatsApp",
                    val: analytics?.funnel.addToCartOrWhatsApp || 0,
                    desc: "High intent interactions",
                    bg: "bg-[#EFF4F0]",
                  },
                  {
                    step: "4. Checkout Start",
                    val: analytics?.funnel.checkoutStarts || 0,
                    desc: "Shipping info initiated",
                    bg: "bg-[#EFF4F0]",
                  },
                  {
                    step: "5. Confirmed Orders",
                    val: analytics?.funnel.ordersCompleted || orders.length,
                    desc: "Paid &amp; verified orders",
                    bg: "bg-[#EFF4F0]",
                  },
                ].map((s, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border border-[#9E8047]/25 ${s.bg} space-y-1 relative`}
                  >
                    <span className="text-[10px] font-mono uppercase text-[#737373] block">
                      {s.step}
                    </span>
                    <p className="text-lg font-semibold text-[#1C1D1F]">
                      {s.val}
                    </p>
                    <span className="text-[10px] text-[#737373] block leading-tight">
                      {s.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Regional & Device Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#9E8047]/25 shadow-xs space-y-3">
                <span className="text-xs font-semibold text-[#1C1D1F] block">
                  Device Hardware Allocation
                </span>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 rounded-lg bg-[#FAF7F2] border border-[#9E8047]/20">
                    <Smartphone className="w-4 h-4 mx-auto mb-1 text-[#4E5F52]" />
                    <span className="text-[10px] text-[#737373] block">Mobile</span>
                    <strong className="text-xs text-[#1C1D1F]">
                      {analytics?.deviceBreakdown.mobile || 1}
                    </strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#FAF7F2] border border-[#9E8047]/20">
                    <Tablet className="w-4 h-4 mx-auto mb-1 text-[#4E5F52]" />
                    <span className="text-[10px] text-[#737373] block">Tablet</span>
                    <strong className="text-xs text-[#1C1D1F]">
                      {analytics?.deviceBreakdown.tablet || 0}
                    </strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#FAF7F2] border border-[#9E8047]/20">
                    <Monitor className="w-4 h-4 mx-auto mb-1 text-[#4E5F52]" />
                    <span className="text-[10px] text-[#737373] block">Desktop</span>
                    <strong className="text-xs text-[#1C1D1F]">
                      {analytics?.deviceBreakdown.desktop || 0}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#9E8047]/25 shadow-xs space-y-3">
                <span className="text-xs font-semibold text-[#1C1D1F] block">
                  Top Dispatch Regions
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(analytics?.geoBreakdown || []).length > 0 ? (
                    analytics!.geoBreakdown.map((g, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-[#FAF7F2] border border-[#9E8047]/25 text-[11px] text-[#1C1D1F]"
                      >
                        {g.region} ({g.count})
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-[#737373]">
                      Delhi NCR, Karnataka, Maharashtra, Gujarat, Rajasthan, Tamil Nadu
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS LEDGER & BULK OPERATIONS */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            {/* Search, Filter & Export Bar */}
            <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#9E8047]/25 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-1 max-w-md">
                <Search className="w-4 h-4 text-[#737373]" />
                <input
                  type="text"
                  placeholder="Search by Order ID, Customer Name, or Phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-xs text-[#1C1D1F] placeholder-[#999999] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#9E8047]/25 text-xs text-[#1C1D1F] focus:outline-none font-mono"
                >
                  <option value="all">All Statuses ({orders.length})</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <button
                  onClick={() => downloadOrdersCSV(orders)}
                  className="px-3 py-1.5 rounded-lg bg-[#4E5F52] hover:bg-[#3D4D40] text-white text-xs font-medium inline-flex items-center gap-1 shadow-xs transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export All CSV</span>
                </button>
              </div>
            </div>

            {/* Bulk Order Operations Floating Action Bar */}
            {selectedOrderIds.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-[#071A12] text-white rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-lg border border-[#D4AF37]/30"
              >
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-[#10B981]/20 text-[#10B981] text-xs font-mono font-bold border border-[#10B981]/30">
                    {selectedOrderIds.length} Orders Selected
                  </span>
                  <span className="text-xs text-stone-300 hidden sm:inline">
                    Bulk Logistics Actions:
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleBulkStatusChange("processing")}
                    className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs text-stone-200 border border-stone-600 transition-colors"
                  >
                    Mark Processing
                  </button>
                  <button
                    onClick={() => handleBulkStatusChange("shipped")}
                    className="px-2.5 py-1 rounded-lg bg-[#4E5F52] hover:bg-[#3D4D40] text-xs text-white font-medium transition-colors"
                  >
                    Mark Shipped
                  </button>
                  <button
                    onClick={() => handleBulkStatusChange("delivered")}
                    className="px-2.5 py-1 rounded-lg bg-[#10B981] hover:bg-emerald-600 text-xs text-[#071A12] font-semibold transition-colors"
                  >
                    Mark Delivered
                  </button>
                  <button
                    onClick={() => {
                      const selected = orders.filter((o) =>
                        selectedOrderIds.includes(o.id || o.orderNumber),
                      );
                      downloadOrdersCSV(selected);
                      showToast(`Exported ${selected.length} orders to CSV`);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs text-stone-200 border border-stone-600 transition-colors inline-flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    <span>CSV</span>
                  </button>
                  <button
                    onClick={() => setSelectedOrderIds([])}
                    className="px-2.5 py-1 rounded-lg text-xs text-stone-400 hover:text-white transition-colors"
                  >
                    Clear Selection
                  </button>
                </div>
              </motion.div>
            )}

            {/* Orders Table */}
            <div className="bg-[#FFFFFF] border border-[#9E8047]/25 rounded-2xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF7F2] border-b border-[#9E8047]/25 text-[#737373] uppercase font-mono text-[10px]">
                    <tr>
                      <th className="py-3 px-3 w-8">
                        <input
                          type="checkbox"
                          checked={
                            filteredOrders.length > 0 &&
                            filteredOrders.every((o) =>
                              selectedOrderIds.includes(o.id || o.orderNumber),
                            )
                          }
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedOrderIds(
                                filteredOrders.map((o) => o.id || o.orderNumber),
                              );
                            } else {
                              setSelectedOrderIds([]);
                            }
                          }}
                          className="rounded border-[#9E8047]/30 text-[#4E5F52] focus:ring-[#4E5F52] w-4 h-4 cursor-pointer"
                          title="Select all orders"
                        />
                      </th>
                      <th className="py-3 px-4">Order ID</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Payment</th>
                      <th className="py-3 px-4">Total</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#999999]/20">
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map((order) => {
                        const orderNum = order.orderNumber || order.id;
                        const customerDisplay =
                          order.customerName ||
                          `${order.shippingAddress?.firstName || ""} ${order.shippingAddress?.lastName || ""}`.trim() ||
                          "Patron";
                        const isSelected = selectedOrderIds.includes(
                          order.id || order.orderNumber,
                        );

                        return (
                          <tr
                            key={order.id || order.orderNumber}
                            className={`hover:bg-[#FAF7F2]/50 transition-colors ${
                              isSelected ? "bg-[#EFF4F0]/60" : ""
                            }`}
                          >
                            <td className="py-3 px-3">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => {
                                  const id = order.id || order.orderNumber;
                                  setSelectedOrderIds((prev) =>
                                    prev.includes(id)
                                      ? prev.filter((x) => x !== id)
                                      : [...prev, id],
                                  );
                                }}
                                className="rounded border-[#9E8047]/30 text-[#4E5F52] focus:ring-[#4E5F52] w-4 h-4 cursor-pointer"
                              />
                            </td>
                            <td className="py-3 px-4 font-mono font-semibold text-[#1C1D1F]">
                              #{orderNum}
                            </td>
                            <td className="py-3 px-4">
                              <p className="font-medium text-[#1C1D1F]">
                                {customerDisplay}
                              </p>
                              <span className="text-[10px] text-[#737373]">
                                {order.shippingAddress?.phone ||
                                  order.customerPhone}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-[#737373]">
                              {order.createdAt
                                ? new Date(order.createdAt).toLocaleDateString(
                                    "en-IN",
                                  )
                                : "Recent"}
                            </td>
                            <td className="py-3 px-4 font-mono uppercase text-[10.5px]">
                              {order.paymentMethod === "cod"
                                ? "Doorstep COD"
                                : "Prepaid / Direct"}
                            </td>
                            <td className="py-3 px-4 font-semibold text-[#1C1D1F]">
                              {formatINR(order.total)}
                            </td>
                            <td className="py-3 px-4">
                              <select
                                value={order.status || "confirmed"}
                                onChange={(e) =>
                                  handleStatusChange(order.id, e.target.value)
                                }
                                className={`px-2 py-1 rounded-full text-[10px] font-semibold border focus:outline-none uppercase ${
                                  order.status === "delivered"
                                    ? "bg-[#EFF4F0] text-[#4E5F52] border-[#4E5F52]/30"
                                    : order.status === "shipped"
                                      ? "bg-[#FAF7F2] text-[#1C1D1F] border-[#9E8047]/30"
                                      : "bg-[#FFF9EA] text-amber-800 border-amber-300"
                                }`}
                              >
                                <option value="confirmed">Confirmed</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => setInvoiceOrder(order)}
                                  title="Print GST Tax Invoice & Packing Slip"
                                  className="px-2 py-1 rounded-lg border border-[#9E8047]/30 hover:border-[#1C1D1F] text-[11px] font-medium text-[#1C1D1F] bg-[#FAF7F2] hover:bg-[#FFFFFF] inline-flex items-center gap-1 transition-all"
                                >
                                  <Printer className="w-3.5 h-3.5 text-[#4E5F52]" />
                                  <span>Slip</span>
                                </button>
                                <button
                                  onClick={() => setSelectedOrder(order)}
                                  className="px-2.5 py-1 rounded-lg border border-[#9E8047]/25 hover:border-[#1C1D1F] text-[11px] text-[#1C1D1F] transition-colors"
                                >
                                  Inspect
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td
                          colSpan={8}
                          className="py-8 text-center text-xs text-[#737373]"
                        >
                          No orders matched your search criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PRODUCT PERFORMANCE & LIVE INVENTORY */}
        {activeTab === "products" && (
          <div className="space-y-4">
            {/* Inventory Valuation Header Strip */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#9E8047]/25 shadow-xs">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#737373] block">
                  Catalog Formulations
                </span>
                <p className="text-xl font-semibold text-[#1C1D1F] mt-0.5">
                  {products.length} SKUs
                </p>
                <span className="text-[10px] text-[#4E5F52]">100% Certified AYUSH</span>
              </div>

              <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#9E8047]/25 shadow-xs">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#737373] block">
                  Total Units In-Stock
                </span>
                <p className="text-xl font-semibold text-[#1C1D1F] mt-0.5">
                  {totalInventoryUnits} units
                </p>
                <span className="text-[10px] text-[#737373]">Across all warehouse batches</span>
              </div>

              <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#9E8047]/25 shadow-xs">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#737373] block">
                  Inventory Valuation
                </span>
                <p className="text-xl font-semibold text-[#4E5F52] mt-0.5">
                  {formatINR(totalInventoryValuation)}
                </p>
                <span className="text-[10px] text-[#737373]">Live warehouse retail value</span>
              </div>

              <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#9E8047]/25 shadow-xs">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#737373] block">
                  Stock Alerts
                </span>
                <p className="text-xl font-semibold text-amber-700 mt-0.5">
                  {lowStockCount} Low / {outOfStockCount} Out
                </p>
                <span className="text-[10px] text-[#737373]">Replenishment indicators</span>
              </div>
            </div>

            {/* Inventory Search & Filters */}
            <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#9E8047]/25 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-1 max-w-md">
                <Search className="w-4 h-4 text-[#737373]" />
                <input
                  type="text"
                  placeholder="Search formulations by name, category, or SKU..."
                  value={inventorySearch}
                  onChange={(e) => setInventorySearch(e.target.value)}
                  className="w-full bg-transparent text-xs text-[#1C1D1F] placeholder-[#999999] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-[#FAF7F2] border border-[#9E8047]/25 p-1 rounded-xl">
                  {[
                    { id: "all", label: `All (${products.length})` },
                    { id: "instock", label: "In Stock" },
                    { id: "low", label: `Low (${lowStockCount})` },
                    { id: "out", label: `Out (${outOfStockCount})` },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setInventoryFilter(f.id as any)}
                      className={`px-2.5 py-1 text-[11px] rounded-lg font-medium transition-colors ${
                        inventoryFilter === f.id
                          ? "bg-[#4E5F52] text-white"
                          : "text-[#737373] hover:text-[#1C1D1F]"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleExportInventoryCSV}
                  className="px-3 py-1.5 rounded-lg bg-[#4E5F52] hover:bg-[#3D4D40] text-white text-xs font-medium inline-flex items-center gap-1 shadow-xs transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>CSV</span>
                </button>
              </div>
            </div>

            {/* Inventory Table */}
            <div className="bg-[#FFFFFF] border border-[#9E8047]/25 rounded-2xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF7F2] border-b border-[#9E8047]/25 text-[#737373] uppercase font-mono text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Formulation</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Price</th>
                      <th className="py-3 px-4">Views</th>
                      <th className="py-3 px-4">Units Sold</th>
                      <th className="py-3 px-4">Gross Revenue</th>
                      <th className="py-3 px-4">Live Units</th>
                      <th className="py-3 px-4">Stock Health</th>
                      <th className="py-3 px-4 text-right">Quick Restock</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#999999]/20">
                    {filteredProducts.map((p) => {
                      const img = getProductImage(p, p.id, "thumb");
                      const perf = analytics?.productPerformance.find(
                        (perf) => perf.id === p.id || perf.id === p.slug,
                      );
                      const views = perf?.views || 0;
                      const unitsSold = perf?.orders || 0;
                      const rev = perf?.revenue || unitsSold * p.price;
                      const qty =
                        stockOverrides[p.id] !== undefined
                          ? stockOverrides[p.id]
                          : (p.inventory?.quantity ?? 100);

                      return (
                        <tr
                          key={p.id}
                          className="hover:bg-[#FAF7F2]/50 transition-colors"
                        >
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-lg bg-[#FAF7F2] border border-[#9E8047]/25 relative overflow-hidden flex-shrink-0">
                                <Image
                                  src={img.src}
                                  alt={p.name}
                                  fill
                                  className="object-cover"
                                  sizes="36px"
                                />
                              </div>
                              <div>
                                <span className="font-medium text-[#1C1D1F] block">
                                  {p.name}
                                </span>
                                <span className="text-[10px] text-[#737373] font-mono">
                                  SKU: {p.id.toUpperCase()}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-[#737373] capitalize">
                            {p.category}
                          </td>
                          <td className="py-3 px-4 font-semibold text-[#1C1D1F]">
                            {formatINR(p.price)}
                          </td>
                          <td className="py-3 px-4 font-mono">{views}</td>
                          <td className="py-3 px-4 font-mono font-medium text-[#4E5F52]">
                            {unitsSold}
                          </td>
                          <td className="py-3 px-4 font-mono font-semibold text-[#1C1D1F]">
                            {formatINR(rev)}
                          </td>
                          <td className="py-3 px-4 font-mono font-semibold text-[#1C1D1F]">
                            {qty}
                          </td>
                          <td className="py-3 px-4">
                            {qty === 0 ? (
                              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-800 border border-red-300">
                                Out of Stock
                              </span>
                            ) : qty <= 10 ? (
                              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                                Low Stock ({qty})
                              </span>
                            ) : (
                              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-[#EFF4F0] text-[#4E5F52] border border-[#4E5F52]/30">
                                Optimal
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleQuickStockAdjust(p.id, -1)}
                                className="w-6 h-6 rounded border border-[#9E8047]/30 hover:border-[#1C1D1F] flex items-center justify-center text-[#737373] hover:text-[#1C1D1F] transition-colors"
                                title="Reduce 1 unit"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <input
                                type="number"
                                min="0"
                                max="9999"
                                value={qty}
                                onChange={(e) =>
                                  handleStockUpdate(
                                    p.id,
                                    parseInt(e.target.value) || 0,
                                  )
                                }
                                className="w-14 px-1.5 py-0.5 rounded bg-[#FAF7F2] border border-[#9E8047]/25 text-xs text-center font-mono focus:outline-none focus:border-[#4E5F52]"
                                title="Direct edit stock count"
                              />
                              <button
                                onClick={() => handleQuickStockAdjust(p.id, 1)}
                                className="w-6 h-6 rounded border border-[#9E8047]/30 hover:border-[#1C1D1F] flex items-center justify-center text-[#737373] hover:text-[#1C1D1F] transition-colors"
                                title="Add 1 unit"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => handleQuickStockAdjust(p.id, 50)}
                                className="px-2 py-0.5 rounded bg-[#EFF4F0] border border-[#4E5F52]/30 text-[10px] font-mono text-[#4E5F52] hover:bg-[#4E5F52] hover:text-white transition-colors"
                                title="Quick Restock +50 Units"
                              >
                                +50
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PATRONS & LEADS CRM */}
        {activeTab === "customers" && (
          <div className="space-y-4">
            {/* CRM Highlights */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#9E8047]/25 shadow-xs">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#737373] block">
                  Registered Patrons
                </span>
                <p className="text-xl font-semibold text-[#1C1D1F] mt-0.5">
                  {allPatrons.length} Contacts
                </p>
                <span className="text-[10px] text-[#4E5F52]">Unique buyers &amp; leads</span>
              </div>

              <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#9E8047]/25 shadow-xs">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#737373] block">
                  VIP Patrons (₹5k+ LTV)
                </span>
                <p className="text-xl font-semibold text-[#D4AF37] mt-0.5">
                  {allPatrons.filter((p) => p.statusTier === "VIP").length} Patrons
                </p>
                <span className="text-[10px] text-[#737373]">High-value herbal patrons</span>
              </div>

              <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#9E8047]/25 shadow-xs">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#737373] block">
                  Cumulative Patron LTV
                </span>
                <p className="text-xl font-semibold text-[#4E5F52] mt-0.5">
                  {formatINR(totalRevenue)}
                </p>
                <span className="text-[10px] text-[#737373]">Total lifetime spend</span>
              </div>

              <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#9E8047]/25 shadow-xs">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#737373] block">
                  Consultation Leads
                </span>
                <p className="text-xl font-semibold text-amber-800 mt-0.5">
                  {allPatrons.filter((p) => p.statusTier === "Lead").length}
                </p>
                <span className="text-[10px] text-[#737373]">WhatsApp &amp; modal enquiries</span>
              </div>
            </div>

            {/* CRM Search, Tier Filter & Export */}
            <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#9E8047]/25 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-1 max-w-md">
                <Search className="w-4 h-4 text-[#737373]" />
                <input
                  type="text"
                  placeholder="Search patron by name, phone number, or city..."
                  value={customerSearch}
                  onChange={(e) => setCustomerSearch(e.target.value)}
                  className="w-full bg-transparent text-xs text-[#1C1D1F] placeholder-[#999999] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-[#FAF7F2] border border-[#9E8047]/25 p-1 rounded-xl">
                  {[
                    { id: "all", label: `All (${allPatrons.length})` },
                    { id: "vip", label: "VIP" },
                    { id: "buyer", label: "Buyers" },
                    { id: "lead", label: "Leads" },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setCustomerFilter(f.id as any)}
                      className={`px-2.5 py-1 text-[11px] rounded-lg font-medium transition-colors ${
                        customerFilter === f.id
                          ? "bg-[#4E5F52] text-white"
                          : "text-[#737373] hover:text-[#1C1D1F]"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleExportCustomersCSV}
                  className="px-3 py-1.5 rounded-lg bg-[#4E5F52] hover:bg-[#3D4D40] text-white text-xs font-medium inline-flex items-center gap-1 shadow-xs transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>CSV</span>
                </button>
              </div>
            </div>

            {/* Patrons CRM Table */}
            <div className="bg-[#FFFFFF] border border-[#9E8047]/25 rounded-2xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF7F2] border-b border-[#9E8047]/25 text-[#737373] uppercase font-mono text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Patron Name</th>
                      <th className="py-3 px-4">Contact Phone</th>
                      <th className="py-3 px-4">Tier / Segment</th>
                      <th className="py-3 px-4">Orders</th>
                      <th className="py-3 px-4">Lifetime Value (LTV)</th>
                      <th className="py-3 px-4">Recent Regimen Interest</th>
                      <th className="py-3 px-4 text-right">Concierge WhatsApp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#999999]/20">
                    {filteredPatrons.length > 0 ? (
                      filteredPatrons.map((patron) => (
                        <tr
                          key={patron.id}
                          className="hover:bg-[#FAF7F2]/50 transition-colors"
                        >
                          <td className="py-3 px-4 font-medium text-[#1C1D1F]">
                            <div>
                              <span>{patron.name}</span>
                              {patron.city && (
                                <span className="block text-[10px] text-[#737373]">
                                  {patron.city}, {patron.state}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4 font-mono text-[#737373]">
                            {patron.phone || "—"}
                          </td>
                          <td className="py-3 px-4">
                            {patron.statusTier === "VIP" ? (
                              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 inline-flex items-center gap-1">
                                <Sparkles className="w-2.5 h-2.5 text-amber-700" />
                                VIP Patron
                              </span>
                            ) : patron.statusTier === "Repeat" ? (
                              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                                Repeat Buyer
                              </span>
                            ) : patron.statusTier === "Buyer" ? (
                              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-[#EFF4F0] text-[#4E5F52] border border-[#4E5F52]/30">
                                Verified Buyer
                              </span>
                            ) : (
                              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-[#FAF7F2] text-[#737373] border border-[#9E8047]/25">
                                Consultation Lead
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4 font-mono">
                            {patron.ordersCount}
                          </td>
                          <td className="py-3 px-4 font-mono font-semibold text-[#1C1D1F]">
                            {patron.totalLtv > 0 ? formatINR(patron.totalLtv) : "—"}
                          </td>
                          <td className="py-3 px-4 text-[#737373] max-w-xs truncate">
                            {patron.productsBoughtOrInquired.join(", ") || "Ayurvedic Classical Care"}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => {
                                setContactModalPatron(patron);
                                setContactMessageTemplate("dispatch");
                                setCustomContactMessage(
                                  getWhatsAppTemplateText("dispatch", patron),
                                );
                              }}
                              className="px-2.5 py-1 rounded-lg bg-[#4E5F52] hover:bg-[#3D4D40] text-white text-[11px] font-medium inline-flex items-center gap-1 shadow-xs transition-colors"
                            >
                              <MessageCircle className="w-3 h-3" />
                              <span>Concierge</span>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={7}
                          className="py-8 text-center text-xs text-[#737373]"
                        >
                          No patron profiles matched your search criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: COUPONS & OFFERS */}
        {activeTab === "coupons" && (
          <div className="space-y-4">
            {/* Add Coupon Form */}
            <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#9E8047]/25 shadow-xs space-y-4">
              <h2 className="font-heading text-sm font-semibold text-[#1C1D1F]">
                Create Promotional Voucher
              </h2>
              <form
                onSubmit={handleAddCoupon}
                className="flex flex-col sm:flex-row items-center gap-3"
              >
                <input
                  type="text"
                  placeholder="Coupon Code (e.g. VIP25)"
                  value={newCouponCode}
                  onChange={(e) =>
                    setNewCouponCode(e.target.value.toUpperCase())
                  }
                  className="w-full sm:w-60 px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#9E8047]/25 text-xs text-[#1C1D1F] font-mono uppercase focus:outline-none focus:border-[#4E5F52]"
                />
                <input
                  type="number"
                  placeholder="Discount %"
                  value={newCouponDiscount}
                  onChange={(e) => setNewCouponDiscount(e.target.value)}
                  className="w-full sm:w-36 px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#9E8047]/25 text-xs text-[#1C1D1F] font-mono focus:outline-none focus:border-[#4E5F52]"
                />
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full sm:w-auto py-2 px-4 rounded-xl bg-[#4E5F52] hover:bg-[#3D4D40] text-white text-xs font-medium uppercase tracking-wider"
                >
                  Add Coupon
                </Button>
              </form>
            </div>

            {/* Coupons Table */}
            <div className="bg-[#FFFFFF] border border-[#9E8047]/25 rounded-2xl overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF7F2] border-b border-[#9E8047]/25 text-[#737373] uppercase font-mono text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Coupon Code</th>
                    <th className="py-3 px-4">Benefit</th>
                    <th className="py-3 px-4">Min Order</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Toggle</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#999999]/20">
                  {coupons.map((c) => (
                    <tr
                      key={c.code}
                      className="hover:bg-[#FAF7F2]/50 transition-colors"
                    >
                      <td className="py-3 px-4 font-mono font-semibold text-[#1C1D1F]">
                        {c.code}
                      </td>
                      <td className="py-3 px-4 text-[#4E5F52] font-semibold">
                        {c.discount}% Courtesy Discount
                      </td>
                      <td className="py-3 px-4 font-mono text-[#737373]">
                        {c.minOrder > 0 ? `₹${c.minOrder}` : "No minimum"}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full ${
                            c.active
                              ? "bg-[#EFF4F0] text-[#4E5F52] border border-[#4E5F52]/30"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {c.active ? "Active" : "Disabled"}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleToggleCoupon(c.code)}
                          className="px-2.5 py-1 rounded-lg border border-[#9E8047]/25 text-[11px] text-[#1C1D1F] hover:bg-[#FAF7F2] transition-colors"
                        >
                          {c.active ? "Disable" : "Enable"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: MARKETING INTEGRATIONS ARCHITECTURE */}
        {activeTab === "marketing" && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#9E8047]/25 shadow-xs space-y-4">
              <div>
                <h2 className="font-heading text-sm font-semibold text-[#1C1D1F]">
                  External Marketing &amp; Ad Pixel Architecture
                </h2>
                <p className="text-xs text-[#737373]">
                  Configure your Google Analytics, Meta Pixel, and WhatsApp tracking IDs. No code changes required.
                </p>
              </div>

              <form onSubmit={handleSaveMarketing} className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#1C1D1F] mb-1 font-mono">
                      Google Analytics 4 (Measurement ID)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. G-ABC123XYZ"
                      value={marketingConfig.ga4Id}
                      onChange={(e) =>
                        setMarketingConfig({
                          ...marketingConfig,
                          ga4Id: e.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#9E8047]/25 text-xs text-[#1C1D1F] font-mono focus:outline-none focus:border-[#4E5F52]"
                    />
                    <span className="text-[10px] text-[#737373] mt-1 block">
                      Connects directly to your Google Analytics dashboard
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#1C1D1F] mb-1 font-mono">
                      Meta / Facebook Pixel ID
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 192837465019"
                      value={marketingConfig.metaPixelId}
                      onChange={(e) =>
                        setMarketingConfig({
                          ...marketingConfig,
                          metaPixelId: e.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#9E8047]/25 text-xs text-[#1C1D1F] font-mono focus:outline-none focus:border-[#4E5F52]"
                    />
                    <span className="text-[10px] text-[#737373] mt-1 block">
                      Tracks Purchase &amp; AddToCart events for ad campaigns
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#1C1D1F] mb-1 font-mono">
                      Google Search Console Verification Tag
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. google-site-verification=..."
                      value={marketingConfig.gscTag}
                      onChange={(e) =>
                        setMarketingConfig({
                          ...marketingConfig,
                          gscTag: e.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#9E8047]/25 text-xs text-[#1C1D1F] font-mono focus:outline-none focus:border-[#4E5F52]"
                    />
                    <span className="text-[10px] text-[#737373] mt-1 block">
                      Verifies domain ownership for organic search traffic
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#1C1D1F] mb-1 font-mono">
                      Official WhatsApp Business Number
                    </label>
                    <input
                      type="text"
                      value={marketingConfig.whatsappNumber}
                      onChange={(e) =>
                        setMarketingConfig({
                          ...marketingConfig,
                          whatsappNumber: e.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#9E8047]/25 text-xs text-[#1C1D1F] font-mono focus:outline-none focus:border-[#4E5F52]"
                    />
                    <span className="text-[10px] text-[#737373] mt-1 block">
                      Receives automated orders &amp; customer inquiries (+91 format)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    className="py-2.5 px-5 rounded-xl bg-[#4E5F52] hover:bg-[#3D4D40] text-white text-xs font-medium uppercase tracking-wider inline-flex items-center gap-1.5 shadow-xs"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Marketing Integrations</span>
                  </Button>

                  {configSaved && (
                    <span className="text-xs text-[#4E5F52] font-semibold flex items-center gap-1">
                      <Check className="w-4 h-4" />
                      <span>Configurations Persisted!</span>
                    </span>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 7: STORE SETTINGS & LOGISTICS */}
        {activeTab === "settings" && (
          <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#9E8047]/25 shadow-xs space-y-6 max-w-3xl">
            <div>
              <h2 className="font-heading text-sm font-semibold text-[#1C1D1F]">
                Apothecary Dispatch &amp; Regulatory Parameters
              </h2>
              <p className="text-xs text-[#737373]">
                Manage shipping thresholds, COD controls, discreet packaging rules, and AYUSH lab compliance.
              </p>
            </div>

            <form onSubmit={handleSaveStoreSettings} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#1C1D1F] mb-1 font-mono">
                    Free Shipping Threshold (INR)
                  </label>
                  <input
                    type="number"
                    value={storeSettings.freeShippingThreshold}
                    onChange={(e) =>
                      setStoreSettings({
                        ...storeSettings,
                        freeShippingThreshold: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#9E8047]/25 text-xs text-[#1C1D1F] font-mono focus:outline-none focus:border-[#4E5F52]"
                  />
                  <span className="text-[10px] text-[#737373] mt-1 block">
                    Orders at or above this value receive complimentary express delivery
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#1C1D1F] mb-1 font-mono">
                    Free Ayurvedic Gift Threshold (INR)
                  </label>
                  <input
                    type="number"
                    value={storeSettings.freeGiftThreshold}
                    onChange={(e) =>
                      setStoreSettings({
                        ...storeSettings,
                        freeGiftThreshold: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#9E8047]/25 text-xs text-[#1C1D1F] font-mono focus:outline-none focus:border-[#4E5F52]"
                  />
                  <span className="text-[10px] text-[#737373] mt-1 block">
                    Adds complimentary Ayurvedic wellness sample kit above this cart total
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#1C1D1F] mb-1 font-mono">
                    Express Dispatch Delivery Promise
                  </label>
                  <input
                    type="text"
                    value={storeSettings.deliveryWindowDays}
                    onChange={(e) =>
                      setStoreSettings({
                        ...storeSettings,
                        deliveryWindowDays: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#9E8047]/25 text-xs text-[#1C1D1F] font-mono focus:outline-none focus:border-[#4E5F52]"
                  />
                  <span className="text-[10px] text-[#737373] mt-1 block">
                    Displayed across checkout and carrier tracking slips
                  </span>
                </div>

                <div className="flex flex-col justify-end">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF7F2] border border-[#9E8047]/25">
                    <div>
                      <span className="font-medium text-xs text-[#1C1D1F] block">
                        Cash on Delivery (COD)
                      </span>
                      <span className="text-[10px] text-[#737373]">
                        Enable doorstep payment collection
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={storeSettings.codEnabled}
                      onChange={(e) =>
                        setStoreSettings({
                          ...storeSettings,
                          codEnabled: e.target.checked,
                        })
                      }
                      className="w-4 h-4 rounded text-[#4E5F52] focus:ring-[#4E5F52] cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF7F2] border border-[#9E8047]/25">
                  <div>
                    <span className="font-medium text-xs text-[#1C1D1F] block">
                      Discreet Packaging Protocol
                    </span>
                    <span className="text-[10px] text-[#737373]">
                      Plain corrugated outer carton with 0 content labels
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={storeSettings.discreetPackaging}
                    onChange={(e) =>
                      setStoreSettings({
                        ...storeSettings,
                        discreetPackaging: e.target.checked,
                      })
                    }
                    className="w-4 h-4 rounded text-[#4E5F52] focus:ring-[#4E5F52] cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF7F2] border border-[#9E8047]/25">
                  <div>
                    <span className="font-medium text-xs text-[#1C1D1F] block">
                      AYUSH &amp; GMP Lab Certified
                    </span>
                    <span className="text-[10px] text-[#737373]">
                      Standardized HPLC extract testing certification
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={storeSettings.ayushCertified}
                    onChange={(e) =>
                      setStoreSettings({
                        ...storeSettings,
                        ayushCertified: e.target.checked,
                      })
                    }
                    className="w-4 h-4 rounded text-[#4E5F52] focus:ring-[#4E5F52] cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  className="py-2.5 px-5 rounded-xl bg-[#4E5F52] hover:bg-[#3D4D40] text-white text-xs font-medium uppercase tracking-wider inline-flex items-center gap-1.5 shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Persist Store Parameters</span>
                </Button>

                {settingsSaved && (
                  <span className="text-xs text-[#4E5F52] font-semibold flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    <span>Regulatory Parameters Persisted!</span>
                  </span>
                )}
              </div>
            </form>
          </div>
        )}
      </motion.main>

      {/* Order Detail Inspect Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FFFFFF] border border-[#9E8047]/25 rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#9E8047]/25">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#9E8047] block">
                  Order Inspection
                </span>
                <h3 className="font-mono text-base font-semibold text-[#1C1D1F]">
                  #{selectedOrder.orderNumber || selectedOrder.id}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-xs p-1.5 rounded-lg text-[#737373] hover:text-[#1C1D1F] hover:bg-[#FAF7F2] transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-[#FAF7F2] space-y-1">
                <span className="text-[10px] font-mono uppercase text-[#737373]">
                  Customer &amp; Shipping
                </span>
                <p className="font-medium text-[#1C1D1F]">
                  {selectedOrder.customerName ||
                    `${selectedOrder.shippingAddress?.firstName || ""} ${selectedOrder.shippingAddress?.lastName || ""}`}
                </p>
                <p className="text-[#737373]">
                  {selectedOrder.shippingAddress?.addressLine1},{" "}
                  {selectedOrder.shippingAddress?.city} (
                  {selectedOrder.shippingAddress?.state}) -{" "}
                  {selectedOrder.shippingAddress?.pincode}
                </p>
                <p className="font-mono text-[#1C1D1F]">
                  Phone:{" "}
                  {selectedOrder.shippingAddress?.phone ||
                    selectedOrder.customerPhone}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-[#737373] block mb-1">
                  Formulations
                </span>
                <div className="space-y-1">
                  {(selectedOrder.items || []).map((it: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center p-2 rounded-lg bg-[#FAF7F2]"
                    >
                      <span className="text-[#1D1E20]">
                        {it.name || it.productName} (x{it.quantity})
                      </span>
                      <span className="font-semibold text-[#1C1D1F]">
                        {formatINR(it.price * (it.quantity || 1))}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tracking AWB Number and Dispatch Control */}
              <div className="p-3 rounded-xl bg-[#FAF7F2] space-y-2 border border-[#9E8047]/20">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-[#737373] flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-[#4E5F52]" />
                    Carrier Tracking (AWB)
                  </span>
                  <span className="text-[10px] font-mono text-[#4E5F52]">
                    {selectedOrder.trackingNumber || selectedOrder.awbNumber || "Not Assigned"}
                  </span>
                </div>
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    placeholder="Enter BlueDart / Delhivery AWB..."
                    defaultValue={selectedOrder.trackingNumber || selectedOrder.awbNumber || ""}
                    id="modal-awb-input"
                    className="flex-1 px-2.5 py-1.5 rounded-lg bg-white border border-[#9E8047]/25 text-xs text-[#1C1D1F] font-mono focus:outline-none focus:border-[#4E5F52]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById("modal-awb-input") as HTMLInputElement;
                      if (el && el.value.trim()) {
                        handleUpdateTracking(selectedOrder.id || selectedOrder.orderNumber, el.value.trim());
                      }
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#4E5F52] hover:bg-[#3D4D40] text-white text-xs font-medium"
                  >
                    Assign &amp; Ship
                  </button>
                </div>
                {(selectedOrder.trackingNumber || selectedOrder.awbNumber) && (
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-[10px] text-[#737373] font-mono">Live Carrier Track:</span>
                    <a
                      href={`https://www.delhivery.com/track/package/${selectedOrder.trackingNumber || selectedOrder.awbNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-0.5 rounded bg-white border border-[#9E8047]/25 text-[10px] text-[#1C1D1F] font-mono hover:border-[#4E5F52] inline-flex items-center gap-1"
                    >
                      <ExternalLink className="w-2.5 h-2.5 text-[#4E5F52]" />
                      Delhivery
                    </a>
                    <a
                      href="https://www.bluedart.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-0.5 rounded bg-white border border-[#9E8047]/25 text-[10px] text-[#1C1D1F] font-mono hover:border-[#4E5F52] inline-flex items-center gap-1"
                    >
                      <ExternalLink className="w-2.5 h-2.5 text-[#4E5F52]" />
                      BlueDart
                    </a>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-[#9E8047]/25 font-semibold text-sm">
                <span>Grand Total:</span>
                <span>{formatINR(selectedOrder.total)}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={() => setInvoiceOrder(selectedOrder)}
                className="py-2 px-3 rounded-xl bg-[#D4AF37] hover:bg-[#c4a66b] text-[#071A12] text-xs font-semibold uppercase tracking-wider text-center transition-colors inline-flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print GST Invoice &amp; Slip</span>
              </button>

              <a
                href={buildWhatsAppUrl(
                  `Namaste ${selectedOrder.shippingAddress?.firstName || "Patron"}! Updating you regarding Order #${
                    selectedOrder.orderNumber || selectedOrder.id
                  } from Ayur Veda Global. Your parcel is currently ${selectedOrder.status}. ${
                    selectedOrder.trackingNumber ? `Tracking AWB: ${selectedOrder.trackingNumber}` : ""
                  } Pranam! 🌿`,
                  selectedOrder.shippingAddress?.phone ||
                    selectedOrder.customerPhone,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-3 rounded-xl bg-[#4E5F52] hover:bg-[#3D4D40] text-white text-xs font-medium uppercase tracking-wider text-center transition-colors inline-flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>Notify WhatsApp</span>
              </a>

              <button
                onClick={() => setSelectedOrder(null)}
                className="py-2 px-4 rounded-xl border border-[#9E8047]/25 text-xs font-medium text-[#1C1D1F] hover:bg-[#FAF7F2] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Patron Concierge WhatsApp Drawer / Modal */}
      {contactModalPatron && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FFFFFF] border border-[#9E8047]/25 rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#9E8047]/25">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#9E8047] block">
                  Patron Concierge Dispatch
                </span>
                <h3 className="font-heading text-base font-semibold text-[#1C1D1F]">
                  {contactModalPatron.name}
                </h3>
                <span className="font-mono text-[11px] text-[#737373]">
                  {contactModalPatron.phone || "No phone registered"} • Tier: {contactModalPatron.statusTier} • LTV: {formatINR(contactModalPatron.totalLtv)}
                </span>
              </div>
              <button
                onClick={() => setContactModalPatron(null)}
                className="text-xs p-1.5 rounded-lg text-[#737373] hover:text-[#1C1D1F] hover:bg-[#FAF7F2] transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#737373]">
                Select Ayurvedic Concierge Template:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "dispatch", label: "Dispatch & AWB Alert" },
                  { id: "vaidya", label: "Vaidya Dosage Guide" },
                  { id: "vip", label: "VIP 15% Courtesy" },
                  { id: "inquiry", label: "Consultation Follow-up" },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      const templateKey = t.id as any;
                      setContactMessageTemplate(templateKey);
                      setCustomContactMessage(
                        getWhatsAppTemplateText(templateKey, contactModalPatron),
                      );
                    }}
                    className={`p-2 rounded-xl text-left border transition-all ${
                      contactMessageTemplate === t.id
                        ? "border-[#4E5F52] bg-[#EFF4F0] text-[#4E5F52] font-semibold"
                        : "border-[#9E8047]/25 bg-[#FAF7F2] text-[#737373] hover:text-[#1C1D1F]"
                    }`}
                  >
                    <span className="text-[11px] block">{t.label}</span>
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#737373] mb-1">
                  Message Preview / Direct Customization:
                </label>
                <textarea
                  rows={5}
                  value={customContactMessage}
                  onChange={(e) => setCustomContactMessage(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#FAF7F2] border border-[#9E8047]/25 text-xs text-[#1C1D1F] focus:outline-none focus:border-[#4E5F52] font-sans leading-relaxed"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                onClick={() => setContactModalPatron(null)}
                className="py-2 px-3 rounded-xl border border-[#9E8047]/25 text-xs font-medium text-[#1C1D1F] hover:bg-[#FAF7F2] transition-colors"
              >
                Cancel
              </button>
              {contactModalPatron.phone ? (
                <a
                  href={buildWhatsAppUrl(
                    customContactMessage,
                    contactModalPatron.phone,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setContactModalPatron(null)}
                  className="py-2 px-4 rounded-xl bg-[#4E5F52] hover:bg-[#3D4D40] text-white text-xs font-medium inline-flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send on WhatsApp</span>
                </a>
              ) : (
                <span className="text-xs text-rose-600 font-mono">
                  No phone available
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Official Tax Invoice & Packing Slip Modal */}
      {invoiceOrder && (
        <OrderInvoiceModal
          order={invoiceOrder}
          onClose={() => setInvoiceOrder(null)}
        />
      )}

      {/* Floating System Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-[#071A12] text-white border border-[#D4AF37]/40 shadow-2xl text-xs font-medium animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0" />
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}
