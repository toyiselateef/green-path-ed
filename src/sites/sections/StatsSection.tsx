import type { StatsSection as StatsSectionType } from "../types";
import { SectionShell, SectionHeading } from "./SectionShell";
import { cn } from "@/lib/utils";

export function StatsSection({ section }: { section: StatsSectionType }) {
  const invert = section.background === "brand" || section.background === "aurora";
  const valueClass = cn("text-4xl sm:text-5xl font-bold tracking-tight", invert ? "text-white" : "");
  const labelClass = cn("text-sm mt-2", invert ? "text-white/80" : "text-[hsl(var(--site-text-muted))]");

  if (section.variant === "split") {
    return (
      <SectionShell section={section}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading eyebrow={section.eyebrow} title={section.title} subtitle={section.subtitle} invert={invert} />
            <div className="grid grid-cols-2 gap-6">
              {section.items.map((s, i) => (
                <div key={i}>
                  <p className={valueClass} style={{ fontFamily: "var(--site-font-display)" }}>{s.value}</p>
                  <p className={labelClass}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          {section.image && (
            <img src={section.image.src} alt={section.image.alt} className="rounded-[var(--site-radius)] object-cover w-full aspect-[4/3] shadow-xl" />
          )}
        </div>
      </SectionShell>
    );
  }

  if (section.variant === "cards") {
    return (
      <SectionShell section={section}>
        <SectionHeading eyebrow={section.eyebrow} title={section.title} subtitle={section.subtitle} align="center" invert={invert} />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {section.items.map((s, i) => (
            <div
              key={i}
              className="rounded-[var(--site-radius)] border border-[hsl(var(--site-text)/0.08)] bg-[hsl(var(--site-surface))] p-6 text-center"
            >
              <p className={valueClass} style={{ fontFamily: "var(--site-font-display)" }}>{s.value}</p>
              <p className={labelClass}>{s.label}</p>
              {s.hint && <p className="mt-1 text-xs text-[hsl(var(--site-text-muted))]">{s.hint}</p>}
            </div>
          ))}
        </div>
      </SectionShell>
    );
  }

  // inline
  return (
    <SectionShell section={section}>
      <SectionHeading eyebrow={section.eyebrow} title={section.title} subtitle={section.subtitle} align="center" invert={invert} />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
        {section.items.map((s, i) => (
          <div key={i}>
            <p className={valueClass} style={{ fontFamily: "var(--site-font-display)" }}>{s.value}</p>
            <p className={labelClass}>{s.label}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
