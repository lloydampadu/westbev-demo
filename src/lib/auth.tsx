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

// Demo accounts — clients use a client number + password
const DEMO_ACCOUNTS: Record<string, { password: string; user: User }> = {
  "12841": {
    password: "wb2026",
    user: {
      name: "H.E. Ambassador Kwame Mensah",
      email: "ambassador.mensah@gh.gov",
      organization: "Embassy of Ghana",
      role: "Diplomat",
    },
  },
  "98734": {
    password: "wb2026",
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
