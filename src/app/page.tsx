"use client";

import { AuthProvider } from "@/lib/auth";
import { CartProvider } from "@/lib/cart";
import { AppShell } from "@/components/AppShell";

export default function Home() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppShell />
      </CartProvider>
    </AuthProvider>
  );
}
