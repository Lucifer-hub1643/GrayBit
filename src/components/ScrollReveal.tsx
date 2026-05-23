import { SectionReveal } from "./SectionReveal";
import type { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale" | "none";
  threshold?: number;
  once?: boolean;
}

/**
 * Legacy alias for SectionReveal — kept so existing call sites keep working.
 * New code should import SectionReveal directly.
 */
export function ScrollReveal({
  children,
  className,
  delay,
  direction,
  threshold,
}: ScrollRevealProps) {
  return (
    <SectionReveal
      className={className}
      delay={delay}
      direction={direction}
      threshold={threshold}
    >
      {children}
    </SectionReveal>
  );
}

/**
 * Stagger wrapper kept for back-compat — wraps each child with incrementing delay.
 */
export function StaggerReveal({
  children,
  className = "",
  baseDelay = 0,
  staggerMs = 100,
  direction = "up",
}: {
  children: ReactNode[];
  className?: string;
  baseDelay?: number;
  staggerMs?: number;
  direction?: "up" | "left" | "right" | "scale" | "none";
}) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <SectionReveal
          key={i}
          delay={baseDelay + i * staggerMs}
          direction={direction}
        >
          {child}
        </SectionReveal>
      ))}
    </div>
  );
}
