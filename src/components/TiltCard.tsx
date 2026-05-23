import { useRef, useState } from "react";
import Tilt from "react-parallax-tilt";
import { useReducedMotion } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  /** Tilt max degrees (default 6). */
  max?: number;
  /** Show cursor-following sheen overlay. */
  glare?: boolean;
}

/**
 * 3D-tilt card with cursor-following light sheen.
 * Falls back to a plain div under reduced-motion.
 */
export function TiltCard({
  children,
  className = "",
  max = 6,
  glare = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const reduced = useReducedMotion();

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Tilt
      tiltMaxAngleX={max}
      tiltMaxAngleY={max}
      perspective={1100}
      transitionSpeed={1400}
      glareEnable={false}
      gyroscope={false}
      tiltReverse={false}
      scale={1.012}
      className={className}
    >
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
        {glare && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle at ${pos.x}% ${pos.y}%, color-mix(in oklab, var(--color-accent) 22%, transparent), transparent 55%)`,
              mixBlendMode: "screen",
            }}
          />
        )}
      </div>
    </Tilt>
  );
}
