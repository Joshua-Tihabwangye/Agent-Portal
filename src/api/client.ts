const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3001/api/v1";

const AUTH_STORAGE_KEY = "evzone_agent_auth";

export interface ApiError {
  statusCode: number;
  message: string;
  error?: string;
}

export class ApiRequestError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly body?: unknown
  ) {
    super(message);
    this.name = "ApiRequestError";
  }
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  requestId?: string;
  timestamp?: string;
}

interface ApiErrorResponse {
  success: false;
  error: {
    statusCode: number;
    message: string | string[];
    path?: string;
    requestId?: string;
    timestamp?: string;
  };
}

export interface AgentSession {
  user: {
    id: string;
    email: string;
    phone?: string | null;
    firstName?: string;
    lastName?: string;
    roles?: string[];
    [key: string]: unknown;
  };
  accessToken: string;
  refreshToken: string;
  expiresIn?: string;
  expiresInSeconds?: number;
}

function getStoredSession(): AgentSession | null {
  const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AgentSession;
  } catch {
    return null;
  }
}

export function getAccessToken(): string | null {
  return getStoredSession()?.accessToken ?? null;
}

export function setStoredSession(session: AgentSession | null): void {
  if (session) {
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  } else {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  }
}

export function clearStoredSession(): void {
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}

function buildUrl(path: string): string {
  const base = API_BASE_URL.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}

export async function apiRequest<T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = buildUrl(path);
  const token = getAccessToken();

  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...((options.headers as Record<string, string>) ?? {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  let body: unknown;
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    body = await response.json();
  } else if (response.status !== 204) {
    body = await response.text();
  }

  if (!response.ok) {
    if (response.status === 401) {
      clearStoredSession();
      window.dispatchEvent(new Event("evzone:session-expired"));
    }

    const errorBody = body as ApiErrorResponse | undefined;
    const rawMessage = errorBody?.error?.message;
    const message = Array.isArray(rawMessage)
      ? rawMessage.join("; ")
      : typeof rawMessage === "string"
        ? rawMessage
        : typeof body === "string"
          ? body
          : `Request failed with status ${response.status}`;
    throw new ApiRequestError(message, response.status, body);
  }

  const successBody = body as ApiResponse<T>;
  return successBody.data;
}

export async function apiGet<T = unknown>(path: string): Promise<T> {
  return apiRequest<T>(path, { method: "GET" });
}

export async function apiPost<T = unknown>(
  path: string,
  body: unknown
): Promise<T> {
  return apiRequest<T>(path, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function apiPatch<T = unknown>(
  path: string,
  body: unknown
): Promise<T> {
  return apiRequest<T>(path, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

export async function apiDelete<T = unknown>(path: string): Promise<T> {
  return apiRequest<T>(path, { method: "DELETE" });
}

export async function loginAgent(
  identifier: string,
  password: string
): Promise<AgentSession> {
  const session = await apiPost<AgentSession>("/agent/auth/login", {
    identifier,
    password,
  });
  setStoredSession(session);
  return session;
}

export async function fetchAgentProfile(): Promise<unknown> {
  return apiGet("/agent/auth/me");
}

export async function refreshAgentSession(refreshToken: string): Promise<AgentSession> {
  const session = await apiPost<AgentSession>("/agent/auth/refresh", {
    refreshToken,
  });
  setStoredSession(session);
  return session;
}

export async function logoutAgent(refreshToken: string): Promise<void> {
  await apiPost("/agent/auth/logout", { refreshToken });
  clearStoredSession();
}
