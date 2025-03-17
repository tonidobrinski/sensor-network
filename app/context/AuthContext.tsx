"use client";
import { createContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

type AuthContextType = {
  user: string | null;
  login: (email: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(storedUser);
  }, []);

  const login = (email: string) => {
    setUser(email);
    localStorage.setItem("user", email);
    router.push("/dashboard");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
