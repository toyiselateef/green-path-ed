import { useState } from "react";
import { Save, Eraser, Download } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";

interface Row { name: string; adm: string; ca1: number | ""; ca2: number | ""; exam: number | ""; remark: string }

const initial: Row[] = [
  { name: "Adewale Johnson", adm: "BHS/2023/041", ca1: 25, ca2: 27, exam: 35, remark: "Excellent" },
  { name: "Aisha Bello", adm: "BHS/2024/118", ca1: 22, ca2: 24, exam: 32, remark: "Very good" },
  { name: "Chinedu Okafor", adm: "BHS/2022/009", ca1: 18, ca2: 20, exam: 28, remark: "Good" },
  { name: "Zainab Suleiman", adm: "BHS/2025/204", ca1: 15, ca2: 18, exam: 22, remark: "Fair" },
  { name: "Tunde Bakare", adm: "BHS/2021/077", ca1: 28, ca2: 29, exam: 38, remark: "Outstanding" },
  { name: "Ifeoma Eze", adm: "BHS/2023/156", ca1: 20, ca2: 22, exam: 30, remark: "Good" },
  { name: "Yusuf Garba", adm: "BHS/2024/189", ca1: "", ca2: "", exam: "", remark: "" },
  { name: "Blessing Okoro", adm: "BHS/2022/044", ca1: "", ca2: "", exam: "", remark: "" },
];

const grade = (t: number) => t >= 75 ? "A" : t >= 65 ? "B" : t >= 55 ? "C" : t >= 45 ? "D" : t >= 40 ? "E" : "F";
const gradeColor = (g: string) =>
  g === "A" ? "badge-soft-green" : g === "B" ? "badge-soft-blue" : g === "C" || g === "D" ? "badge-soft-amber" : "badge-soft-red";

