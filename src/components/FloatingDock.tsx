import React, { useRef, useState, useMemo, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";

export interface DockItemData {
  icon: React.ReactNode;
  label: string;
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

  // Exact Lightswind UI fluid wave distance calculation
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
      className="liquid-dock-item"
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
  multiBorder = true,
}) => {
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
    <motion.div
      style={{ height: dynamicHeight }}
      className="mx-2 flex max-w-full items-end justify-center select-none"
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
  );
};
