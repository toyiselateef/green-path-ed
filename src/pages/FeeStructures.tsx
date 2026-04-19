import { useState } from "react";
import { Plus, ChevronDown, FileText, Sparkles, Trash2 } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";

const initialCategories = ["School Fees", "Development Levy", "PTA Levy", "Sports Levy", "Exam Fees", "Uniform"];
const classes = ["JSS1A", "JSS1B", "JSS2A", "JSS2B", "JSS3A", "JSS3B", "SSS1A", "SSS1B", "SSS2A", "SSS2B", "SSS3A", "SSS3B"];

const seed: Record<string, Record<string, number>> = {
  "School Fees": { JSS1A: 85000, JSS1B: 85000, JSS2A: 90000, JSS2B: 90000, JSS3A: 95000, JSS3B: 95000, SSS1A: 110000, SSS1B: 110000, SSS2A: 115000, SSS2B: 115000, SSS3A: 125000, SSS3B: 125000 },
  "Development Levy": { JSS1A: 15000, JSS2A: 15000, JSS3A: 15000, SSS1A: 20000, SSS2A: 20000, SSS3A: 20000 },
  "PTA Levy": { JSS1A: 5000, JSS1B: 5000, JSS2A: 5000, JSS2B: 5000, JSS3A: 5000, JSS3B: 5000, SSS1A: 5000, SSS1B: 5000, SSS2A: 5000, SSS2B: 5000, SSS3A: 5000, SSS3B: 5000 },
  "Sports Levy": { JSS1A: 3000, JSS2A: 3000, SSS1A: 4000 },
  "Exam Fees": { SSS3A: 25000, SSS3B: 25000 },
  "Uniform": {},
};

const fmt = (n: number) => "₦" + n.toLocaleString();

