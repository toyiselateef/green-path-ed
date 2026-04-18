import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Users, GraduationCap, Banknote, AlertTriangle, ArrowUpRight, ArrowRight,
  UserPlus, Receipt, CalendarCheck, FileText, MoreHorizontal, TrendingUp,
  Calendar, BookOpen, Trophy, PartyPopper, Beaker, Megaphone, Download,
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/badge";

const kpis = [
  { label: "Total Students", value: "342", delta: "+12", trend: "up", icon: Users, accent: "from-accent to-primary", iconBg: "bg-accent/10 text-accent" },
  { label: "Total Staff", value: "28", delta: "+2", trend: "up", icon: GraduationCap, accent: "from-info to-primary", iconBg: "bg-info/10 text-info" },
  { label: "Fees Collected", value: "₦4.85M", delta: "+18%", trend: "up", icon: Banknote, accent: "from-accent to-primary-glow", iconBg: "bg-accent/10 text-accent" },
  { label: "Outstanding Fees", value: "₦1.2M", delta: "-5%", trend: "down", icon: AlertTriangle, accent: "from-warning to-warning", iconBg: "bg-warning/10 text-warning" },
];

const payments = [
  { name: "Adewale Johnson", admission: "BHS/2023/041", amount: "₦50,000", method: "Paystack", date: "Today, 09:14", status: "Paid" },
  { name: "Aisha Bello", admission: "BHS/2024/118", amount: "₦30,000", method: "Bank Transfer", date: "Today, 08:02", status: "Partial" },
  { name: "Chinedu Okafor", admission: "BHS/2022/009", amount: "₦50,000", method: "Cash", date: "Yesterday", status: "Paid" },
  { name: "Zainab Suleiman", admission: "BHS/2025/204", amount: "₦25,000", method: "Cash Deposit", date: "Yesterday", status: "Partial" },
  { name: "Tunde Bakare", admission: "BHS/2021/077", amount: "₦50,000", method: "Paystack", date: "Mon", status: "Paid" },
];

const quickActions = [
  { label: "Add Student", icon: UserPlus, href: "/students/new", grad: "from-accent to-primary" },
  { label: "Record Payment", icon: Receipt, href: "/fees", grad: "from-primary to-primary-deep" },
  { label: "Mark Attendance", icon: CalendarCheck, href: "/dashboard", grad: "from-info to-primary" },
  { label: "Generate Reports", icon: FileText, href: "/report-cards", grad: "from-primary-glow to-accent" },
];

