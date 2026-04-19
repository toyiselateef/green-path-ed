import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SuperAdminSidebar } from "./SuperAdminSidebar";
import { Bell, Search } from "lucide-react";

export function SuperAdminLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background bg-mesh">
        <SuperAdminSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-30 h-16 flex items-center gap-3 px-4 sm:px-6 lg:px-8 border-b border-border bg-card/70 backdrop-blur-xl">
            <SidebarTrigger className="rounded-lg" />
            <div className="hidden md:flex flex-1 max-w-md relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input placeholder="Search schools, plans, admins…" className="h-9 w-full rounded-xl border border-input bg-background pl-9 pr-3 text-sm focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/15 transition" />
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" /> Live
              </span>
              <button className="relative grid h-9 w-9 place-items-center rounded-xl border border-input bg-card hover:bg-muted transition" aria-label="Notifications">
                <Bell className="h-4 w-4 text-foreground" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent ring-2 ring-card" />
              </button>
            </div>
          </header>
          <main className="flex-1 px-4 sm:px-6 lg:px-10 py-6 lg:py-8 animate-fade-in">
            <div className="mx-auto w-full max-w-[1400px]">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
