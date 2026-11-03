import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen, Calendar, CheckCircle2, Code2, Server, Terminal, Database, Cloud, Users2, Lightbulb, GitBranch, HeartHandshake, Compass, Sparkles } from "lucide-react";
import { MagicCard } from "./Services";

const educationList = [
  {
    degree: "B.Sc. in Information Technology",
    school: "Gokul Global University - (GGU)",
    year: "2025 – 2028",
    badge: "Pursuing Degree",
    badgeColor: "text-primary bg-primary/10 border-primary/30",
    details: [
      "Rigorous coursework in Web Development, Software Engineering, and Database Architecture",
      "Specialized in Full-Stack JavaScript, Modern MERN Architecture & React Native Apps",
      "Actively developing production-ready systems for business management and desktop clients",
      "Focusing on building scalable cross-platform applications and secure RESTful APIs",
    ],
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    school: "Gujarat Board (GSEB)",
    year: "2023 – 2024",
    badge: "Foundational Studies",
    badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    details: [
      "Completed secondary education with strong emphasis on logical and analytical thinking",
      "Engaged in intensive foundational studies and self-guided software programming",
      "Mastered core fundamentals of JavaScript, modern HTML5, and responsive CSS frameworks",
      "Built foundational projects exploring desktop systems and frontend user interfaces",
    ],
  },
];

const technicalArsenal = [
  { name: "React.js / React Native", level: 95, icon: Code2, color: "text-cyan-400" },
  { name: "Node.js / Express.js", level: 90, icon: Server, color: "text-emerald-400" },
  { name: "JavaScript & TypeScript", level: 92, icon: Terminal, color: "text-blue-400" },
  { name: "Databases (MySQL / SQLite / MongoDB)", level: 88, icon: Database, color: "text-amber-400" },
  { name: "Electron.js & Desktop Systems", level: 85, icon: Cloud, color: "text-purple-400" },
];

