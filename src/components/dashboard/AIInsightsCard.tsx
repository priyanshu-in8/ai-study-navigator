import { motion } from "framer-motion";
import {
  AlertTriangle,
  Sparkles,
} from "lucide-react";

type Props = {
  dashboard: any;
};

export function AIInsightsCard({
  dashboard,
}: Props) {
  const weakTopics =
    dashboard?.weakTopics?.map(
      (item: any) => ({
        name: item.topic,
        accuracy: `${Math.max(
          100 -
            item.wrongCount *
              15,
          10
        )}%`,
        trend:
          item.wrongCount > 2
            ? "↓"
            : "↑",
      })
    ) || [];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4 }}
      className="glass p-5 hover-glow"
    >
      <div className="flex items-center gap-2 mb-1">
        <Sparkles className="h-4 w-4 text-neon-violet" />

        <h3 className="text-sm font-semibold text-foreground">
          AI Insights
        </h3>
      </div>

      <p className="text-xs text-muted-foreground mb-4">
        Topics that need attention
      </p>

      <div className="space-y-2 mb-4">
        {weakTopics.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Great job! No weak topics.
          </p>
        ) : (
          weakTopics
            .slice(0, 3)
            .map(
              (
                topic: any,
                i: number
              ) => (
                <motion.div
                  key={topic.name}
                  initial={{
                    opacity: 0,
                    x: -10,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay:
                      0.5 +
                      i * 0.08,
                  }}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-muted/40"
                >
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-3 w-3 text-neon-orange" />

                    <span className="text-xs font-medium text-foreground">
                      {topic.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-muted-foreground">
                      {topic.accuracy}
                    </span>

                    <span
                      className={`text-[10px] ${
                        topic.trend === "↑"
                          ? "text-neon-green"
                          : "text-destructive"
                      }`}
                    >
                      {topic.trend}
                    </span>
                  </div>
                </motion.div>
              )
            )
        )}
      </div>

      <button className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-neon-violet to-neon-blue text-primary-foreground text-xs font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity active:scale-[0.98]">
        <Sparkles className="h-3.5 w-3.5" />
        Generate Quiz on Weak Topics
      </button>
    </motion.div>
  );
}