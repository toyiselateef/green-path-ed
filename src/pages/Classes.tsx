import { useState } from "react";
import { Plus, Library, Users, GraduationCap, MoreVertical, Archive, Eye } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { toast } from "sonner";

type ClassRow = { name: string; arms: string[]; students: number; teacher: string; capacity: number };

const initialClasses: ClassRow[] = [
  { name: "JSS 1", arms: ["A", "B", "C"], students: 96, teacher: "Mrs. Funke Adeyemi", capacity: 35 },
  { name: "JSS 2", arms: ["A", "B"], students: 64, teacher: "Mr. Emeka Obi", capacity: 35 },
  { name: "JSS 3", arms: ["A", "B"], students: 58, teacher: "Ms. Halima Yusuf", capacity: 35 },
  { name: "SSS 1", arms: ["Science", "Arts"], students: 52, teacher: "Mr. Tobi Adekunle", capacity: 30 },
  { name: "SSS 2", arms: ["Science", "Arts", "Commercial"], students: 48, teacher: "Mrs. Ngozi Eze", capacity: 30 },
  { name: "SSS 3", arms: ["Science", "Arts"], students: 24, teacher: "Mr. Adewale O.", capacity: 30 },
];

const teachers = ["Mrs. Funke Adeyemi", "Mr. Emeka Obi", "Ms. Halima Yusuf", "Mr. Tobi Adekunle", "Mrs. Ngozi Eze"];

const sampleStudents = [
  { name: "Adewale Johnson", adm: "BHS/2023/041" },
  { name: "Aisha Bello", adm: "BHS/2024/118" },
  { name: "Chinedu Okafor", adm: "BHS/2022/009" },
  { name: "Zainab Suleiman", adm: "BHS/2025/204" },
  { name: "Tunde Bakare", adm: "BHS/2021/077" },
];

const Classes = () => {
  const [classes, setClasses] = useState(initialClasses);
  const [addOpen, setAddOpen] = useState(false);
  const [viewClass, setViewClass] = useState<ClassRow | null>(null);
  const [archiveTarget, setArchiveTarget] = useState<ClassRow | null>(null);
  const [form, setForm] = useState({ name: "", arm: "A", teacher: teachers[0], capacity: 35 });

  const handleAdd = () => {
    if (!form.name.trim()) { toast.error("Class name required"); return; }
    setClasses((c) => [...c, { name: form.name, arms: [form.arm], students: 0, teacher: form.teacher, capacity: form.capacity }]);
    setAddOpen(false);
    setForm({ name: "", arm: "A", teacher: teachers[0], capacity: 35 });
    toast.success(`${form.name} created`);
  };

  const handleArchive = () => {
    if (!archiveTarget) return;
    setClasses((c) => c.filter((x) => x.name !== archiveTarget.name));
    toast.success(`${archiveTarget.name} archived`);
    setArchiveTarget(null);
  };

  return (
    <AppLayout>
      <PageHeader
        title="Classes"
        subtitle="All academic classes, arms and form teachers."
        badge="Academic"
        actions={
          <button onClick={() => setAddOpen(true)} className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-brand text-white px-4 h-10 text-sm font-semibold shadow-md-soft hover:shadow-glow transition">
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted transition"><MoreVertical className="h-4 w-4" /></button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setViewClass(c)}><Eye className="h-4 w-4 mr-2" /> View Students</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setArchiveTarget(c)} className="text-destructive focus:text-destructive">
                      <Archive className="h-4 w-4 mr-2" /> Archive Class
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <button onClick={() => setViewClass(c)} className="relative mt-4 flex flex-wrap gap-1.5 text-left">
                {c.arms.map((a) => (
                  <span key={a} className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-foreground">{c.name} {a}</span>
                ))}
              </button>

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

      {/* Add Class */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Class</DialogTitle>
            <DialogDescription>Set up a new class with its arm and form teacher.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5">Class Name</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. JSS 1" className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/15 transition" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold mb-1.5">Arm</label>
                <select value={form.arm} onChange={(e) => setForm({ ...form, arm: e.target.value })} className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm">
                  <option>A</option><option>B</option><option>C</option><option>Science</option><option>Arts</option><option>Commercial</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5">Capacity</label>
                <input type="number" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: +e.target.value })} className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5">Class Teacher</label>
              <select value={form.teacher} onChange={(e) => setForm({ ...form, teacher: e.target.value })} className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm">
                {teachers.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <DialogFooter>
            <button onClick={() => setAddOpen(false)} className="rounded-xl border border-border bg-card hover:bg-muted px-4 h-10 text-sm font-semibold">Cancel</button>
            <button onClick={handleAdd} className="rounded-xl bg-gradient-brand text-white px-4 h-10 text-sm font-semibold shadow-md hover:shadow-glow transition">Create Class</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View students */}
      <Sheet open={!!viewClass} onOpenChange={(o) => !o && setViewClass(null)}>
        <SheetContent side="right" className="w-full sm:max-w-md">
          {viewClass && (
            <>
              <SheetHeader>
                <SheetTitle>{viewClass.name} Students</SheetTitle>
                <SheetDescription>{viewClass.students} students · Form teacher: {viewClass.teacher}</SheetDescription>
              </SheetHeader>
              <div className="mt-5 space-y-2">
                {sampleStudents.map((s) => (
                  <div key={s.adm} className="flex items-center gap-3 rounded-xl border border-border p-3 hover:bg-muted/40 transition">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-brand text-white text-xs font-bold">
                      {s.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{s.name}</p>
                      <p className="text-[11px] text-muted-foreground">{s.adm}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <AlertDialog open={!!archiveTarget} onOpenChange={(o) => !o && setArchiveTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Archive {archiveTarget?.name}?</AlertDialogTitle>
            <AlertDialogDescription>This class will be hidden from rosters. Existing student records remain intact.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleArchive} className="bg-destructive hover:bg-destructive/90">Archive</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppLayout>
  );
};

export default Classes;
