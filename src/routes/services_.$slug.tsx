import { useRef } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowUpRight,
  ArrowLeft,
  Check,
  X,
  Clock,
  Target,
} from "lucide-react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

import { SiteLayout } from "@/components/SiteLayout";
import { SectionReveal } from "@/components/SectionReveal";
import { SplitText } from "@/components/SplitText";
import { Magnetic } from "@/components/Magnetic";
import { TiltCard } from "@/components/TiltCard";
import { AuroraShader } from "@/components/AuroraShader";
import { SERVICES, COMPANY } from "@/lib/content";
import type { Service } from "@/lib/content";

export const Route = createFileRoute("/services_/$slug")({
  beforeLoad: ({ params }) => {
    const found = SERVICES.find((s) => s.slug === params.slug);
    if (!found) throw notFound();
  },
  head: ({ params }) => {
    const service = SERVICES.find((s) => s.slug === params.slug);
    if (!service) {
      return { meta: [{ title: `Service not found | ${COMPANY.name}` }] };
    }
    return {
      meta: [
        { title: `${service.title} | ${COMPANY.name}` },
        { name: "description", content: service.detail.intro.slice(0, 160) },
        { property: "og:title", content: `${service.title} | ${COMPANY.name}` },
        { property: "og:description", content: service.detail.intro.slice(0, 160) },
      ],
    };
  },
  component: ServiceDetailPage,
});

