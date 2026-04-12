import { motion } from "framer-motion";
import { BookOpen, RotateCcw, CheckCircle2, Clock } from "lucide-react";

const cards = [
  { front: "What is a Binary Search Tree?", back: "A tree where left child < parent < right child", due: "Now", mastery: 60 },
  { front: "Define Normalization (1NF)", back: "Each column contains atomic values, no repeating groups", due: "2h", mastery: 45 },
  { front: "What is a Deadlock?", back: "Two+ processes waiting for each other's resources indefinitely", due: "Tomorrow", mastery: 80 },
  { front: "Explain TCP 3-way handshake", back: "SYN → SYN-ACK → ACK to establish connection", due: "Now", mastery: 30 },
];

const Revision = () => {
  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8 pb-24 md:pb-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-neon-green" /> Revision Mode
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Spaced repetition for long-term memory</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass p-5 hover-glow group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span className="text-[10px]">Due: {card.due}</span>
              </div>
              <div className="text-[10px] font-medium text-neon-cyan">{card.mastery}% mastered</div>
            </div>
            <p className="text-sm font-medium text-foreground mb-2">{card.front}</p>
            <p className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity bg-muted/40 rounded-lg p-2 mt-2">
              {card.back}
            </p>
            <div className="w-full h-1 bg-muted rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-neon-green to-neon-cyan rounded-full" style={{ width: `${card.mastery}%` }} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Revision;
