import { useState } from "react";
import { Plus, MoreHorizontal, Calendar, MapPin, Users, Bold, Italic, Link as LinkIcon, X, Image as ImageIcon, Megaphone } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";

type Tab = "announcements" | "events" | "notices" | "gallery" | "about";

const tabs: { id: Tab; label: string }[] = [
  { id: "announcements", label: "Announcements" },
  { id: "events", label: "Events" },
  { id: "notices", label: "Notices" },
  { id: "gallery", label: "Gallery" },
  { id: "about", label: "About" },
];

const announcements = [
  { title: "Mid-term break begins Friday", excerpt: "Schools will close for mid-term break on Friday and resume the following Monday. Parents should ensure children…", date: "Apr 14, 2026", status: "Published", audience: "All Parents" },
  { title: "PTA Meeting — Saturday 10am", excerpt: "All parents are invited to the Parent-Teachers Association meeting holding this Saturday in the school hall…", date: "Apr 12, 2026", status: "Scheduled", audience: "All Parents" },
  { title: "JSS2A field trip to Lekki Conservation", excerpt: "JSS2A students will be visiting Lekki Conservation Centre on Wednesday. Permission slips are due Monday…", date: "Apr 10, 2026", status: "Published", audience: "Class JSS2A" },
  { title: "Staff training — new grading system", excerpt: "All teaching staff are required to attend training on the updated grading rubric being rolled out next term…", date: "Apr 08, 2026", status: "Draft", audience: "All Staff" },
];

const events = [
  { day: "22", month: "APR", name: "Inter-house Sports Day", time: "8:00 AM", location: "School Field", rsvp: 412 },
  { day: "30", month: "APR", name: "Cultural Day Celebration", time: "10:00 AM", location: "Main Hall", rsvp: 298 },
  { day: "07", month: "MAY", name: "End-of-Term Examinations", time: "9:00 AM", location: "All Classrooms", rsvp: 540 },
  { day: "15", month: "MAY", name: "Graduation Ceremony — SSS3", time: "11:00 AM", location: "Auditorium", rsvp: 186 },
];

const statusTone: Record<string, string> = {
  Published: "badge-soft-green",
  Draft: "badge-soft-gray",
  Scheduled: "badge-soft-amber",
};

