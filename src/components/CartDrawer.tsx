"use client";

import { useCart } from "@/lib/cart";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export function CartDrawer({ open, onClose, onCheckout }: CartDrawerProps) {
  const { items, removeItem, updateQty, total, count } = useCart();

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={onClose} />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-[#252525] z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#252525]">
            <div>
              <h2 className="font-serif text-xl text-white">Your Order</h2>
              <p className="text-white/40 text-xs mt-0.5">{count} items</p>
            </div>
            <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="text-center py-20 text-white/30">
                <svg className="w-12 h-12 mx-auto mb-3 text-white/10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <p className="text-sm">Your cart is empty</p>
                <p className="text-xs text-white/20 mt-1">Browse our collection and add items</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map(({ product, qty }) => (
                  <div key={product.id} className="flex gap-4 bg-[#141414] rounded-xl p-3 border border-[#252525]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-20 object-cover rounded-lg flex-shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-white truncate">{product.name}</h3>
                      <p className="text-xs text-white/40">{product.category} | {product.origin}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQty(product.id, qty - 1)}
                            className="w-7 h-7 rounded-md bg-[#252525] text-white/60 hover:text-white flex items-center justify-center text-sm"
                          >
                            -
                          </button>
                          <span className="text-sm text-white w-6 text-center">{qty}</span>
                          <button
                            onClick={() => updateQty(product.id, qty + 1)}
                            className="w-7 h-7 rounded-md bg-[#252525] text-white/60 hover:text-white flex items-center justify-center text-sm"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-[#c9a96e] font-semibold text-sm">
                          GHS {(product.price * qty).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(product.id)}
                      className="text-white/20 hover:text-red-400 transition-colors flex-shrink-0"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-[#252525] px-6 py-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white/50">Subtotal</span>
                <span className="text-white font-semibold">GHS {total.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-white/30">
                <span>Delivery</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex items-center justify-between border-t border-[#252525] pt-3">
                <span className="font-serif text-lg text-white">Total</span>
                <span className="text-[#c9a96e] font-bold text-xl">GHS {total.toLocaleString()}</span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full bg-gradient-to-r from-[#c9a96e] to-[#a8853a] text-black font-semibold py-3.5 rounded-lg hover:from-[#d4b57a] hover:to-[#b8923f] transition-all text-sm"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
