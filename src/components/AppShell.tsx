"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { useCart } from "@/lib/cart";
import { LoginPage } from "./LoginPage";
import { ShopPage } from "./ShopPage";
import { CartDrawer } from "./CartDrawer";
import { CheckoutPage } from "./CheckoutPage";
import { OrderConfirmation } from "./OrderConfirmation";

type View = "shop" | "checkout" | "confirmed";

export function AppShell() {
  const { isAuthenticated, user, logout } = useAuth();
  const { count } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [view, setView] = useState<View>("shop");

  if (!isAuthenticated) return <LoginPage />;

  if (view === "confirmed") {
    return <OrderConfirmation onBackToShop={() => setView("shop")} />;
  }

  if (view === "checkout") {
    return (
      <CheckoutPage
        onBack={() => setView("shop")}
        onConfirm={() => setView("confirmed")}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#252525]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c9a96e] to-[#8b6914] flex items-center justify-center font-serif font-bold text-black text-lg">
              W
            </div>
            <div>
              <div className="font-serif text-xl font-bold tracking-wide text-white">WestBev</div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-[#c9a96e]">Private Portal</div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <div className="text-sm text-white/80">{user?.name}</div>
              <div className="text-xs text-[#c9a96e]">{user?.organization}</div>
            </div>
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#c9a96e] text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
            <button
              onClick={logout}
              className="text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <ShopPage />

      {/* Cart Drawer */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={() => { setCartOpen(false); setView("checkout"); }}
      />
    </div>
  );
}
