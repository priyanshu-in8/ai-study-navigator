import { motion } from "framer-motion";
import { Calendar, Clock, BookOpen, Code, FlaskConical, Calculator, Sparkles } from "lucide-react";

const schedule = [
  { time: "9:00 AM", subject: "Mathematics", topic: "Calculus - Integration", duration: "1h", icon: Calculator, color: "from-neon-blue to-neon-cyan" },
  { time: "10:00 AM", subject: "DSA", topic: "Binary Trees", duration: "1.5h", icon: Code, color: "from-neon-green to-neon-cyan" },
  { time: "12:00 PM", subject: "Physics", topic: "Electromagnetism", duration: "45min", icon: FlaskConical, color: "from-neon-violet to-neon-pink" },
  { time: "2:00 PM", subject: "DBMS", topic: "Normalization", duration: "1h", icon: BookOpen, color: "from-neon-orange to-neon-pink" },
  { time: "4:00 PM", subject: "Quiz Time", topic: "Mixed revision quiz", duration: "30min", icon: Sparkles, color: "from-neon-pink to-neon-violet" },
];

const Planner = () => {
  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8 pb-24 md:pb-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Calendar className="h-6 w-6 text-neon-blue" /> Study Planner
        </h1>
        <p className="text-sm text-muted-foreground mt-1">AI-generated schedule based on your goals</p>
      </motion.div>

      <div className="glass p-5 rounded-xl mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-4 w-4 text-neon-violet" />
          <h3 className="text-sm font-semibold text-foreground">Today's Schedule</h3>
        </div>
        <div className="space-y-3">
          {schedule.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass p-4 hover-glow flex items-center gap-4 cursor-pointer group"
            >
              <div className="text-xs text-muted-foreground w-16 flex-shrink-0 font-mono">{item.time}</div>
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                <item.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{item.subject}</p>
                <p className="text-xs text-muted-foreground">{item.topic}</p>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span className="text-xs">{item.duration}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Planner;
