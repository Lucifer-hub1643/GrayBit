import { useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode[];
  /** Duration of one full loop in seconds. Higher = slower. */
  speed?: number;
  /** Pause on hover. */
  pauseOnHover?: boolean;
  /** Gap between items in tailwind size class (e.g. "gap-16"). */
  gapClass?: string;
  className?: string;
}

/**
 * Infinite marquee with edge-fade mask and optional pause on hover.
 * Children are duplicated for seamless loop.
 */
export function Marquee({
  children,
  speed = 38,
  pauseOnHover = true,
  gapClass = "gap-16",
  className = "",
}: MarqueeProps) {
  const reduced = useReducedMotion();
  const items = [...children, ...children];

  return (
    <div
      className={`group relative overflow-hidden ${className}`}
      style={{
        WebkitMaskImage:
          "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
        maskImage:
          "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <div
        className={`flex items-center ${gapClass} whitespace-nowrap select-none`}
        style={{
          animation: reduced ? undefined : `marquee ${speed}s linear infinite`,
          animationPlayState: pauseOnHover ? undefined : "running",
        }}
        onMouseEnter={(e) => {
          if (pauseOnHover && !reduced) {
            (e.currentTarget as HTMLDivElement).style.animationPlayState = "paused";
          }
        }}
        onMouseLeave={(e) => {
          if (pauseOnHover && !reduced) {
            (e.currentTarget as HTMLDivElement).style.animationPlayState = "running";
          }
        }}
      >
        {items.map((c, i) => (
          <div key={i} className="shrink-0">
            {c}
          </div>
        ))}
      </div>
    </div>
  );
}
