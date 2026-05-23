import { useState } from "react";
import { studyPlanApi } from "@/services/api";

export default function GeneratePlan() {
  const [goal, setGoal] =
    useState("");

  const [days, setDays] =
    useState(30);

  const [hoursPerDay, setHours] =
    useState(2);

  const [level, setLevel] =
    useState("beginner");

  const [loading, setLoading] =
    useState(false);

  const generatePlan =
    async () => {
      try {
        setLoading(true);

        const body = {
          goal,
          days,
          hoursPerDay,
          level,
        };

        const res =
          await studyPlanApi.generatePlan(
            body
          );

        alert(
          "Plan Generated Successfully"
        );

        console.log(res);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="glass p-6 rounded-xl space-y-4">
      <h2 className="text-xl font-bold">
        AI Success Planner
      </h2>

      <input
        value={goal}
        onChange={(e) =>
          setGoal(
            e.target.value
          )
        }
        placeholder="Enter your goal"
        className="w-full p-3 rounded bg-muted"
      />

      <input
        type="number"
        value={days}
        onChange={(e) =>
          setDays(
            Number(
              e.target.value
            )
          )
        }
        className="w-full p-3 rounded bg-muted"
      />

      <input
        type="number"
        value={hoursPerDay}
        onChange={(e) =>
          setHours(
            Number(
              e.target.value
            )
          )
        }
        className="w-full p-3 rounded bg-muted"
      />

      <select
        value={level}
        onChange={(e) =>
          setLevel(
            e.target.value
          )
        }
        className="w-full p-3 rounded bg-muted"
      >
        <option value="beginner">
          Beginner
        </option>
        <option value="intermediate">
          Intermediate
        </option>
        <option value="advanced">
          Advanced
        </option>
      </select>

      <button
        onClick={
          generatePlan
        }
        className="w-full py-3 bg-primary rounded-lg"
      >
        {loading
          ? "Generating..."
          : "Generate Plan"}
      </button>
    </div>
  );
}