const professionalTraits = [
  { name: "Leadership", icon: Award, color: "text-amber-400 border-amber-500/30 bg-amber-500/10" },
  { name: "Problem Solving", icon: Lightbulb, color: "text-purple-400 border-purple-500/30 bg-purple-500/10" },
  { name: "Agile Methodologies", icon: GitBranch, color: "text-sky-400 border-sky-500/30 bg-sky-500/10" },
  { name: "Mentorship", icon: HeartHandshake, color: "text-rose-400 border-rose-500/30 bg-rose-500/10" },
  { name: "Strategic Thinking", icon: Compass, color: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10" },
  { name: "Cross-Team Collaboration", icon: Users2, color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" },
];

export const Education: React.FC = () => {
  return (
    <section id="education" className="w-full bg-[#EAF3F8] py-24 border-y border-[#D1E5F0]">
      <div className="max-w-7xl mx-auto px-6 space-y-20">
        {/* Education Header & Cards */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary shadow-md">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#111827]">
                Academic <span className="text-gradient-primary">Background</span>
              </h2>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Building the theoretical foundation and research methodologies that empower high-performance practical engineering.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {educationList.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <MagicCard
                  className="h-full p-8 rounded-[2.25rem] border border-[#D1E5F0] bg-white shadow-md hover:shadow-xl hover:border-[#004E7A]/40"
                  gradientSize={300}
                >
                <div className="flex flex-col h-full justify-between gap-6">
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/25 text-primary flex items-center justify-center shadow-sm">
                        <GraduationCap className="w-7 h-7 text-primary" />
                      </div>
                      <span
                        className={`px-3.5 py-1.5 rounded-full border text-xs font-extrabold flex items-center gap-1.5 shadow-sm ${item.badgeColor}`}
                      >
                        <Award className="w-3.5 h-3.5" />
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="text-2xl font-extrabold text-foreground tracking-tight mb-2">
                      {item.degree}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-muted-foreground mb-6 pb-4 border-b border-border/60">
                      <span className="flex items-center gap-1.5 text-foreground font-bold">
                        <BookOpen className="w-3.5 h-3.5 text-primary" />
                        {item.school}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5 font-mono text-primary font-bold">
                        <Calendar className="w-3.5 h-3.5" />
                        {item.year}
                      </span>
                    </div>

                    <ul className="space-y-3.5">
                      {item.details.map((detail, dIdx) => (
                        <li
                          key={dIdx}
                          className="text-sm text-muted-foreground flex items-start gap-3 leading-relaxed"
                        >
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span className="text-foreground/90 font-medium">
                            {detail}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </MagicCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Expertise & Skills section */}
      <motion.div
        id="skills"
        className="space-y-8 pt-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ staggerChildren: 0.2, delayChildren: 0.3 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
            <Code2 className="w-5 h-5" />
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Expertise & Skills
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Technical Arsenal with Progress Bars */}
          <div className="bg-white p-8 rounded-[2rem] border border-[#D1E5F0] shadow-md relative overflow-hidden">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#D1E5F0]">
              <h4 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Server className="w-5 h-5 text-primary" /> Technical Arsenal
              </h4>
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground bg-[#EAF3F8] px-3 py-1 rounded-full border border-[#D1E5F0]">
                Proficiency
              </span>
            </div>

            <div className="space-y-6">
              {technicalArsenal.map((tech, tIdx) => {
                const Icon = tech.icon;
                return (
                  <div key={tIdx} className="space-y-2.5">
                    <div className="flex justify-between items-center text-sm font-semibold">
                      <span className="text-foreground flex items-center gap-2.5">
                        <div className="p-1.5 rounded-lg bg-[#EAF3F8] border border-[#D1E5F0]">
                          <Icon className={`w-4 h-4 ${tech.color}`} />
                        </div>
                        {tech.name}
                      </span>
                      <span className="font-mono font-bold text-primary bg-[#EAF3F8] px-2.5 py-0.5 rounded-full text-xs border border-primary/20">
                        {tech.level}%
                      </span>
                    </div>

                    <div className="h-2.5 w-full bg-[#EAF3F8] rounded-full overflow-hidden border border-[#D1E5F0] p-[1px]">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#004E7A] via-[#0284C7] to-sky-400 rounded-full relative shadow-[0_0_12px_rgba(0,78,122,0.4)]"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${tech.level}%` }}
                        transition={{
                          duration: 1.5,
                          ease: "easeOut",
                          delay: 0.2 + tIdx * 0.1,
                        }}
                        viewport={{ once: true }}
                      >
                        <div className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full shadow-[0_0_8px_#fff]" />
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Professional Traits */}
          <div className="bg-white p-8 rounded-[2rem] border border-[#D1E5F0] shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#D1E5F0]">
                <h4 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-primary" /> Professional Traits
                </h4>
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground bg-[#EAF3F8] px-3 py-1 rounded-full border border-[#D1E5F0]">
                  Core Competencies
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                {professionalTraits.map((trait, trIdx) => {
                  const Icon = trait.icon;
                  return (
                    <motion.div
                      key={trIdx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        delay: trIdx * 0.08,
                      }}
                      viewport={{ once: true }}
                      className={`px-4 py-2.5 rounded-2xl border text-sm font-semibold flex items-center gap-2 shadow-sm hover:scale-105 transition-transform cursor-default ${trait.color}`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{trait.name}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#D1E5F0]">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-primary/10 via-sky-500/5 to-transparent border border-primary/20 flex items-start gap-3.5 shadow-sm">
                <div className="p-2 rounded-xl bg-primary/20 text-primary shrink-0 mt-0.5">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-foreground font-bold text-sm block mb-0.5">
                    Constant Learner & Tech Pioneer
                  </strong>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Continuously evolving with cutting-edge AI frameworks, distributed architectures, and modern web design systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      </div>
    </section>
  );
};
