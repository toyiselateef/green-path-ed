import type { SectionSpacing, SectionWidth } from "./types";

export const spacingClass: Record<SectionSpacing, string> = {
  sm: "py-10 sm:py-12",
  md: "py-16 sm:py-20",
  lg: "py-20 sm:py-28",
  xl: "py-28 sm:py-36",
};

export const widthClass: Record<SectionWidth, string> = {
  contained: "max-w-7xl mx-auto px-6",
  full: "w-full px-6",
};

export function bgClass(bg?: "default" | "muted" | "brand" | "aurora") {
  switch (bg) {
    case "muted":
      return "bg-[hsl(var(--site-secondary))]";
    case "brand":
      return "text-white";
    case "aurora":
      return "text-white relative overflow-hidden";
    default:
      return "bg-[hsl(var(--site-background))]";
  }
}

export function bgStyle(bg?: "default" | "muted" | "brand" | "aurora"): React.CSSProperties | undefined {
  if (bg === "brand") {
    return {
      background:
        "linear-gradient(135deg, hsl(var(--site-primary)) 0%, hsl(var(--site-accent)) 100%)",
    };
  }
  if (bg === "aurora") {
    return {
      background:
        "radial-gradient(ellipse 80% 60% at 20% 10%, hsl(var(--site-accent) / 0.4), transparent 60%), radial-gradient(ellipse 60% 50% at 90% 20%, hsl(var(--site-primary) / 0.5), transparent 60%), linear-gradient(135deg, hsl(var(--site-primary)), hsl(var(--site-primary) / 0.85))",
    };
  }
  return undefined;
}
