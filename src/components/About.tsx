import React from "react";
import { motion } from "framer-motion";
import { PanelsTopLeft, CodeXml, Users, Globe } from "lucide-react";

const stats = [
  {
    icon: PanelsTopLeft,
    label: "Years Experience",
    value: "1+",
  },
  {
    icon: CodeXml,
    label: "Projects Completed",
    value: "7+",
  },
  {
    icon: Globe,
    label: "Platforms (Web, App, PC)",
    value: "3+",
  },
  {
    icon: Users,
    label: "Client Satisfaction",
    value: "100%",
  },
];

export const About: React.FC = () => {
  return (
    <section
      id="about"
      className="w-full py-24 border-y transition-colors duration-300"
      style={{
        backgroundColor: "var(--section-color)",
        borderColor: "var(--border-color)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="flex flex-col md:flex-row gap-16 items-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Left Column: Story */}
          <div className="flex-1 space-y-8">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
                Passionate about{" "}
                <span className="text-gradient-primary">Digital Excellence</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I am a passionate Full-Stack MERN & Cross-Platform App Developer with practical experience in crafting robust web apps, mobile apps (React Native), and desktop software (Electron.js). Currently working at Birtik Tech Pvt. Ltd. and pursuing B.Sc. IT, I focus on transforming client requirements into scalable, modern, and user-friendly digital products.
              </p>
            </div>
          </div>

          {/* Right Column: 2x2 Stats Grid */}
          <div className="flex-1 grid grid-cols-2 gap-4 w-full">
            {stats.map((item, idx) => (
              <motion.div
                key={idx}
                className="p-6 rounded-2xl border shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
                style={{
                  backgroundColor: "var(--card-color)",
                  borderColor: "var(--border-color)",
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors" />
                <div className="text-primary mb-4 p-3 bg-primary/10 w-max rounded-xl">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-1">
                  {item.value}
                </h3>
                <p className="text-sm font-medium text-muted-foreground">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
