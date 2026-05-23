import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Crown, Medal } from "lucide-react";
import { leaderboardApi } from "@/services/api";

export function Leaderboard() {
  const [users, setUsers] =
    useState<any[]>([]);

  const currentUser =
    JSON.parse(
      localStorage.getItem(
        "authUser"
      ) || "{}"
    );

  useEffect(() => {
    loadBoard();
  }, []);

  const loadBoard = async () => {
    try {
      const res =
        await leaderboardApi.getLeaderboard();

      const data =
        res.leaderboard || [];

      const finalUsers =
        data.map(
          (user: any) => ({
            ...user,
            you:
              user.name ===
              currentUser.name,
          })
        );

      setUsers(finalUsers);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.98,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        delay: 0.45,
      }}
      className="glass p-5 hover-glow"
    >
      <div className="flex items-center gap-2 mb-4">
        <Crown className="h-4 w-4 text-neon-orange" />

        <h3 className="text-sm font-semibold text-foreground">
          Leaderboard
        </h3>
      </div>

      <div className="space-y-2.5">
        {users.map(
          (user: any) => (
            <div
              key={user.id}
              className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                user.you
                  ? "bg-primary/5 border border-primary/20"
                  : ""
              }`}
            >
              <span
                className={`w-6 text-center text-xs font-bold ${
                  user.rank <= 3
                    ? "text-neon-orange"
                    : "text-muted-foreground"
                }`}
              >
                {user.rank <= 3 ? (
                  <Medal className="h-4 w-4 inline" />
                ) : (
                  `#${user.rank}`
                )}
              </span>

              <div className="h-7 w-7 rounded-full bg-gradient-to-br from-neon-blue to-neon-violet flex items-center justify-center text-[10px] font-bold text-primary-foreground">
                {user.name?.[0]}
              </div>

              <div className="flex-1">
                <span className="text-xs font-medium text-foreground">
                  {user.name}
                </span>

                {user.you && (
                  <span className="text-[10px] text-primary ml-1">
                    (You)
                  </span>
                )}
              </div>

              <span className="text-xs font-semibold text-muted-foreground">
                {Number(
                  user.xpPoints
                ).toLocaleString()} XP
              </span>
            </div>
          )
        )}
      </div>
    </motion.div>
  );
}