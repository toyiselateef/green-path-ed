import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Check, Eye, EyeOff, Lock, Sparkles, ShieldCheck, AlertCircle } from "lucide-react";
import { Logo } from "@/components/Logo";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "sonner";

type Step = 1 | 2 | 3 | "success";

const VALID_ADM = "BHS/2023/041";
const CORRECT_OTP = "123456";

const scorePassword = (p: string) => {
  let s = 0;
  if (p.length >= 8) s++;
  if (/[A-Z]/.test(p)) s++;
  if (/[0-9]/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  return s; // 0-4
};

const ParentActivate = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);

  // Step 1
  const [adm, setAdm] = useState("");
  const [phone, setPhone] = useState("");
  const [findError, setFindError] = useState(false);

  // Step 2
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState(false);
  const [shake, setShake] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [resendIn, setResendIn] = useState(60);

  // Step 3
  const [pwd, setPwd] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const submittedRef = useRef(false);

  useEffect(() => {
    if (step !== 2) return;
    setResendIn(60);
    const t = setInterval(() => setResendIn((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [step]);

  const strength = useMemo(() => scorePassword(pwd), [pwd]);
  const strengthLabel = ["Too weak", "Weak", "Fair", "Strong", "Excellent"][strength];
  const strengthColors = ["bg-destructive", "bg-destructive", "bg-warning", "bg-yellow-500", "bg-accent"];

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (adm.trim().toUpperCase() !== VALID_ADM) {
      setFindError(true);
      return;
    }
    setFindError(false);
    setStep(2);
    toast.success("OTP sent to +234 803 *** 7821");
  };

  const handleStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp !== CORRECT_OTP) {
      setOtpError(true);
      setShake(true);
      setAttemptsLeft((a) => Math.max(0, a - 1));
      setTimeout(() => setShake(false), 500);
      return;
    }
    setOtpError(false);
    setStep(3);
  };

  const handleStep3 = (e: React.FormEvent) => {
    e.preventDefault();
    if (submittedRef.current) return;
    if (pwd.length < 8) return toast.error("Password must be at least 8 characters");
    if (pwd !== confirm) return toast.error("Passwords do not match");
    submittedRef.current = true;
    setStep("success");
    setTimeout(() => {
      toast.success("🎉 Portal activated! Welcome, Mrs. Adewale.");
      navigate("/parent/dashboard");
    }, 1700);
  };

  const dots = [1, 2, 3] as const;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Aurora header */}
      <div className="relative overflow-hidden bg-aurora text-white px-6 pt-10 pb-16 rounded-b-[2rem]">
        <div className="absolute inset-0 grid-pattern opacity-25" />
        <div className="absolute -top-20 -right-10 h-60 w-60 rounded-full bg-accent/30 blur-3xl animate-float" />
        <div className="relative max-w-md mx-auto">
          <Logo variant="light" size="md" />
          <div className="mt-10 animate-fade-in-up">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur px-2.5 py-1 text-[11px] text-white/80">
              <Sparkles className="h-3 w-3 text-accent" /> Parent Portal · Activation
            </span>
            <h1 className="mt-4 font-display text-3xl font-bold leading-tight">
              Set up your<br />
              <span className="italic font-light">parent access.</span>
            </h1>
            <p className="mt-2 text-sm text-white/75">Three quick steps and you're in.</p>
          </div>
        </div>
      </div>

      {/* Card */}
      <main className="flex-1 px-6 -mt-10 pb-10">
        <div className="max-w-md mx-auto rounded-3xl bg-card border border-border shadow-elegant p-6 animate-fade-in-up">
          {/* Step indicator */}
          {step !== "success" && (
            <div className="flex items-center justify-center gap-2 mb-6">
              {dots.map((d) => {
                const numStep = step === "success" ? 4 : (step as number);
                const done = d < numStep;
                const active = d === numStep;
                return (
                  <div key={d} className="flex items-center gap-2">
                    <span
                      className={`grid place-items-center rounded-full transition-all ${
                        done
                          ? "h-6 w-6 bg-gradient-brand text-white"
                          : active
                          ? "h-2.5 w-2.5 bg-accent ring-4 ring-accent/20"
                          : "h-2 w-2 bg-muted"
                      }`}
                    >
                      {done && <Check className="h-3 w-3" />}
                    </span>
                    {d < 3 && <span className={`h-px w-6 ${d < (step as number) ? "bg-accent" : "bg-border"}`} />}
                  </div>
                );
              })}
            </div>
          )}

          {step === 1 && (
            <form onSubmit={handleStep1} className="animate-fade-in">
              <h2 className="font-display text-xl font-bold text-foreground">Let's find your child's record</h2>
              <p className="mt-1 text-sm text-muted-foreground">We'll match the admission number with your phone.</p>

              <label className="block mt-5">
                <span className="mb-1.5 block text-xs font-semibold text-foreground">Admission Number</span>
                <input
                  value={adm}
                  onChange={(e) => { setAdm(e.target.value); setFindError(false); }}
                  placeholder="BHS/2023/041"
                  className={`h-12 w-full rounded-xl border bg-background px-3.5 text-sm focus:outline-none focus:ring-4 focus:ring-accent/15 transition ${findError ? "border-destructive" : "border-input focus:border-accent"}`}
                />
                <span className="mt-1 block text-[11px] text-muted-foreground">Format: SCHOOL/YEAR/NUMBER (found on your child's ID card)</span>
              </label>

              <label className="block mt-4">
                <span className="mb-1.5 block text-xs font-semibold text-foreground">Your Phone Number</span>
                <div className="flex">
                  <span className="inline-flex items-center gap-1.5 rounded-l-xl border border-r-0 border-input bg-muted px-3 text-sm">
                    🇳🇬 <span className="font-medium">+234</span>
                  </span>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="803 145 7821"
                    className="h-12 flex-1 rounded-r-xl border border-input bg-background px-3.5 text-sm focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/15 transition"
                  />
                </div>
              </label>

              {findError && (
                <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-destructive/30 bg-destructive/5 p-3 animate-fade-in">
                  <AlertCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                  <div className="text-xs text-foreground">
                    <p className="font-semibold">No match found</p>
                    <p className="text-muted-foreground mt-0.5">We couldn't find a student with that admission number. Please check with the school office.</p>
                  </div>
                </div>
              )}

              <button type="submit" className="group mt-6 w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-brand text-white h-12 text-sm font-semibold shadow-md-soft hover:shadow-glow transition-all">
                Send OTP <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Hint: try admission <span className="font-mono font-semibold text-foreground">BHS/2023/041</span>
              </p>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleStep2} className="animate-fade-in">
              <h2 className="font-display text-xl font-bold text-foreground">Enter the code we sent you</h2>
              <p className="mt-1 text-sm text-muted-foreground">A 6-digit code was sent to <span className="font-semibold text-foreground">+234 803 *** 7821</span></p>

              <div className={`mt-6 flex justify-center ${shake ? "animate-[shake_0.4s_ease-in-out]" : ""}`}>
                <InputOTP maxLength={6} value={otp} onChange={(v) => { setOtp(v); setOtpError(false); }}>
                  <InputOTPGroup>
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <InputOTPSlot
                        key={i}
                        index={i}
                        className={`h-12 w-11 text-base font-bold ${otpError ? "border-destructive" : ""}`}
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>

              {otpError && (
                <p className="mt-3 text-center text-xs font-medium text-destructive animate-fade-in">
                  Incorrect code. {attemptsLeft} attempts remaining.
                </p>
              )}

              <div className="mt-5 text-center text-xs text-muted-foreground">
                {resendIn > 0 ? (
                  <>Resend code in <span className="font-semibold text-foreground tabular-nums">{resendIn}s</span></>
                ) : (
                  <button type="button" onClick={() => { setResendIn(60); toast.success("New OTP sent"); }} className="font-semibold text-accent hover:underline">
                    Resend code
                  </button>
                )}
              </div>

              <button type="submit" disabled={otp.length < 6} className="group mt-6 w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-brand text-white h-12 text-sm font-semibold shadow-md-soft hover:shadow-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                Verify Code <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Hint: try OTP <span className="font-mono font-semibold text-foreground">123456</span>
              </p>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleStep3} className="animate-fade-in">
              <h2 className="font-display text-xl font-bold text-foreground">Create your password</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                You're activating the portal for <span className="font-semibold text-foreground">Adewale Johnson · JSS2A</span>
              </p>

              <label className="block mt-5">
                <span className="mb-1.5 block text-xs font-semibold text-foreground">New Password</span>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type={showPwd ? "text" : "password"}
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    placeholder="At least 8 characters"
                    className="h-12 w-full rounded-xl border border-input bg-background pl-10 pr-12 text-sm focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/15 transition"
                  />
                  <button type="button" onClick={() => setShowPwd((s) => !s)} className="absolute right-2.5 top-1/2 -translate-y-1/2 grid h-8 w-8 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition">
                    {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </label>

              {/* Strength bar */}
              <div className="mt-2.5">
                <div className="grid grid-cols-4 gap-1.5">
                  {[0, 1, 2, 3].map((i) => (
                    <span
                      key={i}
                      className={`h-1.5 rounded-full transition-colors ${i < strength ? strengthColors[strength] : "bg-muted"}`}
                    />
                  ))}
                </div>
                <p className="mt-1.5 text-[11px] text-muted-foreground">
                  {pwd.length === 0 ? "Use 8+ chars with uppercase, numbers and symbols" : <>Strength: <span className="font-semibold text-foreground">{strengthLabel}</span></>}
                </p>
              </div>

              <label className="block mt-4">
                <span className="mb-1.5 block text-xs font-semibold text-foreground">Confirm Password</span>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="Repeat your password"
                    className={`h-12 w-full rounded-xl border bg-background pl-10 pr-12 text-sm focus:outline-none focus:ring-4 focus:ring-accent/15 transition ${confirm && confirm !== pwd ? "border-destructive" : "border-input focus:border-accent"}`}
                  />
                  <button type="button" onClick={() => setShowConfirm((s) => !s)} className="absolute right-2.5 top-1/2 -translate-y-1/2 grid h-8 w-8 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition">
                    {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {confirm && confirm !== pwd && (
                  <span className="mt-1 block text-[11px] text-destructive">Passwords don't match</span>
                )}
              </label>

              <button type="submit" className="group mt-6 w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-brand text-white h-12 text-sm font-semibold shadow-md-soft hover:shadow-glow transition-all">
                <ShieldCheck className="h-4 w-4" /> Activate Portal
              </button>
            </form>
          )}

          {step === "success" && (
            <div className="py-6 text-center animate-fade-in">
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-accent/15 animate-[scale_0.6s_cubic-bezier(0.34,1.56,0.64,1)]">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-gradient-brand text-white shadow-glow">
                  <Check className="h-7 w-7" strokeWidth={3} />
                </span>
              </div>
              <h2 className="mt-5 font-display text-2xl font-bold text-foreground">Portal Activated!</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">Redirecting you to your dashboard…</p>
            </div>
          )}
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          Already activated?{" "}
          <button onClick={() => navigate("/parent")} className="story-link font-semibold text-accent">
            Sign in
          </button>
        </p>
      </main>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          75% { transform: translateX(6px); }
        }
        @keyframes scale {
          0% { transform: scale(0); }
          60% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default ParentActivate;
