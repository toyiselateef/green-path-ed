import type { HeroSection as HeroSectionType } from "../types";
import { SectionShell } from "./SectionShell";
import { CtaButton } from "./CtaButton";
import { spacingClass, widthClass } from "../utils";

export function HeroSection({ section }: { section: HeroSectionType }) {
  if (section.variant === "image-bg") {
    return (
      <section
        id={section.id}
        className={`relative overflow-hidden ${spacingClass[section.spacing ?? "xl"]} text-white`}
      >
        {section.image && (
          <>
            <img src={section.image.src} alt={section.image.alt} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/45 to-black/30" />
          </>
        )}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 20% 30%, hsl(var(--site-primary) / 0.55), transparent 60%)",
          }}
        />
        <div className={`relative ${widthClass[section.width ?? "contained"]}`}>
          {section.eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/85 mb-4">{section.eyebrow}</p>
          )}
          <h1
            className="max-w-3xl text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight"
            style={{ fontFamily: "var(--site-font-display)" }}
          >
            {section.title}
          </h1>
          {section.subtitle && <p className="mt-5 max-w-2xl text-lg text-white/85 leading-relaxed">{section.subtitle}</p>}
          <div className="mt-8 flex flex-wrap gap-3">
            {section.primaryCta && <CtaButton cta={section.primaryCta} invert />}
            {section.secondaryCta && <CtaButton cta={section.secondaryCta} invert />}
          </div>
        </div>
      </section>
    );
  }

  if (section.variant === "split") {
    return (
      <SectionShell section={{ ...section, spacing: section.spacing ?? "xl" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            {section.eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(var(--site-accent))] mb-3">
                {section.eyebrow}
              </p>
            )}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight"
              style={{ fontFamily: "var(--site-font-display)" }}
            >
              {section.title}
            </h1>
            {section.subtitle && (
              <p className="mt-5 text-lg text-[hsl(var(--site-text-muted))] leading-relaxed">{section.subtitle}</p>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              {section.primaryCta && <CtaButton cta={section.primaryCta} />}
              {section.secondaryCta && <CtaButton cta={section.secondaryCta} />}
            </div>
          </div>
          {section.image && (
            <div className="relative">
              <div
                className="absolute -inset-4 rounded-3xl opacity-30 blur-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(var(--site-primary)), hsl(var(--site-accent)))",
                }}
              />
              <img
                src={section.image.src}
                alt={section.image.alt}
                className="relative rounded-3xl object-cover w-full aspect-[4/5] shadow-2xl"
              />
            </div>
          )}
        </div>
      </SectionShell>
    );
  }

  // centered
  return (
    <SectionShell section={{ ...section, spacing: section.spacing ?? "xl" }}>
      <div className="max-w-3xl mx-auto text-center">
        {section.eyebrow && (
          <span className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--site-text)/0.1)] bg-[hsl(var(--site-secondary))] px-3.5 py-1.5 text-xs font-semibold text-[hsl(var(--site-primary))] mb-5">
            {section.eyebrow}
          </span>
        )}
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight"
          style={{ fontFamily: "var(--site-font-display)" }}
        >
          {section.title}
        </h1>
        {section.subtitle && (
          <p className="mt-5 text-lg text-[hsl(var(--site-text-muted))] leading-relaxed">{section.subtitle}</p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {section.primaryCta && <CtaButton cta={section.primaryCta} />}
          {section.secondaryCta && <CtaButton cta={section.secondaryCta} />}
        </div>
      </div>
    </SectionShell>
  );
}
