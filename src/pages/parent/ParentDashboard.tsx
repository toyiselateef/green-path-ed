import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, Home, Wallet, ClipboardList, Megaphone, User, ArrowRight, ChevronRight, MessageCircle, Sparkles, TrendingUp } from "lucide-react";
import { Logo } from "@/components/Logo";

const children = [
  { name: "Adewale", cls: "JSS2A", initials: "AJ" },
  { name: "Aisha", cls: "Pri 4B", initials: "AJ" },
];

const subjects = [
  { name: "Mathematics", score: 87, grade: "A" },
  { name: "English Language", score: 78, grade: "A" },
  { name: "Basic Science", score: 71, grade: "B" },
];

const ParentDashboard = () => {
  const [active, setActive] = useState(0);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="relative overflow-hidden bg-aurora text-white px-5 pt-8 pb-20 rounded-b-[2rem]">
        <div className="absolute inset-0 grid-pattern opacity-25" />
        <div className="absolute -top-20 -right-10 h-56 w-56 rounded-full bg-accent/30 blur-3xl animate-float" />
        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-xs text-white/65">Brightstar High School</p>
            <h1 className="mt-1 font-display text-xl font-bold leading-tight">Hello, Mrs. Adewale 👋</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative grid h-10 w-10 place-items-center rounded-xl glass-dark text-white">
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-accent ring-2 ring-primary-deep" />
            </button>
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/15 backdrop-blur text-xs font-bold text-white">FA</span>
          </div>
        </div>

        {/* Child tabs */}
        <div className="relative mt-6 flex gap-2 overflow-x-auto scrollbar-none -mx-5 px-5 pb-1">
          {children.map((c, i) => (
            <button
              key={c.name}
              onClick={() => setActive(i)}
              className={`flex-shrink-0 flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5 text-sm transition ${
                active === i ? "bg-white text-primary-deep shadow-md-soft" : "glass-dark text-white"
              }`}
            >
              <span className={`grid h-8 w-8 place-items-center rounded-xl text-[11px] font-bold ${active === i ? "bg-gradient-brand text-white" : "bg-white/15 text-white"}`}>
                {c.initials}
              </span>
              <div className="text-left leading-tight">
                <p className="font-semibold">{c.name}</p>
                <p className={`text-[10px] ${active === i ? "text-muted-foreground" : "text-white/60"}`}>{c.cls}</p>
              </div>
              {active === i && <span className="ml-1 h-1.5 w-1.5 rounded-full bg-accent" />}
            </button>
          ))}
        </div>
      </header>

      {/* Content */}
      <main className="px-5 -mt-12 space-y-4">
        {/* Fee balance card */}
        <div className="rounded-3xl bg-card border border-border shadow-elegant p-5 animate-fade-in-up">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Outstanding Balance</p>
              <p className="mt-1 font-display text-4xl font-bold text-foreground tabular-nums">₦20,000</p>
              <p className="mt-1 text-xs text-muted-foreground">School Fees · First Term</p>
            </div>
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-warning/10 text-warning">
              <Wallet className="h-5 w-5" />
            </span>
          </div>
          <div className="mt-4 h-2 rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-gradient-to-r from-accent to-primary" style={{ width: "60%" }} />
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">₦30,000 paid of ₦50,000</p>
          <button className="group mt-4 w-full inline-flex items-center justify-center gap-1.5 rounded-2xl bg-gradient-brand text-white h-12 text-sm font-semibold shadow-md-soft hover:shadow-glow transition-all">
            Pay Now
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Results card */}
        <div className="rounded-3xl bg-card border border-border p-5 animate-fade-in-up">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Latest Results</p>
              <h3 className="font-display font-bold text-foreground mt-0.5">First Term · Top subjects</h3>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 text-accent px-2 py-0.5 text-[10px] font-bold">
              <TrendingUp className="h-3 w-3" /> 79%
            </span>
          </div>
          <ul className="space-y-2.5">
            {subjects.map((s) => (
              <li key={s.name} className="flex items-center gap-3">
                <span className={`grid h-8 w-8 place-items-center rounded-lg border text-xs font-bold ${s.grade === "A" ? "badge-soft-green" : "badge-soft-blue"}`}>{s.grade}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{s.name}</p>
                  <div className="mt-1 h-1 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-accent to-primary" style={{ width: `${s.score}%` }} />
                  </div>
                </div>
                <span className="text-sm font-bold text-foreground tabular-nums">{s.score}</span>
              </li>
            ))}
          </ul>
          <Link to="#" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent story-link">
            View all results <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Notice card */}
        <div className="rounded-3xl bg-gradient-to-br from-card to-secondary border border-border p-5 animate-fade-in-up relative overflow-hidden">
          <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-accent/15 blur-2xl" />
          <div className="relative">
            <div className="flex items-center gap-2 text-xs">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent/15 text-accent">
                <Megaphone className="h-3.5 w-3.5" />
              </span>
              <span className="text-muted-foreground">Tue, 8 Oct · School Notice</span>
            </div>
            <h3 className="mt-3 font-display font-bold text-foreground">Mid-term break begins Friday</h3>
            <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">School resumes on Monday, 21st October. Reading list and assignments have been shared via WhatsApp.</p>
            <button className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent story-link">
              Read more <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* WhatsApp prompt */}
        <div className="rounded-3xl bg-accent/10 border border-accent/20 p-4 flex items-center gap-3 animate-fade-in-up">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-accent-foreground">
            <MessageCircle className="h-4 w-4" />
          </span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">Get updates on WhatsApp</p>
            <p className="text-xs text-muted-foreground">Receive results & receipts directly.</p>
          </div>
          <button className="rounded-lg bg-accent text-accent-foreground text-xs font-semibold px-3 py-1.5">Enable</button>
        </div>
      </main>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 inset-x-0 z-30 px-3 pb-3">
        <div className="glass rounded-2xl shadow-elegant px-2 py-2 flex items-center justify-between">
          {[
            { l: "Home", i: Home, a: true },
            { l: "Fees", i: Wallet },
            { l: "Results", i: ClipboardList },
            { l: "Notices", i: Megaphone },
            { l: "Profile", i: User },
          ].map((t) => (
            <button
              key={t.l}
              className={`flex-1 flex flex-col items-center gap-0.5 rounded-xl py-2 transition ${
                t.a ? "bg-gradient-brand text-white shadow-md-soft" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <t.i className="h-4 w-4" />
              <span className="text-[10px] font-semibold">{t.l}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default ParentDashboard;
