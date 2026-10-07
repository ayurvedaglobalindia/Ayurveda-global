"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
  ArrowLeft,
  Package,
} from "lucide-react";
import { formatDate, formatINR as formatPrice } from "@/lib/utils/formatters";
import { useUserStore } from "@/store/userStore";

const mockOrders = [
  {
    id: "ORD-20241215-ABC1",
    orderNumber: "ORD-20241215-ABC1",
    createdAt: "2024-12-15T10:30:00Z",
    total: 149900,
    status: "delivered" as const,
    paymentMethod: "whatsapp" as const,
    items: [
      {
        name: "BODY Essential Nutrition",
        quantity: 1,
        price: 149900,
        image: "/images/products/body-essential-nutrition-thumb.jpg",
      },
    ],
  },
  {
    id: "ORD-20241210-XYZ2",
    orderNumber: "ORD-20241210-XYZ2",
    createdAt: "2024-12-10T14:20:00Z",
    total: 89900,
    status: "shipped" as const,
    paymentMethod: "cod" as const,
    items: [
      {
        name: "STAYMAX+ Delay Spray",
        quantity: 1,
        price: 89900,
        image: "/images/products/staymax-delay-spray-thumb.jpg",
      },
    ],
  },
  {
    id: "ORD-20241205-DEF3",
    orderNumber: "ORD-20241205-DEF3",
    createdAt: "2024-12-05T09:15:00Z",
    total: 239800,
    status: "processing" as const,
    paymentMethod: "whatsapp" as const,
    items: [
      {
        name: "BODY Essential Nutrition",
        quantity: 2,
        price: 149900,
        image: "/images/products/body-essential-nutrition-thumb.jpg",
      },
    ],
  },
];

const statusConfig: Record<
  string,
  { label: string; icon: any; color: string }
> = {
  confirmed: {
    label: "Confirmed",
    icon: CheckCircle2,
    color: "bg-[#EFF4F0] text-[#4E5F52] border border-[#4E5F52]/30",
  },
  processing: {
    label: "Processing",
    icon: Clock,
    color: "bg-[#FAF7F2] text-[#9E8047] border border-[#9E8047]/30",
  },
  shipped: {
    label: "Dispatched",
    icon: Truck,
    color: "bg-[#FAF7F2] text-[#1C1D1F] border border-[#9E8047]/25",
  },
  delivered: {
    label: "Delivered",
    icon: CheckCircle2,
    color: "bg-[#EFF4F0] text-[#4E5F52] border border-[#4E5F52]/30",
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    color: "bg-rose-50 text-rose-700 border border-rose-200",
  },
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let stored: any[] = [...(useUserStore.getState().recentOrders || [])];
    try {
      if (typeof window !== "undefined") {
        const local = JSON.parse(localStorage.getItem("ayur_orders") || "[]");
        stored = [...stored, ...local];
      }
    } catch {}

    const uniqueStored = stored.filter(
      (v, i, a) =>
        a.findIndex((t) => t.id === v.id || t.orderNumber === v.orderNumber) ===
        i,
    );

    const combined = [
      ...uniqueStored,
      ...mockOrders.filter(
        (mo) =>
          !uniqueStored.some(
            (so) => so.id === mo.id || so.orderNumber === mo.orderNumber,
          ),
      ),
    ];

    setOrders(combined);
    setIsLoaded(true);
  }, []);

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-[#1C1D1F]">
      <div className="container py-6 sm:py-8 lg:py-10">
        <div className="mb-6 pb-4 border-b border-[#9E8047]/25">
          <Link
            href="/account"
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#737373] hover:text-[#1C1D1F] transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Account</span>
          </Link>
          <h1 className="font-heading text-2xl sm:text-3xl font-normal text-[#1C1D1F]">
            Order History
          </h1>
          <p className="text-xs text-[#555555] mt-1 font-sans">
            Track shipments and view formulation orders
          </p>
        </div>

        {!isLoaded ? (
          <div className="py-12 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-[#1C1D1F] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12 bg-[#FFFFFF] border border-[#9E8047]/25 rounded-xl p-8 max-w-md mx-auto">
            <Package className="w-10 h-10 text-[#9E8047] mx-auto mb-3" />
            <h3 className="font-heading text-base font-medium text-[#1C1D1F]">
              No Orders Yet
            </h3>
            <p className="text-xs text-[#737373] mt-1 mb-5">
              You haven&apos;t placed any formulation orders yet.
            </p>
            <Link
              href="/shop"
              className="inline-block px-5 py-2.5 rounded-full bg-[#1C1D1F] text-[#FAF7F2] text-xs font-medium hover:bg-[#333333] transition-colors"
            >
              Explore Formulations
            </Link>
          </div>
        ) : (
          <div className="space-y-3.5 max-w-4xl">
            {orders.map((order) => {
              const config =
                statusConfig[order.status] || statusConfig.processing;
              const StatusIcon = config.icon;
              const firstItem = order.items?.[0];
              const itemImage =
                firstItem?.image ||
                "/images/products/body-essential-nutrition-thumb.jpg";
              const itemName =
                firstItem?.name ||
                firstItem?.productName ||
                "Ayurvedic Formulation";
              const totalItems = order.items?.length || 1;

              return (
                <Link
                  key={order.id}
                  href={`/orders/${order.id}`}
                  className="block"
                >
                  <div className="bg-[#FFFFFF] border border-[#9E8047]/25 rounded-xl p-4 sm:p-5 hover:border-[#1C1D1F] transition-colors shadow-xs">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-lg bg-[#FAF7F2] border border-[#9E8047]/25 flex items-center justify-center flex-shrink-0 overflow-hidden relative">
                          <Image
                            src={itemImage}
                            alt={itemName}
                            width={56}
                            height={56}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-heading text-sm font-medium text-[#1C1D1F]">
                            {itemName}
                          </h3>
                          <p className="text-[11px] font-mono text-[#737373] mt-0.5">
                            Order #{order.orderNumber || order.id}
                          </p>
                          {totalItems > 1 && (
                            <p className="text-[11px] text-[#737373]">
                              + {totalItems - 1} more item
                              {totalItems - 1 !== 1 ? "s" : ""}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 justify-between md:justify-end">
                        <div className="text-left md:text-right">
                          <p className="font-medium text-[#1C1D1F] text-xs sm:text-sm">
                            {formatPrice(order.total)}
                          </p>
                          <p className="text-[11px] text-[#737373]">
                            {formatDate(order.createdAt)}
                          </p>
                        </div>
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono ${config.color}`}
                        >
                          <StatusIcon className="w-3.5 h-3.5" />
                          <span>{config.label}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
