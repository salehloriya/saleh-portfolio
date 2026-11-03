import React, { useRef, useState, useMemo, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";

export interface DockItemData {
  id?: string;
  icon: React.ReactNode;
  label: string;
  shortLabel?: string;
  onClick: () => void;
  badgeCount?: number;
}

interface FloatingDockProps {
  items: DockItemData[];
  className?: string;
  panelHeight?: number;
  dockHeight?: number;
  baseItemSize?: number;
  magnification?: number;
  distance?: number;
  gap?: string;
  multiBorder?: boolean;
}

const DockItem = ({
  icon,
  label,
  onClick,
  mouseX,
  baseItemSize = 44,
  magnification = 68,
  distance = 180,
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  badgeCount,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  mouseX: any;
  baseItemSize?: number;
  magnification?: number;
  distance?: number;
  spring?: { mass: number; stiffness: number; damping: number };
  badgeCount?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const hoverValue = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const unsub = hoverValue.on("change", (latest) => setIsHovered(latest === 1));
    return () => unsub();
  }, [hoverValue]);

  // Exact Lightswind UI fluid wave distance calculation for desktop
  const mouseDist = useTransform(mouseX, (p: number) => {
    if (typeof p !== "number" || isNaN(p)) return 0;
    const rect = ref.current?.getBoundingClientRect() ?? { x: 0 };
    return p - rect.x - baseItemSize / 2;
  });

  const widthSync = useTransform(
    mouseDist,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize]
  );

  const itemWidth = useSpring(widthSync, spring);

  return (
    <motion.div
      ref={ref}
      style={{
        width: itemWidth,
        height: itemWidth,
      }}
      onHoverStart={() => hoverValue.set(1)}
      onHoverEnd={() => hoverValue.set(0)}
      onFocus={() => hoverValue.set(1)}
      onBlur={() => hoverValue.set(0)}
      onClick={onClick}
      whileTap={{ scale: 0.92 }}
      tabIndex={0}
      role="button"
      aria-label={label}
      className="liquid-dock-item cursor-pointer"
    >
      <div className="flex items-center justify-center pointer-events-none">
        {icon}
      </div>

      {badgeCount !== undefined && badgeCount > 0 && (
        <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-red-500 rounded-full">
          {badgeCount > 99 ? "99+" : badgeCount}
        </span>
      )}

      {/* Fluid tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.92 }}
            transition={{ duration: 0.16 }}
            className="liquid-dock-tooltip"
            role="tooltip"
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const FloatingDock: React.FC<FloatingDockProps> = ({
  items,
  className = "",
  panelHeight = 56,
  dockHeight = 256,
  baseItemSize = 44,
  magnification = 68,
  distance = 180,
}) => {
  const [activeTab, setActiveTab] = useState<string>("hero");

  // Track active section on scroll for mobile app tab highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = [
        "hero",
        "about",
        "services",
        "projects",
        "career",
        "education",
        "testimonials",
        "contact",
      ];
      const scrollPosition = window.scrollY + 220;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveTab(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Desktop Liquid Wave Motion Values
  const mouseX = useMotionValue(Infinity);
  const isDockHovered = useMotionValue(0);

  const spring = { mass: 0.1, stiffness: 150, damping: 12 };
  const maxHoverHeight = useMemo(
    () => Math.max(dockHeight, magnification + magnification / 2 + 4),
    [magnification, dockHeight]
  );

  const dynamicHeight = useSpring(
    useTransform(isDockHovered, [0, 1], [panelHeight, maxHoverHeight]),
    spring
  );

  return (
    <>
      {/* 📱 MOBILE VIEW: Native Mobile App Bottom Navigation Bar */}
      <div
        style={{
          zIndex: 99999,
          backgroundColor: "var(--dock-bg)",
          borderColor: "var(--border-color)",
        }}
        className="flex md:hidden w-full backdrop-blur-xl border-t shadow-[0_-4px_25px_rgba(0,0,0,0.08)] pb-[max(0.6rem,env(safe-area-inset-bottom))] pt-1.5 px-1 select-none"
      >
        <nav className="flex items-center justify-around w-full max-w-lg mx-auto" aria-label="Mobile Navigation">
          {items.map((item, idx) => {
            const itemId = item.id || item.label.toLowerCase();
            const isActive = activeTab === itemId || (itemId === "testimonials" && activeTab === "testimonials");

            return (
              <button
                key={idx}
                onClick={item.onClick}
                className="flex-1 flex flex-col items-center justify-center py-1 px-0.5 relative group transition-transform active:scale-90 cursor-pointer focus:outline-none"
                aria-label={item.label}
              >
                <div
                  className={`w-10 h-7 rounded-xl flex items-center justify-center transition-all duration-200 relative ${
                    isActive
                      ? "bg-[var(--section-color)] text-[var(--primary-color)] shadow-xs"
                      : "text-muted-foreground hover:text-[var(--primary-color)]"
                  }`}
                  style={{
                    color: isActive ? "var(--primary-color)" : undefined,
                  }}
                >
                  {item.icon}
                  {item.badgeCount !== undefined && item.badgeCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex items-center justify-center w-3.5 h-3.5 text-[9px] font-bold text-white bg-red-500 rounded-full">
                      {item.badgeCount}
                    </span>
                  )}
                </div>
                <span
                  className={`text-[9px] leading-tight tracking-tight mt-0.5 truncate max-w-[46px] transition-colors duration-200 ${
                    isActive
                      ? "font-bold text-[var(--primary-color)]"
                      : "font-medium text-muted-foreground"
                  }`}
                  style={{
                    color: isActive ? "var(--primary-color)" : undefined,
                  }}
                >
                  {item.shortLabel || item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="mobileActiveDot"
                    className="w-1.5 h-1.5 rounded-full mt-0.5"
                    style={{ backgroundColor: "var(--primary-color)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* 💻 DESKTOP VIEW: Liquid Magnification macOS Dock (UNCHANGED) */}
      <motion.div
        style={{ height: dynamicHeight }}
        className="hidden md:flex mx-2 max-w-full items-end justify-center select-none"
      >
        <div
          onMouseMove={(e) => {
            isDockHovered.set(1);
            mouseX.set(e.pageX);
          }}
          onMouseLeave={() => {
            isDockHovered.set(0);
            mouseX.set(Infinity);
          }}
          style={{ height: panelHeight }}
          role="toolbar"
          aria-label="Application dock"
          className={`liquid-dock-wrapper ${className}`}
        >
          <div className="liquid-dock-cavity">
            {items.map((item, idx) => (
              <DockItem
                key={idx}
                icon={item.icon}
                label={item.label}
                onClick={item.onClick}
                mouseX={mouseX}
                baseItemSize={baseItemSize}
                magnification={magnification}
                distance={distance}
                spring={spring}
                badgeCount={item.badgeCount}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};
