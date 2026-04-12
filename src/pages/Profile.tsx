import { motion } from "framer-motion";
import { User, LogOut, Trophy, Flame, Zap, Edit2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8 pb-24 md:pb-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <User className="h-6 w-6 text-neon-blue" /> Profile
        </h1>
      </motion.div>

      <div className="glass p-6 rounded-xl max-w-lg mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neon-blue to-neon-violet flex items-center justify-center text-2xl font-bold text-primary-foreground">
            {(user?.user_metadata?.full_name?.[0] || user?.email?.[0] || "U").toUpperCase()}
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-foreground">
              {user?.user_metadata?.full_name || "Student"}
            </h2>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
          <button className="p-2 rounded-lg glass text-muted-foreground hover:text-foreground transition-colors">
            <Edit2 className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Flame, label: "Streak", value: "7 days", color: "text-neon-orange" },
            { icon: Zap, label: "XP", value: "2,450", color: "text-neon-blue" },
            { icon: Trophy, label: "Level", value: "12", color: "text-neon-violet" },
          ].map((stat) => (
            <div key={stat.label} className="bg-muted/30 rounded-lg p-3 text-center">
              <stat.icon className={`h-5 w-5 ${stat.color} mx-auto mb-1`} />
              <p className="text-sm font-bold text-foreground">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleSignOut}
        className="glass px-6 py-3 rounded-xl text-destructive text-sm font-medium flex items-center gap-2 hover:bg-destructive/10 transition-colors"
      >
        <LogOut className="h-4 w-4" /> Sign Out
      </button>
    </div>
  );
};

export default Profile;
