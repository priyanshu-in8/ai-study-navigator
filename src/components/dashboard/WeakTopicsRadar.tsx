import { motion } from "framer-motion";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { AlertTriangle } from "lucide-react";

const data = [
  { topic: "Calculus", score: 45 },
  { topic: "Optics", score: 60 },
  { topic: "Trees", score: 80 },
  { topic: "Grammar", score: 75 },
  { topic: "Organic", score: 35 },
  { topic: "Algebra", score: 55 },
];

export function WeakTopicsRadar() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.35 }}
      className="glass p-5 hover-glow"
    >
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle className="h-4 w-4 text-neon-orange" />
        <h3 className="text-sm font-semibold text-foreground">Weak Topics</h3>
      </div>
      <p className="text-xs text-muted-foreground mb-3">AI-detected areas to improve</p>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
            <PolarGrid stroke="hsl(228, 20%, 18%)" />
            <PolarAngleAxis dataKey="topic" tick={{ fill: "hsl(220, 15%, 55%)", fontSize: 10 }} />
            <Radar
              dataKey="score"
              stroke="hsl(270, 80%, 60%)"
              fill="hsl(270, 80%, 60%)"
              fillOpacity={0.15}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
