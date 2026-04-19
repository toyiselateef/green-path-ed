import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, User, Mail, Phone, Calendar, Hash, BookOpen, ChevronDown, Camera, Lock, RefreshCw, Eye, EyeOff, Sparkles, Briefcase, GraduationCap, X } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";

const roles = ["Principal", "Vice Principal (Academics)", "Vice Principal (Admin)", "Bursar", "Teacher", "Admin Staff", "Support Staff"];
const subjectOptions = ["Mathematics", "English", "Physics", "Chemistry", "Biology", "Economics", "Geography", "Literature", "Civic Edu"];
const classOptions = ["JSS1A", "JSS1B", "JSS2A", "JSS2B", "JSS3A", "SSS1A", "SSS2A", "SSS3A"];

const genId = () => "STF/" + new Date().getFullYear() + "/" + Math.floor(100 + Math.random() * 900);
const genPwd = () => Math.random().toString(36).slice(2, 6) + "-" + Math.random().toString(36).slice(2, 6).toUpperCase();

const AddStaff = () => {
  const [gender, setGender] = useState<"Male" | "Female">("Male");
  const [role, setRole] = useState("Teacher");
  const [empType, setEmpType] = useState<"Full-time" | "Part-time" | "Contract">("Full-time");
  const [staffId, setStaffId] = useState(genId());
  const [password, setPassword] = useState(genPwd());
  const [showPwd, setShowPwd] = useState(false);
  const [welcomeEmail, setWelcomeEmail] = useState(true);
  const [subjects, setSubjects] = useState<string[]>(["Mathematics"]);
  const [classesAssigned, setClassesAssigned] = useState<string[]>(["JSS1A"]);

  const showSubjects = role === "Teacher" || role.startsWith("Vice Principal");

  return (
    <AppLayout>
      <Link to="/staff" className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition mb-4 story-link">
        <ArrowLeft className="h-3.5 w-3.5" /> Staff
      </Link>

      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground tracking-tight">Add Staff Member</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">Create a profile and login for a new team member. Required fields are marked with <span className="text-destructive">*</span>.</p>
      </div>

      <form className="rounded-2xl bg-card border border-border shadow-md overflow-hidden animate-fade-in-up">
        {/* Section 1 */}
        <Section title="Personal Information" subtitle="How this person identifies and how they're verified.">
          <div className="flex items-start gap-6 mb-5">
            <button type="button" className="group relative shrink-0">
              <span className="grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-muted to-muted/50 border-2 border-dashed border-input group-hover:border-accent transition">
                <Camera className="h-6 w-6 text-muted-foreground group-hover:text-accent transition" />
              </span>
              <span className="absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-full bg-gradient-brand text-white shadow-md text-xs font-bold">+</span>
            </button>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Profile Photo</p>
              <p className="text-xs text-muted-foreground mt-1">Square image, at least 400×400px. JPG or PNG, max 2MB.</p>
              <button type="button" className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-input bg-card px-3 h-8 text-xs font-medium hover:bg-muted transition">Upload Photo</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="First Name" required placeholder="Adewale" icon={User} />
            <Field label="Last Name" required placeholder="Johnson" icon={User} />
            <Field label="Date of Birth" type="date" icon={Calendar} />
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-foreground">Gender</label>
              <div className="inline-flex w-full rounded-xl border border-input bg-background p-1">
                {(["Male", "Female"] as const).map((g) => (
                  <button key={g} type="button" onClick={() => setGender(g)} className={`flex-1 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${gender === g ? "bg-gradient-brand text-white shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                    {g}
                  </button>
                ))}
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="mb-1.5 flex items-center gap-2 text-xs font-semibold text-foreground">
                <Lock className="h-3.5 w-3.5 text-accent" /> NIN (National ID Number)
                <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-accent">Sensitive</span>
              </label>
              <div className="group relative">
                <Hash className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-accent transition-colors" />
                <input placeholder="00000000000" maxLength={11} className="h-12 w-full rounded-xl border border-input bg-background pl-10 pr-3 text-sm tracking-widest font-mono focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/15 transition" />
              </div>
              <p className="mt-1.5 text-[11px] text-muted-foreground">Encrypted at rest. Only HR-tier users can view in clear.</p>
            </div>
          </div>
        </Section>

        <div className="h-px bg-border" />

        {/* Section 2 */}
        <Section title="Employment Details" subtitle="Role, ID and academic responsibilities.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="mb-1.5 block text-xs font-semibold text-foreground">Role <span className="text-destructive">*</span></label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {roles.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`rounded-xl border px-3 py-2.5 text-xs font-semibold transition text-left ${
                      role === r ? "border-accent bg-accent/10 text-accent ring-2 ring-accent/20" : "border-input bg-card text-muted-foreground hover:border-accent/40 hover:text-foreground"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-foreground">Staff ID</label>
              <div className="flex gap-2">
                <div className="group relative flex-1">
                  <Briefcase className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input value={staffId} onChange={(e) => setStaffId(e.target.value)} className="h-12 w-full rounded-xl border border-input bg-background pl-10 pr-3 text-sm font-mono focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/15 transition" />
                </div>
                <button type="button" onClick={() => setStaffId(genId())} className="grid h-12 w-12 place-items-center rounded-xl border border-input bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition" aria-label="Regenerate">
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>
            </div>
            <Field label="Date Joined" type="date" required icon={Calendar} />

            {showSubjects && (
              <ChipPicker label="Subjects Taught" icon={BookOpen} options={subjectOptions} selected={subjects} onChange={setSubjects} className="md:col-span-2" />
            )}
            <ChipPicker label="Classes Assigned" icon={GraduationCap} options={classOptions} selected={classesAssigned} onChange={setClassesAssigned} className="md:col-span-2" />

            <div className="md:col-span-2">
              <label className="mb-1.5 block text-xs font-semibold text-foreground">Employment Type</label>
              <div className="inline-flex w-full rounded-xl border border-input bg-background p-1">
                {(["Full-time", "Part-time", "Contract"] as const).map((t) => (
                  <button key={t} type="button" onClick={() => setEmpType(t)} className={`flex-1 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${empType === t ? "bg-gradient-brand text-white shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <div className="h-px bg-border" />

        {/* Section 3 */}
        <Section title="Contact & Access" subtitle="Login credentials. Email becomes their username.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-foreground">Phone Number <span className="text-destructive">*</span></label>
              <div className="group relative flex">
                <span className="inline-flex items-center gap-1.5 rounded-l-xl border border-r-0 border-input bg-muted px-3 text-sm">
                  🇳🇬 <span className="font-medium">+234</span>
                </span>
                <input className="h-12 flex-1 rounded-r-xl border border-input bg-background px-3.5 text-sm focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/15 transition" placeholder="803 145 7821" />
              </div>
            </div>
            <Field label="Email Address" required type="email" placeholder="adewale@school.com" icon={Mail} />

            <div className="md:col-span-2">
              <label className="mb-1.5 flex items-center gap-2 text-xs font-semibold text-foreground">
                <Lock className="h-3.5 w-3.5 text-accent" /> Temporary Password
              </label>
              <div className="flex gap-2">
                <div className="group relative flex-1">
                  <input
                    type={showPwd ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 w-full rounded-xl border border-input bg-background pl-3.5 pr-12 font-mono text-sm focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/15 transition"
                  />
                  <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 grid h-7 w-7 place-items-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition">
                    {showPwd ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </button>
                </div>
                <button type="button" onClick={() => setPassword(genPwd())} className="inline-flex items-center gap-1.5 rounded-xl border border-input bg-card px-4 h-12 text-xs font-semibold hover:bg-muted transition">
                  <RefreshCw className="h-3.5 w-3.5" /> Generate
                </button>
              </div>
              <p className="mt-1.5 text-[11px] text-muted-foreground">They'll be required to change this on first sign-in.</p>
            </div>

            <button type="button" onClick={() => setWelcomeEmail(!welcomeEmail)} className="md:col-span-2 flex items-center justify-between gap-3 rounded-xl border border-border bg-muted/30 p-3.5 text-left hover:border-accent/40 transition">
              <div>
                <p className="text-sm font-semibold text-foreground">Send welcome email</p>
                <p className="text-xs text-muted-foreground">Includes login link, temporary password and a quick-start guide.</p>
              </div>
              <span className={`relative h-6 w-11 rounded-full transition ${welcomeEmail ? "bg-gradient-brand" : "bg-muted"}`}>
                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition ${welcomeEmail ? "left-5" : "left-0.5"}`} />
              </span>
            </button>
          </div>
        </Section>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 sm:px-8 py-5 bg-muted/40 border-t border-border">
          <Link to="/staff" className="inline-flex items-center justify-center rounded-xl border border-input bg-card px-5 h-11 text-sm font-medium hover:bg-muted transition">
            Cancel
          </Link>
          <button type="submit" className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-brand px-6 h-11 text-sm font-semibold text-white shadow-md hover:shadow-glow transition-all">
            <Sparkles className="h-4 w-4" /> Save Staff Member
          </button>
        </div>
      </form>
    </AppLayout>
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

function Field({ label, type = "text", placeholder, required, icon: Icon }: { label: string; type?: string; placeholder?: string; required?: boolean; icon?: React.ElementType }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-foreground">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <div className="group relative">
        {Icon && <Icon className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-accent transition-colors" />}
        <input type={type} placeholder={placeholder} className={`h-12 w-full rounded-xl border border-input bg-background ${Icon ? "pl-10" : "pl-3.5"} pr-3 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/15 transition`} />
      </div>
    </div>
  );
}

function ChipPicker({ label, icon: Icon, options, selected, onChange, className }: { label: string; icon: React.ElementType; options: string[]; selected: string[]; onChange: (v: string[]) => void; className?: string }) {
  const [open, setOpen] = useState(false);
  const toggle = (o: string) => onChange(selected.includes(o) ? selected.filter(s => s !== o) : [...selected, o]);
  return (
    <div className={className}>
      <label className="mb-1.5 block text-xs font-semibold text-foreground">{label}</label>
      <div className="rounded-xl border border-input bg-background p-2 min-h-[48px]">
        <div className="flex flex-wrap gap-1.5">
          {selected.map((s) => (
            <span key={s} className="inline-flex items-center gap-1 rounded-lg bg-accent/15 text-accent px-2.5 py-1 text-xs font-medium">
              <Icon className="h-3 w-3" /> {s}
              <button type="button" onClick={() => toggle(s)} className="hover:bg-accent/20 rounded p-0.5"><X className="h-3 w-3" /></button>
            </span>
          ))}
          <button type="button" onClick={() => setOpen(!open)} className="inline-flex items-center gap-1 rounded-lg border border-dashed border-input px-2.5 py-1 text-xs font-medium text-muted-foreground hover:text-accent hover:border-accent transition">
            + Add
          </button>
        </div>
        {open && (
          <div className="mt-2 pt-2 border-t border-border flex flex-wrap gap-1.5">
            {options.filter(o => !selected.includes(o)).map((o) => (
              <button key={o} type="button" onClick={() => { toggle(o); }} className="rounded-lg border border-input bg-card px-2.5 py-1 text-xs font-medium hover:border-accent hover:text-accent transition">
                {o}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AddStaff;
