import type { Section } from "./types";
import { HeroSection } from "./sections/HeroSection";
import { FeaturesSection } from "./sections/FeaturesSection";
import { TextSection } from "./sections/TextSection";
import { GallerySection } from "./sections/GallerySection";
import { StatsSection } from "./sections/StatsSection";
import { CtaSection } from "./sections/CtaSection";
import { ContactSection } from "./sections/ContactSection";

/** Section registry — single switch keeps the engine extensible. */
export function SectionRenderer({ section }: { section: Section }) {
  switch (section.type) {
    case "hero":
      return <HeroSection section={section} />;
    case "features":
      return <FeaturesSection section={section} />;
    case "text":
      return <TextSection section={section} />;
    case "gallery":
      return <GallerySection section={section} />;
    case "stats":
      return <StatsSection section={section} />;
    case "cta":
      return <CtaSection section={section} />;
    case "contact":
      return <ContactSection section={section} />;
    default:
      return null;
  }
}

export function SectionList({ sections }: { sections: Section[] }) {
  return (
    <>
      {sections.map((s) => (
        <SectionRenderer key={s.id} section={s} />
      ))}
    </>
  );
}
