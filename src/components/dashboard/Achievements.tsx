import { useEffect, useState } from "react";
import { achievementApi } from "@/services/api";

export function Achievements() {
  const [items, setItems] =
    useState<any[]>([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res =
        await achievementApi.getAchievements();

      setItems(
        res.achievements || []
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="glass p-5">
      <h3 className="text-sm font-semibold mb-4">
        Achievements
      </h3>

      <div className="grid grid-cols-2 gap-3">
        {items.map((a) => (
          <div
            key={a.key}
            className="bg-muted/40 rounded-lg p-3 text-center"
          >
            <div className="text-2xl">
              {a.icon}
            </div>

            <p className="text-xs mt-2">
              {a.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}