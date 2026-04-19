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

          {active === "parent-portal" && <ParentPortalPanel />}

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

const ParentPortalPanel = () => {
  const [enabled, setEnabled] = useState(true);
  const [selfActivate, setSelfActivate] = useState(true);
  const [requireOtp, setRequireOtp] = useState(true);
  const [otpExpiry, setOtpExpiry] = useState(10);
  const [showFee, setShowFee] = useState(true);
  const [showResults, setShowResults] = useState(true);
  const [showNotices, setShowNotices] = useState(true);
  const [qrOpen, setQrOpen] = useState(false);
  const [confirmBlast, setConfirmBlast] = useState(false);
  const [copied, setCopied] = useState(false);
  const link = "https://edplix.app/brightstar/parent";

  const copyLink = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    toast.success("Link copied");
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <>
      <Panel title="Portal Status" desc="Control whether parents can sign in to their portal.">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-foreground">Enable parent portal for this school</p>
            <p className="text-xs text-muted-foreground mt-0.5">Parents will use the portal to view fees, results and school notices.</p>
          </div>
          <button onClick={() => setEnabled(!enabled)} className={`relative h-6 w-11 rounded-full transition shrink-0 ${enabled ? "bg-gradient-brand" : "bg-muted"}`} aria-pressed={enabled}>
            <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm-soft transition ${enabled ? "left-[22px]" : "left-0.5"}`} />
          </button>
        </div>
        {!enabled && (
          <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-warning/30 bg-warning/5 p-3 animate-fade-in">
            <AlertTriangle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
            <p className="text-xs text-foreground">Parents will not be able to log in while the portal is disabled.</p>
          </div>
        )}
      </Panel>

      <Panel title="Activation Settings" desc="How parents set up their accounts.">
        <Toggle title="Allow parents to self-activate" desc="If off, only an admin can generate parent credentials." defaultChecked={selfActivate} />
        <Toggle title="Require OTP verification during activation" desc="Adds a 6-digit code step to confirm the parent's phone number." defaultChecked={requireOtp} />
        <div className="flex items-center justify-between gap-4 py-3">
          <div>
            <p className="text-sm font-semibold text-foreground">OTP expiry duration</p>
            <p className="text-xs text-muted-foreground mt-0.5">How long an OTP remains valid after being sent.</p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number" min={1} max={60} value={otpExpiry}
              onChange={(e) => setOtpExpiry(Math.max(1, Math.min(60, Number(e.target.value) || 1)))}
              className="h-9 w-20 rounded-lg border border-border bg-background px-3 text-sm font-semibold text-center focus:outline-none focus:border-accent"
            />
            <span className="text-xs text-muted-foreground">minutes</span>
          </div>
        </div>
      </Panel>

      <Panel title="Portal Appearance" desc="Choose what parents can see on their dashboard.">
        <Toggle title="Show fee balance on parent dashboard" desc="Outstanding amounts and payment history." defaultChecked={showFee} />
        <Toggle title="Show results on parent dashboard" desc="Termly grades, scores and report cards." defaultChecked={showResults} />
        <Toggle title="Show school notices on parent dashboard" desc="Announcements, events and circulars." defaultChecked={showNotices} />
      </Panel>

      <Panel title="Parent Access Link" desc="Share this link with parents to access their portal.">
        <div className="flex items-center gap-2">
          <input readOnly value={link} className="h-11 flex-1 rounded-xl border border-border bg-muted/30 px-3.5 text-sm font-mono text-foreground focus:outline-none" />
          <button onClick={copyLink} className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 h-11 text-xs font-semibold hover:bg-muted transition">
            {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied" : "Copy"}
          </button>
          <button onClick={() => setQrOpen(true)} className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 h-11 text-xs font-semibold hover:bg-muted transition">
            <QrCode className="h-4 w-4" /> QR Code
          </button>
        </div>
      </Panel>

      <Panel title="Bulk Actions" desc="Mass-manage parent access for your school.">
        <div className="flex flex-wrap gap-2">
          <button onClick={() => toast.success("CSV exported", { description: "parent-credentials.csv (342 rows)" })} className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 h-10 text-sm font-semibold hover:bg-muted transition">
            <Download className="h-4 w-4" /> Export parent credentials CSV
          </button>
          <button onClick={() => setConfirmBlast(true)} className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-brand text-white px-4 h-10 text-sm font-semibold shadow-md-soft hover:shadow-glow transition">
            <Send className="h-4 w-4" /> Send activation links to all parents
          </button>
        </div>
      </Panel>

      <Dialog open={qrOpen} onOpenChange={setQrOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Parent Portal QR Code</DialogTitle>
            <DialogDescription>Print and display this QR at the school gate or in the PTA newsletter.</DialogDescription>
          </DialogHeader>
          <div className="grid place-items-center py-6">
            <div className="grid h-56 w-56 place-items-center rounded-2xl border-2 border-dashed border-border bg-muted/30 text-muted-foreground">
              <div className="text-center">
                <QrCode className="mx-auto h-16 w-16" />
                <p className="mt-2 text-xs">QR code will be generated here</p>
              </div>
            </div>
          </div>
          <p className="text-center text-[11px] text-muted-foreground font-mono break-all">{link}</p>
        </DialogContent>
      </Dialog>

      <AlertDialog open={confirmBlast} onOpenChange={setConfirmBlast}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Send activation links to all parents?</AlertDialogTitle>
            <AlertDialogDescription>
              This will send WhatsApp messages to all 342 parents. Continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => toast.success("Activation links sent to 342 parents")}>
              Send to all
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Settings;
