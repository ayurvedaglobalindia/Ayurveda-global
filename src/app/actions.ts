"use server";

import { db } from "@/lib/db";
import { verifyAdminSession } from "./admin-actions";

export async function placeOrderServer(order: any) {
  try {
    db.prepare("INSERT INTO orders").run(order);
    return { success: true };
  } catch (error: any) {
    console.error("Failed to place order:", error);
    return { success: false, error: error.message };
  }
}

export async function getOrdersServer() {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) throw new Error("Unauthorized");
  
  try {
    return db.prepare("SELECT * FROM orders").all();
  } catch (error) {
    return [];
  }
}

export async function updateOrderStatusServer(orderId: string, status: string) {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) throw new Error("Unauthorized");

  try {
    db.prepare("UPDATE orders SET order_status = ? WHERE id = ?").run(
      status,
      orderId,
    );
    db.prepare("INSERT INTO order_status_history").run(
      orderId,
      status,
      "Status updated by admin",
    );
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function saveLeadServer(lead: any) {
  try {
    db.prepare("INSERT INTO whatsapp_leads").run(lead);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function getLeadsServer() {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) throw new Error("Unauthorized");

  try {
    return db.prepare("SELECT * FROM whatsapp_leads").all();
  } catch (error) {
    return [];
  }
}
