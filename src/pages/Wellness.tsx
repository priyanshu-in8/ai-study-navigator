import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Music, Coffee, Sparkles, Sun } from "lucide-react";

const moods = [
  { emoji: "😊", label: "Great" },
  { emoji: "🙂", label: "Good" },
  { emoji: "😐", label: "Okay" },
  { emoji: "😔", label: "Low" },
  { emoji: "😢", label: "Stressed" },
];

const suggestions: Record<string, { icon: typeof Music; text: string; color: string }[]> = {
  "Great": [
    { icon: Sparkles, text: "You're on fire! Tackle a hard topic now.", color: "text-neon-green" },
  ],
  "Good": [
    { icon: Sun, text: "Good vibes! Keep the momentum going.", color: "text-neon-cyan" },
  ],
  "Okay": [
    { icon: Coffee, text: "Take a short break, then start with something easy.", color: "text-neon-orange" },
  ],
  "Low": [
    { icon: Music, text: "Listen to some calming music for 5 minutes.", color: "text-neon-blue" },
    { icon: Heart, text: "It's okay to take it slow. You're doing great.", color: "text-neon-pink" },
  ],
  "Stressed": [
    { icon: Heart, text: "Take a 10-minute break. Your health comes first.", color: "text-neon-pink" },
    { icon: Music, text: "Try a guided breathing exercise.", color: "text-neon-violet" },
  ],
};

const quotes = [
  "\"The only way to do great work is to love what you do.\" — Steve Jobs",
  "\"Education is the most powerful weapon.\" — Nelson Mandela",
  "\"It does not matter how slowly you go as long as you do not stop.\" — Confucius",
];

const Wellness = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8 pb-24 md:pb-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Heart className="h-6 w-6 text-neon-pink" /> Mental Wellness
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Take care of your mind — you matter 💜</p>
      </motion.div>

      {/* Mood selector */}
      <div className="glass p-6 rounded-xl mb-6 max-w-lg">
        <h3 className="text-sm font-semibold text-foreground mb-4">How are you feeling right now?</h3>
        <div className="flex justify-center gap-4 mb-4">
          {moods.map((mood) => (
            <button
              key={mood.label}
              onClick={() => setSelected(mood.label)}
              className={`flex flex-col items-center gap-1 transition-all ${
                selected === mood.label ? "scale-125" : "opacity-50 hover:opacity-100 hover:scale-110"
              }`}
            >
              <span className="text-3xl">{mood.emoji}</span>
              <span className="text-[10px] text-muted-foreground">{mood.label}</span>
            </button>
          ))}
        </div>

        {selected && suggestions[selected] && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-2 mt-4">
            {suggestions[selected].map((s, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-muted/40 rounded-lg">
                <s.icon className={`h-4 w-4 ${s.color} flex-shrink-0`} />
                <span className="text-xs text-foreground">{s.text}</span>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Daily Quote */}
      <div className="glass p-6 rounded-xl max-w-lg">
        <h3 className="text-sm font-semibold text-foreground mb-3">💡 Daily Inspiration</h3>
        <p className="text-sm text-muted-foreground italic">{quotes[Math.floor(Math.random() * quotes.length)]}</p>
      </div>
    </div>
  );
};

export default Wellness;
