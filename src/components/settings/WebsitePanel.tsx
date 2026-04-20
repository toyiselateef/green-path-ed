import { useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Palette, Layers, Eye, Code2, Check } from "lucide-react";
import { toast } from "sonner";
import { sites } from "@/sites/data/sites";
import { themePresets, themeToStyle } from "@/sites/theme";
import type { SchoolSite, SiteTheme } from "@/sites/types";
import { cn } from "@/lib/utils";

const sectionTypeMeta: Record<string, { label: string; color: string }> = {
  hero: { label: "Hero", color: "bg-[hsl(var(--site-primary)/0.12)] text-[hsl(var(--site-primary))]" },
  features: { label: "Features", color: "bg-[hsl(var(--site-accent)/0.12)] text-[hsl(var(--site-accent))]" },
  text: { label: "Text", color: "bg-muted text-foreground" },
  gallery: { label: "Gallery", color: "bg-muted text-foreground" },
  stats: { label: "Stats", color: "bg-muted text-foreground" },
  cta: { label: "CTA", color: "bg-muted text-foreground" },
  contact: { label: "Contact", color: "bg-muted text-foreground" },
};

export function WebsitePanel() {
  const slugs = Object.keys(sites);
  const [activeSlug, setActiveSlug] = useState(slugs[0]);
  const [pageIdx, setPageIdx] = useState(0);
  const [themeKey, setThemeKey] = useState<keyof typeof themePresets>("forest");
  const [showJson, setShowJson] = useState(false);

  const baseSite = sites[activeSlug];
  // Apply preset override for live theme preview without mutating source data.
  const site: SchoolSite = { ...baseSite, theme: themePresets[themeKey] ?? baseSite.theme };
  const page = site.pages[pageIdx];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="font-display text-lg font-bold">School Website</h2>
            <p className="text-sm text-muted-foreground mt-1">
              CMS-driven, section-based site that updates the moment you publish. Same engine, different theme per school.
            </p>
          </div>
          <Link
            to={`/${activeSlug}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-brand text-white px-4 h-10 text-sm font-semibold shadow-md-soft hover:shadow-glow transition"
          >
            <ExternalLink className="h-4 w-4" /> Open live site
          </Link>
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <SelectField label="School" value={activeSlug} onChange={(v) => { setActiveSlug(v); setPageIdx(0); }} options={slugs} />
          <SelectField
            label="Page"
            value={String(pageIdx)}
            onChange={(v) => setPageIdx(Number(v))}
            options={site.pages.map((_, i) => String(i))}
            renderOption={(v) => site.pages[Number(v)].title}
          />
          <SelectField
            label="Theme preset"
            value={themeKey as string}
            onChange={(v) => setThemeKey(v as keyof typeof themePresets)}
            options={Object.keys(themePresets)}
          />
        </div>
      </div>

      <ThemePreview theme={themePresets[themeKey]} />

      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold flex items-center gap-2"><Layers className="h-4 w-4 text-accent" /> Sections on “{page.title}”</h3>
          <span className="text-xs text-muted-foreground">{page.sections.length} sections</span>
        </div>
        <div className="space-y-2">
          {page.sections.map((s, i) => {
            const meta = sectionTypeMeta[s.type];
            return (
              <div key={s.id} className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background p-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-muted text-xs font-mono">{i + 1}</span>
                  <span className={cn("rounded-md px-2 py-0.5 text-[11px] font-semibold", meta?.color ?? "bg-muted")}>
                    {meta?.label ?? s.type}
                  </span>
                  <span className="text-sm font-medium truncate">{s.title ?? s.eyebrow ?? s.id}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <code className="text-[10px] text-muted-foreground hidden sm:inline">{s.variant}</code>
                  <a
                    href={`/${activeSlug}${page.slug ? `/${page.slug}` : ""}#${s.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="grid h-7 w-7 place-items-center rounded-md hover:bg-muted text-muted-foreground"
                  >
                    <Eye className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold flex items-center gap-2"><Code2 className="h-4 w-4 text-accent" /> Page JSON</h3>
          <button onClick={() => setShowJson(!showJson)} className="text-xs font-semibold text-primary hover:underline">
            {showJson ? "Hide" : "View"}
          </button>
        </div>
        <p className="text-sm text-muted-foreground">All page content is driven by structured JSON. The same renderer powers every school.</p>
        {showJson && (
          <pre className="mt-4 max-h-80 overflow-auto rounded-xl bg-muted/50 p-4 text-[11px] leading-relaxed">
            {JSON.stringify(page, null, 2)}
          </pre>
        )}
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-sm font-semibold">Apply this theme to {site.identity.name}</p>
          <p className="text-xs text-muted-foreground">Saves the preset as the school's live theme. Visitors see the change immediately.</p>
        </div>
        <button
          onClick={() => toast.success(`Theme “${themeKey}” applied to ${site.identity.name}`)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-brand text-white px-4 h-10 text-sm font-semibold shadow-md-soft hover:shadow-glow transition"
        >
          <Check className="h-4 w-4" /> Save theme
        </button>
      </div>
    </div>
  );
}

function SelectField({
  label, value, onChange, options, renderOption,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  renderOption?: (v: string) => string;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold mb-1.5">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm capitalize focus:outline-none focus:ring-2 focus:ring-ring/40"
      >
        {options.map((o) => (
          <option key={o} value={o}>{renderOption ? renderOption(o) : o}</option>
        ))}
      </select>
    </label>
  );
}

function ThemePreview({ theme }: { theme: SiteTheme }) {
  const swatches: { key: keyof SiteTheme; label: string }[] = [
    { key: "primary", label: "Primary" },
    { key: "accent", label: "Accent" },
    { key: "background", label: "Background" },
    { key: "surface", label: "Surface" },
    { key: "text", label: "Text" },
    { key: "secondary", label: "Secondary" },
  ];
  return (
    <div className="rounded-2xl border border-border bg-card p-6" style={themeToStyle(theme)}>
      <div className="flex items-center gap-2 mb-4">
        <Palette className="h-4 w-4 text-[hsl(var(--site-accent))]" />
        <h3 className="font-semibold text-foreground">Theme tokens (live preview)</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {swatches.map((s) => (
          <div key={s.key} className="rounded-xl border border-border overflow-hidden bg-background">
            <div className="h-14" style={{ background: `hsl(${theme[s.key]})` }} />
            <div className="p-2.5">
              <p className="text-[11px] font-semibold text-foreground">{s.label}</p>
              <p className="text-[10px] font-mono text-muted-foreground truncate">{String(theme[s.key])}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-xl p-5" style={{ background: `hsl(${theme.surface})`, color: `hsl(${theme.text})` }}>
        <p className="text-xs uppercase tracking-wider" style={{ color: `hsl(${theme.textMuted})` }}>Sample card</p>
        <h4 className="mt-1 text-xl font-bold" style={{ fontFamily: "var(--site-font-display)" }}>Where curiosity meets discipline.</h4>
        <button
          className="mt-3 inline-flex items-center gap-2 h-9 px-4 rounded-lg text-white text-xs font-semibold"
          style={{ background: `linear-gradient(135deg, hsl(${theme.primary}), hsl(${theme.accent}))` }}
        >
          Apply now
        </button>
      </div>
    </div>
  );
}
