import { CheckCircle2, Loader2, Clock, XCircle, FileText, Download, MessageCircle, RotateCw, MoreHorizontal, Search, Send } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/badge";

const summary = [
  { label: "Ready", count: 287, icon: CheckCircle2, color: "text-accent", bg: "bg-accent/10", ring: "ring-accent/20" },
  { label: "Generating", count: 12, icon: Loader2, color: "text-info", bg: "bg-info/10", ring: "ring-info/20", spin: true },
  { label: "Pending", count: 43, icon: Clock, color: "text-muted-foreground", bg: "bg-muted", ring: "ring-border" },
  { label: "Failed", count: 0, icon: XCircle, color: "text-destructive/60", bg: "bg-destructive/5", ring: "ring-destructive/15" },
];

const cards = [
  { name: "Adewale Johnson", adm: "BHS/2023/041", cls: "JSS2A", status: "Ready", at: "Today, 09:14", del: "whatsapp" },
  { name: "Aisha Bello", adm: "BHS/2024/118", cls: "JSS1B", status: "Ready", at: "Today, 09:14", del: "download" },
  { name: "Chinedu Okafor", adm: "BHS/2022/009", cls: "SSS1A", status: "Generating", at: "—", del: null },
  { name: "Zainab Suleiman", adm: "BHS/2025/204", cls: "Pri 5A", status: "Pending", at: "—", del: null },
  { name: "Tunde Bakare", adm: "BHS/2021/077", cls: "SSS3B", status: "Ready", at: "Yesterday", del: "whatsapp" },
  { name: "Ifeoma Eze", adm: "BHS/2023/156", cls: "JSS3A", status: "Ready", at: "Yesterday", del: null },
];

const ReportCards = () => {
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

      {/* Status cards */}
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

      {/* Filter bar */}
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
                  <td className="py-4 px-3">
                    <StatusBadge status={c.status} />
                  </td>
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
                      <button title="Download PDF" className="grid h-8 w-8 place-items-center rounded-lg border border-input text-foreground hover:bg-muted transition">
                        <Download className="h-4 w-4" />
                      </button>
                      <button title="Send via WhatsApp" className="grid h-8 w-8 place-items-center rounded-lg border border-accent/30 bg-accent/5 text-accent hover:bg-accent/10 transition">
                        <Send className="h-4 w-4" />
                      </button>
                      <button title="Regenerate" className="grid h-8 w-8 place-items-center rounded-lg border border-input text-foreground hover:bg-muted transition">
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

export default ReportCards;
