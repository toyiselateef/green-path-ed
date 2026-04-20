import type { TextSection as TextSectionType } from "../types";
import { SectionShell, SectionHeading } from "./SectionShell";
import { CtaButton } from "./CtaButton";

function Paragraphs({ body }: { body: string }) {
  return (
    <div className="space-y-4 text-[hsl(var(--site-text-muted))] leading-relaxed">
      {body.split(/\n\n+/).map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}

export function TextSection({ section }: { section: TextSectionType }) {
  const invert = section.background === "brand" || section.background === "aurora";

  if (section.variant === "split") {
    return (
      <SectionShell section={section}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading eyebrow={section.eyebrow} title={section.title} invert={invert} />
            <Paragraphs body={section.body} />
            {section.cta && (
              <div className="mt-6">
                <CtaButton cta={section.cta} invert={invert} />
              </div>
            )}
          </div>
          {section.image && (
            <img
              src={section.image.src}
              alt={section.image.alt}
              className="rounded-[var(--site-radius)] object-cover w-full aspect-[4/3] shadow-xl"
            />
          )}
        </div>
      </SectionShell>
    );
  }

  if (section.variant === "two-column") {
    const halves = section.body.split(/\n\n+/);
    const mid = Math.ceil(halves.length / 2);
    return (
      <SectionShell section={section}>
        <SectionHeading eyebrow={section.eyebrow} title={section.title} subtitle={section.subtitle} align="center" invert={invert} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <Paragraphs body={halves.slice(0, mid).join("\n\n")} />
          <Paragraphs body={halves.slice(mid).join("\n\n")} />
        </div>
      </SectionShell>
    );
  }

  // centered
  return (
    <SectionShell section={section}>
      <div className="max-w-3xl mx-auto">
        <SectionHeading eyebrow={section.eyebrow} title={section.title} subtitle={section.subtitle} align="center" invert={invert} />
        <Paragraphs body={section.body} />
        {section.cta && (
          <div className="mt-8 text-center">
            <CtaButton cta={section.cta} invert={invert} />
          </div>
        )}
      </div>
    </SectionShell>
  );
}
