import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Sparkles,
  Mic,
  Image,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { aiApi } from "@/services/api";

interface Message {
  role: "user" | "ai";
  text: string;
}

const initialMessages: Message[] = [
  {
    role: "ai",
    text: `# 👋 Welcome to AI Tutor

Ask me anything about:

- Coding
- DBMS
- Operating System
- Computer Networks
- Maths
- Interview Prep

Try:
- Explain array
- What is DBMS?
- Binary search code in C++
- Difference between stack and queue`,
  },
];

const AITutor = () => {
  const [messages, setMessages] =
    useState<Message[]>(initialMessages);

  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [eli5, setEli5] = useState(false);

  const bottomRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, typing]);

  const send = async () => {
    if (!input.trim()) return;

    const userMsg = input.trim();

    setMessages((prev) => [
      ...prev,
      { role: "user", text: userMsg },
    ]);

    setInput("");
    setTyping(true);

    try {
      const result =
        await aiApi.generateChat(
          eli5
            ? `Explain in very simple words like for a child: ${userMsg}`
            : userMsg
        );

      const reply =
  result.data?.aiResponse ||   // 🔥 THIS IS MAIN FIX
  result.aiResponse ||
  result.response ||
  result.answer ||
  (result.message !== "Response generated successfully"
    ? result.message
    : null) ||
  "⚠️ No valid AI response";

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: reply,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "❌ Failed to connect AI backend.",
        },
      ]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col pb-16 md:pb-0">
      {/* Header */}
      <div className="border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-blue to-neon-violet flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-white" />
          </div>

          <div>
            <h1 className="text-lg font-bold text-foreground">
              AI Tutor
            </h1>
            <p className="text-xs text-neon-green">
              Online • Ready to help
            </p>
          </div>
        </div>

        <button
          onClick={() => setEli5(!eli5)}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition-all ${
            eli5
              ? "bg-neon-orange/20 text-neon-orange"
              : "glass text-muted-foreground"
          }`}
        >
          {eli5 ? (
            <ToggleRight className="h-4 w-4" />
          ) : (
            <ToggleLeft className="h-4 w-4" />
          )}
          ELI5
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 max-w-6xl mx-auto w-full">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${
              msg.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`${
                msg.role === "user"
                  ? "max-w-xl bg-primary text-white rounded-2xl rounded-br-md px-5 py-4 shadow-lg"
                  : "w-full max-w-4xl glass rounded-2xl rounded-bl-md px-6 py-5 border border-border mt-2 mb-2 mx-2"
              }`}
            >
              {msg.role === "ai" ? (
                <div className="prose prose-invert prose-sm sm:prose-base max-w-none leading-8 break-words">
                  <ReactMarkdown
                    components={{
                      h1: ({ children }) => (
                        <h1 className="text-2xl font-bold text-neon-blue mb-4">
                          {children}
                        </h1>
                      ),

                      h2: ({ children }) => (
                        <h2 className="text-xl font-bold text-neon-violet mt-6 mb-3">
                          {children}
                        </h2>
                      ),

                      h3: ({ children }) => (
                        <h3 className="text-lg font-semibold text-neon-green mt-5 mb-2">
                          {children}
                        </h3>
                      ),

                      p: ({ children }) => (
                        <p className="mb-4 text-foreground/90">
                          {children}
                        </p>
                      ),

                      ul: ({ children }) => (
                        <ul className="list-disc pl-6 space-y-2 mb-4">
                          {children}
                        </ul>
                      ),

                      ol: ({ children }) => (
                        <ol className="list-decimal pl-6 space-y-2 mb-4">
                          {children}
                        </ol>
                      ),

                      li: ({ children }) => (
                        <li className="text-foreground/90">
                          {children}
                        </li>
                      ),

                      strong: ({ children }) => (
                        <strong className="text-white font-semibold">
                          {children}
                        </strong>
                      ),

                      code: ({ children }) => (
                        <code className="bg-black/40 px-2 py-1 rounded text-neon-green text-sm">
                          {children}
                        </code>
                      ),

                      pre: ({ children }) => (
                        <pre className="bg-black/40 p-4 rounded-xl overflow-x-auto my-4 text-sm">
                          {children}
                        </pre>
                      ),
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                </div>
              ) : (
                <p className="text-sm leading-7">
                  {msg.text}
                </p>
              )}
            </div>
          </motion.div>
        ))}

        {typing && (
          <div className="glass px-4 py-3 rounded-xl w-fit mx-2">
            Thinking...
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border px-6 py-4">
        <div className="flex gap-2 max-w-5xl mx-auto">
          <button className="p-3 glass rounded-xl">
            <Image className="h-5 w-5" />
          </button>

          <button className="p-3 glass rounded-xl">
            <Mic className="h-5 w-5" />
          </button>

          <input
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            onKeyDown={(e) =>
              e.key === "Enter" && send()
            }
            placeholder="Ask anything..."
            className="flex-1 bg-muted/40 rounded-xl px-5 py-3 text-sm outline-none focus:ring-1 focus:ring-primary"
          />

          <button
            onClick={send}
            disabled={!input.trim()}
            className="p-3 rounded-xl bg-gradient-to-r from-neon-blue to-neon-violet text-white disabled:opacity-40"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AITutor;