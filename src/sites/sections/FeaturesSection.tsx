import * as Icons from "lucide-react";
import { Sparkles, type LucideIcon } from "lucide-react";
import type { FeaturesSection as FeaturesSectionType } from "../types";
import { SectionShell, SectionHeading } from "./SectionShell";
import { cn } from "@/lib/utils";

function Icon({ name, className }: { name?: string; className?: string }) {
  const Lookup = (name && (Icons as unknown as Record<string, LucideIcon>)[name]) || Sparkles;
  return <Lookup className={className} />;
}

export function FeaturesSection({ section }: { section: FeaturesSectionType }) {
  const cols = section.columns ?? 3;
  const gridCols =
    cols === 2 ? "sm:grid-cols-2" : cols === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3";
  const invert = section.background === "brand" || section.background === "aurora";

  return (
    <SectionShell section={section}>
      <SectionHeading
        eyebrow={section.eyebrow}
        title={section.title}
        subtitle={section.subtitle}
        align={section.variant === "minimal-list" ? "left" : "center"}
        invert={invert}
      />

      {section.variant === "grid" && (
        <div className={cn("grid grid-cols-1 gap-5", gridCols)}>
          {section.items.map((it, i) => (
            <div
              key={i}
              className="group rounded-[var(--site-radius)] border border-[hsl(var(--site-text)/0.08)] bg-[hsl(var(--site-surface))] p-6 hover:-translate-y-0.5 hover:shadow-lg transition-all"
            >
              <div
                className="grid h-11 w-11 place-items-center rounded-xl text-white"
                style={{ background: "linear-gradient(135deg, hsl(var(--site-primary)), hsl(var(--site-accent)))" }}
              >
                <Icon name={it.icon} className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold" style={{ fontFamily: "var(--site-font-display)" }}>
                {it.title}
              </h3>
              {it.description && (
                <p className="mt-2 text-sm leading-relaxed text-[hsl(var(--site-text-muted))]">{it.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {section.variant === "icon-list" && (
        <div className={cn("grid grid-cols-1 gap-x-8 gap-y-6", gridCols)}>
          {section.items.map((it, i) => (
            <div key={i} className="flex gap-4">
              <div
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
                style={{ background: "hsl(var(--site-accent) / 0.12)", color: "hsl(var(--site-accent))" }}
              >
                <Icon name={it.icon} className="h-5 w-5" />
              </div>
              <div>
                <h3 className={cn("font-semibold", invert ? "text-white" : "")}>{it.title}</h3>
                {it.description && (
                  <p className={cn("mt-1 text-sm leading-relaxed", invert ? "text-white/80" : "text-[hsl(var(--site-text-muted))]")}>
                    {it.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {section.variant === "minimal-list" && (
        <ul className="divide-y divide-[hsl(var(--site-text)/0.08)] border-y border-[hsl(var(--site-text)/0.08)]">
          {section.items.map((it, i) => (
            <li key={i} className="flex items-center justify-between gap-6 py-5">
              <div className="flex items-center gap-4">
                <Icon name={it.icon} className="h-5 w-5 text-[hsl(var(--site-accent))]" />
                <div>
                  <p className="font-semibold">{it.title}</p>
                  {it.description && (
                    <p className="text-sm text-[hsl(var(--site-text-muted))] mt-0.5">{it.description}</p>
                  )}
                </div>
              </div>
              {it.href && (
                <a href={it.href} className="text-sm font-semibold text-[hsl(var(--site-primary))] hover:underline">
                  Learn →
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </SectionShell>
  );
}
