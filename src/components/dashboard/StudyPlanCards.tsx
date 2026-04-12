import { motion } from "framer-motion";
import { Clock, Sparkles, BookOpen, Code, FlaskConical, Calculator } from "lucide-react";

const plans = [
  { subject: "Mathematics", topic: "Calculus - Integration", time: "45 min", icon: Calculator, color: "from-neon-blue to-neon-cyan", done: false },
  { subject: "Physics", topic: "Electromagnetic Waves", time: "30 min", icon: FlaskConical, color: "from-neon-violet to-neon-pink", done: false },
  { subject: "DSA", topic: "Binary Trees - Traversal", time: "60 min", icon: Code, color: "from-neon-green to-neon-cyan", done: true },
  { subject: "English", topic: "Essay Writing Practice", time: "25 min", icon: BookOpen, color: "from-neon-orange to-neon-pink", done: false },
];

export function StudyPlanCards() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-neon-violet" />
        <h2 className="text-lg font-semibold text-foreground">Today's AI Study Plan</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.subject}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`glass p-4 hover-glow cursor-pointer group relative overflow-hidden ${plan.done ? "opacity-60" : ""}`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-[0.03] group-hover:opacity-[0.08] transition-opacity`} />
            <div className="relative flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <plan.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{plan.subject}</span>
                </div>
                <p className={`text-sm font-medium text-foreground ${plan.done ? "line-through" : ""}`}>{plan.topic}</p>
                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{plan.time}</span>
                </div>
              </div>
              {plan.done && (
                <div className="h-6 w-6 rounded-full bg-neon-green/20 flex items-center justify-center">
                  <span className="text-neon-green text-xs">✓</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
