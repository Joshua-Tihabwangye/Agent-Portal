import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export type ThemePreference = "light" | "dark" | "system";

type ThemeModeContextValue = {
  /** User-selected preference (light/dark/system) */
  preference: ThemePreference;
  /** Effective palette mode (light/dark) */
  mode: "light" | "dark";
  setPreference: (pref: ThemePreference) => void;
  toggle: () => void;
};

const ThemeModeContext = createContext<ThemeModeContextValue | null>(null);

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";

function getSystemPrefersDark(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
}

export function ThemeModeProvider({ children }: { children: React.ReactNode }) {
  const [preference, setPreference] = useState<ThemePreference>(() => {
    const saved = window.localStorage.getItem("evzone_agent_theme") as ThemePreference | null;
    return saved ?? "light";
  });
  const [systemDark, setSystemDark] = useState<boolean>(() => getSystemPrefersDark());

  // Watch OS theme when preference is "system"
  useEffect(() => {
    const mql = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (!mql) return;
    const handler = () => setSystemDark(mql.matches);
    handler();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (mql.addEventListener ? mql.addEventListener("change", handler) : (mql as any).addListener(handler));
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mql.removeEventListener ? mql.removeEventListener("change", handler) : (mql as any).removeListener(handler));
    };
  }, []);

  const mode: "light" | "dark" = useMemo(() => {
    if (preference === "system") return systemDark ? "dark" : "light";
    return preference;
  }, [preference, systemDark]);

  useEffect(() => {
    window.localStorage.setItem("evzone_agent_theme", preference);
  }, [preference]);

  // Sync Tailwind dark class
  useEffect(() => {
    const root = window.document.documentElement;
    if (mode === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [mode]);

  const toggle = useCallback(() => {
    setPreference((prev) => {
      const effective = prev === "system" ? (systemDark ? "dark" : "light") : prev;
      return effective === "light" ? "dark" : "light";
    });
  }, [systemDark]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: EVZONE_GREEN },
          secondary: { main: EVZONE_ORANGE },
        },
        shape: { borderRadius: 12 },
        typography: {
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: "none",
                borderRadius: 999,
                fontWeight: 600,
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 16,
              },
            },
          },
        },
      }),
    [mode]
  );

  const value = useMemo(
    () => ({
      preference,
      mode,
      setPreference,
      toggle,
    }),
    [preference, mode, toggle]
  );

  return (
    <ThemeModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

export function useThemeMode(): ThemeModeContextValue {
  const ctx = useContext(ThemeModeContext);
  if (!ctx) throw new Error("useThemeMode must be used within ThemeModeProvider");
  return ctx;
}
