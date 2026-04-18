import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Library,
  Wallet,
  ClipboardList,
  FileText,
  CalendarCheck,
  Settings,
  LogOut,
  Sparkles,
  LifeBuoy,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";

const mainNav = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Students", url: "/students", icon: Users },
  { title: "Staff", url: "/staff", icon: GraduationCap },
  { title: "Classes", url: "/classes", icon: Library },
  { title: "Subjects", url: "/subjects", icon: BookOpen },
];

const academicNav = [
  { title: "Fees", url: "/fees", icon: Wallet },
  { title: "Results", url: "/results", icon: ClipboardList },
  { title: "Report Cards", url: "/report-cards", icon: FileText },
  { title: "Attendance", url: "/attendance", icon: CalendarCheck },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const linkBase =
    "group/nav relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground";
  const linkActive =
    "!bg-gradient-brand !text-white shadow-md-soft hover:!text-white";

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="px-4 pt-5 pb-3">
        <div className={cn("flex items-center", collapsed ? "justify-center" : "")}>
          {collapsed ? (
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand shadow-md-soft">
              <span className="font-display text-sm font-bold text-white">E</span>
            </span>
          ) : (
            <Logo size="md" />
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3">
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="px-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Workspace
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="p-0 h-auto hover:bg-transparent">
                    <NavLink to={item.url} className={linkBase} activeClassName={linkActive}>
                      <item.icon className="h-[18px] w-[18px] shrink-0" />
                      {!collapsed && <span className="truncate">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-2">
          {!collapsed && (
            <SidebarGroupLabel className="px-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Academic
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {academicNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="p-0 h-auto hover:bg-transparent">
                    <NavLink to={item.url} className={linkBase} activeClassName={linkActive}>
                      <item.icon className="h-[18px] w-[18px] shrink-0" />
                      {!collapsed && <span className="truncate">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-2">
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="p-0 h-auto hover:bg-transparent">
                  <NavLink to="/support" className={linkBase} activeClassName={linkActive}>
                    <LifeBuoy className="h-[18px] w-[18px] shrink-0" />
                    {!collapsed && <span>Support</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="p-0 h-auto hover:bg-transparent">
                  <NavLink to="/settings" className={linkBase} activeClassName={linkActive}>
                    <Settings className="h-[18px] w-[18px] shrink-0" />
                    {!collapsed && <span>Settings</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!collapsed && (
          <div className="mt-6 mx-1 rounded-2xl bg-gradient-brand p-4 text-white shadow-md-soft relative overflow-hidden">
            <div className="absolute inset-0 grid-pattern opacity-40" />
            <div className="relative">
              <Sparkles className="h-5 w-5 mb-2" />
              <p className="text-sm font-semibold leading-snug">Upgrade to Pro</p>
              <p className="mt-1 text-xs text-white/75 leading-relaxed">Unlock unlimited results, WhatsApp delivery and more.</p>
              <button className="mt-3 w-full rounded-lg bg-white/15 hover:bg-white/25 backdrop-blur px-3 py-1.5 text-xs font-semibold transition">Learn more</button>
            </div>
          </div>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3">
        <div className={cn("flex items-center gap-3 rounded-xl p-2", collapsed && "justify-center")}>
          <div className="relative">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-brand text-xs font-bold text-white shadow-sm-soft">AD</span>
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-sidebar" />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">Mr. Adewale</p>
              <p className="text-xs text-muted-foreground truncate">Proprietor</p>
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
