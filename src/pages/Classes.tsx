import { Plus, Library, Users, GraduationCap, ArrowUpRight } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";

const classes = [
  { name: "JSS 1", arms: ["A", "B", "C"], students: 96, teacher: "Mrs. Funke Adeyemi", capacity: 35 },
  { name: "JSS 2", arms: ["A", "B"], students: 64, teacher: "Mr. Emeka Obi", capacity: 35 },
  { name: "JSS 3", arms: ["A", "B"], students: 58, teacher: "Ms. Halima Yusuf", capacity: 35 },
  { name: "SSS 1", arms: ["Science", "Arts"], students: 52, teacher: "Mr. Tobi Adekunle", capacity: 30 },
  { name: "SSS 2", arms: ["Science", "Arts", "Commercial"], students: 48, teacher: "Mrs. Ngozi Eze", capacity: 30 },
  { name: "SSS 3", arms: ["Science", "Arts"], students: 24, teacher: "Mr. Adewale O.", capacity: 30 },
];

const Classes = () => (
  <AppLayout>
    <PageHeader
      title="Classes"
      subtitle="All academic classes, arms and form teachers."
      badge="Academic"
      actions={
        <button className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-brand text-white px-4 h-10 text-sm font-semibold shadow-md-soft hover:shadow-glow transition">
          <Plus className="h-4 w-4" /> New Class
        </button>
      }
    />

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {classes.map((c) => {
        const fill = Math.round((c.students / (c.capacity * c.arms.length)) * 100);
        return (
          <div key={c.name} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 hover-lift">
            <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-accent/10 blur-2xl group-hover:bg-accent/20 transition" />
            <div className="relative flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-brand text-white shadow-md-soft">
                  <Library className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground">{c.name}</h3>
                  <p className="text-xs text-muted-foreground">{c.arms.length} arm{c.arms.length > 1 ? "s" : ""}</p>
                </div>
              </div>
              <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted transition"><ArrowUpRight className="h-4 w-4" /></button>
            </div>

            <div className="relative mt-4 flex flex-wrap gap-1.5">
              {c.arms.map((a) => (
                <span key={a} className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-foreground">{c.name} {a}</span>
              ))}
            </div>

            <div className="relative mt-5 grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg border border-border p-2.5">
                <p className="text-muted-foreground flex items-center gap-1"><Users className="h-3 w-3" /> Students</p>
                <p className="mt-0.5 font-semibold text-foreground text-sm">{c.students}</p>
              </div>
              <div className="rounded-lg border border-border p-2.5">
                <p className="text-muted-foreground flex items-center gap-1"><GraduationCap className="h-3 w-3" /> Form teacher</p>
                <p className="mt-0.5 font-semibold text-foreground text-sm truncate">{c.teacher.split(" ").slice(-1)}</p>
              </div>
            </div>

            <div className="relative mt-4">
              <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-1">
                <span>Capacity</span><span>{fill}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-gradient-brand" style={{ width: `${fill}%` }} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </AppLayout>
);

export default Classes;
