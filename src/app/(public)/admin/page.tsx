"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getOrdersServer, updateOrderStatusServer } from "@/app/actions";
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

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [pin, setPin] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<
    "analytics" | "orders" | "products" | "coupons" | "marketing" | "settings"
  >("analytics");
  const [dateRange, setDateRange] = useState<DateRange>("all");

  // Dashboard Data
  const [orders, setOrders] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  // Marketing Settings State
  const [marketingConfig, setMarketingConfig] = useState({
    ga4Id: "",
    gscTag: "",
    metaPixelId: "",
    whatsappNumber: "919123485451",
  });
  const [configSaved, setConfigSaved] = useState(false);

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
  ]);
  const [newCouponCode, setNewCouponCode] = useState("");
  const [newCouponDiscount, setNewCouponDiscount] = useState("10");

  useEffect(() => {
    setIsMounted(true);
    const authed = isAdminAuthenticated();
    setIsAuthenticated(authed);
    if (authed) {
      loadDashboardData("all");
    }

    // Load saved marketing config
    try {
      const saved = localStorage.getItem("ayur_marketing_config");
      if (saved) {
        setMarketingConfig(JSON.parse(saved));
      }
    } catch {}
  }, []);

  const loadDashboardData = (range: DateRange = dateRange) => {
    // 2. Load analytics for selected range
    setAnalytics(getAnalyticsSummary(range));

    // 1. Gather all real client orders
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
    } else {
      setAuthError(res.message);
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    setIsAuthenticated(false);
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
  };

  const handleSaveMarketing = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(
      "ayur_marketing_config",
      JSON.stringify(marketingConfig),
    );
    setConfigSaved(true);
    setTimeout(() => setConfigSaved(false), 2500);
  };

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;
    const code = newCouponCode.trim().toUpperCase();
    if (coupons.some((c) => c.code === code)) return;
    setCoupons((prev) => [
      ...prev,
      {
        code,
        discount: Number(newCouponDiscount) || 10,
        type: "percent",
        minOrder: 0,
        active: true,
      },
    ]);
    setNewCouponCode("");
  };

  const handleToggleCoupon = (code: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.code === code ? { ...c, active: !c.active } : c)),
    );
  };

  if (!isMounted) {
    return (
      <div className="bg-[#FAF7F2] min-h-screen container py-16 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#1C1D1F] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // 1. Login View
  if (!isAuthenticated) {
    const lockout = isLockedOut();
    return (
      <div className="bg-[#FAF7F2] min-h-screen text-[#1C1D1F] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-[#FFFFFF] border border-[#9E8047]/25 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="text-center mb-6">
            <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-[#EFF4F0] border border-[#4E5F52]/30 flex items-center justify-center text-[#4E5F52]">
              <Shield className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-semibold text-[#4E5F52] uppercase tracking-wider block font-mono">
              Ayurveda Global Concierge
            </span>
            <h1 className="font-heading text-xl sm:text-2xl font-normal text-[#1C1D1F] mt-1">
              Admin Operations Terminal
            </h1>
            <p className="text-xs text-[#737373] mt-1 font-sans">
              Secure centralized console for real-time analytics, marketing,
              orders &amp; stock.
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
                  placeholder="Enter administrator passkey"
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

          <div className="mt-6 pt-4 border-t border-[#9E8047]/30/25 text-center">
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

  // 2. Authenticated Dashboard Calculations
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const deliveredOrders = orders.filter((o) => o.status === "delivered");
  const pendingOrders = orders.filter(
    (o) => o.status === "processing" || o.status === "confirmed",
  );
  const products = getAllProducts();

  // Filtered orders for table
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      searchQuery.trim() === "" ||
      order.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.orderNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerPhone?.includes(searchQuery);
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
                <span className="text-[9px] uppercase px-2 py-0.5 rounded-full bg-[#EFF4F0] text-[#4E5F52] font-mono font-medium border border-[#4E5F52]/30">
                  Control Panel
                </span>
              </div>
              <p className="text-[10px] text-[#737373] hidden sm:block">
                Centralized Operations, Live Marketing Analytics &amp; Order
                Logistics
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
              <span>Reset Data (Zero Start)</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="text-xs text-[#737373] hover:text-[#1C1D1F] px-3 py-1.5 rounded-lg border border-[#9E8047]/25 bg-[#FAF7F2] inline-flex items-center gap-1.5 transition-colors"
            >
              <span>View Live Storefront</span>
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
              label: `Product Performance (${products.length})`,
              icon: Layers,
            },
            {
              id: "coupons",
              label: `Coupons & Offers (${coupons.length})`,
              icon: Gift,
            },
            { id: "marketing", label: "Marketing & Integrations", icon: Globe },
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
                  {deliveredOrders.length} Delivered • {pendingOrders.length}{" "}
                  Active
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#9E8047]/25 shadow-xs space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#737373] block">
                  Conversion Rate
                </span>
                <p className="text-xl sm:text-2xl font-semibold text-[#4E5F52]">
                  {analytics?.funnel.conversionRate || 0}%
                </p>
                <span className="text-[10px] text-[#737373]">
                  {analytics?.funnel.ordersCompleted || orders.length} orders
                  from {analytics?.funnel.productViews || 0} views
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#9E8047]/25 shadow-xs space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#737373] block">
                  WhatsApp Leads
                </span>
                <p className="text-xl sm:text-2xl font-semibold text-[#1C1D1F]">
                  {analytics?.whatsappClicks || 0}
                </p>
                <span className="text-[10px] text-[#4E5F52] font-medium">
                  Direct Concierge Enquiries
                </span>
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
              <div className="flex items-center justify-between pb-3 border-b border-[#9E8047]/30/25">
                <div>
                  <h2 className="font-heading text-sm font-semibold text-[#1C1D1F]">
                    Commerce Conversion Funnel
                  </h2>
                  <p className="text-xs text-[#737373]">
                    Visit → Product View → WhatsApp / Cart → Checkout →
                    Completed Order
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
                    step: "4. Checkout Started",
                    val: analytics?.funnel.checkoutStarts || 0,
                    desc: "Address & payment step",
                    bg: "bg-[#FAF7F2]",
                  },
                  {
                    step: "5. Orders Placed",
                    val: analytics?.funnel.ordersCompleted || orders.length,
                    desc: "Confirmed & dispatched",
                    bg: "bg-[#EFF4F0] border-2 border-[#4E5F52]/40",
                  },
                ].map((s, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border border-[#9E8047]/25 ${s.bg} space-y-1`}
                  >
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#737373] block">
                      {s.step}
                    </span>
                    <p className="text-lg font-semibold text-[#1C1D1F]">
                      {s.val}
                    </p>
                    <p className="text-[10px] text-[#737373]">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Traffic Sources & Device Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Traffic Sources */}
              <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#9E8047]/25 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2.5 border-b border-[#9E8047]/30/25">
                  <h3 className="font-heading text-xs uppercase tracking-wider font-semibold text-[#1C1D1F]">
                    Traffic Acquisition Sources
                  </h3>
                  <span className="text-[10px] text-[#737373] font-mono">
                    UTM / Referrers
                  </span>
                </div>

                <div className="space-y-2">
                  {(analytics?.trafficSources || []).length > 0 ? (
                    analytics!.trafficSources.map((s, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-[#FAF7F2] text-xs"
                      >
                        <span className="font-medium text-[#1C1D1F]">
                          {s.source}
                        </span>
                        <span className="font-mono text-[#737373]">
                          {s.count} hits
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-xs text-[#737373]">
                      Direct &amp; Organic Traffic recorded
                    </div>
                  )}
                </div>
              </div>

              {/* Devices & Regional Data */}
              <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#9E8047]/25 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2.5 border-b border-[#9E8047]/30/25">
                  <h3 className="font-heading text-xs uppercase tracking-wider font-semibold text-[#1C1D1F]">
                    Device &amp; Regional Geography
                  </h3>
                  <span className="text-[10px] text-[#737373] font-mono">
                    Mobile First
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="p-3 rounded-xl bg-[#FAF7F2] text-center space-y-1">
                    <Smartphone className="w-4 h-4 text-[#4E5F52] mx-auto" />
                    <span className="text-[10px] text-[#737373] block">
                      Mobile
                    </span>
                    <strong className="text-xs text-[#1C1D1F]">
                      {analytics?.deviceBreakdown.mobile || 0}
                    </strong>
                  </div>

                  <div className="p-3 rounded-xl bg-[#FAF7F2] text-center space-y-1">
                    <Tablet className="w-4 h-4 text-[#4E5F52] mx-auto" />
                    <span className="text-[10px] text-[#737373] block">
                      Tablet
                    </span>
                    <strong className="text-xs text-[#1C1D1F]">
                      {analytics?.deviceBreakdown.tablet || 0}
                    </strong>
                  </div>

                  <div className="p-3 rounded-xl bg-[#FAF7F2] text-center space-y-1">
                    <Monitor className="w-4 h-4 text-[#4E5F52] mx-auto" />
                    <span className="text-[10px] text-[#737373] block">
                      Desktop
                    </span>
                    <strong className="text-xs text-[#1C1D1F]">
                      {analytics?.deviceBreakdown.desktop || 0}
                    </strong>
                  </div>
                </div>

                {/* Regional Deliveries */}
                <div className="pt-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#737373] block mb-1.5">
                    Top Delivery Regions:
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
                        Delhi NCR, Karnataka, Maharashtra, Gujarat, Rajasthan
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS LEDGER */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            {/* Search, Filter & Export */}
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
                  <span>CSV</span>
                </button>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-[#FFFFFF] border border-[#9E8047]/25 rounded-2xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF7F2] border-b border-[#9E8047]/25 text-[#737373] uppercase font-mono text-[10px]">
                    <tr>
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

                        return (
                          <tr
                            key={order.id}
                            className="hover:bg-[#FAF7F2]/50 transition-colors"
                          >
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
                                : "WhatsApp"}
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
                              <button
                                onClick={() => setSelectedOrder(order)}
                                className="px-2.5 py-1 rounded-lg border border-[#9E8047]/25 hover:border-[#1C1D1F] text-[11px] text-[#1C1D1F] transition-colors"
                              >
                                Inspect
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td
                          colSpan={7}
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

        {/* TAB 3: PRODUCT PERFORMANCE & INVENTORY */}
        {activeTab === "products" && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#9E8047]/25 shadow-xs flex items-center justify-between">
              <div>
                <h2 className="font-heading text-sm font-semibold text-[#1C1D1F]">
                  Formulation Performance Ledger
                </h2>
                <p className="text-xs text-[#737373]">
                  Real catalog views, cart conversions, unit sales &amp; revenue
                  per SKU
                </p>
              </div>
              <span className="text-xs font-mono text-[#4E5F52] bg-[#EFF4F0] px-2.5 py-1 rounded-full border border-[#4E5F52]/30">
                {products.length} Formulations Active
              </span>
            </div>

            <div className="bg-[#FFFFFF] border border-[#9E8047]/25 rounded-2xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF7F2] border-b border-[#9E8047]/25 text-[#737373] uppercase font-mono text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Formulation</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Price</th>
                      <th className="py-3 px-4">Page Views</th>
                      <th className="py-3 px-4">Cart Adds</th>
                      <th className="py-3 px-4">Units Sold</th>
                      <th className="py-3 px-4">Gross Revenue</th>
                      <th className="py-3 px-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#999999]/20">
                    {products.map((p) => {
                      const img = getProductImage(p, p.id, "thumb");
                      const perf = analytics?.productPerformance.find(
                        (perf) => perf.id === p.id || perf.id === p.slug,
                      );
                      const views = perf?.views || 0;
                      const cartAdds = perf?.addToCart || 0;
                      const unitsSold = perf?.orders || 0;
                      const rev = perf?.revenue || unitsSold * p.price;

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
                          <td className="py-3 px-4 font-mono">{cartAdds}</td>
                          <td className="py-3 px-4 font-mono font-medium text-[#4E5F52]">
                            {unitsSold}
                          </td>
                          <td className="py-3 px-4 font-mono font-semibold text-[#1C1D1F]">
                            {formatINR(rev)}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-[#EFF4F0] text-[#4E5F52] border border-[#4E5F52]/30">
                              Active
                            </span>
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

        {/* TAB 4: COUPONS & OFFERS */}
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
                  placeholder="Coupon Code (e.g. VIP20)"
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

        {/* TAB 5: MARKETING & INTEGRATIONS ARCHITECTURE */}
        {activeTab === "marketing" && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#9E8047]/25 shadow-xs space-y-4">
              <div>
                <h2 className="font-heading text-sm font-semibold text-[#1C1D1F]">
                  External Marketing &amp; Ad Pixel Architecture
                </h2>
                <p className="text-xs text-[#737373]">
                  Configure your Google, Meta and WhatsApp tracking IDs. No code
                  changes required.
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
                      Connects to your Google Analytics dashboard
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
                      Receives automated orders &amp; customer inquiries (+91
                      format)
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
                      <span>Configurations Persisted Successfully!</span>
                    </span>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 6: STORE SETTINGS */}
        {activeTab === "settings" && (
          <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#9E8047]/25 shadow-xs space-y-4 max-w-2xl">
            <h2 className="font-heading text-sm font-semibold text-[#1C1D1F]">
              Apothecary Dispatch &amp; Regulatory Parameters
            </h2>

            <div className="space-y-3 pt-2 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF7F2] border border-[#9E8047]/25">
                <div>
                  <span className="font-medium text-[#1C1D1F] block">
                    Free Shipping Threshold
                  </span>
                  <span className="text-[11px] text-[#737373]">
                    Complimentary express delivery across India
                  </span>
                </div>
                <span className="font-mono font-semibold text-[#4E5F52]">
                  ₹999
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF7F2] border border-[#9E8047]/25">
                <div>
                  <span className="font-medium text-[#1C1D1F] block">
                    Cash on Delivery (COD)
                  </span>
                  <span className="text-[11px] text-[#737373]">
                    Doorstep payment via Cash / QR code
                  </span>
                </div>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-[#EFF4F0] text-[#4E5F52] border border-[#4E5F52]/30">
                  Enabled
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF7F2] border border-[#9E8047]/25">
                <div>
                  <span className="font-medium text-[#1C1D1F] block">
                    Discreet Packaging Standard
                  </span>
                  <span className="text-[11px] text-[#737373]">
                    Plain brown corrugated carton, 0 external labels
                  </span>
                </div>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-[#EFF4F0] text-[#4E5F52] border border-[#4E5F52]/30">
                  100% Strict
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF7F2] border border-[#9E8047]/25">
                <div>
                  <span className="font-medium text-[#1C1D1F] block">
                    AYUSH &amp; GMP Lab Standard
                  </span>
                  <span className="text-[11px] text-[#737373]">
                    Standardized HPLC extract testing certification
                  </span>
                </div>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-[#EFF4F0] text-[#4E5F52] border border-[#4E5F52]/30">
                  Certified
                </span>
              </div>
            </div>
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
                      <span className="text-[#1C1D1F]">
                        {it.name || it.productName} (x{it.quantity})
                      </span>
                      <span className="font-semibold text-[#1C1D1F]">
                        {formatINR(it.price * (it.quantity || 1))}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-[#9E8047]/25 font-semibold text-sm">
                <span>Grand Total:</span>
                <span>{formatINR(selectedOrder.total)}</span>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <a
                href={buildWhatsAppUrl(
                  `Namaste ${selectedOrder.shippingAddress?.firstName || "Patron"}! Updating you regarding Order #${
                    selectedOrder.orderNumber || selectedOrder.id
                  } from Ayur Veda Global. Your parcel is currently ${selectedOrder.status}. Pranam! 🌿`,
                  selectedOrder.shippingAddress?.phone ||
                    selectedOrder.customerPhone,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-3 rounded-xl bg-[#4E5F52] hover:bg-[#3D4D40] text-white text-xs font-medium uppercase tracking-wider text-center transition-colors inline-flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>Notify Customer on WhatsApp</span>
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
    </div>
  );
}
