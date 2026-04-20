import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { SectionBase } from "../types";
import { spacingClass, widthClass, bgClass, bgStyle } from "../utils";

/**
 * Wraps every section with consistent spacing, width and background tokens.
 * Sections never render their own outer container — they always use this.
 */
export function SectionShell({
  section,
  children,
  className,
}: {
  section: SectionBase & { background?: "default" | "muted" | "brand" | "aurora" };
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={section.id}
      className={cn("relative", spacingClass[section.spacing ?? "lg"], bgClass(section.background), className)}
      style={bgStyle(section.background)}
    >
      <div className={widthClass[section.width ?? "contained"]}>{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  invert = false,
}: {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  align?: "left" | "center";
  invert?: boolean;
}) {
  if (!eyebrow && !title && !subtitle) return null;
  return (
    <div className={cn("mb-10 max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <p
          className={cn(
            "text-xs font-semibold uppercase tracking-[0.18em] mb-3",
            invert ? "text-white/80" : "text-[hsl(var(--site-accent))]",
          )}
        >
          {eyebrow}
        </p>
      )}
      {title && (
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight"
          style={{ fontFamily: "var(--site-font-display)" }}
        >
          {title}
        </h2>
      )}
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed",
            invert ? "text-white/85" : "text-[hsl(var(--site-text-muted))]",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
