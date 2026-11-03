import React, { useRef, useState, useCallback, useEffect } from "react";
import { cn } from "../lib/utils";

interface LanyardBadgeProps {
  name?: string;
  role?: string;
  badgeId?: string;
  image?: string;
  accentColor?: string;
  ropeLength?: number;
  ropeColor?: string;
  cardWidth?: string;
  children?: React.ReactNode;
}

const uA = 0;
const fA = 0.92;
const dA = 3000;
const Mg = 1;

const StrapSVG = ({ length = 75, color = "#27272a" }: { length: number; color: string }) => {
  const l = length;
  const r = length + 10;
  const c = length + 18;

  return (
    <svg
      width="44"
      height={length + 38}
      viewBox={`0 0 44 ${length + 38}`}
      style={{
        display: "block",
        margin: "0 auto",
        overflow: "visible",
      }}
    >
      <defs>
        <linearGradient id="metalDark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#71717a" />
          <stop offset="35%" stopColor="#27272a" />
          <stop offset="70%" stopColor="#52525b" />
          <stop offset="100%" stopColor="#18181b" />
        </linearGradient>
        <linearGradient id="hookDark" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#52525b" />
          <stop offset="40%" stopColor="#18181b" />
          <stop offset="100%" stopColor="#3f3f46" />
        </linearGradient>
        <linearGradient id="strapHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.45" />
          <stop offset="25%" stopColor="#ffffff" stopOpacity="0.12" />
          <stop offset="75%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <rect x="12" y="0" width="20" height={l + 4} rx="2" fill={color || "#18181b"} />
      <rect x="12" y="0" width="20" height={l + 4} rx="2" fill="url(#strapHighlight)" />
      <line
        x1="13.5"
        y1="0"
        x2="13.5"
        y2={l + 4}
        stroke="#ffffff"
        strokeOpacity="0.15"
        strokeWidth="0.75"
        strokeDasharray="3 2"
      />
      <line
        x1="30.5"
        y1="0"
        x2="30.5"
        y2={l + 4}
        stroke="#ffffff"
        strokeOpacity="0.15"
        strokeWidth="0.75"
        strokeDasharray="3 2"
      />
      <rect
        x="10"
        y={l}
        width="24"
        height="10"
        rx="2.5"
        fill="url(#metalDark)"
        stroke="#18181b"
        strokeWidth="0.8"
      />
      <circle cx="13.5" cy={l + 5} r="1.3" fill="#a1a1aa" />
      <circle cx="30.5" cy={l + 5} r="1.3" fill="#a1a1aa" />
      <path
        d={`M 15 ${l + 9} C 15 ${r + 6}, 29 ${r + 6}, 29 ${l + 9}`}
        fill="none"
        stroke="url(#metalDark)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <rect x="19" y={r + 2} width="6" height="6" rx="1" fill="url(#metalDark)" />
      <path
        d={`M 20 ${r + 7} L 20 ${c + 6} C 20 ${c + 15}, 24 ${c + 15}, 24 ${c + 6} L 24 ${r + 7}`}
        fill="none"
        stroke="url(#hookDark)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <line
        x1="20.5"
        y1={c + 1}
        x2="20.5"
        y2={c + 10}
        stroke="#d4d4d8"
        strokeWidth="1.2"
      />
    </svg>
  );
};

export const LanyardBadge: React.FC<LanyardBadgeProps> = ({
  children,
  ropeLength = 75,
  ropeColor = "#27272a",
  name = "Saleh Loriya",
  role = "Full-Stack Developer",
  badgeId = "SJ-2026-DEV",
  image = "/profile-new.jpg",
  accentColor = "#8b5cf6",
  cardWidth = "w-72 sm:w-80 md:w-84",
}) => {
  const physics = useRef({ angle: 0, vel: 0 });
  const animFrame = useRef<number | null>(null);
  const lastTime = useRef<number | null>(null);
  const prevAngle = useRef(0);
  const isDragging = useRef(false);
  const [angle, setAngle] = useState(0);
  const [tiltY, setTiltY] = useState(0);
  const [tiltX, setTiltX] = useState(0);
  const startX = useRef(0);
  const startAngle = useRef(0);

  const simulate = useCallback(
    (time: number) => {
      if (lastTime.current === null) lastTime.current = time;
      const dt = Math.min((time - lastTime.current) / 1000, 0.05);
      lastTime.current = time;

      const p = physics.current;
      if (isDragging.current) {
        if (dt > 0) {
          p.vel = (p.angle - prevAngle.current) / dt;
        }
        prevAngle.current = p.angle;
        animFrame.current = requestAnimationFrame(simulate);
      } else {
        const wt = ropeLength + 100;
        const accel =
          -(dA / wt) * Math.sin(p.angle) -
          (fA / Mg) * p.vel -
          (uA / Mg) * p.angle;
        p.vel += accel * dt;
        p.angle += p.vel * dt;
        setAngle(p.angle);

        // Smoothly decay tilt angles
        setTiltY((prev) => prev * 0.94);
        setTiltX((prev) => prev * 0.94);

        if (Math.abs(p.angle) > 0.001 || Math.abs(p.vel) > 0.001) {
          animFrame.current = requestAnimationFrame(simulate);
        } else {
          p.angle = 0;
          p.vel = 0;
          setAngle(0);
          setTiltY(0);
          setTiltX(0);
        }
      }
    },
    [ropeLength]
  );

  const startAnimation = useCallback(() => {
    if (animFrame.current) cancelAnimationFrame(animFrame.current);
    lastTime.current = null;
    animFrame.current = requestAnimationFrame(simulate);
  }, [simulate]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      isDragging.current = true;
      startX.current = e.clientX;
      startAngle.current = physics.current.angle;
      prevAngle.current = physics.current.angle;
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
      lastTime.current = null;
      animFrame.current = requestAnimationFrame(simulate);
    },
    [simulate]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging.current) return;
      const deltaX = e.clientX - startX.current;
      const wt = ropeLength + 100;
      const newAngle = startAngle.current - deltaX / wt;
      const clamped = Math.max(-1.4, Math.min(1.4, newAngle));
      physics.current.angle = clamped;
      setAngle(clamped);

      // Add 3D rotation based on drag movement
      const rotY = Math.max(-35, Math.min(35, -deltaX * 0.25));
      setTiltY(rotY);
    },
    [ropeLength]
  );

  const onPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.releasePointerCapture(e.pointerId);
    isDragging.current = false;
  }, []);

  const onClick = useCallback(() => {
    if (
      Math.abs(physics.current.vel) < 0.1 &&
      Math.abs(physics.current.angle) < 0.05
    ) {
      physics.current.vel = 4.5;
      setTiltY(25);
      startAnimation();
    }
  }, [startAnimation]);

  useEffect(() => {
    return () => {
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, []);

  const deg = angle * (180 / Math.PI);

  return (
    <div
      className="flex flex-col items-center select-none"
      style={{ touchAction: "none", perspective: 1200 }}
    >
      {/* Top mounting pin */}
      <div className="w-3.5 h-3.5 rounded-full shadow-md z-10 relative bg-zinc-900 border border-zinc-700" />

      {/* Swinging & tilting assembly */}
      <div
        className="flex flex-col items-center cursor-grab active:cursor-grabbing transition-transform duration-75"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onClick={onClick}
        style={{
          transform: `rotate(${deg}deg) rotateY(${tiltY}deg) rotateX(${tiltX}deg)`,
          transformOrigin: "top center",
          transformStyle: "preserve-3d",
          willChange: "transform",
          marginTop: "-6px",
        }}
      >
        <div style={{ pointerEvents: "none" }}>
          <StrapSVG length={ropeLength} color={ropeColor} />
        </div>

        {/* Card Body */}
        <div
          className={cn(
            "relative rounded-[1.75rem] overflow-hidden shadow-2xl border border-foreground/15 dark:border-white/15 bg-card pointer-events-none mt-[-16px]",
            cardWidth
          )}
          style={{
            transformStyle: "preserve-3d",
            boxShadow:
              "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 35px -5px rgba(139, 92, 246, 0.25)",
          }}
        >
          {/* Lanyard punch hole cutout */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
            <div className="w-9 h-2.5 rounded-full bg-black/70 dark:bg-black/90 border border-white/30 shadow-inner flex items-center justify-center">
              <div className="w-7 h-1 rounded-full bg-zinc-950 opacity-90" />
            </div>
          </div>

          {children ?? (
            <div className="flex flex-col h-full bg-card w-full">
              {/* Header Gradient */}
              <div className="relative px-5 pt-7 pb-6 flex flex-col items-center bg-gradient-to-br from-purple-700 via-primary to-indigo-950 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

                {/* Avatar with gradient ring */}
                <div className="mt-1 relative w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-cyan-400 via-primary to-purple-400 backdrop-blur-md shadow-2xl border border-white/50 overflow-hidden group">
                  <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover rounded-full filter contrast-105"
                    loading="eager"
                  />
                </div>
              </div>

              {/* Card Details */}
              <div className="p-5 flex flex-col items-center text-center bg-card text-card-foreground flex-1 gap-3">
                <div>
                  <h3 className="text-xl font-extrabold tracking-tight text-foreground">
                    {name}
                  </h3>
                  <div className="inline-flex items-center gap-1.5 mt-1 px-3 py-0.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-semibold">
                    <span>{role}</span>
                  </div>
                </div>

                <div className="w-full border-t border-border/60 my-0.5" />

                {/* 2x2 Info Grid */}
                <div className="grid grid-cols-2 gap-2.5 w-full text-left bg-muted/40 p-3 rounded-xl border border-border/50">
                  <div>
                    <span className="text-muted-foreground block text-[9px] uppercase tracking-widest font-bold">
                      Specialty
                    </span>
                    <span className="font-bold text-foreground text-xs">
                      Web • Mobile • App
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[9px] uppercase tracking-widest font-bold">
                      Location
                    </span>
                    <span className="font-bold text-foreground text-xs">
                      Gujarat, India
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[9px] uppercase tracking-widest font-bold">
                      Experience
                    </span>
                    <span className="font-bold text-foreground text-xs">
                      MERN & App Dev
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[9px] uppercase tracking-widest font-bold">
                      Status
                    </span>
                    <span className="font-bold text-emerald-500 text-xs flex items-center gap-1">
                      ● Available
                    </span>
                  </div>
                </div>

                {/* Barcode & Footer */}
                <div className="flex flex-col items-center mt-1 w-full gap-1">
                  <div className="flex gap-[2.5px] items-end h-7 px-3 py-0.5 bg-white/90 dark:bg-black/40 rounded-lg border border-border/40 w-full justify-center">
                    {Array.from({ length: 36 }).map((_, a) => (
                      <div
                        key={a}
                        className="bg-foreground rounded-[1px]"
                        style={{
                          width: a % 4 === 0 ? "3.5px" : a % 2 === 0 ? "2px" : "1px",
                          height: `${50 + Math.sin(a * 1.4) * 45}%`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between w-full px-1 text-[10px]">
                    <span className="font-mono font-bold tracking-widest text-primary">
                      {badgeId}
                    </span>
                    <span className="text-muted-foreground font-semibold text-[9px] uppercase tracking-wider">
                      LIGHTSWIND UI
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <p className="mt-8 text-[11px] text-zinc-400 dark:text-zinc-600 font-medium select-none pointer-events-none animate-pulse">
        Drag or click the card
      </p>
    </div>
  );
};
