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
  LogOut,
  Flame,
  Crown,
} from "lucide-react";

import { NavLink } from "@/components/NavLink";
import { useAuth } from "@/contexts/AuthContext";

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

/* =========================================
   MENU ITEMS
========================================= */
const mainItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Study Planner",
    url: "/planner",
    icon: Calendar,
  },
  {
    title: "Practice Zone",
    url: "/practice",
    icon: Brain,
  },
  {
    title: "AI Tutor",
    url: "/tutor",
    icon: MessageCircle,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Revision",
    url: "/revision",
    icon: BookOpen,
  },
];

const secondaryItems = [
  {
    title: "Wellness",
    url: "/wellness",
    icon: Heart,
  },
  {
    title: "Achievements",
    url: "/achievements",
    icon: Trophy,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

/* =========================================
   RANK TITLES
========================================= */
const getRankTitle = (
  level: number
) => {
  if (level <= 1)
    return "Beginner";
  if (level === 2)
    return "Learner";
  if (level === 3)
    return "Scholar";
  if (level === 4)
    return "Expert";
  if (level === 5)
    return "Master";
  if (level <= 8)
    return "Champion";

  return "Legend";
};

export function AppSidebar() {
  const { state } =
    useSidebar();

  const collapsed =
    state ===
    "collapsed";

  const {
    signOut,
    user,
  } = useAuth();

  /* =====================================
     LIVE USER DATA
  ===================================== */
  const level =
    user?.level || 1;

  const xpPoints =
    user?.xpPoints || 0;

  const streak =
    user?.streakDays || 0;

  /* =====================================
     LEVEL PROGRESS
  ===================================== */
  const currentLevelXP =
    level === 1
      ? 0
      : (level - 1) *
        250;

  const nextLevelXP =
    level * 250;

  const earnedXP =
    xpPoints -
    currentLevelXP;

  const neededXP =
    nextLevelXP -
    currentLevelXP;

  const progress =
    Math.min(
      (earnedXP /
        neededXP) *
        100,
      100
    );

  const rankTitle =
    getRankTitle(
      level
    );

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-border bg-sidebar"
    >
      <SidebarContent className="pt-4 flex flex-col h-full">
        {/* =============================
            LOGO
        ============================== */}
        <div
          className={`flex items-center gap-2 px-4 pb-6 ${
            collapsed
              ? "justify-center"
              : ""
          }`}
        >
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-neon-blue to-neon-violet flex items-center justify-center shrink-0 shadow-lg">
            <Sparkles className="h-4 w-4 text-white" />
          </div>

          {!collapsed && (
            <span className="font-bold text-lg gradient-text">
              StudyBuddy
            </span>
          )}
        </div>

        {/* =============================
            MAIN MENU
        ============================== */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map(
                (
                  item
                ) => (
                  <SidebarMenuItem
                    key={
                      item.title
                    }
                  >
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={
                          item.url
                        }
                        end={
                          item.url ===
                          "/"
                        }
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:bg-muted/50 hover:text-foreground transition"
                        activeClassName="bg-primary/10 text-primary"
                      >
                        <item.icon className="h-4 w-4 shrink-0" />

                        {!collapsed && (
                          <span className="text-sm font-medium">
                            {
                              item.title
                            }
                          </span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="my-4 mx-4 h-px bg-border" />

        {/* =============================
            SECONDARY MENU
        ============================== */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryItems.map(
                (
                  item
                ) => (
                  <SidebarMenuItem
                    key={
                      item.title
                    }
                  >
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={
                          item.url
                        }
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:bg-muted/50 hover:text-foreground transition"
                        activeClassName="bg-primary/10 text-primary"
                      >
                        <item.icon className="h-4 w-4 shrink-0" />

                        {!collapsed && (
                          <span className="text-sm font-medium">
                            {
                              item.title
                            }
                          </span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* =============================
            BOTTOM AREA
        ============================== */}
        <div className="mt-auto px-3 pb-4">
          {/* LEVEL CARD */}
          {!collapsed && (
            <div className="mb-3 p-4 glass rounded-2xl border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Crown className="h-4 w-4 text-yellow-400" />

                  <span className="text-xs font-semibold text-foreground">
                    Level {level}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[10px] text-orange-400">
                  <Flame className="h-3 w-3" />
                  {streak}
                </div>
              </div>

              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-neon-blue to-neon-violet rounded-full transition-all duration-500"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>

              <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
                <span>
                  {earnedXP} /{" "}
                  {neededXP} XP
                </span>

                <span>
                  {Math.round(
                    progress
                  )}
                  %
                </span>
              </div>

              <p className="text-[10px] text-neon-violet font-medium mt-1">
                {rankTitle}
              </p>
            </div>
          )}

          {/* LOGOUT */}
          <button
            onClick={
              signOut
            }
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
          >
            <LogOut className="h-4 w-4 shrink-0" />

            {!collapsed && (
              <span className="text-sm font-medium">
                Logout
              </span>
            )}
          </button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}