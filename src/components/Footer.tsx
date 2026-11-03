import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUp, Twitter, Github, Linkedin, Mail, Heart } from "lucide-react";

const morphTexts = [
  "Full-Stack Developer",
  "UI/UX Architect",
  "AI Systems Engineer",
  "Product Builder",
  "Scarlett Rose",
];

const TextMorph: React.FC<{ texts: string[]; className?: string }> = ({
  texts,
  className,
}) => {
  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!texts || texts.length === 0) return;
    let animId: number;
    let curIdx = 0;
    const morphDuration = 1.6;
    const cooldownDuration = 0.8;
    let time = new Date();
    let morphProgress = 0;
    let cooldown = cooldownDuration;

    if (!text1Ref.current || !text2Ref.current) return;
    text1Ref.current.textContent = texts[0];
    text2Ref.current.textContent = texts[1 % texts.length];

    function setMorph(fraction: number) {
      if (!text1Ref.current || !text2Ref.current) return;
      text2Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      text2Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
      const inv = 1 - fraction;
      text1Ref.current.style.filter = `blur(${Math.min(8 / inv - 8, 100)}px)`;
      text1Ref.current.style.opacity = `${Math.pow(inv, 0.4) * 100}%`;
    }

    function doMorph() {
      morphProgress -= cooldown;
      cooldown = 0;
      let fraction = morphProgress / morphDuration;
      if (fraction > 1) {
        cooldown = cooldownDuration;
        fraction = 1;
      }
      setMorph(fraction);
    }

    function doCooldown() {
      morphProgress = 0;
      if (text1Ref.current && text2Ref.current) {
        text2Ref.current.style.filter = "";
        text2Ref.current.style.opacity = "100%";
        text1Ref.current.style.filter = "";
        text1Ref.current.style.opacity = "0%";
      }
    }

    function animate() {
      animId = requestAnimationFrame(animate);
      const newTime = new Date();
      const dt = (newTime.getTime() - time.getTime()) / 1000;
      time = newTime;
      cooldown -= dt;
      if (cooldown <= 0) {
        doMorph();
      } else {
        doCooldown();
      }
      if (morphProgress >= morphDuration) {
        curIdx = (curIdx + 1) % texts.length;
        if (text1Ref.current && text2Ref.current) {
          text1Ref.current.textContent = texts[curIdx];
          text2Ref.current.textContent = texts[(curIdx + 1) % texts.length];
        }
        morphProgress = 0;
      }
    }

    animate();
    return () => cancelAnimationFrame(animId);
  }, [texts]);

  const longestText = texts.reduce((a, b) => (a.length > b.length ? a : b), "");

  return (
    <div className={`relative inline-flex items-center justify-center font-extrabold tracking-tight select-none ${className}`}>
      <span
        ref={text1Ref}
        className="absolute inset-0 flex items-center justify-center text-center transition-all duration-200"
      />
      <span
        ref={text2Ref}
        className="absolute inset-0 flex items-center justify-center text-center transition-all duration-200"
      />
      <span className="opacity-0 pointer-events-none px-2 py-1">
        {longestText}
      </span>
    </div>
  );
};

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Career", href: "#career" },
    { name: "Projects", href: "#projects" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Mail, href: "mailto:hello@scarlettrose.dev", label: "Email" },
  ];

  return (
    <footer className="w-full relative z-10 pt-16 pb-28 md:pb-36 bg-card/60 backdrop-blur-2xl border-t border-black/5 dark:border-white/10 shadow-2xl rounded-t-[3rem] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-primary/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col gap-10">
        {/* Top Row: Brand & Back to Top */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-black/5 dark:border-white/10">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-primary to-sky-400 p-[1px] shadow-lg">
              <div className="w-full h-full bg-background rounded-[11px] flex items-center justify-center">
                <span className="font-extrabold text-xs tracking-tighter bg-gradient-to-r from-purple-500 to-sky-400 bg-clip-text text-transparent">
                  SR
                </span>
              </div>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-extrabold tracking-tight text-foreground text-base leading-none">
                Scarlett Rose
              </span>
              <span className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase mt-0.5">
                Director of Product Engineering
              </span>
            </div>
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-panel border border-black/5 dark:border-white/10 text-xs font-bold text-foreground hover:text-primary hover:border-primary/40 transition-all shadow-sm cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </motion.button>
        </div>

        {/* Center: Morphing Text Banner */}
        <div className="py-12 px-6 rounded-3xl bg-black/[0.015] dark:bg-white/[0.02] border border-black/5 dark:border-white/10 text-center flex flex-col items-center justify-center my-2 shadow-sm">
          <span className="text-xs font-extrabold uppercase tracking-widest text-primary mb-3 bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20 shadow-sm">
            Innovate & Build
          </span>
          <TextMorph
            texts={morphTexts}
            className="text-3xl md:text-5xl lg:text-6xl text-foreground font-extrabold min-h-[70px] text-center"
          />
        </div>

        {/* Nav Links */}
        <div className="py-6 border-t border-black/5 dark:border-white/10 flex flex-wrap items-center justify-center gap-6 md:gap-12 text-sm font-semibold text-muted-foreground">
          {navLinks.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              className="hover:text-foreground transition-colors hover:scale-105 transform duration-200"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Bottom Row */}
        <div className="pt-6 border-t border-black/5 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            {socialLinks.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                aria-label={item.label}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full glass-panel border border-black/5 dark:border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 hover:scale-110 transition-all shadow-sm"
              >
                <item.icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-1.5 font-medium text-center md:text-right">
            <span>© {new Date().getFullYear()} Scarlett Rose. Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline-block" />
            <span>& Lightswind UI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
