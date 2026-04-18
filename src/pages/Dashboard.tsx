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
    </AppLayout>
  );
};

export default Dashboard;
