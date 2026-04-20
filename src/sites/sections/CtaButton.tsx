import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CtaBlock } from "../types";

export function CtaButton({ cta, invert = false }: { cta: CtaBlock; invert?: boolean }) {
  const isExternal = /^https?:\/\//.test(cta.href);
  const variant = cta.variant ?? "primary";

  const base =
    "inline-flex items-center gap-2 h-11 px-5 rounded-[var(--site-radius)] text-sm font-semibold transition-all";

  const styles =
    variant === "primary"
      ? "text-white shadow-md hover:shadow-lg hover:-translate-y-0.5"
      : variant === "secondary"
        ? invert
          ? "bg-white/10 text-white border border-white/25 hover:bg-white/20 backdrop-blur"
          : "bg-[hsl(var(--site-secondary))] text-[hsl(var(--site-text))] border border-[hsl(var(--site-text)/0.1)] hover:bg-[hsl(var(--site-secondary)/0.7)]"
        : invert
          ? "text-white hover:underline"
          : "text-[hsl(var(--site-primary))] hover:underline";

  const inlineStyle =
    variant === "primary"
      ? {
          background:
            "linear-gradient(135deg, hsl(var(--site-primary)), hsl(var(--site-accent)))",
        }
      : undefined;

  const content = (
    <>
      {cta.label}
      {variant === "primary" && <ArrowRight className="h-4 w-4" />}
    </>
  );

  if (isExternal) {
    return (
      <a href={cta.href} className={cn(base, styles)} style={inlineStyle} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }
  return (
    <Link to={cta.href} className={cn(base, styles)} style={inlineStyle}>
      {content}
    </Link>
  );
}
