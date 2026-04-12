import { motion } from "framer-motion";
import { Flame, Target, Clock, Zap } from "lucide-react";

const stats = [
  { label: "Study Streak", value: "7 days", icon: Flame, color: "text-neon-orange", bg: "bg-neon-orange/10" },
  { label: "XP Earned", value: "2,450", icon: Zap, color: "text-neon-blue", bg: "bg-neon-blue/10" },
  { label: "Hours Today", value: "3.5h", icon: Clock, color: "text-neon-cyan", bg: "bg-neon-cyan/10" },
  { label: "Accuracy", value: "84%", icon: Target, color: "text-neon-green", bg: "bg-neon-green/10" },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="glass p-4 hover-glow"
        >
          <div className={`${stat.bg} w-8 h-8 rounded-lg flex items-center justify-center mb-2`}>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </div>
          <p className="text-xl font-bold text-foreground">{stat.value}</p>
          <p className="text-[11px] text-muted-foreground">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
