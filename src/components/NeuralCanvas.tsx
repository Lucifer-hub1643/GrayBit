import { useEffect, useRef } from "react";

interface NeuralNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  phase: number; // for pulsing rings
  activation: number; // 0-1 glow intensity
  activationDecay: number;
}

interface Pulse {
  fromIdx: number;
  toIdx: number;
  t: number; // 0 → 1 progress
  speed: number;
}

const NODE_COUNT = 90;
const CONNECTION_DIST = 170;
const MAX_PULSES = 50;
const PULSE_SPAWN_RATE = 0.018; // chance per frame per connection
const BASE_SPEED = 0.25;
const MOUSE_RADIUS = 140;
const MOUSE_FORCE = 0.012;

// Accent color: matches new --accent oklch(0.62 0.24 258) — electric blue ≈ #3d7eff
const ACCENT_R = 61;
const ACCENT_G = 126;
const ACCENT_B = 255;

function rgba(r: number, g: number, b: number, a: number) {
  return `rgba(${r},${g},${b},${a})`;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function NeuralCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const nodesRef = useRef<NeuralNode[]>([]);
  const pulsesRef = useRef<Pulse[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const scrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ─── Resize handler ───────────────────────────────────────────────────
    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx!.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    function initNodes() {
      if (!canvas) return;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      nodesRef.current = Array.from({ length: NODE_COUNT }, () => {
        const angle = Math.random() * Math.PI * 2;
        const speed = (Math.random() * 0.6 + 0.4) * BASE_SPEED;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r: Math.random() * 1.8 + 1.2,
          phase: Math.random() * Math.PI * 2,
          activation: Math.random() * 0.3,
          activationDecay: Math.random() * 0.004 + 0.002,
        };
      });
      pulsesRef.current = [];
    }

    resize();
    initNodes();

    const ro = new ResizeObserver(() => {
      resize();
      initNodes();
    });
    ro.observe(canvas);

    // ─── Mouse tracking ───────────────────────────────────────────────────
    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
    function onMouseLeave() {
      mouseRef.current = { x: -9999, y: -9999 };
    }
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    // ─── Scroll tracking ─────────────────────────────────────────────────
    function onScroll() {
      scrollRef.current = window.scrollY;
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    // ─── Draw loop ────────────────────────────────────────────────────────
    let frame = 0;
    function draw() {
      if (!canvas || !ctx) return;
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;

      ctx.clearRect(0, 0, W, H);

      const nodes = nodesRef.current;
      const pulses = pulsesRef.current;
      const mouse = mouseRef.current;
      const scrollProgress = Math.min(scrollRef.current / (H * 0.8), 1);

      frame++;

      // ── Update nodes ──────────────────────────────────────────────────
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.phase += 0.018;

        // Mouse attraction
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (1 - dist / MOUSE_RADIUS) * MOUSE_FORCE;
          n.vx += (dx / dist) * force;
          n.vy += (dy / dist) * force;
          n.activation = Math.min(1, n.activation + 0.04);
        }

        // Scroll-triggered activation wave
        const normalizedY = n.y / H;
        const wavePos = scrollProgress;
        const waveDist = Math.abs(normalizedY - wavePos);
        if (waveDist < 0.15) {
          n.activation = Math.min(1, n.activation + 0.06 * (1 - waveDist / 0.15));
        }

        // Decay
        n.activation = Math.max(0.05, n.activation - n.activationDecay);

        // Brownian noise
        n.vx += (Math.random() - 0.5) * 0.04;
        n.vy += (Math.random() - 0.5) * 0.04;

        // Velocity cap
        const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
        if (speed > BASE_SPEED * 2.5) {
          n.vx = (n.vx / speed) * BASE_SPEED * 2.5;
          n.vy = (n.vy / speed) * BASE_SPEED * 2.5;
        }

        n.x += n.vx;
        n.y += n.vy;

        // Wrap at edges
        if (n.x < -20) n.x = W + 20;
        if (n.x > W + 20) n.x = -20;
        if (n.y < -20) n.y = H + 20;
        if (n.y > H + 20) n.y = -20;
      }

      // ── Draw connections + spawn pulses ──────────────────────────────
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > CONNECTION_DIST) continue;

          const proximity = 1 - dist / CONNECTION_DIST;
          const avgActivation = (a.activation + b.activation) / 2;
          const lineAlpha = proximity * proximity * 0.18 * (0.5 + avgActivation * 0.5);

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = rgba(ACCENT_R, ACCENT_G, ACCENT_B, lineAlpha);
          ctx.lineWidth = 0.6 + proximity * 0.8;
          ctx.stroke();

          // Spawn pulse on this connection
          if (
            pulses.length < MAX_PULSES &&
            Math.random() < PULSE_SPAWN_RATE * proximity * (0.3 + avgActivation)
          ) {
            pulses.push({
              fromIdx: Math.random() < 0.5 ? i : j,
              toIdx: Math.random() < 0.5 ? j : i,
              t: 0,
              speed: Math.random() * 0.008 + 0.004,
            });
          }
        }
      }

      // ── Draw nodes ───────────────────────────────────────────────────
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const glow = n.activation;
        const pulseRing = (Math.sin(n.phase) + 1) / 2; // 0-1

        // Outer glow
        if (glow > 0.15) {
          const glowGrad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 8 * glow);
          glowGrad.addColorStop(0, rgba(ACCENT_R, ACCENT_G, ACCENT_B, glow * 0.35));
          glowGrad.addColorStop(1, rgba(ACCENT_R, ACCENT_G, ACCENT_B, 0));
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 8 * glow, 0, Math.PI * 2);
          ctx.fillStyle = glowGrad;
          ctx.fill();
        }

        // Expanding ring
        const ringRadius = n.r + pulseRing * 6;
        const ringAlpha = (1 - pulseRing) * 0.3 * glow;
        if (ringAlpha > 0.01) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, ringRadius, 0, Math.PI * 2);
          ctx.strokeStyle = rgba(ACCENT_R, ACCENT_G, ACCENT_B, ringAlpha);
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }

        // Core dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        const alpha = lerp(0.35, 0.95, glow);
        ctx.fillStyle = rgba(
          lerp(120, ACCENT_R, glow),
          lerp(160, ACCENT_G, glow),
          lerp(200, ACCENT_B, glow),
          alpha
        );
        ctx.fill();
      }

      // ── Draw & update pulses ──────────────────────────────────────────
      const livePulses: Pulse[] = [];
      for (const p of pulses) {
        const from = nodes[p.fromIdx];
        const to = nodes[p.toIdx];
        if (!from || !to) continue;

        p.t += p.speed;
        if (p.t >= 1) {
          // Activate destination node
          to.activation = Math.min(1, to.activation + 0.5);
          continue; // drop pulse
        }
        livePulses.push(p);

        const px = lerp(from.x, to.x, p.t);
        const py = lerp(from.y, to.y, p.t);

        // Trailing glow
        const trailGrad = ctx.createRadialGradient(px, py, 0, px, py, 5);
        trailGrad.addColorStop(0, rgba(255, 245, 255, 0.9));
        trailGrad.addColorStop(0.4, rgba(ACCENT_R, ACCENT_G, ACCENT_B, 0.6));
        trailGrad.addColorStop(1, rgba(ACCENT_R, ACCENT_G, ACCENT_B, 0));
        ctx.beginPath();
        ctx.arc(px, py, 5, 0, Math.PI * 2);
        ctx.fillStyle = trailGrad;
        ctx.fill();

        // Bright core
        ctx.beginPath();
        ctx.arc(px, py, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = rgba(240, 252, 255, 0.95);
        ctx.fill();
      }
      pulsesRef.current = livePulses;

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ opacity: 0.65 }}
      aria-hidden="true"
    />
  );
}
