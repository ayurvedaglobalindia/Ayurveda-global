import { OrderRepository, LeadRepository } from "@/lib/db";

export async function placeOrderServer(order: any) {
  try {
    // 1. Persist in SQL Database / Backend if running in Node or Server context
    if (typeof window === "undefined") {
      try {
        OrderRepository.create(order);
      } catch (err) {
        console.error("SQL persistence error in placeOrderServer:", err);
      }
    }

    // 2. Client-side local cache fallback
    if (typeof window !== "undefined") {
      const stored = JSON.parse(localStorage.getItem("ayur_orders") || "[]");
      const exists = stored.some(
        (o: any) => o.id === order.id || o.orderNumber === order.orderNumber,
      );
      if (!exists) {
        stored.unshift(order);
        localStorage.setItem(
          "ayur_orders",
          JSON.stringify(stored.slice(0, 100)),
        );
      }
    }
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to save order" };
  }
}

export async function getOrdersServer() {
  try {
    if (typeof window === "undefined") {
      try {
        return OrderRepository.getAll(100);
      } catch (e) {}
    }
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("ayur_orders") || "[]");
    }
    return [];
  } catch (error) {
    return [];
  }
}

export async function updateOrderStatusServer(orderId: string, status: string) {
  try {
    if (typeof window === "undefined") {
      try {
        OrderRepository.updateStatus(orderId, status);
      } catch (e) {}
    }
    if (typeof window !== "undefined") {
      const stored = JSON.parse(localStorage.getItem("ayur_orders") || "[]");
      const updated = stored.map((o: any) =>
        o.id === orderId || o.orderNumber === orderId
          ? { ...o, status, orderStatus: status }
          : o,
      );
      localStorage.setItem("ayur_orders", JSON.stringify(updated));
    }
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function saveLeadServer(lead: any) {
  try {
    if (typeof window === "undefined") {
      try {
        LeadRepository.create(lead);
      } catch (e) {}
    }
    if (typeof window !== "undefined") {
      const stored = JSON.parse(
        localStorage.getItem("ayur_whatsapp_leads") || "[]",
      );
      stored.unshift({
        ...lead,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem(
        "ayur_whatsapp_leads",
        JSON.stringify(stored.slice(0, 100)),
      );
    }
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function getLeadsServer() {
  try {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("ayur_whatsapp_leads") || "[]");
    }
    return [];
  } catch (error) {
    return [];
  }
}
