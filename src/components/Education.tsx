import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen, Calendar, CheckCircle2, Code2, Server, Terminal, Database, Cloud, Users2, Lightbulb, GitBranch, HeartHandshake, Compass, Sparkles } from "lucide-react";
import { MagicCard } from "./Services";

const educationList = [
  {
    degree: "M.Sc. in Computer Science",
    school: "University of Chennai",
    year: "2016 – 2018",
    badge: "IEEE Published Author",
    badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    details: [
      "Specialized in Software Architecture, Distributed Systems, and AI Applications",
      "Thesis on Machine Learning for Predictive Analytics & Neural Optimization",
      "Led enterprise research project on Cloud-Based ERP microservices",
      "Published 2 peer-reviewed research papers in IEEE international conferences",
    ],
  },
  {
    degree: "B.Sc. in Information Technology",
    school: "Anna University",
    year: "2013 – 2016",
    badge: "Top 5% Honors",
    badgeColor: "text-primary bg-primary/10 border-primary/30",
    details: [
      "Gained rigorous foundation in Systems Programming, Networking & DB Management",
      "Ranked in top 5% across Software Engineering & Algorithms coursework",
      "Architected campus-wide digital library management system",
      "Organized and chaired annual technical symposium for 3 consecutive years",
    ],
  },
];

const technicalArsenal = [
  { name: "React.js / Next.js", level: 95, icon: Code2, color: "text-cyan-400" },
  { name: "Node.js / Express", level: 90, icon: Server, color: "text-emerald-400" },
  { name: "TypeScript & JavaScript", level: 92, icon: Terminal, color: "text-blue-400" },
  { name: "Database (MongoDB / PostgreSQL)", level: 88, icon: Database, color: "text-amber-400" },
  { name: "Cloud (AWS / Azure)", level: 85, icon: Cloud, color: "text-purple-400" },
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
    <section id="education" className="max-w-7xl mx-auto px-6 py-24 space-y-20">
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
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
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
                className="h-full p-8 rounded-[2.25rem] border border-border/80 bg-card/80 shadow-xl"
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
          <div className="glass-panel p-8 rounded-[2rem] border border-foreground/15 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/60">
              <h4 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Server className="w-5 h-5 text-primary" /> Technical Arsenal
              </h4>
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground bg-muted/60 px-3 py-1 rounded-full border border-border/50">
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
                        <div className="p-1.5 rounded-lg bg-foreground/5 border border-foreground/10">
                          <Icon className={`w-4 h-4 ${tech.color}`} />
                        </div>
                        {tech.name}
                      </span>
                      <span className="font-mono font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full text-xs border border-primary/20">
                        {tech.level}%
                      </span>
                    </div>

                    <div className="h-2.5 w-full bg-muted/60 rounded-full overflow-hidden border border-border/40 p-[1px]">
                      <motion.div
                        className="h-full bg-gradient-to-r from-purple-600 via-primary to-sky-400 rounded-full relative shadow-[0_0_12px_rgba(139,92,246,0.5)]"
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
          <div className="glass-panel p-8 rounded-[2rem] border border-foreground/15 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/60">
                <h4 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-primary" /> Professional Traits
                </h4>
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground bg-muted/60 px-3 py-1 rounded-full border border-border/50">
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

            <div className="mt-8 pt-6 border-t border-border/60">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-primary/10 via-purple-500/5 to-transparent border border-primary/20 flex items-start gap-3.5 shadow-sm">
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
    </section>
  );
};
