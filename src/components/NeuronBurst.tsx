import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Click {
  id: number;
  x: number;
  y: number;
}

/**
 * Global click-to-fire synapse burst.
 *
 * Clicking on truly empty page background (no card / panel / form / etc.
 * above the body) fires a short radial pixel burst from the click point:
 *
 *   1. A bright pixel flash at the cursor (the "synapse" firing)
 *   2. An expanding electric-blue ring that fades as it grows
 *   3. ~16 small square pixels shot radially outward, each with a tiny
 *      trail, decelerating and fading
 *
 * Total length ~700ms. GPU-only (transform + opacity). Hard-capped at a
 * handful of concurrent bursts so spamming clicks can't melt the screen.
 *
 * Skipped on touch + when prefers-reduced-motion is set.
 */

const MAX_CONCURRENT = 6;

export function NeuronBurst() {
  const [clicks, setClicks] = useState<Click[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (isTouch) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    // Cache the page background color once — used to distinguish "truly empty
    // background" from any element that has its own background (cards, sections,
    // form surfaces, etc).
    const pageBg = window.getComputedStyle(document.body).backgroundColor;

    function isOnEmptyBackground(target: HTMLElement): boolean {
      let el: HTMLElement | null = target;
      while (el && el !== document.body && el !== document.documentElement) {
        const bg = window.getComputedStyle(el).backgroundColor;
        if (
          bg &&
          bg !== "rgba(0, 0, 0, 0)" &&
          bg !== "transparent" &&
          bg !== pageBg
        ) {
          return false;
        }
        if (el.dataset && el.dataset.noNeuron !== undefined) {
          return false;
        }
        el = el.parentElement;
      }
      return true;
    }

    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (
        target.closest(
          'a, button, input, textarea, select, [role="button"], [contenteditable="true"], label',
        )
      ) {
        return;
      }

      if (!isOnEmptyBackground(target)) {
        return;
      }

      const c: Click = { id: idRef.current++, x: e.clientX, y: e.clientY };
      setClicks((prev) => {
        // Drop the oldest if we hit the concurrency cap.
        const next = prev.length >= MAX_CONCURRENT ? prev.slice(1) : prev;
        return [...next, c];
      });

      // Let the burst fully linger before tearing down the DOM nodes.
      window.setTimeout(() => {
        setClicks((prev) => prev.filter((p) => p.id !== c.id));
      }, 3200);
    }

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9998] overflow-hidden"
      aria-hidden
    >
      {clicks.map((c) => (
        <SynapseBurst key={c.id} x={c.x} y={c.y} />
      ))}
    </div>
  );
}

/* ─── One burst: flash + ring + radial pixel particles ────────────────── */

function SynapseBurst({ x, y }: { x: number; y: number }) {
  const particles = useMemo(() => {
    const COUNT = 18;
    return Array.from({ length: COUNT }, (_, i) => {
      // Evenly distribute angles, jitter slightly so it doesn't look mechanical.
      const baseAngle = (i / COUNT) * Math.PI * 2;
      const angle = baseAngle + (Math.random() - 0.5) * 0.35;
      const distance = 90 + Math.random() * 70; // 90-160px outward
      return {
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance,
        size: Math.random() < 0.35 ? 3 : 2, // mostly tiny, occasional 3px chunk
        duration: 2.0 + Math.random() * 0.6, // long, lingering fade
      };
    });
  }, []);

  return (
    <>
      {/* Persistent residual glow that lingers at the click point */}
      <motion.span
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: [0.4, 1, 1.1], opacity: [0, 0.55, 0] }}
        transition={{
          duration: 2.6,
          ease: "easeOut",
          times: [0, 0.18, 1],
        }}
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: x,
          top: y,
          width: 70,
          height: 70,
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-accent) 70%, transparent) 0%, transparent 70%)",
        }}
      />

      {/* 2. Expanding ring — gives the burst weight, lingers as it grows */}
      <motion.span
        initial={{ scale: 0, opacity: 0.9 }}
        animate={{ scale: [0, 1, 1.35], opacity: [0.9, 0.45, 0] }}
        transition={{
          duration: 1.8,
          ease: [0.16, 1, 0.3, 1],
          times: [0, 0.45, 1],
        }}
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent"
        style={{
          left: x,
          top: y,
          width: 180,
          height: 180,
          boxShadow:
            "0 0 18px 1px color-mix(in oklab, var(--color-accent) 55%, transparent)",
        }}
      />

      {/* 2b. Second, smaller ring offset slightly for depth */}
      <motion.span
        initial={{ scale: 0, opacity: 0.7 }}
        animate={{ scale: [0, 1, 1.25], opacity: [0.7, 0.3, 0] }}
        transition={{
          duration: 1.4,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.06,
          times: [0, 0.5, 1],
        }}
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40"
        style={{
          left: x,
          top: y,
          width: 100,
          height: 100,
        }}
      />

      {/* 3. Radial pixel particles — travel out fast, then hang and fade slowly */}
      {particles.map((p, i) => (
        <motion.span
          key={i}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: [0, p.dx, p.dx * 1.08],
            y: [0, p.dy, p.dy * 1.08],
            opacity: [1, 1, 0],
            scale: [1, 0.85, 0.35],
          }}
          transition={{
            duration: p.duration,
            ease: [0.16, 1, 0.3, 1],
            times: [0, 0.32, 1], // reach end fast, then linger + fade
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{
            left: x,
            top: y,
            width: p.size,
            height: p.size,
            background: "var(--color-accent)",
            boxShadow: `0 0 ${p.size * 3}px var(--color-accent)`,
          }}
        />
      ))}
    </>
  );
}
