import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Mail, Phone, MoreHorizontal, GraduationCap, Eye, Pencil, UserX, KeyRound, Briefcase, Calendar } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { toast } from "sonner";

type StaffMember = {
  name: string; role: string; subjects: string; email: string; phone: string; status: string; initials: string;
  department?: string; joined?: string;
};

const staff: StaffMember[] = [
  { name: "Mrs. Funke Adeyemi", role: "Vice Principal", subjects: "Mathematics", email: "funke@brightstar.ng", phone: "+234 803 111 2233", status: "Active", initials: "FA", department: "Academics", joined: "Sep 2018" },
  { name: "Mr. Emeka Obi", role: "Senior Teacher", subjects: "Physics, Further Maths", email: "emeka@brightstar.ng", phone: "+234 805 222 7788", status: "Active", initials: "EO", department: "Sciences", joined: "Jan 2020" },
  { name: "Ms. Halima Yusuf", role: "Teacher", subjects: "English Language", email: "halima@brightstar.ng", phone: "+234 809 444 5566", status: "On Leave", initials: "HY", department: "Languages", joined: "Aug 2021" },
  { name: "Mr. Tobi Adekunle", role: "Teacher", subjects: "Chemistry, Biology", email: "tobi@brightstar.ng", phone: "+234 802 666 9911", status: "Active", initials: "TA", department: "Sciences", joined: "Mar 2022" },
  { name: "Mrs. Ngozi Eze", role: "Bursar", subjects: "Accounts", email: "ngozi@brightstar.ng", phone: "+234 807 888 1100", status: "Active", initials: "NE", department: "Finance", joined: "Feb 2017" },
];

const Staff = () => {
  const [selected, setSelected] = useState<StaffMember | null>(null);

  return (
    <AppLayout>
      <PageHeader
        title="Staff"
        subtitle="Manage teachers, administrators and support staff."
        badge="People"
        actions={
          <Link to="/staff/new" className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-brand text-white px-4 h-10 text-sm font-semibold shadow-md-soft hover:shadow-glow transition">
            <Plus className="h-4 w-4" /> Add Staff
          </Link>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Staff", value: "28", hint: "+2 this term" },
          { label: "Teaching", value: "21", hint: "Across 14 subjects" },
          { label: "Admin & Support", value: "7", hint: "Bursar, Admin, Care" },
          { label: "On Leave", value: "1", hint: "Resumes Mon" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-5 hover-lift">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</p>
            <p className="mt-2 font-display text-2xl font-bold text-foreground">{s.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{s.hint}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="flex flex-wrap gap-3 items-center justify-between p-4 border-b border-border">
          <div className="relative flex-1 min-w-[220px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input placeholder="Search staff by name, role, subject…" className="h-10 w-full rounded-xl border border-border bg-background pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40" />
          </div>
          <div className="flex gap-2">
            <select className="h-10 rounded-xl border border-border bg-background px-3 text-sm">
              <option>All Roles</option><option>Teacher</option><option>Admin</option>
            </select>
            <select className="h-10 rounded-xl border border-border bg-background px-3 text-sm">
              <option>All Status</option><option>Active</option><option>On Leave</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="text-left font-semibold px-5 py-3">Name</th>
                <th className="text-left font-semibold px-5 py-3">Role</th>
                <th className="text-left font-semibold px-5 py-3">Subjects</th>
                <th className="text-left font-semibold px-5 py-3">Contact</th>
                <th className="text-left font-semibold px-5 py-3">Status</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {staff.map((s) => (
                <tr key={s.email} className="border-t border-border hover:bg-muted/30 transition">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand text-white text-xs font-bold">{s.initials}</span>
                      <div>
                        <p className="font-semibold text-foreground">{s.name}</p>
                        <p className="text-xs text-muted-foreground">{s.email.split("@")[0]}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5"><span className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground"><GraduationCap className="h-3.5 w-3.5 text-accent" />{s.role}</span></td>
                  <td className="px-5 py-3.5 text-muted-foreground">{s.subjects}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex flex-col gap-0.5">
                      <span className="inline-flex items-center gap-1.5 text-xs text-foreground"><Mail className="h-3 w-3 text-muted-foreground" />{s.email}</span>
                      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"><Phone className="h-3 w-3" />{s.phone}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge className={s.status === "Active" ? "badge-soft-green border" : "badge-soft-amber border"}>{s.status}</Badge>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition"><MoreHorizontal className="h-4 w-4" /></button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={() => setSelected(s)}><Eye className="h-4 w-4 mr-2" /> View Profile</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast("Edit form coming soon")}><Pencil className="h-4 w-4 mr-2" /> Edit Details</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast.success("Portal access reset. New password emailed.")}><KeyRound className="h-4 w-4 mr-2" /> Reset Portal Access</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => toast.success(`${s.name} deactivated`)} className="text-destructive focus:text-destructive">
                          <UserX className="h-4 w-4 mr-2" /> Deactivate
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Sheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <SheetContent side="right" className="w-full sm:max-w-md">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle className="sr-only">{selected.name}</SheetTitle>
                <SheetDescription className="sr-only">Staff profile details</SheetDescription>
              </SheetHeader>
              <div className="flex items-center gap-4 mt-4">
                <span className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-brand text-white text-lg font-bold shadow-md-soft">{selected.initials}</span>
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground">{selected.name}</h3>
                  <Badge className="mt-1 badge-soft-green border text-[10px]">{selected.role}</Badge>
                </div>
              </div>
              <div className="mt-6 space-y-3 text-sm">
                <Row icon={Mail} label="Email" value={selected.email} />
                <Row icon={Phone} label="Phone" value={selected.phone} />
                <Row icon={Briefcase} label="Department" value={selected.department || "—"} />
                <Row icon={GraduationCap} label="Subjects" value={selected.subjects} />
                <Row icon={Calendar} label="Date Joined" value={selected.joined || "—"} />
                <div className="flex items-center justify-between rounded-xl border border-border bg-muted/30 px-3 py-2.5">
                  <span className="text-xs text-muted-foreground">Status</span>
                  <Badge className={selected.status === "Active" ? "badge-soft-green border" : "badge-soft-amber border"}>{selected.status}</Badge>
                </div>
              </div>
              <div className="mt-6 flex gap-2">
                <button onClick={() => toast("Edit form coming soon")} className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-card hover:bg-muted h-10 text-sm font-semibold transition">
                  <Pencil className="h-4 w-4" /> Edit
                </button>
                <button onClick={() => { toast.success(`${selected.name} deactivated`); setSelected(null); }} className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 text-sm font-semibold transition">
                  <UserX className="h-4 w-4" /> Deactivate
                </button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </AppLayout>
  );
};

function Row({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 px-3 py-2.5">
      <Icon className="h-4 w-4 text-accent" />
      <div className="min-w-0 flex-1">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{label}</p>
        <p className="text-sm text-foreground truncate">{value}</p>
      </div>
    </div>
  );
}

export default Staff;
