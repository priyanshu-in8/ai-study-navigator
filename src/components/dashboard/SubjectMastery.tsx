import { motion } from "framer-motion";

type Props = {
  accuracyStats: any;
};

const colors = [
  "from-neon-blue to-neon-cyan",
  "from-neon-violet to-neon-pink",
  "from-neon-green to-neon-cyan",
  "from-neon-orange to-neon-pink",
  "from-neon-pink to-neon-violet",
];

export function SubjectMastery({
  accuracyStats,
}: Props) {
  const subjects =
    accuracyStats?.subjectStats?.map(
      (item: any, index: number) => ({
        name: item.topic,
        mastery: item.accuracy,
        color:
          colors[index % colors.length],
      })
    ) || [];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
      className="glass p-5 hover-glow"
    >
      <h3 className="text-sm font-semibold text-foreground mb-4">
        Subject Mastery
      </h3>

      <div className="space-y-3.5">
        {subjects.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No data yet
          </p>
        ) : (
          subjects.map(
            (
              subject: any,
              i: number
            ) => (
              <div key={subject.name}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">
                    {subject.name}
                  </span>

                  <span className="text-foreground font-medium">
                    {subject.mastery}%
                  </span>
                </div>

                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    animate={{
                      width: `${subject.mastery}%`,
                    }}
                    transition={{
                      delay:
                        0.5 +
                        i * 0.1,
                      duration: 0.8,
                      ease: "easeOut",
                    }}
                    className={`h-full bg-gradient-to-r ${subject.color} rounded-full`}
                  />
                </div>
              </div>
            )
          )
        )}
      </div>
    </motion.div>
  );
}