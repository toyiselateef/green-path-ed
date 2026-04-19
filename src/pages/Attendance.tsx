import { useState } from "react";
import { format } from "date-fns";
import { CalendarCheck, Check, X, Clock, ChevronLeft, ChevronRight, Calendar as CalIcon, RotateCcw } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const roster = [
  { name: "Adewale Johnson", admission: "BHS/2023/041" },
  { name: "Aisha Bello", admission: "BHS/2024/118" },
  { name: "Chinedu Okafor", admission: "BHS/2022/009" },
  { name: "Zainab Suleiman", admission: "BHS/2025/204" },
  { name: "Tunde Bakare", admission: "BHS/2021/077" },
  { name: "Ifeoma Nwosu", admission: "BHS/2023/092" },
  { name: "Sani Mohammed", admission: "BHS/2024/156" },
];

const history = [
  { date: "Mon 7 Apr", cls: "JSS2A", present: 27, absent: 5, rate: 84 },
  { date: "Fri 4 Apr", cls: "JSS2A", present: 30, absent: 2, rate: 94 },
  { date: "Thu 3 Apr", cls: "JSS2A", present: 29, absent: 3, rate: 91 },
  { date: "Wed 2 Apr", cls: "JSS2A", present: 31, absent: 1, rate: 97 },
  { date: "Tue 1 Apr", cls: "JSS2A", present: 28, absent: 4, rate: 88 },
];

type Status = "present" | "absent" | "late" | null;

const Attendance = () => {
  const [marks, setMarks] = useState<Record<string, Status>>(() =>
    Object.fromEntries(roster.map((r, i) => [r.admission, i < 5 ? "present" : i === 5 ? "late" : "absent"])),
  );
  const [date, setDate] = useState<Date>(new Date());
  const [cls, setCls] = useState("JSS 2 A");
  const [tab, setTab] = useState<"register" | "history">("register");

  const present = Object.values(marks).filter((s) => s === "present").length;
  const absent = Object.values(marks).filter((s) => s === "absent").length;
  const late = Object.values(marks).filter((s) => s === "late").length;
  const rate = Math.round(((present + late) / roster.length) * 100);

  const dateStr = format(date, "EEEE, d MMMM yyyy");

  const markAll = (status: Status) =>
    setMarks(Object.fromEntries(roster.map((r) => [r.admission, status])));

  return (
    <AppLayout>
      <PageHeader
        title="Attendance"
        subtitle={dateStr}
        badge="Daily Register"
        actions={
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-brand text-white px-4 h-10 text-sm font-semibold shadow-md-soft hover:shadow-glow transition">
                <CalendarCheck className="h-4 w-4" /> Save Register
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Save attendance for {cls}?</AlertDialogTitle>
                <AlertDialogDescription>Saving locks today's register for {cls} on {dateStr}. This cannot be undone.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => toast.success(`Attendance saved for ${cls} · ${format(date, "d MMM")}`)}>Confirm</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        }
      />

      <div className="inline-flex items-center gap-1 rounded-2xl border border-border bg-card p-1 mb-5">
        {(["register", "history"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`rounded-xl px-4 h-9 text-xs font-semibold capitalize transition ${tab === t ? "bg-gradient-brand text-white shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === "register" && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Attendance Rate", value: `${rate}%`, color: "text-accent" },
              { label: "Present", value: present, color: "text-foreground" },
              { label: "Late", value: late, color: "text-warning" },
              { label: "Absent", value: absent, color: "text-destructive" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-border bg-card p-5">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</p>
                <p className={`mt-2 font-display text-2xl font-bold ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <button className="grid h-9 w-9 place-items-center rounded-lg border border-border hover:bg-muted"><ChevronLeft className="h-4 w-4" /></button>
                <select value={cls} onChange={(e) => setCls(e.target.value)} className="h-9 rounded-lg border border-border bg-background px-3 text-sm font-medium">
                  <option>JSS 2 A</option><option>JSS 1 A</option><option>SSS 1 Science</option>
                </select>
                <button className="grid h-9 w-9 place-items-center rounded-lg border border-border hover:bg-muted"><ChevronRight className="h-4 w-4" /></button>

                <Popover>
                  <PopoverTrigger asChild>
                    <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background h-9 px-3 text-sm font-medium hover:bg-muted">
                      <CalIcon className="h-4 w-4 text-muted-foreground" /> {format(date, "d MMM yyyy")}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={date} onSelect={(d) => d && setDate(d)} initialFocus className="pointer-events-auto" />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex gap-2 text-xs">
                <button onClick={() => markAll("present")} className="rounded-lg border border-accent/30 bg-accent/10 text-accent px-3 h-9 font-semibold hover:bg-accent/20">Mark all present</button>
                <button onClick={() => markAll(null)} className="inline-flex items-center gap-1 rounded-lg border border-border bg-card text-foreground px-3 h-9 font-semibold hover:bg-muted">
                  <RotateCcw className="h-3.5 w-3.5" /> Reset
                </button>
              </div>
            </div>

            <div className="divide-y divide-border">
              {roster.map((r) => {
                const s = marks[r.admission];
                return (
                  <div key={r.admission} className="flex items-center justify-between gap-4 px-5 py-3.5 hover:bg-muted/30 transition">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand text-white text-xs font-bold">{r.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}</span>
                      <div className="min-w-0">
                        <p className="font-semibold text-foreground truncate">{r.name}</p>
                        <p className="text-xs text-muted-foreground">{r.admission}</p>
                      </div>
                    </div>
                    <div className="flex gap-1.5">
                      {([
                        { key: "present", icon: Check, label: "P", className: "text-accent border-accent/30 bg-accent/10" },
                        { key: "late", icon: Clock, label: "L", className: "text-warning border-warning/30 bg-warning/10" },
                        { key: "absent", icon: X, label: "A", className: "text-destructive border-destructive/30 bg-destructive/10" },
                      ] as const).map((opt) => {
                        const active = s === opt.key;
                        return (
                          <button
                            key={opt.key}
                            onClick={() => setMarks((m) => ({ ...m, [r.admission]: opt.key }))}
                            className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 h-9 text-xs font-semibold transition ${active ? opt.className : "border-border text-muted-foreground hover:bg-muted"}`}
                          >
                            <opt.icon className="h-3.5 w-3.5" /> {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {tab === "history" && (
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h3 className="font-display text-base font-semibold text-foreground">Recent registers</h3>
            <p className="text-xs text-muted-foreground">Last 5 saved sessions</p>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="text-left font-semibold px-5 py-3">Date</th>
                <th className="text-left font-semibold px-5 py-3">Class</th>
                <th className="text-left font-semibold px-5 py-3">Present</th>
                <th className="text-left font-semibold px-5 py-3">Absent</th>
                <th className="text-left font-semibold px-5 py-3">Rate</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h) => (
                <tr key={h.date} className="border-t border-border hover:bg-muted/30 transition">
                  <td className="px-5 py-3.5 text-foreground">{h.date}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{h.cls}</td>
                  <td className="px-5 py-3.5 text-foreground font-semibold">{h.present}</td>
                  <td className="px-5 py-3.5 text-destructive font-semibold">{h.absent}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${h.rate >= 90 ? "badge-soft-green" : "badge-soft-amber"}`}>
                      {h.rate}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AppLayout>
  );
};

export default Attendance;
