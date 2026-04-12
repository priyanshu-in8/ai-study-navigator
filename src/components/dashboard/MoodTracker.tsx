import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Music, Coffee, Sparkles } from "lucide-react";

const moods = [
  { emoji: "😊", label: "Great", suggestion: "You're in the zone! Let's tackle that hard topic." },
  { emoji: "😐", label: "Okay", suggestion: "How about a quick revision to warm up?" },
  { emoji: "😔", label: "Low", suggestion: "Take a 5-min break. Here's some calming music 🎵" },
];

export function MoodTracker() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
      className="glass p-5 hover-glow"
    >
      <div className="flex items-center gap-2 mb-3">
        <Heart className="h-4 w-4 text-neon-pink" />
        <h3 className="text-sm font-semibold text-foreground">How are you feeling?</h3>
      </div>
      <div className="flex justify-center gap-4 mb-3">
        {moods.map((mood, i) => (
          <button
            key={mood.label}
            onClick={() => setSelected(i)}
            className={`text-3xl transition-all duration-200 hover:scale-125 ${selected === i ? "scale-125 drop-shadow-lg" : "opacity-60 hover:opacity-100"}`}
          >
            {mood.emoji}
          </button>
        ))}
      </div>
      {selected !== null && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="text-xs text-muted-foreground bg-muted/50 rounded-lg p-3 flex items-start gap-2"
        >
          <Sparkles className="h-3.5 w-3.5 text-neon-violet mt-0.5 flex-shrink-0" />
          <span>{moods[selected].suggestion}</span>
        </motion.div>
      )}

      <div className="mt-3 pt-3 border-t border-border">
        <p className="text-[10px] text-muted-foreground italic text-center">
          "The secret of getting ahead is getting started." — Mark Twain
        </p>
      </div>
    </motion.div>
  );
}
