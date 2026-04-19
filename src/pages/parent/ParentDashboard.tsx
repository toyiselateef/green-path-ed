import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell, Home, Wallet, ClipboardList, Megaphone, User, ArrowRight, ChevronRight,
  ChevronDown, MessageCircle, TrendingUp, Download, LogOut, Lock, Copy, Check,
  Banknote, Building2, Smartphone, X
} from "lucide-react";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter
} from "@/components/ui/sheet";
import { toast } from "sonner";

const children = [
  { name: "Adewale", cls: "JSS2A", initials: "AJ" },
  { name: "Aisha", cls: "Pri 4B", initials: "AB" },
];

type Invoice = {
  id: string; cat: string; term: string; due: number; paid: number;
  status: "Paid" | "Partial" | "Unpaid";
};

const invoicesByChild: Record<number, Invoice[]> = {
  0: [
    { id: "BHS-INV-2025-041", cat: "School Fees", term: "First Term", due: 50000, paid: 30000, status: "Partial" },
    { id: "BHS-INV-2025-042", cat: "Development Levy", term: "First Term", due: 25000, paid: 0, status: "Unpaid" },
    { id: "BHS-INV-2025-018", cat: "PTA Levy", term: "First Term", due: 5000, paid: 5000, status: "Paid" },
  ],
  1: [
    { id: "BHS-INV-2025-118", cat: "School Fees", term: "First Term", due: 35000, paid: 35000, status: "Paid" },
    { id: "BHS-INV-2025-119", cat: "Sports Levy", term: "First Term", due: 4000, paid: 0, status: "Unpaid" },
  ],
};

const subjectsByTerm: Record<string, { name: string; score: number; grade: string }[]> = {
  "First Term": [
    { name: "Mathematics", score: 87, grade: "A" },
    { name: "English Language", score: 78, grade: "A" },
    { name: "Basic Science", score: 71, grade: "B" },
    { name: "Civic Education", score: 82, grade: "A" },
    { name: "Computer Studies", score: 90, grade: "A" },
  ],
  "Second Term": [
    { name: "Mathematics", score: 81, grade: "A" },
    { name: "English Language", score: 74, grade: "B" },
    { name: "Basic Science", score: 68, grade: "B" },
  ],
  "Third Term": [],
};

const notices = [
  { date: "Tue, 8 Oct", title: "Mid-term break begins Friday", body: "School resumes on Monday, 21st October. Reading list and assignments have been shared via WhatsApp." },
  { date: "Mon, 30 Sep", title: "PTA meeting · Saturday 11 Oct", body: "All parents are invited to the termly PTA meeting in the school hall by 10am. Refreshments provided." },
  { date: "Fri, 27 Sep", title: "Inter-house sports rehearsal", body: "Sports week kicks off 15th October. Students should come with full sports kit on Wednesdays." },
];

const fmt = (n: number) => "₦" + n.toLocaleString();
const statusClass = (s: string) =>
  s === "Paid" ? "badge-soft-green" : s === "Partial" ? "badge-soft-amber" : "badge-soft-red";

type Tab = "home" | "fees" | "results" | "notices" | "profile";