const FeeStructures = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [activeCat, setActiveCat] = useState(initialCategories[0]);
  const [data, setData] = useState(seed);
  const [editing, setEditing] = useState<{ cat: string; cls: string } | null>(null);
  const [newCat, setNewCat] = useState("");

  const setCell = (cat: string, cls: string, val: number | null) => {
    setData((d) => {
      const next = { ...d, [cat]: { ...(d[cat] || {}) } };
      if (val === null || val === 0) delete next[cat][cls];
      else next[cat][cls] = val;
      return next;
    });
  };

  const totalCells = Object.values(data).reduce((sum, row) => sum + Object.keys(row).length, 0);
  const totalAmount = Object.values(data).reduce((sum, row) => sum + Object.values(row).reduce((s, v) => s + v, 0), 0);

  return (
    <AppLayout>
      <PageHeader
        title="Fee Structures"
        subtitle="Set how much each class pays for every fee category this term."
        badge="Finance"
        actions={
          <>
            <div className="relative">
              <select className="h-10 rounded-xl border border-input bg-card pl-3.5 pr-10 text-sm font-medium focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/15 transition appearance-none">
                <option>First Term — 2025/2026</option>
                <option>Second Term — 2025/2026</option>
                <option>Third Term — 2025/2026</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            <button className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-brand px-4 h-10 text-sm font-semibold text-white shadow-md hover:shadow-glow transition-all">
              <Plus className="h-4 w-4" /> Add Structure
            </button>
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-5">
        {/* Categories sidebar */}
        <aside className="rounded-2xl border border-border bg-card p-3 h-fit">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground px-2 py-2">Fee Categories</p>
          <ul className="space-y-1">
            {categories.map((c) => {
              const count = Object.keys(data[c] || {}).length;
              return (
                <li key={c}>
                  <button
                    onClick={() => setActiveCat(c)}
                    className={`group w-full flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition text-left ${
                      activeCat === c ? "bg-gradient-brand text-white shadow-sm" : "text-foreground hover:bg-muted"
                    }`}
                  >
                    <span className="truncate">{c}</span>
                    <span className={`text-[10px] font-semibold rounded-full px-1.5 py-0.5 ${activeCat === c ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"}`}>{count}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="border-t border-border mt-3 pt-3">
            <div className="flex gap-1.5">
              <input
                value={newCat}
                onChange={(e) => setNewCat(e.target.value)}
                placeholder="New category"
                className="h-9 flex-1 min-w-0 rounded-lg border border-input bg-background px-2.5 text-xs focus:outline-none focus:border-accent transition"
              />
              <button
                onClick={() => { if (newCat.trim()) { setCategories([...categories, newCat.trim()]); setNewCat(""); } }}
                className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-brand text-white hover:shadow-glow transition"
                aria-label="Add"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </aside>

        {/* Matrix */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div>
              <h3 className="font-display text-base font-semibold text-foreground">Fee Matrix</h3>
              <p className="text-xs text-muted-foreground">Click any cell to edit. Press Enter to save, Esc to cancel.</p>
            </div>
            <div className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">{totalCells}</span> rules · <span className="font-semibold text-foreground">{fmt(totalAmount)}</span> total
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-separate border-spacing-0">
              <thead>
                <tr>
                  <th className="sticky left-0 z-10 bg-card text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground border-b border-border min-w-[180px]">
                    Category
                  </th>
                  {classes.map((c) => (
                    <th key={c} className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground border-b border-border min-w-[100px] text-center">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {categories.map((cat, rIdx) => (
                  <tr key={cat} className={rIdx % 2 === 0 ? "bg-muted/20" : "bg-card"}>
                    <td className={`sticky left-0 z-10 px-4 py-2.5 font-medium text-foreground border-b border-border ${rIdx % 2 === 0 ? "bg-muted/40" : "bg-card"} ${activeCat === cat ? "border-l-2 border-l-accent" : ""}`}>
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-accent" />
                        {cat}
                      </div>
                    </td>
                    {classes.map((cls) => {
                      const val = data[cat]?.[cls];
                      const isEditing = editing?.cat === cat && editing?.cls === cls;
                      return (
                        <td key={cls} className="px-1.5 py-1 border-b border-border text-center group">
                          {isEditing ? (
                            <input
                              autoFocus
                              type="number"
                              defaultValue={val ?? ""}
                              onBlur={(e) => { setCell(cat, cls, e.target.value ? Number(e.target.value) : null); setEditing(null); }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") { setCell(cat, cls, (e.target as HTMLInputElement).value ? Number((e.target as HTMLInputElement).value) : null); setEditing(null); }
                                if (e.key === "Escape") setEditing(null);
                              }}
                              className="h-9 w-full rounded-lg border-2 border-accent bg-background px-2 text-sm font-medium text-center focus:outline-none focus:ring-4 focus:ring-accent/20"
                            />
                          ) : (
                            <button
                              onClick={() => setEditing({ cat, cls })}
                              className={`h-9 w-full rounded-lg text-xs font-medium transition ${
                                val
                                  ? "text-foreground hover:bg-accent/10 hover:ring-2 hover:ring-accent/30"
                                  : "text-muted-foreground/40 hover:text-accent hover:bg-accent/5"
                              }`}
                            >
                              {val ? fmt(val) : (
                                <span className="inline-flex items-center gap-1 opacity-50 group-hover:opacity-100 transition">
                                  — <Plus className="h-2.5 w-2.5" />
                                </span>
                              )}
                            </button>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Generate invoices CTA */}
      <div className="mt-6 relative overflow-hidden rounded-2xl bg-gradient-brand text-white p-6 shadow-elegant">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-accent/30 blur-3xl" />
        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15 backdrop-blur-md ring-1 ring-white/20">
              <FileText className="h-6 w-6" />
            </span>
            <div>
              <h3 className="font-display text-xl font-bold">Generate invoices for this term</h3>
              <p className="text-sm text-white/80 mt-1">
                <span className="font-semibold">{totalCells}</span> fee rules will create invoices for <span className="font-semibold">{classes.length}</span> classes — totalling <span className="font-semibold">{fmt(totalAmount)}</span> per student max.
              </p>
            </div>
          </div>
          <button className="inline-flex items-center gap-1.5 rounded-xl bg-white text-primary px-5 h-11 text-sm font-bold shadow-lg hover:bg-white/90 transition">
            <Sparkles className="h-4 w-4" /> Generate Invoices
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

export default FeeStructures;
