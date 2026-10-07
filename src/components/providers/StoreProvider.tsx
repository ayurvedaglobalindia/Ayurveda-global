"use client";

import { ReactNode } from "react";
import { CartProvider } from "./CartProvider";
import { UIProvider } from "./UIProvider";

export function StoreProvider({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <UIProvider>{children}</UIProvider>
    </CartProvider>
  );
}
