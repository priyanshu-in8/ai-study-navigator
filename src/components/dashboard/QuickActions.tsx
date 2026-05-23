import { motion } from "framer-motion";
import {
  MessageCircle,
  Brain,
  BookOpen,
  Mic,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { quizApi } from "@/services/api";

export function QuickActions() {
  const navigate = useNavigate();

  const [recommendation, setRecommendation] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(false);

  /* ===================================
     SAFE QUIZ RECOMMENDATION
     (429 FIX)
  =================================== */
  useEffect(() => {
    const loadRecommendation =
      async () => {
        try {
          const cache =
            localStorage.getItem(
              "quiz_recommend_cache"
            );

          const cacheTime =
            localStorage.getItem(
              "quiz_recommend_time"
            );

          const now =
            Date.now();

          const tenMin =
            10 *
            60 *
            1000;

          /* -----------------------
             USE CACHE
          ----------------------- */
          if (
            cache &&
            cacheTime &&
            now -
              Number(
                cacheTime
              ) <
              tenMin
          ) {
            setRecommendation(
              JSON.parse(
                cache
              )
            );

            return;
          }

          /* -----------------------
             DELAY CALL
          ----------------------- */
          setLoading(true);

          setTimeout(
            async () => {
              try {
                const data =
                  await quizApi.recommendQuiz();

                setRecommendation(
                  data
                );

                localStorage.setItem(
                  "quiz_recommend_cache",
                  JSON.stringify(
                    data
                  )
                );

                localStorage.setItem(
                  "quiz_recommend_time",
                  String(
                    Date.now()
                  )
                );
              } catch (error) {
                console.log(
                  "recommendation skipped"
                );
              } finally {
                setLoading(
                  false
                );
              }
            },
            4000
          );
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      };

    loadRecommendation();
  }, []);

  const actions = [
    {
      label: "Ask AI Tutor",
      icon: MessageCircle,
      color:
        "from-neon-blue to-neon-cyan",
      path: "/tutor",
      tooltip:
        "Chat with AI for instant help",
    },

    {
      label: "Practice MCQs",
      icon: Brain,
      color:
        "from-neon-violet to-neon-pink",
      path: "/practice",
      tooltip: recommendation
        ? `Recommended: ${recommendation.topic}`
        : "Smart quiz recommendation",
    },

    {
      label: "Quick Revision",
      icon: BookOpen,
      color:
        "from-neon-green to-neon-cyan",
      path: "/revision",
      tooltip:
        "Review key concepts",
    },

    {
      label: "Voice Doubt",
      icon: Mic,
      color:
        "from-neon-orange to-neon-pink",
      path: "/tutor",
      tooltip:
        "Ask questions by voice",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {actions.map(
        (
          action,
          i
        ) => (
          <motion.button
            key={
              action.label
            }
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay:
                0.6 +
                i *
                  0.08,
            }}
            onClick={() =>
              navigate(
                action.path
              )
            }
            className="glass p-4 hover-glow group flex flex-col items-center gap-2 text-center relative"
            title={
              action.tooltip
            }
          >
            <div
              className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
            >
              <action.icon className="h-5 w-5 text-primary-foreground" />
            </div>

            <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
              {
                action.label
              }
            </span>

            {action.label ===
              "Practice MCQs" &&
              !loading &&
              recommendation && (
                <span className="text-[10px] text-neon-violet font-semibold">
                  {
                    recommendation.reason
                  }
                </span>
              )}

            {action.label ===
              "Practice MCQs" &&
              loading && (
                <span className="text-[10px] text-muted-foreground">
                  Loading...
                </span>
              )}
          </motion.button>
        )
      )}
    </div>
  );
}