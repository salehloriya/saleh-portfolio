import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Briefcase, Layers, Code, Sparkles, Users } from "lucide-react";

interface TimelineEvent {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  icon?: React.ReactNode;
}

const careerEvents: TimelineEvent[] = [
  {
    year: "2025 – 2026",
    title: "Full-Stack Developer",
    subtitle: "Birtik Tech Pvt. Ltd.",
    description:
      "Working on full-stack projects using React.js, Express.js, MySQL, and React Native. Developing responsive UIs, integrating REST APIs, and building intuitive admin dashboards with category filtering, user authentication, and Multer file upload pipelines.",
    icon: <Briefcase className="h-4 w-4 mr-2 text-primary" />,
  },
  {
    year: "2024 – 2025",
    title: "Full-Stack & Desktop App Developer",
    subtitle: "Freelance & Client Projects",
    description:
      "Engineered cross-platform client solutions including the BirStock ERP inventory desktop system (Electron.js), Restaurant POS web software, and customer-facing mobile apps with clean architecture, offline support, and local database storage.",
    icon: <Code className="h-4 w-4 mr-2 text-primary" />,
  },
];

export const Career: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <div id="career" ref={containerRef} className="relative min-h-screen w-full overflow-hidden bg-background text-foreground py-24">
      {/* Title */}
      <div className="text-center py-12 px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
          Career <span className="text-gradient-primary">Journey</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          An evolving path of leadership, innovation, and impact
        </p>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 pb-24">
        <div className="relative mx-auto">
          {/* Background vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-[3px] bg-primary/20 h-full top-0 z-10 hidden lg:block" />

          {/* Glowing Animated line */}
          <motion.div
            className="absolute top-0 z-10 hidden lg:block"
            style={{
              height: lineHeight,
              width: 3,
              left: "50%",
              transform: "translateX(-50%)",
              borderRadius: "9999px",
              background: "linear-gradient(to bottom, #0284C7, #004E7A, #0284C7)",
              boxShadow: "0 0 15px rgba(0,78,122,0.4), 0 0 25px rgba(2,132,199,0.3)",
            }}
          />

          {/* Events */}
          <div className="relative z-20 space-y-16 lg:space-y-24">
            {careerEvents.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`relative flex items-center flex-col lg:flex-row ${
                    isEven ? "lg:justify-start" : "lg:flex-row-reverse lg:justify-start"
                  }`}
                >
                  {/* Center Dot indicator */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 hidden lg:block">
                    <motion.div
                      className="w-6 h-6 rounded-full border-4 border-[#004E7A] bg-white flex items-center justify-center shadow-lg"
                      whileHover={{ scale: 1.25 }}
                    >
                      <div className="w-2 h-2 rounded-full bg-[#004E7A]" />
                    </motion.div>
                  </div>

                  {/* Card Content */}
                  <motion.div
                    initial={{ opacity: 0, y: 30, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, y: 0, x: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    className={`w-full lg:w-[calc(50%-40px)] ${
                      isEven ? "lg:mr-[calc(50%+20px)]" : "lg:ml-[calc(50%+20px)]"
                    }`}
                  >
                    <div className="bg-[#EAF3F8] p-8 rounded-[2rem] border border-[#D1E5F0] shadow-md hover:border-[#004E7A]/40 hover:shadow-xl transition-all">
                      <div className="flex items-center gap-2 mb-3">
                        {item.icon}
                        <span className="text-sm font-bold text-primary font-mono bg-white px-3 py-1 rounded-full border border-primary/20">
                          {item.year}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold mb-1 tracking-tight text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-sm font-semibold text-primary/90 mb-4">
                        {item.subtitle}
                      </p>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
