import { useState } from "react";
import { Plus, BookOpen, Users, Search, Pencil, Trash2 } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { toast } from "sonner";

type Subject = { name: string; code: string; category: string; teachers: number; classes: number; color: string };

const initial: Subject[] = [
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

const allClasses = ["JSS1A", "JSS1B", "JSS2A", "JSS2B", "JSS3A", "SSS1A", "SSS2A", "SSS3A"];

const Subjects = () => {
  const [subjects, setSubjects] = useState(initial);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Subject | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Subject | null>(null);
  const [form, setForm] = useState({ name: "", code: "", category: "Core", classes: [] as string[] });

  const openAdd = () => { setEditing(null); setForm({ name: "", code: "", category: "Core", classes: [] }); setOpen(true); };
  const openEdit = (s: Subject) => { setEditing(s); setForm({ name: s.name, code: s.code, category: s.category, classes: [] }); setOpen(true); };

  const save = () => {
    if (!form.name.trim() || !form.code.trim()) { toast.error("Name and code required"); return; }
    if (editing) {
      setSubjects((arr) => arr.map((x) => x.code === editing.code ? { ...x, name: form.name, code: form.code, category: form.category } : x));
      toast.success(`${form.name} updated`);
    } else {
      setSubjects((arr) => [...arr, { name: form.name, code: form.code.toUpperCase(), category: form.category, teachers: 0, classes: form.classes.length, color: "from-accent to-primary" }]);
      toast.success(`${form.name} added`);
    }
    setOpen(false);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setSubjects((arr) => arr.filter((x) => x.code !== deleteTarget.code));
    toast.success(`${deleteTarget.name} removed`);
    setDeleteTarget(null);
  };

  const toggleClass = (c: string) => {
    setForm((f) => ({ ...f, classes: f.classes.includes(c) ? f.classes.filter((x) => x !== c) : [...f.classes, c] }));
  };

  return (
    <AppLayout>
      <PageHeader
        title="Subjects"
        subtitle="Curriculum offered across junior and senior school."
        badge="Academic"
        actions={
          <button onClick={openAdd} className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-brand text-white px-4 h-10 text-sm font-semibold shadow-md-soft hover:shadow-glow transition">
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

            <div className="mt-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition">
              <button onClick={() => openEdit(s)} className="flex-1 inline-flex items-center justify-center gap-1 rounded-lg border border-border bg-card hover:bg-muted h-8 text-[11px] font-semibold transition">
                <Pencil className="h-3 w-3" /> Edit
              </button>
              <button onClick={() => setDeleteTarget(s)} className="flex-1 inline-flex items-center justify-center gap-1 rounded-lg border border-destructive/30 bg-destructive/5 text-destructive hover:bg-destructive/10 h-8 text-[11px] font-semibold transition">
                <Trash2 className="h-3 w-3" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit" : "Add"} Subject</DialogTitle>
            <DialogDescription>Curriculum subjects offered to students.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-[1fr_120px] gap-3">
              <div>
                <label className="block text-xs font-semibold mb-1.5">Subject Name</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Mathematics" className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/15 transition" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5">Code</label>
                <input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} placeholder="MTH" maxLength={4} className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm font-mono uppercase focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/15 transition" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5">Department</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm">
                <option>Core</option><option>Elective</option><option>Vocational</option><option>Science</option><option>Arts</option><option>Commercial</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-2">Applicable Classes</label>
              <div className="flex flex-wrap gap-2">
                {allClasses.map((c) => {
                  const active = form.classes.includes(c);
                  return (
                    <button key={c} type="button" onClick={() => toggleClass(c)} className={`rounded-lg border px-2.5 h-8 text-xs font-semibold transition ${active ? "border-accent bg-accent/10 text-accent" : "border-border bg-card hover:bg-muted text-muted-foreground"}`}>
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <DialogFooter>
            <button onClick={() => setOpen(false)} className="rounded-xl border border-border bg-card hover:bg-muted px-4 h-10 text-sm font-semibold">Cancel</button>
            <button onClick={save} className="rounded-xl bg-gradient-brand text-white px-4 h-10 text-sm font-semibold shadow-md hover:shadow-glow transition">{editing ? "Save Changes" : "Add Subject"}</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {deleteTarget?.name}?</AlertDialogTitle>
            <AlertDialogDescription>This will remove the subject from the curriculum. Existing scores remain in archived records.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppLayout>
  );
};

export default Subjects;
