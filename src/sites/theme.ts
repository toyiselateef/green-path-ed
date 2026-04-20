import type { SiteTheme } from "./types";

/**
 * Build inline CSS variable map from a SiteTheme.
 * Apply to a wrapper <div style={themeToStyle(theme)}> so each school's
 * site renders with its own palette without polluting the dashboard.
 */
export function themeToStyle(theme: SiteTheme): React.CSSProperties {
  return {
    // HSL triplet vars consumed by the section components via hsl(var(--site-*))
    ["--site-primary" as any]: theme.primary,
    ["--site-secondary" as any]: theme.secondary,
    ["--site-accent" as any]: theme.accent,
    ["--site-background" as any]: theme.background,
    ["--site-surface" as any]: theme.surface,
    ["--site-text" as any]: theme.text,
    ["--site-text-muted" as any]: theme.textMuted,
    ["--site-radius" as any]: theme.radius ?? "0.875rem",
    ["--site-font-display" as any]: theme.fontDisplay ?? "'Sora', 'Inter', system-ui, sans-serif",
    ["--site-font-body" as any]: theme.fontBody ?? "'Inter', system-ui, sans-serif",
    backgroundColor: `hsl(${theme.background})`,
    color: `hsl(${theme.text})`,
    fontFamily: `var(--site-font-body)`,
  };
}

/** A few preset themes available in the admin preview. */
export const themePresets: Record<string, SiteTheme> = {
  forest: {
    primary: "152 82% 22%",
    secondary: "150 25% 96%",
    accent: "152 71% 45%",
    background: "150 20% 98%",
    surface: "0 0% 100%",
    text: "160 25% 10%",
    textMuted: "160 10% 42%",
  },
  royal: {
    primary: "230 70% 28%",
    secondary: "230 30% 96%",
    accent: "42 95% 55%",
    background: "230 30% 98%",
    surface: "0 0% 100%",
    text: "230 30% 12%",
    textMuted: "230 10% 45%",
  },
  crimson: {
    primary: "350 75% 35%",
    secondary: "350 30% 97%",
    accent: "20 90% 55%",
    background: "20 30% 98%",
    surface: "0 0% 100%",
    text: "350 30% 12%",
    textMuted: "350 10% 42%",
  },
  ocean: {
    primary: "200 85% 30%",
    secondary: "200 30% 96%",
    accent: "180 70% 45%",
    background: "200 30% 98%",
    surface: "0 0% 100%",
    text: "200 35% 12%",
    textMuted: "200 12% 42%",
  },
};
