
"use server";

import { cookies } from "next/headers";

const ADMIN_SECRET = process.env.ADMIN_SECRET || "fallback_secret_key_123";

async function signToken(payload: string) {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(ADMIN_SECRET);
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", cryptoKey, encoder.encode(payload));
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function setAdminSession() {
  const expires = Date.now() + 2 * 60 * 60 * 1000;
  const token = await signToken(`admin:${expires}`);
  (await cookies()).set("ayur_admin_session", `${expires}.${token}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
  return { success: true };
}

export async function clearAdminSession() {
  (await cookies()).delete("ayur_admin_session");
  return { success: true };
}

export async function verifyAdminSession() {
  const sessionCookie = (await cookies()).get("ayur_admin_session");
  if (!sessionCookie) return false;
  
  const [expiresStr, token] = sessionCookie.value.split(".");
  if (!expiresStr || !token) return false;
  
  const expires = parseInt(expiresStr, 10);
  if (Date.now() > expires) return false;
  
  const expectedToken = await signToken(`admin:${expires}`);
  return token === expectedToken; // basic comparison is fine for Edge
}
