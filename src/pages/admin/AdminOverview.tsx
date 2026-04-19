import { Building2, Users, Wallet, Activity, ArrowUpRight, Server, Database, HardDrive } from "lucide-react";
import { SuperAdminLayout } from "@/components/layout/SuperAdminLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { SchoolLogo } from "@/lib/schoolLogo";

const kpis = [
  { label: "Total Schools", value: "240", delta: "+12 this month", icon: Building2, tone: "from-primary-deep to-primary" },
  { label: "Total Students", value: "120k", delta: "+4.2% vs last month", icon: Users, tone: "from-primary to-accent" },
  { label: "MRR", value: "₦8.4M", delta: "+₦480k MoM", icon: Wallet, tone: "from-accent to-primary-glow" },
  { label: "Active This Week", value: "187", delta: "78% of schools", icon: Activity, tone: "from-primary-glow to-accent" },
];

const signups = [
  { name: "Bright Stars Academy", slug: "bright-stars", plan: "Growth", students: 412, joined: "2h ago", status: "Trial" },
  { name: "Greenfield College", slug: "greenfield", plan: "Enterprise", students: 1284, joined: "5h ago", status: "Active" },
  { name: "Sunrise Montessori", slug: "sunrise", plan: "Starter", students: 96, joined: "1d ago", status: "Active" },
  { name: "Royal Heights School", slug: "royal-heights", plan: "Growth", students: 540, joined: "2d ago", status: "Trial" },
  { name: "Premier Int'l", slug: "premier-intl", plan: "Free", students: 38, joined: "3d ago", status: "Suspended" },
];

const planTone: Record<string, string> = {
  Free: "badge-soft-gray",
  Starter: "badge-soft-blue",
  Growth: "badge-soft-green",
  Enterprise: "bg-gradient-brand text-white border-transparent",
};
const statusTone: Record<string, string> = {
  Active: "badge-soft-green",
  Trial: "badge-soft-amber",
  Suspended: "badge-soft-red",
};

const health = [
  { label: "API Latency", value: "142ms", sub: "p95 across regions", icon: Server, tone: "text-accent" },
  { label: "Queue Depth", value: "48", sub: "messages in flight", icon: Database, tone: "text-info" },
  { label: "Storage Used", value: "1.2 TB", sub: "of 5 TB allocated", icon: HardDrive, tone: "text-primary" },
];

const AdminOverview = () => {
  return (
    <SuperAdminLayout>
      <PageHeader
        title="Platform Overview"
        subtitle="Real-time view of every school running on EdPlix."
        badge="Superadmin"
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-brand px-4 h-10 text-sm font-semibold text-white shadow-md hover:shadow-glow transition-all">
            <ArrowUpRight className="h-4 w-4" /> Export report
          </button>
        }
      />

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {kpis.map((k) => (
          <div key={k.label} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 hover-lift">
            <div className={`absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br ${k.tone} opacity-15 blur-2xl group-hover:opacity-25 transition`} />
            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{k.label}</p>
                <p className="mt-2 font-display text-3xl font-bold text-foreground">{k.value}</p>
                <p className="mt-1.5 text-xs text-accent font-medium">{k.delta}</p>
              </div>
              <span className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${k.tone} text-white shadow-md`}>
                <k.icon className="h-5 w-5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Signups */}
        <div className="xl:col-span-2 rounded-2xl border border-border bg-card overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div>
              <h3 className="font-display text-base font-semibold text-foreground">Recent school signups</h3>
              <p className="text-xs text-muted-foreground">Latest 5 schools onboarded</p>
            </div>
            <button className="text-xs font-semibold text-accent hover:underline">View all →</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/40">
                <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-3 font-semibold">School</th>
                  <th className="px-5 py-3 font-semibold">Plan</th>
                  <th className="px-5 py-3 font-semibold">Students</th>
                  <th className="px-5 py-3 font-semibold">Joined</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {signups.map((s) => (
                  <tr key={s.name} className="hover:bg-muted/30 transition">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <SchoolLogo name={s.name} slug={s.slug} size="sm" />
                        <span className="font-medium text-foreground">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${planTone[s.plan]}`}>{s.plan}</span>
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground">{s.students.toLocaleString()}</td>
                    <td className="px-5 py-3.5 text-muted-foreground">{s.joined}</td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${statusTone[s.status]}`}>{s.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Health */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-base font-semibold text-foreground">Platform Health</h3>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 border border-accent/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" /> Healthy
            </span>
          </div>
          <div className="space-y-3">
            {health.map((h) => (
              <div key={h.label} className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 p-3 hover-lift">
                <span className={`grid h-10 w-10 place-items-center rounded-xl bg-card border border-border ${h.tone}`}>
                  <h.icon className="h-4.5 w-4.5" />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-muted-foreground">{h.label}</p>
                    <p className="font-display text-sm font-bold text-foreground">{h.value}</p>
                  </div>
                  <p className="text-[11px] text-muted-foreground">{h.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SuperAdminLayout>
  );
};

export default AdminOverview;
