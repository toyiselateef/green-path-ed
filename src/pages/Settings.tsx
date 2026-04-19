import { useState } from "react";
import { School, Palette, Calendar, CreditCard, Bell, Shield, Globe, Upload, Check, FileText, Users, Copy, QrCode, Download, Send, AlertTriangle } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { SchoolContentManager } from "@/components/content/SchoolContentManager";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const tabs = [
  { id: "school", label: "School Profile", icon: School },
  { id: "academic", label: "Academic Year", icon: Calendar },
  { id: "content", label: "School Content", icon: FileText },
  { id: "parent-portal", label: "Parent Portal", icon: Users },
  { id: "branding", label: "Branding", icon: Palette },
  { id: "billing", label: "Billing & Plan", icon: CreditCard },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "locale", label: "Locale", icon: Globe },
];

const Settings = () => {
  const [active, setActive] = useState("school");

  return (
    <AppLayout>
      <PageHeader title="School Settings" subtitle="Manage your school profile, branding, terms and preferences." badge="Workspace" />

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
        {/* Side nav */}
        <aside className="lg:sticky lg:top-20 self-start">
          <nav className="rounded-2xl border border-border bg-card p-2">
            {tabs.map((t) => {
              const isActive = active === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  className={`group w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                    isActive ? "bg-gradient-brand text-white shadow-md-soft" : "text-foreground hover:bg-muted"
                  }`}
                >
                  <t.icon className="h-4 w-4" />
                  <span className="truncate">{t.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Panel */}
        <section className="space-y-6">
          {active === "school" && (
            <>
              <Panel title="School Identity" desc="This information appears on report cards, invoices and the parent portal.">
                <div className="flex items-start gap-5 mb-6">
                  <div className="relative">
                    <div className="grid h-20 w-20 place-items-center rounded-2xl bg-gradient-brand text-white font-display text-2xl font-bold shadow-md-soft">B</div>
                    <button className="absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-full bg-card border border-border shadow-sm-soft hover:bg-muted">
                      <Upload className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">School logo</p>
                    <p className="text-xs text-muted-foreground mt-0.5">PNG or SVG, transparent background, square aspect, max 2MB.</p>
                    <button className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 h-8 text-xs font-semibold hover:bg-muted">
                      <Upload className="h-3.5 w-3.5" /> Upload new
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="School Name" defaultValue="Brightstar High School" />
                  <Field label="Motto" defaultValue="Knowledge · Discipline · Service" />
                  <Field label="Address" defaultValue="14, Admiralty Way, Lekki Phase 1, Lagos" />
                  <Field label="Phone" defaultValue="+234 802 555 0119" />
                  <Field label="Email" defaultValue="hello@brightstar.ng" type="email" />
                  <Field label="Website" defaultValue="brightstar.ng" />
                </div>
              </Panel>

              <Panel title="Proprietor & Principal">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Proprietor" defaultValue="Mr. Adewale Ogunyemi" />
                  <Field label="Principal" defaultValue="Mrs. Kemi Adebayo" />
                  <Field label="Vice Principal (Academics)" defaultValue="Mrs. Funke Adeyemi" />
                  <Field label="Vice Principal (Admin)" defaultValue="Mr. Emeka Obi" />
                </div>
              </Panel>
            </>
          )}

          {active === "academic" && (
            <Panel title="Academic Year & Terms" desc="Configure the current session, terms and grading scale.">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <Select label="Current Session" options={["2024/2025", "2025/2026", "2026/2027"]} value="2025/2026" />
                <Select label="Current Term" options={["First Term", "Second Term", "Third Term"]} value="First Term" />
                <Field label="Term Begins" type="date" defaultValue="2025-09-15" />
                <Field label="Term Ends" type="date" defaultValue="2025-12-19" />
              </div>
              <div className="rounded-xl border border-border p-4">
                <p className="text-sm font-semibold text-foreground mb-3">Grading Scale</p>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                  {[["A", "75-100"], ["B", "60-74"], ["C", "50-59"], ["D", "40-49"], ["F", "0-39"]].map(([g, r]) => (
                    <div key={g} className="rounded-lg border border-border bg-muted/30 p-2.5 text-center">
                      <p className="font-display text-lg font-bold text-primary">{g}</p>
                      <p className="text-muted-foreground">{r}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Panel>
          )}

          {active === "content" && <SchoolContentManager />}

          {active === "branding" && (
            <Panel title="Brand Colors" desc="These colors appear on parent portal headers and report cards.">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { name: "Primary", hex: "#0A6640" },
                  { name: "Accent", hex: "#22C37A" },
                  { name: "Surface", hex: "#FFFFFF" },
                  { name: "Ink", hex: "#0F1F18" },
                ].map((c) => (
                  <div key={c.name} className="rounded-xl border border-border overflow-hidden">
                    <div className="h-20" style={{ background: c.hex }} />
                    <div className="p-3">
                      <p className="text-xs text-muted-foreground">{c.name}</p>
                      <p className="text-sm font-mono font-semibold text-foreground">{c.hex}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          )}

          {active === "billing" && (
            <Panel title="Plan & Billing">
              <div className="rounded-2xl bg-gradient-brand p-6 text-white shadow-md-soft relative overflow-hidden">
                <div className="absolute inset-0 grid-pattern opacity-30" />
                <div className="relative flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-white/70">Current Plan</p>
                    <p className="font-display text-2xl font-bold mt-1">Growth · ₦35,000 / term</p>
                    <p className="text-sm text-white/80 mt-1">Up to 500 students · WhatsApp delivery · Unlimited reports</p>
                  </div>
                  <button className="rounded-xl bg-white text-primary-deep px-4 h-10 text-sm font-semibold shadow-md-soft hover:shadow-glow transition">Upgrade to Pro</button>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                {["500 students", "Unlimited staff", "WhatsApp report cards"].map((f) => (
                  <div key={f} className="flex items-center gap-2 rounded-xl border border-border p-3">
                    <Check className="h-4 w-4 text-accent" /> <span className="text-foreground">{f}</span>
                  </div>
                ))}
              </div>
            </Panel>
          )}

          {active === "notifications" && (
            <Panel title="Notification Preferences">
              {[
                { t: "New payment received", d: "Email + WhatsApp to bursar and proprietor" },
                { t: "Outstanding fees reminder", d: "Auto-send to parents every Monday" },
                { t: "Result entry deadline", d: "Notify class teachers 3 days before" },
                { t: "Parent portal logins", d: "Daily summary to admin" },
              ].map((n, i) => (
                <Toggle key={n.t} title={n.t} desc={n.d} defaultChecked={i !== 3} />
              ))}
            </Panel>
          )}

          {active === "security" && (
            <Panel title="Security">
              <Toggle title="Two-factor authentication" desc="Require OTP via SMS for all staff logins" defaultChecked />
              <Toggle title="Single sign-on (Google)" desc="Allow staff to sign in with their Google Workspace account" />
              <Toggle title="Audit log" desc="Track every change to student records and fees" defaultChecked />
            </Panel>
          )}

          {active === "locale" && (
            <Panel title="Locale & Currency">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select label="Country" options={["Nigeria", "Ghana", "Kenya"]} value="Nigeria" />
                <Select label="Currency" options={["NGN ₦", "USD $", "GHS ₵"]} value="NGN ₦" />
                <Select label="Timezone" options={["Africa/Lagos (WAT)", "Africa/Accra (GMT)"]} value="Africa/Lagos (WAT)" />
                <Select label="Date format" options={["DD/MM/YYYY", "MM/DD/YYYY"]} value="DD/MM/YYYY" />
              </div>
            </Panel>
          )}

          <div className="flex justify-end gap-2">
            <button className="rounded-xl border border-border bg-card px-4 h-10 text-sm font-semibold hover:bg-muted">Cancel</button>
            <button className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-brand text-white px-5 h-10 text-sm font-semibold shadow-md-soft hover:shadow-glow transition">
              <Check className="h-4 w-4" /> Save changes
            </button>
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

const Panel = ({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) => (
  <div className="rounded-2xl border border-border bg-card p-6">
    <div className="mb-5">
      <h2 className="font-display text-lg font-bold text-foreground">{title}</h2>
      {desc && <p className="text-sm text-muted-foreground mt-1">{desc}</p>}
    </div>
    {children}
  </div>
);

const Field = ({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <label className="block">
    <span className="block text-xs font-semibold text-foreground mb-1.5">{label}</span>
    <input {...props} className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40" />
  </label>
);

const Select = ({ label, options, value }: { label: string; options: string[]; value: string }) => (
  <label className="block">
    <span className="block text-xs font-semibold text-foreground mb-1.5">{label}</span>
    <select defaultValue={value} className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40">
      {options.map((o) => <option key={o}>{o}</option>)}
    </select>
  </label>
);

const Toggle = ({ title, desc, defaultChecked }: { title: string; desc: string; defaultChecked?: boolean }) => {
  const [on, setOn] = useState(!!defaultChecked);
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-border last:border-0">
      <div>
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
      </div>
      <button
        onClick={() => setOn(!on)}
        className={`relative h-6 w-11 rounded-full transition ${on ? "bg-gradient-brand" : "bg-muted"}`}
        aria-pressed={on}
      >
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm-soft transition ${on ? "left-[22px]" : "left-0.5"}`} />
      </button>
    </div>
  );
};

export default Settings;
