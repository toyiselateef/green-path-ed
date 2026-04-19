import { CreditCard, TrendingUp, Download, Sparkles, CheckCircle2, ArrowUpRight } from "lucide-react";
import { SuperAdminLayout } from "@/components/layout/SuperAdminLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { SchoolLogo } from "@/lib/schoolLogo";

const plans = [
  {
    name: "Free",
    price: "₦0",
    cadence: "forever",
    schools: 38,
    features: ["Up to 50 students", "Core gradebook", "Community support"],
    accent: "from-slate-400 to-slate-600",
  },
  {
    name: "Starter",
    price: "₦25k",
    cadence: "/term",
    schools: 92,
    features: ["Up to 250 students", "Fees + invoices", "Email support"],
    accent: "from-sky-500 to-blue-600",
  },
  {
    name: "Growth",
    price: "₦80k",
    cadence: "/term",
    schools: 84,
    features: ["Up to 1,000 students", "WhatsApp blasts", "Priority support"],
    accent: "from-emerald-500 to-teal-600",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "annual",
    schools: 26,
    features: ["Unlimited students", "Dedicated CSM", "SLA + on-prem option"],
    accent: "from-primary to-accent",
  },
];

const invoices = [
  { school: "Greenfield College", slug: "greenfield", plan: "Enterprise", amount: "₦1,200,000", status: "Paid", due: "Apr 12, 2026" },
  { school: "Crescent Academy", slug: "crescent", plan: "Enterprise", amount: "₦1,100,000", status: "Paid", due: "Apr 10, 2026" },
  { school: "Royal Heights School", slug: "royal-heights", plan: "Growth", amount: "₦80,000", status: "Pending", due: "Apr 22, 2026" },
  { school: "Bright Stars Academy", slug: "bright-stars", plan: "Growth", amount: "₦80,000", status: "Paid", due: "Apr 8, 2026" },
  { school: "Premier International", slug: "premier-intl", plan: "Starter", amount: "₦25,000", status: "Overdue", due: "Apr 1, 2026" },
];

const statusTone: Record<string, string> = {
  Paid: "badge-soft-green",
  Pending: "badge-soft-amber",
  Overdue: "badge-soft-red",
};

const AdminBilling = () => {
  return (
    <SuperAdminLayout>
      <PageHeader
        title="Plans & Billing"
        subtitle="Subscriptions, invoices and revenue across the platform."
        badge="Finance"
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-brand px-4 h-10 text-sm font-semibold text-white shadow-md hover:shadow-glow transition-all">
            <Download className="h-4 w-4" /> Export ledger
          </button>
        }
      />

      {/* Revenue strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: "MRR", value: "₦8.4M", delta: "+5.7% MoM", icon: TrendingUp },
          { label: "ARR", value: "₦100.8M", delta: "Projected", icon: Sparkles },
          { label: "Outstanding", value: "₦620k", delta: "12 invoices", icon: CreditCard },
        ].map((k) => (
          <div key={k.label} className="rounded-2xl border border-border bg-card p-5 hover-lift">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{k.label}</p>
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand text-white">
                <k.icon className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-2 font-display text-3xl font-bold text-foreground">{k.value}</p>
            <p className="mt-1 text-xs text-accent font-medium">{k.delta}</p>
          </div>
        ))}
      </div>

      {/* Revenue chart */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-display text-base font-semibold text-foreground">Monthly revenue</h3>
            <p className="text-xs text-muted-foreground">Last 6 months · MRR by month</p>
          </div>
          <span className="text-xs text-accent font-semibold">+18.2% vs prior period</span>
        </div>
        <RevenueBars />
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`relative rounded-2xl border bg-card p-5 hover-lift ${
              p.popular ? "border-accent shadow-md" : "border-border"
            }`}
          >
            {p.popular && (
              <span className="absolute -top-2.5 left-5 rounded-full bg-gradient-brand px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                Most popular
              </span>
            )}
            <span className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${p.accent} text-white shadow-sm`}>
              <CreditCard className="h-5 w-5" />
            </span>
            <h3 className="mt-3 font-display text-lg font-bold text-foreground">{p.name}</h3>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="font-display text-2xl font-bold text-foreground">{p.price}</span>
              <span className="text-xs text-muted-foreground">{p.cadence}</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">{p.schools}</span> schools active
            </p>
            <ul className="mt-4 space-y-1.5">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-xs text-foreground">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <button className="mt-4 w-full rounded-xl border border-border bg-muted/30 hover:bg-muted py-2 text-xs font-semibold text-foreground transition">
              Edit plan
            </button>
          </div>
        ))}
      </div>

      {/* Invoices */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div>
            <h3 className="font-display text-base font-semibold text-foreground">Recent invoices</h3>
            <p className="text-xs text-muted-foreground">Last 5 charges across all schools</p>
          </div>
          <button className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline">
            View all <ArrowUpRight className="h-3 w-3" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40">
              <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3 font-semibold">School</th>
                <th className="px-5 py-3 font-semibold">Plan</th>
                <th className="px-5 py-3 font-semibold">Amount</th>
                <th className="px-5 py-3 font-semibold">Due</th>
                <th className="px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {invoices.map((i) => (
                <tr key={i.school} className="hover:bg-muted/30 transition">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <SchoolLogo name={i.school} slug={i.slug} size="sm" />
                      <span className="font-medium text-foreground">{i.school}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">{i.plan}</td>
                  <td className="px-5 py-3.5 font-semibold text-foreground">{i.amount}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{i.due}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${statusTone[i.status]}`}>
                      {i.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SuperAdminLayout>
  );
};

function RevenueBars() {
  const data = [
    { m: "Nov", v: 6.2 }, { m: "Dec", v: 6.8 }, { m: "Jan", v: 7.1 },
    { m: "Feb", v: 7.6 }, { m: "Mar", v: 7.9 }, { m: "Apr", v: 8.4 },
  ];
  const max = Math.max(...data.map((d) => d.v));
  return (
    <div className="grid grid-cols-6 gap-3 items-end h-44">
      {data.map((d) => {
        const pct = (d.v / max) * 100;
        return (
          <div key={d.m} className="flex flex-col items-center gap-2 h-full">
            <div className="flex-1 w-full flex items-end">
              <div
                className="w-full rounded-t-lg bg-gradient-to-t from-primary to-accent transition-all hover:opacity-80"
                style={{ height: `${pct}%` }}
                title={`₦${d.v}M`}
              />
            </div>
            <div className="text-center">
              <p className="text-[10px] font-bold text-foreground">₦{d.v}M</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{d.m}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AdminBilling;