function ServiceDetailPage() {
  const { slug } = Route.useParams();
  const service = SERVICES.find((s) => s.slug === slug)!;
  const Icon = service.icon;
  const related = SERVICES.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <SiteLayout>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative px-5 md:px-8 pt-12 md:pt-20 pb-16 grid-pattern overflow-hidden">
        <AuroraShader className="opacity-50" />
        <div className="max-w-5xl mx-auto relative z-10">
          <SectionReveal>
            <Link
              to="/services"
              data-cursor="grow"
              className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-accent mb-10 group"
            >
              <ArrowLeft className="size-3.5 group-hover:-translate-x-1 transition-transform" />
              All services
            </Link>
          </SectionReveal>

          <SectionReveal delay={100}>
            <span className="inline-flex items-center justify-center size-14 rounded-2xl border border-accent/30 bg-accent/10 mb-7">
              <Icon className="size-7 text-accent" />
            </span>
          </SectionReveal>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
            <SplitText
              as="span"
              text={service.title}
              split="word"
              stagger={0.05}
              className="block text-silver"
            />
          </h1>

          <SectionReveal delay={400}>
            <p className="mt-6 text-xl md:text-2xl text-electric max-w-3xl leading-snug font-medium">
              {service.detail.tagline}
            </p>
          </SectionReveal>

          <SectionReveal delay={550}>
            <div className="mt-10 flex flex-wrap gap-3">
              <MetaChip icon={Clock} label="Timeline" value={service.detail.timeline} />
              <MetaChip icon={Target} label="Ideal for" value={service.detail.ideal} />
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── INTRO ────────────────────────────────────────────────────── */}
      <section className="px-5 md:px-8 py-16 md:py-20">
        <SectionReveal className="max-w-3xl mx-auto">
          <p className="text-foreground/85 text-lg md:text-xl leading-relaxed">
            {service.detail.intro}
          </p>
        </SectionReveal>
      </section>

      {/* ── IN PRACTICE ──────────────────────────────────────────────── */}
      <section className="px-5 md:px-8 pb-16 md:pb-24">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
          <SectionReveal className="md:col-span-4" direction="left">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-4">
              In practice
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight leading-[1.1]">
              <span className="text-silver">How this </span>
              <span className="text-electric">actually works.</span>
            </h2>
          </SectionReveal>
          <SectionReveal
            className="md:col-span-8 space-y-5 text-foreground/75 leading-relaxed text-base md:text-lg"
            direction="right"
            delay={100}
          >
            {service.detail.inPractice.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </SectionReveal>
        </div>
      </section>

      {/* ── WHAT YOU GET ─────────────────────────────────────────────── */}
      <section className="px-5 md:px-8 py-16 md:py-24 border-y border-border bg-card/20">
        <div className="max-w-7xl mx-auto">
          <SectionReveal className="max-w-3xl mb-12 md:mb-14">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-4">
              What you get
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight leading-[1.1]">
              <span className="text-silver">The deliverables. </span>
              <span className="text-electric">Nothing fluffy.</span>
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {service.detail.whatYouGet.map((item, i) => (
              <SectionReveal key={item.t} delay={i * 60}>
                <TiltCard className="h-full" max={3}>
                  <div className="h-full p-7 md:p-8 rounded-2xl border border-border bg-card/40 hover:bg-card/80 hover:border-accent/30 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <span className="inline-flex items-center justify-center size-9 shrink-0 rounded-lg border border-accent/40 bg-accent/10 mt-0.5">
                        <Check className="size-4 text-accent" />
                      </span>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold mb-2 tracking-tight">
                          {item.t}
                        </h3>
                        <p className="text-foreground/70 text-[14.5px] leading-relaxed">
                          {item.b}
                        </p>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS FLOW (scroll-linked, lights up as you scroll) ────── */}
      <ProcessFlow service={service} />

      {/* ── STACK ────────────────────────────────────────────────────── */}
      <section className="px-5 md:px-8 py-16 md:py-24">
        <SectionReveal className="max-w-5xl mx-auto">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-4">
            Stack we use
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight mb-8 leading-[1.1]">
            <span className="text-silver">Tools, models, </span>
            <span className="text-electric">and infrastructure.</span>
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {service.detail.stack.map((tag) => (
              <span
                key={tag}
                className="px-3.5 py-2 rounded-full border border-border bg-card/40 text-foreground/80 text-[13px] font-mono hover:border-accent/40 hover:text-foreground transition-colors duration-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </SectionReveal>
      </section>

      {/* ── WHEN / WHEN NOT ──────────────────────────────────────────── */}
      <section className="px-5 md:px-8 py-16 md:py-24 border-y border-border bg-card/20">
        <SectionReveal className="max-w-3xl mb-12">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-4">
            Honest fit
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight leading-[1.1]">
            <span className="text-silver">Is this </span>
            <span className="text-electric">right for you?</span>
          </h2>
        </SectionReveal>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <SectionReveal>
            <div className="p-7 md:p-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 h-full">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="inline-flex items-center justify-center size-7 rounded-full bg-emerald-500/15 border border-emerald-500/40">
                  <Check className="size-3.5 text-emerald-400" />
                </span>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-emerald-300">
                  When it's right
                </p>
              </div>
              <p className="text-foreground/85 leading-relaxed text-[15px] md:text-base">
                {service.detail.whenRight}
              </p>
            </div>
          </SectionReveal>
          <SectionReveal delay={100}>
            <div className="p-7 md:p-8 rounded-2xl border border-amber-500/30 bg-amber-500/5 h-full">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="inline-flex items-center justify-center size-7 rounded-full bg-amber-500/15 border border-amber-500/40">
                  <X className="size-3.5 text-amber-400" />
                </span>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber-300">
                  When it's not
                </p>
              </div>
              <p className="text-foreground/85 leading-relaxed text-[15px] md:text-base">
                {service.detail.whenNot}
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── RELATED ──────────────────────────────────────────────────── */}
      <section className="px-5 md:px-8 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <SectionReveal className="mb-12">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-4">
              Related services
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight leading-[1.1]">
              <span className="text-silver">Often pairs </span>
              <span className="text-electric">with this.</span>
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {related.map((s, i) => {
              const RIcon = s.icon;
              return (
                <SectionReveal key={s.slug} delay={i * 80}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    data-cursor="grow"
                    className="block group h-full"
                  >
                    <div className="h-full p-6 md:p-7 rounded-2xl border border-border bg-card/40 hover:bg-card/80 hover:border-accent/30 transition-all duration-300">
                      <RIcon className="size-5 text-muted-foreground group-hover:text-accent mb-4 transition-colors" />
                      <h4 className="font-semibold mb-2 tracking-tight group-hover:text-accent transition-colors">
                        {s.title}
                      </h4>
                      <p className="text-foreground/60 text-[13.5px] leading-relaxed line-clamp-2">
                        {s.body}
                      </p>
                      <div className="mt-4 inline-flex items-center gap-1 text-xs font-mono text-accent opacity-60 group-hover:opacity-100 transition-opacity">
                        Learn more <ArrowUpRight className="size-3" />
                      </div>
                    </div>
                  </Link>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="px-5 md:px-8 pb-24 md:pb-32">
        <SectionReveal className="max-w-5xl mx-auto">
          <div className="relative p-10 md:p-16 border border-border rounded-3xl bg-card/40 overflow-hidden flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <AuroraShader className="opacity-40" />
            <div className="relative z-10">
              <h3 className="font-display text-2xl md:text-4xl font-semibold tracking-tight max-w-xl leading-[1.1]">
                <span className="text-silver">Sounds like a fit? </span>
                <span className="text-electric">Let's scope it out.</span>
              </h3>
              <p className="mt-4 text-foreground/70 max-w-md leading-relaxed text-[15px] md:text-base">
                A 30-minute call to understand your data, your problem, and
                whether {service.title} is actually the right move. No slides,
                no sales pitch.
              </p>
            </div>
            <Magnetic>
              <Link
                to="/contact"
                data-cursor="grow"
                className="btn-accent relative z-10 inline-flex items-center gap-2 px-7 py-4 text-sm shrink-0"
              >
                Book a call <ArrowUpRight className="size-4" />
              </Link>
            </Magnetic>
          </div>
        </SectionReveal>
      </section>
    </SiteLayout>
  );
}

function MetaChip({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="inline-flex items-start gap-3 px-4 py-3 rounded-xl border border-border bg-card/40 backdrop-blur-sm max-w-md">
      <Icon className="size-4 text-accent mt-1 shrink-0" />
      <div className="min-w-0">
        <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground mb-1">
          {label}
        </p>
        <p className="text-[13.5px] text-foreground/90 leading-snug">{value}</p>
      </div>
    </div>
  );
}

/* ─── Scroll-linked process flow ─────────────────────────────────────── */

function ProcessFlow({ service }: { service: Service }) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Drive the central rail's fill from the section's scroll progress.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 30%"],
  });
  const railHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative px-5 md:px-8 py-20 md:py-28 overflow-hidden">
      {/* Ambient glow that follows the rail */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 40% 70% at 50% 50%, color-mix(in oklab, var(--color-accent) 8%, transparent), transparent 70%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <SectionReveal className="text-center mb-16 md:mb-20">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-4">
            How we deliver this
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.05]">
            <span className="text-silver">A repeatable </span>
            <span className="text-electric">{service.detail.process.length}-step flow.</span>
          </h2>
          <p className="mt-5 text-foreground/65 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Every {service.title.toLowerCase()} engagement follows the same
            disciplined path. Light up each step as you scroll.
          </p>
        </SectionReveal>

        {/* Flow */}
        <div ref={containerRef} className="relative">
          {/* Central rail (desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2">
            <motion.span
              style={{ height: railHeight }}
              className="absolute inset-x-0 top-0 w-px bg-gradient-to-b from-accent via-accent to-accent-glow shadow-[0_0_18px_3px_rgba(61,126,255,0.55)]"
            />
          </div>

          {/* Left-edge rail (mobile) */}
          <div className="md:hidden absolute left-3 top-0 bottom-0 w-px bg-border">
            <motion.span
              style={{ height: railHeight }}
              className="absolute inset-x-0 top-0 w-px bg-gradient-to-b from-accent via-accent to-accent-glow shadow-[0_0_18px_3px_rgba(61,126,255,0.55)]"
            />
          </div>

          {/* Steps */}
          <ol className="space-y-10 md:space-y-12">
            {service.detail.process.map((step, i) => (
              <FlowStep
                key={step.t}
                index={i}
                total={service.detail.process.length}
                step={step}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function FlowStep({
  index,
  total,
  step,
}: {
  index: number;
  total: number;
  step: { t: string; b: string };
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-30% 0px -30% 0px", once: false });
  const isLeft = index % 2 === 0;
  const num = String(index + 1).padStart(2, "0");

  return (
    <li ref={ref} className="relative md:grid md:grid-cols-2 md:gap-12 md:items-center">
      {/* Node on the rail */}
      <span
        aria-hidden
        className={`absolute z-10 left-3 md:left-1/2 top-7 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
          inView ? "scale-110" : "scale-100"
        }`}
      >
        <span
          className={`block size-4 rounded-full border-2 transition-all duration-500 ${
            inView
              ? "bg-accent border-accent shadow-[0_0_22px_6px_rgba(61,126,255,0.55)]"
              : "bg-background border-border"
          }`}
        />
        {inView && (
          <span className="absolute inset-0 rounded-full bg-accent/50 animate-ping" />
        )}
      </span>

      {/* Card */}
      <div
        className={`pl-12 md:pl-0 ${
          isLeft ? "md:pr-14 md:text-right" : "md:col-start-2 md:pl-14"
        }`}
      >
        <motion.div
          initial={false}
          animate={{
            opacity: inView ? 1 : 0.42,
            y: inView ? 0 : 12,
          }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className={`relative rounded-2xl border p-6 md:p-7 backdrop-blur-sm transition-colors duration-500 ${
            inView
              ? "border-accent/40 bg-card/70 shadow-[0_8px_60px_-20px_rgba(61,126,255,0.45)]"
              : "border-border bg-card/30"
          }`}
        >
          {/* Step counter strip */}
          <div
            className={`flex items-center gap-3 mb-3 ${
              isLeft ? "md:justify-end" : ""
            }`}
          >
            <span
              className={`font-mono text-xs tracking-[0.2em] transition-colors duration-500 ${
                inView ? "text-accent" : "text-muted-foreground/60"
              }`}
            >
              STEP {num}
            </span>
            <span className="font-mono text-[10px] text-muted-foreground/50">
              / {String(total).padStart(2, "0")}
            </span>
          </div>

          <h3
            className={`text-xl md:text-2xl font-semibold tracking-tight transition-colors duration-500 ${
              inView ? "text-foreground" : "text-foreground/75"
            }`}
          >
            {step.t}
          </h3>
          <p
            className={`mt-3 text-[15px] leading-relaxed transition-colors duration-500 ${
              inView ? "text-foreground/80" : "text-foreground/55"
            }`}
          >
            {step.b}
          </p>
        </motion.div>
      </div>

      {/* Spacer for the other column on desktop */}
      <div className={isLeft ? "md:col-start-2" : "md:col-start-1 md:row-start-1"} aria-hidden />
    </li>
  );
}
