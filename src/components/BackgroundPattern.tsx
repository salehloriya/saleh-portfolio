import React, { useId } from "react";
import { cn } from "../lib/utils";

interface BackgroundPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  cx?: number;
  cy?: number;
  cr?: number;
  className?: string;
  glow?: boolean;
}

export const BackgroundPattern: React.FC<BackgroundPatternProps> = ({
  width = 28,
  height = 28,
  x = 0,
  y = 0,
  cx = 14,
  cy = 14,
  cr = 1.2,
  className,
  glow = true,
  ...props
}) => {
  const id = useId();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <svg
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 h-full w-full [mask-image:radial-gradient(ellipse_at_center,white_60%,transparent_90%)]",
          className
        )}
        {...props}
      >
        <defs>
          <pattern
            id={id}
            width={width}
            height={height}
            patternUnits="userSpaceOnUse"
            patternTransform={`translate(${x} ${y})`}
          >
            <circle cx={cx} cy={cy} r={cr} fill="var(--pattern-dot)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
      </svg>
      {glow && (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] blur-[120px] rounded-full pointer-events-none opacity-80"
          style={{ backgroundColor: "var(--section-color)" }}
        />
      )}
    </div>
  );
};
