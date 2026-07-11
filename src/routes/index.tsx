import { lazy, Suspense } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Zap, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";

import { SiteLayout } from "@/components/SiteLayout";
import { NeuralCanvas } from "@/components/NeuralCanvas";
import { AuroraShader } from "@/components/AuroraShader";
import { ClientOnly } from "@/components/ClientOnly";
import { SectionReveal } from "@/components/SectionReveal";
import { SplitText } from "@/components/SplitText";
import { Magnetic } from "@/components/Magnetic";
import { TiltCard } from "@/components/TiltCard";
import { Counter } from "@/components/Counter";
import { Marquee } from "@/components/Marquee";
import type { HeroPointer } from "@/components/BrainHero";

import {
  COMPANY,
  SERVICES,
  CASE_STUDIES,
  PROCESS_STEPS,
  CLIENT_LOGOS,
  SHOW_CLIENT_MARQUEE,
} from "@/lib/content";

// Lazy-load the heavy R3F scene; first paint shows NeuralCanvas only.
const BrainHero = lazy(() => import("@/components/BrainHero"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${COMPANY.name} | ${COMPANY.tagline}` },
      { name: "description", content: COMPANY.description },
      { property: "og:title", content: `${COMPANY.name} | ${COMPANY.tagline}` },
      { property: "og:description", content: COMPANY.description },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <SiteLayout>
      <Hero />
      {SHOW_CLIENT_MARQUEE && <ClientMarquee />}
      <ServicesPreview />
      <SelectedWork />
      <ProcessSection />
      <CTASection />
    </SiteLayout>
  );
}

/* ─── HERO ──────────────────────────────────────────────────────────────── */

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const pointerRef = useRef<HeroPointer>({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  // Track pointer across the full hero (including over text/buttons).
  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    function update(clientX: number, clientY: number) {
      const rect = section!.getBoundingClientRect();
      const nx = ((clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((clientY - rect.top) / rect.height) * 2 - 1;
      pointerRef.current = {
        x: Math.max(-1, Math.min(1, nx)),
        y: Math.max(-1, Math.min(1, -ny)),
      };
    }

    function onMove(e: MouseEvent) {
      update(e.clientX, e.clientY);
    }

    function onLeave() {
      pointerRef.current = { x: 0, y: 0 };
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    section.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] flex items-center overflow-hidden"
    >
      {/* Layer 1: Aurora gradient */}
      <AuroraShader />

      {/* Layer 2: Neural canvas — mobile-only fallback where the 3D scene is
          hidden. On md+ the BrainHero renders instead, so we don't pay for
          both at once. */}
      <div className="absolute inset-0 opacity-50 md:hidden">
        <NeuralCanvas className="pointer-events-none" />
      </div>

      {/* Layer 3: 3D brain scene (client only, lazy) */}
      <div className="absolute inset-0 hidden md:block opacity-90">
        <ClientOnly>
          <Suspense fallback={null}>
            <BrainHero pointerRef={pointerRef} />
          </Suspense>
        </ClientOnly>
      </div>

      {/* Layer 4: Pixel grid overlay */}
      <div className="absolute inset-0 pixel-grid opacity-30 pointer-events-none" />

      {/* Layer 5: Bottom fade so it doesn't fight the next section */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none" />

      {/* Content */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 py-24 md:py-32 w-full"
      >
        <div className="max-w-5xl">
          {/* Status badge */}
          {/* Headline */}
          <h1 className="font-display mt-7 text-[2.4rem] sm:text-5xl md:text-6xl lg:text-[4.75rem] font-medium leading-[1.05] tracking-tight">
            <SplitText
              as="span"
              text="Where intelligence becomes"
              split="word"
              stagger={0.07}
              className="block text-silver"
            />
            <SplitText
              as="span"
              text="infrastructure."
              split="word"
              stagger={0.07}
              delay={0.35}
              className="block text-electric"
            />
          </h1>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 text-base md:text-lg text-foreground/70 max-w-xl leading-relaxed"
          >
            {COMPANY.name} builds production-ready AI for serious businesses.
            Fine-tuned LLMs, voice and chat agents, RAG platforms, and the web
            and mobile products that bring them to life.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Magnetic>
              <Link
                to="/contact"
                data-cursor="grow"
                className="btn-accent inline-flex items-center gap-2 px-7 py-4 text-sm"
              >
                Start a project
                <ArrowUpRight className="size-4" />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                to="/work"
                data-cursor="grow"
                className="btn-ghost inline-flex items-center gap-2 px-7 py-4 text-sm font-medium"
              >
                <Sparkles className="size-4 text-accent" />
                See our work
              </Link>
            </Magnetic>
          </motion.div>

          {/* Floating stat strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16 md:mt-20 flex flex-wrap gap-x-12 gap-y-6"
          >
            {[
              { v: 30, suffix: "+", l: "AI systems shipped" },
              { v: 20, suffix: "+", l: "clients worldwide" },
              { v: 5, suffix: "M+", l: "daily inferences" },
            ].map((s) => (
              <div key={s.l} className="flex flex-col">
                <Counter
                  to={s.v}
                  suffix={s.suffix}
                  className="font-display text-3xl md:text-4xl font-light text-electric"
                />
                <span className="mt-1 text-xs text-muted-foreground uppercase tracking-[0.15em]">
                  {s.l}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-muted-foreground/60"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="relative block w-px h-12 overflow-hidden bg-foreground/10">
          <span className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-accent to-transparent animate-[fade-in_1.4s_ease-in-out_infinite_alternate]" />
        </span>
      </motion.div>
    </section>
  );
}

/* ─── CLIENT MARQUEE ───────────────────────────────────────────────────── */

function ClientMarquee() {
  return (
    <section className="py-14 border-y border-border bg-card/30 backdrop-blur-sm">
      <p className="text-center font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground/60 mb-8">
        Trusted by teams building tomorrow's products
      </p>
      <Marquee speed={42}>
        {CLIENT_LOGOS.map((l) => (
          <span
            key={l}
            className="font-display text-lg tracking-[0.35em] text-muted-foreground/40 hover:text-foreground/80 transition-colors duration-300"
          >
            {l}
          </span>
        ))}
      </Marquee>
    </section>
  );
}

/* ─── SERVICES PREVIEW ─────────────────────────────────────────────────── */

function ServicesPreview() {
  return (
    <section className="py-24 md:py-32 px-5 md:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <SectionReveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-4">
              01 / What we do
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight max-w-2xl leading-[1.1]">
              <span className="text-silver">Full-stack AI engineering, </span>
              <span className="text-electric">on demand.</span>
            </h2>
          </div>
          <Magnetic>
            <Link
              to="/services"
              data-cursor="grow"
              className="text-sm font-medium text-muted-foreground border-b border-border pb-1 hover:text-accent hover:border-accent transition-colors duration-200 w-max shrink-0"
            >
              All capabilities →
            </Link>
          </Magnetic>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <SectionReveal key={s.title} delay={i * 60} direction="up">
                <TiltCard className="group h-full">
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    data-cursor="grow"
                    className="block h-full"
                  >
                    <div className="h-full p-7 md:p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 hover:border-accent/30 transition-all duration-300">
                      <div className="mb-7">
                        <span className="inline-flex items-center justify-center size-11 rounded-xl border border-border bg-secondary/50 group-hover:border-accent/40 group-hover:bg-accent/10 transition-all duration-300">
                          <Icon className="size-5 text-muted-foreground group-hover:text-accent transition-colors duration-300" />
                        </span>
                      </div>
                      <h3 className="text-lg md:text-xl font-semibold tracking-tight mb-3 group-hover:text-accent transition-colors duration-300">
                        {s.title}
                      </h3>
                      <p className="text-foreground/70 text-[14.5px] leading-relaxed line-clamp-3">
                        {s.body}
                      </p>
                      <div className="mt-6 flex items-center gap-1 text-xs font-mono text-accent opacity-60 group-hover:opacity-100 group-hover:gap-2 transition-all duration-300">
                        Learn more <ArrowUpRight className="size-3" />
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── SELECTED WORK ────────────────────────────────────────────────────── */

function SelectedWork() {
  return (
    <section className="relative py-24 md:py-32 px-5 md:px-8 border-y border-border bg-card/20">
      <div className="max-w-7xl mx-auto">
        <SectionReveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-4">
              02 / Selected work
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.1]">
              <span className="text-silver">Production </span>
              <span className="text-electric">deployments.</span>
            </h2>
          </div>
          <Magnetic>
            <Link
              to="/work"
              data-cursor="grow"
              className="text-sm font-medium text-muted-foreground border-b border-border pb-1 hover:text-accent hover:border-accent transition-colors duration-200 w-max shrink-0"
            >
              All case studies →
            </Link>
          </Magnetic>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {CASE_STUDIES.slice(0, 3).map((c, i) => (
            <SectionReveal key={c.name} delay={i * 100} direction="up">
              <ParallaxCaseCard study={c} />
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ParallaxCaseCard({ study }: { study: (typeof CASE_STUDIES)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <Link to="/work" className="group block" data-cursor="grow">
      <div
        ref={ref}
        className="aspect-[16/10] rounded-2xl overflow-hidden border border-border bg-card mb-5 relative"
      >
        <motion.img
          src={study.image}
          alt={study.name}
          loading="lazy"
          style={{ y: imgY }}
          className="w-full h-[115%] object-cover scale-110 group-hover:scale-[1.18] transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm border border-accent/40 text-xs font-mono text-accent">
            {study.result}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-start gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-2">
            {study.sector} / {study.year}
          </p>
          <h4 className="text-xl md:text-2xl font-semibold tracking-tight group-hover:text-accent transition-colors duration-200">
            {study.name}
          </h4>
          <p className="text-foreground/85 text-[14px] mt-1.5 leading-snug max-w-md line-clamp-2">
            {study.tagline}
          </p>
          <p className="text-foreground/70 text-[14.5px] mt-2 leading-relaxed max-w-md line-clamp-2">
            {study.blurb}
          </p>
        </div>
        <span className="size-10 shrink-0 grid place-items-center border border-border rounded-full group-hover:bg-accent group-hover:text-background group-hover:border-accent group-hover:rotate-45 transition-all duration-300">
          →
        </span>
      </div>
    </Link>
  );
}

/* ─── PROCESS SECTION (scroll-linked progress line) ────────────────────── */

function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 30%"],
  });
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-24 md:py-32 px-5 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-14">
        <SectionReveal className="md:col-span-5" direction="left">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-4">
            03 / How we work
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight leading-[1.1]">
            <span className="text-silver">From idea to production, </span>
            <span className="text-electric">fast.</span>
          </h2>
          <p className="mt-6 text-foreground/70 leading-relaxed text-[15px] md:text-base">
            We don't sell roadmaps. We embed with your team, ship a working
            prototype in weeks, then harden it into infrastructure your business
            can depend on.
          </p>
        </SectionReveal>

        <div ref={ref} className="md:col-span-7 relative">
          {/* Progress rail */}
          <div className="absolute left-4 md:left-6 top-2 bottom-2 w-px bg-border">
            <motion.span
              style={{ height: progressHeight }}
              className="absolute inset-x-0 top-0 bg-gradient-to-b from-accent to-accent-glow w-px shadow-[0_0_12px_2px_rgba(61,126,255,0.4)]"
            />
          </div>

          <div className="space-y-6">
            {PROCESS_STEPS.map((step, i) => (
              <SectionReveal key={step.n} delay={i * 100} direction="right">
                <div className="relative pl-12 md:pl-16 group">
                  <span className="absolute left-0 md:left-2 top-2 size-3 rounded-full border-2 border-accent bg-background group-hover:bg-accent transition-colors duration-300" />
                  <div className="rounded-2xl border border-border p-6 md:p-7 bg-card/40 hover:bg-card/80 hover:border-accent/30 transition-all duration-300">
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-xs text-accent">{step.n}</span>
                      <h4 className="text-lg md:text-xl font-semibold tracking-tight">
                        {step.t}
                      </h4>
                    </div>
                    <p className="text-foreground/70 mt-3 text-[15px] leading-relaxed max-w-md">
                      {step.b}
                    </p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ──────────────────────────────────────────────────────────────── */

function CTASection() {
  return (
    <section className="relative py-24 md:py-36 px-5 md:px-8 border-t border-border overflow-hidden">
      <AuroraShader className="opacity-50" />

      <SectionReveal className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-10">
        <div>
          <Zap className="size-7 text-accent mb-6 animate-glow-pulse" />
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight max-w-3xl leading-[1.05]">
            <span className="text-silver">Have a problem worth </span>
            <span className="text-electric">solving with AI?</span>
          </h2>
          <p className="mt-6 text-foreground/70 max-w-lg leading-relaxed text-[15px] md:text-base">
            Tell us what you're building. We respond within one business day
            with a clear perspective and a concrete next step. No sales pitch,
            just engineering.
          </p>
        </div>
        <Magnetic>
          <Link
            to="/contact"
            data-cursor="grow"
            className="btn-accent inline-flex items-center gap-2 px-8 py-4 text-sm shrink-0"
          >
            Start a conversation
            <ArrowUpRight className="size-4" />
          </Link>
        </Magnetic>
      </SectionReveal>
    </section>
  );
}
