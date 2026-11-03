import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { BackgroundPattern } from "./BackgroundPattern";
import { LanyardBadge } from "./LanyardBadge";
import { MarqueeBanner } from "./MarqueeBanner";

export const Hero: React.FC = () => {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleDownloadResume = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/Saleh_Loriya_Resume.pdf");
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "Saleh_Loriya_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      window.location.href = "/Saleh_Loriya_Resume.pdf";
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100vh] flex flex-col pt-12 md:pt-16 overflow-hidden bg-background"
    >
      <BackgroundPattern width={16} height={16} cx={1} cy={1} cr={1} glow={true} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex-1 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 pb-12">
        {/* Left Column */}
        <motion.div
          className="flex-1 flex flex-col items-center md:items-start text-center md:text-left pt-0"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-2.5 py-1.5 px-4 rounded-full glass-panel border border-foreground/10 text-xs font-medium text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span>Available for work</span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-4 text-center md:text-left"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-2">
              Hi, I'm
            </h1>
            <div>
              <span className="text-gradient-primary font-extrabold text-[clamp(3rem,6.5vw,5.5rem)] leading-none tracking-tight block pb-2 select-none">
                Saleh Loriya
              </span>
            </div>
            <div className="text-xl md:text-2xl font-bold text-primary mt-1 mb-2">
              Full-Stack Developer
            </div>
          </motion.div>

          {/* Subheading */}
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8 leading-relaxed w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            I engineer high-performance mobile, web, and desktop applications tailored to client requirements. Focused on understanding real-world needs to deliver clean, scalable, and optimal solutions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-10 w-full md:w-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <button
              onClick={() => scrollTo("#projects")}
              className="rounded-full px-7 h-12 text-white font-semibold flex items-center gap-2 transition-all hover:-translate-y-1 cursor-pointer shadow-lg"
              style={{ backgroundColor: "var(--primary-color)" }}
            >
              <span>View Work</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="/Saleh_Loriya_Resume.pdf"
              download="Saleh_Loriya_Resume.pdf"
              onClick={handleDownloadResume}
              className="rounded-full px-7 h-12 font-semibold flex items-center gap-2 transition-all hover:-translate-y-1 border cursor-pointer shadow-sm"
              style={{
                backgroundColor: "var(--section-color)",
                color: "var(--primary-color)",
                borderColor: "var(--border-color)",
              }}
            >
              <span>Resume</span>
              <Download className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex items-center gap-5 justify-center md:justify-start w-full md:w-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            {[
              { icon: Github, href: "https://github.com/salehloriya", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/saleh-loriya-a74b74386/", label: "LinkedIn" },
              { icon: Mail, href: "mailto:loriyasaleh@gmail.com", label: "Email" },
            ].map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className="text-muted-foreground hover:text-foreground transition-colors hover:-translate-y-1 transform duration-200"
              >
                <item.icon className="w-5 h-5" />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column: Lanyard Hanging Badge */}
        <motion.div
          className="flex-1 w-full max-w-md relative flex justify-center items-center py-2"
          initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <LanyardBadge
            name="Saleh Loriya"
            role="Full-Stack Developer"
            badgeId="SJ-2026-DEV"
            image="/profile-new.jpg"
            accentColor="#004E7A"
            ropeLength={75}
            ropeColor="#004E7A"
            cardWidth="w-72 sm:w-80 md:w-84"
          />
        </motion.div>
      </div>

      {/* Marquee Banner at the bottom of hero */}
      <div className="w-full relative z-10 mt-auto">
        <MarqueeBanner />
      </div>
    </section>
  );
};
