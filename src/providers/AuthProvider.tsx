/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  ApiRequestError,
  clearStoredSession,
  fetchAgentProfile,
  getAccessToken,
  loginAgent,
  logoutAgent,
  type AgentSession,
} from "../api/client";

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
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setRole: (role: AgentRole) => void;
  updateUser: (updates: Partial<AgentUser>) => void;
  completeTrainingGate: () => void;
  clearError: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "evzone_agent_auth";
const TRAINING_GATE_KEY = "evzone_agent_training_gate_complete";

function extractNameFromEmail(email: string): string {
  const localPart = email.split("@")[0] || "Agent";
  const cleaned = localPart
    .replace(/[._-]/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
  return cleaned || "Agent";
}

function mapBackendRole(roles: string[] = [], email = ""): AgentRole {
  const normalized = roles.map((r) => r.toLowerCase());
  const emailLower = email.toLowerCase();

  if (normalized.includes("admin") || emailLower.includes("super")) return "supervisor";
  if (normalized.includes("dispatcher") || emailLower.includes("dispatch")) return "dispatch";
  if (normalized.includes("safety")) return "safety";
  if (normalized.includes("qa")) return "qa";
  if (normalized.includes("onboarding")) return "onboarding";
  if (normalized.includes("support_t2") || normalized.includes("support_tier_2")) return "support_t2";
  if (normalized.includes("support") || normalized.includes("support_t1")) return "support_t1";
  return "support_t1";
}

function sessionToAgentUser(session: AgentSession): AgentUser {
  const email = session.user.email ?? "";
  const firstName = session.user.firstName ?? "";
  const lastName = session.user.lastName ?? "";
  const name = [firstName, lastName].filter(Boolean).join(" ").trim() || extractNameFromEmail(email);

  return {
    id: session.user.id,
    name,
    email,
    role: mapBackendRole(session.user.roles ?? [], email),
    phone: session.user.phone ?? undefined,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AgentUser | null>(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
      const session = JSON.parse(raw) as AgentSession;
      if (!session.accessToken || !getAccessToken()) return null;
      return sessionToAgentUser(session);
    } catch {
      return null;
    }
  });

  const [trainingGateComplete, setTrainingGateComplete] = useState<boolean>(() => {
    return window.localStorage.getItem(TRAINING_GATE_KEY) === "1";
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handler = () => {
      setUser(null);
      clearStoredSession();
    };
    window.addEventListener("evzone:session-expired", handler);
    return () => window.removeEventListener("evzone:session-expired", handler);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(TRAINING_GATE_KEY, trainingGateComplete ? "1" : "0");
  }, [trainingGateComplete]);

  const clearError = useCallback(() => setError(null), []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const session = await loginAgent(email, password);
      const agentUser = sessionToAgentUser(session);
      setUser(agentUser);

      try {
        await fetchAgentProfile();
      } catch {
        // Profile hydration is optional; login already succeeded.
      }
    } catch (err) {
      const message = err instanceof ApiRequestError ? err.message : "Unable to sign in. Please try again.";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    let session: AgentSession | null = null;
    if (raw) {
      try {
        session = JSON.parse(raw) as AgentSession;
      } catch {
        session = null;
      }
    }

    if (session?.refreshToken) {
      try {
        await logoutAgent(session.refreshToken);
      } catch {
        // Ignore logout errors and clear local session anyway.
      }
    }

    setUser(null);
    clearStoredSession();
  };

  const setRole = (role: AgentRole) => {
    setUser((u) => (u ? { ...u, role } : u));
  };

  const updateUser = (updates: Partial<AgentUser>) => {
    setUser((u) => (u ? { ...u, ...updates } : u));
  };

  const completeTrainingGate = () => setTrainingGateComplete(true);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      trainingGateComplete,
      isLoading,
      error,
      login,
      logout,
      setRole,
      updateUser,
      completeTrainingGate,
      clearError,
    }),
    [user, trainingGateComplete, isLoading, error, clearError]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
