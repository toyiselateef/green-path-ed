import { useState } from "react";
import { Search, Filter, Eye, Pause, CreditCard, MoreHorizontal, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { SuperAdminLayout } from "@/components/layout/SuperAdminLayout";
import { PageHeader } from "@/components/layout/PageHeader";

type Plan = "Free" | "Starter" | "Growth" | "Enterprise";

const schools: { name: string; slug: string; plan: Plan; students: number; lastActive: string }[] = [
  { name: "Bright Stars Academy", slug: "bright-stars", plan: "Growth", students: 412, lastActive: "2 min ago" },
  { name: "Greenfield College", slug: "greenfield", plan: "Enterprise", students: 1284, lastActive: "Just now" },
  { name: "Sunrise Montessori", slug: "sunrise", plan: "Starter", students: 96, lastActive: "1h ago" },
  { name: "Royal Heights School", slug: "royal-heights", plan: "Growth", students: 540, lastActive: "3h ago" },
  { name: "Premier International", slug: "premier-intl", plan: "Free", students: 38, lastActive: "2d ago" },
  { name: "Crescent Academy", slug: "crescent", plan: "Enterprise", students: 1620, lastActive: "Just now" },
  { name: "Morning Glory School", slug: "morning-glory", plan: "Starter", students: 142, lastActive: "5h ago" },
];

const planTone: Record<Plan, string> = {
  Free: "badge-soft-gray",
  Starter: "badge-soft-blue",
  Growth: "badge-soft-green",
  Enterprise: "bg-gradient-brand text-white border-transparent",
};

const AdminSchools = () => {
  const [filter, setFilter] = useState<Plan | "All">("All");
  const [search, setSearch] = useState("");

  const filtered = schools.filter(s =>
    (filter === "All" || s.plan === filter) &&
    (s.name.toLowerCase().includes(search.toLowerCase()) || s.slug.includes(search.toLowerCase()))
  );

  return (
    <SuperAdminLayout>
      <PageHeader
        title="Schools"
        subtitle="Every school onboarded on the EdPlix platform."
        badge={`${schools.length} total`}
        actions={
          <Link to="/admin/schools/new" className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-brand px-4 h-10 text-sm font-semibold text-white shadow-md hover:shadow-glow transition-all">
            <Plus className="h-4 w-4" /> Onboard school
          </Link>
        }
      />

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by school name or slug…"
            className="h-11 w-full rounded-xl border border-input bg-card pl-10 pr-3 text-sm focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/15 transition"
          />
        </div>
        <div className="inline-flex rounded-xl border border-input bg-card p-1">
          {(["All", "Free", "Starter", "Growth", "Enterprise"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setFilter(p)}
              className={`px-3.5 h-9 rounded-lg text-xs font-semibold transition ${
                filter === p ? "bg-gradient-brand text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40">
              <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3 font-semibold">School</th>
                <th className="px-5 py-3 font-semibold">Slug</th>
                <th className="px-5 py-3 font-semibold">Plan</th>
                <th className="px-5 py-3 font-semibold">Students</th>
                <th className="px-5 py-3 font-semibold">Last active</th>
                <th className="px-5 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((s) => (
                <tr key={s.slug} className="hover:bg-muted/30 transition">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-brand text-xs font-bold text-white shadow-sm">
                        {s.name.split(" ").map(w => w[0]).slice(0, 2).join("")}
                      </span>
                      <span className="font-medium text-foreground">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5"><code className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-md">{s.slug}</code></td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${planTone[s.plan]}`}>{s.plan}</span>
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">{s.students.toLocaleString()}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{s.lastActive}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      <button className="grid h-8 w-8 place-items-center rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition" title="View">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="grid h-8 w-8 place-items-center rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition" title="Edit Plan">
                        <CreditCard className="h-4 w-4" />
                      </button>
                      <button className="grid h-8 w-8 place-items-center rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition" title="Suspend">
                        <Pause className="h-4 w-4" />
                      </button>
                      <button className="grid h-8 w-8 place-items-center rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="p-12 text-center text-sm text-muted-foreground">No schools match your filters.</div>
        )}
      </div>
    </SuperAdminLayout>
  );
};

export default AdminSchools;
