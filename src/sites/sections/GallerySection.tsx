import type { GallerySection as GallerySectionType } from "../types";
import { SectionShell, SectionHeading } from "./SectionShell";
import { cn } from "@/lib/utils";

export function GallerySection({ section }: { section: GallerySectionType }) {
  const cols = section.columns ?? 3;
  const gridCols = cols === 2 ? "sm:grid-cols-2" : cols === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3";
  const invert = section.background === "brand" || section.background === "aurora";

  return (
    <SectionShell section={section}>
      <SectionHeading eyebrow={section.eyebrow} title={section.title} subtitle={section.subtitle} align="center" invert={invert} />

      {section.variant === "grid" && (
        <div className={cn("grid grid-cols-1 gap-4", gridCols)}>
          {section.items.map((it, i) => (
            <figure key={i} className="group relative overflow-hidden rounded-[var(--site-radius)] aspect-[4/3]">
              <img
                src={it.src}
                alt={it.alt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {it.caption && (
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-sm text-white">
                  {it.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}

      {section.variant === "masonry" && (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [&>*]:mb-4">
          {section.items.map((it, i) => (
            <figure key={i} className="overflow-hidden rounded-[var(--site-radius)] break-inside-avoid">
              <img src={it.src} alt={it.alt} className="w-full h-auto object-cover" />
              {it.caption && <figcaption className="p-3 text-xs text-[hsl(var(--site-text-muted))]">{it.caption}</figcaption>}
            </figure>
          ))}
        </div>
      )}

      {section.variant === "carousel" && (
        <div className="-mx-6 px-6 overflow-x-auto scrollbar-none">
          <div className="flex gap-4 snap-x snap-mandatory">
            {section.items.map((it, i) => (
              <figure key={i} className="snap-start shrink-0 w-[80%] sm:w-[45%] lg:w-[32%] overflow-hidden rounded-[var(--site-radius)] aspect-[4/3]">
                <img src={it.src} alt={it.alt} className="h-full w-full object-cover" />
              </figure>
            ))}
          </div>
        </div>
      )}
    </SectionShell>
  );
}
