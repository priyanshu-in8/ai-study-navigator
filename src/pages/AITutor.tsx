import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Send, Sparkles, Mic, Image, ToggleLeft, ToggleRight } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "ai";
  text: string;
}

const initialMessages: Message[] = [
  { role: "ai", text: "Hey! 👋 I'm your AI Study Buddy. Ask me anything about your subjects — I'll explain it clearly!\n\nTry asking:\n- *Explain binary search*\n- *What is normalization in DBMS?*\n- *Solve: ∫x²dx*" },
];

const AITutor = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [eli5, setEli5] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const response = eli5
        ? `Imagine you have a toy box 🧸. ${userMsg.toLowerCase().includes("binary") ? "Binary search is like finding a toy by always looking in the middle of the box and throwing away half!" : "That's like a simple game where you follow easy rules!"}`
        : `Great question! Here's what you need to know about **${userMsg}**:\n\n1. This is a fundamental concept in computer science\n2. Understanding it deeply will help with related topics\n3. Practice with examples to build intuition\n\n*Would you like me to provide some practice problems?*`;
      setMessages((prev) => [...prev, { role: "ai", text: response }]);
      setTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col pb-16 md:pb-0">
      {/* Header */}
      <div className="border-b border-border p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-blue to-neon-violet flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">AI Tutor</h1>
            <p className="text-[10px] text-neon-green">Online • Ready to help</p>
          </div>
        </div>
        <button
          onClick={() => setEli5(!eli5)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            eli5 ? "bg-neon-orange/20 text-neon-orange" : "glass text-muted-foreground"
          }`}
        >
          {eli5 ? <ToggleRight className="h-4 w-4" /> : <ToggleLeft className="h-4 w-4" />}
          ELI5
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[70%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "glass rounded-bl-md"
              }`}
            >
              {msg.role === "ai" ? (
                <div className="prose prose-sm prose-invert max-w-none">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              ) : (
                msg.text
              )}
            </div>
          </motion.div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="glass px-4 py-3 rounded-2xl rounded-bl-md flex items-center gap-1.5">
              <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border p-4">
        <div className="flex items-center gap-2 max-w-3xl mx-auto">
          <button className="p-2.5 rounded-lg glass text-muted-foreground hover:text-foreground transition-colors">
            <Image className="h-5 w-5" />
          </button>
          <button className="p-2.5 rounded-lg glass text-muted-foreground hover:text-foreground transition-colors">
            <Mic className="h-5 w-5" />
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ask anything..."
            className="flex-1 bg-muted/40 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary"
          />
          <button
            onClick={send}
            disabled={!input.trim()}
            className="p-2.5 rounded-xl bg-gradient-to-r from-neon-blue to-neon-violet text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-30"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AITutor;
