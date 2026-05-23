import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { TrendingUp } from "lucide-react";

type Props = {
  accuracyStats: any;
};

export function PerformanceChart({
  accuracyStats,
}: Props) {
  const data =
    accuracyStats?.weeklyTrend?.map(
      (item: any) => ({
        day: item.day,
        score: item.accuracy,
      })
    ) || [];

  const first =
    data.length > 0 ? data[0].score : 0;

  const last =
    data.length > 0
      ? data[data.length - 1].score
      : 0;

  const growth = last - first;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      className="glass p-5 hover-glow"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Weekly Performance
          </h3>

          <p className="text-xs text-muted-foreground mt-0.5">
            Score trend this week
          </p>
        </div>

        <div className="flex items-center gap-1 text-neon-green text-xs font-medium">
          <TrendingUp className="h-3.5 w-3.5" />
          {growth >= 0 ? "+" : ""}
          {growth}%
        </div>
      </div>

      <div className="h-44">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient
                id="scoreGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="hsl(225, 90%, 60%)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="100%"
                  stopColor="hsl(225, 90%, 60%)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(228, 20%, 18%)"
            />

            <XAxis
              dataKey="day"
              tick={{
                fill: "hsl(220, 15%, 55%)",
                fontSize: 11,
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              domain={[0, 100]}
              tick={{
                fill: "hsl(220, 15%, 55%)",
                fontSize: 11,
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="score"
              stroke="hsl(225, 90%, 60%)"
              strokeWidth={2}
              fill="url(#scoreGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}