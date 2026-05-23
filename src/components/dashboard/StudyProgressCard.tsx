import { motion } from "framer-motion";
import { Play, Clock } from "lucide-react";

export function StudyProgressCard() {
  const completed = 3.5;
  const goal = 5;
  const progress = (completed / goal) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      className="glass p-5 hover-glow flex flex-col items-center text-center"
    >
      <div className="flex items-center gap-2 mb-4 self-start">
        <Clock className="h-4 w-4 text-neon-cyan" />
        <h3 className="text-sm font-semibold text-foreground">Daily Study Goal</h3>
      </div>

      <div className="relative w-28 h-28 mb-3">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="50" fill="none" stroke="hsl(228, 20%, 18%)" strokeWidth="8" />
          <motion.circle
            cx="60" cy="60" r="50" fill="none"
            stroke="url(#progressGradient)" strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 50}`}
            initial={{ strokeDashoffset: 2 * Math.PI * 50 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 50 * (1 - progress / 100) }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(225, 90%, 60%)" />
              <stop offset="100%" stopColor="hsl(185, 90%, 55%)" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-foreground">{completed}h</span>
          <span className="text-[10px] text-muted-foreground">of {goal}h</span>
        </div>
      </div>

      <p className="text-xs text-muted-foreground mb-3">{Math.round(progress)}% completed today</p>

      <button className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-neon-blue to-neon-cyan text-primary-foreground text-xs font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity active:scale-[0.98]">
        <Play className="h-3.5 w-3.5" />
        Start Focus Mode
      </button>
    </motion.div>
  );
}
