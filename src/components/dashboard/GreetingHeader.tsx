import { motion } from "framer-motion";
import { Flame, Bell, Search } from "lucide-react";

type GreetingHeaderProps = {
  dashboard?: any;
  loading?: boolean;
};

export function GreetingHeader({ dashboard, loading }: GreetingHeaderProps) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const userName = dashboard?.name || "Priyanshu";
  const streakDays = dashboard?.streakDays || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          {greeting}, {loading ? "..." : userName} 👋
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Ready to crush your goals today? You're on a <Flame className="inline h-4 w-4 text-neon-orange" /> {streakDays}-day streak!
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="glass flex items-center gap-2 px-3 py-2 hover-glow cursor-pointer">
          <Search className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground hidden sm:inline">Search...</span>
          <kbd className="hidden sm:inline text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">⌘K</kbd>
        </div>
        <button className="glass p-2.5 hover-glow relative">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-neon-blue rounded-full" />
        </button>
      </div>
    </motion.div>
  );
}
