import { useState } from "react";
import { Banknote, Wallet, AlertTriangle, Search, MoreHorizontal, X, Upload, CreditCard, Building, Banknote as Cash, Smartphone } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/badge";

const summary = [
  { label: "Total Billed", value: "₦6,050,000", icon: Banknote, accent: "from-accent to-primary", bg: "bg-accent/10 text-accent" },
  { label: "Total Collected", value: "₦4,850,000", icon: Wallet, accent: "from-info to-primary", bg: "bg-info/10 text-info" },
  { label: "Outstanding", value: "₦1,200,000", icon: AlertTriangle, accent: "from-warning to-warning", bg: "bg-warning/10 text-warning" },
];

const tabs = ["Invoices", "Payments", "Categories", "Fee Structures"];

const invoices = [
  { name: "Adewale Johnson", adm: "BHS/2023/041", cls: "JSS2A", cat: "School Fees", due: 50000, paid: 50000, status: "Paid" },
  { name: "Aisha Bello", adm: "BHS/2024/118", cls: "JSS1B", cat: "School Fees", due: 50000, paid: 30000, status: "Partial" },
  { name: "Chinedu Okafor", adm: "BHS/2022/009", cls: "SSS1A", cat: "Development Levy", due: 25000, paid: 0, status: "Unpaid" },
  { name: "Zainab Suleiman", adm: "BHS/2025/204", cls: "Pri 5A", cat: "School Fees", due: 45000, paid: 25000, status: "Partial" },
  { name: "Tunde Bakare", adm: "BHS/2021/077", cls: "SSS3B", cat: "School Fees", due: 60000, paid: 60000, status: "Paid" },
  { name: "Ifeoma Eze", adm: "BHS/2023/156", cls: "JSS3A", cat: "Development Levy", due: 25000, paid: 25000, status: "Waived" },
];

const fmt = (n: number) => "₦" + n.toLocaleString();
const statusClass = (s: string) =>
  s === "Paid" ? "badge-soft-green" : s === "Partial" ? "badge-soft-amber" : s === "Unpaid" ? "badge-soft-red" : "badge-soft-gray";

