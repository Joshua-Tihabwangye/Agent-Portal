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
};

type AuthContextValue = {
  user: AgentUser | null;
  isAuthenticated: boolean;
  trainingGateComplete: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setRole: (role: AgentRole) => void;
  completeTrainingGate: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "evzone_agent_auth";
const TRAINING_GATE_KEY = "evzone_agent_training_gate_complete";

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
    // Stub: replace with real auth service.
    // Keep it deterministic for local dev.
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

    setUser({
      id: "agt-001",
      name: "Agent",
      email,
      role,
    });
  };

  const logout = () => setUser(null);

  const completeTrainingGate = () => setTrainingGateComplete(true);

  const setRole = (role: AgentRole) => {
    setUser((u) => (u ? { ...u, role } : u));
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      trainingGateComplete,
      login,
      logout,
      setRole,
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
