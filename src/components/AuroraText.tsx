import React from "react";
import { cn } from "../lib/utils";

interface AuroraTextProps {
  text: string;
  className?: string;
  textClassName?: string;
  fontSize?: string;
  colors?: {
    first?: string;
    second?: string;
    third?: string;
    fourth?: string;
  };
  blurAmount?: string;
  animationSpeed?: {
    border?: number;
    first?: number;
    second?: number;
    third?: number;
    fourth?: number;
  };
}

export const AuroraText: React.FC<AuroraTextProps> = ({
  text,
  className,
  textClassName,
  fontSize = "clamp(3rem, 6.5vw, 5.5rem)",
}) => {
  return (
    <div className={cn("relative inline-block select-none", className)}>
      <style>{`
        @keyframes aurora-text-shimmer {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .aurora-clipped-text {
          background-image: linear-gradient(
            110deg,
            #0284c7 0%,
            #0ea5e9 16%,
            #06b6d4 30%,
            #22d3ee 44%,
            #a5f3fc 54%,
            #fef08a 65%,
            #facc15 78%,
            #eab308 90%,
            #0284c7 100%
          );
          background-size: 260% 100%;
          animation: aurora-text-shimmer 7s ease-in-out infinite;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          display: inline-block;
        }
      `}</style>
      <h2
        className={cn(
          "font-extrabold tracking-tight leading-none pb-2 aurora-clipped-text",
          textClassName
        )}
        style={{ fontSize }}
      >
        {text}
      </h2>
    </div>
  );
};
