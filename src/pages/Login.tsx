import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Building2, Eye, EyeOff, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-background">
      {/* Brand panel */}
      <aside className="relative hidden lg:flex w-[46%] xl:w-[50%] bg-aurora overflow-hidden flex-col">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute -top-32 -left-20 h-96 w-96 rounded-full bg-accent/30 blur-3xl animate-float" />
        <div className="absolute bottom-10 right-0 h-[28rem] w-[28rem] rounded-full bg-primary-glow/30 blur-3xl animate-float animation-delay-400" />

        <div className="relative flex-1 flex flex-col p-12">
          <Logo variant="light" size="lg" />

          <div className="my-auto">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur px-3 py-1 text-xs text-white/85 animate-fade-in">
              <Sparkles className="h-3 w-3 text-accent" />
              School OS · Built for Nigeria
            </span>
            <h2 className="mt-6 font-display text-5xl xl:text-6xl font-bold text-white leading-[1.05] animate-fade-in-up">
              Where education
              <br />
              <em className="font-light italic">works.</em>
            </h2>
            <p className="mt-5 max-w-md text-base text-white/75 leading-relaxed animate-fade-in-up animation-delay-200">
              Manage your students, fees, results and report cards from one elegant dashboard. Loved by 240+ schools across Nigeria.
            </p>

            {/* Mini glass stats */}
            <div className="mt-10 grid grid-cols-3 gap-3 max-w-md animate-fade-in-up animation-delay-400">
              {[
                { v: "240+", l: "Schools" },
                { v: "120k", l: "Students" },
                { v: "₦8B+", l: "Fees tracked" },
              ].map((s) => (
                <div key={s.l} className="glass-dark rounded-2xl p-4 text-white">
                  <p className="font-display text-2xl font-bold">{s.v}</p>
                  <p className="mt-1 text-[11px] text-white/65 uppercase tracking-wider">{s.l}</p>
                </div>
              ))}
            </div>

            {/* Quote */}
            <figure className="mt-10 max-w-md glass-dark rounded-2xl p-5 animate-fade-in-up animation-delay-600">
              <blockquote className="text-sm text-white/85 leading-relaxed">
                "EdPlix replaced three apps and a thousand WhatsApp messages. Term reports now go out in minutes."
              </blockquote>
              <figcaption className="mt-3 flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15 text-xs font-bold text-white">FA</span>
                <div className="text-xs">
                  <p className="font-semibold text-white">Mrs. Folake Adeyemi</p>
                  <p className="text-white/60">Proprietor, Brightstar High</p>
                </div>
              </figcaption>
            </figure>
          </div>

          <div className="relative flex items-center gap-2 text-xs text-white/60">
            <ShieldCheck className="h-3.5 w-3.5" />
            Bank-grade security · NDPR compliant
          </div>
        </div>
      </aside>

      {/* Form */}
      <main className="flex-1 flex flex-col">
        <div className="flex items-center justify-between px-6 sm:px-10 py-6 lg:hidden">
          <Logo size="md" />
          <Link to="/" className="text-xs text-muted-foreground hover:text-foreground transition">← Back to home</Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-md animate-fade-in-up">
            <div className="hidden lg:flex justify-end mb-8">
              <Link to="/" className="text-xs text-muted-foreground hover:text-foreground transition">← Back to home</Link>
            </div>

            <div className="space-y-1.5">
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground tracking-tight">Welcome back</h1>
              <p className="text-sm text-muted-foreground">Sign in to your school dashboard.</p>
            </div>

            <form
              className="mt-8 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                navigate("/dashboard");
              }}
            >
              <Field icon={Building2} label="School ID" placeholder="brightstar-hs" />
              <Field icon={Mail} label="Email address" type="email" placeholder="you@school.edu.ng" />
              <Field
                icon={Lock}
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                trailing={
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="rounded-md p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                }
              />

              <div className="flex items-center justify-between text-sm pt-1">
                <label className="flex items-center gap-2 text-foreground cursor-pointer">
                  <Checkbox id="remember" />
                  <span className="text-muted-foreground">Remember me for 30 days</span>
                </label>
                <a href="#" className="font-semibold text-accent hover:text-accent/80 story-link">
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                className="group w-full h-12 mt-2 bg-gradient-brand hover:opacity-95 hover:shadow-glow text-white font-semibold rounded-xl shadow-md-soft transition-all"
              >
                Sign in to dashboard
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>

              <div className="relative my-5">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
                <div className="relative flex justify-center text-[11px] uppercase tracking-wider"><span className="bg-background px-3 text-muted-foreground">or</span></div>
              </div>

              <Link
                to="/parent"
                className="block w-full text-center rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground hover:bg-muted transition"
              >
                I'm a parent — go to portal
              </Link>
            </form>

            <p className="mt-8 text-center text-xs text-muted-foreground">
              Powered by <span className="font-semibold text-foreground">EdPlix</span> · © 2025
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

interface FieldProps {
  icon: React.ElementType;
  label: string;
  type?: string;
  placeholder?: string;
  trailing?: React.ReactNode;
}

function Field({ icon: Icon, label, type = "text", placeholder, trailing }: FieldProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-foreground">{label}</span>
      <div className="group relative">
        <Icon className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-accent" />
        <input
          type={type}
          placeholder={placeholder}
          className="h-12 w-full rounded-xl border border-input bg-card pl-10 pr-12 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/15"
        />
        {trailing && <div className="absolute right-2.5 top-1/2 -translate-y-1/2">{trailing}</div>}
      </div>
    </label>
  );
}

export default Login;
