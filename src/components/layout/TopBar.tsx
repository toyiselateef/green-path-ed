import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, Search, ChevronDown, Sparkles, Banknote, FileText, UserCheck, AlertTriangle } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type Notif = { id: number; icon: React.ElementType; tone: string; text: string; time: string; unread: boolean };

const initialNotifs: Notif[] = [
  { id: 1, icon: Banknote, tone: "text-accent bg-accent/10", text: "₦50,000 payment received — Adewale Johnson", time: "2 min ago", unread: true },
  { id: 2, icon: FileText, tone: "text-info bg-info/10", text: "Result entry deadline tomorrow — JSS2A", time: "1h ago", unread: true },
  { id: 3, icon: UserCheck, tone: "text-primary bg-primary/10", text: "New parent portal login — Mrs. Hauwa Bello", time: "3h ago", unread: false },
  { id: 4, icon: AlertTriangle, tone: "text-warning bg-warning/10", text: "3 invoices overdue — follow up needed", time: "Yesterday", unread: false },
];

export function TopBar() {
  const [notifs, setNotifs] = useState(initialNotifs);
  const unreadCount = notifs.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-10">
        <SidebarTrigger className="-ml-1.5 hover:bg-muted rounded-lg" />
        <div className="hidden md:flex items-center gap-3">
          <div>
            <h2 className="font-display text-base font-bold text-foreground leading-none">Brightstar High School</h2>
            <p className="mt-1 text-[11px] text-muted-foreground leading-none">Lekki, Lagos · Established 2009</p>
          </div>
          <Badge className="ml-2 hidden lg:inline-flex bg-accent/10 text-accent hover:bg-accent/15 border-accent/20 gap-1.5 font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            First Term 2025/2026
          </Badge>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search students, staff, invoices…"
              className="h-10 w-64 lg:w-80 rounded-xl border border-border bg-card pl-9 pr-16 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring transition"
            />
            <kbd className="absolute right-2 top-1/2 -translate-y-1/2 hidden md:inline-flex items-center gap-0.5 rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
              ⌘K
            </kbd>
          </div>

          <button className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-accent/30 bg-accent/5 px-3 h-10 text-xs font-semibold text-accent hover:bg-accent/10 transition">
            <Sparkles className="h-3.5 w-3.5" />
            Ask AI
          </button>

          <Popover>
            <PopoverTrigger asChild>
              <button className="relative grid h-10 w-10 place-items-center rounded-xl border border-border bg-card hover:bg-muted transition" aria-label="Notifications">
                <Bell className="h-4 w-4 text-foreground" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 grid h-4 min-w-4 px-1 place-items-center rounded-full bg-destructive text-[9px] font-bold text-destructive-foreground ring-2 ring-card">
                    {unreadCount}
                  </span>
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 p-0">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <h4 className="font-semibold text-sm text-foreground">Notifications</h4>
                <button onClick={() => setNotifs((n) => n.map((x) => ({ ...x, unread: false })))} className="text-[11px] font-semibold text-accent hover:underline">
                  Mark all as read
                </button>
              </div>
              <div className="max-h-80 overflow-y-auto divide-y divide-border">
                {notifs.map((n) => (
                  <div key={n.id} className="flex items-start gap-3 px-4 py-3 hover:bg-muted/40 transition">
                    <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${n.tone}`}>
                      <n.icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-foreground leading-snug">{n.text}</p>
                      <p className="mt-0.5 text-[10px] text-muted-foreground">{n.time}</p>
                    </div>
                    {n.unread && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />}
                  </div>
                ))}
              </div>
              <Link to="/support" className="block text-center px-4 py-2.5 text-xs font-semibold text-accent border-t border-border hover:bg-muted/40 transition">
                View all
              </Link>
            </PopoverContent>
          </Popover>

          <button className="flex items-center gap-2 rounded-xl border border-border bg-card pl-1 pr-2.5 h-10 hover:bg-muted transition">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-brand text-[11px] font-bold text-white">AD</span>
            <span className="hidden lg:block text-left leading-tight">
              <span className="block text-xs font-semibold text-foreground">Adewale O.</span>
              <span className="block text-[10px] text-muted-foreground">Proprietor</span>
            </span>
            <ChevronDown className="hidden lg:block h-3.5 w-3.5 text-muted-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
}
