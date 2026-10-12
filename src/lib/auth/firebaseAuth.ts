"use client";

// Dynamic safe references to avoid module factory crashes during Next.js SSR / App Router bundle evaluation
let firebaseAppInstance: any = null;
let firebaseAuthInstance: any = null;

/**
 * Firebase Client Configuration for Ayurveda Global
 * Values can be configured via environment variables or Firebase console project settings.
 */
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "ayurveda-global.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "ayurveda-global",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "ayurveda-global.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
};

export function isFirebaseConfigured(): boolean {
  return Boolean(
    typeof window !== "undefined" &&
    firebaseConfig.apiKey &&
    firebaseConfig.apiKey.length > 5 &&
    firebaseConfig.projectId
  );
}

export async function getFirebaseApp(): Promise<any | null> {
  if (typeof window === "undefined") return null;
  if (!isFirebaseConfigured()) return null;

  if (firebaseAppInstance) return firebaseAppInstance;

  try {
    const { getApps, getApp, initializeApp } = await import("firebase/app");
    if (getApps().length > 0) {
      firebaseAppInstance = getApp();
    } else {
      firebaseAppInstance = initializeApp(firebaseConfig);
    }
    return firebaseAppInstance;
  } catch (error) {
    console.warn("Firebase app initialization skipped or failed:", error);
    return null;
  }
}

export async function getFirebaseAuth(): Promise<any | null> {
  if (typeof window === "undefined") return null;
  if (firebaseAuthInstance) return firebaseAuthInstance;

  const app = await getFirebaseApp();
  if (!app) return null;

  try {
    const { getAuth } = await import("firebase/auth");
    firebaseAuthInstance = getAuth(app);
    return firebaseAuthInstance;
  } catch (error) {
    console.warn("Firebase auth initialization skipped or failed:", error);
    return null;
  }
}

// Global declaration to prevent RecaptchaVerifier memory leaks
declare global {
  interface Window {
    recaptchaVerifier?: any;
    confirmationResult?: any;
  }
}

/**
 * Initializes invisible reCAPTCHA for seamless Indian mobile phone verification
 */
export async function setupRecaptcha(containerId: string = "recaptcha-container"): Promise<any | null> {
  if (typeof window === "undefined") return null;
  const auth = await getFirebaseAuth();
  if (!auth) return null;

  try {
    const { RecaptchaVerifier } = await import("firebase/auth");
    let el = document.getElementById(containerId);
    if (!el) {
      el = document.createElement("div");
      el.id = containerId;
      document.body.appendChild(el);
    }

    if (window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier.clear();
      } catch {}
    }

    const verifier = new RecaptchaVerifier(auth, el, {
      size: "invisible",
      callback: () => {
        // reCAPTCHA solved - will allow signInWithPhoneNumber
      },
      "expired-callback": () => {
        // Response expired, user needs to re-verify
      },
    });

    window.recaptchaVerifier = verifier;
    return verifier;
  } catch (error) {
    console.error("Firebase RecaptchaVerifier initialization error:", error);
    return null;
  }
}

/**
 * Dispatches real SMS OTP via Firebase Authentication
 */
export async function sendFirebasePhoneOtp(
  phone10Digit: string,
  containerId: string = "recaptcha-container",
): Promise<{ success: boolean; message: string; confirmationResult?: any }> {
  if (typeof window === "undefined") {
    return { success: false, message: "Client execution required" };
  }

  const auth = await getFirebaseAuth();
  if (!auth) {
    return {
      success: false,
      message: "FIREBASE_CONFIG_MISSING",
    };
  }

  try {
    const verifier = await setupRecaptcha(containerId);
    if (!verifier) {
      return { success: false, message: "Could not initialize security verification." };
    }

    const { signInWithPhoneNumber } = await import("firebase/auth");

    // Format phone with +91 country code
    const formattedPhone = `+91${phone10Digit.replace(/\D/g, "").slice(-10)}`;
    const confirmation = await signInWithPhoneNumber(auth, formattedPhone, verifier);
    window.confirmationResult = confirmation;

    return {
      success: true,
      message: `SMS OTP dispatched via Firebase to ${formattedPhone}.`,
      confirmationResult: confirmation,
    };
  } catch (error: any) {
    console.error("Firebase Phone Auth error:", error);
    return {
      success: false,
      message: error?.message || "Failed to send SMS OTP via Firebase. Please try again.",
    };
  }
}

/**
 * Confirms user-entered 6-digit OTP code against Firebase verification session
 */
export async function verifyFirebasePhoneOtp(
  code: string,
  customConfirmation?: any,
): Promise<{ success: boolean; message: string; user?: any }> {
  const confirmation = customConfirmation || (typeof window !== "undefined" ? window.confirmationResult : undefined);

  if (!confirmation) {
    return {
      success: false,
      message: "No active verification session. Please request a new OTP code.",
    };
  }

  try {
    const result = await confirmation.confirm(code);
    return {
      success: true,
      message: "Phone number successfully verified!",
      user: result.user,
    };
  } catch (error: any) {
    console.error("Firebase confirmation error:", error);
    return {
      success: false,
      message: error?.code === "auth/invalid-verification-code"
        ? "Incorrect verification code. Please check SMS and retry."
        : error?.message || "Invalid or expired OTP code.",
    };
  }
}
