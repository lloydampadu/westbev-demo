"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth";

export function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [ageConfirmed, setAgeConfirmed] = useState(false);

  if (!ageConfirmed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#c9a96e] to-[#8b6914] flex items-center justify-center font-serif font-bold text-black text-3xl mb-6">
            W
          </div>
          <h1 className="font-serif text-4xl font-bold text-white mb-2">WestBev Africa</h1>
          <p className="font-[family-name:var(--font-great-vibes)] text-[#c9a96e] text-3xl mb-10">
            Purveyors of Fine Liquors
          </p>
          <div className="bg-[#141414] border border-[#252525] rounded-2xl p-8">
            <p className="text-white/70 text-sm mb-6">
              You must be of legal drinking age to access this portal.
              Please confirm you are 18 years or older.
            </p>
            <button
              onClick={() => setAgeConfirmed(true)}
              className="w-full bg-gradient-to-r from-[#c9a96e] to-[#a8853a] text-black font-semibold py-3 rounded-lg hover:from-[#d4b57a] hover:to-[#b8923f] transition-all"
            >
              I am 18 or older — Enter
            </button>
            <p className="text-white/30 text-xs mt-4">
              Enjoy responsibly. Do not forward to anyone under legal drinking age.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const success = login(email.trim(), password);
    if (!success) setError("Invalid client number or password. Contact WestBev for access.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#c9a96e] to-[#8b6914] flex items-center justify-center font-serif font-bold text-black text-2xl mb-4">
            W
          </div>
          <h1 className="font-serif text-3xl font-bold text-white">Private Portal</h1>
          <p className="text-white/40 text-sm mt-1">Exclusive access for WestBev clients</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#141414] border border-[#252525] rounded-2xl p-8 space-y-5">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg">
              {error}
            </div>
          )}
          <div>
            <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">Client Number</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. 12841"
              className="w-full bg-[#0a0a0a] border border-[#252525] rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#c9a96e] transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full bg-[#0a0a0a] border border-[#252525] rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#c9a96e] transition-colors"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#c9a96e] to-[#a8853a] text-black font-semibold py-3 rounded-lg hover:from-[#d4b57a] hover:to-[#b8923f] transition-all"
          >
            Sign In
          </button>
          <div className="text-center">
            <p className="text-white/30 text-xs">
              Demo: Client No. 12841 / wb2026
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
