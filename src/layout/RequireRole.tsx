import React from "react";
import { useAuth, type AgentRole } from "../providers/AuthProvider";
import AgentAccessDeniedPage from "../pages/system/AgentAccessDeniedPage";

export default function RequireRole({ roles, children }: { roles: AgentRole[]; children: React.ReactNode }) {
  const { user } = useAuth();

  if (!user) return <AgentAccessDeniedPage requiredRole={roles.join(" | ")} />;
  if (!roles.includes(user.role)) {
    return <AgentAccessDeniedPage requiredRole={roles.join(" | ")} />;
  }
  return <>{children}</>;
}
