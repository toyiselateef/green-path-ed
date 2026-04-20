import type { CtaSection as CtaSectionType } from "../types";
import { SectionShell, SectionHeading } from "./SectionShell";
import { CtaButton } from "./CtaButton";

export function CtaSection({ section }: { section: CtaSectionType }) {
  const invert = section.background === "brand" || section.background === "aurora";

  if (section.variant === "split") {
    return (
      <SectionShell section={section}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <SectionHeading eyebrow={section.eyebrow} title={section.title} subtitle={section.subtitle} invert={invert} />
            <div className="flex flex-wrap gap-3">
              <CtaButton cta={section.primaryCta} invert={invert} />
              {section.secondaryCta && <CtaButton cta={section.secondaryCta} invert={invert} />}
            </div>
          </div>
          {section.image && (
            <img src={section.image.src} alt={section.image.alt} className="rounded-[var(--site-radius)] object-cover w-full aspect-[4/3] shadow-xl" />
          )}
        </div>
      </SectionShell>
    );
  }

  if (section.variant === "banner") {
    return (
      <SectionShell section={{ ...section, background: section.background ?? "brand", spacing: section.spacing ?? "md" }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            {section.eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80 mb-2">{section.eyebrow}</p>}
            <h2 className="text-2xl sm:text-3xl font-bold text-white" style={{ fontFamily: "var(--site-font-display)" }}>
              {section.title}
            </h2>
            {section.subtitle && <p className="mt-2 text-white/85">{section.subtitle}</p>}
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <CtaButton cta={section.primaryCta} invert />
            {section.secondaryCta && <CtaButton cta={section.secondaryCta} invert />}
          </div>
        </div>
      </SectionShell>
    );
  }

  // centered
  return (
    <SectionShell section={section}>
      <div className="max-w-2xl mx-auto text-center">
        <SectionHeading eyebrow={section.eyebrow} title={section.title} subtitle={section.subtitle} align="center" invert={invert} />
        <div className="flex flex-wrap justify-center gap-3">
          <CtaButton cta={section.primaryCta} invert={invert} />
          {section.secondaryCta && <CtaButton cta={section.secondaryCta} invert={invert} />}
        </div>
      </div>
    </SectionShell>
  );
}
