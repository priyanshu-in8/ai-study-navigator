import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  BookOpen,
  Code,
  FlaskConical,
  Calculator,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

import { studyPlanApi } from "@/services/api";

type TodayPlan = {
  title: string;
  day: number;
  focus: string;
  tasks: string[];
  planId?: string;
};

const iconMap: Record<string, any> = {
  maths: Calculator,
  mathematics: Calculator,
  physics: FlaskConical,
  chemistry: FlaskConical,
  dsa: Code,
  coding: Code,
  c: Code,
  dbms: BookOpen,
  os: BookOpen,
};

function detectSubject(text = "") {
  const lower = text.toLowerCase();

  if (lower.includes("math")) return "maths";
  if (lower.includes("physics")) return "physics";
  if (lower.includes("chem")) return "chemistry";
  if (lower.includes("dbms")) return "dbms";
  if (lower.includes("os")) return "os";

  if (
    lower.includes("array") ||
    lower.includes("stack") ||
    lower.includes("queue") ||
    lower.includes("tree") ||
    lower.includes("linked") ||
    lower.includes("graph") ||
    lower.includes("dsa")
  ) {
    return "dsa";
  }

  return "coding";
}

const Planner = () => {
  const [todayPlan, setTodayPlan] =
    useState<TodayPlan | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [completed, setCompleted] =
    useState(false);

  useEffect(() => {
    fetchTodayPlan();
  }, []);

  const fetchTodayPlan = async () => {
    try {
      const res =
        await studyPlanApi.getTodayPlan();

      setTodayPlan(res?.data || null);
    } catch (error) {
      console.error(
        "Plan fetch failed:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const completeDay = async () => {
    try {
      if (
        !todayPlan?.planId ||
        !todayPlan?.day
      )
        return;

      await studyPlanApi.completeDay(
        todayPlan.planId,
        todayPlan.day
      );

      setCompleted(true);
    } catch (error) {
      console.error(error);
    }
  };

  const schedule =
    todayPlan?.tasks?.map(
      (task, index) => {
        const subject =
          detectSubject(
            `${todayPlan.focus} ${task}`
          );

        const Icon =
          iconMap[subject] ||
          BookOpen;

        return {
          time: `${9 + index}:00 ${
            index < 3
              ? "AM"
              : "PM"
          }`,
          subject:
            subject.toUpperCase(),
          topic: task,
          duration:
            task.length > 70
              ? "45 min"
              : "30 min",
          icon: Icon,
        };
      }
    ) || [];

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8 pb-24 md:pb-8">
      {/* Header */}
      <motion.div
        initial={{
          opacity: 0,
          y: -10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Calendar className="h-6 w-6 text-neon-blue" />
          Study Planner
        </h1>

        <p className="text-sm text-muted-foreground mt-1">
          AI generated daily roadmap
        </p>
      </motion.div>

      {/* Card */}
      <div className="glass p-5 rounded-xl mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-4 w-4 text-neon-violet" />

          <h3 className="text-sm font-semibold text-foreground">
            {todayPlan?.title ||
              "Today's Schedule"}
          </h3>
        </div>

        {todayPlan && (
          <p className="text-xs text-muted-foreground mb-4">
            Day {todayPlan.day} •{" "}
            {todayPlan.focus}
          </p>
        )}

        {loading && (
          <p className="text-sm text-muted-foreground">
            Loading...
          </p>
        )}

        {!loading &&
          schedule.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No tasks found
            </p>
          )}

        <div className="space-y-3">
          {schedule.map(
            (item, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  x: -15,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay:
                    i * 0.08,
                }}
                className="glass p-4 hover-glow flex items-center gap-4"
              >
                <div className="text-xs text-muted-foreground w-16 font-mono">
                  {item.time}
                </div>

                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-blue to-neon-cyan flex items-center justify-center">
                  <item.icon className="h-5 w-5 text-primary-foreground" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {item.subject}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {item.topic}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span className="text-xs">
                    {item.duration}
                  </span>
                </div>
              </motion.div>
            )
          )}
        </div>

        {/* Complete Button */}
        {todayPlan && (
          <button
            onClick={completeDay}
            disabled={completed}
            className="w-full mt-5 py-3 rounded-xl bg-gradient-to-r from-neon-green to-neon-cyan text-black font-semibold"
          >
            {completed ? (
              <span className="flex items-center justify-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                Completed
              </span>
            ) : (
              "Mark Day Complete"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Planner;