const Results = () => {
  const [rows, setRows] = useState<Row[]>(initial);
  const update = (i: number, k: keyof Row, v: any) => {
    setRows(prev => prev.map((r, idx) => idx === i ? { ...r, [k]: v } : r));
  };
  const filled = rows.filter(r => r.ca1 !== "" && r.ca2 !== "" && r.exam !== "").length;
  const pct = (filled / rows.length) * 100;

  return (
    <AppLayout>
      <PageHeader title="Results Entry" subtitle="Enter scores quickly with auto-grading and Excel-like keyboard nav." badge="Academic" />

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <select className="h-11 rounded-xl border border-input bg-card px-3 text-sm font-medium focus:outline-none focus:border-accent">
          <option>First Term 2025/2026</option>
        </select>
        <select className="h-11 rounded-xl border border-input bg-card px-3 text-sm font-medium focus:outline-none focus:border-accent">
          <option>JSS2A</option>
        </select>
        <select className="h-11 rounded-xl border border-input bg-card px-3 text-sm font-medium focus:outline-none focus:border-accent">
          <option>Mathematics</option>
        </select>
        <button className="ml-auto inline-flex items-center gap-1.5 rounded-xl bg-gradient-brand text-white px-5 h-11 text-sm font-semibold shadow-md-soft hover:shadow-glow transition">
          Load Students
        </button>
      </div>

      {/* Progress bar */}
      <div className="rounded-2xl bg-card border border-border p-5 mb-5 animate-fade-in-up">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-display font-bold text-foreground">JSS2A · Mathematics</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{rows.length} students · {filled} entered · {rows.length - filled} remaining</p>
          </div>
          <span className="text-xs font-semibold text-accent">{Math.round(pct)}% complete</span>
        </div>
        <div className="mt-3 h-2 rounded-full bg-muted overflow-hidden">
          <div className="h-full bg-gradient-to-r from-accent to-primary transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-card border border-border overflow-hidden animate-fade-in-up">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground bg-muted/40 border-b border-border">
                <th className="py-3 px-5 w-12 font-semibold">#</th>
                <th className="py-3 px-3 font-semibold">Student</th>
                <th className="py-3 px-3 font-semibold">Adm. No.</th>
                <th className="py-3 px-2 text-center font-semibold">CA 1<span className="block text-[9px] font-normal text-muted-foreground">/30</span></th>
                <th className="py-3 px-2 text-center font-semibold">CA 2<span className="block text-[9px] font-normal text-muted-foreground">/30</span></th>
                <th className="py-3 px-2 text-center font-semibold">Exam<span className="block text-[9px] font-normal text-muted-foreground">/40</span></th>
                <th className="py-3 px-2 text-center font-semibold">Total<span className="block text-[9px] font-normal text-muted-foreground">/100</span></th>
                <th className="py-3 px-3 text-center font-semibold">Grade</th>
                <th className="py-3 px-3 font-semibold">Remark</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => {
                const total = (Number(r.ca1) || 0) + (Number(r.ca2) || 0) + (Number(r.exam) || 0);
                const hasAny = r.ca1 !== "" || r.ca2 !== "" || r.exam !== "";
                const g = grade(total);
                const totalColor = total >= 75 ? "text-accent" : total >= 50 ? "text-warning" : "text-destructive";
                return (
                  <tr key={r.adm} className={`border-b border-border last:border-0 ${i % 2 ? "bg-secondary/30" : ""} hover:bg-accent/5 transition`}>
                    <td className="py-2.5 px-5 text-muted-foreground tabular-nums">{i + 1}</td>
                    <td className="py-2.5 px-3 font-semibold text-foreground">{r.name}</td>
                    <td className="py-2.5 px-3 text-muted-foreground">{r.adm}</td>
                    <CellInput value={r.ca1} max={30} onChange={(v) => update(i, "ca1", v)} />
                    <CellInput value={r.ca2} max={30} onChange={(v) => update(i, "ca2", v)} />
                    <CellInput value={r.exam} max={40} onChange={(v) => update(i, "exam", v)} />
                    <td className={`py-2.5 px-2 text-center font-bold tabular-nums ${hasAny ? totalColor : "text-muted-foreground/40"}`}>
                      {hasAny ? total : "—"}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      {hasAny ? (
                        <span className={`inline-grid h-7 w-7 place-items-center rounded-lg border text-xs font-bold ${gradeColor(g)}`}>{g}</span>
                      ) : <span className="text-muted-foreground/40">—</span>}
                    </td>
                    <td className="py-2.5 px-3">
                      <input
                        value={r.remark}
                        onChange={(e) => update(i, "remark", e.target.value)}
                        placeholder="Add remark…"
                        className="h-9 w-full rounded-lg border border-transparent bg-transparent px-2 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent focus:bg-card focus:ring-2 focus:ring-accent/15 transition"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sticky bottom action bar */}
      <div className="sticky bottom-4 mt-6 z-20">
        <div className="glass rounded-2xl shadow-elegant px-4 py-3 flex flex-wrap items-center gap-3">
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">{filled}</span> of {rows.length} ready · auto-saved 3s ago
          </p>
          <div className="ml-auto flex items-center gap-2">
            <button className="inline-flex items-center gap-1.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground px-3 h-10 transition">
              <Download className="h-3.5 w-3.5" /> Export to Excel
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-xl border border-input bg-card px-4 h-10 text-sm font-medium text-foreground hover:bg-muted transition">
              <Eraser className="h-3.5 w-3.5" /> Clear All
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-brand text-white px-5 h-10 text-sm font-semibold shadow-md-soft hover:shadow-glow transition">
              <Save className="h-3.5 w-3.5" /> Save All Results
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

function CellInput({ value, max, onChange }: { value: number | ""; max: number; onChange: (v: number | "") => void }) {
  return (
    <td className="py-2.5 px-2 text-center">
      <input
        type="number"
        max={max}
        min={0}
        value={value}
        onChange={(e) => {
          const v = e.target.value === "" ? "" : Math.min(Number(e.target.value), max);
          onChange(v as any);
        }}
        className="h-9 w-16 rounded-lg border border-transparent bg-transparent text-center text-sm font-medium tabular-nums focus:outline-none focus:border-accent focus:bg-card focus:ring-2 focus:ring-accent/15 transition"
      />
    </td>
  );
}

export default Results;
