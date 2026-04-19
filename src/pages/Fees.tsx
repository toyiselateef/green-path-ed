import { useState } from "react";
import { Banknote, Wallet, AlertTriangle, Search, MoreHorizontal, X, Upload, CreditCard, Building, Banknote as Cash, Smartphone, Check, Receipt, FileText, MessageSquare, BadgeMinus, QrCode, Printer } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/badge";
import { FeeMatrix } from "@/components/fees/FeeMatrix";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

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
  const [viewInv, setViewInv] = useState<typeof invoices[0] | null>(null);
  const [waiveInv, setWaiveInv] = useState<typeof invoices[0] | null>(null);

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

      {active === "Fee Structures" ? (
        <div className="animate-fade-in"><FeeMatrix /></div>
      ) : (
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
                        <DropdownMenu>
                          <DropdownMenuTrigger className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition outline-none">
                            <MoreHorizontal className="h-4 w-4" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            {balance > 0 && (
                              <DropdownMenuItem onClick={() => setModal(inv)}>
                                <Receipt className="h-4 w-4 mr-2" /> Record Payment
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem onClick={() => setViewInv(inv)}>
                              <FileText className="h-4 w-4 mr-2" /> View Invoice
                            </DropdownMenuItem>
                            {balance > 0 && (
                              <DropdownMenuItem onClick={() => toast.success(`WhatsApp reminder sent to parent of ${inv.name}`, { description: "+234 803 145 7821" })}>
                                <MessageSquare className="h-4 w-4 mr-2" /> Send Reminder
                              </DropdownMenuItem>
                            )}
                            {balance > 0 && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => setWaiveInv(inv)} className="text-destructive focus:text-destructive">
                                  <BadgeMinus className="h-4 w-4 mr-2" /> Waive Balance
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      )}


      {/* Record Payment Modal — premium redesign */}
      {modal && <RecordPaymentModal invoice={modal} onClose={() => setModal(null)} />}

      {/* View Invoice Dialog */}
      <Dialog open={!!viewInv} onOpenChange={(o) => !o && setViewInv(null)}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto p-0">
          {viewInv && (
            <>
              <DialogHeader className="px-6 pt-6 pb-2">
                <DialogTitle className="font-display">Invoice</DialogTitle>
                <DialogDescription>BHS-INV-2025-{String(invoices.indexOf(viewInv) + 41).padStart(3, "0")}</DialogDescription>
              </DialogHeader>
              <div className="px-6 pb-6">
                <div className="flex items-start justify-between border-b-2 border-primary pb-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-brand text-white font-display text-xl font-bold">B</span>
                    <div>
                      <h2 className="font-display text-lg font-bold text-foreground">Brightstar High School</h2>
                      <p className="text-[11px] text-muted-foreground">14, Admiralty Way, Lekki Phase 1, Lagos</p>
                    </div>
                  </div>
                  <div className="text-right text-xs">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Issued</p>
                    <p className="font-semibold text-foreground">{new Date().toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-4 text-xs">
                  <div className="rounded-lg border border-border p-2">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Student</p>
                    <p className="text-sm font-semibold text-foreground mt-0.5">{viewInv.name}</p>
                  </div>
                  <div className="rounded-lg border border-border p-2">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Adm. No.</p>
                    <p className="text-sm font-semibold text-foreground mt-0.5">{viewInv.adm}</p>
                  </div>
                  <div className="rounded-lg border border-border p-2">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Class</p>
                    <p className="text-sm font-semibold text-foreground mt-0.5">{viewInv.cls}</p>
                  </div>
                </div>

                <table className="w-full text-sm mt-4 rounded-xl overflow-hidden border border-border">
                  <thead className="bg-muted/40 text-[11px] uppercase tracking-wider text-muted-foreground">
                    <tr><th className="py-2 px-3 text-left font-semibold">Item</th><th className="py-2 px-3 text-right font-semibold">Amount</th></tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-border"><td className="py-2.5 px-3">{viewInv.cat} · First Term</td><td className="py-2.5 px-3 text-right tabular-nums">{fmt(viewInv.due)}</td></tr>
                    <tr className="border-t border-border bg-secondary/30"><td className="py-2.5 px-3 text-muted-foreground">Paid</td><td className="py-2.5 px-3 text-right text-accent font-semibold tabular-nums">- {fmt(viewInv.paid)}</td></tr>
                    <tr className="border-t-2 border-primary"><td className="py-3 px-3 font-bold">Balance Due</td><td className="py-3 px-3 text-right font-display text-lg font-bold text-foreground tabular-nums">{fmt(viewInv.due - viewInv.paid)}</td></tr>
                  </tbody>
                </table>

                <div className="mt-4 flex items-center justify-between rounded-xl border border-dashed border-border bg-muted/20 p-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Pay via USSD or scan</p>
                    <p className="text-xs text-foreground mt-0.5 font-mono">*737*000*{viewInv.due - viewInv.paid}#</p>
                  </div>
                  <span className="grid h-16 w-16 place-items-center rounded-lg bg-card border-2 border-dashed border-border text-muted-foreground">
                    <QrCode className="h-8 w-8" />
                  </span>
                </div>
              </div>
              <DialogFooter className="px-6 py-4 border-t border-border bg-muted/20">
                <button onClick={() => setViewInv(null)} className="rounded-xl border border-border bg-card px-4 h-10 text-sm font-semibold hover:bg-muted">Close</button>
                <button onClick={() => window.print()} className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-brand text-white px-4 h-10 text-sm font-semibold shadow-md-soft hover:shadow-glow transition">
                  <Printer className="h-4 w-4" /> Print
                </button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Waive Balance Confirmation */}
      <AlertDialog open={!!waiveInv} onOpenChange={(o) => !o && setWaiveInv(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Waive remaining balance?</AlertDialogTitle>
            <AlertDialogDescription>
              {waiveInv && (
                <>This will mark <span className="font-semibold text-foreground">{fmt(waiveInv.due - waiveInv.paid)}</span> as waived for {waiveInv.name}. The action will appear in the audit log and cannot be undone without proprietor approval.</>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => { if (waiveInv) toast.success(`Balance waived for ${waiveInv.name}`); setWaiveInv(null); }}>
              Waive balance
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppLayout>
  );
};

// ---------------- Record Payment Modal ----------------
const methods = [
  { id: "cash", label: "Cash", icon: Cash, hint: "In-person" },
  { id: "transfer", label: "Transfer", icon: Building, hint: "Bank · Instant" },
  { id: "paystack", label: "Paystack", icon: Smartphone, hint: "Card · Online" },
  { id: "deposit", label: "Deposit", icon: CreditCard, hint: "Teller slip" },
];

function RecordPaymentModal({ invoice, onClose }: { invoice: typeof invoices[0]; onClose: () => void }) {
  const [method, setMethod] = useState("transfer");
  const balance = invoice.due - invoice.paid;
  const [amount, setAmount] = useState(balance);
  const fillPct = Math.min(100, Math.round((amount / invoice.due) * 100));

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center p-4 bg-primary-deep/50 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-3xl bg-card border border-border shadow-elegant overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Aurora header */}
        <div className="relative overflow-hidden bg-aurora text-white p-6">
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="absolute -top-16 -right-10 h-48 w-48 rounded-full bg-accent/30 blur-3xl animate-float" />
          <div className="relative flex items-start justify-between gap-4">
            <div className="min-w-0">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest">
                <Receipt className="h-3 w-3" /> Record Payment
              </span>
              <h3 className="mt-3 font-display text-xl font-bold leading-tight truncate">{invoice.name}</h3>
              <p className="mt-1 text-xs text-white/70">{invoice.adm} · {invoice.cls} · {invoice.cat}</p>
            </div>
            <button
              onClick={onClose}
              className="grid h-9 w-9 place-items-center rounded-xl glass-dark hover:bg-white/15 transition shrink-0"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Balance bar */}
          <div className="relative mt-5 rounded-2xl glass-dark p-3.5">
            <div className="flex items-center justify-between text-[11px] text-white/70">
              <span>Outstanding balance</span>
              <span>{fmt(invoice.paid)} / {fmt(invoice.due)} paid</span>
            </div>
            <div className="mt-1 flex items-end justify-between gap-3">
              <p className="font-display text-2xl font-bold tabular-nums">{fmt(balance)}</p>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-accent bg-white/10 rounded-full px-2 py-0.5">
                {Math.round((invoice.paid / invoice.due) * 100)}% settled
              </span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-accent to-primary-glow" style={{ width: `${(invoice.paid / invoice.due) * 100}%` }} />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
          {/* Amount */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-foreground">Amount Received</label>
              <div className="flex gap-1">
                {[
                  { l: "Half", v: Math.round(balance / 2) },
                  { l: "Full", v: balance },
                ].map((q) => (
                  <button
                    key={q.l}
                    onClick={() => setAmount(q.v)}
                    className="rounded-md border border-border bg-background px-2 py-0.5 text-[10px] font-semibold text-muted-foreground hover:text-accent hover:border-accent/40 transition"
                  >
                    {q.l}
                  </button>
                ))}
              </div>
            </div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-display text-lg font-bold text-muted-foreground">₦</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value) || 0)}
                className="h-14 w-full rounded-2xl border border-border bg-background pl-10 pr-4 font-display text-2xl font-bold tabular-nums text-foreground focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/15 transition"
              />
            </div>
            <div className="mt-2 h-1 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-gradient-brand transition-all duration-500" style={{ width: `${fillPct}%` }} />
            </div>
          </div>

          {/* Method */}
          <div>
            <label className="mb-2 block text-xs font-semibold text-foreground">Payment Method</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {methods.map((m) => {
                const active = method === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setMethod(m.id)}
                    className={`group relative overflow-hidden rounded-2xl border p-3 text-left transition ${
                      active
                        ? "border-accent bg-accent/5 shadow-glow"
                        : "border-border bg-card hover:bg-muted"
                    }`}
                  >
                    {active && <span className="absolute top-2 right-2 grid h-4 w-4 place-items-center rounded-full bg-gradient-brand text-white"><Check className="h-2.5 w-2.5" /></span>}
                    <span className={`grid h-8 w-8 place-items-center rounded-lg mb-2 transition ${active ? "bg-gradient-brand text-white" : "bg-muted text-muted-foreground group-hover:text-foreground"}`}>
                      <m.icon className="h-4 w-4" />
                    </span>
                    <p className={`text-xs font-semibold ${active ? "text-accent" : "text-foreground"}`}>{m.label}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{m.hint}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Reference + Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-foreground">Reference / Teller No.</label>
              <input placeholder="e.g. TRN-839201" className="h-11 w-full rounded-xl border border-border bg-background px-3.5 text-sm focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/15" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-foreground">Date Received</label>
              <input type="date" defaultValue={new Date().toISOString().slice(0, 10)} className="h-11 w-full rounded-xl border border-border bg-background px-3.5 text-sm focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/15" />
            </div>
          </div>

          {/* Evidence */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-foreground">Upload Evidence <span className="text-muted-foreground font-normal">(optional)</span></label>
            <label className="group flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/30 p-5 text-center cursor-pointer hover:border-accent hover:bg-accent/5 transition">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-card border border-border group-hover:bg-gradient-brand group-hover:text-white group-hover:border-transparent transition mb-2">
                <Upload className="h-4 w-4" />
              </span>
              <p className="text-sm font-semibold text-foreground">Click to upload or drag & drop</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">PNG, JPG or PDF · max 5MB</p>
              <input type="file" className="hidden" />
            </label>
          </div>

          {/* Notify parent */}
          <label className="flex items-center justify-between gap-3 rounded-xl border border-border bg-muted/30 px-4 py-3 cursor-pointer hover:bg-muted/50 transition">
            <div className="flex items-center gap-3 min-w-0">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent/10 text-accent shrink-0">
                <Smartphone className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">Notify parent on WhatsApp</p>
                <p className="text-[11px] text-muted-foreground truncate">Send instant receipt and updated balance</p>
              </div>
            </div>
            <input type="checkbox" defaultChecked className="h-4 w-4 accent-[hsl(var(--accent))] shrink-0" />
          </label>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 px-6 py-4 bg-muted/30 border-t border-border">
          <p className="text-[11px] text-muted-foreground">
            New balance: <span className="font-semibold text-foreground tabular-nums">{fmt(Math.max(0, balance - amount))}</span>
          </p>
          <div className="flex gap-2">
            <button onClick={onClose} className="rounded-xl border border-border bg-card px-4 h-10 text-sm font-semibold hover:bg-muted transition">Cancel</button>
            <button
              onClick={() => { toast.success(`Payment of ${fmt(amount)} recorded for ${invoice.name}`); onClose(); }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-brand text-white px-5 h-10 text-sm font-semibold shadow-md-soft hover:shadow-glow transition"
            >
              <Check className="h-4 w-4" /> Confirm Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Fees;
