import { ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";
import type { SchoolSite } from "./types";
import { themeToStyle } from "./theme";
import { cn } from "@/lib/utils";

/** Wraps every school site page with theme injection, header & footer. */
export function SiteShell({ site, children }: { site: SchoolSite; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { slug } = useParams();
  const base = `/${slug ?? site.slug}`;

  return (
    <div style={themeToStyle(site.theme)} className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 backdrop-blur bg-[hsl(var(--site-background)/0.85)] border-b border-[hsl(var(--site-text)/0.08)]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
          <Link to={base} className="flex items-center gap-2.5 shrink-0">
            <span
              className="grid h-9 w-9 place-items-center rounded-lg text-white text-sm font-bold"
              style={{ background: "linear-gradient(135deg, hsl(var(--site-primary)), hsl(var(--site-accent)))" }}
            >
              {site.identity.logoText ?? site.identity.name.slice(0, 1)}
            </span>
            <span className="font-bold text-base" style={{ fontFamily: "var(--site-font-display)" }}>
              {site.identity.shortName ?? site.identity.name}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-sm">
            {site.nav.map((n) => (
              <Link
                key={n.href}
                to={`${base}${n.href}`}
                className="text-[hsl(var(--site-text))] hover:text-[hsl(var(--site-primary))] transition"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Link
              to="/parent"
              className="h-9 px-3 inline-flex items-center rounded-[var(--site-radius)] text-sm font-semibold text-[hsl(var(--site-primary))] hover:bg-[hsl(var(--site-secondary))]"
            >
              Parent Login
            </Link>
            <Link
              to={`${base}/admissions`}
              className="h-9 px-4 inline-flex items-center rounded-[var(--site-radius)] text-white text-sm font-semibold shadow-sm hover:shadow-md transition"
              style={{ background: "linear-gradient(135deg, hsl(var(--site-primary)), hsl(var(--site-accent)))" }}
            >
              Apply
            </Link>
          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden grid place-items-center h-9 w-9 rounded-lg border border-[hsl(var(--site-text)/0.1)]">
            <Menu className="h-4 w-4" />
          </button>
        </div>
        {open && (
          <div className="md:hidden border-t border-[hsl(var(--site-text)/0.08)] px-6 py-4 space-y-2">
            {site.nav.map((n) => (
              <Link key={n.href} to={`${base}${n.href}`} onClick={() => setOpen(false)} className="block py-2 text-sm">
                {n.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-[hsl(var(--site-secondary))] border-t border-[hsl(var(--site-text)/0.08)]">
        <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5">
              <span
                className="grid h-9 w-9 place-items-center rounded-lg text-white text-sm font-bold"
                style={{ background: "linear-gradient(135deg, hsl(var(--site-primary)), hsl(var(--site-accent)))" }}
              >
                {site.identity.logoText ?? site.identity.name.slice(0, 1)}
              </span>
              <span className="font-bold" style={{ fontFamily: "var(--site-font-display)" }}>
                {site.identity.name}
              </span>
            </div>
            {site.footer.tagline && (
              <p className="mt-4 text-sm text-[hsl(var(--site-text-muted))] leading-relaxed">{site.footer.tagline}</p>
            )}
          </div>
          {site.footer.columns.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--site-text-muted))] mb-4">{col.title}</p>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link to={l.href.startsWith("/") ? l.href : `${base}${l.href}`} className="text-sm hover:text-[hsl(var(--site-primary))]">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={cn("border-t border-[hsl(var(--site-text)/0.08)] py-5 text-center text-xs text-[hsl(var(--site-text-muted))]")}>
          © {new Date().getFullYear()} {site.identity.name} · Powered by EdPlix
        </div>
      </footer>
    </div>
  );
}
