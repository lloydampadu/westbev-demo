"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";

interface CheckoutPageProps {
  onBack: () => void;
  onConfirm: () => void;
}

export function CheckoutPage({ onBack, onConfirm }: CheckoutPageProps) {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const [delivery, setDelivery] = useState("office");
  const [notes, setNotes] = useState("");
  const [processing, setProcessing] = useState(false);

  const deliveryFee = delivery === "office" ? 0 : 50;
  const grandTotal = total + deliveryFee;

  const handleOrder = () => {
    setProcessing(true);
    setTimeout(() => {
      clearCart();
      onConfirm();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-[#252525]">
        <div className="max-w-4xl mx-auto px-6 h-20 flex items-center gap-4">
          <button onClick={onBack} className="text-white/40 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>
          <h1 className="font-serif text-2xl text-white">Checkout</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left — Form */}
          <div className="lg:col-span-3 space-y-8">
            {/* Client Info */}
            <section>
              <h2 className="text-xs uppercase tracking-[0.2em] text-[#c9a96e] mb-4">Client Information</h2>
              <div className="bg-[#141414] border border-[#252525] rounded-xl p-5 space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/40 text-sm">Name</span>
                  <span className="text-white text-sm">{user?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40 text-sm">Organization</span>
                  <span className="text-white text-sm">{user?.organization}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40 text-sm">Email</span>
                  <span className="text-white text-sm">{user?.email}</span>
                </div>
              </div>
            </section>

            {/* Delivery */}
            <section>
              <h2 className="text-xs uppercase tracking-[0.2em] text-[#c9a96e] mb-4">Delivery Method</h2>
              <div className="space-y-3">
                <label
                  className={`flex items-center gap-4 bg-[#141414] border rounded-xl p-4 cursor-pointer transition-all ${
                    delivery === "office" ? "border-[#c9a96e]" : "border-[#252525] hover:border-[#c9a96e]/30"
                  }`}
                >
                  <input
                    type="radio"
                    name="delivery"
                    value="office"
                    checked={delivery === "office"}
                    onChange={() => setDelivery("office")}
                    className="accent-[#c9a96e]"
                  />
                  <div className="flex-1">
                    <div className="text-white text-sm font-medium">Office Pickup</div>
                    <div className="text-white/40 text-xs">Collect from WestBev, Spintex, Accra</div>
                  </div>
                  <span className="text-green-400 text-sm font-semibold">FREE</span>
                </label>
                <label
                  className={`flex items-center gap-4 bg-[#141414] border rounded-xl p-4 cursor-pointer transition-all ${
                    delivery === "deliver" ? "border-[#c9a96e]" : "border-[#252525] hover:border-[#c9a96e]/30"
                  }`}
                >
                  <input
                    type="radio"
                    name="delivery"
                    value="deliver"
                    checked={delivery === "deliver"}
                    onChange={() => setDelivery("deliver")}
                    className="accent-[#c9a96e]"
                  />
                  <div className="flex-1">
                    <div className="text-white text-sm font-medium">Deliver to Address</div>
                    <div className="text-white/40 text-xs">Within Accra — same or next business day</div>
                  </div>
                  <span className="text-[#c9a96e] text-sm font-semibold">GHS 50</span>
                </label>
              </div>
            </section>

            {delivery === "deliver" && (
              <section>
                <h2 className="text-xs uppercase tracking-[0.2em] text-[#c9a96e] mb-4">Delivery Address</h2>
                <input
                  type="text"
                  placeholder="Enter delivery address in Accra"
                  className="w-full bg-[#141414] border border-[#252525] rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#c9a96e] transition-colors"
                />
              </section>
            )}

            {/* Notes */}
            <section>
              <h2 className="text-xs uppercase tracking-[0.2em] text-[#c9a96e] mb-4">Order Notes (Optional)</h2>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Special requests, preferred delivery time..."
                rows={3}
                className="w-full bg-[#141414] border border-[#252525] rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#c9a96e] transition-colors resize-none"
              />
            </section>

            {/* Payment */}
            <section>
              <h2 className="text-xs uppercase tracking-[0.2em] text-[#c9a96e] mb-4">Payment</h2>
              <div className="bg-[#141414] border border-[#252525] rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-6 bg-[#0ab862] rounded flex items-center justify-center text-white text-[8px] font-bold">PAY</div>
                  <span className="text-white text-sm">Paystack — Cards, Mobile Money, Bank Transfer</span>
                </div>
                <p className="text-white/30 text-xs">
                  Secure payment powered by Paystack. Supports Visa, Mastercard, MTN MoMo, Vodafone Cash, and bank transfers.
                </p>
              </div>
            </section>
          </div>

          {/* Right — Order Summary */}
          <div className="lg:col-span-2">
            <div className="sticky top-6">
              <h2 className="text-xs uppercase tracking-[0.2em] text-[#c9a96e] mb-4">Order Summary</h2>
              <div className="bg-[#141414] border border-[#252525] rounded-xl p-5">
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {items.map(({ product, qty }) => (
                    <div key={product.id} className="flex items-center gap-3">
                      <img src={product.image} alt={product.name} className="w-10 h-12 object-cover rounded" referrerPolicy="no-referrer" />
                      <div className="flex-1 min-w-0">
                        <div className="text-white text-xs truncate">{product.name}</div>
                        <div className="text-white/30 text-xs">Qty: {qty}</div>
                      </div>
                      <div className="text-white/70 text-xs">GHS {(product.price * qty).toLocaleString()}</div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#252525] mt-4 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Subtotal</span>
                    <span className="text-white">GHS {total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Delivery</span>
                    <span className="text-white">{deliveryFee === 0 ? "FREE" : `GHS ${deliveryFee}`}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t border-[#252525] pt-3 mt-3">
                    <span className="text-white font-serif">Total</span>
                    <span className="text-[#c9a96e]">GHS {grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={handleOrder}
                  disabled={processing}
                  className={`w-full mt-5 py-3.5 rounded-lg font-semibold text-sm transition-all ${
                    processing
                      ? "bg-[#c9a96e]/50 text-black/50 cursor-wait"
                      : "bg-gradient-to-r from-[#c9a96e] to-[#a8853a] text-black hover:from-[#d4b57a] hover:to-[#b8923f]"
                  }`}
                >
                  {processing ? "Processing Order..." : `Place Order — GHS ${grandTotal.toLocaleString()}`}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
