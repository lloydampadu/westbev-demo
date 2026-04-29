"use client";

export function OrderConfirmation({ onBackToShop }: { onBackToShop: () => void }) {
  const orderNumber = `WB-${Date.now().toString().slice(-6)}`;

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h1 className="font-serif text-3xl text-white mb-2">Order Confirmed</h1>
        <p className="text-white/50 text-sm mb-6">
          Thank you for your order. You will receive a confirmation email shortly.
        </p>
        <div className="bg-[#141414] border border-[#252525] rounded-xl p-6 mb-8">
          <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Order Reference</div>
          <div className="text-2xl font-mono text-[#c9a96e] font-bold">{orderNumber}</div>
          <div className="mt-4 text-xs text-white/30">
            A WestBev representative will contact you to confirm delivery details.
          </div>
        </div>
        <button
          onClick={onBackToShop}
          className="bg-gradient-to-r from-[#c9a96e] to-[#a8853a] text-black font-semibold px-8 py-3 rounded-lg hover:from-[#d4b57a] hover:to-[#b8923f] transition-all text-sm"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
