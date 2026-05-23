import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useTransform, animate, useReducedMotion } from "framer-motion";

interface CounterProps {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  /** decimals shown */
  decimals?: number;
}

/**
 * Number counter that animates up from 0 to `to` when scrolled into view.
 */
export function Counter({
  to,
  suffix = "",
  prefix = "",
  duration = 1.6,
  className = "",
  decimals = 0,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduced = useReducedMotion();
  const mv = useMotionValue(0);
  const display = useTransform(mv, (v) => v.toFixed(decimals));
  const [text, setText] = useState("0");

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setText(to.toFixed(decimals));
      return;
    }
    const controls = animate(mv, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    });
    const unsub = display.on("change", (v) => setText(v));
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, to, duration, reduced, mv, display, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {text}
      {suffix}
    </span>
  );
}