const ParentDashboard = () => {
  const navigate = useNavigate();
  const [activeChild, setActiveChild] = useState(0);
  const [tab, setTab] = useState<Tab>("home");
  const [payInvoice, setPayInvoice] = useState<Invoice | null>(null);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="relative overflow-hidden bg-aurora text-white px-5 pt-8 pb-20 rounded-b-[2rem]">
        <div className="absolute inset-0 grid-pattern opacity-25" />
        <div className="absolute -top-20 -right-10 h-56 w-56 rounded-full bg-accent/30 blur-3xl animate-float" />
        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-xs text-white/65">Brightstar High School</p>
            <h1 className="mt-1 font-display text-xl font-bold leading-tight">Hello, Mrs. Adewale 👋</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative grid h-10 w-10 place-items-center rounded-xl glass-dark text-white">
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-accent ring-2 ring-primary-deep" />
            </button>
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/15 backdrop-blur text-xs font-bold text-white">FA</span>
          </div>
        </div>

        {/* Child tabs */}
        <div className="relative mt-6 flex gap-2 overflow-x-auto scrollbar-none -mx-5 px-5 pb-1">
          {children.map((c, i) => (
            <button
              key={c.name}
              onClick={() => setActiveChild(i)}
              className={`flex-shrink-0 flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5 text-sm transition ${
                activeChild === i ? "bg-white text-primary-deep shadow-md-soft" : "glass-dark text-white"
              }`}
            >
              <span className={`grid h-8 w-8 place-items-center rounded-xl text-[11px] font-bold ${activeChild === i ? "bg-gradient-brand text-white" : "bg-white/15 text-white"}`}>
                {c.initials}
              </span>
              <div className="text-left leading-tight">
                <p className="font-semibold">{c.name}</p>
                <p className={`text-[10px] ${activeChild === i ? "text-muted-foreground" : "text-white/60"}`}>{c.cls}</p>
              </div>
              {activeChild === i && <span className="ml-1 h-1.5 w-1.5 rounded-full bg-accent" />}
            </button>
          ))}
        </div>
      </header>

      {/* Content */}
      <main className="px-5 -mt-12 space-y-4">
        {tab === "home" && <HomeTab onPay={(inv) => setPayInvoice(inv)} childIdx={activeChild} />}
        {tab === "fees" && <FeesTab childIdx={activeChild} onPay={(inv) => setPayInvoice(inv)} />}
        {tab === "results" && <ResultsTab />}
        {tab === "notices" && <NoticesTab />}
        {tab === "profile" && <ProfileTab onSignOut={() => navigate("/parent")} />}
      </main>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 inset-x-0 z-30 px-3 pb-3">
        <div className="glass rounded-2xl shadow-elegant px-2 py-2 flex items-center justify-between">
          {([
            { l: "Home", i: Home, k: "home" },
            { l: "Fees", i: Wallet, k: "fees" },
            { l: "Results", i: ClipboardList, k: "results" },
            { l: "Notices", i: Megaphone, k: "notices" },
            { l: "Profile", i: User, k: "profile" },
          ] as const).map((t) => (
            <button
              key={t.l}
              onClick={() => setTab(t.k as Tab)}
              className={`flex-1 flex flex-col items-center gap-0.5 rounded-xl py-2 transition ${
                tab === t.k ? "bg-gradient-brand text-white shadow-md-soft" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <t.i className="h-4 w-4" />
              <span className="text-[10px] font-semibold">{t.l}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Pay Now Sheet */}
      <PayNowSheet invoice={payInvoice} onClose={() => setPayInvoice(null)} />
    </div>
  );
};

// ---------- HOME ----------
const HomeTab = ({ onPay, childIdx }: { onPay: (inv: Invoice) => void; childIdx: number }) => {
  const outstanding = invoicesByChild[childIdx].find((i) => i.status !== "Paid");
  const subjects = subjectsByTerm["First Term"].slice(0, 3);
  return (
    <>
      {outstanding && (
        <div className="rounded-3xl bg-card border border-border shadow-elegant p-5 animate-fade-in-up">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Outstanding Balance</p>
              <p className="mt-1 font-display text-4xl font-bold text-foreground tabular-nums">{fmt(outstanding.due - outstanding.paid)}</p>
              <p className="mt-1 text-xs text-muted-foreground">{outstanding.cat} · {outstanding.term}</p>
            </div>
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-warning/10 text-warning">
              <Wallet className="h-5 w-5" />
            </span>
          </div>
          <div className="mt-4 h-2 rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-gradient-to-r from-accent to-primary" style={{ width: `${(outstanding.paid / outstanding.due) * 100}%` }} />
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">{fmt(outstanding.paid)} paid of {fmt(outstanding.due)}</p>
          <button onClick={() => onPay(outstanding)} className="group mt-4 w-full inline-flex items-center justify-center gap-1.5 rounded-2xl bg-gradient-brand text-white h-12 text-sm font-semibold shadow-md-soft hover:shadow-glow transition-all">
            Pay Now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      )}

      <div className="rounded-3xl bg-card border border-border p-5 animate-fade-in-up">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Latest Results</p>
            <h3 className="font-display font-bold text-foreground mt-0.5">First Term · Top subjects</h3>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 text-accent px-2 py-0.5 text-[10px] font-bold">
            <TrendingUp className="h-3 w-3" /> 79%
          </span>
        </div>
        <ul className="space-y-2.5">
          {subjects.map((s) => (
            <li key={s.name} className="flex items-center gap-3">
              <span className={`grid h-8 w-8 place-items-center rounded-lg border text-xs font-bold ${s.grade === "A" ? "badge-soft-green" : "badge-soft-blue"}`}>{s.grade}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{s.name}</p>
                <div className="mt-1 h-1 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-accent to-primary" style={{ width: `${s.score}%` }} />
                </div>
              </div>
              <span className="text-sm font-bold text-foreground tabular-nums">{s.score}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-3xl bg-accent/10 border border-accent/20 p-4 flex items-center gap-3 animate-fade-in-up">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-accent-foreground">
          <MessageCircle className="h-4 w-4" />
        </span>
        <div className="flex-1">
          <p className="text-sm font-semibold text-foreground">Get updates on WhatsApp</p>
          <p className="text-xs text-muted-foreground">Receive results & receipts directly.</p>
        </div>
        <button onClick={() => toast.success("WhatsApp notifications enabled")} className="rounded-lg bg-accent text-accent-foreground text-xs font-semibold px-3 py-1.5">Enable</button>
      </div>
    </>
  );
};

// ---------- FEES ----------
const FeesTab = ({ childIdx, onPay }: { childIdx: number; onPay: (inv: Invoice) => void }) => {
  const list = invoicesByChild[childIdx];
  const billed = list.reduce((a, b) => a + b.due, 0);
  const paid = list.reduce((a, b) => a + b.paid, 0);
  const out = billed - paid;

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="grid grid-cols-3 gap-2">
        {[
          { l: "Billed", v: billed, c: "text-foreground" },
          { l: "Paid", v: paid, c: "text-accent" },
          { l: "Outstanding", v: out, c: "text-warning" },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl bg-card border border-border p-3">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.l}</p>
            <p className={`mt-1 font-display text-base font-bold tabular-nums ${s.c}`}>{fmt(s.v)}</p>
          </div>
        ))}
      </div>

      {list.map((inv) => {
        const balance = inv.due - inv.paid;
        return (
          <div key={inv.id} className="rounded-2xl bg-card border border-border p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">{inv.cat} · {inv.term}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{inv.id}</p>
              </div>
              <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${statusClass(inv.status)}`}>{inv.status}</span>
            </div>
            <div className="mt-3 flex items-end justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Balance</p>
                <p className="font-display text-xl font-bold text-foreground tabular-nums">{fmt(balance)}</p>
              </div>
              <p className="text-[11px] text-muted-foreground">{fmt(inv.paid)} / {fmt(inv.due)}</p>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-gradient-to-r from-accent to-primary" style={{ width: `${(inv.paid / inv.due) * 100}%` }} />
            </div>
            {balance > 0 && (
              <button onClick={() => onPay(inv)} className="mt-3 w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-brand text-white h-10 text-sm font-semibold shadow-md-soft hover:shadow-glow transition">
                Pay Now <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

// ---------- RESULTS ----------
const ResultsTab = () => {
  const [term, setTerm] = useState("First Term");
  const subs = subjectsByTerm[term] || [];
  const avg = subs.length ? Math.round(subs.reduce((a, b) => a + b.score, 0) / subs.length) : 0;

  return (
    <div className="space-y-4 animate-fade-in">
      <select value={term} onChange={(e) => setTerm(e.target.value)} className="h-11 w-full rounded-xl border border-input bg-card px-3 text-sm font-medium focus:outline-none focus:border-accent">
        <option>First Term</option><option>Second Term</option><option>Third Term</option>
      </select>

      {subs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center">
          <ClipboardList className="mx-auto h-8 w-8 text-muted-foreground/50" />
          <p className="mt-3 text-sm font-semibold text-foreground">No results yet</p>
          <p className="mt-1 text-xs text-muted-foreground">Results for {term} will appear here once published.</p>
        </div>
      ) : (
        <>
          {subs.map((s) => (
            <div key={s.name} className="rounded-2xl bg-card border border-border p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">{s.name}</p>
                <span className={`inline-grid h-7 w-7 place-items-center rounded-lg border text-xs font-bold ${s.grade === "A" ? "badge-soft-green" : s.grade === "B" ? "badge-soft-blue" : "badge-soft-amber"}`}>{s.grade}</span>
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="font-display text-2xl font-bold text-foreground tabular-nums">{s.score}<span className="text-xs text-muted-foreground font-normal">/100</span></span>
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-gradient-to-r from-accent to-primary" style={{ width: `${s.score}%` }} />
              </div>
            </div>
          ))}

          <div className="rounded-2xl bg-gradient-to-br from-card to-secondary border border-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Position</p>
                <p className="mt-1 font-display text-lg font-bold text-foreground">8th of 32</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Cum. Average</p>
                <span className="mt-1 inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-sm font-bold text-accent tabular-nums">{avg}%</span>
              </div>
            </div>
          </div>

          <button onClick={() => toast("Coming soon", { description: "Report card download will be available next term." })} className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-card hover:bg-muted h-11 text-sm font-semibold text-foreground transition">
            <Download className="h-4 w-4" /> Download Report Card
          </button>
        </>
      )}
    </div>
  );
};

// ---------- NOTICES ----------
const NoticesTab = () => {
  const [open, setOpen] = useState<number | null>(0);
  if (!notices.length) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center animate-fade-in">
        <Megaphone className="mx-auto h-10 w-10 text-muted-foreground/40" />
        <p className="mt-3 text-sm font-semibold text-foreground">No new notices</p>
      </div>
    );
  }
  return (
    <div className="space-y-3 animate-fade-in">
      {notices.map((n, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="rounded-2xl bg-card border border-border p-4">
            <button onClick={() => setOpen(isOpen ? null : i)} className="w-full text-left">
              <div className="flex items-start gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent/10 text-accent shrink-0">
                  <Megaphone className="h-4 w-4" />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{n.date}</p>
                  <h3 className="mt-0.5 text-sm font-semibold text-foreground">{n.title}</h3>
                  {!isOpen && <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{n.body}</p>}
                </div>
                <ChevronDown className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </div>
            </button>
            {isOpen && (
              <p className="mt-3 pl-12 text-sm text-muted-foreground leading-relaxed animate-fade-in">{n.body}</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

// ---------- PROFILE ----------
const ProfileTab = ({ onSignOut }: { onSignOut: () => void }) => {
  const [pwdOpen, setPwdOpen] = useState(false);
  const [whatsapp, setWhatsapp] = useState(true);
  const [sms, setSms] = useState(true);

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="rounded-3xl bg-card border border-border p-5 text-center">
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-2xl bg-gradient-brand text-white font-display text-2xl font-bold shadow-md-soft">FA</span>
        <h3 className="mt-3 font-display text-lg font-bold text-foreground">Mrs. Funmi Adewale</h3>
        <p className="text-xs text-muted-foreground">+234 803 ***7821</p>
      </div>

      <div className="rounded-2xl bg-card border border-border overflow-hidden">
        <p className="px-4 pt-3 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Children</p>
        {children.map((c) => (
          <button key={c.name} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/40 transition border-t border-border">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand text-white text-xs font-bold">{c.initials}</span>
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold text-foreground">{c.name}</p>
              <p className="text-[11px] text-muted-foreground">{c.cls}</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        ))}
      </div>

      <div className="rounded-2xl bg-card border border-border">
        <button onClick={() => setPwdOpen((o) => !o)} className="w-full flex items-center gap-3 px-4 py-3.5">
          <Lock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-semibold text-foreground flex-1 text-left">Change Password</span>
          <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${pwdOpen ? "rotate-180" : ""}`} />
        </button>
        {pwdOpen && (
          <form onSubmit={(e) => { e.preventDefault(); toast.success("Password updated"); setPwdOpen(false); }} className="px-4 pb-4 space-y-3 animate-fade-in">
            <input type="password" placeholder="Current password" className="h-10 w-full rounded-xl border border-input bg-background px-3 text-sm focus:outline-none focus:border-accent" />
            <input type="password" placeholder="New password" className="h-10 w-full rounded-xl border border-input bg-background px-3 text-sm focus:outline-none focus:border-accent" />
            <input type="password" placeholder="Confirm new password" className="h-10 w-full rounded-xl border border-input bg-background px-3 text-sm focus:outline-none focus:border-accent" />
            <button type="submit" className="w-full rounded-xl bg-gradient-brand text-white h-10 text-sm font-semibold">Update Password</button>
          </form>
        )}
      </div>

      <div className="rounded-2xl bg-card border border-border p-4 space-y-3">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Notifications</p>
        <ToggleRow label="Results via WhatsApp" on={whatsapp} onChange={setWhatsapp} />
        <ToggleRow label="Fee reminders via SMS" on={sms} onChange={setSms} />
      </div>

      <button onClick={onSignOut} className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-destructive text-destructive-foreground h-11 text-sm font-semibold hover:opacity-90 transition">
        <LogOut className="h-4 w-4" /> Sign Out
      </button>
    </div>
  );
};

const ToggleRow = ({ label, on, onChange }: { label: string; on: boolean; onChange: (v: boolean) => void }) => (
  <div className="flex items-center justify-between">
    <span className="text-sm text-foreground">{label}</span>
    <button onClick={() => onChange(!on)} className={`relative h-6 w-11 rounded-full transition ${on ? "bg-gradient-brand" : "bg-muted"}`}>
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm-soft transition ${on ? "left-[22px]" : "left-0.5"}`} />
    </button>
  </div>
);

// ---------- PAY NOW SHEET ----------
const PayNowSheet = ({ invoice, onClose }: { invoice: Invoice | null; onClose: () => void }) => {
  const [method, setMethod] = useState<"card" | "transfer" | "ussd">("transfer");
  const [copied, setCopied] = useState(false);
  if (!invoice) return null;
  const balance = invoice.due - invoice.paid;
  const ussd = `*737*000*${balance}#`;
  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Sheet open={!!invoice} onOpenChange={(o) => !o && onClose()}>
      <SheetContent side="bottom" className="rounded-t-3xl max-h-[90vh] overflow-y-auto">
        <SheetHeader className="text-left">
          <SheetTitle className="font-display text-lg">Pay {invoice.cat}</SheetTitle>
          <SheetDescription>{invoice.term} · {invoice.id}</SheetDescription>
        </SheetHeader>

        <div className="mt-4 rounded-2xl bg-gradient-to-br from-card to-secondary border border-border p-4">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Amount Due</p>
          <p className="mt-1 font-display text-3xl font-bold text-foreground tabular-nums">{fmt(balance)}</p>
        </div>

        <div className="mt-5">
          <p className="mb-2 text-xs font-semibold text-foreground">Choose payment method</p>
          <div className="grid grid-cols-3 gap-2">
            {([
              { id: "card", l: "Card", i: Banknote, h: "Paystack" },
              { id: "transfer", l: "Transfer", i: Building2, h: "Bank" },
              { id: "ussd", l: "USSD", i: Smartphone, h: "*737#" },
            ] as const).map((m) => {
              const active = method === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  className={`rounded-2xl border p-3 text-left transition ${active ? "border-accent bg-accent/5 shadow-glow" : "border-border bg-card hover:bg-muted"}`}
                >
                  <span className={`grid h-8 w-8 place-items-center rounded-lg mb-2 ${active ? "bg-gradient-brand text-white" : "bg-muted text-muted-foreground"}`}>
                    <m.i className="h-4 w-4" />
                  </span>
                  <p className={`text-xs font-semibold ${active ? "text-accent" : "text-foreground"}`}>{m.l}</p>
                  <p className="text-[10px] text-muted-foreground">{m.h}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-border bg-muted/30 p-4 text-xs text-muted-foreground">
          {method === "card" && <p>You'll be redirected to Paystack to complete payment securely.</p>}
          {method === "transfer" && (
            <div className="space-y-1.5 text-foreground">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Bank Details</p>
              <p>Account: <span className="font-mono font-semibold">0123456789</span></p>
              <p>Bank: <span className="font-semibold">GTBank</span></p>
              <p>Name: <span className="font-semibold">Brightstar High School</span></p>
            </div>
          )}
          {method === "ussd" && (
            <div className="flex items-center justify-between gap-2">
              <code className="font-mono text-base font-bold text-foreground">{ussd}</code>
              <button onClick={() => copy(ussd)} className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-2.5 py-1 text-xs font-semibold hover:bg-muted">
                {copied ? <Check className="h-3 w-3 text-accent" /> : <Copy className="h-3 w-3" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          )}
        </div>

        <SheetFooter className="mt-5">
          <button
            onClick={() => toast("Payment integration coming soon", { description: "Please use bank transfer for now." })}
            className="w-full inline-flex items-center justify-center gap-1.5 rounded-2xl bg-gradient-brand text-white h-12 text-sm font-semibold shadow-md-soft hover:shadow-glow transition-all"
          >
            Proceed to Pay {fmt(balance)}
          </button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ParentDashboard;
