import { motion } from "framer-motion";
import { Settings as SettingsIcon, Bell, Moon, Globe, Shield } from "lucide-react";

const Settings = () => {
  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8 pb-24 md:pb-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <SettingsIcon className="h-6 w-6 text-muted-foreground" /> Settings
        </h1>
      </motion.div>

      <div className="space-y-3 max-w-lg">
        {[
          { icon: Bell, label: "Notifications", desc: "Study reminders & alerts" },
          { icon: Moon, label: "Dark Mode", desc: "Always on (system default)" },
          { icon: Globe, label: "Language", desc: "English" },
          { icon: Shield, label: "Privacy", desc: "Manage your data" },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className="glass p-4 hover-glow flex items-center gap-4 cursor-pointer"
          >
            <item.icon className="h-5 w-5 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
