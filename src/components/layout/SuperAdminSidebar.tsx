import { LayoutDashboard, Building2, UserPlus, CreditCard, Activity, LogOut, Sparkles } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const nav = [
  { title: "Overview", url: "/admin", icon: LayoutDashboard },
  { title: "Schools", url: "/admin/schools", icon: Building2 },
  { title: "Onboard School", url: "/admin/schools/new", icon: UserPlus },
  { title: "Plans & Billing", url: "/admin/billing", icon: CreditCard },
  { title: "Platform Health", url: "/admin/health", icon: Activity },
];

export function SuperAdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const linkBase = "group/nav relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground";
  const linkActive = "!bg-gradient-brand !text-white shadow-md hover:!text-white";

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="px-4 pt-5 pb-3">
        <div className={cn("flex items-center gap-2.5", collapsed && "justify-center")}>
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand shadow-md">
            <Sparkles className="h-4 w-4 text-white" />
          </span>
          {!collapsed && (
            <div className="leading-tight">
              <p className="font-display text-sm font-bold text-foreground">EdPlix</p>
              <p className="text-[10px] uppercase tracking-[0.18em] text-accent font-semibold">Superadmin</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3">
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="px-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Platform
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {nav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="p-0 h-auto hover:bg-transparent">
                    <NavLink to={item.url} end={item.url === "/admin"} className={linkBase} activeClassName={linkActive}>
                      <item.icon className="h-[18px] w-[18px] shrink-0" />
                      {!collapsed && <span className="truncate">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!collapsed && (
          <div className="mt-6 mx-1 rounded-2xl bg-gradient-brand p-4 text-white shadow-md relative overflow-hidden">
            <div className="absolute inset-0 grid-pattern opacity-40" />
            <div className="relative">
              <Sparkles className="h-5 w-5 mb-2" />
              <p className="text-sm font-semibold">Platform Status</p>
              <p className="mt-1 text-xs text-white/75">All systems operational. 99.98% uptime this month.</p>
            </div>
          </div>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3">
        <div className={cn("flex items-center gap-3 rounded-xl p-2", collapsed && "justify-center")}>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-brand text-xs font-bold text-white shadow-sm">SA</span>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">Super Admin</p>
              <p className="text-xs text-muted-foreground truncate">EdPlix Team</p>
            </div>
          )}
          {!collapsed && (
            <button className="rounded-md p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition" aria-label="Sign out">
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
