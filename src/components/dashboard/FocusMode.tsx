import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, Focus } from "lucide-react";
import { useEffect, useRef } from "react";

export function FocusMode() {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(25 * 60);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (isRunning && seconds > 0) {
      intervalRef.current = setInterval(() => setSeconds((s) => s - 1), 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, seconds]);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const progress = ((25 * 60 - seconds) / (25 * 60)) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4 }}
      className="glass p-5 hover-glow text-center"
    >
      <div className="flex items-center justify-center gap-2 mb-4">
        <Focus className="h-4 w-4 text-neon-cyan" />
        <h3 className="text-sm font-semibold text-foreground">Focus Mode</h3>
      </div>

      {/* Circular timer */}
      <div className="relative w-32 h-32 mx-auto mb-4">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(228, 20%, 18%)" strokeWidth="6" />
          <circle
            cx="60" cy="60" r="52" fill="none"
            stroke="url(#timerGradient)" strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 52}`}
            strokeDashoffset={`${2 * Math.PI * 52 * (1 - progress / 100)}`}
            className="transition-all duration-1000"
          />
          <defs>
            <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(225, 90%, 60%)" />
              <stop offset="100%" stopColor="hsl(185, 90%, 55%)" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-foreground tabular-nums">
            {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className="flex justify-center gap-3">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`p-3 rounded-full transition-all ${isRunning ? "bg-neon-orange/20 text-neon-orange" : "bg-primary/20 text-primary"} hover:scale-105`}
        >
          {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>
        <button
          onClick={() => { setIsRunning(false); setSeconds(25 * 60); }}
          className="p-3 rounded-full bg-muted text-muted-foreground hover:scale-105 transition-transform"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}
