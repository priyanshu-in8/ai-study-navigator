import { motion } from "framer-motion";
import { Brain, Sparkles, ArrowRight } from "lucide-react";

type AISuggestionCardProps = {
  dashboard?: any;
};

export function AISuggestionCard({ dashboard }: AISuggestionCardProps) {
  const weakTopic = dashboard?.weakTopics?.[0];
  const topic = weakTopic?.topic || "Graphs";
  const wrongCount = weakTopic?.wrongCount || 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="glass p-4 hover-glow gradient-border overflow-hidden relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 to-neon-violet/5" />
      <div className="relative flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-violet to-neon-blue flex items-center justify-center flex-shrink-0">
          <Brain className="h-5 w-5 text-primary-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <Sparkles className="h-3 w-3 text-neon-violet" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-neon-violet">AI Insight</span>
          </div>
          <p className="text-sm font-medium text-foreground">Focus on {topic} today</p>
          <p className="text-xs text-muted-foreground mt-0.5">Weak topic detected — {wrongCount} incorrect answers in recent quizzes</p>
        </div>
        <button className="flex-shrink-0 p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors hover:scale-105 active:scale-95">
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}
