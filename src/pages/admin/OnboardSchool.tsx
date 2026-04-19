import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Building2, User, Mail, Phone, Globe, MapPin, Quote, Hash, Calendar, Sparkles, RefreshCw, ChevronDown, GraduationCap, Lock, CheckCircle2, Copy, Send } from "lucide-react";
import { SuperAdminLayout } from "@/components/layout/SuperAdminLayout";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";

const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const genPassword = () => Math.random().toString(36).slice(2, 6) + "-" + Math.random().toString(36).slice(2, 6).toUpperCase();

const plans = [
  { id: "free", name: "Free", price: "₦0", limit: "Up to 50 students", tone: "badge-soft-gray" },
  { id: "starter", name: "Starter", price: "₦15k/mo", limit: "Up to 200 students", tone: "badge-soft-blue" },
  { id: "growth", name: "Growth", price: "₦40k/mo", limit: "Up to 800 students", tone: "badge-soft-green" },
  { id: "enterprise", name: "Enterprise", price: "Custom", limit: "Unlimited students", tone: "bg-gradient-brand text-white border-transparent" },
];

const OnboardSchool = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [password, setPassword] = useState(genPassword());
  const [plan, setPlan] = useState("growth");
  const [adminEmail, setAdminEmail] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [provisioned, setProvisioned] = useState(false);

  const handleName = (v: string) => {
    setName(v);
    if (!slugTouched) setSlug(slugify(v));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !slug.trim()) {
      toast.error("School name and slug are required");
      return;
    }
    setConfirmOpen(true);
  };

  const provision = () => {
    setProvisioned(true);
    toast.success("School provisioned successfully");
  };

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied`);
  };

  return (
    <SuperAdminLayout>
      <Link to="/admin/schools" className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition mb-4 story-link">
        <ArrowLeft className="h-3.5 w-3.5" /> Schools
      </Link>

      <div className="mb-8 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-accent mb-2">
            <Sparkles className="h-3 w-3" /> Superadmin
          </span>
          <h1 className="font-display text-3xl font-bold text-foreground tracking-tight">Onboard a new school</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">Provision a brand-new EdPlix workspace in under 60 seconds.</p>
        </div>
      </div>

      <form className="rounded-2xl bg-card border border-border shadow-md overflow-hidden animate-fade-in-up">
        {/* Section 1 */}
        <Section title="School Identity" subtitle="Basic information about the school. The slug becomes part of their portal URL.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="School Name" required placeholder="Bright Stars Academy" icon={Building2} value={name} onChange={handleName} />
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-foreground">Slug <span className="text-destructive">*</span></label>
              <div className="group relative flex">
                <span className="inline-flex items-center rounded-l-xl border border-r-0 border-input bg-muted px-3 text-xs text-muted-foreground">edplix.app/</span>
                <input
                  value={slug}
                  onChange={(e) => { setSlug(slugify(e.target.value)); setSlugTouched(true); }}
                  className="h-12 flex-1 rounded-r-xl border border-input bg-background px-3.5 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/15 transition"
                  placeholder="bright-stars"
                />
              </div>
            </div>
            <Field label="Address" placeholder="12 Awolowo Way, Ikeja, Lagos" icon={MapPin} className="md:col-span-2" />
            <Field label="Phone" placeholder="+234 803 145 7821" icon={Phone} />
            <Field label="Email" type="email" placeholder="hello@brightstars.edu.ng" icon={Mail} />
            <Field label="Website" placeholder="https://brightstars.edu.ng" icon={Globe} />
            <Field label="Motto" placeholder="Knowledge & Excellence" icon={Quote} />
          </div>
        </Section>

        <div className="h-px bg-border" />

        {/* Section 2 */}
        <Section title="Admin Account" subtitle="The proprietor's credentials. They'll receive a welcome email with login info.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="First Name" required placeholder="Adewale" icon={User} />
            <Field label="Last Name" required placeholder="Johnson" icon={User} />
            <Field label="Email" required type="email" placeholder="adewale@brightstars.edu.ng" icon={Mail} className="md:col-span-2" />
            <div className="md:col-span-2">
              <label className="mb-1.5 flex items-center gap-2 text-xs font-semibold text-foreground">
                <Lock className="h-3.5 w-3.5 text-accent" /> Temporary Password
              </label>
              <div className="flex gap-2">
                <div className="group relative flex-1">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 w-full rounded-xl border border-input bg-background px-3.5 pr-3 font-mono text-sm focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/15 transition"
                  />
                </div>
                <button type="button" onClick={() => setPassword(genPassword())} className="inline-flex items-center gap-1.5 rounded-xl border border-input bg-card px-4 h-12 text-xs font-semibold text-foreground hover:bg-muted transition">
                  <RefreshCw className="h-3.5 w-3.5" /> Regenerate
                </button>
              </div>
              <p className="mt-1.5 text-[11px] text-muted-foreground">Admin must change this password on first login.</p>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-foreground">Role</label>
              <div className="h-12 flex items-center gap-2 rounded-xl border border-input bg-muted/40 px-3.5">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-brand text-white"><Sparkles className="h-3.5 w-3.5" /></span>
                <span className="text-sm font-semibold text-foreground">Proprietor</span>
                <span className="ml-auto text-[10px] uppercase tracking-wider text-muted-foreground">Locked</span>
              </div>
            </div>
          </div>
        </Section>

        <div className="h-px bg-border" />

        {/* Section 3 */}
        <Section title="Plan & Limits" subtitle="Choose the right tier. You can override limits and trial duration here.">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
            {plans.map((p) => (
              <button
                type="button"
                key={p.id}
                onClick={() => setPlan(p.id)}
                className={`relative text-left rounded-2xl border p-4 transition-all ${
                  plan === p.id
                    ? "border-accent ring-4 ring-accent/15 bg-accent/5 shadow-md"
                    : "border-border bg-card hover:border-accent/40"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${p.tone}`}>{p.name}</span>
                  {plan === p.id && <span className="grid h-5 w-5 place-items-center rounded-full bg-accent text-white text-[10px]">✓</span>}
                </div>
                <p className="font-display text-lg font-bold text-foreground">{p.price}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{p.limit}</p>
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Max Students Override" type="number" placeholder="800" icon={Hash} />
            <Field label="Trial End Date" type="date" icon={Calendar} />
          </div>
        </Section>

        <div className="h-px bg-border" />

        {/* Section 4 */}
        <Section title="Initial Setup" subtitle="Pre-configure the school's first academic session and term.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Academic Session" required placeholder="2025/2026" icon={GraduationCap} />
            <SelectField label="Current Term" options={["First Term", "Second Term", "Third Term"]} required />
            <Field label="Term Start Date" type="date" icon={Calendar} />
            <Field label="Term End Date" type="date" icon={Calendar} />
          </div>
        </Section>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 px-6 sm:px-8 py-5 bg-muted/40 border-t border-border">
          <p className="text-xs text-muted-foreground">By creating, the admin will receive a welcome email with their login credentials.</p>
          <div className="flex items-center gap-3">
            <Link to="/admin/schools" className="inline-flex items-center justify-center rounded-xl border border-input bg-card px-5 h-11 text-sm font-medium text-foreground hover:bg-muted transition">
              Cancel
            </Link>
            <button type="submit" className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-brand px-6 h-11 text-sm font-semibold text-white shadow-md hover:shadow-glow transition-all">
              <Sparkles className="h-4 w-4" /> Create School & Send Welcome Email
            </button>
          </div>
        </div>
      </form>
    </SuperAdminLayout>
  );
};

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="px-6 sm:px-8 py-7">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">{title}</p>
          {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        <div className="lg:col-span-2">{children}</div>
      </div>
    </div>
  );
}

interface FieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  icon?: React.ElementType;
  className?: string;
  value?: string;
  onChange?: (v: string) => void;
}
function Field({ label, type = "text", placeholder, required, icon: Icon, className, value, onChange }: FieldProps) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-xs font-semibold text-foreground">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <div className="group relative">
        {Icon && <Icon className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-accent transition-colors" />}
        <input
          type={type}
          value={value}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          placeholder={placeholder}
          className={`h-12 w-full rounded-xl border border-input bg-background ${Icon ? "pl-10" : "pl-3.5"} pr-3 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/15 transition`}
        />
      </div>
    </div>
  );
}

function SelectField({ label, options, required }: { label: string; options: string[]; required?: boolean }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-foreground">{label} {required && <span className="text-destructive">*</span>}</label>
      <div className="relative">
        <select className="h-12 w-full rounded-xl border border-input bg-background pl-3.5 pr-10 text-sm focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/15 transition appearance-none">
          {options.map(o => <option key={o}>{o}</option>)}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  );
}

export default OnboardSchool;
