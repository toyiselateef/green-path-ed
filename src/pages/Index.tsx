import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { Logo } from "@/components/Logo";

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Aurora background */}
      <div className="absolute inset-0 bg-aurora opacity-90 animate-aurora-shift" style={{ backgroundSize: "200% 200%" }} />
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-accent/30 blur-3xl animate-float" />
      <div className="absolute bottom-0 -left-40 h-[500px] w-[500px] rounded-full bg-primary-glow/30 blur-3xl animate-float animation-delay-400" />

      {/* Nav */}
      <header className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
          <Logo size="md" variant="light" />
          <nav className="hidden md:flex items-center gap-7 text-sm text-white/80">
            <a className="story-link" href="#features">Product</a>
            <a className="story-link" href="#features">Pricing</a>
            <a className="story-link" href="#features">Schools</a>
            <a className="story-link" href="#features">Resources</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-white/80 hover:text-white transition">Sign in</Link>
            <Link
              to="/dashboard"
              className="group inline-flex items-center gap-1.5 rounded-xl bg-white text-primary-deep px-4 py-2 text-sm font-semibold shadow-lg-soft hover:shadow-glow transition-all"
            >
              View demo
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pt-16 pb-24 text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur px-3.5 py-1.5 text-xs text-white/85 animate-fade-in">
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          New · WhatsApp report card delivery is live
        </div>
        <h1 className="mx-auto mt-6 max-w-4xl font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] animate-fade-in-up">
          Where education
          <br />
          <span className="italic font-light text-white/95">actually</span>{" "}
          <span className="bg-gradient-to-r from-white via-accent to-white bg-clip-text text-transparent">works.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/75 leading-relaxed animate-fade-in-up animation-delay-200">
          EdPlix is the all-in-one school management platform built for Nigerian private schools. Students, fees, results, and report cards — beautifully unified.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3 animate-fade-in-up animation-delay-400">
          <Link
            to="/login"
            className="group relative inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-primary-deep shadow-elegant hover:shadow-glow transition-all"
          >
            Start free trial
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl glass-dark px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/15 transition"
          >
            Explore the dashboard
          </Link>
        </div>

        {/* Floating glass preview card */}
        <div className="relative mt-20 mx-auto max-w-5xl animate-fade-in-up animation-delay-600">
          <div className="absolute -inset-6 bg-gradient-to-r from-accent/30 via-primary-glow/30 to-accent/30 blur-3xl opacity-60 animate-pulse-glow" />
          <div className="relative rounded-3xl glass-dark p-2 shadow-elegant">
            <div className="rounded-2xl bg-gradient-to-br from-background to-secondary p-6 sm:p-10 text-left">
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Students", value: "342", grad: "from-accent to-primary" },
                  { label: "Fees collected", value: "₦4.85M", grad: "from-primary to-primary-deep" },
                  { label: "Reports sent", value: "287", grad: "from-primary-glow to-accent" },
                ].map((s) => (
                  <div key={s.label} className="rounded-2xl bg-card border border-border p-5 hover-lift">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
                    <p className={`mt-2 font-display text-3xl font-bold bg-gradient-to-br ${s.grad} bg-clip-text text-transparent`}>
                      {s.value}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-12 gap-4">
                <div className="col-span-12 sm:col-span-8 rounded-2xl bg-card border border-border p-5">
                  <p className="text-sm font-semibold text-foreground">Recent payments</p>
                  <div className="mt-4 space-y-2.5">
                    {[
                      ["Adewale Johnson", "₦50,000", "Paid"],
                      ["Aisha Bello", "₦30,000", "Partial"],
                      ["Chinedu Okafor", "₦50,000", "Paid"],
                    ].map(([n, a, s]) => (
                      <div key={n} className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2 text-xs">
                        <span className="font-medium text-foreground">{n}</span>
                        <span className="text-muted-foreground">{a}</span>
                        <span className={`rounded-full px-2 py-0.5 ${s === "Paid" ? "badge-soft-green" : "badge-soft-amber"} border`}>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-span-12 sm:col-span-4 rounded-2xl bg-gradient-brand p-5 text-white relative overflow-hidden">
                  <div className="absolute inset-0 grid-pattern opacity-30" />
                  <div className="relative">
                    <Zap className="h-5 w-5 mb-3" />
                    <p className="text-sm font-semibold">Generate all report cards</p>
                    <p className="mt-1 text-xs text-white/70">In one click. PDF + WhatsApp.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logo strip */}
        <div className="mt-20">
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">Trusted by 240+ schools across Nigeria</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-white/40 font-display font-semibold text-lg">
            <span>Brightstar</span><span>Excelsior</span><span>Greenfield</span><span>Crescent</span><span>Royal Heritage</span><span>Pacesetters</span>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 py-6 text-center text-xs text-white/50">
        © 2025 EdPlix · Where education works.
      </footer>
    </div>
  );
};

export default Index;
