import { motion } from "framer-motion";
import {
  TrendingUp,
  RotateCcw,
  Eye,
  Zap,
} from "lucide-react";

type Props = {
  dashboard: any;
};

export function QuizPerformanceCard({
  dashboard,
}: Props) {
  const quiz =
    dashboard?.recentQuiz || {};

  const score = quiz.score || 0;
  const total = quiz.total || 10;

  const percent = Math.round(
    (score / total) * 100
  );

  const topic =
    quiz.topic || "No Quiz Yet";

  const subject =
    quiz.subject || "Practice";

  const improvement =
    quiz.improvement || 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.35 }}
      className="glass p-5 hover-glow"
    >
      <div className="flex items-center gap-2 mb-4">
        <Zap className="h-4 w-4 text-neon-orange" />
        <h3 className="text-sm font-semibold text-foreground">
          Last Quiz
        </h3>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-3xl font-bold text-foreground">
            {score}
            <span className="text-lg text-muted-foreground">
              /{total}
            </span>
          </p>

          <p className="text-[10px] text-muted-foreground mt-0.5">
            {topic} — {subject}
          </p>
        </div>

        <div className="text-right">
          <div className="flex items-center gap-1 text-neon-green text-sm font-semibold">
            <TrendingUp className="h-3.5 w-3.5" />
            {percent}%
          </div>

          <p className="text-[10px] text-muted-foreground">
            Accuracy ↑{improvement}%
          </p>
        </div>
      </div>

      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mb-4">
        <motion.div
          initial={{ width: 0 }}
          animate={{
            width: `${percent}%`,
          }}
          transition={{
            delay: 0.5,
            duration: 0.8,
            ease: "easeOut",
          }}
          className="h-full bg-gradient-to-r from-neon-green to-neon-cyan rounded-full"
        />
      </div>

      <div className="flex gap-2">
        <button className="flex-1 py-2 px-3 rounded-lg bg-primary/10 text-primary text-xs font-medium flex items-center justify-center gap-1.5 hover:bg-primary/20 transition-colors">
          <RotateCcw className="h-3 w-3" />
          Retry
        </button>

        <button className="flex-1 py-2 px-3 rounded-lg bg-muted text-muted-foreground text-xs font-medium flex items-center justify-center gap-1.5 hover:bg-muted/80 transition-colors">
          <Eye className="h-3 w-3" />
          History
        </button>
      </div>
    </motion.div>
  );
}