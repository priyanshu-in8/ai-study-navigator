import {
  LayoutDashboard,
  BookOpen,
  MessageCircle,
  BarChart3,
  Calendar,
  Brain,
  Heart,
  Trophy,
  Settings,
  Sparkles,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Study Planner", url: "/planner", icon: Calendar },
  { title: "Practice Zone", url: "/practice", icon: Brain },
  { title: "AI Tutor", url: "/tutor", icon: MessageCircle },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Revision", url: "/revision", icon: BookOpen },
];

const secondaryItems = [
  { title: "Wellness", url: "/wellness", icon: Heart },
  { title: "Achievements", url: "/achievements", icon: Trophy },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r border-border bg-sidebar">
      <SidebarContent className="pt-4">
        {/* Logo */}
        <div className={`flex items-center gap-2 px-4 pb-6 ${collapsed ? "justify-center" : ""}`}>
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-neon-blue to-neon-violet flex items-center justify-center flex-shrink-0">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="font-bold text-lg gradient-text">StudyBuddy</span>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground transition-all duration-200 hover:bg-muted/50 hover:text-foreground"
                      activeClassName="bg-primary/10 text-primary glow-blue"
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!collapsed && <span className="text-sm font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="my-4 mx-4 h-px bg-border" />

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground transition-all duration-200 hover:bg-muted/50 hover:text-foreground"
                      activeClassName="bg-primary/10 text-primary"
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!collapsed && <span className="text-sm font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* XP Card */}
        {!collapsed && (
          <div className="mt-auto mx-3 mb-4 p-4 glass rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="h-4 w-4 text-neon-orange" />
              <span className="text-xs font-semibold text-foreground">Level 12</span>
            </div>
            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-gradient-to-r from-neon-blue to-neon-violet rounded-full" />
            </div>
            <p className="text-[10px] text-muted-foreground mt-1.5">2,450 / 3,000 XP</p>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
