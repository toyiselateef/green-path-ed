import { useState, useRef, useEffect } from "react";
import {
  Sparkles, Send, Bot, User, MessageSquare, BookOpen, Video, Mail,
  Lightbulb, Zap, FileText, Users, Wallet, ArrowRight, Plus,
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";

type Message = { role: "user" | "assistant"; content: string; ts: number };

const suggestions = [
  { icon: Users, text: "How do I bulk-import students from Excel?" },
  { icon: Wallet, text: "Set up Paystack for online fee collection" },
  { icon: FileText, text: "Generate report cards and send via WhatsApp" },
  { icon: Zap, text: "Auto-grade results from CA and exam scores" },
];

const channels = [
  { icon: BookOpen, title: "Help Center", desc: "Step-by-step guides", action: "Browse articles" },
  { icon: Video, title: "Video Tutorials", desc: "5-minute walkthroughs", action: "Watch now" },
  { icon: Mail, title: "Email Support", desc: "Reply within 4 hours", action: "support@edplix.ng" },
];

// Simulated EdPlix AI response (UI demo only)
const fakeReply = (q: string) => {
  const lower = q.toLowerCase();
  if (lower.includes("import") || lower.includes("bulk")) {
    return "To bulk-import students:\n\n1. Go to **Students → Add Student → Import**\n2. Download the EdPlix Excel template\n3. Fill in admission number, name, class, parent phone\n4. Upload the file — we'll validate and show a preview before saving\n\nDuplicate admission numbers are flagged automatically. Want me to walk you through column mapping?";
  }
  if (lower.includes("paystack") || lower.includes("payment")) {
    return "EdPlix integrates with Paystack natively. In **Settings → Billing**, paste your Paystack public + secret keys. Once saved, every invoice gets a 'Pay Now' link parents can click from WhatsApp or SMS. Funds settle to your school account in T+1.";
  }
  if (lower.includes("report") || lower.includes("whatsapp")) {
    return "After all subject scores are entered, head to **Report Cards**, click **Bulk Generate**, then **Send via WhatsApp**. Each parent receives a PDF link and a friendly message with the term summary. You can preview the template before sending.";
  }
  if (lower.includes("grade") || lower.includes("ca")) {
    return "Auto-grading uses your school's grading scale (A: 75-100, B: 60-74, etc.). On the **Results** page, just enter CA1, CA2 and Exam scores — totals, grades and class positions update live. You can edit the scale in **Settings → Academic Year**.";
  }
  return "Great question! I'm EdPlix AI — I can help with students, fees, results, report cards, attendance and settings. Could you tell me a bit more about what you're trying to do? You can also browse the Help Center on the right for detailed guides.";
};

const Support = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi 👋 I'm **EdPlix AI**, your personal assistant for running Brightstar High School. Ask me anything — from setting up Paystack to sending report cards on WhatsApp.",
      ts: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  const send = (text: string) => {
    const q = text.trim();
    if (!q) return;
    setMessages((m) => [...m, { role: "user", content: q, ts: Date.now() }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "assistant", content: fakeReply(q), ts: Date.now() }]);
      setThinking(false);
    }, 900);
  };

  return (
    <AppLayout>
      <PageHeader
        title="Support"
        subtitle="Get answers in seconds with EdPlix AI, or browse our help library."
        badge="Help Center"
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 h-10 text-sm font-semibold hover:bg-muted transition">
            <Mail className="h-4 w-4" /> Contact a human
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
        {/* AI Chat — primary surface */}
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-elegant flex flex-col min-h-[640px]">
          {/* Header */}
          <div className="relative bg-aurora p-5 text-white overflow-hidden">
            <div className="absolute inset-0 grid-pattern opacity-25" />
            <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-accent/30 blur-3xl animate-float" />
            <div className="relative flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl glass-dark">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-lg font-bold">EdPlix AI</h3>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/15 backdrop-blur px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" /> Online
                  </span>
                </div>
                <p className="text-xs text-white/70">Trained on every EdPlix feature · Replies in seconds</p>
              </div>
              <button className="rounded-xl glass-dark px-3 h-9 text-xs font-semibold hover:bg-white/15 transition inline-flex items-center gap-1.5">
                <Plus className="h-3.5 w-3.5" /> New chat
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 bg-mesh">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-3 animate-fade-in-up ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`shrink-0 grid h-8 w-8 place-items-center rounded-xl ${m.role === "user" ? "bg-muted text-foreground" : "bg-gradient-brand text-white shadow-md-soft"}`}>
                  {m.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-gradient-brand text-white shadow-md-soft"
                    : "bg-card border border-border text-foreground shadow-sm-soft"
                }`}>
                  {m.content.split("\n").map((line, idx) => (
                    <p key={idx} className={idx > 0 ? "mt-2" : ""}
                       dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
                  ))}
                </div>
              </div>
            ))}
            {thinking && (
              <div className="flex gap-3 animate-fade-in-up">
                <div className="shrink-0 grid h-8 w-8 place-items-center rounded-xl bg-gradient-brand text-white shadow-md-soft">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="rounded-2xl bg-card border border-border px-4 py-3 shadow-sm-soft">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                    <span className="h-2 w-2 rounded-full bg-accent animate-pulse animation-delay-200" />
                    <span className="h-2 w-2 rounded-full bg-accent animate-pulse animation-delay-400" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Suggestions (only at start) */}
          {messages.length <= 1 && (
            <div className="px-5 pb-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                <Lightbulb className="h-3 w-3" /> Try asking
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s.text}
                    onClick={() => send(s.text)}
                    className="group flex items-start gap-2.5 rounded-xl border border-border bg-card p-3 text-left text-xs hover-lift hover:border-accent/40"
                  >
                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent/10 text-accent shrink-0">
                      <s.icon className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-foreground leading-snug">{s.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Composer */}
          <div className="border-t border-border bg-card/80 backdrop-blur p-3">
            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="flex items-center gap-2 rounded-2xl border border-border bg-background pl-4 pr-1 h-12 focus-within:ring-2 focus-within:ring-ring/40 focus-within:border-ring transition"
            >
              <Sparkles className="h-4 w-4 text-accent shrink-0" />
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask EdPlix AI anything about your school…"
                className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim() || thinking}
                className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand text-white shadow-md-soft hover:shadow-glow transition disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            <p className="mt-2 text-[10px] text-center text-muted-foreground">EdPlix AI can make mistakes. Verify important answers with our team.</p>
          </div>
        </div>

        {/* Right column — channels & resources */}
        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Other ways to get help</p>
            <div className="space-y-2">
              {channels.map((c) => (
                <button key={c.title} className="group w-full flex items-center gap-3 rounded-xl p-3 text-left hover:bg-muted transition">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition">
                    <c.icon className="h-4 w-4" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{c.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{c.desc}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 transition" />
                </button>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-gradient-brand p-5 text-white shadow-md-soft">
            <div className="absolute inset-0 grid-pattern opacity-30" />
            <div className="relative">
              <MessageSquare className="h-5 w-5 mb-2" />
              <p className="font-display text-base font-bold leading-snug">Need a live demo?</p>
              <p className="mt-1 text-xs text-white/80 leading-relaxed">Book 30 minutes with a product specialist. Free for all schools on the Growth plan.</p>
              <button className="mt-3 w-full rounded-lg bg-white/15 hover:bg-white/25 backdrop-blur px-3 py-2 text-xs font-semibold transition">Schedule a call</button>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Popular guides</p>
            <ul className="space-y-2.5 text-sm">
              {[
                "Setting up your first academic session",
                "Recording offline & online payments",
                "Sending report cards on WhatsApp",
                "Granting parents portal access",
              ].map((t) => (
                <li key={t}>
                  <button className="group flex items-start gap-2 text-left text-foreground hover:text-accent transition">
                    <FileText className="h-3.5 w-3.5 mt-0.5 shrink-0 text-muted-foreground group-hover:text-accent" />
                    <span>{t}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </AppLayout>
  );
};

export default Support;
