import { Plus, Search, Mail, Phone, MoreHorizontal, GraduationCap } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/badge";

const staff = [
  { name: "Mrs. Funke Adeyemi", role: "Vice Principal", subjects: "Mathematics", email: "funke@brightstar.ng", phone: "+234 803 111 2233", status: "Active", initials: "FA" },
  { name: "Mr. Emeka Obi", role: "Senior Teacher", subjects: "Physics, Further Maths", email: "emeka@brightstar.ng", phone: "+234 805 222 7788", status: "Active", initials: "EO" },
  { name: "Ms. Halima Yusuf", role: "Teacher", subjects: "English Language", email: "halima@brightstar.ng", phone: "+234 809 444 5566", status: "On Leave", initials: "HY" },
  { name: "Mr. Tobi Adekunle", role: "Teacher", subjects: "Chemistry, Biology", email: "tobi@brightstar.ng", phone: "+234 802 666 9911", status: "Active", initials: "TA" },
  { name: "Mrs. Ngozi Eze", role: "Bursar", subjects: "Accounts", email: "ngozi@brightstar.ng", phone: "+234 807 888 1100", status: "Active", initials: "NE" },
];

const Staff = () => (
  <AppLayout>
    <PageHeader
      title="Staff"
      subtitle="Manage teachers, administrators and support staff."
      badge="People"
      actions={
        <button className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-brand text-white px-4 h-10 text-sm font-semibold shadow-md-soft hover:shadow-glow transition">
          <Plus className="h-4 w-4" /> Add Staff
        </button>
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
                  <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition"><MoreHorizontal className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </AppLayout>
);

export default Staff;
