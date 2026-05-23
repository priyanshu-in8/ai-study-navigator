import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Clock, Sparkles } from "lucide-react";

interface Task {
  id: number;
  subject: string;
  duration: string;
  done: boolean;
}

const initialTasks: Task[] = [
  { id: 1, subject: "DSA — Binary Trees", duration: "1 hr", done: true },
  { id: 2, subject: "DBMS — Normalization", duration: "45 min", done: false },
  { id: 3, subject: "Quiz — Recursion", duration: "20 min", done: false },
  { id: 4, subject: "OS — Process Scheduling", duration: "30 min", done: false },
];

export function StudyTaskList() {
  const [tasks, setTasks] = useState(initialTasks);
  const completed = tasks.filter((t) => t.done).length;
  const progress = (completed / tasks.length) * 100;

  const toggle = (id: number) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.25 }}
      className="glass p-5 hover-glow"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-neon-violet" />
          <h3 className="text-sm font-semibold text-foreground">Today's Plan</h3>
        </div>
        <span className="text-[10px] font-medium text-muted-foreground">
          {completed}/{tasks.length} done
        </span>
      </div>

      <div className="w-full h-1 bg-muted rounded-full overflow-hidden mb-4">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-neon-green to-neon-cyan rounded-full"
        />
      </div>

      <div className="space-y-2">
        {tasks.map((task) => (
          <button
            key={task.id}
            onClick={() => toggle(task.id)}
            className={`w-full flex items-center gap-3 p-2.5 rounded-lg transition-all text-left ${
              task.done ? "opacity-50" : "hover:bg-muted/40"
            }`}
          >
            {task.done ? (
              <CheckCircle2 className="h-4 w-4 text-neon-green flex-shrink-0" />
            ) : (
              <Circle className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            )}
            <span className={`text-xs font-medium text-foreground flex-1 ${task.done ? "line-through" : ""}`}>
              {task.subject}
            </span>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span className="text-[10px]">{task.duration}</span>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
