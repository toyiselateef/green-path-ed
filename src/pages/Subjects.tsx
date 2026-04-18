import { Plus, BookOpen, Users, Search } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";

const subjects = [
  { name: "Mathematics", code: "MTH", category: "Core", teachers: 4, classes: 12, color: "from-accent to-primary" },
  { name: "English Language", code: "ENG", category: "Core", teachers: 3, classes: 12, color: "from-info to-primary" },
  { name: "Physics", code: "PHY", category: "Science", teachers: 2, classes: 6, color: "from-primary to-primary-deep" },
  { name: "Chemistry", code: "CHM", category: "Science", teachers: 2, classes: 6, color: "from-accent to-primary-glow" },
  { name: "Biology", code: "BIO", category: "Science", teachers: 2, classes: 6, color: "from-primary-glow to-accent" },
  { name: "Literature", code: "LIT", category: "Arts", teachers: 2, classes: 5, color: "from-warning to-warning" },
  { name: "Government", code: "GOV", category: "Arts", teachers: 1, classes: 4, color: "from-info to-info" },
  { name: "Economics", code: "ECO", category: "Commercial", teachers: 2, classes: 5, color: "from-accent to-info" },
  { name: "Accounting", code: "ACC", category: "Commercial", teachers: 1, classes: 3, color: "from-primary to-accent" },
  { name: "Civic Education", code: "CVE", category: "Core", teachers: 2, classes: 12, color: "from-primary-deep to-primary" },
];

const Subjects = () => (
  <AppLayout>
    <PageHeader
      title="Subjects"
      subtitle="Curriculum offered across junior and senior school."
      badge="Academic"
      actions={
        <button className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-brand text-white px-4 h-10 text-sm font-semibold shadow-md-soft hover:shadow-glow transition">
          <Plus className="h-4 w-4" /> Add Subject
        </button>
      }
    />

    <div className="mb-5 flex flex-wrap items-center gap-2">
      <div className="relative flex-1 min-w-[220px] max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input placeholder="Search subjects…" className="h-10 w-full rounded-xl border border-border bg-card pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40" />
      </div>
      {["All", "Core", "Science", "Arts", "Commercial"].map((t, i) => (
        <button key={t} className={`rounded-xl px-3 h-10 text-xs font-semibold border transition ${i === 0 ? "bg-gradient-brand text-white border-transparent" : "bg-card text-foreground border-border hover:bg-muted"}`}>{t}</button>
      ))}
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {subjects.map((s) => (
        <div key={s.code} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 hover-lift">
          <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${s.color}`} />
          <div className="flex items-start justify-between">
            <span className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${s.color} text-white shadow-md-soft`}>
              <BookOpen className="h-5 w-5" />
            </span>
            <span className="text-[10px] font-bold tracking-widest text-muted-foreground">{s.code}</span>
          </div>
          <h3 className="mt-4 font-display text-base font-bold text-foreground">{s.name}</h3>
          <p className="text-xs text-muted-foreground">{s.category}</p>

          <div className="mt-4 flex items-center justify-between text-xs">
            <span className="inline-flex items-center gap-1 text-muted-foreground"><Users className="h-3 w-3" /> {s.teachers} teachers</span>
            <span className="text-foreground font-semibold">{s.classes} classes</span>
          </div>
        </div>
      ))}
    </div>
  </AppLayout>
);

export default Subjects;
