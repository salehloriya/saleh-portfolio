import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUp, Github, Linkedin, Mail, Heart, Phone } from "lucide-react";

const morphTexts = [
  "Full-Stack Developer",
  "React Native & Mobile Apps",
  "Electron Desktop Systems",
  "MERN Stack Specialist",
  "Saleh Loriya",
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
    { icon: Github, href: "https://github.com/salehloriya", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/saleh-loriya-a74b74386/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:loriyasaleh@gmail.com", label: "Email" },
    { icon: Phone, href: "https://wa.me/917862072271", label: "WhatsApp" },
  ];

  return (
    <footer
      className="w-full relative z-10 pt-16 pb-28 md:pb-36 border-t shadow-2xl rounded-t-[3rem] overflow-hidden"
      style={{
        backgroundColor: "var(--bg-color)",
        borderColor: "var(--border-color)",
      }}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] blur-[140px] rounded-full pointer-events-none opacity-40"
        style={{ backgroundColor: "var(--primary-color)" }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col gap-10">
        {/* Top Row: Brand & Back to Top */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b"
          style={{ borderColor: "var(--border-color)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md"
              style={{ backgroundColor: "var(--primary-color)" }}
            >
              <span className="font-black text-sm tracking-tighter text-white">
                SL
              </span>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-extrabold tracking-tight text-foreground text-base leading-none">
                Saleh Loriya
              </span>
              <span className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase mt-0.5">
                Full-Stack Developer
              </span>
            </div>
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border text-xs font-bold transition-all shadow-sm cursor-pointer"
            style={{
              backgroundColor: "var(--section-color)",
              borderColor: "var(--border-color)",
              color: "var(--primary-color)",
            }}
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </motion.button>
        </div>

        {/* Center: Morphing Text Banner */}
        <div
          className="py-12 px-6 rounded-3xl text-white text-center flex flex-col items-center justify-center my-2 shadow-2xl border"
          style={{
            backgroundColor: "var(--primary-color)",
            borderColor: "var(--border-color)",
          }}
        >
          <span className="text-xs font-extrabold uppercase tracking-widest text-sky-100 mb-3 bg-white/20 px-4 py-1.5 rounded-full border border-white/30 shadow-sm backdrop-blur-sm">
            Innovate & Build
          </span>
          <TextMorph
            texts={morphTexts}
            className="text-3xl md:text-5xl lg:text-6xl text-white font-extrabold min-h-[70px] text-center drop-shadow-sm"
          />
        </div>

        {/* Nav Links */}
        <div
          className="py-6 border-t flex flex-wrap items-center justify-center gap-6 md:gap-12 text-sm font-semibold text-muted-foreground"
          style={{ borderColor: "var(--border-color)" }}
        >
          {navLinks.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              className="hover:text-primary transition-colors hover:scale-105 transform duration-200"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Bottom Row */}
        <div
          className="pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-muted-foreground"
          style={{ borderColor: "var(--border-color)" }}
        >
          <div className="flex items-center gap-3">
            {socialLinks.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                aria-label={item.label}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border flex items-center justify-center hover:scale-110 transition-all shadow-sm"
                style={{
                  backgroundColor: "var(--card-color)",
                  borderColor: "var(--border-color)",
                  color: "var(--primary-color)",
                }}
              >
                <item.icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-1.5 font-medium text-center md:text-right">
            <span>© {new Date().getFullYear()} Saleh Loriya. Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline-block" />
            <span>& React</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