const Fees = () => {
  const [active, setActive] = useState("Invoices");
  const [modal, setModal] = useState<typeof invoices[0] | null>(null);

  return (
    <AppLayout>
      <PageHeader title="Fee Management" subtitle="Track invoices, record payments and manage fee structures." badge="Finance" />

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {summary.map((s, i) => (
          <div key={s.label} className="group relative overflow-hidden rounded-2xl bg-card border border-border p-5 hover-lift animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full opacity-10 group-hover:opacity-20 transition-opacity" style={{ backgroundImage: `linear-gradient(135deg, hsl(var(--accent)), hsl(var(--primary)))` }} />
            <div className="relative flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{s.label}</p>
              <span className={`grid h-9 w-9 place-items-center rounded-xl ${s.bg}`}><s.icon className="h-4 w-4" /></span>
            </div>
            <p className="relative mt-3 font-display text-3xl font-bold text-foreground">{s.value}</p>
            <div className="relative mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
              <div className={`h-full bg-gradient-to-r ${s.accent}`} style={{ width: i === 0 ? "100%" : i === 1 ? "80%" : "20%" }} />
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-border mb-5 overflow-x-auto scrollbar-none">
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`relative px-4 py-3 text-sm font-medium transition whitespace-nowrap ${
              active === t ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
            {active === t && <span className="absolute inset-x-3 -bottom-px h-0.5 bg-gradient-brand rounded-full" />}
          </button>
        ))}
      </div>

      {/* Filters + table */}
      <div className="rounded-2xl bg-card border border-border overflow-hidden animate-fade-in-up">
        <div className="flex flex-wrap gap-3 p-4 border-b border-border">
          <select className="h-10 rounded-xl border border-input bg-background px-3 text-sm focus:outline-none focus:border-accent">
            <option>First Term 2025/2026</option>
          </select>
          <select className="h-10 rounded-xl border border-input bg-background px-3 text-sm focus:outline-none focus:border-accent">
            <option>All Classes</option><option>JSS1A</option>
          </select>
          <select className="h-10 rounded-xl border border-input bg-background px-3 text-sm focus:outline-none focus:border-accent">
            <option>All Status</option><option>Unpaid</option><option>Partial</option><option>Paid</option><option>Waived</option>
          </select>
          <div className="relative flex-1 min-w-[200px]">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input placeholder="Search invoices…" className="h-10 w-full rounded-xl border border-input bg-background pl-10 pr-3 text-sm focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/15" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground bg-muted/40 border-b border-border">
                <th className="py-3 px-5 font-semibold">Student</th>
                <th className="py-3 px-3 font-semibold">Class</th>
                <th className="py-3 px-3 font-semibold">Category</th>
                <th className="py-3 px-3 font-semibold text-right">Due</th>
                <th className="py-3 px-3 font-semibold text-right">Paid</th>
                <th className="py-3 px-3 font-semibold text-right">Balance</th>
                <th className="py-3 px-3 font-semibold">Status</th>
                <th className="py-3 px-5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv, i) => {
                const balance = inv.due - inv.paid;
                return (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/40 transition group">
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-brand text-[11px] font-bold text-white">
                          {inv.name.split(" ").map(w => w[0]).slice(0, 2).join("")}
                        </span>
                        <div>
                          <p className="font-semibold text-foreground">{inv.name}</p>
                          <p className="text-[11px] text-muted-foreground">{inv.adm}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-3"><span className="rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] font-semibold">{inv.cls}</span></td>
                    <td className="py-4 px-3">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-medium border ${inv.cat === "School Fees" ? "badge-soft-blue" : "badge-soft-green"}`}>{inv.cat}</span>
                    </td>
                    <td className="py-4 px-3 text-right text-foreground tabular-nums">{fmt(inv.due)}</td>
                    <td className="py-4 px-3 text-right text-foreground tabular-nums">{fmt(inv.paid)}</td>
                    <td className={`py-4 px-3 text-right font-semibold tabular-nums ${balance > 0 ? "text-warning" : "text-muted-foreground"}`}>{fmt(balance)}</td>
                    <td className="py-4 px-3">
                      <Badge variant="outline" className={`border ${statusClass(inv.status)}`}>{inv.status}</Badge>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <div className="inline-flex items-center gap-1">
                        {balance > 0 && (
                          <button onClick={() => setModal(inv)} className="rounded-lg bg-gradient-brand text-white text-xs font-semibold px-3 py-1.5 shadow-sm-soft hover:shadow-glow transition">
                            Record Payment
                          </button>
                        )}
                        <button className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4 bg-primary-deep/40 backdrop-blur-sm animate-fade-in" onClick={() => setModal(null)}>
          <div className="w-full max-w-lg rounded-2xl bg-card border border-border shadow-elegant overflow-hidden animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-border bg-gradient-to-br from-card to-secondary">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Record Payment</p>
                <h3 className="mt-1 font-display text-lg font-bold text-foreground">{modal.name}</h3>
                <p className="text-xs text-muted-foreground">{modal.adm} · {modal.cat} · Balance {fmt(modal.due - modal.paid)}</p>
              </div>
              <button onClick={() => setModal(null)} className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-foreground">Amount</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">₦</span>
                  <input defaultValue={modal.due - modal.paid} className="h-12 w-full rounded-xl border border-input bg-background pl-8 pr-3 text-base font-semibold text-foreground focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/15" />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-foreground">Payment Method</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { l: "Cash", i: Cash },
                    { l: "Transfer", i: Building },
                    { l: "Deposit", i: CreditCard },
                    { l: "Paystack", i: Smartphone },
                  ].map((m, idx) => (
                    <button key={m.l} className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-xs font-medium transition ${idx === 1 ? "border-accent bg-accent/5 text-accent" : "border-input text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
                      <m.i className="h-4 w-4" />
                      {m.l}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-foreground">Reference</label>
                  <input placeholder="TXN-…" className="h-11 w-full rounded-xl border border-input bg-background px-3.5 text-sm focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/15" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-foreground">Date</label>
                  <input type="date" className="h-11 w-full rounded-xl border border-input bg-background px-3.5 text-sm focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/15" />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-foreground">Evidence</label>
                <div className="rounded-xl border-2 border-dashed border-border bg-muted/40 p-5 text-center hover:border-accent transition cursor-pointer">
                  <Upload className="h-5 w-5 mx-auto text-muted-foreground" />
                  <p className="mt-2 text-xs text-muted-foreground">Drag receipt here or <span className="text-accent font-semibold">browse</span></p>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-foreground">Notes <span className="text-muted-foreground font-normal">(optional)</span></label>
                <textarea rows={2} className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/15" />
              </div>
            </div>

            <div className="flex justify-end gap-2 px-5 py-4 bg-muted/40 border-t border-border">
              <button onClick={() => setModal(null)} className="rounded-xl border border-input bg-card px-4 h-10 text-sm font-medium hover:bg-muted transition">Cancel</button>
              <button onClick={() => setModal(null)} className="rounded-xl bg-gradient-brand text-white px-5 h-10 text-sm font-semibold shadow-md-soft hover:shadow-glow transition">Record Payment</button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
};

export default Fees;
