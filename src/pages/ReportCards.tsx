import { useState } from "react";
import {
  CheckCircle2, Loader2, Clock, XCircle, FileText, Download, MessageCircle,
  RotateCw, MoreHorizontal, Search, Send, Eye, Printer, X
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from "@/components/ui/dialog";
import { toast } from "sonner";

const summary = [
  { label: "Ready", count: 287, icon: CheckCircle2, color: "text-accent", bg: "bg-accent/10", ring: "ring-accent/20" },
  { label: "Generating", count: 12, icon: Loader2, color: "text-info", bg: "bg-info/10", ring: "ring-info/20", spin: true },
  { label: "Pending", count: 43, icon: Clock, color: "text-muted-foreground", bg: "bg-muted", ring: "ring-border" },
  { label: "Failed", count: 0, icon: XCircle, color: "text-destructive/60", bg: "bg-destructive/5", ring: "ring-destructive/15" },
];

type Card = { name: string; adm: string; cls: string; status: string; at: string; del: string | null };

const cards: Card[] = [
  { name: "Adewale Johnson", adm: "BHS/2023/041", cls: "JSS2A", status: "Ready", at: "Today, 09:14", del: "whatsapp" },
  { name: "Aisha Bello", adm: "BHS/2024/118", cls: "JSS1B", status: "Ready", at: "Today, 09:14", del: "download" },
  { name: "Chinedu Okafor", adm: "BHS/2022/009", cls: "SSS1A", status: "Generating", at: "—", del: null },
  { name: "Zainab Suleiman", adm: "BHS/2025/204", cls: "Pri 5A", status: "Pending", at: "—", del: null },
  { name: "Tunde Bakare", adm: "BHS/2021/077", cls: "SSS3B", status: "Ready", at: "Yesterday", del: "whatsapp" },
  { name: "Ifeoma Eze", adm: "BHS/2023/156", cls: "JSS3A", status: "Ready", at: "Yesterday", del: null },
];

const sampleScores = [
  { sub: "Mathematics", ca1: 25, ca2: 27, exam: 35, remark: "Excellent" },
  { sub: "English Language", ca1: 22, ca2: 24, exam: 32, remark: "Very good" },
  { sub: "Basic Science", ca1: 20, ca2: 22, exam: 29, remark: "Good" },
  { sub: "Civic Education", ca1: 24, ca2: 25, exam: 33, remark: "Excellent" },
  { sub: "Computer Studies", ca1: 27, ca2: 28, exam: 35, remark: "Outstanding" },
  { sub: "Yoruba Language", ca1: 19, ca2: 21, exam: 28, remark: "Good" },
];
const grade = (t: number) => t >= 75 ? "A" : t >= 65 ? "B" : t >= 55 ? "C" : t >= 45 ? "D" : t >= 40 ? "E" : "F";

const ReportCards = () => {
  const [preview, setPreview] = useState<Card | null>(null);

  return (
    <AppLayout>
      <PageHeader
        title="Report Cards"
        subtitle="Generate, deliver and track student report cards in one click."
        badge="Termly"
        actions={
          <>
            <select className="h-10 rounded-xl border border-input bg-card px-3 text-sm font-medium focus:outline-none focus:border-accent">
              <option>First Term 2025/2026</option>
            </select>
            <button className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-input bg-card px-4 h-10 text-sm font-medium hover:bg-muted transition">
              <Download className="h-4 w-4" /> Download All
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-brand text-white px-4 h-10 text-sm font-semibold shadow-md-soft hover:shadow-glow transition">
              <FileText className="h-4 w-4" /> Generate All
            </button>
          </>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {summary.map((s, i) => (
          <div key={s.label} className="relative overflow-hidden rounded-2xl bg-card border border-border p-5 hover-lift animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{s.label}</p>
                <p className="mt-2 font-display text-3xl font-bold text-foreground tabular-nums">{s.count}</p>
                <p className="text-[11px] text-muted-foreground mt-1">cards</p>
              </div>
              <span className={`grid h-10 w-10 place-items-center rounded-xl ring-1 ${s.bg} ${s.ring}`}>
                <s.icon className={`h-5 w-5 ${s.color} ${s.spin ? "animate-spin" : ""}`} />
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-card border border-border overflow-hidden animate-fade-in-up">
        <div className="flex flex-wrap items-center gap-3 p-4 border-b border-border">
          <select className="h-10 rounded-xl border border-input bg-background px-3 text-sm focus:outline-none focus:border-accent">
            <option>All Classes</option>
          </select>
          <select className="h-10 rounded-xl border border-input bg-background px-3 text-sm focus:outline-none focus:border-accent">
            <option>All Status</option>
          </select>
          <div className="relative flex-1 min-w-[200px]">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input placeholder="Search by student name…" className="h-10 w-full rounded-xl border border-input bg-background pl-10 pr-3 text-sm focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/15" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground bg-muted/40 border-b border-border">
                <th className="py-3 px-5 font-semibold">Student</th>
                <th className="py-3 px-3 font-semibold">Class</th>
                <th className="py-3 px-3 font-semibold">Status</th>
                <th className="py-3 px-3 font-semibold">Generated</th>
                <th className="py-3 px-3 font-semibold">Delivered</th>
                <th className="py-3 px-5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cards.map((c) => (
                <tr key={c.adm} className="border-b border-border last:border-0 hover:bg-muted/40 transition group">
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-brand text-[11px] font-bold text-white">
                        {c.name.split(" ").map(w => w[0]).slice(0, 2).join("")}
                      </span>
                      <div>
                        <p className="font-semibold text-foreground">{c.name}</p>
                        <p className="text-[11px] text-muted-foreground">{c.adm}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-3"><span className="rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] font-semibold">{c.cls}</span></td>
                  <td className="py-4 px-3"><StatusBadge status={c.status} /></td>
                  <td className="py-4 px-3 text-muted-foreground">{c.at}</td>
                  <td className="py-4 px-3">
                    {c.del === "whatsapp" ? (
                      <span className="inline-flex items-center gap-1.5 text-xs text-accent font-medium"><MessageCircle className="h-3.5 w-3.5" /> WhatsApp</span>
                    ) : c.del === "download" ? (
                      <span className="inline-flex items-center gap-1.5 text-xs text-info font-medium"><Download className="h-3.5 w-3.5" /> Downloaded</span>
                    ) : (
                      <span className="text-xs text-muted-foreground/60">—</span>
                    )}
                  </td>
                  <td className="py-4 px-5">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => setPreview(c)} title="Preview" className="grid h-8 w-8 place-items-center rounded-lg border border-input text-foreground hover:bg-muted transition">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button title="Download PDF" onClick={() => toast("PDF export coming soon")} className="grid h-8 w-8 place-items-center rounded-lg border border-input text-foreground hover:bg-muted transition">
                        <Download className="h-4 w-4" />
                      </button>
                      <button title="Send via WhatsApp" onClick={() => toast.success(`Report card sent to parent of ${c.name}`)} className="grid h-8 w-8 place-items-center rounded-lg border border-accent/30 bg-accent/5 text-accent hover:bg-accent/10 transition">
                        <Send className="h-4 w-4" />
                      </button>
                      <button title="Regenerate" onClick={() => toast.success("Regeneration queued")} className="grid h-8 w-8 place-items-center rounded-lg border border-input text-foreground hover:bg-muted transition">
                        <RotateCw className="h-4 w-4" />
                      </button>
                      <button className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ReportCardPreview card={preview} onClose={() => setPreview(null)} />
    </AppLayout>
  );
};

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { cls: string; icon: any; spin?: boolean }> = {
    Ready: { cls: "badge-soft-green", icon: CheckCircle2 },
    Generating: { cls: "badge-soft-blue", icon: Loader2, spin: true },
    Pending: { cls: "badge-soft-gray", icon: Clock },
    Failed: { cls: "badge-soft-red", icon: XCircle },
  };
  const m = map[status];
  return (
    <Badge variant="outline" className={`border ${m.cls} gap-1`}>
      <m.icon className={`h-3 w-3 ${m.spin ? "animate-spin" : ""}`} />
      {status}
    </Badge>
  );
}

function ReportCardPreview({ card, onClose }: { card: Card | null; onClose: () => void }) {
  if (!card) return null;
  const totals = sampleScores.map(s => s.ca1 + s.ca2 + s.exam);
  const avg = Math.round(totals.reduce((a, b) => a + b, 0) / totals.length);

  return (
    <Dialog open={!!card} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="font-display">Report card preview</DialogTitle>
          <DialogDescription>{card.name} · {card.cls} · First Term 2025/2026</DialogDescription>
        </DialogHeader>

        <div className="px-6 pb-6">
          {/* School header */}
          <div className="text-center border-b-2 border-primary pb-4">
            <div className="flex items-center justify-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-brand text-white font-display text-xl font-bold">B</span>
              <div className="text-left">
                <h2 className="font-display text-xl font-bold text-foreground">Brightstar High School</h2>
                <p className="text-[11px] text-muted-foreground italic">Knowledge · Discipline · Service</p>
              </div>
            </div>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-primary">First Term Report · 2025/2026 Session</p>
          </div>

          {/* Student info */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-xs">
            {[
              ["Name", card.name],
              ["Adm. No.", card.adm],
              ["Class", card.cls],
              ["Position", "8th of 32"],
              ["Attendance", "58 / 62 days"],
              ["Average", `${avg}%`],
            ].map(([l, v]) => (
              <div key={l} className="rounded-lg border border-border p-2">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{l}</p>
                <p className="text-sm font-semibold text-foreground mt-0.5">{v}</p>
              </div>
            ))}
          </div>

          {/* Scores */}
          <div className="mt-5 rounded-xl border border-border overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-muted/40">
                <tr className="text-left">
                  <th className="py-2 px-3 font-semibold">Subject</th>
                  <th className="py-2 px-2 text-center font-semibold">CA1</th>
                  <th className="py-2 px-2 text-center font-semibold">CA2</th>
                  <th className="py-2 px-2 text-center font-semibold">Exam</th>
                  <th className="py-2 px-2 text-center font-semibold">Total</th>
                  <th className="py-2 px-2 text-center font-semibold">Grade</th>
                  <th className="py-2 px-3 font-semibold">Remark</th>
                </tr>
              </thead>
              <tbody>
                {sampleScores.map((s, i) => {
                  const t = s.ca1 + s.ca2 + s.exam;
                  return (
                    <tr key={s.sub} className={`border-t border-border ${i % 2 ? "bg-secondary/30" : ""}`}>
                      <td className="py-2 px-3 font-medium text-foreground">{s.sub}</td>
                      <td className="py-2 px-2 text-center tabular-nums">{s.ca1}</td>
                      <td className="py-2 px-2 text-center tabular-nums">{s.ca2}</td>
                      <td className="py-2 px-2 text-center tabular-nums">{s.exam}</td>
                      <td className="py-2 px-2 text-center font-bold tabular-nums">{t}</td>
                      <td className="py-2 px-2 text-center font-bold text-primary">{grade(t)}</td>
                      <td className="py-2 px-3 text-muted-foreground">{s.remark}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Remarks */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Class Teacher's Remark</label>
              <textarea defaultValue="A diligent and well-behaved student. Keep up the excellent work next term." rows={3} className="mt-1 w-full rounded-lg border border-border bg-background p-2 text-xs focus:outline-none focus:border-accent" />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Principal's Comment</label>
              <textarea defaultValue="An outstanding performance. Promoted to the next class." rows={3} className="mt-1 w-full rounded-lg border border-border bg-background p-2 text-xs focus:outline-none focus:border-accent" />
            </div>
          </div>
        </div>

        <DialogFooter className="px-6 py-4 border-t border-border bg-muted/20">
          <button onClick={onClose} className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 h-10 text-sm font-semibold hover:bg-muted">
            <X className="h-4 w-4" /> Close
          </button>
          <button onClick={() => toast("PDF export coming soon")} className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 h-10 text-sm font-semibold hover:bg-muted">
            <Download className="h-4 w-4" /> Download PDF
          </button>
          <button onClick={() => window.print()} className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-brand text-white px-4 h-10 text-sm font-semibold shadow-md-soft hover:shadow-glow transition">
            <Printer className="h-4 w-4" /> Print
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ReportCards;
