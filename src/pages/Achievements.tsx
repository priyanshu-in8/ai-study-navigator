import { motion } from "framer-motion";
import { Trophy, Medal, Star, Lock } from "lucide-react";

const badges = [
  { name: "First Login", desc: "Welcome aboard!", icon: Star, earned: true, color: "from-neon-blue to-neon-cyan" },
  { name: "7-Day Streak", desc: "Study 7 days in a row", icon: Trophy, earned: true, color: "from-neon-orange to-neon-pink" },
  { name: "Quiz Master", desc: "Score 100% on 5 quizzes", icon: Medal, earned: false, color: "from-neon-violet to-neon-blue" },
  { name: "Night Owl", desc: "Study past midnight", icon: Star, earned: true, color: "from-neon-green to-neon-cyan" },
  { name: "Speed Solver", desc: "Complete a quiz under 2 min", icon: Trophy, earned: false, color: "from-neon-pink to-neon-violet" },
  { name: "Knowledge Guru", desc: "Master all subjects", icon: Medal, earned: false, color: "from-neon-cyan to-neon-blue" },
];

const Achievements = () => {
  const earned = badges.filter((b) => b.earned).length;

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8 pb-24 md:pb-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Trophy className="h-6 w-6 text-neon-orange" /> Achievements
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {earned}/{badges.length} badges earned
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {badges.map((badge, i) => (
          <motion.div
            key={badge.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.06 }}
            className={`glass p-5 hover-glow relative ${!badge.earned ? "opacity-40" : ""}`}
          >
            {!badge.earned && (
              <Lock className="absolute top-3 right-3 h-4 w-4 text-muted-foreground" />
            )}
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${badge.color} flex items-center justify-center mb-3`}>
              <badge.icon className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">{badge.name}</h3>
            <p className="text-xs text-muted-foreground mt-1">{badge.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
