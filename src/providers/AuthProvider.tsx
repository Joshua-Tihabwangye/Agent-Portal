import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type AgentRole =
  | "onboarding"
  | "support_t1"
  | "support_t2"
  | "dispatch"
  | "safety"
  | "supervisor"
  | "qa";

export type AgentUser = {
  id: string;
  name: string;
  email: string;
  role: AgentRole;
  phone?: string;
};

type AuthContextValue = {
  user: AgentUser | null;
  isAuthenticated: boolean;
  trainingGateComplete: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setRole: (role: AgentRole) => void;
  updateUser: (updates: Partial<AgentUser>) => void;
  completeTrainingGate: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "evzone_agent_auth";
const TRAINING_GATE_KEY = "evzone_agent_training_gate_complete";

function extractNameFromEmail(email: string): string {
  const localPart = email.split("@")[0] || "Agent";
  // Capitalize first letter and handle common patterns
  const cleaned = localPart
    .replace(/[._-]/g, " ")
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
  return cleaned || "Agent";
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AgentUser | null>(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AgentUser;
    } catch {
      return null;
    }
  });

  const [trainingGateComplete, setTrainingGateComplete] = useState<boolean>(() => {
    return window.localStorage.getItem(TRAINING_GATE_KEY) === "1";
  });

  useEffect(() => {
    if (user) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else window.localStorage.removeItem(STORAGE_KEY);
  }, [user]);

  useEffect(() => {
    window.localStorage.setItem(TRAINING_GATE_KEY, trainingGateComplete ? "1" : "0");
  }, [trainingGateComplete]);

  const login = async (email: string, _password: string) => {
    // Determine role based on email keywords
    const role: AgentRole = email.toLowerCase().includes("super")
      ? "supervisor"
      : email.toLowerCase().includes("safety")
        ? "safety"
        : email.toLowerCase().includes("onboard")
          ? "onboarding"
          : email.toLowerCase().includes("qa")
            ? "qa"
            : email.toLowerCase().includes("t2")
              ? "support_t2"
              : email.toLowerCase().includes("dispatch")
                ? "dispatch"
                : "support_t1";

    // Extract name from email
    const name = extractNameFromEmail(email);

    setUser({
      id: "agt-001",
      name,
      email,
      role,
    });
  };

  const logout = () => setUser(null);

  const completeTrainingGate = () => setTrainingGateComplete(true);

  const setRole = (role: AgentRole) => {
    setUser((u) => (u ? { ...u, role } : u));
  };

  const updateUser = (updates: Partial<AgentUser>) => {
    setUser((u) => (u ? { ...u, ...updates } : u));
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      trainingGateComplete,
      login,
      logout,
      setRole,
      updateUser,
      completeTrainingGate,
    }),
    [user, trainingGateComplete]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