const Dashboard = () => {
  const today = new Date().toLocaleDateString("en-NG", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const [tab, setTab] = useState<"overview" | "calendar">("overview");

  return (
    <AppLayout>
      {/* Greeting */}
      <div className="relative overflow-hidden rounded-3xl bg-aurora p-6 sm:p-8 mb-8 text-white shadow-elegant animate-fade-in-up">
        <div className="absolute inset-0 grid-pattern opacity-25" />
        <div className="absolute -top-20 -right-10 h-60 w-60 rounded-full bg-accent/30 blur-3xl animate-float" />
        <div className="relative flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">{today}</p>
            <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold leading-tight">
              Good morning, <span className="italic font-light">Mr. Adewale</span> 👋
            </h1>
            <p className="mt-2 text-sm text-white/75 max-w-lg">Here's what's happening at Brightstar today. 4 invoices need follow-up and 12 result entries are pending.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to="/students/new" className="inline-flex items-center gap-1.5 rounded-xl bg-white text-primary-deep px-4 py-2.5 text-xs font-semibold shadow-md-soft hover:shadow-glow transition">
              <UserPlus className="h-3.5 w-3.5" /> Add student
            </Link>
            <Link to="/report-cards" className="inline-flex items-center gap-1.5 rounded-xl glass-dark text-white px-4 py-2.5 text-xs font-semibold hover:bg-white/15 transition">
              <FileText className="h-3.5 w-3.5" /> Generate reports
            </Link>
          </div>
        </div>
      </div>

      {/* Tabs: Term Overview / Academic Calendar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="inline-flex items-center gap-1 rounded-2xl border border-border bg-card p-1 shadow-sm-soft">
          {[
            { id: "overview" as const, label: "Term Overview", icon: TrendingUp },
            { id: "calendar" as const, label: "Academic Calendar", icon: Calendar },
          ].map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`relative inline-flex items-center gap-2 rounded-xl px-4 h-9 text-xs font-semibold transition ${
                  active ? "bg-gradient-brand text-white shadow-md-soft" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <t.icon className="h-3.5 w-3.5" />
                {t.label}
              </button>
            );
          })}
        </div>
        <button className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 h-9 text-xs font-semibold text-foreground hover:bg-muted transition">
          <Download className="h-3.5 w-3.5" /> Export {tab === "overview" ? "Report" : "Calendar"}
        </button>
      </div>

      {tab === "calendar" && <AcademicCalendar />}

      {tab === "overview" && (
      <div className="animate-fade-in">
      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {kpis.map((k, i) => (
          <div key={k.label} className="group relative overflow-hidden rounded-2xl bg-card border border-border p-5 hover-lift animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity" style={{ backgroundImage: `linear-gradient(135deg, hsl(var(--accent)), hsl(var(--primary)))` }} />
            <div className="relative flex items-start justify-between">
              <span className={`grid h-10 w-10 place-items-center rounded-xl ${k.iconBg}`}>
                <k.icon className="h-5 w-5" />
              </span>
              <span className={`inline-flex items-center gap-0.5 text-[11px] font-semibold ${k.trend === "up" ? "text-accent" : "text-warning"}`}>
                {k.trend === "up" ? <ArrowUpRight className="h-3 w-3" /> : <TrendingUp className="h-3 w-3 rotate-180" />}
                {k.delta}
              </span>
            </div>
            <p className="relative mt-5 text-xs font-medium uppercase tracking-wider text-muted-foreground">{k.label}</p>
            <p className="relative mt-1 font-display text-3xl font-bold text-foreground">{k.value}</p>
          </div>
        ))}
      </div>

      {/* Two-col */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent payments */}
        <div className="xl:col-span-2 rounded-2xl bg-card border border-border overflow-hidden animate-fade-in-up">
          <div className="flex items-center justify-between p-5 border-b border-border">
            <div>
              <h3 className="font-display text-lg font-bold text-foreground">Recent payments</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Last 7 days · 5 transactions</p>
            </div>
            <Link to="/fees" className="text-xs font-semibold text-accent story-link inline-flex items-center gap-1">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground border-b border-border">
                  <th className="py-3 px-5 font-semibold">Student</th>
                  <th className="py-3 px-3 font-semibold">Amount</th>
                  <th className="py-3 px-3 font-semibold">Method</th>
                  <th className="py-3 px-3 font-semibold">Date</th>
                  <th className="py-3 px-5 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p, i) => (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/40 transition">
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-brand text-[11px] font-bold text-white">
                          {p.name.split(" ").map(w => w[0]).slice(0, 2).join("")}
                        </span>
                        <div>
                          <p className="font-semibold text-foreground">{p.name}</p>
                          <p className="text-[11px] text-muted-foreground">{p.admission}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 font-semibold text-foreground">{p.amount}</td>
                    <td className="py-3.5 px-3 text-muted-foreground">{p.method}</td>
                    <td className="py-3.5 px-3 text-muted-foreground">{p.date}</td>
                    <td className="py-3.5 px-5 text-right">
                      <Badge variant="outline" className={`border ${p.status === "Paid" ? "badge-soft-green" : "badge-soft-amber"}`}>
                        {p.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick actions */}
        <div className="rounded-2xl bg-card border border-border p-5 animate-fade-in-up">
          <h3 className="font-display text-lg font-bold text-foreground">Quick actions</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Jump back into common tasks</p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {quickActions.map((a) => (
              <Link key={a.label} to={a.href} className={`group relative overflow-hidden rounded-xl border border-border bg-gradient-to-br from-card to-secondary p-4 hover-lift`}>
                <span className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${a.grad} text-white shadow-md-soft`}>
                  <a.icon className="h-5 w-5" />
                </span>
                <p className="mt-3 text-sm font-semibold text-foreground">{a.label}</p>
                <ArrowRight className="absolute right-3 bottom-3 h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
              </Link>
            ))}
          </div>

          {/* Mini activity */}
          <div className="mt-6 pt-5 border-t border-border">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Upcoming</h4>
            <ul className="mt-3 space-y-3 text-sm">
              {[
                { d: "12", m: "OCT", t: "Mid-term break begins", c: "accent" },
                { d: "25", m: "OCT", t: "PTA general meeting", c: "info" },
                { d: "08", m: "NOV", t: "Inter-house sports", c: "warning" },
              ].map((e) => (
                <li key={e.t} className="flex items-center gap-3">
                  <div className="flex flex-col items-center justify-center rounded-lg bg-muted h-11 w-11 leading-none">
                    <span className="font-display text-base font-bold text-foreground">{e.d}</span>
                    <span className="text-[9px] uppercase text-muted-foreground tracking-wider">{e.m}</span>
                  </div>
                  <span className="text-foreground">{e.t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      </div>
      )}
    </AppLayout>
  );
};

// ---------------- Academic Calendar ----------------
const calendarEvents = [
  { date: "Sep 15", title: "First Term begins", type: "Term", icon: BookOpen, tone: "accent" },
  { date: "Sep 28", title: "PTA welcome assembly", type: "Meeting", icon: Megaphone, tone: "info" },
  { date: "Oct 12", title: "Mid-term break begins", type: "Break", icon: PartyPopper, tone: "warning" },
  { date: "Oct 16", title: "Resumption from mid-term", type: "Term", icon: BookOpen, tone: "accent" },
  { date: "Oct 25", title: "PTA general meeting", type: "Meeting", icon: Megaphone, tone: "info" },
  { date: "Nov 8", title: "Inter-house sports", type: "Event", icon: Trophy, tone: "warning" },
  { date: "Nov 22", title: "Science & Tech Fair", type: "Event", icon: Beaker, tone: "info" },
  { date: "Dec 1", title: "First Term Examinations begin", type: "Exam", icon: FileText, tone: "destructive" },
  { date: "Dec 15", title: "Report cards published", type: "Term", icon: FileText, tone: "accent" },
  { date: "Dec 19", title: "First Term ends · Carol service", type: "Term", icon: PartyPopper, tone: "accent" },
];

const toneClass: Record<string, string> = {
  accent: "bg-accent/10 text-accent border-accent/20",
  info: "bg-info/10 text-info border-info/25",
  warning: "bg-warning/10 text-warning border-warning/25",
  destructive: "bg-destructive/10 text-destructive border-destructive/25",
};

function AcademicCalendar() {
  const today = new Date();
  const month = today.toLocaleString("en-NG", { month: "long" });
  const year = today.getFullYear();
  const daysInMonth = new Date(year, today.getMonth() + 1, 0).getDate();
  const startDay = new Date(year, today.getMonth(), 1).getDay();
  const cells = Array.from({ length: 42 }, (_, i) => {
    const d = i - startDay + 1;
    return d >= 1 && d <= daysInMonth ? d : null;
  });
  const eventDays = new Set([12, 16, 25]); // demo highlights for current month

  return (
    <div className="animate-fade-in">
      {/* Term progress hero */}
      <div className="relative overflow-hidden rounded-3xl bg-card border border-border p-6 mb-6">
        <div className="absolute inset-0 bg-mesh opacity-60" />
        <div className="relative grid grid-cols-1 lg:grid-cols-[1.2fr_1fr_1fr_1fr] gap-5 items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 text-accent px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest border border-accent/20">
              <Calendar className="h-3 w-3" /> Current Term
            </span>
            <h2 className="mt-3 font-display text-2xl font-bold text-foreground">First Term · 2025/2026</h2>
            <p className="text-sm text-muted-foreground mt-1">Sep 15, 2025 → Dec 19, 2025</p>
          </div>
          {[
            { label: "Term Progress", value: "42%", sub: "39 of 95 days", pct: 42 },
            { label: "Next Holiday", value: "Oct 12", sub: "in 8 days", pct: 100 },
            { label: "Exams Begin", value: "Dec 1", sub: "in 58 days", pct: 30 },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-background/60 backdrop-blur p-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{s.label}</p>
              <p className="mt-1 font-display text-xl font-bold text-foreground">{s.value}</p>
              <p className="text-[11px] text-muted-foreground mb-2">{s.sub}</p>
              <div className="h-1 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-gradient-brand" style={{ width: `${s.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
        {/* Mini month grid */}
        <div className="rounded-3xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-bold text-foreground">{month} {year}</h3>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="inline-flex items-center gap-1.5 text-muted-foreground"><span className="h-2 w-2 rounded-full bg-accent" />Event</span>
              <span className="inline-flex items-center gap-1.5 text-muted-foreground"><span className="h-2 w-2 rounded-full bg-gradient-brand" />Today</span>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1.5 text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => <div key={d}>{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {cells.map((d, i) => {
              if (!d) return <div key={i} />;
              const isToday = d === today.getDate();
              const hasEvent = eventDays.has(d);
              return (
                <button
                  key={i}
                  className={`relative aspect-square rounded-xl text-sm font-semibold transition ${
                    isToday
                      ? "bg-gradient-brand text-white shadow-md-soft"
                      : hasEvent
                      ? "bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {d}
                  {hasEvent && !isToday && <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-accent" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Events timeline */}
        <div className="rounded-3xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-bold text-foreground">Upcoming events</h3>
            <button className="text-xs font-semibold text-accent story-link">All</button>
          </div>
          <div className="relative">
            <div className="absolute left-[14px] top-2 bottom-2 w-px bg-gradient-to-b from-accent/40 via-border to-transparent" />
            <ul className="space-y-3.5">
              {calendarEvents.map((e) => (
                <li key={e.title} className="relative flex items-start gap-3 pl-0">
                  <span className={`relative z-10 grid h-7 w-7 place-items-center rounded-full border ${toneClass[e.tone]} shrink-0`}>
                    <e.icon className="h-3.5 w-3.5" />
                  </span>
                  <div className="flex-1 min-w-0 -mt-0.5">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{e.date} · {e.type}</p>
                    <p className="text-sm font-semibold text-foreground leading-snug truncate">{e.title}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
