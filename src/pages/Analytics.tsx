import { motion } from "framer-motion";
import { BarChart3, TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis } from "recharts";

const weeklyData = [
  { day: "Mon", hours: 4.5, score: 65 },
  { day: "Tue", hours: 3.2, score: 72 },
  { day: "Wed", hours: 5.0, score: 68 },
  { day: "Thu", hours: 4.0, score: 80 },
  { day: "Fri", hours: 6.0, score: 85 },
  { day: "Sat", hours: 3.5, score: 78 },
  { day: "Sun", hours: 5.5, score: 92 },
];

const subjectData = [
  { subject: "DSA", score: 88 },
  { subject: "DBMS", score: 72 },
  { subject: "OS", score: 65 },
  { subject: "CN", score: 58 },
  { subject: "Math", score: 78 },
  { subject: "Physics", score: 60 },
];

const tooltipStyle = {
  backgroundColor: "hsl(228, 25%, 12%)",
  border: "1px solid hsl(228, 20%, 20%)",
  borderRadius: "8px",
  fontSize: "12px",
  color: "hsl(220, 20%, 95%)",
};

const Analytics = () => {
  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8 pb-24 md:pb-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-neon-cyan" /> Analytics
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Deep dive into your learning patterns</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Weekly Study Hours */}
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="glass p-5 hover-glow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">Study Hours (Weekly)</h3>
            <div className="flex items-center gap-1 text-neon-green text-xs font-medium">
              <TrendingUp className="h-3.5 w-3.5" /> +18%
            </div>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(228, 20%, 18%)" />
                <XAxis dataKey="day" tick={{ fill: "hsl(220, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(220, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="hours" fill="hsl(225, 90%, 60%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Performance Trend */}
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="glass p-5 hover-glow">
          <h3 className="text-sm font-semibold text-foreground mb-4">Score Trend</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="analyticsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(270, 80%, 60%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(270, 80%, 60%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(228, 20%, 18%)" />
                <XAxis dataKey="day" tick={{ fill: "hsl(220, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(220, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} domain={[50, 100]} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="score" stroke="hsl(270, 80%, 60%)" strokeWidth={2} fill="url(#analyticsGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Subject Mastery Radar */}
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="glass p-5 hover-glow max-w-lg">
        <h3 className="text-sm font-semibold text-foreground mb-4">Subject Mastery Radar</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={subjectData} cx="50%" cy="50%" outerRadius="70%">
              <PolarGrid stroke="hsl(228, 20%, 18%)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(220, 15%, 55%)", fontSize: 11 }} />
              <Radar dataKey="score" stroke="hsl(185, 90%, 55%)" fill="hsl(185, 90%, 55%)" fillOpacity={0.15} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;
