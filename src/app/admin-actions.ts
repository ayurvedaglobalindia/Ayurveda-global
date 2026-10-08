/**
 * Static & Edge-safe Admin Session Helper
 * Compatible with Next.js static exports (no server cookies dependency).
 */

export async function setAdminSession() {
  return { success: true };
}

export async function clearAdminSession() {
  return { success: true };
}

export async function verifyAdminSession() {
  if (typeof window === "undefined") return true; // SSR static build phase
  try {
    const raw = sessionStorage.getItem("ayur_admin_session");
    if (!raw) return false;
    const session = JSON.parse(raw);
    return Boolean(session && session.authenticated && Date.now() <= session.expiresAt);
  } catch {
    return false;
  }
}
