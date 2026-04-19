import { useState } from "react";
import { Activity, Server, Database, HardDrive, Globe, AlertTriangle, CheckCircle2, Clock, RefreshCw } from "lucide-react";
import { SuperAdminLayout } from "@/components/layout/SuperAdminLayout";
import { PageHeader } from "@/components/layout/PageHeader";

const metrics = [
  { label: "API p95", value: "142ms", sub: "across 4 regions", icon: Server, tone: "text-accent" },
  { label: "Error rate", value: "0.04%", sub: "last 24h", icon: AlertTriangle, tone: "text-info" },
  { label: "Queue depth", value: "48", sub: "messages in flight", icon: Database, tone: "text-info" },
  { label: "Storage", value: "1.2 / 5 TB", sub: "24% used", icon: HardDrive, tone: "text-primary" },
];

const regions = [
  { name: "Lagos (af-west-1)", latency: 38, status: "Healthy" },
  { name: "Abuja (af-west-2)", latency: 52, status: "Healthy" },
  { name: "Frankfurt (eu-central-1)", latency: 168, status: "Healthy" },
  { name: "London (eu-west-2)", latency: 174, status: "Degraded" },
];

const incidents = [
  { time: "Apr 18 · 14:22", title: "Webhook delivery delays", impact: "Minor", resolved: true },
  { time: "Apr 14 · 09:05", title: "Login latency spike (LON)", impact: "Minor", resolved: true },
  { time: "Apr 02 · 22:40", title: "Scheduled DB maintenance", impact: "Planned", resolved: true },
];

const services = [
  { name: "Auth API", status: "Operational" },
  { name: "Payments (Paystack)", status: "Operational" },
  { name: "WhatsApp delivery", status: "Operational" },
  { name: "Report PDF rendering", status: "Operational" },
  { name: "File storage", status: "Operational" },
  { name: "Email delivery", status: "Degraded" },
];

const statusTone: Record<string, string> = {
  Operational: "badge-soft-green",
  Healthy: "badge-soft-green",
  Degraded: "badge-soft-amber",
  Down: "badge-soft-red",
};

const AdminHealth = () => {
  const [pings, setPings] = useState([
    { name: "Database", status: "Operational", latency: 12 },
    { name: "AI Services", status: "Operational", latency: 45 },
    { name: "WhatsApp Gateway", status: "Degraded", latency: 312 },
  ]);
  const [refreshing, setRefreshing] = useState(false);

  const refresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setPings((p) => p.map((x) => ({ ...x, latency: Math.max(8, Math.round(x.latency * (0.7 + Math.random() * 0.6))) })));
      setRefreshing(false);
    }, 1500);
  };

  return (
    <SuperAdminLayout>
      <PageHeader
        title="Platform Health"
        subtitle="Live signals from infrastructure, services and regions."
        badge="Operations"
        actions={
          <span className="inline-flex items-center gap-2 rounded-xl border border-accent/20 bg-accent/10 px-3 h-10 text-xs font-semibold text-accent">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" /> All systems normal
          </span>
        }
      />

      {/* Top metrics */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-2xl border border-border bg-card p-5 hover-lift">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{m.label}</p>
              <span className={`grid h-9 w-9 place-items-center rounded-xl bg-muted/40 border border-border ${m.tone}`}>
                <m.icon className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-2 font-display text-3xl font-bold text-foreground">{m.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{m.sub}</p>
          </div>
        ))}
      </div>

      {/* Live ping widget */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display text-base font-semibold text-foreground">Live service ping</h3>
            <p className="text-xs text-muted-foreground">Synthetic checks every 30s</p>
          </div>
          <button onClick={refresh} disabled={refreshing} className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card hover:bg-muted px-3 h-9 text-xs font-semibold transition disabled:opacity-60">
            <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} /> Refresh
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {pings.map((p) => {
            const isOk = p.status === "Operational";
            return (
              <div key={p.name} className="flex items-center justify-between rounded-xl border border-border bg-muted/30 px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="relative grid h-2.5 w-2.5 place-items-center">
                    <span className={`absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping ${isOk ? "bg-accent" : "bg-warning"}`} />
                    <span className={`relative h-2 w-2 rounded-full ${isOk ? "bg-accent" : "bg-warning"}`} />
                  </span>
                  <span className="text-sm font-medium text-foreground">{p.name}</span>
                </div>
                <div className="text-right">
                  <p className="font-display text-sm font-bold text-foreground">{p.latency}ms</p>
                  <p className={`text-[10px] font-semibold uppercase ${isOk ? "text-accent" : "text-warning"}`}>{p.status}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Sparkline-ish chart */}
        <div className="xl:col-span-2 rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display text-base font-semibold text-foreground">API latency · last 24h</h3>
              <p className="text-xs text-muted-foreground">p50 / p95 across all regions</p>
            </div>
            <span className="text-xs text-muted-foreground">refreshed just now</span>
          </div>
          <FakeChart />
          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            {[
              { l: "p50", v: "78ms" },
              { l: "p95", v: "142ms" },
              { l: "p99", v: "284ms" },
            ].map((s) => (
              <div key={s.l} className="rounded-xl border border-border bg-muted/30 py-2.5">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{s.l}</p>
                <p className="font-display text-base font-bold text-foreground">{s.v}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Regions */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-base font-semibold text-foreground">Regions</h3>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="space-y-2.5">
            {regions.map((r) => (
              <div key={r.name} className="flex items-center justify-between rounded-xl border border-border bg-muted/30 px-3 py-2.5">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{r.name}</p>
                  <p className="text-[11px] text-muted-foreground">{r.latency}ms median</p>
                </div>
                <span className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold ${statusTone[r.status]}`}>
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mt-5">
        {/* Services */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-display text-base font-semibold text-foreground mb-4">Services</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {services.map((s) => (
              <div key={s.name} className="flex items-center justify-between rounded-xl border border-border bg-muted/30 px-3 py-2.5">
                <div className="flex items-center gap-2">
                  {s.status === "Operational" ? (
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-info" />
                  )}
                  <span className="text-sm text-foreground">{s.name}</span>
                </div>
                <span className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold ${statusTone[s.status]}`}>
                  {s.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Incidents */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-base font-semibold text-foreground">Recent incidents</h3>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </div>
          <ol className="relative border-l border-border ml-2 space-y-4">
            {incidents.map((i) => (
              <li key={i.title} className="ml-4">
                <span className="absolute -left-1.5 grid h-3 w-3 place-items-center rounded-full bg-accent ring-4 ring-accent/15" />
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                  <Clock className="h-3 w-3" /> {i.time}
                </div>
                <p className="mt-0.5 text-sm font-medium text-foreground">{i.title}</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold badge-soft-amber">{i.impact}</span>
                  {i.resolved && <span className="inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold badge-soft-green">Resolved</span>}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </SuperAdminLayout>
  );
};

function FakeChart() {
  // Decorative SVG sparkline using semantic tokens
  const points = [42, 38, 50, 46, 60, 52, 70, 64, 58, 72, 66, 80, 74, 68, 62, 70, 78, 72, 64, 58, 66, 60, 54, 62];
  const max = Math.max(...points);
  const w = 600;
  const h = 140;
  const step = w / (points.length - 1);
  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${i * step} ${h - (p / max) * (h - 20) - 10}`)
    .join(" ");
  const area = `${path} L ${w} ${h} L 0 ${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-36">
      <defs>
        <linearGradient id="fade" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.35" />
          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#fade)" />
      <path d={path} fill="none" stroke="hsl(var(--accent))" strokeWidth="2" />
    </svg>
  );
}

export default AdminHealth;
