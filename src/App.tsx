import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Home,
  User,
  Briefcase,
  FolderKanban,
  GraduationCap,
  MessageSquare,
  Send,
} from "lucide-react";
import { CustomCursor } from "./components/CustomCursor";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { Projects } from "./components/Projects";
import { Career } from "./components/Career";
import { Education } from "./components/Education";
import { Testimonials } from "./components/Testimonials";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { FloatingDock, type DockItemData } from "./components/FloatingDock";

export const App: React.FC = () => {
  const [showDock, setShowDock] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const cur =
        window.pageYOffset ||
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;

      // In the hero section at the top, the dock is hidden
      // As soon as user scrolls down (> 60px), dock floats up smoothly
      setShowDock(cur > 60);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchmove", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const dockItems: DockItemData[] = [
    {
      icon: <Home className="w-4 h-4 sm:w-5 sm:h-5" />,
      label: "Home",
      onClick: () => scrollTo("hero"),
    },
    {
      icon: <User className="w-4 h-4 sm:w-5 sm:h-5" />,
      label: "About",
      onClick: () => scrollTo("about"),
    },
    {
      icon: <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />,
      label: "Career",
      onClick: () => scrollTo("career"),
    },
    {
      icon: <FolderKanban className="w-4 h-4 sm:w-5 sm:h-5" />,
      label: "Projects",
      onClick: () => scrollTo("projects"),
    },
    {
      icon: <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />,
      label: "Education",
      onClick: () => scrollTo("education"),
    },
    {
      icon: <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />,
      label: "Testimonials",
      onClick: () => scrollTo("testimonials"),
    },
    {
      icon: <Send className="w-4 h-4 sm:w-5 sm:h-5" />,
      label: "Contact",
      onClick: () => scrollTo("contact"),
    },
  ];

  return (
    <div className="bg-transparent min-h-screen relative overflow-x-hidden selection:bg-primary/30 selection:text-primary-foreground">
      {/* Interactive Custom Cursor */}
      <CustomCursor glowEffect={true} showTrail={true} trailLength={4} />

      {/* Header / Navbar */}
      <Navbar />

      {/* Main Sections */}
      <main className="w-full flex flex-col pt-10 border-none">
        <Hero />
        <About />
        <Services />
        <Projects />
        <Career />
        <Education />
        <Testimonials />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Bottom Navigation Dock */}
      <motion.aside
        initial={false}
        animate={{
          y: showDock ? 0 : 120,
          opacity: showDock ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
        style={{
          position: "fixed",
          bottom: "16px",
          left: 0,
          right: 0,
          zIndex: 9999,
          display: "flex",
          justifyContent: "center",
          paddingLeft: "16px",
          paddingRight: "16px",
          pointerEvents: showDock ? "auto" : "none",
        }}
        aria-hidden={!showDock}
      >
        <FloatingDock
          items={dockItems}
          panelHeight={56}
          baseItemSize={44}
          magnification={66}
          distance={180}
          multiBorder={true}
        />
      </motion.aside>
    </div>
  );
};

export default App;
