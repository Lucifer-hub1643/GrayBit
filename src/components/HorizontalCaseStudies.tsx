import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import type { CaseStudy } from "@/lib/content";

/**
 * Pinned horizontal scroller for case studies.
 * On desktop: vertical scroll drives a horizontal pan through panels.
 * On mobile / reduced-motion: falls back to a vertical stack.
 */
export function HorizontalCaseStudies({ studies }: { studies: CaseStudy[] }) {
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  // panels-1 because the first panel is already visible
  const panels = studies.length;
  // We move from 0 to -(panels-1) * 100vw equivalent
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(panels - 1) * (100 / panels)}%`],
  );

  if (reduced) {
    return (
      <div className="grid grid-cols-1 gap-10">
        {studies.map((s) => (
          <CasePanel key={s.name} study={s} />
        ))}
      </div>
    );
  }

  return (
    <>
      {/* Desktop pinned scroller */}
      <div
        ref={wrapRef}
        className="relative hidden md:block"
        style={{ height: `${panels * 100}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden flex items-center">
          <motion.div
            style={{ x, width: `${panels * 100}vw` }}
            className="flex"
          >
            {studies.map((s, i) => (
              <div
                key={s.name}
                className="shrink-0 flex items-center justify-center px-12 lg:px-24"
                style={{ width: `${100 / panels * (panels)}vw`, maxWidth: "100vw" }}
              >
                <PanoramicPanel study={s} index={i} total={panels} />
              </div>
            ))}
          </motion.div>

          {/* Scroll progress hint */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 text-muted-foreground/60">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
              Scroll to explore
            </span>
            <div className="relative w-40 h-px bg-border overflow-hidden">
              <motion.span
                style={{ scaleX: scrollYProgress }}
                className="absolute inset-0 bg-accent origin-left"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile vertical stack */}
      <div className="md:hidden grid grid-cols-1 gap-10">
        {studies.map((s) => (
          <CasePanel key={s.name} study={s} />
        ))}
      </div>
    </>
  );
}

function PanoramicPanel({
  study,
  index,
  total,
}: {
  study: CaseStudy;
  index: number;
  total: number;
}) {
  return (
    <article className="w-full max-w-6xl grid grid-cols-12 gap-8 lg:gap-12 items-center">
      {/* Image */}
      <div className="col-span-12 lg:col-span-7 relative">
        <div className="aspect-[16/10] rounded-3xl overflow-hidden border border-border bg-card relative group">
          <img
            src={study.image}
            alt={study.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-background/70 via-transparent to-transparent" />
          <div className="absolute top-5 left-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>
          <div className="absolute bottom-5 left-5">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm border border-accent/40 text-xs font-mono text-accent">
              {study.result}
            </span>
          </div>
        </div>
      </div>

      {/* Meta */}
      <div className="col-span-12 lg:col-span-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-4">
          {study.sector} / {study.year}
        </p>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight">
          <span className="text-silver">{study.name}</span>
        </h2>
        <p className="mt-5 text-foreground/70 leading-relaxed max-w-md text-[15px] md:text-base">
          {study.blurb}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {study.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full border border-border text-[11px] font-mono text-muted-foreground uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function CasePanel({ study }: { study: CaseStudy }) {
  return (
    <article className="group">
      <div className="aspect-[16/10] rounded-2xl overflow-hidden border border-border bg-card mb-5 relative">
        <img
          src={study.image}
          alt={study.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm border border-accent/40 text-xs font-mono text-accent">
            {study.result}
          </span>
        </div>
      </div>
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-2">
        {study.sector} / {study.year}
      </p>
      <h3 className="text-2xl font-semibold tracking-tight">{study.name}</h3>
      <p className="text-foreground/70 text-[14.5px] mt-2 leading-relaxed">{study.blurb}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {study.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-full border border-border text-[10px] font-mono text-muted-foreground uppercase tracking-wider"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
