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
    year: "2024 – Present",
    title: "Director of Product Engineering",
    subtitle: "TechNova Global Solutions",
    description:
      "Leading a 200+ engineering team across 5 continents, overseeing full product lifecycle from ideation to global deployment. Introduced AI-driven development pipelines, reducing time-to-market by 38%. Established enterprise-wide accessibility and sustainability design standards.",
    icon: <Briefcase className="h-4 w-4 mr-2 text-primary" />,
  },
  {
    year: "2020 – 2024",
    title: "Senior Principal Engineer & Design Strategist",
    subtitle: "Innova Digital Labs",
    description:
      "Architected scalable microservices for financial and healthcare industries, serving 20M+ active users. Directed the adoption of a unified design system across 12 product lines, increasing brand consistency and dev speed by 50%. Mentored 40+ senior engineers into leadership positions.",
    icon: <Layers className="h-4 w-4 mr-2 text-primary" />,
  },
  {
    year: "2016 – 2020",
    title: "Lead Full-Stack Developer",
    subtitle: "Skyline Interactive",
    description:
      "Spearheaded the creation of immersive web applications using React, GraphQL, and Node.js for high-profile clients. Reduced application load times by 70% through advanced performance optimization. Introduced component-driven workflows that became the company's standard practice.",
    icon: <Code className="h-4 w-4 mr-2 text-primary" />,
  },
  {
    year: "2012 – 2016",
    title: "Senior UI/UX Designer",
    subtitle: "PixelForge Studios",
    description:
      "Designed award-winning digital experiences for global brands, winning multiple Awwwards and Webby Awards. Championed user-centered design by integrating continuous feedback loops into every sprint. Collaborated with cross-functional teams to unify visual and interaction design.",
    icon: <Sparkles className="h-4 w-4 mr-2 text-primary" />,
  },
  {
    year: "2008 – 2012",
    title: "Frontend Developer & Interaction Designer",
    subtitle: "CreativeSpark Agency",
    description:
      "Built responsive and interactive marketing websites during the rise of mobile-first design. Created high-conversion landing pages for major e-commerce campaigns. Developed custom animations that improved user engagement metrics by over 45%.",
    icon: <Users className="h-4 w-4 mr-2 text-primary" />,
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
              background: "linear-gradient(to bottom, #22d3ee, #6366f1, #a855f7)",
              boxShadow: "0 0 15px rgba(99,102,241,0.5), 0 0 25px rgba(168,85,247,0.3)",
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
                      className="w-6 h-6 rounded-full border-4 border-primary bg-background flex items-center justify-center shadow-lg"
                      whileHover={{ scale: 1.25 }}
                    >
                      <div className="w-2 h-2 rounded-full bg-primary" />
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
                    <div className="glass-panel p-8 rounded-[2rem] border border-border/80 bg-card/90 shadow-xl hover:border-primary/40 hover:shadow-2xl transition-all">
                      <div className="flex items-center gap-2 mb-3">
                        {item.icon}
                        <span className="text-sm font-bold text-primary font-mono bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
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
