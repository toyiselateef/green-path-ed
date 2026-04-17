import { Link } from "react-router-dom";
import { Search, Plus, Filter, Download, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/badge";

const students = [
  { name: "Adewale Johnson", adm: "BHS/2023/041", cls: "JSS2A", parent: "Mr. Tunde Johnson", phone: "+234 803 145 7821", status: "Active" },
  { name: "Aisha Bello", adm: "BHS/2024/118", cls: "JSS1B", parent: "Mrs. Hauwa Bello", phone: "+234 802 998 1245", status: "Active" },
  { name: "Chinedu Okafor", adm: "BHS/2022/009", cls: "SSS1A", parent: "Mr. Emeka Okafor", phone: "+234 706 332 0098", status: "Active" },
  { name: "Zainab Suleiman", adm: "BHS/2025/204", cls: "Primary 5A", parent: "Mrs. Amina Suleiman", phone: "+234 813 442 0011", status: "Active" },
  { name: "Tunde Bakare", adm: "BHS/2021/077", cls: "SSS3B", parent: "Mr. Olu Bakare", phone: "+234 805 110 2233", status: "Active" },
  { name: "Ifeoma Eze", adm: "BHS/2023/156", cls: "JSS3A", parent: "Mrs. Ngozi Eze", phone: "+234 802 444 7711", status: "Inactive" },
  { name: "Yusuf Garba", adm: "BHS/2024/189", cls: "JSS1A", parent: "Mr. Sani Garba", phone: "+234 808 776 1144", status: "Active" },
  { name: "Blessing Okoro", adm: "BHS/2022/044", cls: "SSS2A", parent: "Mrs. Joy Okoro", phone: "+234 803 005 8899", status: "Active" },
];

const Students = () => {
  return (
    <AppLayout>
      <PageHeader
        title="Students"
        subtitle="342 active students · 18 inactive"
        badge="Roster"
        actions={
          <>
            <button className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 h-10 text-sm font-medium text-foreground hover:bg-muted transition">
              <Download className="h-4 w-4" /> Export
            </button>
            <Link
              to="/students/new"
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-brand px-4 h-10 text-sm font-semibold text-white shadow-md-soft hover:shadow-glow transition-all"
            >
              <Plus className="h-4 w-4" /> Add Student
            </Link>
          </>
        }
      />

      <div className="rounded-2xl bg-card border border-border shadow-sm-soft overflow-hidden animate-fade-in-up">
        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-3 p-4 border-b border-border">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search by name or admission number…"
              className="h-10 w-full rounded-xl border border-input bg-background pl-10 pr-3 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/15 transition"
            />
          </div>
          <select className="h-10 rounded-xl border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:border-accent">
            <option>All Classes</option>
            <option>JSS1A</option><option>JSS2A</option><option>SSS1A</option>
          </select>
          <div className="inline-flex rounded-xl border border-input bg-background p-1 text-xs font-medium">
            <button className="px-3 py-1.5 rounded-lg bg-gradient-brand text-white shadow-sm-soft">Active</button>
            <button className="px-3 py-1.5 rounded-lg text-muted-foreground hover:text-foreground transition">Inactive</button>
          </div>
          <button className="inline-flex items-center gap-1.5 rounded-xl border border-input bg-background px-3 h-10 text-sm font-medium text-foreground hover:bg-muted transition">
            <Filter className="h-4 w-4" /> More filters
          </button>
          <span className="ml-auto text-xs text-muted-foreground">Showing <span className="font-semibold text-foreground">8</span> of 342</span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground border-b border-border bg-muted/40">
                <th className="py-3 px-5 w-10"><input type="checkbox" className="rounded border-input accent-[hsl(var(--accent))]" /></th>
                <th className="py-3 px-3 font-semibold">Student</th>
                <th className="py-3 px-3 font-semibold">Class</th>
                <th className="py-3 px-3 font-semibold">Parent / Guardian</th>
                <th className="py-3 px-3 font-semibold">Status</th>
                <th className="py-3 px-5 w-12 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => (
                <tr key={s.adm} className={`border-b border-border last:border-0 hover:bg-muted/40 transition group ${i % 2 ? "bg-secondary/40" : ""}`}>
                  <td className="py-4 px-5"><input type="checkbox" className="rounded border-input accent-[hsl(var(--accent))]" /></td>
                  <td className="py-4 px-3">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-brand text-xs font-bold text-white shadow-sm-soft">
                        {s.name.split(" ").map(w => w[0]).slice(0, 2).join("")}
                      </span>
                      <div>
                        <p className="font-semibold text-foreground">{s.name}</p>
                        <p className="text-[11px] text-muted-foreground">{s.adm}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-3">
                    <span className="inline-flex rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] font-semibold text-foreground">{s.cls}</span>
                  </td>
                  <td className="py-4 px-3">
                    <p className="text-foreground">{s.parent}</p>
                    <p className="text-[11px] text-muted-foreground">{s.phone}</p>
                  </td>
                  <td className="py-4 px-3">
                    <Badge variant="outline" className={`border ${s.status === "Active" ? "badge-soft-green" : "badge-soft-gray"}`}>
                      <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${s.status === "Active" ? "bg-accent" : "bg-muted-foreground"}`} />
                      {s.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <button className="inline-grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition opacity-0 group-hover:opacity-100">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-t border-border bg-muted/20">
          <div className="text-xs text-muted-foreground">
            Rows per page:
            <select className="ml-2 rounded-md border border-input bg-background px-2 py-1 text-xs">
              <option>50</option><option>25</option><option>10</option>
            </select>
          </div>
          <div className="flex items-center gap-1">
            <button className="grid h-8 w-8 place-items-center rounded-lg border border-input text-muted-foreground hover:bg-muted disabled:opacity-50" disabled><ChevronLeft className="h-4 w-4" /></button>
            {[1, 2, 3, 4, 7].map((p, i) => (
              <button key={i} className={`grid h-8 min-w-[2rem] place-items-center rounded-lg px-2 text-xs font-semibold transition ${p === 1 ? "bg-gradient-brand text-white shadow-sm-soft" : "text-foreground hover:bg-muted"}`}>
                {p === 7 ? "…" : p}
              </button>
            ))}
            <button className="grid h-8 w-8 place-items-center rounded-lg border border-input text-foreground hover:bg-muted"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Students;
