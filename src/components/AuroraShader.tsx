/**
 * Lightweight CSS-driven aurora gradient background.
 * No WebGL — three layered radial gradients with a slow drift animation
 * give the depth of a shader at ~zero cost. Sits behind the hero content.
 */
export function AuroraShader({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Three drifting blue ellipses */}
      <div
        className="absolute -inset-[20%] animate-aurora"
        style={{
          background: `
            radial-gradient(closest-side at 22% 38%, color-mix(in oklab, var(--color-accent) 28%, transparent), transparent 60%),
            radial-gradient(closest-side at 78% 28%, color-mix(in oklab, var(--color-accent-glow) 22%, transparent), transparent 60%),
            radial-gradient(closest-side at 50% 78%, color-mix(in oklab, var(--color-accent) 16%, transparent), transparent 60%)
          `,
          filter: "blur(60px) saturate(120%)",
          opacity: 0.85,
        }}
      />
      {/* Second slower layer for parallax depth */}
      <div
        className="absolute -inset-[15%] animate-aurora"
        style={{
          background: `
            radial-gradient(closest-side at 65% 65%, color-mix(in oklab, var(--color-accent) 12%, transparent), transparent 55%),
            radial-gradient(closest-side at 30% 80%, color-mix(in oklab, var(--color-accent-glow) 10%, transparent), transparent 55%)
          `,
          filter: "blur(80px)",
          animationDuration: "32s",
          animationDirection: "reverse",
          opacity: 0.7,
        }}
      />
      {/* Dark vignette so content stays readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 40%, var(--color-background) 100%)",
        }}
      />
    </div>
  );
}
