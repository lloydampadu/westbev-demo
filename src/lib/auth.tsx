"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface User {
  name: string;
  email: string;
  organization: string;
  role: string;
}

interface AuthContext {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthCtx = createContext<AuthContext | null>(null);

// Demo accounts for the presentation
const DEMO_ACCOUNTS: Record<string, { password: string; user: User }> = {
  "diplomat@westbev.africa": {
    password: "demo2026",
    user: {
      name: "H.E. Ambassador Kwame Mensah",
      email: "diplomat@westbev.africa",
      organization: "Embassy of Ghana",
      role: "Diplomat",
    },
  },
  "admin@westbev.africa": {
    password: "admin2026",
    user: {
      name: "WestBev Admin",
      email: "admin@westbev.africa",
      organization: "WestBev Africa",
      role: "Administrator",
    },
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((email: string, password: string): boolean => {
    const account = DEMO_ACCOUNTS[email.toLowerCase()];
    if (account && account.password === password) {
      setUser(account.user);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => setUser(null), []);

  return (
    <AuthCtx.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
