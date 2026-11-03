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
import { CustomCursor } from "./components/CustomCursor";

export const App: React.FC = () => {
  const [showDock, setShowDock] = useState(true);

  // Manage dock visibility on scroll
  useEffect(() => {
    const handleScroll = () => {
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        setShowDock(true);
        return;
      }

      const cur =
        window.pageYOffset ||
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;

      // On desktop, dock floats up smoothly after scrolling > 60px
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
      id: "hero",
      icon: <Home className="w-4 h-4 sm:w-5 sm:h-5" />,
      label: "Home",
      onClick: () => scrollTo("hero"),
    },
    {
      id: "about",
      icon: <User className="w-4 h-4 sm:w-5 sm:h-5" />,
      label: "About",
      onClick: () => scrollTo("about"),
    },
    {
      id: "career",
      icon: <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />,
      label: "Career",
      onClick: () => scrollTo("career"),
    },
    {
      id: "projects",
      icon: <FolderKanban className="w-4 h-4 sm:w-5 sm:h-5" />,
      label: "Projects",
      onClick: () => scrollTo("projects"),
    },
    {
      id: "education",
      icon: <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />,
      label: "Education",
      shortLabel: "Edu",
      onClick: () => scrollTo("education"),
    },
    {
      id: "testimonials",
      icon: <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />,
      label: "Testimonials",
      shortLabel: "Reviews",
      onClick: () => scrollTo("testimonials"),
    },
    {
      id: "contact",
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

      {/* Bottom Navigation Dock: App Tab Bar on Mobile, macOS Liquid Dock on Desktop */}
      <motion.aside
        initial={false}
        animate={{
          y: showDock ? 0 : 120,
          opacity: showDock ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
        style={{ zIndex: 99999 }}
        className="fixed bottom-0 md:bottom-4 inset-x-0 z-[99999] flex justify-center px-0 md:px-4 pointer-events-auto"
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
