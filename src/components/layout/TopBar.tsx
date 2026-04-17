import { Bell, Search, ChevronDown, Sparkles } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

export function TopBar() {
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

          <button className="relative grid h-10 w-10 place-items-center rounded-xl border border-border bg-card hover:bg-muted transition" aria-label="Notifications">
            <Bell className="h-4 w-4 text-foreground" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive ring-2 ring-card" />
          </button>

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
