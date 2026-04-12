import { motion } from "framer-motion";

const subjects = [
  { name: "Mathematics", mastery: 78, color: "from-neon-blue to-neon-cyan" },
  { name: "Physics", mastery: 65, color: "from-neon-violet to-neon-pink" },
  { name: "DSA", mastery: 88, color: "from-neon-green to-neon-cyan" },
  { name: "English", mastery: 92, color: "from-neon-orange to-neon-pink" },
  { name: "Chemistry", mastery: 55, color: "from-neon-pink to-neon-violet" },
];

export function SubjectMastery() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
      className="glass p-5 hover-glow"
    >
      <h3 className="text-sm font-semibold text-foreground mb-4">Subject Mastery</h3>
      <div className="space-y-3.5">
        {subjects.map((subject, i) => (
          <div key={subject.name}>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-muted-foreground">{subject.name}</span>
              <span className="text-foreground font-medium">{subject.mastery}%</span>
            </div>
            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${subject.mastery}%` }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                className={`h-full bg-gradient-to-r ${subject.color} rounded-full`}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
