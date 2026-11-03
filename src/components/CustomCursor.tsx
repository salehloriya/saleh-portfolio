import React, { useState, useEffect, useRef } from "react";
import { motion, useSpring } from "framer-motion";
import { cn } from "../lib/utils";

interface CustomCursorProps {
  size?: number;
  color?: string;
  className?: string;
  glowEffect?: boolean;
  trailLength?: number;
  showTrail?: boolean;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({
  size = 22,
  color = "#004E7A",
  className,
  glowEffect = true,
  trailLength = 4,
  showTrail = true,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [trail, setTrail] = useState<{ x: number; y: number }[]>([]);

  const posRef = useRef({ x: 0, y: 0 });
  const velRef = useRef({ x: 0, y: 0 });
  const lastTime = useRef(Date.now());
  const curRot = useRef(0);
  const angleAccum = useRef(0);

  const springConfig = { damping: 35, stiffness: 350, mass: 0.8, restDelta: 0.001 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);
  const cursorAngle = useSpring(0, { ...springConfig, damping: 50, stiffness: 250 });
  const cursorScale = useSpring(1, { ...springConfig, stiffness: 450, damping: 30 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const clickableSelector =
      "a, button, [role='button'], input, textarea, select, .cursor-pointer, [data-magnetic]";

    const onMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const dt = now - lastTime.current;
      if (dt > 0) {
        velRef.current = {
          x: (e.clientX - posRef.current.x) / dt,
          y: (e.clientY - posRef.current.y) / dt,
        };
      }
      lastTime.current = now;
      posRef.current = { x: e.clientX, y: e.clientY };

      const target = e.target as HTMLElement | null;
      const isClickable = !!target?.closest(clickableSelector);
      setIsHoveringClickable(isClickable);

      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      if (showTrail && !isClickable) {
        setTrail((prev) => [{ x: e.clientX, y: e.clientY }, ...prev.slice(0, trailLength - 1)]);
      }

      const speed = Math.sqrt(Math.pow(velRef.current.x, 2) + Math.pow(velRef.current.y, 2));
      if (speed > 0.1) {
        const targetDeg = Math.atan2(velRef.current.y, velRef.current.x) * (180 / Math.PI) + 90;
        let diff = targetDeg - curRot.current;
        if (diff > 180) diff -= 360;
        if (diff < -180) diff += 360;
        angleAccum.current += diff;
        cursorAngle.set(angleAccum.current);
        curRot.current = targetDeg;
      }
    };

    const onMouseDown = () => cursorScale.set(0.75);
    const onMouseUp = () => cursorScale.set(1);
    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [cursorX, cursorY, cursorAngle, cursorScale, showTrail, trailLength]);

  if (!isVisible || isHoveringClickable) return null;

  return (
    <>
      {/* Particle trail */}
      {showTrail &&
        trail.map((pt, i) => (
          <motion.div
            key={i}
            style={{
              position: "fixed",
              left: pt.x,
              top: pt.y,
              translateX: "-50%",
              translateY: "-50%",
              zIndex: 9998 - i,
              pointerEvents: "none",
              opacity: ((trailLength - i) / trailLength) * 0.45,
              scale: ((trailLength - i) / trailLength) * 0.7,
            }}
            className="w-2.5 h-2.5 bg-primary rounded-full pointer-events-none"
          />
        ))}

      {/* Main cursor pointer */}
      <motion.div
        style={{
          position: "fixed",
          left: cursorX,
          top: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          rotate: cursorAngle,
          scale: cursorScale,
          zIndex: 9999,
          pointerEvents: "none",
          willChange: "transform",
          filter: glowEffect ? "drop-shadow(0 0 10px rgba(139, 92, 246, 0.6))" : "none",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className={cn("select-none text-primary pointer-events-none hidden md:block", className)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size * 2}
          height={size * 2.16}
          viewBox="0 0 50 54"
          fill="none"
          className="pointer-events-none drop-shadow-md"
        >
          <g>
            <path
              d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z"
              fill={color}
            />
            <path
              d="M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z"
              stroke="#fafafa"
              strokeWidth="1.5"
            />
          </g>
        </svg>
      </motion.div>
    </>
  );
};
