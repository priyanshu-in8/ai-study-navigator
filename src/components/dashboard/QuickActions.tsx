import { motion } from "framer-motion";
import { MessageCircle, Brain, BookOpen, Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";

const actions = [
  { label: "Ask AI Tutor", icon: MessageCircle, color: "from-neon-blue to-neon-cyan", path: "/tutor" },
  { label: "Practice MCQs", icon: Brain, color: "from-neon-violet to-neon-pink", path: "/practice" },
  { label: "Quick Revision", icon: BookOpen, color: "from-neon-green to-neon-cyan", path: "/revision" },
  { label: "Voice Doubt", icon: Mic, color: "from-neon-orange to-neon-pink", path: "/tutor" },
];

export function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {actions.map((action, i) => (
        <motion.button
          key={action.label}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 + i * 0.08 }}
          onClick={() => navigate(action.path)}
          className="glass p-4 hover-glow group flex flex-col items-center gap-2 text-center"
        >
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
            <action.icon className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">{action.label}</span>
        </motion.button>
      ))}
    </div>
  );
}
