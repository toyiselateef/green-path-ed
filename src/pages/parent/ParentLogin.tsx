import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, ArrowRight, Sparkles } from "lucide-react";
import { Logo } from "@/components/Logo";

const ParentLogin = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero header */}
      <div className="relative overflow-hidden bg-aurora text-white px-6 pt-10 pb-16 rounded-b-[2rem]">
        <div className="absolute inset-0 grid-pattern opacity-25" />
        <div className="absolute -top-20 -right-10 h-60 w-60 rounded-full bg-accent/30 blur-3xl animate-float" />
        <div className="relative max-w-md mx-auto">
          <Logo variant="light" size="md" />
          <div className="mt-10 animate-fade-in-up">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur px-2.5 py-1 text-[11px] text-white/80">
              <Sparkles className="h-3 w-3 text-accent" /> Parent Portal
            </span>
            <h1 className="mt-4 font-display text-3xl font-bold leading-tight">
              Welcome back,<br />
              <span className="italic font-light">parent.</span>
            </h1>
            <p className="mt-2 text-sm text-white/75">Sign in to follow your child's school journey.</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <main className="flex-1 px-6 -mt-10 pb-10">
        <form
          onSubmit={(e) => { e.preventDefault(); navigate("/parent/dashboard"); }}
          className="max-w-md mx-auto rounded-3xl bg-card border border-border shadow-elegant p-6 animate-fade-in-up"
        >
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-foreground">Phone Number</span>
            <div className="flex">
              <span className="inline-flex items-center gap-1.5 rounded-l-xl border border-r-0 border-input bg-muted px-3 text-sm">
                🇳🇬 <span className="font-medium">+234</span>
              </span>
              <input className="h-12 flex-1 rounded-r-xl border border-input bg-background px-3.5 text-sm focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/15 transition" placeholder="803 145 7821" />
            </div>
          </label>

          <label className="block mt-4">
            <span className="mb-1.5 block text-xs font-semibold text-foreground">Password</span>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type={show ? "text" : "password"}
                placeholder="••••••••"
                className="h-12 w-full rounded-xl border border-input bg-background pl-10 pr-12 text-sm focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/15 transition"
              />
              <button type="button" onClick={() => setShow(s => !s)} className="absolute right-2.5 top-1/2 -translate-y-1/2 grid h-8 w-8 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition">
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </label>

          <button type="submit" className="group mt-6 w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-brand text-white h-12 text-sm font-semibold shadow-md-soft hover:shadow-glow transition-all">
            Sign In
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>

          <button type="button" onClick={() => navigate("/parent/activate")} className="mt-3 w-full text-center text-sm font-medium text-accent hover:text-accent/80 transition">
            Activate my portal →
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          <Link to="/login" className="story-link">Staff sign in</Link> · Powered by EdPlix
        </p>
      </main>
    </div>
  );
};

export default ParentLogin;
