// =====================================================================
// EdPlix Website Engine — Type system
// CMS-driven, section-based, themeable. All school sites are JSON-driven.
// =====================================================================

export type SectionSpacing = "sm" | "md" | "lg" | "xl";
export type SectionWidth = "contained" | "full";

/** Theme tokens injected as CSS variables on each site root. */
export interface SiteTheme {
  /** HSL triplet strings, e.g. "152 82% 22%". Injected into --site-* vars. */
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textMuted: string;
  fontDisplay?: string; // CSS font-family value
  fontBody?: string;
  radius?: string; // e.g. "0.875rem"
}

/** Reusable content blocks used inside sections. */
export interface CtaBlock {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
}
export interface ImageBlock {
  src: string;
  alt: string;
}
export interface FeatureItem {
  icon?: string; // lucide icon name
  title: string;
  description?: string;
  href?: string;
}
export interface StatItem {
  value: string;
  label: string;
  hint?: string;
}
export interface GalleryItem extends ImageBlock {
  caption?: string;
}
export interface ContactDetail {
  type: "phone" | "email" | "address" | "hours";
  label: string;
  value: string;
}

/** Common props every section accepts. */
export interface SectionBase {
  id: string;
  spacing?: SectionSpacing;
  width?: SectionWidth;
  background?: "default" | "muted" | "brand" | "aurora";
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

// ---- Concrete section variants -------------------------------------------

export interface HeroSection extends SectionBase {
  type: "hero";
  variant: "centered" | "split" | "image-bg";
  image?: ImageBlock;
  primaryCta?: CtaBlock;
  secondaryCta?: CtaBlock;
}

export interface FeaturesSection extends SectionBase {
  type: "features";
  variant: "grid" | "icon-list" | "minimal-list";
  columns?: 2 | 3 | 4;
  items: FeatureItem[];
}

export interface TextSection extends SectionBase {
  type: "text";
  variant: "centered" | "split" | "two-column";
  body: string; // markdown-lite (paragraphs separated by \n\n)
  image?: ImageBlock;
  cta?: CtaBlock;
}

export interface GallerySection extends SectionBase {
  type: "gallery";
  variant: "grid" | "masonry" | "carousel";
  columns?: 2 | 3 | 4;
  items: GalleryItem[];
}

export interface StatsSection extends SectionBase {
  type: "stats";
  variant: "inline" | "cards" | "split";
  items: StatItem[];
  image?: ImageBlock;
}

export interface CtaSection extends SectionBase {
  type: "cta";
  variant: "banner" | "centered" | "split";
  primaryCta: CtaBlock;
  secondaryCta?: CtaBlock;
  image?: ImageBlock;
}

export interface ContactSection extends SectionBase {
  type: "contact";
  variant: "split" | "stacked" | "cards";
  details: ContactDetail[];
  showForm?: boolean;
  mapEmbedUrl?: string;
}

export type Section =
  | HeroSection
  | FeaturesSection
  | TextSection
  | GallerySection
  | StatsSection
  | CtaSection
  | ContactSection;

export interface SitePage {
  slug: string; // "" for home, "about", "admissions", "contact"
  title: string;
  metaDescription?: string;
  sections: Section[];
}

export interface SiteNavItem {
  label: string;
  href: string;
}

export interface SiteIdentity {
  name: string;
  shortName?: string;
  motto?: string;
  logoText?: string; // initials fallback
  logoSrc?: string;
}

export interface SchoolSite {
  slug: string;
  identity: SiteIdentity;
  theme: SiteTheme;
  nav: SiteNavItem[];
  footer: {
    tagline?: string;
    columns: { title: string; links: SiteNavItem[] }[];
    socials?: { type: "facebook" | "instagram" | "twitter" | "youtube"; href: string }[];
  };
  pages: SitePage[];
}
