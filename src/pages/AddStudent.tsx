import { Link } from "react-router-dom";
import { ArrowLeft, User, Mail, Phone, Calendar, Hash, BookOpen, ChevronDown } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";

const AddStudent = () => {
  return (
    <AppLayout>
      <Link to="/students" className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition mb-4 story-link">
        <ArrowLeft className="h-3.5 w-3.5" /> Students
      </Link>

      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground tracking-tight">Add New Student</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">Fill in the student's details below. Required fields are marked with <span className="text-destructive">*</span>.</p>
      </div>

      <form className="rounded-2xl bg-card border border-border shadow-md-soft overflow-hidden animate-fade-in-up">
        {/* Section 1 */}
        <Section title="Student Information" subtitle="Basic identification and academic placement">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="First Name" required placeholder="Adewale" icon={User} />
            <Field label="Last Name" required placeholder="Johnson" icon={User} />
            <Field label="Admission Number" placeholder="BHS/2025/045" icon={Hash} />
            <Field label="Date of Birth" type="date" icon={Calendar} />

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-foreground">Gender</label>
              <div className="inline-flex w-full rounded-xl border border-input bg-background p-1">
                <button type="button" className="flex-1 rounded-lg bg-gradient-brand text-white px-3 py-2.5 text-sm font-semibold shadow-sm-soft">Male</button>
                <button type="button" className="flex-1 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition">Female</button>
              </div>
            </div>

            <SelectField label="Class" required icon={BookOpen} options={["JSS1A", "JSS2A", "JSS3A", "SSS1A", "SSS2A", "SSS3A"]} />
          </div>
        </Section>

        <div className="h-px bg-border" />

        {/* Section 2 */}
        <Section title="Parent / Guardian Details" subtitle="Primary contact for fees, attendance and reports">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Parent First Name" placeholder="Tunde" icon={User} />
            <Field label="Parent Last Name" placeholder="Johnson" icon={User} />

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-foreground">Phone Number <span className="text-destructive">*</span></label>
              <div className="group relative flex">
                <span className="inline-flex items-center gap-1.5 rounded-l-xl border border-r-0 border-input bg-muted px-3 text-sm text-foreground">
                  🇳🇬 <span className="font-medium">+234</span>
                </span>
                <input
                  className="h-12 flex-1 rounded-r-xl border border-input bg-background px-3.5 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/15 transition"
                  placeholder="803 145 7821"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 flex items-center gap-2 text-xs font-semibold text-foreground">
                Email Address
                <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Optional</span>
              </label>
              <div className="group relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-accent transition-colors" />
                <input type="email" placeholder="parent@example.com" className="h-12 w-full rounded-xl border border-input bg-background pl-10 pr-3 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/15 transition" />
              </div>
            </div>

            <SelectField label="Relationship to Student" options={["Father", "Mother", "Guardian"]} />
          </div>
        </Section>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 sm:px-8 py-5 bg-muted/40 border-t border-border">
          <Link to="/students" className="inline-flex items-center justify-center rounded-xl border border-input bg-card px-5 h-11 text-sm font-medium text-foreground hover:bg-muted transition">
            Cancel
          </Link>
          <button type="submit" className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-brand px-6 h-11 text-sm font-semibold text-white shadow-md-soft hover:shadow-glow transition-all">
            Save Student
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

interface FieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  icon?: React.ElementType;
}
function Field({ label, type = "text", placeholder, required, icon: Icon }: FieldProps) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-foreground">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <div className="group relative">
        {Icon && <Icon className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-accent transition-colors" />}
        <input
          type={type}
          placeholder={placeholder}
          className={`h-12 w-full rounded-xl border border-input bg-background ${Icon ? "pl-10" : "pl-3.5"} pr-3 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/15 transition`}
        />
      </div>
    </div>
  );
}

function SelectField({ label, options, required, icon: Icon }: { label: string; options: string[]; required?: boolean; icon?: React.ElementType }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-foreground">{label} {required && <span className="text-destructive">*</span>}</label>
      <div className="group relative">
        {Icon && <Icon className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />}
        <select className={`h-12 w-full rounded-xl border border-input bg-background ${Icon ? "pl-10" : "pl-3.5"} pr-10 text-sm text-foreground focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/15 transition appearance-none`}>
          {options.map(o => <option key={o}>{o}</option>)}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  );
}

export default AddStudent;
