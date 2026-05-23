import { Home, Brain, BookOpen, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const tabs = [
  { label: "Home", icon: Home, path: "/" },
  { label: "Quiz", icon: Brain, path: "/practice" },
  { label: "Study", icon: BookOpen, path: "/planner" },
  { label: "Profile", icon: User, path: "/profile" },
];

export function MobileNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden glass-strong border-t border-border">
      <div className="flex items-center justify-around py-2 px-2">
        {tabs.map((tab) => {
          const active = location.pathname === tab.path;
          return (
            <button
              key={tab.label}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-lg transition-colors ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <tab.icon className={`h-5 w-5 ${active ? "drop-shadow-[0_0_6px_hsl(225,90%,60%)]" : ""}`} />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
