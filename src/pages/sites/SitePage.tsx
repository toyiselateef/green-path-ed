import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getSite } from "@/sites/data/sites";
import { SiteShell } from "@/sites/SiteShell";
import { SectionList } from "@/sites/SectionRenderer";
import NotFound from "@/pages/NotFound";

/** Generic renderer for any /:slug/* route. The page slug is matched from the URL. */
export default function SitePage() {
  const { slug = "", "*": rest = "" } = useParams();
  const site = getSite(slug);
  if (!site) return <NotFound />;

  const pageSlug = rest || "";
  const page = site.pages.find((p) => p.slug === pageSlug);
  if (!page) return <NotFound />;

  useEffect(() => {
    const prev = document.title;
    document.title = `${page.title} · ${site.identity.name}`;
    return () => {
      document.title = prev;
    };
  }, [page.title, site.identity.name]);

  return (
    <SiteShell site={site}>
      <SectionList sections={page.sections} />
    </SiteShell>
  );
}
