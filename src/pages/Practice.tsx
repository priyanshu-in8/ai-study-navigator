import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, CheckCircle2, XCircle, RotateCcw, Sparkles, BookOpen, Code } from "lucide-react";

const questions = [
  {
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    correct: 1,
  },
  {
    question: "Which data structure uses FIFO?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    correct: 1,
  },
  {
    question: "What is normalization in DBMS?",
    options: ["Adding redundancy", "Removing redundancy", "Creating indexes", "Joining tables"],
    correct: 1,
  },
];

const Practice = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [tab, setTab] = useState<"mcq" | "flashcards" | "coding">("mcq");

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === questions[currentQ].correct) setScore((s) => s + 1);
  };

  const next = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((q) => q + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  const reset = () => {
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  const tabs = [
    { id: "mcq" as const, label: "MCQs", icon: Brain },
    { id: "flashcards" as const, label: "Flashcards", icon: BookOpen },
    { id: "coding" as const, label: "Coding", icon: Code },
  ];

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8 pb-24 md:pb-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Brain className="h-6 w-6 text-neon-violet" /> Practice Zone
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Sharpen your skills with AI-powered practice</p>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
              tab === t.id ? "bg-primary/20 text-primary" : "glass text-muted-foreground hover:text-foreground"
            }`}
          >
            <t.icon className="h-3.5 w-3.5" />
            {t.label}
          </button>
        ))}
      </div>

      {tab === "mcq" && (
        <div className="glass p-6 rounded-xl max-w-2xl">
          {!finished ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-muted-foreground">
                  Question {currentQ + 1} of {questions.length}
                </span>
                <span className="text-xs font-medium text-neon-green">Score: {score}</span>
              </div>
              <div className="w-full h-1 bg-muted rounded-full mb-6">
                <div
                  className="h-full bg-gradient-to-r from-neon-blue to-neon-violet rounded-full transition-all"
                  style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
                />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-4">{questions[currentQ].question}</h3>
              <div className="space-y-2 mb-6">
                {questions[currentQ].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    className={`w-full text-left p-3 rounded-lg text-sm transition-all ${
                      selected === null
                        ? "bg-muted/40 hover:bg-muted/60 text-foreground"
                        : i === questions[currentQ].correct
                        ? "bg-neon-green/20 text-neon-green border border-neon-green/30"
                        : selected === i
                        ? "bg-destructive/20 text-destructive border border-destructive/30"
                        : "bg-muted/20 text-muted-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {selected !== null && i === questions[currentQ].correct && <CheckCircle2 className="h-4 w-4" />}
                      {selected !== null && selected === i && i !== questions[currentQ].correct && <XCircle className="h-4 w-4" />}
                      {opt}
                    </div>
                  </button>
                ))}
              </div>
              {selected !== null && (
                <button onClick={next} className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium">
                  {currentQ < questions.length - 1 ? "Next Question" : "Finish Quiz"}
                </button>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <Sparkles className="h-12 w-12 text-neon-violet mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Quiz Complete!</h3>
              <p className="text-3xl font-bold gradient-text mb-2">
                {score}/{questions.length}
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                {score === questions.length ? "Perfect score! 🎉" : "Keep practicing! 💪"}
              </p>
              <button onClick={reset} className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2 mx-auto">
                <RotateCcw className="h-4 w-4" /> Retry Quiz
              </button>
            </div>
          )}
        </div>
      )}

      {tab === "flashcards" && (
        <div className="glass p-8 rounded-xl max-w-2xl text-center">
          <BookOpen className="h-12 w-12 text-neon-blue mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Flashcards Coming Soon</h3>
          <p className="text-sm text-muted-foreground">AI-generated flashcards based on your weak areas</p>
        </div>
      )}

      {tab === "coding" && (
        <div className="glass p-8 rounded-xl max-w-2xl text-center">
          <Code className="h-12 w-12 text-neon-green mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Coding Challenges Coming Soon</h3>
          <p className="text-sm text-muted-foreground">Practice DSA problems with AI hints</p>
        </div>
      )}
    </div>
  );
};

export default Practice;