const SchoolContent = () => {
  const [tab, setTab] = useState<Tab>("announcements");
  const [open, setOpen] = useState(false);
  const [schedule, setSchedule] = useState(false);
  const [whatsapp, setWhatsapp] = useState(true);

  return (
    <AppLayout>
      <PageHeader
        title="School Content"
        subtitle="Publish announcements, events and notices to parents, staff and your school website."
        badge="CMS"
        actions={
          <button onClick={() => setOpen(true)} className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-brand px-4 h-10 text-sm font-semibold text-white shadow-md hover:shadow-glow transition-all">
            <Plus className="h-4 w-4" /> New {tab === "events" ? "Event" : "Announcement"}
          </button>
        }
      />

      {/* Tab pills */}
      <div className="flex flex-wrap gap-2 mb-6 p-1 rounded-2xl border border-border bg-card w-fit">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 h-9 rounded-xl text-xs font-semibold transition ${
              tab === t.id ? "bg-gradient-brand text-white shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Announcements */}
      {tab === "announcements" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
          {announcements.map((a) => (
            <article key={a.title} className="group rounded-2xl border border-border bg-card p-5 hover-lift">
              <div className="flex items-start justify-between gap-3 mb-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand text-white shadow-sm shrink-0">
                  <Megaphone className="h-4 w-4" />
                </span>
                <button className="grid h-8 w-8 place-items-center rounded-lg hover:bg-muted text-muted-foreground transition">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
              <h3 className="font-display text-base font-semibold text-foreground mb-1.5 line-clamp-1">{a.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{a.excerpt}</p>
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" /> {a.date}
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold ${statusTone[a.status]}`}>{a.status}</span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/50 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                    <Users className="h-2.5 w-2.5" /> {a.audience}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Events */}
      {tab === "events" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
          {events.map((e) => (
            <article key={e.name} className="group rounded-2xl border border-border bg-card p-5 hover-lift flex gap-4">
              <div className="shrink-0 w-16 rounded-xl bg-gradient-brand text-white text-center py-3 shadow-md">
                <p className="font-display text-2xl font-bold leading-none">{e.day}</p>
                <p className="text-[10px] uppercase tracking-wider mt-1 text-white/85">{e.month}</p>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-base font-semibold text-foreground line-clamp-1">{e.name}</h3>
                  <button className="grid h-7 w-7 place-items-center rounded-lg hover:bg-muted text-muted-foreground transition shrink-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                  <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> {e.time}</span>
                  <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {e.location}</span>
                </div>
                <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent/10 border border-accent/20 px-2.5 py-1 text-[11px] font-semibold text-accent">
                  <Users className="h-3 w-3" /> {e.rsvp} RSVPs
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {(tab === "notices" || tab === "gallery" || tab === "about") && (
        <div className="rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center animate-fade-in">
          <span className="grid h-12 w-12 mx-auto place-items-center rounded-2xl bg-muted mb-3">
            <ImageIcon className="h-5 w-5 text-muted-foreground" />
          </span>
          <h3 className="font-display text-base font-semibold text-foreground">No {tab} yet</h3>
          <p className="text-sm text-muted-foreground mt-1">Click "New" above to create your first {tab.slice(0, -1)}.</p>
        </div>
      )}

      {/* Slide-over editor */}
      {open && (
        <>
          <div className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-40 animate-fade-in" onClick={() => setOpen(false)} />
          <aside className="fixed right-0 top-0 bottom-0 w-full max-w-xl bg-card border-l border-border shadow-elegant z-50 flex flex-col animate-slide-in-right">
            <header className="flex items-center justify-between px-6 h-16 border-b border-border">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">New Announcement</p>
                <h2 className="font-display text-lg font-semibold text-foreground">Compose your message</h2>
              </div>
              <button onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center rounded-xl hover:bg-muted text-muted-foreground transition">
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-foreground">Title</label>
                <input placeholder="e.g. Mid-term break begins Friday" className="h-11 w-full rounded-xl border border-input bg-background px-3.5 text-sm focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/15 transition" />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-foreground">Content</label>
                <div className="rounded-xl border border-input bg-background overflow-hidden focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/15 transition">
                  <div className="flex items-center gap-1 px-2 py-1.5 border-b border-border bg-muted/40">
                    {[Bold, Italic, LinkIcon].map((Ic, i) => (
                      <button key={i} type="button" className="grid h-7 w-7 place-items-center rounded-md hover:bg-card text-muted-foreground hover:text-foreground transition">
                        <Ic className="h-3.5 w-3.5" />
                      </button>
                    ))}
                  </div>
                  <textarea rows={6} placeholder="Write your announcement here…" className="w-full px-3.5 py-3 text-sm bg-transparent focus:outline-none resize-none" />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-foreground">Audience</label>
                <div className="grid grid-cols-2 gap-2">
                  {["All Parents", "Specific Class", "All Staff", "Everyone"].map((a, i) => (
                    <button key={a} type="button" className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition text-left ${i === 0 ? "border-accent bg-accent/10 text-accent" : "border-input bg-card text-muted-foreground hover:border-accent/40"}`}>
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              <Toggle label="Schedule for later" desc="Publish at a specific date and time" checked={schedule} onChange={setSchedule} />
              {schedule && (
                <div className="grid grid-cols-2 gap-3 -mt-2">
                  <input type="date" className="h-11 rounded-xl border border-input bg-background px-3 text-sm focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/15" />
                  <input type="time" className="h-11 rounded-xl border border-input bg-background px-3 text-sm focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/15" />
                </div>
              )}
              <Toggle label="Send via WhatsApp" desc="Growth plan — instant delivery to parent phones" checked={whatsapp} onChange={setWhatsapp} />
            </div>

            <footer className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border bg-muted/30">
              <button className="rounded-xl border border-input bg-card px-4 h-10 text-sm font-medium text-foreground hover:bg-muted transition">Save as Draft</button>
              <button className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-brand px-5 h-10 text-sm font-semibold text-white shadow-md hover:shadow-glow transition-all">
                Publish
              </button>
            </footer>
          </aside>
        </>
      )}
    </AppLayout>
  );
};

function Toggle({ label, desc, checked, onChange }: { label: string; desc: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button type="button" onClick={() => onChange(!checked)} className="w-full flex items-center justify-between gap-3 rounded-xl border border-border bg-muted/30 p-3.5 text-left hover:border-accent/40 transition">
      <div>
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      <span className={`relative h-6 w-11 rounded-full transition ${checked ? "bg-gradient-brand" : "bg-muted"}`}>
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition ${checked ? "left-5" : "left-0.5"}`} />
      </span>
    </button>
  );
}

export default SchoolContent;
