import { motion } from "framer-motion";
import {
  Clock,
  Sparkles,
  BookOpen,
  Code,
  FlaskConical,
  Calculator,
} from "lucide-react";

type Props = {
  todayPlan?: {
    title?: string;
    day?: number;
    focus?: string;
    tasks?: string[];
  };

  plans?: any[];
};

const iconMap: Record<string, any> = {
  mathematics: Calculator,
  maths: Calculator,
  physics: FlaskConical,
  chemistry: FlaskConical,
  dsa: Code,
  coding: Code,
  c: Code,
  english: BookOpen,
};

const colorMap: Record<string, string> = {
  mathematics: "from-neon-blue to-neon-cyan",
  maths: "from-neon-blue to-neon-cyan",
  physics: "from-neon-violet to-neon-pink",
  chemistry: "from-neon-violet to-neon-pink",
  dsa: "from-neon-green to-neon-cyan",
  coding: "from-neon-green to-neon-cyan",
  c: "from-neon-green to-neon-cyan",
  english: "from-neon-orange to-neon-pink",
};

function detectSubject(text = "") {
  const lower = text.toLowerCase();

  if (lower.includes("math")) return "mathematics";
  if (lower.includes("physics")) return "physics";
  if (lower.includes("chem")) return "chemistry";
  if (lower.includes("english")) return "english";
  if (
    lower.includes("dsa") ||
    lower.includes("stack") ||
    lower.includes("queue") ||
    lower.includes("tree") ||
    lower.includes("array") ||
    lower.includes("linked")
  )
    return "dsa";

  return "coding";
}

export function StudyPlanCards({
  todayPlan,
  plans = [],
}: Props) {
  const latestPlan = plans?.[0];

  const progress = latestPlan?.progress || 0;
  const completedDays = latestPlan?.completedDays || 0;
  const totalDays = latestPlan?.totalDays || 0;

  const tasks = todayPlan?.tasks || [];

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-neon-violet" />
        <h2 className="text-lg font-semibold text-foreground">
          Today's AI Study Plan
        </h2>
      </div>

      {/* Header Card */}
      <div className="glass p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-sm text-muted-foreground">
              {todayPlan?.title || "No Active Plan"}
            </p>

            {todayPlan?.day && (
              <p className="text-xl font-bold text-foreground">
                Day {todayPlan.day}
              </p>
            )}
          </div>

          <div className="text-right">
            <p className="text-lg font-bold text-neon-green">
              {progress}%
            </p>
            <p className="text-xs text-muted-foreground">
              {completedDays}/{totalDays} done
            </p>
          </div>
        </div>

        <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-neon-blue to-neon-cyan"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Tasks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {tasks.length === 0 && (
          <div className="glass p-4 text-sm text-muted-foreground">
            No tasks for today.
          </div>
        )}

        {tasks.map((task, i) => {
          const subject = detectSubject(
            `${todayPlan?.focus} ${task}`
          );

          const Icon =
            iconMap[subject] || BookOpen;

          const color =
            colorMap[subject] ||
            "from-neon-blue to-neon-cyan";

          return (
            <motion.div
              key={task}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass p-4 hover-glow group relative overflow-hidden"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${color} opacity-[0.03] group-hover:opacity-[0.08] transition-opacity`}
              />

              <div className="relative flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="h-4 w-4 text-muted-foreground" />

                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      {subject}
                    </span>
                  </div>

                  <p className="text-sm font-medium text-foreground">
                    {task}
                  </p>

                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>30 min</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}