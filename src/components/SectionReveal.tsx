import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Direction the element travels from. */
  direction?: "up" | "left" | "right" | "scale" | "none";
  /** Pixel offset for translates. */
  distance?: number;
  /** IntersectionObserver threshold proxy. */
  threshold?: number;
}

/**
 * Drop-in replacement for ScrollReveal. Uses framer-motion's whileInView
 * with spring physics for cleaner perf and feel.
 */
export function SectionReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 28,
  threshold: _threshold = 0.15,
}: SectionRevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  const initial: Record<string, number> = { opacity: 0 };
  if (direction === "up") initial.y = distance;
  if (direction === "left") initial.x = -distance;
  if (direction === "right") initial.x = distance;
  if (direction === "scale") initial.scale = 0.94;

  const animate: Record<string, number> = { opacity: 1 };
  if (direction === "up") animate.y = 0;
  if (direction === "left" || direction === "right") animate.x = 0;
  if (direction === "scale") animate.scale = 1;

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: delay / 1000,
      }}
    >
      {children}
    </motion.div>
  );
}
